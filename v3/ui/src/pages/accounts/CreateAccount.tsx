import { Text, Link } from '@chakra-ui/react';
import Stake from '../../components/accounts/Stake';

export function CreateAccount() {
  return (
    <>
      <Text fontSize="lg" mb="4">
        Stake with Synthetix to enable the creation of synthetic assets on-chain. You earn yield but
        must also maintain your C-Ratio.{' '}
        <Link href="https://v3.synthetix.io" fontWeight="semibold" color="blue.400">
          Learn more
        </Link>
      </Text>
      <Stake />
    </>
  );
}
