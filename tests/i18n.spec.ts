import { test, expect } from '@playwright/test';

test.describe('Localization / i18n Flow', () => {

  test('Switching languages updates URL, layout direction, and translations', async ({ page }) => {
    // 1. Go to homepage
    await page.goto('/');

    // Next-intl automatically redirects / to /en or /ar
    // Get the current locale from the HTML lang attribute
    await expect(page.locator('html')).toHaveAttribute('lang', /en|ar/);
    const htmlLang = await page.locator('html').getAttribute('lang');
    
    const isEnglish = htmlLang === 'en';
    const targetLocale = isEnglish ? 'ar' : 'en';
    const expectedDir = isEnglish ? 'rtl' : 'ltr';

    // 2. Locate the language switcher select element (now a Shadcn UI custom select)
    const langSelectTrigger = page.locator('[data-slot="select-trigger"]').first();
    await expect(langSelectTrigger).toBeVisible();

    // 3. Change the language
    await langSelectTrigger.click();
    const targetOption = page.getByRole('option', { name: isEnglish ? '🇸🇦' : '🇺🇸' });
    await targetOption.click();

    // 4. Verify the URL changed to include the new locale
    await expect(page).toHaveURL(new RegExp(`.*\\/${targetLocale}(\\/)?.*`));

    // 5. Verify the HTML dir attribute changed (essential for Arabic layout)
    await expect(page.locator('html')).toHaveAttribute('dir', expectedDir);
    
    // Verify the lang attribute updated
    await expect(page.locator('html')).toHaveAttribute('lang', targetLocale);
    
    // 6. Switch back to verify robustness
    const originalLocale = isEnglish ? 'en' : 'ar';
    const originalDir = isEnglish ? 'ltr' : 'rtl';
    
    // When the language switches, the select element might re-render, so locate it again
    const newLangSelectTrigger = page.locator('[data-slot="select-trigger"]').first();
    await newLangSelectTrigger.click();
    
    const originalOption = page.getByRole('option', { name: isEnglish ? '🇺🇸' : '🇸🇦' });
    await originalOption.click();
    
    await expect(page).toHaveURL(new RegExp(`.*\\/${originalLocale}(\\/)?.*`));
    await expect(page.locator('html')).toHaveAttribute('dir', originalDir);
  });
});
