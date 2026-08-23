'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '../../context/StoreContext';
import { formatCurrency } from '../../lib/utils';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function TopProductsList() {
  const { filteredProducts, selectedStore } = useStore();

  const topProducts = [...filteredProducts]
    .sort((a, b) => b.netProfit - a.netProfit)
    .slice(0, 5);

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#121620] p-5 shadow-xs transition-colors overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Top Products by Profit</h3>
        <Link href="/products" className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-[#4ade80] hover:underline">
          <span>View all</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {/* Table / List Header */}
      <div className="mt-3 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
        <span>Product</span>
        <span>Net Profit</span>
      </div>

      {/* List */}
      <div className="space-y-3 pt-2">
        {topProducts.map((product) => (
          <div key={product.id} className="group flex items-center justify-between rounded-xl p-1.5 transition-colors hover:bg-slate-50 dark:hover:bg-white/5">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={product.image}
                alt={product.title}
                className="h-10 w-10 rounded-xl object-cover border border-slate-200/80 dark:border-slate-800 shadow-2xs shrink-0"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-snug truncate">
                    {product.title}
                  </p>
                  {product.status === 'star' && (
                    <span className="rounded-md bg-amber-50 dark:bg-amber-950/60 px-1.5 py-0.2 text-[9px] font-bold text-amber-700 dark:text-amber-300 shrink-0">
                      ★ Star
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                  {product.sku} • {product.unitsSold} Sold
                </p>
              </div>
            </div>

            <div className="text-right shrink-0 ml-3">
              <span className="text-xs font-bold text-emerald-600 dark:text-[#4ade80] font-mono-numeric">
                {formatCurrency(product.netProfit, selectedStore?.currency)}
              </span>
              <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">
                {product.margin.toFixed(1)}% Margin
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
