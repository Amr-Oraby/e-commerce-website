import QueryProvider from "@/app/providers/QueryProvider";
import HeaderComponent from "@/components/Header";
import "@/app/globals.css";
import { ibmPlexArabic } from "@/public/fonts/ibmPlexArabic";
import dynamic from 'next/dynamic';
import { NextIntlClientProvider, hasLocale } from 'next-intl';

const Footer = dynamic(() => import('@/components/Footer'), { ssr: true });
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

const RTL_LOCALES = new Set(['ar']);

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
  const dir = RTL_LOCALES.has(locale) ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir}>
      <body className={`${ibmPlexArabic.className}`}>
        <NextIntlClientProvider messages={messages}>
          <QueryProvider>
            <HeaderComponent />
            <div className="pt-46 lg:pt-54 min-h-100 ">{children}</div>
            <Footer />
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
