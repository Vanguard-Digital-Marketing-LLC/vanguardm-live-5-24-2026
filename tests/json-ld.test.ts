import { describe, it, expect } from "vitest";
import { jsonLdScript } from "@/lib/json-ld";

describe("jsonLdScript (L10)", () => {
  it("escapes </script> so it cannot break out of a script tag", () => {
    const out = jsonLdScript({ title: "</script><script>alert(1)</script>" });
    expect(out).not.toContain("</script>");
    expect(out).not.toContain("<script>");
    expect(out).toContain("\\u003c");
  });

  it("escapes <, >, and & entirely", () => {
    const out = jsonLdScript({ a: "<b> & </b>" });
    expect(out).not.toMatch(/[<>&]/);
  });

  it("still parses back to the original object (valid JSON)", () => {
    const obj = { name: "A<b>&c", n: 1, arr: [1, "x>y"] };
    expect(JSON.parse(jsonLdScript(obj))).toEqual(obj);
  });
});
