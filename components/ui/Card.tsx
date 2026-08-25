import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'bordered' | 'glass' | 'glow';
  hover?: boolean;
}

export function Card({
  children,
  className,
  variant = 'default',
  hover = false,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border transition-all duration-200',
        {
          'border-slate-200/80 bg-white shadow-xs dark:border-slate-800/80 dark:bg-[#121620]':
            variant === 'default',
          'border-slate-200/80 bg-white shadow-card-subtle dark:border-slate-800/80 dark:bg-[#151b26]':
            variant === 'elevated',
          'border-slate-300/80 bg-transparent dark:border-slate-700/80': variant === 'bordered',
          'glass-panel border-slate-200/80 shadow-xs dark:border-slate-800/80':
            variant === 'glass',
          'border-lime-500/30 bg-white shadow-rush-glow dark:border-lime-500/30 dark:bg-[#121620]':
            variant === 'glow',
        },
        hover &&
          'card-hover-lift hover:border-slate-300 hover:shadow-card-hover dark:hover:border-slate-700',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('px-5 pb-3 pt-5', className)} {...props}>
      {children}
    </div>
  );
}

export function CardContent({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('px-5 pb-5', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('border-t border-slate-100 px-5 py-3 dark:border-slate-800', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
