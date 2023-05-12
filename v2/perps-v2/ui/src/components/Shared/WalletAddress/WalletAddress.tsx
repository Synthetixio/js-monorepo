import { Fade, Td } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { truncateAddress } from '../../../utils';

interface WalletAddressProps {
  account: string;
}

export const WalletAddress = ({ account }: WalletAddressProps) => {
  return (
    <Td
      border="none"
      fontSize="14px"
      lineHeight="20px"
      fontFamily="heading"
      fontWeight={500}
      textDecoration="underline"
    >
      <Link to={`/${account}`}>
        <Fade in>{truncateAddress(account)}</Fade>
      </Link>
    </Td>
  );
};
