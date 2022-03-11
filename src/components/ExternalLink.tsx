import React from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import ArrowLinkOffIcon from './Icons/ArrowLinkOffIcon';

interface ExternalLinkProps {
  link: string;
  text: string;
}

export default function ExternalLink({
  link,
  text,
  ...rest
}: ExternalLinkProps) {
  return (
    <StyledWrapper {...rest}>
      <StyledExternalLink href={link}>{text}</StyledExternalLink>
      <ArrowLinkOffIcon active={true} />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledExternalLink = styled.a.attrs({
  target: '_blank',
  rel: 'noreferrer noopener',
})`
  text-decoration: none;
  color: ${colors.lightBlue.primary};
  font-family: Inter;

  :hover {
    color: ${colors.lightBlue.dark.darker20};
  }
`;
