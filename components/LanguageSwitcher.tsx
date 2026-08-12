'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations('language');
  const router = useRouter();
  const pathname = usePathname();

  function onValueChange(value: string | null) {
    if (!value) return;

    const nextLocale = value as 'en' | 'ar';

    router.replace(pathname, {
      locale: nextLocale,
    });
  }

  return (
    <Select value={locale} onValueChange={onValueChange}>
      <SelectTrigger className="w-fit gap-2 border-gray-200 bg-transparent text-sm outline-none focus:ring-0 focus:ring-offset-0">
        <SelectValue placeholder={t('label')} />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="en">
          <div className="flex items-center gap-2">
            <span className="text-base">🇺🇸</span>
            <span>{t('en')}</span>
          </div>
        </SelectItem>

        <SelectItem value="ar">
          <div className="flex items-center gap-2">
            <span className="text-base">🇸🇦</span>
            <span>{t('ar')}</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}