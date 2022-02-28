import styled from 'styled-components';
import React, { ButtonHTMLAttributes, FC } from 'react';
import { theme } from '..';
import { rem } from '../constants';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ButtonProps {
  text: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  size?: 'large' | 'medium' | 'small';
  variant?: 'primary' | 'secondary' | 'tertiary';
  fullWidth?: boolean;
}

const Button: FC<ButtonProps> = ({
  type,
  text,
  size,
  fullWidth,
  variant,
  ...rest
}) => {
  const StyledButton = styled.button`
    outline: 0;
    width: ${fullWidth ? '100%' : 'auto'};
    min-height: ${theme.rem};
    height: ${determineHeight(size)};
    padding: ${determinePadding(size)};
    text-align: center;
    background: ${determineVariant(variant)};
    border: 0px;
    border-radius: 4px;
    cursor: pointer;
  `;

  const StyledButtonText = styled.span`
    font-size: ${determineFontSize(size)};
    opacity: ${variant === 'secondary' ? '0;' : '1;'};
    font-family: ${fonts.interBold};
    line-height: 17px;
    font-weight: bold;
    // TODO @MF font family not registered
  `;

  return (
    <StyledButton type={type} {...rest}>
      <StyledButtonText>{text}</StyledButtonText>
    </StyledButton>
  );
};

export default Button;

const determineHeight = (size: ButtonProps['size']) => {
  switch (size) {
    case 'large':
      return '50px';
    case 'medium':
      return '40px';
    case 'small':
      return '28px';
    default:
      return '40px';
  }
};

const determinePadding = (size: ButtonProps['size']) => {
  switch (size) {
    case 'large':
      return '16px 100px';
    case 'medium':
      return '11.5px 16px';
    case 'small':
      return '6.5px 10px';
    default:
      return '11.5px 16px';
  }
};

const determineFontSize = (size: ButtonProps['size']) => {
  switch (size) {
    case 'small':
      return '1rem;';
    default:
      return `${rem * 1.17}px`;
  }
};

const determineVariant = (variant: ButtonProps['variant']) => {
  switch (variant) {
    case 'primary':
      return `${colors.gradients.lightBlue}`;
    case 'secondary':
      return 'none';
    case 'tertiary':
      return `${colors.darkBlue.primary}`;
    default:
      return `${colors.gradients.lightBlue}`;
  }
};
