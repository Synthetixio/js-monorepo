import { Flex, Heading, Button, Box, Link } from '@chakra-ui/react';
import { ArrowBackIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { optimisticEthercanLink } from '../utils/constants';
import { PositionsTable } from '../components/Positions';
import { AccountActionsTable } from '../components/Actions';
import { useKwentaAccount } from '../hooks/useKwentaAccount';
import { usePolynomialAccount } from '../hooks/usePolynomialAccount';
import { useOwnerKwenta, useOwnerPolynomial } from '../hooks/useOwnerBySmartId';
import { useEnsName } from '../hooks/useEnsName';
import { SmartWallet } from '../components/Shared';

export const Account: FC = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { data: kwentaAccount } = useKwentaAccount(params?.walletAddress);
  const { data: polynomialAccount } = usePolynomialAccount(params?.walletAddress);

  const { kwentaOwner } = useOwnerKwenta(params?.walletAddress);
  const { polynomialOwner } = useOwnerPolynomial(params?.walletAddress);

  const { addressEnsName: addressEnsName } = useEnsName(params?.walletAddress);
  const { addressEnsName: kwentaEnsName } = useEnsName(kwentaOwner);
  const { addressEnsName: polynomialEnsName } = useEnsName(polynomialOwner);

  return (
    <Flex flexDir="column" px={{ base: '16px', md: '40px' }} py={2}>
      <Box mt={12}>
        <Button
          variant="ghost"
          fontWeight="700"
          onClick={() => navigate(-1)}
          leftIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
      </Box>
      <Link
        alignItems="center"
        mt={8}
        href={optimisticEthercanLink(params?.walletAddress || '')}
        target="_blank"
        display="flex"
        flexWrap={{ base: 'wrap', md: 'nowrap' }}
      >
        <Heading fontSize={{ base: '14px', md: '24px' }} p={0} mr={2}>
          Account: {addressEnsName ? addressEnsName : params?.walletAddress}
        </Heading>
        <ExternalLinkIcon color="cyan.500" />
      </Link>
      <Flex mt={8} wrap="wrap">
        {kwentaAccount && (
          <SmartWallet label="Kwenta Smart Account" account={kwentaAccount.account} />
        )}
        {kwentaOwner && (
          <SmartWallet
            label={kwentaEnsName ? kwentaEnsName : 'EOA Account'}
            account={kwentaOwner}
          />
        )}
        {polynomialOwner && (
          <SmartWallet
            label={polynomialEnsName ? polynomialEnsName : 'EOA Account'}
            account={polynomialOwner}
          />
        )}
        {polynomialAccount && (
          <SmartWallet
            ml="30px"
            label="Polynomial Smart Wallet"
            account={polynomialAccount.account}
          />
        )}
      </Flex>
      <Box mt={6}>
        <Heading fontSize="18px" lineHeight="28px">
          Positions
        </Heading>
        <PositionsTable
          kwentaAccount={kwentaAccount?.account ? kwentaAccount.account : ''}
          polynomialAccount={polynomialAccount?.account ? polynomialAccount.account : ''}
        />
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
