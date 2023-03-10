import { Flex, Heading, Button, Box, Link } from '@chakra-ui/react';
import { ArrowBackIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { ActionTable } from '../components/ActionTable';
import { optimisticEthercanLink } from '../utils/constants';
import { PositionsList } from '../components/Positions';
// import { PositionsList } from '../components/Positions';

export const Account: FC = () => {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <Flex flexDir="column" px="40px" py={2}>
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
      >
        <Heading fontSize="24px" p={0}>
          Account: {params?.walletAddress}
        </Heading>
        <ExternalLinkIcon ml={2} color="cyan.500" />
      </Link>
      <Box mt={6}>
        <Heading fontSize="18px" lineHeight="28px">
          Positions:
        </Heading>
        <PositionsList />
      </Box>
      <Box mt={6}>
        <Heading fontSize="18px" lineHeight="28px">
          Actions:
        </Heading>
        {/* <ActionTable isLoading={false} /> */}
      </Box>
    </Flex>
  );
};

export default Account;
