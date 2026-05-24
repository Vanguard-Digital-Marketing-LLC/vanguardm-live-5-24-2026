import { test, expect } from "@playwright/test";
import { loginAsAdmin } from "./helpers/auth";

// These tests require valid admin credentials via TEST_ADMIN_EMAIL / TEST_ADMIN_PASSWORD
// environment variables. Skipped by default until auth setup is complete.
test.describe.skip("Admin Panel (requires auth)", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test("admin dashboard loads after auth", async ({ page }) => {
    await page.goto("/admin");

    // The admin overview page shows an "Overview" heading
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
    await expect(heading).toContainText("Overview");

    // Metric cards should be present
    const metricCards = page.locator("text=Active Clients");
    await expect(metricCards).toBeVisible();
  });

  test("sidebar navigation items visible", async ({ page }) => {
    await page.goto("/admin");

    // The sidebar has role="navigation" with aria-label="Admin navigation"
    const sidebar = page.locator('aside[role="navigation"]');
    await expect(sidebar).toBeVisible();

    // Verify key sidebar nav links are present (icon-only by default, expanded shows labels)
    // Each nav link has a title attribute when collapsed
    const expectedNavItems = [
      "Overview",
      "Clients",
      "Onboarding",
      "Projects",
      "Tasks",
      "Tickets",
      "Payments",
      "Leads",
      "Team",
      "AI Agent",
      "Academy",
      "Settings",
    ];

    for (const label of expectedNavItems) {
      const navLink = sidebar.locator(`a[title="${label}"], a:has-text("${label}")`);
      await expect(navLink).toBeAttached();
    }
  });

  test("sidebar can be expanded and collapsed", async ({ page }) => {
    await page.goto("/admin");

    const toggleButton = page.locator('button[aria-label="Toggle sidebar"]');
    await expect(toggleButton).toBeVisible();

    // Click to expand
    await toggleButton.click();

    // After expanding, nav items should show text labels
    const overviewLabel = page.locator('aside[role="navigation"] a:has-text("Overview") span');
    await expect(overviewLabel).toBeVisible();

    // Click to collapse
    await toggleButton.click();
  });
});
