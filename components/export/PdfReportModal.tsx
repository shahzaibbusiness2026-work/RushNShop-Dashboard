'use client';

import React from 'react';
import {
  X,
  Printer,
  Download,
  FileSpreadsheet,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatCurrency, formatPercent } from '../../lib/utils';
import { exportToGoogleSheetsCSV, copyForGoogleSheets } from '../../lib/exportUtils';

interface PdfReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PdfReportModal({ isOpen, onClose }: PdfReportModalProps) {
  const {
    selectedStore,
    totalRevenue,
    netProfit,
    profitMargin,
    totalOrders,
    avgOrderValue,
    totalAdsSpend,
    totalCogs,
    totalFees,
    filteredProducts,
  } = useStore();

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const data = filteredProducts.map((p) => ({
      'Product Title': p.title,
      SKU: p.sku,
      Category: p.category,
      'Units Sold': p.unitsSold,
      'Revenue ($)': p.revenue,
      'COGS ($)': p.cogs,
      'Shipping ($)': p.shippingCost,
      'TikTok Fees ($)': p.tiktokFees,
      'Ad Cost ($)': p.adCost,
      'Net Profit ($)': p.netProfit,
      'Margin (%)': `${p.margin}%`,
      Status: p.status,
    }));
    exportToGoogleSheetsCSV(`RushNshop-Executive-P&L-${Date.now()}`, data);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-3xl max-h-[92vh] flex flex-col bg-white dark:bg-[#121620] rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-700/80 overflow-hidden">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 print:hidden">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white dark:bg-white dark:text-black">
              <Printer className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Executive P&L & Margin Report
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Print or export high-resolution financial statement for {selectedStore?.name || 'All Connected Stores'}.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-white/5 text-xs font-bold transition-colors cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              <span>CSV / Sheets</span>
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#84cc16] hover:bg-[#72b012] text-black text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="h-8 w-8 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Printable Report Document */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 text-slate-900 dark:text-slate-100 font-sans print:p-0 print:overflow-visible">
          {/* Brand & Document Meta */}
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-slate-950 dark:text-white">
                  RUSH<span className="text-[#84cc16]">NSHOP</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase">
                  Audited Report
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Generated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {selectedStore ? `${selectedStore.flag} ${selectedStore.name}` : '🌐 Multi-Store Consolidated'}
              </p>
              <p className="text-xs text-slate-400 font-mono-numeric">Currency: {selectedStore?.currency || 'USD'}</p>
            </div>
          </div>

          {/* Executive KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono-numeric">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#161b26] border border-slate-200/80 dark:border-slate-800">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-sans">Gross Revenue</p>
              <p className="text-lg font-black text-slate-900 dark:text-white mt-1">
                {formatCurrency(totalRevenue, selectedStore?.currency)}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60">
              <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-[#4ade80] font-sans">Net Profit</p>
              <p className="text-lg font-black text-emerald-700 dark:text-[#4ade80] mt-1">
                {formatCurrency(netProfit, selectedStore?.currency)}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#161b26] border border-slate-200/80 dark:border-slate-800">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-sans">Net Margin</p>
              <p className="text-lg font-black text-slate-900 dark:text-white mt-1">{profitMargin.toFixed(1)}%</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#161b26] border border-slate-200/80 dark:border-slate-800">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-sans">Paid Orders</p>
              <p className="text-lg font-black text-slate-900 dark:text-white mt-1">{totalOrders}</p>
            </div>
          </div>

          {/* Cost Distribution Breakdown */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Expense & Deductions Breakdown
            </h3>
            <div className="divide-y divide-slate-100 dark:divide-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-2 text-xs font-mono-numeric">
              <div className="flex justify-between py-1">
                <span className="font-sans text-slate-600 dark:text-slate-300">Supplier COGS + Inbound Shipping</span>
                <span className="font-bold">{formatCurrency(totalCogs, selectedStore?.currency)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="font-sans text-slate-600 dark:text-slate-300">TikTok Commission & Transaction Fees (5%)</span>
                <span className="font-bold">{formatCurrency(totalFees, selectedStore?.currency)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="font-sans text-slate-600 dark:text-slate-300">TikTok Paid Ads & Spark Creator Spend</span>
                <span className="font-bold">{formatCurrency(totalAdsSpend, selectedStore?.currency)}</span>
              </div>
              <div className="flex justify-between py-2 border-t border-slate-200 dark:border-slate-700 text-sm font-black">
                <span className="font-sans text-emerald-600 dark:text-[#4ade80]">True Net Profit Retained</span>
                <span className="text-emerald-600 dark:text-[#4ade80]">
                  {formatCurrency(netProfit, selectedStore?.currency)} ({profitMargin.toFixed(1)}%)
                </span>
              </div>
            </div>
          </div>

          {/* Top Products Table */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Top Catalog Performance
            </h3>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left text-xs font-mono-numeric">
                <thead className="bg-slate-50 dark:bg-[#161b26] text-slate-500 font-sans border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-3">Product</th>
                    <th className="p-3">Units</th>
                    <th className="p-3">Revenue</th>
                    <th className="p-3">Net Profit</th>
                    <th className="p-3">Margin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredProducts.slice(0, 5).map((p) => (
                    <tr key={p.id}>
                      <td className="p-3 font-sans font-semibold text-slate-800 dark:text-slate-200">
                        {p.title} <span className="text-[10px] text-slate-400 block">{p.sku}</span>
                      </td>
                      <td className="p-3">{p.unitsSold}</td>
                      <td className="p-3 font-bold">{formatCurrency(p.revenue, selectedStore?.currency)}</td>
                      <td className="p-3 font-bold text-emerald-600 dark:text-[#4ade80]">
                        {formatCurrency(p.netProfit, selectedStore?.currency)}
                      </td>
                      <td className="p-3 font-bold">{p.margin}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Document Footer */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400 font-sans">
            <span>Confidential Financial Document • RushNshop Multi-Store OS</span>
            <span>Page 1 of 1</span>
          </div>
        </div>
      </div>
    </div>
  );
}
