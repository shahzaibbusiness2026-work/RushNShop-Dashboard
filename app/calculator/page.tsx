'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Calculator,
  DollarSign,
  TrendingUp,
  Target,
  Sparkles,
  Save,
  RotateCcw,
  Zap,
  Check,
  ArrowRight,
  HelpCircle,
  Copy,
  Sliders,
  Upload,
  Tag,
  Scale,
  Printer,
  History,
} from 'lucide-react';
import { calculateUnitEconomics, formatCurrency, formatPercent, cn } from '../../lib/utils';
import { useStore } from '../../context/StoreContext';
import BulkUploadModal from '../../components/calculator/BulkUploadModal';
import ListingModal from '../../components/calculator/ListingModal';
import PdfReportModal from '../../components/export/PdfReportModal';

const PRESET_TEMPLATES = [
  {
    name: 'Viral Beauty Serum',
    price: 34.99,
    cogs: 6.5,
    shipping: 3.8,
    packaging: 0.9,
    tiktokFee: 5.0,
    paymentFee: 2.9,
    affiliate: 15.0,
    adCpa: 7.5,
    overhead: 0.5,
    targetMargin: 40.0,
  },
  {
    name: 'Kitchen Veggie Chopper',
    price: 29.99,
    cogs: 5.2,
    shipping: 4.5,
    packaging: 1.1,
    tiktokFee: 5.0,
    paymentFee: 2.9,
    affiliate: 10.0,
    adCpa: 6.8,
    overhead: 0.4,
    targetMargin: 38.0,
  },
  {
    name: 'Sunset Ambient Lamp',
    price: 24.99,
    cogs: 4.1,
    shipping: 3.9,
    packaging: 0.8,
    tiktokFee: 5.0,
    paymentFee: 2.9,
    affiliate: 12.0,
    adCpa: 5.5,
    overhead: 0.3,
    targetMargin: 42.0,
  },
  {
    name: 'High-Ticket Massage Gun',
    price: 79.99,
    cogs: 18.5,
    shipping: 7.2,
    packaging: 2.2,
    tiktokFee: 5.0,
    paymentFee: 2.9,
    affiliate: 10.0,
    adCpa: 16.5,
    overhead: 1.5,
    targetMargin: 35.0,
  },
];

export default function CalculatorPage() {
  const router = useRouter();
  const { saveCalculationToHistory, selectedStore } = useStore();

  // Modals
  const [bulkModalOpen, setBulkModalOpen] = useState(false);
  const [listingModalOpen, setListingModalOpen] = useState(false);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);

  // Inputs
  const [productName, setProductName] = useState('New Viral Product');
  const [sellingPrice, setSellingPrice] = useState<number>(39.99);
  const [cogs, setCogs] = useState<number>(9.5);
  const [shippingCost, setShippingCost] = useState<number>(4.2);
  const [packagingCost, setPackagingCost] = useState<number>(1.0);
  const [tiktokFeePercent, setTiktokFeePercent] = useState<number>(5.0);
  const [paymentFeePercent, setPaymentFeePercent] = useState<number>(2.9);
  const [paymentFeeFixed, setPaymentFeeFixed] = useState<number>(0.3);
  const [affiliatePercent, setAffiliatePercent] = useState<number>(10.0);
  const [adCpa, setAdCpa] = useState<number>(8.5);
  const [otherExpenses, setOtherExpenses] = useState<number>(0.5);
  const [targetMarginPercent, setTargetMarginPercent] = useState<number>(40.0);

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Compute real-time economics
  const results = calculateUnitEconomics({
    sellingPrice,
    cogs,
    shippingCost,
    packagingCost,
    tiktokFeePercent,
    paymentFeePercent,
    paymentFeeFixed,
    affiliatePercent,
    adCpa,
    otherExpenses,
    targetMarginPercent,
  });

  const handleApplyPreset = (preset: (typeof PRESET_TEMPLATES)[0]) => {
    setProductName(preset.name);
    setSellingPrice(preset.price);
    setCogs(preset.cogs);
    setShippingCost(preset.shipping);
    setPackagingCost(preset.packaging);
    setTiktokFeePercent(preset.tiktokFee);
    setPaymentFeePercent(preset.paymentFee);
    setAffiliatePercent(preset.affiliate);
    setAdCpa(preset.adCpa);
    setOtherExpenses(preset.overhead);
    setTargetMarginPercent(preset.targetMargin);
  };

  const handleSaveToAuditHistory = () => {
    let healthStatus: 'excellent' | 'good' | 'low' | 'loss' = 'good';
    if (results.netProfit <= 0) healthStatus = 'loss';
    else if (results.profitMargin >= 35) healthStatus = 'excellent';
    else if (results.profitMargin < 15) healthStatus = 'low';

    saveCalculationToHistory({
      name: productName,
      sku: `SKU-${Date.now().toString().slice(-4)}`,
      category: 'General',
      sellingPrice,
      cogs,
      shippingCost,
      packagingCost,
      tiktokFeePercent,
      affiliatePercent,
      adCpa,
      otherExpenses,
      netProfit: results.netProfit,
      profitMarginPercent: results.profitMargin,
      breakEvenPrice: results.breakEvenPrice,
      healthStatus,
      bestFor: `Optimized for ${targetMarginPercent}% Target Margin`,
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleCopySummary = () => {
    const summary = `📊 TikTok Shop Unit Economics Report: ${productName}
• Selling Price: ${formatCurrency(sellingPrice)}
• Product COGS: ${formatCurrency(cogs)}
• 3PL Shipping & Packaging: ${formatCurrency(shippingCost + packagingCost)}
• TikTok Shop Fee (${tiktokFeePercent}%): ${formatCurrency(results.tiktokFee)}
• Payment Processing: ${formatCurrency(results.paymentFee)}
• Creator Affiliate (${affiliatePercent}%): ${formatCurrency(results.affiliateCommission)}
• TikTok Ads CPA: ${formatCurrency(adCpa)}
---------------------------------------------
• Total Unit Cost: ${formatCurrency(results.totalCost)}
• Net Profit / Order: ${formatCurrency(results.netProfit)} (${formatPercent(results.profitMargin)} Margin)
• Break-Even Selling Price: ${formatCurrency(results.breakEvenPrice)}
• Max Allowable Ad CPA: ${formatCurrency(results.maxAllowableCpa)}
• Recommended Target Price: ${formatCurrency(results.recommendedPrice)}`;

    navigator.clipboard.writeText(summary);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2200);
  };

  const handleSendToAIListing = () => {
    setListingModalOpen(true);
  };

  const isProfitable = results.netProfit > 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
              TikTok Shop Profit Margin Calculator
            </h1>
            <span className="rounded-md bg-lime-500/10 px-2 py-0.5 text-xs font-bold text-lime-700 dark:text-[#84cc16]">
              Interactive Simulator
            </span>
          </div>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Simulate true unit economics, break-even price floor, and target profit margins before
            listing.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setBulkModalOpen(true)}
            className="shadow-xs flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-[#161b26] dark:text-slate-200 dark:hover:bg-white/10 cursor-pointer"
          >
            <Upload className="h-3.5 w-3.5 text-slate-400" />
            <span>Bulk CSV</span>
          </button>

          <button
            onClick={() => router.push('/compare')}
            className="shadow-xs flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-[#161b26] dark:text-slate-200 dark:hover:bg-white/10 cursor-pointer"
          >
            <Scale className="h-3.5 w-3.5 text-slate-400" />
            <span>Compare SKUs</span>
          </button>

          <button
            onClick={handleSaveToAuditHistory}
            className="shadow-xs flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700 dark:border-slate-800 dark:bg-[#161b26] dark:text-slate-200 dark:hover:text-[#4ade80] cursor-pointer"
          >
            {savedSuccess ? (
              <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-[#4ade80]" />
            ) : (
              <Save className="h-3.5 w-3.5" />
            )}
            <span>{savedSuccess ? 'Saved to Audit!' : 'Save Calculation'}</span>
          </button>

          <button
            onClick={handleCopySummary}
            className="shadow-xs flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-[#161b26] dark:text-slate-200 dark:hover:bg-white/10 cursor-pointer"
          >
            {copySuccess ? (
              <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-[#4ade80]" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            <span>{copySuccess ? 'Copied!' : 'Copy Summary'}</span>
          </button>

          <button
            onClick={handleSendToAIListing}
            className="flex items-center gap-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 px-4 py-2 text-xs font-bold text-white shadow-sm transition-all cursor-pointer"
          >
            <Tag className="h-3.5 w-3.5" />
            <span>Create TikTok Listing</span>
          </button>
        </div>
      </div>

      {/* Preset Quick Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="shrink-0 text-xs font-bold uppercase text-slate-400 dark:text-slate-500">
          Quick Presets:
        </span>
        {PRESET_TEMPLATES.map((tmpl) => (
          <button
            key={tmpl.name}
            onClick={() => handleApplyPreset(tmpl)}
            className="shadow-2xs whitespace-nowrap rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:border-lime-500 hover:text-lime-600 dark:border-slate-800 dark:bg-[#121620] dark:text-slate-300 dark:hover:text-[#4ade80]"
          >
            ⚡ {tmpl.name} (${tmpl.price})
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Calculator Inputs (7 cols) */}
        <div className="space-y-5 lg:col-span-7">
          <div className="shadow-xs space-y-5 rounded-3xl border border-slate-200/80 bg-white p-6 dark:border-slate-800/80 dark:bg-[#121620]">
            <div className="border-b border-slate-100 pb-3 dark:border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                1. Product & Pricing Strategy
              </h3>
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300">
                Product Title / SKU Identifier
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-bold text-slate-900 focus:border-lime-500 focus:outline-none dark:border-slate-800 dark:bg-[#0f1117] dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Selling Price ($)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-sm font-bold text-slate-400">
                    $
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)}
                    className="font-mono-numeric w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-8 pr-3 text-sm font-black text-slate-900 focus:border-lime-500 focus:outline-none dark:border-slate-800 dark:bg-[#0f1117] dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Product Cost (COGS) ($)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-sm font-bold text-slate-400">
                    $
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    value={cogs}
                    onChange={(e) => setCogs(parseFloat(e.target.value) || 0)}
                    className="font-mono-numeric w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-8 pr-3 text-sm font-black text-slate-900 focus:border-lime-500 focus:outline-none dark:border-slate-800 dark:bg-[#0f1117] dark:text-white"
                  />
                </div>
              </div>
            </div>

            <div className="border-b border-slate-100 pb-3 pt-2 dark:border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                2. Shipping & Packaging
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Shipping Cost ($)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-sm font-bold text-slate-400">
                    $
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    value={shippingCost}
                    onChange={(e) => setShippingCost(parseFloat(e.target.value) || 0)}
                    className="font-mono-numeric w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-8 pr-3 text-sm font-semibold text-slate-800 dark:border-slate-800 dark:bg-[#0f1117] dark:text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Packaging / Prep ($)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-sm font-bold text-slate-400">
                    $
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    value={packagingCost}
                    onChange={(e) => setPackagingCost(parseFloat(e.target.value) || 0)}
                    className="font-mono-numeric w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-8 pr-3 text-sm font-semibold text-slate-800 dark:border-slate-800 dark:bg-[#0f1117] dark:text-slate-200"
                  />
                </div>
              </div>
            </div>

            <div className="border-b border-slate-100 pb-3 pt-2 dark:border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                3. TikTok Platform & Creator Affiliate
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300">
                  TikTok Fee (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={tiktokFeePercent}
                  onChange={(e) => setTiktokFeePercent(parseFloat(e.target.value) || 0)}
                  className="font-mono-numeric w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-800 dark:border-slate-800 dark:bg-[#0f1117] dark:text-slate-200"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Payment Fee (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={paymentFeePercent}
                  onChange={(e) => setPaymentFeePercent(parseFloat(e.target.value) || 0)}
                  className="font-mono-numeric w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-800 dark:border-slate-800 dark:bg-[#0f1117] dark:text-slate-200"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Affiliate Rate (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={affiliatePercent}
                  onChange={(e) => setAffiliatePercent(parseFloat(e.target.value) || 0)}
                  className="font-mono-numeric w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-800 dark:border-slate-800 dark:bg-[#0f1117] dark:text-slate-200"
                />
              </div>
            </div>

            <div className="border-b border-slate-100 pb-3 pt-2 dark:border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                4. TikTok Ads CPA & Target Margin
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300">
                  TikTok Ads CPA ($)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={adCpa}
                  onChange={(e) => setAdCpa(parseFloat(e.target.value) || 0)}
                  className="font-mono-numeric w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-bold text-purple-600 dark:border-slate-800 dark:bg-[#0f1117] dark:text-[#c084fc]"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Overhead ($)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={otherExpenses}
                  onChange={(e) => setOtherExpenses(parseFloat(e.target.value) || 0)}
                  className="font-mono-numeric w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-800 dark:border-slate-800 dark:bg-[#0f1117] dark:text-slate-200"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Target Margin (%)
                </label>
                <input
                  type="number"
                  step="1"
                  value={targetMarginPercent}
                  onChange={(e) => setTargetMarginPercent(parseFloat(e.target.value) || 0)}
                  className="font-mono-numeric w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-bold text-amber-600 dark:border-slate-800 dark:bg-[#0f1117] dark:text-[#fb923c]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Output Cards & Unit Economics (5 cols) */}
        <div className="space-y-5 lg:col-span-5">
          {/* Main Profit Card */}
          <div className="shadow-xs space-y-4 rounded-3xl border border-slate-200/80 bg-white p-6 dark:border-slate-800/80 dark:bg-[#121620]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Unit Profitability
              </span>
              <span
                className={cn(
                  'rounded-full px-2.5 py-0.5 text-xs font-bold',
                  isProfitable
                    ? 'border border-emerald-200/60 bg-emerald-50 text-emerald-700 dark:border-emerald-800/60 dark:bg-emerald-950/60 dark:text-[#4ade80]'
                    : 'border border-rose-200/60 bg-rose-50 text-rose-700 dark:border-rose-800/60 dark:bg-rose-950/60 dark:text-rose-300',
                )}
              >
                {isProfitable ? '✅ Profitable Unit' : '⚠️ Negative Unit'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="shadow-2xs rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-[#161b26]">
                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                  Net Profit / Order
                </p>
                <p
                  className={cn(
                    'font-mono-numeric mt-1 text-2xl font-black sm:text-3xl',
                    isProfitable
                      ? 'text-emerald-600 dark:text-[#4ade80]'
                      : 'text-rose-600 dark:text-rose-400',
                  )}
                >
                  {formatCurrency(results.netProfit)}
                </p>
              </div>

              <div className="shadow-2xs rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-[#161b26]">
                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                  Profit Margin
                </p>
                <p className="font-mono-numeric mt-1 text-2xl font-black text-slate-900 dark:text-slate-50 sm:text-3xl">
                  {formatPercent(results.profitMargin)}
                </p>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-2 rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 text-xs font-medium dark:border-slate-800 dark:bg-[#0f1117]/60">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Product COGS:</span>
                <span className="font-mono-numeric font-bold text-slate-900 dark:text-white">
                  {formatCurrency(results.cogs)}
                </span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Shipping & Packaging:</span>
                <span className="font-mono-numeric font-bold text-slate-900 dark:text-white">
                  {formatCurrency(results.shipping + results.packaging)}
                </span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>TikTok Shop Fee ({tiktokFeePercent}%):</span>
                <span className="font-mono-numeric font-bold text-slate-900 dark:text-white">
                  {formatCurrency(results.tiktokFee)}
                </span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Payment Processing Fee:</span>
                <span className="font-mono-numeric font-bold text-slate-900 dark:text-white">
                  {formatCurrency(results.paymentFee)}
                </span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Affiliate Commission ({affiliatePercent}%):</span>
                <span className="font-mono-numeric font-bold text-slate-900 dark:text-white">
                  {formatCurrency(results.affiliateCommission)}
                </span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>TikTok Ads CPA:</span>
                <span className="font-mono-numeric font-bold text-purple-600 dark:text-[#c084fc]">
                  {formatCurrency(results.adCpa)}
                </span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 text-sm font-bold text-slate-900 dark:border-slate-800 dark:text-white">
                <span>Total Unit Cost:</span>
                <span className="font-mono-numeric text-rose-600 dark:text-rose-400">
                  {formatCurrency(results.totalCost)}
                </span>
              </div>
            </div>

            {/* Strategic Pricing Insights */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center justify-between rounded-2xl border border-blue-100 bg-blue-50/70 p-3 text-xs dark:border-blue-900/40 dark:bg-blue-950/40">
                <div>
                  <p className="font-bold text-blue-900 dark:text-blue-200">
                    Break-Even Selling Price
                  </p>
                  <p className="text-[11px] text-blue-600 dark:text-blue-400">
                    Zero profit / loss floor
                  </p>
                </div>
                <span className="font-mono-numeric text-base font-black text-blue-900 dark:text-blue-100">
                  {formatCurrency(results.breakEvenPrice)}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-purple-100 bg-purple-50/70 p-3 text-xs dark:border-purple-900/40 dark:bg-purple-950/40">
                <div>
                  <p className="font-bold text-purple-900 dark:text-purple-200">
                    Max Allowable TikTok Ads CPA
                  </p>
                  <p className="text-[11px] text-purple-600 dark:text-purple-400">
                    Highest ad spend before loss
                  </p>
                </div>
                <span className="font-mono-numeric text-base font-black text-purple-900 dark:text-purple-100">
                  {formatCurrency(results.maxAllowableCpa)}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-lime-200 bg-lime-50/70 p-3 text-xs dark:border-lime-900/40 dark:bg-lime-950/40">
                <div>
                  <p className="font-bold text-lime-950 dark:text-lime-200">
                    Recommended Price ({targetMarginPercent}% Margin)
                  </p>
                  <p className="text-[11px] text-lime-700 dark:text-lime-400">
                    Optimal target pricing
                  </p>
                </div>
                <span className="font-mono-numeric text-base font-black text-lime-900 dark:text-[#4ade80]">
                  {formatCurrency(results.recommendedPrice)}
                </span>
              </div>
            </div>

            {/* Volume Projection */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-[#161b26]">
              <p className="mb-2 text-xs font-bold text-slate-900 dark:text-slate-100">
                Volume Profit Forecast
              </p>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-xl bg-slate-50 p-2 dark:bg-[#0f1117]">
                  <p className="font-semibold text-slate-400 dark:text-slate-500">100 Orders</p>
                  <p className="font-mono-numeric mt-0.5 font-black text-slate-900 dark:text-white">
                    {formatCurrency(results.netProfit * 100)}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 p-2 dark:bg-[#0f1117]">
                  <p className="font-semibold text-slate-400 dark:text-slate-500">500 Orders</p>
                  <p className="font-mono-numeric mt-0.5 font-black text-emerald-600 dark:text-[#4ade80]">
                    {formatCurrency(results.netProfit * 500)}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 p-2 dark:bg-[#0f1117]">
                  <p className="font-semibold text-slate-400 dark:text-slate-500">1,000 Orders</p>
                  <p className="font-mono-numeric mt-0.5 font-black text-emerald-600 dark:text-[#4ade80]">
                    {formatCurrency(results.netProfit * 1000)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <BulkUploadModal isOpen={bulkModalOpen} onClose={() => setBulkModalOpen(false)} />
      <ListingModal
        isOpen={listingModalOpen}
        onClose={() => setListingModalOpen(false)}
        initialProduct={{
          name: productName,
          sku: `SKU-${Date.now().toString().slice(-4)}`,
          category: 'Kitchen & Dining',
          sellingPrice,
        }}
      />
      <PdfReportModal isOpen={pdfModalOpen} onClose={() => setPdfModalOpen(false)} />
    </div>
  );
}

