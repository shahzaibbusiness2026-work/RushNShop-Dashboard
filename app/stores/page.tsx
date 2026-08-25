'use client';

import React, { useState } from 'react';
import {
  Store,
  Plus,
  Trash2,
  RefreshCw,
  Shield,
  CheckCircle2,
  ExternalLink,
  Users,
  AlertCircle,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatCurrency, formatPercent, cn } from '../../lib/utils';
import AddStoreModal from '../../components/layout/AddStoreModal';

export default function StoresPage() {
  const { stores, removeStore, selectedStoreId, setSelectedStoreId } = useStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [syncingId, setSyncingId] = useState<string | null>(null);

  const handleSync = (storeId: string) => {
    setSyncingId(storeId);
    setTimeout(() => {
      setSyncingId(null);
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
            Connected TikTok Shop Accounts
          </h2>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Manage multi-region stores, sync live product catalogs, and assign staff permissions.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="shadow-xs flex items-center gap-2 self-start rounded-xl bg-[#84cc16] px-4 py-2.5 text-xs font-bold text-black transition-all hover:scale-[1.02] hover:bg-[#72b012] sm:self-auto"
        >
          <Plus className="h-4 w-4 stroke-[2.5]" />
          <span>Connect New Store</span>
        </button>
      </div>

      {/* Stores Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2">
        {stores.map((store) => (
          <div
            key={store.id}
            className="shadow-xs flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 transition-all duration-200 hover:shadow-md dark:border-slate-800/80 dark:bg-[#121620]"
          >
            <div>
              {/* Store Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  <span className="drop-shadow-xs text-4xl">{store.flag}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900 dark:text-slate-50">
                        {store.name}
                      </h3>
                      <span className="flex items-center gap-1 rounded-full border border-emerald-200/60 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:border-emerald-800/60 dark:bg-emerald-950/50 dark:text-[#4ade80]">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                        Live Synced
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                      {store.country} • Currency: {store.currency} ({store.currencySymbol})
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleSync(store.id)}
                    title="Force Resync"
                    className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition-colors hover:bg-slate-100 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-white/10"
                  >
                    <RefreshCw
                      className={`h-4 w-4 ${syncingId === store.id ? 'animate-spin text-lime-600' : ''}`}
                    />
                  </button>
                  <button
                    onClick={() => removeStore(store.id)}
                    title="Disconnect Store"
                    className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600 dark:border-slate-800 dark:hover:bg-rose-950/40 dark:hover:text-rose-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Financial Metrics */}
              <div className="font-mono-numeric mt-6 grid grid-cols-3 gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-[#0f1117]/60">
                <div>
                  <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                    Total Revenue
                  </p>
                  <p className="mt-0.5 text-base font-black text-slate-900 dark:text-slate-50">
                    {formatCurrency(store.totalRevenue, store.currency)}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                    Net Profit
                  </p>
                  <p className="mt-0.5 text-base font-black text-emerald-600 dark:text-[#4ade80]">
                    {formatCurrency(store.netProfit, store.currency)}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                    Profit Margin
                  </p>
                  <p className="mt-0.5 text-base font-black text-amber-600 dark:text-[#fb923c]">
                    {formatPercent(store.margin)}
                  </p>
                </div>
              </div>

              {/* Account Permissions & Sync Info */}
              <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5 font-medium">
                  <Shield className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Access: </span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {store.accountRole}
                  </span>
                </div>
                <span>Last Synced: {store.lastSyncTime}</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
              <button
                onClick={() => setSelectedStoreId(store.id)}
                className={cn(
                  'flex-1 rounded-xl py-2 text-xs font-bold transition-all',
                  selectedStoreId === store.id
                    ? 'shadow-xs bg-emerald-600 text-white'
                    : 'border border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-white/5',
                )}
              >
                {selectedStoreId === store.id ? 'Active Dashboard Filter' : 'Filter Dashboard'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Permissions Matrix */}
      <div className="shadow-xs rounded-3xl border border-slate-200/80 bg-white p-6 dark:border-slate-800/80 dark:bg-[#121620]">
        <div className="mb-4 flex items-center gap-2">
          <Users className="h-5 w-5 text-slate-700 dark:text-slate-300" />
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-50">
            Staff User Roles & Permissions
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:border-slate-800 dark:text-slate-500">
                <th className="pb-3 font-semibold">Role</th>
                <th className="pb-3 font-semibold">Revenue & P&L</th>
                <th className="pb-3 font-semibold">TikTok Ads Spend</th>
                <th className="pb-3 font-semibold">Product Cost (COGS)</th>
                <th className="pb-3 font-semibold">AI Customer Support</th>
                <th className="pb-3 font-semibold">Store API Keys</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700 dark:divide-slate-800/60 dark:text-slate-300">
              <tr>
                <td className="py-3 font-bold text-slate-900 dark:text-white">Owner</td>
                <td className="py-3 font-bold text-emerald-600 dark:text-[#4ade80]">Full Access</td>
                <td className="py-3 font-bold text-emerald-600 dark:text-[#4ade80]">Full Access</td>
                <td className="py-3 font-bold text-emerald-600 dark:text-[#4ade80]">Full Access</td>
                <td className="py-3 font-bold text-emerald-600 dark:text-[#4ade80]">Full Access</td>
                <td className="py-3 font-bold text-emerald-600 dark:text-[#4ade80]">Full Access</td>
              </tr>
              <tr>
                <td className="py-3 font-bold text-slate-900 dark:text-white">Store Manager</td>
                <td className="py-3 font-bold text-emerald-600 dark:text-[#4ade80]">View Only</td>
                <td className="py-3 font-bold text-emerald-600 dark:text-[#4ade80]">Full Access</td>
                <td className="py-3 font-bold text-emerald-600 dark:text-[#4ade80]">Full Access</td>
                <td className="py-3 font-bold text-emerald-600 dark:text-[#4ade80]">Full Access</td>
                <td className="py-3 text-slate-400 dark:text-slate-600">Restricted</td>
              </tr>
              <tr>
                <td className="py-3 font-bold text-slate-900 dark:text-white">Support Staff</td>
                <td className="py-3 text-slate-400 dark:text-slate-600">Restricted</td>
                <td className="py-3 text-slate-400 dark:text-slate-600">Restricted</td>
                <td className="py-3 text-slate-400 dark:text-slate-600">Restricted</td>
                <td className="py-3 font-bold text-emerald-600 dark:text-[#4ade80]">Full Access</td>
                <td className="py-3 text-slate-400 dark:text-slate-600">Restricted</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <AddStoreModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
    </div>
  );
}
