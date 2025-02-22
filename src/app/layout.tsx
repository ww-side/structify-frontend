import type { Metadata } from 'next';
import { Titillium_Web } from 'next/font/google';
import { HeroUIProvider } from '@heroui/system';

import { cn } from '@/shared/lib/utils';

import './globals.css';

const titilliumWeb = Titillium_Web({
  variable: '--font-titillium-web',
  weight: ['200', '300', '400', '600', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(titilliumWeb.variable, 'antialiased bg-background')}>
        <HeroUIProvider>{children}</HeroUIProvider>
      </body>
    </html>
  );
}
