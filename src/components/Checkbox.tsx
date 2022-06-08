import React from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import { Colors } from '../types';

interface CheckboxProps {
	id: string;
	disabled?: boolean;
	label?: string;
	name?: string;
	checked?: boolean;
	onChange: (checked: boolean) => unknown;
	color?: Colors;
}

export default function Checkbox({
	id,
	disabled = false,
	label,
	name,
	checked,
	onChange,
	color,
	...rest
}: CheckboxProps) {
	return (
		<StyledContainer {...rest}>
			<HiddenCheckbox
				id={id}
				name={name}
				checked={checked}
				disabled={disabled}
				onChange={() => onChange(!checked)}
			/>
			<StyledLabel htmlFor={id}>
				<StyledCheckbox checked={checked} disabled={disabled} color={color} />
				{label && <StyledLabelText disabled={disabled}>{label}</StyledLabelText>}
			</StyledLabel>
		</StyledContainer>
	);
}

const StyledContainer = styled.div`
	display: inline-block;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
	border: 0;
	clip: rect(0 0 0 0);
	clip-path: inset(50%);
	height: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute;
	white-space: nowrap;
	width: 1px;
`;

const StyledLabel = styled.label`
	display: flex;
`;

const StyledLabelText = styled.span<{ disabled?: boolean }>`
	display: inline-block;
	cursor: pointer;
	font-family: 'Inter Bold';
	font-size: 1.2rem;
	line-height: 2.2rem;
	color: ${(attrs) => (attrs.disabled ? colors.disabled : colors.white)};
`;

const StyledCheckbox = styled.div<{ checked?: boolean; disabled?: boolean; color?: Colors }>`
	position: relative;
	display: inline-block;
	cursor: pointer;
	overflow: hidden;
	margin-right: 0.75rem;
	width: 2.2rem;
	height: 2.2rem;
	border-radius: 50%;
	${({ color }) =>
		color ? `background-color: ${colors.lightBlue}` : `background-image: ${colors.gradients.pink}`};

	${(attrs) => attrs.disabled && `filter: grayscale(100%);`}

	::before {
		content: '';
		position: absolute;
		left: 8%;
		top: 8%;
		border-radius: 50%;
		width: 84%;
		height: 84%;
		background-color: ${colors.backgroundColor};
	}

	::after {
		content: '';
		position: absolute;
		left: 27%;
		top: 27%;
		border-radius: 50%;
		width: 46%;
		height: 46%;
		${({ color }) =>
			color
				? `background-color: ${colors.lightBlue}`
				: `background-image: ${colors.gradients.pink}`};
		opacity: ${(attrs) => (attrs.checked ? '1' : '0')};
		transition: opacity 100ms ease-in-out;
	}
`;
