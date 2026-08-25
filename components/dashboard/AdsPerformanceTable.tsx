'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '../../context/StoreContext';
import { formatCurrency } from '../../lib/utils';
import { ArrowRight } from 'lucide-react';

export default function AdsPerformanceTable() {
  const { filteredCampaigns, selectedStore } = useStore();

  const displayCampaigns = filteredCampaigns.slice(0, 5);

  return (
    <div className="shadow-xs flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 transition-colors dark:border-slate-800/80 dark:bg-[#121620]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Ads Performance</h3>
        <Link
          href="/ads-analytics"
          className="flex items-center gap-1 text-xs font-bold text-emerald-600 hover:underline dark:text-[#4ade80]"
        >
          <span>View all</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {/* Table */}
      <div className="mt-3 overflow-x-auto">
        <table className="w-full whitespace-nowrap text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:border-slate-800 dark:text-slate-500">
              <th className="pb-2.5 font-semibold">Campaign</th>
              <th className="pb-2.5 font-semibold">Spend</th>
              <th className="pb-2.5 font-semibold">Revenue</th>
              <th className="pb-2.5 font-semibold">ROAS</th>
              <th className="pb-2.5 font-semibold">CPA</th>
              <th className="pb-2.5 text-right font-semibold">Net Profit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/70 font-medium text-slate-700 dark:divide-slate-800/60 dark:text-slate-300">
            {displayCampaigns.map((camp) => (
              <tr
                key={camp.id}
                className="transition-colors hover:bg-slate-50/80 dark:hover:bg-white/5"
              >
                <td className="py-2.5 font-bold text-slate-900 dark:text-slate-100">{camp.name}</td>
                <td className="font-mono-numeric py-2.5 text-slate-600 dark:text-slate-400">
                  {formatCurrency(camp.spend, selectedStore?.currency)}
                </td>
                <td className="font-mono-numeric py-2.5 font-semibold text-slate-900 dark:text-slate-100">
                  {formatCurrency(camp.revenue, selectedStore?.currency)}
                </td>
                <td className="py-2.5">
                  <span className="font-mono-numeric rounded-md bg-emerald-50 px-1.5 py-0.5 font-bold text-emerald-700 dark:bg-emerald-950/50 dark:text-[#4ade80]">
                    {camp.roas.toFixed(2)}x
                  </span>
                </td>
                <td className="font-mono-numeric py-2.5 text-slate-600 dark:text-slate-400">
                  ${camp.cpa.toFixed(2)}
                </td>
                <td className="font-mono-numeric py-2.5 text-right font-bold text-emerald-600 dark:text-[#4ade80]">
                  {formatCurrency(camp.profit, selectedStore?.currency)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
