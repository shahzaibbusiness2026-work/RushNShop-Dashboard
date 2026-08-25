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
  DollarSign,
  Truck,
  Ship,
  Package,
  Layers,
  Award,
  ChevronRight,
  Eye,
  Sliders,
  CheckCircle2,
  Percent,
  ShieldCheck,
  Flame,
  ArrowUpRight,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatCurrency, formatPercent, cn } from '../../lib/utils';
import { calculateDetailedProfit } from '../../lib/calculations';
import { exportToGoogleSheetsCSV, copyForGoogleSheets } from '../../lib/exportUtils';
import PdfReportModal from '../../components/export/PdfReportModal';
import ListingModal from '../../components/calculator/ListingModal';

export default function ComparePage() {
  const {
    products,
    comparisonProductIds,
    toggleCompareProduct,
    selectedStore,
  } = useStore();

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [listingModalOpen, setListingModalOpen] = useState(false);
  const [activeListingProduct, setActiveListingProduct] = useState<any>(null);
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

  // Compute detailed metrics for each SKU
  const evaluatedProducts = comparedProducts.map((p) => {
    const units = p.unitsSold || 1;
    const estSellingPrice = p.revenue / units || 29.99;
    const estCogs = p.cogs / units || 6.5;
    const estInboundFreight = 1.2; // Inbound supplier shipment charge
    const estShippingCost = Math.max(2.5, p.shippingCost / units) || 3.5; // Outbound 3PL delivery
    const estPackaging = 0.8;
    const estAffiliatePercent = p.revenue > 0 ? (p.affiliateCommission / p.revenue) * 100 : 10;
    const estAdCpa = p.adCost / units || 4.5;

    const calc = calculateDetailedProfit({
      sellingPrice: estSellingPrice,
      cogs: estCogs,
      shipmentCharges: estInboundFreight,
      shippingCost: estShippingCost,
      packagingCost: estPackaging,
      tiktokFeePercent: 5.0,
      paymentFeePercent: 2.9,
      paymentFeeFixed: 0.3,
      affiliatePercent: estAffiliatePercent || 10,
      adCpa: estAdCpa,
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

  const winnerProduct = evaluatedProducts[winnerIndex];

  // Calculate average margin for comparative badges
  const avgMargin =
    evaluatedProducts.length > 0
      ? evaluatedProducts.reduce((acc, curr) => acc + curr.calc.netMarginPercent, 0) /
        evaluatedProducts.length
      : 0;

  const handleExportGoogleSheets = () => {
    const data = evaluatedProducts.map(({ product, calc }) => ({
      'Product Title': product.title,
      SKU: product.sku,
      Category: product.category,
      'Selling Price ($)': calc.sellingPrice,
      'COGS ($)': calc.cogs,
      'Inbound Freight ($)': calc.shipmentCharges,
      'Outbound Courier ($)': calc.shippingCost,
      'Total Shipping ($)': calc.totalShipping,
      'Packaging ($)': calc.packagingCost,
      'TikTok Fees ($)': calc.tiktokFeeAmount + calc.paymentFeeAmount,
      'Creator Affiliate ($)': calc.affiliateAmount,
      'Ad CPA ($)': calc.adCpa,
      'Net Profit ($)': calc.netProfit,
      'Net Margin (%)': `${calc.netMarginPercent.toFixed(1)}%`,
      'Break-Even ($)': calc.breakEvenPrice,
      'Max CPA ($)': calc.maxAllowableCpa,
    }));
    exportToGoogleSheetsCSV(`RushNshop-SKU-Comparison-${Date.now()}`, data);
    showNotification('Exported to Google Sheets CSV.');
  };

  const handleCopyGoogleSheets = () => {
    const data = evaluatedProducts.map(({ product, calc }) => ({
      Product: product.title,
      SKU: product.sku,
      Price: `$${calc.sellingPrice.toFixed(2)}`,
      COGS: `$${calc.cogs.toFixed(2)}`,
      InboundFreight: `$${calc.shipmentCharges.toFixed(2)}`,
      OutboundShipping: `$${calc.shippingCost.toFixed(2)}`,
      Packaging: `$${calc.packagingCost.toFixed(2)}`,
      TotalLogistics: `$${(calc.totalShipping + calc.packagingCost).toFixed(2)}`,
      NetProfit: `$${calc.netProfit.toFixed(2)}`,
      Margin: `${calc.netMarginPercent.toFixed(1)}%`,
      BreakEven: `$${calc.breakEvenPrice.toFixed(2)}`,
    }));
    const success = copyForGoogleSheets(data);
    if (success) {
      showNotification('Copied to Clipboard! Ready to paste into Google Sheets (Ctrl+V).');
    }
  };

  const handleOpenListingGenerator = (product: any, calc: any) => {
    setActiveListingProduct({
      name: product.title,
      sku: product.sku,
      cogs: calc.cogs,
      sellingPrice: calc.sellingPrice,
      shippingCost: calc.totalShipping,
      packagingCost: calc.packagingCost,
      tiktokFeePercent: 5.0,
      affiliatePercent: 10.0,
      adCpa: calc.adCpa,
      netProfit: calc.netProfit,
      profitMarginPercent: calc.netMarginPercent,
    });
    setListingModalOpen(true);
  };

  // Determine dynamic grid columns based on count
  const getGridColsClass = (count: number) => {
    if (count === 1) return 'grid-cols-1 max-w-lg mx-auto';
    if (count === 2) return 'grid-cols-1 md:grid-cols-2';
    if (count === 3) return 'grid-cols-1 md:grid-cols-3';
    return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-slate-900 text-white dark:bg-white dark:text-black rounded-2xl shadow-2xl text-xs font-bold animate-in slide-in-from-bottom-3 duration-200 border border-slate-700/50">
          <Sparkles className="h-4 w-4 text-[#84cc16] fill-current shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-lime-500/10 text-[#84cc16] border border-lime-500/20 shadow-xs">
              <Scale className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Product Comparison Matrix
                </h1>
                <span className="rounded-full border border-lime-500/30 bg-lime-500/10 px-2.5 py-0.5 text-[11px] font-bold text-lime-700 dark:text-[#84cc16]">
                  Studio Pro
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                Benchmark unit economics, shipment charges, platform fees, and net profit margins across up to 4 SKUs.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleCopyGoogleSheets}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white dark:bg-[#121620] hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-700 dark:hover:text-[#4ade80] border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 shadow-2xs transition-all cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 dark:text-[#4ade80]" />
            <span>Copy Google Sheets</span>
          </button>

          <button
            onClick={handleExportGoogleSheets}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white dark:bg-[#121620] hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 shadow-2xs transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>CSV Export</span>
          </button>

          <button
            onClick={() => setPdfModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-black rounded-xl text-xs font-bold shadow-2xs transition-all cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>P&L Statement</span>
          </button>

          <button
            onClick={() => setAddModalOpen(true)}
            disabled={comparedProducts.length >= 4}
            className="flex items-center gap-2 px-4 py-2 bg-[#84cc16] hover:bg-[#72b012] disabled:opacity-50 text-black rounded-xl text-xs font-black shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add SKU ({comparedProducts.length}/4)</span>
          </button>
        </div>
      </div>

      {/* Comparison Grid Container */}
      {comparedProducts.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#121620] border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
          <div className="h-16 w-16 mx-auto mb-4 rounded-3xl bg-lime-500/10 border border-lime-500/20 flex items-center justify-center text-[#84cc16]">
            <Scale className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            No SKUs Selected for Comparison
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
            Select up to 4 products from your catalog to analyze shipment charges, creator affiliate splits, ad CPA headroom, and identify your top profit driver.
          </p>
          <button
            onClick={() => setAddModalOpen(true)}
            className="mt-5 px-5 py-2.5 bg-[#84cc16] hover:bg-[#72b012] text-black font-black text-xs rounded-xl shadow-xs transition-all cursor-pointer"
          >
            Select SKUs to Benchmark
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Top Winner Notification Banner if > 1 SKU */}
          {evaluatedProducts.length > 1 && winnerProduct && (
            <div className="relative overflow-hidden rounded-3xl border border-lime-500/40 bg-gradient-to-r from-lime-500/15 via-[#84cc16]/5 to-transparent p-5 dark:border-lime-500/30">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#84cc16] text-black shadow-md">
                    <Trophy className="h-6 w-6 fill-current" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-black uppercase tracking-wider text-lime-700 dark:text-[#84cc16]">
                        Top Profit Performer
                      </span>
                      <span className="rounded-full bg-[#84cc16] px-2 py-0.5 text-[10px] font-black text-black">
                        #{winnerIndex + 1} Ranked
                      </span>
                    </div>
                    <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
                      {winnerProduct.product.title} delivers the highest net margin ({formatPercent(winnerProduct.calc.netMarginPercent)})
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      Generates <strong className="text-slate-900 dark:text-white font-bold">{formatCurrency(winnerProduct.calc.netProfit)}</strong> net profit per order with a break-even floor at {formatCurrency(winnerProduct.calc.breakEvenPrice)}.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleOpenListingGenerator(winnerProduct.product, winnerProduct.calc)}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-black rounded-xl text-xs font-black transition-all shadow-xs cursor-pointer"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-[#84cc16]" />
                    <span>Launch on TikTok</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Cards Grid: Perfectly Formatted & Balanced */}
          <div className={cn('grid gap-4', getGridColsClass(evaluatedProducts.length))}>
            {evaluatedProducts.map(({ product, calc }, idx) => {
              const isWinner = idx === winnerIndex && evaluatedProducts.length > 1;
              const marginDiff = calc.netMarginPercent - avgMargin;

              return (
                <div
                  key={product.id}
                  className={cn(
                    'relative flex flex-col justify-between rounded-3xl p-5 border transition-all duration-200 shadow-sm',
                    isWinner
                      ? 'border-[#84cc16] bg-gradient-to-b from-lime-500/10 via-white to-white dark:via-[#121620] dark:to-[#121620] ring-2 ring-[#84cc16]/80'
                      : 'border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#121620] hover:border-slate-300 dark:hover:border-slate-700',
                  )}
                >
                  {/* Remove SKU Button */}
                  <button
                    onClick={() => toggleCompareProduct(product.id)}
                    aria-label="Remove product"
                    className="absolute top-4 right-4 h-7 w-7 flex items-center justify-center rounded-full bg-slate-100 hover:bg-rose-100 text-slate-400 hover:text-rose-600 dark:bg-slate-800 dark:hover:bg-rose-950/80 transition-colors cursor-pointer"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>

                  <div>
                    {/* Top Status Ribbon */}
                    <div className="flex items-center gap-2 mb-3.5">
                      {isWinner ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#84cc16] text-black text-[10px] font-black uppercase tracking-wider shadow-xs">
                          <Trophy className="h-3 w-3 fill-current" /> Winner #{idx + 1}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold uppercase tracking-wider">
                          SKU #{idx + 1}
                        </span>
                      )}
                      <span className="text-[11px] font-mono-numeric text-slate-400 dark:text-slate-500 font-semibold truncate">
                        {product.sku}
                      </span>
                    </div>

                    {/* Product Card Header */}
                    <div className="flex items-center gap-3.5 mb-4">
                      <div className="h-12 w-12 rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1 pr-6">
                        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white truncate tracking-tight" title={product.title}>
                          {product.title}
                        </h3>
                        <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                          {product.category}
                        </p>
                      </div>
                    </div>

                    {/* Primary Highlight Profit Box */}
                    <div className="p-4 rounded-2xl bg-slate-50/90 dark:bg-[#161b26] border border-slate-200/80 dark:border-slate-800/90 space-y-3 font-mono-numeric mb-4">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-500 dark:text-slate-400 font-sans font-semibold">Selling Price</span>
                        <span className="font-black text-slate-900 dark:text-white text-sm">
                          {formatCurrency(calc.sellingPrice)}
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-500 dark:text-slate-400 font-sans font-semibold">Net Profit / Unit</span>
                        <span
                          className={cn(
                            'font-black text-sm px-2 py-0.5 rounded-md',
                            calc.netProfit > 0
                              ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-[#4ade80]'
                              : 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400',
                          )}
                        >
                          {formatCurrency(calc.netProfit)}
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-500 dark:text-slate-400 font-sans font-semibold">Net Margin %</span>
                        <span
                          className={cn(
                            'font-black text-sm',
                            calc.netMarginPercent >= 35
                              ? 'text-emerald-600 dark:text-[#4ade80]'
                              : calc.netMarginPercent > 0
                                ? 'text-amber-500'
                                : 'text-rose-500',
                          )}
                        >
                          {formatPercent(calc.netMarginPercent)}
                        </span>
                      </div>

                      {/* Visual Margin Bar */}
                      <div className="pt-0.5">
                        <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                          <div
                            className={cn(
                              'h-full rounded-full transition-all duration-300',
                              calc.netMarginPercent >= 35
                                ? 'bg-gradient-to-r from-emerald-500 to-[#84cc16]'
                                : calc.netMarginPercent > 0
                                  ? 'bg-amber-500'
                                  : 'bg-rose-500',
                            )}
                            style={{ width: `${Math.min(100, Math.max(0, calc.netMarginPercent))}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-xs border-t border-slate-200/80 dark:border-slate-800 pt-2 text-slate-500 dark:text-slate-400">
                        <span className="font-sans font-medium">Break-Even Floor</span>
                        <span className="font-bold text-slate-900 dark:text-white">
                          {formatCurrency(calc.breakEvenPrice)}
                        </span>
                      </div>
                    </div>

                    {/* Itemized Cost Breakdown */}
                    <div className="space-y-2 text-xs font-mono-numeric">
                      <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                        <span className="font-sans font-medium text-slate-500 dark:text-slate-400">COGS (Factory)</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">{formatCurrency(calc.cogs)}</span>
                      </div>

                      <div className="flex justify-between items-center text-blue-600 dark:text-blue-400">
                        <span className="font-sans font-medium flex items-center gap-1.5">
                          <Ship className="h-3.5 w-3.5" /> Inbound Freight
                        </span>
                        <span className="font-bold">{formatCurrency(calc.shipmentCharges)}</span>
                      </div>

                      <div className="flex justify-between items-center text-emerald-600 dark:text-emerald-400">
                        <span className="font-sans font-medium flex items-center gap-1.5">
                          <Truck className="h-3.5 w-3.5" /> Outbound Delivery
                        </span>
                        <span className="font-bold">{formatCurrency(calc.shippingCost)}</span>
                      </div>

                      <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                        <span className="font-sans font-medium text-slate-500 dark:text-slate-400">TikTok & Merchant Fees</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                          {formatCurrency(calc.tiktokFeeAmount + calc.paymentFeeAmount)}
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                        <span className="font-sans font-medium text-slate-500 dark:text-slate-400">Creator Affiliate</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">{formatCurrency(calc.affiliateAmount)}</span>
                      </div>

                      <div className="flex justify-between items-center text-purple-600 dark:text-[#c084fc]">
                        <span className="font-sans font-medium">TikTok Ads CPA</span>
                        <span className="font-bold">{formatCurrency(calc.adCpa)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                    <button
                      onClick={() => handleOpenListingGenerator(product, calc)}
                      className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-xs font-bold text-white shadow-2xs transition-all cursor-pointer"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-lime-300" />
                      <span>Create TikTok Listing</span>
                    </button>

                    <button
                      onClick={() => router.push('/calculator')}
                      className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-white transition-colors cursor-pointer"
                    >
                      <span>Simulate in Calculator</span>
                      <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Empty Slot Card if less than 4 products */}
            {evaluatedProducts.length < 4 && (
              <button
                onClick={() => setAddModalOpen(true)}
                className="flex flex-col items-center justify-center p-8 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-[#84cc16] dark:hover:border-[#84cc16] bg-slate-50/40 dark:bg-[#121620]/40 transition-all text-center group cursor-pointer min-h-[380px]"
              >
                <div className="h-12 w-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-[#84cc16] group-hover:scale-110 transition-all shadow-2xs mb-3">
                  <Plus className="h-6 w-6 stroke-[2.5]" />
                </div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-[#84cc16] transition-colors">
                  Add #{evaluatedProducts.length + 1} SKU to Compare
                </h4>
                <p className="text-xs text-slate-400 mt-1 max-w-[200px]">
                  Pick from your catalog to complete the benchmark
                </p>
              </button>
            )}
          </div>

          {/* Deep Comparative Matrix Table */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800/80 dark:bg-[#121620]">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
              <div>
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                  Executive Side-by-Side Comparison Matrix
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Full dimensional audit of cost waterfalls and profit headroom across all compared SKUs.
                </p>
              </div>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="pb-3 pr-4">Metric / Dimension</th>
                    {evaluatedProducts.map(({ product }, idx) => (
                      <th key={product.id} className="pb-3 px-4 font-bold text-slate-900 dark:text-white">
                        SKU #{idx + 1}: {product.title.slice(0, 22)}...
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono-numeric">
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-white/5">
                    <td className="py-2.5 pr-4 font-sans font-bold text-slate-700 dark:text-slate-300">Selling Price</td>
                    {evaluatedProducts.map(({ calc }, i) => (
                      <td key={i} className="py-2.5 px-4 font-black text-slate-900 dark:text-white">
                        {formatCurrency(calc.sellingPrice)}
                      </td>
                    ))}
                  </tr>

                  <tr className="hover:bg-slate-50/50 dark:hover:bg-white/5">
                    <td className="py-2.5 pr-4 font-sans text-slate-600 dark:text-slate-400">COGS (Factory)</td>
                    {evaluatedProducts.map(({ calc }, i) => (
                      <td key={i} className="py-2.5 px-4 text-slate-700 dark:text-slate-300">
                        {formatCurrency(calc.cogs)}
                      </td>
                    ))}
                  </tr>

                  <tr className="hover:bg-slate-50/50 dark:hover:bg-white/5">
                    <td className="py-2.5 pr-4 font-sans text-blue-600 dark:text-blue-400">Inbound Freight (Shipment Charges)</td>
                    {evaluatedProducts.map(({ calc }, i) => (
                      <td key={i} className="py-2.5 px-4 text-blue-600 dark:text-blue-400 font-bold">
                        {formatCurrency(calc.shipmentCharges)}
                      </td>
                    ))}
                  </tr>

                  <tr className="hover:bg-slate-50/50 dark:hover:bg-white/5">
                    <td className="py-2.5 pr-4 font-sans text-emerald-600 dark:text-emerald-400">Outbound Customer Delivery (Shipping Cost)</td>
                    {evaluatedProducts.map(({ calc }, i) => (
                      <td key={i} className="py-2.5 px-4 text-emerald-600 dark:text-emerald-400 font-bold">
                        {formatCurrency(calc.shippingCost)}
                      </td>
                    ))}
                  </tr>

                  <tr className="hover:bg-slate-50/50 dark:hover:bg-white/5">
                    <td className="py-2.5 pr-4 font-sans text-slate-600 dark:text-slate-400">TikTok 5% + Payment Fees</td>
                    {evaluatedProducts.map(({ calc }, i) => (
                      <td key={i} className="py-2.5 px-4 text-slate-700 dark:text-slate-300">
                        {formatCurrency(calc.tiktokFeeAmount + calc.paymentFeeAmount)}
                      </td>
                    ))}
                  </tr>

                  <tr className="hover:bg-slate-50/50 dark:hover:bg-white/5">
                    <td className="py-2.5 pr-4 font-sans text-slate-600 dark:text-slate-400">Creator Affiliate Commission</td>
                    {evaluatedProducts.map(({ calc }, i) => (
                      <td key={i} className="py-2.5 px-4 text-slate-700 dark:text-slate-300">
                        {formatCurrency(calc.affiliateAmount)}
                      </td>
                    ))}
                  </tr>

                  <tr className="hover:bg-slate-50/50 dark:hover:bg-white/5">
                    <td className="py-2.5 pr-4 font-sans text-purple-600 dark:text-[#c084fc]">TikTok Ads CPA</td>
                    {evaluatedProducts.map(({ calc }, i) => (
                      <td key={i} className="py-2.5 px-4 text-purple-600 dark:text-[#c084fc] font-bold">
                        {formatCurrency(calc.adCpa)}
                      </td>
                    ))}
                  </tr>

                  <tr className="hover:bg-slate-50/50 dark:hover:bg-white/5 bg-slate-50/30 dark:bg-[#161b26]/50">
                    <td className="py-3 pr-4 font-sans font-black text-slate-900 dark:text-white">Net Profit / Order</td>
                    {evaluatedProducts.map(({ calc }, i) => (
                      <td key={i} className={cn('py-3 px-4 font-black text-sm', calc.netProfit > 0 ? 'text-emerald-600 dark:text-[#4ade80]' : 'text-rose-500')}>
                        {formatCurrency(calc.netProfit)}
                      </td>
                    ))}
                  </tr>

                  <tr className="hover:bg-slate-50/50 dark:hover:bg-white/5 bg-slate-50/30 dark:bg-[#161b26]/50">
                    <td className="py-3 pr-4 font-sans font-black text-slate-900 dark:text-white">Net Margin %</td>
                    {evaluatedProducts.map(({ calc }, i) => (
                      <td key={i} className={cn('py-3 px-4 font-black text-sm', calc.netMarginPercent >= 35 ? 'text-emerald-600 dark:text-[#4ade80]' : 'text-amber-500')}>
                        {formatPercent(calc.netMarginPercent)}
                      </td>
                    ))}
                  </tr>

                  <tr className="hover:bg-slate-50/50 dark:hover:bg-white/5">
                    <td className="py-2.5 pr-4 font-sans text-slate-600 dark:text-slate-400">Break-Even Selling Floor</td>
                    {evaluatedProducts.map(({ calc }, i) => (
                      <td key={i} className="py-2.5 px-4 font-bold text-slate-700 dark:text-slate-300">
                        {formatCurrency(calc.breakEvenPrice)}
                      </td>
                    ))}
                  </tr>

                  <tr className="hover:bg-slate-50/50 dark:hover:bg-white/5">
                    <td className="py-2.5 pr-4 font-sans text-slate-600 dark:text-slate-400">Max Allowable Ad CPA</td>
                    {evaluatedProducts.map(({ calc }, i) => (
                      <td key={i} className="py-2.5 px-4 font-bold text-slate-700 dark:text-slate-300">
                        {formatCurrency(calc.maxAllowableCpa)}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal Picker */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-white dark:bg-[#121620] rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-700/80 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Select SKU to Benchmark
                </h3>
                <p className="text-xs text-slate-400">
                  Pick from your live store products ({comparedProducts.length}/4 selected)
                </p>
              </div>
              <button
                onClick={() => setAddModalOpen(false)}
                aria-label="Close modal"
                className="p-1.5 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
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
                        ? 'border-[#84cc16] bg-lime-500/10'
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
                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold font-mono-numeric text-slate-900 dark:text-white block">
                        {formatCurrency(p.revenue / (p.unitsSold || 1))}
                      </span>
                      <span className="text-[10px] text-emerald-600 dark:text-[#4ade80] font-bold">
                        {isSelected ? '✓ In Comparison' : '+ Add SKU'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* PDF Report Modal */}
      <PdfReportModal isOpen={pdfModalOpen} onClose={() => setPdfModalOpen(false)} />

      {/* Listing Generator Modal */}
      {activeListingProduct && (
        <ListingModal
          isOpen={listingModalOpen}
          onClose={() => {
            setListingModalOpen(false);
            setActiveListingProduct(null);
          }}
          initialProduct={activeListingProduct}
        />
      )}
    </div>
  );
}
