'use client';

import React from 'react';
import { Megaphone, ShoppingCart, Percent, RotateCcw, ArrowUpRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatCurrency } from '../../lib/utils';

export default function SecondaryStatCards() {
  const { totalAdsSpend, totalCogs, totalFees, refunds } = useStore();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* 1. Total Ads Spend */}
      <div className="flex items-center gap-4 rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#151b26] p-4 shadow-sm transition-colors">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#eefbe8] dark:bg-emerald-950/40 text-[#22c55e] dark:text-[#4ade80]">
          <Megaphone className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Total Ads Spend</p>
          <p className="text-xl font-black text-gray-900 dark:text-white mt-0.5">{formatCurrency(totalAdsSpend)}</p>
          <div className="flex items-center gap-0.5 text-xs font-bold text-emerald-600 dark:text-[#4ade80] mt-0.5">
            <ArrowUpRight className="h-3 w-3 stroke-[2.5]" />
            <span>36.8%</span>
          </div>
        </div>
      </div>

      {/* 2. Total COGS */}
      <div className="flex items-center gap-4 rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#151b26] p-4 shadow-sm transition-colors">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#fff7ed] dark:bg-amber-950/40 text-[#f97316] dark:text-[#fb923c]">
          <ShoppingCart className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Total COGS</p>
          <p className="text-xl font-black text-gray-900 dark:text-white mt-0.5">{formatCurrency(totalCogs)}</p>
          <p className="text-xs font-medium text-gray-400 dark:text-gray-500 mt-0.5">32.5% of Revenue</p>
        </div>
      </div>

      {/* 3. Total Fees */}
      <div className="flex items-center gap-4 rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#151b26] p-4 shadow-sm transition-colors">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#faf5ff] dark:bg-purple-950/40 text-[#9333ea] dark:text-[#c084fc]">
          <Percent className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Total Fees</p>
          <p className="text-xl font-black text-gray-900 dark:text-white mt-0.5">{formatCurrency(totalFees)}</p>
          <p className="text-xs font-medium text-gray-400 dark:text-gray-500 mt-0.5">9.3% of Revenue</p>
        </div>
      </div>

      {/* 4. Refunds */}
      <div className="flex items-center gap-4 rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#151b26] p-4 shadow-sm transition-colors">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#fdf2f8] dark:bg-pink-950/40 text-[#db2777] dark:text-[#f472b6]">
          <RotateCcw className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Refunds</p>
          <p className="text-xl font-black text-gray-900 dark:text-white mt-0.5">{formatCurrency(refunds)}</p>
          <p className="text-xs font-medium text-gray-400 dark:text-gray-500 mt-0.5">1.3% of Revenue</p>
        </div>
      </div>
    </div>
  );
}
