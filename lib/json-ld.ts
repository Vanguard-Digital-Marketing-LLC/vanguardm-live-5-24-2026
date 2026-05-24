/**
 * Serialize an object for safe embedding inside a
 * <script type="application/ld+json"> block.
 *
 * SECURITY (L10): JSON.stringify does NOT escape "</script>" or other
 * HTML-significant characters, so admin-authored fields (post title, meta
 * description, …) could break out of the script tag. Escaping <, >, & to their
 * \u forms keeps the JSON valid while making tag-breakout impossible.
 */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}
