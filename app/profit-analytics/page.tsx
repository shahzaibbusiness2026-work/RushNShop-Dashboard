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
    selectedStore,
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
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
            TrueProfit Financial Analytics
          </h2>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Transparent revenue waterfall, gross-to-net deduction flows, and profit margin trends.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="shadow-2xs flex items-center gap-1.5 self-start rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-[#161b26] dark:text-slate-200 dark:hover:bg-white/10 sm:self-auto"
        >
          <Download className="h-4 w-4" />
          <span>Export P&L Summary</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="font-mono-numeric grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <div className="shadow-xs rounded-2xl border border-slate-200/80 bg-white p-4 dark:border-slate-800/80 dark:bg-[#121620]">
          <p className="font-sans text-xs font-semibold text-slate-500 dark:text-slate-400">
            Gross Sales
          </p>
          <p className="mt-1 text-xl font-black text-slate-900 dark:text-slate-50">
            {formatCurrency(totalRevenue, selectedStore?.currency)}
          </p>
          <p className="mt-0.5 text-[11px] font-bold text-emerald-600 dark:text-[#4ade80]">
            ↑ 18.6%
          </p>
        </div>
        <div className="shadow-xs rounded-2xl border border-slate-200/80 bg-white p-4 dark:border-slate-800/80 dark:bg-[#121620]">
          <p className="font-sans text-xs font-semibold text-slate-500 dark:text-slate-400">
            Net Profit
          </p>
          <p className="mt-1 text-xl font-black text-emerald-600 dark:text-[#4ade80]">
            {formatCurrency(netProfit, selectedStore?.currency)}
          </p>
          <p className="mt-0.5 text-[11px] font-bold text-emerald-600 dark:text-[#4ade80]">
            ↑ 20.4%
          </p>
        </div>
        <div className="shadow-xs rounded-2xl border border-slate-200/80 bg-white p-4 dark:border-slate-800/80 dark:bg-[#121620]">
          <p className="font-sans text-xs font-semibold text-slate-500 dark:text-slate-400">
            Net Margin
          </p>
          <p className="mt-1 text-xl font-black text-amber-600 dark:text-[#fb923c]">
            {formatPercent(profitMargin)}
          </p>
          <p className="mt-0.5 text-[11px] font-bold text-emerald-600 dark:text-[#4ade80]">
            ↑ 2.1%
          </p>
        </div>
        <div className="shadow-xs rounded-2xl border border-slate-200/80 bg-white p-4 dark:border-slate-800/80 dark:bg-[#121620]">
          <p className="font-sans text-xs font-semibold text-slate-500 dark:text-slate-400">
            Avg Order Value
          </p>
          <p className="mt-1 text-xl font-black text-purple-600 dark:text-[#c084fc]">
            {formatCurrency(avgOrderValue, selectedStore?.currency)}
          </p>
          <p className="mt-0.5 text-[11px] font-bold text-emerald-600 dark:text-[#4ade80]">
            ↑ 3.2%
          </p>
        </div>
        <div className="shadow-xs rounded-2xl border border-slate-200/80 bg-white p-4 dark:border-slate-800/80 dark:bg-[#121620]">
          <p className="font-sans text-xs font-semibold text-slate-500 dark:text-slate-400">
            Avg Profit/Order
          </p>
          <p className="mt-1 text-xl font-black text-pink-600 dark:text-[#f472b6]">
            {formatCurrency(avgProfitPerOrder, selectedStore?.currency)}
          </p>
          <p className="mt-0.5 text-[11px] font-bold text-emerald-600 dark:text-[#4ade80]">
            ↑ 4.7%
          </p>
        </div>
        <div className="shadow-xs rounded-2xl border border-slate-200/80 bg-white p-4 dark:border-slate-800/80 dark:bg-[#121620]">
          <p className="font-sans text-xs font-semibold text-slate-500 dark:text-slate-400">
            Total Orders
          </p>
          <p className="mt-1 text-xl font-black text-blue-600 dark:text-[#38bdf8]">{totalOrders}</p>
          <p className="mt-0.5 text-[11px] font-bold text-emerald-600 dark:text-[#4ade80]">
            ↑ 15.3%
          </p>
        </div>
      </div>

      {/* Waterfall Breakdown Chart & Progress Bar */}
      <div className="shadow-xs overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 dark:border-slate-800/80 dark:bg-[#121620]">
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-slate-50">
              <Layers className="h-4 w-4 text-emerald-600 dark:text-[#4ade80]" />
              TrueProfit Waterfall Deduction (Gross Revenue to Net Profit)
            </h3>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Exact accounting of all platform cuts, ad expenditure, product costs, and remaining
              bottom line.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/50 dark:text-[#4ade80]">
              {formatPercent(profitMargin)} Net Margin
            </span>
          </div>
        </div>

        {/* Visual Revenue Allocation Bar */}
        <div className="mb-6 rounded-2xl border border-slate-100 bg-slate-50/60 p-4 dark:border-slate-800/80 dark:bg-white/5">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Revenue Allocation Flow (% of Gross Sales)
          </p>
          <div className="flex h-4 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div
              style={{ width: `${((totalCogs / (totalRevenue || 1)) * 100).toFixed(1)}%` }}
              className="bg-amber-500 transition-all"
              title={`COGS: ${((totalCogs / (totalRevenue || 1)) * 100).toFixed(1)}%`}
            />
            <div
              style={{ width: `${((totalFees / (totalRevenue || 1)) * 100).toFixed(1)}%` }}
              className="bg-purple-500 transition-all"
              title={`TikTok Fees: ${((totalFees / (totalRevenue || 1)) * 100).toFixed(1)}%`}
            />
            <div
              style={{ width: `${((totalAdsSpend / (totalRevenue || 1)) * 100).toFixed(1)}%` }}
              className="bg-violet-500 transition-all"
              title={`TikTok Ads: ${((totalAdsSpend / (totalRevenue || 1)) * 100).toFixed(1)}%`}
            />
            <div
              style={{ width: `${((refunds / (totalRevenue || 1)) * 100).toFixed(1)}%` }}
              className="bg-rose-500 transition-all"
              title={`Refunds: ${((refunds / (totalRevenue || 1)) * 100).toFixed(1)}%`}
            />
            <div
              style={{ width: `${((netProfit / (totalRevenue || 1)) * 100).toFixed(1)}%` }}
              className="bg-[#22c55e] transition-all"
              title={`Net Profit: ${((netProfit / (totalRevenue || 1)) * 100).toFixed(1)}%`}
            />
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                COGS ({((totalCogs / (totalRevenue || 1)) * 100).toFixed(1)}%)
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-purple-500" />
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                TikTok Fees ({((totalFees / (totalRevenue || 1)) * 100).toFixed(1)}%)
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-violet-500" />
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Ads ({((totalAdsSpend / (totalRevenue || 1)) * 100).toFixed(1)}%)
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Refunds ({((refunds / (totalRevenue || 1)) * 100).toFixed(1)}%)
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]" />
              <span className="font-bold text-emerald-600 dark:text-[#4ade80]">
                Net Profit ({((netProfit / (totalRevenue || 1)) * 100).toFixed(1)}%)
              </span>
            </div>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={waterfallData} margin={{ top: 20, right: 20, left: -10, bottom: 10 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke={isDark ? '#1e293b' : '#f1f5f9'}
              />
              <XAxis
                dataKey="stage"
                tick={{ fill: isDark ? '#64748b' : '#94a3b8', fontSize: 11 }}
              />
              <YAxis
                tick={{ fill: isDark ? '#64748b' : '#94a3b8', fontSize: 11 }}
                tickFormatter={(val) =>
                  `$${Math.abs(val) >= 1000 ? `${(Math.abs(val) / 1000).toFixed(0)}K` : Math.abs(val)}`
                }
              />
              <Tooltip
                formatter={(value: any) => [
                  formatCurrency(Math.abs(Number(value)), selectedStore?.currency),
                  'Amount',
                ]}
                contentStyle={{
                  borderRadius: '12px',
                  borderColor: isDark ? '#1e293b' : '#e2e8f0',
                  backgroundColor: isDark ? '#161b26' : '#ffffff',
                  color: isDark ? '#f8fafc' : '#0f172a',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="amount" radius={[6, 6, 6, 6]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Daily Profit Growth Trend Area Chart */}
      <div className="shadow-xs overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 dark:border-slate-800/80 dark:bg-[#121620]">
        <h3 className="mb-4 text-sm font-bold text-slate-900 dark:text-slate-50">
          Daily Cumulative Net Profit & Revenue Flow
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={profitTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke={isDark ? '#1e293b' : '#f1f5f9'}
              />
              <XAxis dataKey="date" tick={{ fill: isDark ? '#64748b' : '#94a3b8', fontSize: 11 }} />
              <YAxis tick={{ fill: isDark ? '#64748b' : '#94a3b8', fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  borderColor: isDark ? '#1e293b' : '#e2e8f0',
                  backgroundColor: isDark ? '#161b26' : '#ffffff',
                  color: isDark ? '#f8fafc' : '#0f172a',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="profit"
                stroke="#22c55e"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#profitGrad)"
                name="Net Profit"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
