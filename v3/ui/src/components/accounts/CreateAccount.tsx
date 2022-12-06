import { Deposit } from './Deposit';
import { Text, Link } from '@chakra-ui/react';

export default function CreateAccount() {
  return (
    <>
      <Text fontSize="lg" mb="4">
        Deposit with Synthetix to back synthetic assets on-chain. You can earn yield but must
        maintain your collateralization ratio.{' '}
        <Link href="https://snx-v3-docs.vercel.app" fontWeight="semibold" color="cyan.500">
          Learn more
        </Link>
      </Text>
      <Deposit />
    </>
  );
}
