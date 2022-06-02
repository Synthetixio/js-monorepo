import { SVGIconProps } from './types';

export default function ArrowRightIcon({ active, onClick }: SVGIconProps) {
  return (
    <svg
      fill='none'
      height='24'
      viewBox='0 0 24 24'
      width='24'
      xmlns='http://www.w3.org/2000/svg'
      onClick={onClick}
    >
      <path
        d='M14 8L18 12L14 16'
        stroke='var(--color-primary)'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
      <path
        d='M18 12L7.6709 12'
        stroke='var(--color-primary)'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
    </svg>
  );
}
