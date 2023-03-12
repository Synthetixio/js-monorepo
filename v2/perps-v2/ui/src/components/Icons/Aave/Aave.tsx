import { Icon, IconProps } from '@chakra-ui/react';

export const Aave = ({ width = '300px', height = '300px', ...props }: IconProps) => (
  <Icon width={width} height={height} viewBox="0 0 300 300" fill="none" {...props}>
    <path
      d="M150 300C232.843 300 300 232.843 300 150C300 67.1573 232.843 0 150 0C67.1573 0 0 67.1573 0 150C0 232.843 67.1573 300 150 300Z"
      fill="url(#paint0_linear_22_43)"
    />
    <path
      d="M215.373 209.167L164.931 87.378C162.08 81.0847 157.866 78 152.289 78H147.828C142.251 78 138.037 81.0847 135.186 87.378L113.251 140.438H96.6416C94.2503 140.447 91.9591 141.399 90.2652 143.085C88.5714 144.771 87.6117 147.057 87.5943 149.446V149.569C87.6117 151.958 88.5714 154.244 90.2652 155.93C91.9591 157.617 94.2503 158.568 96.6416 158.577H105.563L84.6196 209.167C84.2235 210.277 84.0141 211.444 84 212.623C84 215.461 84.8675 217.682 86.4788 219.41C88.0901 221.137 90.3206 222 93.1715 222C95.0432 221.974 96.8612 221.371 98.3755 220.272C99.9868 219.161 101.102 217.557 101.97 215.706L125.022 158.575H141.01C143.402 158.566 145.693 157.615 147.387 155.929C149.08 154.242 150.04 151.956 150.058 149.567V149.321C150.04 146.932 149.08 144.646 147.387 142.959C145.693 141.273 143.402 140.322 141.01 140.313H132.459L150.058 96.5088L198.022 215.707C198.89 217.558 200.005 219.163 201.617 220.272C203.131 221.371 204.95 221.975 206.822 222C209.673 222 211.904 221.136 213.515 219.409C215.126 217.681 215.994 215.46 215.994 212.622C216.04 211.439 215.829 210.26 215.373 209.167Z"
      fill="white"
    />
    <defs>
      <linearGradient
        id="paint0_linear_22_43"
        x1="272.1"
        y1="68.1"
        x2="48.9"
        y2="255.9"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#B6509E" />
        <stop offset="1" stopColor="#2EBAC6" />
      </linearGradient>
    </defs>
  </Icon>
);
