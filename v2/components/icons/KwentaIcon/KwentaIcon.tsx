import { IconProps, Icon } from '@chakra-ui/react';

export const KwentaIcon = ({
  width = '40px',
  height = '40px',
  color = 'white',
  ...props
}: IconProps) => (
  <Icon width={width} height={height} fill="none" viewBox="0 0 40 40" {...props} color={color}>
    <path
      d="M20.0344 3.5L37.5 14.1071V24.7143L20.0344 14.1071V3.5Z"
      fill="currentColor"
      fillOpacity="0.92"
    />
    <path
      d="M20.0344 36.5L37.5 26.0001V15.5L20.0344 26.0001V36.5Z"
      fill="currentColor"
      fillOpacity="0.24"
    />
    <path
      d="M20.0344 3.5L3 14.1071V24.7143L20.0344 14.1071V3.5Z"
      fill="currentColor"
      fillOpacity="0.24"
    />
    <path
      d="M20.0344 36.5L3 26.0001V15.5L20.0344 26.0001V36.5Z"
      fill="currentColor"
      fillOpacity="0.92"
    />
  </Icon>
);
