import { test, expect } from '@playwright/test';

// Base URL for local dev server or deployed site
const BASE_URL = process.env.BASE_URL || 'http://localhost:4028';

// Helper to log in
async function login(page) {
  await page.goto(`${BASE_URL}/login`);
  await page.fill('input[name="email"]', 'installationsoftware333@gmail.com');
  await page.fill('input[name="password"]', 'gonthilla');
  await page.click('button[type="submit"]');
  // Wait for navigation after login, assuming redirect to dashboard
  await page.waitForURL('**/dashboard');
}

test.describe('REFLY end‑to‑end flow', () => {
  test('Home page loads and navigation to collections works', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle(/Refly/i);
    // Click a navigation link to collections – adjust selector if needed
    await page.click('a[href="/collections"]');
    await expect(page).toHaveURL(/\/collections/);
  });

  test('User can log in and reach dashboard', async ({ page }) => {
    await login(page);
    await expect(page).toHaveURL(/\/dashboard/);
    // Verify a greeting or known element exists on the dashboard
    await expect(page.locator('text=Welcome')).toBeVisible();
  });

  test('Add a product to the cart and view cart drawer', async ({ page }) => {
    await page.goto(BASE_URL);
    // Assume first product card has a button with data-test-id="add-to-cart"
    const addButton = page.locator('[data-test-id="add-to-cart"]').first();
    await addButton.click();
    // Open the cart drawer – assume button with aria-label="Cart"
    await page.click('button[aria-label="Cart"]');
    // Verify the cart drawer shows an item
    await expect(page.locator('.cart-item')).toBeVisible();
  });

  test('Add and then remove an item from wishlist', async ({ page }) => {
    await page.goto(BASE_URL);
    // Assume wishlist button has data-test-id="add-to-wishlist"
    const wishlistBtn = page.locator('[data-test-id="add-to-wishlist"]').first();
    await wishlistBtn.click();
    // Navigate to wishlist page
    await page.click('a[href="/wishlist"]');
    await expect(page).toHaveURL(/\/wishlist/);
    const wishItem = page.locator('.wishlist-item');
    await expect(wishItem).toBeVisible();
    // Remove from wishlist – assume a button inside the item
    await wishItem.locator('[data-test-id="remove-from-wishlist"]').click();
    await expect(wishItem).not.toBeVisible();
  });
});
