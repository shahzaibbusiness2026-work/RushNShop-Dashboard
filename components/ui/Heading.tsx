import React, { type ReactNode, type ElementType } from 'react';
import { cn } from '../../lib/utils';

interface HeadingProps {
  level?: 1 | 2 | 3 | 4;
  className?: string;
  children: ReactNode;
}

export const Heading: React.FC<HeadingProps> = ({ level = 1, className, children }) => {
  const Tag: ElementType = `h${level}`;
  const base = 'font-black tracking-tight text-slate-900 dark:text-white';
  const size: Record<number, string> = {
    1: 'text-3xl sm:text-5xl md:text-6xl',
    2: 'text-2xl sm:text-3xl',
    3: 'text-xl sm:text-2xl',
    4: 'text-lg sm:text-xl',
  };
  return <Tag className={cn(base, size[level], className)}>{children}</Tag>;
};

export default Heading;
