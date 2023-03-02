import { Button, Divider, Flex, Heading } from '@chakra-ui/react';
import { Logo } from '@snx-v3/icons';
import { FC } from 'react';

export const Header: FC = () => {
  return (
    <>
      <Flex as="header" p="2" alignItems="center" gap="4">
        <Logo />
        <Heading mr="auto">Perps Dashboard</Heading>
        <Button
          variant="outline"
          rightIcon={
            <svg
              width="9"
              height="9"
              viewBox="0 0 9 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.07952 1.47127L1.65444 1.47127L1.65444 0.304778L8.07096 0.30478L8.07097 6.7213L6.90447 6.7213L6.90448 2.29623L1.11716 8.32502L0.292206 7.50006L6.07952 1.47127Z"
                fill="#00D1FF"
              />
            </svg>
          }
        >
          Trade
        </Button>
      </Flex>
      <Divider color="cyan.500" mb="2" />
    </>
  );
};
