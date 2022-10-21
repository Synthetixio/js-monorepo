import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Link, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { useRecoilState } from 'recoil';
import { chainIdState } from '../../utils/state';

interface Props {
  address?: string;
  displayFullAddress?: boolean;
}

export const formatShortAddress = (address: string) =>
  `${address.slice(0, 6)}....${address.slice(-4)}`;

export const Address: FC<Props> = ({ address, displayFullAddress }) => {
  const [localChainId] = useRecoilState(chainIdState);
  if (!address) return null;

  let url;
  switch (localChainId) {
    case 5:
      url = `https://goerli.etherscan.io/address/${address}`;
      break;
    case 5:
      url = `https://optimistic.etherscan.io/${address}`;
      break;
    case 420:
      url = `https://goerli-optimism.etherscan.io/address/${address}`;
      break;
    default:
      url = `https://etherscan.io/address/${address}`;
  }

  // ENS support here?
  const addressDisplay = displayFullAddress ? address : formatShortAddress(address);
  return (
    <Text>
      {addressDisplay}
      <Link
        href={url}
        isExternal
        color="cyan.500"
        ml="1.5"
        display="inline-block"
        transform="translateY(-2px)"
      >
        <ExternalLinkIcon />
      </Link>
    </Text>
  );
};
