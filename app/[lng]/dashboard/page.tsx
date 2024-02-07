'use client';

import { Provider } from 'react-redux';
import store from '@/store/store';
import Card from '@/app/[lng]/components/modules/Card';
import Weather from '@/app/[lng]/components/Weather';
import Stocks from '@/app/[lng]/components/Stocks';
import Todos from '@/app/[lng]/components/Todos';

export default function Dashboard() {
  return (
    <Provider store={store}>
      <div className="h-full flex items-center justify-center">
        <div
          className={`
        bg-stone-300 shadow-md rounded-lg bg-white p-5 sm:p-10 pt-14 sm:pt-20 h-full w-full
        grid grid-cols-2 lg:grid-cols-4 
        grid-rows-4 sm:grid-rows-4 lg:grid-rows-2 gap-5
        `}
        >
          <Card customClasses="bg-green-200 col-span-2 row-start-1">
            <Weather />
          </Card>
          <Card customClasses="col-span-2 col-start-1 row-start-2">
            <Stocks />
          </Card>
          <Card customClasses="row-start-3 lg:row-start-1">
            CLOCK COMPONENT
          </Card>
          <Card customClasses="bg-stone-400 row-start-3 row-span-2 lg:row-start-1">
            <Todos />
          </Card>
          <Card customClasses="row-start-4 lg:row-start-2">
            NOTES COMPONENT
          </Card>
        </div>
      </div>
    </Provider>
  );
}
