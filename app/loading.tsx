import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-[#84cc16]" />
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Loading...</p>
      </div>
    </div>
  );
}
