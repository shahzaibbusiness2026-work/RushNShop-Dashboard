'use client';

import React, { useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Store as StoreIcon, Layers, RotateCcw, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatCurrency, cn } from '../../lib/utils';

export default function RevenueByStoreChart() {
  const {
    categoryBreakdown,
    totalRevenue,
    selectedStore,
    selectedStoreId,
    setSelectedStoreId,
    stores,
  } = useStore();

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const isAll = selectedStoreId === 'all';
  const title = isAll ? 'Revenue by Store' : `${selectedStore?.name} Categories`;

  // Custom high-contrast tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="animate-in fade-in zoom-in-95 rounded-xl border border-slate-200/90 bg-white/95 p-3 text-xs shadow-2xl backdrop-blur-md dark:border-slate-700 dark:bg-[#161b26]/95">
          <div className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: data.color }}
            />
            <p className="font-bold text-slate-900 dark:text-slate-100">{data.name}</p>
          </div>
          <div className="mt-1.5 flex items-center justify-between gap-4 font-mono-numeric">
            <span className="font-bold text-emerald-600 dark:text-[#4ade80]">
              {formatCurrency(data.value, selectedStore?.currency)}
            </span>
            <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-700 dark:bg-white/10 dark:text-slate-300">
              {data.percentage}% Share
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="shadow-xs group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 transition-all duration-300 hover:border-slate-300 hover:shadow-card-hover dark:border-slate-800/80 dark:bg-[#121620] dark:hover:border-slate-700/80 sm:p-5">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-purple-200/50 bg-purple-50 text-purple-600 dark:border-purple-800/30 dark:bg-purple-950/30 dark:text-[#c084fc]">
            {isAll ? (
              <StoreIcon className="h-4 w-4 stroke-[2.2]" />
            ) : (
              <Layers className="h-4 w-4 stroke-[2.2]" />
            )}
          </div>
          <h3 className="truncate text-sm font-bold text-slate-900 dark:text-slate-50">
            {title}
          </h3>
        </div>

        {/* Store Active Badge / Reset Action */}
        {!isAll && selectedStore ? (
          <button
            type="button"
            onClick={() => setSelectedStoreId('all')}
            title="Reset to All Stores"
            className="flex items-center gap-1 rounded-md border border-emerald-300 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800 transition-all hover:bg-emerald-100 dark:border-emerald-700/60 dark:bg-emerald-950/60 dark:text-[#4ade80] dark:hover:bg-emerald-900/60 cursor-pointer"
          >
            <RotateCcw className="h-2.5 w-2.5" />
            <span>{selectedStore.flag} All Stores</span>
          </button>
        ) : (
          <span className="rounded-md border border-slate-200/80 bg-slate-50 px-2 py-0.5 text-[10px] font-bold text-slate-600 dark:border-slate-800 dark:bg-[#161b26] dark:text-slate-400">
            {stores.length} Connected
          </span>
        )}
      </div>

      {/* Chart & Legend Grid */}
      <div className="my-auto flex flex-col items-center justify-between gap-4 py-3 sm:flex-row">
        {/* Donut Chart with Center GMV Total */}
        <div className="relative mx-auto h-36 w-36 shrink-0 sm:h-40 sm:w-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<CustomTooltip />} />
              <Pie
                data={categoryBreakdown}
                dataKey="value"
                nameKey="name"
                innerRadius={46}
                outerRadius={66}
                paddingAngle={3}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {categoryBreakdown.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    opacity={activeIndex === null || activeIndex === index ? 1 : 0.6}
                    className="transition-opacity duration-200 cursor-pointer"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Metric */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Total GMV
            </span>
            <span className="font-mono-numeric line-clamp-1 px-1 text-xs font-black text-slate-900 dark:text-slate-50 sm:text-sm">
              {formatCurrency(totalRevenue, selectedStore?.currency)}
            </span>
          </div>
        </div>

        {/* Store / Category List with Visual Progress Bars */}
        <div className="w-full flex-1 space-y-2">
          {categoryBreakdown.map((item, idx) => {
            const correspondingStore = isAll ? stores.find((s) => s.name === item.name) : null;
            const isHovered = activeIndex === idx;

            return (
              <div
                key={item.name}
                onMouseEnter={() => setActiveIndex(idx)}
                onMouseLeave={() => setActiveIndex(null)}
                onClick={() => {
                  if (correspondingStore) {
                    setSelectedStoreId(correspondingStore.id);
                  }
                }}
                className={cn(
                  'group/item rounded-xl p-2 transition-all duration-150',
                  isAll ? 'cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5' : '',
                  isHovered ? 'bg-slate-50 dark:bg-white/5 ring-1 ring-slate-200 dark:ring-slate-700/80' : '',
                )}
              >
                <div className="flex items-center justify-between text-xs min-w-0">
                  <div className="flex items-center gap-2 overflow-hidden min-w-0">
                    {correspondingStore ? (
                      <span className="text-sm shrink-0">{correspondingStore.flag}</span>
                    ) : (
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                    )}
                    <span className="truncate font-semibold text-slate-700 dark:text-slate-200 group-hover/item:text-slate-900 dark:group-hover/item:text-white">
                      {item.name}
                    </span>
                  </div>

                  <div className="flex shrink-0 items-center gap-2 font-mono-numeric">
                    <span className="font-bold text-slate-900 dark:text-white">
                      {formatCurrency(item.value, selectedStore?.currency)}
                    </span>
                    <span className="w-8 text-right text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      {item.percentage}%
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
