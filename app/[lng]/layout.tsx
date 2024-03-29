import BodyWrapper from './components/layout/BodyWrapper';
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
  title: 'Dashboard - Nam Phan',
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
      <body className="font-mono h-screen overflow-hidden">
        <BodyWrapper>{children}</BodyWrapper>
      </body>
    </html>
  );
}
