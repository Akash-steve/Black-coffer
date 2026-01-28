import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ThemeRegistry from './ThemeRegistry';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Analytics Dashboard',
  description: 'Data visualization dashboard built with Next.js and MUI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
