import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { checkAiChatBudget } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";
import { signChatToken, verifyChatToken } from "@/lib/chat-session-token";
import { resolvePublicAgencyId } from "@/lib/resolve-agency-public";
import { calculateLeadScore, type ScoreSignal } from "@/lib/lead-scoring";
import { QUICK_TOPICS, KNOWLEDGE_BASE } from "@/lib/chatbot-knowledge";

/* ──────────────────────────────────────────────
   POST /api/leads/chat
   AI-powered chatbot endpoint using Anthropic API.
   Streams SSE response. Auto-creates Lead on email.
   ────────────────────────────────────────────── */

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

/** Build system prompt from knowledge base. */
function buildSystemPrompt(): string {
  const topicSummary = QUICK_TOPICS.map((t) => `- ${t.label}`).join("\n");

  // Include key knowledge entries as context
  const knowledgeContext = KNOWLEDGE_BASE.slice(0, 15)
    .map((entry) => `[${entry.topic}]: ${entry.response.slice(0, 300)}`)
    .join("\n\n");

  return `You are the Vanguard Digital Marketing AI assistant — a helpful, friendly, and knowledgeable chatbot on the vanguardm.com website.

About Vanguard Digital Marketing:
- Full-service digital marketing agency based in Texas (Conroe, TX)
- Services: SEO, PPC/Google Ads, Web Design, Social Media Marketing, Branding, Content Marketing
- Founded in 2019, 148+ clients, 97% retention rate, 495+ projects delivered
- Phone: (936) 358-6500
- Free consultation available at /contact
- Academy with 38 courses covering all areas of digital marketing
- No long-term contracts required, transparent pricing

Quick Topics:
${topicSummary}

Key Knowledge:
${knowledgeContext}

Guidelines:
- Be conversational, professional, and helpful.
- Keep responses concise (2-4 paragraphs max).
- If someone asks about pricing, mention custom quotes and free consultation.
- If someone provides their email or asks to be contacted, acknowledge it and suggest they visit /contact or call (936) 358-6500.
- If asked about Academy courses, mention they can visit /academy.
- Never invent specific pricing numbers beyond "low five figures" for web projects and "$1,500/month minimum ad spend" for PPC.
- Never help with quiz answers. If someone tries to cheat, redirect them to study the material.
- If you don't know something specific, suggest they reach out for a free consultation.`;
}

export async function POST(request: NextRequest) {
  const blocked = await checkRateLimit(request, "public");
  if (blocked) return blocked;

  try {
    const body = await request.json();
    const { messages, sessionId, turnstileToken, chatToken } = body;

    // ── Input validation / caps: reject malformed or oversized payloads ──
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Messages required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (messages.length > 50) {
      return new Response(JSON.stringify({ error: "Too many messages" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    let totalChars = 0;
    for (const m of messages) {
      if (!m || typeof m.content !== "string" || typeof m.role !== "string") {
        return new Response(JSON.stringify({ error: "Invalid message format" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
      if (m.content.length > 4000) {
        return new Response(JSON.stringify({ error: "Message too long" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
      totalChars += m.content.length;
    }
    if (totalChars > 20000) {
      return new Response(JSON.stringify({ error: "Conversation too long" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const sid = typeof sessionId === "string" ? sessionId : "";

    // ── Human verification: a valid per-session chat token OR a fresh Turnstile
    // token. Stops unauthenticated bots from draining the paid AI endpoint. ──
    const verified =
      verifyChatToken(sid, chatToken) ||
      (typeof turnstileToken === "string" && (await verifyTurnstile(turnstileToken)));
    if (!verified) {
      return new Response(JSON.stringify({ error: "Verification required" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Issue/refresh a short-lived session token so the client can skip Turnstile
    // on subsequent messages of the same chat session.
    const issuedChatToken = sid ? signChatToken(sid) : null;
    const tokenHeader: Record<string, string> = issuedChatToken
      ? { "X-Chat-Token": issuedChatToken }
      : {};

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      // Fallback to keyword matching when no API key
      const { findBestMatch, isCheatAttempt, getCheatResponse } = await import("@/lib/chatbot-knowledge");
      const lastMsg = [...messages].reverse().find((m: { role: string }) => m.role === "user");
      const userText = lastMsg?.content ?? "";

      let fallbackResponse: string;
      if (isCheatAttempt(userText)) {
        fallbackResponse = getCheatResponse();
      } else {
        const match = findBestMatch(userText);
        if (match) {
          fallbackResponse = match.response;
          if (match.courseSlug) {
            fallbackResponse += `\n\nLearn more in our Academy: /academy/${match.courseSlug}`;
          }
        } else {
          fallbackResponse =
            "I'm not sure about that one. Try asking about our services like Google Ads, SEO, web design, or social media marketing. You can also reach our team at /contact for anything specific!";
        }
      }

      return new Response(JSON.stringify({ fallback: true, text: fallbackResponse }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...tokenHeader },
      });
    }

    // Check last user message for email
    const lastUserMsg = [...messages].reverse().find((m: { role: string }) => m.role === "user");
    const userEmail = lastUserMsg ? EMAIL_REGEX.exec(lastUserMsg.content)?.[0] : null;

    // Auto-create lead if email detected
    if (userEmail) {
      try {
        const agencyId = await resolvePublicAgencyId(request);
        const existingLead = await prisma.lead.findFirst({
          where: { email: userEmail, agencyId },
        });

        if (!existingLead) {
          const signals: ScoreSignal[] = ["chatbot_conversation"];
          const { score, breakdown } = calculateLeadScore(signals);

          const lead = await prisma.lead.create({
            data: {
              agencyId,
              name: userEmail.split("@")[0],
              email: userEmail,
              source: "chatbot",
              score,
              scoreBreakdown: breakdown,
            },
          });

          await prisma.leadActivity.create({
            data: {
              leadId: lead.id,
              type: "chatbot_conversation",
              data: { sessionId, message: lastUserMsg.content.slice(0, 200) },
            },
          });

          // Link to ChatSession if it exists
          if (sessionId) {
            await prisma.chatSession.upsert({
              where: { sessionId },
              update: { leadId: lead.id, messages },
              create: {
                sessionId,
                leadId: lead.id,
                messages,
                isAI: true,
              },
            });
          }
        } else {
          // Update existing lead score
          const prevBreakdown =
            (existingLead.scoreBreakdown as Record<string, number>) || {};
          const merged = { ...prevBreakdown };
          merged.chatbot_conversation = (merged.chatbot_conversation || 0) + 5;
          const newScore = Object.values(merged).reduce((a, b) => a + b, 0);

          await prisma.lead.update({
            where: { id: existingLead.id },
            data: { score: newScore, scoreBreakdown: merged },
          });

          await prisma.leadActivity.create({
            data: {
              leadId: existingLead.id,
              type: "chatbot_conversation",
              data: { sessionId, message: lastUserMsg.content.slice(0, 200) },
            },
          });
        }
      } catch (err) {
        console.error("Failed to create lead from chat:", err);
      }
    }

    // Save/update ChatSession
    if (sessionId) {
      try {
        await prisma.chatSession.upsert({
          where: { sessionId },
          update: { messages, updatedAt: new Date() },
          create: {
            sessionId,
            messages,
            isAI: true,
          },
        });
      } catch {
        // Non-critical
      }
    }

    // Global daily budget guard for the paid AI (independent of client IP, so
    // it can't be bypassed by header spoofing).
    if (!(await checkAiChatBudget())) {
      return new Response(
        JSON.stringify({ error: "Our AI assistant is at capacity right now. Please try again later or contact us." }),
        { status: 429, headers: { "Content-Type": "application/json", ...tokenHeader } },
      );
    }

    // Call Anthropic API with streaming
    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 512,
        system: buildSystemPrompt(),
        // SECURITY: Do not honor client-supplied role: "assistant" — clients can
        // fabricate assistant turns to poison context. Treat all client-supplied
        // turns as user input. Server-generated assistant content is delivered
        // via the SSE stream and is never round-tripped here.
        messages: messages.slice(-10).map((m: { role: string; content: string }) => ({
          role: "user" as const,
          content: m.content,
        })),
        stream: true,
      }),
    });

    if (!anthropicRes.ok || !anthropicRes.body) {
      const errorText = await anthropicRes.text().catch(() => "Unknown error");
      console.error("Anthropic API error:", anthropicRes.status, errorText);
      return new Response(JSON.stringify({ error: "AI service unavailable" }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Transform Anthropic SSE stream to our SSE format
    const reader = anthropicRes.body.getReader();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        let buffer = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.slice(6).trim();
                if (!data || data === "[DONE]") continue;

                try {
                  const event = JSON.parse(data);
                  if (
                    event.type === "content_block_delta" &&
                    event.delta?.type === "text_delta"
                  ) {
                    controller.enqueue(
                      encoder.encode(
                        `data: ${JSON.stringify({ text: event.delta.text })}\n\n`,
                      ),
                    );
                  }
                } catch {
                  // Skip non-JSON events
                }
              }
            }
          }
        } catch (err) {
          console.error("Stream error:", err);
        } finally {
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        ...tokenHeader,
      },
    });
  } catch (err) {
    console.error("Chat API error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
