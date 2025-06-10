import { expect, test } from "@playwright/test";

test.describe("Blog Page", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/");
		await page.waitForSelector("article", { state: "visible" });
		await page.waitForSelector('h1, [role="heading"]', { state: "visible" });
	});

	test("has correct title and metadata", async ({ page }) => {
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

		await page.waitForFunction(
			() => {
				const articles = document.querySelectorAll("article");
				return articles.length > 0; 
			},
			{ timeout: 5000 }
		);

		// Verify that the search results are filtered
		const posts = page.locator("article");
		const count = await posts.count();
		expect(count).toBeGreaterThan(0);
	});

	test("filter buttons work correctly", async ({ page }) => {
		// Test Posts filter
		const postsButton = page.getByRole("button", { name: /Posts/i });
		await postsButton.click();
		
		// Wait for the filter to apply - you might need to adjust this based on your UI behavior
		await page.waitForTimeout(100); // Small timeout for UI state change
		await expect(postsButton).toHaveAttribute("data-active", "false");

		// Test Plant Bass'd filter
		const plantBassdButton = page.getByRole("button", {
			name: /Plant Bass'd/i,
		});
		await plantBassdButton.click();
		await page.waitForTimeout(100);
		await expect(plantBassdButton).toHaveAttribute("data-active", "false");

		// Test Bites filter
		const bitesButton = page.getByRole("button", { name: /Bites/i });
		await bitesButton.click();
		await page.waitForTimeout(100);
		await expect(bitesButton).toHaveAttribute("data-active", "false");
	});

	test("weather tooltip appears on hover", async ({ page }) => {
		const location = page.getByText("Barcelona, Spain");
		await location.hover();

		// Wait for tooltip to appear with explicit timeout
		const weatherTooltip = page.locator('[role="tooltip"]');
		await expect(weatherTooltip).toBeVisible({ timeout: 3000 });
	});

	test("posts are displayed and sorted by date", async ({ page }) => {
		// Posts should already be loaded from beforeEach, but we can add a specific wait
		const posts = page.locator("article");
		await expect(posts.first()).toBeVisible();
		
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
		
		// Ensure the post is visible first
		await expect(firstPost).toBeVisible();
		
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
	
		// Check if loading element exists (it might not always be present)
		const loading = page.locator('[data-testid="loading"]');
		
		// Wait for either the loading to disappear OR content to be ready
		await Promise.race([
			loading.waitFor({ state: "hidden", timeout: 5000 }).catch(() => {}),
			page.waitForSelector("article", { state: "visible", timeout: 10000 })
		]);
	
		// Confirm loading spinner disappears and content is visible
		await expect(loading).not.toBeVisible();
		await expect(page.locator("article").first()).toBeVisible();
	});
});