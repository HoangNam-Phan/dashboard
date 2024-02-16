'use client';

import { LanguageParams } from '@/lib/types';
import { useTranslation } from '@/app/i18n/client';
import { motion } from 'framer-motion';

export default function Home({ params: { lng } }: LanguageParams) {
  const { t } = useTranslation(lng);

  return (
    <div className="flex flex-col px-5 justify-center h-full space-y-5 md:space-y-12 lg:mx-40 xl:mx-60">
      <motion.h1
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        className="font-bold text-xl sm:text-3xl lg:text-5xl uppercase"
      >
        {t('homepage.title')}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-md sm:text-lg lg:text-2xl"
      >
        {t('homepage.subtitle')}
      </motion.p>
      <motion.span
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-xs sm:text-sm lg:text-lg italic"
      >
        {t('homepage.infoText')}
      </motion.span>
    </div>
  );
}
