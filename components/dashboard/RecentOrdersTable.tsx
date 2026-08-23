'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '../../context/StoreContext';
import { formatCurrency, cn } from '../../lib/utils';

export default function RecentOrdersTable() {
  const { filteredOrders } = useStore();

  const recentOrders = filteredOrders.slice(0, 5);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-[#4ade80] border border-emerald-200/60 dark:border-emerald-800/60';
      case 'Processing':
        return 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60';
      case 'Canceled':
        return 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-800/60';
      case 'Refunded':
        return 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/60';
      default:
        return 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700';
    }
  };

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#151b26] p-5 shadow-sm transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">Recent Orders</h3>
        <Link href="/orders" className="text-xs font-bold text-[#22c55e] dark:text-[#4ade80] hover:underline">
          View all
        </Link>
      </div>

      {/* Table */}
      <div className="mt-3 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-800 text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              <th className="pb-2.5 font-semibold">Order ID</th>
              <th className="pb-2.5 font-semibold">Customer</th>
              <th className="pb-2.5 font-semibold">Store</th>
              <th className="pb-2.5 font-semibold">Amount</th>
              <th className="pb-2.5 text-right font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800/60 font-medium text-gray-700 dark:text-gray-300">
            {recentOrders.map((ord) => (
              <tr key={ord.id} className="hover:bg-gray-50/60 dark:hover:bg-white/5 transition-colors">
                <td className="py-2.5 font-mono text-[11px] font-bold text-gray-900 dark:text-white">{ord.orderNumber}</td>
                <td className="py-2.5 font-semibold text-gray-800 dark:text-gray-200">{ord.customerName}</td>
                <td className="py-2.5 text-gray-600 dark:text-gray-400">
                  <span className="inline-flex items-center gap-1.5">
                    <span>{ord.storeFlag}</span>
                    <span>{ord.storeName}</span>
                  </span>
                </td>
                <td className="py-2.5 font-bold text-gray-900 dark:text-white">{formatCurrency(ord.totalAmount)}</td>
                <td className="py-2.5 text-right">
                  <span
                    className={cn(
                      'inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold',
                      getStatusBadge(ord.status)
                    )}
                  >
                    {ord.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
