'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '../../context/StoreContext';
import { formatCurrency, cn } from '../../lib/utils';
import { ArrowRight } from 'lucide-react';

export default function RecentOrdersTable() {
  const { filteredOrders, selectedStore } = useStore();

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
        return 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div className="shadow-xs flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 transition-colors dark:border-slate-800/80 dark:bg-[#121620]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Recent Orders</h3>
        <Link
          href="/orders"
          className="flex items-center gap-1 text-xs font-bold text-emerald-600 hover:underline dark:text-[#4ade80]"
        >
          <span>View all</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {/* Table */}
      <div className="mt-3 overflow-x-auto">
        <table className="w-full whitespace-nowrap text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:border-slate-800 dark:text-slate-500">
              <th className="pb-2.5 font-semibold">Order</th>
              <th className="pb-2.5 font-semibold">Customer</th>
              <th className="pb-2.5 font-semibold">Store</th>
              <th className="pb-2.5 font-semibold">Amount</th>
              <th className="pb-2.5 text-right font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/70 font-medium text-slate-700 dark:divide-slate-800/60 dark:text-slate-300">
            {recentOrders.map((ord) => {
              const initials = ord.customerName
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)
                .toUpperCase();

              return (
                <tr
                  key={ord.id}
                  className="transition-colors hover:bg-slate-50/80 dark:hover:bg-white/5"
                >
                  <td className="py-2.5 font-mono text-[11px] font-bold text-slate-900 dark:text-slate-100">
                    {ord.orderNumber}
                  </td>
                  <td className="py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        {initials}
                      </div>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {ord.customerName}
                      </span>
                    </div>
                  </td>
                  <td className="py-2.5 text-slate-600 dark:text-slate-400">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100/80 px-2 py-0.5 text-[11px] font-medium dark:bg-slate-800/80">
                      <span>{ord.storeFlag}</span>
                      <span>{ord.storeName}</span>
                    </span>
                  </td>
                  <td className="font-mono-numeric py-2.5 font-bold text-slate-900 dark:text-slate-100">
                    {formatCurrency(ord.totalAmount, selectedStore?.currency)}
                  </td>
                  <td className="py-2.5 text-right">
                    <span
                      className={cn(
                        'inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold',
                        getStatusBadge(ord.status),
                      )}
                    >
                      {ord.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
