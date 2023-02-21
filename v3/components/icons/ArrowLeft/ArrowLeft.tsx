import { Icon, IconProps } from '@chakra-ui/react';

interface ArrowLeftProps extends IconProps {
  color?: string;
}

export const ArrowLeft = ({
  width = '12px',
  height = '12px',
  color = '#00D1FF',
  ...props
}: ArrowLeftProps) => {
  return (
    <Icon width={width} height={height} viewBox="0 0 12 12 " {...props}>
      <path
        d="M3.218 5.333h8.115v1.333H3.218l3.576 3.576-.943.943L.666 6 5.851.814l.943.943-3.576 3.576Z"
        fill={color}
      />
    </Icon>
  );
};
