import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";
import {
  calculateLeadScore,
  type ScoreSignal,
} from "@/lib/lead-scoring";
import { isValidEmail } from "@/lib/validations/email";

/* ──────────────────────────────────────────────
   POST /api/leads/forms/[slug]/submit
   Submits a multi-step form response.
   Creates or updates Lead if email is provided.
   ────────────────────────────────────────────── */

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const blocked = await checkRateLimit(request, "public");
  if (blocked) return blocked;

  const { slug } = await params;

  try {
    const body = await request.json();
    const { data, completedSteps } = body;

    if (!data || typeof data !== "object") {
      return NextResponse.json(
        { error: "Form data is required" },
        { status: 400 },
      );
    }

    // Find the form
    const form = await prisma.multiStepForm.findUnique({
      where: { slug },
    });

    if (!form || !form.isActive) {
      return NextResponse.json(
        { error: "Form not found or inactive" },
        { status: 404 },
      );
    }

    // Extract contact info from form data
    const email =
      data.email || data.Email || data.emailAddress || data.email_address;
    const name = data.name || data.Name || data.fullName || data.full_name;
    const phone = data.phone || data.Phone || data.phoneNumber || data.phone_number;
    const company =
      data.company || data.Company || data.companyName || data.company_name;

    let leadId: string | null = null;

    // Create or update Lead if we have an email
    if (email && isValidEmail(email)) {
      const signals: ScoreSignal[] = ["multi_step_form_completed"];
      if (phone) signals.push("phone_provided");
      if (company) signals.push("company_provided");
      const { score, breakdown } = calculateLeadScore(signals);

      const existingLead = await prisma.lead.findFirst({
        where: { email, agencyId: form.agencyId },
      });

      if (existingLead) {
        // Merge scores
        const prevBreakdown =
          (existingLead.scoreBreakdown as Record<string, number>) || {};
        const merged = { ...prevBreakdown };
        for (const [key, val] of Object.entries(breakdown)) {
          merged[key] = (merged[key] || 0) + val;
        }
        const newScore = Object.values(merged).reduce((a, b) => a + b, 0);

        await prisma.lead.update({
          where: { id: existingLead.id },
          data: {
            score: newScore,
            scoreBreakdown: merged,
            name: name || existingLead.name,
            phone: phone || existingLead.phone,
            company: company || existingLead.company,
          },
        });

        leadId = existingLead.id;
      } else {
        // Lead belongs to whichever agency owns the form, not whichever
        // subdomain the visitor came from — the form is the source of truth.
        const lead = await prisma.lead.create({
          data: {
            agencyId: form.agencyId,
            name: name || email.split("@")[0],
            email,
            phone: phone || null,
            company: company || null,
            source: "multi_step_form",
            score,
            scoreBreakdown: breakdown,
          },
        });
        leadId = lead.id;
      }

      // Add activity
      await prisma.leadActivity.create({
        data: {
          leadId: leadId!,
          type: "multi_step_form_completed",
          data: { formSlug: slug, formName: form.name },
        },
      });
    }

    // Save form response
    await prisma.multiStepFormResponse.create({
      data: {
        formId: form.id,
        leadId,
        data,
        completedSteps: completedSteps || 0,
        isComplete: true,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Form submit error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
