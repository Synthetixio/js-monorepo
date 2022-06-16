import { SVGIconProps } from './types';

export default function SkipRightIcon({ active, onClick, className }: SVGIconProps) {
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
        clipRule='evenodd'
        d='M8.29289 7.29289C8.68342 6.90237 9.31658 6.90237 9.70711 7.29289L13.7071 11.2929C14.0976 11.6834 14.0976 12.3166 13.7071 12.7071L9.70711 16.7071C9.31658 17.0976 8.68342 17.0976 8.29289 16.7071C7.90237 16.3166 7.90237 15.6834 8.29289 15.2929L11.5858 12L8.29289 8.70711C7.90237 8.31658 7.90237 7.68342 8.29289 7.29289Z'
        fill={active ? 'var(--color-primary)' : 'white'}
        fillRule='evenodd'
      />
      <rect
        fill={active ? 'var(--color-primary)' : 'white'}
        height='10'
        rx='1'
        transform='rotate(-180 17 17)'
        width='2'
        x='17'
        y='17'
      />
    </svg>
  );
}
