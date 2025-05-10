'use client';

import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as React from 'react';

import { cn } from '@/lib/utils';

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  // Get the current direction from document
  const [direction, setDirection] = React.useState<'ltr' | 'rtl'>('ltr');

  // Update direction on mount and when it changes
  React.useEffect(() => {
    const updateDirection = () => {
      setDirection(document.dir as 'ltr' | 'rtl');
    };

    updateDirection();

    // Optional: Listen for direction changes (if your app dynamically changes direction)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'dir'
        ) {
          updateDirection();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        'bg-primary/20 relative h-2 w-full overflow-hidden rounded-full',
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary h-full w-full flex-1 transition-all"
        style={{
          transform:
            direction === 'rtl'
              ? `translateX(${100 - (value || 0)}%)` // RTL transform
              : `translateX(-${100 - (value || 0)}%)`, // LTR transform
        }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
