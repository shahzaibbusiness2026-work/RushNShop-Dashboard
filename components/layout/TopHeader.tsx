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
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { cn } from '../../lib/utils';
import AddStoreModal from './AddStoreModal';
import NotificationsDrawer from './NotificationsDrawer';

const datePresetsList = [
  { label: 'Today', short: 'Today', range: 'Today (May 23, 2024)', presetKey: 'Today' },
  { label: 'Yesterday', short: '1D', range: 'Yesterday (May 22, 2024)', presetKey: 'Yesterday' },
  { label: 'Last 7 Days (Default)', short: '7D', range: 'May 17 - May 23, 2024', presetKey: 'Last 7 Days' },
  { label: 'Last 14 Days', short: '14D', range: 'May 10 - May 23, 2024', presetKey: 'Last 14 Days' },
  { label: 'Last 30 Days', short: '30D', range: 'Apr 24 - May 23, 2024', presetKey: 'Last 30 Days' },
  { label: 'This Month (May 2024)', short: 'Month', range: 'May 01 - May 23, 2024', presetKey: 'This Month' },
];

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  '/': { title: 'RushNshop Platform', subtitle: 'AI Operating System for TikTok Shop' },
  '/dashboard': { title: 'Dashboard', subtitle: 'Real-time business performance' },
  '/stores': { title: 'Multi-Store', subtitle: 'Manage accounts & permissions' },
  '/products': { title: 'Products', subtitle: 'SKU profitability & COGS' },
  '/calculator': { title: 'Profit Calculator', subtitle: 'Unit economics simulator' },
  '/orders': { title: 'Orders', subtitle: 'Live sync & fulfillment' },
  '/profit-analytics': { title: 'TrueProfit', subtitle: 'Waterfall deductions & margin' },
  '/ads-analytics': { title: 'TikTok Ads', subtitle: 'ROAS & CPA tracking' },
  '/expenses': { title: 'Expenses', subtitle: 'Operating costs & payroll' },
  '/customers': { title: 'Customers', subtitle: 'LTV & cohort retention' },
  '/ai-assistant': { title: 'AI Assistant', subtitle: 'Conversational business AI' },
  '/ai-customer-service': { title: 'AI Helpdesk', subtitle: 'Automated CS inquiry replies' },
  '/marketing': { title: 'Marketing', subtitle: 'Channel & creator ROI' },
  '/reports': { title: 'P&L Reports', subtitle: 'GAAP statements & exports' },
  '/settings': { title: 'Settings', subtitle: 'API tokens & webhooks' },
  '/landing': { title: 'RushNshop Platform', subtitle: 'AI Operating System for TikTok Shop' },
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
    title: 'RushNshop OS',
    subtitle: 'TikTok Shop Business Management',
  };

  const selectedStoreObj = stores.find((s) => s.id === selectedStoreId);
  const selectedPresetObj = datePresetsList.find((p) => p.presetKey === datePreset) || datePresetsList[2];

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 sm:h-20 items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0f1117]/95 px-3 sm:px-8 backdrop-blur-md transition-colors">
        {/* Left: Hamburger (mobile) + Page Title & Subtitle */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            onClick={onOpenMobileMenu}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 lg:hidden cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="min-w-0">
            <h1 className="text-base sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white transition-colors truncate">
              {pageInfo.title}
            </h1>
            <p className="hidden md:block text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 truncate">
              {pageInfo.subtitle}
            </p>
          </div>
        </div>

        {/* Right: Actions (Theme Toggle, Store Selector, Date picker, Notifications, Add Store) */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            className="flex h-8.5 w-8.5 sm:h-9 sm:w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161b26] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/10 shadow-2xs transition-all cursor-pointer"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-amber-400 fill-amber-400/20" />
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
              className="flex items-center gap-1 sm:gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161b26] px-2 sm:px-3 py-1.5 sm:py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-2xs hover:bg-slate-50 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              <StoreIcon className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400 hidden xs:inline" />
              <span className="truncate max-w-[65px] xs:max-w-[90px] sm:max-w-none">
                {selectedStoreId === 'all' ? (
                  <>
                    <span className="xs:hidden">🌐 All</span>
                    <span className="hidden xs:inline sm:hidden">All</span>
                    <span className="hidden sm:inline">All Stores ({stores.length})</span>
                  </>
                ) : (
                  <>
                    <span>{selectedStoreObj?.flag}</span>
                    <span className="hidden xs:inline ml-1">{selectedStoreObj?.name}</span>
                  </>
                )}
              </span>
              <ChevronDown className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-slate-400 shrink-0" />
            </button>

            {showStorePicker && (
              <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161b26] p-2 shadow-xl z-50 animate-in fade-in slide-in-from-top-2">
                <p className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Filter By Store</p>
                <button
                  onClick={() => {
                    setSelectedStoreId('all');
                    setShowStorePicker(false);
                  }}
                  className={cn(
                    'flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium text-left transition-colors cursor-pointer',
                    selectedStoreId === 'all'
                      ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-[#4ade80] font-bold'
                      : 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300'
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">🌐</span>
                    <span>All Accounts Combined</span>
                  </div>
                  {selectedStoreId === 'all' && <Check className="h-4 w-4 text-emerald-600 dark:text-[#4ade80]" />}
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
                      'flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium text-left transition-colors cursor-pointer',
                      selectedStoreId === st.id
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-[#4ade80] font-bold'
                        : 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300'
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
          <div className="relative" ref={datePickerRef}>
            <button
              onClick={() => {
                setShowDatePicker(!showDatePicker);
                setShowStorePicker(false);
              }}
              className="flex items-center gap-1 sm:gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161b26] px-2 sm:px-3.5 py-1.5 sm:py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-2xs hover:bg-slate-50 dark:hover:bg-white/10 transition-all cursor-pointer"
            >
              <Calendar className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
              <span className="hidden md:inline">{dateRange}</span>
              <span className="md:hidden font-bold text-[11px]">{selectedPresetObj.short}</span>
              <ChevronDown className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-slate-400 shrink-0" />
            </button>

            {showDatePicker && (
              <div className="absolute right-0 top-full mt-2 w-64 max-w-[calc(100vw-24px)] rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161b26] p-2 shadow-xl z-50 animate-in fade-in slide-in-from-top-2">
                <p className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Date Presets</p>
                {datePresetsList.map((item) => (
                  <button
                    key={item.presetKey}
                    onClick={() => {
                      setDateRange(item.range);
                      setDatePreset(item.presetKey);
                      setShowDatePicker(false);
                    }}
                    className={cn(
                      'flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-colors text-left cursor-pointer',
                      datePreset === item.presetKey
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-[#4ade80] font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                    )}
                  >
                    <span>{item.label}</span>
                    {datePreset === item.presetKey && <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-[#4ade80]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Bell */}
          <button
            onClick={() => setShowNotifications(true)}
            className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161b26] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/10 shadow-2xs transition-all cursor-pointer"
            title="Notifications & Insights"
          >
            <Bell className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-lime-500 text-[9px] font-bold text-black ring-2 ring-white dark:ring-[#0f1117]">
              {storeInsights.length}
            </span>
          </button>

          {/* Add Store Button */}
          <button
            onClick={() => setShowAddStore(true)}
            className="hidden xs:flex items-center gap-1.5 rounded-xl bg-[#84cc16] px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs font-bold text-black shadow-2xs hover:bg-[#72b012] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2.5]" />
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
