'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  Calendar,
  Bell,
  Plus,
  Menu,
  ChevronDown,
  Check,
  Store as StoreIcon,
  Sun,
  Moon,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { cn } from '../../lib/utils';
import AddStoreModal from './AddStoreModal';
import NotificationsDrawer from './NotificationsDrawer';

const datePresets = [
  'Today',
  'Yesterday',
  'Last 7 Days (May 17 - May 23, 2024)',
  'Last 14 Days',
  'Last 30 Days',
  'This Month',
  'Custom Range...',
];

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  '/': { title: 'Dashboard', subtitle: 'Real-time overview of your business performance' },
  '/stores': { title: 'Multi-Store Management', subtitle: 'Manage accounts, sync TikTok Shops, and configure staff permissions' },
  '/products': { title: 'Product Profit Analytics', subtitle: 'SKU-level profitability, true COGS, TikTok fees, and ad attribution' },
  '/calculator': { title: 'TikTok Profit Calculator', subtitle: 'Pre-listing unit economics, break-even price, and target margin simulator' },
  '/orders': { title: 'Orders & Fulfillment', subtitle: 'Real-time TikTok Shop orders, fulfillment status, and order profit margins' },
  '/profit-analytics': { title: 'TrueProfit Analytics', subtitle: 'Comprehensive financial waterfall, fee breakdown, and profit trends' },
  '/ads-analytics': { title: 'TikTok Ads & Attribution', subtitle: 'ROAS tracking, campaign profitability, CPA analysis, and budget optimization' },
  '/expenses': { title: 'Cost & Expense Tracker', subtitle: 'Fixed operating costs, SaaS tools, staff salaries, and custom expenses' },
  '/customers': { title: 'Customer Lifetime Value (LTV)', subtitle: 'Customer acquisition cost, repurchase frequency, and cohort analytics' },
  '/ai-assistant': { title: 'AI Business Assistant', subtitle: 'Ask conversational AI questions about revenue, scaling, and ad profit' },
  '/ai-customer-service': { title: 'AI Customer Service Desk', subtitle: 'Automated TikTok Shop customer inquiry replies, tracking, and escalations' },
  '/marketing': { title: 'Marketing Attribution', subtitle: 'Multi-channel marketing ROI, affiliate creators, and top converting campaigns' },
  '/reports': { title: 'Profit & Loss Reports', subtitle: 'GAAP e-commerce P&L statements, financial audit summaries, and exports' },
  '/settings': { title: 'System Settings & Integrations', subtitle: 'TikTok Shop API credentials, TikTok Ads tokens, webhooks, and team roles' },
};

export default function TopHeader({ onOpenMobileMenu }: { onOpenMobileMenu: () => void }) {
  const pathname = usePathname();
  const { selectedStoreId, setSelectedStoreId, stores, dateRange, setDateRange, theme, toggleTheme } = useStore();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStorePicker, setShowStorePicker] = useState(false);
  const [showAddStore, setShowAddStore] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const pageInfo = pageTitles[pathname] || {
    title: 'RushNshop OS',
    subtitle: 'TikTok Shop Business Management',
  };

  const selectedStoreObj = stores.find((s) => s.id === selectedStoreId);

  return (
    <>
      <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-[#0f1117]/95 px-4 sm:px-8 backdrop-blur-md transition-colors">
        {/* Left: Hamburger (mobile) + Page Title & Subtitle */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white transition-colors">{pageInfo.title}</h1>
            <p className="text-xs sm:text-sm font-medium text-emerald-600 dark:text-[#4ade80] sm:text-gray-500 dark:sm:text-gray-400">
              {pageInfo.subtitle}
            </p>
          </div>
        </div>

        {/* Right: Actions (Theme Toggle, Store Selector, Date picker, Notifications, Add Store) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#161b22] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10 shadow-sm transition-all"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-amber-400 fill-amber-400/20" />
            ) : (
              <Moon className="h-4 w-4 text-slate-700" />
            )}
          </button>

          {/* Store Quick Switcher */}
          <div className="relative">
            <button
              onClick={() => {
                setShowStorePicker(!showStorePicker);
                setShowDatePicker(false);
              }}
              className="flex items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#161b22] px-3 py-2 text-xs font-semibold text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
            >
              <StoreIcon className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
              <span className="hidden sm:inline">
                {selectedStoreId === 'all' ? 'All Stores (4)' : `${selectedStoreObj?.flag} ${selectedStoreObj?.name}`}
              </span>
              <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
            </button>

            {showStorePicker && (
              <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#161b22] p-2 shadow-xl z-50 animate-in fade-in slide-in-from-top-2">
                <p className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">Filter By Store</p>
                <button
                  onClick={() => {
                    setSelectedStoreId('all');
                    setShowStorePicker(false);
                  }}
                  className={cn(
                    'flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium text-left transition-colors',
                    selectedStoreId === 'all'
                      ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-[#4ade80] font-bold'
                      : 'hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300'
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">🌐</span>
                    <span>All Accounts Combined</span>
                  </div>
                  {selectedStoreId === 'all' && <Check className="h-4 w-4 text-emerald-600 dark:text-[#4ade80]" />}
                </button>
                <div className="my-1 border-t border-gray-100 dark:border-gray-800" />
                {stores.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => {
                      setSelectedStoreId(st.id);
                      setShowStorePicker(false);
                    }}
                    className={cn(
                      'flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium text-left transition-colors',
                      selectedStoreId === st.id
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-[#4ade80] font-bold'
                        : 'hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300'
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{st.flag}</span>
                      <span>{st.name}</span>
                    </div>
                    {selectedStoreId === st.id && <Check className="h-4 w-4 text-emerald-600 dark:text-[#4ade80]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Date Range Selector Pill */}
          <div className="relative">
            <button
              onClick={() => {
                setShowDatePicker(!showDatePicker);
                setShowStorePicker(false);
              }}
              className="flex items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#161b22] px-3.5 py-2 text-xs font-semibold text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-white/10 transition-all"
            >
              <Calendar className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
              <span>{dateRange}</span>
              <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
            </button>

            {showDatePicker && (
              <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#161b22] p-2 shadow-xl z-50 animate-in fade-in slide-in-from-top-2">
                <p className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">Date Presets</p>
                {datePresets.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => {
                      if (preset.includes('May 17')) {
                        setDateRange('May 17 - May 23, 2024');
                      } else if (preset === 'Today') {
                        setDateRange('Today (May 23, 2024)');
                      } else if (preset === 'Yesterday') {
                        setDateRange('Yesterday (May 22, 2024)');
                      } else if (preset === 'Last 30 Days') {
                        setDateRange('Apr 24 - May 23, 2024');
                      } else if (preset === 'This Month') {
                        setDateRange('May 01 - May 23, 2024');
                      } else {
                        setDateRange(preset);
                      }
                      setShowDatePicker(false);
                    }}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-left"
                  >
                    <span>{preset}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Bell */}
          <button
            onClick={() => setShowNotifications(true)}
            className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#161b22] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10 shadow-sm transition-all"
            title="Notifications & Insights"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-lime-500 text-[9px] font-bold text-black ring-2 ring-white dark:ring-[#0f1117]">
              0
            </span>
          </button>

          {/* Add Store Button matching Image */}
          <button
            onClick={() => setShowAddStore(true)}
            className="flex items-center gap-1.5 rounded-xl bg-[#84cc16] px-4 py-2 text-xs font-bold text-black shadow-sm hover:bg-[#72b012] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="h-4 w-4 stroke-[2.5]" />
            <span>Add Store</span>
          </button>
        </div>
      </header>

      {/* Add Store Modal */}
      <AddStoreModal isOpen={showAddStore} onClose={() => setShowAddStore(false)} />

      {/* Notifications & AI Insights Drawer */}
      <NotificationsDrawer isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
    </>
  );
}
