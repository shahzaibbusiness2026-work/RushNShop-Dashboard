'use client';

import React, { useState } from 'react';
import {
  Headphones,
  Send,
  Sparkles,
  Bot,
  UserCheck,
  AlertOctagon,
  CheckCircle2,
  Clock,
  Search,
  MessageCircle,
  Truck,
  RotateCcw,
  ShieldAlert,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { CustomerTicket } from '../../types';
import { cn } from '../../lib/utils';

export default function AICustomerServicePage() {
  const { tickets, replyToTicket, resolveTicket, escalateTicket } = useStore();
  const [selectedTicketId, setSelectedTicketId] = useState<string>(tickets[0]?.id || '');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Open' | 'Pending AI' | 'Escalated' | 'Resolved'>('All');
  const [customReply, setCustomReply] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTickets = tickets.filter((t) => {
    const matchesFilter = activeFilter === 'All' || t.status === activeFilter;
    const matchesSearch =
      t.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const selectedTicket = tickets.find((t) => t.id === selectedTicketId) || tickets[0];

  const handleApproveAi = () => {
    if (!selectedTicket || !selectedTicket.suggestedAiReply) return;
    replyToTicket(selectedTicket.id, selectedTicket.suggestedAiReply);
  };

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket || !customReply.trim()) return;
    replyToTicket(selectedTicket.id, customReply);
    setCustomReply('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">AI Customer Service Desk</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Automated TikTok Shop customer inquiry replies, tracking lookup, and human escalation workflows.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-[#4ade80] border border-emerald-200 dark:border-emerald-800/60">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            AI Auto-Responder Active (94% Accuracy)
          </span>
        </div>
      </div>

      {/* Main Helpdesk Interface (Split Pane) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 h-[720px]">
        {/* Left: Ticket Inbox (5 cols) */}
        <div className="lg:col-span-5 flex flex-col rounded-3xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#151b26] shadow-sm overflow-hidden">
          {/* Inbox Search & Filter */}
          <div className="p-4 border-b border-gray-100 dark:border-gray-800 space-y-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search ticket, order #, or customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f1117] pl-9 pr-4 py-2 text-xs font-medium text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 focus:border-lime-500 focus:outline-none"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>

            <div className="flex items-center gap-1 overflow-x-auto pb-1">
              {['All', 'Pending AI', 'Open', 'Escalated', 'Resolved'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab as any)}
                  className={cn(
                    'whitespace-nowrap rounded-xl px-2.5 py-1 text-xs font-semibold transition-colors',
                    activeFilter === tab
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                      : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tickets List */}
          <div className="flex-1 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800">
            {filteredTickets.map((tkt) => {
              const isSelected = tkt.id === selectedTicketId;
              return (
                <button
                  key={tkt.id}
                  onClick={() => setSelectedTicketId(tkt.id)}
                  className={cn(
                    'flex w-full flex-col p-4 text-left transition-colors',
                    isSelected
                      ? 'bg-lime-50/60 dark:bg-lime-950/30 border-l-4 border-l-[#84cc16]'
                      : 'hover:bg-gray-50 dark:hover:bg-white/5'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900 dark:text-white text-xs">{tkt.customerName}</span>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500">{tkt.orderNumber}</span>
                  </div>
                  <p className="mt-1 font-semibold text-gray-800 dark:text-gray-200 text-xs line-clamp-1">{tkt.subject}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400">{tkt.category}</span>
                    <span
                      className={cn(
                        'rounded-md px-1.5 py-0.5 text-[10px] font-bold',
                        tkt.status === 'Pending AI'
                          ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                          : tkt.status === 'Escalated'
                          ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300'
                          : tkt.status === 'Resolved'
                          ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                          : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                      )}
                    >
                      {tkt.status}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Active Ticket Thread & AI Response Console (7 cols) */}
        {selectedTicket ? (
          <div className="lg:col-span-7 flex flex-col rounded-3xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#151b26] shadow-sm overflow-hidden">
            {/* Thread Header */}
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 p-4 bg-gray-50/50 dark:bg-[#0f1117]/50">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm">{selectedTicket.subject}</h3>
                  <span className="rounded-md bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 text-[10px] font-bold text-blue-700 dark:text-blue-300">
                    {selectedTicket.storeName}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Customer: {selectedTicket.customerName} ({selectedTicket.customerEmail}) • Order: {selectedTicket.orderNumber}
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => escalateTicket(selectedTicket.id)}
                  className="rounded-xl border border-rose-200 dark:border-rose-800/60 bg-rose-50 dark:bg-rose-950/40 px-2.5 py-1.5 text-xs font-bold text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-950/60"
                >
                  Escalate
                </button>
                <button
                  onClick={() => resolveTicket(selectedTicket.id)}
                  className="rounded-xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1.5 text-xs font-bold text-emerald-700 dark:text-[#4ade80] hover:bg-emerald-100 dark:hover:bg-emerald-950/60"
                >
                  Mark Resolved
                </button>
              </div>
            </div>

            {/* Conversation Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {selectedTicket.messages.map((msg) => {
                const isCustomer = msg.sender === 'customer';
                const isAi = msg.sender === 'ai';

                return (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${isCustomer ? 'items-start' : 'items-end justify-end'}`}
                  >
                    {isCustomer && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold text-xs">
                        {selectedTicket.customerName.charAt(0)}
                      </div>
                    )}
                    <div
                      className={`max-w-lg rounded-2xl p-4 text-xs leading-relaxed ${
                        isCustomer
                          ? 'bg-gray-100 dark:bg-[#0f1117] text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-800'
                          : isAi
                          ? 'bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 text-emerald-950 dark:text-emerald-200'
                          : 'bg-[#0f1117] dark:bg-emerald-900/60 text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1 text-[10px] font-bold opacity-70">
                        <span>{msg.senderName}</span>
                        <span>{msg.timestamp}</span>
                      </div>
                      <p>{msg.text}</p>
                    </div>
                  </div>
                );
              })}

              {/* AI Suggested Reply Box (if available) */}
              {selectedTicket.suggestedAiReply && (
                <div className="rounded-2xl border border-emerald-300 dark:border-emerald-800/80 bg-gradient-to-br from-emerald-50 to-lime-50 dark:from-emerald-950/40 dark:to-lime-950/20 p-4 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-emerald-700 dark:text-[#4ade80]" />
                      <span className="text-xs font-bold text-emerald-950 dark:text-emerald-200">
                        AI Drafted Smart Reply (Trained on USPS Tracking & Store Return Policy)
                      </span>
                    </div>
                    <span className="rounded-md bg-emerald-200/60 dark:bg-emerald-900/60 px-1.5 py-0.5 text-[10px] font-bold text-emerald-900 dark:text-emerald-200">
                      Auto-Generated
                    </span>
                  </div>

                  <p className="text-xs text-gray-800 dark:text-gray-200 font-medium leading-relaxed bg-white/80 dark:bg-[#151b26]/90 p-3 rounded-xl border border-emerald-100 dark:border-emerald-900/40">
                    {selectedTicket.suggestedAiReply}
                  </p>

                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      onClick={() => setCustomReply(selectedTicket.suggestedAiReply)}
                      className="rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#161b22] px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/10"
                    >
                      Edit Before Sending
                    </button>
                    <button
                      onClick={handleApproveAi}
                      className="flex items-center gap-1.5 rounded-xl bg-[#84cc16] px-4 py-1.5 text-xs font-bold text-black hover:bg-[#72b012] shadow-sm"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Approve & Send to TikTok Shop</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Custom Reply Box */}
            <form onSubmit={handleSendCustom} className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-[#0f1117]/50 flex items-center gap-2">
              <input
                type="text"
                placeholder="Type customer reply..."
                value={customReply}
                onChange={(e) => setCustomReply(e.target.value)}
                className="flex-1 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f1117] px-4 py-2.5 text-xs font-medium text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 focus:border-lime-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!customReply.trim()}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-black dark:hover:bg-gray-200 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="lg:col-span-7 flex flex-col items-center justify-center rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#151b26] p-6 text-center">
            <MessageCircle className="h-10 w-10 text-gray-300 dark:text-gray-600 mb-2" />
            <p className="text-sm font-bold text-gray-700 dark:text-gray-300">No ticket selected</p>
          </div>
        )}
      </div>
    </div>
  );
}
