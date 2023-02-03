import { Box, Divider, Flex, Text, Heading, Spinner } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Link } from '@chakra-ui/react';
import { BorderBox } from '@snx-v3/BorderBox';
import { useParams } from '@snx-v3/useParams';
import { CollateralType, useCollateralType } from '@snx-v3/useCollateralTypes';
import { FC } from 'react';
import { CollateralIcon } from '@snx-v3/icons';

import { ManageAction } from './ManageActions';
import { ManagePositionProvider } from '@snx-v3/ManagePositionContext';
import { ManageStats } from './ManageStats';

export const ManageUi: FC<{ collateralType: CollateralType }> = ({ collateralType }) => {
  return (
    <Box>
      <Link
        width="fit-content"
        display="flex"
        alignItems="center"
        color="cyan.500"
        as={ReactRouterLink}
        to="/"
        fontSize="sm"
        fontWeight={700}
        ml={2}
        mb={2}
      >
        <ArrowBackIcon mr={1} /> Account Overview
      </Link>
      <Heading fontWeight={700} fontSize="xl" display="flex" alignItems="center" gap={2}>
        <CollateralIcon symbol={collateralType.symbol} />
        {collateralType.displaySymbol} Vault
      </Heading>

      <Text color="gray.400" fontSize="sm">
        Deposit your collateral SNX to borrow snxUSD and contribute to the network collateral. If
        you’ve never staked on Synthetix V3 before, please read through this quick introduction
        first.
      </Text>
      <Divider my={8} bg="gray.900" />
      <Flex gap={4}>
        <BorderBox p={4}>
          <Text fontWeight="700" fontSize="xl">
            Manage C-Ratio
          </Text>
          <Text color="gray.400" fontSize="sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna.
          </Text>
          <ManageAction />
        </BorderBox>
        <Box minW="450px">
          <ManageStats />
        </Box>
      </Flex>
    </Box>
  );
};

export const Manage = () => {
  const params = useParams();
  const collateralType = useCollateralType(params.collateralSymbol);

  if (!collateralType) {
    return <Spinner />; // TODO skeleton
  }
  return (
    <ManagePositionProvider>
      <ManageUi collateralType={collateralType} />
    </ManagePositionProvider>
  );
};
