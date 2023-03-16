import { Icon, IconProps } from '@chakra-ui/react';

export const Chainlink = ({ width = '300px', height = '300px' }: IconProps) => {
  return (
    <Icon width={width} height={height} viewBox="0 0 300 300" fill="none">
      <g clipPath="url(#clip0_1_101)">
        <path
          d="M150 300C232.843 300 300 232.843 300 150C300 67.1573 232.843 0 150 0C67.1573 0 0 67.1573 0 150C0 232.843 67.1573 300 150 300Z"
          fill="#2A5ADA"
        />
        <g clipPath="url(#clip1_1_101)">
          <path
            d="M150 48.1504L168.518 58.7986L218.981 87.9653L237.5 98.6134V199.539L218.981 210.188L168.056 239.354L149.537 250.002L131.018 239.354L81.0184 210.188L62.4999 199.539V98.6134L81.0184 87.9653L131.481 58.7986L150 48.1504V48.1504ZM200.463 178.243V119.91L150 90.743L99.5369 119.91V178.243L150 207.41L200.463 178.243Z"
            fill="white"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_1_101">
          <rect width="300" height="300" fill="white" />
        </clipPath>
        <clipPath id="clip1_1_101">
          <rect
            width="175"
            height="201.852"
            fill="white"
            transform="matrix(-1 0 0 1 237.5 48.1504)"
          />
        </clipPath>
      </defs>
    </Icon>
  );
};
