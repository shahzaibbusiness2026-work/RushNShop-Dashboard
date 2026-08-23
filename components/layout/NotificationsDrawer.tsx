'use client';

import React from 'react';
import { X, Bell, TrendingUp, AlertTriangle, Sparkles, CheckCheck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { cn } from '../../lib/utils';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationsDrawer({ isOpen, onClose }: NotificationsDrawerProps) {
  const { insights, dismissInsight } = useStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative h-full w-full max-w-md bg-white dark:bg-[#151b26] border-l border-gray-100 dark:border-gray-800 p-6 shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300 text-gray-900 dark:text-white">
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-lime-100 dark:bg-lime-950/50 text-lime-800 dark:text-[#4ade80]">
              <Bell className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">Notifications & AI Alerts</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{insights.length} active updates</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 space-y-3">
          {insights.map((insight) => {
            const isWin = insight.type === 'win';
            const isWarning = insight.type === 'warning';
            const isScale = insight.type === 'scale';

            return (
              <div
                key={insight.id}
                className={cn(
                  'relative rounded-2xl p-4 border transition-all',
                  isWin
                    ? 'border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/20'
                    : isWarning
                    ? 'border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20'
                    : isScale
                    ? 'border-purple-200 dark:border-purple-900/50 bg-purple-50/50 dark:bg-purple-950/20'
                    : 'border-blue-200 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/20'
                )}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg',
                      isWin
                        ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-[#4ade80]'
                        : isWarning
                        ? 'bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-[#facc15]'
                        : isScale
                        ? 'bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-[#c084fc]'
                        : 'bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-[#38bdf8]'
                    )}
                  >
                    {isWin ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : isWarning ? (
                      <AlertTriangle className="h-4 w-4" />
                    ) : (
                      <Sparkles className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-900 dark:text-white">{insight.badge}</span>
                      <button
                        onClick={() => dismissInsight(insight.id)}
                        className="text-[11px] text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        Dismiss
                      </button>
                    </div>
                    <p className="mt-1 text-xs font-semibold text-gray-800 dark:text-gray-200">{insight.text}</p>
                    {insight.detail && <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">{insight.detail}</p>}
                  </div>
                </div>
              </div>
            );
          })}

          {/* System sync status */}
          <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#0f1117] p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
              <CheckCheck className="h-4 w-4 text-emerald-600 dark:text-[#4ade80]" />
              <span>TikTok Shop Webhook Stream: Active</span>
            </div>
            <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
              Receiving live order events, inventory deductions, and ad attribution from 4 connected shops.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
