'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plus,
  X,
  Sparkles,
  TrendingUp,
  Trophy,
  AlertTriangle,
  Check,
  ArrowRight,
  FileSpreadsheet,
  Printer,
  Download,
  Scale,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatCurrency, cn } from '../../lib/utils';
import { calculateDetailedProfit } from '../../lib/calculations';
import { exportToGoogleSheetsCSV, copyForGoogleSheets } from '../../lib/exportUtils';
import PdfReportModal from '../../components/export/PdfReportModal';

export default function ComparePage() {
  const {
    products,
    comparisonProductIds,
    toggleCompareProduct,
    selectedStore,
  } = useStore();

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const router = useRouter();

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Get compared products
  const comparedProducts = comparisonProductIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  // Compute metrics for each
  const evaluatedProducts = comparedProducts.map((p) => {
    const calc = calculateDetailedProfit({
      sellingPrice: p.revenue / (p.unitsSold || 1) || 29.99,
      cogs: p.cogs / (p.unitsSold || 1) || 6.5,
      shippingCost: p.shippingCost / (p.unitsSold || 1) || 3.0,
      packagingCost: 0.8,
      tiktokFeePercent: 5.0,
      paymentFeePercent: 2.9,
      paymentFeeFixed: 0.3,
      affiliatePercent: (p.affiliateCommission / (p.revenue || 1)) * 100 || 10,
      adCpa: p.adCost / (p.unitsSold || 1) || 4.5,
      otherExpenses: 0.4,
      targetMarginPercent: 35.0,
    });

    return {
      product: p,
      calc,
    };
  });

  // Find winner by highest net margin
  const winnerIndex = evaluatedProducts.reduce(
    (maxIdx, curr, idx, arr) =>
      curr.calc.netMarginPercent > (arr[maxIdx]?.calc.netMarginPercent || 0) ? idx : maxIdx,
    0,
  );

  const handleExportGoogleSheets = () => {
    const data = evaluatedProducts.map(({ product, calc }) => ({
      'Product Title': product.title,
      SKU: product.sku,
      Category: product.category,
      'Selling Price ($)': calc.sellingPrice,
      'COGS ($)': calc.cogs,
      'Shipping ($)': calc.shippingCost,
      'TikTok Fees ($)': calc.tiktokFeeAmount + calc.paymentFeeAmount,
      'Ad CPA ($)': calc.adCpa,
      'Net Profit ($)': calc.netProfit,
      'Net Margin (%)': `${calc.netMarginPercent}%`,
      'Break-Even ($)': calc.breakEvenPrice,
    }));
    exportToGoogleSheetsCSV(`RushNshop-Comparison-${Date.now()}`, data);
    showNotification('Exported to Google Sheets CSV.');
  };

  const handleCopyGoogleSheets = () => {
    const data = evaluatedProducts.map(({ product, calc }) => ({
      Product: product.title,
      Price: `$${calc.sellingPrice.toFixed(2)}`,
      COGS: `$${calc.cogs.toFixed(2)}`,
      Profit: `$${calc.netProfit.toFixed(2)}`,
      Margin: `${calc.netMarginPercent.toFixed(1)}%`,
      BreakEven: `$${calc.breakEvenPrice.toFixed(2)}`,
    }));
    const success = copyForGoogleSheets(data);
    if (success) {
      showNotification('Copied to Clipboard! Ready to paste into Google Sheets (Ctrl+V).');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-slate-900 text-white dark:bg-white dark:text-black rounded-2xl shadow-2xl text-xs font-bold animate-in slide-in-from-bottom-3 duration-200">
          <Sparkles className="h-4 w-4 text-[#84cc16] fill-current" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-100 text-lime-800 dark:bg-[#84cc16]/20 dark:text-[#84cc16]">
              <Scale className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Product Comparison Matrix
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                Compare unit economics of up to 4 SKUs side-by-side to find your highest profit winner.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleCopyGoogleSheets}
            className="flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-[#121620] hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-700 dark:hover:text-[#4ade80] border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 shadow-2xs transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 dark:text-[#4ade80]" />
            <span>Copy Google Sheets</span>
          </button>

          <button
            onClick={handleExportGoogleSheets}
            className="flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-[#121620] hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 shadow-2xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>CSV File</span>
          </button>

          <button
            onClick={() => setPdfModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-black rounded-xl text-xs font-bold shadow-2xs transition-all cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>P&L Report</span>
          </button>

          <button
            onClick={() => setAddModalOpen(true)}
            disabled={comparedProducts.length >= 4}
            className="flex items-center gap-2 px-4 py-2 bg-[#84cc16] hover:bg-[#72b012] disabled:opacity-50 text-black rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add SKU to Compare ({comparedProducts.length}/4)</span>
          </button>
        </div>
      </div>

      {/* Comparison Grid */}
      {comparedProducts.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#121620] border border-slate-200 dark:border-slate-800">
          <Scale className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 dark:text-white">
            No Products Selected for Comparison
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Select products from your catalog or click Add SKU to Compare to evaluate profit margins side-by-side.
          </p>
          <button
            onClick={() => setAddModalOpen(true)}
            className="mt-4 px-4 py-2 bg-[#84cc16] text-black font-bold text-xs rounded-xl shadow-xs cursor-pointer"
          >
            Select Products Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {evaluatedProducts.map(({ product, calc }, idx) => {
            const isWinner = idx === winnerIndex && evaluatedProducts.length > 1;

            return (
              <div
                key={product.id}
                className={cn(
                  'relative flex flex-col justify-between rounded-3xl p-5 border transition-all',
                  isWinner
                    ? 'border-[#84cc16] bg-lime-500/5 dark:bg-lime-500/10 shadow-lg ring-1 ring-[#84cc16]'
                    : 'border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#121620]',
                )}
              >
                {/* Remove button */}
                <button
                  onClick={() => toggleCompareProduct(product.id)}
                  aria-label="Remove product"
                  className="absolute top-4 right-4 h-7 w-7 flex items-center justify-center rounded-full bg-slate-100 hover:bg-rose-100 text-slate-400 hover:text-rose-600 dark:bg-slate-800 dark:hover:bg-rose-950 transition-colors cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>

                <div>
                  {/* Top Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    {isWinner ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#84cc16] text-black text-[10px] font-black uppercase tracking-wider">
                        <Trophy className="h-3 w-3 fill-current" /> Winner #{idx + 1}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                        SKU #{idx + 1}
                      </span>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                        {product.title}
                      </h3>
                      <p className="text-xs text-slate-400 font-mono-numeric">
                        {product.sku} • {product.category}
                      </p>
                    </div>
                  </div>

                  {/* Highlight Metrics */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#161b26] border border-slate-200/80 dark:border-slate-800 space-y-2 font-mono-numeric mb-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 font-sans">Selling Price</span>
                      <span className="font-bold text-slate-900 dark:text-white">
                        ${calc.sellingPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 font-sans">Net Profit / Order</span>
                      <span
                        className={cn(
                          'font-black',
                          calc.netProfit > 0
                            ? 'text-emerald-600 dark:text-[#4ade80]'
                            : 'text-rose-500',
                        )}
                      >
                        ${calc.netProfit.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 font-sans">Net Margin %</span>
                      <span
                        className={cn(
                          'font-black',
                          calc.netMarginPercent >= 30
                            ? 'text-emerald-600 dark:text-[#4ade80]'
                            : 'text-amber-500',
                        )}
                      >
                        {calc.netMarginPercent.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs border-t border-slate-200/60 dark:border-slate-800 pt-2">
                      <span className="text-slate-400 font-sans">Break-Even Price</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        ${calc.breakEvenPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Itemized Cost Breakdown */}
                  <div className="space-y-1.5 text-[11px] font-mono-numeric">
                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                      <span className="font-sans">COGS Supplier</span>
                      <span>${calc.cogs.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                      <span className="font-sans">Inbound Shipping</span>
                      <span>${calc.shippingCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                      <span className="font-sans">TikTok 5% + Merchant Fee</span>
                      <span>${(calc.tiktokFeeAmount + calc.paymentFeeAmount).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                      <span className="font-sans">Creator Affiliate Split</span>
                      <span>${calc.affiliateAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                      <span className="font-sans">Ad CPA (Paid Ads)</span>
                      <span>${calc.adCpa.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => router.push('/calculator')}
                    className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-white transition-colors cursor-pointer"
                  >
                    <span>Load into Calculator</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Product Modal Picker */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-white dark:bg-[#121620] rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-700/80 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Select Product to Compare
              </h3>
              <button
                onClick={() => setAddModalOpen(false)}
                aria-label="Close modal"
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto p-4 space-y-2 dark-scrollbar">
              {products.map((p) => {
                const isSelected = comparisonProductIds.includes(p.id);
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      toggleCompareProduct(p.id);
                      setAddModalOpen(false);
                    }}
                    className={cn(
                      'w-full flex items-center justify-between p-3 rounded-2xl border text-left transition-all cursor-pointer',
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-white/5',
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img src={p.image} alt={p.title} className="h-10 w-10 rounded-xl object-cover" />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {p.title}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {p.sku} • {p.category}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold font-mono-numeric text-slate-900 dark:text-white">
                      ${(p.revenue / (p.unitsSold || 1)).toFixed(2)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* PDF Report Modal */}
      <PdfReportModal isOpen={pdfModalOpen} onClose={() => setPdfModalOpen(false)} />
    </div>
  );
}
