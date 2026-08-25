'use client';

import React, { useState } from 'react';
import {
  X,
  Tag,
  Sparkles,
  Plus,
  Trash2,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ListingItem } from '../../types';

interface ListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: {
    name?: string;
    sku?: string;
    category?: string;
    sellingPrice?: number;
    cogs?: number;
    shippingCost?: number;
    packagingCost?: number;
    tiktokFeePercent?: number;
    affiliatePercent?: number;
    adCpa?: number;
    netProfit?: number;
    profitMarginPercent?: number;
  };
}

export default function ListingModal({ isOpen, onClose, initialProduct }: ListingModalProps) {
  const { addListing, selectedStore } = useStore();

  const [productName, setProductName] = useState(initialProduct?.name || 'Smart Portable Blender Pro 450ml');
  const [sku, setSku] = useState(initialProduct?.sku || 'RUSH-BLD-02');
  const [category, setCategory] = useState(initialProduct?.category || 'Kitchen & Dining');
  const [sellingPrice, setSellingPrice] = useState<number>(initialProduct?.sellingPrice || 38.99);
  const [stock, setStock] = useState<number>(150);
  const [status, setStatus] = useState<'draft' | 'ready' | 'synced'>('ready');

  const [bulletPoints, setBulletPoints] = useState<string[]>([
    '6-Blade 3D Turbine Crushing System: Effortlessly blends frozen fruit and ice in 30 seconds',
    'USB-C Quick Charging 2400mAh Battery: Up to 15 full blends on a single charge',
    'Food Grade BPA-Free PCTG Material: Dishwasher safe and leakproof magnetic induction',
  ]);

  const [viralHooks, setViralHooks] = useState<string[]>([
    'Stop paying $8 for smoothies every morning when this exists...',
    'Why is everyone on TikTok obsessing over this portable blender?',
  ]);

  const [tags, setTags] = useState<string[]>([
    '#tiktokshopfinds',
    '#portableblender',
    '#smoothierecipe',
    '#kitchengadgets',
  ]);

  const [newBullet, setNewBullet] = useState('');
  const [newHook, setNewHook] = useState('');
  const [newTag, setNewTag] = useState('');

  if (!isOpen) return null;

  const handleAddBullet = () => {
    if (!newBullet.trim()) return;
    setBulletPoints([...bulletPoints, newBullet.trim()]);
    setNewBullet('');
  };

  const handleAddHook = () => {
    if (!newHook.trim()) return;
    setViralHooks([...viralHooks, newHook.trim()]);
    setNewHook('');
  };

  const handleAddTag = () => {
    if (!newTag.trim()) return;
    const tag = newTag.startsWith('#') ? newTag.trim() : `#${newTag.trim()}`;
    setTags([...tags, tag]);
    setNewTag('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addListing({
      storeId: selectedStore?.id || 'store-us',
      storeName: selectedStore?.name || 'USA Store',
      productName,
      sku,
      category,
      sellingPrice,
      stock,
      status,
      bulletPoints,
      viralHooks,
      tags,
      image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=200',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-2xl max-h-[90vh] flex flex-col bg-white dark:bg-[#121620] rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-700/80 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-[#c084fc]">
              <Tag className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Create TikTok Shop Listing
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Draft profitable listings with viral video hooks, SEO bullets, and instant TikTok sync.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="h-8 w-8 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-white/5 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5 dark-scrollbar">
          {/* Basic Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Product Title
              </label>
              <input
                type="text"
                required
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">SKU Code</label>
              <input
                type="text"
                required
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-semibold font-mono-numeric"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Category</label>
              <input
                type="text"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-semibold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Target Selling Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={sellingPrice}
                onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-bold font-mono-numeric text-emerald-600 dark:text-[#4ade80]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Available Units / Stock
              </label>
              <input
                type="number"
                required
                value={stock}
                onChange={(e) => setStock(parseInt(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-semibold font-mono-numeric"
              />
            </div>
          </div>

          {/* Bullet Points Section */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span>SEO Features & Bullet Points ({bulletPoints.length})</span>
            </label>
            <div className="space-y-1.5">
              {bulletPoints.map((bp, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-[#161b26] rounded-xl text-xs text-slate-700 dark:text-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span className="flex-1">{bp}</span>
                  <button
                    type="button"
                    onClick={() => setBulletPoints(bulletPoints.filter((_, i) => i !== idx))}
                    className="text-slate-400 hover:text-rose-500 cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add bullet point..."
                value={newBullet}
                onChange={(e) => setNewBullet(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddBullet();
                  }
                }}
                className="flex-1 px-3 py-2 bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
              />
              <button
                type="button"
                onClick={handleAddBullet}
                className="px-3 py-2 bg-slate-200 dark:bg-slate-800 text-xs font-bold rounded-xl hover:bg-slate-300 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Viral Hooks */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-amber-500" />
              <span>Viral 3-Second Video Hook Concepts</span>
            </label>
            <div className="space-y-1.5">
              {viralHooks.map((vh, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30 rounded-xl text-xs text-slate-800 dark:text-amber-200">
                  <Sparkles className="h-4 w-4 text-amber-500 shrink-0" />
                  <span className="flex-1">{vh}</span>
                  <button
                    type="button"
                    onClick={() => setViralHooks(viralHooks.filter((_, i) => i !== idx))}
                    className="text-slate-400 hover:text-rose-500 cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add viral opening hook..."
                value={newHook}
                onChange={(e) => setNewHook(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddHook();
                  }
                }}
                className="flex-1 px-3 py-2 bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
              />
              <button
                type="button"
                onClick={handleAddHook}
                className="px-3 py-2 bg-slate-200 dark:bg-slate-800 text-xs font-bold rounded-xl hover:bg-slate-300 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Hashtags */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Trending Hashtags
            </label>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((t, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300"
                >
                  {t}
                  <button
                    type="button"
                    onClick={() => setTags(tags.filter((_, i) => i !== idx))}
                    className="text-slate-400 hover:text-rose-500 cursor-pointer"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add hashtag (e.g. #tiktokfinds)..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                className="flex-1 px-3 py-2 bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-3 py-2 bg-slate-200 dark:bg-slate-800 text-xs font-bold rounded-xl hover:bg-slate-300 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Sync Status Radio */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Initial Status
            </label>
            <div className="flex gap-3">
              {(['ready', 'draft', 'synced'] as const).map((st) => (
                <label
                  key={st}
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer capitalize"
                >
                  <input
                    type="radio"
                    name="listing-status"
                    checked={status === st}
                    onChange={() => setStatus(st)}
                    className="accent-purple-600"
                  />
                  <span>{st === 'ready' ? 'Ready to Sync' : st === 'synced' ? 'Synced on TikTok' : 'Draft'}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-xs font-bold text-white shadow-xs transition-all cursor-pointer"
            >
              <Tag className="h-4 w-4" />
              <span>Save & Publish Listing</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
