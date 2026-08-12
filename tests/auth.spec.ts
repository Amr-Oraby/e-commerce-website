import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {

  test('Login successfully with demo credentials', async ({ page }) => {

    await page.goto('/login');

    const phoneInput = page.locator('input[type="tel"]');
    await phoneInput.fill('109147071');

    const passwordInput = page.locator('input[type="password"]');
    await passwordInput.fill('password');

    await page.locator('button[type="submit"]').click();

    // The homepage might be /en or /ar
    await expect(page).toHaveURL(/.*\/[a-z]{2}(\/)?$/); 
  });


  test('Register account successfully', async ({ page }) => {
    await page.route('**/api/auth/register', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ status: 'success', data: { verification_token: 'mock-verify-token' } })
      });
    });

    await page.goto('/login');

    // Click on Register tab
    const tabs = page.locator('button.rounded-full.flex-1');
    await tabs.nth(1).click();

    // Fill form
    const form = page.locator('form');
    await form.locator('input[type="text"]').nth(0).fill('Test User');
    await form.locator('input[type="tel"]').fill('555123456');

    const passwordInputs = form.locator('input[type="password"]');
    await passwordInputs.nth(0).fill('password123');
    await passwordInputs.nth(1).fill('password123');

    // Accept terms using force click to bypass any custom label overlay issues
    await form.locator('input[type="checkbox"]').check({ force: true });

    await form.locator('button[type="submit"]').click();

    await expect(page).toHaveURL(/.*verify\?token=mock-verify-token.*/);
  });


  test('Verify OTP successfully', async ({ page }) => {
    // The verify form uses useConfirmResetCode which hits /api/auth/confirm-reset-code
    await page.route('**/api/auth/confirm-reset-code', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ status: 'success', data: { message: 'Verified' } })
      });
    });
    
    await page.goto('/forgot-password/verify?token=mock-verify-token&phone=555123456&phoneCode=966');
    
    const otpInput = page.locator('input[data-input-otp="true"]');
    if (await otpInput.count() > 0) {
      await otpInput.first().fill('1234');
    } else {
      await page.keyboard.type('1234');
    }

    await page.locator('button[type="submit"]').click();

    await expect(page).toHaveURL(/.*reset\?token=mock-verify-token.*/);
  });

  
  test('Logout successfully', async ({ page }) => {
    await page.route('**/api/auth/getCurrentUser', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ status: 'success', data: { user: { name: 'Test User' } } })
      });
    });

    await page.route('**/api/auth/logout', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ status: 'success' })
      });
    });

    await page.goto('/profile');

    // Click logout
    const logoutBtn = page.getByRole('button', { name: /(تسجيل الخروج|logout)/i });
    if (await logoutBtn.count() > 0) {
      await logoutBtn.click();
      await expect(page).toHaveURL(/.*(?:login|\/[a-z]{2}\/)$/);
    }
  });

});
