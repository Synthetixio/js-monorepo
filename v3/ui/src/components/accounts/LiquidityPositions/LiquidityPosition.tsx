import { ArrowRightIcon } from '@chakra-ui/icons';
import { Link, Td, Text, Tr } from '@chakra-ui/react';
import { generatePath, Link as RouterLink } from 'react-router-dom';
import { FC } from 'react';
import { Amount } from '@snx-v3/Amount';
import { LiquidityPositionType } from '@snx-v3/useLiquidityPositions';

interface Props {
  position: LiquidityPositionType;
  refetch: () => void;
}

export const LiquidityPosition: FC<Props> = ({ position }) => {
  // If the connected wallet doesn't own this account token, remove/disable the interactivity
  const collateralAmount = position.collateralAmount.toNumber();
  const collateralValue = position.collateralValue.toNumber();

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
        <Amount value={position.debt.toNumber()} prefix="$" />
        <Text fontSize="xs" opacity="0.66" mt="1">
          $X net issuance
        </Text>
      </Td>
      <Td py="4">
        {position.cRatio.eq(0) ? (
          <>No Debt</>
        ) : (
          <Amount value={position.cRatio.toNumber()} suffix="%" />
        )}

        <Text fontSize="xs" opacity="0.66" mt="1">
          <Amount
            value={position.collateralType.liquidationRatioD18.mul(100).toNumber()}
            suffix="% "
          />
          Min.
        </Text>
      </Td>

      <Td>
        {position.poolName}{' '}
        <Text fontSize="xs" opacity="0.66" mt="1">
          ID: {position.poolId}
        </Text>
      </Td>
      <Td>
        <Link
          as={RouterLink}
          to={generatePath('/accounts/:accountId/positions/:collateral/:poolId', {
            accountId: position.accountId,
            collateral: position.collateralType.symbol,
            poolId: position.poolId,
          })}
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
