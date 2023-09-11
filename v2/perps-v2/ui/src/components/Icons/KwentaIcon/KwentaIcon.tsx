import { Icon, IconProps } from '@chakra-ui/icons';

export const KwentaIcon = ({ width = '25px', height = '25px', ...props }: IconProps) => (
  <Icon width={width} height={height} fill="none" {...props}>
    <svg width="25" height="25" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.5 26C20.4036 26 26 20.4036 26 13.5C26 6.59644 20.4036 1 13.5 1C6.59644 1 1 6.59644 1 13.5C1 20.4036 6.59644 26 13.5 26Z"
        fill="url(#paint0_linear_328_22)"
        stroke="#0B0B22"
      />
      <path
        d="M13.8022 5.19922L22.385 10.5286V15.858L13.8022 10.5286V5.19922Z"
        fill="url(#paint1_linear_328_22)"
      />
      <path
        d="M13.8022 21.7797L22.385 16.504V11.2285L13.8022 16.504V21.7797Z"
        fill="url(#paint2_linear_328_22)"
      />
      <path
        d="M13.802 5.19922L5.43115 10.5286V15.858L13.802 10.5286V5.19922Z"
        fill="url(#paint3_linear_328_22)"
      />
      <path
        d="M13.802 21.7797L5.43115 16.504V11.2285L13.802 16.504V21.7797Z"
        fill="url(#paint4_linear_328_22)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_328_22"
          x1="5.53125"
          y1="3.3177"
          x2="22.3542"
          y2="26.7813"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#835E34" />
          <stop offset="1" stopColor="#344548" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_328_22"
          x1="29.7037"
          y1="10.4989"
          x2="8.53915"
          y2="10.4989"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#996939" />
          <stop offset="1" stopColor="#D0A875" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_328_22"
          x1="18.0936"
          y1="21.7797"
          x2="20.2728"
          y2="1.60801"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#272728" />
          <stop offset="1" stopColor="#4B4B4B" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_328_22"
          x1="13.8537"
          y1="7.38427"
          x2="5.2854"
          y2="13.9482"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#996939" />
          <stop offset="1" stopColor="#D0A875" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_328_22"
          x1="9.61656"
          y1="21.7797"
          x2="9.61656"
          y2="11.2285"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#363636" />
          <stop offset="1" stopColor="#333232" />
        </linearGradient>
      </defs>
    </svg>
  </Icon>
);