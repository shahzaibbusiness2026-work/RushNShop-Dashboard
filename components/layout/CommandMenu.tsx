'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Calculator,
  LayoutDashboard,
  Package,
  Tag,
  TrendingUp,
  Settings,
  Sparkles,
  X,
  ArrowRight,
  Store,
  FileText,
  CreditCard,
  History,
  Scale,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export default function CommandMenu() {
  const {
    commandMenuOpen,
    setCommandMenuOpen,
    products,
    stores,
  } = useStore();
  const [query, setQuery] = useState('');
  const router = useRouter();

  // Keyboard shortcut listener (Ctrl+K / Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandMenuOpen(!commandMenuOpen);
      }
      if (e.key === 'Escape' && commandMenuOpen) {
        setCommandMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandMenuOpen, setCommandMenuOpen]);

  if (!commandMenuOpen) return null;

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.sku.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()),
  );

  const navigationItems = [
    { label: 'Executive Dashboard', path: '/dashboard', icon: LayoutDashboard, tag: 'Core' },
    { label: 'Unit Economics Calculator', path: '/calculator', icon: Calculator, tag: 'Tools' },
    { label: 'Product Comparison Studio', path: '/compare', icon: Scale, tag: 'New' },
    { label: 'TikTok Listings Manager', path: '/listings', icon: Tag, tag: 'New' },
    { label: 'Calculation Audit History', path: '/history', icon: History, tag: 'New' },
    { label: 'TrueProfit Analytics', path: '/profit-analytics', icon: TrendingUp, tag: 'Finance' },
    { label: 'AI Copilot & Script Studio', path: '/ai-assistant', icon: Sparkles, tag: 'AI' },
    { label: 'Multi-Store Manager', path: '/stores', icon: Store, tag: 'Stores' },
    { label: 'Subscription & Pricing', path: '/pricing', icon: CreditCard, tag: 'SaaS' },
    { label: 'P&L Reports & PDF', path: '/reports', icon: FileText, tag: 'Reports' },
    { label: 'Settings & API Keys', path: '/settings', icon: Settings, tag: 'Config' },
  ].filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));

  const handleNavigate = (path: string) => {
    setCommandMenuOpen(false);
    router.push(path);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-150"
      onClick={() => setCommandMenuOpen(false)}
    >
      <div
        className="w-full max-w-xl bg-white dark:bg-[#121620] rounded-2xl shadow-2xl border border-slate-200/90 dark:border-slate-700/80 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 border-b border-slate-100 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search calculations, products, pages, or AI tools... (Ctrl+K)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full py-4 px-3 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-sm focus:outline-none bg-transparent"
          />
          <button
            onClick={() => setCommandMenuOpen(false)}
            aria-label="Close command menu"
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-3 dark-scrollbar">
          {/* Quick AI Trigger */}
          <div
            onClick={() => handleNavigate('/ai-assistant')}
            className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-lime-500/10 via-emerald-500/10 to-teal-500/10 border border-emerald-500/30 hover:border-emerald-400 cursor-pointer transition-all group"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#84cc16] text-black flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4 fill-current" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  Ask AI Profit & Script Advisor
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Instant margin optimization, script generation, and competitor insights
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-emerald-600 dark:text-[#4ade80] group-hover:translate-x-1 transition-transform" />
          </div>

          {/* Products List */}
          {filteredProducts.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Products & SKUs ({filteredProducts.length})
              </div>
              <div className="space-y-1 mt-1">
                {filteredProducts.slice(0, 4).map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => handleNavigate('/products')}
                    className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 text-left transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0">
                        <img
                          src={prod.image}
                          alt={prod.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-slate-900 dark:text-slate-200 truncate group-hover:text-emerald-600 dark:group-hover:text-[#4ade80]">
                          {prod.title}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {prod.sku} • {prod.category}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0 font-mono-numeric">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        ${prod.revenue.toFixed(2)}
                      </span>
                      <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-[#4ade80]">
                        {prod.margin}% Margin
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Pages */}
          {navigationItems.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Navigation & Tools
              </div>
              <div className="space-y-1 mt-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.path}
                      onClick={() => handleNavigate(item.path)}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 text-left text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-slate-400 dark:text-slate-400" />
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {item.label}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                        {item.tag}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-[#0b0e14] border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Press <strong>Esc</strong> to close</span>
          <span>RushNshop AI OS</span>
        </div>
      </div>
    </div>
  );
}
