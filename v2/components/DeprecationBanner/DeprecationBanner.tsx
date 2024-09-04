import { Text, Link, Alert, AlertIcon } from '@chakra-ui/react';

export const DeprecationBanner: React.FC<{
  action: string;
}> = ({ action }) => {
  return (
    <Alert textAlign="left" borderRadius="6px" colorScheme="blue" mb="6">
      <AlertIcon />
      <Text>
        {action} is being deprecated as part of the migration to Synthetix V3.{' '}
        <Link
          color="cyan.400"
          target="_blank"
          href="https://blog.synthetix.io/synthetix-v3-migration-treasury-council-initiates-transition/"
        >
          Read more about V3 Migration
        </Link>
      </Text>
    </Alert>
  );
};
