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
import { formatCurrency, formatPercent } from '../../lib/utils';
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
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Connected TikTok Shop Accounts</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Manage multi-region stores, sync live product catalogs, and assign staff permissions.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 rounded-xl bg-[#84cc16] px-4 py-2.5 text-xs font-bold text-black shadow-sm hover:bg-[#72b012] transition-all self-start sm:self-auto"
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
            className="flex flex-col justify-between rounded-3xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#151b26] p-6 shadow-sm hover:shadow-md transition-all"
          >
            <div>
              {/* Store Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  <span className="text-4xl drop-shadow-sm">{store.flag}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-gray-900 dark:text-white">{store.name}</h3>
                      <span className="flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-[#4ade80] border border-emerald-200/60 dark:border-emerald-800/60">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Live Synced
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                      {store.country} • Currency: {store.currency} ({store.currencySymbol})
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleSync(store.id)}
                    title="Force Resync"
                    className="flex h-8 w-8 items-center justify-center rounded-xl border border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10"
                  >
                    <RefreshCw className={`h-4 w-4 ${syncingId === store.id ? 'animate-spin text-lime-600' : ''}`} />
                  </button>
                  <button
                    onClick={() => removeStore(store.id)}
                    title="Disconnect Store"
                    className="flex h-8 w-8 items-center justify-center rounded-xl border border-gray-200 dark:border-gray-800 text-gray-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 dark:hover:text-rose-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Financial Metrics */}
              <div className="grid grid-cols-3 gap-3 mt-6 rounded-2xl bg-gray-50/70 dark:bg-[#0f1117]/60 p-3.5 border border-gray-100 dark:border-gray-800">
                <div>
                  <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500">Total Revenue</p>
                  <p className="text-base font-black text-gray-900 dark:text-white mt-0.5">
                    {formatCurrency(store.totalRevenue, store.currency)}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500">Net Profit</p>
                  <p className="text-base font-black text-[#22c55e] dark:text-[#4ade80] mt-0.5">
                    {formatCurrency(store.netProfit, store.currency)}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500">Profit Margin</p>
                  <p className="text-base font-black text-amber-600 dark:text-amber-400 mt-0.5">
                    {formatPercent(store.margin)}
                  </p>
                </div>
              </div>

              {/* Account Permissions & Sync Info */}
              <div className="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1.5 font-medium">
                  <Shield className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Access: </span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">{store.accountRole}</span>
                </div>
                <span>Last Synced: {store.lastSyncTime}</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 flex items-center gap-2 pt-4 border-t border-gray-100 dark:border-gray-800">
              <button
                onClick={() => setSelectedStoreId(store.id)}
                className={`flex-1 rounded-xl py-2 text-xs font-bold transition-all ${
                  selectedStoreId === store.id
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'
                }`}
              >
                {selectedStoreId === store.id ? 'Active Dashboard Filter' : 'Filter Dashboard'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Permissions Matrix */}
      <div className="rounded-3xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#151b26] p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Users className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          <h3 className="text-base font-bold text-gray-900 dark:text-white">Staff User Roles & Permissions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                <th className="pb-3">Role</th>
                <th className="pb-3">Revenue & P&L</th>
                <th className="pb-3">TikTok Ads Spend</th>
                <th className="pb-3">Product Cost (COGS)</th>
                <th className="pb-3">AI Customer Support</th>
                <th className="pb-3">Store API Keys</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60 font-medium text-gray-700 dark:text-gray-300">
              <tr>
                <td className="py-3 font-bold text-gray-900 dark:text-white">Owner</td>
                <td className="py-3 text-emerald-600 dark:text-[#4ade80] font-bold">Full Access</td>
                <td className="py-3 text-emerald-600 dark:text-[#4ade80] font-bold">Full Access</td>
                <td className="py-3 text-emerald-600 dark:text-[#4ade80] font-bold">Full Access</td>
                <td className="py-3 text-emerald-600 dark:text-[#4ade80] font-bold">Full Access</td>
                <td className="py-3 text-emerald-600 dark:text-[#4ade80] font-bold">Full Access</td>
              </tr>
              <tr>
                <td className="py-3 font-bold text-gray-900 dark:text-white">Store Manager</td>
                <td className="py-3 text-emerald-600 dark:text-[#4ade80] font-bold">View Only</td>
                <td className="py-3 text-emerald-600 dark:text-[#4ade80] font-bold">Full Access</td>
                <td className="py-3 text-emerald-600 dark:text-[#4ade80] font-bold">Full Access</td>
                <td className="py-3 text-emerald-600 dark:text-[#4ade80] font-bold">Full Access</td>
                <td className="py-3 text-gray-400 dark:text-gray-600">Restricted</td>
              </tr>
              <tr>
                <td className="py-3 font-bold text-gray-900 dark:text-white">Support Staff</td>
                <td className="py-3 text-gray-400 dark:text-gray-600">Restricted</td>
                <td className="py-3 text-gray-400 dark:text-gray-600">Restricted</td>
                <td className="py-3 text-gray-400 dark:text-gray-600">Restricted</td>
                <td className="py-3 text-emerald-600 dark:text-[#4ade80] font-bold">Full Access</td>
                <td className="py-3 text-gray-400 dark:text-gray-600">Restricted</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <AddStoreModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
    </div>
  );
}
