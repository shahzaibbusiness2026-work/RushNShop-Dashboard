import { SaaSSubscriptionPlan } from '../types';

export const SAAS_PLANS: SaaSSubscriptionPlan[] = [
  {
    id: 'starter',
    name: 'Starter Merchant',
    badge: 'Free Tier',
    monthlyPrice: 0,
    annualPrice: 0,
    description: 'Essential unit economics, margin calculation, and profit forecasting for new TikTok Shop sellers.',
    features: [
      '1 Connected TikTok Shop',
      'Up to 50 Profit Calculations / mo',
      'Basic Product Comparison (2 SKUs)',
      'TikTok 5% Commission & Ad CPA Calculator',
      'Community & Help Center Access',
    ],
    limits: {
      stores: 1,
      monthlyCalculations: 50,
      aiGenerations: 10,
      teamMembers: 1,
      exportPdf: false,
    },
  },
  {
    id: 'pro',
    name: 'Pro TikTok Seller',
    badge: 'Most Popular',
    popular: true,
    monthlyPrice: 29,
    annualPrice: 24, // $288 billed annually ($24/mo)
    description: 'Full TrueProfit automation, generative AI video scripts, CSV bulk margin calculator, and multi-store analytics.',
    features: [
      'Up to 5 Connected TikTok Shops',
      'Unlimited Margin Calculations & History',
      'Bulk CSV / Excel Profit Calculator',
      '4-Product Comparison Studio + Winner AI',
      'TikTok Listings Studio & Auto-Sync',
      'AI Video Hook & Scene Script Generator',
      'One-Click Google Sheets & PDF Export',
      'Priority 24/7 Support',
    ],
    limits: {
      stores: 5,
      monthlyCalculations: 'Unlimited',
      aiGenerations: 500,
      teamMembers: 3,
      exportPdf: true,
    },
  },
  {
    id: 'agency',
    name: 'Scale & Agency Multi-Store',
    badge: 'Enterprise',
    monthlyPrice: 79,
    annualPrice: 65, // $780 billed annually ($65/mo)
    description: 'For 7-8 figure TikTok Shop operators, multi-region creator brands, and agencies running client stores.',
    features: [
      'Unlimited Connected TikTok Shops',
      'Unlimited Everything (Calculations, Scripts, Exports)',
      'Multi-Currency Currency Normalization (USD, GBP, EUR, CAD)',
      'Multi-User Staff Roles & Permissions (RBAC)',
      'AI Automated Customer Service Ticket Resolver',
      'Custom P&L Statement Branding & Dedicated IP',
      'Dedicated Account Manager & Slack Channel',
    ],
    limits: {
      stores: 'Unlimited',
      monthlyCalculations: 'Unlimited',
      aiGenerations: 'Unlimited',
      teamMembers: 'Unlimited',
      exportPdf: true,
    },
  },
];
