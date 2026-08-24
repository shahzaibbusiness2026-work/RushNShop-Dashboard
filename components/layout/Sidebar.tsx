'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  User,
  Shield,
  LogOut,
  Globe,
  X,
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Landing Page', href: '/', icon: Globe, badge: 'Home' },
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

export default function Sidebar({
  mobileOpen,
  setMobileOpen,
}: {
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCloseMobile = () => {
    if (setMobileOpen) setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden transition-opacity cursor-pointer"
          onClick={handleCloseMobile}
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#0f1117] text-slate-300 transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 border-r border-slate-800/60 select-none shadow-2xl lg:shadow-none',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Brand Logo Header & Mobile Close */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3.5 shrink-0 border-b border-slate-800/40">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-lime-500 to-green-400 text-black shadow-lg shadow-green-500/20">
              <Zap className="h-6 w-6 fill-current text-black font-black" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-white">RushNshop</span>
              </div>
              <p className="text-[11px] font-medium tracking-wider text-slate-400">AI Operating System</p>
            </div>
          </div>
          {/* Close button on mobile */}
          <button
            type="button"
            onClick={handleCloseMobile}
            aria-label="Close sidebar"
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-white/5 lg:hidden cursor-pointer transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
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
                onClick={handleCloseMobile}
                className={cn(
                  'group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium border transition-colors duration-100 outline-none cursor-pointer',
                  isActive
                    ? 'bg-[#182b20] text-[#4ade80] border-[#22c55e]/35 shadow-xs shadow-[#22c55e]/10'
                    : 'border-transparent text-slate-400 hover:bg-white/5 hover:text-white'
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={cn(
                      'h-4 w-4 transition-colors duration-100',
                      isActive ? 'text-[#4ade80]' : 'text-slate-400 group-hover:text-white'
                    )}
                  />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span
                    className={cn(
                      'rounded-md px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider',
                      isActive ? 'bg-[#22c55e]/20 text-[#4ade80]' : 'bg-white/10 text-slate-400'
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
        <div className="p-3 space-y-2 border-t border-slate-800/80 relative shrink-0" ref={userMenuRef}>
          {/* User Dropdown Modal / Popover */}
          {showUserMenu && (
            <div className="absolute bottom-full left-3 right-3 mb-2 rounded-2xl border border-slate-700/80 bg-[#161a23] p-2.5 shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-2 text-xs">
              <div className="flex items-center gap-2.5 p-2 border-b border-slate-800">
                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-lime-500 to-emerald-400 flex items-center justify-center text-black font-black text-xs ring-2 ring-emerald-500/40">
                  JD
                </div>
                <div>
                  <p className="font-bold text-white text-xs">John Doe</p>
                  <p className="text-[10px] text-slate-400">john@rushnshop.com</p>
                </div>
              </div>

              <div className="my-1.5 space-y-0.5">
                <Link
                  href="/settings"
                  onClick={() => {
                    setShowUserMenu(false);
                    handleCloseMobile();
                  }}
                  className="flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-slate-300 hover:bg-white/5 hover:text-white text-left transition-colors cursor-pointer"
                >
                  <User className="h-3.5 w-3.5 text-slate-400" />
                  <span>Account & Profile</span>
                </Link>

                <Link
                  href="/stores"
                  onClick={() => {
                    setShowUserMenu(false);
                    handleCloseMobile();
                  }}
                  className="flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-slate-300 hover:bg-white/5 hover:text-white text-left transition-colors cursor-pointer"
                >
                  <Shield className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Staff Roles & Permissions</span>
                </Link>

                <Link
                  href="/reports"
                  onClick={() => {
                    setShowUserMenu(false);
                    handleCloseMobile();
                  }}
                  className="flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-slate-300 hover:bg-white/5 hover:text-white text-left transition-colors cursor-pointer"
                >
                  <FileText className="h-3.5 w-3.5 text-blue-400" />
                  <span>Billing & P&L Statement</span>
                </Link>
              </div>

              <div className="border-t border-slate-800 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    alert('Signed out of RushNshop OS session.');
                    setShowUserMenu(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-xl px-2.5 py-1.5 text-rose-400 hover:bg-rose-950/40 text-left transition-colors font-medium cursor-pointer"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}

          {/* User Card */}
          <button
            type="button"
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex w-full items-center justify-between rounded-xl bg-[#161a23] p-2.5 hover:bg-[#1c2230] transition-colors border border-slate-800/50 text-left cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-lime-500 to-emerald-400 flex items-center justify-center text-black font-black text-xs ring-2 ring-emerald-500/30">
                  JD
                </div>
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-[#161a23]" />
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-white">John Doe</p>
                <p className="text-[11px] text-slate-400">Owner</p>
              </div>
            </div>
            <ChevronDown
              className={cn(
                'h-4 w-4 text-slate-400 transition-transform duration-200',
                showUserMenu ? 'rotate-180 text-white' : ''
              )}
            />
          </button>

          {/* AI Assistant Quick Card */}
          <div className="relative overflow-hidden rounded-2xl bg-[#121620] p-3.5 border border-emerald-900/40">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Bot className="h-3.5 w-3.5 text-[#4ade80]" />
                  AI Assistant
                </p>
                <p className="mt-1 text-[11px] text-slate-400 leading-snug">
                  Ask anything about your business.
                </p>
              </div>
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-[#4ade80]">
                <Zap className="h-4 w-4 fill-current" />
              </div>
            </div>
            <Link
              href="/ai-assistant"
              onClick={handleCloseMobile}
              className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#84cc16] py-2 text-xs font-bold text-black shadow-xs hover:bg-[#72b012] transition-colors cursor-pointer"
            >
              <Zap className="h-3.5 w-3.5 fill-current" />
              Ask AI
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
