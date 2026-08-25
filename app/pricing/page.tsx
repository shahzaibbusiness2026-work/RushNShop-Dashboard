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
  ArrowRight,
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
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-200 py-4">
      {/* Header */}
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
          <Sparkles className="h-3.5 w-3.5 fill-current" />
          <span>Simple, Transparent Pricing</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Choose the Right Plan to Scale Your Operations
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal">
          Eliminate profit blind spots, protect margins, and manage multi-store accounts effortlessly.
        </p>

        {/* Billing Cycle Toggle */}
        <div className="inline-flex items-center p-1 bg-slate-100 dark:bg-[#0f1420] rounded-xl border border-slate-200 dark:border-slate-800 mt-2">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              billingCycle === 'monthly'
                ? 'bg-white dark:bg-[#141a29] text-slate-900 dark:text-slate-100 shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              billingCycle === 'annual'
                ? 'bg-white dark:bg-[#141a29] text-slate-900 dark:text-slate-100 shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <span>Annual Billing</span>
            <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 text-[10px] font-semibold">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid - Perfectly Proportioned */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
        {SAAS_PLANS.map((plan) => {
          const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
          const isPro = plan.popular;

          return (
            <div
              key={plan.id}
              className={`relative flex flex-col justify-between rounded-2xl p-6 transition-all ${
                isPro
                  ? 'border-2 border-emerald-500/80 bg-white dark:bg-[#0f1420] ring-1 ring-emerald-500/30 shadow-md'
                  : 'border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1420]'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-semibold uppercase tracking-wider shadow-xs">
                  Most Popular
                </span>
              )}

              <div>
                {/* Plan Header */}
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{plan.name}</h3>
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-medium text-slate-500 dark:text-slate-400">
                    {plan.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 min-h-[34px]">
                  {plan.description}
                </p>

                {/* Price Display */}
                <div className="my-5 font-mono-numeric">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">
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
                <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Included Features:
                  </p>
                  <ul className="space-y-2">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-3">
                <button
                  type="button"
                  onClick={() => handleUpgrade(plan.id)}
                  className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isPro
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs'
                      : 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white'
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
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0f1420] border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100">
              14-Day Money-Back Guarantee
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Try RushNshop risk-free. Cancel anytime with a 100% full refund policy.
            </p>
          </div>
        </div>
        <button
          onClick={() => handleUpgrade('pro')}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white text-white text-xs font-semibold transition-all shrink-0 cursor-pointer"
        >
          Start 14-Day Trial
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
