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
  secondaryBackgroundColor?: string;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  type,
  text,
  size,
  variant,
  secondaryBackgroundColor,
  disabled,
  ...rest
}) => {
  return (
    <StyledButtonBorder disabled={disabled} variant={variant}>
      <StyledButton
        type={type}
        {...rest}
        disabled={disabled}
        variant={variant}
        secondaryBackgroundColor={secondaryBackgroundColor}
        size={size}
      >
        <StyledButtonText variant={variant} disabled={disabled} size={size}>
          {text}
        </StyledButtonText>
      </StyledButton>
    </StyledButtonBorder>
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

const determineVariant = (
  variant: ButtonProps['variant'],
  disabled?: boolean
) => {
  if (disabled) return 'rgba(86, 86, 99, 0.6);';
  switch (variant) {
    case 'tertiary':
      return `${colors.darkBlue.primary}`;
    default:
      return `${colors.gradients.lightBlue}`;
  }
};

const StyledButtonBorder = styled.div<{
  disabled: ButtonProps['disabled'];
  variant?: ButtonProps['variant'];
}>`
  display: flex;
  justify-content: center;
  border-radius: 4px;
  padding: 4px;
  background: ${({ variant, disabled }) => determineVariant(variant, disabled)};
  ${({ disabled }) => disabled && `border: 2px solid ${colors.disabled}`};
`;

const StyledButton = styled.button<{
  disabled?: ButtonProps['disabled'];
  variant?: ButtonProps['variant'];
  secondaryBackgroundColor?: ButtonProps['secondaryBackgroundColor'];
  size?: ButtonProps['size'];
}>`
  outline: 0;
  min-height: ${theme.rem};
  text-align: center;
  border: 0;
  background: ${({ variant, disabled, secondaryBackgroundColor }) =>
    variant === 'secondary' && !disabled ? secondaryBackgroundColor : 'none'};
  border-radius: 4px;
  cursor: pointer;
  padding: ${({ size }) => determinePadding(size)};
  height: ${({ size }) => determineHeight(size)};
  width: 100%;
`;

const StyledButtonText = styled.span<{
  disabled?: ButtonProps['disabled'];
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
}>`
  font-size: ${({ size }) => determineFontSize(size)};
  font-family: ${fonts.interBold};
  line-height: 17px;
  font-weight: bold;
  ${({ variant }) => variant === 'tertiary' && 'color: whitey'};
  ${({ disabled }) => disabled && `color: ${colors.disabled}`};
  ${({ variant, disabled }) =>
    variant === 'secondary' &&
    !disabled &&
    `background-image: ${colors.gradients.lightBlue} background-size: 100%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; -moz-background-clip: text; -moz-text-fill-color: transparent;`}
`;
