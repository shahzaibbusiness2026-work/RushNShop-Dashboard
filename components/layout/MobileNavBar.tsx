'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingBag,
  TrendingUp,
  Sparkles,
  Store,
  Menu,
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface MobileNavBarProps {
  onOpenMenu: () => void;
}

export default function MobileNavBar({ onOpenMenu }: MobileNavBarProps) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/', icon: LayoutDashboard },
    { name: 'Orders', href: '/orders', icon: ShoppingBag },
    { name: 'Profit', href: '/profit-analytics', icon: TrendingUp },
    { name: 'AI Chat', href: '/ai-assistant', icon: Sparkles },
    { name: 'Stores', href: '/stores', icon: Store },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden border-t border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-[#0f1117]/95 backdrop-blur-lg px-2 py-1.5 safe-area-inset-bottom">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 rounded-xl py-1 px-2.5 transition-colors',
                isActive
                  ? 'text-emerald-600 dark:text-[#4ade80] font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              )}
            >
              <div className="relative">
                <Icon className={cn('h-5 w-5', isActive && 'stroke-[2.5]')} />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-emerald-500 dark:bg-[#4ade80]" />
                )}
              </div>
              <span className="text-[10px] tracking-tight">{item.name}</span>
            </Link>
          );
        })}

        {/* More Drawer Button */}
        <button
          onClick={onOpenMenu}
          className="flex flex-col items-center justify-center gap-0.5 rounded-xl py-1 px-2.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
        >
          <Menu className="h-5 w-5" />
          <span className="text-[10px] tracking-tight">Menu</span>
        </button>
      </div>
    </div>
  );
}
