import { Icon, IconProps } from '@chakra-ui/react';

export const CopyIcon = ({
  width = '12px',
  height = '12px',
  color = 'cyan.400',
  ...props
}: IconProps) => {
  return (
    <Icon width={width} height={height} color={color} viewBox="0 0 12 12" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.625 1.5A.625.625 0 0 0 3 2.125V3h-.875a.625.625 0 0 0-.625.625v6.25c0 .345.28.625.625.625h6.25c.345 0 .625-.28.625-.625V9h.875c.345 0 .625-.28.625-.625v-6.25a.625.625 0 0 0-.625-.625h-6.25ZM9 8.25h.75v-6h-6V3h4.625C8.72 3 9 3.28 9 3.625V8.25Zm-6.75-4.5v6h6v-6h-6Z"
        fill="currentColor"
      />
    </Icon>
  );
};
