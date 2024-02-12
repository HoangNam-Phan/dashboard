'use client';

import { Provider } from 'react-redux';
import dynamic from 'next/dynamic'
import store from '@/store/store';

const DynamicHeader = dynamic(() => import('./Header'), {
  ssr: false,
})

const DynamicFooter = dynamic(() => import('./Footer'), {
  ssr: false,
})

export default function BodyWrapper({ children }: any) {
  return (
    <>
      <Provider store={store}>
        <div id="modal-wrapper"></div>
        <DynamicHeader />
        <main className="h-full">{children}</main>
        <DynamicFooter />
      </Provider>
    </>
  );
}
