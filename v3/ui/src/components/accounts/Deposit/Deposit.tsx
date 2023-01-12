import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { usePreferredPool } from '@snx-v3/usePreferredPool';
import { useIsConnected } from '@snx-v3/useBlockchain';
import { useTokenBalance } from '../../../hooks/useTokenBalance';
import { CollateralTypeSelector } from '@snx-v3/CollateralTypeSelector';
import { FormEvent, useCallback, useRef, useState } from 'react';
import { createSearchParams, generatePath, useNavigate } from 'react-router-dom';
import { wei } from '@synthetixio/wei';
import { numberWithCommas } from '@snx-v2/formatters';
import { PercentBadges } from './PercentBadges';
import { Amount } from '@snx-v3/Amount';
import { useParams } from '@snx-v3/useParams';
import { DepositModal } from './DepositModal';

export function Deposit() {
  const { data: collateralTypes } = useCollateralTypes();
  const { data: preferredPool } = usePreferredPool();
  const isConnected = useIsConnected();
  const { openConnectModal } = useConnectModal();

  const params = useParams();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [activeBadge, setActiveBadge] = useState(0);

  const balanceData = useTokenBalance(collateralTypes?.[0]?.tokenAddress);

  const [isOpenDeposit, setIsOpenDeposit] = useState(false);
  const onSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (form.reportValidity()) {
      setIsOpenDeposit(true);
    }
  }, []);

  if (!isConnected) {
    return (
      <Box textAlign="center">
        <Button size="lg" px="8" onClick={() => openConnectModal && openConnectModal()}>
          Connect Wallet
        </Button>
      </Box>
    );
  }

  if (!preferredPool || !collateralTypes || !collateralTypes.length) {
    return null;
  }

  return (
    <>
      <Box as="form" bg="navy.900" mb="8" onSubmit={onSubmit}>
        <Box borderWidth="1px" borderColor="gray.900" borderRadius="base" p={2}>
          <Flex justifyContent="space-between">
            <CollateralTypeSelector
              collateralType={collateralTypes[0]}
              setCollateralType={(newCollateralType) => {
                if (newCollateralType.symbol === collateralTypes[0].symbol) return;
                setActiveBadge(0);
                setAmount('');
                inputRef.current?.focus();
                navigate({
                  pathname: generatePath('/deposit/:collateralSymbol/:poolId', {
                    poolId: poolId,
                    collateralSymbol: newCollateralType.symbol,
                  }),
                  search: params.accountId
                    ? createSearchParams({ accountId: params.accountId }).toString()
                    : '',
                });
              }}
            />
            <Flex flexDirection="column" justifyContent="flex-end" flexGrow={1}>
              <Input
                ref={inputRef}
                borderWidth="0px"
                type="text"
                inputMode="decimal"
                maxLength={18}
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
                min="0"
                required
                value={numberWithCommas(amount)}
                onChange={(e) => {
                  const value = e.target.value.replaceAll(',', '');
                  if (!/^[0-9]*(\.[0-9]{0,2})?$/.test(value)) {
                    return;
                  }
                  setActiveBadge(0);
                  setAmount(value);
                  const currentAmount = wei(value);
                  if (currentAmount.gte(balanceData.value.toBN())) {
                    e.target.setCustomValidity('Insufficient Balance');
                  } else if (currentAmount.gt(0)) {
                    e.target.setCustomValidity('');
                  } else {
                    e.target.setCustomValidity('Value is required');
                  }
                }}
              />
              <Flex justifyContent="flex-end" fontSize="xs">
                <Flex
                  cursor="pointer"
                  onClick={() => {
                    setAmount(balanceData.value.toString());
                  }}
                >
                  <Text mr={1}>Balance:</Text>
                  <Amount
                    value={balanceData.value}
                    suffix={` ${activeCollateralType.symbol.toUpperCase()}`}
                  />
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <PercentBadges
            disabled={balanceData.value.eq(0)}
            onBadgePress={(badgeNum) => {
              setActiveBadge(badgeNum);
              if (badgeNum === 1) {
                // Make sure we're not left with dust
                setAmount(balanceData.value.toString());
              } else {
                setAmount(balanceData.value.mul(badgeNum).toString(2));
              }
            }}
            activeBadge={activeBadge}
          />
        </Box>
        <Button disabled={isOpenDeposit} mt={4} size="sm" px="8" type="submit" w="full">
          Deposit Collateral
        </Button>
      </Box>

      <DepositModal
        amount={amount}
        poolId={poolId}
        collateralType={collateralTypes[0]}
        isOpen={isOpenDeposit}
        setIsOpen={setIsOpenDeposit}
      />
    </>
  );
}
