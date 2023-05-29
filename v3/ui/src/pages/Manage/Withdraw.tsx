import { InfoOutlineIcon } from '@chakra-ui/icons';
import { Button, Flex, Text, Tooltip } from '@chakra-ui/react';
import { Amount } from '@snx-v3/Amount';
import { BorderBox } from '@snx-v3/BorderBox';
import { currency } from '@snx-v3/format';
import { CollateralIcon } from '@snx-v3/icons';
import { ManagePositionContext } from '@snx-v3/ManagePositionContext';
import { NumberInput } from '@snx-v3/NumberInput';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { useLiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { validatePosition } from '@snx-v3/validatePosition';
import Wei, { wei } from '@synthetixio/wei';
import { FC, useContext } from 'react';
import { useParams } from 'react-router-dom';

export const WithdrawUi: FC<{
  collateralChange: Wei;
  currentCollateral?: Wei;
  max?: Wei;
  displaySymbol: string;
  symbol: string;
  setCollateralChange: (val: Wei) => void;
}> = ({ collateralChange, setCollateralChange, max, displaySymbol, symbol, currentCollateral }) => {
  return (
    <Flex flexDirection="column" gap={2}>
      <Text fontSize="md" fontWeight="700">
        Undelegate {displaySymbol}
      </Text>
      <Text fontSize="sm" color="gray.400">
        Withdraw collateral. The max amount you can withdraw is based on your debt and the issuance
        ratio. To be able to withdraw all collateral you need to repay your debt first
      </Text>
      <BorderBox display="flex" py={1} px={2}>
        <Text display="flex" gap={2} alignItems="center" fontWeight="600" mx="2">
          <CollateralIcon symbol={symbol} />
          {displaySymbol}
        </Text>
        <Flex flexDirection="column" justifyContent="flex-end" flexGrow={1}>
          <NumberInput
            InputProps={{
              isRequired: true,
              'data-testid': 'withdraw amount input',
              'data-max': max?.toString(),
            }}
            value={collateralChange.abs()}
            onChange={(val) => setCollateralChange(val.mul(-1))}
            max={max}
          />
          <Flex flexDirection="column" alignItems="flex-end" fontSize="xs" color="whiteAlpha.700">
            <Flex
              gap="1"
              cursor="pointer"
              onClick={() => {
                if (!max) {
                  return;
                }
                setCollateralChange(max.mul(-1));
              }}
            >
              <Tooltip
                label={`Your total collateral balance is: ${currency(
                  currentCollateral || wei(0)
                )}. To be able to withdraw all you need to repay all your debt`}
              >
                <Text display="flex" alignItems="center" gap={1}>
                  <InfoOutlineIcon /> Max Withdrawable {displaySymbol}:
                </Text>
              </Tooltip>

              <Amount value={max} data-testid="available to withdraw" />
            </Flex>
          </Flex>
        </Flex>
      </BorderBox>
      <Button data-testid="withdraw submit" type="submit" isDisabled={!max}>
        Undelegate {displaySymbol}
      </Button>
    </Flex>
  );
};
export const Withdraw = () => {
  const { collateralChange, debtChange, setCollateralChange } = useContext(ManagePositionContext);
  const params = useParams();
  const collateralType = useCollateralType(params.collateralSymbol);
  const { data: liquidityPosition } = useLiquidityPosition({
    tokenAddress: collateralType?.tokenAddress,
    accountId: params.accountId,
    poolId: params.poolId,
  });
  if (!collateralType) return null;
  const { newDebt } = validatePosition({
    issuanceRatioD18: collateralType.issuanceRatioD18,
    collateralAmount: liquidityPosition?.collateralAmount,
    collateralValue: liquidityPosition?.collateralValue,
    debt: liquidityPosition?.debt,
    collateralChange: collateralChange,
    debtChange: debtChange,
  });
  // To get the max withdrawable collateral we look at the new debt and the issuance ratio.
  // This gives us the amount in dollar. We then divide by the collateral price.
  // To avoid the transaction failing due to small price deviations, we also apply a 2% buffer by multiplying with 0.98
  const maxCollateral = newDebt.eq(0)
    ? liquidityPosition?.collateralAmount
    : newDebt.mul(collateralType.issuanceRatioD18).div(collateralType.price).mul(0.98);

  return (
    <WithdrawUi
      displaySymbol={collateralType.displaySymbol}
      symbol={collateralType.symbol}
      setCollateralChange={setCollateralChange}
      collateralChange={collateralChange}
      currentCollateral={liquidityPosition?.collateralAmount}
      max={maxCollateral}
    />
  );
};
