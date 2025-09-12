import * as SwitchPrimitives from '@radix-ui/react-switch';
import { cn } from '@/lib/utils';
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode,
} from 'react';

type SwitchRef = ElementRef<typeof SwitchPrimitives.Root>;
type SwitchProps = ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
  thumb_children?: ReactNode;
};

const Switch = forwardRef<SwitchRef, SwitchProps>(
  ({ className, thumb_children, ...props }, ref) => (
    <SwitchPrimitives.Root
      ref={ref}
      className={cn(
        'peer inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-input shadow transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
        className,
      )}
      {...props}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          'pointer-events-none flex h-5 w-5 items-center justify-center rounded-full bg-background shadow-lg transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0',
        )}
      >
        {thumb_children}
      </SwitchPrimitives.Thumb>
    </SwitchPrimitives.Root>
  ),
);

Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
