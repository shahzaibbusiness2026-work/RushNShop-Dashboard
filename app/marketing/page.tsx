'use client';

import React, { useState } from 'react';
import {
  Compass,
  TrendingUp,
  Target,
  Sparkles,
  Zap,
  Users,
  Video,
  ExternalLink,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatCurrency, formatPercent } from '../../lib/utils';

export default function MarketingPage() {
  const { totalRevenue, totalAdsSpend, selectedStore } = useStore();
  const [attributionModel, setAttributionModel] = useState<
    'Last Click' | 'First Touch' | 'Linear Multi-Touch'
  >('Last Click');

  const channels = [
    {
      name: 'TikTok Spark Ads (Paid)',
      spend: 1850.0,
      revenue: 14200.0,
      roas: 7.68,
      orders: 380,
      profit: 6920.0,
      share: '55.8%',
    },
    {
      name: 'TikTok Creator Affiliates (Organic)',
      spend: 490.5,
      revenue: 7850.0,
      roas: 16.0,
      orders: 290,
      profit: 4210.0,
      share: '30.9%',
    },
    {
      name: 'TikTok Shop LIVE Streams',
      spend: 0.0,
      revenue: 2150.0,
      roas: 0.0,
      orders: 110,
      profit: 1350.0,
      share: '8.5%',
    },
    {
      name: 'Organic Search & Direct Marketplace',
      spend: 0.0,
      revenue: 1230.8,
      roas: 0.0,
      orders: 60,
      profit: 750.2,
      share: '4.8%',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
            Marketing & Creator Attribution
          </h2>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Identify which TikTok channels and affiliate creators generate real bottom-line profit.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={attributionModel}
            onChange={(e) => setAttributionModel(e.target.value as any)}
            className="shadow-xs rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-800 dark:border-slate-800 dark:bg-[#161b26] dark:text-slate-200"
          >
            <option value="Last Click" className="dark:bg-[#161b26]">
              Attribution: Last Click (Default)
            </option>
            <option value="First Touch" className="dark:bg-[#161b26]">
              Attribution: First Touch
            </option>
            <option value="Linear Multi-Touch" className="dark:bg-[#161b26]">
              Attribution: Linear Multi-Touch
            </option>
          </select>
        </div>
      </div>

      {/* Channel Performance Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {channels.map((ch) => (
          <div
            key={ch.name}
            className="shadow-xs space-y-3 rounded-3xl border border-slate-200/80 bg-white p-5 dark:border-slate-800/80 dark:bg-[#121620]"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {ch.share} Revenue
              </span>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/50 dark:text-[#4ade80]">
                {ch.orders} Orders
              </span>
            </div>

            <h3 className="text-sm font-bold leading-snug text-slate-900 dark:text-white">
              {ch.name}
            </h3>

            <div className="font-mono-numeric grid grid-cols-2 gap-2 border-t border-slate-100 pt-2 text-xs dark:border-slate-800">
              <div>
                <p className="font-sans text-slate-400 dark:text-slate-500">Revenue:</p>
                <p className="font-bold text-slate-900 dark:text-white">
                  {formatCurrency(ch.revenue, selectedStore?.currency)}
                </p>
              </div>
              <div>
                <p className="font-sans text-slate-400 dark:text-slate-500">Net Profit:</p>
                <p className="font-bold text-emerald-600 dark:text-[#4ade80]">
                  {formatCurrency(ch.profit, selectedStore?.currency)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Channel Comparison Table */}
      <div className="shadow-xs overflow-hidden rounded-3xl border border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-[#121620]">
        <div className="border-b border-slate-100 p-5 dark:border-slate-800">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50">
            Channel ROI & Efficiency Comparison
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:border-slate-800 dark:bg-white/5 dark:text-slate-500">
                <th className="px-4 py-3.5 font-semibold">Channel / Source</th>
                <th className="px-3 py-3.5 font-semibold">Ad Spend / Fees</th>
                <th className="px-3 py-3.5 font-semibold">Attributed Revenue</th>
                <th className="px-3 py-3.5 font-semibold">Orders</th>
                <th className="px-3 py-3.5 font-semibold">ROAS</th>
                <th className="px-3 py-3.5 font-semibold">Net Profit</th>
                <th className="px-4 py-3.5 text-right font-semibold">Channel Health</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700 dark:divide-slate-800/60 dark:text-slate-300">
              {channels.map((ch) => (
                <tr
                  key={ch.name}
                  className="transition-colors hover:bg-slate-50/80 dark:hover:bg-white/5"
                >
                  <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">
                    {ch.name}
                  </td>
                  <td className="font-mono-numeric px-3 py-3.5 text-slate-600 dark:text-slate-400">
                    {formatCurrency(ch.spend, selectedStore?.currency)}
                  </td>
                  <td className="font-mono-numeric px-3 py-3.5 font-bold text-slate-900 dark:text-white">
                    {formatCurrency(ch.revenue, selectedStore?.currency)}
                  </td>
                  <td className="font-mono-numeric px-3 py-3.5 text-slate-800 dark:text-slate-200">
                    {ch.orders}
                  </td>
                  <td className="font-mono-numeric px-3 py-3.5">
                    <span className="rounded-md bg-emerald-50 px-2 py-0.5 font-bold text-emerald-700 dark:bg-emerald-950/50 dark:text-[#4ade80]">
                      {ch.roas > 0 ? `${ch.roas.toFixed(2)}x` : 'Organic'}
                    </span>
                  </td>
                  <td className="font-mono-numeric px-3 py-3.5 font-black text-emerald-600 dark:text-[#4ade80]">
                    {formatCurrency(ch.profit, selectedStore?.currency)}
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <span className="rounded-full border border-emerald-300 bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/80 dark:text-[#4ade80]">
                      🌟 Highly Profitable
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
