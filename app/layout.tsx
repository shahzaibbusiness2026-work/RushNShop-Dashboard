'use client';

import React, { useState } from 'react';
import './globals.css';
import { StoreProvider } from '../context/StoreContext';
import Sidebar from '../components/layout/Sidebar';
import TopHeader from '../components/layout/TopHeader';
import MobileNavBar from '../components/layout/MobileNavBar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <title>RushNshop - AI Operating System for TikTok Shop</title>
        <meta
          name="description"
          content="AI-powered TikTok Shop management dashboard for RushNshop with profit analytics, listing generator, customer service automation, and multi-store intelligence."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>"
        />
      </head>
      <body className="bg-slate-50 dark:bg-[#0b0e14] text-slate-900 dark:text-slate-100 antialiased selection:bg-lime-400 selection:text-black min-h-screen">
        <StoreProvider>
          <div className="flex min-h-screen bg-slate-50 dark:bg-[#0b0e14] text-slate-900 dark:text-slate-100">
            {/* Sidebar */}
            <Sidebar mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />

            {/* Main Area */}
            <div className="flex flex-1 flex-col overflow-x-hidden min-w-0">
              <TopHeader onOpenMobileMenu={() => setMobileMenuOpen(true)} />
              <main className="flex-1 p-3.5 sm:p-6 lg:p-8 pb-20 lg:pb-8 bg-slate-50 dark:bg-[#0b0e14]">
                {children}
              </main>
              {/* Mobile Bottom Navigation */}
              <MobileNavBar onOpenMenu={() => setMobileMenuOpen(true)} />
            </div>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
