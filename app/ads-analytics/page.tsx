'use client';

import React from 'react';
import {
  Megaphone,
  TrendingUp,
  Target,
  DollarSign,
  AlertTriangle,
  Play,
  Pause,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatCurrency, formatNumber, cn } from '../../lib/utils';

export default function AdsAnalyticsPage() {
  const { filteredCampaigns, toggleCampaignStatus, totalAdsSpend, selectedStore } = useStore();

  const totalAdRevenue = filteredCampaigns.reduce((acc, c) => acc + c.revenue, 0);
  const totalAdProfit = filteredCampaigns.reduce((acc, c) => acc + c.profit, 0);
  const blendedRoas = totalAdsSpend > 0 ? (totalAdRevenue / totalAdsSpend).toFixed(2) : '0.00';
  const totalPurchases = filteredCampaigns.reduce((acc, c) => acc + c.purchases, 0);
  const blendedCpa = totalPurchases > 0 ? (totalAdsSpend / totalPurchases).toFixed(2) : '0.00';

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
            TikTok Ads Profit & Attribution Hub
          </h2>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Track real TikTok Ads return on ad spend, cost per purchase, and true post-ad net
            profit.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-bold text-purple-700 dark:border-purple-800/60 dark:bg-purple-950/50 dark:text-purple-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-purple-500" />
            TikTok Ads API: Live Synced
          </span>
        </div>
      </div>

      {/* Ads KPI Cards */}
      <div className="font-mono-numeric grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="shadow-xs rounded-2xl border border-slate-200/80 bg-white p-4 dark:border-slate-800/80 dark:bg-[#121620]">
          <p className="font-sans text-xs font-semibold text-slate-500 dark:text-slate-400">
            Total Ad Spend
          </p>
          <p className="mt-1 text-xl font-black text-slate-900 dark:text-slate-50">
            {formatCurrency(totalAdsSpend, selectedStore?.currency)}
          </p>
          <div className="mt-0.5 flex items-center gap-0.5 text-xs font-bold text-rose-600 dark:text-rose-400">
            <ArrowUpRight className="h-3 w-3 stroke-[2.5]" />
            <span>36.8% vs last week</span>
          </div>
        </div>

        <div className="shadow-xs rounded-2xl border border-slate-200/80 bg-white p-4 dark:border-slate-800/80 dark:bg-[#121620]">
          <p className="font-sans text-xs font-semibold text-slate-500 dark:text-slate-400">
            Revenue from Ads
          </p>
          <p className="mt-1 text-xl font-black text-slate-900 dark:text-slate-50">
            {formatCurrency(totalAdRevenue, selectedStore?.currency)}
          </p>
          <div className="mt-0.5 flex items-center gap-0.5 text-xs font-bold text-emerald-600 dark:text-[#4ade80]">
            <ArrowUpRight className="h-3 w-3 stroke-[2.5]" />
            <span>22.4% vs last week</span>
          </div>
        </div>

        <div className="shadow-xs rounded-2xl border border-slate-200/80 bg-white p-4 dark:border-slate-800/80 dark:bg-[#121620]">
          <p className="font-sans text-xs font-semibold text-slate-500 dark:text-slate-400">
            Blended TikTok ROAS
          </p>
          <p className="mt-1 text-xl font-black text-emerald-600 dark:text-[#4ade80]">
            {blendedRoas}x
          </p>
          <p className="mt-0.5 font-sans text-xs text-slate-400 dark:text-slate-500">
            Target: &gt; 2.80x
          </p>
        </div>

        <div className="shadow-xs rounded-2xl border border-slate-200/80 bg-white p-4 dark:border-slate-800/80 dark:bg-[#121620]">
          <p className="font-sans text-xs font-semibold text-slate-500 dark:text-slate-400">
            Net Profit from Ads
          </p>
          <p className="mt-1 text-xl font-black text-emerald-600 dark:text-[#4ade80]">
            {formatCurrency(totalAdProfit, selectedStore?.currency)}
          </p>
          <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
            Avg CPA: ${blendedCpa}
          </p>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="shadow-xs overflow-hidden rounded-3xl border border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-[#121620]">
        <div className="flex items-center justify-between border-b border-slate-100 p-5 dark:border-slate-800">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50">
            TikTok Ads Campaigns Manager
          </h3>
          <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
            {filteredCampaigns.length} Active Campaigns Tracked
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:border-slate-800 dark:bg-white/5 dark:text-slate-500">
                <th className="px-4 py-3.5 font-semibold">Campaign</th>
                <th className="px-3 py-3.5 font-semibold">Status</th>
                <th className="px-3 py-3.5 font-semibold">Store</th>
                <th className="px-3 py-3.5 font-semibold">Ad Spend</th>
                <th className="px-3 py-3.5 font-semibold">Revenue</th>
                <th className="px-3 py-3.5 font-semibold">ROAS</th>
                <th className="px-3 py-3.5 font-semibold">CPA</th>
                <th className="px-3 py-3.5 font-semibold">Purchases</th>
                <th className="px-3 py-3.5 font-semibold">CTR</th>
                <th className="px-3 py-3.5 font-semibold">Real Net Profit</th>
                <th className="px-4 py-3.5 text-right font-semibold">AI Recommendation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700 dark:divide-slate-800/60 dark:text-slate-300">
              {filteredCampaigns.map((camp) => {
                const isProfitable = camp.profit > 0;
                const isScale = camp.roas >= 3.5;
                const isKill = camp.profit < 0;

                return (
                  <tr
                    key={camp.id}
                    className="transition-colors hover:bg-slate-50/80 dark:hover:bg-white/5"
                  >
                    <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">
                      {camp.name}
                    </td>
                    <td className="px-3 py-3">
                      <button
                        onClick={() => toggleCampaignStatus(camp.id)}
                        className={cn(
                          'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold transition-all',
                          camp.status === 'Active'
                            ? 'border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-800/60 dark:bg-emerald-950/50 dark:text-[#4ade80] dark:hover:bg-emerald-900/60'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-white/10',
                        )}
                      >
                        {camp.status === 'Active' ? (
                          <Play className="h-2.5 w-2.5 fill-current" />
                        ) : (
                          <Pause className="h-2.5 w-2.5" />
                        )}
                        <span>{camp.status}</span>
                      </button>
                    </td>
                    <td className="px-3 py-3 text-slate-600 dark:text-slate-400">
                      {camp.storeName}
                    </td>
                    <td className="font-mono-numeric px-3 py-3 font-semibold text-slate-800 dark:text-slate-200">
                      {formatCurrency(camp.spend, selectedStore?.currency)}
                    </td>
                    <td className="font-mono-numeric px-3 py-3 font-bold text-slate-900 dark:text-white">
                      {formatCurrency(camp.revenue, selectedStore?.currency)}
                    </td>
                    <td className="font-mono-numeric px-3 py-3">
                      <span
                        className={cn(
                          'rounded-md px-1.5 py-0.5 font-bold',
                          camp.roas >= 3.0
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-[#4ade80]'
                            : 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300',
                        )}
                      >
                        {camp.roas.toFixed(2)}x
                      </span>
                    </td>
                    <td className="font-mono-numeric px-3 py-3 text-slate-700 dark:text-slate-300">
                      ${camp.cpa.toFixed(2)}
                    </td>
                    <td className="font-mono-numeric px-3 py-3 font-bold text-slate-900 dark:text-white">
                      {camp.purchases}
                    </td>
                    <td className="font-mono-numeric px-3 py-3 text-slate-600 dark:text-slate-400">
                      {camp.ctr}%
                    </td>
                    <td className="font-mono-numeric px-3 py-3">
                      <span
                        className={cn(
                          'font-black',
                          isProfitable
                            ? 'text-emerald-600 dark:text-[#4ade80]'
                            : 'text-rose-600 dark:text-rose-400',
                        )}
                      >
                        {formatCurrency(camp.profit, selectedStore?.currency)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {isScale ? (
                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300 bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/80 dark:text-[#4ade80]">
                          🚀 Scale Budget (+20%)
                        </span>
                      ) : isKill ? (
                        <span className="inline-flex items-center gap-1 rounded-full border border-rose-300 bg-rose-100 px-2.5 py-0.5 text-[10px] font-bold text-rose-900 dark:border-rose-800 dark:bg-rose-950/80 dark:text-rose-300">
                          🛑 Pause Campaign
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold text-blue-800 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300">
                          ⚡ Maintain & Optimize
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
