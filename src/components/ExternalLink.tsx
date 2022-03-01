import React from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import spacings from '../styles/spacings';

interface ExternalLinkProps {
  link: string;
  text: string;
}

export const ExternalLink = ({ link, text, ...rest }: ExternalLinkProps) => {
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
    margin-right: ${spacings.margin.tiniest};
  `;
  return (
    <StyledWrapper {...rest}>
      <StyledExternalLink href={link}>{text}</StyledExternalLink>
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.73224 3.11133H10.3891V8.76818"
          stroke={colors.lightBlue.primary}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10.3891 3.11129L3.08531 10.4151"
          stroke={colors.lightBlue.primary}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </StyledWrapper>
  );
};
