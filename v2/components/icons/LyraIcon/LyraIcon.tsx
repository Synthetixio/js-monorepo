import { IconProps, Icon } from '@chakra-ui/react';

export const LyraIcon = ({
  width = '40px',
  height = '40px',
  color = 'white',
  ...props
}: IconProps) => (
  <Icon width={width} height={height} fill="none" viewBox="0 0 40 40" {...props} color={color}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.5 22.5328C5.89653 23.151 6.64878 23.7606 8.69851 23.7577H28.6389C29.4116 23.7577 30.2834 24.3263 30.5895 25.0321L33.8959 32.7226C34.1991 33.4284 33.8172 34 33.0445 34H12.6085C11.3926 33.9242 10.2642 33.6092 9.74233 32.396L5.5 22.5328ZM22.6472 6.62388L25.9915 14.4106C26.2947 15.1193 26.1052 16.14 25.5658 16.6942L20.717 21.7716H9.69276C7.94626 21.792 6.91119 21.13 8.39528 19.5172L21.1252 6.34683C21.6617 5.79271 22.3439 5.9152 22.6472 6.62388Z"
      fill="currentColor"
    />
  </Icon>
);
