'use client';

import { LanguageParams } from '@/lib/types';
import { useTranslation } from '@/app/i18n/client';
import { motion } from 'framer-motion';

export default function Home({ params: { lng } }: LanguageParams) {
  const { t } = useTranslation(lng);
  const ctaClasses =
    'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 my-5 mx-2 rounded';

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <motion.h1
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-5xl uppercase mb-5"
      >
        {t('homepage.title')}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl"
      >
        {t('homepage.subtitle')}
      </motion.p>
    </div>
  );
}
