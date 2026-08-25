'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Filter,
  Plus,
  Trash2,
  Download,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  FileSpreadsheet,
  Printer,
  Upload,
  History,
  Sparkles,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatCurrency, cn } from '../../lib/utils';
import { exportToGoogleSheetsCSV, copyForGoogleSheets } from '../../lib/exportUtils';
import PdfReportModal from '../../components/export/PdfReportModal';
import BulkUploadModal from '../../components/calculator/BulkUploadModal';

export default function HistoryPage() {
  const {
    calculationHistory,
    deleteCalculationFromHistory,
    selectedStore,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'excellent' | 'good' | 'low' | 'loss'>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [bulkUploadModalOpen, setBulkUploadModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const itemsPerPage = 6;

  const router = useRouter();

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const categories = ['all', ...Array.from(new Set(calculationHistory.map((c) => c.category)))];

  // Filter calculations
  const filteredRecords = calculationHistory.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.healthStatus === statusFilter;
    const matchesCategory = categoryFilter === 'all' || c.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage) || 1;
  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleExportCSV = () => {
    const data = filteredRecords.map((c) => ({
      'Calculation Name': c.name,
      SKU: c.sku,
      Category: c.category,
      'Selling Price ($)': c.sellingPrice,
      'COGS ($)': c.cogs,
      'Shipping ($)': c.shippingCost,
      'TikTok Fees (%)': `${c.tiktokFeePercent}%`,
      'Ad CPA ($)': c.adCpa,
      'Net Profit ($)': c.netProfit,
      'Margin (%)': `${c.profitMarginPercent}%`,
      'Break-Even ($)': c.breakEvenPrice,
      'Health Status': c.healthStatus,
      'Date Calculated': c.createdAt,
    }));
    exportToGoogleSheetsCSV(`RushNshop-Calculations-Audit-${Date.now()}`, data);
    showNotification('Calculations exported to CSV.');
  };

  const handleCopyGoogleSheets = () => {
    const data = filteredRecords.map((c) => ({
      Product: c.name,
      SKU: c.sku,
      Price: `$${c.sellingPrice.toFixed(2)}`,
      Profit: `$${c.netProfit.toFixed(2)}`,
      Margin: `${c.profitMarginPercent.toFixed(1)}%`,
      BreakEven: `$${c.breakEvenPrice.toFixed(2)}`,
      Health: c.healthStatus,
      Date: c.createdAt,
    }));
    const success = copyForGoogleSheets(data);
    if (success) {
      showNotification('Copied to Clipboard for Google Sheets.');
    }
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
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-400">
            <History className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Calculation Audit History
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              Audit trail of previously computed product margins, break-even targets, and unit economics.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleCopyGoogleSheets}
            className="flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-[#121620] hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-700 dark:hover:text-[#4ade80] border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 shadow-2xs transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 dark:text-[#4ade80]" />
            <span>Copy Google Sheets</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-[#121620] hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 shadow-2xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setBulkUploadModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-[#121620] hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 shadow-2xs transition-colors cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-slate-400" />
            <span>Bulk CSV Import</span>
          </button>

          <button
            onClick={() => router.push('/calculator')}
            className="flex items-center gap-2 px-4 py-2 bg-[#84cc16] hover:bg-[#72b012] text-black rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>New Calculation</span>
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-[#121620] border border-slate-200/80 dark:border-slate-800/80">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search calculations by SKU, product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none"
          />
        </div>

        {/* Status Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(['all', 'excellent', 'good', 'low', 'loss'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={cn(
                'px-3 py-1.5 rounded-xl text-xs font-bold transition-all capitalize cursor-pointer shrink-0',
                statusFilter === st
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-black shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-500 hover:text-slate-900 dark:hover:text-white',
              )}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white dark:bg-[#121620] rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono-numeric">
            <thead className="bg-slate-50 dark:bg-[#161b26] text-slate-500 font-sans border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4">Product / SKU</th>
                <th className="p-4">Price</th>
                <th className="p-4">COGS + Ship</th>
                <th className="p-4">TikTok Fee</th>
                <th className="p-4">Net Profit</th>
                <th className="p-4">Margin</th>
                <th className="p-4">Health Status</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {paginatedRecords.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-12 text-center text-slate-400 font-sans">
                    No calculations found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                paginatedRecords.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
                    <td className="p-4 font-sans font-semibold text-slate-900 dark:text-slate-100 max-w-[200px] truncate">
                      {item.name}
                      <span className="block text-[10px] text-slate-400 font-mono-numeric">{item.sku} • {item.category}</span>
                    </td>
                    <td className="p-4 font-bold text-slate-900 dark:text-white">${item.sellingPrice.toFixed(2)}</td>
                    <td className="p-4 text-slate-600 dark:text-slate-300">${(item.cogs + item.shippingCost).toFixed(2)}</td>
                    <td className="p-4 text-slate-500">${(item.sellingPrice * (item.tiktokFeePercent / 100)).toFixed(2)}</td>
                    <td
                      className={cn(
                        'p-4 font-bold',
                        item.netProfit > 0 ? 'text-emerald-600 dark:text-[#4ade80]' : 'text-rose-500',
                      )}
                    >
                      ${item.netProfit.toFixed(2)}
                    </td>
                    <td className="p-4 font-bold">{item.profitMarginPercent.toFixed(1)}%</td>
                    <td className="p-4 font-sans">
                      <span
                        className={cn(
                          'inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase',
                          item.healthStatus === 'excellent' && 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-[#4ade80]',
                          item.healthStatus === 'good' && 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-400',
                          item.healthStatus === 'low' && 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400',
                          item.healthStatus === 'loss' && 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-400',
                        )}
                      >
                        {item.healthStatus}
                      </span>
                    </td>
                    <td className="p-4 text-slate-400 text-[11px]">{item.createdAt}</td>
                    <td className="p-4 text-right font-sans">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => router.push('/calculator')}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-white transition-colors cursor-pointer"
                        >
                          Load
                        </button>
                        <button
                          onClick={() => deleteCalculationFromHistory(item.id)}
                          aria-label="Delete history item"
                          className="p-1 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 font-sans">
            <span>
              Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
              {Math.min(currentPage * itemsPerPage, filteredRecords.length)} of {filteredRecords.length} records
            </span>
            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="px-2 font-bold">
                {currentPage} / {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bulk Upload Modal */}
      <BulkUploadModal isOpen={bulkUploadModalOpen} onClose={() => setBulkUploadModalOpen(false)} />
      <PdfReportModal isOpen={pdfModalOpen} onClose={() => setPdfModalOpen(false)} />
    </div>
  );
}
