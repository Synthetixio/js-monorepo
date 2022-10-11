import { Text, Link } from '@chakra-ui/react';
import { Stake } from '../../components/accounts/Stake';

export function CreateAccount() {
  return (
    <>
      <Text fontSize="lg" mb="4">
        Stake with Synthetix to back synthetic assets on-chain. You earn yield but must also
        maintain your C-Ratio.{' '}
        <Link href="https://snx-v3-docs.vercel.app" fontWeight="semibold" color="cyan.500">
          Learn more
        </Link>
      </Text>
      <Stake />
    </>
  );
}
