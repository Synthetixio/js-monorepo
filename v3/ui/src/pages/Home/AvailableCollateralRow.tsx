import { Amount } from '@snx-v3/Amount';
import { Button, Flex, Td, Text, Tr } from '@chakra-ui/react';
import { CollateralIcon } from '@snx-v3/icons';

function AvailableCollateralRowUi({ accountCollateral }: { accountCollateral: any }) {
  return (
    <Tr>
      <Td>
        <Flex flexDir="row" py={4}>
          <CollateralIcon width="32px" height="32px" symbol={accountCollateral.symbol} />
          <Flex flexDirection="column" justifyContent="center" ml={2}>
            <Text fontSize="lg" color="gray.500">
              <Amount value={accountCollateral.availableCollateral} /> {accountCollateral.symbol}
            </Text>
          </Flex>
        </Flex>
      </Td>
      <Td textAlign="end">
        <Button isDisabled={true}>Withdraw</Button>
      </Td>
    </Tr>
  );
}

export function AvailableCollateralRow({ accountCollateral }: { accountCollateral: any }) {
  return <AvailableCollateralRowUi accountCollateral={accountCollateral} />;
}
