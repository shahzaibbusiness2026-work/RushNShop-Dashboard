'use client';

import React, { useState } from 'react';
import { X, Store, Globe, Key, ShieldCheck, CheckCircle2, Loader2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Currency } from '../../types';

interface AddStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const countryOptions = [
  { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD' as Currency, symbol: '$' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP' as Currency, symbol: '£' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', currency: 'EUR' as Currency, symbol: '€' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', currency: 'CAD' as Currency, symbol: 'CA$' },
  { code: 'FR', name: 'France', flag: '🇫🇷', currency: 'EUR' as Currency, symbol: '€' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', currency: 'EUR' as Currency, symbol: '€' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', currency: 'EUR' as Currency, symbol: '€' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', currency: 'USD' as Currency, symbol: 'S$' },
];

export default function AddStoreModal({ isOpen, onClose }: AddStoreModalProps) {
  const { addStore } = useStore();
  const [storeName, setStoreName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(countryOptions[0]);
  const [appKey, setAppKey] = useState('');
  const [appSecret, setAppSecret] = useState('');
  const [role, setRole] = useState<'Owner' | 'Admin' | 'Manager' | 'Staff'>('Owner');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeName.trim()) return;

    setIsConnecting(true);

    try {
      await addStore({
        name: storeName.trim(),
        country: selectedCountry.name,
        countryCode: selectedCountry.code,
        flag: selectedCountry.flag,
        currency: selectedCountry.currency,
        currencySymbol: selectedCountry.symbol,
        isConnected: true,
        apiStatus: 'active',
        totalRevenue: 0,
        totalOrders: 0,
        netProfit: 0,
        margin: 0,
        growth: 0,
        lastSyncTime: 'Just now',
        accountRole: role,
      });

      setIsConnecting(false);
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
        setStoreName('');
        setAppKey('');
        setAppSecret('');
        onClose();
      }, 1200);
    } catch (err) {
      setIsConnecting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#151b26] p-6 shadow-2xl text-gray-900 dark:text-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-lime-100 dark:bg-lime-950/50 text-lime-700 dark:text-[#4ade80]">
              <Store className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Connect TikTok Shop Account</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Add a new store to manage profits and automate customer support</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-emerald-950/60 text-green-600 dark:text-[#4ade80] mb-3 animate-bounce">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white">Store Successfully Connected!</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Syncing orders, catalog, and ad attribution data via API...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                TikTok Shop Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. France Official Store"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f1117] px-3.5 py-2.5 text-sm font-medium text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-500/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                  Region & Marketplace
                </label>
                <select
                  value={selectedCountry.code}
                  onChange={(e) => {
                    const country = countryOptions.find((c) => c.code === e.target.value);
                    if (country) setSelectedCountry(country);
                  }}
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f1117] px-3.5 py-2.5 text-sm font-medium text-gray-800 dark:text-gray-100 focus:border-lime-500 focus:outline-none"
                >
                  {countryOptions.map((c) => (
                    <option key={c.code} value={c.code} className="dark:bg-[#0f1117]">
                      {c.flag} {c.name} ({c.currency})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                  Staff Role Assignment
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f1117] px-3.5 py-2.5 text-sm font-medium text-gray-800 dark:text-gray-100 focus:border-lime-500 focus:outline-none"
                >
                  <option value="Owner" className="dark:bg-[#0f1117]">Owner (Full Access)</option>
                  <option value="Admin" className="dark:bg-[#0f1117]">Admin (Stores & Ads)</option>
                  <option value="Manager" className="dark:bg-[#0f1117]">Manager (Operations)</option>
                  <option value="Staff" className="dark:bg-[#0f1117]">Staff (Support Only)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                TikTok Shop App Key / Partner ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="tt_app_68f89a9b2c..."
                  value={appKey}
                  onChange={(e) => setAppKey(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f1117] px-3.5 py-2.5 text-sm font-medium text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 focus:border-lime-500 focus:outline-none"
                />
                <Key className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                App Secret / Access Token
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••••••••••••••••••••••••••"
                  value={appSecret}
                  onChange={(e) => setAppSecret(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f1117] px-3.5 py-2.5 text-sm font-medium text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 focus:border-lime-500 focus:outline-none"
                />
                <ShieldCheck className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div className="rounded-2xl bg-amber-50 dark:bg-amber-950/40 p-3 text-xs text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-amber-900/40">
              <span className="font-semibold">⚡ RushNshop Fast Connect:</span> Connects directly to Next.js API route (`/api/stores`) and live webhooks for real-time order and ROAS attribution.
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-2 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isConnecting}
                className="flex items-center gap-2 rounded-xl bg-[#84cc16] px-5 py-2 text-xs font-bold text-black shadow-md hover:bg-[#72b012] disabled:opacity-50"
              >
                {isConnecting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Connecting Store API...</span>
                  </>
                ) : (
                  <span>Authorize & Link Store</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
