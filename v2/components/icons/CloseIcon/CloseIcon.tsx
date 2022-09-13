import { Icon, IconProps } from '@chakra-ui/react';

export const CloseIcon = ({
  color = 'black',
  width = '24px',
  height = '24px',
  ...props
}: IconProps) => {
  return (
    <Icon width={width} height={height} viewBox="0 0 24 24" fill="none" color={color} {...props}>
      <path
        d="M12 10.586L16.95 5.63599L18.364 7.04999L13.414 12L18.364 16.95L16.95 18.364L12 13.414L7.04999 18.364L5.63599 16.95L10.586 12L5.63599 7.04999L7.04999 5.63599L12 10.586Z"
        fill="currentColor"
      />
    </Icon>
  );
};
