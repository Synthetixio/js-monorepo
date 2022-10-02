import { IconProps, Icon } from '@chakra-ui/react';

export const ThalesIcon = ({
  width = '40px',
  height = '40px',
  color = 'white',
  ...props
}: IconProps) => (
  <Icon width={width} height={height} fill="none" viewBox="0 0 40 40" {...props} color={color}>
    <path
      d="M32.2359 17.0438C32.1253 20.0515 30.104 23.3742 26.1309 25.667C25.6587 25.9585 25.3214 26.4081 25.1871 26.9248C24.8605 28.648 24.8708 30.3591 25.7709 31.9902C26.0729 32.5091 26.171 33.1119 26.0477 33.6922C25.9244 34.2726 25.5878 34.7933 25.0971 35.1627C24.656 35.5235 24.1003 35.7361 23.5172 35.7672C22.9341 35.7984 22.3565 35.6463 21.8749 35.3348C20.8052 34.6659 20.5403 33.5074 20.818 32.2471C21.1652 30.6887 21.2912 29.0964 21.4738 27.4944C21.5536 26.7325 21.5922 25.9673 21.5895 25.2016C21.5895 23.8856 22.2812 23.081 23.5002 22.4557C27.5247 20.3932 28.9314 15.9507 26.8021 12.3032C25.2849 9.70748 22.0369 8.08365 19.2133 8.51263C15.5951 9.06279 13.0081 11.2295 12.4012 14.2202C11.7506 17.4315 13.1598 20.4708 16.0503 22.1018C18.3493 23.3985 18.9305 24.5255 18.2953 26.9491C18.1875 27.2735 18.0115 27.5742 17.7778 27.8332C17.5441 28.0922 17.2574 28.3042 16.9349 28.4566C16.076 28.8128 15.1914 28.3936 14.8365 27.5356C14.3222 26.302 13.2935 25.6137 12.2392 24.8551C7.68234 21.588 6.21654 15.6405 8.69812 10.7254C9.91012 8.29254 11.9742 6.3273 14.543 5.16024C17.1119 3.99319 20.0289 3.69554 22.8033 4.31735C28.3322 5.51704 32.2899 10.2673 32.2359 17.0438Z"
      fill="currentColor"
    />
    <path
      d="M23.3478 19.391C21.5862 20.976 18.7601 20.9324 16.8622 19.2165C14.9644 17.5006 15.093 14.1027 16.6488 13.0557L23.3478 19.391Z"
      fill="currentColor"
    />
  </Icon>
);
