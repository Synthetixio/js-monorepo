import { Icon, IconProps } from '@chakra-ui/react';

const NotificationIcon = ({
  width = '20px',
  height = '20px',
  color = 'whiteAlpha.700',
  ...props
}: IconProps) => {
  return (
    <Icon width={width} height={height} color={color} viewBox="0 0 20 20" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.8125 4.0625C7.8125 2.85438 8.79188 1.875 10 1.875C11.2081 1.875 12.1875 2.85438 12.1875 4.0625V4.19119C14.2075 5.04464 15.625 7.04428 15.625 9.375V12.2452C15.625 12.315 15.6696 12.3769 15.7358 12.399L16.1833 12.5481C16.9696 12.8102 17.5 13.5461 17.5 14.375C17.5 15.4105 16.6605 16.25 15.625 16.25H12.7428C12.4586 17.5025 11.3385 18.4375 10 18.4375C8.66151 18.4375 7.5414 17.5025 7.25719 16.25H4.375C3.33947 16.25 2.5 15.4105 2.5 14.375C2.5 13.5461 3.0304 12.8102 3.81675 12.5481L4.33361 12.3758C4.35833 12.3676 4.375 12.3444 4.375 12.3184V9.375C4.375 7.04428 5.79254 5.04464 7.8125 4.19119V4.0625ZM15.625 15C15.9702 15 16.25 14.7202 16.25 14.375C16.25 14.0842 16.0639 13.8259 15.788 13.734L15.3405 13.5848C14.7639 13.3926 14.375 12.853 14.375 12.2452V9.375C14.375 6.95875 12.4162 5 10 5C7.58375 5 5.625 6.95875 5.625 9.375V12.3184C5.625 12.8825 5.26404 13.3833 4.72889 13.5617L4.21203 13.734C3.93611 13.8259 3.75 14.0842 3.75 14.375C3.75 14.7202 4.02982 15 4.375 15H15.625ZM11.4325 16.25H8.56751C8.80863 16.8018 9.35928 17.1875 10 17.1875C10.6407 17.1875 11.1914 16.8018 11.4325 16.25ZM10 3.125C10.4349 3.125 10.8006 3.42109 10.9065 3.82267C10.6114 3.77486 10.3086 3.75 10 3.75C9.69138 3.75 9.38857 3.77486 9.09346 3.82267C9.19941 3.42109 9.56513 3.125 10 3.125Z"
        fill="currentColor"
      />
    </Icon>
  );
};

export default NotificationIcon;
