import { Text, Link, Tooltip, Image } from '@chakra-ui/react';
import { FC } from 'react';

interface Props {
  address: string;
  displayFullAddress?: boolean;
}

export const Address: FC<Props> = ({ address, displayFullAddress }) => {
  // ENS support here?
  const addressDisplay = displayFullAddress
    ? address
    : `${address.slice(0, 6)}....${address.slice(-4)}`;
  return (
    <Text>
      {addressDisplay}
      <Link display="inline-block" opacity="0.66" ml="2">
        <Tooltip label="View Account on Tenderly">
          <Image alt="tenderly" width="10" height="10" src="/tenderly.svg" />
        </Tooltip>
      </Link>
      <Link display="inline-block" opacity="0.66" ml="2">
        <Tooltip label="View Account on Etherscan">
          <Image alt="etherscan" width="10" height="10" src="/etherscan.svg" />
        </Tooltip>
      </Link>
    </Text>
  );
};
