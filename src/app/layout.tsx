import { Toaster } from 'react-hot-toast';
import type { Metadata } from 'next';
import { Titillium_Web } from 'next/font/google';
import { HeroUIProvider } from '@heroui/system';

import { ApolloProvider } from '@/core/api/apollo-provider';
import { AuthGuard } from '@/core/auth/components/auth-guard';

import { ToastProvider } from '@/shared/lib/toast';
import { cn } from '@/shared/lib/utils';
import { Dialog } from '@/shared/ui/kit/dialog';
import { Drawer } from '@/shared/ui/kit/drawer';

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
          <ToastProvider placement="bottom-right" />
          <HeroUIProvider>
            <AuthGuard>{children}</AuthGuard>
            <Dialog />
            <Drawer />
          </HeroUIProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
