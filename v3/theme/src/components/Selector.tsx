import { Button, ButtonProps } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

interface SelectorProps extends ButtonProps {
  active: boolean;
}

export default function Selector({
  children,
  leftIcon,
  rightIcon,
  size = 'xs',
  active,
  disabled,
  onClick,
  ...rest
}: PropsWithChildren<SelectorProps>) {
  return (
    <Button
      p={2}
      onClick={onClick}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      size={size}
      _hover={{ background: 'cyan.200', color: 'black' }}
      color={active ? 'black' : 'cyan.500'}
      variant="unstyled"
      background={active ? 'cyan.500' : 'whiteAlpha.300'}
      disabled={disabled}
      display="flex"
      justifyContent={rightIcon || leftIcon ? 'space-between' : 'center'}
      {...rest}
    >
      {children}
    </Button>
  );
}
