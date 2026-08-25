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
  Truck,
  Package,
  Ship,
  Layers,
  Info,
  ShieldCheck,
  Flame,
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
    shipmentCharges: 1.2, // Inbound freight
    shippingCost: 3.5, // Outbound customer courier
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
    shipmentCharges: 1.8,
    shippingCost: 4.2,
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
    shipmentCharges: 1.5,
    shippingCost: 3.8,
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
    shipmentCharges: 3.5,
    shippingCost: 6.5,
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
  const [productName, setProductName] = useState('New Viral TikTok Product');
  const [sellingPrice, setSellingPrice] = useState<number>(39.99);
  const [cogs, setCogs] = useState<number>(9.5);
  const [shipmentCharges, setShipmentCharges] = useState<number>(1.5); // Inbound supplier/freight
  const [shippingCost, setShippingCost] = useState<number>(3.8); // Outbound 3PL customer delivery
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
    shipmentCharges,
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

  const totalLogistics = shipmentCharges + shippingCost + packagingCost;

  const handleApplyPreset = (preset: (typeof PRESET_TEMPLATES)[0]) => {
    setProductName(preset.name);
    setSellingPrice(preset.price);
    setCogs(preset.cogs);
    setShipmentCharges(preset.shipmentCharges);
    setShippingCost(preset.shippingCost);
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
      shippingCost: shipmentCharges + shippingCost,
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
• Inbound Shipment Charges (Freight): ${formatCurrency(shipmentCharges)}
• Outbound Shipping Cost (Customer Delivery): ${formatCurrency(shippingCost)}
• Packaging & Prep: ${formatCurrency(packagingCost)}
• TikTok Shop Platform Fee (${tiktokFeePercent}%): ${formatCurrency(results.tiktokFee)}
• Payment Processing Fee: ${formatCurrency(results.paymentFee)}
• Creator Affiliate Commission (${affiliatePercent}%): ${formatCurrency(results.affiliateCommission)}
• TikTok Ads Target CPA: ${formatCurrency(adCpa)}
• Operating Overhead: ${formatCurrency(otherExpenses)}
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

  const isProfitable = results.netProfit > 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-lime-500/10 text-[#84cc16] border border-lime-500/20 shadow-xs">
              <Calculator className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Unit Economics & Margin Studio
                </h1>
                <span className="rounded-full border border-lime-500/30 bg-lime-500/10 px-2.5 py-0.5 text-[11px] font-bold text-lime-700 dark:text-[#84cc16]">
                  v2.0 Pro
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                Accurately simulate inbound freight shipment charges, customer delivery shipping, TikTok fees, and net profit margins.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setBulkModalOpen(true)}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-2xs transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-[#161b26] dark:text-slate-200 dark:hover:bg-white/10 cursor-pointer"
          >
            <Upload className="h-3.5 w-3.5 text-slate-400" />
            <span>Bulk CSV</span>
          </button>

          <button
            onClick={() => router.push('/compare')}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-2xs transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-[#161b26] dark:text-slate-200 dark:hover:bg-white/10 cursor-pointer"
          >
            <Scale className="h-3.5 w-3.5 text-slate-400" />
            <span>Compare Matrix</span>
          </button>

          <button
            onClick={handleSaveToAuditHistory}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-2xs transition-all hover:bg-emerald-50 hover:text-emerald-700 dark:border-slate-800 dark:bg-[#161b26] dark:text-slate-200 dark:hover:text-[#4ade80] cursor-pointer"
          >
            {savedSuccess ? (
              <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-[#4ade80]" />
            ) : (
              <Save className="h-3.5 w-3.5" />
            )}
            <span>{savedSuccess ? 'Saved to Audit!' : 'Save Audit'}</span>
          </button>

          <button
            onClick={handleCopySummary}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-2xs transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-[#161b26] dark:text-slate-200 dark:hover:bg-white/10 cursor-pointer"
          >
            {copySuccess ? (
              <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-[#4ade80]" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            <span>{copySuccess ? 'Copied Report!' : 'Copy Summary'}</span>
          </button>

          <button
            onClick={() => setListingModalOpen(true)}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 px-4 py-2 text-xs font-bold text-white shadow-sm transition-all cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Create TikTok Listing</span>
          </button>
        </div>
      </div>

      {/* Preset Quick Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 dark-scrollbar">
        <span className="shrink-0 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          ⚡ Quick Presets:
        </span>
        {PRESET_TEMPLATES.map((tmpl) => (
          <button
            key={tmpl.name}
            onClick={() => handleApplyPreset(tmpl)}
            className="whitespace-nowrap rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs transition-all hover:border-[#84cc16] hover:text-lime-600 dark:border-slate-800 dark:bg-[#121620] dark:text-slate-300 dark:hover:border-[#84cc16] dark:hover:text-[#4ade80] cursor-pointer"
          >
            {tmpl.name} (${tmpl.price})
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Inputs (7 cols) */}
        <div className="space-y-5 lg:col-span-7">
          <div className="space-y-6 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800/80 dark:bg-[#121620]">
            
            {/* Section 1: Product & Pricing */}
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-400">
                  1. Product & Pricing Strategy
                </h3>
                <span className="text-[11px] font-bold text-slate-400">Base Unit Retail</span>
              </div>

              <div className="mt-4 space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Product Title / SKU Identifier
                  </label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-bold text-slate-900 transition-all focus:border-[#84cc16] focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-[#0b0e14] dark:text-white dark:focus:border-[#84cc16]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                      <span>Selling Price ($)</span>
                      <span className="text-[10px] text-slate-400">Customer checkout price</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-sm font-black text-slate-400">$</span>
                      <input
                        type="number"
                        step="0.01"
                        value={sellingPrice}
                        onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)}
                        className="font-mono-numeric w-full rounded-2xl border border-slate-200 bg-white py-2.5 pl-8 pr-3 text-sm font-black text-slate-900 transition-all focus:border-[#84cc16] focus:outline-none dark:border-slate-800 dark:bg-[#0b0e14] dark:text-white dark:focus:border-[#84cc16]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                      <span>Product Cost (COGS) ($)</span>
                      <span className="text-[10px] text-slate-400">Supplier factory cost</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-sm font-black text-slate-400">$</span>
                      <input
                        type="number"
                        step="0.01"
                        value={cogs}
                        onChange={(e) => setCogs(parseFloat(e.target.value) || 0)}
                        className="font-mono-numeric w-full rounded-2xl border border-slate-200 bg-white py-2.5 pl-8 pr-3 text-sm font-black text-slate-900 transition-all focus:border-[#84cc16] focus:outline-none dark:border-slate-800 dark:bg-[#0b0e14] dark:text-white dark:focus:border-[#84cc16]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Logistics, Shipment Charges & Shipping Cost */}
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-[#84cc16]" />
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                    2. Shipment Charges & Shipping Costs
                  </h3>
                </div>
                <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-[11px] font-mono-numeric font-bold text-slate-600 dark:text-slate-300">
                  Total Logistics: {formatCurrency(totalLogistics)}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Inbound Shipment Charges */}
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-3 dark:border-slate-800 dark:bg-[#161b26]/50">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Ship className="h-3.5 w-3.5 text-blue-500" />
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Shipment Charges ($)
                    </label>
                  </div>
                  <p className="text-[10px] text-slate-400 mb-2">Inbound factory freight & prep</p>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-xs font-bold text-slate-400">$</span>
                    <input
                      type="number"
                      step="0.01"
                      value={shipmentCharges}
                      onChange={(e) => setShipmentCharges(parseFloat(e.target.value) || 0)}
                      className="font-mono-numeric w-full rounded-xl border border-slate-200 bg-white py-2 pl-7 pr-2.5 text-xs font-bold text-slate-900 transition-all focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-[#0b0e14] dark:text-white"
                    />
                  </div>
                </div>

                {/* Outbound Customer Shipping Cost */}
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-3 dark:border-slate-800 dark:bg-[#161b26]/50">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Truck className="h-3.5 w-3.5 text-emerald-500" />
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Shipping Cost ($)
                    </label>
                  </div>
                  <p className="text-[10px] text-slate-400 mb-2">3PL courier customer delivery</p>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-xs font-bold text-slate-400">$</span>
                    <input
                      type="number"
                      step="0.01"
                      value={shippingCost}
                      onChange={(e) => setShippingCost(parseFloat(e.target.value) || 0)}
                      className="font-mono-numeric w-full rounded-xl border border-slate-200 bg-white py-2 pl-7 pr-2.5 text-xs font-bold text-slate-900 transition-all focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-[#0b0e14] dark:text-white"
                    />
                  </div>
                </div>

                {/* Packaging & Prep */}
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-3 dark:border-slate-800 dark:bg-[#161b26]/50">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Package className="h-3.5 w-3.5 text-amber-500" />
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Packaging / Prep ($)
                    </label>
                  </div>
                  <p className="text-[10px] text-slate-400 mb-2">Box, poly mailer, inserts</p>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-xs font-bold text-slate-400">$</span>
                    <input
                      type="number"
                      step="0.01"
                      value={packagingCost}
                      onChange={(e) => setPackagingCost(parseFloat(e.target.value) || 0)}
                      className="font-mono-numeric w-full rounded-xl border border-slate-200 bg-white py-2 pl-7 pr-2.5 text-xs font-bold text-slate-900 transition-all focus:border-amber-500 focus:outline-none dark:border-slate-700 dark:bg-[#0b0e14] dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: TikTok Platform Fees & Creator Commissions */}
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-400">
                  3. TikTok Platform Fees & Creator Commission
                </h3>
                <span className="text-[11px] font-bold text-slate-400">Variable Take Rates</span>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-700 dark:text-slate-300">
                    TikTok Take Rate (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={tiktokFeePercent}
                      onChange={(e) => setTiktokFeePercent(parseFloat(e.target.value) || 0)}
                      className="font-mono-numeric w-full rounded-2xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:border-[#84cc16] focus:outline-none dark:border-slate-800 dark:bg-[#0b0e14] dark:text-white"
                    />
                    <span className="absolute right-3.5 top-2.5 text-xs font-bold text-slate-400">%</span>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Payment Gateway (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={paymentFeePercent}
                      onChange={(e) => setPaymentFeePercent(parseFloat(e.target.value) || 0)}
                      className="font-mono-numeric w-full rounded-2xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:border-[#84cc16] focus:outline-none dark:border-slate-800 dark:bg-[#0b0e14] dark:text-white"
                    />
                    <span className="absolute right-3.5 top-2.5 text-xs font-bold text-slate-400">%</span>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Creator Affiliate (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={affiliatePercent}
                      onChange={(e) => setAffiliatePercent(parseFloat(e.target.value) || 0)}
                      className="font-mono-numeric w-full rounded-2xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:border-[#84cc16] focus:outline-none dark:border-slate-800 dark:bg-[#0b0e14] dark:text-white"
                    />
                    <span className="absolute right-3.5 top-2.5 text-xs font-bold text-slate-400">%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Marketing & Target Profit */}
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-400">
                  4. TikTok Ads CPA & Target Margin
                </h3>
                <span className="text-[11px] font-bold text-slate-400">Performance Optimization</span>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-purple-600 dark:text-[#c084fc]">
                    TikTok Ads CPA ($)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs font-bold text-purple-400">$</span>
                    <input
                      type="number"
                      step="0.1"
                      value={adCpa}
                      onChange={(e) => setAdCpa(parseFloat(e.target.value) || 0)}
                      className="font-mono-numeric w-full rounded-2xl border border-purple-200 bg-purple-50/40 py-2.5 pl-7 pr-3 text-xs font-black text-purple-700 focus:border-purple-500 focus:outline-none dark:border-purple-900/60 dark:bg-[#1f1730] dark:text-[#c084fc]"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Overhead / Other ($)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">$</span>
                    <input
                      type="number"
                      step="0.1"
                      value={otherExpenses}
                      onChange={(e) => setOtherExpenses(parseFloat(e.target.value) || 0)}
                      className="font-mono-numeric w-full rounded-2xl border border-slate-200 bg-white py-2.5 pl-7 pr-3 text-xs font-bold text-slate-900 focus:border-[#84cc16] focus:outline-none dark:border-slate-800 dark:bg-[#0b0e14] dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold text-amber-600 dark:text-[#fb923c]">
                    Target Margin Goal (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="1"
                      value={targetMarginPercent}
                      onChange={(e) => setTargetMarginPercent(parseFloat(e.target.value) || 0)}
                      className="font-mono-numeric w-full rounded-2xl border border-amber-200 bg-amber-50/40 px-3.5 py-2.5 text-xs font-black text-amber-700 focus:border-amber-500 focus:outline-none dark:border-amber-900/60 dark:bg-[#281a10] dark:text-[#fb923c]"
                    />
                    <span className="absolute right-3.5 top-2.5 text-xs font-bold text-amber-500">%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Real-Time Profit Engine & Unit Economics (5 cols) */}
        <div className="space-y-5 lg:col-span-5">
          {/* Main Profit Card */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-[#121620]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-400">
                Unit Profit Engine
              </span>
              <span
                className={cn(
                  'rounded-full px-3 py-1 text-xs font-black tracking-wide',
                  isProfitable
                    ? 'border border-emerald-300/60 bg-emerald-50 text-emerald-700 dark:border-emerald-800/60 dark:bg-emerald-950/60 dark:text-[#4ade80]'
                    : 'border border-rose-300/60 bg-rose-50 text-rose-700 dark:border-rose-800/60 dark:bg-rose-950/60 dark:text-rose-300',
                )}
              >
                {isProfitable ? '✓ Profitable SKU' : '⚠️ Net Loss Warning'}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-[#161b26]">
                <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Net Profit / Order</p>
                <p
                  className={cn(
                    'font-mono-numeric mt-1.5 text-2xl sm:text-3xl font-black tracking-tight',
                    isProfitable
                      ? 'text-emerald-600 dark:text-[#4ade80]'
                      : 'text-rose-600 dark:text-rose-400',
                  )}
                >
                  {formatCurrency(results.netProfit)}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-[#161b26]">
                <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Net Margin %</p>
                <p
                  className={cn(
                    'font-mono-numeric mt-1.5 text-2xl sm:text-3xl font-black tracking-tight',
                    results.profitMargin >= 35
                      ? 'text-emerald-600 dark:text-[#4ade80]'
                      : results.profitMargin > 0
                        ? 'text-amber-500'
                        : 'text-rose-600 dark:text-rose-400',
                  )}
                >
                  {formatPercent(results.profitMargin)}
                </p>
              </div>
            </div>

            {/* Visual Margin Bar */}
            <div className="mt-4 space-y-1.5">
              <div className="flex justify-between text-[11px] font-bold">
                <span className="text-slate-500 dark:text-slate-400">Profit Share of Selling Price</span>
                <span className="font-mono-numeric text-slate-800 dark:text-white">
                  {results.profitMargin > 0 ? formatPercent(results.profitMargin) : '0%'}
                </span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className={cn(
                    'h-full transition-all duration-300 rounded-full',
                    results.profitMargin >= 35
                      ? 'bg-gradient-to-r from-emerald-500 to-[#84cc16]'
                      : results.profitMargin > 0
                        ? 'bg-amber-500'
                        : 'bg-rose-500',
                  )}
                  style={{ width: `${Math.min(100, Math.max(0, results.profitMargin))}%` }}
                />
              </div>
            </div>
          </div>

          {/* Pricing Milestones & Safeguards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-4 shadow-2xs dark:border-slate-800/80 dark:bg-[#121620]">
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                <ShieldCheck className="h-4 w-4 text-amber-500" />
                <span className="text-[11px] font-bold uppercase tracking-wider">Break-Even Price</span>
              </div>
              <p className="font-mono-numeric mt-2 text-xl font-black text-slate-900 dark:text-white">
                {formatCurrency(results.breakEvenPrice)}
              </p>
              <p className="mt-1 text-[10px] text-slate-400">Minimum price floor before loss</p>
            </div>

            <div className="rounded-3xl border border-slate-200/80 bg-white p-4 shadow-2xs dark:border-slate-800/80 dark:bg-[#121620]">
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                <Target className="h-4 w-4 text-[#84cc16]" />
                <span className="text-[11px] font-bold uppercase tracking-wider">Target {targetMarginPercent}% Price</span>
              </div>
              <p className="font-mono-numeric mt-2 text-xl font-black text-[#84cc16]">
                {formatCurrency(results.recommendedPrice)}
              </p>
              <p className="mt-1 text-[10px] text-slate-400">Price for {targetMarginPercent}% profit margin</p>
            </div>
          </div>

          {/* Itemized Cost Breakdown Waterfall */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800/80 dark:bg-[#121620]">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                Itemized Cost Breakdown
              </h4>
              <span className="text-[11px] font-mono-numeric font-bold text-slate-500 dark:text-slate-400">
                Total: {formatCurrency(results.totalCost)}
              </span>
            </div>

            <div className="mt-4 space-y-2.5 text-xs font-mono-numeric">
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <span className="font-sans">Product COGS (Factory)</span>
                <span className="font-bold">{formatCurrency(cogs)}</span>
              </div>

              <div className="flex items-center justify-between text-blue-600 dark:text-blue-400">
                <span className="font-sans flex items-center gap-1">
                  <Ship className="h-3 w-3" /> Shipment Charges (Inbound Freight)
                </span>
                <span className="font-bold">{formatCurrency(shipmentCharges)}</span>
              </div>

              <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
                <span className="font-sans flex items-center gap-1">
                  <Truck className="h-3 w-3" /> Shipping Cost (3PL Courier)
                </span>
                <span className="font-bold">{formatCurrency(shippingCost)}</span>
              </div>

              <div className="flex items-center justify-between text-amber-600 dark:text-amber-400">
                <span className="font-sans flex items-center gap-1">
                  <Package className="h-3 w-3" /> Packaging & Prep Materials
                </span>
                <span className="font-bold">{formatCurrency(packagingCost)}</span>
              </div>

              <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <span className="font-sans">TikTok Shop Platform Fee ({tiktokFeePercent}%)</span>
                <span className="font-bold">{formatCurrency(results.tiktokFee)}</span>
              </div>

              <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <span className="font-sans">Payment Processing Fee</span>
                <span className="font-bold">{formatCurrency(results.paymentFee)}</span>
              </div>

              <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <span className="font-sans">Creator Affiliate Commission ({affiliatePercent}%)</span>
                <span className="font-bold">{formatCurrency(results.affiliateCommission)}</span>
              </div>

              <div className="flex items-center justify-between text-purple-600 dark:text-[#c084fc]">
                <span className="font-sans">TikTok Ads CPA Budget</span>
                <span className="font-bold">{formatCurrency(adCpa)}</span>
              </div>

              <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <span className="font-sans">Operating Overhead</span>
                <span className="font-bold">{formatCurrency(otherExpenses)}</span>
              </div>

              <div className="border-t border-slate-200/80 pt-3 dark:border-slate-800 flex items-center justify-between text-sm font-black">
                <span className="font-sans text-slate-900 dark:text-white">Net Retained Profit</span>
                <span className={cn(isProfitable ? 'text-emerald-600 dark:text-[#4ade80]' : 'text-rose-500')}>
                  {formatCurrency(results.netProfit)}
                </span>
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
          cogs,
          sellingPrice,
          shippingCost: shipmentCharges + shippingCost,
          packagingCost,
          tiktokFeePercent,
          affiliatePercent,
          adCpa,
          netProfit: results.netProfit,
          profitMarginPercent: results.profitMargin,
        }}
      />
      <PdfReportModal isOpen={pdfModalOpen} onClose={() => setPdfModalOpen(false)} />
    </div>
  );
}
