'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatCurrency } from '../../lib/utils';

export default function StorePerformanceList() {
  const { stores } = useStore();

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#151b26] p-5 shadow-sm transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">Store Performance</h3>
        <Link href="/stores" className="text-xs font-bold text-[#22c55e] dark:text-[#4ade80] hover:underline">
          View all
        </Link>
      </div>

      {/* List */}
      <div className="mt-3 space-y-3.5 divide-y divide-gray-100 dark:divide-gray-800">
        {stores.map((store) => (
          <div key={store.id} className="flex items-center justify-between pt-2.5 first:pt-0">
            <div className="flex items-center gap-3">
              <span className="text-2xl drop-shadow-xs">{store.flag}</span>
              <div>
                <p className="text-xs font-bold text-gray-900 dark:text-white">{store.name}</p>
                <p className="text-[11px] text-gray-400 dark:text-gray-500">{store.totalOrders} Orders</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-gray-900 dark:text-white">
                {formatCurrency(store.totalRevenue, store.currency)}
              </span>
              <div className="flex items-center gap-0.5 text-xs font-bold text-emerald-600 dark:text-[#4ade80]">
                <ArrowUpRight className="h-3 w-3 stroke-[2.5]" />
                <span>{store.growth.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
