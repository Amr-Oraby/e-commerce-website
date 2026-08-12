import { test, expect } from '@playwright/test';

test.describe('Ordering Flow', () => {

  test.beforeEach(async ({ page }) => {
    // Login before each test using real backend
    await page.goto('/login');
    const form = page.locator('form');
    await form.locator('input[type="tel"]').fill('109147071');
    await form.locator('input[type="password"]').fill('password');
    await form.locator('button[type="submit"]').click();
    await expect(page).toHaveURL(/.*\/[a-z]{2}(\/)?$/);
  });

  test('Add product to cart and checkout', async ({ page }) => {
    // Listen for any alerts (like "Please select a variant" or "Login required")
    page.on('dialog', dialog => {
      console.log('DIALOG TRIGGERED:', dialog.message());
      dialog.dismiss();
    });

    page.on('console', msg => console.log('CONSOLE:', msg.text()));

    // 1. Go to homepage
    await page.goto('/');

    // Wait for the login button to be replaced by the profile menu (client-side hydration)
    // The Add to Cart button uses this state.
    await page.waitForTimeout(1000); // Give it a second to stabilize

    // 2. Click the first product card
    const productCard = page.locator('.group.cursor-pointer:has(svg.text-amber-400)').first();
    await expect(productCard).toBeVisible();
    await productCard.click();

    // Verify we navigated to the product details page
    await expect(page).toHaveURL(/.*\/products\/\d+/);

    // 3. Handle product variants (if any)
    const variants = page.locator('button.border-gray-200.bg-gray-50');
    try {
      await variants.first().waitFor({ state: 'visible', timeout: 3000 });
      if (await variants.count() > 0) {
        console.log('Variant found, clicking it...');
        await variants.nth(0).click();
      }
    } catch (e) {
      console.log('No variants found or timeout.');
    }

    // 4. Click 'Add to Cart' button (if it exists)
    const addToCartBtn = page.locator('button.bg-\\[\\#1a1a1a\\]').first();
    try {
        await addToCartBtn.waitFor({ state: 'visible', timeout: 3000 });
        console.log('Add to cart button visible. Checking if enabled...');
        await expect(addToCartBtn).toBeEnabled({ timeout: 5000 });
        await addToCartBtn.click();
        console.log('Clicked Add to Cart');
    } catch(e) {
        console.log('Add to Cart not found, maybe already in cart. Incrementing...');
        const plusBtn = page.locator('button:has(svg.lucide-plus)').first();
        if (await plusBtn.isVisible()) {
            await plusBtn.click();
        }
    }

    // Wait for the cart API to finish and update the badge in the header
    const cartBadge = page.locator('.lucide-shopping-cart').first().locator('..').locator('span.text-\\[10px\\]');
    await expect(cartBadge).not.toHaveText('0', { timeout: 10000 });

    // 5. Open Cart Drawer by clicking the shopping cart icon in the header
    const headerCartWrapper = page.locator('.lucide-shopping-cart').first().locator('..');
    await headerCartWrapper.click();

    // Wait for drawer checkout button to appear.
    const checkoutBtn = page.locator('button.bg-\\[\\#f9a01b\\]:has-text("Checkout"), button.bg-\\[\\#f9a01b\\]:has-text("إتمام الطلب"), button.bg-\\[\\#f9a01b\\]:has-text("الدفع"), button:has(svg.lucide-check-circle)').first();
    await expect(checkoutBtn).toBeVisible({ timeout: 10000 });

    // 6. Accept terms and conditions in the cart drawer
    // The most reliable way to check a custom UI checkbox is to click its label!
    const termsLabel = page.locator('label[for="terms"]').first();
    await termsLabel.scrollIntoViewIfNeeded();
    await termsLabel.click();

    // 7. Click checkout
    await checkoutBtn.click();

    // 8. Verify navigation to the order complete page
    await expect(page).toHaveURL(/.*\/cart\/orderComplete/);
  });
});
