import { FC } from 'react';
import { Box, Text, LinkBoxProps, LinkBox, LinkOverlay } from '@chakra-ui/react';

interface UtilityCardProps extends LinkBoxProps {
  Icon: FC;
  link: string;
  title: string;
  description: string;
}

export const UtilityCard = ({ Icon, link, title, description, ...props }: UtilityCardProps) => {
  return (
    <LinkBox
      as={Box}
      bg="linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), #0B0B22"
      p={4}
      width={['100%', '260px', '260px']}
      h="fit-content"
      borderRadius="md"
      borderWidth="1px"
      borderColor="gray.900"
      _hover={{
        textDecoration: 'none',
        opacity: 0.8,
      }}
      {...props}
    >
      <Icon />
      <LinkOverlay href={link} isExternal>
        <Text fontFamily="heading" fontSize="sm" lineHeight="md" fontWeight="700" mt={1}>
          {title}
        </Text>
      </LinkOverlay>
      <Text fontFamily="heading" mt={1} fontSize="xs" lineHeight="md" color="whiteAlpha.600">
        {description}
      </Text>
    </LinkBox>
  );
};
