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

type ImageProps = {
  src: string;
  className?: string;
  grayscale?: boolean;
  description?: string;
};

type LazyImageProps = ImageProps & {
  shouldLoad?: boolean;
};
function LazyImage(props: LazyImageProps) {
  const [has_loaded, setHasLoaded] = React.useState(false);

  React.useEffect(() => {
    if (props.shouldLoad && !has_loaded) {
      setHasLoaded(true);
    }
  }, [props.shouldLoad]);

  if (!has_loaded) {
    return null;
  }

  return (
    <img
      src={props.src}
      className={cn(
        'h-full w-full rounded-md object-cover',
        props.className,
        props.grayscale ? 'grayscale' : '',
      )}
    />
  );
}

type Props = {
  ratio: number;
  images: ImageProps[];
};
export default function MdxCarousel(props: Props) {
  const [api, setApi] = React.useState<CarouselApi>(undefined);

  const { selected_index, scroll_snaps, onDotButtonClick } = useDotButton(api);

  return (
    <Carousel plugins={[Fade()]} setApi={setApi} className="mt-10 mb-20">
      <CarouselContent>
        {props.images.map((image, i) => {
          return (
            <CarouselItem key={i}>
              <AspectRatio
                ratio={props.ratio}
                className={cn('bg-muted rounded-lg')}
              >
                <LazyImage
                  src={image.src}
                  className={image.className}
                  grayscale={image.grayscale}
                  shouldLoad={i <= selected_index + 1}
                />
              </AspectRatio>
            </CarouselItem>
          );
        })}
      </CarouselContent>

      <div className="flex flex-row justify-between">
        <div>
          {props.images.map((image, i) => {
            if (!image.description || i !== selected_index) {
              return;
            }

            return (
              <p className="mt-0.5 ml-5 text-muted-foreground text-xs" key={i}>
                {image.description}
              </p>
            );
          })}
        </div>

        <div className="flex float-right ml-5">
          {scroll_snaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              selected={index === selected_index}
            />
          ))}
        </div>
      </div>
    </Carousel>
  );
}
