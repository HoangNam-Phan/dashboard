import Header from '@/app/[lng]/components/Header';
import Footer from '@/app/[lng]/components/Footer';
import { dir } from 'i18next';
import './globals.css';
import { languages } from '../i18n/settings';
import type { Metadata } from 'next';

type RootParams = {
  children: React.ReactNode;
  params: {
    lng: string;
  };
};

export const metadata: Metadata = {
  title: '- board',
  description: 'Dashboard project created by Nam Phan',
};

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function RootLayout({
  children,
  params: { lng },
}: Readonly<RootParams>) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <body className="h-screen bg-gray-200">
        <div id="modal-wrapper"></div>
        <Header lang={''} />
        <main className="h-full">{children}</main>
        <Footer lang={''} />
      </body>
    </html>
  );
}
