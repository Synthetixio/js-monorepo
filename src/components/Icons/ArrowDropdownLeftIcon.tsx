import { SVGIconProps } from './types';

export default function ArrowDropdownLeftIcon({ active, onClick, className }: SVGIconProps) {
  return (
    <svg
      className={className}
      fill='none'
      height='24'
      viewBox='0 0 24 24'
      width='24'
      xmlns='http://www.w3.org/2000/svg'
      onClick={onClick}
    >
      <path
        d='M14 16L10 12L14 8'
        stroke={active ? 'var(--color-primary)' : 'white'}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
    </svg>
  );
}
