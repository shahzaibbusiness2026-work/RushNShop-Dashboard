'use client';

import React, { useState, useEffect } from 'react';
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
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatCurrency, formatPercent } from '../../lib/utils';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  metrics?: { label: string; value: string; trend?: 'up' | 'down' }[];
  actionSuggestion?: string;
}

export default function AIAssistantPage() {
  const { totalRevenue, netProfit, profitMargin, products, campaigns } = useStore();
  const [activeTab, setActiveTab] = useState<'advisor' | 'listing'>('advisor');

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
  const [targetAudience, setTargetAudience] = useState('Fitness enthusiasts, busy students, gym-goers');
  const [pricePoint, setPricePoint] = useState('$38.90');
  const [selectedAngle, setSelectedAngle] = useState<'Problem-Agitation' | 'UGC-Review' | 'ASMR-Aesthetic' | 'Trend-Hack'>('Problem-Agitation');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] = useState<{
    titles: string[];
    description: string[];
    keywords: string[];
    captions: string[];
    hooks: string[];
    videoScript: { scene: string; visual: string; audio: string }[];
  } | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Check if routed from calculator
  useEffect(() => {
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
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: textToSend }),
      });
      const data = await res.json();

      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.text || 'Analysis completed based on current store data.',
        metrics: data.metrics,
        actionSuggestion: data.actionSuggestion,
        timestamp: 'Just now',
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (err) {
      // Fallback
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

  const handleGenerateListing = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedOutput({
        titles: [
          `⚡ ${prodTitle} - 6-Blade USB Rechargeable Shake Maker [Free Shipping]`,
          `🥤 Fresh Juice Anywhere! Ultra-Portable Blender for Gym & Travel (BPA-Free)`,
          `🔥 Viral TikTok Portable Blender 500ml - Crushes Ice in 15 Seconds!`,
        ],
        description: [
          '✨ 6-BLADE 3D POWER: Equipped with upgraded stainless steel blades spinning at 22,000 RPM to easily crush frozen berries and ice.',
          '🔋 4000mAh USB-C RECHARGEABLE: Up to 18 blends on a single 2-hour charge. Charge via laptop, power bank, or car charger.',
          '🧼 SELF-CLEANING TECHNOLOGY: Fill with warm water and soap, double click the power button, and watch it clean in 30 seconds!',
          '💧 100% BPA-FREE & LEAK-PROOF: Food-grade PCTG material with safety magnetic lock protection.',
        ],
        keywords: [
          '#tiktokmademebuyit',
          '#portableblender',
          '#smoothierecipe',
          '#gymtok',
          '#healthylifestyle',
          '#rushnshop',
          '#summerdrinks',
        ],
        captions: [
          'Say goodbye to clumpy protein shakes forever! 🥤✨ Link in bio with TikTok Shop launch discount! 🛒⚡ #tiktokmademebuyit',
          'Making fresh strawberry smoothies in my car 🍓🚗 You won’t believe how strong this mini blender is! 🤯👇',
        ],
        hooks: [
          '🚨 "If you still drink clumpy protein shakes in 2024, you need to watch this."',
          '👀 "I tested the viral TikTok blender with SOLID ICE to see if it actually works..."',
          '💡 "Stop spending $9 every day on smoothies! Here is the 60-second hack."',
          '🔥 "This $38 gadget just replaced my $300 kitchen blender."',
          '✨ "The most satisfying unboxing you will see today (ASMR)."',
        ],
        videoScript: [
          {
            scene: 'Scene 1 (0:00 - 0:03) - The Viral Hook',
            visual: 'Close-up slow motion of dropping frozen berries and ice cubes into the blender with vibrant splash.',
            audio: 'Voiceover: "Is this viral $38 TikTok blender actually worth the hype?"',
          },
          {
            scene: 'Scene 2 (0:03 - 0:12) - The Power Demonstration',
            visual: 'Double tap button, green LED glows, blades instantly blend frozen ingredients into smooth silky shake in 10s.',
            audio: 'Voiceover: "It has upgraded 6-blades spinning at 22,000 RPM that crush solid ice in seconds."',
          },
          {
            scene: 'Scene 3 (0:12 - 0:22) - Convenience & Self-Cleaning',
            visual: 'Person drinking in gym/car, then pouring warm water with dish soap and self-cleaning.',
            audio: 'Voiceover: "You can recharge it via USB-C and it literally cleans itself in 30 seconds."',
          },
          {
            scene: 'Scene 4 (0:22 - 0:30) - Call to Action (TikTok Shop)',
            visual: 'Pointing down to yellow TikTok Shop cart icon with discount sticker.',
            audio: 'Voiceover: "Click the yellow cart right now to grab yours before the flash sale ends!"',
          },
        ],
      });
      setIsGenerating(false);
    }, 1200);
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">RushNshop AI Intelligence Hub</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Real-time business data analytics and viral TikTok Shop content generation engine.
          </p>
        </div>

        <div className="flex items-center gap-1 rounded-2xl bg-gray-100 dark:bg-white/5 p-1 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('advisor')}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              activeTab === 'advisor'
                ? 'bg-white dark:bg-[#151b26] text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Bot className="h-4 w-4 text-emerald-600 dark:text-[#4ade80]" />
            <span>AI Business Advisor</span>
          </button>
          <button
            onClick={() => setActiveTab('listing')}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              activeTab === 'listing'
                ? 'bg-white dark:bg-[#151b26] text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
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
          <div className="lg:col-span-8 flex flex-col h-[650px] rounded-3xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#151b26] shadow-sm overflow-hidden">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.map((msg) => {
                const isAi = msg.sender === 'ai';
                return (
                  <div key={msg.id} className={`flex gap-3 ${isAi ? 'items-start' : 'items-end justify-end'}`}>
                    {isAi && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-lime-100 dark:bg-lime-950/50 text-lime-800 dark:text-[#4ade80]">
                        <Bot className="h-4 w-4" />
                      </div>
                    )}
                    <div
                      className={`max-w-xl rounded-2xl p-4 text-xs leading-relaxed ${
                        isAi
                          ? 'bg-gray-50 dark:bg-[#0f1117]/70 border border-gray-100 dark:border-gray-800 text-gray-800 dark:text-gray-200'
                          : 'bg-[#0f1117] dark:bg-emerald-900/60 text-white shadow-md'
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>

                      {/* Embedded Metrics if returned */}
                      {msg.metrics && (
                        <div className="mt-3 grid grid-cols-3 gap-2 border-t border-gray-200/60 dark:border-gray-800 pt-2.5">
                          {msg.metrics.map((m, idx) => (
                            <div key={idx} className="rounded-xl bg-white dark:bg-[#161b22] p-2 border border-gray-100 dark:border-gray-800">
                              <p className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold">{m.label}</p>
                              <p className="text-sm font-black text-gray-900 dark:text-white mt-0.5">{m.value}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {msg.actionSuggestion && (
                        <div className="mt-3 flex items-center justify-between rounded-xl bg-lime-50 dark:bg-lime-950/40 p-2.5 border border-lime-200/80 dark:border-lime-900/50">
                          <span className="text-[11px] font-bold text-lime-900 dark:text-lime-200">
                            ⚡ Action: {msg.actionSuggestion}
                          </span>
                          <button className="rounded-lg bg-[#84cc16] px-2.5 py-1 text-[10px] font-bold text-black hover:bg-[#72b012]">
                            Execute
                          </button>
                        </div>
                      )}

                      <span className="mt-1.5 block text-[10px] text-gray-400 dark:text-gray-500 text-right">{msg.timestamp}</span>
                    </div>
                  </div>
                );
              })}

              {isThinking && (
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-lime-100 dark:bg-lime-950/50 text-lime-800 dark:text-[#4ade80]">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="flex items-center gap-1.5 rounded-2xl bg-gray-50 dark:bg-[#0f1117] px-4 py-3 border border-gray-100 dark:border-gray-800">
                    <span className="h-2 w-2 rounded-full bg-lime-500 animate-bounce" />
                    <span className="h-2 w-2 rounded-full bg-lime-500 animate-bounce [animation-delay:0.2s]" />
                    <span className="h-2 w-2 rounded-full bg-lime-500 animate-bounce [animation-delay:0.4s]" />
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">Analyzing cross-store analytics API...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Prompt Input & Chips */}
            <div className="border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-[#0f1117]/50 p-4 space-y-3">
              {/* Quick Query Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(prompt)}
                    className="whitespace-nowrap rounded-xl bg-white dark:bg-[#161b22] border border-gray-200/80 dark:border-gray-800 px-3 py-1.5 text-[11px] font-semibold text-gray-700 dark:text-gray-300 hover:border-lime-500 hover:text-gray-900 dark:hover:text-white transition-all shadow-2xs"
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
                  className="flex-1 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f1117] px-4 py-2.5 text-xs font-medium text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 focus:border-lime-500 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!inputQuery.trim() || isThinking}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#84cc16] text-black hover:bg-[#72b012] disabled:opacity-50 transition-all shadow-sm"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Right Live Context Summary (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-3xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#151b26] p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-lime-600 dark:text-[#4ade80]" />
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Live AI System Context</h3>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between rounded-xl bg-gray-50 dark:bg-[#0f1117] p-2.5">
                  <span className="text-gray-500 dark:text-gray-400">Connected Accounts:</span>
                  <span className="font-bold text-gray-900 dark:text-white">4 Active Shops</span>
                </div>
                <div className="flex justify-between rounded-xl bg-gray-50 dark:bg-[#0f1117] p-2.5">
                  <span className="text-gray-500 dark:text-gray-400">Total Tracked Revenue:</span>
                  <span className="font-bold text-gray-900 dark:text-white">{formatCurrency(totalRevenue)}</span>
                </div>
                <div className="flex justify-between rounded-xl bg-gray-50 dark:bg-[#0f1117] p-2.5">
                  <span className="text-gray-500 dark:text-gray-400">Blended Profit Margin:</span>
                  <span className="font-bold text-[#22c55e] dark:text-[#4ade80]">{formatPercent(profitMargin)}</span>
                </div>
                <div className="flex justify-between rounded-xl bg-gray-50 dark:bg-[#0f1117] p-2.5">
                  <span className="text-gray-500 dark:text-gray-400">Active TikTok Ad Campaigns:</span>
                  <span className="font-bold text-purple-700 dark:text-purple-300">{campaigns.filter((c) => c.status === 'Active').length} Active</span>
                </div>
              </div>
            </div>

            {/* Quick AI Presets */}
            <div className="rounded-3xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#151b26] p-5 shadow-sm space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                1-Click AI Audits
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleSendMessage('Audit all product margins and flag losing SKUs')}
                  className="flex w-full items-center justify-between rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#0f1117] p-3 text-left hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                >
                  <div>
                    <p className="text-xs font-bold text-gray-900 dark:text-white">Audit Margin Leakage</p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">Find hidden shipping and fee drains</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </button>

                <button
                  onClick={() => handleSendMessage('Which ad creative angle is performing best?')}
                  className="flex w-full items-center justify-between rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#0f1117] p-3 text-left hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                >
                  <div>
                    <p className="text-xs font-bold text-gray-900 dark:text-white">Attribution Deep-Dive</p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">Rank ROAS by TikTok ad creative</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* TAB 2: AI Product Listing & Video Script Studio */
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Controls & Prompt Specs (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-3xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#151b26] p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Listing & Script Generator</h3>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Product Title</label>
                <input
                  type="text"
                  value={prodTitle}
                  onChange={(e) => setProdTitle(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f1117] p-2.5 text-xs font-semibold text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Target Audience</label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f1117] p-2.5 text-xs font-semibold text-gray-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Selling Price</label>
                  <input
                    type="text"
                    value={pricePoint}
                    onChange={(e) => setPricePoint(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f1117] p-2.5 text-xs font-semibold text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Viral Angle</label>
                  <select
                    value={selectedAngle}
                    onChange={(e) => setSelectedAngle(e.target.value as any)}
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f1117] p-2.5 text-xs font-semibold text-gray-900 dark:text-white"
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
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#84cc16] py-3 text-xs font-bold text-black shadow-md hover:bg-[#72b012] disabled:opacity-50 transition-all"
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
          <div className="lg:col-span-7 space-y-4">
            {generatedOutput ? (
              <div className="space-y-4">
                {/* 1. SEO Titles */}
                <div className="rounded-3xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#151b26] p-5 shadow-sm space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                      <FileText className="h-4 w-4 text-emerald-600 dark:text-[#4ade80]" />
                      Optimized TikTok Shop Titles
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {generatedOutput.titles.map((t, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-xl bg-gray-50 dark:bg-[#0f1117] p-2.5 text-xs font-medium text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-800"
                      >
                        <span>{t}</span>
                        <button
                          onClick={() => copyToClipboard(t, `title-${idx}`)}
                          className="ml-2 rounded-lg p-1 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                        >
                          {copiedKey === `title-${idx}` ? <Check className="h-4 w-4 text-emerald-600 dark:text-[#4ade80]" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Viral Hooks */}
                <div className="rounded-3xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#151b26] p-5 shadow-sm space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                    <Flame className="h-4 w-4 text-rose-500" />
                    First 3-Second Viral Video Hooks
                  </h4>
                  <div className="space-y-2">
                    {generatedOutput.hooks.map((h, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-xl bg-rose-50/50 dark:bg-rose-950/30 p-2.5 text-xs font-semibold text-rose-950 dark:text-rose-200 border border-rose-100 dark:border-rose-900/40"
                      >
                        <span>{h}</span>
                        <button
                          onClick={() => copyToClipboard(h, `hook-${idx}`)}
                          className="ml-2 rounded-lg p-1 text-rose-600 dark:text-rose-400 hover:text-rose-900"
                        >
                          {copiedKey === `hook-${idx}` ? <Check className="h-4 w-4 text-emerald-600 dark:text-[#4ade80]" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. TikTok Video Script */}
                <div className="rounded-3xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#151b26] p-5 shadow-sm space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                    <Video className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    30-Second Video Script (Visuals + Voiceover)
                  </h4>
                  <div className="space-y-2.5 divide-y divide-gray-100 dark:divide-gray-800">
                    {generatedOutput.videoScript.map((scene, idx) => (
                      <div key={idx} className="pt-2.5 first:pt-0 text-xs">
                        <p className="font-bold text-gray-900 dark:text-white">{scene.scene}</p>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5"><span className="font-semibold text-purple-700 dark:text-purple-300">🎬 Visual:</span> {scene.visual}</p>
                        <p className="text-xs font-medium text-gray-800 dark:text-gray-200 mt-0.5"><span className="font-semibold text-emerald-700 dark:text-[#4ade80]">🎙️ Audio:</span> {scene.audio}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Description Bullets & Hashtags */}
                <div className="rounded-3xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#151b26] p-5 shadow-sm space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                    <Hash className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    Bulleted Specs & Viral Hashtags
                  </h4>
                  <div className="rounded-2xl bg-gray-50 dark:bg-[#0f1117] p-3 text-xs space-y-1.5 text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-800">
                    {generatedOutput.description.map((d, idx) => (
                      <p key={idx}>{d}</p>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {generatedOutput.keywords.map((kw, idx) => (
                      <span key={idx} className="rounded-lg bg-blue-50 dark:bg-blue-950/50 px-2 py-1 text-xs font-bold text-blue-700 dark:text-blue-300">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-96 rounded-3xl border border-dashed border-gray-300 dark:border-gray-800 bg-white dark:bg-[#151b26] p-6 text-center">
                <Sparkles className="h-10 w-10 text-gray-300 dark:text-gray-600 mb-2" />
                <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300">Ready to Generate Viral TikTok Assets</h4>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 max-w-sm">
                  Click the button on the left to generate high-converting SEO product titles, TikTok video hooks, voiceover scripts, and bulleted descriptions.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
