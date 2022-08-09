import React from 'react';
import Stake from './Stake';
import { Text, Link } from '@chakra-ui/react';

export default function CreateAccount() {
  return (
    <>
      <Text fontSize="lg" mb="4">
        Stake with Synthetix to enable the creation of synthetic assets on-chain. You earn yield but
        must also maintain your C-Ratio.{' '}
        <Link href="https://snx-v3-docs.netlify.app/" fontWeight="semibold" color="blue.400">
          Learn more
        </Link>
      </Text>
      <Stake />
    </>
  );
}
