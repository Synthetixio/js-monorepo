import { Icon, IconProps } from '@chakra-ui/react';

interface ArrowRightProps extends IconProps {
  color?: string;
}

export const ArrowRight = ({
  width = '10px',
  height = '9px',
  color = '#00D1FF',
  ...props
}: ArrowRightProps) => {
  return (
    <Icon width={width} height={height} viewBox="0 0 17 16 " {...props}>
      <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12.528 7 7.164 1.636 8.578.222 16.356 8l-7.778 7.778-1.414-1.414L12.528 9H.356V7h12.172Z"
          fill={color}
        />
      </svg>
    </Icon>
  );
};
