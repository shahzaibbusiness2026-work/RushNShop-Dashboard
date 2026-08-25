'use client';

import React, { useState } from 'react';
import {
  Tag,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  RefreshCw,
  ExternalLink,
  Trash2,
  Eye,
  Copy,
  DollarSign,
  TrendingUp,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatCurrency, cn } from '../../lib/utils';
import ListingModal from '../../components/calculator/ListingModal';

export default function ListingsPage() {
  const { listings, deleteListing, updateListing, selectedStore } = useStore();
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filtered = listings.filter(
    (l) =>
      l.productName.toLowerCase().includes(search.toLowerCase()) ||
      l.sku.toLowerCase().includes(search.toLowerCase()) ||
      l.category.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSyncToTikTok = (id: string) => {
    setSyncingId(id);
    setTimeout(() => {
      const item = listings.find((l) => l.id === id);
      if (item) {
        updateListing({
          ...item,
          status: 'synced',
          syncedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
        });
      }
      setSyncingId(null);
      showNotification('TikTok Shop Catalog Synced Successfully!');
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-slate-900 text-white dark:bg-white dark:text-black rounded-2xl shadow-2xl text-xs font-bold animate-in slide-in-from-bottom-3 duration-200">
          <Sparkles className="h-4 w-4 text-[#84cc16] fill-current" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-800 dark:bg-purple-950/50 dark:text-[#c084fc]">
            <Tag className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              TikTok Shop Listings Studio
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              Draft, review, and synchronize calculated profitable product listings directly to TikTok Seller Center.
            </p>
          </div>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>+ Create New Listing</span>
        </button>
      </div>

      {/* Main Container */}
      <div className="bg-white dark:bg-[#121620] rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs overflow-hidden">
        {/* Search Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search listings by title, SKU, or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            />
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 font-semibold">
            <span>{filtered.length} Total Listings</span>
          </div>
        </div>

        {/* Listings List */}
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <Tag className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
              <p className="font-bold text-slate-700 dark:text-slate-300">No TikTok listings found</p>
              <p className="text-xs mt-1">Click &quot;+ Create New Listing&quot; to draft your first profitable product.</p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className="p-5 sm:p-6 hover:bg-slate-50/60 dark:hover:bg-white/5 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-2 flex-1 min-w-0">
                  {/* Status & Store Tag */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={cn(
                        'px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider',
                        item.status === 'synced' && 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-[#4ade80] border border-emerald-200 dark:border-emerald-800',
                        item.status === 'ready' && 'bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800',
                        item.status === 'draft' && 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400',
                      )}
                    >
                      {item.status === 'synced' ? '✓ Synced on TikTok' : item.status === 'ready' ? 'Ready to Sync' : 'Draft'}
                    </span>
                    <span className="text-[11px] text-slate-400 font-semibold font-mono-numeric">
                      {item.sku} • {item.category}
                    </span>
                  </div>

                  {/* Title & Hooks */}
                  <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">
                    {item.productName}
                  </h3>

                  {/* Bullet points & Hooks preview */}
                  {item.bulletPoints && item.bulletPoints.length > 0 && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                      💡 <strong>Feature:</strong> {item.bulletPoints[0]}
                    </p>
                  )}

                  {item.viralHooks && item.viralHooks.length > 0 && (
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/40 text-[10px] font-bold text-amber-700 dark:text-amber-300 border border-amber-200/40">
                      <Zap className="h-3 w-3 fill-current" />
                      <span>Hook: &quot;{item.viralHooks[0]}&quot;</span>
                    </div>
                  )}
                </div>

                {/* Right Metrics & Actions */}
                <div className="flex items-center gap-4 shrink-0 font-mono-numeric">
                  <div className="text-right">
                    <p className="text-sm font-black text-slate-900 dark:text-white">
                      ${item.sellingPrice.toFixed(2)}
                    </p>
                    <p className="text-[11px] text-slate-400 font-sans">
                      {item.stock} In Stock
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.status !== 'synced' ? (
                      <button
                        onClick={() => handleSyncToTikTok(item.id)}
                        disabled={syncingId === item.id}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:hover:bg-purple-900/60 dark:text-[#c084fc] text-xs font-bold transition-all cursor-pointer"
                      >
                        <RefreshCw className={cn('h-3.5 w-3.5', syncingId === item.id && 'animate-spin')} />
                        <span>{syncingId === item.id ? 'Syncing...' : 'Sync to TikTok'}</span>
                      </button>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-[#4ade80]">
                        <CheckCircle2 className="h-4 w-4" /> Live
                      </span>
                    )}

                    <button
                      onClick={() => deleteListing(item.id)}
                      aria-label="Delete listing"
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Listing Modal */}
      <ListingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
