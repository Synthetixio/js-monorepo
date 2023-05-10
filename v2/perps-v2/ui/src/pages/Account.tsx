import { Flex, Heading, Button, Box, Link, Text } from '@chakra-ui/react';
import { ArrowBackIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { optimisticEthercanLink } from '../utils/constants';
import { PositionsTable } from '../components/Positions';
import { AccountActionsTable } from '../components/Actions';
import { useKwentaAccount } from '../hooks/useKwentaAccount';
import { usePolynomialAccount } from '../hooks/usePolynomialAccount';

export const Account: FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data: kwentaAccount } = useKwentaAccount(params?.walletAddress);
  const { data: polynomialAccount } = usePolynomialAccount(params?.walletAddress);

  return (
    <Flex flexDir="column" px="40px" py={2}>
      <Box mt={12}>
        <Button
          variant="ghost"
          fontWeight="700"
          onClick={() => navigate('/')}
          leftIcon={<ArrowBackIcon />}
        >
          Home
        </Button>
      </Box>
      <Link
        alignItems="center"
        mt={8}
        href={optimisticEthercanLink(params?.walletAddress || '')}
        target="_blank"
        display="flex"
      >
        <Heading fontSize="24px" p={0}>
          Account: {params?.walletAddress}
        </Heading>
        <ExternalLinkIcon ml={2} color="cyan.500" />
      </Link>
      {kwentaAccount && (
        <Text>
          Kwenta Smart Account:{' '}
          <Link href={`/${kwentaAccount.account}`}>{kwentaAccount.account}</Link>
        </Text>
      )}
      {polynomialAccount && (
        <Text>
          Polynomial Smart Wallet:{' '}
          <Link href={`/${polynomialAccount.account}`}>{polynomialAccount.account}</Link>
        </Text>
      )}
      <Box mt={6}>
        <Heading fontSize="18px" lineHeight="28px">
          Positions
        </Heading>
        <PositionsTable />
      </Box>
      <Box mt={6}>
        <Heading fontSize="18px" lineHeight="28px">
          Actions
        </Heading>
        <AccountActionsTable />
      </Box>
    </Flex>
  );
};

export default Account;
