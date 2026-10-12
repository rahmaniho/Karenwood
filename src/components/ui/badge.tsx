import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-medium tracking-wide transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-walnut text-cream dark:bg-bronze/20 dark:text-bronze',
        bronze: 'bg-bronze/15 text-walnut border border-bronze/40 dark:bg-bronze/20 dark:text-bronze-200',
        moss: 'bg-moss/15 text-moss-700 border border-moss/35 dark:bg-moss/25 dark:text-moss-200',
        outline: 'border border-walnut/20 text-walnut dark:border-cream/20 dark:text-cream',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
