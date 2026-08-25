'use client';

import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-8 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400">
        <AlertTriangle className="h-8 w-8" />
      </div>
      <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
        Something went wrong
      </h2>
      <p className="mb-6 max-w-md text-sm text-slate-500 dark:text-slate-400">
        An unexpected error occurred. Please try again or return to the dashboard.
      </p>
      {process.env.NODE_ENV === 'development' && error?.message && (
        <pre className="mb-4 max-w-lg overflow-auto rounded-xl border border-slate-200 bg-slate-100 p-4 text-left text-xs text-rose-600 dark:border-slate-800 dark:bg-slate-900 dark:text-rose-400">
          {error.message}
        </pre>
      )}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="shadow-xs flex items-center gap-2 rounded-xl bg-[#84cc16] px-5 py-2.5 text-sm font-bold text-black transition-all hover:bg-[#72b012]"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
        <Link
          href="/dashboard"
          className="flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-white/5"
        >
          <Home className="h-4 w-4" />
          Dashboard
        </Link>
      </div>
    </div>
  );
}
