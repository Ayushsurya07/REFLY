# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\e2e.spec.ts >> REFLY end‑to‑end flow >> Add and then remove an item from wishlist
- Location: tests\e2e.spec.ts:43:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[data-test-id="add-to-wishlist"]').first()

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - banner [ref=e3]:
      - generic [ref=e5]:
        - link "Logo Refly" [ref=e6] [cursor=pointer]:
          - /url: /
          - img "Logo" [ref=e8]
          - generic [ref=e9]: Refly
        - navigation "Main Navigation" [ref=e10]:
          - link "Collections" [ref=e11] [cursor=pointer]:
            - /url: /collections
          - link "About" [ref=e12] [cursor=pointer]:
            - /url: /#about
          - link "Contact" [ref=e13] [cursor=pointer]:
            - /url: /contact
        - generic [ref=e14]:
          - button "Search products" [ref=e15] [cursor=pointer]
          - button "View Wishlist" [ref=e18] [cursor=pointer]
          - button "View Cart" [ref=e21] [cursor=pointer]
          - link "Sign In" [ref=e25] [cursor=pointer]:
            - /url: /login
    - main [ref=e28]:
      - region "Hero section" [ref=e29]:
        - img "REFLY premium men's jeans campaign — model wearing dark denim in cinematic studio lighting" [ref=e31]
        - generic [ref=e33]:
          - generic [ref=e34]: NEW DROP • 2026 COLLECTION
          - heading "REFLY" [level=1] [ref=e38]
          - generic [ref=e39]:
            - generic [ref=e40]: MOVE
            - generic [ref=e41]: DIFFERENT.
          - paragraph [ref=e42]: Premium men's bottoms engineered for those who refuse to blend in.Jeans • Cargos • Formal Pants • Linen Pants • Shorts — Delivered Across India.
          - generic [ref=e43]:
            - link "SHOP COLLECTION" [ref=e45] [cursor=pointer]:
              - /url: /collections
            - link "WHOLESALE ENQUIRY" [ref=e47] [cursor=pointer]:
              - /url: "#wholesale"
        - generic:
          - generic:
            - generic:
              - generic:
                - generic: 100+
                - generic: Premium Products
              - generic:
                - generic: 12K+
                - generic: Happy Customers
              - generic:
                - generic: Pan India
                - generic: Delivery
              - generic:
                - generic: 7-Day
                - generic: Easy Returns
        - generic: Scroll
      - generic [ref=e49]:
        - generic [ref=e50]:
          - generic [ref=e51]:
            - generic [ref=e52]: Featured
            - heading "Crafted for the bold." [level=2] [ref=e53]: Crafted forthe bold.
          - generic [ref=e54]:
            - paragraph [ref=e55]: Each piece is engineered with premium fabrics sourced from the finest mills.
            - link "View All →" [ref=e56] [cursor=pointer]:
              - /url: /collections
        - generic [ref=e57]:
          - generic [ref=e59] [cursor=pointer]:
            - generic [ref=e60]:
              - img "Tactical Zip Cargo Pants — premium men's cargos in dark moody studio, atmospheric lighting" [ref=e62]
              - generic [ref=e64]: Best Seller
              - button "Add to wishlist" [ref=e66]
              - link "View Product" [ref=e70]:
                - /url: /products/zip-cargos
            - generic [ref=e71]:
              - generic [ref=e72]:
                - generic [ref=e73]:
                  - paragraph [ref=e74]: Cargos
                  - heading "Tactical Zip Cargo Pants" [level=3] [ref=e75]
                - link "View product details" [ref=e76]:
                  - /url: /products/zip-cargos
              - generic [ref=e79]:
                - generic [ref=e80]: ₹3,499
                - generic [ref=e81]: ₹5,499
                - generic [ref=e82]: 36% OFF
          - generic [ref=e84] [cursor=pointer]:
            - generic [ref=e85]:
              - img "Utility Patch Pocket Cargo — premium men's cargos in dark moody studio, atmospheric lighting" [ref=e87]
              - generic [ref=e89]: New
              - button "Add to wishlist" [ref=e91]
              - link "View Product" [ref=e95]:
                - /url: /products/patch-pocket-cargo
            - generic [ref=e96]:
              - generic [ref=e97]:
                - generic [ref=e98]:
                  - paragraph [ref=e99]: Cargos
                  - heading "Utility Patch Pocket Cargo" [level=3] [ref=e100]
                - link "View product details" [ref=e101]:
                  - /url: /products/patch-pocket-cargo
              - generic [ref=e104]:
                - generic [ref=e105]: ₹3,999
                - generic [ref=e106]: ₹5,999
                - generic [ref=e107]: 33% OFF
          - generic [ref=e109] [cursor=pointer]:
            - generic [ref=e110]:
              - img "Slate Formal Trousers — premium men's formal in dark moody studio, atmospheric lighting" [ref=e112]
              - button "Add to wishlist" [ref=e114]
              - link "View Product" [ref=e118]:
                - /url: /products/slate-formal
            - generic [ref=e119]:
              - generic [ref=e120]:
                - generic [ref=e121]:
                  - paragraph [ref=e122]: Formal
                  - heading "Slate Formal Trousers" [level=3] [ref=e123]
                - link "View product details" [ref=e124]:
                  - /url: /products/slate-formal
              - generic [ref=e127]:
                - generic [ref=e128]: ₹2,499
                - generic [ref=e129]: ₹3,999
                - generic [ref=e130]: 38% OFF
          - generic [ref=e132] [cursor=pointer]:
            - img "Linen Loose Fit Trousers — premium linen men's trousers, bright airy natural light studio, clean minimal background" [ref=e134]
            - generic [ref=e136]:
              - generic [ref=e137]: Linen
              - heading "Linen Loose Fit Trousers" [level=3] [ref=e138]
              - generic [ref=e139]:
                - generic [ref=e140]: ₹2,799
                - generic [ref=e141]: ₹4,499
                - generic [ref=e142]: 38% OFF
                - link "Shop Now" [ref=e143]:
                  - /url: /products/linen-loose-fit
        - generic [ref=e144]:
          - generic [ref=e145]:
            - generic [ref=e146]: 🚚
            - generic [ref=e147]:
              - heading "FREE DELIVERY" [level=4] [ref=e148]
              - paragraph [ref=e149]: On all orders above ₹1,500
          - generic [ref=e150]:
            - generic [ref=e151]: ↩
            - generic [ref=e152]:
              - heading "7-DAY EASY RETURNS" [level=4] [ref=e153]
              - paragraph [ref=e154]: Hassle-free doorstep pickup
          - generic [ref=e155]:
            - generic [ref=e156]: 💳
            - generic [ref=e157]:
              - heading "CASH ON DELIVERY" [level=4] [ref=e158]
              - paragraph [ref=e159]: Available across India
          - generic [ref=e160]:
            - generic [ref=e161]: ⚡
            - generic [ref=e162]:
              - heading "SHIPS IN 24 HOURS" [level=4] [ref=e163]
              - paragraph [ref=e164]: Fast processing & dispatch
      - generic [ref=e166]:
        - generic [ref=e167]:
          - generic [ref=e168]:
            - generic [ref=e169]: Collections
            - heading "Every style. One brand." [level=2] [ref=e170]: Every style.One brand.
          - link "View All Collections →" [ref=e171] [cursor=pointer]:
            - /url: /collections
        - generic [ref=e172]:
          - link [ref=e174] [cursor=pointer]:
            - /url: /collections?category=cargos
            - generic [ref=e175]:
              - img "Cargos collection — premium men's cargos in dramatic dark studio lighting, atmospheric shadows" [ref=e177]
              - generic [ref=e182]:
                - paragraph [ref=e183]: Tactical Utility
                - heading "Cargos" [level=3] [ref=e184]
                - paragraph [ref=e185]: 18 styles
          - link [ref=e190] [cursor=pointer]:
            - /url: /collections?category=linen
            - generic [ref=e191]:
              - img "Linen collection — premium men's linen in dramatic dark studio lighting, atmospheric shadows" [ref=e193]
              - generic [ref=e198]:
                - paragraph [ref=e199]: Breathable Luxury
                - heading "Linen" [level=3] [ref=e200]
                - paragraph [ref=e201]: 12 styles
          - link [ref=e206] [cursor=pointer]:
            - /url: /collections?category=formal
            - generic [ref=e207]:
              - img "Formal collection — premium men's formal in dramatic dark studio lighting, atmospheric shadows" [ref=e209]
              - generic [ref=e214]:
                - paragraph [ref=e215]: Boardroom Ready
                - heading "Formal" [level=3] [ref=e216]
                - paragraph [ref=e217]: 15 styles
          - link [ref=e222] [cursor=pointer]:
            - /url: /collections?category=cotton-pants
            - generic [ref=e223]:
              - img "Cotton Pants collection — premium men's cotton pants in dramatic dark studio lighting, atmospheric shadows" [ref=e225]
              - generic [ref=e230]:
                - paragraph [ref=e231]: Classic Twill & Bold Fits
                - heading "Cotton Pants" [level=3] [ref=e232]
                - paragraph [ref=e233]: 20 styles
          - link [ref=e238] [cursor=pointer]:
            - /url: /collections?category=shorts
            - generic [ref=e239]:
              - img "Shorts collection — premium men's shorts in dramatic dark studio lighting, atmospheric shadows" [ref=e241]
              - generic [ref=e246]:
                - paragraph [ref=e247]: Summer Essentials
                - heading "Shorts" [level=3] [ref=e248]
                - paragraph [ref=e249]: 14 styles
      - generic [ref=e254]:
        - generic [ref=e255]:
          - generic [ref=e256]:
            - generic [ref=e257]: The Material
            - heading "Fabric that speaks first." [level=2] [ref=e258]: Fabric thatspeaks first.
            - paragraph [ref=e259]: We source from the world's finest mills — Japanese denim weavers, Italian tailors, Belgian linen farmers. Every thread is chosen with the same obsession we apply to the cut.
            - generic [ref=e260]:
              - generic [ref=e261]: Premium raw materials only
              - generic [ref=e266]: Tested for 200+ wash cycles
              - generic [ref=e271]: Colorfastness guaranteed
              - generic [ref=e276]: Shrink-resistant treatment
          - generic [ref=e282]:
            - img "Premium fabric close-up — rich textile texture in warm natural light, bright airy studio with clean white background" [ref=e284]
            - generic [ref=e285]:
              - paragraph [ref=e286]: 12+
              - paragraph [ref=e287]: Premium Fabric Sources
        - generic [ref=e288]:
          - generic [ref=e289]:
            - heading "Japanese Selvedge Denim" [level=3] [ref=e291]
            - paragraph [ref=e292]: Okayama, Japan · 12.5 oz
            - paragraph [ref=e293]: Woven on vintage shuttle looms producing a tighter, denser weave that develops a unique patina over time.
          - generic [ref=e294]:
            - heading "Italian Stretch Twill" [level=3] [ref=e296]
            - paragraph [ref=e297]: Biella, Italy · 280 GSM
            - paragraph [ref=e298]: A 4-way stretch fabric with a refined matte finish, engineered for unrestricted movement without sacrificing structure.
          - generic [ref=e299]:
            - heading "Belgian Linen" [level=3] [ref=e301]
            - paragraph [ref=e302]: Kortrijk, Belgium · 180 GSM
            - paragraph [ref=e303]: Stone-washed European flax that softens with each wear while maintaining its characteristic cool drape.
      - generic [ref=e305]:
        - generic [ref=e306]:
          - generic [ref=e307]:
            - generic [ref=e308]: Reviews
            - heading "Worn by thousands." [level=2] [ref=e309]: Worn bythousands.
          - generic [ref=e311]:
            - paragraph [ref=e312]: "4.9"
            - paragraph [ref=e324]: 500+ reviews
        - generic [ref=e325]:
          - generic [ref=e326] [cursor=pointer]:
            - paragraph [ref=e330]: The Obsidian Slim Jeans are unlike anything I've worn from an Indian brand. The fit is surgical, the fabric breaks in beautifully. Worth every rupee.
            - generic [ref=e331]: Obsidian Slim Jeans
            - generic [ref=e344]:
              - img "Arjun Mehta — customer from Mumbai" [ref=e346]
              - generic [ref=e347]:
                - paragraph [ref=e348]: Arjun Mehta
                - paragraph [ref=e349]: Creative Director · Mumbai
              - generic [ref=e350]: Verified Purchase ✓
          - generic [ref=e351] [cursor=pointer]:
            - paragraph [ref=e355]: Ordered the Cargo Pants and received them next day. The quality rivals international brands at a fraction of the cost. Refly is the real deal.
            - generic [ref=e356]: Utility Cargo Pants
            - generic [ref=e369]:
              - img "Vikram Nair — customer from Bangalore" [ref=e371]
              - generic [ref=e372]:
                - paragraph [ref=e373]: Vikram Nair
                - paragraph [ref=e374]: Tech Entrepreneur · Bangalore
              - generic [ref=e375]: Verified Purchase ✓
          - generic [ref=e376] [cursor=pointer]:
            - paragraph [ref=e380]: The linen trousers are perfect for Delhi summers. Breathable, sharp, and they hold their shape all day. The packaging was premium too.
            - generic [ref=e381]: Linen Ease Trousers
            - generic [ref=e394]:
              - img "Rahul Sharma — customer from Delhi" [ref=e396]
              - generic [ref=e397]:
                - paragraph [ref=e398]: Rahul Sharma
                - paragraph [ref=e399]: Architect · Delhi
              - generic [ref=e400]: Verified Purchase ✓
          - generic [ref=e401] [cursor=pointer]:
            - paragraph [ref=e405]: Finally a formal trouser from India that doesn't look like it came from a mall. The Slate Formal is my go-to for client meetings now.
            - generic [ref=e406]: Slate Formal Trousers
            - generic [ref=e419]:
              - img "Karthik Iyer — customer from Chennai" [ref=e421]
              - generic [ref=e422]:
                - paragraph [ref=e423]: Karthik Iyer
                - paragraph [ref=e424]: Investment Banker · Chennai
              - generic [ref=e425]: Verified Purchase ✓
        - generic [ref=e426]:
          - button "View testimonial 1" [ref=e427] [cursor=pointer]
          - button "View testimonial 2" [ref=e428] [cursor=pointer]
          - button "View testimonial 3" [ref=e429] [cursor=pointer]
          - button "View testimonial 4" [ref=e430] [cursor=pointer]
      - generic [ref=e431]:
        - img "REFLY Wholesale & B2B Distribution Warehouse" [ref=e434]
        - generic [ref=e437]:
          - generic [ref=e438]: REFLY B2B & WHOLESALE MARKETPLACE
          - heading "Bulk Ordering & Wholesale Partnership." [level=2] [ref=e439]: Bulk Ordering &Wholesale Partnership.
          - paragraph [ref=e440]: Crafted for clothing retailers, boutique owners, and bulk buyers across India. Access direct factory pricing, tiered quantity discounts, and priority dispatch.
          - generic [ref=e441]:
            - generic [ref=e442]:
              - generic [ref=e443]: 📦
              - heading "Tiered Discounts" [level=3] [ref=e444]
              - paragraph [ref=e445]: Exclusive B2B rates for 20+, 50+, and 200+ unit orders.
            - generic [ref=e446]:
              - generic [ref=e447]: ⚡
              - heading "Factory Dispatch" [level=3] [ref=e448]
              - paragraph [ref=e449]: Direct dispatch within 24-48 hours with door-to-door tracking.
            - generic [ref=e450]:
              - generic [ref=e451]: 📑
              - heading "GST B2B Invoice" [level=3] [ref=e452]
              - paragraph [ref=e453]: 100% Tax compliant invoicing with full GST credit claim.
            - generic [ref=e454]:
              - generic [ref=e455]: 🤝
              - heading "Dedicated Manager" [level=3] [ref=e456]
              - paragraph [ref=e457]: Instant WhatsApp & call support for custom sample orders.
          - generic [ref=e458]:
            - button "Enquire Wholesale Pricing →" [ref=e459] [cursor=pointer]
            - link "Chat on WhatsApp" [ref=e460] [cursor=pointer]:
              - /url: https://wa.me/919876543210?text=Hello%20REFLY%20Wholesale%20Team%2C%0AI%20am%20interested%20in%20bulk%20ordering%20%2F%20wholesale%20partnership.%0A%0ABusiness%3A%20N%2FA%0AName%3A%20N%2FA%0AQty%3A%2020-50%20units%0ACategory%3A%20Cargos%20%26%20Linen
          - paragraph [ref=e463]: "Minimum Order Quantity (MOQ): 20 units · Samples available on request"
    - contentinfo [ref=e464]:
      - generic [ref=e465]:
        - generic [ref=e466]:
          - generic [ref=e467]:
            - link "Logo Refly" [ref=e468] [cursor=pointer]:
              - /url: /
              - img "Logo" [ref=e470]
              - generic [ref=e471]: Refly
            - paragraph [ref=e472]: Premium men's bottom wear.Crafted for those who move different.
            - generic [ref=e473]:
              - generic [ref=e474]: Made with love in India by 1life's WEB
              - generic [ref=e475]: 🇮🇳
          - generic [ref=e476]:
            - navigation [ref=e477]:
              - link "Collections" [ref=e478] [cursor=pointer]:
                - /url: /collections
              - link "About" [ref=e479] [cursor=pointer]:
                - /url: /#about
              - link "Privacy" [ref=e480] [cursor=pointer]:
                - /url: /privacy
              - link "Terms" [ref=e481] [cursor=pointer]:
                - /url: /terms
              - link "Contact" [ref=e482] [cursor=pointer]:
                - /url: /contact
            - link "Instagram" [ref=e484] [cursor=pointer]:
              - /url: https://www.instagram.com/refly_clothing__/?hl=en
        - generic [ref=e487]:
          - paragraph [ref=e488]: "© 2026 Refly. All rights reserved. GST: EPTPS22X0000X0X"
          - generic [ref=e489]:
            - generic [ref=e490]: UPI · Razorpay · COD
            - generic [ref=e491]: Ships across India 🚚
  - button "Open Next.js Dev Tools" [ref=e497] [cursor=pointer]
  - alert [ref=e501]
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
  18 |     await page.goto(BASE_URL);
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
> 47 |     await wishlistBtn.click();
     |                       ^ Error: locator.click: Test timeout of 30000ms exceeded.
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