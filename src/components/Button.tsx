import styled from 'styled-components';
import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps {
  text: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  size: 'large' | 'medium' | 'small';
  variant: 'primary' | 'secondary' | 'tertiary';
}

const Button = ({ type, text, size }: ButtonProps) => {
  const determineHeight = (size: ButtonProps['size']) => {
    switch (size) {
      case 'large':
        return '4.16rem';
      case 'medium':
        return '3.33rem';
      case 'small':
        return '2.33rem';
      default:
        return '3.33rem';
    }
  };
  const StyledButton = styled.button<{ size: ButtonProps['size'] }>`
    width: 100%;
    height: ${({ size }) => determineHeight(size)};
  `;
  return (
    <StyledButton type={type} size={size}>
      {text}
    </StyledButton>
  );
};

export default Button;
