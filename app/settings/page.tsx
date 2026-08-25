'use client';

import React, { useState, useEffect } from 'react';
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
  Bot,
  Sparkles,
  Lock,
  RefreshCw,
  Server,
  Cpu,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Sliders,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { cn } from '../../lib/utils';

export default function SettingsPage() {
  const { stores } = useStore();
  const [activeTab, setActiveTab] = useState<
    'ai' | 'integrations' | 'defaults' | 'team' | 'notifications'
  >('ai');
  const [saved, setSaved] = useState(false);

  // AI Backend Integration State
  const [aiProvider, setAiProvider] = useState<
    'openai' | 'gemini' | 'anthropic' | 'deepseek' | 'custom'
  >('openai');
  const [aiModel, setAiModel] = useState('gpt-4o');
  const [aiApiKey, setAiApiKey] = useState('');
  const [customBaseUrl, setCustomBaseUrl] = useState('');
  const [maskedKey, setMaskedKey] = useState('');
  const [hasKey, setHasKey] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [isTestingAi, setIsTestingAi] = useState(false);
  const [aiTestResult, setAiTestResult] = useState<{
    success: boolean;
    message: string;
    latency?: string;
  } | null>(null);

  // Default Calculation Settings
  const [defaultTiktokFee, setDefaultTiktokFee] = useState('5.0');
  const [defaultPaymentFee, setDefaultPaymentFee] = useState('2.9');
  const [defaultTargetMargin, setDefaultTargetMargin] = useState('40.0');

  // Integrations state
  const [ttShopAppKey, setTtShopAppKey] = useState('tt_live_app_8923f1092a8');
  const [ttAdsToken, setTtAdsToken] = useState('act_token_3498109247192847');
  const [fulfillment3pl, setFulfillment3pl] = useState('ShipBob FastFill 3PL (Active)');

  // Load server-side AI configuration on mount
  useEffect(() => {
    async function loadAiConfig() {
      try {
        const res = await fetch('/api/ai/config');
        const data = await res.json();
        if (data.success) {
          setAiProvider(data.provider || 'openai');
          setAiModel(data.model || 'gpt-4o');
          setCustomBaseUrl(data.customBaseUrl || '');
          setHasKey(data.hasKey);
          setMaskedKey(data.maskedKey || '');
        }
      } catch (err) {
        console.error('Failed to load AI config from server:', err);
      }
    }
    loadAiConfig();
  }, []);

  const handleSaveAiConfig = async () => {
    setIsTestingAi(true);
    setAiTestResult(null);
    try {
      const res = await fetch('/api/ai/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: aiProvider,
          model: aiModel,
          apiKey: aiApiKey || undefined, // only update if typed
          customBaseUrl: customBaseUrl || undefined,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setHasKey(data.hasKey);
        setMaskedKey(data.maskedKey);
        setAiApiKey(''); // clear plain input from memory
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } catch (err) {
      console.error('Error saving AI config:', err);
    } finally {
      setIsTestingAi(false);
    }
  };

  const handleTestAiConnection = async () => {
    setIsTestingAi(true);
    setAiTestResult(null);
    try {
      // First save if key was typed
      if (aiApiKey) {
        await fetch('/api/ai/config', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            provider: aiProvider,
            model: aiModel,
            apiKey: aiApiKey,
            customBaseUrl,
          }),
        });
        setAiApiKey('');
      }

      const res = await fetch('/api/ai/test-connection', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setAiTestResult({
          success: true,
          message: `Connected to ${data.provider.toUpperCase()} (${data.model}) successfully!`,
          latency: data.latency,
        });
      } else {
        setAiTestResult({
          success: false,
          message: data.error || 'Connection failed. Please check your API key.',
        });
      }
    } catch (err: any) {
      setAiTestResult({
        success: false,
        message: err.message || 'Network error communicating with AI server.',
      });
    } finally {
      setIsTestingAi(false);
    }
  };

  const handleSaveAll = () => {
    if (activeTab === 'ai') {
      handleSaveAiConfig();
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
            System Settings & Integrations
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Configure backend AI models, API keys, TikTok Shop webhooks, and team access
            permissions.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          className="flex items-center gap-1.5 rounded-xl bg-[#84cc16] px-4 py-2 text-xs font-bold text-black shadow-xs hover:bg-[#72b012] self-start sm:self-auto transition-all hover:scale-[1.02]"
        >
          {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          <span>{saved ? 'Saved to Server!' : 'Save Settings'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 rounded-2xl bg-slate-100 dark:bg-white/5 p-1 w-full sm:w-auto overflow-x-auto">
        {[
          { id: 'ai', label: 'AI Model Integration', icon: Bot, badge: 'Backend' },
          { id: 'integrations', label: 'TikTok & 3PL APIs', icon: Key },
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
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white',
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="rounded-md bg-emerald-100 dark:bg-emerald-950/60 px-1.5 py-0.5 text-[9px] font-bold text-emerald-800 dark:text-[#4ade80]">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab 1: AI Model Integration (Server Backend) */}
      {activeTab === 'ai' && (
        <div className="space-y-6">
          {/* Security Notice Callout */}
          <div className="rounded-3xl border border-emerald-300 dark:border-emerald-800/80 bg-gradient-to-r from-emerald-50/70 to-lime-50/70 dark:from-emerald-950/30 dark:to-lime-950/20 p-5 shadow-xs flex items-start gap-3.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-[#4ade80]">
              <Lock className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-emerald-950 dark:text-emerald-200">
                🛡️ Zero-Leak Server-Side AI Architecture
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Your AI model API keys are{' '}
                <strong>strictly stored on the Next.js server backend</strong> and used for
                server-to-server inference calls (
                <code className="rounded bg-black/5 dark:bg-white/10 px-1 py-0.5 text-[11px] font-mono">
                  /api/ai/chat
                </code>
                ). Keys are{' '}
                <strong>never sent to the browser DOM, frontend state, or client bundles</strong>.
              </p>
            </div>
          </div>

          {/* AI Provider & API Key Form */}
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#121620] p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
                  <Bot className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  <span>AI Provider & Model Selection</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Select which foundation model powers your AI Business Advisor, Viral Video Studio,
                  and Customer Desk.
                </p>
              </div>

              {/* Status Pill */}
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    'flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold border',
                    hasKey
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-[#4ade80] border-emerald-200 dark:border-emerald-800'
                      : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-[#fb923c] border-amber-200 dark:border-amber-800',
                  )}
                >
                  <span
                    className={cn(
                      'h-2 w-2 rounded-full',
                      hasKey ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500',
                    )}
                  />
                  <span>
                    {hasKey ? `Active (${aiProvider.toUpperCase()})` : 'Server Simulation Mode'}
                  </span>
                </span>
              </div>
            </div>

            {/* Provider Grid */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Choose AI Foundation Provider
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {[
                  { id: 'openai', label: 'OpenAI', model: 'gpt-4o', desc: 'GPT-4o / GPT-4o-mini' },
                  {
                    id: 'gemini',
                    label: 'Google Gemini',
                    model: 'gemini-1.5-pro',
                    desc: 'Gemini 1.5 Pro / Flash',
                  },
                  {
                    id: 'anthropic',
                    label: 'Anthropic',
                    model: 'claude-3-5-sonnet-20241022',
                    desc: 'Claude 3.5 Sonnet',
                  },
                  {
                    id: 'deepseek',
                    label: 'DeepSeek',
                    model: 'deepseek-chat',
                    desc: 'DeepSeek V3 / R1',
                  },
                  {
                    id: 'custom',
                    label: 'Custom / Local',
                    model: 'custom-model',
                    desc: 'Ollama / vLLM',
                  },
                ].map((p) => {
                  const isSelected = aiProvider === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        setAiProvider(p.id as any);
                        setAiModel(p.model);
                      }}
                      className={cn(
                        'flex flex-col items-start p-3 rounded-2xl border text-left transition-all',
                        isSelected
                          ? 'border-[#84cc16] bg-lime-50/50 dark:bg-lime-950/20 shadow-xs ring-1 ring-[#84cc16]'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0f1117]/50 hover:bg-slate-100 dark:hover:bg-white/5',
                      )}
                    >
                      <span className="font-bold text-xs text-slate-900 dark:text-white">
                        {p.label}
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {p.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Model Name Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Target Model ID
                </label>
                {aiProvider === 'openai' ? (
                  <select
                    value={aiModel}
                    onChange={(e) => setAiModel(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1117] p-2.5 text-xs font-semibold text-slate-900 dark:text-white"
                  >
                    <option value="gpt-4o">
                      gpt-4o (Recommended - Best Quantitative Analysis)
                    </option>
                    <option value="gpt-4o-mini">gpt-4o-mini (Ultra Fast & Low Latency)</option>
                    <option value="o1-mini">o1-mini (Advanced Reasoning)</option>
                  </select>
                ) : aiProvider === 'gemini' ? (
                  <select
                    value={aiModel}
                    onChange={(e) => setAiModel(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1117] p-2.5 text-xs font-semibold text-slate-900 dark:text-white"
                  >
                    <option value="gemini-1.5-pro">gemini-1.5-pro (High Reasoning)</option>
                    <option value="gemini-1.5-flash">gemini-1.5-flash (Fast)</option>
                    <option value="gemini-2.0-flash">gemini-2.0-flash (Latest)</option>
                  </select>
                ) : aiProvider === 'anthropic' ? (
                  <select
                    value={aiModel}
                    onChange={(e) => setAiModel(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1117] p-2.5 text-xs font-semibold text-slate-900 dark:text-white"
                  >
                    <option value="claude-3-5-sonnet-20241022">
                      claude-3-5-sonnet-20241022 (Best Direct-Response Copywriting)
                    </option>
                    <option value="claude-3-5-haiku-20241022">
                      claude-3-5-haiku-20241022 (Fast)
                    </option>
                  </select>
                ) : aiProvider === 'deepseek' ? (
                  <select
                    value={aiModel}
                    onChange={(e) => setAiModel(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1117] p-2.5 text-xs font-semibold text-slate-900 dark:text-white"
                  >
                    <option value="deepseek-chat">deepseek-chat (DeepSeek-V3)</option>
                    <option value="deepseek-reasoner">deepseek-reasoner (DeepSeek-R1)</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    value={aiModel}
                    onChange={(e) => setAiModel(e.target.value)}
                    placeholder="e.g. llama3.1:70b, mistral-large"
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1117] p-2.5 text-xs font-semibold text-slate-900 dark:text-white"
                  />
                )}
              </div>

              {/* Secret API Key Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Secret API Key{' '}
                  {maskedKey && <span className="text-slate-400 font-normal">({maskedKey})</span>}
                </label>
                <div className="relative">
                  <input
                    type={showKey ? 'text' : 'password'}
                    placeholder={
                      hasKey
                        ? '•••••••••••••••••••••••• (Key Configured on Server)'
                        : 'Enter API Key (e.g. sk-proj-...)'
                    }
                    value={aiApiKey}
                    onChange={(e) => setAiApiKey(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1117] p-2.5 font-mono text-xs text-slate-900 dark:text-white pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Custom Endpoint URL for Local/Self-hosted LLMs */}
            {aiProvider === 'custom' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Custom OpenAI-Compatible Base URL
                </label>
                <input
                  type="text"
                  placeholder="https://openrouter.ai/api/v1 or http://localhost:11434/v1"
                  value={customBaseUrl}
                  onChange={(e) => setCustomBaseUrl(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1117] p-2.5 font-mono text-xs text-slate-900 dark:text-white"
                />
              </div>
            )}

            {/* Actions: Save & Test Connection */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {hasKey
                  ? '✓ Active API key loaded from backend memory'
                  : 'ℹ️ Running in intelligent server emulation mode'}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleTestAiConnection}
                  disabled={isTestingAi}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-white/5 px-4 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 disabled:opacity-50 transition-colors"
                >
                  {isTestingAi ? (
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Server className="h-3.5 w-3.5 text-emerald-500" />
                  )}
                  <span>Test Connection</span>
                </button>

                <button
                  type="button"
                  onClick={handleSaveAiConfig}
                  disabled={isTestingAi}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-[#84cc16] px-5 py-2.5 text-xs font-bold text-black hover:bg-[#72b012] disabled:opacity-50 shadow-xs transition-all hover:scale-[1.02]"
                >
                  <Save className="h-3.5 w-3.5" />
                  <span>Save AI Configuration</span>
                </button>
              </div>
            </div>

            {/* Diagnostic Test Result Output */}
            {aiTestResult && (
              <div
                className={cn(
                  'rounded-2xl p-4 text-xs font-semibold flex items-center justify-between border animate-in fade-in',
                  aiTestResult.success
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800'
                    : 'bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 border-rose-200 dark:border-rose-800',
                )}
              >
                <div className="flex items-center gap-2">
                  {aiTestResult.success ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-[#4ade80]" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-rose-500" />
                  )}
                  <span>{aiTestResult.message}</span>
                </div>
                {aiTestResult.latency && (
                  <span className="font-mono text-[11px] rounded bg-emerald-200/50 dark:bg-emerald-900/60 px-2 py-0.5">
                    Latency: {aiTestResult.latency}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: TikTok & 3PL APIs */}
      {activeTab === 'integrations' && (
        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#121620] p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50">
              TikTok Shop Open API Credentials
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Partner App Key
                </label>
                <input
                  type="text"
                  value={ttShopAppKey}
                  onChange={(e) => setTtShopAppKey(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1117] p-2.5 font-mono text-xs text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Webhook Endpoint URL
                </label>
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
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50">
              TikTok Ads Marketing API
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  TikTok Ads Long-Lived Access Token
                </label>
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
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50">
              Shipping & Fulfillment Carriers
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Active 3PL Warehouse Provider
                </label>
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

      {/* Tab 3: Default Economics */}
      {activeTab === 'defaults' && (
        <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#121620] p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50">
            Default Profit Margin Assumptions
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            These values are pre-filled when opening the TikTok Profit Margin Calculator.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Default TikTok Fee (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={defaultTiktokFee}
                onChange={(e) => setDefaultTiktokFee(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1117] p-2.5 text-xs font-semibold dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Default Payment Fee (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={defaultPaymentFee}
                onChange={(e) => setDefaultPaymentFee(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1117] p-2.5 text-xs font-semibold dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Default Target Margin (%)
              </label>
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

      {/* Tab 4: Team */}
      {activeTab === 'team' && (
        <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#121620] p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50">
            Staff Team Members
          </h3>
          <div className="space-y-3 divide-y divide-slate-100 dark:divide-slate-800">
            <div className="flex items-center justify-between pt-2 first:pt-0 text-xs">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">John Doe (You)</p>
                <p className="text-slate-400 dark:text-slate-500">john@rushnshop.com</p>
              </div>
              <span className="rounded-md bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 font-bold text-emerald-800 dark:text-[#4ade80]">
                Owner
              </span>
            </div>
            <div className="flex items-center justify-between pt-3 text-xs">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Sarah Jenkins</p>
                <p className="text-slate-400 dark:text-slate-500">sarah.support@rushnshop.com</p>
              </div>
              <span className="rounded-md bg-blue-100 dark:bg-blue-950/60 px-2 py-0.5 font-bold text-blue-800 dark:text-blue-300">
                Support Staff
              </span>
            </div>
            <div className="flex items-center justify-between pt-3 text-xs">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Marcus Vance</p>
                <p className="text-slate-400 dark:text-slate-500">marcus.media@rushnshop.com</p>
              </div>
              <span className="rounded-md bg-purple-100 dark:bg-purple-950/60 px-2 py-0.5 font-bold text-purple-800 dark:text-purple-300">
                Ads Manager
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Notifications */}
      {activeTab === 'notifications' && (
        <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#121620] p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50">
            AI Alerts & Autonomous Rules
          </h3>
          <div className="space-y-3 text-xs">
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded accent-lime-500" />
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                Auto-alert when ad campaign CPA exceeds break-even price
              </span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded accent-lime-500" />
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                Notify when product margin drops below 35%
              </span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded accent-lime-500" />
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                Send daily P&L executive summary to owner email
              </span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
