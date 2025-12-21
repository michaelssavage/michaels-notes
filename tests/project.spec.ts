import { expect, test } from "@playwright/test";
import { TECHNOLOGIES } from "../src/types/Post";

const reactTech = TECHNOLOGIES[0];
const springBootTech = TECHNOLOGIES[TECHNOLOGIES.length - 1];

test.describe("Projects Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/projects");
    await page.waitForSelector('div[data-testid="project-card"]', {
      state: "visible",
    });
  });

  test("should load the projects page with correct title and description", async ({
    page,
  }) => {
    await expect(page).toHaveTitle(/Projects | Michael Savage/);
    await expect(
      page.getByText("Personal development through side projects")
    ).toBeVisible();
  });

  test("should display technology filter buttons", async ({ page }) => {
    await expect(page.locator('[data-selected="false"]')).toHaveCount(4);

    const seeAllButton = page.getByRole("button", { name: "Show all" });

    await seeAllButton.click();

    const springBootBtn = page.getByRole("button", { name: springBootTech });
    await expect(springBootBtn).toBeVisible();
    await expect(springBootBtn).toBeEnabled();

    await expect(page.locator('[data-selected="false"]')).toHaveCount(
      TECHNOLOGIES.length + 1
    );
  });

  test("should filter projects when clicking technology buttons", async ({
    page,
  }) => {
    const firstTechButton = page.getByRole("button", {
      name: reactTech,
      exact: false,
    });

    await expect(firstTechButton).toHaveAttribute("data-selected", "false");

    await firstTechButton.click();

    await expect(firstTechButton).toHaveAttribute("data-selected", "true");

    await firstTechButton.click();
    await expect(firstTechButton).toHaveAttribute("data-selected", "false");
  });

  test("should display Spotify content section", async ({ page }) => {
    await expect(page.getByText("Consuming Spotify Music")).toBeVisible();

    const nowPlaying = page.getByText("Now Playing:");
    const recentlyPlayed = page.getByText("Recently Played:");
    await expect(nowPlaying.or(recentlyPlayed)).toBeVisible();

    await expect(page.getByText("Most played tracks")).toBeVisible();
  });

  test("should have working project cards", async ({ page }) => {
    await page.waitForSelector('[data-testid="project-card"]', {
      state: "visible",
    });

    const projectCards = page.locator('[data-testid="project-card"]');
    const count = await projectCards.count();
    expect(count).toBeGreaterThan(0);

    for (const card of await projectCards.all()) {
      await expect(card.getByRole("heading")).toBeVisible();
      await expect(card.getByRole("link")).toBeVisible();
    }
  });
});
