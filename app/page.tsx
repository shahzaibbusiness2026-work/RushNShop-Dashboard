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
import { useStore } from '../context/StoreContext';
import { formatCurrency, formatNumber, formatPercent } from '../lib/utils';
import StatCard from '../components/dashboard/StatCard';
import ProfitTrendChart from '../components/dashboard/ProfitTrendChart';
import RevenueByStoreChart from '../components/dashboard/RevenueByStoreChart';
import StorePerformanceList from '../components/dashboard/StorePerformanceList';
import TopProductsList from '../components/dashboard/TopProductsList';
import ProfitVsExpensesChart from '../components/dashboard/ProfitVsExpensesChart';
import AIInsightsCard from '../components/dashboard/AIInsightsCard';
import SecondaryStatCards from '../components/dashboard/SecondaryStatCards';
import AdsPerformanceTable from '../components/dashboard/AdsPerformanceTable';
import OrdersOverviewChart from '../components/dashboard/OrdersOverviewChart';
import RecentOrdersTable from '../components/dashboard/RecentOrdersTable';

export default function DashboardPage() {
  const {
    totalRevenue,
    netProfit,
    profitMargin,
    totalOrders,
    avgOrderValue,
    avgProfitPerOrder,
    selectedStore,
  } = useStore();

  return (
    <div className="space-y-6 max-w-400 mx-auto">
      {/* Row 1: Top 6 KPI Metric Cards */}
      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(totalRevenue, selectedStore?.currency)}
          growth={18.6}
          icon={DollarSign}
          themeColor="green"
          sparklinePoints={[18, 22, 19, 28, 26, 35, 32, 42, 48]}
        />
        <StatCard
          title="Net Profit"
          value={formatCurrency(netProfit, selectedStore?.currency)}
          growth={20.4}
          icon={TrendingUp}
          themeColor="emerald"
          sparklinePoints={[12, 15, 14, 22, 20, 29, 27, 36, 42]}
        />
        <StatCard
          title="Profit Margin"
          value={formatPercent(profitMargin)}
          growth={2.1}
          icon={Percent}
          themeColor="amber"
          sparklinePoints={[48, 49, 48.5, 50, 50.5, 51.2, 51.5, 52.0]}
        />
        <StatCard
          title="Orders"
          value={formatNumber(totalOrders)}
          growth={15.3}
          icon={ShoppingBag}
          themeColor="blue"
          sparklinePoints={[550, 600, 580, 680, 650, 740, 780, 840]}
        />
        <StatCard
          title="Avg. Order Value"
          value={formatCurrency(avgOrderValue, selectedStore?.currency)}
          growth={3.2}
          icon={CreditCard}
          themeColor="purple"
          sparklinePoints={[28.5, 29.0, 28.8, 29.5, 29.2, 30.0, 30.27]}
        />
        <StatCard
          title="Avg. Profit / Order"
          value={formatCurrency(avgProfitPerOrder, selectedStore?.currency)}
          growth={4.7}
          icon={HeartHandshake}
          themeColor="pink"
          sparklinePoints={[14.2, 14.8, 14.5, 15.1, 15.0, 15.5, 15.75]}
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
