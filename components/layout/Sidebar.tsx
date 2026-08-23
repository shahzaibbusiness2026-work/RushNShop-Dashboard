'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Store,
  Package,
  ShoppingBag,
  TrendingUp,
  Megaphone,
  Receipt,
  Users,
  Sparkles,
  Headphones,
  Compass,
  FileText,
  Settings,
  Zap,
  ChevronDown,
  Bot,
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Stores', href: '/stores', icon: Store },
  { name: 'Products', href: '/products', icon: Package },
  { name: 'Orders', href: '/orders', icon: ShoppingBag },
  { name: 'Profit Analytics', href: '/profit-analytics', icon: TrendingUp },
  { name: 'Ads Analytics', href: '/ads-analytics', icon: Megaphone },
  { name: 'Expenses', href: '/expenses', icon: Receipt },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'AI Assistant', href: '/ai-assistant', icon: Sparkles, badge: 'AI' },
  { name: 'AI Customer Service', href: '/ai-customer-service', icon: Headphones, badge: 'Auto' },
  { name: 'Marketing', href: '/marketing', icon: Compass },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar({ mobileOpen, setMobileOpen }: { mobileOpen?: boolean; setMobileOpen?: (open: boolean) => void }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen && setMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#0f1117] text-gray-300 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 border-r border-gray-800/60',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Brand Logo Header */}
        <div className="flex items-center gap-3 px-6 pt-6 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-lime-500 to-green-400 text-black shadow-lg shadow-green-500/20">
            <Zap className="h-6 w-6 fill-current text-black font-black" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-white">RushNshop</span>
            </div>
            <p className="text-[11px] font-medium tracking-wider text-gray-400">AI Operating System</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-3 dark-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen && setMobileOpen(false)}
                className={cn(
                  'group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-150',
                  isActive
                    ? 'bg-[#223b28]/80 text-[#4ade80] border border-[#22c55e]/30 shadow-sm shadow-[#22c55e]/10'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={cn(
                      'h-4 w-4 transition-colors',
                      isActive ? 'text-[#4ade80]' : 'text-gray-400 group-hover:text-white'
                    )}
                  />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span
                    className={cn(
                      'rounded-md px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider',
                      isActive ? 'bg-[#22c55e]/20 text-[#4ade80]' : 'bg-white/10 text-gray-400'
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Profile & AI Assistant Widget */}
        <div className="p-3 space-y-2 border-t border-gray-800/80">
          {/* User Card */}
          <div className="flex items-center justify-between rounded-xl bg-[#161a23] p-2.5 hover:bg-[#1c2230] transition-colors cursor-pointer border border-gray-800/50">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="John Doe"
                  className="h-9 w-9 rounded-full object-cover ring-2 ring-emerald-500/30"
                />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-[#161a23]" />
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-white">John Doe</p>
                <p className="text-[11px] text-gray-400">Owner</p>
              </div>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>

          {/* AI Assistant Quick Card matching Image */}
          <div className="relative overflow-hidden rounded-2xl bg-[#121620] p-3.5 border border-emerald-900/40">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Bot className="h-3.5 w-3.5 text-[#4ade80]" />
                  AI Assistant
                </p>
                <p className="mt-1 text-[11px] text-gray-400 leading-snug">
                  Ask anything about your business.
                </p>
              </div>
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-[#4ade80]">
                <Zap className="h-4 w-4 fill-current" />
              </div>
            </div>
            <button
              onClick={() => {
                router.push('/ai-assistant');
                if (setMobileOpen) setMobileOpen(false);
              }}
              className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#84cc16] py-2 text-xs font-bold text-black shadow-md hover:bg-[#65a30d] transition-all"
            >
              <Zap className="h-3.5 w-3.5 fill-current" />
              Ask AI
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
