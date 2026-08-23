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
  const { totalRevenue, totalAdsSpend } = useStore();
  const [attributionModel, setAttributionModel] = useState<'Last Click' | 'First Touch' | 'Linear Multi-Touch'>('Last Click');

  const channels = [
    {
      name: 'TikTok Spark Ads (Paid)',
      spend: 1850.00,
      revenue: 14200.00,
      roas: 7.68,
      orders: 380,
      profit: 6920.00,
      share: '55.8%',
    },
    {
      name: 'TikTok Creator Affiliates (Organic)',
      spend: 490.50,
      revenue: 7850.00,
      roas: 16.0,
      orders: 290,
      profit: 4210.00,
      share: '30.9%',
    },
    {
      name: 'TikTok Shop LIVE Streams',
      spend: 0.00,
      revenue: 2150.00,
      roas: 0.0,
      orders: 110,
      profit: 1350.00,
      share: '8.5%',
    },
    {
      name: 'Organic Search & Direct Marketplace',
      spend: 0.00,
      revenue: 1230.80,
      roas: 0.0,
      orders: 60,
      profit: 750.20,
      share: '4.8%',
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Marketing & Creator Attribution</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Identify which TikTok channels and affiliate creators generate real bottom-line profit.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={attributionModel}
            onChange={(e) => setAttributionModel(e.target.value as any)}
            className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#161b22] px-3.5 py-2 text-xs font-bold text-gray-800 dark:text-gray-200 shadow-sm"
          >
            <option value="Last Click" className="dark:bg-[#161b22]">Attribution: Last Click (Default)</option>
            <option value="First Touch" className="dark:bg-[#161b22]">Attribution: First Touch</option>
            <option value="Linear Multi-Touch" className="dark:bg-[#161b22]">Attribution: Linear Multi-Touch</option>
          </select>
        </div>
      </div>

      {/* Channel Performance Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {channels.map((ch) => (
          <div
            key={ch.name}
            className="rounded-3xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#151b26] p-5 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">{ch.share} Revenue</span>
              <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-[#4ade80]">
                {ch.orders} Orders
              </span>
            </div>

            <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-snug">{ch.name}</h3>

            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-gray-100 dark:border-gray-800">
              <div>
                <p className="text-gray-400 dark:text-gray-500">Revenue:</p>
                <p className="font-bold text-gray-900 dark:text-white">{formatCurrency(ch.revenue)}</p>
              </div>
              <div>
                <p className="text-gray-400 dark:text-gray-500">Net Profit:</p>
                <p className="font-bold text-[#22c55e] dark:text-[#4ade80]">{formatCurrency(ch.profit)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Channel Comparison Table */}
      <div className="overflow-hidden rounded-3xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#151b26] shadow-sm">
        <div className="p-5 border-b border-gray-100 dark:border-gray-800">
          <h3 className="font-bold text-gray-900 dark:text-white text-sm">Channel ROI & Efficiency Comparison</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/70 dark:bg-white/5 text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                <th className="py-3.5 px-4">Channel / Source</th>
                <th className="py-3.5 px-3">Ad Spend / Fees</th>
                <th className="py-3.5 px-3">Attributed Revenue</th>
                <th className="py-3.5 px-3">Orders</th>
                <th className="py-3.5 px-3">ROAS</th>
                <th className="py-3.5 px-3">Net Profit</th>
                <th className="py-3.5 px-4 text-right">Channel Health</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60 font-medium text-gray-700 dark:text-gray-300">
              {channels.map((ch) => (
                <tr key={ch.name} className="hover:bg-gray-50/80 dark:hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-gray-900 dark:text-white">{ch.name}</td>
                  <td className="py-3.5 px-3 text-gray-600 dark:text-gray-400">{formatCurrency(ch.spend)}</td>
                  <td className="py-3.5 px-3 font-bold text-gray-900 dark:text-white">{formatCurrency(ch.revenue)}</td>
                  <td className="py-3.5 px-3 text-gray-800 dark:text-gray-200">{ch.orders}</td>
                  <td className="py-3.5 px-3">
                    <span className="font-bold text-emerald-700 dark:text-[#4ade80] bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md">
                      {ch.roas > 0 ? `${ch.roas.toFixed(2)}x` : 'Organic'}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-black text-[#22c55e] dark:text-[#4ade80]">{formatCurrency(ch.profit)}</td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="rounded-full bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-0.5 text-[10px] font-bold text-emerald-900 dark:text-[#4ade80] border border-emerald-300 dark:border-emerald-800">
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
