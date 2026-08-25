'use client';

import React, { useState, useRef, useEffect } from 'react';
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
  Sparkles,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { cn } from '../../lib/utils';
import AddStoreModal from './AddStoreModal';
import NotificationsDrawer from './NotificationsDrawer';

const datePresetsList = [
  { label: 'Today', short: 'Today', range: 'Today (May 23, 2024)', presetKey: 'Today' },
  { label: 'Yesterday', short: '1D', range: 'Yesterday (May 22, 2024)', presetKey: 'Yesterday' },
  {
    label: 'Last 7 Days (Default)',
    short: '7D',
    range: 'May 17 - May 23, 2024',
    presetKey: 'Last 7 Days',
  },
  {
    label: 'Last 14 Days',
    short: '14D',
    range: 'May 10 - May 23, 2024',
    presetKey: 'Last 14 Days',
  },
  {
    label: 'Last 30 Days',
    short: '30D',
    range: 'Apr 24 - May 23, 2024',
    presetKey: 'Last 30 Days',
  },
  {
    label: 'This Month (May 2024)',
    short: 'Month',
    range: 'May 01 - May 23, 2024',
    presetKey: 'This Month',
  },
];

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  '/': { title: 'RushNshop', subtitle: 'TikTok Shop Performance Platform' },
  '/dashboard': { title: 'Dashboard', subtitle: 'Real-time performance & financials' },
  '/stores': { title: 'Multi-Store', subtitle: 'Connected accounts & permissions' },
  '/products': { title: 'Products', subtitle: 'SKU profitability & COGS' },
  '/calculator': { title: 'Profit Calculator', subtitle: 'Unit economics simulator' },
  '/compare': { title: 'Product Comparison', subtitle: 'Side-by-side profit evaluation' },
  '/listings': { title: 'TikTok Listings', subtitle: 'Drafts & catalog synchronization' },
  '/history': { title: 'Audit History', subtitle: 'Historical margin calculations log' },
  '/pricing': { title: 'Pricing & Plans', subtitle: 'SaaS subscriptions & tier upgrades' },
  '/orders': { title: 'Orders', subtitle: 'Live sync & fulfillment' },
  '/profit-analytics': { title: 'TrueProfit', subtitle: 'Waterfall deductions & margin' },
  '/ads-analytics': { title: 'TikTok Ads', subtitle: 'ROAS & CPA tracking' },
  '/expenses': { title: 'Expenses', subtitle: 'Operating costs & overhead' },
  '/customers': { title: 'Customers', subtitle: 'LTV & cohort retention' },
  '/ai-assistant': { title: 'AI Assistant', subtitle: 'Conversational business intelligence' },
  '/ai-customer-service': { title: 'AI Helpdesk', subtitle: 'Automated inquiry resolution' },
  '/marketing': { title: 'Marketing', subtitle: 'Creator affiliate ROI' },
  '/reports': { title: 'P&L Reports', subtitle: 'GAAP statements & exports' },
  '/settings': { title: 'Settings', subtitle: 'API credentials & webhooks' },
  '/landing': { title: 'RushNshop', subtitle: 'TikTok Shop Performance Platform' },
};

export default function TopHeader({ onOpenMobileMenu }: { onOpenMobileMenu: () => void }) {
  const pathname = usePathname();
  const {
    selectedStoreId,
    setSelectedStoreId,
    stores,
    dateRange,
    setDateRange,
    datePreset,
    setDatePreset,
    theme,
    toggleTheme,
    storeInsights,
  } = useStore();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStorePicker, setShowStorePicker] = useState(false);
  const [showAddStore, setShowAddStore] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const storePickerRef = useRef<HTMLDivElement>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);

  // Close popovers on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (storePickerRef.current && !storePickerRef.current.contains(event.target as Node)) {
        setShowStorePicker(false);
      }
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setShowDatePicker(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const pageInfo = pageTitles[pathname] || {
    title: 'RushNshop',
    subtitle: 'TikTok Shop Performance Platform',
  };

  const selectedStoreObj = stores.find((s) => s.id === selectedStoreId);
  const selectedPresetObj =
    datePresetsList.find((p) => p.presetKey === datePreset) ??
    datePresetsList[2] ??
    datePresetsList[0]!;

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/80 px-4 backdrop-blur-xl transition-colors dark:border-slate-800/80 dark:bg-[#090d16]/80 sm:px-8">
        {/* Left: Mobile Trigger + Page Header */}
        <div className="flex min-w-0 items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-white/5 lg:hidden"
            aria-label="Open navigation menu"
          >
            <Menu className="h-4 w-4" />
          </button>
          <div className="min-w-0">
            <h1 className="truncate text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
              {pageInfo.title}
            </h1>
            <p className="hidden truncate text-xs font-normal text-slate-500 dark:text-slate-400 sm:block">
              {pageInfo.subtitle}
            </p>
          </div>
        </div>

        {/* Right: Controls & Actions */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            className="flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-xl border border-slate-200/80 bg-white text-slate-600 transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-[#0f1420] dark:text-slate-300 dark:hover:bg-white/5 sm:h-9 sm:w-9"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-slate-700" />
            )}
          </button>

          {/* Store Quick Switcher */}
          <div className="relative" ref={storePickerRef}>
            <button
              onClick={() => {
                setShowStorePicker(!showStorePicker);
                setShowDatePicker(false);
              }}
              className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-[#0f1420] dark:text-slate-200 dark:hover:bg-white/5 sm:px-3 sm:py-2"
            >
              <StoreIcon className="h-3.5 w-3.5 text-slate-400" />
              <span className="max-w-[70px] truncate sm:max-w-none">
                {selectedStoreId === 'all' ? (
                  <span>All Stores ({stores.length})</span>
                ) : (
                  <span>{selectedStoreObj?.flag} {selectedStoreObj?.name}</span>
                )}
              </span>
              <ChevronDown className="h-3 w-3 shrink-0 text-slate-400" />
            </button>

            {showStorePicker && (
              <div className="animate-in fade-in slide-in-from-top-2 absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl dark:border-slate-800 dark:bg-[#0f1420]">
                <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Select Active Account
                </p>
                <button
                  onClick={() => {
                    setSelectedStoreId('all');
                    setShowStorePicker(false);
                  }}
                  className={cn(
                    'flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition-colors',
                    selectedStoreId === 'all'
                      ? 'bg-emerald-50 font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400'
                      : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-white/5',
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🌐</span>
                    <div className="min-w-0">
                      <p className="font-medium leading-tight">All Connected Stores</p>
                      <p className="text-[10px] text-slate-400">{stores.length} regional accounts</p>
                    </div>
                  </div>
                  {selectedStoreId === 'all' && (
                    <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  )}
                </button>
                <div className="my-1 border-t border-slate-100 dark:border-slate-800" />
                {stores.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => {
                      setSelectedStoreId(st.id);
                      setShowStorePicker(false);
                    }}
                    className={cn(
                      'flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition-colors',
                      selectedStoreId === st.id
                        ? 'bg-emerald-50 font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400'
                        : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-white/5',
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{st.flag}</span>
                      <div className="min-w-0">
                        <p className="truncate font-medium leading-tight text-slate-900 dark:text-slate-100">
                          {st.name}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {st.currency} • {st.country}
                        </p>
                      </div>
                    </div>
                    {selectedStoreId === st.id && (
                      <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Date Range Selector */}
          <div className="relative" ref={datePickerRef}>
            <button
              onClick={() => {
                setShowDatePicker(!showDatePicker);
                setShowStorePicker(false);
              }}
              className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-[#0f1420] dark:text-slate-200 dark:hover:bg-white/5 sm:px-3.5 sm:py-2"
            >
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              <span className="hidden md:inline">{dateRange}</span>
              <span className="text-[11px] font-medium md:hidden">{selectedPresetObj.short}</span>
              <ChevronDown className="h-3 w-3 shrink-0 text-slate-400" />
            </button>

            {showDatePicker && (
              <div className="animate-in fade-in slide-in-from-top-2 absolute right-0 top-full z-50 mt-2 w-60 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl dark:border-slate-800 dark:bg-[#0f1420]">
                <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Date Presets
                </p>
                {datePresetsList.map((item) => (
                  <button
                    key={item.presetKey}
                    onClick={() => {
                      setDateRange(item.range);
                      setDatePreset(item.presetKey);
                      setShowDatePicker(false);
                    }}
                    className={cn(
                      'flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition-colors',
                      datePreset === item.presetKey
                        ? 'bg-emerald-50 font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400'
                        : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-white/5',
                    )}
                  >
                    <span>{item.label}</span>
                    {datePreset === item.presetKey && (
                      <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Bell */}
          <button
            onClick={() => setShowNotifications(true)}
            aria-label={`View notifications (${storeInsights.length} active)`}
            className="relative flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-xl border border-slate-200/80 bg-white text-slate-600 transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-[#0f1420] dark:text-slate-300 dark:hover:bg-white/5 sm:h-9 sm:w-9"
            title="Notifications & Insights"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 text-[8px] font-bold text-white ring-2 ring-white dark:ring-[#090d16]">
              {storeInsights.length}
            </span>
          </button>

          {/* Add Store Button */}
          <button
            onClick={() => setShowAddStore(true)}
            className="hidden cursor-pointer items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-emerald-500 xs:flex sm:px-3.5 sm:py-2"
          >
            <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
            <span className="hidden sm:inline">Add Store</span>
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
