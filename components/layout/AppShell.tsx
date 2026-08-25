'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import MobileNavBar from './MobileNavBar';
import CommandMenu from './CommandMenu';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Normalize pathname to reliably determine if current route is the Landing Page
  const cleanPath = (pathname || '').split('?')[0]?.split('#')[0]?.replace(/\/+$/, '') ?? '';

  const isLandingPage = cleanPath === '' || cleanPath === '/landing';

  if (isLandingPage) {
    return (
      <main
        id="main-content"
        className="min-h-screen w-full overflow-x-hidden bg-slate-50 dark:bg-[#0b0e14]"
      >
        {children}
        <CommandMenu />
      </main>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 dark:bg-[#0b0e14] dark:text-slate-100">
      {/* Sidebar for Desktop & Mobile Drawer */}
      <Sidebar mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />

      {/* Main Area */}
      <div className="flex min-w-0 flex-1 flex-col overflow-x-hidden">
        <TopHeader onOpenMobileMenu={() => setMobileMenuOpen(true)} />
        <main
          id="main-content"
          className="flex-1 bg-slate-50 p-3.5 pb-24 dark:bg-[#0b0e14] sm:p-6 lg:p-8 lg:pb-8"
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

