'use client';

import React from 'react';
import Link from 'next/link';
import { TrendingUp, Star, AlertTriangle, Sparkles, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { cn } from '../../lib/utils';

export default function AIInsightsCard() {
  const { storeInsights } = useStore();

  const getIcon = (type: string) => {
    switch (type) {
      case 'win':
        return <TrendingUp className="h-4 w-4 stroke-[2.2]" />;
      case 'star':
        return <Star className="h-4 w-4 fill-current stroke-[2.2]" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 stroke-[2.2]" />;
      default:
        return <Sparkles className="h-4 w-4 stroke-[2.2]" />;
    }
  };

  const getStyles = (type: string) => {
    switch (type) {
      case 'win':
        return {
          bg: 'bg-emerald-50/70 dark:bg-emerald-950/20',
          text: 'text-emerald-600 dark:text-[#4ade80]',
          border: 'border-emerald-200/60 dark:border-emerald-900/40',
        };
      case 'star':
        return {
          bg: 'bg-amber-50/70 dark:bg-amber-950/20',
          text: 'text-amber-600 dark:text-[#facc15]',
          border: 'border-amber-200/60 dark:border-amber-900/40',
        };
      case 'warning':
        return {
          bg: 'bg-rose-50/70 dark:bg-rose-950/20',
          text: 'text-rose-600 dark:text-[#f87171]',
          border: 'border-rose-200/60 dark:border-rose-900/40',
        };
      default:
        return {
          bg: 'bg-purple-50/70 dark:bg-purple-950/20',
          text: 'text-purple-600 dark:text-[#c084fc]',
          border: 'border-purple-200/60 dark:border-purple-900/40',
        };
    }
  };

  return (
    <div className="shadow-xs flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 transition-colors dark:border-slate-800/80 dark:bg-[#121620]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-emerald-600 dark:text-[#4ade80]" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">AI Intelligence</h3>
        </div>
        <Link
          href="/ai-assistant"
          className="flex items-center gap-1 text-xs font-bold text-emerald-600 hover:underline dark:text-[#4ade80]"
        >
          <span>Ask AI</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {/* Insights List */}
      <div className="mt-3 space-y-2.5">
        {storeInsights.map((insight) => {
          const style = getStyles(insight.type);
          return (
            <div
              key={insight.id}
              className={cn(
                'hover:shadow-xs group flex items-start gap-3 rounded-xl border p-3 transition-all duration-150',
                style.bg,
                style.border,
              )}
            >
              <div
                className={cn(
                  'shadow-2xs mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-slate-200/50 bg-white dark:border-slate-800 dark:bg-[#161b26]',
                  style.text,
                )}
              >
                {getIcon(insight.type)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold leading-snug text-slate-800 dark:text-slate-200">
                  {insight.text}
                </p>
                {insight.detail && (
                  <p className="mt-0.5 line-clamp-2 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                    {insight.detail}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
