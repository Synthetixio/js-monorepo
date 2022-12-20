import { Button, ButtonProps } from '@chakra-ui/react';
import { cloneElement, PropsWithChildren, ReactElement } from 'react';

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
  let rightIconCloned: ReactElement | undefined;
  let leftIconCloned: ReactElement | undefined;
  if (rightIcon) {
    rightIconCloned = cloneElement(rightIcon, { w: 3, h: 3 });
  }
  if (leftIcon) {
    leftIconCloned = cloneElement(leftIcon, { w: 3, h: 3 });
  }
  return (
    <Button
      p={2}
      onClick={onClick}
      leftIcon={leftIconCloned}
      rightIcon={rightIconCloned}
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
