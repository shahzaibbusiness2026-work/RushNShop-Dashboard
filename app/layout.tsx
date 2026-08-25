import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '../context/StoreContext';
import AppShell from '../components/layout/AppShell';
import ErrorBoundary from '../components/ErrorBoundary';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
});

export const metadata: Metadata = {
  title: 'RushNshop - TikTok Shop Performance Platform',
  description:
    'High-performance TikTok Shop management platform with real-time TrueProfit waterfall analytics, SKU margin simulator, automated customer service helpdesk, and multi-store intelligence.',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#090d16',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${plusJakartaSans.variable}`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen font-sans bg-slate-50 text-slate-900 antialiased selection:bg-emerald-500 selection:text-white dark:bg-[#090d16] dark:text-slate-100"
        suppressHydrationWarning
      >
        {/* Skip to content link for keyboard/screen-reader users */}
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <StoreProvider>
          <ErrorBoundary>
            <AppShell>{children}</AppShell>
          </ErrorBoundary>
        </StoreProvider>
      </body>
    </html>
  );
}
