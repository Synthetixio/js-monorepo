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
  const StyledButtonBorder = styled.div`
    display: flex;
    justify-content: center;
    border-radius: 4px;
    padding: 4px;
    background: ${determineVariant(variant, disabled)};
    ${disabled && `border: 2px solid ${colors.disabled}`};
  `;

  const StyledButton = styled.button`
    outline: 0;
    min-height: ${theme.rem};
    text-align: center;
    border: 0;
    background: ${variant === 'secondary' ? secondaryBackgroundColor : 'none'};
    border-radius: 4px;
    cursor: pointer;
    padding: ${determinePadding(size)};
    height: ${determineHeight(size)};
    width: 100%;
  `;

  const StyledButtonText = styled.span`
    font-size: ${determineFontSize(size)};
    font-family: ${fonts.interBold};
    line-height: 17px;
    font-weight: bold;
    ${disabled && `color: ${colors.disabled}`};
    ${variant === 'secondary' &&
    `background-image: ${colors.gradients.lightBlue} background-size: 100%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; -moz-background-clip: text; -moz-text-fill-color: transparent;`}// TODO @MF font family not registered
  `;

  return (
    <StyledButtonBorder>
      <StyledButton type={type} {...rest} disabled={disabled}>
        <StyledButtonText>{text}</StyledButtonText>
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
  disabled: boolean
) => {
  if (disabled) return 'rgba(86, 86, 99, 0.6);';
  switch (variant) {
    case 'tertiary':
      return `${colors.darkBlue.primary}`;
    default:
      return `${colors.gradients.lightBlue}`;
  }
};
