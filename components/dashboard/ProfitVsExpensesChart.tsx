'use client';

import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { useStore } from '../../context/StoreContext';
import { formatCurrency } from '../../lib/utils';
import { ChevronDown } from 'lucide-react';

export default function ProfitVsExpensesChart() {
  const { profitTrend, stores, selectedStoreId, setSelectedStoreId, selectedStore, theme } = useStore();
  const [timeframe, setTimeframe] = useState<'Daily' | 'Weekly'>('Daily');

  const isDark = theme === 'dark';

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-xl border border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-[#161b22]/95 p-3 shadow-xl backdrop-blur-sm text-xs">
          <p className="font-bold text-gray-800 dark:text-gray-100">{label}</p>
          <div className="mt-1.5 space-y-1">
            <p className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-[#4ade80]">
              <span className="h-2 w-2 rounded-full bg-[#22c55e]" />
              <span>Profit: {formatCurrency(payload[0]?.value || 0, selectedStore?.currency)}</span>
            </p>
            <p className="flex items-center gap-2 font-semibold text-rose-500 dark:text-rose-400">
              <span className="h-2 w-2 rounded-full bg-[#fb7185]" />
              <span>Expenses: {formatCurrency(payload[1]?.value || 0, selectedStore?.currency)}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#151b26] p-5 shadow-sm transition-colors">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">Profit vs Expenses</h3>

        <div className="flex items-center gap-3 text-xs">
          {/* Legend */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-[#22c55e]" />
              <span className="font-medium text-gray-600 dark:text-gray-300">Profit</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-[#fb7185]" />
              <span className="font-medium text-gray-600 dark:text-gray-300">Expenses</span>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            <select
              value={selectedStoreId}
              onChange={(e) => setSelectedStoreId(e.target.value)}
              className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-white/5 px-2 py-1 text-xs font-semibold text-gray-600 dark:text-gray-300 outline-none"
            >
              <option value="all" className="dark:bg-[#161b22]">All Stores</option>
              {stores.map((s) => (
                <option key={s.id} value={s.id} className="dark:bg-[#161b22]">
                  {s.flag} {s.name}
                </option>
              ))}
            </select>

            <button
              onClick={() => setTimeframe(timeframe === 'Daily' ? 'Weekly' : 'Daily')}
              className="flex items-center gap-1 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-white/5 px-2 py-1 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10"
            >
              <span>{timeframe}</span>
              <ChevronDown className="h-3 w-3 text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-4 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={profitTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barGap={6}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#1e293b' : '#f1f5f9'} />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: isDark ? '#64748b' : '#94a3b8', fontSize: 11 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: isDark ? '#64748b' : '#94a3b8', fontSize: 11 }}
              tickFormatter={(val) => `$${val >= 1000 ? `${(val / 1000).toFixed(0)}K` : val}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="profit" name="Profit" fill="#22c55e" radius={[4, 4, 0, 0]} maxBarSize={20} />
            <Bar dataKey="expenses" name="Expenses" fill="#fb7185" radius={[4, 4, 0, 0]} maxBarSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
