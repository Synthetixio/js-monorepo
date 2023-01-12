import { Amount } from '@snx-v3/Amount';
import { Button, Image, Td, Text, Tr } from '@chakra-ui/react';
import { LiquidityPosition, useLiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { createSearchParams, generatePath, NavigateFunction, useNavigate } from 'react-router-dom';
import { FC } from 'react';
import { CollateralType } from '@snx-v3/useCollateralTypes';
import { useIsConnected } from '@snx-v3/useBlockchain';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useParams } from '@snx-v3/useParams';

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
  const symbol = collateralType.symbol === 'WETH' ? 'ETH' : collateralType.symbol;
  const hasLiquidity = accountId && liquidityPosition && liquidityPosition.collateralAmount.gt(0);

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
    collateral: collateralType,
    poolId,
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
