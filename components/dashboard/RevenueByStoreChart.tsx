'use client';

import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useStore } from '../../context/StoreContext';
import { formatCurrency } from '../../lib/utils';

export default function RevenueByStoreChart() {
  const { categoryBreakdown, totalRevenue, selectedStore, selectedStoreId } = useStore();

  const title = selectedStoreId === 'all' ? 'Revenue by Store' : `${selectedStore?.name} Revenue by Category`;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-[#161b26]/95 p-2.5 shadow-xl backdrop-blur-md text-xs">
          <p className="font-bold text-slate-800 dark:text-slate-100">{data.name}</p>
          <p className="mt-0.5 font-semibold text-emerald-600 dark:text-[#4ade80] font-mono-numeric">
            {formatCurrency(data.value, selectedStore?.currency)} ({data.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#121620] p-4 sm:p-5 shadow-xs transition-colors overflow-hidden">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50 line-clamp-1">{title}</h3>
        {selectedStore && (
          <span className="rounded-md bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-[#4ade80] border border-emerald-200 dark:border-emerald-800">
            {selectedStore.flag} Filtered
          </span>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 my-auto py-2">
        {/* Donut Chart with Center Total */}
        <div className="relative h-40 sm:h-44 w-40 sm:w-44 shrink-0 mx-auto">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<CustomTooltip />} />
              <Pie
                data={categoryBreakdown}
                dataKey="value"
                nameKey="name"
                innerRadius={52}
                outerRadius={72}
                paddingAngle={3}
              >
                {categoryBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center font-mono-numeric">
            <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 font-sans">Total</span>
            <span className="text-xs font-black text-slate-900 dark:text-slate-50 line-clamp-1 px-1">
              {formatCurrency(totalRevenue, selectedStore?.currency)}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-2.5 w-full font-mono-numeric">
          {categoryBreakdown.map((item) => (
            <div key={item.name} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 overflow-hidden font-sans">
                <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="font-semibold text-slate-700 dark:text-slate-300 truncate">{item.name}</span>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <span className="font-bold text-slate-900 dark:text-white">
                  {formatCurrency(item.value, selectedStore?.currency)}
                </span>
                <span className="w-9 text-right text-slate-400 dark:text-slate-500 font-medium font-sans">{item.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
