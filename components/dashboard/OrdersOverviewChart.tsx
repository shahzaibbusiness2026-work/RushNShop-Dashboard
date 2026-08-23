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
    <div className="flex h-full flex-col justify-between rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#151b26] p-5 shadow-sm transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">Orders Overview</h3>
        <Link href="/orders" className="text-xs font-bold text-[#22c55e] dark:text-[#4ade80] hover:underline">
          View all
        </Link>
      </div>

      {/* Donut & Legend */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 my-auto py-2">
        {/* Donut */}
        <div className="relative h-40 w-40 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<CustomTooltip />} />
              <Pie
                data={orderStatusCounts}
                dataKey="count"
                nameKey="name"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={3}
              >
                {orderStatusCounts.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-base font-black text-gray-900 dark:text-white">{totalOrders}</span>
            <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500">
              {selectedStore ? `${selectedStore.countryCode} Orders` : 'Total Orders'}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-2 w-full">
          {orderStatusCounts.map((item) => (
            <div key={item.name} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-sm shrink-0" style={{ backgroundColor: item.color }} />
                <span className="font-semibold text-gray-700 dark:text-gray-300">{item.name}</span>
              </div>
              <div className="flex items-center gap-1.5 font-bold text-gray-900 dark:text-white">
                <span>{item.count}</span>
                <span className="text-gray-400 dark:text-gray-500 font-normal">({item.percentage}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
