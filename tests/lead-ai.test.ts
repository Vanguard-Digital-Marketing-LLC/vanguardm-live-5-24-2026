import { describe, it, expect } from "vitest";
import { buildLeadAnalysisPrompt, parseLeadAiResponse } from "@/lib/lead-ai";

describe("parseLeadAiResponse", () => {
  it("parses a valid JSON object", () => {
    const r = parseLeadAiResponse(
      JSON.stringify({
        researchBrief: "Acme is a SaaS company.",
        intentScore: 72,
        reason: "Provided company + clear need.",
        flagged: false,
        flagReason: "",
        followup: { subject: "Hi", body: "Let's talk. Book a call." },
      }),
    );
    expect(r.researchBrief).toContain("Acme");
    expect(r.intentScore).toBe(72);
    expect(r.followup?.subject).toBe("Hi");
    expect(r.flagged).toBe(false);
  });

  it("strips ```json fences", () => {
    const r = parseLeadAiResponse('```json\n{"researchBrief":"x","intentScore":50,"reason":"y","flagged":false,"followup":{"subject":"s","body":"b"}}\n```');
    expect(r.intentScore).toBe(50);
    expect(r.followup?.body).toBe("b");
  });

  it("nulls score and followup when flagged", () => {
    const r = parseLeadAiResponse(
      JSON.stringify({
        researchBrief: "",
        intentScore: 90,
        reason: "spam",
        flagged: true,
        flagReason: "looks like spam",
        followup: { subject: "x", body: "y" },
      }),
    );
    expect(r.flagged).toBe(true);
    expect(r.intentScore).toBeNull();
    expect(r.followup).toBeNull();
    expect(r.flagReason).toBe("looks like spam");
  });

  it("clamps the score to 0-100", () => {
    expect(parseLeadAiResponse('{"intentScore":150,"flagged":false}').intentScore).toBe(100);
    expect(parseLeadAiResponse('{"intentScore":-5,"flagged":false}').intentScore).toBe(0);
  });

  it("returns null followup when subject/body missing", () => {
    const r = parseLeadAiResponse('{"intentScore":40,"flagged":false,"followup":{"subject":"only subject"}}');
    expect(r.followup).toBeNull();
  });

  it("throws on malformed JSON", () => {
    expect(() => parseLeadAiResponse("not json at all")).toThrow();
  });
});

describe("buildLeadAnalysisPrompt", () => {
  it("includes known fields and marks unknowns", () => {
    const p = buildLeadAnalysisPrompt({ name: "Jane", email: "jane@x.com" });
    expect(p).toContain("Jane");
    expect(p).toContain("jane@x.com");
    expect(p).toContain("Company: (unknown)");
  });

  it("appends extra context when provided", () => {
    const p = buildLeadAnalysisPrompt({ name: "Jane", context: "chat: wants SEO" });
    expect(p).toContain("Additional context");
    expect(p).toContain("wants SEO");
  });
});
