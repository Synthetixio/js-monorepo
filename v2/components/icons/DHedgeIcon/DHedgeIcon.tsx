import { IconProps, Icon } from '@chakra-ui/react';

export const DHedgeIcon = ({
  width = '40px',
  height = '40px',
  color = 'white',
  ...props
}: IconProps) => (
  <Icon width={width} height={height} fill="none" viewBox="0 0 40 40" {...props} color={color}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22.9131 4.34082L17.232 6.82632V31.1487L22.9131 28.4857V4.34082ZM32.5 17.5058L27.174 14.993V30.4093L32.5 33.1016V17.5058ZM8.00006 21.7393L13.6812 19.2538V32.7466L8.00006 35.4096V21.7393Z"
      fill="currentColor"
    />
  </Icon>
);
