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
  ChevronLeft,
  ChevronRight,
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

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: 'Core Platform',
    items: [
      { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { name: 'Landing Page', href: '/', icon: Globe, badge: 'Home' },
    ],
  },
  {
    title: 'Commerce & P&L',
    items: [
      { name: 'Stores', href: '/stores', icon: Store },
      { name: 'Products', href: '/products', icon: Package },
      { name: 'Orders', href: '/orders', icon: ShoppingBag },
      { name: 'Profit Analytics', href: '/profit-analytics', icon: TrendingUp },
      { name: 'Ads Analytics', href: '/ads-analytics', icon: Megaphone },
      { name: 'Expenses', href: '/expenses', icon: Receipt },
      { name: 'Customers', href: '/customers', icon: Users },
    ],
  },
  {
    title: 'AI Intelligence',
    items: [
      { name: 'AI Assistant', href: '/ai-assistant', icon: Sparkles, badge: 'AI' },
      { name: 'AI Customer Service', href: '/ai-customer-service', icon: Headphones, badge: 'Auto' },
      { name: 'Marketing', href: '/marketing', icon: Compass },
    ],
  },
  {
    title: 'Management',
    items: [
      { name: 'Reports', href: '/reports', icon: FileText },
      { name: 'Settings', href: '/settings', icon: Settings },
    ],
  },
];

export default function Sidebar({
  mobileOpen,
  setMobileOpen,
}: {
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Load collapse state preference
  useEffect(() => {
    try {
      const saved = localStorage.getItem('rush_sidebar_collapsed');
      if (saved !== null) {
        setIsCollapsed(saved === 'true');
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('rush_sidebar_collapsed', String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

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
          className="fixed inset-0 z-40 cursor-pointer bg-black/70 backdrop-blur-sm transition-opacity lg:hidden"
          onClick={handleCloseMobile}
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex select-none flex-col border-r border-slate-800/60 bg-[#0f1117] text-slate-300 shadow-2xl transition-all duration-300 ease-in-out lg:static lg:translate-x-0 lg:shadow-none',
          isCollapsed ? 'lg:w-20' : 'lg:w-64',
          mobileOpen ? 'w-64 translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
      >
        {/* Desktop Edge Floating Arrow Toggle Button */}
        <button
          type="button"
          onClick={toggleCollapse}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="absolute -right-3.5 top-6 z-30 hidden h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-slate-700 bg-[#161a23] text-slate-300 shadow-md transition-all duration-200 hover:scale-110 hover:border-lime-500/50 hover:bg-slate-800 hover:text-white lg:flex"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4 stroke-[2.5]" />
          ) : (
            <ChevronLeft className="h-4 w-4 stroke-[2.5]" />
          )}
        </button>

        {/* Brand Logo Header & Mobile Close */}
        <div
          className={cn(
            'flex shrink-0 items-center justify-between border-b border-slate-800/40 pb-3.5 pt-5 transition-all duration-200',
            isCollapsed ? 'px-3 justify-center' : 'px-5',
          )}
        >
          <div className="flex items-center gap-3">
            <Link
              href="/"
              title="RushNshop AI OS"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-lime-500 to-green-400 text-black shadow-lg shadow-green-500/20 transition-transform duration-200 hover:scale-105"
            >
              <Zap className="h-6 w-6 fill-current font-black text-black" />
            </Link>
            {!isCollapsed && (
              <div className="overflow-hidden">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-bold tracking-tight text-white">RushNshop</span>
                </div>
                <p className="text-[11px] font-medium tracking-wider text-slate-400">
                  AI Operating System
                </p>
              </div>
            )}
          </div>

          {/* Close button on mobile */}
          <button
            type="button"
            onClick={handleCloseMobile}
            aria-label="Close sidebar"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl border border-slate-800 text-slate-400 transition-colors hover:bg-white/5 hover:text-white lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation Menu with Section Dividers */}
        <nav className="dark-scrollbar flex-1 space-y-4 overflow-y-auto px-3 py-3">
          {navSections.map((section) => (
            <div key={section.title} className="space-y-1">
              {!isCollapsed ? (
                <p className="px-3 pb-1 pt-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  {section.title}
                </p>
              ) : (
                <div className="my-2 border-t border-slate-800/60" />
              )}
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <div key={item.name} className="relative group">
                    <Link
                      href={item.href}
                      onClick={handleCloseMobile}
                      className={cn(
                        'relative flex cursor-pointer items-center rounded-xl border px-3 py-2 text-xs font-medium outline-none transition-all duration-150',
                        isCollapsed ? 'justify-center px-2 py-2.5' : 'justify-between',
                        isActive
                          ? 'border-[#22c55e]/30 bg-[#182b20] text-[#4ade80] shadow-xs shadow-[#22c55e]/10'
                          : 'border-transparent text-slate-400 hover:bg-white/5 hover:text-white',
                      )}
                    >
                      {/* Active Left Indicator Bar */}
                      {isActive && (
                        <span className="absolute -left-1.5 top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-[#4ade80] shadow-rush-glow" />
                      )}

                      <div className="flex items-center gap-2.5">
                        <Icon
                          className={cn(
                            'h-4 w-4 shrink-0 transition-colors duration-150',
                            isActive ? 'text-[#4ade80]' : 'text-slate-400 group-hover:text-white',
                          )}
                        />
                        {!isCollapsed && <span className={cn(isActive && 'font-bold')}>{item.name}</span>}
                      </div>

                      {!isCollapsed && item.badge && (
                        <span
                          className={cn(
                            'rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider',
                            isActive
                              ? 'bg-[#22c55e]/20 text-[#4ade80]'
                              : 'bg-white/10 text-slate-400 group-hover:text-slate-200',
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>

                    {/* Floating Tooltip in Collapsed Mode */}
                    {isCollapsed && (
                      <div className="pointer-events-none invisible absolute left-full top-1/2 z-50 ml-3.5 -translate-y-1/2 rounded-xl border border-slate-700 bg-[#161a23] px-3 py-1.5 text-xs font-bold text-white shadow-2xl opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 whitespace-nowrap">
                        <span>{item.name}</span>
                        {item.badge && (
                          <span className="ml-1.5 rounded bg-lime-500/20 px-1 py-0.5 text-[9px] font-bold text-lime-400">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </nav>
        {/* Bottom Profile & AI Assistant Widget */}
        <div
          className={cn(
            'relative shrink-0 space-y-2 border-t border-slate-800/80 transition-all duration-200',
            isCollapsed ? 'p-2' : 'p-3',
          )}
          ref={userMenuRef}
        >
          {/* User Dropdown Modal / Popover */}
          {showUserMenu && (
            <div
              className={cn(
                'animate-in fade-in slide-in-from-bottom-2 absolute bottom-full z-50 mb-2 rounded-2xl border border-slate-700/80 bg-[#161a23] p-2.5 text-xs shadow-2xl',
                isCollapsed ? 'left-2 w-64' : 'left-3 right-3',
              )}
            >
              <div className="flex items-center gap-2.5 border-b border-slate-800 p-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-lime-500 to-emerald-400 text-xs font-black text-black ring-2 ring-emerald-500/40">
                  JD
                </div>
                <div>
                  <p className="text-xs font-bold text-white">John Doe</p>
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
                  className="flex w-full cursor-pointer items-center gap-2 rounded-xl px-2.5 py-2 text-left text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
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
                  className="flex w-full cursor-pointer items-center gap-2 rounded-xl px-2.5 py-2 text-left text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
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
                  className="flex w-full cursor-pointer items-center gap-2 rounded-xl px-2.5 py-2 text-left text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
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
                  className="flex w-full cursor-pointer items-center gap-2 rounded-xl px-2.5 py-1.5 text-left font-medium text-rose-400 transition-colors hover:bg-rose-950/40"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}

          {/* User Card / Avatar Trigger */}
          <button
            type="button"
            onClick={() => setShowUserMenu(!showUserMenu)}
            title={isCollapsed ? 'John Doe (Owner)' : undefined}
            className={cn(
              'flex w-full cursor-pointer items-center rounded-xl border border-slate-800/50 bg-[#161a23] transition-colors hover:bg-[#1c2230]',
              isCollapsed ? 'justify-center p-2' : 'justify-between p-2.5',
            )}
          >
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-lime-500 to-emerald-400 text-xs font-black text-black ring-2 ring-emerald-500/30">
                  JD
                </div>
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-[#161a23]" />
              </div>
              {!isCollapsed && (
                <div className="text-left">
                  <p className="text-xs font-semibold text-white">John Doe</p>
                  <p className="text-[11px] text-slate-400">Owner</p>
                </div>
              )}
            </div>
            {!isCollapsed && (
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-slate-400 transition-transform duration-200',
                  showUserMenu ? 'rotate-180 text-white' : '',
                )}
              />
            )}
          </button>

          {/* AI Assistant Quick Card / Button */}
          {!isCollapsed ? (
            <div className="relative overflow-hidden rounded-2xl border border-emerald-900/40 bg-[#121620] p-3.5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="flex items-center gap-1.5 text-xs font-bold text-white">
                    <Bot className="h-3.5 w-3.5 text-[#4ade80]" />
                    AI Assistant
                  </p>
                  <p className="mt-1 text-[11px] leading-snug text-slate-400">
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
                className="shadow-xs mt-3 flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-[#84cc16] py-2 text-xs font-bold text-black transition-colors hover:bg-[#72b012]"
              >
                <Zap className="h-3.5 w-3.5 fill-current" />
                Ask AI
              </Link>
            </div>
          ) : (
            <div className="relative group">
              <Link
                href="/ai-assistant"
                onClick={handleCloseMobile}
                className="flex h-10 w-full cursor-pointer items-center justify-center rounded-xl bg-gradient-to-tr from-lime-500/20 to-emerald-500/20 border border-emerald-500/30 text-[#4ade80] transition-transform hover:scale-105 hover:bg-emerald-500/30"
              >
                <Sparkles className="h-4 w-4 fill-current" />
              </Link>
              <div className="pointer-events-none invisible absolute left-full top-1/2 z-50 ml-3.5 -translate-y-1/2 rounded-xl border border-slate-700 bg-[#161a23] px-3 py-1.5 text-xs font-bold text-white shadow-2xl opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 whitespace-nowrap">
                <span>AI Copilot & Script Studio</span>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
