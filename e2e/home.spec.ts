import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("loads and displays 'Dominate Digital' in h1", async ({ page }) => {
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
    await expect(heading).toContainText("Dominate Digital");
  });

  test("navigation links are visible", async ({ page }) => {
    const nav = page.locator('nav[aria-label="Main navigation"]');
    await expect(nav).toBeVisible();

    const expectedLinks = [
      "Home",
      "About",
      "Services",
      "Portfolio",
      "Academy",
      "Contact",
    ];

    for (const linkText of expectedLinks) {
      const link = nav.locator(`a:has-text("${linkText}")`);
      await expect(link).toBeVisible();
    }
  });

  test("service cards render (6 items)", async ({ page }) => {
    // The ServicesGrid renders 6 service cards inside GlassCard components.
    // Each card has an h3 with the service title.
    const serviceHeadings = page.locator("h3").filter({
      hasText: /SEO|Web Design|Social Media|PPC|Branding|Content Marketing/,
    });
    await expect(serviceHeadings).toHaveCount(6);
  });

  test("stats section shows metrics", async ({ page }) => {
    // StatsSection renders 4 stat cards with values like "148+", "495+", "97%", "7+"
    const statsValues = ["148+", "495+", "97%", "7+"];

    for (const value of statsValues) {
      const stat = page.locator(`text=${value}`);
      await expect(stat).toBeVisible();
    }
  });

  test("CTA button is visible", async ({ page }) => {
    // The CTASection contains a "Get Your Free Consultation" button/link
    const ctaButton = page.locator('a:has-text("Get Your Free Consultation")').last();
    await expect(ctaButton).toBeVisible();
  });

  test("page has correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/Vanguard/);
  });

  test("footer is visible", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });
});

test.describe("Home Page — Mobile", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("hamburger menu appears on small viewport", async ({ page }) => {
    await page.goto("/");

    // The hamburger button has aria-label="Toggle menu" and is visible on mobile (md:hidden)
    const hamburger = page.locator('button[aria-label="Toggle menu"]');
    await expect(hamburger).toBeVisible();

    // Desktop nav should be hidden on mobile
    const desktopNav = page.locator('nav[aria-label="Main navigation"]');
    await expect(desktopNav).not.toBeVisible();

    // Click hamburger to open mobile nav
    await hamburger.click();
    const mobileNav = page.locator('nav[aria-label="Mobile navigation"]');
    await expect(mobileNav).toBeVisible();

    // Mobile nav should contain all nav links
    const expectedLinks = ["Home", "About", "Services", "Portfolio", "Academy", "Contact"];
    for (const linkText of expectedLinks) {
      const link = mobileNav.locator(`a:has-text("${linkText}")`);
      await expect(link).toBeVisible();
    }
  });
});
