'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useStore } from '../../context/StoreContext';
import { cn } from '../../lib/utils';

export default function OrdersOverviewChart() {
  const { totalOrders, orderStatusCounts, selectedStore } = useStore();
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const activeItem = activeIdx !== null ? orderStatusCounts[activeIdx] : null;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="pointer-events-none rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-[#161b26]/95 px-3 py-2 shadow-xl backdrop-blur-md text-xs z-50">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: data.color }} />
            <p className="font-bold text-slate-800 dark:text-slate-100">{data.name}</p>
          </div>
          <p className="mt-1 font-semibold text-slate-700 dark:text-slate-300 font-mono-numeric">
            {data.count} orders <span className="text-slate-400 dark:text-slate-500 font-normal">({data.percentage}%)</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#121620] p-4 sm:p-5 shadow-xs transition-colors overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50">Orders Overview</h3>
        <Link href="/orders" className="text-xs font-bold text-emerald-600 dark:text-[#4ade80] hover:underline">
          View all
        </Link>
      </div>

      {/* Donut Chart & Legend Stacked Cleanly */}
      <div className="flex flex-col items-center justify-center my-auto py-2 w-full">
        {/* Donut */}
        <div className="relative h-36 w-36 shrink-0 mx-auto">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                content={<CustomTooltip />}
                wrapperStyle={{ zIndex: 100, pointerEvents: 'none' }}
                offset={10}
              />
              <Pie
                data={orderStatusCounts}
                dataKey="count"
                nameKey="name"
                innerRadius={46}
                outerRadius={64}
                paddingAngle={3}
                onMouseEnter={(_, idx) => setActiveIdx(idx)}
                onMouseLeave={() => setActiveIdx(null)}
                className="outline-none focus:outline-none cursor-pointer"
              >
                {orderStatusCounts.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    opacity={activeIdx === null || activeIdx === index ? 1 : 0.45}
                    className="transition-opacity duration-150 outline-none focus:outline-none"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center font-mono-numeric">
            <span className="text-base font-black text-slate-900 dark:text-slate-50 leading-none">
              {activeItem ? activeItem.count : totalOrders}
            </span>
            <span className="text-[9px] font-semibold text-slate-400 dark:text-slate-500 mt-0.5 font-sans truncate max-w-[80px]">
              {activeItem ? activeItem.name : (selectedStore ? selectedStore.countryCode : 'Total')}
            </span>
          </div>
        </div>

        {/* Legend Grid - 2 columns for neat, zero-overflow compact fit */}
        <div className="grid grid-cols-2 gap-2 mt-3 w-full pt-2 border-t border-slate-100 dark:border-slate-800/80 font-mono-numeric">
          {orderStatusCounts.map((item, idx) => {
            const isHovered = activeIdx === idx;
            return (
              <div
                key={item.name}
                onMouseEnter={() => setActiveIdx(idx)}
                onMouseLeave={() => setActiveIdx(null)}
                className={cn(
                  'flex items-center justify-between rounded-lg px-2 py-1.5 text-[11px] transition-all cursor-pointer border',
                  isHovered
                    ? 'bg-slate-100 dark:bg-white/10 border-slate-300 dark:border-slate-700 shadow-2xs'
                    : 'bg-slate-50/70 dark:bg-[#0f1117]/60 border-transparent hover:bg-slate-100/80 dark:hover:bg-white/5'
                )}
              >
                <div className="flex items-center gap-1.5 overflow-hidden">
                  <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="font-semibold text-slate-700 dark:text-slate-300 truncate font-sans">{item.name}</span>
                </div>
                <div className="flex items-center gap-1 shrink-0 ml-1">
                  <span className="font-bold text-slate-900 dark:text-white">
                    {item.count}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-normal">
                    ({item.percentage}%)
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
