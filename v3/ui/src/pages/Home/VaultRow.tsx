import { Amount } from '@snx-v3/Amount';
import { Button, Td, Text, Tr } from '@chakra-ui/react';
import { LiquidityPosition, useLiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { createSearchParams, generatePath, NavigateFunction, useNavigate } from 'react-router-dom';
import { FC } from 'react';
import { CollateralType } from '@snx-v3/useCollateralTypes';
import { useIsConnected } from '@snx-v3/useBlockchain';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useParams } from '@snx-v3/useParams';
import { CollateralIcon } from '@snx-v3/icons';

function VaultRowUi({
  collateralType,
  liquidityPosition,
  accountId,
  poolId,
  navigate,
  isConnected,
  openConnectModal,
}: {
  collateralType: CollateralType;
  liquidityPosition?: LiquidityPosition;
  accountId?: string;
  poolId: string;
  navigate: NavigateFunction;
  isConnected: boolean;
  openConnectModal?: () => void;
}) {
  const hasLiquidity = accountId && liquidityPosition && liquidityPosition.collateralAmount.gt(0);

  return (
    <Tr>
      <Td>
        <CollateralIcon width="24px" height="24px" symbol={collateralType.symbol} />
        {liquidityPosition?.collateralValue.gt(0) ? (
          <Amount value={liquidityPosition.collateralValue} prefix="$" />
        ) : (
          '-'
        )}
        <Text fontSize="xs" opacity="0.66" mt="1">
          {liquidityPosition?.collateralValue.gt(0) ? (
            <Amount
              value={liquidityPosition.collateralAmount}
              suffix={` ${collateralType.displaySymbol}`}
            />
          ) : (
            '-'
          )}
        </Text>
      </Td>
      <Td>
        {liquidityPosition?.debt.gt(0) ? <Amount value={liquidityPosition.debt} prefix="$" /> : '-'}
      </Td>
      <Td>
        {liquidityPosition?.cRatio.gt(0) ? (
          <Amount value={liquidityPosition.cRatio} suffix="%" />
        ) : (
          '-'
        )}
      </Td>
      <Td>
        <Amount value={collateralType.issuanceRatioD18.mul(100)} suffix="%" />
      </Td>
      <Td>
        <Amount value={collateralType.liquidationRatioD18.mul(100)} suffix="%" />
      </Td>
      <Td>
        {isConnected && hasLiquidity ? (
          <Button
            onClick={() =>
              navigate(
                generatePath('/accounts/:accountId/positions/:collateralSymbol/:poolId', {
                  accountId,
                  poolId,
                  collateralSymbol: collateralType.symbol,
                })
              )
            }
          >
            Manage
          </Button>
        ) : null}

        {isConnected && !hasLiquidity ? (
          <Button
            onClick={() =>
              navigate({
                pathname: generatePath('/deposit/:collateralSymbol/:poolId', {
                  poolId: poolId,
                  collateralSymbol: collateralType.symbol,
                }),
                search: accountId ? createSearchParams({ accountId }).toString() : '',
              })
            }
          >
            Deposit
          </Button>
        ) : null}

        {!isConnected && openConnectModal ? (
          <Button onClick={openConnectModal}>Connect</Button>
        ) : null}
      </Td>
    </Tr>
  );
}

export const VaultRow: FC<{ collateralType: CollateralType; poolId: string }> = ({
  collateralType,
  poolId,
}) => {
  const params = useParams();
  const accountId = params.accountId;
  const { data: liquidityPosition } = useLiquidityPosition({
    accountId,
    poolId,
    tokenAddress: collateralType?.tokenAddress,
  });
  const navigate = useNavigate();
  const { openConnectModal } = useConnectModal();
  const isConnected = useIsConnected();
  return (
    <VaultRowUi
      collateralType={collateralType}
      liquidityPosition={liquidityPosition}
      accountId={accountId}
      poolId={poolId}
      navigate={navigate}
      isConnected={isConnected}
      openConnectModal={openConnectModal}
    />
  );
};
