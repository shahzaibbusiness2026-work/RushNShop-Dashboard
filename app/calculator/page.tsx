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
} from 'lucide-react';
import { calculateUnitEconomics, formatCurrency, formatPercent, cn } from '../../lib/utils';

const PRESET_TEMPLATES = [
  {
    name: 'Viral Beauty Serum',
    price: 34.99,
    cogs: 6.50,
    shipping: 3.80,
    packaging: 0.90,
    tiktokFee: 5.0,
    paymentFee: 2.9,
    affiliate: 15.0,
    adCpa: 7.50,
    overhead: 0.50,
    targetMargin: 40.0,
  },
  {
    name: 'Kitchen Veggie Chopper',
    price: 29.99,
    cogs: 5.20,
    shipping: 4.50,
    packaging: 1.10,
    tiktokFee: 5.0,
    paymentFee: 2.9,
    affiliate: 10.0,
    adCpa: 6.80,
    overhead: 0.40,
    targetMargin: 38.0,
  },
  {
    name: 'Sunset Ambient Lamp',
    price: 24.99,
    cogs: 4.10,
    shipping: 3.90,
    packaging: 0.80,
    tiktokFee: 5.0,
    paymentFee: 2.9,
    affiliate: 12.0,
    adCpa: 5.50,
    overhead: 0.30,
    targetMargin: 42.0,
  },
  {
    name: 'High-Ticket Massage Gun',
    price: 79.99,
    cogs: 18.50,
    shipping: 7.20,
    packaging: 2.20,
    tiktokFee: 5.0,
    paymentFee: 2.9,
    affiliate: 10.0,
    adCpa: 16.50,
    overhead: 1.50,
    targetMargin: 35.0,
  },
];

export default function CalculatorPage() {
  const router = useRouter();

  // Inputs
  const [productName, setProductName] = useState('New Viral Product');
  const [sellingPrice, setSellingPrice] = useState<number>(39.99);
  const [cogs, setCogs] = useState<number>(9.50);
  const [shippingCost, setShippingCost] = useState<number>(4.20);
  const [packagingCost, setPackagingCost] = useState<number>(1.00);
  const [tiktokFeePercent, setTiktokFeePercent] = useState<number>(5.0);
  const [paymentFeePercent, setPaymentFeePercent] = useState<number>(2.9);
  const [paymentFeeFixed, setPaymentFeeFixed] = useState<number>(0.30);
  const [affiliatePercent, setAffiliatePercent] = useState<number>(10.0);
  const [adCpa, setAdCpa] = useState<number>(8.50);
  const [otherExpenses, setOtherExpenses] = useState<number>(0.50);
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

  const handleApplyPreset = (preset: typeof PRESET_TEMPLATES[0]) => {
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
    sessionStorage.setItem(
      'rush_calculator_export',
      JSON.stringify({
        productName,
        sellingPrice,
        cogs,
        netProfit: results.netProfit,
        profitMargin: results.profitMargin,
      })
    );
    router.push('/ai-assistant');
  };

  const isProfitable = results.netProfit > 0;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">TikTok Shop Profit Margin Calculator</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Simulate true unit economics, break-even price floor, and target profit margins before listing.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleCopySummary}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161b26] px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-xs hover:bg-slate-50 dark:hover:bg-white/10 transition-colors"
          >
            {copySuccess ? <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-[#4ade80]" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copySuccess ? 'Copied Summary!' : 'Copy Report'}</span>
          </button>

          <button
            onClick={handleSendToAIListing}
            className="flex items-center gap-1.5 rounded-xl bg-[#84cc16] px-4 py-2 text-xs font-bold text-black shadow-sm hover:bg-[#72b012] transition-all hover:scale-[1.02]"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Generate AI Listing</span>
          </button>
        </div>
      </div>

      {/* Preset Quick Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase shrink-0">Quick Presets:</span>
        {PRESET_TEMPLATES.map((tmpl) => (
          <button
            key={tmpl.name}
            onClick={() => handleApplyPreset(tmpl)}
            className="whitespace-nowrap rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121620] px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-lime-500 hover:text-lime-600 dark:hover:text-[#4ade80] transition-colors shadow-2xs"
          >
            ⚡ {tmpl.name} (${tmpl.price})
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Calculator Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#121620] p-6 shadow-xs space-y-5">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                1. Product & Pricing Strategy
              </h3>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Product Title / SKU Identifier</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1117] px-3.5 py-2.5 text-sm font-bold text-slate-900 dark:text-white focus:border-lime-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Selling Price ($)</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-sm font-bold text-slate-400">$</span>
                  <input
                    type="number"
                    step="0.01"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1117] pl-8 pr-3 py-2.5 text-sm font-black text-slate-900 dark:text-white focus:border-lime-500 focus:outline-none font-mono-numeric"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Product Cost (COGS) ($)</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-sm font-bold text-slate-400">$</span>
                  <input
                    type="number"
                    step="0.01"
                    value={cogs}
                    onChange={(e) => setCogs(parseFloat(e.target.value) || 0)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1117] pl-8 pr-3 py-2.5 text-sm font-black text-slate-900 dark:text-white focus:border-lime-500 focus:outline-none font-mono-numeric"
                  />
                </div>
              </div>
            </div>

            <div className="border-b border-slate-100 dark:border-slate-800 pb-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                2. Shipping & Packaging
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Shipping Cost ($)</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-sm font-bold text-slate-400">$</span>
                  <input
                    type="number"
                    step="0.01"
                    value={shippingCost}
                    onChange={(e) => setShippingCost(parseFloat(e.target.value) || 0)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1117] pl-8 pr-3 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-200 font-mono-numeric"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Packaging / Prep ($)</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-sm font-bold text-slate-400">$</span>
                  <input
                    type="number"
                    step="0.01"
                    value={packagingCost}
                    onChange={(e) => setPackagingCost(parseFloat(e.target.value) || 0)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1117] pl-8 pr-3 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-200 font-mono-numeric"
                  />
                </div>
              </div>
            </div>

            <div className="border-b border-slate-100 dark:border-slate-800 pb-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                3. TikTok Platform & Creator Affiliate
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">TikTok Fee (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={tiktokFeePercent}
                  onChange={(e) => setTiktokFeePercent(parseFloat(e.target.value) || 0)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1117] px-3 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-200 font-mono-numeric"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Payment Fee (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={paymentFeePercent}
                  onChange={(e) => setPaymentFeePercent(parseFloat(e.target.value) || 0)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1117] px-3 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-200 font-mono-numeric"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Affiliate Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={affiliatePercent}
                  onChange={(e) => setAffiliatePercent(parseFloat(e.target.value) || 0)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1117] px-3 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-200 font-mono-numeric"
                />
              </div>
            </div>

            <div className="border-b border-slate-100 dark:border-slate-800 pb-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                4. TikTok Ads CPA & Target Margin
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">TikTok Ads CPA ($)</label>
                <input
                  type="number"
                  step="0.1"
                  value={adCpa}
                  onChange={(e) => setAdCpa(parseFloat(e.target.value) || 0)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1117] px-3 py-2.5 text-sm font-bold text-purple-600 dark:text-[#c084fc] font-mono-numeric"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Overhead ($)</label>
                <input
                  type="number"
                  step="0.1"
                  value={otherExpenses}
                  onChange={(e) => setOtherExpenses(parseFloat(e.target.value) || 0)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1117] px-3 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-200 font-mono-numeric"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Target Margin (%)</label>
                <input
                  type="number"
                  step="1"
                  value={targetMarginPercent}
                  onChange={(e) => setTargetMarginPercent(parseFloat(e.target.value) || 0)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1117] px-3 py-2.5 text-sm font-bold text-amber-600 dark:text-[#fb923c] font-mono-numeric"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Output Cards & Unit Economics (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Main Profit Card */}
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#121620] p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Unit Profitability</span>
              <span
                className={cn(
                  'rounded-full px-2.5 py-0.5 text-xs font-bold',
                  isProfitable
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-[#4ade80] border border-emerald-200/60 dark:border-emerald-800/60'
                    : 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200/60 dark:border-rose-800/60'
                )}
              >
                {isProfitable ? '✅ Profitable Unit' : '⚠️ Negative Unit'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-slate-50 dark:bg-[#161b26] p-4 border border-slate-100 dark:border-slate-800 shadow-2xs">
                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500">Net Profit / Order</p>
                <p
                  className={cn(
                    'text-2xl sm:text-3xl font-black mt-1 font-mono-numeric',
                    isProfitable ? 'text-emerald-600 dark:text-[#4ade80]' : 'text-rose-600 dark:text-rose-400'
                  )}
                >
                  {formatCurrency(results.netProfit)}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 dark:bg-[#161b26] p-4 border border-slate-100 dark:border-slate-800 shadow-2xs">
                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500">Profit Margin</p>
                <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-50 mt-1 font-mono-numeric">
                  {formatPercent(results.profitMargin)}
                </p>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="rounded-2xl bg-slate-50/70 dark:bg-[#0f1117]/60 p-3.5 space-y-2 text-xs border border-slate-100 dark:border-slate-800 font-medium">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Product COGS:</span>
                <span className="font-bold text-slate-900 dark:text-white font-mono-numeric">{formatCurrency(results.cogs)}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Shipping & Packaging:</span>
                <span className="font-bold text-slate-900 dark:text-white font-mono-numeric">{formatCurrency(results.shipping + results.packaging)}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>TikTok Shop Fee ({tiktokFeePercent}%):</span>
                <span className="font-bold text-slate-900 dark:text-white font-mono-numeric">{formatCurrency(results.tiktokFee)}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Payment Processing Fee:</span>
                <span className="font-bold text-slate-900 dark:text-white font-mono-numeric">{formatCurrency(results.paymentFee)}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Affiliate Commission ({affiliatePercent}%):</span>
                <span className="font-bold text-slate-900 dark:text-white font-mono-numeric">{formatCurrency(results.affiliateCommission)}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>TikTok Ads CPA:</span>
                <span className="font-bold text-purple-600 dark:text-[#c084fc] font-mono-numeric">{formatCurrency(results.adCpa)}</span>
              </div>
              <div className="border-t border-slate-200 dark:border-slate-800 pt-2 flex justify-between font-bold text-slate-900 dark:text-white text-sm">
                <span>Total Unit Cost:</span>
                <span className="text-rose-600 dark:text-rose-400 font-mono-numeric">{formatCurrency(results.totalCost)}</span>
              </div>
            </div>

            {/* Strategic Pricing Insights */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center justify-between rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 p-3 text-xs border border-blue-100 dark:border-blue-900/40">
                <div>
                  <p className="font-bold text-blue-900 dark:text-blue-200">Break-Even Selling Price</p>
                  <p className="text-[11px] text-blue-600 dark:text-blue-400">Zero profit / loss floor</p>
                </div>
                <span className="text-base font-black text-blue-900 dark:text-blue-100 font-mono-numeric">{formatCurrency(results.breakEvenPrice)}</span>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-purple-50/70 dark:bg-purple-950/40 p-3 text-xs border border-purple-100 dark:border-purple-900/40">
                <div>
                  <p className="font-bold text-purple-900 dark:text-purple-200">Max Allowable TikTok Ads CPA</p>
                  <p className="text-[11px] text-purple-600 dark:text-purple-400">Highest ad spend before loss</p>
                </div>
                <span className="text-base font-black text-purple-900 dark:text-purple-100 font-mono-numeric">{formatCurrency(results.maxAllowableCpa)}</span>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-lime-50/70 dark:bg-lime-950/40 p-3 text-xs border border-lime-200 dark:border-lime-900/40">
                <div>
                  <p className="font-bold text-lime-950 dark:text-lime-200">Recommended Price ({targetMarginPercent}% Margin)</p>
                  <p className="text-[11px] text-lime-700 dark:text-lime-400">Optimal target pricing</p>
                </div>
                <span className="text-base font-black text-lime-900 dark:text-[#4ade80] font-mono-numeric">{formatCurrency(results.recommendedPrice)}</span>
              </div>
            </div>

            {/* Volume Projection */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161b26] p-4">
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100 mb-2">Volume Profit Forecast</p>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-xl bg-slate-50 dark:bg-[#0f1117] p-2">
                  <p className="font-semibold text-slate-400 dark:text-slate-500">100 Orders</p>
                  <p className="font-black text-slate-900 dark:text-white mt-0.5 font-mono-numeric">{formatCurrency(results.netProfit * 100)}</p>
                </div>
                <div className="rounded-xl bg-slate-50 dark:bg-[#0f1117] p-2">
                  <p className="font-semibold text-slate-400 dark:text-slate-500">500 Orders</p>
                  <p className="font-black text-emerald-600 dark:text-[#4ade80] mt-0.5 font-mono-numeric">{formatCurrency(results.netProfit * 500)}</p>
                </div>
                <div className="rounded-xl bg-slate-50 dark:bg-[#0f1117] p-2">
                  <p className="font-semibold text-slate-400 dark:text-slate-500">1,000 Orders</p>
                  <p className="font-black text-emerald-600 dark:text-[#4ade80] mt-0.5 font-mono-numeric">{formatCurrency(results.netProfit * 1000)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
