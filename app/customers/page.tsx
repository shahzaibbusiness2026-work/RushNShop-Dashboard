'use client';

import React from 'react';
import { Users, DollarSign, Repeat, HeartHandshake, UserCheck, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatCurrency, formatPercent, cn } from '../../lib/utils';

export default function CustomersPage() {
  const { customers, selectedStore } = useStore();

  const totalSpentAll = customers.reduce((acc, c) => acc + c.totalSpent, 0);
  const avgLtv = customers.length > 0 ? totalSpentAll / customers.length : 0;
  const avgCac = customers.length > 0 ? customers.reduce((acc, c) => acc + c.cac, 0) / customers.length : 0;
  const ltvCacRatio = avgCac > 0 ? (avgLtv / avgCac).toFixed(1) : '0';

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">Customer Lifetime Value (LTV) Analytics</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Track customer acquisition costs (CAC), repeat purchase rates, and cohort profitability.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 font-mono-numeric">
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#121620] p-4 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 font-sans">Average Customer LTV</p>
          <p className="text-xl font-black text-slate-900 dark:text-slate-50 mt-1">{formatCurrency(avgLtv, selectedStore?.currency)}</p>
          <p className="text-xs text-emerald-600 dark:text-[#4ade80] font-bold mt-0.5">↑ 14.2% vs prior period</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#121620] p-4 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 font-sans">Average Blended CAC</p>
          <p className="text-xl font-black text-purple-600 dark:text-[#c084fc] mt-1">${avgCac.toFixed(2)}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 font-sans">TikTok Ads Acquisition</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#121620] p-4 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 font-sans">LTV : CAC Ratio</p>
          <p className="text-xl font-black text-emerald-600 dark:text-[#4ade80] mt-1">{ltvCacRatio}x</p>
          <p className="text-xs text-emerald-600 dark:text-[#4ade80] font-bold mt-0.5 font-sans">Target &gt; 3.0x (Healthy)</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#121620] p-4 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 font-sans">Repeat Purchase Rate</p>
          <p className="text-xl font-black text-blue-600 dark:text-[#38bdf8] mt-1">28.4%</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 font-sans">Multi-order buyers</p>
        </div>
      </div>

      {/* Customers Table */}
      <div className="overflow-hidden rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#121620] shadow-xs">
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 dark:text-slate-50 text-sm">Customer Value Directory</h3>
          <span className="text-xs font-medium text-slate-400 dark:text-slate-500">{customers.length} Profiles Tracked</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-white/5 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                <th className="py-3.5 px-4 font-semibold">Customer</th>
                <th className="py-3.5 px-3 font-semibold">Country</th>
                <th className="py-3.5 px-3 font-semibold">Total Orders</th>
                <th className="py-3.5 px-3 font-semibold">Total Spent</th>
                <th className="py-3.5 px-3 font-semibold">CAC</th>
                <th className="py-3.5 px-3 font-semibold">Net Profit Generated</th>
                <th className="py-3.5 px-3 font-semibold">Last Active</th>
                <th className="py-3.5 px-4 text-right font-semibold">Customer Tier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium text-slate-700 dark:text-slate-300">
              {customers.map((cust) => (
                <tr key={cust.id} className="hover:bg-slate-50/80 dark:hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{cust.name}</p>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500">{cust.email}</p>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-slate-800 dark:text-slate-200">{cust.country}</td>
                  <td className="py-3 px-3 font-bold text-slate-900 dark:text-white font-mono-numeric">{cust.totalOrders}</td>
                  <td className="py-3 px-3 font-bold text-slate-900 dark:text-white font-mono-numeric">{formatCurrency(cust.totalSpent, selectedStore?.currency)}</td>
                  <td className="py-3 px-3 text-purple-600 dark:text-[#c084fc] font-semibold font-mono-numeric">${cust.cac.toFixed(2)}</td>
                  <td className="py-3 px-3 font-black text-emerald-600 dark:text-[#4ade80] font-mono-numeric">{formatCurrency(cust.netProfit, selectedStore?.currency)}</td>
                  <td className="py-3 px-3 text-slate-500 dark:text-slate-400">{cust.lastOrderDate}</td>
                  <td className="py-3 px-4 text-right">
                    <span
                      className={cn(
                        'rounded-full px-2.5 py-0.5 text-[11px] font-bold',
                        cust.tier === 'VIP'
                          ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                          : cust.tier === 'Loyal'
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-[#4ade80] border border-emerald-200 dark:border-emerald-800'
                          : 'bg-blue-100 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
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
