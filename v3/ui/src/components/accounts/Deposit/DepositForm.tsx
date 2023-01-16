import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { useIsConnected } from '@snx-v3/useBlockchain';
import { useTokenBalance } from '@snx-v3/useTokenBalance';
import { useEthBalance } from '@snx-v3/useEthBalance';
import { CollateralTypeSelector } from '@snx-v3/CollateralTypeSelector';
import { FormEvent, useCallback, useRef, useState, useMemo } from 'react';
import { createSearchParams, generatePath, useNavigate } from 'react-router-dom';
import { wei } from '@synthetixio/wei';
import { numberWithCommas } from '@snx-v2/formatters';
import { PercentBadges } from './PercentBadges';
import { Amount } from '@snx-v3/Amount';
import { useParams } from '@snx-v3/useParams';
import { DepositModal } from './DepositModal';

export function DepositForm() {
  const isConnected = useIsConnected();
  const { openConnectModal } = useConnectModal();

  const params = useParams();
  const collateralType = useCollateralType(params.collateralSymbol);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const [inputAmount, setInputAmount] = useState('');
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
      setInputAmount('');
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
            <CollateralTypeSelector
              collateralSymbol={params.collateralSymbol}
              onChange={onChangeCollateral}
            />
            <Flex flexDirection="column" justifyContent="flex-end" flexGrow={1}>
              <Input
                ref={inputRef}
                borderWidth="0px"
                type="text"
                textAlign="end"
                p={0}
                outline="none"
                fontFamily="heading"
                fontSize="xl"
                fontWeight="black"
                lineHeight="2xl"
                color="white"
                height="unset"
                autoFocus={true}
                placeholder="Enter Amount"
                _focus={{ boxShadow: 'none !important' }}
                _placeholder={{ color: 'whiteAlpha.700' }}
                required
                value={numberWithCommas(inputAmount)}
                onChange={(e) => {
                  const value = e.target.value.replaceAll(',', '');
                  setActiveBadge(0);
                  setInputAmount(value);
                  try {
                    const currentAmount = wei(value || 0);
                    if (combinedTokenBalance?.lt(currentAmount)) {
                      e.target.setCustomValidity('Insufficient balance');
                    } else if (currentAmount.gt(0)) {
                      e.target.setCustomValidity('');
                    } else {
                      e.target.setCustomValidity('Value is required');
                    }
                  } catch (_error) {
                    e.target.setCustomValidity('Invalid value');
                  }
                }}
              />
              <Flex justifyContent="flex-end" fontSize="xs">
                <Flex
                  gap="1"
                  cursor="pointer"
                  onClick={() => {
                    if (!combinedTokenBalance) {
                      return;
                    }
                    setInputAmount(combinedTokenBalance.toString());
                  }}
                >
                  <Text>Balance:</Text>
                  <Amount value={tokenBalance.data} suffix={` ${collateralType.symbol}`} />
                  {collateralType?.symbol === 'WETH' ? (
                    <Amount value={ethBalance.data} suffix={` ETH`} />
                  ) : null}
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <PercentBadges
            disabled={combinedTokenBalance ? combinedTokenBalance.eq(0) : false}
            onBadgePress={(badgeNum) => {
              if (!combinedTokenBalance) {
                return;
              }
              setActiveBadge(badgeNum);
              if (badgeNum === 1) {
                // Make sure we're not left with dust
                setInputAmount(combinedTokenBalance.toString());
              } else {
                setInputAmount(combinedTokenBalance.mul(badgeNum).toString(2));
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
