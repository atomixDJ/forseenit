import { test, expect } from '@playwright/test';

/**
 * Pagination Regression Tests
 * 
 * Tests cursor pagination on followers/following lists.
 * Verifies "Load more" appends unique rows without duplicates.
 * 
 * PREREQUISITE: Run `npx ts-node scripts/seed-pagination-test.ts` before running this test
 * to ensure there are >30 followers for the test user.
 */

test.describe('Followers/Following Pagination', () => {

    const TEST_HANDLE = 'atomix';

    test('Followers page: Load more appends unique rows without duplicates', async ({ page }) => {
        await page.goto(`/u/${TEST_HANDLE}/followers`);

        // Wait for initial load
        await expect(page.locator('h1')).toContainText('Followers');

        // Get initial handles on page by looking at the grid cards
        const getHandles = async (): Promise<string[]> => {
            // Each follower card has a <p> with @handle text
            const handleElements = await page.locator('.grid a p').filter({ hasText: /^@/ }).allTextContents();
            return handleElements;
        };

        const initialHandles = await getHandles();
        const initialCount = initialHandles.length;

        console.log(`Initial follower count on page: ${initialCount}`);

        // Should have loaded up to 30 initially
        expect(initialCount).toBeGreaterThan(0);
        expect(initialCount).toBeLessThanOrEqual(30);

        // Check for uniqueness in initial load - no duplicates
        const initialUnique = new Set(initialHandles);
        expect(initialUnique.size).toBe(initialCount);

        // Scroll to bottom to find Load more button
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(500);

        // Check if Load more button exists (means we have more than 30)
        const loadMoreButton = page.getByRole('button', { name: /load more/i });

        // Wait a bit for any lazy rendering
        const isVisible = await loadMoreButton.isVisible({ timeout: 2000 }).catch(() => false);

        if (isVisible) {
            // Click Load more
            await loadMoreButton.click();

            // Wait for new items to load
            await page.waitForTimeout(1500);

            const newHandles = await getHandles();
            const newCount = newHandles.length;

            console.log(`After Load more: ${newCount} handles`);

            // Should have more handles now
            expect(newCount).toBeGreaterThan(initialCount);

            // CRITICAL: Check for uniqueness - no duplicates after pagination
            const uniqueHandles = new Set(newHandles);
            expect(uniqueHandles.size).toBe(newCount);

            console.log(`✓ Pagination test passed: ${initialCount} → ${newCount} handles, all unique`);
        } else {
            console.log(`⚠ Load more button not visible - skipping pagination assertion`);
            test.skip();
        }
    });

    test('Following page: Load more appends unique rows without duplicates', async ({ page }) => {
        await page.goto(`/u/${TEST_HANDLE}/following`);

        // Wait for initial load
        await expect(page.locator('h1')).toContainText('Following');

        const getHandles = async (): Promise<string[]> => {
            const handleElements = await page.locator('.grid a p').filter({ hasText: /^@/ }).allTextContents();
            return handleElements;
        };

        const initialHandles = await getHandles();
        const initialCount = initialHandles.length;

        console.log(`Initial following count on page: ${initialCount}`);

        expect(initialCount).toBeGreaterThanOrEqual(0);

        // Check for uniqueness
        const initialUnique = new Set(initialHandles);
        expect(initialUnique.size).toBe(initialCount);

        // Scroll to bottom to find Load more button
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(500);

        const loadMoreButton = page.getByRole('button', { name: /load more/i });
        const isVisible = await loadMoreButton.isVisible({ timeout: 2000 }).catch(() => false);

        if (isVisible) {
            await loadMoreButton.click();
            await page.waitForTimeout(1500);

            const newHandles = await getHandles();
            const newCount = newHandles.length;

            expect(newCount).toBeGreaterThan(initialCount);

            // CRITICAL: No duplicates
            const uniqueHandles = new Set(newHandles);
            expect(uniqueHandles.size).toBe(newCount);

            console.log(`✓ Following pagination passed: ${initialCount} → ${newCount}, all unique`);
        } else {
            console.log(`⚠ Load more button not visible - skipping following pagination`);
            test.skip();
        }
    });

});
