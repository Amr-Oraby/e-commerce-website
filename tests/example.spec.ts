import { test, expect } from '@playwright/test';

test('homepage loads successfully', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  // We can adjust this to whatever the real title is, or just check that it loads
  // without returning a 404/500 error.
  
  // We can just verify the response status or a basic element
  const body = page.locator('body');
  await expect(body).toBeVisible();
});
