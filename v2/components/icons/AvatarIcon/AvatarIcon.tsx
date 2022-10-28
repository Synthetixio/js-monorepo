import { Icon, IconProps } from '@chakra-ui/react';

export const AvatarIcon = ({ width = '24px', height = '24px', ...props }: IconProps) => {
  return (
    <Icon width={width} height={height} color="cyan.400" viewBox="0 0 24 24" fill="none" {...props}>
      <rect width="24" height="24" rx="12" fill="#E2E2F0" />
      <g clipPath="url(#avatarPath)">
        <path
          d="M12 13.5c2.84 0 5.143-2.35 5.143-5.25S14.84 3 12 3C9.16 3 6.857 5.35 6.857 8.25S9.16 13.5 12 13.5Zm3.6 1.313h-.671a6.881 6.881 0 0 1-2.929.656 6.895 6.895 0 0 1-2.929-.656H8.4c-2.981 0-5.4 2.469-5.4 5.512v1.706C3 23.118 3.864 24 4.929 24H19.07C20.136 24 21 23.118 21 22.031v-1.706c0-3.043-2.419-5.512-5.4-5.512Z"
          fill="#fff"
        />
      </g>
      <defs>
        <clipPath id="avatarPath">
          <path fill="#fff" d="M3 3h18v21H3z" />
        </clipPath>
      </defs>
    </Icon>
  );
};
