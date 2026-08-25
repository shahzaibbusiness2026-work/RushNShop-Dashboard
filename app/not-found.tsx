import React from 'react';
import { FileQuestion, Home } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-8 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
        <FileQuestion className="h-8 w-8" />
      </div>
      <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">Page Not Found</h2>
      <p className="mb-6 max-w-md text-sm text-slate-500 dark:text-slate-400">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/dashboard"
        className="shadow-xs flex items-center gap-2 rounded-xl bg-[#84cc16] px-5 py-2.5 text-sm font-bold text-black transition-all hover:bg-[#72b012]"
      >
        <Home className="h-4 w-4" />
        Back to Dashboard
      </Link>
    </div>
  );
}
