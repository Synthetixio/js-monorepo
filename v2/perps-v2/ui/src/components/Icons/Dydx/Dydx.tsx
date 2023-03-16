import { Icon, IconProps } from '@chakra-ui/react';

export const Dydx = ({ width = '300px', height = '300px' }: IconProps) => {
  return (
    <Icon width={width} height={height} viewBox="0 0 300 300" version="1.1">
      <defs>
        <linearGradient
          x1="80.9392265%"
          y1="-14.0883978%"
          x2="56.3535912%"
          y2="88.121547%"
          id="linearGradient-9rdq3wx2za-1"
        >
          <stop stopColor="#2C2C3D" offset="0%"></stop>
          <stop stopColor="#1A1A27" offset="100%"></stop>
        </linearGradient>
        <linearGradient
          x1="41.0166688%"
          y1="13.7254771%"
          x2="101.998828%"
          y2="92.7686977%"
          id="linearGradient-9rdq3wx2za-2"
        >
          <stop stopColor="#FFFFFF" offset="0%"></stop>
          <stop stopColor="#FFFFFF" stopOpacity="0.55" offset="100%"></stop>
        </linearGradient>
        <linearGradient
          x1="60.9874763%"
          y1="84.2600682%"
          x2="-8.53098406%"
          y2="-17.9786768%"
          id="linearGradient-9rdq3wx2za-3"
        >
          <stop stopColor="#6966FF" offset="0%"></stop>
          <stop stopColor="#6966FF" stopOpacity="0.36" offset="100%"></stop>
        </linearGradient>
      </defs>
      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Tokens" transform="translate(-1410.000000, -2598.000000)">
          <g id="Dydx" transform="translate(1410.000000, 2598.000000)">
            <rect
              id="Rectangle"
              fill="url(#linearGradient-9rdq3wx2za-1)"
              fillRule="nonzero"
              x="0"
              y="0"
              width="300"
              height="300"
              rx="150"
            ></rect>
            <polygon
              id="Path"
              fill="#FFFFFF"
              fillRule="nonzero"
              points="189.474033 69.6132597 72.9281768 233.688398 108.710221 233.688398 225.860221 69.6132597"
            ></polygon>
            <polygon
              id="Path"
              fill="url(#linearGradient-9rdq3wx2za-2)"
              fillRule="nonzero"
              points="112.437845 69.6132597 146.729006 117.960663 128.837901 144.332155 75.9102762 69.6132597"
            ></polygon>
            <polygon
              id="Path"
              fill="url(#linearGradient-9rdq3wx2za-3)"
              fillRule="nonzero"
              points="192.946409 233.701657 154.928785 180.227072 172.81989 154.58768 228.729282 233.701657"
            ></polygon>
            <rect id="Rectangle" x="0" y="0" width="300" height="300" rx="37"></rect>
          </g>
        </g>
      </g>
    </Icon>
  );
};
