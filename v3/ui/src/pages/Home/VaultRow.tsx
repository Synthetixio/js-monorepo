import { Amount } from '@snx-v3/Amount';
import { Button, Flex, Td, Text, Tr } from '@chakra-ui/react';
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
        <Flex flexDir="row" py={4}>
          <CollateralIcon width="40px" height="40px" symbol={collateralType.symbol} />
          <Flex flexDirection="column" justifyContent="center" ml={2}>
            <Text fontSize="sm" color="gray.700" lineHeight="20px" fontWeight="500">
              {liquidityPosition?.collateralValue.gt(0) ? (
                <Amount value={liquidityPosition.collateralValue} prefix="$" />
              ) : (
                '$200'
              )}
            </Text>
            <Text fontSize="xs" color="gray.500">
              {liquidityPosition?.collateralValue.gt(0) && (
                <Amount value={liquidityPosition.collateralAmount} />
              )}
              {collateralType.symbol}
            </Text>
          </Flex>
        </Flex>
      </Td>
      <Td>
        {liquidityPosition?.debt.gt(0) ? <Amount value={liquidityPosition.debt} prefix="$" /> : '-'}
      </Td>
      <Td>
        {liquidityPosition?.cRatio.gt(0) ? (
          <Amount value={liquidityPosition.cRatio.mul(100)} suffix="%" />
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
      <Td textAlign="end">
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
  const { accountId } = useParams();

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
