import { Container, Flex, Text, Link } from '@chakra-ui/react';
import { DepositForm } from '../../components/accounts/Deposit';

export function CreateAccount() {
  return (
    <Flex
      height="100%"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      flex="1"
      pb="12"
    >
      <Container maxW="container.sm" pt="0" pb="24">
        <Text fontSize="lg" mb="4">
          Deposit with Synthetix to back synthetic assets on-chain. You can earn yield but must
          maintain your collateralization ratio..{' '}
          <Link href="https://snx-v3-docs.vercel.app" fontWeight="semibold" color="cyan.500">
            Learn more
          </Link>
        </Text>
        <DepositForm />
      </Container>
    </Flex>
  );
}
