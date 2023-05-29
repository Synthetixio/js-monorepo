import { Icon, IconProps } from '@chakra-ui/react';

export const Tick = ({ width = '13px', height = '12px', ...props }: IconProps) => {
  return (
    <Icon width={width} height={height} viewBox="0 0 13 12" fill="none" {...props}>
      <path
        d="M5.33337 7.586L9.92937 2.9895L10.6369 3.6965L5.33337 9L2.15137 5.818L2.85837 5.111L5.33337 7.586Z"
        fill="currentColor"
      />
    </Icon>
  );
};
