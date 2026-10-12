import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        default:
          'bg-walnut text-cream hover:bg-walnut-800 shadow-luxury dark:bg-bronze dark:text-ink dark:hover:bg-bronze-300',
        bronze:
          'bg-bronze text-ink font-semibold hover:bg-bronze-300 shadow-bronze-glow',
        moss:
          'bg-moss text-cream hover:bg-moss-500 shadow-sm',
        outline:
          'border border-walnut/25 bg-transparent text-walnut hover:bg-walnut hover:text-cream dark:border-cream/25 dark:text-cream dark:hover:bg-cream dark:hover:text-ink',
        ghost:
          'text-walnut hover:bg-walnut/10 dark:text-cream dark:hover:bg-cream/10',
        link: 'text-bronze underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 px-6 py-2.5',
        sm: 'h-9 rounded-md px-4 text-xs',
        lg: 'h-13 rounded-xl px-8 py-3.5 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
