import { InfoIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { Link, Td, Text, Tooltip, Tr, useDisclosure } from '@chakra-ui/react';
import { BigNumber } from 'ethers';
import { Link as RouterLink } from 'react-router-dom';
import { formatValue } from '../../../utils/helpers';
import { currency } from '../../../utils/currency';
import { StakingPositionType } from '../../../utils/types';
import { poolsData } from '../../../utils/constants';
import { FC } from 'react';

interface Props {
  position: StakingPositionType;
  refetch: () => void;
}

export const StakingPosition: FC<Props> = ({ position, refetch }) => {
  // If the connected wallet doesn’t own this account token, remove/disable the interactivity

  const { collateralAmount: collateralAmountBN, collateralType, cRatio, debt, poolId } = position;

  const { decimals, price: priceBN, priceDecimals } = collateralType;

  const collateralAmount = formatValue(collateralAmountBN, decimals);
  const price = formatValue(priceBN!, priceDecimals!);
  const collateralValue = collateralAmount * price;

  return (
    <Tr>
      <Td py="4">
        <>
          ${currency(collateralValue)}
          <Text fontSize="xs" opacity="0.66" mt="1'">
            {currency(collateralAmount)} SNX
          </Text>
        </>
      </Td>
      <Td py="4">
        ${currency(debt.toString())}
        <Text fontSize="xs" opacity="0.66" mt="1'">
          $X snxUSD minted {/* or burned */}
        </Text>
      </Td>
      <Td py="4">
        {cRatio.eq(0) ? (
          <>
            No Debt&nbsp;
            <Tooltip label="You will have a C-Ratio once you’ve accrued some debt. You are not currently at risk of liquidation.">
              <InfoIcon fontSize="sm" ml={1} />
            </Tooltip>
          </>
        ) : (
          cRatio.toString() + `%`
        )}
        <Text fontSize="xs" opacity="0.66" mt="1'">
          {formatValue(collateralType!.minimumCRatio!.mul(BigNumber.from(100)), 6).toFixed(0)}% Min.
        </Text>
      </Td>

      <Td>
        {poolsData[position.poolId.toString()]?.name}{' '}
        <Text fontSize="xs" opacity="0.66" mt="1'">
          ID: {poolId}
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
          <ExternalLinkIcon />
        </Link>
      </Td>
    </Tr>
  );
};
