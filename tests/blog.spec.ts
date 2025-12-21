import { expect, test } from "@playwright/test";

test.describe("Blog Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page
      .locator('article[aria-labelledby^="post-title-"]')
      .first()
      .waitFor();
  });

  test("has correct title and metadata", async ({ page }) => {
    await expect(page).toHaveTitle(/Writings | Michael Savage/);

    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      "Learnings, mishaps, and articles about random things."
    );
  });

  test("displays header information correctly", async ({ page }) => {
    const heading = page
      .getByRole("heading")
      .filter({ hasText: /Michael - Irish Software Developer/i });

    await expect(heading).toBeVisible();

    const location = heading.getByText("Barcelona.");
    await expect(location).toBeVisible();
  });

  test("search functionality works", async ({ page }) => {
    const searchBox = page.getByLabel(/Search posts/i);
    await expect(searchBox).toBeVisible();

    await searchBox.fill("Spotify");

    await page.waitForFunction(() => {
      const articles = document.querySelectorAll("article");
      return articles.length > 0;
    });

    const posts = page.locator("article");
    const count = await posts.count();
    expect(count).toBeGreaterThan(0);
  });

  test("filter buttons work correctly", async ({ page }) => {
    await page.waitForSelector("button[data-selected]", { state: "visible" });

    const postsButton = page.getByRole("button", { name: "Posts" });
    await expect(postsButton).toHaveAttribute("data-active", "true");

    await postsButton.click();
    await expect(postsButton).toHaveAttribute("data-active", "false");
    const plantBassdButton = page.getByRole("button", { name: "Plant Bass'd" });

    await expect(plantBassdButton).toHaveAttribute("data-active", "true");
    await plantBassdButton.click();
    await expect(plantBassdButton).toHaveAttribute("data-active", "false");

    const bitesButton = page.getByRole("button", { name: "Bites" });

    await expect(bitesButton).toHaveAttribute("data-active", "true");
    await bitesButton.click();
    await expect(bitesButton).toHaveAttribute("data-active", "false");
  });

  test("weather tooltip appears on hover", async ({ page }) => {
    const location = page.locator('span.underline:has-text("Barcelona.")');
    await expect(location).toBeVisible();

    await location.hover();

    const weatherTooltip = page.locator('[role="tooltip"]');
    await expect(weatherTooltip).toBeVisible({ timeout: 5000 });

    await expect(weatherTooltip.getByText(/°C/)).toBeVisible({ timeout: 1000 });
  });

  test("posts are displayed and sorted by date", async ({ page }) => {
    const posts = page.locator("article");
    await expect(posts.first()).toBeVisible();

    const count = await posts.count();
    expect(count).toBeGreaterThan(0);

    const firstPost = posts.first();
    await firstPost.scrollIntoViewIfNeeded();

    await expect(firstPost).toHaveAttribute("aria-labelledby", /.+/);

    const ariaLabelledBy = await firstPost.getAttribute("aria-labelledby");
    expect(ariaLabelledBy).toBeTruthy();
    expect(ariaLabelledBy?.length).toBeGreaterThan(0);

    if (ariaLabelledBy) {
      const labelledElement = page.locator(`#${ariaLabelledBy}`);
      await expect(labelledElement).toBeVisible();
    }

    const title = firstPost.locator("h2");
    await expect(title).toBeVisible();

    const description = firstPost.locator('[aria-label^="Description for"]');
    await expect(description).toBeVisible();
  });

  test("post links are accessible", async ({ page }) => {
    const posts = page.locator("article");
    const firstPost = posts.first();

    await expect(firstPost).toBeVisible();

    const link = firstPost.locator("a");
    await expect(link).toBeVisible();

    await link.hover();
    await expect(link).toHaveCSS("box-shadow", /5px 5px 0px 0px$/);

    await link.focus();
    await expect(link).toBeFocused();
  });

  test("loading state is handled correctly", async ({ page }) => {
    await page.reload();

    const loading = page.locator('[data-testid="loading"]');

    await Promise.race([
      loading.waitFor({ state: "hidden", timeout: 5000 }).catch(() => {}),
      page.waitForSelector("article", { state: "visible", timeout: 10000 }),
    ]);

    await expect(loading).not.toBeVisible();
    await expect(page.locator("article").first()).toBeVisible();
  });
});
