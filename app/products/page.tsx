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
  Trash2,
  Sparkles,
  Calculator,
  AlertTriangle,
  Flame,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  X,
  Check,
  Scale,
  DollarSign,
  Truck,
  Ship,
  Tag,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatCurrency, formatPercent, cn } from '../../lib/utils';
import { Product } from '../../types';

export default function ProductsPage() {
  const {
    filteredProducts,
    updateProduct,
    addProduct,
    deleteProduct,
    selectedStore,
    selectedStoreId,
  } = useStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New product form state
  const [newTitle, setNewTitle] = useState('');
  const [newSku, setNewSku] = useState('');
  const [newCategory, setNewCategory] = useState('Electronics');
  const [newPrice, setNewPrice] = useState<number>(34.99);
  const [newCogs, setNewCogs] = useState<number>(6.5);
  const [newShippingCost, setNewShippingCost] = useState<number>(3.8);
  const [newStock, setNewStock] = useState<number>(150);
  const [newUnitsSold, setNewUnitsSold] = useState<number>(120);
  const [newAdCost, setNewAdCost] = useState<number>(450);
  const [newImage, setNewImage] = useState(
    'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=150&auto=format&fit=crop&q=60',
  );

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filtered = filteredProducts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSku.trim()) return;

    const units = Math.max(1, newUnitsSold);
    const revenue = newPrice * units;
    const totalCogs = newCogs * units;
    const totalShipping = newShippingCost * units;
    const tiktokFees = revenue * 0.05 + units * (newPrice * 0.029 + 0.3);
    const affiliateCommission = revenue * 0.1;
    const totalCost = totalCogs + totalShipping + tiktokFees + affiliateCommission + newAdCost;
    const netProfit = revenue - totalCost;
    const margin = revenue > 0 ? (netProfit / revenue) * 100 : 0;

    let status: Product['status'] = 'profitable';
    if (netProfit < 0 || margin < 10) status = 'bleeding';
    else if (margin >= 45) status = 'star';
    else if (units > 200) status = 'scale';

    addProduct({
      storeId: selectedStoreId === 'all' ? 'store-1' : selectedStoreId,
      title: newTitle.trim(),
      sku: newSku.trim().toUpperCase(),
      category: newCategory,
      image: newImage || 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=150&auto=format&fit=crop&q=60',
      revenue,
      cogs: totalCogs,
      shippingCost: totalShipping,
      tiktokFees,
      affiliateCommission,
      adCost: newAdCost,
      totalCost,
      netProfit,
      margin,
      unitsSold: units,
      stock: newStock,
      status,
    });

    setIsAddModalOpen(false);
    // Reset form
    setNewTitle('');
    setNewSku('');
    setNewPrice(34.99);
    setNewCogs(6.5);
    setNewShippingCost(3.8);
    setNewStock(150);
    setNewUnitsSold(120);
    setNewAdCost(450);
    showToast(`Product "${newTitle}" created successfully.`);
  };

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
    showToast(`Product "${editingProduct.title}" updated.`);
  };

  const handleDelete = (id: string, title: string) => {
    deleteProduct(id);
    setDeletingProductId(null);
    if (editingProduct?.id === id) setEditingProduct(null);
    showToast(`Product "${title}" deleted.`);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 animate-in fade-in duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-slate-900 text-white dark:bg-slate-800 dark:text-slate-100 rounded-2xl shadow-xl text-xs font-semibold animate-in slide-in-from-bottom-3 duration-200 border border-slate-700">
          <Sparkles className="h-4 w-4 text-emerald-400 fill-current shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Actions */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              Product Catalog & Margin Analytics
            </h2>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
              {filteredProducts.length} SKUs
            </span>
          </div>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 font-normal">
            SKU breakdown with supplier COGS, 3PL courier delivery, platform take-rates, affiliate splits, and ad costs.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href="/calculator"
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-[#0f1420] dark:text-slate-200 dark:hover:bg-white/5"
          >
            <Calculator className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>Unit Calculator</span>
          </Link>

          <Link
            href="/compare"
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-[#0f1420] dark:text-slate-200 dark:hover:bg-white/5"
          >
            <Scale className="h-4 w-4 text-slate-400" />
            <span>Compare Matrix</span>
          </Link>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition-all hover:bg-emerald-500 cursor-pointer"
          >
            <Plus className="h-4 w-4 stroke-[2.5]" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-[#0f1420] sm:flex-row">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search SKU or product title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-xs font-medium text-slate-800 placeholder-slate-400 focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-[#090d16] dark:text-slate-100 dark:placeholder-slate-500"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
        </div>

        {/* Status Pills */}
        <div className="flex w-full items-center gap-1.5 overflow-x-auto pb-1 sm:w-auto sm:pb-0 dark-scrollbar">
          {[
            { label: 'All Products', value: 'all' },
            { label: '🌟 Star SKUs', value: 'star' },
            { label: '🚀 Scale Ready', value: 'scale' },
            { label: '✅ Profitable', value: 'profitable' },
            { label: '⚠️ Bleeding / Loss', value: 'bleeding' },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={cn(
                'whitespace-nowrap rounded-xl px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer',
                statusFilter === tab.value
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-white/10',
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#0f1420]">
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:border-slate-800 dark:bg-white/5 dark:text-slate-500">
                <th className="px-4 py-3.5 font-medium">Product / SKU</th>
                <th className="px-3 py-3.5 font-medium">Units Sold</th>
                <th className="px-3 py-3.5 font-medium">Revenue</th>
                <th className="px-3 py-3.5 font-medium">COGS</th>
                <th className="px-3 py-3.5 font-medium">Shipping</th>
                <th className="px-3 py-3.5 font-medium">TikTok Fees</th>
                <th className="px-3 py-3.5 font-medium">Affiliate</th>
                <th className="px-3 py-3.5 font-medium">Ad Spend</th>
                <th className="px-3 py-3.5 font-medium">Total Cost</th>
                <th className="px-3 py-3.5 font-medium">Net Profit</th>
                <th className="px-3 py-3.5 font-medium">Margin</th>
                <th className="px-4 py-3.5 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700 dark:divide-slate-800/60 dark:text-slate-300">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={12} className="px-4 py-12 text-center text-slate-400">
                    <Package className="h-8 w-8 mx-auto mb-2 opacity-40" />
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No products found</p>
                    <p className="text-xs text-slate-400 mt-0.5">Try searching another SKU or click "Add Product".</p>
                  </td>
                </tr>
              ) : (
                filtered.map((prod) => {
                  const isLoss = prod.netProfit < 0 || prod.status === 'bleeding';

                  return (
                    <tr
                      key={prod.id}
                      className="transition-colors hover:bg-slate-50/80 dark:hover:bg-white/[0.02]"
                    >
                      {/* Product */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Image
                            src={prod.image}
                            alt={prod.title}
                            width={40}
                            height={40}
                            className="shrink-0 rounded-xl border border-slate-100 object-cover dark:border-slate-800"
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="line-clamp-1 font-bold text-slate-900 dark:text-slate-100 max-w-[180px] truncate" title={prod.title}>
                                {prod.title}
                              </span>
                              {prod.status === 'star' && (
                                <span className="rounded-md bg-amber-50 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">
                                  🌟 Star
                                </span>
                              )}
                              {prod.status === 'bleeding' && (
                                <span className="rounded-md bg-rose-50 px-1.5 py-0.5 text-[10px] font-semibold text-rose-700 dark:bg-rose-950/50 dark:text-rose-300">
                                  ⚠️ Low Margin
                                </span>
                              )}
                            </div>
                            <p className="font-mono text-[11px] text-slate-400 dark:text-slate-500">
                              {prod.sku} • Stock: {prod.stock}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="font-mono-numeric px-3 py-3 font-bold text-slate-900 dark:text-slate-100">
                        {prod.unitsSold}
                      </td>
                      <td className="font-mono-numeric px-3 py-3 font-bold text-slate-900 dark:text-slate-100">
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
                            'font-mono-numeric text-sm font-bold',
                            isLoss
                              ? 'text-rose-600 dark:text-rose-400'
                              : 'text-emerald-600 dark:text-emerald-400',
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
                              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400'
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
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setEditingProduct(prod)}
                            className="rounded-lg border border-slate-200 p-1.5 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white cursor-pointer"
                            title="Edit Costs & COGS"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>

                          <button
                            onClick={() => setDeletingProductId(prod.id)}
                            className="rounded-lg border border-slate-200 p-1.5 text-slate-400 transition-colors hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 dark:border-slate-800 dark:hover:border-rose-900/60 dark:hover:bg-rose-950/40 dark:hover:text-rose-400 cursor-pointer"
                            title="Delete Product"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deletingProductId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#0f1420] shadow-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 flex items-center justify-center shrink-0">
                <Trash2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  Delete Product SKU?
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  This action will remove the product and its historical analytics.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setDeletingProductId(null)}
                className="px-3.5 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  const target = filteredProducts.find((p) => p.id === deletingProductId);
                  if (target) handleDelete(target.id, target.title);
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-xs cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#0f1420] shadow-2xl overflow-y-auto max-h-[90vh] dark-scrollbar">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 flex items-center justify-center">
                  <Package className="h-4 w-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Add New Product SKU
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="mt-4 space-y-3.5">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Product Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ultrasonic Clean Pro Brush"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-medium text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-[#090d16] dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    SKU Identifier
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SKU-8840"
                    value={newSku}
                    onChange={(e) => setNewSku(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-mono font-medium text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-[#090d16] dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-medium text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-[#090d16] dark:text-slate-100"
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Beauty & Personal Care">Beauty & Personal Care</option>
                    <option value="Home & Kitchen">Home & Kitchen</option>
                    <option value="Fitness & Health">Fitness & Health</option>
                    <option value="Fashion & Accessories">Fashion & Accessories</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Selling Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(parseFloat(e.target.value) || 0)}
                    className="font-mono-numeric w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-bold text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-[#090d16] dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Unit COGS ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newCogs}
                    onChange={(e) => setNewCogs(parseFloat(e.target.value) || 0)}
                    className="font-mono-numeric w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-bold text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-[#090d16] dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Shipping & Prep ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newShippingCost}
                    onChange={(e) => setNewShippingCost(parseFloat(e.target.value) || 0)}
                    className="font-mono-numeric w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-bold text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-[#090d16] dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Units Sold
                  </label>
                  <input
                    type="number"
                    required
                    value={newUnitsSold}
                    onChange={(e) => setNewUnitsSold(parseInt(e.target.value) || 0)}
                    className="font-mono-numeric w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-bold text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-[#090d16] dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Stock Level
                  </label>
                  <input
                    type="number"
                    required
                    value={newStock}
                    onChange={(e) => setNewStock(parseInt(e.target.value) || 0)}
                    className="font-mono-numeric w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-bold text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-[#090d16] dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Ad Spend ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={newAdCost}
                    onChange={(e) => setNewAdCost(parseFloat(e.target.value) || 0)}
                    className="font-mono-numeric w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-bold text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-[#090d16] dark:text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Image URL
                </label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-[#090d16] dark:text-slate-100"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-white/5 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-emerald-500 cursor-pointer shadow-xs"
                >
                  Create Product SKU
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#0f1420] shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Edit SKU: {editingProduct.title}
              </h3>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="mt-4 space-y-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Product Title
                </label>
                <input
                  type="text"
                  value={editingProduct.title}
                  onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-medium text-slate-900 dark:border-slate-700 dark:bg-[#090d16] dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Product Cost (COGS Total)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingProduct.cogs}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, cogs: parseFloat(e.target.value) || 0 })
                    }
                    className="font-mono-numeric w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-bold dark:border-slate-700 dark:bg-[#090d16] dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Shipping & Prep Total
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
                    className="font-mono-numeric w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-bold dark:border-slate-700 dark:bg-[#090d16] dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">
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
                    className="font-mono-numeric w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-bold dark:border-slate-700 dark:bg-[#090d16] dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Stock Level
                  </label>
                  <input
                    type="number"
                    value={editingProduct.stock}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        stock: parseInt(e.target.value) || 0,
                      })
                    }
                    className="font-mono-numeric w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-bold dark:border-slate-700 dark:bg-[#090d16] dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => handleDelete(editingProduct.id, editingProduct.title)}
                  className="flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400 cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Delete SKU</span>
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-white/5 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-500 cursor-pointer shadow-xs"
                  >
                    Save & Recalculate
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
