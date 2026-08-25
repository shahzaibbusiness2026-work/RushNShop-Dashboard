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
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    text: 'text-emerald-600 dark:text-[#4ade80]',
    border: 'border-emerald-200/50 dark:border-emerald-800/30',
    stroke: '#22c55e',
    glow: 'rgba(34, 197, 94, 0.15)',
  },
  emerald: {
    bg: 'bg-teal-50 dark:bg-teal-950/30',
    text: 'text-teal-600 dark:text-[#34d399]',
    border: 'border-teal-200/50 dark:border-teal-800/30',
    stroke: '#10b981',
    glow: 'rgba(16, 185, 129, 0.15)',
  },
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    text: 'text-amber-600 dark:text-[#fb923c]',
    border: 'border-amber-200/50 dark:border-amber-800/30',
    stroke: '#f97316',
    glow: 'rgba(249, 115, 22, 0.15)',
  },
  blue: {
    bg: 'bg-sky-50 dark:bg-sky-950/30',
    text: 'text-sky-600 dark:text-[#38bdf8]',
    border: 'border-sky-200/50 dark:border-sky-800/30',
    stroke: '#0284c7',
    glow: 'rgba(2, 132, 199, 0.15)',
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-950/30',
    text: 'text-purple-600 dark:text-[#c084fc]',
    border: 'border-purple-200/50 dark:border-purple-800/30',
    stroke: '#9333ea',
    glow: 'rgba(147, 51, 234, 0.15)',
  },
  pink: {
    bg: 'bg-pink-50 dark:bg-pink-950/30',
    text: 'text-pink-600 dark:text-[#f472b6]',
    border: 'border-pink-200/50 dark:border-pink-800/30',
    stroke: '#db2777',
    glow: 'rgba(219, 39, 119, 0.15)',
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
  const gradientId = `sparkline-grad-${themeColor}-${title.replace(/\s+/g, '-').toLowerCase()}`;

  // Generate SVG smoothed sparkline
  const min = Math.min(...sparklinePoints);
  const max = Math.max(...sparklinePoints);
  const range = max - min || 1;
  const height = 28;
  const width = 76;

  const points = sparklinePoints
    .map((val, idx) => {
      const x = (idx / (sparklinePoints.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 8) - 4;
      return `${x},${y}`;
    })
    .join(' ');

  const areaPoints = `${points} ${width},${height} 0,${height}`;

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-card-hover dark:border-slate-800/80 dark:bg-[#121620] dark:hover:border-slate-700/80 sm:p-4">
      {/* Background illumination on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${theme.glow}, transparent 70%)`,
        }}
      />

      {/* Top Header: Icon + Title */}
      <div className="relative z-10 flex items-center justify-between gap-2 min-w-0">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div
            className={cn(
              'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition-transform duration-200 group-hover:scale-110',
              theme.bg,
              theme.text,
              theme.border,
            )}
          >
            <Icon className="h-4 w-4 stroke-[2.2]" />
          </div>
          <span className="truncate text-xs font-semibold tracking-tight text-slate-500 dark:text-slate-400">
            {title}
          </span>
        </div>
      </div>

      {/* Main Metric Value */}
      <div className="relative z-10 mt-2.5 min-w-0">
        <span className="font-mono-numeric block truncate text-lg font-black tracking-tight text-slate-900 dark:text-slate-50 sm:text-xl xl:text-2xl leading-none">
          {value}
        </span>
      </div>

      {/* Bottom Footer: Delta Pill + Sparkline */}
      <div className="relative z-10 mt-2.5 flex items-center justify-between gap-1.5 min-w-0">
        <div
          className={cn(
            'font-mono-numeric inline-flex shrink-0 items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[10px] font-bold sm:text-[11px]',
            isPositive
              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-[#4ade80]'
              : 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400',
          )}
        >
          {isPositive ? (
            <ArrowUpRight className="h-3 w-3 stroke-[2.5]" />
          ) : (
            <ArrowDownRight className="h-3 w-3 stroke-[2.5]" />
          )}
          <span>{Math.abs(growth).toFixed(1)}%</span>
        </div>

        {/* Sparkline Graph with Gradient Fill */}
        <div className="h-6 w-14 shrink-0 overflow-hidden sm:h-7 sm:w-16">
          <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full">
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={theme.stroke} stopOpacity="0.28" />
                <stop offset="100%" stopColor={theme.stroke} stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <polygon fill={`url(#${gradientId})`} points={areaPoints} />
            <polyline
              fill="none"
              stroke={theme.stroke}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
              className="transition-all duration-300"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
