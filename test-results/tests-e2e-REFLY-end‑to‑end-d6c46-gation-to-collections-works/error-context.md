# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\e2e.spec.ts >> REFLY end‑to‑end flow >> Home page loads and navigation to collections works
- Location: tests\e2e.spec.ts:17:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "http://localhost:4028/", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | // Base URL for local dev server or deployed site
  4  | const BASE_URL = process.env.BASE_URL || 'http://localhost:4028';
  5  | 
  6  | // Helper to log in
  7  | async function login(page) {
  8  |   await page.goto(`${BASE_URL}/login`);
  9  |   await page.fill('input[name="email"]', 'installationsoftware333@gmail.com');
  10 |   await page.fill('input[name="password"]', 'gonthilla');
  11 |   await page.click('button[type="submit"]');
  12 |   // Wait for navigation after login, assuming redirect to dashboard
  13 |   await page.waitForURL('**/dashboard');
  14 | }
  15 | 
  16 | test.describe('REFLY end‑to‑end flow', () => {
  17 |   test('Home page loads and navigation to collections works', async ({ page }) => {
> 18 |     await page.goto(BASE_URL);
     |                ^ Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
  19 |     await expect(page).toHaveTitle(/Refly/i);
  20 |     // Click a navigation link to collections – adjust selector if needed
  21 |     await page.click('a[href="/collections"]');
  22 |     await expect(page).toHaveURL(/\/collections/);
  23 |   });
  24 | 
  25 |   test('User can log in and reach dashboard', async ({ page }) => {
  26 |     await login(page);
  27 |     await expect(page).toHaveURL(/\/dashboard/);
  28 |     // Verify a greeting or known element exists on the dashboard
  29 |     await expect(page.locator('text=Welcome')).toBeVisible();
  30 |   });
  31 | 
  32 |   test('Add a product to the cart and view cart drawer', async ({ page }) => {
  33 |     await page.goto(BASE_URL);
  34 |     // Assume first product card has a button with data-test-id="add-to-cart"
  35 |     const addButton = page.locator('[data-test-id="add-to-cart"]').first();
  36 |     await addButton.click();
  37 |     // Open the cart drawer – assume button with aria-label="Cart"
  38 |     await page.click('button[aria-label="Cart"]');
  39 |     // Verify the cart drawer shows an item
  40 |     await expect(page.locator('.cart-item')).toBeVisible();
  41 |   });
  42 | 
  43 |   test('Add and then remove an item from wishlist', async ({ page }) => {
  44 |     await page.goto(BASE_URL);
  45 |     // Assume wishlist button has data-test-id="add-to-wishlist"
  46 |     const wishlistBtn = page.locator('[data-test-id="add-to-wishlist"]').first();
  47 |     await wishlistBtn.click();
  48 |     // Navigate to wishlist page
  49 |     await page.click('a[href="/wishlist"]');
  50 |     await expect(page).toHaveURL(/\/wishlist/);
  51 |     const wishItem = page.locator('.wishlist-item');
  52 |     await expect(wishItem).toBeVisible();
  53 |     // Remove from wishlist – assume a button inside the item
  54 |     await wishItem.locator('[data-test-id="remove-from-wishlist"]').click();
  55 |     await expect(wishItem).not.toBeVisible();
  56 |   });
  57 | });
  58 | 
```