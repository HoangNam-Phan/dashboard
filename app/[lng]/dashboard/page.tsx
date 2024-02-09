'use client';

import { Provider } from 'react-redux';
import store from '@/store/store';
import Card from '@/app/[lng]/components/modules/Card';
import Weather from '@/app/[lng]/components/Weather';
import Stocks from '@/app/[lng]/components/Stocks';
import Todos from '@/app/[lng]/components/todo/Todos';
import News from '@/app/[lng]/components/News';

export default function Dashboard() {
  return (
    <Provider store={store}>
      <div className="h-full flex items-center justify-center">
        <div
          className={`
            bg-slate-400 shadow-md px-5 py-12 lg:p-16 lg:pt-12 size-full
            grid grid-cols-2 lg:grid-cols-9
            grid-rows-6 lg:grid-rows-2 gap-5
            `}
        >
          <Card
            customClasses={`
              bg-gray-300
              row-start-1 row-span-2 lg:row-span-1
              col-span-2 lg:col-span-4 `}
          >
            <Weather />
          </Card>
          <Card
            customClasses={`
              bg-white
              row-span-2 lg:row-span-1 row-start-3 lg:row-start-2
              col-span-2 lg:col-span-4 col-start-1`}
          >
            <Stocks />
          </Card>
          <Card
            customClasses={`
              bg-gray-400
              row-start-5 row-span-2 lg:row-start-1
              col-span-1 lg:col-span-3`}
          >
            <News />
          </Card>
          <Card
            customClasses={`
              bg-neutral-300
              col-span-1 lg:col-span-2
              row-start-5 row-span-2 lg:row-start-1`}
          >
            <Todos />
          </Card>
        </div>
      </div>
    </Provider>
  );
}
