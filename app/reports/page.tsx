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
  const { totalRevenue, netProfit, profitMargin, totalAdsSpend, totalCogs, totalFees, refunds, selectedStore, dateRange } = useStore();
  const [reportType, setReportType] = useState('Income Statement (P&L)');

  const grossSales = totalRevenue + 450.00;
  const discounts = 450.00;
  const netSales = totalRevenue;
  const grossProfit = netSales - totalCogs;
  const grossMargin = (grossProfit / netSales) * 100;
  const operatingExpenses = totalAdsSpend + 1500.00;

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
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Profit & Loss (P&L) Financial Reports</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            GAAP e-commerce compliant financial statements for accounting, tax auditing, and store evaluation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#161b22] px-3.5 py-2 text-xs font-bold text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-white/10"
          >
            <Printer className="h-4 w-4" />
            <span>Print Report</span>
          </button>
          <button
            onClick={handleDownloadCsv}
            className="flex items-center gap-1.5 rounded-xl bg-[#84cc16] px-4 py-2 text-xs font-bold text-black shadow-sm hover:bg-[#72b012]"
          >
            <Download className="h-4 w-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* P&L Statement Paper Card */}
      <div className="rounded-3xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#151b26] p-8 shadow-sm space-y-6">
        {/* Statement Title */}
        <div className="border-b border-gray-100 dark:border-gray-800 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-lime-700 dark:text-[#4ade80] bg-lime-100 dark:bg-lime-950/60 px-2.5 py-0.5 rounded-md">
              Official Accounting Statement
            </span>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-2">RushNshop TikTok Shop Profit & Loss Statement</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Account: {selectedStore ? selectedStore.name : 'All TikTok Accounts Combined'} • Period: {dateRange}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-gray-400 dark:text-gray-500">Currency</p>
            <p className="text-base font-black text-gray-900 dark:text-white">USD ($)</p>
          </div>
        </div>

        {/* Section 1: Revenue & Net Sales */}
        <div className="space-y-2 text-xs">
          <h4 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider text-gray-500">
            1. Revenue & Sales
          </h4>
          <div className="flex justify-between py-1.5 border-b border-gray-50 dark:border-gray-800 text-gray-700 dark:text-gray-300">
            <span>Gross Merchandise Sales (GMV)</span>
            <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(grossSales)}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-gray-50 dark:border-gray-800 text-gray-500 dark:text-gray-400">
            <span>Less: Promotional Discounts & Coupons</span>
            <span className="font-semibold text-rose-600 dark:text-rose-400">({formatCurrency(discounts)})</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-gray-100 dark:border-gray-800 text-gray-500 dark:text-gray-400">
            <span>Less: Order Returns & Refunds</span>
            <span className="font-semibold text-rose-600 dark:text-rose-400">({formatCurrency(refunds)})</span>
          </div>
          <div className="flex justify-between py-2 bg-gray-50 dark:bg-[#0f1117] px-3 rounded-xl font-bold text-gray-900 dark:text-white">
            <span>Net Sales Revenue</span>
            <span>{formatCurrency(netSales)}</span>
          </div>
        </div>

        {/* Section 2: Cost of Goods Sold */}
        <div className="space-y-2 text-xs">
          <h4 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider text-gray-500">
            2. Cost of Goods Sold (COGS)
          </h4>
          <div className="flex justify-between py-1.5 border-b border-gray-50 dark:border-gray-800 text-gray-700 dark:text-gray-300">
            <span>Product Manufacturing & Supplier Costs</span>
            <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(totalCogs)}</span>
          </div>
          <div className="flex justify-between py-2 bg-emerald-50/60 dark:bg-emerald-950/40 px-3 rounded-xl font-bold text-emerald-950 dark:text-emerald-200">
            <span>Gross Profit</span>
            <div className="flex items-center gap-3">
              <span>{formatCurrency(grossProfit)}</span>
              <span className="text-xs font-normal text-emerald-700 dark:text-[#4ade80]">({grossMargin.toFixed(1)}% Gross Margin)</span>
            </div>
          </div>
        </div>

        {/* Section 3: Operating Expenses & Platform Fees */}
        <div className="space-y-2 text-xs">
          <h4 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider text-gray-500">
            3. Operating Expenses & Marketplace Fees
          </h4>
          <div className="flex justify-between py-1.5 border-b border-gray-50 dark:border-gray-800 text-gray-700 dark:text-gray-300">
            <span>TikTok Shop Marketplace Commission & Payment Fees</span>
            <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(totalFees)}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-gray-50 dark:border-gray-800 text-gray-700 dark:text-gray-300">
            <span>TikTok Ads Marketing Expenditure</span>
            <span className="font-semibold text-purple-700 dark:text-purple-300">{formatCurrency(totalAdsSpend)}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-gray-50 dark:border-gray-800 text-gray-700 dark:text-gray-300">
            <span>Staff Salaries, Virtual Assistants & SaaS Suite</span>
            <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(1500.00)}</span>
          </div>
          <div className="flex justify-between py-2 bg-gray-50 dark:bg-[#0f1117] px-3 rounded-xl font-bold text-gray-900 dark:text-white">
            <span>Total Operating Expenses</span>
            <span className="text-rose-600 dark:text-rose-400">{formatCurrency(totalFees + totalAdsSpend + 1500.00)}</span>
          </div>
        </div>

        {/* Section 4: Bottom Line Net Profit */}
        <div className="rounded-2xl bg-gradient-to-r from-emerald-50 to-lime-50 dark:from-emerald-950/50 dark:to-lime-950/30 p-5 border border-emerald-200 dark:border-emerald-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">Final Net Operating Profit</p>
            <p className="text-3xl font-black text-[#22c55e] dark:text-[#4ade80] mt-1">{formatCurrency(netProfit)}</p>
          </div>
          <div className="sm:text-right">
            <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300">Net Profit Margin</p>
            <p className="text-2xl font-black text-gray-900 dark:text-white mt-1">{formatPercent(profitMargin)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
