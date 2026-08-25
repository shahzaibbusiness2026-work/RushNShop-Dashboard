export type Currency = 'USD' | 'GBP' | 'EUR' | 'CAD';

export interface Store {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  flag: string;
  currency: Currency;
  currencySymbol: string;
  isConnected: boolean;
  apiStatus: 'active' | 'syncing' | 'error' | 'disconnected';
  totalRevenue: number;
  totalOrders: number;
  netProfit: number;
  margin: number;
  growth: number;
  lastSyncTime: string;
  accountRole: 'Owner' | 'Admin' | 'Manager' | 'Staff';
}

export interface Product {
  id: string;
  title: string;
  sku: string;
  image: string;
  category: string;
  storeId: string;
  unitsSold: number;
  revenue: number;
  cogs: number;
  shippingCost: number;
  tiktokFees: number;
  affiliateCommission: number;
  adCost: number;
  totalCost: number;
  netProfit: number;
  margin: number;
  stock: number;
  status: 'star' | 'profitable' | 'bleeding' | 'scale';
}

export interface OrderItem {
  productId: string;
  productTitle: string;
  sku: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  storeId: string;
  storeName: string;
  storeFlag: string;
  date: string;
  items: OrderItem[];
  totalAmount: number;
  cogs: number;
  fees: number;
  shipping: number;
  netProfit: number;
  status: 'Completed' | 'Processing' | 'Canceled' | 'Refunded';
  trackingNumber: string;
  carrier: string;
}

export interface Campaign {
  id: string;
  name: string;
  storeId: string;
  storeName: string;
  status: 'Active' | 'Paused' | 'Reviewing';
  spend: number;
  revenue: number;
  roas: number;
  cpa: number;
  impressions: number;
  clicks: number;
  ctr: number;
  purchases: number;
  profit: number;
  trend: 'up' | 'down' | 'stable';
}

export interface Expense {
  id: string;
  title: string;
  category: 'Software' | 'Staff' | 'Warehouse' | 'Marketing' | 'Packaging' | 'Other';
  amount: number;
  recurrence: 'Monthly' | 'One-off' | 'Annual';
  storeId: string;
  storeName: string;
  date: string;
  status: 'Paid' | 'Scheduled';
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  country: string;
  totalOrders: number;
  totalSpent: number;
  netProfit: number;
  cac: number;
  ltv: number;
  lastOrderDate: string;
  tier: 'VIP' | 'Loyal' | 'New' | 'At Risk';
}

export interface AIInsight {
  id: string;
  type: 'win' | 'star' | 'warning' | 'scale';
  text: string;
  detail?: string;
  badge?: string;
}

export interface CustomerTicketMessage {
  id: string;
  sender: 'customer' | 'ai' | 'agent';
  senderName: string;
  text: string;
  timestamp: string;
}

export interface CustomerTicket {
  id: string;
  customerName: string;
  customerEmail: string;
  orderNumber: string;
  storeName: string;
  subject: string;
  category:
    'Order Status' | 'Refund / Return' | 'Product Question' | 'Defect / Damage' | 'Shipping Delay';
  status: 'Open' | 'Pending AI' | 'AI Responded' | 'Escalated' | 'Resolved';
  priority: 'Low' | 'Medium' | 'High';
  messages: CustomerTicketMessage[];
  suggestedAiReply: string;
}

export interface CalculatorState {
  cogs: number;
  sellingPrice: number;
  shippingCost: number;
  packagingCost: number;
  tiktokFeePercent: number;
  paymentFeePercent: number;
  paymentFeeFixed: number;
  affiliatePercent: number;
  adCpa: number;
  otherExpenses: number;
  targetMarginPercent: number;
}

export type ProfitHealthStatus = 'excellent' | 'good' | 'low' | 'loss';

export interface ListingItem {
  id: string;
  storeId?: string;
  storeName?: string;
  productName: string;
  sku: string;
  category: string;
  sellingPrice: number;
  stock: number;
  status: 'draft' | 'ready' | 'synced';
  createdAt: string;
  syncedAt?: string;
  bulletPoints?: string[];
  viralHooks?: string[];
  tags?: string[];
  image?: string;
}

export interface CalculationRecord {
  id: string;
  name: string;
  sku: string;
  category: string;
  image?: string;
  sellingPrice: number;
  cogs: number;
  shippingCost: number;
  packagingCost: number;
  tiktokFeePercent: number;
  affiliatePercent: number;
  adCpa: number;
  otherExpenses: number;
  netProfit: number;
  profitMarginPercent: number;
  breakEvenPrice: number;
  healthStatus: ProfitHealthStatus;
  createdAt: string;
  bestFor?: string;
}

export interface SaaSSubscriptionPlan {
  id: string;
  name: string;
  badge?: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  popular?: boolean;
  features: string[];
  limits: {
    stores: number | 'Unlimited';
    monthlyCalculations: number | 'Unlimited';
    aiGenerations: number | 'Unlimited';
    teamMembers: number | 'Unlimited';
    exportPdf: boolean;
  };
}

export interface BulkParsedProduct {
  name: string;
  sku: string;
  category: string;
  image?: string;
  cogs: number;
  sellingPrice: number;
  shippingCost: number;
  packagingCost: number;
  tiktokFeePercent: number;
  affiliatePercent: number;
  adCpa: number;
  netProfit: number;
  profitMarginPercent: number;
  healthStatus: ProfitHealthStatus;
  isValid: boolean;
  error?: string;
}

