import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "- board",
  description: "Dashboard project created by Nam Phan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-200">{children}</body>
    </html>
  );
}
