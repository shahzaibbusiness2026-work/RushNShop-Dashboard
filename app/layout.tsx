import React from 'react';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { StoreProvider } from '../context/StoreContext';
import AppShell from '../components/layout/AppShell';

export const metadata: Metadata = {
  title: 'RushNshop - AI Operating System for TikTok Shop',
  description:
    'AI-powered TikTok Shop management dashboard for RushNshop with profit analytics, listing generator, customer service automation, and multi-store intelligence.',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0b0e14',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="bg-slate-50 dark:bg-[#0b0e14] text-slate-900 dark:text-slate-100 antialiased selection:bg-lime-400 selection:text-black min-h-screen">
        <StoreProvider>
          <AppShell>{children}</AppShell>
        </StoreProvider>
      </body>
    </html>
  );
}
