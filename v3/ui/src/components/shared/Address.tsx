import { Text, Link, Tooltip } from '@chakra-ui/react';
import { FC } from 'react';
import Tenderly from '../../assets/svgs/tenderly.svg';
import Etherscan from '../../assets/svgs/etherscan.svg';

interface Props {
  address?: string;
  displayFullAddress?: boolean;
}

export const formatShortAddress = (address: string) =>
  `${address.slice(0, 6)}....${address.slice(-4)}`;

export const Address: FC<Props> = ({ address, displayFullAddress }) => {
  if (!address) return null;

  // ENS support here?
  const addressDisplay = displayFullAddress ? address : formatShortAddress(address);
  return (
    <Text>
      {addressDisplay}
      <Link display="inline-block" opacity="0.66" ml="2">
        <Tenderly width="10px" height="10px" />
      </Link>
      <Link display="inline-block" opacity="0.66" ml="2">
        <Etherscan height="10px" width="10px" />
      </Link>
    </Text>
  );
};
