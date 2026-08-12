import { test, expect } from '@playwright/test';

test.describe('Mobile Journey', () => {

  test('Hamburger menu and mobile layout interactions', async ({ page, isMobile }) => {
    // This test is specifically designed for mobile viewports
    test.skip(!isMobile, 'This test is only designed to run on Mobile viewports.');

    // 1. Go to homepage
    await page.goto('/');
    await page.waitForTimeout(1500); // Wait for you to see it

    // 2. Verify the mobile hamburger menu is visible
    const menuBtn = page.locator('button.lg\\:hidden, [aria-label="menu"], [aria-label="القائمة"]').first();
    await expect(menuBtn).toBeVisible();

    // 3. Open the menu
    await menuBtn.click();
    await page.waitForTimeout(1500); // Wait for you to see the menu open

    // Wait for the Sheet/Drawer to animate in
    const sheetContent = page.locator('[role="dialog"]').first();
    await expect(sheetContent).toBeVisible();

    // 4. Click a category link inside the mobile menu
    const firstCategoryLink = sheetContent.locator('a').first();
    await expect(firstCategoryLink).toBeVisible();
    
    const targetUrl = await firstCategoryLink.getAttribute('href');
    await firstCategoryLink.click();
    await page.waitForTimeout(2000); // Wait for you to see the page change

    // 5. Verify the menu closes and navigation succeeds
    if (targetUrl) {
      // The drawer should close after click, so it should eventually be hidden
      await expect(sheetContent).toBeHidden({ timeout: 10000 });
      // We should be navigated
      await expect(page).toHaveURL(new RegExp(`.*${targetUrl}`));
    }
  });
});
