import { Amount } from '@snx-v3/Amount';
import { Text, Tr, Td, Button, Image } from '@chakra-ui/react';
import { useLiquidityPosition, LiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { generatePath, useNavigate } from 'react-router-dom';
import { FC } from 'react';
import { CollateralType } from '@snx-v3/useCollateralTypes';
import { useSigner } from '@snx-v3/useBlockchain';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useParams } from '@snx-v3/useParams';

const VaultRowUi: FC<{
  collateralType: CollateralType;
  liquidityPosition?: LiquidityPosition;
  isConnected: boolean;
  accountId?: string;
  poolId: string;
}> = ({ collateralType, liquidityPosition, isConnected, accountId, poolId }) => {
  const navigate = useNavigate();
  const { openConnectModal } = useConnectModal();
  const symbol = collateralType.symbol === 'WETH' ? 'ETH' : collateralType.symbol;
  return (
    <Tr>
      <Td>
        <Image alt="collateral image" width="24px" height="24px" src={collateralType.logo} />
        <Amount value={liquidityPosition ? liquidityPosition.collateralValue : '0'} prefix="$" />
        <Text fontSize="xs" opacity="0.66" mt="1">
          <Amount
            value={liquidityPosition ? liquidityPosition.collateralAmount : '0'}
            suffix={` ${symbol}`}
          />
        </Text>
      </Td>
      <Td>
        <Amount value={liquidityPosition ? liquidityPosition.debt : '0'} prefix="$" />
      </Td>
      <Td>
        <Amount value={liquidityPosition ? liquidityPosition.cRatio : '0'} suffix="%" />
        <Text fontSize="xs" opacity="0.66" mt="1">
          <Amount value={liquidityPosition ? collateralType.liquidationRatioD18 : '0'} suffix="%" />
        </Text>
      </Td>
      <Td>TODO</Td>
      <Td>
        {isConnected ? (
          <Button
            onClick={() => {
              if (accountId && liquidityPosition?.collateralAmount.gt(0)) {
                // Manage existing position
                navigate(
                  generatePath('accounts/:accountId/positions/:collateralSymbol/:poolId', {
                    accountId,
                    poolId,
                    collateralSymbol: collateralType.symbol,
                  })
                );
                return;
              }
              if (accountId && liquidityPosition?.collateralAmount.gt(0)) {
                // Deposit to existing account
                navigate(
                  generatePath('/deposit/:collateralSymbol/:poolId?accountId=:accountId', {
                    accountId,
                    poolId,
                    collateralSymbol: collateralType.symbol,
                  })
                );
                return;
              }

              // Deposit to without account. Not that it's the same deposit page, just withoput account id as query param
              navigate(
                generatePath('/deposit/:collateralSymbol/:poolId', {
                  poolId,
                  collateralSymbol: collateralType.symbol,
                })
              );
            }}
          >
            {liquidityPosition?.collateralAmount.gt(0) ? 'Manage' : 'Deposit'}
          </Button>
        ) : (
          <Button onClick={openConnectModal}>Connect</Button>
        )}
      </Td>
    </Tr>
  );
};

export const VaultRow: FC<{ collateralType: CollateralType; poolId: string }> = ({
  collateralType,
  poolId,
}) => {
  const params = useParams();

  const accountId = params.accountId;
  const { data: liquidityPosition } = useLiquidityPosition({
    accountId,
    collateral: collateralType,
    poolId,
  });
  const signer = useSigner();
  return (
    <VaultRowUi
      collateralType={collateralType}
      liquidityPosition={liquidityPosition}
      isConnected={Boolean(signer)}
      accountId={accountId}
      poolId={poolId}
    />
  );
};
