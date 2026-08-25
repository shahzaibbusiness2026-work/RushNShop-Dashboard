'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatCurrency, cn } from '../../lib/utils';

export default function StorePerformanceList() {
  const { stores, selectedStoreId, setSelectedStoreId } = useStore();

  return (
    <div className="shadow-xs flex h-full flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-4 transition-colors dark:border-slate-800/80 dark:bg-[#121620] sm:p-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50">Store Performance</h3>
        <Link
          href="/stores"
          className="text-xs font-bold text-emerald-600 hover:underline dark:text-[#4ade80]"
        >
          Manage
        </Link>
      </div>

      {/* List */}
      <div className="mt-3 space-y-2">
        {stores.map((store) => {
          const isSelected = selectedStoreId === store.id;

          return (
            <button
              key={store.id}
              onClick={() => setSelectedStoreId(isSelected ? 'all' : store.id)}
              className={cn(
                'flex w-full items-center justify-between rounded-xl p-2.5 text-left transition-all',
                isSelected
                  ? 'shadow-xs border border-emerald-300/80 bg-emerald-50/80 dark:border-emerald-800/80 dark:bg-emerald-950/40'
                  : 'border border-transparent hover:bg-slate-50 dark:hover:bg-white/5',
              )}
            >
              <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                <span className="drop-shadow-xs shrink-0 text-xl sm:text-2xl">{store.flag}</span>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="truncate text-xs font-bold text-slate-900 dark:text-white">
                      {store.name}
                    </p>
                    {isSelected && (
                      <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-[8px] text-white">
                        ✓
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500">
                    {store.totalOrders} Orders
                  </p>
                </div>
              </div>

              <div className="font-mono-numeric flex shrink-0 items-center gap-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  {formatCurrency(store.totalRevenue, store.currency)}
                </span>
                <div className="flex items-center gap-0.5 text-xs font-bold text-emerald-600 dark:text-[#4ade80]">
                  <ArrowUpRight className="h-3 w-3 stroke-[2.5]" />
                  <span>{store.growth.toFixed(1)}%</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
