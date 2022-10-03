import { Icon, IconProps } from '@chakra-ui/react';

interface BridgeIconProps extends IconProps {
  color?: string;
}

export const BridgeIcon = ({
  width = '38px',
  height = '29px',
  color = 'gray.800',
  ...props
}: BridgeIconProps) => {
  return (
    <Icon width={width} height={height} viewBox="0 0 38 29" fill={color} {...props}>
      <path d="M25.725.197a.8.8 0 0 0-.928-.088c-.31.133-.486.442-.486.796V4.44h-9.724a.887.887 0 0 0-.885.884c0 .486.398.884.885.884h10.608a.887.887 0 0 0 .885-.884V2.76l8.752 6.984-8.753 6.984v-2.564a.887.887 0 0 0-.884-.884H12.818V9.746c0-.353-.176-.663-.486-.795a.987.987 0 0 0-.928.088l-11.05 8.84a.923.923 0 0 0-.354.708c0 .265.133.53.354.707l11.05 8.84a.85.85 0 0 0 .53.178c.133 0 .266-.044.398-.089.31-.132.487-.442.487-.795V23.89h9.725a.887.887 0 0 0 .884-.884.887.887 0 0 0-.884-.884h-10.61a.887.887 0 0 0-.883.884v2.564l-8.752-6.984 8.752-6.984v2.563c0 .487.398.885.884.885h12.377v3.536c0 .354.177.663.486.796.133.044.265.088.398.088.177 0 .398-.044.53-.177l11.051-8.84a.923.923 0 0 0 .354-.708.923.923 0 0 0-.354-.707L25.725.198Z" />
      <path d="M9.725 4.44a.887.887 0 0 0-.884.885c0 .486.398.884.884.884h2.21a.887.887 0 0 0 .885-.884.887.887 0 0 0-.885-.884h-2.21Z" />
      <path d="M27.405 23.89a.887.887 0 0 0 .884-.884.887.887 0 0 0-.884-.884h-2.21a.887.887 0 0 0-.884.884c0 .487.397.885.884.885h2.21Z" />
    </Icon>
  );
};
