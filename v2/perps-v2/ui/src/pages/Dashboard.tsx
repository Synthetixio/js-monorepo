import { Flex, Box } from '@chakra-ui/react';
import { FC } from 'react';
import { SmallActionsTable } from '../components';
// import { useNavigate, useParams } from 'react-router-dom';

export const Dashboard: FC = () => {
  // const navigate = useNavigate();

  console.log('Home');

  return (
    <Flex flexDir="column" px="40px" py={2}>
      <Box mt={12}>All Actions</Box>
      <SmallActionsTable />
    </Flex>
  );
};

export default Dashboard;
