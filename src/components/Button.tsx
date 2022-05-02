import React, { ButtonHTMLAttributes, MouseEvent, PropsWithChildren } from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import theme from '../styles/theme';

interface ButtonProps {
	type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
	size?: 'large' | 'medium' | 'small';
	variant?: 'primary' | 'secondary' | 'tertiary' | 'quaternary';
	disabled?: boolean;
	onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({
	type,
	size,
	variant,
	disabled,
	onClick,
	children,
	...rest
}: PropsWithChildren<ButtonProps>) {
	return (
		<StyledButton
			type={type}
			disabled={disabled}
			variant={variant}
			size={size}
			onClick={onClick}
			{...rest}
		>
			<StyledChildren variant={variant} disabled={disabled} size={size}>
				{children}
			</StyledChildren>
		</StyledButton>
	);
}

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

const determineVariant = (variant: ButtonProps['variant'], disabled: boolean) => {
	if (disabled) return 'rgba(86, 86, 99, 0.6);';
	switch (variant) {
		case 'tertiary':
			return colors.purple;
		case 'secondary':
			return 'none';
		case 'quaternary':
			return 'none';
		default:
			return colors.gradients.lightBlue;
	}
};

const StyledButton = styled.button<{
	disabled?: ButtonProps['disabled'];
	variant?: ButtonProps['variant'];
	size?: ButtonProps['size'];
}>`
	width: 100%;
	min-height: ${theme.rem};
	height: ${({ size }) => determineHeight(size)};
	outline: 0;
	border: ${({ variant }) =>
		variant === 'quaternary' ? '1px solid rgba(130, 130, 149, 0.3)' : '0'};
	text-align: center;
	background: ${({ variant, disabled }) => determineVariant(variant, !!disabled)};
	cursor: pointer;
	border-radius: 2.5px;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.9);
	position: relative;
	${({ variant, disabled }) => {
		if (variant === 'secondary' && !disabled)
			return `::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			border-radius: 2.5px;
			border: 2.5px solid transparent;
			background: ${colors.gradients.lightBlue} border-box;
			-webkit-mask: ${colors.gradients.lightBlue} padding-box,
			${colors.gradients.lightBlue};
			-webkit-mask-composite: destination-out;
			mask-composite: exclude;
		}`;
		else if (disabled)
			return `::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			border-radius: 2.5px;
			border: 2.5px solid transparent;
			background: ${colors.gradients.grey} border-box;
			-webkit-mask: ${colors.gradients.grey} padding-box,
			${colors.gradients.grey};
			-webkit-mask-composite: destination-out;
			mask-composite: exclude;
	}`;
		return;
	}}
`;

const StyledChildren = styled.span<{
	disabled?: ButtonProps['disabled'];
	variant?: ButtonProps['variant'];
	size?: ButtonProps['size'];
}>`
	font-size: 1rem;
	font-family: ${fonts.interBold};
	line-height: 17px;
	font-weight: bold;
	${({ variant }) => (variant === 'tertiary' || variant === 'quaternary') && 'color: white'};
	${({ disabled }) => disabled && `color: ${colors.disabled}`};
	${({ variant, disabled }) =>
		variant === 'secondary' &&
		!disabled &&
		`background-image: ${colors.gradients.lightBlue}; 
		background-size: 100%; 
		-webkit-background-clip: text; 
		-webkit-text-fill-color: transparent;
		-moz-background-clip: text;
		-moz-text-fill-color: transparent;`}
`;
