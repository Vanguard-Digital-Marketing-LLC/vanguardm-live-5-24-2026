import { Page } from "@playwright/test";

export async function loginAsAdmin(page: Page) {
  await page.goto("/auth/sign-in");
  await page.fill('input[id="email"]', process.env.TEST_ADMIN_EMAIL || "test@vanguardm.com");
  await page.fill('input[id="password"]', process.env.TEST_ADMIN_PASSWORD || "testpass");

  // Wait for Turnstile timeout fallback (form allows submit after 3s)
  await page.waitForTimeout(3500);

  await page.click('button[type="submit"]');
  await page.waitForURL(/\/(dashboard|admin)/);
}
