import Link from 'next/link';
import { LanguageParams } from '@/lib/types';
import { useTranslation } from '../i18n';

export default async function Home({ params: { lng } }: LanguageParams) {
  const { t } = await useTranslation(lng);
  const ctaClasses =
    'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 my-5 mx-2 rounded';

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl mb-5">{t('homepage.title')}</h1>
      <p className="text-lg">{t('homepage.subtitle')}</p>
      <div className="mt-10">
        <Link className={ctaClasses} href={`/${lng}/login`}>
          {t('login.cta')}
        </Link>
        <Link className={ctaClasses} href={`/${lng}/signup`}>
          {t('register.cta')}
        </Link>
      </div>
    </div>
  );
}
