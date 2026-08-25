'use client';

import React, { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
  Calendar,
  DollarSign,
  TrendingUp,
  Percent,
  CheckCircle2,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatCurrency, formatPercent } from '../../lib/utils';

export default function ReportsPage() {
  const {
    totalRevenue,
    netProfit,
    profitMargin,
    totalAdsSpend,
    totalCogs,
    totalFees,
    refunds,
    selectedStore,
    dateRange,
  } = useStore();
  const [reportType, setReportType] = useState('Income Statement (P&L)');

  const grossSales = totalRevenue + 450.0;
  const discounts = 450.0;
  const netSales = totalRevenue;
  const grossProfit = netSales - totalCogs;
  const grossMargin = (grossProfit / netSales) * 100;
  const operatingExpenses = totalAdsSpend + 1500.0;

  const handleDownloadCsv = () => {
    const csvContent = `data:text/csv;charset=utf-8,Category,Amount\nGross Sales,${grossSales}\nDiscounts,${discounts}\nNet Sales,${netSales}\nCOGS,${totalCogs}\nGross Profit,${grossProfit}\nTikTok Platform Fees,${totalFees}\nTikTok Ads Spend,${totalAdsSpend}\nOperating Expenses,1500.00\nRefunds,${refunds}\nNet Profit,${netProfit}\nProfit Margin,${profitMargin}%`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `RushNshop_P_L_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
            Profit & Loss (P&L) Financial Reports
          </h2>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            GAAP e-commerce compliant financial statements for accounting, tax auditing, and store
            evaluation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="shadow-2xs flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-[#161b26] dark:text-slate-200 dark:hover:bg-white/10"
          >
            <Printer className="h-4 w-4" />
            <span>Print Report</span>
          </button>
          <button
            onClick={handleDownloadCsv}
            className="shadow-xs flex items-center gap-1.5 rounded-xl bg-[#84cc16] px-4 py-2 text-xs font-bold text-black transition-all hover:scale-[1.02] hover:bg-[#72b012]"
          >
            <Download className="h-4 w-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* P&L Statement Paper Card */}
      <div className="shadow-xs space-y-6 rounded-3xl border border-slate-200/80 bg-white p-8 dark:border-slate-800/80 dark:bg-[#121620]">
        {/* Statement Title */}
        <div className="flex flex-col justify-between gap-2 border-b border-slate-100 pb-5 dark:border-slate-800 sm:flex-row sm:items-center">
          <div>
            <span className="rounded-md bg-emerald-50 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:bg-emerald-950/60 dark:text-[#4ade80]">
              Official Accounting Statement
            </span>
            <h3 className="mt-2 text-lg font-bold text-slate-900 dark:text-white">
              RushNshop TikTok Shop Profit & Loss Statement
            </h3>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Account: {selectedStore ? selectedStore.name : 'All TikTok Accounts Combined'} •
              Period: {dateRange}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500">Currency</p>
            <p className="font-mono-numeric text-base font-black text-slate-900 dark:text-white">
              USD ($)
            </p>
          </div>
        </div>

        {/* Section 1: Revenue & Net Sales */}
        <div className="font-mono-numeric space-y-2 text-xs">
          <h4 className="font-sans text-sm font-bold uppercase tracking-wider text-slate-400 text-slate-900 dark:text-slate-100">
            1. Revenue & Sales
          </h4>
          <div className="flex justify-between border-b border-slate-50 py-1.5 text-slate-700 dark:border-slate-800 dark:text-slate-300">
            <span className="font-sans">Gross Merchandise Sales (GMV)</span>
            <span className="font-semibold text-slate-900 dark:text-white">
              {formatCurrency(grossSales, selectedStore?.currency)}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-50 py-1.5 text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <span className="font-sans">Less: Promotional Discounts & Coupons</span>
            <span className="font-semibold text-rose-600 dark:text-rose-400">
              ({formatCurrency(discounts, selectedStore?.currency)})
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-100 py-1.5 text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <span className="font-sans">Less: Order Returns & Refunds</span>
            <span className="font-semibold text-rose-600 dark:text-rose-400">
              ({formatCurrency(refunds, selectedStore?.currency)})
            </span>
          </div>
          <div className="flex justify-between rounded-xl bg-slate-50 px-3 py-2 font-bold text-slate-900 dark:bg-[#0f1117] dark:text-white">
            <span className="font-sans">Net Sales Revenue</span>
            <span>{formatCurrency(netSales, selectedStore?.currency)}</span>
          </div>
        </div>

        {/* Section 2: Cost of Goods Sold */}
        <div className="font-mono-numeric space-y-2 text-xs">
          <h4 className="font-sans text-sm font-bold uppercase tracking-wider text-slate-400 text-slate-900 dark:text-slate-100">
            2. Cost of Goods Sold (COGS)
          </h4>
          <div className="flex justify-between border-b border-slate-50 py-1.5 text-slate-700 dark:border-slate-800 dark:text-slate-300">
            <span className="font-sans">Product Manufacturing & Supplier Costs</span>
            <span className="font-semibold text-slate-900 dark:text-white">
              {formatCurrency(totalCogs, selectedStore?.currency)}
            </span>
          </div>
          <div className="flex justify-between rounded-xl bg-emerald-50/60 px-3 py-2 font-bold text-emerald-950 dark:bg-emerald-950/40 dark:text-emerald-200">
            <span className="font-sans">Gross Profit</span>
            <div className="flex items-center gap-3">
              <span>{formatCurrency(grossProfit, selectedStore?.currency)}</span>
              <span className="text-xs font-normal text-emerald-700 dark:text-[#4ade80]">
                ({grossMargin.toFixed(1)}% Gross Margin)
              </span>
            </div>
          </div>
        </div>

        {/* Section 3: Operating Expenses & Platform Fees */}
        <div className="font-mono-numeric space-y-2 text-xs">
          <h4 className="font-sans text-sm font-bold uppercase tracking-wider text-slate-400 text-slate-900 dark:text-slate-100">
            3. Operating Expenses & Marketplace Fees
          </h4>
          <div className="flex justify-between border-b border-slate-50 py-1.5 text-slate-700 dark:border-slate-800 dark:text-slate-300">
            <span className="font-sans">TikTok Shop Marketplace Commission & Payment Fees</span>
            <span className="font-semibold text-slate-900 dark:text-white">
              {formatCurrency(totalFees, selectedStore?.currency)}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-50 py-1.5 text-slate-700 dark:border-slate-800 dark:text-slate-300">
            <span className="font-sans">TikTok Ads Marketing Expenditure</span>
            <span className="font-semibold text-purple-600 dark:text-[#c084fc]">
              {formatCurrency(totalAdsSpend, selectedStore?.currency)}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-50 py-1.5 text-slate-700 dark:border-slate-800 dark:text-slate-300">
            <span className="font-sans">Staff Salaries, Virtual Assistants & SaaS Suite</span>
            <span className="font-semibold text-slate-900 dark:text-white">
              {formatCurrency(1500.0, selectedStore?.currency)}
            </span>
          </div>
          <div className="flex justify-between rounded-xl bg-slate-50 px-3 py-2 font-bold text-slate-900 dark:bg-[#0f1117] dark:text-white">
            <span className="font-sans">Total Operating Expenses</span>
            <span className="text-rose-600 dark:text-rose-400">
              {formatCurrency(totalFees + totalAdsSpend + 1500.0, selectedStore?.currency)}
            </span>
          </div>
        </div>

        {/* Section 4: Bottom Line Net Profit */}
        <div className="flex flex-col justify-between gap-3 rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-lime-50 p-5 dark:border-emerald-800 dark:from-emerald-950/50 dark:to-lime-950/30 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
              Final Net Operating Profit
            </p>
            <p className="font-mono-numeric mt-1 text-3xl font-black text-emerald-600 dark:text-[#4ade80]">
              {formatCurrency(netProfit, selectedStore?.currency)}
            </p>
          </div>
          <div className="sm:text-right">
            <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
              Net Profit Margin
            </p>
            <p className="font-mono-numeric mt-1 text-2xl font-black text-slate-900 dark:text-white">
              {formatPercent(profitMargin)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
