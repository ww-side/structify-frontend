import { Toaster } from 'react-hot-toast';
import type { Metadata } from 'next';
import { Titillium_Web } from 'next/font/google';
import { HeroUIProvider } from '@heroui/system';

import { ApolloProvider } from '@/core/api/apollo-provider';

import { Sidebar } from '@/features/sidebar/components';

import { cn } from '@/shared/lib/utils';

import './globals.css';

const titilliumWeb = Titillium_Web({
  variable: '--font-titillium-web',
  weight: ['200', '300', '400', '600', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Structify',
  description: 'Noncommercial project management tool',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(titilliumWeb.variable, 'antialiased bg-noise')}>
        <ApolloProvider>
          <Toaster position="bottom-right" />
          <HeroUIProvider>
            <Sidebar>{children}</Sidebar>
          </HeroUIProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
