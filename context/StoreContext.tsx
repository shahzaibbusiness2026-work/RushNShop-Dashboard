'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
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
  
  // Dashboard Aggregates
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
  profitTrend: typeof PROFIT_TREND_DATA;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
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

  // Initialize theme from localStorage or prefers-color-scheme
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('rush_theme') as Theme | null;
      if (savedTheme) {
        setThemeState(savedTheme);
        if (savedTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
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

  // Load / Sync from localStorage & API
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

    // Update local state immediately
    const updated = [...stores, newStore];
    setStores(updated);
    saveToLocal('rush_stores', updated);

    // Call Next.js backend API
    try {
      await fetch('/api/stores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStoreData),
      });
    } catch (err) {
      console.warn('API store sync notice (running on local state fallback):', err);
    }
  };

  const removeStore = async (id: string) => {
    const updated = stores.filter((s) => s.id !== id);
    setStores(updated);
    if (selectedStoreId === id) setSelectedStoreId('all');
    saveToLocal('rush_stores', updated);

    // Call Next.js backend API
    try {
      await fetch(`/api/stores?id=${id}`, {
        method: 'DELETE',
      });
    } catch (err) {
      console.warn('API store delete notice:', err);
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
      c.id === campaignId ? { ...c, status: c.status === 'Active' ? ('Paused' as const) : ('Active' as const) } : c
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
    const updated = tickets.map((t) => (t.id === ticketId ? { ...t, status: 'Resolved' as const } : t));
    setTickets(updated);
    saveToLocal('rush_tickets', updated);
  };

  const escalateTicket = (ticketId: string) => {
    const updated = tickets.map((t) => (t.id === ticketId ? { ...t, status: 'Escalated' as const } : t));
    setTickets(updated);
    saveToLocal('rush_tickets', updated);
  };

  // Filtered views
  const selectedStore = selectedStoreId === 'all' ? null : stores.find((s) => s.id === selectedStoreId) || null;

  const filteredProducts = selectedStoreId === 'all' ? products : products.filter((p) => p.storeId === selectedStoreId);
  const filteredOrders = selectedStoreId === 'all' ? orders : orders.filter((o) => o.storeId === selectedStoreId);
  const filteredCampaigns = selectedStoreId === 'all' ? campaigns : campaigns.filter((c) => c.storeId === selectedStoreId);
  const filteredExpenses = selectedStoreId === 'all' ? expenses : expenses.filter((e) => e.storeId === 'all' || e.storeId === selectedStoreId);

  // Exact metrics as shown in image or scaled when single store selected
  const totalRevenue = selectedStore ? selectedStore.totalRevenue : 25430.80;
  const netProfit = selectedStore ? selectedStore.netProfit : 13230.20;
  const profitMargin = selectedStore ? selectedStore.margin : 52.0;
  const totalOrders = selectedStore ? selectedStore.totalOrders : 840;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 30.27;
  const avgProfitPerOrder = totalOrders > 0 ? netProfit / totalOrders : 15.75;

  const totalAdsSpend = selectedStoreId === 'all' ? 2340.50 : filteredCampaigns.reduce((acc, c) => acc + c.spend, 0);
  const totalCogs = selectedStoreId === 'all' ? 8430.20 : filteredProducts.reduce((acc, p) => acc + p.cogs, 0);
  const totalFees = selectedStoreId === 'all' ? 2340.10 : filteredProducts.reduce((acc, p) => acc + p.tiktokFees, 0);
  const refunds = selectedStoreId === 'all' ? 320.40 : 34.50;

  const profitTrend = PROFIT_TREND_DATA.map((item) => {
    if (selectedStoreId === 'all') return item;
    const ratio = totalRevenue / 25430.80;
    return {
      date: item.date,
      profit: Math.round(item.profit * ratio),
      revenue: Math.round(item.revenue * ratio),
      expenses: Math.round(item.expenses * ratio),
    };
  });

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
