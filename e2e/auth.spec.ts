import { test, expect } from "@playwright/test";

test.describe("Authentication", () => {
  test.describe("Sign-In Page", () => {
    test("loads with email and password fields", async ({ page }) => {
      await page.goto("/auth/sign-in");

      const heading = page.locator("h1");
      await expect(heading).toBeVisible();
      await expect(heading).toContainText("Sign In");

      await expect(page.locator('input[id="email"]')).toBeVisible();
      await expect(page.locator('input[id="password"]')).toBeVisible();
      await expect(page.locator('button[type="submit"]')).toBeVisible();
    });

    test("has link to sign-up page", async ({ page }) => {
      await page.goto("/auth/sign-in");

      const signUpLink = page.locator('a[href="/auth/sign-up"]');
      await expect(signUpLink).toBeVisible();
      await expect(signUpLink).toContainText("Create one");
    });

    test("has link to forgot password page", async ({ page }) => {
      await page.goto("/auth/sign-in");

      const forgotLink = page.locator('a[href="/auth/forgot-password"]');
      await expect(forgotLink).toBeVisible();
      await expect(forgotLink).toContainText("Forgot password?");
    });
  });

  test.describe("Sign-Up Page", () => {
    test("loads with name, email, and password fields", async ({ page }) => {
      await page.goto("/auth/sign-up");

      const heading = page.locator("h1");
      await expect(heading).toBeVisible();
      await expect(heading).toContainText("Create Account");

      await expect(page.locator('input[id="name"]')).toBeVisible();
      await expect(page.locator('input[id="email"]')).toBeVisible();
      await expect(page.locator('input[id="password"]')).toBeVisible();
      await expect(page.locator('button[type="submit"]')).toBeVisible();
    });

    test("has link to sign-in page", async ({ page }) => {
      await page.goto("/auth/sign-up");

      const signInLink = page.locator('a[href="/auth/sign-in"]');
      await expect(signInLink).toBeVisible();
      await expect(signInLink).toContainText("Sign in");
    });
  });

  test.describe("Protected Routes", () => {
    test("unauthenticated user redirected from /dashboard to /auth/sign-in", async ({
      page,
    }) => {
      await page.goto("/dashboard");

      // Server-side redirect sends unauthenticated users to sign-in
      await page.waitForURL(/\/auth\/sign-in/);
      expect(page.url()).toContain("/auth/sign-in");
    });

    test("unauthenticated user redirected from /admin to /auth/sign-in", async ({
      page,
    }) => {
      await page.goto("/admin");

      // Server-side redirect sends unauthenticated users to sign-in
      await page.waitForURL(/\/auth\/sign-in/);
      expect(page.url()).toContain("/auth/sign-in");
    });
  });
});
