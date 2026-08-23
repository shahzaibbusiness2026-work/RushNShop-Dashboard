'use client';

import React from 'react';
import {
  TrendingUp,
  DollarSign,
  PieChart as PieIcon,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Calendar,
  Layers,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
} from 'recharts';
import { useStore } from '../../context/StoreContext';
import { formatCurrency, formatPercent } from '../../lib/utils';

export default function ProfitAnalyticsPage() {
  const {
    totalRevenue,
    netProfit,
    profitMargin,
    totalOrders,
    avgOrderValue,
    avgProfitPerOrder,
    totalAdsSpend,
    totalCogs,
    totalFees,
    refunds,
    profitTrend,
    theme,
  } = useStore();

  const isDark = theme === 'dark';

  // Waterfall dataset
  const waterfallData = [
    { stage: 'Gross Sales', amount: totalRevenue, fill: '#22c55e' },
    { stage: 'COGS', amount: -totalCogs, fill: '#f97316' },
    { stage: 'TikTok Fees', amount: -totalFees, fill: '#9333ea' },
    { stage: 'TikTok Ads', amount: -totalAdsSpend, fill: '#8b5cf6' },
    { stage: 'Refunds', amount: -refunds, fill: '#ef4444' },
    { stage: 'Fixed Ops', amount: -1500, fill: '#64748b' },
    { stage: 'Net Profit', amount: netProfit, fill: '#10b981' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">TrueProfit Financial Analytics</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Transparent revenue waterfall, gross-to-net deduction flows, and profit margin trends.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-1.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#161b22] px-3.5 py-2 text-xs font-bold text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-white/10 self-start sm:self-auto"
        >
          <Download className="h-4 w-4" />
          <span>Export P&L Summary</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#151b26] p-4 shadow-sm">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Gross Sales</p>
          <p className="text-xl font-black text-gray-900 dark:text-white mt-1">{formatCurrency(totalRevenue)}</p>
          <p className="text-[11px] font-bold text-emerald-600 dark:text-[#4ade80] mt-0.5">↑ 18.6%</p>
        </div>
        <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#151b26] p-4 shadow-sm">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Net Profit</p>
          <p className="text-xl font-black text-[#22c55e] dark:text-[#4ade80] mt-1">{formatCurrency(netProfit)}</p>
          <p className="text-[11px] font-bold text-emerald-600 dark:text-[#4ade80] mt-0.5">↑ 20.4%</p>
        </div>
        <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#151b26] p-4 shadow-sm">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Net Margin</p>
          <p className="text-xl font-black text-amber-600 dark:text-amber-400 mt-1">{formatPercent(profitMargin)}</p>
          <p className="text-[11px] font-bold text-emerald-600 dark:text-[#4ade80] mt-0.5">↑ 2.1%</p>
        </div>
        <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#151b26] p-4 shadow-sm">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Avg Order Value</p>
          <p className="text-xl font-black text-purple-600 dark:text-purple-400 mt-1">{formatCurrency(avgOrderValue)}</p>
          <p className="text-[11px] font-bold text-emerald-600 dark:text-[#4ade80] mt-0.5">↑ 3.2%</p>
        </div>
        <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#151b26] p-4 shadow-sm">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Avg Profit/Order</p>
          <p className="text-xl font-black text-pink-600 dark:text-pink-400 mt-1">{formatCurrency(avgProfitPerOrder)}</p>
          <p className="text-[11px] font-bold text-emerald-600 dark:text-[#4ade80] mt-0.5">↑ 4.7%</p>
        </div>
        <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#151b26] p-4 shadow-sm">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Total Orders</p>
          <p className="text-xl font-black text-blue-600 dark:text-blue-400 mt-1">{totalOrders}</p>
          <p className="text-[11px] font-bold text-emerald-600 dark:text-[#4ade80] mt-0.5">↑ 15.3%</p>
        </div>
      </div>

      {/* Waterfall Breakdown Chart */}
      <div className="rounded-3xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#151b26] p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Layers className="h-4 w-4 text-emerald-600 dark:text-[#4ade80]" />
              TrueProfit Waterfall Deduction (Gross Revenue to Net Profit)
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Exact accounting of all platform cuts, ad expenditure, product costs, and remaining bottom line.
            </p>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={waterfallData} margin={{ top: 20, right: 20, left: -10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#1e293b' : '#f1f5f9'} />
              <XAxis dataKey="stage" tick={{ fill: isDark ? '#64748b' : '#64748b', fontSize: 11 }} />
              <YAxis
                tick={{ fill: isDark ? '#64748b' : '#64748b', fontSize: 11 }}
                tickFormatter={(val) => `$${Math.abs(val) >= 1000 ? `${(Math.abs(val) / 1000).toFixed(0)}K` : Math.abs(val)}`}
              />
              <Tooltip
                formatter={(value: any) => [formatCurrency(Math.abs(Number(value))), 'Amount']}
                contentStyle={{ borderRadius: '12px', borderColor: isDark ? '#334155' : '#e2e8f0', backgroundColor: isDark ? '#161b22' : '#ffffff', color: isDark ? '#f8fafc' : '#0f172a', fontSize: '12px' }}
              />
              <Bar dataKey="amount" radius={[6, 6, 6, 6]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Daily Profit Growth Trend Area Chart */}
      <div className="rounded-3xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#151b26] p-6 shadow-sm">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Daily Cumulative Net Profit & Revenue Flow</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={profitTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#1e293b' : '#f1f5f9'} />
              <XAxis dataKey="date" tick={{ fill: isDark ? '#64748b' : '#94a3b8', fontSize: 11 }} />
              <YAxis tick={{ fill: isDark ? '#64748b' : '#94a3b8', fontSize: 11 }} />
              <Tooltip contentStyle={{ borderRadius: '12px', borderColor: isDark ? '#334155' : '#e2e8f0', backgroundColor: isDark ? '#161b22' : '#ffffff', color: isDark ? '#f8fafc' : '#0f172a', fontSize: '12px' }} />
              <Area type="monotone" dataKey="profit" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#profitGrad)" name="Net Profit" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
