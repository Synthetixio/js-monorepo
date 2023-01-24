import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { useIsConnected } from '@snx-v3/useBlockchain';
import { useTokenBalance } from '@snx-v3/useTokenBalance';
import { useEthBalance } from '@snx-v3/useEthBalance';
import { CollateralTypeSelector } from '@snx-v3/CollateralTypeSelector';
import { FormEvent, useCallback, useRef, useState, useMemo } from 'react';
import { createSearchParams, generatePath, useNavigate } from 'react-router-dom';
import { wei } from '@synthetixio/wei';
import { PercentBadges } from './PercentBadges';
import { Amount } from '@snx-v3/Amount';
import { useParams } from '@snx-v3/useParams';
import { DepositModal } from './DepositModal';
import { CollateralIcon } from '@snx-v3/icons';
import { NumberInput } from '@snx-v3/NumberInput';

export function DepositForm(props: { staticCollateral?: boolean }) {
  const isConnected = useIsConnected();
  const { openConnectModal } = useConnectModal();
  const params = useParams();
  const collateralType = useCollateralType(params.collateralSymbol);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const [inputAmount, setInputAmount] = useState(wei(0));
  const [amount, setAmount] = useState(wei(0));
  const [activeBadge, setActiveBadge] = useState(0);

  const tokenBalance = useTokenBalance(collateralType?.tokenAddress);
  const ethBalance = useEthBalance();

  const combinedTokenBalance = useMemo(() => {
    if (collateralType?.symbol !== 'WETH') {
      return tokenBalance.data;
    }
    if (!tokenBalance.data || !ethBalance.data) {
      return undefined;
    }
    return tokenBalance.data.add(ethBalance.data);
  }, [collateralType?.symbol, tokenBalance.data, ethBalance.data]);

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
      if (!params.poolId) {
        return;
      }
      if (`${params.collateralSymbol}`.toLowerCase() === `${collateralSymbol}`.toLowerCase()) {
        return;
      }
      setActiveBadge(0);
      setAmount(wei(0));
      setInputAmount(wei(0));
      inputRef.current?.focus();
      navigate({
        pathname: generatePath('/deposit/:collateralSymbol/:poolId', {
          poolId: params.poolId,
          collateralSymbol,
        }),
        search: params.accountId
          ? createSearchParams({ accountId: params.accountId }).toString()
          : '',
      });
    },
    [navigate, params.accountId, params.collateralSymbol, params.poolId]
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

  if (!params.poolId || !params.collateralSymbol || !collateralType) {
    return null;
  }

  return (
    <>
      <Box as="form" bg="navy.900" mb="8" onSubmit={onSubmit}>
        <Box borderWidth="1px" borderColor="gray.900" borderRadius="base" p={2}>
          <Flex justifyContent="space-between">
            <Flex alignItems="center">
              {props.staticCollateral ? (
                <>
                  <CollateralIcon symbol={collateralType.symbol} width="24px" height="24px" />
                  <Text fontWeight="600" mx="2">
                    {collateralType.displaySymbol}
                  </Text>
                </>
              ) : (
                <CollateralTypeSelector
                  collateralSymbol={params.collateralSymbol}
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
                    if (!tokenBalance.data) {
                      return;
                    }
                    setInputAmount(tokenBalance.data);
                  }}
                >
                  <Text>{collateralType.symbol} Balance:</Text>
                  <Amount value={tokenBalance.data} />
                </Flex>
                {collateralType?.symbol === 'WETH' ? (
                  <Flex
                    gap="1"
                    cursor="pointer"
                    onClick={() => {
                      if (!ethBalance.data) {
                        return;
                      }
                      setInputAmount(ethBalance.data);
                    }}
                  >
                    <Text>ETH Balance:</Text>
                    <Amount value={ethBalance.data} />
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

      {params.poolId && collateralType && amount.gt(0) ? (
        <DepositModal
          accountId={params.accountId}
          poolId={params.poolId}
          collateralType={collateralType}
          amount={amount}
          isOpen={isOpenDeposit}
          setIsOpen={setIsOpenDeposit}
        />
      ) : null}
    </>
  );
}
