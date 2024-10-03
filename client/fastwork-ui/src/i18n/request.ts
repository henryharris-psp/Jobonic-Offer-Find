import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers'; 

export default getRequestConfig(async () => {
  let locale = 'en'; // Default locale
  
  const cookieStore = cookies();
  const savedLocale = cookieStore.get('lang')?.value;

  if (savedLocale) {
    locale = savedLocale;
  }

  return {
    locale,
    messages: (await import(`../../locales/${locale}.json`)).default,
  };
});