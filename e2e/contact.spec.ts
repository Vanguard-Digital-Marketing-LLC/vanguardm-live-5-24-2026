import { test, expect } from "@playwright/test";

test.describe("Contact Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  test("loads with form fields (name, email, message)", async ({ page }) => {
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
    await expect(heading).toContainText("Great");

    // Required fields
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
  });

  test("required field validation works (HTML5)", async ({ page }) => {
    // The name, email, and message fields are all marked with `required`.
    // Attempting to submit with empty fields triggers browser-native validation.
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // Should still be on the contact page — browser prevented submission
    await expect(page).toHaveURL(/\/contact/);

    // Verify the name field reports invalid via HTML5 constraint validation API
    const nameInvalid = await page.locator('input[name="name"]').evaluate(
      (el: HTMLInputElement) => !el.validity.valid
    );
    expect(nameInvalid).toBe(true);

    // Fill name, leave email empty, try again
    await page.fill('input[name="name"]', "Test User");
    await submitButton.click();

    const emailInvalid = await page.locator('input[name="email"]').evaluate(
      (el: HTMLInputElement) => !el.validity.valid
    );
    expect(emailInvalid).toBe(true);
  });

  test("phone number link exists", async ({ page }) => {
    const phoneLink = page.locator('a[href="tel:+19363586500"]');
    await expect(phoneLink.first()).toBeVisible();
    await expect(phoneLink.first()).toContainText("(936) 358-6500");
  });

  test("submit button is present with correct text", async ({ page }) => {
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toContainText("Send Message");
  });

  test("optional fields are present (phone, company, service)", async ({ page }) => {
    await expect(page.locator('input[name="phone"]')).toBeVisible();
    await expect(page.locator('input[name="company"]')).toBeVisible();
    await expect(page.locator('select[name="service"]')).toBeVisible();
  });
});
