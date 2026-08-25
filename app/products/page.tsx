'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Package,
  Search,
  Filter,
  Plus,
  Edit2,
  Sparkles,
  Calculator,
  AlertTriangle,
  Flame,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatCurrency, formatPercent, cn } from '../../lib/utils';
import { Product } from '../../types';

export default function ProductsPage() {
  const { filteredProducts, updateProduct, selectedStore } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const filtered = filteredProducts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    // Recalculate totals
    const totalCost =
      editingProduct.cogs +
      editingProduct.shippingCost +
      editingProduct.tiktokFees +
      editingProduct.affiliateCommission +
      editingProduct.adCost;
    const netProfit = editingProduct.revenue - totalCost;
    const margin = editingProduct.revenue > 0 ? (netProfit / editingProduct.revenue) * 100 : 0;

    updateProduct({
      ...editingProduct,
      totalCost,
      netProfit,
      margin,
    });
    setEditingProduct(null);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
            Product Level Profit Analytics
          </h2>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            TrueProfit SKU breakdown with COGS, TikTok platform fees, affiliate payouts, and
            advertising costs.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/calculator"
            className="shadow-2xs flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-[#161b26] dark:text-slate-200 dark:hover:bg-white/10"
          >
            <Calculator className="h-4 w-4 text-emerald-600 dark:text-[#4ade80]" />
            <span>Margin Calculator</span>
          </Link>
          <Link
            href="/ai-assistant"
            className="shadow-xs flex items-center gap-1.5 rounded-xl bg-[#84cc16] px-4 py-2 text-xs font-bold text-black transition-all hover:scale-[1.02] hover:bg-[#72b012]"
          >
            <Sparkles className="h-4 w-4" />
            <span>AI Recommendations</span>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="shadow-xs flex flex-col items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 dark:border-slate-800/80 dark:bg-[#121620] sm:flex-row">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search SKU or product title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-xs font-medium text-slate-800 placeholder-slate-400 focus:border-lime-500 focus:outline-none dark:border-slate-800 dark:bg-[#0f1117] dark:text-slate-100 dark:placeholder-slate-600"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
        </div>

        {/* Status Pills */}
        <div className="flex w-full items-center gap-1.5 overflow-x-auto pb-1 sm:w-auto sm:pb-0">
          {[
            { label: 'All Products', value: 'all' },
            { label: '🌟 Star Products', value: 'star' },
            { label: '🚀 Scale Ready', value: 'scale' },
            { label: '✅ Profitable', value: 'profitable' },
            { label: '⚠️ Bleeding / Loss', value: 'bleeding' },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={cn(
                'whitespace-nowrap rounded-xl px-3 py-1.5 text-xs font-semibold transition-colors',
                statusFilter === tab.value
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-white/10',
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="shadow-xs overflow-hidden rounded-3xl border border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-[#121620]">
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:border-slate-800 dark:bg-white/5 dark:text-slate-500">
                <th className="px-4 py-3.5 font-semibold">Product / SKU</th>
                <th className="px-3 py-3.5 font-semibold">Units Sold</th>
                <th className="px-3 py-3.5 font-semibold">Revenue</th>
                <th className="px-3 py-3.5 font-semibold">COGS</th>
                <th className="px-3 py-3.5 font-semibold">Shipping</th>
                <th className="px-3 py-3.5 font-semibold">TikTok Fees</th>
                <th className="px-3 py-3.5 font-semibold">Affiliate</th>
                <th className="px-3 py-3.5 font-semibold">Ad Spend</th>
                <th className="px-3 py-3.5 font-semibold">Total Cost</th>
                <th className="px-3 py-3.5 font-semibold">Net Profit</th>
                <th className="px-3 py-3.5 font-semibold">Margin</th>
                <th className="px-4 py-3.5 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700 dark:divide-slate-800/60 dark:text-slate-300">
              {filtered.map((prod) => {
                const isLoss = prod.netProfit < 0 || prod.status === 'bleeding';

                return (
                  <tr
                    key={prod.id}
                    className="transition-colors hover:bg-slate-50/80 dark:hover:bg-white/5"
                  >
                    {/* Product */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Image
                          src={prod.image}
                          alt={prod.title}
                          width={40}
                          height={40}
                          className="shadow-2xs shrink-0 rounded-xl border border-slate-100 object-cover dark:border-slate-800"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="line-clamp-1 font-bold text-slate-900 dark:text-white">
                              {prod.title}
                            </span>
                            {prod.status === 'star' && (
                              <span className="rounded-md bg-amber-50 px-1.5 py-0.5 text-[10px] font-bold text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">
                                🌟 Star
                              </span>
                            )}
                            {prod.status === 'bleeding' && (
                              <span className="rounded-md bg-rose-50 px-1.5 py-0.5 text-[10px] font-bold text-rose-700 dark:bg-rose-950/50 dark:text-rose-300">
                                ⚠️ High CPA
                              </span>
                            )}
                          </div>
                          <p className="font-mono text-[11px] text-slate-400 dark:text-slate-500">
                            {prod.sku} • Stock: {prod.stock}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="font-mono-numeric px-3 py-3 font-bold text-slate-900 dark:text-white">
                      {prod.unitsSold}
                    </td>
                    <td className="font-mono-numeric px-3 py-3 font-bold text-slate-900 dark:text-white">
                      {formatCurrency(prod.revenue, selectedStore?.currency)}
                    </td>
                    <td className="font-mono-numeric px-3 py-3 text-slate-600 dark:text-slate-400">
                      {formatCurrency(prod.cogs, selectedStore?.currency)}
                    </td>
                    <td className="font-mono-numeric px-3 py-3 text-slate-600 dark:text-slate-400">
                      {formatCurrency(prod.shippingCost, selectedStore?.currency)}
                    </td>
                    <td className="font-mono-numeric px-3 py-3 text-slate-600 dark:text-slate-400">
                      {formatCurrency(prod.tiktokFees, selectedStore?.currency)}
                    </td>
                    <td className="font-mono-numeric px-3 py-3 text-slate-600 dark:text-slate-400">
                      {formatCurrency(prod.affiliateCommission, selectedStore?.currency)}
                    </td>
                    <td className="font-mono-numeric px-3 py-3 text-slate-600 dark:text-slate-400">
                      {formatCurrency(prod.adCost, selectedStore?.currency)}
                    </td>
                    <td className="font-mono-numeric px-3 py-3 font-bold text-slate-800 dark:text-slate-200">
                      {formatCurrency(prod.totalCost, selectedStore?.currency)}
                    </td>

                    {/* Net Profit */}
                    <td className="px-3 py-3">
                      <span
                        className={cn(
                          'font-mono-numeric text-sm font-black',
                          isLoss
                            ? 'text-rose-600 dark:text-rose-400'
                            : 'text-emerald-600 dark:text-[#4ade80]',
                        )}
                      >
                        {formatCurrency(prod.netProfit, selectedStore?.currency)}
                      </span>
                    </td>

                    {/* Margin */}
                    <td className="px-3 py-3">
                      <span
                        className={cn(
                          'font-mono-numeric rounded-full px-2 py-0.5 text-[11px] font-bold',
                          prod.margin >= 40
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-[#4ade80]'
                            : prod.margin >= 25
                              ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300'
                              : 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300',
                        )}
                      >
                        {formatPercent(prod.margin)}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => setEditingProduct(prod)}
                        className="rounded-lg border border-slate-200 p-1.5 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
                        title="Edit Costs & COGS"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="backdrop-blur-xs animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 text-slate-900 shadow-2xl dark:border-slate-800 dark:bg-[#151b26] dark:text-white">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Edit Product Costs: {editingProduct.title}
            </h3>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Update COGS, shipping, and ad allocations
            </p>

            <form onSubmit={handleSaveEdit} className="mt-4 space-y-3">
              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Product Cost (COGS Total)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={editingProduct.cogs}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, cogs: parseFloat(e.target.value) || 0 })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-sm font-semibold dark:border-slate-800 dark:bg-[#0f1117] dark:text-white"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Shipping & Packaging Total
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={editingProduct.shippingCost}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      shippingCost: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-sm font-semibold dark:border-slate-800 dark:bg-[#0f1117] dark:text-white"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300">
                  TikTok Ads Spend Allocated
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={editingProduct.adCost}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      adCost: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-sm font-semibold dark:border-slate-800 dark:bg-[#0f1117] dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#84cc16] px-4 py-2 text-xs font-bold text-black transition-colors hover:bg-[#72b012]"
                >
                  Save & Recalculate Profit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
