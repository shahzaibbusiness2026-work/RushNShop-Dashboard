'use client';

import React, { useState, useRef } from 'react';
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
  ArrowUpRight,
  Clock,
  Flame,
  Check,
  ChevronUp,
  Globe,
  RefreshCw,
  Mail,
  Send,
  Sliders,
  Award,
  Lock,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatCurrency, formatPercent, cn, calculateUnitEconomics } from '../lib/utils';

export default function RootLandingPage() {
  const { theme, toggleTheme } = useStore();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeFeatureTab, setActiveFeatureTab] = useState<'profit' | 'ai' | 'ads' | 'stores' | 'helpdesk'>('profit');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Mouse spotlight coordinates
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Mini Interactive Calculator on Landing Page
  const [calcPrice, setCalcPrice] = useState<number>(34.99);
  const [calcCogs, setCalcCogs] = useState<number>(6.50);
  const [calcShipping, setCalcShipping] = useState<number>(3.80);
  const [calcAdCpa, setCalcAdCpa] = useState<number>(7.50);

  // ROI Estimator State
  const [monthlyOrders, setMonthlyOrders] = useState<number>(2500);

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

  const applyPreset = (price: number, cogs: number, shipping: number, cpa: number) => {
    setCalcPrice(price);
    setCalcCogs(cogs);
    setCalcShipping(shipping);
    setCalcAdCpa(cpa);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    setNewsletterEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const faqs = [
    {
      q: 'How does RushNshop connect to my TikTok Shop accounts?',
      a: 'RushNshop uses official TikTok Shop Open API webhooks and partner OAuth tokens. You can securely link multiple accounts across the US, UK, Europe, and Asia in seconds with bank-grade encryption.',
    },
    {
      q: 'How accurate is the TrueProfit financial accounting?',
      a: '100% exact. RushNshop calculates every transaction in real time: supplier COGS, shipping labels, packaging, TikTok 5% commission, payment processing (2.9% + $0.30), creator affiliate splits, and TikTok Spark Ads CPA.',
    },
    {
      q: 'Can my virtual assistants (VAs) or media buyers access the dashboard securely?',
      a: 'Yes. RushNshop features role-based access control (RBAC). You can assign team members specific permissions (e.g. Support Only, Ads Manager, Store Admin, or Master Owner) across individual stores.',
    },
    {
      q: 'How does the AI Video Script & Listing Studio work?',
      a: 'Our generative AI models are fine-tuned on thousands of high-converting viral TikTok Shop videos. It analyzes your product parameters to output 3-second visual hooks, 30-second scene-by-scene audio scripts, SEO bullet points, and trending hashtags.',
    },
    {
      q: 'Does it support multiple currencies for international shops?',
      a: 'Yes! We support USD ($), GBP (£), EUR (€), CAD (CA$), and SGD (S$) with automated real-time exchange rate normalization so you can view individual or blended multi-store performance.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0e14] text-slate-900 dark:text-slate-100 selection:bg-lime-400 selection:text-black overflow-x-hidden">
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
            <a href="#roi" className="hover:text-slate-900 dark:hover:text-white transition-colors">ROI Estimator</a>
            <a href="#pricing" className="hover:text-slate-900 dark:hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-slate-900 dark:hover:text-white transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
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

      {/* Hero Section with Interactive Spotlight & GPU Mesh Grid */}
      <section
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="relative overflow-hidden pt-14 pb-20 sm:pt-24 sm:pb-32 px-4 sm:px-6 max-w-7xl mx-auto text-center bg-linear-grid"
      >
        {/* Interactive Radial Spotlight Background */}
        <div
          className="pointer-events-none absolute -inset-px opacity-50 transition-opacity duration-300 hidden md:block"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(132, 204, 22, 0.12), transparent 80%)`,
          }}
        />

        {/* Ambient Top Glow Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[650px] h-96 sm:h-[450px] bg-gradient-to-tr from-lime-500/20 via-emerald-500/10 to-teal-500/0 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

        {/* Floating Interactive Badge 1 (Left) */}
        <div className="hidden lg:flex items-center gap-2.5 absolute top-16 left-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-[#121620]/90 p-3 shadow-xl backdrop-blur-md animate-float text-left z-20 font-mono-numeric">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-[#4ade80]">
            <Flame className="h-5 w-5 fill-current" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-900 dark:text-white font-sans">🔥 Viral Product Alert</p>
            <p className="text-xs font-black text-emerald-600 dark:text-[#4ade80]">+$14,820 Net Profit</p>
          </div>
        </div>

        {/* Floating Interactive Badge 2 (Right) */}
        <div className="hidden lg:flex items-center gap-2.5 absolute top-20 right-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-[#121620]/90 p-3 shadow-xl backdrop-blur-md animate-float-delayed text-left z-20 font-mono-numeric">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-[#c084fc]">
            <Megaphone className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-900 dark:text-white font-sans">⚡ Spark Ads Auto-Scaled</p>
            <p className="text-xs font-black text-purple-600 dark:text-[#c084fc]">4.82x ROAS</p>
          </div>
        </div>

        {/* Floating Interactive Badge 3 (Bottom Left) */}
        <div className="hidden xl:flex items-center gap-2.5 absolute bottom-16 left-12 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-[#121620]/90 p-3 shadow-xl backdrop-blur-md animate-float text-left z-20">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-[#38bdf8]">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-900 dark:text-white">🤖 AI Helpdesk Active</p>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">142 Inquiries Auto-Resolved</p>
          </div>
        </div>

        {/* Main Hero Header */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/40 px-4 py-1.5 text-xs font-bold text-emerald-800 dark:text-[#4ade80] mb-6 shadow-xs animate-in fade-in slide-in-from-top-4">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>The All-In-One AI Operating System for TikTok Shop</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-tight sm:leading-none">
            Scale Multi-Store TikTok Empires with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-500 via-emerald-400 to-teal-400">
              100% Real Profit Visibility
            </span>
          </h1>

          <p className="mt-5 text-sm sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Stop losing money on hidden TikTok platform fees, uncalculated returns, and runaway ad spend. Combine TrueProfit real-time accounting, viral AI video scripts, customer service automation, and multi-store intelligence in one interface.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-[#84cc16] px-8 py-4 text-sm font-bold text-black shadow-lg shadow-lime-500/25 hover:bg-[#72b012] transition-all hover:scale-[1.03]"
            >
              <Zap className="h-4 w-4 fill-current" />
              <span>Launch Live Dashboard Demo</span>
            </Link>
            <a
              href="#calculator"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121620] px-6 py-4 text-sm font-bold text-slate-800 dark:text-slate-200 shadow-xs hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
            >
              <Calculator className="h-4 w-4 text-emerald-600 dark:text-[#4ade80]" />
              <span>Test Profit Simulator</span>
            </a>
          </div>

          {/* Hero Interactive App Window Preview (0 Lag Hardware-Accelerated) */}
          <div className="mt-14 max-w-5xl mx-auto rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-[#121620]/95 p-3 sm:p-4 shadow-2xl backdrop-blur-xl relative">
            {/* Window Top Controls */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/80 px-2">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                <span className="text-[11px] font-semibold text-slate-400 ml-2">app.rushnshop.com/dashboard</span>
              </div>
              <span className="rounded-md bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:text-[#4ade80]">
                ● Live TikTok Sync
              </span>
            </div>

            {/* Simulated Live Grid inside Mockup */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3 text-left font-mono-numeric">
              <div className="rounded-xl bg-slate-50 dark:bg-[#0f1117] p-3 border border-slate-100 dark:border-slate-800">
                <p className="text-[10px] text-slate-400 font-sans">Gross Revenue</p>
                <p className="text-base sm:text-xl font-bold text-slate-900 dark:text-white mt-0.5">$25,430.80</p>
                <p className="text-[10px] font-bold text-emerald-600 dark:text-[#4ade80] font-sans">↑ 18.6% MTD</p>
              </div>
              <div className="rounded-xl bg-slate-50 dark:bg-[#0f1117] p-3 border border-slate-100 dark:border-slate-800">
                <p className="text-[10px] text-slate-400 font-sans">True Net Profit</p>
                <p className="text-base sm:text-xl font-bold text-emerald-600 dark:text-[#4ade80] mt-0.5">$13,224.00</p>
                <p className="text-[10px] font-bold text-slate-400 font-sans">52.0% Real Margin</p>
              </div>
              <div className="rounded-xl bg-slate-50 dark:bg-[#0f1117] p-3 border border-slate-100 dark:border-slate-800">
                <p className="text-[10px] text-slate-400 font-sans">Total Orders</p>
                <p className="text-base sm:text-xl font-bold text-slate-900 dark:text-white mt-0.5">840 Orders</p>
                <p className="text-[10px] font-bold text-blue-500 font-sans">4 Global Stores</p>
              </div>
              <div className="rounded-xl bg-slate-50 dark:bg-[#0f1117] p-3 border border-slate-100 dark:border-slate-800">
                <p className="text-[10px] text-slate-400 font-sans">AI Automation</p>
                <p className="text-base sm:text-xl font-bold text-purple-600 dark:text-[#c084fc] mt-0.5">94% Rate</p>
                <p className="text-[10px] font-bold text-purple-500 font-sans">Instant Resolution</p>
              </div>
            </div>

            {/* Clickable Overlay to Open Real Dashboard */}
            <Link
              href="/dashboard"
              className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-2.5 text-xs font-bold hover:bg-black dark:hover:bg-slate-200 transition-colors"
            >
              <span>Click to Enter Interactive Dashboard</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Infinite Animated Store Region Marquee Ribbon */}
      <section className="py-6 border-y border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-[#0f1117]/70 backdrop-blur-sm overflow-hidden select-none">
        <div className="animate-marquee flex items-center gap-8 text-xs font-bold text-slate-600 dark:text-slate-300">
          <span className="flex items-center gap-2">🇺🇸 TikTok Shop US Partner</span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="flex items-center gap-2">🇬🇧 TikTok Shop UK Active</span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="flex items-center gap-2">🇩🇪 TikTok Shop DE Cross-Border</span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="flex items-center gap-2">🇨🇦 TikTok Shop CA Sync</span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="flex items-center gap-2">⚡ Real-Time Spark Ads API</span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="flex items-center gap-2">🔒 256-Bit SSL Encrypted</span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="flex items-center gap-2">📦 USPS / 3PL Auto-Tracking</span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="flex items-center gap-2">🇺🇸 TikTok Shop US Partner</span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="flex items-center gap-2">🇬🇧 TikTok Shop UK Active</span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="flex items-center gap-2">🇩🇪 TikTok Shop DE Cross-Border</span>
        </div>
      </section>

      {/* Problem vs Solution Comparison Section */}
      <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-[#4ade80]">Why RushNshop?</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            Built Specifically for the Realities of TikTok Commerce
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
            Most e-commerce analytics were built for Amazon or Shopify. TikTok Shop has unique platform commission structures, creator affiliate cuts, and Spark Ads attribution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* The Old Way */}
          <div className="rounded-3xl border border-rose-200 dark:border-rose-900/40 bg-white dark:bg-[#121620] p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <span className="rounded-lg bg-rose-100 dark:bg-rose-950/60 p-2 text-rose-700 dark:text-rose-400 font-bold text-xs">
                ❌ The Old Chaotic Way
              </span>
            </div>
            <ul className="space-y-3.5 text-xs text-slate-600 dark:text-slate-300 font-medium">
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold text-sm">✕</span>
                <span>Guessing profit margins while 5% TikTok fees, payment gateway cuts, and uncalculated return shipping drain your payout.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold text-sm">✕</span>
                <span>Constantly logging in and out of multiple seller centers to check order status across different regions.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold text-sm">✕</span>
                <span>Spending hours writing TikTok video hooks and product descriptions that fail to convert.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold text-sm">✕</span>
                <span>Customer support backlog leading to late dispatch rates, cancellation penalties, and store health warnings.</span>
              </li>
            </ul>
          </div>

          {/* The RushNshop Way */}
          <div className="rounded-3xl border-2 border-emerald-400 dark:border-emerald-700 bg-white dark:bg-[#121620] p-6 sm:p-8 shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="rounded-lg bg-emerald-100 dark:bg-emerald-950/60 p-2 text-emerald-800 dark:text-[#4ade80] font-bold text-xs">
                ⚡ The RushNshop AI Operating System
              </span>
            </div>
            <ul className="space-y-3.5 text-xs text-slate-600 dark:text-slate-300 font-medium">
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-500 font-bold text-sm">✓</span>
                <span><strong>TrueProfit Waterfall Accounting:</strong> Real-time deduction of COGS, fees, ads, and OPEX to penny-level accuracy.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-500 font-bold text-sm">✓</span>
                <span><strong>Unified Multi-Account Hub:</strong> Switch stores in 1 click or see global blended financials across all global shops.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-500 font-bold text-sm">✓</span>
                <span><strong>AI Viral Script Studio:</strong> Generate high-converting 3s visual hooks, 30s scene scripts, and SEO titles in 2 seconds.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-500 font-bold text-sm">✓</span>
                <span><strong>Autonomous Customer Helpdesk:</strong> Smart auto-replies trained on live USPS tracking & return policies.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Interactive Feature Deep-Dive Tabs */}
      <section id="features" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-12 bg-grid-pattern">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-[#4ade80]">Feature Deep Dive</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
            Engineered for High-Volume Sellers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
            Click through the core modules below to explore how RushNshop automates your TikTok operations.
          </p>
        </div>

        {/* Feature Interactive Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {[
            { id: 'profit', label: 'TrueProfit Waterfall', icon: Layers },
            { id: 'ai', label: 'AI Video Script Studio', icon: Video },
            { id: 'ads', label: 'TikTok Ads API', icon: Megaphone },
            { id: 'stores', label: 'Multi-Store Hub', icon: Store },
            { id: 'helpdesk', label: 'AI Customer Desk', icon: Headphones },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeFeatureTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFeatureTab(tab.id as any)}
                className={cn(
                  'flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all',
                  isActive
                    ? 'bg-[#84cc16] text-black shadow-md shadow-lime-500/20 scale-[1.02]'
                    : 'bg-white dark:bg-[#121620] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tab Preview Card */}
        <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#121620] p-6 sm:p-10 shadow-xs max-w-5xl mx-auto">
          {activeFeatureTab === 'profit' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="rounded-full bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 text-xs font-bold text-emerald-800 dark:text-[#4ade80]">
                  Real-Time GAAP Deductions
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  Stop Guessing Your True Take-Home Profit
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  RushNshop’s waterfall deduction model subtracts every single micro-fee before declaring profit:
                </p>
                <div className="space-y-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-[#4ade80]" />
                    <span>Gross GMV & TikTok Discounts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-[#4ade80]" />
                    <span>Product COGS & 3PL Shipping Prep</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-[#4ade80]" />
                    <span>TikTok 5% Commission + Stripe 2.9% + $0.30</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-[#4ade80]" />
                    <span>Creator Affiliate Revenue Splits & Spark Ad CPA</span>
                  </div>
                </div>
                <Link
                  href="/profit-analytics"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-[#4ade80] hover:underline pt-2"
                >
                  <span>Explore Profit Analytics Engine</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Visual Demo Card */}
              <div className="rounded-2xl bg-slate-50 dark:bg-[#0f1117] p-5 border border-slate-200 dark:border-slate-800 space-y-3 font-mono-numeric">
                <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-slate-800 dark:text-slate-200 font-sans">Order #TK-84920 Waterfall</span>
                  <span className="font-bold text-emerald-600 dark:text-[#4ade80]">+$18.42 Net Profit</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600 dark:text-slate-400 font-sans">
                    <span>Gross Selling Price</span>
                    <span className="font-bold text-slate-900 dark:text-white">$34.99</span>
                  </div>
                  <div className="flex justify-between text-rose-500 font-sans">
                    <span>- Supplier COGS</span>
                    <span className="font-bold">-$6.50</span>
                  </div>
                  <div className="flex justify-between text-rose-500 font-sans">
                    <span>- 3PL Shipping</span>
                    <span className="font-bold">-$3.80</span>
                  </div>
                  <div className="flex justify-between text-rose-500 font-sans">
                    <span>- TikTok 5% Commission</span>
                    <span className="font-bold">-$1.75</span>
                  </div>
                  <div className="flex justify-between text-rose-500 font-sans">
                    <span>- Payment Gateway (2.9% + $0.30)</span>
                    <span className="font-bold">-$1.31</span>
                  </div>
                  <div className="flex justify-between text-purple-600 dark:text-[#c084fc] font-sans">
                    <span>- TikTok Spark Ad CPA</span>
                    <span className="font-bold">-$3.21</span>
                  </div>
                  <div className="flex justify-between text-emerald-600 dark:text-[#4ade80] pt-2 border-t border-slate-200 dark:border-slate-800 font-sans font-bold text-sm">
                    <span>Final Net Profit Margin</span>
                    <span>52.6% ($18.42)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeFeatureTab === 'ai' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="rounded-full bg-pink-100 dark:bg-pink-950/60 px-3 py-1 text-xs font-bold text-pink-800 dark:text-[#f472b6]">
                  Generative Video Prompts
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  Generate 3-Second Viral Video Hooks in Seconds
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  Trained on millions of organic TikTok views. Generates scene-by-scene audio voiceovers, on-screen text overlays, and SEO product bullet points.
                </p>
                <Link
                  href="/ai-assistant"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-600 dark:text-[#f472b6] hover:underline pt-2"
                >
                  <span>Open AI Video Studio</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="rounded-2xl bg-slate-50 dark:bg-[#0f1117] p-5 border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
                <div className="rounded-xl bg-pink-50 dark:bg-pink-950/30 p-3 border border-pink-200 dark:border-pink-900/50">
                  <p className="font-bold text-pink-900 dark:text-pink-200 mb-1">🎯 3-Second Visual Hook:</p>
                  <p className="text-slate-700 dark:text-slate-300 italic">"Stop scrolling if you’re still wasting 20 minutes cleaning your blender every morning!"</p>
                </div>
                <div className="rounded-xl bg-slate-100 dark:bg-white/5 p-3 space-y-1">
                  <p className="font-bold text-slate-800 dark:text-slate-200">🎬 Scene 1 (0:00 - 0:08):</p>
                  <p className="text-slate-600 dark:text-slate-400">Close up pouring water & pressing turbo button. Audio: upbeat trending lofi beat.</p>
                </div>
              </div>
            </div>
          )}

          {activeFeatureTab === 'ads' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="rounded-full bg-purple-100 dark:bg-purple-950/60 px-3 py-1 text-xs font-bold text-purple-800 dark:text-[#c084fc]">
                  Marketing API Sync
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  TikTok Spark Ads & Creator Attribution
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  Track blended ROAS, individual creator affiliate performance, and receive automated budget scaling alerts when a campaign hits target CPA.
                </p>
                <Link
                  href="/ads-analytics"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 dark:text-[#c084fc] hover:underline pt-2"
                >
                  <span>View Ads Analytics</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="rounded-2xl bg-slate-50 dark:bg-[#0f1117] p-5 border border-slate-200 dark:border-slate-800 space-y-3 font-mono-numeric">
                <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-slate-800 dark:text-slate-200 font-sans">Campaign: Sunset Lamp Spark #4</span>
                  <span className="rounded-md bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:text-[#4ade80]">
                    Scale +20% Budget
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <p className="text-slate-400 font-sans text-[10px]">Spend</p>
                    <p className="font-bold text-slate-900 dark:text-white">$840.00</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-sans text-[10px]">Revenue</p>
                    <p className="font-bold text-emerald-600 dark:text-[#4ade80]">$4,048.80</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-sans text-[10px]">ROAS</p>
                    <p className="font-bold text-purple-600 dark:text-[#c084fc]">4.82x</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeFeatureTab === 'stores' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="rounded-full bg-blue-100 dark:bg-blue-950/60 px-3 py-1 text-xs font-bold text-blue-800 dark:text-[#38bdf8]">
                  Global Accounts
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  Multi-Store Account Management & RBAC
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  Manage accounts in USA, UK, Germany, and Canada from a single master dashboard. Grant team members store-level permissions.
                </p>
                <Link
                  href="/stores"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-[#38bdf8] hover:underline pt-2"
                >
                  <span>Manage Stores</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="space-y-2.5">
                {[
                  { name: 'RushNshop US Official', flag: '🇺🇸', rev: '$14,200.50', status: 'Healthy' },
                  { name: 'RushNshop UK Direct', flag: '🇬🇧', rev: '£6,450.00', status: 'Healthy' },
                  { name: 'RushNshop DE Store', flag: '🇩🇪', rev: '€4,780.30', status: 'Healthy' },
                ].map((s) => (
                  <div key={s.name} className="flex items-center justify-between rounded-xl bg-slate-50 dark:bg-[#0f1117] p-3 border border-slate-200 dark:border-slate-800 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{s.flag}</span>
                      <span className="font-bold text-slate-900 dark:text-white">{s.name}</span>
                    </div>
                    <div className="flex items-center gap-3 font-mono-numeric">
                      <span className="font-bold text-emerald-600 dark:text-[#4ade80]">{s.rev}</span>
                      <span className="text-[10px] rounded-md bg-emerald-100 dark:bg-emerald-950/60 px-1.5 py-0.5 text-emerald-800 dark:text-[#4ade80] font-sans font-bold">
                        {s.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeFeatureTab === 'helpdesk' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="rounded-full bg-teal-100 dark:bg-teal-950/60 px-3 py-1 text-xs font-bold text-teal-800 dark:text-[#2dd4bf]">
                  Autonomous Customer Support
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  94% Automated Resolution with USPS Lookups
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  AI scans customer inquiries, pulls live tracking coordinates, and drafts personalized replies ready for 1-click dispatch.
                </p>
                <Link
                  href="/ai-customer-service"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 dark:text-[#2dd4bf] hover:underline pt-2"
                >
                  <span>Open AI Customer Helpdesk</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="rounded-2xl bg-slate-50 dark:bg-[#0f1117] p-4 border border-slate-200 dark:border-slate-800 space-y-2.5 text-xs">
                <div className="rounded-xl bg-slate-100 dark:bg-white/5 p-3">
                  <p className="font-bold text-slate-900 dark:text-white">Customer: "Where is my order #TK-9821?"</p>
                </div>
                <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-3 border border-emerald-200 dark:border-emerald-900/50">
                  <p className="font-bold text-emerald-900 dark:text-[#4ade80] mb-1">🤖 AI Auto-Drafted Reply:</p>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    "Hi Sarah! Your package was dispatched via USPS Priority (Tracking #940011189956). It is currently Out for Delivery and will arrive today by 4:00 PM!"
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Interactive Pre-Listing Calculator Section */}
      <section id="calculator" className="py-20 bg-slate-100/60 dark:bg-[#0f1117] border-y border-slate-200 dark:border-slate-800 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-[#4ade80]">Live Interactive Demo</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              Try the TikTok Profit Calculator
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Test viral product economics live. Select a product preset or adjust the sliders.
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-slate-400 mr-1">Product Presets:</span>
            <button
              onClick={() => applyPreset(34.99, 6.50, 3.80, 7.50)}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121620] px-3 py-1.5 text-xs font-semibold hover:border-lime-500 transition-colors"
            >
              🌅 Sunset Lamp ($34.99)
            </button>
            <button
              onClick={() => applyPreset(49.99, 11.20, 4.20, 10.00)}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121620] px-3 py-1.5 text-xs font-semibold hover:border-lime-500 transition-colors"
            >
              🎙️ Lavalier Mic ($49.99)
            </button>
            <button
              onClick={() => applyPreset(24.99, 3.90, 3.50, 5.00)}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121620] px-3 py-1.5 text-xs font-semibold hover:border-lime-500 transition-colors"
            >
              ✨ Gua Sha Set ($24.99)
            </button>
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
                  className="w-full accent-lime-500 cursor-pointer"
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
                  className="w-full accent-lime-500 cursor-pointer"
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
                  className="w-full accent-lime-500 cursor-pointer"
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
                  className="w-full accent-lime-500 cursor-pointer"
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
                  <span>TikTok Platform Fees:</span>
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

      {/* ROI Estimator Section */}
      <section id="roi" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-[#c084fc]">Value Estimator</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            How Much Money Does RushNshop Save You?
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Calculate your estimated annual profit recovery based on order volume.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#121620] p-6 sm:p-8 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="flex justify-between text-xs font-bold">
              <span>Monthly Order Volume:</span>
              <span className="text-purple-600 dark:text-[#c084fc] font-mono-numeric text-sm">{monthlyOrders.toLocaleString()} Orders / mo</span>
            </div>
            <input
              type="range"
              min="500"
              max="20000"
              step="500"
              value={monthlyOrders}
              onChange={(e) => setMonthlyOrders(parseInt(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Based on historical e-commerce recovery rates from uncalculated shipping overcharges, hidden platform fees, and saved virtual assistant hours.
            </p>
          </div>

          <div className="rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 p-5 border border-purple-200 dark:border-purple-900/50 space-y-3 font-mono-numeric">
            <div>
              <p className="text-xs text-purple-800 dark:text-purple-300 font-sans font-bold">Estimated Annual Profit Recovery:</p>
              <p className="text-3xl font-black text-purple-600 dark:text-[#c084fc] mt-1">
                ${((monthlyOrders * 1.85) * 12).toLocaleString('en-US', { maximumFractionDigits: 0 })} / yr
              </p>
            </div>
            <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300 font-sans">
              <p>✓ ~{(monthlyOrders * 0.04).toFixed(0)} hours saved on CS & VA operations</p>
              <p>✓ ~${(monthlyOrders * 0.95 * 12).toLocaleString()} saved from TikTok ad CPA misallocations</p>
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
            No hidden percentage cuts. Unlimited order syncing and GAAP P&L statement generation.
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
      <section id="faq" className="py-20 bg-slate-100/60 dark:bg-[#0f1117] border-t border-slate-200 dark:border-slate-800 px-4 sm:px-6">
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

      {/* Comprehensive Enterprise SaaS Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#080a0f] pt-16 pb-12 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Top Row: Brand & Newsletter */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-slate-100 dark:border-slate-800/80">
            <div className="lg:col-span-5 space-y-4">
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
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
                The leading TikTok Shop multi-account operating system. Combining TrueProfit waterfall accounting, generative AI listing studio, and customer service automation.
              </p>
              {/* Trust Badges */}
              <div className="flex items-center gap-4 text-[11px] font-semibold text-slate-400 pt-2">
                <span className="flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-emerald-500" />
                  256-Bit SSL
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-blue-500" />
                  SOC2 Type II
                </span>
                <span className="flex items-center gap-1.5">
                  <Award className="h-3.5 w-3.5 text-purple-500" />
                  TikTok Open API
                </span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-3">
              <p className="text-xs font-bold text-slate-900 dark:text-white">
                Subscribe to TikTok Shop Operator Insights
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Receive weekly breakdown of trending viral SKUs, platform policy changes, and unit economics tactics.
              </p>
              {subscribed ? (
                <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-3 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-800 dark:text-[#4ade80] flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Thank you for subscribing to RushNshop Insights!</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-2 max-w-md">
                  <input
                    type="email"
                    required
                    placeholder="Enter work email..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#121620] px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:border-lime-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 rounded-xl bg-[#84cc16] px-4 py-2.5 text-xs font-bold text-black hover:bg-[#72b012] transition-colors shrink-0"
                  >
                    <span>Subscribe</span>
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Middle Row: 4-Column Directory */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs">
            {/* Col 1 */}
            <div className="space-y-3">
              <p className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">Product</p>
              <ul className="space-y-2 text-slate-500 dark:text-slate-400 font-medium">
                <li><Link href="/profit-analytics" className="hover:text-slate-900 dark:hover:text-white transition-colors">TrueProfit Analytics</Link></li>
                <li><Link href="/stores" className="hover:text-slate-900 dark:hover:text-white transition-colors">Multi-Store Hub</Link></li>
                <li><Link href="/calculator" className="hover:text-slate-900 dark:hover:text-white transition-colors">Unit Economics Calculator</Link></li>
                <li><Link href="/ads-analytics" className="hover:text-slate-900 dark:hover:text-white transition-colors">TikTok Spark Ads API</Link></li>
                <li><Link href="/ai-assistant" className="hover:text-slate-900 dark:hover:text-white transition-colors">AI Video Script Studio</Link></li>
                <li><Link href="/ai-customer-service" className="hover:text-slate-900 dark:hover:text-white transition-colors">AI Customer Helpdesk</Link></li>
              </ul>
            </div>

            {/* Col 2 */}
            <div className="space-y-3">
              <p className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">Solutions</p>
              <ul className="space-y-2 text-slate-500 dark:text-slate-400 font-medium">
                <li><Link href="/dashboard" className="hover:text-slate-900 dark:hover:text-white transition-colors">TikTok Shop US Sellers</Link></li>
                <li><Link href="/dashboard" className="hover:text-slate-900 dark:hover:text-white transition-colors">UK & EU Cross-Border</Link></li>
                <li><Link href="/dashboard" className="hover:text-slate-900 dark:hover:text-white transition-colors">Multi-Account Agencies</Link></li>
                <li><Link href="/dashboard" className="hover:text-slate-900 dark:hover:text-white transition-colors">3PL High-Volume Brands</Link></li>
                <li><Link href="/dashboard" className="hover:text-slate-900 dark:hover:text-white transition-colors">Creator Affiliate Networks</Link></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div className="space-y-3">
              <p className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">Resources</p>
              <ul className="space-y-2 text-slate-500 dark:text-slate-400 font-medium">
                <li><Link href="/reports" className="hover:text-slate-900 dark:hover:text-white transition-colors">GAAP P&L Statement Guide</Link></li>
                <li><Link href="/calculator" className="hover:text-slate-900 dark:hover:text-white transition-colors">Break-Even Calculator Tool</Link></li>
                <li><Link href="/settings" className="hover:text-slate-900 dark:hover:text-white transition-colors">TikTok API Webhook Specs</Link></li>
                <li><a href="https://github.com/shahzaibbusiness2026-work/RushNShop-Dashboard.git" target="_blank" rel="noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors">GitHub Repository</a></li>
                <li><span className="inline-flex items-center gap-1 text-emerald-600 dark:text-[#4ade80]">● Systems 99.99% Operational</span></li>
              </ul>
            </div>

            {/* Col 4 */}
            <div className="space-y-3">
              <p className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">Company</p>
              <ul className="space-y-2 text-slate-500 dark:text-slate-400 font-medium">
                <li><Link href="/dashboard" className="hover:text-slate-900 dark:hover:text-white transition-colors">About RushNshop</Link></li>
                <li><Link href="/settings" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy & Data Security</Link></li>
                <li><Link href="/settings" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/ai-customer-service" className="hover:text-slate-900 dark:hover:text-white transition-colors">Contact Support</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright & Back to Top */}
          <div className="pt-8 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>© 2024 RushNshop AI Operating System. All rights reserved. TikTok is a registered trademark of ByteDance Ltd.</p>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors font-semibold"
            >
              <span>Back to Top</span>
              <ChevronUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
