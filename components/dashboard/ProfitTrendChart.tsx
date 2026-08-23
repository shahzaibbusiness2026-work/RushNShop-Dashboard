'use client';

import React, { useState, useMemo } from 'react';
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

export default function ProfitTrendChart() {
  const { profitTrend, selectedStore, theme } = useStore();
  const [timeframe, setTimeframe] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily');
  const [showDropdown, setShowDropdown] = useState(false);

  const isDark = theme === 'dark';

  // Transform data based on timeframe
  const chartData = useMemo(() => {
    if (timeframe === 'Daily') return profitTrend;

    if (timeframe === 'Weekly') {
      const w1Profit = profitTrend.slice(0, 3).reduce((a, b) => a + b.profit, 0);
      const w1Rev = profitTrend.slice(0, 3).reduce((a, b) => a + b.revenue, 0);
      const w2Profit = profitTrend.slice(3, 7).reduce((a, b) => a + b.profit, 0);
      const w2Rev = profitTrend.slice(3, 7).reduce((a, b) => a + b.revenue, 0);

      return [
        { date: 'Week 1', profit: w1Profit, revenue: w1Rev },
        { date: 'Week 2', profit: w2Profit, revenue: w2Rev },
        { date: 'Week 3 (Est)', profit: Math.round(w2Profit * 1.15), revenue: Math.round(w2Rev * 1.15) },
        { date: 'Week 4 (Est)', profit: Math.round(w2Profit * 1.25), revenue: Math.round(w2Rev * 1.25) },
      ];
    }

    // Monthly
    const totalP = profitTrend.reduce((a, b) => a + b.profit, 0);
    const totalR = profitTrend.reduce((a, b) => a + b.revenue, 0);
    return [
      { date: 'Mar 2024', profit: Math.round(totalP * 0.72), revenue: Math.round(totalR * 0.72) },
      { date: 'Apr 2024', profit: Math.round(totalP * 0.88), revenue: Math.round(totalR * 0.88) },
      { date: 'May 2024 (MTD)', profit: totalP, revenue: totalR },
    ];
  }, [profitTrend, timeframe]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-[#161b26]/95 p-3 shadow-xl backdrop-blur-md text-xs">
          <p className="font-bold text-slate-800 dark:text-slate-100">{label}</p>
          <div className="mt-1.5 space-y-1 font-mono-numeric">
            <p className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-[#4ade80]">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>Net Profit: {formatCurrency(payload[0]?.value || 0, selectedStore?.currency)}</span>
            </p>
            <p className="flex items-center gap-2 font-semibold text-slate-500 dark:text-slate-400">
              <span className="h-2 w-2 rounded-full bg-slate-400" />
              <span>Revenue: {formatCurrency(payload[1]?.value || 0, selectedStore?.currency)}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#121620] p-5 shadow-xs transition-colors overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Profit Trend</h3>
        </div>

        <div className="flex items-center gap-4">
          {/* Legend */}
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-[#22c55e]" />
              <span className="font-medium text-slate-600 dark:text-slate-300">Net Profit</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-slate-300 dark:bg-slate-700" />
              <span className="font-medium text-slate-600 dark:text-slate-300">Revenue</span>
            </div>
          </div>

          {/* Timeframe Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-white/5 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            >
              <span>{timeframe}</span>
              <ChevronDown className="h-3 w-3 text-slate-400" />
            </button>

            {showDropdown && (
              <div className="absolute right-0 top-full mt-1.5 w-32 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161b26] p-1.5 shadow-xl z-20">
                {(['Daily', 'Weekly', 'Monthly'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setTimeframe(t);
                      setShowDropdown(false);
                    }}
                    className={`flex w-full items-center rounded-lg px-2.5 py-1 text-xs font-medium text-left transition-colors ${
                      timeframe === t
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-[#4ade80] font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-4 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barGap={6}>
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
            <Bar dataKey="profit" name="Net Profit" fill="#22c55e" radius={[4, 4, 0, 0]} maxBarSize={28} />
            <Bar dataKey="revenue" name="Revenue" fill={isDark ? '#334155' : '#cbd5e1'} radius={[4, 4, 0, 0]} maxBarSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
