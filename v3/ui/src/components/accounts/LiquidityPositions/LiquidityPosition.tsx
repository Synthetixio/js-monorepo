import { ArrowRightIcon } from '@chakra-ui/icons';
import { Link, Td, Text, Tr } from '@chakra-ui/react';
import { BigNumber } from 'ethers';
import { Link as RouterLink } from 'react-router-dom';
import { formatValue } from '@snx-v3/format';
import { LiquidityPositionType } from '../../../utils/types';
import { poolsData } from '../../../utils/constants';
import { FC } from 'react';
import { Amount } from '../../shared/Amount/Amount';

interface Props {
  position: LiquidityPositionType;
  refetch: () => void;
}

export const LiquidityPosition: FC<Props> = ({ position }) => {
  // If the connected wallet doesn't own this account token, remove/disable the interactivity
  const collateralAmount = formatValue(position.collateralAmount);
  const price = position.collateralType.price ? formatValue(position.collateralType.price) : 0;
  const collateralValue = collateralAmount * price;

  return (
    <Tr>
      <Td py="4">
        <>
          <Amount value={collateralValue} prefix="$" />
          <Text fontSize="xs" opacity="0.66" mt="1">
            <Amount
              value={collateralAmount}
              suffix={`${position.collateralType.symbol.toUpperCase()} `}
            />
          </Text>
        </>
      </Td>
      <Td py="4">
        <Amount value={formatValue(position.debt, 18)} prefix="$" />
        <Text fontSize="xs" opacity="0.66" mt="1">
          $X net issuance
        </Text>
      </Td>
      <Td py="4">
        {position.cRatio.eq(0) ? <>No Debt</> : <Amount value={position.cRatio} suffix="%" />}

        <Text fontSize="xs" opacity="0.66" mt="1">
          <Amount
            value={formatValue(
              position.collateralType.liquidationRatioD18.mul(BigNumber.from(100)),
              18
            )}
            suffix="% "
          />
          Min.
        </Text>
      </Td>

      <Td>
        {poolsData[position.poolId.toString()]?.name}{' '}
        <Text fontSize="xs" opacity="0.66" mt="1">
          ID: {position.poolId}
        </Text>
      </Td>
      <Td>
        <Link
          as={RouterLink}
          to={`/accounts/${position.accountId}/positions/${position.collateralType.symbol}/${position.poolId}`}
          color="cyan.500"
          display="inline-block"
          transform="translateY(-1.5px)"
        >
          <ArrowRightIcon />
        </Link>
      </Td>
    </Tr>
  );
};
