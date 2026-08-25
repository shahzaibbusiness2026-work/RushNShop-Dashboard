'use client';

import React, { useState } from 'react';
import {
  Check,
  Zap,
  Sparkles,
  ShieldCheck,
  HelpCircle,
  CreditCard,
  Building,
  Store,
  FileText,
} from 'lucide-react';
import { SAAS_PLANS } from '../../lib/saasPlans';
import UpgradeModal from '../../components/billing/UpgradeModal';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [selectedPlanId, setSelectedPlanId] = useState<string>('pro');
  const [modalOpen, setModalOpen] = useState(false);

  const handleUpgrade = (planId: string) => {
    setSelectedPlanId(planId);
    setModalOpen(true);
  };

  return (
    <div className="space-y-10 max-w-6xl mx-auto animate-in fade-in duration-200 py-4">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime-500/10 text-lime-700 dark:text-[#84cc16] border border-lime-500/20 text-xs font-black uppercase tracking-wider">
          <Sparkles className="h-3.5 w-3.5 fill-current" />
          <span>Flexible SaaS Plans</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Scale Your TikTok Shop with Full TrueProfit Intelligence
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
          Choose the right plan to eliminate blind spots, protect your profit margins, and scale multi-store operations.
        </p>

        {/* Billing Cycle Toggle */}
        <div className="inline-flex items-center p-1 bg-slate-100 dark:bg-[#161b26] rounded-2xl border border-slate-200 dark:border-slate-800 mt-4">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              billingCycle === 'monthly'
                ? 'bg-white dark:bg-[#121620] text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              billingCycle === 'annual'
                ? 'bg-white dark:bg-[#121620] text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>Annual Billing</span>
            <span className="px-1.5 py-0.5 rounded-full bg-[#84cc16] text-black text-[10px] font-black">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SAAS_PLANS.map((plan) => {
          const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
          const isPro = plan.popular;

          return (
            <div
              key={plan.id}
              className={`relative flex flex-col justify-between rounded-3xl p-6 sm:p-8 transition-all ${
                isPro
                  ? 'border-2 border-[#84cc16] bg-gradient-to-b from-lime-500/10 via-white to-white dark:from-lime-500/10 dark:via-[#121620] dark:to-[#121620] shadow-xl'
                  : 'border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#121620]'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#84cc16] text-black text-[10px] font-black uppercase tracking-wider shadow-md">
                  ★ Most Popular for Sellers
                </span>
              )}

              <div>
                {/* Plan Header */}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">{plan.name}</h3>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500">
                    {plan.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 min-h-[36px]">
                  {plan.description}
                </p>

                {/* Price Display */}
                <div className="my-6 font-mono-numeric">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-slate-900 dark:text-white">
                      ${price}
                    </span>
                    <span className="text-xs text-slate-400 font-sans">/ month</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 font-sans">
                    {billingCycle === 'annual' && price > 0
                      ? `Billed annually ($${price * 12}/yr)`
                      : price === 0
                      ? 'Free forever'
                      : 'Billed monthly, cancel anytime'}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Included Features:
                  </p>
                  <ul className="space-y-2.5">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-200">
                        <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5 stroke-[2.5]" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4">
                <button
                  type="button"
                  onClick={() => handleUpgrade(plan.id)}
                  className={`w-full py-3 rounded-2xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                    isPro
                      ? 'bg-[#84cc16] hover:bg-[#72b012] text-black'
                      : 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-black'
                  }`}
                >
                  {plan.id === 'starter' ? 'Get Started Free' : `Upgrade to ${plan.name}`}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust & Guarantee Banner */}
      <div className="p-6 rounded-3xl bg-slate-50 dark:bg-[#121620] border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-[#4ade80] flex items-center justify-center shrink-0">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              14-Day Money-Back Guarantee
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Try RushNshop Pro risk-free. If it does not save you more than it costs, get an instant 100% refund.
            </p>
          </div>
        </div>
        <button
          onClick={() => handleUpgrade('pro')}
          className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-black text-xs font-bold transition-all shrink-0 cursor-pointer"
        >
          Start 14-Day Pro Trial
        </button>
      </div>

      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedPlanId={selectedPlanId}
        billingCycle={billingCycle}
      />
    </div>
  );
}
