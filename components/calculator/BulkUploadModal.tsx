'use client';

import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  Download,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Trash2,
  Sparkles,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { BulkParsedProduct } from '../../types';
import { formatCurrency, cn } from '../../lib/utils';
import { calculateUnitEconomics } from '../../lib/calculations';

interface BulkUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SAMPLE_CSV_CONTENT = `Product Name,SKU,Category,Cost Price,Selling Price,Shipping Cost,Packaging Cost,TikTok Commission %,Affiliate %,Ad CPA,Image URL
Wireless Fast Charger 15W,WC-001,Electronics,8.50,29.99,2.00,0.80,5,10,4.00,https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=300
Sunset Projection Lamp,SL-002,Room Decor,6.20,24.99,2.50,0.50,5,12,3.50,https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300
Hydrating Face Serum 30ml,HFS-003,Beauty & Skincare,4.10,22.50,1.80,0.60,5,15,3.00,https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300
Electric Milk Frother,EMF-004,Kitchen,3.80,18.99,2.20,0.40,5,10,2.80,https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300
MagSafe Shockproof Case,MC-005,Accessories,2.90,19.99,1.50,0.30,5,10,2.50,https://images.unsplash.com/photo-1580910051074-3eb694886505?w=300`;

export default function BulkUploadModal({ isOpen, onClose }: BulkUploadModalProps) {
  const { bulkAddProducts, selectedStore } = useStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [csvText, setCsvText] = useState('');
  const [parsedRows, setParsedRows] = useState<BulkParsedProduct[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');

  if (!isOpen) return null;

  const downloadSampleCsv = () => {
    const blob = new Blob([SAMPLE_CSV_CONTENT], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'rushnshop_sample_products.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const parseCsvData = (text: string) => {
    const lines = text
      .trim()
      .split(/\r?\n/)
      .filter((line) => line.trim().length > 0);
    if (lines.length <= 1) {
      setParsedRows([]);
      return;
    }

    const headerLine = lines[0] || '';
    const headers = headerLine
      .split(',')
      .map((h) => h.trim().toLowerCase().replace(/['"]/g, ''));

    const getIndex = (keys: string[]) => {
      return headers.findIndex((h) => keys.some((k) => h.includes(k)));
    };

    const nameIdx = getIndex(['name', 'title', 'product']);
    const skuIdx = getIndex(['sku', 'code']);
    const catIdx = getIndex(['cat', 'category']);
    const costIdx = getIndex(['cost', 'cogs', 'supplier', 'buy']);
    const priceIdx = getIndex(['sell', 'price', 'retail']);
    const shipIdx = getIndex(['ship', 'delivery']);
    const packIdx = getIndex(['pack', 'box']);
    const ttFeeIdx = getIndex(['commission', 'tiktok', 'fee']);
    const affIdx = getIndex(['affiliate', 'creator']);
    const adIdx = getIndex(['ad', 'cpa', 'cac', 'marketing']);
    const imgIdx = getIndex(['img', 'image', 'url', 'photo']);

    const rows: BulkParsedProduct[] = [];

    for (let i = 1; i < lines.length; i++) {
      const currentLine = lines[i] || '';
      const parts = currentLine.split(',').map((p) => p.trim().replace(/^["']|["']$/g, ''));
      if (parts.length < 2) continue;

      const name = nameIdx !== -1 && parts[nameIdx] ? parts[nameIdx] : `Product #${i}`;
      const sku = skuIdx !== -1 && parts[skuIdx] ? parts[skuIdx] : `SKU-BULK-${100 + i}`;
      const category = catIdx !== -1 && parts[catIdx] ? parts[catIdx] : 'General';
      const cogs = costIdx !== -1 && parts[costIdx] ? parseFloat(parts[costIdx]!) || 5.0 : 5.0;
      const sellingPrice = priceIdx !== -1 && parts[priceIdx] ? parseFloat(parts[priceIdx]!) || 24.99 : 24.99;
      const shippingCost = shipIdx !== -1 && parts[shipIdx] ? parseFloat(parts[shipIdx]!) || 2.5 : 2.5;
      const packagingCost = packIdx !== -1 && parts[packIdx] ? parseFloat(parts[packIdx]!) || 0.8 : 0.8;
      const tiktokFeePercent = ttFeeIdx !== -1 && parts[ttFeeIdx] ? parseFloat(parts[ttFeeIdx]!) || 5.0 : 5.0;
      const affiliatePercent = affIdx !== -1 && parts[affIdx] ? parseFloat(parts[affIdx]!) || 10.0 : 10.0;
      const adCpa = adIdx !== -1 && parts[adIdx] ? parseFloat(parts[adIdx]!) || 3.5 : 3.5;
      const image =
        imgIdx !== -1 && parts[imgIdx]
          ? parts[imgIdx]
          : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150';

      const calc = calculateUnitEconomics({
        sellingPrice,
        cogs,
        shippingCost,
        packagingCost,
        tiktokFeePercent,
        paymentFeePercent: 2.9,
        paymentFeeFixed: 0.3,
        affiliatePercent,
        adCpa,
        otherExpenses: 0.5,
        targetMarginPercent: 35.0,
      });

      let healthStatus: 'excellent' | 'good' | 'low' | 'loss' = 'good';
      if (calc.netProfit <= 0) healthStatus = 'loss';
      else if (calc.profitMargin >= 35) healthStatus = 'excellent';
      else if (calc.profitMargin < 15) healthStatus = 'low';

      rows.push({
        name,
        sku,
        category,
        image,
        cogs,
        sellingPrice,
        shippingCost,
        packagingCost,
        tiktokFeePercent,
        affiliatePercent,
        adCpa,
        netProfit: calc.netProfit,
        profitMarginPercent: calc.profitMargin,
        healthStatus,
        isValid: sellingPrice > 0 && cogs > 0,
      });
    }

    setParsedRows(rows);
  };

  const handleFileUpload = (file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setCsvText(text);
      parseCsvData(text);
    };
    reader.readAsText(file);
  };

  const handleImportAll = () => {
    if (!parsedRows.length) return;

    const productsToImport = parsedRows
      .filter((r) => r.isValid)
      .map((r) => ({
        title: r.name,
        sku: r.sku,
        image: r.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150',
        category: r.category,
        storeId: selectedStore?.id || 'store-us',
        unitsSold: 0,
        revenue: r.sellingPrice * 10,
        cogs: r.cogs * 10,
        shippingCost: r.shippingCost * 10,
        tiktokFees: (r.sellingPrice * (r.tiktokFeePercent / 100)) * 10,
        affiliateCommission: (r.sellingPrice * (r.affiliatePercent / 100)) * 10,
        adCost: r.adCpa * 10,
        totalCost: (r.cogs + r.shippingCost + r.packagingCost + r.adCpa) * 10,
        netProfit: r.netProfit * 10,
        margin: r.profitMarginPercent,
        stock: 100,
        status: (r.healthStatus === 'excellent' ? 'star' : r.healthStatus === 'loss' ? 'bleeding' : 'profitable') as any,
      }));

    bulkAddProducts(productsToImport);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-4xl max-h-[90vh] flex flex-col bg-white dark:bg-[#121620] rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-700/80 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-[#4ade80]">
              <FileSpreadsheet className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Bulk CSV Product Margin Calculator
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Batch calculate TikTok Shop profit margins across dozens of products simultaneously.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="h-8 w-8 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-white/5 dark:hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 dark-scrollbar">
          {/* Action Tabs & Sample Download */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl w-fit">
              <button
                type="button"
                onClick={() => setActiveTab('upload')}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer',
                  activeTab === 'upload'
                    ? 'bg-white dark:bg-[#161b26] text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white',
                )}
              >
                Upload CSV File
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('paste')}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer',
                  activeTab === 'paste'
                    ? 'bg-white dark:bg-[#161b26] text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white',
                )}
              >
                Paste CSV Text
              </button>
            </div>

            <button
              type="button"
              onClick={downloadSampleCsv}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 dark:text-[#4ade80] dark:hover:underline cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download Sample Template (.csv)</span>
            </button>
          </div>

          {/* Upload Area */}
          {activeTab === 'upload' ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                if (e.dataTransfer.files[0]) handleFileUpload(e.dataTransfer.files[0]);
              }}
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                'flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center',
                isDragging
                  ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20'
                  : 'border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 hover:bg-slate-50 dark:hover:bg-white/5',
              )}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,text/csv"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
                }}
              />
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-[#4ade80] mb-3">
                <Upload className="h-6 w-6" />
              </div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                Drag & drop your CSV file here, or browse
              </p>
              <p className="text-xs text-slate-400 mt-1">Supports UTF-8 CSV with standard product cost headers</p>
            </div>
          ) : (
            <div className="space-y-2">
              <textarea
                value={csvText}
                onChange={(e) => {
                  setCsvText(e.target.value);
                  parseCsvData(e.target.value);
                }}
                placeholder="Paste CSV lines with headers here..."
                rows={5}
                className="w-full p-3 bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          )}

          {/* Parsed Results Preview Table */}
          {parsedRows.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Calculated Preview ({parsedRows.length} SKUs)
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setParsedRows([]);
                    setCsvText('');
                  }}
                  className="text-xs font-semibold text-rose-500 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="h-3 w-3" /> Clear
                </button>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-left text-xs font-mono-numeric">
                  <thead className="bg-slate-50 dark:bg-[#161b26] text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 font-sans">
                    <tr>
                      <th className="p-3">Product</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">COGS + Ship</th>
                      <th className="p-3">TikTok Fee</th>
                      <th className="p-3">Ad CPA</th>
                      <th className="p-3">Net Profit</th>
                      <th className="p-3">Margin</th>
                      <th className="p-3">Health</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                    {parsedRows.map((r, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-white/5">
                        <td className="p-3 font-sans font-semibold text-slate-800 dark:text-slate-200 max-w-[180px] truncate">
                          {r.name}
                          <span className="block text-[10px] text-slate-400">{r.sku}</span>
                        </td>
                        <td className="p-3 font-bold">${r.sellingPrice.toFixed(2)}</td>
                        <td className="p-3 text-slate-600 dark:text-slate-300">
                          ${(r.cogs + r.shippingCost).toFixed(2)}
                        </td>
                        <td className="p-3 text-slate-500">${(r.sellingPrice * (r.tiktokFeePercent / 100)).toFixed(2)}</td>
                        <td className="p-3 text-slate-500">${r.adCpa.toFixed(2)}</td>
                        <td
                          className={cn(
                            'p-3 font-bold',
                            r.netProfit > 0
                              ? 'text-emerald-600 dark:text-[#4ade80]'
                              : 'text-rose-500',
                          )}
                        >
                          ${r.netProfit.toFixed(2)}
                        </td>
                        <td className="p-3 font-bold">{r.profitMarginPercent.toFixed(1)}%</td>
                        <td className="p-3 font-sans">
                          <span
                            className={cn(
                              'inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase',
                              r.healthStatus === 'excellent' && 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-[#4ade80]',
                              r.healthStatus === 'good' && 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-400',
                              r.healthStatus === 'low' && 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400',
                              r.healthStatus === 'loss' && 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-400',
                            )}
                          >
                            {r.healthStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-[#0b0e14] border-t border-slate-100 dark:border-slate-800">
          <p className="text-xs text-slate-400">
            {parsedRows.length > 0
              ? `${parsedRows.filter((r) => r.isValid).length} valid products ready to import`
              : 'Upload or paste a CSV file to preview calculations'}
          </p>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={parsedRows.length === 0}
              onClick={handleImportAll}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#84cc16] hover:bg-[#72b012] disabled:opacity-50 text-xs font-bold text-black shadow-xs transition-all cursor-pointer"
            >
              <Sparkles className="h-4 w-4 fill-current" />
              <span>Import to Products Catalog ({parsedRows.length})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
