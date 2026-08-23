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
} from 'lucide-react';
import { calculateUnitEconomics, formatCurrency, formatPercent } from '../../lib/utils';

export default function CalculatorPage() {
  const router = useRouter();

  // Inputs
  const [productName, setProductName] = useState('New Viral Product');
  const [sellingPrice, setSellingPrice] = useState<number>(39.99);
  const [cogs, setCogs] = useState<number>(9.50);
  const [shippingCost, setShippingCost] = useState<number>(4.20);
  const [packagingCost, setPackagingCost] = useState<number>(1.00);
  const [tiktokFeePercent, setTiktokFeePercent] = useState<number>(5.0); // 5% TikTok Shop fee
  const [paymentFeePercent, setPaymentFeePercent] = useState<number>(2.9); // 2.9%
  const [paymentFeeFixed, setPaymentFeeFixed] = useState<number>(0.30); // $0.30
  const [affiliatePercent, setAffiliatePercent] = useState<number>(10.0); // 10%
  const [adCpa, setAdCpa] = useState<number>(8.50); // $8.50 per order
  const [otherExpenses, setOtherExpenses] = useState<number>(0.50);
  const [targetMarginPercent, setTargetMarginPercent] = useState<number>(40.0); // 40% target

  // Presets / Saved calculations
  const [savedList, setSavedList] = useState<Array<{ id: string; name: string; price: number; profit: number; margin: number }>>([
    { id: '1', name: 'Portable Blender', price: 38.90, profit: 15.75, margin: 40.5 },
    { id: '2', name: 'LED Sunset Lamp', price: 24.99, profit: 9.80, margin: 39.2 },
    { id: '3', name: 'Hair Scalp Massager', price: 29.90, profit: 12.40, margin: 41.5 },
  ]);
  const [savedSuccess, setSavedSuccess] = useState(false);

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

  const handleSaveCalculation = () => {
    setSavedList([
      {
        id: Date.now().toString(),
        name: productName || 'Untitled Product',
        price: sellingPrice,
        profit: results.netProfit,
        margin: results.profitMargin,
      },
      ...savedList,
    ]);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
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
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">TikTok Shop Profit Margin Calculator</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Simulate true unit economics, break-even price, and target profit margins before listing.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSaveCalculation}
            className="flex items-center gap-1.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#161b22] px-3.5 py-2 text-xs font-bold text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-white/10"
          >
            {savedSuccess ? <Check className="h-4 w-4 text-emerald-600 dark:text-[#4ade80]" /> : <Save className="h-4 w-4" />}
            <span>{savedSuccess ? 'Saved!' : 'Save Preset'}</span>
          </button>
          <button
            onClick={handleSendToAIListing}
            className="flex items-center gap-1.5 rounded-xl bg-[#84cc16] px-4 py-2 text-xs font-bold text-black shadow-sm hover:bg-[#72b012]"
          >
            <Sparkles className="h-4 w-4" />
            <span>Generate AI Listing from Calc</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Calculator Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="rounded-3xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#151b26] p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              1. Product & Pricing Strategy
            </h3>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Product Title / Test Name</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f1117] px-3.5 py-2.5 text-sm font-bold text-gray-900 dark:text-white focus:border-lime-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Selling Price ($)</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-sm font-bold text-gray-400">$</span>
                  <input
                    type="number"
                    step="0.01"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)}
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f1117] pl-8 pr-3 py-2.5 text-sm font-black text-gray-900 dark:text-white focus:border-lime-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Product Cost (COGS) ($)</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-sm font-bold text-gray-400">$</span>
                  <input
                    type="number"
                    step="0.01"
                    value={cogs}
                    onChange={(e) => setCogs(parseFloat(e.target.value) || 0)}
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f1117] pl-8 pr-3 py-2.5 text-sm font-black text-gray-900 dark:text-white focus:border-lime-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 pt-2">
              2. Shipping & Handling
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Shipping Cost ($)</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-sm font-bold text-gray-400">$</span>
                  <input
                    type="number"
                    step="0.01"
                    value={shippingCost}
                    onChange={(e) => setShippingCost(parseFloat(e.target.value) || 0)}
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f1117] pl-8 pr-3 py-2.5 text-sm font-semibold text-gray-800 dark:text-gray-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Packaging / Prep ($)</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-sm font-bold text-gray-400">$</span>
                  <input
                    type="number"
                    step="0.01"
                    value={packagingCost}
                    onChange={(e) => setPackagingCost(parseFloat(e.target.value) || 0)}
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f1117] pl-8 pr-3 py-2.5 text-sm font-semibold text-gray-800 dark:text-gray-200"
                  />
                </div>
              </div>
            </div>

            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 pt-2">
              3. TikTok Platform & Affiliate Fees
            </h3>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">TikTok Fee (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={tiktokFeePercent}
                  onChange={(e) => setTiktokFeePercent(parseFloat(e.target.value) || 0)}
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f1117] px-3 py-2.5 text-sm font-semibold text-gray-800 dark:text-gray-200"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Payment Fee (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={paymentFeePercent}
                  onChange={(e) => setPaymentFeePercent(parseFloat(e.target.value) || 0)}
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f1117] px-3 py-2.5 text-sm font-semibold text-gray-800 dark:text-gray-200"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Affiliate Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={affiliatePercent}
                  onChange={(e) => setAffiliatePercent(parseFloat(e.target.value) || 0)}
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f1117] px-3 py-2.5 text-sm font-semibold text-gray-800 dark:text-gray-200"
                />
              </div>
            </div>

            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 pt-2">
              4. TikTok Ads & Overheads
            </h3>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">TikTok Ads CPA ($)</label>
                <input
                  type="number"
                  step="0.1"
                  value={adCpa}
                  onChange={(e) => setAdCpa(parseFloat(e.target.value) || 0)}
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f1117] px-3 py-2.5 text-sm font-bold text-purple-700 dark:text-purple-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Overhead / Unit ($)</label>
                <input
                  type="number"
                  step="0.1"
                  value={otherExpenses}
                  onChange={(e) => setOtherExpenses(parseFloat(e.target.value) || 0)}
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f1117] px-3 py-2.5 text-sm font-semibold text-gray-800 dark:text-gray-200"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Target Margin (%)</label>
                <input
                  type="number"
                  step="1"
                  value={targetMarginPercent}
                  onChange={(e) => setTargetMarginPercent(parseFloat(e.target.value) || 0)}
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f1117] px-3 py-2.5 text-sm font-bold text-amber-700 dark:text-amber-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Output Cards & Unit Economics (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Main Profit Card */}
          <div className="rounded-3xl border border-gray-200/80 dark:border-gray-800 bg-gradient-to-br from-white to-gray-50 dark:from-[#151b26] dark:to-[#0f1117] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Unit Profitability</span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                  isProfitable ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-[#4ade80] border border-emerald-200/60 dark:border-emerald-800/60' : 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300'
                }`}
              >
                {isProfitable ? '✅ Profitable Unit' : '⚠️ Negative Unit'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white dark:bg-[#161b22] p-4 border border-gray-100 dark:border-gray-800 shadow-xs">
                <p className="text-xs font-semibold text-gray-400 dark:text-gray-500">Net Profit / Order</p>
                <p
                  className={`text-2xl sm:text-3xl font-black mt-1 ${
                    isProfitable ? 'text-[#22c55e] dark:text-[#4ade80]' : 'text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {formatCurrency(results.netProfit)}
                </p>
              </div>

              <div className="rounded-2xl bg-white dark:bg-[#161b22] p-4 border border-gray-100 dark:border-gray-800 shadow-xs">
                <p className="text-xs font-semibold text-gray-400 dark:text-gray-500">Profit Margin</p>
                <p className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mt-1">
                  {formatPercent(results.profitMargin)}
                </p>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="rounded-2xl bg-gray-50 dark:bg-[#0f1117]/60 p-3.5 space-y-2 text-xs border border-gray-100 dark:border-gray-800 font-medium">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Product COGS:</span>
                <span className="font-bold text-gray-900 dark:text-white">{formatCurrency(results.cogs)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Shipping & Packaging:</span>
                <span className="font-bold text-gray-900 dark:text-white">{formatCurrency(results.shipping + results.packaging)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>TikTok Shop Fee ({tiktokFeePercent}%):</span>
                <span className="font-bold text-gray-900 dark:text-white">{formatCurrency(results.tiktokFee)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Payment Processing Fee:</span>
                <span className="font-bold text-gray-900 dark:text-white">{formatCurrency(results.paymentFee)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Affiliate Commission ({affiliatePercent}%):</span>
                <span className="font-bold text-gray-900 dark:text-white">{formatCurrency(results.affiliateCommission)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>TikTok Ads CPA:</span>
                <span className="font-bold text-purple-700 dark:text-purple-300">{formatCurrency(results.adCpa)}</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-800 pt-2 flex justify-between font-bold text-gray-900 dark:text-white text-sm">
                <span>Total Unit Cost:</span>
                <span className="text-rose-600 dark:text-rose-400">{formatCurrency(results.totalCost)}</span>
              </div>
            </div>

            {/* Strategic Pricing Insights */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center justify-between rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 p-3 text-xs border border-blue-100 dark:border-blue-900/40">
                <div>
                  <p className="font-bold text-blue-900 dark:text-blue-200">Break-Even Selling Price</p>
                  <p className="text-[11px] text-blue-600 dark:text-blue-400">Zero profit / loss floor</p>
                </div>
                <span className="text-base font-black text-blue-900 dark:text-blue-100">{formatCurrency(results.breakEvenPrice)}</span>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-purple-50/70 dark:bg-purple-950/40 p-3 text-xs border border-purple-100 dark:border-purple-900/40">
                <div>
                  <p className="font-bold text-purple-900 dark:text-purple-200">Max Allowable TikTok Ads CPA</p>
                  <p className="text-[11px] text-purple-600 dark:text-purple-400">Highest ad spend before loss</p>
                </div>
                <span className="text-base font-black text-purple-900 dark:text-purple-100">{formatCurrency(results.maxAllowableCpa)}</span>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-lime-50/70 dark:bg-lime-950/40 p-3 text-xs border border-lime-200 dark:border-lime-900/40">
                <div>
                  <p className="font-bold text-lime-950 dark:text-lime-200">Recommended Price ({targetMarginPercent}% Margin)</p>
                  <p className="text-[11px] text-lime-700 dark:text-lime-400">Optimal target pricing</p>
                </div>
                <span className="text-base font-black text-lime-900 dark:text-[#4ade80]">{formatCurrency(results.recommendedPrice)}</span>
              </div>
            </div>

            {/* Volume Projection */}
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#161b22] p-4">
              <p className="text-xs font-bold text-gray-900 dark:text-white mb-2">Volume Profit Forecast</p>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-xl bg-gray-50 dark:bg-[#0f1117] p-2">
                  <p className="font-semibold text-gray-400 dark:text-gray-500">100 Orders</p>
                  <p className="font-black text-gray-900 dark:text-white mt-0.5">{formatCurrency(results.netProfit * 100)}</p>
                </div>
                <div className="rounded-xl bg-gray-50 dark:bg-[#0f1117] p-2">
                  <p className="font-semibold text-gray-400 dark:text-gray-500">500 Orders</p>
                  <p className="font-black text-[#22c55e] dark:text-[#4ade80] mt-0.5">{formatCurrency(results.netProfit * 500)}</p>
                </div>
                <div className="rounded-xl bg-gray-50 dark:bg-[#0f1117] p-2">
                  <p className="font-semibold text-gray-400 dark:text-gray-500">1,000 Orders</p>
                  <p className="font-black text-[#22c55e] dark:text-[#4ade80] mt-0.5">{formatCurrency(results.netProfit * 1000)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
