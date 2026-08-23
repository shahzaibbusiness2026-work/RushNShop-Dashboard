'use client';

import React from 'react';
import Link from 'next/link';
import { TrendingUp, Star, AlertTriangle, Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { cn } from '../../lib/utils';

export default function AIInsightsCard() {
  const { storeInsights } = useStore();

  const getIcon = (type: string) => {
    switch (type) {
      case 'win':
        return <TrendingUp className="h-4 w-4" />;
      case 'star':
        return <Star className="h-4 w-4 fill-current" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Sparkles className="h-4 w-4" />;
    }
  };

  const getStyles = (type: string) => {
    switch (type) {
      case 'win':
        return {
          bg: 'bg-[#eefbe8] dark:bg-emerald-950/30',
          text: 'text-[#22c55e] dark:text-[#4ade80]',
          border: 'border-emerald-100 dark:border-emerald-900/40',
        };
      case 'star':
        return {
          bg: 'bg-[#fefce8] dark:bg-amber-950/30',
          text: 'text-[#eab308] dark:text-[#facc15]',
          border: 'border-amber-100 dark:border-amber-900/40',
        };
      case 'warning':
        return {
          bg: 'bg-[#fef2f2] dark:bg-rose-950/30',
          text: 'text-[#ef4444] dark:text-[#f87171]',
          border: 'border-rose-100 dark:border-rose-900/40',
        };
      default:
        return {
          bg: 'bg-[#faf5ff] dark:bg-purple-950/30',
          text: 'text-[#a855f7] dark:text-[#c084fc]',
          border: 'border-purple-100 dark:border-purple-900/40',
        };
    }
  };

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#151b26] p-5 shadow-sm transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">AI Insights</h3>
        <Link href="/ai-assistant" className="text-xs font-bold text-[#22c55e] dark:text-[#4ade80] hover:underline">
          View all
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
                'flex items-center gap-3 rounded-2xl p-3 border transition-all hover:scale-[1.01]',
                style.bg,
                style.border
              )}
            >
              <div
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white dark:bg-[#161b22] shadow-xs',
                  style.text
                )}
              >
                {getIcon(insight.type)}
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 leading-snug">{insight.text}</p>
                {insight.detail && (
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">{insight.detail}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
