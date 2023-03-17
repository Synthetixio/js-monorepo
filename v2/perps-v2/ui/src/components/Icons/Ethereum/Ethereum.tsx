import { Icon, IconProps } from '@chakra-ui/react';

export const Ethereum = ({ width = '300px', height = '300px' }: IconProps) => {
  return (
    <Icon width={width} height={height} viewBox="0 0 300 300" fill="none">
      <path
        d="M150 300C232.843 300 300 232.843 300 150C300 67.1573 232.843 0 150 0C67.1573 0 0 67.1573 0 150C0 232.843 67.1573 300 150 300Z"
        fill="#627EEA"
      />
      <path
        d="M154.67 37.5V120.656L224.954 152.063L154.67 37.5Z"
        fill="white"
        fillOpacity="0.602"
      />
      <path d="M154.669 37.5L84.375 152.063L154.669 120.656V37.5Z" fill="white" />
      <path
        d="M154.67 205.95V262.453L225.001 165.15L154.67 205.95Z"
        fill="white"
        fillOpacity="0.602"
      />
      <path d="M154.669 262.453V205.94L84.375 165.15L154.669 262.453Z" fill="white" />
      <path
        d="M154.67 192.872L224.954 152.063L154.67 120.675V192.872Z"
        fill="white"
        fillOpacity="0.2"
      />
      <path
        d="M84.375 152.063L154.669 192.872V120.675L84.375 152.063Z"
        fill="white"
        fillOpacity="0.602"
      />
    </Icon>
  );
};
