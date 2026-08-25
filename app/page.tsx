'use client';
import Image from 'next/image';
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { ButtonPrimary } from '../components/ui/ButtonPrimary';
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
    <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900 selection:bg-lime-400 selection:text-black dark:bg-[#0b0e14] dark:text-slate-100">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 px-4 py-3 backdrop-blur-md transition-colors dark:border-slate-800/80 dark:bg-[#0b0e14]/90 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-90"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-lime-500 to-green-400 text-black shadow-md shadow-green-500/20">
              <Zap className="h-5 w-5 fill-current font-black text-black" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                RushNshop
              </span>
              <span className="rounded-md bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-[#4ade80]">
                AI OS
              </span>
            </div>
          </Link>

          {/* Desktop & Tablet Navigation Links */}
          <div className="hidden items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-300 md:flex lg:gap-2">
            <a
              href="#features"
              className="rounded-lg px-3 py-1.5 transition-all hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white"
            >
              Features
            </a>
            <a
              href="#trueprofit"
              className="rounded-lg px-3 py-1.5 transition-all hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white"
            >
              TrueProfit
            </a>
            <a
              href="#calculator"
              className="rounded-lg px-3 py-1.5 transition-all hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white"
            >
              Calculator
            </a>
            <a
              href="#roi"
              className="rounded-lg px-3 py-1.5 transition-all hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white"
            >
              ROI Estimator
            </a>
            <a
              href="#pricing"
              className="rounded-lg px-3 py-1.5 transition-all hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white"
            >
              Pricing
            </a>
            <a
              href="#faq"
              className="rounded-lg px-3 py-1.5 transition-all hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white"
            >
              FAQ
            </a>
          </div>

          {/* Actions: Theme Toggle, Dashboard Button, Mobile Menu Button */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="shadow-2xs flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-[#161b26] dark:text-slate-300 dark:hover:bg-white/10"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4 fill-amber-400/20 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-slate-700" />
              )}
            </button>

            {/* Dashboard App Link */}
            <Link
              href="/dashboard"
              className="shadow-2xs hidden items-center gap-1.5 rounded-xl bg-[#84cc16] px-3.5 py-2 text-xs font-bold text-black transition-all hover:bg-[#72b012] hover:shadow-rush-glow active:scale-95 sm:inline-flex"
            >
              <Zap className="h-3.5 w-3.5 fill-current" />
              <span>Launch Dashboard</span>
            </Link>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              aria-label="Toggle mobile navigation menu"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-800 dark:bg-[#161b26] dark:text-slate-200 dark:hover:bg-white/5 md:hidden"
            >
              {mobileNavOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
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
            <div className="animate-in fade-in slide-in-from-top-2 relative z-50 mt-3 space-y-3 rounded-2xl border border-slate-200/90 bg-white/95 p-4 shadow-2xl backdrop-blur-xl dark:border-slate-800/90 dark:bg-[#121620]/95 md:hidden">
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                <a
                  href="#features"
                  onClick={() => setMobileNavOpen(false)}
                  className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5 transition-colors hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10"
                >
                  <span>⚡ Features</span>
                  <ArrowRight className="h-3 w-3 text-slate-400" />
                </a>
                <a
                  href="#trueprofit"
                  onClick={() => setMobileNavOpen(false)}
                  className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5 transition-colors hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10"
                >
                  <span>📊 TrueProfit</span>
                  <ArrowRight className="h-3 w-3 text-slate-400" />
                </a>
                <a
                  href="#calculator"
                  onClick={() => setMobileNavOpen(false)}
                  className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5 transition-colors hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10"
                >
                  <span>🧮 Calculator</span>
                  <ArrowRight className="h-3 w-3 text-slate-400" />
                </a>
                <a
                  href="#roi"
                  onClick={() => setMobileNavOpen(false)}
                  className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5 transition-colors hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10"
                >
                  <span>💰 ROI Estimator</span>
                  <ArrowRight className="h-3 w-3 text-slate-400" />
                </a>
                <a
                  href="#pricing"
                  onClick={() => setMobileNavOpen(false)}
                  className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5 transition-colors hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10"
                >
                  <span>🏷️ Pricing</span>
                  <ArrowRight className="h-3 w-3 text-slate-400" />
                </a>
                <a
                  href="#faq"
                  onClick={() => setMobileNavOpen(false)}
                  className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5 transition-colors hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10"
                >
                  <span>❓ FAQ</span>
                  <ArrowRight className="h-3 w-3 text-slate-400" />
                </a>
              </div>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileNavOpen(false)}
                  className="shadow-xs flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-[#84cc16] py-3 text-xs font-bold text-black transition-colors hover:bg-[#72b012]"
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

      {/* Hero Section with TikTok Shop Creator Background & Interactive Spotlight */}
      <section
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="relative mx-auto max-w-7xl overflow-hidden px-4 pb-20 pt-14 text-center sm:px-6 sm:pb-32 sm:pt-20"
      >
        {/* TikTok Shop Live Streamer & Creator Commerce Background Layer */}
        <div className="pointer-events-none absolute inset-0 -z-10 select-none overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=1200&auto=format&fit=crop&q=75"
            alt="TikTok Shop Creator Studio"
            priority
            fill
            className="h-full w-full transform-gpu object-cover object-center opacity-10 mix-blend-luminosity dark:opacity-20"
          />
          <div className="dark:via-[#0b0e14]/92 absolute inset-0 bg-gradient-to-b from-slate-50/85 via-slate-50/95 to-slate-50 dark:from-[#0b0e14]/80 dark:to-[#0b0e14]" />
          <div className="bg-linear-grid absolute inset-0 opacity-50" />
        </div>

        {/* Interactive Radial Spotlight Background */}
        <div
          className="pointer-events-none absolute -inset-px hidden opacity-60 transition-opacity duration-300 md:block"
          style={{
            background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(132, 204, 22, 0.15), transparent 80%)`,
          }}
        />

        {/* Ambient Top Glow Orbs */}
        <div className="animate-pulse-glow pointer-events-none absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-lime-500/20 via-emerald-500/15 to-teal-500/0 blur-3xl sm:h-[450px] sm:w-[700px]" />

        {/* Floating Interactive Badge 1 (Left) */}
        <div className="animate-float font-mono-numeric card-hover-lift absolute left-6 top-20 z-20 hidden items-center gap-2.5 rounded-2xl border border-slate-200/80 bg-white/90 p-3 text-left shadow-xl backdrop-blur-md dark:border-slate-800 dark:bg-[#121620]/90 lg:flex">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-[#4ade80]">
            <Flame className="h-5 w-5 fill-current" />
          </div>
          <div>
            <p className="font-sans text-[11px] font-bold text-slate-900 dark:text-white">
              🔥 Viral Product Alert
            </p>
            <p className="text-xs font-black text-emerald-600 dark:text-[#4ade80]">
              +$14,820 Net Profit
            </p>
          </div>
        </div>

        {/* Floating Interactive Badge 2 (Right) */}
        <div className="animate-float-delayed font-mono-numeric card-hover-lift absolute right-6 top-24 z-20 hidden items-center gap-2.5 rounded-2xl border border-slate-200/80 bg-white/90 p-3 text-left shadow-xl backdrop-blur-md dark:border-slate-800 dark:bg-[#121620]/90 lg:flex">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-[#c084fc]">
            <Megaphone className="h-5 w-5" />
          </div>
          <div>
            <p className="font-sans text-[11px] font-bold text-slate-900 dark:text-white">
              ⚡ Spark Ads Auto-Scaled
            </p>
            <p className="text-xs font-black text-purple-600 dark:text-[#c084fc]">4.82x ROAS</p>
          </div>
        </div>

        {/* Floating Interactive Badge 3 (Bottom Left) */}
        <div className="animate-float card-hover-lift absolute bottom-16 left-12 z-20 hidden items-center gap-2.5 rounded-2xl border border-slate-200/80 bg-white/90 p-3 text-left shadow-xl backdrop-blur-md dark:border-slate-800 dark:bg-[#121620]/90 xl:flex">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-[#38bdf8]">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-900 dark:text-white">
              🤖 AI Helpdesk Active
            </p>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              142 Inquiries Auto-Resolved
            </p>
          </div>
        </div>

        {/* Main Hero Header */}
        <div className="relative z-10">
          <div className="shadow-xs animate-in fade-in slide-in-from-top-4 mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50/90 px-4 py-1.5 text-xs font-bold text-emerald-800 backdrop-blur-md dark:bg-emerald-950/50 dark:text-[#4ade80]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <span>The All-In-One AI Operating System for TikTok Shop</span>
          </div>

          <h1 className="mx-auto max-w-4xl text-3xl font-black leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl sm:leading-none md:text-6xl">
            Scale Multi-Store TikTok Empires with{' '}
            <span className="bg-gradient-to-r from-lime-500 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
              100% Real Profit Visibility
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
            Stop losing money on hidden TikTok platform fees, uncalculated returns, and runaway ad
            spend. Combine TrueProfit real-time accounting, viral AI video scripts, customer service
            automation, and multi-store intelligence in one interface.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/dashboard"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#84cc16] px-8 py-4 text-sm font-bold text-black shadow-lg shadow-lime-500/25 transition-all hover:scale-[1.03] hover:bg-[#72b012] sm:w-auto"
            >
              <Zap className="h-4 w-4 fill-current" />
              <span>Launch Live Dashboard Demo</span>
            </Link>
            <a
              href="#calculator"
              className="shadow-xs flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white/90 px-6 py-4 text-sm font-bold text-slate-800 backdrop-blur-md transition-all hover:scale-[1.01] hover:bg-slate-50 dark:border-slate-800 dark:bg-[#121620]/90 dark:text-slate-200 dark:hover:bg-white/5 sm:w-auto"
            >
              <Calculator className="h-4 w-4 text-emerald-600 dark:text-[#4ade80]" />
              <span>Test Profit Simulator</span>
            </a>
          </div>

          {/* Hero Interactive App Window Preview */}
          <div className="card-hover-lift relative mx-auto mt-14 max-w-5xl rounded-3xl border border-slate-200/80 bg-white/95 p-3 shadow-2xl backdrop-blur-xl dark:border-slate-800/80 dark:bg-[#121620]/95 sm:p-4">
            {/* Window Top Controls */}
            <div className="flex items-center justify-between border-b border-slate-100 px-2 pb-3 dark:border-slate-800/80">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-[11px] font-semibold text-slate-400">
                  app.rushnshop.com/dashboard
                </span>
              </div>
              <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-[#4ade80]">
                ● Live TikTok Sync Active
              </span>
            </div>

            {/* Simulated Live Grid inside Mockup */}
            <div className="font-mono-numeric mt-3 grid grid-cols-2 gap-3 text-left sm:grid-cols-4">
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-[#0f1117]">
                <p className="font-sans text-[10px] text-slate-400">Gross Revenue</p>
                <p className="mt-0.5 text-base font-bold text-slate-900 dark:text-white sm:text-xl">
                  $25,430.80
                </p>
                <p className="font-sans text-[10px] font-bold text-emerald-600 dark:text-[#4ade80]">
                  ↑ 18.6% MTD
                </p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-[#0f1117]">
                <p className="font-sans text-[10px] text-slate-400">True Net Profit</p>
                <p className="mt-0.5 text-base font-bold text-emerald-600 dark:text-[#4ade80] sm:text-xl">
                  $13,224.00
                </p>
                <p className="font-sans text-[10px] font-bold text-slate-400">52.0% Real Margin</p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-[#0f1117]">
                <p className="font-sans text-[10px] text-slate-400">Total Orders</p>
                <p className="mt-0.5 text-base font-bold text-slate-900 dark:text-white sm:text-xl">
                  840 Orders
                </p>
                <p className="font-sans text-[10px] font-bold text-blue-500">4 Global Stores</p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-[#0f1117]">
                <p className="font-sans text-[10px] text-slate-400">AI Automation</p>
                <p className="mt-0.5 text-base font-bold text-purple-600 dark:text-[#c084fc] sm:text-xl">
                  94% Rate
                </p>
                <p className="font-sans text-[10px] font-bold text-purple-500">
                  Instant Resolution
                </p>
              </div>
            </div>

            {/* Clickable Overlay to Open Real Dashboard */}
            <Link
              href="/dashboard"
              className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-2.5 text-xs font-bold text-white transition-all hover:scale-[1.01] hover:bg-black dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              <span>Click to Enter Interactive Dashboard</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Infinite Animated Store Region Marquee Ribbon */}
      <section className="select-none overflow-hidden border-y border-slate-200 bg-white/70 py-6 backdrop-blur-sm dark:border-slate-800 dark:bg-[#0f1117]/70">
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

      {/* Problem vs Solution Comparison Section with High-Performance Grid */}
      <section
        id="trueprofit"
        className="relative mx-auto max-w-6xl scroll-mt-24 space-y-12 overflow-hidden px-4 py-16 sm:px-6 sm:py-20"
      >
        {/* Subtle Background Grid Texture */}
        <div className="bg-linear-grid pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-30" />

        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-[#4ade80]">
            Why RushNshop?
          </span>
          <h2 className="mt-1 text-2xl font-black text-slate-900 dark:text-white sm:text-3xl">
            Built Specifically for the Realities of TikTok Commerce
          </h2>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
            Most e-commerce analytics were built for Amazon or Shopify. TikTok Shop has unique
            platform commission structures, creator affiliate cuts, and Spark Ads attribution.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* The Old Way */}
          <div className="shadow-xs card-hover-lift space-y-4 rounded-3xl border border-rose-200 bg-white/95 p-6 dark:border-rose-900/40 dark:bg-[#121620]/95 sm:p-8">
            <div className="flex items-center gap-2">
              <span className="rounded-lg bg-rose-100 p-2 text-xs font-bold text-rose-700 dark:bg-rose-950/60 dark:text-rose-400">
                ❌ The Old Chaotic Way
              </span>
            </div>
            <ul className="space-y-3.5 text-xs font-medium text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="text-sm font-bold text-rose-500">✕</span>
                <span>
                  Guessing profit margins while 5% TikTok fees, payment gateway cuts, and
                  uncalculated return shipping drain your payout.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-sm font-bold text-rose-500">✕</span>
                <span>
                  Constantly logging in and out of multiple seller centers to check order status
                  across different regions.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-sm font-bold text-rose-500">✕</span>
                <span>
                  Spending hours writing TikTok video hooks and product descriptions that fail to
                  convert.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-sm font-bold text-rose-500">✕</span>
                <span>
                  Customer support backlog leading to late dispatch rates, cancellation penalties,
                  and store health warnings.
                </span>
              </li>
            </ul>
          </div>

          {/* The RushNshop Way */}
          <div className="card-hover-lift space-y-4 rounded-3xl border-2 border-emerald-400 bg-white/95 p-6 shadow-xl dark:border-emerald-700 dark:bg-[#121620]/95 sm:p-8">
            <div className="flex items-center gap-2">
              <span className="rounded-lg bg-emerald-100 p-2 text-xs font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-[#4ade80]">
                ⚡ The RushNshop AI Operating System
              </span>
            </div>
            <ul className="space-y-3.5 text-xs font-medium text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="text-sm font-bold text-emerald-500">✓</span>
                <span>
                  <strong>TrueProfit Waterfall Accounting:</strong> Real-time deduction of COGS,
                  fees, ads, and OPEX to penny-level accuracy.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-sm font-bold text-emerald-500">✓</span>
                <span>
                  <strong>Unified Multi-Account Hub:</strong> Switch stores in 1 click or see global
                  blended financials across all global shops.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-sm font-bold text-emerald-500">✓</span>
                <span>
                  <strong>AI Viral Script Studio:</strong> Generate high-converting 3s visual hooks,
                  30s scene scripts, and SEO titles in 2 seconds.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-sm font-bold text-emerald-500">✓</span>
                <span>
                  <strong>Autonomous Customer Helpdesk:</strong> Smart auto-replies trained on live
                  USPS tracking & return policies.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Interactive Feature Deep-Dive Tabs with High-Performance Grid Texture */}
      <section
        id="features"
        className="relative mx-auto max-w-7xl scroll-mt-24 space-y-12 overflow-hidden px-4 py-20 sm:px-6"
      >
        {/* Subtle AI Network Background Texture */}
        <div className="bg-linear-grid pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-30" />

        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-[#4ade80]">
            Feature Deep Dive
          </span>
          <h2 className="mt-1 text-3xl font-black text-slate-900 dark:text-white sm:text-4xl">
            Engineered for High-Volume Sellers
          </h2>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
            Click through the core modules below to explore how RushNshop automates your TikTok
            operations.
          </p>
        </div>

        {/* Feature Interactive Tabs */}
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
                  'flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all',
                  isActive
                    ? 'scale-[1.02] bg-[#84cc16] text-black shadow-md shadow-lime-500/20'
                    : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-[#121620] dark:text-slate-400 dark:hover:bg-white/5',
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tab Preview Card */}
        <div className="shadow-xs card-hover-lift mx-auto max-w-5xl rounded-3xl border border-slate-200/80 bg-white/95 p-6 backdrop-blur-sm dark:border-slate-800 dark:bg-[#121620]/95 sm:p-10">
          {activeFeatureTab === 'profit' && (
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-[#4ade80]">
                  Real-Time GAAP Deductions
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  Stop Guessing Your True Take-Home Profit
                </h3>
                <p className="text-xs font-medium leading-relaxed text-slate-600 dark:text-slate-300 sm:text-sm">
                  RushNshop’s waterfall deduction model subtracts every single micro-fee before
                  declaring profit:
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
                  className="inline-flex items-center gap-1.5 pt-2 text-xs font-bold text-emerald-600 hover:underline dark:text-[#4ade80]"
                >
                  <span>Explore Profit Analytics Engine</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Visual Demo Card */}
              <div className="font-mono-numeric space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-[#0f1117]">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2 text-xs dark:border-slate-800">
                  <span className="font-sans font-bold text-slate-800 dark:text-slate-200">
                    Order #TK-84920 Waterfall
                  </span>
                  <span className="font-bold text-emerald-600 dark:text-[#4ade80]">
                    +$18.42 Net Profit
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between font-sans text-slate-600 dark:text-slate-400">
                    <span>Gross Selling Price</span>
                    <span className="font-bold text-slate-900 dark:text-white">$34.99</span>
                  </div>
                  <div className="flex justify-between font-sans text-rose-500">
                    <span>- Supplier COGS</span>
                    <span className="font-bold">-$6.50</span>
                  </div>
                  <div className="flex justify-between font-sans text-rose-500">
                    <span>- 3PL Shipping</span>
                    <span className="font-bold">-$3.80</span>
                  </div>
                  <div className="flex justify-between font-sans text-rose-500">
                    <span>- TikTok 5% Commission</span>
                    <span className="font-bold">-$1.75</span>
                  </div>
                  <div className="flex justify-between font-sans text-rose-500">
                    <span>- Payment Gateway (2.9% + $0.30)</span>
                    <span className="font-bold">-$1.31</span>
                  </div>
                  <div className="flex justify-between font-sans text-purple-600 dark:text-[#c084fc]">
                    <span>- TikTok Spark Ad CPA</span>
                    <span className="font-bold">-$3.21</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-2 font-sans text-sm font-bold text-emerald-600 dark:border-slate-800 dark:text-[#4ade80]">
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
                <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-bold text-pink-800 dark:bg-pink-950/60 dark:text-[#f472b6]">
                  Generative Video Prompts
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  Generate 3-Second Viral Video Hooks in Seconds
                </h3>
                <p className="text-xs font-medium leading-relaxed text-slate-600 dark:text-slate-300 sm:text-sm">
                  Trained on millions of organic TikTok views. Generates scene-by-scene audio
                  voiceovers, on-screen text overlays, and SEO product bullet points.
                </p>
                <Link
                  href="/ai-assistant"
                  className="inline-flex items-center gap-1.5 pt-2 text-xs font-bold text-pink-600 hover:underline dark:text-[#f472b6]"
                >
                  <span>Open AI Video Studio</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-xs dark:border-slate-800 dark:bg-[#0f1117]">
                <div className="rounded-xl border border-pink-200 bg-pink-50 p-3 dark:border-pink-900/50 dark:bg-pink-950/30">
                  <p className="mb-1 font-bold text-pink-900 dark:text-pink-200">
                    🎯 3-Second Visual Hook:
                  </p>
                  <p className="italic text-slate-700 dark:text-slate-300">
                    "Stop scrolling if you’re still wasting 20 minutes cleaning your blender every
                    morning!"
                  </p>
                </div>
                <div className="space-y-1 rounded-xl bg-slate-100 p-3 dark:bg-white/5">
                  <p className="font-bold text-slate-800 dark:text-slate-200">
                    🎬 Scene 1 (0:00 - 0:08):
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    Close up pouring water & pressing turbo button. Audio: upbeat trending lofi
                    beat.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeFeatureTab === 'ads' && (
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-800 dark:bg-purple-950/60 dark:text-[#c084fc]">
                  Marketing API Sync
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  TikTok Spark Ads & Creator Attribution
                </h3>
                <p className="text-xs font-medium leading-relaxed text-slate-600 dark:text-slate-300 sm:text-sm">
                  Track blended ROAS, individual creator affiliate performance, and receive
                  automated budget scaling alerts when a campaign hits target CPA.
                </p>
                <Link
                  href="/ads-analytics"
                  className="inline-flex items-center gap-1.5 pt-2 text-xs font-bold text-purple-600 hover:underline dark:text-[#c084fc]"
                >
                  <span>View Ads Analytics</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="font-mono-numeric space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-[#0f1117]">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2 text-xs dark:border-slate-800">
                  <span className="font-sans font-bold text-slate-800 dark:text-slate-200">
                    Campaign: Sunset Lamp Spark #4
                  </span>
                  <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-[#4ade80]">
                    Scale +20% Budget
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <p className="font-sans text-[10px] text-slate-400">Spend</p>
                    <p className="font-bold text-slate-900 dark:text-white">$840.00</p>
                  </div>
                  <div>
                    <p className="font-sans text-[10px] text-slate-400">Revenue</p>
                    <p className="font-bold text-emerald-600 dark:text-[#4ade80]">$4,048.80</p>
                  </div>
                  <div>
                    <p className="font-sans text-[10px] text-slate-400">ROAS</p>
                    <p className="font-bold text-purple-600 dark:text-[#c084fc]">4.82x</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeFeatureTab === 'stores' && (
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800 dark:bg-blue-950/60 dark:text-[#38bdf8]">
                  Global Accounts
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  Multi-Store Account Management & RBAC
                </h3>
                <p className="text-xs font-medium leading-relaxed text-slate-600 dark:text-slate-300 sm:text-sm">
                  Manage accounts in USA, UK, Germany, and Canada from a single master dashboard.
                  Grant team members store-level permissions.
                </p>
                <Link
                  href="/stores"
                  className="inline-flex items-center gap-1.5 pt-2 text-xs font-bold text-blue-600 hover:underline dark:text-[#38bdf8]"
                >
                  <span>Manage Stores</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="space-y-2.5">
                {[
                  {
                    name: 'RushNshop US Official',
                    flag: '🇺🇸',
                    rev: '$14,200.50',
                    status: 'Healthy',
                  },
                  { name: 'RushNshop UK Direct', flag: '🇬🇧', rev: '£6,450.00', status: 'Healthy' },
                  { name: 'RushNshop DE Store', flag: '🇩🇪', rev: '€4,780.30', status: 'Healthy' },
                ].map((s) => (
                  <div
                    key={s.name}
                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs dark:border-slate-800 dark:bg-[#0f1117]"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{s.flag}</span>
                      <span className="font-bold text-slate-900 dark:text-white">{s.name}</span>
                    </div>
                    <div className="font-mono-numeric flex items-center gap-3">
                      <span className="font-bold text-emerald-600 dark:text-[#4ade80]">
                        {s.rev}
                      </span>
                      <span className="rounded-md bg-emerald-100 px-1.5 py-0.5 font-sans text-[10px] font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-[#4ade80]">
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
                <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-bold text-teal-800 dark:bg-teal-950/60 dark:text-[#2dd4bf]">
                  Autonomous Customer Support
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  94% Automated Resolution with USPS Lookups
                </h3>
                <p className="text-xs font-medium leading-relaxed text-slate-600 dark:text-slate-300 sm:text-sm">
                  AI scans customer inquiries, pulls live tracking coordinates, and drafts
                  personalized replies ready for 1-click dispatch.
                </p>
                <Link
                  href="/ai-customer-service"
                  className="inline-flex items-center gap-1.5 pt-2 text-xs font-bold text-teal-600 hover:underline dark:text-[#2dd4bf]"
                >
                  <span>Open AI Customer Helpdesk</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="space-y-2.5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs dark:border-slate-800 dark:bg-[#0f1117]">
                <div className="rounded-xl bg-slate-100 p-3 dark:bg-white/5">
                  <p className="font-bold text-slate-900 dark:text-white">
                    Customer: "Where is my order #TK-9821?"
                  </p>
                </div>
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-900/50 dark:bg-emerald-950/40">
                  <p className="mb-1 font-bold text-emerald-900 dark:text-[#4ade80]">
                    🤖 AI Auto-Drafted Reply:
                  </p>
                  <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                    "Hi Sarah! Your package was dispatched via USPS Priority (Tracking
                    #940011189956). It is currently Out for Delivery and will arrive today by 4:00
                    PM!"
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Interactive Pre-Listing Calculator Section with High-Performance Background */}
      <section
        id="calculator"
        className="relative scroll-mt-24 overflow-hidden border-y border-slate-200 bg-slate-100/60 px-4 py-20 dark:border-slate-800 dark:bg-[#0f1117] sm:px-6"
      >
        {/* Subtle Financial Chart Gradient Texture */}
        <div className="bg-linear-grid pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-25" />

        <div className="mx-auto max-w-5xl space-y-10">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-[#4ade80]">
              Live Interactive Demo
            </span>
            <h2 className="mt-1 text-2xl font-black text-slate-900 dark:text-white sm:text-3xl">
              Try the TikTok Profit Calculator
            </h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Test viral product economics live. Select a product preset or adjust the sliders.
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="mr-1 text-xs font-bold text-slate-400">Product Presets:</span>
            <button
              type="button"
              onClick={() => applyPreset('sunset', 34.99, 6.5, 3.8, 7.5)}
              className={cn(
                'cursor-pointer rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all hover:scale-[1.02]',
                activePreset === 'sunset'
                  ? 'shadow-xs border-lime-500 bg-lime-500/10 font-bold text-lime-600 dark:text-[#4ade80]'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-lime-500 dark:border-slate-800 dark:bg-[#121620] dark:text-slate-300',
              )}
            >
              🌅 Sunset Lamp ($34.99)
            </button>
            <button
              type="button"
              onClick={() => applyPreset('mic', 49.99, 11.2, 4.2, 10.0)}
              className={cn(
                'cursor-pointer rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all hover:scale-[1.02]',
                activePreset === 'mic'
                  ? 'shadow-xs border-lime-500 bg-lime-500/10 font-bold text-lime-600 dark:text-[#4ade80]'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-lime-500 dark:border-slate-800 dark:bg-[#121620] dark:text-slate-300',
              )}
            >
              🎙️ Lavalier Mic ($49.99)
            </button>
            <button
              type="button"
              onClick={() => applyPreset('guasha', 24.99, 3.9, 3.5, 5.0)}
              className={cn(
                'cursor-pointer rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all hover:scale-[1.02]',
                activePreset === 'guasha'
                  ? 'shadow-xs border-lime-500 bg-lime-500/10 font-bold text-lime-600 dark:text-[#4ade80]'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-lime-500 dark:border-slate-800 dark:bg-[#121620] dark:text-slate-300',
              )}
            >
              ✨ Gua Sha Set ($24.99)
            </button>
          </div>

          <div className="shadow-xs card-hover-lift grid grid-cols-1 gap-8 rounded-3xl border border-slate-200/80 bg-white/95 p-6 dark:border-slate-800 dark:bg-[#121620]/95 sm:p-8 md:grid-cols-2">
            {/* Calculator Controls */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Unit Cost Parameters
              </h3>

              <div>
                <div className="mb-1 flex justify-between text-xs font-bold">
                  <span>Selling Price:</span>
                  <span className="text-emerald-600 dark:text-[#4ade80]">
                    ${calcPrice.toFixed(2)}
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="150"
                  step="1"
                  value={calcPrice}
                  onChange={(e) => setCalcPrice(parseFloat(e.target.value))}
                  className="w-full cursor-pointer accent-lime-500"
                />
              </div>

              <div>
                <div className="mb-1 flex justify-between text-xs font-bold">
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
                  className="w-full cursor-pointer accent-lime-500"
                />
              </div>

              <div>
                <div className="mb-1 flex justify-between text-xs font-bold">
                  <span>3PL Shipping & Prep:</span>
                  <span className="text-slate-800 dark:text-slate-200">
                    ${calcShipping.toFixed(2)}
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="20"
                  step="0.2"
                  value={calcShipping}
                  onChange={(e) => setCalcShipping(parseFloat(e.target.value))}
                  className="w-full cursor-pointer accent-lime-500"
                />
              </div>

              <div>
                <div className="mb-1 flex justify-between text-xs font-bold">
                  <span>TikTok Ads CPA:</span>
                  <span className="text-purple-600 dark:text-[#c084fc]">
                    ${calcAdCpa.toFixed(2)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="30"
                  step="0.5"
                  value={calcAdCpa}
                  onChange={(e) => setCalcAdCpa(parseFloat(e.target.value))}
                  className="w-full cursor-pointer accent-lime-500"
                />
              </div>
            </div>

            {/* Results Live Waterfall Card */}
            <div className="font-mono-numeric flex flex-col justify-between space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-[#161b26]">
              <div className="flex items-center justify-between">
                <span className="font-sans text-xs font-bold uppercase text-slate-400">
                  Live Unit Economics
                </span>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-[#4ade80]">
                  {formatPercent(calcResults.profitMargin)} Margin
                </span>
              </div>

              <div>
                <p className="font-sans text-xs text-slate-400">Net Profit Per Order:</p>
                <p className="mt-0.5 text-3xl font-black text-emerald-600 dark:text-[#4ade80]">
                  {formatCurrency(calcResults.netProfit)}
                </p>
              </div>

              <div className="space-y-1.5 border-t border-slate-200 pt-3 text-xs dark:border-slate-800">
                <div className="flex justify-between font-sans text-slate-500">
                  <span>Break-Even Price Floor:</span>
                  <span className="font-mono-numeric font-bold text-slate-900 dark:text-white">
                    {formatCurrency(calcResults.breakEvenPrice)}
                  </span>
                </div>
                <div className="flex justify-between font-sans text-slate-500">
                  <span>Max Allowable Ad CPA:</span>
                  <span className="font-mono-numeric font-bold text-purple-600 dark:text-[#c084fc]">
                    {formatCurrency(calcResults.maxAllowableCpa)}
                  </span>
                </div>
                <div className="flex justify-between font-sans text-slate-500">
                  <span>TikTok Platform Fees:</span>
                  <span className="font-mono-numeric font-bold text-slate-900 dark:text-white">
                    {formatCurrency(calcResults.tiktokFee + calcResults.paymentFee)}
                  </span>
                </div>
              </div>

              <Link
                href="/calculator"
                className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#84cc16] py-2.5 text-xs font-bold text-black transition-all hover:scale-[1.01] hover:bg-[#72b012]"
              >
                <span>Open Full Unit Economics Studio</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Estimator Section */}
      <section id="roi" className="mx-auto max-w-5xl scroll-mt-24 space-y-10 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-[#c084fc]">
            Value Estimator
          </span>
          <h2 className="mt-1 text-2xl font-black text-slate-900 dark:text-white sm:text-3xl">
            How Much Money Does RushNshop Save You?
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Calculate your estimated annual profit recovery based on order volume.
          </p>
        </div>

        <div className="shadow-xs card-hover-lift grid grid-cols-1 items-center gap-8 rounded-3xl border border-slate-200/80 bg-white/95 p-6 dark:border-slate-800 dark:bg-[#121620]/95 sm:p-8 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex justify-between text-xs font-bold">
              <span>Monthly Order Volume:</span>
              <span className="font-mono-numeric text-sm text-purple-600 dark:text-[#c084fc]">
                {monthlyOrders.toLocaleString()} Orders / mo
              </span>
            </div>
            <input
              type="range"
              min="500"
              max="20000"
              step="500"
              value={monthlyOrders}
              onChange={(e) => setMonthlyOrders(parseInt(e.target.value))}
              className="w-full cursor-pointer accent-purple-500"
            />
            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              Based on historical e-commerce recovery rates from uncalculated shipping overcharges,
              hidden platform fees, and saved virtual assistant hours.
            </p>
          </div>

          <div className="font-mono-numeric space-y-3 rounded-2xl border border-purple-200 bg-purple-50/50 p-5 dark:border-purple-900/50 dark:bg-purple-950/20">
            <div>
              <p className="font-sans text-xs font-bold text-purple-800 dark:text-purple-300">
                Estimated Annual Profit Recovery:
              </p>
              <p className="mt-1 text-3xl font-black text-purple-600 dark:text-[#c084fc]">
                ${(monthlyOrders * 1.85 * 12).toLocaleString('en-US', { maximumFractionDigits: 0 })}{' '}
                / yr
              </p>
            </div>
            <div className="space-y-1 font-sans text-xs text-slate-600 dark:text-slate-300">
              <p>✓ ~{(monthlyOrders * 0.04).toFixed(0)} hours saved on CS & VA operations</p>
              <p>
                ✓ ~${(monthlyOrders * 0.95 * 12).toLocaleString()} saved from TikTok ad CPA
                misallocations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="mx-auto max-w-7xl scroll-mt-24 space-y-12 px-4 py-20 sm:px-6"
      >
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-[#4ade80]">
            Transparent Pricing
          </span>
          <h2 className="mt-1 text-3xl font-black text-slate-900 dark:text-white sm:text-4xl">
            Predictable Plans for Growing Brands
          </h2>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
            No hidden percentage cuts. Unlimited order syncing and GAAP P&L statement generation.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
          {/* Starter Plan */}
          <div className="shadow-xs card-hover-lift flex flex-col justify-between space-y-6 rounded-3xl border border-slate-200/80 bg-white/95 p-6 dark:border-slate-800 dark:bg-[#121620]/95 sm:p-8">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Starter
              </span>
              <div className="font-mono-numeric flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900 dark:text-white">$29</span>
                <span className="font-sans text-xs text-slate-400">/month</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Perfect for single store operators validating viral products.
              </p>

              <div className="space-y-2.5 border-t border-slate-100 pt-4 text-xs text-slate-600 dark:border-slate-800 dark:text-slate-300">
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
              className="flex w-full items-center justify-center rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-slate-900 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:text-white dark:hover:bg-white/5"
            >
              Start Free Trial
            </Link>
          </div>

          {/* Growth Plan (Featured) */}
          <div className="card-hover-lift relative flex flex-col justify-between space-y-6 rounded-3xl border-2 border-[#84cc16] bg-white/95 p-6 shadow-xl dark:bg-[#121620]/95 sm:p-8">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#84cc16] px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-black">
              Most Popular
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-[#4ade80]">
                Growth Empire
              </span>
              <div className="font-mono-numeric flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900 dark:text-white">$79</span>
                <span className="font-sans text-xs text-slate-400">/month</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                For multi-account sellers scaling with TikTok Spark Ads.
              </p>

              <div className="space-y-2.5 border-t border-slate-100 pt-4 text-xs text-slate-600 dark:border-slate-800 dark:text-slate-300">
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
              className="flex w-full items-center justify-center rounded-xl bg-[#84cc16] py-3 text-xs font-bold text-black shadow-md transition-all hover:scale-[1.02] hover:bg-[#72b012]"
            >
              Get Started with Growth
            </Link>
          </div>

          {/* Scale & Agency Plan */}
          <div className="shadow-xs card-hover-lift flex flex-col justify-between space-y-6 rounded-3xl border border-slate-200/80 bg-white/95 p-6 dark:border-slate-800 dark:bg-[#121620]/95 sm:p-8">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-[#c084fc]">
                Scale & Agency
              </span>
              <div className="font-mono-numeric flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900 dark:text-white">$199</span>
                <span className="font-sans text-xs text-slate-400">/month</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                For 8-figure agencies managing massive cross-border operations.
              </p>

              <div className="space-y-2.5 border-t border-slate-100 pt-4 text-xs text-slate-600 dark:border-slate-800 dark:text-slate-300">
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
              href="/stores"
              className="flex w-full items-center justify-center rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-slate-900 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:text-white dark:hover:bg-white/5"
            >
              Manage Multi-Stores
            </Link>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section
        id="faq"
        className="scroll-mt-24 border-t border-slate-200 bg-slate-100/60 px-4 py-20 dark:border-slate-800 dark:bg-[#0f1117] sm:px-6"
      >
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-[#4ade80]">
              Got Questions?
            </span>
            <h2 className="mt-1 text-2xl font-black text-slate-900 dark:text-white sm:text-3xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="shadow-2xs overflow-hidden rounded-2xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-[#121620]"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between p-4 text-left text-xs font-bold text-slate-900 dark:text-white sm:text-sm"
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
                    <div className="border-t border-slate-100 px-4 pb-4 pt-1 text-xs font-medium leading-relaxed text-slate-600 dark:border-slate-800/60 dark:text-slate-300">
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
      <footer className="border-t border-slate-200 bg-white px-4 pb-12 pt-16 dark:border-slate-800 dark:bg-[#080a0f] sm:px-8">
        <div className="mx-auto max-w-7xl space-y-12">
          {/* Top Row: Brand & Newsletter */}
          <div className="grid grid-cols-1 gap-8 border-b border-slate-100 pb-12 dark:border-slate-800/80 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-lime-500 to-green-400 text-black shadow-md shadow-green-500/20">
                  <Zap className="h-6 w-6 fill-current font-black text-black" />
                </div>
                <div>
                  <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                    RushNshop
                  </span>
                  <span className="ml-1.5 rounded-md bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-[#4ade80]">
                    AI OS
                  </span>
                </div>
              </div>
              <p className="max-w-sm text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                The leading TikTok Shop multi-account operating system. Combining TrueProfit
                waterfall accounting, generative AI listing studio, and customer service automation.
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
                  <Award className="h-3.5 w-3.5 text-purple-500" />
                  TikTok Open API
                </span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="flex flex-col justify-center space-y-3 lg:col-span-7">
              <p className="text-xs font-bold text-slate-900 dark:text-white">
                Subscribe to TikTok Shop Operator Insights
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Receive weekly breakdown of trending viral SKUs, platform policy changes, and unit
                economics tactics.
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-bold text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-[#4ade80]">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Thank you for subscribing to RushNshop Insights!</span>
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
                    className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-lime-500 focus:outline-none dark:border-slate-800 dark:bg-[#121620] dark:text-white"
                  />
                  <button
                    type="submit"
                    className="flex shrink-0 items-center gap-1.5 rounded-xl bg-[#84cc16] px-4 py-2.5 text-xs font-bold text-black transition-colors hover:bg-[#72b012]"
                  >
                    <span>Subscribe</span>
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Middle Row: 4-Column Directory */}
          <div className="grid grid-cols-2 gap-8 text-xs md:grid-cols-4">
            {/* Col 1 */}
            <div className="space-y-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Product
              </p>
              <ul className="space-y-2 font-medium text-slate-500 dark:text-slate-400">
                <li>
                  <Link
                    href="/dashboard"
                    className="transition-colors hover:text-slate-900 dark:hover:text-white"
                  >
                    TrueProfit Analytics
                  </Link>
                </li>
                <li>
                  <Link
                    href="/stores"
                    className="transition-colors hover:text-slate-900 dark:hover:text-white"
                  >
                    Multi-Store Hub
                  </Link>
                </li>
                <li>
                  <Link
                    href="/calculator"
                    className="transition-colors hover:text-slate-900 dark:hover:text-white"
                  >
                    Unit Economics Calculator
                  </Link>
                </li>
                <li>
                  <Link
                    href="/ads-analytics"
                    className="transition-colors hover:text-slate-900 dark:hover:text-white"
                  >
                    TikTok Spark Ads API
                  </Link>
                </li>
                <li>
                  <Link
                    href="/ai-assistant"
                    className="transition-colors hover:text-slate-900 dark:hover:text-white"
                  >
                    AI Video Script Studio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/ai-customer-service"
                    className="transition-colors hover:text-slate-900 dark:hover:text-white"
                  >
                    AI Customer Helpdesk
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 2 */}
            <div className="space-y-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Solutions
              </p>
              <ul className="space-y-2 font-medium text-slate-500 dark:text-slate-400">
                <li>
                  <Link
                    href="/dashboard"
                    className="transition-colors hover:text-slate-900 dark:hover:text-white"
                  >
                    TikTok Shop US Sellers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    className="transition-colors hover:text-slate-900 dark:hover:text-white"
                  >
                    UK & EU Cross-Border
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    className="transition-colors hover:text-slate-900 dark:hover:text-white"
                  >
                    Multi-Account Agencies
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    className="transition-colors hover:text-slate-900 dark:hover:text-white"
                  >
                    3PL High-Volume Brands
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    className="transition-colors hover:text-slate-900 dark:hover:text-white"
                  >
                    Creator Affiliate Networks
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3 */}
            <div className="space-y-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Resources
              </p>
              <ul className="space-y-2 font-medium text-slate-500 dark:text-slate-400">
                <li>
                  <Link
                    href="/reports"
                    className="transition-colors hover:text-slate-900 dark:hover:text-white"
                  >
                    GAAP P&L Statement Guide
                  </Link>
                </li>
                <li>
                  <Link
                    href="/calculator"
                    className="transition-colors hover:text-slate-900 dark:hover:text-white"
                  >
                    Break-Even Calculator Tool
                  </Link>
                </li>
                <li>
                  <Link
                    href="/settings"
                    className="transition-colors hover:text-slate-900 dark:hover:text-white"
                  >
                    TikTok API Webhook Specs
                  </Link>
                </li>
                <li>
                  <a
                    href="https://github.com/shahzaibbusiness2026-work/RushNShop-Dashboard.git"
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-slate-900 dark:hover:text-white"
                  >
                    GitHub Repository
                  </a>
                </li>
                <li>
                  <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-[#4ade80]">
                    ● Systems 99.99% Operational
                  </span>
                </li>
              </ul>
            </div>

            {/* Col 4 */}
            <div className="space-y-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Company
              </p>
              <ul className="space-y-2 font-medium text-slate-500 dark:text-slate-400">
                <li>
                  <Link
                    href="/dashboard"
                    className="transition-colors hover:text-slate-900 dark:hover:text-white"
                  >
                    About RushNshop
                  </Link>
                </li>
                <li>
                  <Link
                    href="/settings"
                    className="transition-colors hover:text-slate-900 dark:hover:text-white"
                  >
                    Privacy & Data Security
                  </Link>
                </li>
                <li>
                  <Link
                    href="/settings"
                    className="transition-colors hover:text-slate-900 dark:hover:text-white"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/ai-customer-service"
                    className="transition-colors hover:text-slate-900 dark:hover:text-white"
                  >
                    Contact Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright & Back to Top */}
          <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 text-xs text-slate-400 dark:border-slate-800/80 sm:flex-row">
            <p>
              © 2024 RushNshop AI Operating System. All rights reserved. TikTok is a registered
              trademark of ByteDance Ltd.
            </p>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 font-semibold text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
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
