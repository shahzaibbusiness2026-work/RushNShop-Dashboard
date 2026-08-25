'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Zap,
  Sun,
  Moon,
  Menu,
  X,
  ArrowRight,
  TrendingUp,
  Calculator,
  Scale,
  Sparkles,
  Tag,
  LayoutDashboard,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { cn } from '../../lib/utils';

export default function PublicNavbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cleanPath = (pathname || '').split('?')[0]?.split('#')[0]?.replace(/\/+$/, '') || '/';

  const navLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Profit Analytics', href: '/profit-analytics', icon: TrendingUp },
    { name: 'Calculator', href: '/calculator', icon: Calculator },
    { name: 'Compare SKUs', href: '/compare', icon: Scale },
    { name: 'AI Studio', href: '/ai-assistant', icon: Sparkles },
    { name: 'Pricing', href: '/pricing', icon: Tag },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 px-4 py-3 backdrop-blur-xl transition-colors dark:border-slate-800/80 dark:bg-[#090d16]/80 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs">
            <Zap className="h-5 w-5 fill-current" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
            RushNshop
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-300 md:flex lg:gap-1.5">
          {navLinks.map((link) => {
            const isActive = cleanPath === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-lg px-3 py-1.5 transition-all font-medium',
                  isActive
                    ? 'bg-slate-100 font-semibold text-slate-900 dark:bg-white/10 dark:text-white'
                    : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white',
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-[#0f1420] dark:text-slate-300 dark:hover:bg-white/5"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-slate-700" />
            )}
          </button>

          {/* Open Dashboard Button */}
          <Link
            href="/dashboard"
            className="hidden items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white sm:inline-flex shadow-xs"
          >
            <Zap className="h-3.5 w-3.5 fill-current text-emerald-400 dark:text-emerald-600" />
            <span>Open Dashboard</span>
          </Link>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-800 dark:bg-[#0f1420] dark:text-slate-200 md:hidden"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 top-[61px] z-40 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="animate-in fade-in slide-in-from-top-2 relative z-50 mt-3 space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl dark:border-slate-800 dark:bg-[#0f1420] md:hidden">
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors',
                    cleanPath === link.href
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 font-bold'
                      : 'bg-slate-50 hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10',
                  )}
                >
                  <span>{link.name}</span>
                  <ArrowRight className="h-3 w-3 text-slate-400" />
                </Link>
              ))}
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-emerald-600 py-3 text-xs font-semibold text-white transition-colors hover:bg-emerald-500 shadow-xs"
              >
                <Zap className="h-3.5 w-3.5 fill-current" />
                <span>Launch Live Dashboard</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
