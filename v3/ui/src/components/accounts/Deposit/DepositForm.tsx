import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { CollateralType, useCollateralType } from '@snx-v3/useCollateralTypes';
import { useIsConnected } from '@snx-v3/useBlockchain';
import { useTokenBalance } from '@snx-v3/useTokenBalance';
import { useEthBalance } from '@snx-v3/useEthBalance';
import {
  CollateralTypeSelector,
  CollateralTypeSelectorProps,
} from '@snx-v3/CollateralTypeSelector';
import { FormEvent, useCallback, useMemo, useRef, useState } from 'react';
import { createSearchParams, generatePath, NavigateFunction, useNavigate } from 'react-router-dom';
import { Wei, wei } from '@synthetixio/wei';
import { PercentBadges } from '@snx-v3/PercentBadges';
import { Amount } from '@snx-v3/Amount';
import { useParams } from '@snx-v3/useParams';
import { DepositModal, DepositModalProps } from './DepositModal';
import { CollateralIcon } from '@snx-v3/icons';
import { NumberInput } from '@snx-v3/NumberInput';

export function DepositFormUi({
  collateralType,
  ethBalance,
  tokenBalance,
  isConnected,
  openConnectModal,
  staticCollateral,
  poolId,
  accountId,
  navigate,
  DepositModal,
  CollateralTypeSelector,
}: {
  staticCollateral?: boolean;
  openConnectModal: (() => void) | undefined;
  isConnected: boolean;
  collateralType?: CollateralType;
  tokenBalance?: Wei;
  ethBalance?: Wei;
  poolId?: string;
  accountId?: string;
  navigate: NavigateFunction;
  DepositModal: DepositModalProps;
  CollateralTypeSelector: CollateralTypeSelectorProps;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputAmount, setInputAmount] = useState(wei(0));
  const [amount, setAmount] = useState(wei(0));
  const [activeBadge, setActiveBadge] = useState(0);

  const combinedTokenBalance = useMemo(() => {
    if (collateralType?.symbol !== 'WETH') {
      return tokenBalance;
    }
    if (!tokenBalance || !ethBalance) {
      return undefined;
    }
    return tokenBalance.add(ethBalance);
  }, [collateralType?.symbol, tokenBalance, ethBalance]);

  const [isOpenDeposit, setIsOpenDeposit] = useState(false);
  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      if (!form.reportValidity()) {
        return;
      }
      setAmount(wei(inputAmount));
      setIsOpenDeposit(true);
    },
    [inputAmount]
  );

  const onChangeCollateral = useCallback(
    (collateralSymbol: string) => {
      if (!poolId) {
        return;
      }
      if (`${collateralType?.symbol}`.toLowerCase() === `${collateralSymbol}`.toLowerCase()) {
        return;
      }
      setActiveBadge(0);
      setAmount(wei(0));
      setInputAmount(wei(0));
      inputRef.current?.focus();
      navigate({
        pathname: generatePath('/deposit/:collateralSymbol/:poolId', {
          poolId: poolId,
          collateralSymbol,
        }),
        search: accountId ? createSearchParams({ accountId }).toString() : '',
      });
    },
    [navigate, accountId, collateralType?.symbol, poolId]
  );

  if (!isConnected) {
    return (
      <Box textAlign="center">
        <Button size="lg" px="8" onClick={() => openConnectModal && openConnectModal()}>
          Connect Wallet
        </Button>
      </Box>
    );
  }

  if (!poolId || !collateralType) {
    return null;
  }

  return (
    <>
      <Box as="form" bg="navy.900" mb="8" onSubmit={onSubmit}>
        <Box borderWidth="1px" borderColor="gray.900" borderRadius="base" p={2}>
          <Flex justifyContent="space-between">
            <Flex alignItems="center">
              {staticCollateral ? (
                <>
                  <CollateralIcon symbol={collateralType.symbol} width="24px" height="24px" />
                  <Text fontWeight="600" mx="2">
                    {collateralType.displaySymbol}
                  </Text>
                </>
              ) : (
                <CollateralTypeSelector
                  collateralSymbol={collateralType.symbol}
                  onChange={onChangeCollateral}
                />
              )}
            </Flex>
            <Flex flexDirection="column" justifyContent="flex-end" flexGrow={1}>
              <NumberInput
                value={inputAmount}
                onChange={(value) => {
                  setActiveBadge(0);
                  setInputAmount(value);
                }}
              />
              <Flex
                flexDirection="column"
                alignItems="flex-end"
                fontSize="xs"
                color="whiteAlpha.700"
              >
                <Flex
                  gap="1"
                  cursor="pointer"
                  onClick={() => {
                    if (!tokenBalance) {
                      return;
                    }
                    setInputAmount(tokenBalance);
                  }}
                >
                  <Text>{collateralType.symbol} Balance:</Text>
                  <Amount value={tokenBalance} />
                </Flex>
                {collateralType?.symbol === 'WETH' ? (
                  <Flex
                    gap="1"
                    cursor="pointer"
                    onClick={() => {
                      if (!ethBalance) {
                        return;
                      }
                      setInputAmount(ethBalance);
                    }}
                  >
                    <Text>ETH Balance:</Text>
                    <Amount value={ethBalance} />
                  </Flex>
                ) : null}
              </Flex>
            </Flex>
          </Flex>
          <PercentBadges
            disabled={combinedTokenBalance ? combinedTokenBalance.eq(0) : false}
            onBadgePress={(badgeNum) => {
              if (!combinedTokenBalance) {
                return;
              }
              if (activeBadge === badgeNum) {
                setInputAmount(wei(0));
                setActiveBadge(0);
                return;
              }
              setActiveBadge(badgeNum);
              if (badgeNum === 1) {
                // Make sure we're not left with dust
                setInputAmount(combinedTokenBalance);
              } else {
                setInputAmount(combinedTokenBalance.mul(badgeNum));
              }
            }}
            activeBadge={activeBadge}
          />
        </Box>
        <Button mt={4} size="sm" px="8" type="submit" w="full">
          Deposit Collateral
        </Button>
      </Box>

      {poolId && collateralType && amount.gt(0) ? (
        <DepositModal
          accountId={accountId}
          poolId={poolId}
          collateralType={collateralType}
          amount={amount}
          isOpen={isOpenDeposit}
          setIsOpen={setIsOpenDeposit}
        />
      ) : null}
    </>
  );
}

export const DepositForm = (props: { staticCollateral?: boolean }) => {
  const navigate = useNavigate();
  const isConnected = useIsConnected();
  const { openConnectModal } = useConnectModal();
  const params = useParams();
  const collateralType = useCollateralType(params.collateralSymbol);
  const tokenBalance = useTokenBalance(collateralType?.tokenAddress);
  const ethBalance = useEthBalance();
  return (
    <DepositFormUi
      staticCollateral={props.staticCollateral}
      isConnected={isConnected}
      openConnectModal={openConnectModal}
      collateralType={collateralType}
      tokenBalance={tokenBalance.data}
      ethBalance={ethBalance.data}
      poolId={params.poolId}
      accountId={params.accountId}
      navigate={navigate}
      DepositModal={DepositModal}
      CollateralTypeSelector={CollateralTypeSelector}
    />
  );
};
