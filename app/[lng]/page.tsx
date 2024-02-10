import Link from 'next/link';
import Button from '@/app/[lng]/components/modules/Button';
import { LanguageParams } from '@/lib/types';
import { useTranslation } from '../i18n';

export default async function Home({ params: { lng } }: LanguageParams) {
  const { t } = await useTranslation(lng);
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1>{t('homepage.title')}</h1>
      <p>{t('homepage.subtitle')}</p>
      <div>
        <Button>
          <Link href={`/${lng}/login`}>{t('login')}</Link>
        </Button>
        <Button>
          <Link href={`/${lng}/signup`}>{t('register')}</Link>
        </Button>
      </div>
    </div>
  );
}
