'use client';

import React, { useState, useMemo } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
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
        {
          date: 'Week 3 (Est)',
          profit: Math.round(w2Profit * 1.15),
          revenue: Math.round(w2Rev * 1.15),
        },
        {
          date: 'Week 4 (Est)',
          profit: Math.round(w2Profit * 1.25),
          revenue: Math.round(w2Rev * 1.25),
        },
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
        <div className="rounded-xl border border-slate-200/80 bg-white/95 p-3 text-xs shadow-xl backdrop-blur-md dark:border-slate-800 dark:bg-[#161b26]/95">
          <p className="font-bold text-slate-800 dark:text-slate-100">{label}</p>
          <div className="font-mono-numeric mt-1.5 space-y-1">
            <p className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-[#4ade80]">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>
                Net Profit: {formatCurrency(payload[0]?.value || 0, selectedStore?.currency)}
              </span>
            </p>
            <p className="flex items-center gap-2 font-semibold text-slate-500 dark:text-slate-400">
              <span className="h-2 w-2 rounded-full bg-slate-400" />
              <span>
                Revenue: {formatCurrency(payload[1]?.value || 0, selectedStore?.currency)}
              </span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="shadow-xs flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 transition-colors dark:border-slate-800/80 dark:bg-[#121620]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Profit Trend
          </h3>
          <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
            Revenue vs. Net Profit dynamics
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Legend */}
          <div className="hidden items-center gap-2.5 text-xs sm:flex">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#22c55e]" />
              <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300">Net Profit</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-700" />
              <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300">Revenue</span>
            </div>
          </div>

          {/* Segmented Timeframe Toggle */}
          <div className="flex items-center rounded-xl border border-slate-200/80 bg-slate-100/70 p-0.5 dark:border-slate-800 dark:bg-white/5">
            {(['Daily', 'Weekly', 'Monthly'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all duration-200 ${
                  timeframe === t
                    ? 'bg-white text-slate-900 shadow-2xs dark:bg-[#1e293b] dark:text-white'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-4 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            barGap={6}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={isDark ? '#1e293b' : '#f1f5f9'}
            />
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
            <Bar
              dataKey="profit"
              name="Net Profit"
              fill="#22c55e"
              radius={[6, 6, 0, 0]}
              maxBarSize={28}
            />
            <Bar
              dataKey="revenue"
              name="Revenue"
              fill={isDark ? '#334155' : '#cbd5e1'}
              radius={[6, 6, 0, 0]}
              maxBarSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
