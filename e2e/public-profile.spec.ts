import { test, expect } from '@playwright/test';

/**
 * Public Profile Identity Tests
 * 
 * Regression tests for /u/{handle} public profile.
 * Ensures handle-based identity and social counts remain functional.
 */

test.describe('Public Profile (/u/handle) - Identity & Social', () => {

    // Use the known test handle from the backfill (can be updated as needed)
    const TEST_HANDLE = 'atomix';

    test('Public profile page loads with correct handle in header', async ({ page }) => {
        await page.goto(`/u/${TEST_HANDLE}`);

        // Page should load without redirect to login
        await expect(page).toHaveURL(`/u/${TEST_HANDLE}`);

        // Should display the handle in the header (looking for @atomix text)
        const handleHeader = page.locator('h1');
        await expect(handleHeader).toContainText(`@${TEST_HANDLE}`);
    });

    test('Public profile shows follower and following counts', async ({ page }) => {
        await page.goto(`/u/${TEST_HANDLE}`);

        // Check for "followers" text (counts may vary, but the label must be present)
        await expect(page.getByText(/followers/i)).toBeVisible();

        // Check for "following" text
        await expect(page.getByText(/following/i)).toBeVisible();
    });

    test('Public profile has Top Ten section', async ({ page }) => {
        await page.goto(`/u/${TEST_HANDLE}`);

        // Top Ten section should be visible
        await expect(page.getByText(/top ten/i)).toBeVisible();
    });

    test('Non-existent handle returns 404', async ({ page }) => {
        const response = await page.goto('/u/this-handle-does-not-exist-12345');

        // Should return 404 status
        expect(response?.status()).toBe(404);
    });

    test('Public profile accessible in incognito (no auth required)', async ({ browser }) => {
        // Create a fresh context with no cookies/auth
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto(`/u/${TEST_HANDLE}`);

        // Should load the profile, not redirect to login
        await expect(page).toHaveURL(`/u/${TEST_HANDLE}`);
        await expect(page.locator('h1')).toContainText(`@${TEST_HANDLE}`);

        await context.close();
    });

});

test.describe('Followers List (/u/handle/followers)', () => {

    const TEST_HANDLE = 'atomix';

    test('Followers page loads with correct structure', async ({ page }) => {
        await page.goto(`/u/${TEST_HANDLE}/followers`);

        // Page should load
        await expect(page).toHaveURL(`/u/${TEST_HANDLE}/followers`);

        // Should have "Followers" heading
        await expect(page.locator('h1')).toContainText('Followers');

        // Should have back link to profile
        await expect(page.getByText(`Back to @${TEST_HANDLE}`)).toBeVisible();
    });

    test('Followers page shows count in subtitle', async ({ page }) => {
        await page.goto(`/u/${TEST_HANDLE}/followers`);

        // Should show "X people follow @handle" or "X person follows @handle"
        await expect(page.getByText(/follow.*@/i)).toBeVisible();
    });

    test('Follower count on profile is clickable and navigates to followers page', async ({ page }) => {
        await page.goto(`/u/${TEST_HANDLE}`);

        // Click on followers link
        await page.getByText(/followers/i).first().click();

        // Should navigate to followers page
        await expect(page).toHaveURL(`/u/${TEST_HANDLE}/followers`);
    });

});

test.describe('Following List (/u/handle/following)', () => {

    const TEST_HANDLE = 'atomix';

    test('Following page loads with correct structure', async ({ page }) => {
        await page.goto(`/u/${TEST_HANDLE}/following`);

        // Page should load
        await expect(page).toHaveURL(`/u/${TEST_HANDLE}/following`);

        // Should have "Following" heading
        await expect(page.locator('h1')).toContainText('Following');

        // Should have back link to profile
        await expect(page.getByText(`Back to @${TEST_HANDLE}`)).toBeVisible();
    });

    test('Following page shows count in subtitle', async ({ page }) => {
        await page.goto(`/u/${TEST_HANDLE}/following`);

        // Should show "@handle follows X people" or "@handle follows X person"
        await expect(page.getByText(/@.*follows/i)).toBeVisible();
    });

    test('Following count on profile is clickable and navigates to following page', async ({ page }) => {
        await page.goto(`/u/${TEST_HANDLE}`);

        // Click on following link (not followers)
        await page.getByText(/following/i).first().click();

        // Should navigate to following page
        await expect(page).toHaveURL(`/u/${TEST_HANDLE}/following`);
    });

    test('Following page accessible in incognito (no auth required)', async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto(`/u/${TEST_HANDLE}/following`);

        // Should load the page, not redirect to login
        await expect(page).toHaveURL(`/u/${TEST_HANDLE}/following`);
        await expect(page.locator('h1')).toContainText('Following');

        await context.close();
    });

});
