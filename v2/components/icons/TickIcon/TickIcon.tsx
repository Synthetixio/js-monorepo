import { Icon, IconProps } from '@chakra-ui/react';

export const TickIcon = ({
  width = '16px',
  height = '16px',
  color = 'success',
  ...props
}: IconProps) => {
  return (
    <Icon width={width} height={height} viewBox="0 0 16 15" fill="none" color={color} {...props}>
      <path
        d="M6.72 9.763l-2.605-2.6L3 8.276 6.72 12l6.88-6.885L12.487 4 6.72 9.763z"
        fill="currentColor"
      />
    </Icon>
  );
};
