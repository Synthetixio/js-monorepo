import { Amount } from '@snx-v3/Amount';
import { Button, Flex, Td, Text, Tr } from '@chakra-ui/react';
import { CollateralIcon } from '@snx-v3/icons';
import { useParams } from '@snx-v3/useParams';
import { AccountCollateralType } from '@snx-v3/useAccountCollateral';
import React from 'react';
import { useAccountCollateralUnlockDate } from '@snx-v3/useAccountCollateralUnlockDate';
import { safeImport } from '@synthetixio/safe-import';

const WithdrawModal = React.lazy(() => safeImport(() => import('@snx-v3/WithdrawModal')));

function AvailableCollateralRowUi({
  accountCollateral,
  isDisabled,
}: {
  accountCollateral: AccountCollateralType;
  isDisabled: boolean;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

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
        <Button isDisabled={isDisabled} onClick={() => setIsOpen(true)}>
          Withdraw
        </Button>
        <React.Suspense fallback={null}>
          {isOpen ? (
            <WithdrawModal
              accountCollateral={accountCollateral}
              onClose={() => setIsOpen(false)}
              isOpen={isOpen}
            />
          ) : null}
        </React.Suspense>
      </Td>
    </Tr>
  );
}

export function AvailableCollateralRow({
  accountCollateral,
}: {
  accountCollateral: AccountCollateralType;
}) {
  const { accountId } = useParams();
  const accountCollateralUnlockDate = useAccountCollateralUnlockDate({ accountId });

  return (
    <AvailableCollateralRowUi
      accountCollateral={accountCollateral}
      isDisabled={
        !accountCollateralUnlockDate.data ||
        accountCollateralUnlockDate.data.getTime() > Date.now() ||
        accountCollateral.availableCollateral.eq(0)
      }
    />
  );
}
