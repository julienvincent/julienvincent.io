import React, { useCallback, useEffect, useState } from 'react';
import { type CarouselApi } from '@/components/ui/carousel';
import { Button } from '../ui/button';
import { Square } from 'lucide-react';
import { cn } from '@/lib/utils';

type UseDotButtonType = {
  selected_index: number;
  scroll_snaps: number[];
  onDotButtonClick: (index: number) => void;
};

export const useDotButton = (
  api: CarouselApi,
  onButtonClick?: (api: CarouselApi) => void,
): UseDotButtonType => {
  const [selected_index, setSelectedIndex] = useState(0);
  const [scroll_snaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!api) {
        return;
      }
      api.scrollTo(index);
      if (onButtonClick) {
        onButtonClick(api);
      }
    },
    [api, onButtonClick],
  );

  const onInit = useCallback((api: CarouselApi) => {
    if (!api) {
      return;
    }
    setScrollSnaps(api.scrollSnapList());
  }, []);

  const onSelect = useCallback((api: CarouselApi) => {
    if (!api) {
      return;
    }
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }

    onInit(api);
    onSelect(api);

    api.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect);
  }, [api, onInit, onSelect]);

  return {
    selected_index,
    scroll_snaps,
    onDotButtonClick,
  };
};

type PropType = React.ComponentProps<typeof Button> & {
  selected?: boolean;
};

export const DotButton = (props: PropType) => {
  const { selected } = props;

  return (
    <button
      data-slot="button"
      onClick={props.onClick}
      className={cn(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all',
        'hover:bg-none cursor-pointer m-1 mt-3 text-muted-foreground',
        selected ? 'text-secondary dark:text-accent' : '',
      )}
    >
      <Square strokeWidth={4} size={20} />
    </button>
  );
};
