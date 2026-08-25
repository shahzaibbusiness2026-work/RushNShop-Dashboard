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
        <div className="pointer-events-none z-50 rounded-xl border border-slate-200/80 bg-white/95 px-3 py-2 text-xs shadow-xl backdrop-blur-md dark:border-slate-800 dark:bg-[#161b26]/95">
          <div className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: data.color }}
            />
            <p className="font-bold text-slate-800 dark:text-slate-100">{data.name}</p>
          </div>
          <p className="font-mono-numeric mt-1 font-semibold text-slate-700 dark:text-slate-300">
            {data.count} orders{' '}
            <span className="font-normal text-slate-400 dark:text-slate-500">
              ({data.percentage}%)
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="shadow-xs flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 transition-colors dark:border-slate-800/80 dark:bg-[#121620] sm:p-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50">Orders Overview</h3>
        <Link
          href="/orders"
          className="text-xs font-bold text-emerald-600 hover:underline dark:text-[#4ade80]"
        >
          View all
        </Link>
      </div>

      {/* Donut Chart & Legend Stacked Cleanly */}
      <div className="my-auto flex w-full flex-col items-center justify-center py-2">
        {/* Donut */}
        <div className="relative mx-auto h-36 w-36 shrink-0">
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
                className="cursor-pointer outline-none focus:outline-none"
              >
                {orderStatusCounts.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    opacity={activeIdx === null || activeIdx === index ? 1 : 0.45}
                    className="outline-none transition-opacity duration-150 focus:outline-none"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Text */}
          <div className="font-mono-numeric pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-base font-black leading-none text-slate-900 dark:text-slate-50">
              {activeItem ? activeItem.count : totalOrders}
            </span>
            <span className="mt-0.5 max-w-[80px] truncate font-sans text-[9px] font-semibold text-slate-400 dark:text-slate-500">
              {activeItem ? activeItem.name : selectedStore ? selectedStore.countryCode : 'Total'}
            </span>
          </div>
        </div>

        {/* Legend Grid - 2 columns for neat, zero-overflow compact fit */}
        <div className="font-mono-numeric mt-3 grid w-full grid-cols-2 gap-2 border-t border-slate-100 pt-2 dark:border-slate-800/80">
          {orderStatusCounts.map((item, idx) => {
            const isHovered = activeIdx === idx;
            return (
              <div
                key={item.name}
                onMouseEnter={() => setActiveIdx(idx)}
                onMouseLeave={() => setActiveIdx(null)}
                className={cn(
                  'flex cursor-pointer items-center justify-between rounded-lg border px-2 py-1.5 text-[11px] transition-all',
                  isHovered
                    ? 'shadow-2xs border-slate-300 bg-slate-100 dark:border-slate-700 dark:bg-white/10'
                    : 'border-transparent bg-slate-50/70 hover:bg-slate-100/80 dark:bg-[#0f1117]/60 dark:hover:bg-white/5',
                )}
              >
                <div className="flex items-center gap-1.5 overflow-hidden">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="truncate font-sans font-semibold text-slate-700 dark:text-slate-300">
                    {item.name}
                  </span>
                </div>
                <div className="ml-1 flex shrink-0 items-center gap-1">
                  <span className="font-bold text-slate-900 dark:text-white">{item.count}</span>
                  <span className="text-[10px] font-normal text-slate-400 dark:text-slate-500">
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
