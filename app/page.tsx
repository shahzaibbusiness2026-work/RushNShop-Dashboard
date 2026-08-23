'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Zap,
  TrendingUp,
  Store,
  Sparkles,
  Bot,
  ShoppingBag,
  Calculator,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  Layers,
  Megaphone,
  Receipt,
  Users,
  Headphones,
  FileText,
  DollarSign,
  Play,
  Star,
  ExternalLink,
  Shield,
  Sun,
  Moon,
  BarChart3,
  Video,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatCurrency, formatPercent, cn, calculateUnitEconomics } from '../lib/utils';

export default function RootLandingPage() {
  const { theme, toggleTheme } = useStore();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Mini Interactive Calculator on Landing Page
  const [calcPrice, setCalcPrice] = useState<number>(34.99);
  const [calcCogs, setCalcCogs] = useState<number>(6.50);
  const [calcShipping, setCalcShipping] = useState<number>(3.80);
  const [calcAdCpa, setCalcAdCpa] = useState<number>(7.50);

  const calcResults = calculateUnitEconomics({
    sellingPrice: calcPrice,
    cogs: calcCogs,
    shippingCost: calcShipping,
    packagingCost: 0.90,
    tiktokFeePercent: 5.0,
    paymentFeePercent: 2.9,
    paymentFeeFixed: 0.30,
    affiliatePercent: 10.0,
    adCpa: calcAdCpa,
    otherExpenses: 0.40,
    targetMarginPercent: 40.0,
  });

  const faqs = [
    {
      q: 'How does RushNshop connect to my TikTok Shop accounts?',
      a: 'RushNshop uses official TikTok Shop Open API webhooks and partner tokens. You can link multiple accounts across the US, UK, Europe, and Asia in seconds with full OAuth security.',
    },
    {
      q: 'How accurate is the TrueProfit financial accounting?',
      a: '100% exact. RushNshop deducts every micro-expense in real time: supplier COGS, shipping labels, packaging, TikTok commission (5%), payment gateway processing (2.9% + $0.30), creator affiliate cuts, and TikTok Spark Ads CPA.',
    },
    {
      q: 'Can my virtual assistants (VAs) or media buyers access the dashboard securely?',
      a: 'Yes. RushNshop features role-based access control (RBAC). You can assign staff members to specific stores with restricted permissions (e.g. Support Only, Ads Manager, Store Admin, or Master Owner).',
    },
    {
      q: 'How does the AI Video Script & Listing Studio work?',
      a: 'Our generative AI models are fine-tuned on top-performing viral TikTok Shop videos. It analyzes your product name, target demographic, and pricing to output 3-second visual hooks, 30-second scene-by-scene audio scripts, SEO bullet points, and hashtags.',
    },
    {
      q: 'Does it support multiple currencies for international shops?',
      a: 'Yes! We support USD ($), GBP (£), EUR (€), CAD (CA$), and SGD (S$) with automated exchange rate normalization so you can view individual or blended multi-store performance.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0e14] text-slate-900 dark:text-slate-100 selection:bg-lime-400 selection:text-black">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-[#0b0e14]/90 backdrop-blur-md px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-lime-500 to-green-400 text-black shadow-md shadow-green-500/20">
              <Zap className="h-6 w-6 fill-current text-black font-black" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">RushNshop</span>
              <span className="ml-1.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800 dark:text-[#4ade80]">
                AI OS
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <a href="#features" className="hover:text-slate-900 dark:hover:text-white transition-colors">Features</a>
            <a href="#trueprofit" className="hover:text-slate-900 dark:hover:text-white transition-colors">TrueProfit</a>
            <a href="#calculator" className="hover:text-slate-900 dark:hover:text-white transition-colors">Profit Calculator</a>
            <a href="#ai-suite" className="hover:text-slate-900 dark:hover:text-white transition-colors">AI Studio</a>
            <a href="#pricing" className="hover:text-slate-900 dark:hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-slate-900 dark:hover:text-white transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161b26] text-slate-600 dark:text-slate-300 shadow-2xs hover:bg-slate-50 dark:hover:bg-white/10 transition-colors"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-700" />}
            </button>
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 rounded-xl bg-[#84cc16] px-4 py-2 text-xs font-bold text-black shadow-xs hover:bg-[#72b012] transition-all hover:scale-[1.02]"
            >
              <span>View Dashboard</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 px-4 sm:px-6 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/40 px-3.5 py-1 text-xs font-bold text-emerald-800 dark:text-[#4ade80] mb-6 shadow-xs animate-in fade-in slide-in-from-top-4">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>The All-In-One AI Operating System for TikTok Shop</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-tight sm:leading-none">
          Scale Multi-Store TikTok Empires with <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-500 via-emerald-400 to-teal-400">100% Real Profit Visibility</span>
        </h1>

        <p className="mt-5 text-sm sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Stop calculating margins on messy spreadsheets. Combine TrueProfit waterfall accounting, instant viral AI video scripts, customer service automation, and multi-account store controls in one dashboard.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-[#84cc16] px-7 py-3.5 text-sm font-bold text-black shadow-lg shadow-lime-500/20 hover:bg-[#72b012] transition-all hover:scale-[1.03]"
          >
            <Zap className="h-4 w-4 fill-current" />
            <span>Launch Live Dashboard Demo</span>
          </Link>
          <Link
            href="/calculator"
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121620] px-6 py-3.5 text-sm font-bold text-slate-800 dark:text-slate-200 shadow-xs hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
          >
            <Calculator className="h-4 w-4 text-emerald-600 dark:text-[#4ade80]" />
            <span>Test Unit Economics Simulator</span>
          </Link>
        </div>

        {/* Live Metrics Ticker Teaser */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 max-w-3xl mx-auto text-left font-mono-numeric">
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#121620] p-4 shadow-xs">
            <p className="text-xs text-slate-400 dark:text-slate-500 font-sans font-semibold">Tracked Revenue</p>
            <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">$25,430.80</p>
            <p className="text-[11px] font-bold text-emerald-600 dark:text-[#4ade80] mt-0.5 font-sans">↑ 18.6% MTD</p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#121620] p-4 shadow-xs">
            <p className="text-xs text-slate-400 dark:text-slate-500 font-sans font-semibold">Real Net Margin</p>
            <p className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-[#4ade80] mt-1">52.0%</p>
            <p className="text-[11px] font-bold text-slate-400 font-sans mt-0.5">Post All Deductions</p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#121620] p-4 shadow-xs">
            <p className="text-xs text-slate-400 dark:text-slate-500 font-sans font-semibold">Connected Accounts</p>
            <p className="text-xl sm:text-2xl font-black text-blue-600 dark:text-[#38bdf8] mt-1">4 Stores</p>
            <p className="text-[11px] font-bold text-slate-400 font-sans mt-0.5">US, UK, DE, CA</p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#121620] p-4 shadow-xs">
            <p className="text-xs text-slate-400 dark:text-slate-500 font-sans font-semibold">AI CS Automation</p>
            <p className="text-xl sm:text-2xl font-black text-purple-600 dark:text-[#c084fc] mt-1">94% Rate</p>
            <p className="text-[11px] font-bold text-emerald-600 dark:text-[#4ade80] font-sans mt-0.5">Instant USPS Lookup</p>
          </div>
        </div>
      </section>

      {/* Problem vs Solution Matrix */}
      <section className="py-16 bg-slate-100/60 dark:bg-[#0f1117] border-y border-slate-200 dark:border-slate-800 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-[#4ade80]">Why RushNshop?</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              Built Specifically for the Realities of TikTok Commerce
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Old Way */}
            <div className="rounded-3xl border border-rose-200 dark:border-rose-900/40 bg-white dark:bg-[#121620] p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-rose-100 dark:bg-rose-950/60 p-2 text-rose-700 dark:text-rose-400 font-bold text-xs">
                  ❌ The Old Chaotic Way
                </span>
              </div>
              <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300 font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Guessing profit margins while TikTok platform fees, shipping label costs, and refunds silently drain bank accounts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Constantly logging in and out of multiple seller centers to check order status across different regions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Spending hours writing TikTok video hooks and product descriptions that fail to convert.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Customer support backlog leading to late dispatch rates, cancellation penalties, and store health warnings.</span>
                </li>
              </ul>
            </div>

            {/* The RushNshop Way */}
            <div className="rounded-3xl border border-emerald-300 dark:border-emerald-800/80 bg-white dark:bg-[#121620] p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-emerald-100 dark:bg-emerald-950/60 p-2 text-emerald-800 dark:text-[#4ade80] font-bold text-xs">
                  ⚡ The RushNshop AI Operating System
                </span>
              </div>
              <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300 font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span><strong>TrueProfit Waterfall Accounting:</strong> Real-time deduction of COGS, fees, ads, and OPEX to penny-level accuracy.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span><strong>Unified Multi-Account Hub:</strong> Switch stores in 1 click or see global blended financials across all global shops.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span><strong>AI Viral Script Studio:</strong> Generate high-converting 3s visual hooks, 30s scene scripts, and SEO titles in 2 seconds.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span><strong>Autonomous Customer Helpdesk:</strong> Smart auto-replies trained on live USPS tracking & return policies.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section id="features" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-[#4ade80]">Complete Capability Suite</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
            Everything You Need to Dominate TikTok Shop
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
            Engineered by top e-commerce operators, quantitative software developers, and direct-response media buyers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#121620] p-6 shadow-xs space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-[#4ade80] border border-emerald-200 dark:border-emerald-800/40">
              <Layers className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">TrueProfit Financial Waterfall</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Track Gross Sales, discounts, refunds, supplier COGS, 5% TikTok fees, Stripe payment cuts, and ad CPA in a transparent waterfall chart.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#121620] p-6 shadow-xs space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-[#38bdf8] border border-blue-200 dark:border-blue-800/40">
              <Store className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Multi-Store Account Management</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Connect unlimited US, UK, DE, and CA accounts. Separate product catalogs, inventories, and staff permissions by store.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#121620] p-6 shadow-xs space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-[#fb923c] border border-amber-200 dark:border-amber-800/40">
              <Calculator className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Pre-Listing Unit Economics Simulator</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Simulate true break-even selling prices, max allowable TikTok Ads CPA, and recommended target price before launching any SKU.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#121620] p-6 shadow-xs space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-[#c084fc] border border-purple-200 dark:border-purple-800/40">
              <Megaphone className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">TikTok Spark Ads & Attribution</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Live TikTok Ads marketing API sync. Track blended ROAS, real post-ad net profit, and automated AI budget scale/pause recommendations.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#121620] p-6 shadow-xs space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-50 dark:bg-pink-950/50 text-pink-600 dark:text-[#f472b6] border border-pink-200 dark:border-pink-800/40">
              <Video className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Viral AI Script & Listing Studio</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Generate 3-second viral video hooks, 30-second scene-by-scene video scripts with audio voiceovers, SEO titles, and trending hashtags.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#121620] p-6 shadow-xs space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-[#2dd4bf] border border-teal-200 dark:border-teal-800/40">
              <Headphones className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Autonomous AI Helpdesk</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Instant carrier tracking status lookups and AI auto-drafted customer replies based on your store return policy with 1-click approval.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Pre-Listing Calculator Section */}
      <section id="calculator" className="py-16 bg-slate-100/60 dark:bg-[#0f1117] border-y border-slate-200 dark:border-slate-800 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-[#4ade80]">Live Interactive Demo</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              Try the TikTok Profit Calculator Right Now
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Adjust the values below to see how TikTok platform cuts, COGS, and ad CPA impact your net bottom line.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#121620] p-6 sm:p-8 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Calculator Controls */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Unit Cost Parameters</h3>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Selling Price:</span>
                  <span className="text-emerald-600 dark:text-[#4ade80]">${calcPrice.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="150"
                  step="1"
                  value={calcPrice}
                  onChange={(e) => setCalcPrice(parseFloat(e.target.value))}
                  className="w-full accent-lime-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Product COGS:</span>
                  <span className="text-slate-800 dark:text-slate-200">${calcCogs.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="50"
                  step="0.5"
                  value={calcCogs}
                  onChange={(e) => setCalcCogs(parseFloat(e.target.value))}
                  className="w-full accent-lime-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>3PL Shipping & Prep:</span>
                  <span className="text-slate-800 dark:text-slate-200">${calcShipping.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="20"
                  step="0.2"
                  value={calcShipping}
                  onChange={(e) => setCalcShipping(parseFloat(e.target.value))}
                  className="w-full accent-lime-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>TikTok Ads CPA:</span>
                  <span className="text-purple-600 dark:text-[#c084fc]">${calcAdCpa.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="30"
                  step="0.5"
                  value={calcAdCpa}
                  onChange={(e) => setCalcAdCpa(parseFloat(e.target.value))}
                  className="w-full accent-lime-500"
                />
              </div>
            </div>

            {/* Results Live Waterfall Card */}
            <div className="rounded-2xl bg-slate-50 dark:bg-[#161b26] p-5 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 font-mono-numeric">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 font-sans uppercase">Live Unit Economics</span>
                <span className="rounded-full bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-0.5 text-xs font-bold text-emerald-800 dark:text-[#4ade80]">
                  {formatPercent(calcResults.profitMargin)} Margin
                </span>
              </div>

              <div>
                <p className="text-xs text-slate-400 font-sans">Net Profit Per Order:</p>
                <p className="text-3xl font-black text-emerald-600 dark:text-[#4ade80] mt-0.5">
                  {formatCurrency(calcResults.netProfit)}
                </p>
              </div>

              <div className="space-y-1.5 text-xs border-t border-slate-200 dark:border-slate-800 pt-3">
                <div className="flex justify-between text-slate-500 font-sans">
                  <span>Break-Even Price Floor:</span>
                  <span className="font-bold text-slate-900 dark:text-white font-mono-numeric">{formatCurrency(calcResults.breakEvenPrice)}</span>
                </div>
                <div className="flex justify-between text-slate-500 font-sans">
                  <span>Max Allowable Ad CPA:</span>
                  <span className="font-bold text-purple-600 dark:text-[#c084fc] font-mono-numeric">{formatCurrency(calcResults.maxAllowableCpa)}</span>
                </div>
                <div className="flex justify-between text-slate-500 font-sans">
                  <span>TikTok Shop Fees (5% + 2.9%):</span>
                  <span className="font-bold text-slate-900 dark:text-white font-mono-numeric">{formatCurrency(calcResults.tiktokFee + calcResults.paymentFee)}</span>
                </div>
              </div>

              <Link
                href="/calculator"
                className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-[#84cc16] py-2.5 text-xs font-bold text-black hover:bg-[#72b012] transition-all"
              >
                <span>Open Full Unit Economics Studio</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-[#4ade80]">Transparent Pricing</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
            Predictable Plans for Growing Brands
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
            No hidden revenue cuts. Unlimited order syncing and GAAP P&L statement generation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Starter Plan */}
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#121620] p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Starter</span>
              <div className="flex items-baseline gap-1 font-mono-numeric">
                <span className="text-4xl font-black text-slate-900 dark:text-white">$29</span>
                <span className="text-xs text-slate-400 font-sans">/month</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Perfect for single store operators validating viral products.</p>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-[#4ade80]" />
                  <span>1 Connected TikTok Shop Account</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-[#4ade80]" />
                  <span>Real-Time TrueProfit Waterfall</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-[#4ade80]" />
                  <span>Pre-Listing Profit Calculator</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-[#4ade80]" />
                  <span>CSV Financial P&L Exports</span>
                </div>
              </div>
            </div>

            <Link
              href="/dashboard"
              className="w-full flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 py-2.5 text-xs font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
            >
              Start Free Trial
            </Link>
          </div>

          {/* Growth Plan (Featured) */}
          <div className="relative rounded-3xl border-2 border-[#84cc16] bg-white dark:bg-[#121620] p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#84cc16] px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-black">
              Most Popular
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-[#4ade80]">Growth Empire</span>
              <div className="flex items-baseline gap-1 font-mono-numeric">
                <span className="text-4xl font-black text-slate-900 dark:text-white">$79</span>
                <span className="text-xs text-slate-400 font-sans">/month</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">For multi-account sellers scaling with TikTok Spark Ads.</p>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-[#4ade80]" />
                  <span>Up to 5 Connected TikTok Shop Accounts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-[#4ade80]" />
                  <span>Live TikTok Ads API & Spark ROAS Sync</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-[#4ade80]" />
                  <span>Full AI Viral Video Script & Listing Studio</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-[#4ade80]" />
                  <span>Autonomous AI Customer Service Helpdesk</span>
                </div>
              </div>
            </div>

            <Link
              href="/dashboard"
              className="w-full flex items-center justify-center rounded-xl bg-[#84cc16] py-3 text-xs font-bold text-black hover:bg-[#72b012] shadow-md transition-all hover:scale-[1.02]"
            >
              Get Started with Growth
            </Link>
          </div>

          {/* Scale & Agency Plan */}
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#121620] p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-[#c084fc]">Scale & Agency</span>
              <div className="flex items-baseline gap-1 font-mono-numeric">
                <span className="text-4xl font-black text-slate-900 dark:text-white">$199</span>
                <span className="text-xs text-slate-400 font-sans">/month</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">For 8-figure agencies managing massive cross-border operations.</p>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-[#4ade80]" />
                  <span>Unlimited TikTok Shop Accounts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-[#4ade80]" />
                  <span>Role-Based Staff Access (RBAC)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-[#4ade80]" />
                  <span>Dedicated Webhook Endpoints & API Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-[#4ade80]" />
                  <span>Dedicated Account Manager & Priority Support</span>
                </div>
              </div>
            </div>

            <Link
              href="/dashboard"
              className="w-full flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 py-2.5 text-xs font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section id="faq" className="py-16 bg-slate-100/60 dark:bg-[#0f1117] border-t border-slate-200 dark:border-slate-800 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-[#4ade80]">Got Questions?</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#121620] overflow-hidden shadow-2xs"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between p-4 text-left font-bold text-xs sm:text-sm text-slate-900 dark:text-white"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={cn('h-4 w-4 text-slate-400 transition-transform duration-200', isOpen && 'rotate-180')} />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 font-medium">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b0e14] py-12 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-lime-500 to-green-400 text-black">
              <Zap className="h-4 w-4 fill-current" />
            </div>
            <div>
              <p className="font-bold text-sm text-slate-900 dark:text-white">RushNshop AI OS</p>
              <p className="text-[11px] text-slate-400">Next-Generation TikTok Shop Operating System</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 font-semibold">
            <Link href="/dashboard" className="hover:text-slate-900 dark:hover:text-white">Dashboard</Link>
            <Link href="/stores" className="hover:text-slate-900 dark:hover:text-white">Stores</Link>
            <Link href="/calculator" className="hover:text-slate-900 dark:hover:text-white">Calculator</Link>
            <Link href="/ai-assistant" className="hover:text-slate-900 dark:hover:text-white">AI Assistant</Link>
            <Link href="/profit-analytics" className="hover:text-slate-900 dark:hover:text-white">Profit Analytics</Link>
            <Link href="/settings" className="hover:text-slate-900 dark:hover:text-white">Settings</Link>
          </div>

          <p className="text-xs text-slate-400">© 2024 RushNshop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
