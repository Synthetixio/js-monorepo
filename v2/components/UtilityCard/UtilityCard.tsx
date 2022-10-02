import { FC } from 'react';
import { Box, Text, Link } from '@chakra-ui/react';

interface UtilityCardProps {
  Icon: FC;
  link: string;
  title: string;
  description: string;
}

export const UtilityCard = ({ Icon, link, title, description }: UtilityCardProps) => {
  return (
    <Link
      bg="navy.900"
      p={4}
      as={Box}
      w="250px"
      href={link}
      isExternal
      borderRadius="md"
      borderWidth="1px"
      borderColor="gray.900"
      _hover={{
        textDecoration: 'none',
        opacity: 0.8,
      }}
    >
      <Icon />
      <Text fontFamily="heading" fontSize="sm" lineHeight="md" fontWeight="700" mt={1}>
        {title}
      </Text>
      <Text fontFamily="heading" fontSize="sm" lineHeight="md" color="whiteAlpha.600">
        {description}
      </Text>
    </Link>
  );
};
