'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '../../context/StoreContext';
import { formatCurrency } from '../../lib/utils';
import { ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function TopProductsList() {
  const { filteredProducts, selectedStore } = useStore();

  const topProducts = [...filteredProducts].sort((a, b) => b.netProfit - a.netProfit).slice(0, 5);

  return (
    <div className="shadow-xs flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 transition-colors dark:border-slate-800/80 dark:bg-[#121620]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
          Top Products by Profit
        </h3>
        <Link
          href="/products"
          className="flex items-center gap-1 text-xs font-bold text-emerald-600 hover:underline dark:text-[#4ade80]"
        >
          <span>View all</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {/* Table / List Header */}
      <div className="mt-3 flex items-center justify-between border-b border-slate-100 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:border-slate-800 dark:text-slate-500">
        <span>Product</span>
        <span>Net Profit</span>
      </div>

      {/* List */}
      <div className="space-y-2 pt-2">
        {topProducts.map((product, idx) => (
          <div
            key={product.id}
            className="group flex items-center justify-between rounded-xl p-2 transition-all duration-200 hover:bg-slate-50 hover:shadow-2xs dark:hover:bg-white/5"
          >
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-slate-100 text-[10px] font-black text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                #{idx + 1}
              </span>
              <Image
                src={product.image}
                alt={product.title}
                width={36}
                height={36}
                className="shrink-0 rounded-lg border border-slate-200/80 object-cover shadow-2xs dark:border-slate-800"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="truncate text-xs font-bold leading-snug text-slate-900 dark:text-slate-100">
                    {product.title}
                  </p>
                  {product.status === 'star' && (
                    <span className="shrink-0 rounded-md bg-amber-50 px-1.5 py-0.5 text-[9px] font-bold text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
                      ★ Star
                    </span>
                  )}
                </div>
                <p className="font-mono text-[10px] text-slate-400 dark:text-slate-500">
                  {product.sku} • {product.unitsSold} units
                </p>
              </div>
            </div>

            <div className="ml-3 shrink-0 text-right">
              <span className="font-mono-numeric text-xs font-bold text-emerald-600 dark:text-[#4ade80]">
                {formatCurrency(product.netProfit, selectedStore?.currency)}
              </span>
              <div className="flex items-center justify-end gap-1.5">
                <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">
                  {product.margin.toFixed(1)}%
                </span>
                <div className="h-1.5 w-10 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    className="h-full rounded-full bg-emerald-500"
                    style={{ width: `${Math.min(100, Math.max(10, product.margin * 1.8))}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
