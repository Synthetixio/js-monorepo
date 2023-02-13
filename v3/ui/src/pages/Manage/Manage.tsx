import { Box, Divider, Flex, Text, Heading, Spinner } from '@chakra-ui/react';
import { BorderBox } from '@snx-v3/BorderBox';
import { useParams } from '@snx-v3/useParams';
import { CollateralType, useCollateralType } from '@snx-v3/useCollateralTypes';
import { FC } from 'react';
import { CollateralIcon } from '@snx-v3/icons';
import { ManageAction } from './ManageActions';
import { ManagePositionProvider } from '@snx-v3/ManagePositionContext';
import { ManageStats } from './ManageStats';
import { HomeLink } from '@snx-v3/HomeLink';

export const ManageUi: FC<{ collateralType: CollateralType }> = ({ collateralType }) => {
  return (
    <Box>
      <HomeLink />
      <Heading
        fontWeight={700}
        fontSize="3xl"
        color="gray.50"
        display="flex"
        alignItems="center"
        gap={2}
      >
        <CollateralIcon
          symbol={collateralType.symbol}
          width="30px"
          height="30px"
          fill="#0B0B22"
          color="#00D1FF"
        />
        {collateralType.displaySymbol} Vault
      </Heading>
      <Text color="gray.500" fontSize="sm">
        Deposit your collateral SNX to borrow snxUSD and contribute to the network collateral. If
        you’ve never staked on Synthetix V3 before, please read through this quick introduction
        first.
      </Text>
      <Divider my={8} bg="gray.900" />
      <Flex gap={4}>
        <BorderBox p={4} flexDirection="column">
          <Text fontWeight="700" fontSize="xl" color="gray.50">
            Manage C-Ratio
          </Text>
          <Text color="gray.400" fontSize="sm">
            Your Collateralization Ratio (C-ratio) is the health of your position, and determines
            your participation in rewards. C-ratio = Collateral/Debt.
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
