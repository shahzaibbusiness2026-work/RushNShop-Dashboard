'use client';
import Image from 'next/image';
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
  Menu,
  X,
  Scale,
  CreditCard,
  HeartHandshake,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatCurrency, formatPercent, cn, calculateUnitEconomics } from '../lib/utils';

export default function RootLandingPage() {
  const { theme, toggleTheme } = useStore();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeFeatureTab, setActiveFeatureTab] = useState<
    'profit' | 'ai' | 'ads' | 'stores' | 'helpdesk'
  >('profit');
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
  const [calcCogs, setCalcCogs] = useState<number>(6.5);
  const [calcShipping, setCalcShipping] = useState<number>(3.8);
  const [calcAdCpa, setCalcAdCpa] = useState<number>(7.5);
  const [activePreset, setActivePreset] = useState<string>('sunset');

  // ROI Estimator State
  const [monthlyOrders, setMonthlyOrders] = useState<number>(2500);

  const calcResults = calculateUnitEconomics({
    sellingPrice: calcPrice,
    cogs: calcCogs,
    shippingCost: calcShipping,
    packagingCost: 0.9,
    tiktokFeePercent: 5.0,
    paymentFeePercent: 2.9,
    paymentFeeFixed: 0.3,
    affiliatePercent: 10.0,
    adCpa: calcAdCpa,
    otherExpenses: 0.4,
    targetMarginPercent: 40.0,
  });

  const applyPreset = (key: string, price: number, cogs: number, shipping: number, cpa: number) => {
    setActivePreset(key);
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
    <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900 dark:bg-[#090d16] dark:text-slate-100">
      {/* Navigation Bar with Direct Page Navigation */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur-md transition-colors dark:border-slate-800 dark:bg-[#090d16]/90 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-90"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs">
              <Zap className="h-5 w-5 fill-current" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
                RushNshop
              </span>
            </div>
          </Link>

          {/* Desktop & Tablet Navigation Links - Direct Page Routes */}
          <div className="hidden items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-300 md:flex lg:gap-1.5">
            <Link
              href="/dashboard"
              className="rounded-lg px-3 py-1.5 transition-all hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/5 dark:hover:text-white"
            >
              Dashboard
            </Link>
            <Link
              href="/profit-analytics"
              className="rounded-lg px-3 py-1.5 transition-all hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/5 dark:hover:text-white"
            >
              Profit Analytics
            </Link>
            <Link
              href="/calculator"
              className="rounded-lg px-3 py-1.5 transition-all hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/5 dark:hover:text-white"
            >
              Calculator
            </Link>
            <Link
              href="/compare"
              className="rounded-lg px-3 py-1.5 transition-all hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/5 dark:hover:text-white"
            >
              Compare SKUs
            </Link>
            <Link
              href="/ai-assistant"
              className="rounded-lg px-3 py-1.5 transition-all hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/5 dark:hover:text-white"
            >
              AI Studio
            </Link>
            <Link
              href="/pricing"
              className="rounded-lg px-3 py-1.5 transition-all hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/5 dark:hover:text-white"
            >
              Pricing
            </Link>
          </div>

          {/* Actions: Theme Toggle, Dashboard Button, Mobile Menu Button */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-[#0f1420] dark:text-slate-300 dark:hover:bg-white/5"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-slate-700" />
              )}
            </button>

            {/* Dashboard App Link */}
            <Link
              href="/dashboard"
              className="hidden items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white sm:inline-flex"
            >
              <Zap className="h-3.5 w-3.5 fill-current text-emerald-400 dark:text-emerald-600" />
              <span>Open Dashboard</span>
            </Link>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              aria-label="Toggle mobile navigation menu"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-800 dark:bg-[#0f1420] dark:text-slate-200 md:hidden"
            >
              {mobileNavOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Drawer */}
        {mobileNavOpen && (
          <>
            <div
              className="fixed inset-0 top-[61px] z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileNavOpen(false)}
            />
            <div className="animate-in fade-in slide-in-from-top-2 relative z-50 mt-3 space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl dark:border-slate-800 dark:bg-[#0f1420] md:hidden">
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileNavOpen(false)}
                  className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5 transition-colors hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10"
                >
                  <span>📊 Dashboard</span>
                  <ArrowRight className="h-3 w-3 text-slate-400" />
                </Link>
                <Link
                  href="/profit-analytics"
                  onClick={() => setMobileNavOpen(false)}
                  className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5 transition-colors hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10"
                >
                  <span>📈 Profit Analytics</span>
                  <ArrowRight className="h-3 w-3 text-slate-400" />
                </Link>
                <Link
                  href="/calculator"
                  onClick={() => setMobileNavOpen(false)}
                  className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5 transition-colors hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10"
                >
                  <span>🧮 Calculator</span>
                  <ArrowRight className="h-3 w-3 text-slate-400" />
                </Link>
                <Link
                  href="/compare"
                  onClick={() => setMobileNavOpen(false)}
                  className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5 transition-colors hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10"
                >
                  <span>⚖️ Compare SKUs</span>
                  <ArrowRight className="h-3 w-3 text-slate-400" />
                </Link>
                <Link
                  href="/ai-assistant"
                  onClick={() => setMobileNavOpen(false)}
                  className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5 transition-colors hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10"
                >
                  <span>✨ AI Studio</span>
                  <ArrowRight className="h-3 w-3 text-slate-400" />
                </Link>
                <Link
                  href="/pricing"
                  onClick={() => setMobileNavOpen(false)}
                  className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5 transition-colors hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10"
                >
                  <span>🏷️ Pricing</span>
                  <ArrowRight className="h-3 w-3 text-slate-400" />
                </Link>
              </div>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileNavOpen(false)}
                  className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-emerald-600 py-3 text-xs font-semibold text-white transition-colors hover:bg-emerald-500"
                >
                  <Zap className="h-3.5 w-3.5 fill-current" />
                  <span>Launch Live Dashboard</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </>
        )}
      </nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="relative mx-auto max-w-7xl overflow-hidden px-4 pb-20 pt-14 text-center sm:px-6 sm:pb-28 sm:pt-20"
      >
        {/* Subtle Background Glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/4 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-3xl sm:h-[400px] sm:w-[600px]" />

        {/* Floating Stat Badge 1 (Left) */}
        <div className="font-mono-numeric absolute left-6 top-20 z-20 hidden items-center gap-2.5 rounded-2xl border border-slate-200 bg-white/95 p-3 text-left shadow-md dark:border-slate-800 dark:bg-[#0f1420]/95 lg:flex">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
            <Flame className="h-5 w-5 fill-current" />
          </div>
          <div>
            <p className="font-sans text-[11px] font-semibold text-slate-900 dark:text-slate-100">
              Top Profit SKU
            </p>
            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              +$14,820 Net Profit
            </p>
          </div>
        </div>

        {/* Floating Stat Badge 2 (Right) */}
        <div className="font-mono-numeric absolute right-6 top-24 z-20 hidden items-center gap-2.5 rounded-2xl border border-slate-200 bg-white/95 p-3 text-left shadow-md dark:border-slate-800 dark:bg-[#0f1420]/95 lg:flex">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
            <Megaphone className="h-5 w-5" />
          </div>
          <div>
            <p className="font-sans text-[11px] font-semibold text-slate-900 dark:text-slate-100">
              Spark Ads Scaled
            </p>
            <p className="text-xs font-bold text-blue-600 dark:text-blue-400">4.82x Blended ROAS</p>
          </div>
        </div>

        {/* Main Hero Header */}
        <div className="relative z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>The Operating System for High-Growth TikTok Shop Brands</span>
          </div>

          <h1 className="mx-auto max-w-4xl text-3xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl md:text-6xl">
            Scale Multi-Store TikTok Operations with{' '}
            <span className="text-emerald-600 dark:text-emerald-400">
              100% Real Profit Visibility
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
            Eliminate guesswork on hidden TikTok platform take-rates, shipping charges, creator affiliate splits, and ad CPA. Real-time accounting, viral AI video scripts, and multi-store intelligence in one place.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/dashboard"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-7 py-3.5 text-xs font-semibold text-white shadow-xs transition-all hover:bg-emerald-500 sm:w-auto"
            >
              <Zap className="h-4 w-4 fill-current" />
              <span>Launch Live Dashboard</span>
            </Link>
            <Link
              href="/calculator"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-xs font-semibold text-slate-800 transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-[#0f1420] dark:text-slate-200 dark:hover:bg-white/5 sm:w-auto"
            >
              <Calculator className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>Test Profit Simulator</span>
            </Link>
          </div>

          {/* Hero Interactive App Window Preview */}
          <div className="relative mx-auto mt-12 max-w-5xl rounded-3xl border border-slate-200 bg-white p-3 shadow-xl dark:border-slate-800 dark:bg-[#0f1420] sm:p-4">
            <div className="flex items-center justify-between border-b border-slate-100 px-2 pb-3 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                <span className="ml-2 text-[11px] font-medium text-slate-400">
                  rushnshop.com/dashboard
                </span>
              </div>
              <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400">
                ● Live TikTok Sync Active
              </span>
            </div>

            {/* Simulated Live Grid inside Mockup */}
            <div className="font-mono-numeric mt-3 grid grid-cols-2 gap-3 text-left sm:grid-cols-4">
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-[#141a29]">
                <p className="font-sans text-[10px] text-slate-400">Gross Revenue</p>
                <p className="mt-0.5 text-base font-bold text-slate-900 dark:text-slate-100 sm:text-lg">
                  $25,430.80
                </p>
                <p className="font-sans text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                  ↑ 18.6% MTD
                </p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-[#141a29]">
                <p className="font-sans text-[10px] text-slate-400">True Net Profit</p>
                <p className="mt-0.5 text-base font-bold text-emerald-600 dark:text-emerald-400 sm:text-lg">
                  $13,224.00
                </p>
                <p className="font-sans text-[10px] text-slate-400">52.0% Real Margin</p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-[#141a29]">
                <p className="font-sans text-[10px] text-slate-400">Total Orders</p>
                <p className="mt-0.5 text-base font-bold text-slate-900 dark:text-slate-100 sm:text-lg">
                  840 Orders
                </p>
                <p className="font-sans text-[10px] text-slate-400">4 Global Stores</p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-[#141a29]">
                <p className="font-sans text-[10px] text-slate-400">AI Automation</p>
                <p className="mt-0.5 text-base font-bold text-slate-900 dark:text-slate-100 sm:text-lg">
                  94% Rate
                </p>
                <p className="font-sans text-[10px] text-slate-400">Instant Resolution</p>
              </div>
            </div>

            {/* Clickable Overlay to Open Real Dashboard */}
            <Link
              href="/dashboard"
              className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-2.5 text-xs font-semibold text-white transition-all hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
            >
              <span>Click to Enter Interactive Dashboard</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Infinite Region Ribbon */}
      <section className="select-none overflow-hidden border-y border-slate-200 bg-white/70 py-4 dark:border-slate-800 dark:bg-[#0f1420]/70">
        <div className="animate-marquee flex items-center gap-8 text-xs font-medium text-slate-600 dark:text-slate-300">
          <span className="flex items-center gap-2">🇺🇸 TikTok Shop US Partner</span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="flex items-center gap-2">🇬🇧 TikTok Shop UK Active</span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="flex items-center gap-2">🇩🇪 TikTok Shop DE Cross-Border</span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="flex items-center gap-2">🇨🇦 TikTok Shop CA Sync</span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="flex items-center gap-2">⚡ Spark Ads API Attribution</span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="flex items-center gap-2">🔒 256-Bit SSL Encrypted</span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="flex items-center gap-2">📦 3PL & Carrier Tracking</span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="flex items-center gap-2">🇺🇸 TikTok Shop US Partner</span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="flex items-center gap-2">🇬🇧 TikTok Shop UK Active</span>
        </div>
      </section>

      {/* Core Solutions Grid */}
      <section className="mx-auto max-w-6xl space-y-12 px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Why RushNshop
          </span>
          <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100 sm:text-3xl">
            Built for the Realities of TikTok Commerce
          </h2>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
            Standard e-commerce analytics ignore TikTok's platform take-rates, creator commissions, and Spark Ads attribution.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* The Old Way */}
          <div className="space-y-4 rounded-3xl border border-rose-200 bg-white p-6 dark:border-rose-900/40 dark:bg-[#0f1420] sm:p-8">
            <div className="flex items-center gap-2">
              <span className="rounded-lg bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700 dark:bg-rose-950/60 dark:text-rose-400">
                ❌ Traditional Fragmented Tools
              </span>
            </div>
            <ul className="space-y-3.5 text-xs font-normal text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-rose-500">✕</span>
                <span>Guessing profit margins while platform commissions and return shipping drain your payouts.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-rose-500">✕</span>
                <span>Constantly switching between seller accounts across different global regions.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-rose-500">✕</span>
                <span>Hours writing hooks and descriptions that fail to gain organic TikTok traction.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-rose-500">✕</span>
                <span>Customer support delays leading to cancellation penalties and store health degradation.</span>
              </li>
            </ul>
          </div>

          {/* The RushNshop Way */}
          <div className="space-y-4 rounded-3xl border border-emerald-500/50 bg-white p-6 dark:border-emerald-500/40 dark:bg-[#0f1420] sm:p-8">
            <div className="flex items-center gap-2">
              <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                ⚡ The RushNshop Operating System
              </span>
            </div>
            <ul className="space-y-3.5 text-xs font-normal text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-emerald-500">✓</span>
                <span><strong>TrueProfit Waterfall Accounting:</strong> Real-time deduction of COGS, fees, ads, and expenses.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-emerald-500">✓</span>
                <span><strong>Unified Multi-Account Hub:</strong> Switch stores in 1 click or view global blended financials.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-emerald-500">✓</span>
                <span><strong>AI Viral Script Studio:</strong> Generate high-converting hooks, scene scripts, and SEO titles instantly.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-emerald-500">✓</span>
                <span><strong>Autonomous Customer Helpdesk:</strong> Smart auto-replies trained on live carrier tracking coordinates.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Feature Deep-Dive Modules */}
      <section className="mx-auto max-w-7xl space-y-10 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Platform Modules
          </span>
          <h2 className="mt-1 text-3xl font-bold text-slate-900 dark:text-slate-100">
            Engineered for High-Volume Sellers
          </h2>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
            Explore the core features designed to automate and scale your TikTok operations.
          </p>
        </div>

        {/* Feature Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
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
                  'flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all cursor-pointer',
                  isActive
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                    : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-[#0f1420] dark:text-slate-400 dark:hover:bg-white/5',
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tab Preview Card */}
        <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#0f1420] sm:p-10">
          {activeFeatureTab === 'profit' && (
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                  Real-Time GAAP Deductions
                </span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Accurate Take-Home Profit Accounting
                </h3>
                <p className="text-xs font-normal leading-relaxed text-slate-600 dark:text-slate-400 sm:text-sm">
                  RushNshop’s waterfall deduction model subtracts every single micro-fee before declaring net profit:
                </p>
                <div className="space-y-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Gross GMV & TikTok Discounts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Product COGS & 3PL Shipping Prep</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span>TikTok 5% Commission + Merchant Processing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Creator Affiliate Splits & Spark Ad CPA</span>
                  </div>
                </div>
                <Link
                  href="/profit-analytics"
                  className="inline-flex items-center gap-1.5 pt-2 text-xs font-semibold text-emerald-600 hover:underline dark:text-emerald-400"
                >
                  <span>Explore Profit Analytics Engine</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Visual Demo Card */}
              <div className="font-mono-numeric space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-[#141a29]">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2 text-xs dark:border-slate-800">
                  <span className="font-sans font-semibold text-slate-800 dark:text-slate-200">
                    Order Waterfall Sample
                  </span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    +$18.42 Net Profit
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between font-sans text-slate-600 dark:text-slate-400">
                    <span>Gross Selling Price</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">$34.99</span>
                  </div>
                  <div className="flex justify-between font-sans text-rose-500">
                    <span>- Supplier COGS</span>
                    <span className="font-medium">-$6.50</span>
                  </div>
                  <div className="flex justify-between font-sans text-rose-500">
                    <span>- Inbound Freight & Courier Delivery</span>
                    <span className="font-medium">-$3.80</span>
                  </div>
                  <div className="flex justify-between font-sans text-rose-500">
                    <span>- TikTok 5% Commission</span>
                    <span className="font-medium">-$1.75</span>
                  </div>
                  <div className="flex justify-between font-sans text-rose-500">
                    <span>- Payment Gateway (2.9% + $0.30)</span>
                    <span className="font-medium">-$1.31</span>
                  </div>
                  <div className="flex justify-between font-sans text-blue-500">
                    <span>- TikTok Spark Ad CPA</span>
                    <span className="font-medium">-$3.21</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-2 font-sans text-sm font-bold text-emerald-600 dark:border-slate-800 dark:text-emerald-400">
                    <span>Final Net Profit Margin</span>
                    <span>52.6% ($18.42)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeFeatureTab === 'ai' && (
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700 dark:bg-purple-950/60 dark:text-purple-400">
                  Generative Video Studio
                </span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Generate High-Converting Video Scripts
                </h3>
                <p className="text-xs font-normal leading-relaxed text-slate-600 dark:text-slate-400 sm:text-sm">
                  Generates scene-by-scene audio voiceovers, on-screen text overlays, and SEO product bullet points tailored for TikTok.
                </p>
                <Link
                  href="/ai-assistant"
                  className="inline-flex items-center gap-1.5 pt-2 text-xs font-semibold text-purple-600 hover:underline dark:text-purple-400"
                >
                  <span>Open AI Video Studio</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-xs dark:border-slate-800 dark:bg-[#141a29]">
                <div className="rounded-xl border border-purple-200 bg-purple-50 p-3 dark:border-purple-900/50 dark:bg-purple-950/30">
                  <p className="mb-1 font-bold text-purple-900 dark:text-purple-200">
                    🎯 3-Second Visual Hook:
                  </p>
                  <p className="italic text-slate-700 dark:text-slate-300">
                    "Stop scrolling if you’re still wasting 20 minutes cleaning your blender every morning!"
                  </p>
                </div>
                <div className="space-y-1 rounded-xl bg-slate-100 p-3 dark:bg-white/5">
                  <p className="font-semibold text-slate-800 dark:text-slate-200">
                    🎬 Scene 1 (0:00 - 0:08):
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    Close up pouring water & pressing turbo button. Audio: upbeat trending lofi beat.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeFeatureTab === 'ads' && (
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-400">
                  Marketing API Sync
                </span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  TikTok Spark Ads & Creator Attribution
                </h3>
                <p className="text-xs font-normal leading-relaxed text-slate-600 dark:text-slate-400 sm:text-sm">
                  Track blended ROAS, individual creator affiliate performance, and receive automated budget scaling alerts.
                </p>
                <Link
                  href="/ads-analytics"
                  className="inline-flex items-center gap-1.5 pt-2 text-xs font-semibold text-blue-600 hover:underline dark:text-blue-400"
                >
                  <span>View Ads Analytics</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="font-mono-numeric space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-[#141a29]">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2 text-xs dark:border-slate-800">
                  <span className="font-sans font-semibold text-slate-800 dark:text-slate-200">
                    Campaign Performance
                  </span>
                  <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400">
                    Scale +20% Budget
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <p className="font-sans text-[10px] text-slate-400">Spend</p>
                    <p className="font-bold text-slate-900 dark:text-slate-100">$840.00</p>
                  </div>
                  <div>
                    <p className="font-sans text-[10px] text-slate-400">Revenue</p>
                    <p className="font-bold text-emerald-600 dark:text-emerald-400">$4,048.80</p>
                  </div>
                  <div>
                    <p className="font-sans text-[10px] text-slate-400">ROAS</p>
                    <p className="font-bold text-blue-600 dark:text-blue-400">4.82x</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeFeatureTab === 'stores' && (
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  Global Accounts
                </span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Multi-Store Account Management
                </h3>
                <p className="text-xs font-normal leading-relaxed text-slate-600 dark:text-slate-400 sm:text-sm">
                  Manage accounts in USA, UK, Germany, and Canada from a single master dashboard.
                </p>
                <Link
                  href="/stores"
                  className="inline-flex items-center gap-1.5 pt-2 text-xs font-semibold text-emerald-600 hover:underline dark:text-emerald-400"
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
                  <div
                    key={s.name}
                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs dark:border-slate-800 dark:bg-[#141a29]"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{s.flag}</span>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">{s.name}</span>
                    </div>
                    <div className="font-mono-numeric flex items-center gap-3">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">{s.rev}</span>
                      <span className="rounded-md bg-emerald-100 px-1.5 py-0.5 font-sans text-[10px] font-semibold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400">
                        {s.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeFeatureTab === 'helpdesk' && (
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 dark:bg-teal-950/60 dark:text-teal-400">
                  Autonomous Customer Support
                </span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Automated Resolution with Tracking Lookups
                </h3>
                <p className="text-xs font-normal leading-relaxed text-slate-600 dark:text-slate-400 sm:text-sm">
                  Scans customer inquiries, retrieves live tracking coordinates, and drafts replies ready for dispatch.
                </p>
                <Link
                  href="/ai-customer-service"
                  className="inline-flex items-center gap-1.5 pt-2 text-xs font-semibold text-teal-600 hover:underline dark:text-teal-400"
                >
                  <span>Open AI Customer Helpdesk</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="space-y-2.5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs dark:border-slate-800 dark:bg-[#141a29]">
                <div className="rounded-xl bg-slate-100 p-3 dark:bg-white/5">
                  <p className="font-semibold text-slate-900 dark:text-slate-100">
                    Customer: "Where is my order #TK-9821?"
                  </p>
                </div>
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-900/50 dark:bg-emerald-950/40">
                  <p className="mb-1 font-semibold text-emerald-900 dark:text-emerald-400">
                    🤖 Auto-Drafted Reply:
                  </p>
                  <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                    "Hi Sarah! Your package was dispatched via USPS Priority (Tracking #940011189956). It is currently Out for Delivery and will arrive today by 4:00 PM!"
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Pricing Navigation Banner */}
      <section className="border-t border-slate-200 bg-white px-4 py-16 dark:border-slate-800 dark:bg-[#0f1420] sm:px-6">
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Simple Pricing
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
            Predictable Plans for Growing Brands
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Transparent pricing without percentage cuts. Unlock multi-store synchronization, unit economics studio, and automated reporting.
          </p>
          <div className="pt-2">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white text-white rounded-xl text-xs font-semibold transition-all shadow-xs"
            >
              <span>View All Pricing Plans</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="border-t border-slate-200 bg-slate-50 px-4 py-16 dark:border-slate-800 dark:bg-[#090d16] sm:px-6">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Questions & Answers
            </span>
            <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100 sm:text-3xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#0f1420]"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between p-4 text-left text-xs font-semibold text-slate-900 dark:text-slate-100 sm:text-sm cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 text-slate-400 transition-transform duration-200',
                        isOpen && 'rotate-180',
                      )}
                    />
                  </button>
                  {isOpen && (
                    <div className="border-t border-slate-100 px-4 pb-4 pt-2 text-xs font-normal leading-relaxed text-slate-600 dark:border-slate-800/60 dark:text-slate-400">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comprehensive Footer */}
      <footer className="border-t border-slate-200 bg-white px-4 pb-12 pt-16 dark:border-slate-800 dark:bg-[#080a0f] sm:px-8">
        <div className="mx-auto max-w-7xl space-y-12">
          {/* Top Row: Brand & Newsletter */}
          <div className="grid grid-cols-1 gap-8 border-b border-slate-100 pb-12 dark:border-slate-800/80 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs">
                  <Zap className="h-5 w-5 fill-current" />
                </div>
                <div>
                  <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
                    RushNshop
                  </span>
                </div>
              </div>
              <p className="max-w-sm text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                The operating system for multi-account TikTok Shop operators. Real-time waterfall accounting, generative AI listing studio, and multi-store intelligence.
              </p>
              {/* Trust Badges */}
              <div className="flex items-center gap-4 pt-2 text-[11px] font-semibold text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-emerald-500" />
                  256-Bit SSL
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-blue-500" />
                  SOC2 Type II
                </span>
                <span className="flex items-center gap-1.5">
                  <Award className="h-3.5 w-3.5 text-emerald-500" />
                  TikTok Open API
                </span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="flex flex-col justify-center space-y-3 lg:col-span-7">
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                Subscribe to Operator Insights
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Weekly breakdown of trending viral SKUs, platform policy shifts, and unit economics benchmarks.
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-semibold text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Thank you for subscribing!</span>
                </div>
              ) : (
                <form
                  onSubmit={handleNewsletterSubmit}
                  className="flex max-w-md items-center gap-2"
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter work email..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-[#0f1420] dark:text-slate-100"
                  />
                  <button
                    type="submit"
                    className="flex shrink-0 items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-500 cursor-pointer"
                  >
                    <span>Subscribe</span>
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Directory Links */}
          <div className="grid grid-cols-2 gap-8 text-xs md:grid-cols-4">
            <div className="space-y-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                Product & Tools
              </p>
              <ul className="space-y-2 font-normal text-slate-500 dark:text-slate-400">
                <li>
                  <Link href="/dashboard" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                    Dashboard Overview
                  </Link>
                </li>
                <li>
                  <Link href="/profit-analytics" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                    Profit Analytics
                  </Link>
                </li>
                <li>
                  <Link href="/calculator" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                    Unit Margin Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/compare" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                    Product Comparison Studio
                  </Link>
                </li>
                <li>
                  <Link href="/listings" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                    TikTok Shop Listings Hub
                  </Link>
                </li>
                <li>
                  <Link href="/ai-assistant" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                    AI Script Generator
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                Management
              </p>
              <ul className="space-y-2 font-normal text-slate-500 dark:text-slate-400">
                <li>
                  <Link href="/stores" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                    Multi-Store Accounts
                  </Link>
                </li>
                <li>
                  <Link href="/orders" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                    Orders Hub
                  </Link>
                </li>
                <li>
                  <Link href="/ads-analytics" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                    TikTok Spark Ads
                  </Link>
                </li>
                <li>
                  <Link href="/ai-customer-service" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                    AI Customer Service
                  </Link>
                </li>
                <li>
                  <Link href="/history" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                    Audit History
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                Resources
              </p>
              <ul className="space-y-2 font-normal text-slate-500 dark:text-slate-400">
                <li>
                  <Link href="/reports" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                    GAAP Financial Reports
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                    Pricing Plans
                  </Link>
                </li>
                <li>
                  <a
                    href="https://github.com/shahzaibbusiness2026-work/RushNShop-Dashboard.git"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    GitHub Repository
                  </a>
                </li>
                <li>
                  <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                    ● Systems 99.99% Operational
                  </span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                Account & Settings
              </p>
              <ul className="space-y-2 font-normal text-slate-500 dark:text-slate-400">
                <li>
                  <Link href="/settings" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                    Store Settings & Webhooks
                  </Link>
                </li>
                <li>
                  <Link href="/customers" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                    Customer Directory
                  </Link>
                </li>
                <li>
                  <Link href="/expenses" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                    Operating Expenses
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright & Back to Top */}
          <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 text-xs text-slate-400 dark:border-slate-800/80 sm:flex-row">
            <p>
              © 2026 RushNshop Operating System. All rights reserved. TikTok is a registered trademark of ByteDance Ltd.
            </p>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 font-medium text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white cursor-pointer"
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
