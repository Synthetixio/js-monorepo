import React, { FormEventHandler, HTMLAttributes } from 'react';
import styled from 'styled-components';

import colors from '../styles/colors';

interface TextInputProps extends HTMLAttributes<HTMLDivElement> {
	id: string;
	disabled?: boolean;
	label?: string;
	name?: string;
	placeholder?: string;
	size?: 'medium' | 'small';
	value: string;
	onInput: FormEventHandler<HTMLInputElement>;
	icon?: JSX.Element;
	autocomplete?: string;
}

export default function TextInput({
	id,
	disabled = false,
	label,
	onInput,
	placeholder,
	size = 'medium',
	value,
	name,
	icon,
	autocomplete = 'off',
	...rest
}: TextInputProps) {
	return (
		<StyledInputWrapper {...rest}>
			<StyledTextInput
				id={id}
				disabled={disabled}
				onInput={onInput}
				placeholder={placeholder}
				inputSize={size}
				value={value}
				name={name}
				autoComplete={autocomplete}
			/>
			{label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}
			{icon && icon}
		</StyledInputWrapper>
	);
}

const StyledInputWrapper = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
`;

const StyledLabel = styled.label`
	order: 1;
	display: inline-block;
	padding-bottom: 6px;
	line-height: 1;
	font-size: 1rem;
	color: ${colors.grey};
	cursor: pointer;
`;

const sizes = {
	medium: {
		padding: '13px 23px',
		borderSize: '2px',
	},
	small: {
		padding: '6px 12px',
		borderSize: '1px',
	},
};

const StyledTextInput = styled.input.attrs(() => ({
	type: 'text',
}))<{ inputSize: NonNullable<TextInputProps['size']> }>`
	order: 2;
	display: block;
	padding: ${({ inputSize }) => sizes[inputSize].padding};
	border: ${({ inputSize }) => sizes[inputSize].borderSize} solid ${colors.grey}4C;
	border-radius: 4px;
	color: ${colors.white};
	font-size: 1.17rem;
	line-height: 2rem;
	outline: none;
	background-color: ${colors.backgroundColor};

	&:focus,
	&:active {
		border-color: ${colors.lightBlue};
	}

	&:focus + ${StyledLabel}, &:active + ${StyledLabel} {
		color: ${colors.lightBlue};
	}

	&:disabled {
		color: ${colors.disabled};
		border-color: ${colors.disabled};
		background-color: ${colors.disabled}95;
	}

	&:disabled + ${StyledLabel} {
		color: ${colors.disabled};
	}
`;
