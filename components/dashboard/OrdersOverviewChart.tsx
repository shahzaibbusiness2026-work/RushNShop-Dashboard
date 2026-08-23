'use client';

import React from 'react';
import Link from 'next/link';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useStore } from '../../context/StoreContext';

export default function OrdersOverviewChart() {
  const { totalOrders, orderStatusCounts, selectedStore } = useStore();

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="rounded-xl border border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-[#161b22]/95 p-2.5 shadow-xl backdrop-blur-sm text-xs">
          <p className="font-bold text-gray-900 dark:text-white">{data.name}</p>
          <p className="mt-0.5 font-semibold text-gray-700 dark:text-gray-300">
            {data.count} orders ({data.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#151b26] p-5 shadow-sm transition-colors overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">Orders Overview</h3>
        <Link href="/orders" className="text-xs font-bold text-[#22c55e] dark:text-[#4ade80] hover:underline">
          View all
        </Link>
      </div>

      {/* Donut Chart & Legend Stacked Cleanly */}
      <div className="flex flex-col items-center justify-center my-auto py-2 w-full">
        {/* Donut */}
        <div className="relative h-36 w-36 shrink-0 mx-auto">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<CustomTooltip />} />
              <Pie
                data={orderStatusCounts}
                dataKey="count"
                nameKey="name"
                innerRadius={46}
                outerRadius={64}
                paddingAngle={3}
              >
                {orderStatusCounts.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
            <span className="text-base font-black text-gray-900 dark:text-white leading-none">{totalOrders}</span>
            <span className="text-[9px] font-semibold text-gray-400 dark:text-gray-500 mt-0.5">
              {selectedStore ? `${selectedStore.countryCode}` : 'Total'}
            </span>
          </div>
        </div>

        {/* Legend Grid - 2 columns for neat, zero-overflow compact fit */}
        <div className="grid grid-cols-2 gap-2 mt-3 w-full pt-1 border-t border-gray-100 dark:border-gray-800/80">
          {orderStatusCounts.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between rounded-lg bg-gray-50/70 dark:bg-[#0f1117]/60 px-2 py-1.5 text-[11px]"
            >
              <div className="flex items-center gap-1.5 overflow-hidden">
                <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="font-semibold text-gray-700 dark:text-gray-300 truncate">{item.name}</span>
              </div>
              <span className="font-bold text-gray-900 dark:text-white shrink-0 ml-1">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
