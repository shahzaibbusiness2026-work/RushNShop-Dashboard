'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '../../context/StoreContext';
import { formatCurrency } from '../../lib/utils';

export default function AdsPerformanceTable() {
  const { filteredCampaigns } = useStore();

  const displayCampaigns = filteredCampaigns.slice(0, 5);

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#151b26] p-5 shadow-sm transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">Ads Performance</h3>
        <Link href="/ads-analytics" className="text-xs font-bold text-[#22c55e] dark:text-[#4ade80] hover:underline">
          View all
        </Link>
      </div>

      {/* Table */}
      <div className="mt-3 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-800 text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              <th className="pb-2.5 font-semibold">Campaign</th>
              <th className="pb-2.5 font-semibold">Spend</th>
              <th className="pb-2.5 font-semibold">Revenue</th>
              <th className="pb-2.5 font-semibold">ROAS</th>
              <th className="pb-2.5 font-semibold">CPA</th>
              <th className="pb-2.5 text-right font-semibold">Profit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800/60 font-medium text-gray-700 dark:text-gray-300">
            {displayCampaigns.map((camp) => (
              <tr key={camp.id} className="hover:bg-gray-50/60 dark:hover:bg-white/5 transition-colors">
                <td className="py-2.5 font-bold text-gray-900 dark:text-white">{camp.name}</td>
                <td className="py-2.5 text-gray-600 dark:text-gray-400">{formatCurrency(camp.spend)}</td>
                <td className="py-2.5 text-gray-900 dark:text-gray-100 font-semibold">{formatCurrency(camp.revenue)}</td>
                <td className="py-2.5">
                  <span className="rounded-md bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.5 font-bold text-emerald-700 dark:text-[#4ade80]">
                    {camp.roas.toFixed(2)}
                  </span>
                </td>
                <td className="py-2.5 text-gray-600 dark:text-gray-400">{formatCurrency(camp.cpa)}</td>
                <td className="py-2.5 text-right font-bold text-[#22c55e] dark:text-[#4ade80]">
                  {formatCurrency(camp.profit)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
