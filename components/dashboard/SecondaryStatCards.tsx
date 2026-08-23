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
      <div className="group flex items-center gap-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#121620] p-4 shadow-xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700/80 transition-all duration-200">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-[#4ade80] border border-emerald-200/50 dark:border-emerald-800/30">
          <Megaphone className="h-5 w-5 stroke-[2.2]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Ads Spend</p>
          <p className="text-xl font-black text-slate-900 dark:text-slate-50 mt-0.5 font-mono-numeric">
            {formatCurrency(totalAdsSpend, selectedStore?.currency)}
          </p>
          <div className="flex items-center gap-0.5 text-xs font-bold text-emerald-600 dark:text-[#4ade80] mt-0.5">
            <ArrowUpRight className="h-3 w-3 stroke-[2.5]" />
            <span>36.8% Efficiency</span>
          </div>
        </div>
      </div>

      {/* 2. Total COGS */}
      <div className="group flex items-center gap-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#121620] p-4 shadow-xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700/80 transition-all duration-200">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-[#fb923c] border border-amber-200/50 dark:border-amber-800/30">
          <ShoppingCart className="h-5 w-5 stroke-[2.2]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total COGS</p>
          <p className="text-xl font-black text-slate-900 dark:text-slate-50 mt-0.5 font-mono-numeric">
            {formatCurrency(totalCogs, selectedStore?.currency)}
          </p>
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-0.5">{cogsPercent}% of GMV</p>
        </div>
      </div>

      {/* 3. Total Fees */}
      <div className="group flex items-center gap-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#121620] p-4 shadow-xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700/80 transition-all duration-200">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-[#c084fc] border border-purple-200/50 dark:border-purple-800/30">
          <Percent className="h-5 w-5 stroke-[2.2]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">TikTok Shop Fees</p>
          <p className="text-xl font-black text-slate-900 dark:text-slate-50 mt-0.5 font-mono-numeric">
            {formatCurrency(totalFees, selectedStore?.currency)}
          </p>
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-0.5">{feesPercent}% of GMV</p>
        </div>
      </div>

      {/* 4. Refunds */}
      <div className="group flex items-center gap-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#121620] p-4 shadow-xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700/80 transition-all duration-200">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pink-50 dark:bg-pink-950/30 text-pink-600 dark:text-[#f472b6] border border-pink-200/50 dark:border-pink-800/30">
          <RotateCcw className="h-5 w-5 stroke-[2.2]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Returns & Refunds</p>
          <p className="text-xl font-black text-slate-900 dark:text-slate-50 mt-0.5 font-mono-numeric">
            {formatCurrency(refunds, selectedStore?.currency)}
          </p>
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-0.5">{refundsPercent}% Return Rate</p>
        </div>
      </div>
    </div>
  );
}
