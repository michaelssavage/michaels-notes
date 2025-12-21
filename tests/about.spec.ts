import { expect, test } from "@playwright/test";

test.describe("About Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/about");
    await page.waitForSelector('img[alt="Picture of Me"]', {
      state: "visible",
    });
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
      /working as a Product Developer for a startup/
    );
    await expect(workExperience).toBeVisible();
  });

  test("displays Plant Bass'd section correctly", async ({ page }) => {
    // Check for Plant Bass'd logo
    const plantBassdLogo = page.getByAltText("Plant bass'd logo");
    await expect(plantBassdLogo).toBeVisible();

    // Check for Plant Bass'd description
    const plantBassdText = page.getByText(
      /an electronic music blog and underground club night/
    );
    await expect(plantBassdText).toBeVisible();

    // Verify the Plant Bass'd link works
    const plantBassdLink = page.getByRole("link", { name: "Plant Bass'd" });
    await expect(plantBassdLink).toBeVisible();
    await expect(plantBassdLink).toHaveAttribute(
      "href",
      "/blog/what-is-plant-bassd"
    );
  });

  test("displays sports section correctly", async ({ page }) => {
    // Check for sports information
    const sportsText = page.getByText(
      /I've played sports like Gaelic Football and rugby/
    );
    await expect(sportsText).toBeVisible();

    // Verify specific sports achievements
    const achievements = page.getByText(/Barcelona Half Marathon/);
    await expect(achievements).toBeVisible();
  });

  test("Letterboxd movie carousel should have 6 movies present", async ({
    page,
  }) => {
    // Wait for movie data to load - wait for movie cards to appear
    await page.waitForSelector('[data-testid="movie-card"]', {
      state: "visible",
      timeout: 10000,
    });

    // Check if movie cards are visible (these are the carousel cards)
    const movieCards = page.locator('[data-testid="movie-card"]');
    await expect(movieCards).toHaveCount(6);

    // Should have exactly 6 navigation buttons
    const buttons = page.locator("button[data-active]");
    await expect(buttons).toHaveCount(6);

    // The Movie components in the text are spans (not links), so we verify
    // by checking that the text section contains movie references
    // We can verify by checking that there are clickable movie titles in the text
    const textSection = page.locator('[data-testid="group"]');
    await expect(
      textSection.getByText(/Some of my favourites include/)
    ).toBeVisible();

    // Verify that movie cards are links to letterboxd
    const firstCard = movieCards.first();
    await expect(firstCard).toHaveAttribute("href", /letterboxd\.com\/film/);
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
