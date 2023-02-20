import { Link as ReactRouterLink } from 'react-router-dom';
import { Link } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

export const HomeLink = () => {
  return (
    <Link
      width="fit-content"
      display="flex"
      alignItems="center"
      color="cyan.500"
      as={ReactRouterLink}
      to="/"
      fontSize="sm"
      fontWeight={700}
      ml={2}
      mb={2}
    >
      <ArrowBackIcon mr={1} /> Home
    </Link>
  );
};
