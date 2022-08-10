import { Badge, Link, Text } from '@chakra-ui/react';
import { BigNumber, utils } from 'ethers';
import { useFormContext, useWatch } from 'react-hook-form';

export default function Balance({ balance }: { balance: BigNumber }) {
  // Needs a special case for ETH/wETH?
  const collateralType = useWatch({
    name: 'collateralType',
  });

  const { setValue } = useFormContext();

  return (
    <Text fontSize="xs">
      Balance: {parseFloat(utils.formatUnits(balance, collateralType.decimals)).toLocaleString()}{' '}
      {collateralType.symbol.toUpperCase()}
      {balance.eq(0) ? (
        <Link>
          <Badge
            as="button"
            ml="2"
            variant="outline"
            colorScheme="blue"
            transform="translateY(-2px)"
          >
            Buy {collateralType.symbol}
          </Badge>
        </Link>
      ) : (
        <Badge
          as="button"
          ml="2"
          variant="outline"
          colorScheme="blue"
          transform="translateY(-2px)"
          onClick={(e) => {
            e.preventDefault();
            const balanceValue = utils.formatUnits(balance, collateralType.decimals);

            setValue('amount', balanceValue);
          }}
        >
          Use Max
        </Badge>
      )}
    </Text>
  );
}
