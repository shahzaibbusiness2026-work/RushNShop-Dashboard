'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import MobileNavBar from './MobileNavBar';
import CommandMenu from './CommandMenu';
import PublicNavbar from './PublicNavbar';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Normalize pathname
  const cleanPath = (pathname || '').split('?')[0]?.split('#')[0]?.replace(/\/+$/, '') ?? '';

  // Standalone public routes (opened without dashboard sidebar/header)
  const isPublicStandalone =
    cleanPath === '' ||
    cleanPath === '/landing' ||
    cleanPath === '/calculator' ||
    cleanPath === '/compare' ||
    cleanPath === '/profit-analytics' ||
    cleanPath === '/pricing' ||
    cleanPath === '/ai-assistant';

  if (cleanPath === '' || cleanPath === '/landing') {
    return (
      <main
        id="main-content"
        className="min-h-screen w-full overflow-x-hidden bg-slate-50 dark:bg-[#090d16]"
      >
        {children}
        <CommandMenu />
      </main>
    );
  }

  if (isPublicStandalone) {
    return (
      <div className="min-h-screen w-full flex flex-col bg-slate-50 text-slate-900 dark:bg-[#090d16] dark:text-slate-100">
        <PublicNavbar />
        <main
          id="main-content"
          className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8"
        >
          {children}
        </main>
        <CommandMenu />
      </div>
    );
  }

  // Dashboard workspace routes (with full sidebar and header)
  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 dark:bg-[#090d16] dark:text-slate-100">
      {/* Sidebar for Desktop & Mobile Drawer */}
      <Sidebar mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />

      {/* Main Area */}
      <div className="flex min-w-0 flex-1 flex-col overflow-x-hidden">
        <TopHeader onOpenMobileMenu={() => setMobileMenuOpen(true)} />
        <main
          id="main-content"
          className="flex-1 bg-slate-50 p-3.5 pb-24 dark:bg-[#090d16] sm:p-6 lg:p-8 lg:pb-8"
        >
          {children}
        </main>
        {/* Mobile Bottom Navigation */}
        <MobileNavBar onOpenMenu={() => setMobileMenuOpen(true)} />
      </div>

      {/* Global Command Palette */}
      <CommandMenu />
    </div>
  );
}
