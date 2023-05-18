import { Flex, Heading, Button, Box, Link } from '@chakra-ui/react';
import { ArrowBackIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { optimisticEthercanLink } from '../utils/constants';
import { PositionsTable } from '../components/Positions';
import { AccountActionsTable } from '../components/Actions';

export const Account: FC = () => {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <Flex flexDir="column" px={{ base: '16px', md: '40px' }} py={2}>
      <Box mt={12}>
        <Button
          variant="ghost"
          fontWeight="700"
          onClick={() => navigate('/')}
          leftIcon={<ArrowBackIcon />}
        >
          All Actions
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
          Account: {params?.walletAddress}
        </Heading>
        <ExternalLinkIcon color="cyan.500" />
      </Link>
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
