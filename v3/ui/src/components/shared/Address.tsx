import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Link, Text } from '@chakra-ui/react';
import { etherscanLink } from '@snx-v3/etherscanLink';
import { FC } from 'react';
import { useProvider } from 'wagmi';
import { prettyString } from '@snx-v3/format';

interface Props {
  address?: string;
  displayFullAddress?: boolean;
}

export const Address: FC<Props> = ({ address, displayFullAddress }) => {
  const provider = useProvider();
  if (!address) return null;

  // ENS support here?
  const addressDisplay = displayFullAddress ? address : prettyString(address);
  return (
    <Text>
      {addressDisplay}
      <Link
        href={etherscanLink({ chain: provider.network.name, address })}
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
