import { Button, Flex, Text } from '@chakra-ui/react';
import { Amount } from '@snx-v3/Amount';
import { BorderBox } from '@snx-v3/BorderBox';
import { DollarCircle } from '@snx-v3/icons';
import { ManagePositionContext } from '@snx-v3/ManagePositionContext';
import { NumberInput } from '@snx-v3/NumberInput';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { useLiquidityPosition } from '@snx-v3/useLiquidityPosition';
import Wei from '@synthetixio/wei';
import { FC, useContext } from 'react';
import { useParams } from 'react-router-dom';

export const RepayUi: FC<{
  debtChange: Wei;
  max?: Wei;
  setDebtChange: (val: Wei) => void;
}> = ({ debtChange, setDebtChange, max }) => {
  return (
    <Flex flexDirection="column" gap={2}>
      <Text fontSize="md" fontWeight="700">
        Repay snxUSD
      </Text>
      <Text fontSize="sm" color="gray.400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam consectetur dignissimos velit
        odio cum vitae facilis?
      </Text>
      <BorderBox display="flex" py={1} px={2}>
        <Text display="flex" gap={2} alignItems="center" fontWeight="600" mx="2">
          <DollarCircle />
          snxUSD
        </Text>
        <Flex flexDirection="column" justifyContent="flex-end" flexGrow={1}>
          <NumberInput
            InputProps={{ isRequired: true }}
            value={debtChange.abs()}
            onChange={(val) => setDebtChange(val.mul(-1))}
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
                setDebtChange(max.mul(-1));
              }}
            >
              <Text>Debt:</Text>
              <Amount value={max} />
            </Flex>
          </Flex>
        </Flex>
      </BorderBox>
      <Button type="submit">Repay snxUSD</Button>
    </Flex>
  );
};
export const Repay = () => {
  const { debtChange, setDebtChange } = useContext(ManagePositionContext);
  const params = useParams();
  const collateralType = useCollateralType(params.collateralType);
  const { data: liquidityPosition } = useLiquidityPosition({
    tokenAddress: collateralType?.tokenAddress,
    accountId: params.accountId,
    poolId: params.poolId,
  });

  return (
    <RepayUi setDebtChange={setDebtChange} debtChange={debtChange} max={liquidityPosition?.debt} />
  );
};
