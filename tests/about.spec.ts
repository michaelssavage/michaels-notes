import { expect, test } from "@playwright/test";

test.describe("About Page", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/about");
		await page.waitForSelector('img[alt="Picture of Me"]', { state: "visible" });
	});

	test("displays personal information section correctly", async ({ page }) => {
		// Check for profile image
		const profileImage = page.getByAltText("Picture of Me");
		await expect(profileImage).toBeVisible();

		// Check for personal description
		const personalText = page.getByText(/Studied Computer Applications in DCU/);
		await expect(personalText).toBeVisible();

		// Verify work experience is mentioned
		const workExperience = page.getByText(
			/Talentbait in the heart of Barcelona/,
		);
		await expect(workExperience).toBeVisible();
	});

	test("displays Plant Bass'd section correctly", async ({ page }) => {
		// Check for Plant Bass'd logo
		const plantBassdLogo = page.getByAltText("Plant bass'd logo");
		await expect(plantBassdLogo).toBeVisible();

		// Check for Plant Bass'd description
		const plantBassdText = page.getByText(/I co-created Plant Bass'd/);
		await expect(plantBassdText).toBeVisible();

		// Verify the Plant Bass'd link works
		const plantBassdLink = page.getByRole("link", { name: "Plant Bass'd" });
		await expect(plantBassdLink).toBeVisible();
		await expect(plantBassdLink).toHaveAttribute(
			"href",
			"/blog/what-is-plant-bassd",
		);
	});

	test("displays sports section correctly", async ({ page }) => {
		// Check for sports information
		const sportsText = page.getByText(
			/I've played sports like Gaelic Football and rugby/,
		);
		await expect(sportsText).toBeVisible();

		// Verify specific sports achievements
		const achievements = page.getByText(/Barcelona Half Marathon/);
		await expect(achievements).toBeVisible();
	});

	test("Letterboxd movie carousel should have 4 movies present", async ({ page }) => {
		// Wait for movie data to load
		await page.waitForLoadState("networkidle");

		// Check if movie cards are visible
		const movieCards = page.locator('[data-testid="movie-card"]');
		await expect(movieCards).toHaveCount(4);
		
		// Should have exactly 4 navigation buttons
		const buttons = page.locator('button[data-active]');
		await expect(buttons).toHaveCount(4);
		
		// Should have exactly 4 movie links in the text
		const movieAnchors = page.locator('a[href*="letterboxd.com/film"]:not([data-testid="movie-card"])');
		await expect(movieAnchors).toHaveCount(4);
	});

	test("section styling and layout", async ({ page }) => {
		// Check if sections have correct background colors
		const sections = page.locator("section");
		await expect(sections).toHaveCount(4);

		// Verify responsive layout
		const groupElements = page.locator('[data-testid="group"]');
		await expect(groupElements).toBeVisible();
	});
});
