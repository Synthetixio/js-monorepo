import { SVGIconProps } from './types';

export default function ArrowLeftIcon({ active, onClick }: SVGIconProps) {
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
        d='M11 16L7 12L11 8'
        stroke={active ? 'var(--color-primary)' : 'white'}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
      <path
        d='M7 12H17.3291'
        stroke={active ? 'var(--color-primary)' : 'white'}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
    </svg>
  );
}
