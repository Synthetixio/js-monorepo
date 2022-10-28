import React, { PropsWithChildren } from 'react';
import { Link, LinkProps } from '@chakra-ui/react';
import { ArrowTopRight } from '@snx-v2/icons';

export const ExternalLink = ({ children, ...props }: PropsWithChildren<LinkProps>) => {
  return (
    <Link display="flex" alignItems="center" textColor="cyan.400" {...props} isExternal>
      {children}
      <ArrowTopRight ml="1" />
    </Link>
  );
};
