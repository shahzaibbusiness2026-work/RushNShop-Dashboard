import React from 'react';
import { cn } from '../../lib/utils';

type BadgeVariant =
  | 'default'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'outline'
  | 'lime'
  | 'purple'
  | 'cyan';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
  dotColor?: string;
  pulse?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60',
  success:
    'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-[#4ade80] border border-emerald-200/60 dark:border-emerald-800/40',
  warning:
    'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/40',
  danger:
    'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200/60 dark:border-rose-800/40',
  info: 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/40',
  outline:
    'bg-transparent border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400',
  lime: 'bg-lime-500/10 dark:bg-lime-500/15 text-lime-700 dark:text-lime-400 border border-lime-500/30',
  purple:
    'bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/40',
  cyan: 'bg-cyan-50 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 border border-cyan-200/60 dark:border-cyan-800/40',
};

const dotStyles: Record<BadgeVariant, string> = {
  default: 'bg-slate-400 dark:bg-slate-500',
  success: 'bg-emerald-500 dark:bg-[#4ade80]',
  warning: 'bg-amber-500 dark:bg-amber-400',
  danger: 'bg-rose-500 dark:bg-rose-400',
  info: 'bg-blue-500 dark:bg-blue-400',
  outline: 'bg-slate-400',
  lime: 'bg-[#84cc16]',
  purple: 'bg-purple-500 dark:bg-purple-400',
  cyan: 'bg-cyan-500 dark:bg-cyan-400',
};

export function Badge({
  children,
  variant = 'default',
  size = 'sm',
  dot = false,
  dotColor,
  pulse = false,
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg font-semibold tracking-wide transition-colors',
        variantStyles[variant],
        {
          'px-2 py-0.5 text-[10px] uppercase': size === 'sm',
          'px-2.5 py-1 text-xs': size === 'md',
          'px-3 py-1.5 text-sm': size === 'lg',
        },
        className,
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            'h-1.5 w-1.5 rounded-full shrink-0',
            dotColor || dotStyles[variant],
            pulse && 'beacon-pulse',
          )}
        />
      )}
      {children}
    </span>
  );
}

export default Badge;
