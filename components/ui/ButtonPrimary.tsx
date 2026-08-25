import React, { type ReactNode } from 'react';
import { cn } from '../../lib/utils';
import Link, { type LinkProps } from 'next/link';

type ButtonVariant = 'lime' | 'emerald' | 'dark' | 'outline' | 'glass';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonBaseProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<LinkProps, keyof ButtonBaseProps> & {
    href: string;
  };

export type ButtonPrimaryProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<ButtonVariant, string> = {
  lime: 'bg-[#84cc16] text-black hover:bg-[#72b012] hover:shadow-rush-glow shadow-xs',
  emerald: 'bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-rush-glow shadow-xs',
  dark: 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 shadow-xs',
  outline:
    'bg-transparent border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80',
  glass:
    'glass-panel border border-slate-200/80 dark:border-slate-700/60 text-slate-900 dark:text-white hover:bg-white/90 dark:hover:bg-slate-800/90 shadow-xs',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: 'px-4 py-2 text-sm rounded-xl',
  lg: 'px-5 py-2.5 text-base rounded-xl font-bold',
};

export const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  children,
  variant = 'lime',
  size = 'md',
  className,
  ...props
}) => {
  const baseClass = cn(
    'inline-flex items-center justify-center gap-2 font-bold tracking-tight transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none',
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if ('href' in props && props.href) {
    const { href, ...linkProps } = props;
    return (
      <Link href={href} className={baseClass} {...linkProps}>
        {children}
      </Link>
    );
  }

  const { ...buttonProps } = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={baseClass} {...buttonProps}>
      {children}
    </button>
  );
};

export default ButtonPrimary;
