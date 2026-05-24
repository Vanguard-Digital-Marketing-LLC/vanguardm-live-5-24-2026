import { test, expect, Page } from "@playwright/test";

const TEST_CLIENT_NAME = "E2E Portal Test Client";
const TEST_USER_EMAIL = "e2e-portal-test@vanguardm.com";
const TEST_USER_PASSWORD = "E2eTestPortal2026";

// Direct IP for API calls (bypasses Cloudflare)
const API_BASE = process.env.E2E_API_BASE || "http://127.0.0.1:3000";
const E2E_SECRET = process.env.E2E_SECRET || "e2e-test-secret";

let clientId: string;
let userId: string;

// Run all phases serially — they share the same test client
test.describe.configure({ mode: "serial" });

// ── Phase 1: Test onboarding redirect (user NOT onboarded) ──────────
test.describe("Client Portal — Onboarding", () => {
  test.beforeAll(async () => {
    const res = await fetch(`${API_BASE}/api/e2e/portal-setup`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-e2e-secret": E2E_SECRET },
      body: JSON.stringify({
        clientName: TEST_CLIENT_NAME,
        email: TEST_USER_EMAIL,
        password: TEST_USER_PASSWORD,
        // portalOnboarded: false (default)
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(`Setup failed: ${JSON.stringify(data)}`);
    clientId = data.clientId;
    userId = data.userId;
  });

  test("unonboarded client redirects to /portal/onboarding", async ({ page }) => {
    await loginAsClient(page);
    await page.waitForURL("**/portal/onboarding", { timeout: 15000 });
    expect(page.url()).toContain("/portal/onboarding");

    // Verify onboarding page has the Get Started button
    const btn = page.locator('button:has-text("Get Started")');
    await btn.scrollIntoViewIfNeeded();
    await expect(btn).toBeVisible();
  });
});

// ── Phase 2: Test full portal flow (user already onboarded) ─────────
test.describe("Client Portal — Full Flow", () => {
  test.beforeAll(async () => {
    // Recreate user with portalOnboarded: true
    const res = await fetch(`${API_BASE}/api/e2e/portal-setup`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-e2e-secret": E2E_SECRET },
      body: JSON.stringify({
        clientName: TEST_CLIENT_NAME,
        email: TEST_USER_EMAIL,
        password: TEST_USER_PASSWORD,
        onboard: true,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(`Setup failed: ${JSON.stringify(data)}`);
    clientId = data.clientId;
    userId = data.userId;
  });

  test.afterAll(async () => {
    if (clientId) {
      await fetch(`${API_BASE}/api/e2e/portal-teardown`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-e2e-secret": E2E_SECRET },
        body: JSON.stringify({ clientId, userId }),
      });
    }
  });

  test("sign in goes to portal dashboard", async ({ page }) => {
    await loginAsClient(page);
    await page.waitForURL(/\/portal(?!\/onboarding)/, { timeout: 15000 });
    await expect(page.locator("text=Dashboard").first()).toBeVisible({ timeout: 5000 });
    await expect(page.locator("text=Active Projects").first()).toBeVisible({ timeout: 5000 });
  });

  test("create a support ticket", async ({ page }) => {
    await loginAsClient(page);
    await page.goto("/portal/tickets");

    const newTicketBtn = page.locator('a:has-text("New Ticket"), button:has-text("New Ticket"), a:has-text("Create Ticket"), a:has-text("Create your first ticket")').first();
    await expect(newTicketBtn).toBeVisible({ timeout: 5000 });
    await newTicketBtn.click();

    await page.waitForURL("**/portal/tickets/new", { timeout: 5000 });

    await page.fill('input[name="title"], input[id="title"]', "E2E Test Ticket");
    await page.fill('textarea[name="description"], textarea[id="description"]', "This is an automated E2E test ticket.");

    const prioritySelect = page.locator('select[name="priority"], select[id="priority"]');
    if (await prioritySelect.isVisible({ timeout: 1000 }).catch(() => false)) {
      await prioritySelect.selectOption("LOW");
    }

    await page.click('button[type="submit"]');
    await page.waitForURL(/\/portal\/tickets/, { timeout: 10000 });
    await expect(page.locator("text=E2E Test Ticket").first()).toBeVisible({ timeout: 5000 });
  });

  test("send a message", async ({ page }) => {
    await loginAsClient(page);
    await page.goto("/portal/messages");

    const messageInput = page.locator('textarea[name="content"], textarea[placeholder*="message"], input[name="content"]').first();
    await expect(messageInput).toBeVisible({ timeout: 5000 });
    await messageInput.fill("E2E test message from portal");

    const sendBtn = page.locator('button[type="submit"], button:has-text("Send")').first();
    await sendBtn.click();

    await expect(page.locator("text=E2E test message from portal").first()).toBeVisible({ timeout: 5000 });
  });

  test("all portal pages return 200", async ({ page }) => {
    await loginAsClient(page);

    const portalPages = [
      "/portal",
      "/portal/projects",
      "/portal/tickets",
      "/portal/messages",
      "/portal/approvals",
      "/portal/invoices",
      "/portal/settings",
    ];

    for (const path of portalPages) {
      const res = await page.goto(path);
      const status = res?.status() ?? 0;
      expect(
        [200, 307, 308].includes(status),
        `${path} returned ${status}`
      ).toBeTruthy();
    }
  });
});

async function loginAsClient(page: Page) {
  await page.goto("/auth/sign-in");
  await page.fill('input[id="email"]', TEST_USER_EMAIL);
  await page.fill('input[id="password"]', TEST_USER_PASSWORD);
  // Wait for Turnstile timeout fallback (form allows submit after 3s)
  await page.waitForTimeout(3500);
  await page.click('button[type="submit"]');
  // Wait for navigation away from sign-in page
  await page.waitForURL(/\/portal/, { timeout: 15000 });
}
