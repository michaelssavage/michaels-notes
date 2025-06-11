import { test, expect } from '@playwright/test';
import { TECHNOLOGIES } from '../src/types/Post';

test.describe('Projects Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/projects');
    await page.waitForSelector('p[data-testid="projects-description"]', { state: 'visible' });
  });

  test('should load the projects page with correct title and description', async ({ page }) => {
    await expect(page).toHaveTitle(/My Projects/);
    await expect(page.getByText('Personal development, work, code challenges, and university projects.')).toBeVisible();
  });

  test('should display technology filter buttons', async ({ page }) => {
    const techButtons = page.locator('[data-selected="false"]');
    await expect(techButtons).toHaveCount(TECHNOLOGIES.length);
    
    // Verify first and last technology buttons are clickable
    const reactTech = TECHNOLOGIES[0];
    const springBootTech = TECHNOLOGIES[TECHNOLOGIES.length -1];
    
    const reactBtn = page.getByRole('button', { name: reactTech });
    await expect(reactBtn).toBeVisible();
    await expect(reactBtn).toBeEnabled();

    const springBootBtn = page.getByRole('button', { name: springBootTech });
    await expect(springBootBtn).toBeVisible();
    await expect(springBootBtn).toBeEnabled();
  });

  test('should filter projects when clicking technology buttons', async ({ page }) => {
    // Click a technology button
    const firstTechButton = page.locator('button[data-active="false"]').first();
    await firstTechButton.click();

    // Verify the button is selected
    await expect(firstTechButton).toHaveAttribute('data-selected', 'true');

    // Click the same button again to deselect
    await firstTechButton.click();
    await expect(firstTechButton).toHaveAttribute('data-selected', 'false');
  });

  test('should display Spotify content section', async ({ page }) => {
    await expect(page.getByText('Consuming Spotify Data')).toBeVisible();
    
    // Check that either "Now Playing" or "Recently Played" is visible
    const nowPlaying = page.getByText('Now Playing:');
    const recentlyPlayed = page.getByText('Recently Played:');
    await expect(nowPlaying.or(recentlyPlayed)).toBeVisible();
    
    await expect(page.getByText('Most played tracks')).toBeVisible();
  });

  test('should have working project cards', async ({ page }) => {
    const projectCards = page.locator('[data-testid="project-card"]');
    const count = await projectCards.count();
    expect(count).toBeGreaterThan(0);
    
    // Verify each project card has required elements
    for (const card of await projectCards.all()) {
      await expect(card.getByRole('heading')).toBeVisible();
      await expect(card.getByRole('link')).toBeVisible();
    }
  });
});
