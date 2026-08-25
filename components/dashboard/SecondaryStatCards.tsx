'use client';

import React from 'react';
import { Megaphone, ShoppingCart, Percent, RotateCcw, ArrowUpRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatCurrency } from '../../lib/utils';

export default function SecondaryStatCards() {
  const { totalAdsSpend, totalCogs, totalFees, refunds, totalRevenue, selectedStore } = useStore();

  const cogsPercent = totalRevenue > 0 ? ((totalCogs / totalRevenue) * 100).toFixed(1) : '32.5';
  const feesPercent = totalRevenue > 0 ? ((totalFees / totalRevenue) * 100).toFixed(1) : '9.3';
  const refundsPercent = totalRevenue > 0 ? ((refunds / totalRevenue) * 100).toFixed(1) : '1.3';

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* 1. Total Ads Spend */}
      <div className="shadow-xs group flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 transition-all duration-200 hover:border-slate-300 hover:shadow-md dark:border-slate-800/80 dark:bg-[#121620] dark:hover:border-slate-700/80">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-200/50 bg-emerald-50 text-emerald-600 dark:border-emerald-800/30 dark:bg-emerald-950/30 dark:text-[#4ade80]">
          <Megaphone className="h-5 w-5 stroke-[2.2]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Total Ads Spend
          </p>
          <p className="font-mono-numeric mt-0.5 text-xl font-black text-slate-900 dark:text-slate-50">
            {formatCurrency(totalAdsSpend, selectedStore?.currency)}
          </p>
          <div className="mt-0.5 flex items-center gap-0.5 text-xs font-bold text-emerald-600 dark:text-[#4ade80]">
            <ArrowUpRight className="h-3 w-3 stroke-[2.5]" />
            <span>36.8% Efficiency</span>
          </div>
        </div>
      </div>

      {/* 2. Total COGS */}
      <div className="shadow-xs group flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 transition-all duration-200 hover:border-slate-300 hover:shadow-md dark:border-slate-800/80 dark:bg-[#121620] dark:hover:border-slate-700/80">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-200/50 bg-amber-50 text-amber-600 dark:border-amber-800/30 dark:bg-amber-950/30 dark:text-[#fb923c]">
          <ShoppingCart className="h-5 w-5 stroke-[2.2]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total COGS</p>
          <p className="font-mono-numeric mt-0.5 text-xl font-black text-slate-900 dark:text-slate-50">
            {formatCurrency(totalCogs, selectedStore?.currency)}
          </p>
          <p className="mt-0.5 text-xs font-semibold text-slate-400 dark:text-slate-500">
            {cogsPercent}% of GMV
          </p>
        </div>
      </div>

      {/* 3. Total Fees */}
      <div className="shadow-xs group flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 transition-all duration-200 hover:border-slate-300 hover:shadow-md dark:border-slate-800/80 dark:bg-[#121620] dark:hover:border-slate-700/80">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-purple-200/50 bg-purple-50 text-purple-600 dark:border-purple-800/30 dark:bg-purple-950/30 dark:text-[#c084fc]">
          <Percent className="h-5 w-5 stroke-[2.2]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            TikTok Shop Fees
          </p>
          <p className="font-mono-numeric mt-0.5 text-xl font-black text-slate-900 dark:text-slate-50">
            {formatCurrency(totalFees, selectedStore?.currency)}
          </p>
          <p className="mt-0.5 text-xs font-semibold text-slate-400 dark:text-slate-500">
            {feesPercent}% of GMV
          </p>
        </div>
      </div>

      {/* 4. Refunds */}
      <div className="shadow-xs group flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 transition-all duration-200 hover:border-slate-300 hover:shadow-md dark:border-slate-800/80 dark:bg-[#121620] dark:hover:border-slate-700/80">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-pink-200/50 bg-pink-50 text-pink-600 dark:border-pink-800/30 dark:bg-pink-950/30 dark:text-[#f472b6]">
          <RotateCcw className="h-5 w-5 stroke-[2.2]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Returns & Refunds
          </p>
          <p className="font-mono-numeric mt-0.5 text-xl font-black text-slate-900 dark:text-slate-50">
            {formatCurrency(refunds, selectedStore?.currency)}
          </p>
          <p className="mt-0.5 text-xs font-semibold text-slate-400 dark:text-slate-500">
            {refundsPercent}% Return Rate
          </p>
        </div>
      </div>
    </div>
  );
}
