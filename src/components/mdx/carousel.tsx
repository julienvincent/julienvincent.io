import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '../ui/carousel';
import Fade from 'embla-carousel-fade';
import { DotButton, useDotButton } from './dot-button';
import React from 'react';
import { cn } from '@/lib/utils';

type Image = {
  src: string;
  className?: string;
  grayscale?: boolean;
};

type Props = {
  ratio: number;
  images: Image[];
};
export default function MdxCarousel(props: Props) {
  const [api, setApi] = React.useState<CarouselApi>(undefined);

  const { selected_index, scroll_snaps, onDotButtonClick } = useDotButton(api);

  return (
    <Carousel plugins={[Fade()]} setApi={setApi} className="mt-10 mb-20">
      <CarouselContent>
        {props.images.map((image, i) => {
          return (
            <CarouselItem>
              <AspectRatio
                ratio={props.ratio}
                key={i}
                className={cn('bg-muted rounded-lg')}
              >
                <img
                  src={image.src}
                  className={cn(
                    'h-full w-full rounded-md object-cover',
                    image.className,
                    image.grayscale ? 'grayscale' : '',
                  )}
                />
              </AspectRatio>
            </CarouselItem>
          );
        })}
      </CarouselContent>

      <div className="flex float-right">
        {scroll_snaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            selected={index === selected_index}
          />
        ))}
      </div>
    </Carousel>
  );
}
