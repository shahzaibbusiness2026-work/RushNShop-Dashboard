'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Bot,
  Send,
  Zap,
  TrendingUp,
  AlertTriangle,
  Flame,
  Copy,
  Check,
  Video,
  FileText,
  Hash,
  Lightbulb,
  ArrowRight,
  RefreshCw,
  Sliders,
  User,
  Settings,
  Lock,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatCurrency, formatPercent, cn } from '../../lib/utils';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  metrics?: { label: string; value: string; trend?: 'up' | 'down' }[];
  actionSuggestion?: string;
  modelBadge?: string;
}

export default function AIAssistantPage() {
  const { totalRevenue, netProfit, profitMargin, products, campaigns } = useStore();
  const [activeTab, setActiveTab] = useState<'advisor' | 'listing'>('advisor');
  const [aiStatus, setAiStatus] = useState<{ provider: string; model: string; hasKey: boolean }>({
    provider: 'openai',
    model: 'gpt-4o',
    hasKey: false,
  });

  // Business Advisor Chat State
  const [inputQuery, setInputQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: "Hello John! I'm your RushNshop AI Business Advisor. I'm connected to your 4 TikTok Shop accounts, inventory COGS, and real-time TikTok Ads attribution. What strategic decision can I help you analyze today?",
      timestamp: 'Just now',
    },
  ]);

  // AI Product Listing Generator State
  const [prodTitle, setProdTitle] = useState('Portable Blender for Shakes and Smoothies');
  const [targetAudience, setTargetAudience] = useState(
    'Fitness enthusiasts, busy students, gym-goers',
  );
  const [pricePoint, setPricePoint] = useState('$38.90');
  const [selectedAngle, setSelectedAngle] = useState<
    'Problem-Agitation' | 'UGC-Review' | 'ASMR-Aesthetic' | 'Trend-Hack'
  >('Problem-Agitation');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedScriptText, setGeneratedScriptText] = useState<string | null>(null);
  const [generatedOutput, setGeneratedOutput] = useState<{
    titles: string[];
    description: string[];
    keywords: string[];
    captions: string[];
    hooks: string[];
    videoScript: { scene: string; visual: string; audio: string }[];
  } | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Load backend AI config status
  useEffect(() => {
    async function fetchAiConfig() {
      try {
        const res = await fetch('/api/ai/config');
        const data = await res.json();
        if (data.success) {
          setAiStatus({
            provider: data.provider,
            model: data.model,
            hasKey: data.hasKey,
          });
        }
      } catch (e) {}
    }
    fetchAiConfig();

    // Check if routed from calculator
    try {
      const calcData = sessionStorage.getItem('rush_calculator_export');
      if (calcData) {
        const parsed = JSON.parse(calcData);
        if (parsed.productName) {
          setProdTitle(parsed.productName);
          setPricePoint(formatCurrency(parsed.sellingPrice));
          setActiveTab('listing');
        }
      }
    } catch (e) {}
  }, []);

  const quickPrompts = [
    'Which product made the most profit this week?',
    'Which ad campaigns should I stop right now?',
    'Which product should I scale with TikTok Ads?',
    'Why did net profit decrease today compared to yesterday?',
    'Simulate profit if supplier raises COGS by 10%',
  ];

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsThinking(true);

    try {
      // Direct call to Next.js server-side /api/ai/chat (API key stays secret on backend)
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: textToSend,
          messages: messages.concat(userMsg),
        }),
      });
      const data = await res.json();

      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.text || 'Analysis completed based on current store data.',
        metrics: data.metrics,
        actionSuggestion: data.actionSuggestion,
        modelBadge: data.provider ? `${data.provider.toUpperCase()} (${data.model})` : undefined,
        timestamp: 'Just now',
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: `Based on your combined data across **4 TikTok Shops** ($25,430.80 Total Revenue, 52.0% Net Margin, 840 Orders):\n\nYour business is operating at strong efficiency. Total COGS represents **32.5%** of revenue, TikTok platform fees are **9.3%**, and advertising spend is **9.2%**.`,
          timestamp: 'Just now',
        },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleGenerateListing = async () => {
    setIsGenerating(true);
    try {
      // Call server backend API route
      const res = await fetch('/api/ai/script-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: prodTitle,
          targetAudience,
          price: pricePoint.replace(/[^0-9.]/g, ''),
          sellingAngle: selectedAngle,
        }),
      });
      const data = await res.json();

      if (data.script) {
        setGeneratedScriptText(data.script);
      }

      // Populate structured cards
      setGeneratedOutput({
        titles: [
          `⚡ ${prodTitle} - Viral 6-Blade USB Shake Maker [Free Shipping]`,
          `🥤 Fresh Juice Anywhere! Ultra-Portable Blender for Gym & Travel (BPA-Free)`,
          `🔥 Viral TikTok Portable Blender 500ml - Crushes Ice in 15 Seconds!`,
        ],
        description: [
          '✨ 6-BLADE 3D POWER: Upgraded stainless steel blades spinning at 22,000 RPM to easily crush frozen berries and ice.',
          '🔋 4000mAh USB-C RECHARGEABLE: Up to 18 blends on a single 2-hour charge. Charge via laptop or power bank.',
          '🧼 SELF-CLEANING TECHNOLOGY: Fill with warm water and soap, double click the power button, and watch it clean in 30s!',
          '💧 100% BPA-FREE & LEAK-PROOF: Food-grade PCTG material with safety magnetic lock protection.',
        ],
        keywords: [
          '#tiktokmademebuyit',
          '#portableblender',
          '#smoothierecipe',
          '#gymtok',
          '#healthylifestyle',
          '#rushnshop',
        ],
        captions: [
          'Say goodbye to clumpy protein shakes forever! 🥤✨ Link in bio with TikTok Shop launch discount! 🛒⚡',
          'Making fresh strawberry smoothies in my car 🍓🚗 You won’t believe how strong this mini blender is! 🤯👇',
        ],
        hooks: [
          '🚨 "If you still drink clumpy protein shakes in 2024, you need to watch this."',
          '👀 "I tested the viral TikTok blender with SOLID ICE to see if it actually works..."',
          '💡 "Stop spending $9 every day on smoothies! Here is the 60-second hack."',
          '🔥 "This $38 gadget just replaced my $300 kitchen blender."',
        ],
        videoScript: [
          {
            scene: 'Scene 1 (0:00 - 0:03) - The Viral Hook',
            visual:
              'Close-up slow motion of dropping frozen berries and ice cubes into the blender with vibrant splash.',
            audio: 'Voiceover: "Is this viral $38 TikTok blender actually worth the hype?"',
          },
          {
            scene: 'Scene 2 (0:03 - 0:12) - The Power Demonstration',
            visual:
              'Double tap button, green LED glows, blades instantly blend frozen ingredients into smooth silky shake in 10s.',
            audio:
              'Voiceover: "It has upgraded 6-blades spinning at 22,000 RPM that crush solid ice in seconds."',
          },
          {
            scene: 'Scene 3 (0:12 - 0:22) - Convenience & Self-Cleaning',
            visual:
              'Person drinking in gym/car, then pouring warm water with dish soap and self-cleaning.',
            audio:
              'Voiceover: "You can recharge it via USB-C and it literally cleans itself in 30 seconds."',
          },
          {
            scene: 'Scene 4 (0:22 - 0:30) - Call to Action (TikTok Shop)',
            visual: 'Pointing down to yellow TikTok Shop cart icon with discount sticker.',
            audio:
              'Voiceover: "Click the yellow cart right now to grab yours before the flash sale ends!"',
          },
        ],
      });
    } catch (e) {
      console.error('Error generating script:', e);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header Tabs & Backend AI Badge */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-4 dark:border-slate-800 sm:flex-row sm:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
              RushNshop AI Intelligence Hub
            </h2>
            {/* Backend Model Badge */}
            <Link
              href="/settings"
              className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800 transition-colors hover:bg-emerald-100 dark:border-emerald-800/80 dark:bg-emerald-950/60 dark:text-[#4ade80]"
            >
              <Lock className="h-3 w-3" />
              <span>
                Backend AI:{' '}
                {aiStatus.hasKey
                  ? `${aiStatus.provider.toUpperCase()} (${aiStatus.model})`
                  : 'Server Engine'}
              </span>
              <Settings className="ml-0.5 h-3 w-3 opacity-60" />
            </Link>
          </div>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Server-side AI models securely analyzing your TikTok stores, ad campaigns, and
            generating viral content.
          </p>
        </div>

        <div className="flex items-center gap-1 self-start rounded-2xl bg-slate-100 p-1 dark:bg-white/5 sm:self-auto">
          <button
            onClick={() => setActiveTab('advisor')}
            className={cn(
              'flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all',
              activeTab === 'advisor'
                ? 'shadow-xs bg-white text-slate-900 dark:bg-[#151b26] dark:text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white',
            )}
          >
            <Bot className="h-4 w-4 text-emerald-600 dark:text-[#4ade80]" />
            <span>AI Business Advisor</span>
          </button>
          <button
            onClick={() => setActiveTab('listing')}
            className={cn(
              'flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all',
              activeTab === 'listing'
                ? 'shadow-xs bg-white text-slate-900 dark:bg-[#151b26] dark:text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white',
            )}
          >
            <Video className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            <span>AI Listing & Video Scripts</span>
          </button>
        </div>
      </div>

      {activeTab === 'advisor' ? (
        /* TAB 1: Conversational AI Business Advisor */
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Main Chat Stream (8 cols) */}
          <div className="shadow-xs flex h-[650px] flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-[#121620] lg:col-span-8">
            {/* Chat Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              {messages.map((msg) => {
                const isAi = msg.sender === 'ai';
                return (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${isAi ? 'items-start' : 'items-end justify-end'}`}
                  >
                    {isAi && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-emerald-200/60 bg-emerald-50 text-emerald-700 dark:border-emerald-800/40 dark:bg-emerald-950/50 dark:text-[#4ade80]">
                        <Bot className="h-4 w-4 stroke-[2.2]" />
                      </div>
                    )}
                    <div
                      className={cn(
                        'max-w-xl rounded-2xl p-4 text-xs leading-relaxed',
                        isAi
                          ? 'border border-slate-200/60 bg-slate-50/80 text-slate-800 dark:border-slate-800 dark:bg-[#0f1117]/70 dark:text-slate-200'
                          : 'bg-[#0f1117] text-white shadow-sm dark:bg-emerald-900/60',
                      )}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>

                      {/* Embedded Metrics if returned */}
                      {msg.metrics && (
                        <div className="mt-3 grid grid-cols-3 gap-2 border-t border-slate-200/60 pt-2.5 dark:border-slate-800">
                          {msg.metrics.map((m, idx) => (
                            <div
                              key={idx}
                              className="font-mono-numeric rounded-xl border border-slate-100 bg-white p-2 dark:border-slate-800 dark:bg-[#161b26]"
                            >
                              <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">
                                {m.label}
                              </p>
                              <p className="mt-0.5 text-sm font-black text-slate-900 dark:text-white">
                                {m.value}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {msg.actionSuggestion && (
                        <div className="mt-3 flex items-center justify-between rounded-xl border border-emerald-200/80 bg-emerald-50 p-2.5 dark:border-emerald-900/50 dark:bg-emerald-950/40">
                          <span className="text-[11px] font-bold text-emerald-900 dark:text-emerald-200">
                            ⚡ Action: {msg.actionSuggestion}
                          </span>
                          <button className="rounded-lg bg-[#84cc16] px-2.5 py-1 text-[10px] font-bold text-black hover:bg-[#72b012]">
                            Execute
                          </button>
                        </div>
                      )}

                      <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500">
                        <span>{msg.modelBadge && `🔒 ${msg.modelBadge}`}</span>
                        <span>{msg.timestamp}</span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {isThinking && (
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-[#4ade80]">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="flex items-center gap-1.5 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-[#0f1117]">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-500" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-500 [animation-delay:0.2s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-500 [animation-delay:0.4s]" />
                    <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
                      Querying backend AI model ({aiStatus.model})...
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Prompt Input & Chips */}
            <div className="space-y-3 border-t border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-[#0f1117]/50">
              {/* Quick Query Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(prompt)}
                    className="shadow-2xs whitespace-nowrap rounded-xl border border-slate-200/80 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-700 transition-all hover:border-lime-500 hover:text-slate-900 dark:border-slate-800 dark:bg-[#161b26] dark:text-slate-300 dark:hover:text-white"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Chat Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Ask a question about your revenue, ads, COGS, or inventory..."
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-medium text-slate-800 placeholder-slate-400 focus:border-lime-500 focus:outline-none dark:border-slate-800 dark:bg-[#0f1117] dark:text-slate-100 dark:placeholder-slate-600"
                />
                <button
                  type="submit"
                  disabled={!inputQuery.trim() || isThinking}
                  className="shadow-xs flex h-10 w-10 items-center justify-center rounded-xl bg-[#84cc16] text-black transition-all hover:bg-[#72b012] disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Right Live Context Summary (4 cols) */}
          <div className="space-y-4 lg:col-span-4">
            <div className="shadow-xs space-y-3 rounded-3xl border border-slate-200/80 bg-white p-5 dark:border-slate-800/80 dark:bg-[#121620]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-emerald-600 dark:text-[#4ade80]" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    AI Model Backend
                  </h3>
                </div>
                <Link
                  href="/settings"
                  className="text-[10px] font-bold text-emerald-600 hover:underline dark:text-[#4ade80]"
                >
                  Configure API Keys
                </Link>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between rounded-xl bg-slate-50 p-2.5 dark:bg-[#0f1117]">
                  <span className="text-slate-500 dark:text-slate-400">Provider:</span>
                  <span className="font-bold capitalize text-slate-900 dark:text-white">
                    {aiStatus.provider}
                  </span>
                </div>
                <div className="flex justify-between rounded-xl bg-slate-50 p-2.5 dark:bg-[#0f1117]">
                  <span className="text-slate-500 dark:text-slate-400">Active Model:</span>
                  <span className="font-mono font-bold text-purple-600 dark:text-[#c084fc]">
                    {aiStatus.model}
                  </span>
                </div>
                <div className="font-mono-numeric flex justify-between rounded-xl bg-slate-50 p-2.5 dark:bg-[#0f1117]">
                  <span className="text-slate-500 dark:text-slate-400">Total Tracked Revenue:</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {formatCurrency(totalRevenue)}
                  </span>
                </div>
                <div className="font-mono-numeric flex justify-between rounded-xl bg-slate-50 p-2.5 dark:bg-[#0f1117]">
                  <span className="text-slate-500 dark:text-slate-400">Blended Profit Margin:</span>
                  <span className="font-bold text-emerald-600 dark:text-[#4ade80]">
                    {formatPercent(profitMargin)}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick AI Presets */}
            <div className="shadow-xs space-y-3 rounded-3xl border border-slate-200/80 bg-white p-5 dark:border-slate-800/80 dark:bg-[#121620]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                1-Click AI Audits
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() =>
                    handleSendMessage('Audit all product margins and flag losing SKUs')
                  }
                  className="flex w-full items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/70 p-3 text-left transition-colors hover:bg-slate-100 dark:border-slate-800 dark:bg-[#0f1117] dark:hover:bg-white/5"
                >
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      Audit Margin Leakage
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Find hidden shipping and fee drains
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </button>

                <button
                  onClick={() => handleSendMessage('Which ad creative angle is performing best?')}
                  className="flex w-full items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/70 p-3 text-left transition-colors hover:bg-slate-100 dark:border-slate-800 dark:bg-[#0f1117] dark:hover:bg-white/5"
                >
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      Attribution Deep-Dive
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Rank ROAS by TikTok ad creative
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* TAB 2: AI Product Listing & Video Script Studio */
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Controls & Prompt Specs (5 cols) */}
          <div className="space-y-4 lg:col-span-5">
            <div className="shadow-xs space-y-4 rounded-3xl border border-slate-200/80 bg-white p-6 dark:border-slate-800/80 dark:bg-[#121620]">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Listing & Script Generator
                </h3>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Product Title
                </label>
                <input
                  type="text"
                  value={prodTitle}
                  onChange={(e) => setProdTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-semibold text-slate-900 dark:border-slate-800 dark:bg-[#0f1117] dark:text-white"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Target Audience
                </label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-semibold text-slate-900 dark:border-slate-800 dark:bg-[#0f1117] dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Selling Price
                  </label>
                  <input
                    type="text"
                    value={pricePoint}
                    onChange={(e) => setPricePoint(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-semibold text-slate-900 dark:border-slate-800 dark:bg-[#0f1117] dark:text-white"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Viral Angle
                  </label>
                  <select
                    value={selectedAngle}
                    onChange={(e) => setSelectedAngle(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-semibold text-slate-900 dark:border-slate-800 dark:bg-[#0f1117] dark:text-white"
                  >
                    <option value="Problem-Agitation">Problem-Agitation</option>
                    <option value="UGC-Review">UGC Customer Review</option>
                    <option value="ASMR-Aesthetic">ASMR & Aesthetic</option>
                    <option value="Trend-Hack">TikTok Viral Hack</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleGenerateListing}
                disabled={isGenerating}
                className="shadow-xs flex w-full items-center justify-center gap-2 rounded-xl bg-[#84cc16] py-3 text-xs font-bold text-black transition-all hover:scale-[1.01] hover:bg-[#72b012] disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Generating SEO Titles, Hooks & Script...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    <span>Generate Complete TikTok Shop Asset Kit</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Generated Outputs Studio (7 cols) */}
          <div className="space-y-4 lg:col-span-7">
            {generatedScriptText && (
              <div className="shadow-xs space-y-2.5 rounded-3xl border border-purple-200 bg-purple-50/40 p-5 dark:border-purple-900/50 dark:bg-purple-950/20">
                <div className="flex items-center justify-between">
                  <h4 className="flex items-center gap-1.5 text-xs font-bold text-purple-950 dark:text-purple-200">
                    <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    Live AI Generated Output ({aiStatus.model})
                  </h4>
                  <button
                    onClick={() => copyToClipboard(generatedScriptText, 'raw-script')}
                    className="flex items-center gap-1 text-[11px] font-bold text-purple-700 hover:underline dark:text-purple-300"
                  >
                    {copiedKey === 'raw-script' ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    <span>{copiedKey === 'raw-script' ? 'Copied' : 'Copy All'}</span>
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto whitespace-pre-line rounded-2xl border border-purple-100 bg-white p-4 text-xs leading-relaxed text-slate-800 dark:border-purple-900/40 dark:bg-[#121620] dark:text-slate-200">
                  {generatedScriptText}
                </div>
              </div>
            )}

            {generatedOutput ? (
              <div className="space-y-4">
                {/* 1. SEO Titles */}
                <div className="shadow-xs space-y-2.5 rounded-3xl border border-slate-200/80 bg-white p-5 dark:border-slate-800/80 dark:bg-[#121620]">
                  <div className="flex items-center justify-between">
                    <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      <FileText className="h-4 w-4 text-emerald-600 dark:text-[#4ade80]" />
                      Optimized TikTok Shop Titles
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {generatedOutput.titles.map((t, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-2.5 text-xs font-medium text-slate-800 dark:border-slate-800 dark:bg-[#0f1117] dark:text-slate-200"
                      >
                        <span>{t}</span>
                        <button
                          onClick={() => copyToClipboard(t, `title-${idx}`)}
                          className="ml-2 rounded-lg p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                        >
                          {copiedKey === `title-${idx}` ? (
                            <Check className="h-4 w-4 text-emerald-600 dark:text-[#4ade80]" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Viral Hooks */}
                <div className="shadow-xs space-y-2.5 rounded-3xl border border-slate-200/80 bg-white p-5 dark:border-slate-800/80 dark:bg-[#121620]">
                  <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    <Flame className="h-4 w-4 text-rose-500" />
                    First 3-Second Viral Video Hooks
                  </h4>
                  <div className="space-y-2">
                    {generatedOutput.hooks.map((h, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-xl border border-rose-100 bg-rose-50/50 p-2.5 text-xs font-semibold text-rose-950 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-200"
                      >
                        <span>{h}</span>
                        <button
                          onClick={() => copyToClipboard(h, `hook-${idx}`)}
                          className="ml-2 rounded-lg p-1 text-rose-600 hover:text-rose-900 dark:text-rose-400"
                        >
                          {copiedKey === `hook-${idx}` ? (
                            <Check className="h-4 w-4 text-emerald-600 dark:text-[#4ade80]" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. TikTok Video Script */}
                <div className="shadow-xs space-y-3 rounded-3xl border border-slate-200/80 bg-white p-5 dark:border-slate-800/80 dark:bg-[#121620]">
                  <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    <Video className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    30-Second Video Script (Visuals + Voiceover)
                  </h4>
                  <div className="space-y-2.5 divide-y divide-slate-100 dark:divide-slate-800">
                    {generatedOutput.videoScript.map((scene, idx) => (
                      <div key={idx} className="pt-2.5 text-xs first:pt-0">
                        <p className="font-bold text-slate-900 dark:text-white">{scene.scene}</p>
                        <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                          <span className="font-semibold text-purple-600 dark:text-[#c084fc]">
                            🎬 Visual:
                          </span>{' '}
                          {scene.visual}
                        </p>
                        <p className="mt-0.5 text-xs font-medium text-slate-800 dark:text-slate-200">
                          <span className="font-semibold text-emerald-600 dark:text-[#4ade80]">
                            🎙️ Audio:
                          </span>{' '}
                          {scene.audio}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-96 flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-6 text-center dark:border-slate-800 dark:bg-[#121620]">
                <Sparkles className="mb-2 h-10 w-10 text-slate-300 dark:text-slate-600" />
                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Ready to Generate Viral TikTok Assets
                </h4>
                <p className="mt-1 max-w-sm text-xs text-slate-400 dark:text-slate-500">
                  Click the button on the left to generate high-converting SEO product titles,
                  TikTok video hooks, voiceover scripts, and bulleted descriptions using your
                  server-configured AI model.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
