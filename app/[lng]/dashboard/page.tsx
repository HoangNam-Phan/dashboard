'use client';

import { useTranslation } from '@/app/i18n/client';
import { LanguageParams } from '@/lib/types';
import Card from '@/app/[lng]/components/modules/Card';
import Weather from '@/app/[lng]/components/Weather';
import Stocks from '@/app/[lng]/components/Stocks';
import Todos from '@/app/[lng]/components/todo/Todos';
import News from '@/app/[lng]/components/News';

export default function Dashboard({ params: { lng } }: LanguageParams) {
  const { t } = useTranslation(lng);
  return (
    <div className="h-full flex items-center justify-center">
      <div
        className={`
            px-5 py-12 lg:p-16 lg:pt-12 size-full
            grid grid-cols-2 lg:grid-cols-9
            grid-rows-6 lg:grid-rows-2 gap-5
            `}
      >
        <Card
          customClasses={`
              row-start-1 row-span-2 lg:row-span-1
              col-span-2 lg:col-span-4 `}
          customVariants={{
            visible: { opacity: 1, x: 0, transition: { delay: 0 } },
            hidden: { opacity: 0, x: -100 },
          }}
        >
          <Weather t={t} />
        </Card>
        <Card
          customClasses={`
              row-span-2 lg:row-span-1 row-start-3 lg:row-start-2
              col-span-2 lg:col-span-4 col-start-1`}
          customVariants={{
            visible: { opacity: 1, y: 0, transition: { delay: 0.15 } },
            hidden: { opacity: 0, y: 100 },
          }}
        >
          <Stocks t={t} />
        </Card>
        <Card
          customClasses={`
              row-start-5 row-span-2 lg:row-start-1
              col-span-1 lg:col-span-3`}
          customVariants={{
            visible: { opacity: 1, y: 0, transition: { delay: 0.25 } },
            hidden: { opacity: 0, y: -100 },
          }}
        >
          <News t={t} />
        </Card>
        <Card
          customClasses={`
              col-span-1 lg:col-span-2
              row-start-5 row-span-2 lg:row-start-1`}
          customVariants={{
            visible: { opacity: 1, x: 0, transition: { delay: 0.35 } },
            hidden: { opacity: 0, x: 100 },
          }}
        >
          <Todos t={t} />
        </Card>
      </div>
    </div>
  );
}
