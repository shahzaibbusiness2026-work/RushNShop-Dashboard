'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  Store,
  Product,
  Order,
  Campaign,
  Expense,
  Customer,
  AIInsight,
  CustomerTicket,
} from '../types';
import {
  INITIAL_STORES,
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_CAMPAIGNS,
  INITIAL_EXPENSES,
  INITIAL_CUSTOMERS,
  INITIAL_AI_INSIGHTS,
  INITIAL_TICKETS,
  PROFIT_TREND_DATA,
} from '../lib/mockData';

export type Theme = 'light' | 'dark';

export interface CategoryBreakdown {
  name: string;
  value: number;
  percentage: string;
  color: string;
}

interface StoreContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;

  selectedStoreId: string;
  setSelectedStoreId: (id: string) => void;
  dateRange: string;
  setDateRange: (range: string) => void;
  datePreset: string;
  setDatePreset: (preset: string) => void;

  stores: Store[];
  products: Product[];
  orders: Order[];
  campaigns: Campaign[];
  expenses: Expense[];
  customers: Customer[];
  insights: AIInsight[];
  tickets: CustomerTicket[];

  // Actions
  addStore: (store: Omit<Store, 'id'>) => Promise<void>;
  removeStore: (id: string) => Promise<void>;
  updateProduct: (product: Product) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  toggleCampaignStatus: (campaignId: string) => void;
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  dismissInsight: (id: string) => void;
  replyToTicket: (ticketId: string, replyText: string) => void;
  resolveTicket: (ticketId: string) => void;
  escalateTicket: (ticketId: string) => void;

  // Filtered & Aggregated Metrics
  selectedStore: Store | null;
  filteredProducts: Product[];
  filteredOrders: Order[];
  filteredCampaigns: Campaign[];
  filteredExpenses: Expense[];
  storeInsights: AIInsight[];
  categoryBreakdown: CategoryBreakdown[];
  orderStatusCounts: { name: string; count: number; percentage: number; color: string }[];

  // Dashboard Aggregates (Dynamically computed for selected store & date range)
  totalRevenue: number;
  netProfit: number;
  profitMargin: number;
  totalOrders: number;
  avgOrderValue: number;
  avgProfitPerOrder: number;
  totalAdsSpend: number;
  totalCogs: number;
  totalFees: number;
  refunds: number;
  growthRates: {
    revenue: number;
    profit: number;
    margin: number;
    orders: number;
    aov: number;
    appo: number;
  };
  sparklines: {
    revenue: number[];
    profit: number[];
    margin: number[];
    orders: number[];
    aov: number[];
    appo: number[];
  };
  profitTrend: typeof PROFIT_TREND_DATA;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Multipliers for date presets
const DATE_MULTIPLIERS: Record<string, number> = {
  Today: 0.16,
  Yesterday: 0.14,
  'Last 7 Days': 1.0,
  'Last 14 Days': 1.88,
  'Last 30 Days': 3.92,
  'This Month': 3.1,
};

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [selectedStoreId, setSelectedStoreId] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('May 17 - May 23, 2024');
  const [datePreset, setDatePreset] = useState<string>('Last 7 Days');

  const [stores, setStores] = useState<Store[]>(INITIAL_STORES);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [expenses, setExpenses] = useState<Expense[]>(INITIAL_EXPENSES);
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [insights, setInsights] = useState<AIInsight[]>(INITIAL_AI_INSIGHTS);
  const [tickets, setTickets] = useState<CustomerTicket[]>(INITIAL_TICKETS);

  // Initialize theme from localStorage & apply to documentElement
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('rush_theme') as Theme | null;
      const initialTheme = savedTheme || 'dark';
      setThemeState(initialTheme);
      if (initialTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('rush_theme', newTheme);
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}
  };

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
  };

  // Load / Sync state from localStorage
  useEffect(() => {
    try {
      const savedStores = localStorage.getItem('rush_stores');
      if (savedStores) setStores(JSON.parse(savedStores));
      const savedProducts = localStorage.getItem('rush_products');
      if (savedProducts) setProducts(JSON.parse(savedProducts));
      const savedOrders = localStorage.getItem('rush_orders');
      if (savedOrders) setOrders(JSON.parse(savedOrders));
      const savedExpenses = localStorage.getItem('rush_expenses');
      if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
      const savedCampaigns = localStorage.getItem('rush_campaigns');
      if (savedCampaigns) setCampaigns(JSON.parse(savedCampaigns));
      const savedTickets = localStorage.getItem('rush_tickets');
      if (savedTickets) setTickets(JSON.parse(savedTickets));
    } catch (e) {
      console.error('Error loading localStorage state', e);
    }
  }, []);

  const saveToLocal = (key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error writing to localStorage', e);
    }
  };

  const addStore = async (newStoreData: Omit<Store, 'id'>) => {
    const newStore: Store = {
      ...newStoreData,
      id: `store-${Date.now()}`,
    };

    const updated = [...stores, newStore];
    setStores(updated);
    saveToLocal('rush_stores', updated);

    try {
      await fetch('/api/stores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStoreData),
      });
    } catch (err) {
      console.warn('API store sync fallback:', err);
    }
  };

  const removeStore = async (id: string) => {
    const updated = stores.filter((s) => s.id !== id);
    setStores(updated);
    if (selectedStoreId === id) setSelectedStoreId('all');
    saveToLocal('rush_stores', updated);

    try {
      await fetch(`/api/stores?id=${id}`, { method: 'DELETE' });
    } catch (err) {
      console.warn('API store delete fallback:', err);
    }
  };

  const updateProduct = (product: Product) => {
    const updated = products.map((p) => (p.id === product.id ? product : p));
    setProducts(updated);
    saveToLocal('rush_products', updated);
  };

  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const product: Product = {
      ...newProd,
      id: `prod-${Date.now()}`,
    };
    const updated = [product, ...products];
    setProducts(updated);
    saveToLocal('rush_products', updated);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
    setOrders(updated);
    saveToLocal('rush_orders', updated);
  };

  const toggleCampaignStatus = (campaignId: string) => {
    const updated = campaigns.map((c) =>
      c.id === campaignId
        ? { ...c, status: c.status === 'Active' ? ('Paused' as const) : ('Active' as const) }
        : c,
    );
    setCampaigns(updated);
    saveToLocal('rush_campaigns', updated);
  };

  const addExpense = (newExp: Omit<Expense, 'id'>) => {
    const exp: Expense = {
      ...newExp,
      id: `exp-${Date.now()}`,
    };
    const updated = [exp, ...expenses];
    setExpenses(updated);
    saveToLocal('rush_expenses', updated);
  };

  const dismissInsight = (id: string) => {
    setInsights((prev) => prev.filter((i) => i.id !== id));
  };

  const replyToTicket = (ticketId: string, replyText: string) => {
    const updated = tickets.map((t) => {
      if (t.id === ticketId) {
        return {
          ...t,
          status: 'AI Responded' as const,
          messages: [
            ...t.messages,
            {
              id: `msg-${Date.now()}`,
              sender: 'ai' as const,
              senderName: 'Rush AI Assistant',
              text: replyText,
              timestamp: 'Just now',
            },
          ],
          suggestedAiReply: '',
        };
      }
      return t;
    });
    setTickets(updated);
    saveToLocal('rush_tickets', updated);
  };

  const resolveTicket = (ticketId: string) => {
    const updated = tickets.map((t) =>
      t.id === ticketId ? { ...t, status: 'Resolved' as const } : t,
    );
    setTickets(updated);
    saveToLocal('rush_tickets', updated);
  };

  const escalateTicket = (ticketId: string) => {
    const updated = tickets.map((t) =>
      t.id === ticketId ? { ...t, status: 'Escalated' as const } : t,
    );
    setTickets(updated);
    saveToLocal('rush_tickets', updated);
  };

  // Selected Store Object
  const selectedStore = useMemo(() => {
    if (selectedStoreId === 'all') return null;
    return stores.find((s) => s.id === selectedStoreId) || null;
  }, [selectedStoreId, stores]);

  // Date Multiplier
  const dateMultiplier = useMemo(() => {
    return DATE_MULTIPLIERS[datePreset] || 1.0;
  }, [datePreset]);

  // Filtered Datasets
  const filteredProducts = useMemo(() => {
    if (selectedStoreId === 'all') return products;
    return products.filter((p) => p.storeId === selectedStoreId);
  }, [selectedStoreId, products]);

  const filteredOrders = useMemo(() => {
    if (selectedStoreId === 'all') return orders;
    return orders.filter((o) => o.storeId === selectedStoreId);
  }, [selectedStoreId, orders]);

  const filteredCampaigns = useMemo(() => {
    if (selectedStoreId === 'all') return campaigns;
    return campaigns.filter((c) => c.storeId === selectedStoreId);
  }, [selectedStoreId, campaigns]);

  const filteredExpenses = useMemo(() => {
    if (selectedStoreId === 'all') return expenses;
    return expenses.filter((e) => e.storeId === 'all' || e.storeId === selectedStoreId);
  }, [selectedStoreId, expenses]);

  // Dynamic Financial Aggregates
  const totalRevenue = useMemo(() => {
    const base = selectedStore
      ? selectedStore.totalRevenue
      : stores.reduce((acc, s) => acc + s.totalRevenue, 0);
    return Math.round(base * dateMultiplier * 100) / 100;
  }, [selectedStore, stores, dateMultiplier]);

  const netProfit = useMemo(() => {
    const base = selectedStore
      ? selectedStore.netProfit
      : stores.reduce((acc, s) => acc + s.netProfit, 0);
    return Math.round(base * dateMultiplier * 100) / 100;
  }, [selectedStore, stores, dateMultiplier]);

  const profitMargin = useMemo(() => {
    if (totalRevenue <= 0) return 0;
    return Math.round((netProfit / totalRevenue) * 1000) / 10;
  }, [totalRevenue, netProfit]);

  const totalOrders = useMemo(() => {
    const base = selectedStore
      ? selectedStore.totalOrders
      : stores.reduce((acc, s) => acc + s.totalOrders, 0);
    return Math.round(base * dateMultiplier);
  }, [selectedStore, stores, dateMultiplier]);

  const avgOrderValue = useMemo(() => {
    if (totalOrders <= 0) return 0;
    return Math.round((totalRevenue / totalOrders) * 100) / 100;
  }, [totalRevenue, totalOrders]);

  const avgProfitPerOrder = useMemo(() => {
    if (totalOrders <= 0) return 0;
    return Math.round((netProfit / totalOrders) * 100) / 100;
  }, [netProfit, totalOrders]);

  const totalAdsSpend = useMemo(() => {
    if (selectedStoreId === 'all') {
      return Math.round(2340.5 * dateMultiplier * 100) / 100;
    }
    const sum = filteredCampaigns.reduce((acc, c) => acc + c.spend, 0);
    return Math.round(sum * dateMultiplier * 100) / 100;
  }, [selectedStoreId, filteredCampaigns, dateMultiplier]);

  const totalCogs = useMemo(() => {
    if (selectedStoreId === 'all') {
      return Math.round(8430.2 * dateMultiplier * 100) / 100;
    }
    const sum = filteredProducts.reduce((acc, p) => acc + p.cogs, 0);
    return Math.round(sum * dateMultiplier * 100) / 100;
  }, [selectedStoreId, filteredProducts, dateMultiplier]);

  const totalFees = useMemo(() => {
    if (selectedStoreId === 'all') {
      return Math.round(2340.1 * dateMultiplier * 100) / 100;
    }
    const sum = filteredProducts.reduce((acc, p) => acc + p.tiktokFees, 0);
    return Math.round(sum * dateMultiplier * 100) / 100;
  }, [selectedStoreId, filteredProducts, dateMultiplier]);

  const refunds = useMemo(() => {
    if (selectedStoreId === 'all') {
      return Math.round(320.4 * dateMultiplier * 100) / 100;
    }
    const storeRefunds = filteredOrders
      .filter((o) => o.status === 'Refunded')
      .reduce((acc, o) => acc + o.totalAmount, 0);
    return Math.round((storeRefunds || 34.5) * dateMultiplier * 100) / 100;
  }, [selectedStoreId, filteredOrders, dateMultiplier]);

  // Store-specific Growth Rates
  const growthRates = useMemo(() => {
    if (selectedStore) {
      return {
        revenue: selectedStore.growth,
        profit: selectedStore.growth * 1.08,
        margin: 1.8,
        orders: selectedStore.growth * 0.85,
        aov: 2.9,
        appo: 3.8,
      };
    }
    return {
      revenue: 18.6,
      profit: 20.4,
      margin: 2.1,
      orders: 15.3,
      aov: 3.2,
      appo: 4.7,
    };
  }, [selectedStore]);

  // Store-specific Sparklines
  const sparklines = useMemo(() => {
    const ratio = selectedStore ? selectedStore.totalRevenue / 25430.8 : 1;
    return {
      revenue: [18, 22, 19, 28, 26, 35, 32, 42, 48].map((v) => Math.round(v * ratio * 10) / 10),
      profit: [12, 15, 14, 22, 20, 29, 27, 36, 42].map((v) => Math.round(v * ratio * 10) / 10),
      margin: [48, 49, 48.5, 50, 50.5, 51.2, 51.5, profitMargin],
      orders: [55, 60, 58, 68, 65, 74, 78, Math.round(totalOrders / 10)],
      aov: [28.5, 29.0, 28.8, 29.5, 29.2, 30.0, avgOrderValue],
      appo: [14.2, 14.8, 14.5, 15.1, 15.0, 15.5, avgProfitPerOrder],
    };
  }, [selectedStore, totalOrders, avgOrderValue, avgProfitPerOrder, profitMargin]);

  // Dynamic Profit Trend
  const profitTrend = useMemo(() => {
    const ratio = selectedStore
      ? (selectedStore.totalRevenue / 25430.8) * dateMultiplier
      : dateMultiplier;
    return PROFIT_TREND_DATA.map((item) => ({
      date: item.date,
      profit: Math.round(item.profit * ratio),
      revenue: Math.round(item.revenue * ratio),
      expenses: Math.round(item.expenses * ratio),
    }));
  }, [selectedStore, dateMultiplier]);

  // Dynamic Category Breakdown for single store vs multi-store
  const categoryBreakdown = useMemo(() => {
    if (selectedStoreId === 'all') {
      const colors = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'];
      return stores.map((st, i) => ({
        name: st.name,
        value: Math.round(st.totalRevenue * dateMultiplier),
        percentage: ((st.totalRevenue / 25430.8) * 100).toFixed(1),
        color: colors[i % colors.length] ?? '#8b5cf6',
      }));
    }

    // Group filtered products by category
    const catMap: Record<string, number> = {};
    filteredProducts.forEach((p) => {
      catMap[p.category] = (catMap[p.category] || 0) + p.revenue;
    });

    const colors = ['#22c55e', '#3b82f6', '#a855f7', '#f59e0b', '#ec4899'];
    const totalCatRevenue = Object.values(catMap).reduce((a, b) => a + b, 0) || 1;

    return Object.entries(catMap).map(([name, val], i) => ({
      name,
      value: Math.round(val * dateMultiplier),
      percentage: ((val / totalCatRevenue) * 100).toFixed(1),
      color: colors[i % colors.length] ?? '#22c55e',
    }));
  }, [selectedStoreId, stores, filteredProducts, dateMultiplier]);

  // Dynamic Order Status Breakdown
  const orderStatusCounts = useMemo(() => {
    const total = filteredOrders.length || 1;
    const completed = filteredOrders.filter((o) => o.status === 'Completed').length;
    const processing = filteredOrders.filter((o) => o.status === 'Processing').length;
    const canceled = filteredOrders.filter((o) => o.status === 'Canceled').length;
    const refunded = filteredOrders.filter((o) => o.status === 'Refunded').length;

    // Scale to totalOrders count
    const compCount = Math.round((completed / total) * totalOrders);
    const procCount = Math.round((processing / total) * totalOrders);
    const cancCount = Math.round((canceled / total) * totalOrders);
    const refCount = Math.max(0, totalOrders - compCount - procCount - cancCount);

    return [
      {
        name: 'Completed',
        count: compCount,
        percentage: Math.round((compCount / totalOrders) * 1000) / 10 || 81.9,
        color: '#22c55e',
      },
      {
        name: 'Processing',
        count: procCount,
        percentage: Math.round((procCount / totalOrders) * 1000) / 10 || 12.1,
        color: '#3b82f6',
      },
      {
        name: 'Canceled',
        count: cancCount,
        percentage: Math.round((cancCount / totalOrders) * 1000) / 10 || 3.6,
        color: '#ef4444',
      },
      {
        name: 'Refunded',
        count: refCount,
        percentage: Math.round((refCount / totalOrders) * 1000) / 10 || 2.4,
        color: '#94a3b8',
      },
    ];
  }, [filteredOrders, totalOrders]);

  // Store-specific AI Insights
  const storeInsights = useMemo(() => {
    if (!selectedStore) return insights;

    return [
      {
        id: `ins-st-1`,
        type: 'win' as const,
        text: `${selectedStore.name} profit increased by ${selectedStore.growth.toFixed(1)}% this week.`,
        detail: `Generated ${selectedStore.currencySymbol}${selectedStore.totalRevenue.toLocaleString()} across ${selectedStore.totalOrders} delivered orders.`,
        badge: `+${selectedStore.growth.toFixed(1)}% Growth`,
      },
      {
        id: `ins-st-2`,
        type: 'star' as const,
        text: `Top SKU on ${selectedStore.name} is ${filteredProducts[0]?.title || 'Portable Blender'}.`,
        detail: `Operating at ${filteredProducts[0]?.margin || 52.5}% net margin with low return rates.`,
        badge: 'Top Performer',
      },
      {
        id: `ins-st-3`,
        type: 'scale' as const,
        text: `ROAS is averaging 3.65x on ${selectedStore.country} TikTok Spark Ads.`,
        detail: 'Recommend increasing ad budget by 20% to scale profitable volume.',
        badge: 'Scale Opportunity',
      },
    ];
  }, [selectedStore, insights, filteredProducts]);

  return (
    <StoreContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        selectedStoreId,
        setSelectedStoreId,
        dateRange,
        setDateRange,
        datePreset,
        setDatePreset,
        stores,
        products,
        orders,
        campaigns,
        expenses,
        customers,
        insights,
        tickets,
        addStore,
        removeStore,
        updateProduct,
        addProduct,
        updateOrderStatus,
        toggleCampaignStatus,
        addExpense,
        dismissInsight,
        replyToTicket,
        resolveTicket,
        escalateTicket,
        selectedStore,
        filteredProducts,
        filteredOrders,
        filteredCampaigns,
        filteredExpenses,
        storeInsights,
        categoryBreakdown,
        orderStatusCounts,
        totalRevenue,
        netProfit,
        profitMargin,
        totalOrders,
        avgOrderValue,
        avgProfitPerOrder,
        totalAdsSpend,
        totalCogs,
        totalFees,
        refunds,
        growthRates,
        sparklines,
        profitTrend,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
