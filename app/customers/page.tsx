'use client';

import React from 'react';
import {
  Users,
  DollarSign,
  Repeat,
  HeartHandshake,
  UserCheck,
  ShieldCheck,
  ArrowUpRight,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatCurrency, formatPercent, cn } from '../../lib/utils';

export default function CustomersPage() {
  const { customers, selectedStore } = useStore();

  const totalSpentAll = customers.reduce((acc, c) => acc + c.totalSpent, 0);
  const avgLtv = customers.length > 0 ? totalSpentAll / customers.length : 0;
  const avgCac =
    customers.length > 0 ? customers.reduce((acc, c) => acc + c.cac, 0) / customers.length : 0;
  const ltvCacRatio = avgCac > 0 ? (avgLtv / avgCac).toFixed(1) : '0';

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
            Customer Lifetime Value (LTV) Analytics
          </h2>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Track customer acquisition costs (CAC), repeat purchase rates, and cohort profitability.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="font-mono-numeric grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="shadow-xs rounded-2xl border border-slate-200/80 bg-white p-4 dark:border-slate-800/80 dark:bg-[#121620]">
          <p className="font-sans text-xs font-semibold text-slate-500 dark:text-slate-400">
            Average Customer LTV
          </p>
          <p className="mt-1 text-xl font-black text-slate-900 dark:text-slate-50">
            {formatCurrency(avgLtv, selectedStore?.currency)}
          </p>
          <p className="mt-0.5 text-xs font-bold text-emerald-600 dark:text-[#4ade80]">
            ↑ 14.2% vs prior period
          </p>
        </div>

        <div className="shadow-xs rounded-2xl border border-slate-200/80 bg-white p-4 dark:border-slate-800/80 dark:bg-[#121620]">
          <p className="font-sans text-xs font-semibold text-slate-500 dark:text-slate-400">
            Average Blended CAC
          </p>
          <p className="mt-1 text-xl font-black text-purple-600 dark:text-[#c084fc]">
            ${avgCac.toFixed(2)}
          </p>
          <p className="mt-0.5 font-sans text-xs text-slate-400 dark:text-slate-500">
            TikTok Ads Acquisition
          </p>
        </div>

        <div className="shadow-xs rounded-2xl border border-slate-200/80 bg-white p-4 dark:border-slate-800/80 dark:bg-[#121620]">
          <p className="font-sans text-xs font-semibold text-slate-500 dark:text-slate-400">
            LTV : CAC Ratio
          </p>
          <p className="mt-1 text-xl font-black text-emerald-600 dark:text-[#4ade80]">
            {ltvCacRatio}x
          </p>
          <p className="mt-0.5 font-sans text-xs font-bold text-emerald-600 dark:text-[#4ade80]">
            Target &gt; 3.0x (Healthy)
          </p>
        </div>

        <div className="shadow-xs rounded-2xl border border-slate-200/80 bg-white p-4 dark:border-slate-800/80 dark:bg-[#121620]">
          <p className="font-sans text-xs font-semibold text-slate-500 dark:text-slate-400">
            Repeat Purchase Rate
          </p>
          <p className="mt-1 text-xl font-black text-blue-600 dark:text-[#38bdf8]">28.4%</p>
          <p className="mt-0.5 font-sans text-xs text-slate-400 dark:text-slate-500">
            Multi-order buyers
          </p>
        </div>
      </div>

      {/* Customers Table */}
      <div className="shadow-xs overflow-hidden rounded-3xl border border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-[#121620]">
        <div className="flex items-center justify-between border-b border-slate-100 p-5 dark:border-slate-800">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50">
            Customer Value Directory
          </h3>
          <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
            {customers.length} Profiles Tracked
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:border-slate-800 dark:bg-white/5 dark:text-slate-500">
                <th className="px-4 py-3.5 font-semibold">Customer</th>
                <th className="px-3 py-3.5 font-semibold">Country</th>
                <th className="px-3 py-3.5 font-semibold">Total Orders</th>
                <th className="px-3 py-3.5 font-semibold">Total Spent</th>
                <th className="px-3 py-3.5 font-semibold">CAC</th>
                <th className="px-3 py-3.5 font-semibold">Net Profit Generated</th>
                <th className="px-3 py-3.5 font-semibold">Last Active</th>
                <th className="px-4 py-3.5 text-right font-semibold">Customer Tier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700 dark:divide-slate-800/60 dark:text-slate-300">
              {customers.map((cust) => (
                <tr
                  key={cust.id}
                  className="transition-colors hover:bg-slate-50/80 dark:hover:bg-white/5"
                >
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{cust.name}</p>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500">{cust.email}</p>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-slate-800 dark:text-slate-200">{cust.country}</td>
                  <td className="font-mono-numeric px-3 py-3 font-bold text-slate-900 dark:text-white">
                    {cust.totalOrders}
                  </td>
                  <td className="font-mono-numeric px-3 py-3 font-bold text-slate-900 dark:text-white">
                    {formatCurrency(cust.totalSpent, selectedStore?.currency)}
                  </td>
                  <td className="font-mono-numeric px-3 py-3 font-semibold text-purple-600 dark:text-[#c084fc]">
                    ${cust.cac.toFixed(2)}
                  </td>
                  <td className="font-mono-numeric px-3 py-3 font-black text-emerald-600 dark:text-[#4ade80]">
                    {formatCurrency(cust.netProfit, selectedStore?.currency)}
                  </td>
                  <td className="px-3 py-3 text-slate-500 dark:text-slate-400">
                    {cust.lastOrderDate}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className={cn(
                        'rounded-full px-2.5 py-0.5 text-[11px] font-bold',
                        cust.tier === 'VIP'
                          ? 'border border-amber-200 bg-amber-100 text-amber-900 dark:border-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                          : cust.tier === 'Loyal'
                            ? 'border border-emerald-200 bg-emerald-100 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-[#4ade80]'
                            : 'border border-blue-200 bg-blue-100 text-blue-900 dark:border-blue-800 dark:bg-blue-950/60 dark:text-blue-300',
                      )}
                    >
                      {cust.tier}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
