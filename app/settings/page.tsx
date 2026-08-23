'use client';

import React, { useState } from 'react';
import {
  Settings,
  Key,
  Shield,
  Bell,
  Globe,
  Truck,
  CreditCard,
  Check,
  Save,
  Users,
  Zap,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { cn } from '../../lib/utils';

export default function SettingsPage() {
  const { stores } = useStore();
  const [activeTab, setActiveTab] = useState<'integrations' | 'defaults' | 'team' | 'notifications'>('integrations');
  const [saved, setSaved] = useState(false);

  // Default Calculation Settings
  const [defaultTiktokFee, setDefaultTiktokFee] = useState('5.0');
  const [defaultPaymentFee, setDefaultPaymentFee] = useState('2.9');
  const [defaultTargetMargin, setDefaultTargetMargin] = useState('40.0');
  const [defaultCurrency, setDefaultCurrency] = useState('USD');

  // Integrations state
  const [ttShopAppKey, setTtShopAppKey] = useState('tt_live_app_8923f1092a8');
  const [ttAdsToken, setTtAdsToken] = useState('act_token_3498109247192847');
  const [stripeConnected, setStripeConnected] = useState(true);
  const [fulfillment3pl, setFulfillment3pl] = useState('ShipBob FastFill 3PL (Active)');

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">System Settings & Integrations</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Configure TikTok Shop API webhooks, advertising pixels, default margins, and team permissions.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-1.5 rounded-xl bg-[#84cc16] px-4 py-2 text-xs font-bold text-black shadow-xs hover:bg-[#72b012] self-start sm:self-auto transition-all hover:scale-[1.02]"
        >
          {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          <span>{saved ? 'Saved!' : 'Save Settings'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 rounded-2xl bg-slate-100 dark:bg-white/5 p-1 w-full sm:w-auto overflow-x-auto">
        {[
          { id: 'integrations', label: 'API Integrations', icon: Key },
          { id: 'defaults', label: 'Default Economics', icon: Zap },
          { id: 'team', label: 'Team & Staff Roles', icon: Users },
          { id: 'notifications', label: 'AI Alerts & Rules', icon: Bell },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                'flex items-center gap-1.5 whitespace-nowrap rounded-xl px-3.5 py-2 text-xs font-bold transition-all',
                activeTab === tab.id
                  ? 'bg-white dark:bg-[#151b26] text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: API Integrations */}
      {activeTab === 'integrations' && (
        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#121620] p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50">TikTok Shop Open API Credentials</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Partner App Key</label>
                <input
                  type="text"
                  value={ttShopAppKey}
                  onChange={(e) => setTtShopAppKey(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1117] p-2.5 font-mono text-xs text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Webhook Endpoint URL</label>
                <input
                  type="text"
                  readOnly
                  value="https://api.rushnshop.com/v1/webhooks/tiktok/orders"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0f1117]/60 p-2.5 font-mono text-xs text-slate-500 dark:text-slate-400"
                />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#121620] p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50">TikTok Ads Marketing API</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">TikTok Ads Long-Lived Access Token</label>
                <input
                  type="password"
                  value={ttAdsToken}
                  onChange={(e) => setTtAdsToken(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1117] p-2.5 font-mono text-xs text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#121620] p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50">Shipping & Fulfillment Carriers</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Active 3PL Warehouse Provider</label>
                <input
                  type="text"
                  value={fulfillment3pl}
                  onChange={(e) => setFulfillment3pl(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1117] p-2.5 font-semibold text-xs text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Default Economics */}
      {activeTab === 'defaults' && (
        <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#121620] p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50">Default Profit Margin Assumptions</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            These values are pre-filled when opening the TikTok Profit Margin Calculator.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Default TikTok Fee (%)</label>
              <input
                type="number"
                step="0.1"
                value={defaultTiktokFee}
                onChange={(e) => setDefaultTiktokFee(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1117] p-2.5 text-xs font-semibold dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Default Payment Fee (%)</label>
              <input
                type="number"
                step="0.1"
                value={defaultPaymentFee}
                onChange={(e) => setDefaultPaymentFee(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1117] p-2.5 text-xs font-semibold dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Default Target Margin (%)</label>
              <input
                type="number"
                step="1"
                value={defaultTargetMargin}
                onChange={(e) => setDefaultTargetMargin(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1117] p-2.5 text-xs font-bold text-amber-600 dark:text-[#fb923c]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Team */}
      {activeTab === 'team' && (
        <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#121620] p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50">Staff Team Members</h3>
          <div className="space-y-3 divide-y divide-slate-100 dark:divide-slate-800">
            <div className="flex items-center justify-between pt-2 first:pt-0 text-xs">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">John Doe (You)</p>
                <p className="text-slate-400 dark:text-slate-500">john@rushnshop.com</p>
              </div>
              <span className="rounded-md bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 font-bold text-emerald-800 dark:text-[#4ade80]">Owner</span>
            </div>
            <div className="flex items-center justify-between pt-3 text-xs">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Sarah Jenkins</p>
                <p className="text-slate-400 dark:text-slate-500">sarah.support@rushnshop.com</p>
              </div>
              <span className="rounded-md bg-blue-100 dark:bg-blue-950/60 px-2 py-0.5 font-bold text-blue-800 dark:text-blue-300">Support Staff</span>
            </div>
            <div className="flex items-center justify-between pt-3 text-xs">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Marcus Vance</p>
                <p className="text-slate-400 dark:text-slate-500">marcus.media@rushnshop.com</p>
              </div>
              <span className="rounded-md bg-purple-100 dark:bg-purple-950/60 px-2 py-0.5 font-bold text-purple-800 dark:text-purple-300">Ads Manager</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Notifications */}
      {activeTab === 'notifications' && (
        <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#121620] p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50">AI Alerts & Autonomous Rules</h3>
          <div className="space-y-3 text-xs">
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded accent-lime-500" />
              <span className="font-semibold text-slate-800 dark:text-slate-200">Auto-alert when ad campaign CPA exceeds break-even price</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded accent-lime-500" />
              <span className="font-semibold text-slate-800 dark:text-slate-200">Notify when product margin drops below 35%</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded accent-lime-500" />
              <span className="font-semibold text-slate-800 dark:text-slate-200">Send daily P&L executive summary to owner email</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
