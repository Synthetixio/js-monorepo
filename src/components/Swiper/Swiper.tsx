import clsx from 'clsx';
import { IconButton } from 'components/IconButton/IconButton';
import ArrowLeftIcon from 'components/Icons/ArrowLeftIcon';
import ArrowRightIcon from 'components/Icons/ArrowRightIcon';
import { ReactElement } from 'react';
import { Navigation, Pagination } from 'swiper';
import {
  Swiper as SwiperReact,
  SwiperProps as SwiperReactProps,
  SwiperSlide,
  SwiperSlideProps,
  useSwiper
} from 'swiper/react';

export interface SwiperProps extends SwiperReactProps {
  className?: string;
  spaceBetween?: number;
  slidesPerView?: number;
  slides: ReactElement[];
  slideProps?: SwiperSlideProps;
}

export const Swiper: React.FC<SwiperProps> = ({
  className,
  slides,
  spaceBetween = 50,
  slidesPerView = 3,
  slideProps,
  ...props
}) => {
  return (
    <SwiperReact
      className={clsx(className, 'ui-relative')}
      modules={[Navigation, Pagination]}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }}
      pagination={{ clickable: true }}
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
      {...props}
    >
      {slides.map((slide, i) => (
        <SwiperSlide key={i} {...slideProps}>
          {slide}
        </SwiperSlide>
      ))}
      <SlideButton />
      <SlideButton next />
    </SwiperReact>
  );
};

const SlideButton = ({ next = false }: { next?: boolean }) => {
  const swiper = useSwiper();

  return (
    <IconButton
      rounded
      className={clsx('ui-absolute ui-top-1/2 ui-z-10 ui--translate-y-1/2', {
        'ui-right-0 swiper-button-next': next,
        'ui-left-0 swiper-button-prev': !next
      })}
      size='md'
      variant='gray'
      onClick={() => (next ? swiper.slideNext() : swiper.slidePrev())}
    >
      {!next ? <ArrowLeftIcon active /> : <ArrowRightIcon active />}
    </IconButton>
  );
};
