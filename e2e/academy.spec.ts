import { test, expect } from "@playwright/test";

test.describe("Academy Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/academy");
  });

  test("loads with courses", async ({ page }) => {
    // Page heading
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
    await expect(heading).toContainText("Marketing");

    // "Vanguard Academy" label above heading
    await expect(page.locator("text=Vanguard Academy")).toBeVisible();

    // Course cards are rendered — each has an h2 with a linked course title
    const courseCards = page.locator("h2 a");
    const count = await courseCards.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test("course categories are filterable", async ({ page }) => {
    // The "All Courses" filter button should be active by default
    const allCoursesBtn = page.locator('button:has-text("All Courses")');
    await expect(allCoursesBtn).toBeVisible();

    // Category filter buttons are present
    const categories = [
      "SEO & Search",
      "PPC & Paid Advertising",
      "Social Media Marketing",
      "Content Marketing & Email",
      "Branding & Creative",
      "Analytics & Data",
      "Strategy & Growth",
      "E-Commerce & Industry",
    ];

    for (const category of categories) {
      const btn = page.locator(`button:has-text("${category}")`);
      await expect(btn).toBeVisible();
    }

    // Count courses before filtering
    const allCourseCount = await page.locator("h2 a").count();
    expect(allCourseCount).toBeGreaterThan(0);

    // Click a category to filter
    await page.locator('button:has-text("SEO & Search")').click();

    // After filtering, course count should be a subset of total
    const filteredCount = await page.locator("h2 a").count();
    expect(filteredCount).toBeGreaterThan(0);
    expect(filteredCount).toBeLessThanOrEqual(allCourseCount);

    // Click "All Courses" to reset
    await allCoursesBtn.click();
    const resetCount = await page.locator("h2 a").count();
    expect(resetCount).toBe(allCourseCount);
  });

  test("individual course page loads (seo-fundamentals)", async ({ page }) => {
    await page.goto("/academy/seo-fundamentals");

    // Course page has the course title in h1
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
    await expect(heading).toContainText("SEO Fundamentals");

    // Breadcrumb link to Academy
    const breadcrumb = page.locator('a:has-text("Academy")');
    await expect(breadcrumb).toBeVisible();

    // Category label
    await expect(page.locator("text=SEO & Search")).toBeVisible();

    // Difficulty badge
    await expect(page.locator("text=Beginner")).toBeVisible();

    // "What You'll Learn" section
    await expect(page.locator("text=What You'll Learn")).toBeVisible();

    // "Topics Covered" section
    await expect(page.locator("text=Topics Covered")).toBeVisible();

    // Quiz CTA link
    const quizLink = page.locator('a[href="/academy/seo-fundamentals/quiz"]');
    await expect(quizLink).toBeVisible();
  });

  test("course cards have Start Course or View Course buttons", async ({ page }) => {
    // Free courses show "Start Course", paid courses show "View Course"
    const startButtons = page.locator('a:has-text("Start Course")');
    const viewButtons = page.locator('a:has-text("View Course")');

    const startCount = await startButtons.count();
    const viewCount = await viewButtons.count();

    // There should be at least some course action buttons
    expect(startCount + viewCount).toBeGreaterThan(0);
  });

  test("clicking a course title navigates to the course page", async ({ page }) => {
    const firstCourseLink = page.locator("h2 a").first();
    await expect(firstCourseLink).toBeVisible();

    const href = await firstCourseLink.getAttribute("href");
    expect(href).toMatch(/^\/academy\/.+/);

    await firstCourseLink.click();
    await page.waitForURL(/\/academy\/.+/);
    expect(page.url()).toContain("/academy/");
  });
});
