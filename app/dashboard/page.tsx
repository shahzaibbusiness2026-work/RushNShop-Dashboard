'use client';

import React from 'react';
import {
  DollarSign,
  TrendingUp,
  Percent,
  ShoppingBag,
  CreditCard,
  HeartHandshake,
} from 'lucide-react';
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
    growthRates,
    sparklines,
  } = useStore();

  return (
    <div className="space-y-6 max-w-400 mx-auto">
      {/* Row 1: Top 6 KPI Metric Cards */}
      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-6">
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
