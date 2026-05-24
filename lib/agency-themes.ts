/**
 * Agency theme registry — maps agency slugs to CSS variable overrides.
 * When a theme exists for the current subdomain, layout.tsx injects these
 * as :root CSS custom-property overrides so every Tailwind utility
 * (`text-teal`, `bg-emerald`, `border-amber`, etc.) automatically adapts.
 */

export interface AgencyTheme {
  mode: "light" | "dark";
  colors: Record<string, string>;
  body: { background: string; color: string };
  fonts: { display: string; body: string };
  glass: { bg: string; border: string };
}

const themes: Record<string, AgencyTheme> = {
  mentservices: {
    mode: "light",
    colors: {
      "--color-teal": "#149A9A",
      "--color-teal-400": "#17b5b5",
      "--color-teal-500": "#149A9A",
      "--color-teal-600": "#0f7a7a",
      "--color-emerald": "#149A9A",
      "--color-emerald-400": "#17b5b5",
      "--color-emerald-500": "#149A9A",
      "--color-emerald-600": "#0f7a7a",
      "--color-amber": "#ffb606",
      "--color-amber-400": "#ffc940",
      "--color-amber-500": "#ffb606",
    },
    body: { background: "#ffffff", color: "#333333" },
    fonts: { display: "var(--font-poppins), 'Poppins', sans-serif", body: "var(--font-poppins), 'Poppins', sans-serif" },
    glass: { bg: "rgba(255,255,255,0.8)", border: "rgba(0,0,0,0.06)" },
  },
};

export function getAgencyTheme(slug: string | null): AgencyTheme | null {
  if (!slug) return null;
  return themes[slug] ?? null;
}

/** Build a CSS string that overrides :root custom properties for the theme. */
export function buildThemeCSS(theme: AgencyTheme): string {
  const lines: string[] = [":root {"];

  for (const [prop, value] of Object.entries(theme.colors)) {
    lines.push(`  ${prop}: ${value};`);
  }

  lines.push(`  --font-display: ${theme.fonts.display};`);
  lines.push(`  --font-body: ${theme.fonts.body};`);
  lines.push(`  --theme-glass-bg: ${theme.glass.bg};`);
  lines.push(`  --theme-glass-border: ${theme.glass.border};`);
  lines.push(`  --theme-body-bg: ${theme.body.background};`);
  lines.push(`  --theme-body-color: ${theme.body.color};`);

  lines.push("}");
  return lines.join("\n");
}
