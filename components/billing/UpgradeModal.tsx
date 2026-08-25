'use client';

import React, { useState } from 'react';
import {
  X,
  CreditCard,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { SaaSSubscriptionPlan } from '../../types';
import { SAAS_PLANS } from '../../lib/saasPlans';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlanId?: string;
  billingCycle?: 'monthly' | 'annual';
}

export default function UpgradeModal({
  isOpen,
  onClose,
  selectedPlanId = 'pro',
  billingCycle = 'annual',
}: UpgradeModalProps) {
  const [activePlanId, setActivePlanId] = useState(selectedPlanId);
  const [cycle, setCycle] = useState<'monthly' | 'annual'>(billingCycle);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const currentPlan: SaaSSubscriptionPlan =
    SAAS_PLANS.find((p) => p.id === activePlanId) || SAAS_PLANS[0]!;
  const price = cycle === 'annual' ? currentPlan.annualPrice : currentPlan.monthlyPrice;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-lg flex flex-col bg-white dark:bg-[#121620] rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-700/80 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-lime-100 text-lime-800 dark:bg-[#84cc16]/20 dark:text-[#84cc16]">
              <Sparkles className="h-4 w-4 fill-current" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Upgrade to {currentPlan.name}
              </h2>
              <p className="text-xs text-slate-500">Instant activation with 14-day money-back guarantee</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="h-8 w-8 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content Body */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <div className="h-16 w-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-[#4ade80] flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Subscription Upgraded Successfully!
            </h3>
            <p className="text-xs text-slate-400">
              Welcome to {currentPlan.name}. All features and limits have been unlocked immediately.
            </p>
          </div>
        ) : (
          <form onSubmit={handleCheckout} className="p-6 space-y-5">
            {/* Plan Selector */}
            <div className="grid grid-cols-3 gap-2">
              {SAAS_PLANS.map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setActivePlanId(plan.id)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    activePlanId === plan.id
                      ? 'border-[#84cc16] bg-lime-500/10 text-slate-900 dark:text-white ring-1 ring-[#84cc16]'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  <p className="text-[11px] font-bold truncate">{plan.name}</p>
                  <p className="text-sm font-black font-mono-numeric mt-0.5 text-slate-900 dark:text-white">
                    ${cycle === 'annual' ? plan.annualPrice : plan.monthlyPrice}
                    <span className="text-[10px] font-normal text-slate-400">/mo</span>
                  </p>
                </button>
              ))}
            </div>

            {/* Price Summary Card */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#161b26] border border-slate-200/80 dark:border-slate-800 flex items-center justify-between font-mono-numeric">
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white font-sans">
                  {currentPlan.name} ({cycle === 'annual' ? 'Billed Annually - Save 20%' : 'Billed Monthly'})
                </p>
                <p className="text-[11px] text-slate-400 font-sans">
                  {cycle === 'annual' ? `$${price * 12}/year auto-renewed` : `$${price}/month`}
                </p>
              </div>
              <p className="text-xl font-black text-slate-900 dark:text-white">${price}/mo</p>
            </div>

            {/* Simulated Payment Card Inputs */}
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  required
                  defaultValue="Alex Johnson"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Card Information</span>
                  <span className="flex items-center gap-1 text-[10px] text-slate-400">
                    <ShieldCheck className="h-3 w-3 text-emerald-500" /> 256-Bit Encrypted
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    defaultValue="4242 •••• •••• 4242"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono-numeric"
                  />
                  <CreditCard className="h-4 w-4 text-slate-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    Expiry (MM/YY)
                  </label>
                  <input
                    type="text"
                    required
                    defaultValue="12/28"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono-numeric"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    CVC / CVV
                  </label>
                  <input
                    type="text"
                    required
                    defaultValue="888"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono-numeric"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isProcessing}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#84cc16] hover:bg-[#72b012] disabled:opacity-50 text-xs font-bold text-black shadow-xs transition-all cursor-pointer"
              >
                {isProcessing ? (
                  <span>Securing Payment...</span>
                ) : (
                  <>
                    <Zap className="h-4 w-4 fill-current" />
                    <span>Pay ${price === 0 ? 0 : cycle === 'annual' ? price * 12 : price} & Activate</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
