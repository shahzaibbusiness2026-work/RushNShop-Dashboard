'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import MobileNavBar from './MobileNavBar';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Normalize pathname to reliably determine if current route is the Landing Page
  const cleanPath = (pathname || '')
    .split('?')[0]
    .split('#')[0]
    .replace(/\/+$/, '');

  const isLandingPage = cleanPath === '' || cleanPath === '/landing';

  if (isLandingPage) {
    return (
      <main className="min-h-screen w-full bg-slate-50 dark:bg-[#0b0e14] overflow-x-hidden">
        {children}
      </main>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#0b0e14] text-slate-900 dark:text-slate-100">
      {/* Sidebar for Desktop & Mobile Drawer */}
      <Sidebar mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />

      {/* Main Area */}
      <div className="flex flex-1 flex-col overflow-x-hidden min-w-0">
        <TopHeader onOpenMobileMenu={() => setMobileMenuOpen(true)} />
        <main className="flex-1 p-3.5 sm:p-6 lg:p-8 pb-24 lg:pb-8 bg-slate-50 dark:bg-[#0b0e14]">
          {children}
        </main>
        {/* Mobile Bottom Navigation */}
        <MobileNavBar onOpenMenu={() => setMobileMenuOpen(true)} />
      </div>
    </div>
  );
}
