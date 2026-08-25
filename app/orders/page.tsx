'use client';

import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  Filter,
  ExternalLink,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  RotateCcw,
  Eye,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatCurrency, formatPercent, cn } from '../../lib/utils';
import { Order } from '../../types';

export default function OrdersPage() {
  const { filteredOrders, updateOrderStatus, selectedStore } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filtered = filteredOrders.filter((ord) => {
    const matchesSearch =
      ord.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ord.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
            TikTok Shop Orders & Fulfillment
          </h2>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Real-time order sync, tracking dispatch status, and true net margin per transaction.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="shadow-xs flex flex-col items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 dark:border-slate-800/80 dark:bg-[#121620] sm:flex-row">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search order #, customer name, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-xs font-medium text-slate-800 placeholder-slate-400 focus:border-lime-500 focus:outline-none dark:border-slate-800 dark:bg-[#0f1117] dark:text-slate-100 dark:placeholder-slate-600"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
        </div>

        {/* Status Filters */}
        <div className="flex w-full items-center gap-1.5 overflow-x-auto pb-1 sm:w-auto sm:pb-0">
          {['all', 'Completed', 'Processing', 'Canceled', 'Refunded'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={cn(
                'whitespace-nowrap rounded-xl px-3 py-1.5 text-xs font-semibold transition-colors',
                statusFilter === status
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-white/10',
              )}
            >
              {status === 'all' ? 'All Orders' : status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="shadow-xs overflow-hidden rounded-3xl border border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-[#121620]">
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:border-slate-800 dark:bg-white/5 dark:text-slate-500">
                <th className="px-4 py-3.5 font-semibold">Order #</th>
                <th className="px-3 py-3.5 font-semibold">Customer</th>
                <th className="px-3 py-3.5 font-semibold">Store</th>
                <th className="px-3 py-3.5 font-semibold">Date</th>
                <th className="px-3 py-3.5 font-semibold">Item & SKU</th>
                <th className="px-3 py-3.5 font-semibold">Amount</th>
                <th className="px-3 py-3.5 font-semibold">COGS</th>
                <th className="px-3 py-3.5 font-semibold">Fees</th>
                <th className="px-3 py-3.5 font-semibold">Shipping</th>
                <th className="px-3 py-3.5 font-semibold">Net Profit</th>
                <th className="px-3 py-3.5 font-semibold">Status</th>
                <th className="px-4 py-3.5 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700 dark:divide-slate-800/60 dark:text-slate-300">
              {filtered.map((ord) => {
                const isLoss = ord.netProfit < 0 || ord.status === 'Refunded';

                return (
                  <tr
                    key={ord.id}
                    className="transition-colors hover:bg-slate-50/80 dark:hover:bg-white/5"
                  >
                    <td className="px-4 py-3 font-mono font-bold text-slate-900 dark:text-white">
                      {ord.orderNumber}
                    </td>
                    <td className="px-3 py-3">
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">
                          {ord.customerName}
                        </p>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500">
                          {ord.customerEmail}
                        </p>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <span className="inline-flex items-center gap-1 font-semibold text-slate-800 dark:text-slate-200">
                        <span>{ord.storeFlag}</span>
                        <span>{ord.storeName}</span>
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-slate-500 dark:text-slate-400">
                      {ord.date}
                    </td>
                    <td className="px-3 py-3">
                      <span className="line-clamp-1 font-medium text-slate-800 dark:text-slate-200">
                        {ord.items[0]?.productTitle} (x{ord.items[0]?.quantity})
                      </span>
                    </td>
                    <td className="font-mono-numeric px-3 py-3 font-bold text-slate-900 dark:text-white">
                      {formatCurrency(ord.totalAmount, selectedStore?.currency)}
                    </td>
                    <td className="font-mono-numeric px-3 py-3 text-slate-600 dark:text-slate-400">
                      {formatCurrency(ord.cogs, selectedStore?.currency)}
                    </td>
                    <td className="font-mono-numeric px-3 py-3 text-slate-600 dark:text-slate-400">
                      {formatCurrency(ord.fees, selectedStore?.currency)}
                    </td>
                    <td className="font-mono-numeric px-3 py-3 text-slate-600 dark:text-slate-400">
                      {formatCurrency(ord.shipping, selectedStore?.currency)}
                    </td>
                    <td className="font-mono-numeric px-3 py-3 font-black">
                      <span
                        className={
                          isLoss
                            ? 'text-rose-600 dark:text-rose-400'
                            : 'text-emerald-600 dark:text-[#4ade80]'
                        }
                      >
                        {formatCurrency(ord.netProfit, selectedStore?.currency)}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={cn(
                          'rounded-full px-2.5 py-0.5 text-[11px] font-bold',
                          ord.status === 'Completed'
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-[#4ade80]'
                            : ord.status === 'Processing'
                              ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300'
                              : ord.status === 'Canceled'
                                ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300'
                                : 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300',
                        )}
                      >
                        {ord.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => setSelectedOrder(ord)}
                        className="rounded-lg border border-slate-200 p-1.5 text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-white/10"
                        title="View Details"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="backdrop-blur-xs animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-lg space-y-4 rounded-3xl border border-slate-200 bg-white p-6 text-slate-900 shadow-2xl dark:border-slate-800 dark:bg-[#151b26] dark:text-white">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Order {selectedOrder.orderNumber}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Placed on {selectedOrder.date}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-sm font-bold text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 rounded-2xl bg-slate-50 p-4 text-xs dark:bg-[#0f1117]">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Customer:</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {selectedOrder.customerName} ({selectedOrder.customerEmail})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">TikTok Shop Account:</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {selectedOrder.storeFlag} {selectedOrder.storeName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Carrier & Tracking:</span>
                <span className="font-mono font-bold text-blue-700 dark:text-blue-400">
                  {selectedOrder.carrier} - {selectedOrder.trackingNumber}
                </span>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3 dark:border-slate-800">
              <h4 className="mb-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                Order Unit Economics
              </h4>
              <div className="font-mono-numeric grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl border border-slate-100 p-2.5 dark:border-slate-800">
                  <p className="font-sans text-slate-400 dark:text-slate-500">Gross Sale:</p>
                  <p className="text-sm font-black text-slate-900 dark:text-white">
                    {formatCurrency(selectedOrder.totalAmount, selectedStore?.currency)}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-100 p-2.5 dark:border-slate-800">
                  <p className="font-sans text-slate-400 dark:text-slate-500">Net Profit:</p>
                  <p className="text-sm font-black text-emerald-600 dark:text-[#4ade80]">
                    {formatCurrency(selectedOrder.netProfit, selectedStore?.currency)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Update Status:
              </span>
              <div className="flex gap-1.5">
                {(['Completed', 'Processing', 'Refunded'] as Order['status'][]).map((st) => (
                  <button
                    key={st}
                    onClick={() => {
                      updateOrderStatus(selectedOrder.id, st);
                      setSelectedOrder({ ...selectedOrder, status: st });
                    }}
                    className={cn(
                      'rounded-xl px-2.5 py-1 text-xs font-bold transition-all',
                      selectedOrder.status === st
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                        : 'border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-white/5',
                    )}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
