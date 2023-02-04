import { Button, Flex, Text } from '@chakra-ui/react';
import { Amount } from '@snx-v3/Amount';
import { BorderBox } from '@snx-v3/BorderBox';
import { DollarCircle } from '@snx-v3/icons';
import { NumberInput } from '@snx-v3/NumberInput';
import { ManagePositionContext } from '@snx-v3/ManagePositionContext';
import { FC, useContext } from 'react';
import { validatePosition } from '@snx-v3/validatePosition';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { useParams } from '@snx-v3/useParams';
import { useLiquidityPosition } from '@snx-v3/useLiquidityPosition';
import Wei from '@synthetixio/wei';

const BorrowUi: FC<{
  debtChange: Wei;
  maxDebt: Wei;
  setDebtChange: (val: Wei) => void;
}> = ({ debtChange, setDebtChange, maxDebt }) => {
  return (
    <Flex flexDirection="column" gap={2}>
      <Text fontSize="md" fontWeight="700">
        Borrow snxUSD
      </Text>
      <Text fontSize="sm" color="gray.400">
        Take an interest-free loan against your collateral. This increases your debt and decreases
        your C-Ratio.
      </Text>
      <BorderBox display="flex" py={1} px={2}>
        <Text display="flex" gap={2} alignItems="center" fontWeight="600" mx="2">
          <DollarCircle />
          snxUSD
        </Text>
        <Flex flexDirection="column" justifyContent="flex-end" flexGrow={1}>
          <NumberInput
            InputProps={{ isRequired: true }}
            value={debtChange}
            onChange={(val) => setDebtChange(val)}
            max={maxDebt}
          />
          <Flex flexDirection="column" alignItems="flex-end" fontSize="xs" color="whiteAlpha.700">
            <Flex
              gap="1"
              cursor="pointer"
              onClick={() => {
                if (!maxDebt) {
                  return;
                }
                setDebtChange(maxDebt);
              }}
            >
              <Text>Max Borrow:</Text>
              <Amount value={maxDebt} />
            </Flex>
          </Flex>
        </Flex>
      </BorderBox>
      <Button type="submit">Borrow snxUSD</Button>
    </Flex>
  );
};

export const Borrow = () => {
  const { debtChange, collateralChange, setDebtChange } = useContext(ManagePositionContext);
  const params = useParams();
  const collateralType = useCollateralType(params.collateralSymbol);
  const { data: liquidityPosition } = useLiquidityPosition({
    tokenAddress: collateralType?.tokenAddress,
    accountId: params.accountId,
    poolId: params.poolId,
  });
  const { maxDebt } = validatePosition({
    issuanceRatioD18: collateralType?.issuanceRatioD18,
    collateralAmount: liquidityPosition?.collateralAmount,
    collateralValue: liquidityPosition?.collateralValue,
    debt: liquidityPosition?.debt,
    collateralChange: collateralChange,
    debtChange: debtChange,
  });
  return <BorrowUi setDebtChange={setDebtChange} debtChange={debtChange} maxDebt={maxDebt} />;
};
