import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';
import { join } from 'path';
import { readFileSync } from 'fs';


export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const messagesPath = join(process.cwd(), "messages", `${locale}.json`);

  return {
    locale,
    messages: JSON.parse(readFileSync(messagesPath, "utf8")),
  };
});

