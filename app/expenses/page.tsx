'use client';

import React, { useState } from 'react';
import {
  Receipt,
  Plus,
  DollarSign,
  Calendar,
  Building,
  Laptop,
  Users,
  Package,
  Trash2,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatCurrency } from '../../lib/utils';
import { Expense } from '../../types';

export default function ExpensesPage() {
  const { filteredExpenses, addExpense, stores, selectedStore } = useStore();
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Expense['category']>('Software');
  const [amount, setAmount] = useState<number>(0);
  const [recurrence, setRecurrence] = useState<Expense['recurrence']>('Monthly');
  const [storeId, setStoreId] = useState('all');

  const totalMonthlyExpenses = filteredExpenses.reduce((acc, e) => acc + e.amount, 0);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || amount <= 0) return;

    const storeObj = stores.find((s) => s.id === storeId);

    addExpense({
      title,
      category,
      amount,
      recurrence,
      storeId,
      storeName: storeId === 'all' ? 'All Stores' : storeObj?.name || 'All Stores',
      date: new Date().toISOString().slice(0, 10),
      status: 'Paid',
    });

    setTitle('');
    setAmount(0);
    setShowAddModal(false);
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Software':
        return <Laptop className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
      case 'Staff':
        return <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />;
      case 'Warehouse':
        return <Building className="h-4 w-4 text-amber-600 dark:text-amber-400" />;
      case 'Packaging':
        return <Package className="h-4 w-4 text-emerald-600 dark:text-[#4ade80]" />;
      default:
        return <Receipt className="h-4 w-4 text-slate-600 dark:text-slate-400" />;
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
            Cost & Operating Expense Tracking
          </h2>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Monitor fixed business overheads, SaaS tools, 3PL warehouse fees, and team payroll.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="shadow-xs flex items-center gap-2 self-start rounded-xl bg-[#84cc16] px-4 py-2.5 text-xs font-bold text-black transition-all hover:scale-[1.02] hover:bg-[#72b012] sm:self-auto"
        >
          <Plus className="h-4 w-4 stroke-[2.5]" />
          <span>Add Custom Expense</span>
        </button>
      </div>

      {/* Expenses Overview Cards */}
      <div className="font-mono-numeric grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="shadow-xs rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-slate-800/80 dark:bg-[#121620]">
          <p className="font-sans text-xs font-semibold text-slate-500 dark:text-slate-400">
            Total Fixed Monthly Expenses
          </p>
          <p className="mt-1 text-2xl font-black text-slate-900 dark:text-slate-50">
            {formatCurrency(totalMonthlyExpenses, selectedStore?.currency)}
          </p>
          <p className="mt-1 font-sans text-xs text-slate-400 dark:text-slate-500">
            Deducted from gross profit calculations
          </p>
        </div>
        <div className="shadow-xs rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-slate-800/80 dark:bg-[#121620]">
          <p className="font-sans text-xs font-semibold text-slate-500 dark:text-slate-400">
            Active Staff & VA Payroll
          </p>
          <p className="mt-1 text-2xl font-black text-purple-600 dark:text-[#c084fc]">
            {formatCurrency(1200.0, selectedStore?.currency)}
          </p>
          <p className="mt-1 font-sans text-xs text-slate-400 dark:text-slate-500">
            2 Virtual Assistants
          </p>
        </div>
        <div className="shadow-xs rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-slate-800/80 dark:bg-[#121620]">
          <p className="font-sans text-xs font-semibold text-slate-500 dark:text-slate-400">
            Software & Subscriptions
          </p>
          <p className="mt-1 text-2xl font-black text-blue-600 dark:text-[#38bdf8]">
            {formatCurrency(199.0, selectedStore?.currency)}
          </p>
          <p className="mt-1 font-sans text-xs text-slate-400 dark:text-slate-500">
            TikTok tools, automation API
          </p>
        </div>
      </div>

      {/* Expenses Ledger */}
      <div className="shadow-xs overflow-hidden rounded-3xl border border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-[#121620]">
        <div className="flex items-center justify-between border-b border-slate-100 p-5 dark:border-slate-800">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50">
            Operating Expenses Ledger
          </h3>
          <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
            {filteredExpenses.length} Entries
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:border-slate-800 dark:bg-white/5 dark:text-slate-500">
                <th className="px-4 py-3.5 font-semibold">Expense Title</th>
                <th className="px-3 py-3.5 font-semibold">Category</th>
                <th className="px-3 py-3.5 font-semibold">Allocated Store</th>
                <th className="px-3 py-3.5 font-semibold">Recurrence</th>
                <th className="px-3 py-3.5 font-semibold">Date</th>
                <th className="px-3 py-3.5 font-semibold">Amount</th>
                <th className="px-4 py-3.5 text-right font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700 dark:divide-slate-800/60 dark:text-slate-300">
              {filteredExpenses.map((exp) => (
                <tr
                  key={exp.id}
                  className="transition-colors hover:bg-slate-50/80 dark:hover:bg-white/5"
                >
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 dark:bg-[#0f1117]">
                        {getCategoryIcon(exp.category)}
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white">{exp.title}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3.5 font-semibold text-slate-600 dark:text-slate-400">
                    {exp.category}
                  </td>
                  <td className="px-3 py-3.5 text-slate-800 dark:text-slate-200">
                    {exp.storeName}
                  </td>
                  <td className="px-3 py-3.5">
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 font-semibold text-slate-700 dark:bg-white/5 dark:text-slate-300">
                      {exp.recurrence}
                    </span>
                  </td>
                  <td className="px-3 py-3.5 text-slate-500 dark:text-slate-400">{exp.date}</td>
                  <td className="font-mono-numeric px-3 py-3.5 font-black text-slate-900 dark:text-white">
                    {formatCurrency(exp.amount, selectedStore?.currency)}
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 dark:border-emerald-800/60 dark:bg-emerald-950/50 dark:text-[#4ade80]">
                      {exp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Expense Modal */}
      {showAddModal && (
        <div className="backdrop-blur-xs animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md space-y-4 rounded-3xl border border-slate-200 bg-white p-6 text-slate-900 shadow-2xl dark:border-slate-800 dark:bg-[#151b26] dark:text-white">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Add New Expense / Overhead
            </h3>

            <form onSubmit={handleAdd} className="space-y-3.5">
              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Expense Description
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. TikTok Ads Tracking Software"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-semibold dark:border-slate-800 dark:bg-[#0f1117] dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-semibold dark:border-slate-800 dark:bg-[#0f1117] dark:text-white"
                  >
                    <option value="Software" className="dark:bg-[#0f1117]">
                      Software & SaaS
                    </option>
                    <option value="Staff" className="dark:bg-[#0f1117]">
                      Staff / VA Salaries
                    </option>
                    <option value="Warehouse" className="dark:bg-[#0f1117]">
                      3PL Warehouse
                    </option>
                    <option value="Packaging" className="dark:bg-[#0f1117]">
                      Packaging
                    </option>
                    <option value="Marketing" className="dark:bg-[#0f1117]">
                      Marketing / Samples
                    </option>
                    <option value="Other" className="dark:bg-[#0f1117]">
                      Other Expenses
                    </option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Amount ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={amount || ''}
                    onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                    className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-bold dark:border-slate-800 dark:bg-[#0f1117] dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Recurrence
                  </label>
                  <select
                    value={recurrence}
                    onChange={(e) => setRecurrence(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-semibold dark:border-slate-800 dark:bg-[#0f1117] dark:text-white"
                  >
                    <option value="Monthly" className="dark:bg-[#0f1117]">
                      Monthly Recurring
                    </option>
                    <option value="One-off" className="dark:bg-[#0f1117]">
                      One-off Payment
                    </option>
                    <option value="Annual" className="dark:bg-[#0f1117]">
                      Annual
                    </option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Store Allocation
                  </label>
                  <select
                    value={storeId}
                    onChange={(e) => setStoreId(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-semibold dark:border-slate-800 dark:bg-[#0f1117] dark:text-white"
                  >
                    <option value="all" className="dark:bg-[#0f1117]">
                      Apportion All Stores
                    </option>
                    {stores.map((s) => (
                      <option key={s.id} value={s.id} className="dark:bg-[#0f1117]">
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#84cc16] px-5 py-2 text-xs font-bold text-black transition-colors hover:bg-[#72b012]"
                >
                  Save Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
