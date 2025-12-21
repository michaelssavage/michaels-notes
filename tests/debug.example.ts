import { expect, test } from "@playwright/test";

test.describe("Blog debug", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page
      .locator('article[aria-labelledby^="post-title-"]')
      .first()
      .waitFor();
  });

  test("debug button click", async ({ page }) => {
    const postsButton = page.getByRole("button", { name: "Posts" });
    await expect(postsButton).toHaveAttribute("data-active", "true");

    // Take a screenshot before clicking
    await page.screenshot({ path: "before-click.png" });

    console.log("Button found:", await postsButton.count());
    console.log(
      "Initial attribute:",
      await postsButton.getAttribute("data-selected")
    );

    await postsButton.click();

    // Wait a bit and take another screenshot
    await page.waitForTimeout(1000);
    await page.screenshot({ path: "after-click.png" });

    console.log(
      "After click attribute:",
      await postsButton.getAttribute("data-selected")
    );
  });
});
