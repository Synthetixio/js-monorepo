import { Icon, IconProps } from '@chakra-ui/react';

export const Gmx = ({ width = '300px', height = '300px', ...props }: IconProps) => (
  <Icon width={width} height={height} {...props} viewBox="0 0 300 300">
    <defs>
      <linearGradient x1="53.6%" y1="2.66482543%" x2="1.1%" y2="99.9316187%" id="linearGradient-1">
        <stop stopColor="#03D1CF" stopOpacity="0.988" offset="0%"></stop>
        <stop stopColor="#4E09F8" offset="100%"></stop>
      </linearGradient>
    </defs>
    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="Artboard" transform="translate(-1698.000000, -1905.000000)">
        <g id="Gmx" transform="translate(1698.000000, 1905.000000)">
          <circle id="Oval" fill="#FFFFFF" cx="150" cy="150" r="150"></circle>
          <g id="group" transform="translate(38.000000, 48.000000)" fillRule="nonzero">
            <rect
              id="BASE"
              fillOpacity="0"
              fill="#FFFFFF"
              x="0"
              y="0"
              width="223"
              height="173"
            ></rect>
            <polygon
              id="Path_1591"
              fill="url(#linearGradient-1)"
              points="211.67138 161.490735 111.916658 11.728447 11.8531102 161.490735 151.260753 161.490735 111.916658 104.330729 92.3997566 134.027352 71.6435181 134.027352 111.915558 74.3148623 170.158536 161.490735"
            ></polygon>
          </g>
        </g>
      </g>
    </g>
  </Icon>
);
