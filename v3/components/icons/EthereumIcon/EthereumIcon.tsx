import { Icon, IconProps } from '@chakra-ui/react';

interface EthereumIconProps extends IconProps {
  fill?: string;
}

export const EthereumIcon = ({
  width = '24px',
  height = '24px',
  fill = '#627EEA',
}: EthereumIconProps) => {
  return (
    <Icon width={width} height={height} viewBox="0 0 30 30" fill="none">
      <g clipPath="url(#a)">
        <path
          d="M15 30c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15C6.716 0 0 6.716 0 15c0 8.284 6.716 15 15 15Z"
          fill={fill}
        />
        <path d="M15.467 3.75v8.316l7.028 3.14L15.467 3.75Z" fill="#fff" fillOpacity=".602" />
        <path d="m15.467 3.75-7.03 11.456 7.03-3.14V3.75Z" fill="#fff" />
        <path d="M15.467 20.595v5.65l7.033-9.73-7.033 4.08Z" fill="#fff" fillOpacity=".602" />
        <path d="M15.467 26.245v-5.651l-7.03-4.08 7.03 9.731Z" fill="#fff" />
        <path d="m15.467 19.287 7.028-4.08-7.028-3.14v7.22Z" fill="#fff" fillOpacity=".2" />
        <path d="m8.438 15.206 7.029 4.081v-7.22l-7.03 3.14Z" fill="#fff" fillOpacity=".602" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h30v30H0z" />
        </clipPath>
      </defs>
    </Icon>
  );
};
