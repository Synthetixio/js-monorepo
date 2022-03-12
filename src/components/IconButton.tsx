import React from 'react';
import styled from 'styled-components';
import spacings from '../styles/spacings';

interface IconButtonProps {
  icon: JSX.Element;
  active?: boolean;
  rounded?: boolean;
  size?: 'large' | 'medium';
  text?: string;
}

export default function IconButton({
  icon,
  active,
  rounded = false,
  size = 'large',
  text,
  ...rest
}: IconButtonProps) {
  return (
    <StyledWrapper rounded={rounded}>
      <StyledButton rounded={rounded} size={size} active={active} {...rest}>
        {icon} <StyledText>{text}</StyledText>
      </StyledButton>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div<{ rounded?: IconButtonProps['rounded'] }>`
  display: inline-block;
  border: 1px solid rgba(130, 130, 149, 0.3);
  padding: 1px;
  border-radius: ${({ rounded }) => (rounded ? '30px' : '4px')};
`;

const StyledButton = styled.button<{
  rounded?: IconButtonProps['rounded'];
  size?: IconButtonProps['size'];
  active?: IconButtonProps['active'];
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  outline: 0;
  background-color: transparent;
  padding: ${({ size }) =>
    spacings.margin[size === 'large' ? 'medium' : 'small']};
  border: 0;
  border-radius: ${({ rounded }) => (rounded ? '30px' : '4px')};
  cursor: pointer;
  ${({ active }) =>
    active &&
    'background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(311.52deg, #3d464c -36.37%, #131619 62.81%)'};
`;

const StyledText = styled.span`
  color: white;
  font-family: Inter;
  font-weight: 600;
  line-height: 20px;
  margin-left: 5px;
  font-size: 1.16rem;
`;
