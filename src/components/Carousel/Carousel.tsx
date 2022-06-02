import clsx from 'clsx';
import ArrowLeftIcon from 'components/Icons/ArrowLeftIcon';
import ArrowRightIcon from 'components/Icons/ArrowRightIcon';
import { cloneElement, HTMLAttributes, ReactElement, useEffect, useRef, useState } from 'react';

import { IconButton } from '../IconButton/IconButton';

interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  carouselItems: ReactElement[];
  withArrows?: boolean;
  arrowsPosition?: 'outside' | 'half' | 'inside';
  withDots?: boolean;
  dotsPosition?: 'outside' | 'inside';
  withFade?: boolean;
  widthOfItems: number;
  startPosition?: number;
}

export function Carousel({
  withArrows = true,
  arrowsPosition = 'outside',
  dotsPosition = 'outside',
  withDots,
  withFade = false,
  carouselItems,
  widthOfItems,
  startPosition,
  className,
  ...rest
}: CarouselProps) {
  const styledCarouselItemsWrapperRef = useRef<HTMLDivElement>(null);
  const startingIndex = startPosition
    ? startPosition
    : carouselItems.length < 3
    ? 0
    : Math.ceil(carouselItems.length / 2);
  const [activeIndex, setActiveIndex] = useState<number>(startingIndex);

  const handleNext = () => {
    setActiveIndex((state) => {
      if (state >= carouselItems.length) return state;
      scroll(state + 1);
      return state + 1;
    });
  };

  const handlePrev = () => {
    setActiveIndex((state) => {
      if (state <= 1) return state;
      scroll(state - 1);
      return state - 1;
    });
  };

  const handleClick = (index: number) => {
    scroll(index);
    setActiveIndex(index);
  };

  useEffect(() => {
    if (!widthOfItems || !styledCarouselItemsWrapperRef) return;
    const ref = styledCarouselItemsWrapperRef.current;
    if (ref) {
      const left = startPosition
        ? 0
        : carouselItems.length % 2 === 0
        ? ref.scrollWidth / 2 - ref.clientWidth / 2 - widthOfItems / 2
        : ref.scrollWidth / 2 - ref.clientWidth / 2;

      ref.scroll(left, 0);
    }
  }, [widthOfItems, styledCarouselItemsWrapperRef, startPosition, carouselItems.length]);

  const scroll = (newIndex: number) => {
    const ref = styledCarouselItemsWrapperRef.current;
    if (ref) {
      const left = widthOfItems * newIndex - ref.clientWidth / 2 - widthOfItems / 2;

      ref.scroll({
        behavior: 'smooth',
        left
      });
    }
  };
  const maxLength = carouselItems.length;
  const parsedCarouselItems = withFade
    ? carouselItems.map((item, index) => {
        const prevClassName = item.props?.className;
        if (index === activeIndex)
          return cloneElement(item, { className: `${prevClassName} ui-opacity-100` });
        if (index === activeIndex - 1 && activeIndex - 1 > 0)
          return cloneElement(item, { className: `${prevClassName} ui-opacity-70 ui-scale-[0.9]` });
        if (activeIndex - 1 === index && activeIndex + 1 <= maxLength)
          return cloneElement(item, { className: `${prevClassName} ui-opacity-70 ui-scale-[0.9]` });
        if (index + 1 === activeIndex)
          return cloneElement(item, { className: `${prevClassName} ui-opacity-70 ui-scale-[0.9]` });
        if (index + 2 === activeIndex)
          return cloneElement(item, { className: `${prevClassName} ui-opacity-50 ui-scale-[0.8]` });
        if (index - 2 === activeIndex)
          return cloneElement(item, { className: `${prevClassName} ui-opacity-50 ui-scale-[0.8]` });
        return item;
      })
    : carouselItems;

  return (
    <div
      className={clsx(className, 'ui-min-h-[50px] ui-w-full ui-flex ui-flex-col ui-relative')}
      {...rest}
    >
      {withArrows && (
        <>
          <IconButton
            rounded
            className={clsx('ui-absolute ui-top-[50%] ui-z-10 ui-left-[-40px]', {
              'ui-translate-x-0 ui-translate-y-[-50%]': arrowsPosition === 'outside',
              'ui-translate-x-2/4 ui-translate-y-[-50%]': arrowsPosition === 'half',
              'ui-translate-x-full ui-translate-y-[-50%]': arrowsPosition === 'inside'
            })}
            size='sm'
            onClick={handlePrev}
          >
            <ArrowLeftIcon active />
          </IconButton>
          <IconButton
            rounded
            className={clsx('ui-absolute ui-top-[50%] ui-z-10 ui-right-[-40px]', {
              'ui-translate-x-0 ui-translate-y-[-50%]': arrowsPosition === 'outside',
              'ui-translate-x-[-50%] ui-translate-y-[-50%]': arrowsPosition === 'half',
              'ui-translate-x-[-100%] ui-translate-y-[-50%]': arrowsPosition === 'inside'
            })}
            size='sm'
            onClick={handleNext}
          >
            <ArrowRightIcon active />
          </IconButton>
        </>
      )}
      {withFade ? (
        <div ref={styledCarouselItemsWrapperRef} className='ui-every-child:opacity-0'>
          {parsedCarouselItems}
        </div>
      ) : (
        <div
          ref={styledCarouselItemsWrapperRef}
          className='ui-flex ui-overflow-hidden ui-snap-mandatory ui-w-full'
        >
          {parsedCarouselItems}
        </div>
      )}
      {withDots && (
        <div
          className={clsx(
            'ui-absolute ui-right-1/2 ui-translate-x-1/2 ui-flex ui-justify-center ui-mt-2 ui-rounded-[20px] ui-bg-transparent',
            {
              'ui-bottom-[-20px]': dotsPosition === 'outside',
              'ui-bottom-[-12px]': dotsPosition === 'inside'
            }
          )}
        >
          {carouselItems.map((item, index) => (
            <button
              key={index.toString().concat(item.type.toString())}
              className={clsx(
                'ui-rounded-full ui-w-[8px] ui-h-[8px] ui-mr-4 ui-cursor-pointer ui-last-of-type:ui-mr-0',
                {
                  'ui-bg-primary': index + 1 === activeIndex,
                  'ui-bg-gray-500': index + 1 !== activeIndex
                }
              )}
              onClick={() => handleClick(index + 1)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
