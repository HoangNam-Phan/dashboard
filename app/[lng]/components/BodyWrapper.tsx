'use client';

import { Provider } from 'react-redux';
import store from '@/store/store';
import Header from './Header';
import Footer from './Footer';

export default function BodyWrapper({ children }: any) {
  return (
    <>
      <Provider store={store}>
        <div id="modal-wrapper"></div>
        <Header />
        <main className="h-full">{children}</main>
        <Footer />
      </Provider>
    </>
  );
}
