import { FC, PropsWithChildren, ReactNode } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Heading, Text, Box, Flex, FlexProps } from '@chakra-ui/react';

const SmartLink: FC<PropsWithChildren<{ to?: string; href?: string; isExternal: boolean }>> = ({
  to,
  href,
  isExternal,
  children,
}) => {
  if (to) {
    return <ReactRouterLink to={to}>{children}</ReactRouterLink>;
  }
  return (
    <a href={href} target={isExternal ? '_blank' : undefined} rel="noreferrer">
      {children}
    </a>
  );
};

export const BoxLink: FC<{
  headline: string;
  subHeadline?: string;
  icon: ReactNode;
  to?: string;
  href?: string;
  isExternal?: boolean;
  containerProps?: FlexProps;
}> = ({ to, headline, subHeadline, icon, href, isExternal = false, containerProps }) => {
  return (
    <SmartLink isExternal={isExternal} href={href} to={to}>
      <Flex
        bg="navy.900"
        border="1px"
        borderColor="gray.900"
        borderRadius="base"
        justifyContent="space-between"
        p={4}
        {...containerProps}
      >
        <Box>
          <Heading fontSize="sm">{headline}</Heading>
          <Text color="whiteAlpha.700" fontSize="xs">
            {subHeadline}
          </Text>
        </Box>
        {icon}
      </Flex>
    </SmartLink>
  );
};
