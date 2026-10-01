import { test, expect } from "@playwright/test";

test("home page opens", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("CV");
});
