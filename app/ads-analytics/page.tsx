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
  const { filteredCampaigns, toggleCampaignStatus, totalAdsSpend } = useStore();

  const totalAdRevenue = filteredCampaigns.reduce((acc, c) => acc + c.revenue, 0);
  const totalAdProfit = filteredCampaigns.reduce((acc, c) => acc + c.profit, 0);
  const blendedRoas = totalAdsSpend > 0 ? (totalAdRevenue / totalAdsSpend).toFixed(2) : '0.00';
  const totalPurchases = filteredCampaigns.reduce((acc, c) => acc + c.purchases, 0);
  const blendedCpa = totalPurchases > 0 ? (totalAdsSpend / totalPurchases).toFixed(2) : '0.00';

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">TikTok Ads Profit & Attribution Hub</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Track real TikTok Ads return on ad spend, cost per purchase, and true post-ad net profit.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-purple-50 dark:bg-purple-950/50 px-3 py-1 text-xs font-bold text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60">
            <span className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
            TikTok Ads API: Live Synced
          </span>
        </div>
      </div>

      {/* Ads KPI Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#151b26] p-4 shadow-sm">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Total Ad Spend</p>
          <p className="text-xl font-black text-gray-900 dark:text-white mt-1">{formatCurrency(totalAdsSpend)}</p>
          <div className="flex items-center gap-0.5 text-xs font-bold text-rose-600 dark:text-rose-400 mt-0.5">
            <ArrowUpRight className="h-3 w-3 stroke-[2.5]" />
            <span>36.8% vs last week</span>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#151b26] p-4 shadow-sm">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Revenue from Ads</p>
          <p className="text-xl font-black text-gray-900 dark:text-white mt-1">{formatCurrency(totalAdRevenue)}</p>
          <div className="flex items-center gap-0.5 text-xs font-bold text-emerald-600 dark:text-[#4ade80] mt-0.5">
            <ArrowUpRight className="h-3 w-3 stroke-[2.5]" />
            <span>22.4% vs last week</span>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#151b26] p-4 shadow-sm">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Blended TikTok ROAS</p>
          <p className="text-xl font-black text-emerald-600 dark:text-[#4ade80] mt-1">{blendedRoas}x</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Target: &gt; 2.80x</p>
        </div>

        <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#151b26] p-4 shadow-sm">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Net Profit from Ads</p>
          <p className="text-xl font-black text-[#22c55e] dark:text-[#4ade80] mt-1">{formatCurrency(totalAdProfit)}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Avg CPA: ${blendedCpa}</p>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="overflow-hidden rounded-3xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#151b26] shadow-sm">
        <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <h3 className="font-bold text-gray-900 dark:text-white text-sm">TikTok Ads Campaigns Manager</h3>
          <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
            {filteredCampaigns.length} Active Campaigns Tracked
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/70 dark:bg-white/5 text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                <th className="py-3.5 px-4">Campaign</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-3">Store</th>
                <th className="py-3.5 px-3">Ad Spend</th>
                <th className="py-3.5 px-3">Revenue</th>
                <th className="py-3.5 px-3">ROAS</th>
                <th className="py-3.5 px-3">CPA</th>
                <th className="py-3.5 px-3">Purchases</th>
                <th className="py-3.5 px-3">CTR</th>
                <th className="py-3.5 px-3">Real Net Profit</th>
                <th className="py-3.5 px-4 text-right">AI Recommendation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60 font-medium text-gray-700 dark:text-gray-300">
              {filteredCampaigns.map((camp) => {
                const isProfitable = camp.profit > 0;
                const isScale = camp.roas >= 3.5;
                const isKill = camp.profit < 0;

                return (
                  <tr key={camp.id} className="hover:bg-gray-50/80 dark:hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 font-bold text-gray-900 dark:text-white">{camp.name}</td>
                    <td className="py-3 px-3">
                      <button
                        onClick={() => toggleCampaignStatus(camp.id)}
                        className={cn(
                          'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold transition-all',
                          camp.status === 'Active'
                            ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-[#4ade80] border border-emerald-200 dark:border-emerald-800/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60'
                            : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'
                        )}
                      >
                        {camp.status === 'Active' ? <Play className="h-2.5 w-2.5 fill-current" /> : <Pause className="h-2.5 w-2.5" />}
                        <span>{camp.status}</span>
                      </button>
                    </td>
                    <td className="py-3 px-3 text-gray-600 dark:text-gray-400">{camp.storeName}</td>
                    <td className="py-3 px-3 font-semibold text-gray-800 dark:text-gray-200">{formatCurrency(camp.spend)}</td>
                    <td className="py-3 px-3 font-bold text-gray-900 dark:text-white">{formatCurrency(camp.revenue)}</td>
                    <td className="py-3 px-3">
                      <span
                        className={cn(
                          'rounded-md px-1.5 py-0.5 font-bold',
                          camp.roas >= 3.0 ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-[#4ade80]' : 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300'
                        )}
                      >
                        {camp.roas.toFixed(2)}x
                      </span>
                    </td>
                    <td className="py-3 px-3 text-gray-700 dark:text-gray-300">${camp.cpa.toFixed(2)}</td>
                    <td className="py-3 px-3 font-bold text-gray-900 dark:text-white">{camp.purchases}</td>
                    <td className="py-3 px-3 text-gray-600 dark:text-gray-400">{camp.ctr}%</td>
                    <td className="py-3 px-3">
                      <span className={cn('font-black', isProfitable ? 'text-[#22c55e] dark:text-[#4ade80]' : 'text-rose-600 dark:text-rose-400')}>
                        {formatCurrency(camp.profit)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {isScale ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-0.5 text-[10px] font-bold text-emerald-900 dark:text-[#4ade80] border border-emerald-300 dark:border-emerald-800">
                          🚀 Scale Budget (+20%)
                        </span>
                      ) : isKill ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 dark:bg-rose-950/80 px-2.5 py-0.5 text-[10px] font-bold text-rose-900 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
                          🛑 Pause Campaign
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 dark:bg-blue-950/50 px-2.5 py-0.5 text-[10px] font-bold text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
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
