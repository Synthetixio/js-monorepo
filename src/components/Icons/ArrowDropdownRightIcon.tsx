import { SVGIconProps } from './types';

export default function ArrowDropdownRightIcon({ active, onClick, className }: SVGIconProps) {
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
        d='M10 8L14 12L10 16'
        stroke={active ? 'var(--color-primary)' : 'white'}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
    </svg>
  );
}
