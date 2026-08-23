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
        <div className="rounded-xl border border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-[#161b22]/95 p-2.5 shadow-xl backdrop-blur-sm text-xs">
          <p className="font-bold text-gray-900 dark:text-white">{data.name}</p>
          <p className="mt-0.5 font-semibold text-emerald-600 dark:text-[#4ade80]">
            {formatCurrency(data.value, selectedStore?.currency)} ({data.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#151b26] p-5 shadow-sm transition-colors">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1">{title}</h3>
        {selectedStore && (
          <span className="rounded-md bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-[#4ade80] border border-emerald-200 dark:border-emerald-800">
            {selectedStore.flag} Filtered
          </span>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 my-auto py-2">
        {/* Donut Chart with Center Total */}
        <div className="relative h-44 w-44 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<CustomTooltip />} />
              <Pie
                data={categoryBreakdown}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={75}
                paddingAngle={3}
              >
                {categoryBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
            <span className="text-[11px] font-semibold text-gray-400 dark:text-gray-500">Total</span>
            <span className="text-xs font-black text-gray-900 dark:text-white line-clamp-1 px-1">
              {formatCurrency(totalRevenue, selectedStore?.currency)}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-2.5 w-full">
          {categoryBreakdown.map((item) => (
            <div key={item.name} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="font-semibold text-gray-700 dark:text-gray-300 truncate">{item.name}</span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="font-bold text-gray-900 dark:text-white">
                  {formatCurrency(item.value, selectedStore?.currency)}
                </span>
                <span className="w-10 text-right text-gray-400 dark:text-gray-500 font-medium">{item.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
