'use client';

import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  growth: number;
  icon: React.ElementType;
  themeColor: 'green' | 'emerald' | 'amber' | 'blue' | 'purple' | 'pink';
  sparklinePoints?: number[];
}

const themeStyles = {
  green: {
    bg: 'bg-[#eefbe8] dark:bg-emerald-950/40',
    text: 'text-[#22c55e] dark:text-[#4ade80]',
    stroke: '#22c55e',
    fill: 'rgba(34, 197, 94, 0.12)',
  },
  emerald: {
    bg: 'bg-[#e6f9f0] dark:bg-teal-950/40',
    text: 'text-[#10b981] dark:text-[#34d399]',
    stroke: '#10b981',
    fill: 'rgba(16, 185, 129, 0.12)',
  },
  amber: {
    bg: 'bg-[#fff7ed] dark:bg-amber-950/40',
    text: 'text-[#f97316] dark:text-[#fb923c]',
    stroke: '#f97316',
    fill: 'rgba(249, 115, 22, 0.12)',
  },
  blue: {
    bg: 'bg-[#f0f9ff] dark:bg-sky-950/40',
    text: 'text-[#0284c7] dark:text-[#38bdf8]',
    stroke: '#0284c7',
    fill: 'rgba(2, 132, 199, 0.12)',
  },
  purple: {
    bg: 'bg-[#faf5ff] dark:bg-purple-950/40',
    text: 'text-[#9333ea] dark:text-[#c084fc]',
    stroke: '#9333ea',
    fill: 'rgba(147, 51, 234, 0.12)',
  },
  pink: {
    bg: 'bg-[#fdf2f8] dark:bg-pink-950/40',
    text: 'text-[#db2777] dark:text-[#f472b6]',
    stroke: '#db2777',
    fill: 'rgba(219, 39, 119, 0.12)',
  },
};

export default function StatCard({
  title,
  value,
  growth,
  icon: Icon,
  themeColor,
  sparklinePoints = [20, 25, 22, 35, 30, 45, 40, 55, 60],
}: StatCardProps) {
  const theme = themeStyles[themeColor];
  const isPositive = growth >= 0;

  // Generate SVG path for sparkline
  const min = Math.min(...sparklinePoints);
  const max = Math.max(...sparklinePoints);
  const range = max - min || 1;
  const height = 28;
  const width = 80;

  const points = sparklinePoints
    .map((val, idx) => {
      const x = (idx / (sparklinePoints.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 6) - 3;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#151b26] p-4 shadow-sm hover:shadow-md transition-all">
      {/* Top: Icon + Title */}
      <div className="flex items-center gap-2">
        <div className={cn('flex h-7 w-7 items-center justify-center rounded-lg', theme.bg, theme.text)}>
          <Icon className="h-4 w-4" />
        </div>
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{title}</span>
      </div>

      {/* Value */}
      <div className="mt-2.5">
        <span className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 dark:text-white">{value}</span>
      </div>

      {/* Bottom: Delta & Mini Sparkline */}
      <div className="mt-2.5 flex items-center justify-between">
        <div
          className={cn(
            'flex items-center gap-0.5 text-xs font-bold',
            isPositive ? 'text-emerald-600 dark:text-[#4ade80]' : 'text-rose-600 dark:text-rose-400'
          )}
        >
          {isPositive ? (
            <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.5]" />
          ) : (
            <ArrowDownRight className="h-3.5 w-3.5 stroke-[2.5]" />
          )}
          <span>{Math.abs(growth).toFixed(1)}%</span>
        </div>

        {/* Sparkline */}
        <div className="h-7 w-20">
          <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full overflow-visible">
            <polyline
              fill="none"
              stroke={theme.stroke}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
