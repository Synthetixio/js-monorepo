import { Icon, IconProps } from '@chakra-ui/react';

export const TriangleDownIcon = ({
  width = '25px',
  height = '24px',
  color = 'white',
  ...props
}: IconProps) => {
  return (
    <Icon width={width} height={height} viewBox="0 0 25 24" fill="none" color={color} {...props}>
      <path d="M12.3564 16L6.35645 10H18.3564L12.3564 16Z" fill="currentColor" />
    </Icon>
  );
};
