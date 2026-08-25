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
  Flag,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { CustomerTicket } from '../../types';
import { cn } from '../../lib/utils';

export default function AICustomerServicePage() {
  const { tickets, replyToTicket, resolveTicket, escalateTicket } = useStore();
  const [selectedTicketId, setSelectedTicketId] = useState<string>(tickets[0]?.id || '');
  const [activeFilter, setActiveFilter] = useState<
    'All' | 'Open' | 'Pending AI' | 'Escalated' | 'Resolved'
  >('All');
  const [priorityFilter, setPriorityFilter] = useState<'All' | 'High' | 'Medium' | 'Low'>('All');
  const [customReply, setCustomReply] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTickets = tickets.filter((t) => {
    const matchesStatus = activeFilter === 'All' || t.status === activeFilter;
    const matchesPriority = priorityFilter === 'All' || t.priority === priorityFilter;
    const matchesSearch =
      t.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
  });

  const selectedTicket =
    tickets.find((t) => t.id === selectedTicketId) || filteredTickets[0] || tickets[0];

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
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
            AI Customer Service Desk
          </h2>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Automated TikTok Shop customer inquiry replies, tracking lookup, and human escalation
            workflows.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:border-emerald-800/60 dark:bg-emerald-950/50 dark:text-[#4ade80]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            AI Auto-Responder Active (94% Accuracy)
          </span>
        </div>
      </div>

      {/* Main Helpdesk Interface (Split Pane) */}
      <div className="grid h-auto grid-cols-1 gap-6 lg:h-[720px] lg:grid-cols-12">
        {/* Left: Ticket Inbox (5 cols) */}
        <div className="shadow-xs flex h-[400px] flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-[#121620] lg:col-span-5 lg:h-full">
          {/* Inbox Search & Filter */}
          <div className="space-y-3 border-b border-slate-100 p-4 dark:border-slate-800">
            <div className="relative">
              <input
                type="text"
                placeholder="Search ticket, order #, or customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-xs font-medium text-slate-800 placeholder-slate-400 focus:border-lime-500 focus:outline-none dark:border-slate-800 dark:bg-[#0f1117] dark:text-slate-100 dark:placeholder-slate-600"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            </div>

            {/* Status Pills */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1">
              <span className="mr-1 shrink-0 text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500">
                Status:
              </span>
              {['All', 'Pending AI', 'Open', 'Escalated', 'Resolved'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab as any)}
                  className={cn(
                    'whitespace-nowrap rounded-xl px-2.5 py-1 text-xs font-semibold transition-colors',
                    activeFilter === tab
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-white/10',
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Priority Pills */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1">
              <span className="mr-1 shrink-0 text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500">
                Priority:
              </span>
              {(['All', 'High', 'Medium', 'Low'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPriorityFilter(p)}
                  className={cn(
                    'whitespace-nowrap rounded-xl px-2 py-0.5 text-[11px] font-semibold transition-colors',
                    priorityFilter === p
                      ? 'shadow-2xs bg-lime-500 font-bold text-black'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-white/10',
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Tickets List */}
          <div className="flex-1 divide-y divide-slate-100 overflow-y-auto dark:divide-slate-800">
            {filteredTickets.map((tkt) => {
              const isSelected = tkt.id === selectedTicketId;
              return (
                <button
                  key={tkt.id}
                  onClick={() => setSelectedTicketId(tkt.id)}
                  className={cn(
                    'flex w-full flex-col p-4 text-left transition-colors',
                    isSelected
                      ? 'border-l-4 border-l-[#84cc16] bg-lime-50/60 dark:bg-lime-950/30'
                      : 'hover:bg-slate-50 dark:hover:bg-white/5',
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {tkt.customerName}
                    </span>
                    <span className="font-mono-numeric text-[10px] text-slate-400 dark:text-slate-500">
                      {tkt.orderNumber}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-1 text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {tkt.subject}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                        {tkt.category}
                      </span>
                      <span
                        className={cn(
                          'rounded-md px-1.5 py-0.5 text-[9px] font-bold',
                          tkt.priority === 'High'
                            ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                            : tkt.priority === 'Medium'
                              ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                              : 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300',
                        )}
                      >
                        {tkt.priority}
                      </span>
                    </div>
                    <span
                      className={cn(
                        'rounded-md px-1.5 py-0.5 text-[10px] font-bold',
                        tkt.status === 'Pending AI'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                          : tkt.status === 'Escalated'
                            ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                            : tkt.status === 'Resolved'
                              ? 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                              : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
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
          <div className="shadow-xs flex h-[500px] flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-[#121620] lg:col-span-7 lg:h-full">
            {/* Thread Header */}
            <div className="flex flex-col justify-between gap-2 border-b border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-[#0f1117]/50 sm:flex-row sm:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {selectedTicket.subject}
                  </h3>
                  <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
                    {selectedTicket.storeName}
                  </span>
                  <span
                    className={cn(
                      'rounded-md px-1.5 py-0.5 text-[10px] font-bold',
                      selectedTicket.priority === 'High'
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300',
                    )}
                  >
                    {selectedTicket.priority} Priority
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  Customer: {selectedTicket.customerName} ({selectedTicket.customerEmail}) • Order:{' '}
                  {selectedTicket.orderNumber}
                </p>
              </div>

              <div className="flex items-center gap-1.5 self-start sm:self-auto">
                <button
                  onClick={() => escalateTicket(selectedTicket.id)}
                  className="rounded-xl border border-rose-200 bg-rose-50 px-2.5 py-1.5 text-xs font-bold text-rose-700 transition-colors hover:bg-rose-100 dark:border-rose-800/60 dark:bg-rose-950/40 dark:text-rose-300 dark:hover:bg-rose-950/60"
                >
                  Escalate
                </button>
                <button
                  onClick={() => resolveTicket(selectedTicket.id)}
                  className="rounded-xl border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-xs font-bold text-emerald-700 transition-colors hover:bg-emerald-100 dark:border-emerald-800/60 dark:bg-emerald-950/40 dark:text-[#4ade80] dark:hover:bg-emerald-950/60"
                >
                  Mark Resolved
                </button>
              </div>
            </div>

            {/* Conversation Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-5">
              {selectedTicket.messages.map((msg) => {
                const isCustomer = msg.sender === 'customer';
                const isAi = msg.sender === 'ai';

                return (
                  <div
                    key={msg.id}
                    className={`flex gap-2.5 sm:gap-3 ${isCustomer ? 'items-start' : 'items-end justify-end'}`}
                  >
                    {isCustomer && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-200 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        {selectedTicket.customerName.charAt(0)}
                      </div>
                    )}
                    <div
                      className={`max-w-lg rounded-2xl p-3.5 text-xs leading-relaxed sm:p-4 ${
                        isCustomer
                          ? 'border border-slate-200 bg-slate-100 text-slate-800 dark:border-slate-800 dark:bg-[#0f1117] dark:text-slate-200'
                          : isAi
                            ? 'border border-emerald-200 bg-emerald-50 text-emerald-950 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-200'
                            : 'bg-[#0f1117] text-white dark:bg-emerald-900/60'
                      }`}
                    >
                      <div className="mb-1 flex items-center justify-between text-[10px] font-bold opacity-70">
                        <span>{msg.senderName}</span>
                        <span>{msg.timestamp}</span>
                      </div>
                      <p>{msg.text}</p>
                    </div>
                  </div>
                );
              })}

              {/* AI Suggested Reply Box */}
              {selectedTicket.suggestedAiReply && (
                <div className="shadow-2xs space-y-3 rounded-2xl border border-emerald-300 bg-gradient-to-br from-emerald-50 to-lime-50 p-3.5 dark:border-emerald-800/80 dark:from-emerald-950/40 dark:to-lime-950/20 sm:p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-emerald-700 dark:text-[#4ade80]" />
                      <span className="text-xs font-bold text-emerald-950 dark:text-emerald-200">
                        AI Drafted Smart Reply
                      </span>
                    </div>
                    <span className="rounded-md bg-emerald-200/60 px-1.5 py-0.5 text-[10px] font-bold text-emerald-900 dark:bg-emerald-900/60 dark:text-emerald-200">
                      Auto-Generated
                    </span>
                  </div>

                  <p className="rounded-xl border border-emerald-100 bg-white/80 p-3 text-xs font-medium leading-relaxed text-slate-800 dark:border-emerald-900/40 dark:bg-[#151b26]/90 dark:text-slate-200">
                    {selectedTicket.suggestedAiReply}
                  </p>

                  <div className="flex flex-col items-stretch justify-end gap-2 pt-1 sm:flex-row sm:items-center">
                    <button
                      onClick={() => setCustomReply(selectedTicket.suggestedAiReply)}
                      className="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-center text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-[#161b26] dark:text-slate-200 dark:hover:bg-white/10"
                    >
                      Edit Before Sending
                    </button>
                    <button
                      onClick={handleApproveAi}
                      className="shadow-2xs flex items-center justify-center gap-1.5 rounded-xl bg-[#84cc16] px-4 py-1.5 text-xs font-bold text-black transition-colors hover:bg-[#72b012]"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Approve & Send</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Custom Reply Box */}
            <form
              onSubmit={handleSendCustom}
              className="flex items-center gap-2 border-t border-slate-100 bg-slate-50/50 p-3.5 dark:border-slate-800 dark:bg-[#0f1117]/50 sm:p-4"
            >
              <input
                type="text"
                placeholder="Type customer reply..."
                value={customReply}
                onChange={(e) => setCustomReply(e.target.value)}
                className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-medium text-slate-800 placeholder-slate-400 focus:border-lime-500 focus:outline-none dark:border-slate-800 dark:bg-[#0f1117] dark:text-slate-100 dark:placeholder-slate-600"
              />
              <button
                type="submit"
                disabled={!customReply.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white transition-colors hover:bg-black disabled:opacity-50 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-6 text-center dark:border-slate-800 dark:bg-[#121620] lg:col-span-7">
            <MessageCircle className="mb-2 h-10 w-10 text-slate-300 dark:text-slate-600" />
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
              No ticket matching selected filter
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
