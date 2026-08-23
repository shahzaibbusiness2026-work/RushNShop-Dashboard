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
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">TikTok Shop Orders & Fulfillment</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time order sync, tracking dispatch status, and true net margin per transaction.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#121620] p-4 shadow-xs">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search order #, customer name, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1117] pl-9 pr-4 py-2 text-xs font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:border-lime-500 focus:outline-none"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['all', 'Completed', 'Processing', 'Canceled', 'Refunded'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={cn(
                'whitespace-nowrap rounded-xl px-3 py-1.5 text-xs font-semibold transition-colors',
                statusFilter === status
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10'
              )}
            >
              {status === 'all' ? 'All Orders' : status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-hidden rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#121620] shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-white/5 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                <th className="py-3.5 px-4 font-semibold">Order #</th>
                <th className="py-3.5 px-3 font-semibold">Customer</th>
                <th className="py-3.5 px-3 font-semibold">Store</th>
                <th className="py-3.5 px-3 font-semibold">Date</th>
                <th className="py-3.5 px-3 font-semibold">Item & SKU</th>
                <th className="py-3.5 px-3 font-semibold">Amount</th>
                <th className="py-3.5 px-3 font-semibold">COGS</th>
                <th className="py-3.5 px-3 font-semibold">Fees</th>
                <th className="py-3.5 px-3 font-semibold">Shipping</th>
                <th className="py-3.5 px-3 font-semibold">Net Profit</th>
                <th className="py-3.5 px-3 font-semibold">Status</th>
                <th className="py-3.5 px-4 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium text-slate-700 dark:text-slate-300">
              {filtered.map((ord) => {
                const isLoss = ord.netProfit < 0 || ord.status === 'Refunded';

                return (
                  <tr key={ord.id} className="hover:bg-slate-50/80 dark:hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">{ord.orderNumber}</td>
                    <td className="py-3 px-3">
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{ord.customerName}</p>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500">{ord.customerEmail}</p>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1 font-semibold text-slate-800 dark:text-slate-200">
                        <span>{ord.storeFlag}</span>
                        <span>{ord.storeName}</span>
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-500 dark:text-slate-400 whitespace-nowrap">{ord.date}</td>
                    <td className="py-3 px-3">
                      <span className="font-medium text-slate-800 dark:text-slate-200 line-clamp-1">
                        {ord.items[0]?.productTitle} (x{ord.items[0]?.quantity})
                      </span>
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-900 dark:text-white font-mono-numeric">{formatCurrency(ord.totalAmount, selectedStore?.currency)}</td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-400 font-mono-numeric">{formatCurrency(ord.cogs, selectedStore?.currency)}</td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-400 font-mono-numeric">{formatCurrency(ord.fees, selectedStore?.currency)}</td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-400 font-mono-numeric">{formatCurrency(ord.shipping, selectedStore?.currency)}</td>
                    <td className="py-3 px-3 font-black font-mono-numeric">
                      <span className={isLoss ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-[#4ade80]'}>
                        {formatCurrency(ord.netProfit, selectedStore?.currency)}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={cn(
                          'rounded-full px-2.5 py-0.5 text-[11px] font-bold',
                          ord.status === 'Completed'
                            ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-[#4ade80]'
                            : ord.status === 'Processing'
                            ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300'
                            : ord.status === 'Canceled'
                            ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300'
                            : 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300'
                        )}
                      >
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedOrder(ord)}
                        className="rounded-lg border border-slate-200 dark:border-slate-800 p-1.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-[#151b26] border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4 text-slate-900 dark:text-white">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Order {selectedOrder.orderNumber}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Placed on {selectedOrder.date}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="rounded-2xl bg-slate-50 dark:bg-[#0f1117] p-4 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Customer:</span>
                <span className="font-bold text-slate-900 dark:text-white">{selectedOrder.customerName} ({selectedOrder.customerEmail})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">TikTok Shop Account:</span>
                <span className="font-bold text-slate-900 dark:text-white">{selectedOrder.storeFlag} {selectedOrder.storeName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Carrier & Tracking:</span>
                <span className="font-mono font-bold text-blue-700 dark:text-blue-400">{selectedOrder.carrier} - {selectedOrder.trackingNumber}</span>
              </div>
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800 pt-3">
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Order Unit Economics</h4>
              <div className="grid grid-cols-2 gap-3 text-xs font-mono-numeric">
                <div className="rounded-xl border border-slate-100 dark:border-slate-800 p-2.5">
                  <p className="text-slate-400 dark:text-slate-500 font-sans">Gross Sale:</p>
                  <p className="text-sm font-black text-slate-900 dark:text-white">{formatCurrency(selectedOrder.totalAmount, selectedStore?.currency)}</p>
                </div>
                <div className="rounded-xl border border-slate-100 dark:border-slate-800 p-2.5">
                  <p className="text-slate-400 dark:text-slate-500 font-sans">Net Profit:</p>
                  <p className="text-sm font-black text-emerald-600 dark:text-[#4ade80]">{formatCurrency(selectedOrder.netProfit, selectedStore?.currency)}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Update Status:</span>
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
                      selectedOrder.status === st ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' : 'border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
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
