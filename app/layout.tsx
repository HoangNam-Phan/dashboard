import Header from '@/components/Header';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '- board',
  description: 'Dashboard project created by Nam Phan',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen bg-gray-200">
        <Header />
        <main className="h-full">{children}</main>
      </body>
    </html>
  );
}
