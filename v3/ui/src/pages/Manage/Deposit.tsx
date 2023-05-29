import { Button, Flex, Text } from '@chakra-ui/react';
import { Amount } from '@snx-v3/Amount';
import { BorderBox } from '@snx-v3/BorderBox';
import { CollateralIcon } from '@snx-v3/icons';
import { ManagePositionContext } from '@snx-v3/ManagePositionContext';
import { NumberInput } from '@snx-v3/NumberInput';
import { PercentBadges } from '@snx-v3/PercentBadges';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { useEthBalance } from '@snx-v3/useEthBalance';
import { useTokenBalance } from '@snx-v3/useTokenBalance';
import Wei, { wei } from '@synthetixio/wei';
import { FC, useContext, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AccountCollateralType, useAccountCollateral } from '@snx-v3/useAccountCollateral';

export const DepositUi: FC<{
  accountCollateral: AccountCollateralType;
  collateralChange: Wei;
  ethBalance?: Wei;
  tokenBalance?: Wei;
  displaySymbol: string;
  symbol: string;
  setCollateralChange: (val: Wei) => void;
}> = ({
  accountCollateral,
  collateralChange,
  setCollateralChange,
  displaySymbol,
  symbol,
  tokenBalance,
  ethBalance,
}) => {
  const [activeBadge, setActiveBadge] = useState(0);
  const combinedTokenBalance = useMemo(() => {
    if (symbol !== 'WETH') {
      return tokenBalance;
    }
    if (!tokenBalance || !ethBalance) {
      return undefined;
    }
    return tokenBalance.add(ethBalance);
  }, [symbol, tokenBalance, ethBalance]);

  return (
    <Flex flexDirection="column" gap={2}>
      <Text fontSize="md" fontWeight="700">
        Deposit {displaySymbol}
      </Text>
      <Text fontSize="sm" color="gray.400">
        Take an interest-free loan against your collateral. This increases your debt and decreases
        your C-Ratio.
      </Text>
      <BorderBox display="flex" py={1} px={2} flexDirection="column">
        <Flex>
          <Text display="flex" gap={2} alignItems="center" fontWeight="600" mx="2">
            <CollateralIcon symbol={symbol} />
            {displaySymbol}
          </Text>
          <Flex flexDirection="column" justifyContent="flex-end" flexGrow={1}>
            <Flex flexDirection="column" justifyContent="flex-end" flexGrow={1}>
              <NumberInput
                InputProps={{
                  'data-testid': 'deposit amount input',
                  'data-max': combinedTokenBalance?.toString(),
                }}
                value={collateralChange}
                onChange={(value) => {
                  setActiveBadge(0);
                  setCollateralChange(value);
                }}
                max={combinedTokenBalance}
              />
              <Flex
                flexDirection="column"
                alignItems="flex-end"
                fontSize="xs"
                color="whiteAlpha.700"
              >
                {accountCollateral.availableCollateral.gt(0) ? (
                  <Flex
                    gap="1"
                    cursor="pointer"
                    onClick={() => setCollateralChange(accountCollateral.availableCollateral)}
                  >
                    <Text>Available {accountCollateral.symbol} Collateral:</Text>
                    <Amount value={accountCollateral?.availableCollateral} />
                  </Flex>
                ) : null}
                <Flex
                  gap="1"
                  cursor="pointer"
                  onClick={() => {
                    if (!tokenBalance) {
                      return;
                    }
                    setCollateralChange(tokenBalance);
                  }}
                >
                  <Text>{symbol} Balance:</Text>
                  <Amount value={tokenBalance} />
                </Flex>
                {symbol === 'WETH' ? (
                  <Flex
                    gap="1"
                    cursor="pointer"
                    onClick={() => {
                      if (!ethBalance) {
                        return;
                      }
                      setCollateralChange(ethBalance);
                    }}
                  >
                    <Text>ETH Balance:</Text>
                    <Amount value={ethBalance} />
                  </Flex>
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
            if (activeBadge === badgeNum) {
              setCollateralChange(wei(0));
              setActiveBadge(0);
              return;
            }
            setActiveBadge(badgeNum);
            setCollateralChange(combinedTokenBalance.mul(badgeNum));
          }}
          activeBadge={activeBadge}
        />
      </BorderBox>
      <Button data-testid="deposit submit" type="submit">
        Deposit {displaySymbol}
      </Button>
    </Flex>
  );
};

export const Deposit = () => {
  const { collateralChange, setCollateralChange } = useContext(ManagePositionContext);
  const params = useParams();
  const collateralType = useCollateralType(params.collateralSymbol);

  const { data: tokenBalance } = useTokenBalance(collateralType?.tokenAddress);
  const { data: ethBalance } = useEthBalance();

  const accountCollaterals = useAccountCollateral({ accountId: params.accountId });
  const accountCollateral = accountCollaterals.data?.find(
    (coll) => coll.tokenAddress === collateralType?.tokenAddress
  );

  if (!collateralType || !accountCollateral) return null;
  return (
    <DepositUi
      accountCollateral={accountCollateral}
      displaySymbol={collateralType.displaySymbol}
      tokenBalance={tokenBalance}
      ethBalance={ethBalance}
      symbol={collateralType.symbol}
      setCollateralChange={setCollateralChange}
      collateralChange={collateralChange}
    />
  );
};
