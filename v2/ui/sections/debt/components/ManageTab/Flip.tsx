import type { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { RepeatIcon } from '@chakra-ui/icons';
import styled from 'styled-components';

export const Flip: FC<{ to: string }> = ({ to }) => {
  return (
    <Link to={to} style={{}}>
      <RepeatIcon style={{ width: '100%', height: '100%' }} />
    </Link>
  );
};

const Link = styled(RouterLink)`
  margin-top: -38px;
  width: 32px;
  height: 32px;
  border-radius: 32px;
  background: #06061b;
  color: rgb(0, 209, 255);
  padding: 6px;
  box-sizing: content-box;
  transition: transform 0ms;

  &:hover {
    transform: rotate(-180deg);
    transition-duration: 200ms;
  }
`;
