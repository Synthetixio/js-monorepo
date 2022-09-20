import { Icon, IconProps } from '@chakra-ui/react';

export const InfoOutline = ({
  width = '20px',
  height = '20px',
  color = 'white',
  ...props
}: IconProps) => {
  return (
    <Icon width={width} height={height} fill="none" viewBox="0 0 20 20" color={color} {...props}>
      <path
        d="M9.33264 12.2275H7.65487V13.4719H12.7993V12.2275H11.0438V7.91638H7.82153V9.16082H9.33264V12.2275Z"
        fill="currentColor"
      />
      <path d="M9.11042 7.19416H11.066V5.4386H9.11042V7.19416Z" fill="currentColor" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.3332 9.99996C18.3332 14.6023 14.6022 18.3333 9.99984 18.3333C5.39746 18.3333 1.6665 14.6023 1.6665 9.99996C1.6665 5.39759 5.39746 1.66663 9.99984 1.66663C14.6022 1.66663 18.3332 5.39759 18.3332 9.99996ZM17.0832 9.99996C17.0832 13.912 13.9119 17.0833 9.99984 17.0833C6.08782 17.0833 2.9165 13.912 2.9165 9.99996C2.9165 6.08794 6.08782 2.91663 9.99984 2.91663C13.9119 2.91663 17.0832 6.08794 17.0832 9.99996Z"
        fill="currentColor"
      />
    </Icon>
  );
};
