'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '../../context/StoreContext';
import { formatCurrency } from '../../lib/utils';

export default function TopProductsList() {
  const { filteredProducts } = useStore();

  const topProducts = [...filteredProducts]
    .sort((a, b) => b.netProfit - a.netProfit)
    .slice(0, 5);

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#151b26] p-5 shadow-sm transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">Top Products by Profit</h3>
        <Link href="/products" className="text-xs font-bold text-[#22c55e] dark:text-[#4ade80] hover:underline">
          View all
        </Link>
      </div>

      {/* Table / List Header */}
      <div className="mt-3 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-2 text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
        <span>Product</span>
        <span>Net Profit</span>
      </div>

      {/* List */}
      <div className="space-y-3 pt-2">
        {topProducts.map((product) => (
          <div key={product.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={product.image}
                alt={product.title}
                className="h-10 w-10 rounded-xl object-cover border border-gray-100 dark:border-gray-800 shadow-xs"
              />
              <div>
                <p className="text-xs font-bold text-gray-900 dark:text-white leading-snug line-clamp-1">{product.title}</p>
                <p className="text-[11px] text-gray-400 dark:text-gray-500 font-mono">{product.sku}</p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold text-[#22c55e] dark:text-[#4ade80]">
                {formatCurrency(product.netProfit)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
