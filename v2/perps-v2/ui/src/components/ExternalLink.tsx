import { IconButton } from '@chakra-ui/react';
import { FC } from 'react';
import { Link } from 'react-router-dom';

export const ExternalLink: FC<{ to: string }> = ({ to }) => (
  <Link to={to} target="_blank" rel="noopener">
    <IconButton
      aria-label="external link"
      variant="ghost"
      icon={
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_268_1715)">
            <path
              d="M9.07955 4.47124L4.65447 4.47124L4.65447 3.30475L11.071 3.30475L11.071 9.72127L9.90451 9.72127L9.90451 5.2962L4.11719 11.325L3.29224 10.5L9.07955 4.47124Z"
              fill="#00D1FF"
            />
          </g>
          <defs>
            <clipPath id="clip0_268_1715">
              <rect width="14" height="14" fill="white" />
            </clipPath>
          </defs>
        </svg>
      }
    ></IconButton>
  </Link>
);
