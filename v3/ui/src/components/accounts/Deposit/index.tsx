import { Box, Button } from '@chakra-ui/react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { LiquidityPositionsById } from '@snx-v3/useLiquidityPositions';
import { usePreferredPool } from '@snx-v3/usePreferredPool';
import { useAccount } from '@snx-v3/useBlockchain';
import { DepositForm } from './DepositForm';

export function Deposit({
  accountId,
  liquidityPositions = {},
  refetch,
}: {
  accountId?: string;
  liquidityPositions?: LiquidityPositionsById;
  refetch?: () => void;
}) {
  const { data: collateralTypes } = useCollateralTypes();
  const { data: preferredPool } = usePreferredPool();
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  return (
    <>
      {collateralTypes && collateralTypes.length > 0 && preferredPool ? (
        <DepositForm
          accountId={accountId}
          liquidityPositions={liquidityPositions}
          onSuccess={refetch}
          preferredPoolId={preferredPool.id}
          collateralTypes={collateralTypes}
        />
      ) : null}
      {collateralTypes?.length === 0 && !address ? (
        <Box textAlign="center">
          <Button size="lg" px="8" onClick={() => openConnectModal && openConnectModal()}>
            Connect Wallet
          </Button>
        </Box>
      ) : null}
    </>
  );
}
