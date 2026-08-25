'use client';

import React from 'react';
import Link from 'next/link';
import {
  DollarSign,
  TrendingUp,
  Percent,
  ShoppingBag,
  CreditCard,
  HeartHandshake,
  Zap,
  Download,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import Badge from '../../components/ui/Badge';
import { useStore } from '../../context/StoreContext';
import { formatCurrency, formatNumber, formatPercent } from '../../lib/utils';
import StatCard from '../../components/dashboard/StatCard';
import ProfitTrendChart from '../../components/dashboard/ProfitTrendChart';
import RevenueByStoreChart from '../../components/dashboard/RevenueByStoreChart';
import StorePerformanceList from '../../components/dashboard/StorePerformanceList';
import TopProductsList from '../../components/dashboard/TopProductsList';
import ProfitVsExpensesChart from '../../components/dashboard/ProfitVsExpensesChart';
import AIInsightsCard from '../../components/dashboard/AIInsightsCard';
import SecondaryStatCards from '../../components/dashboard/SecondaryStatCards';
import AdsPerformanceTable from '../../components/dashboard/AdsPerformanceTable';
import OrdersOverviewChart from '../../components/dashboard/OrdersOverviewChart';
import RecentOrdersTable from '../../components/dashboard/RecentOrdersTable';

export default function DashboardPage() {
  const {
    totalRevenue,
    netProfit,
    profitMargin,
    totalOrders,
    avgOrderValue,
    avgProfitPerOrder,
    selectedStore,
    selectedStoreId,
    stores,
    growthRates,
    sparklines,
  } = useStore();

  const activeStoreName =
    selectedStoreId === 'all'
      ? `All Connected Stores (${stores.length})`
      : selectedStore?.name || 'Store';

  return (
    <div className="max-w-400 mx-auto space-y-6">
      {/* Executive Command Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-r from-white via-slate-50 to-emerald-50/30 p-5 shadow-xs transition-all dark:border-slate-800/80 dark:from-[#121620] dark:via-[#151b26] dark:to-emerald-950/20 sm:p-6">
        {/* Subtle Background Glow Accent */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl dark:bg-emerald-500/15" />

        <div className="relative z-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="lime" dot pulse size="sm">
                Live TikTok Sync
              </Badge>
              <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                • 100% Data Integrity
              </span>
              <span className="hidden text-xs font-medium text-slate-500 dark:text-slate-400 sm:inline">
                {selectedStore?.flag || '🌐'} {activeStoreName}
              </span>
            </div>
            <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-white sm:text-2xl">
              Performance Command Center
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
              Tracking{' '}
              <span className="font-bold text-slate-800 dark:text-slate-200">
                {formatCurrency(totalRevenue, selectedStore?.currency)}
              </span>{' '}
              gross revenue across TikTok Shop with a{' '}
              <span className="font-bold text-emerald-600 dark:text-[#4ade80]">
                {formatPercent(profitMargin)} net margin
              </span>
              .
            </p>
          </div>

          {/* Quick Action Shortcuts */}
          <div className="flex flex-wrap items-center gap-2 pt-1 md:pt-0">
            <Link
              href="/ai-assistant"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white/90 px-3 py-2 text-xs font-bold text-slate-700 shadow-2xs transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-95 dark:border-slate-700/80 dark:bg-[#161b26]/90 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <Sparkles className="h-3.5 w-3.5 text-lime-500" />
              <span>AI Insights</span>
            </Link>

            <Link
              href="/calculator"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white/90 px-3 py-2 text-xs font-bold text-slate-700 shadow-2xs transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-95 dark:border-slate-700/80 dark:bg-[#161b26]/90 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <Zap className="h-3.5 w-3.5 text-amber-500" />
              <span>Unit Calculator</span>
            </Link>

            <Link
              href="/reports"
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#84cc16] px-3.5 py-2 text-xs font-bold text-black shadow-xs transition-all hover:bg-[#72b012] hover:shadow-rush-glow active:scale-95"
            >
              <Download className="h-3.5 w-3.5 stroke-[2.5]" />
              <span>P&L Report</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Row 1: Top 6 KPI Metric Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(totalRevenue, selectedStore?.currency)}
          growth={growthRates.revenue}
          icon={DollarSign}
          themeColor="green"
          sparklinePoints={sparklines.revenue}
        />
        <StatCard
          title="Net Profit"
          value={formatCurrency(netProfit, selectedStore?.currency)}
          growth={growthRates.profit}
          icon={TrendingUp}
          themeColor="emerald"
          sparklinePoints={sparklines.profit}
        />
        <StatCard
          title="Profit Margin"
          value={formatPercent(profitMargin)}
          growth={growthRates.margin}
          icon={Percent}
          themeColor="amber"
          sparklinePoints={sparklines.margin}
        />
        <StatCard
          title="Orders"
          value={formatNumber(totalOrders)}
          growth={growthRates.orders}
          icon={ShoppingBag}
          themeColor="blue"
          sparklinePoints={sparklines.orders}
        />
        <StatCard
          title="Avg. Order Value"
          value={formatCurrency(avgOrderValue, selectedStore?.currency)}
          growth={growthRates.aov}
          icon={CreditCard}
          themeColor="purple"
          sparklinePoints={sparklines.aov}
        />
        <StatCard
          title="Avg. Profit / Order"
          value={formatCurrency(avgProfitPerOrder, selectedStore?.currency)}
          growth={growthRates.appo}
          icon={HeartHandshake}
          themeColor="pink"
          sparklinePoints={sparklines.appo}
        />
      </div>

      {/* Row 2: Profit Trend, Revenue by Store, Store Performance */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <ProfitTrendChart />
        </div>
        <div className="lg:col-span-4">
          <RevenueByStoreChart />
        </div>
        <div className="lg:col-span-3">
          <StorePerformanceList />
        </div>
      </div>

      {/* Row 3: Top Products by Profit, Profit vs Expenses, AI Insights */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <TopProductsList />
        </div>
        <div className="lg:col-span-5">
          <ProfitVsExpensesChart />
        </div>
        <div className="lg:col-span-3">
          <AIInsightsCard />
        </div>
      </div>

      {/* Row 4: Secondary Financial Metric Cards */}
      <div>
        <SecondaryStatCards />
      </div>

      {/* Row 5: Ads Performance, Orders Overview, Recent Orders */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <AdsPerformanceTable />
        </div>
        <div className="lg:col-span-3">
          <OrdersOverviewChart />
        </div>
        <div className="lg:col-span-4">
          <RecentOrdersTable />
        </div>
      </div>
    </div>
  );
}
