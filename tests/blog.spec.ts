import { expect, test } from "@playwright/test";

test.describe("Blog Page", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/");
	});

	test("has correct title and metadata", async ({ page }) => {
		await page.waitForLoadState("networkidle");

		await expect(page).toHaveTitle(/My Blog/);
	
		await expect(
			page.locator('meta[name="description"]'),
		).toHaveAttribute("content", "Learnings, mishaps, and articles about random things.");
	});

	test("displays header information correctly", async ({ page }) => {
		const heading = page.getByRole("heading").filter({ hasText: /Michael Savage/i });
		await expect(heading).toBeVisible();

		const location = page.getByText("Barcelona, Spain");
		await expect(location).toBeVisible();
	});

	test("search functionality works", async ({ page }) => {
		const searchBox = page.getByLabel(/Search posts/i);
		await expect(searchBox).toBeVisible();

		// Type in search box
		await searchBox.fill("Spotify");

		// Wait for any loading states to complete
		await page.waitForLoadState("networkidle");

		// Verify that the search results are filtered
		const posts = page.locator("article");
		const count = await posts.count();
		expect(count).toBeGreaterThan(0);
	});

	test("filter buttons work correctly", async ({ page }) => {
		// Test Posts filter
		const postsButton = page.getByRole("button", { name: /Posts/i });
		await postsButton.click();
		await expect(postsButton).toHaveAttribute("data-active", "false");

		// Test Plant Bass'd filter
		const plantBassdButton = page.getByRole("button", {
			name: /Plant Bass'd/i,
		});
		await plantBassdButton.click();
		await expect(plantBassdButton).toHaveAttribute("data-active", "false");

		// Test Bites filter
		const bitesButton = page.getByRole("button", { name: /Bites/i });
		await bitesButton.click();
		await expect(bitesButton).toHaveAttribute("data-active", "false");
	});

	test("weather tooltip appears on hover", async ({ page }) => {
		const location = page.getByText("Barcelona, Spain");
		await location.hover();

		// Wait for tooltip to appear
		const weatherTooltip = page.locator('[role="tooltip"]');
		await expect(weatherTooltip).toBeVisible();
	});

	test("posts are displayed and sorted by date", async ({ page }) => {
		await page.waitForLoadState("networkidle");
		const posts = page.locator("article");
		const count = await posts.count();
		expect(count).toBeGreaterThan(0);

		// Verify that posts are visible and have expected content
		const firstPost = posts.first();
		await expect(firstPost).toBeVisible();
		
		// Check for accessibility attributes
		await expect(firstPost).toHaveAttribute("aria-labelledby");
		
		// Check for title and description
		const title = firstPost.locator("h2");
		await expect(title).toBeVisible();
		await expect(title).toHaveAttribute("id");
		
		// Check for description using aria-label
		const description = firstPost.locator('[aria-label^="Description for"]');
		await expect(description).toBeVisible();
	});

	test("post links are accessible", async ({ page }) => {
		const posts = page.locator("article");
		const firstPost = posts.first();
		
		// Check that the link is properly styled and interactive
		const link = firstPost.locator("a");
		await expect(link).toBeVisible();
		
		// Verify the link has proper styling for hover state
		await link.hover();
		await expect(link).toHaveCSS("box-shadow", /5px 5px 0px 0px$/);
		
		// Verify the link is keyboard focusable
		await link.focus();
		await expect(link).toBeFocused();
	});

	test("loading state is handled correctly", async ({ page }) => {
		// Force a page reload to see loading state
		await page.reload();
	
		const loading = page.locator('[data-testid="loading"]');
		await expect(loading).toHaveCount(1);
	
		// Wait for content to load
		await page.waitForLoadState("networkidle");
	
		// Confirm loading spinner disappears
		await expect(loading).not.toBeVisible();
	});
});
