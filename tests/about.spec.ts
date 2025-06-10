import { expect, test } from "@playwright/test";

test.skip("About Page", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("https://michaelsavage.ie/about");
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

	test("displays Letterboxd section correctly", async ({ page }) => {
		// Check for Letterboxd content
		const letterboxdText = page.getByText(/I love movies!/);
		await expect(letterboxdText).toBeVisible();

		// Check for movie links if they exist
		const movieLinks = page.getByRole("link", {
			name: /Amélie|Y Tu Mamá También|Aftersun|Sexy Beast/,
		});
		await expect(movieLinks).toBeVisible();
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

	test("Letterboxd movie carousel functionality", async ({ page }) => {
		// Wait for movie data to load
		await page.waitForLoadState("networkidle");

		// Check if movie cards are visible
		const movieCards = page.locator('[data-testid="movie-card"]');
		const count = await movieCards.count();

		if (count > 0) {
			// Test navigation buttons
			const navigationButtons = page.locator("button");
			await expect(navigationButtons).toHaveCount(count);

			// Click first button and verify active state
			await navigationButtons.first().click();
			await expect(navigationButtons.first()).toHaveAttribute(
				"data-active",
				"true",
			);

			// Click second button and verify active state changes
			await navigationButtons.nth(1).click();
			await expect(navigationButtons.nth(1)).toHaveAttribute(
				"data-active",
				"true",
			);
		}
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
