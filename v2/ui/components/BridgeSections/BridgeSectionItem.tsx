import { FC, ReactNode } from 'react';
import { Box, Button, Flex, FlexProps, Image, Tag, Text, TextProps } from '@chakra-ui/react';

interface CardBridgeItemProps extends FlexProps {
  logo: string;
  label: string;
  subtitle?: string;
  description: string;
  btnText: string;
  tags?: TagItemProps[];
  handleClick: () => void;
}

export interface TagItemProps {
  label: string;
  bgColor: string;
}
const BridgeSectionItem: FC<CardBridgeItemProps> = ({
  logo,
  label,
  subtitle,
  description,
  btnText,
  tags,
  handleClick,
  ...props
}) => {
  return (
    <Flex
      flex={1}
      flexDirection="column"
      p={{ base: '18px', sm: '24px' }}
      borderRadius="base"
      borderWidth="1px"
      borderColor="gray.900"
      bg="navy.700"
      gap="24px"
      minHeight="342px"
      {...props}
    >
      <Flex flex={1} flexDirection="column" gap="24px">
        <Image src={logo} width="64px" height="64px" alt={label} />
        <Box>
          <Text fontFamily="heading" fontWeight={700} fontSize="14px" lineHeight="20px">
            {label}
          </Text>
          <Text
            color="gray.500"
            fontFamily="heading"
            fontWeight={400}
            fontSize="14px"
            lineHeight="20px"
          >
            {subtitle}
          </Text>
        </Box>
        <Content>{description}</Content>
        <Flex alignItems="center" gap={1}>
          {tags?.map((tag) => {
            return (
              <Tag
                px={2}
                py="2px"
                size="small"
                key={tag.label}
                variant="solid"
                bgColor={tag.bgColor}
                borderRadius="4px"
              >
                <Content color="white">{tag.label}</Content>
              </Tag>
            );
          })}
        </Flex>
      </Flex>
      <Button
        variant="outline"
        colorScheme="gray"
        fontFamily="heading"
        fontWeight={700}
        fontSize="14px"
        color="white"
        borderRadius="4px"
        border="1px solid"
        borderColor="gray.900"
        w="max-content"
        onClick={() => handleClick()}
      >
        {btnText}
      </Button>
    </Flex>
  );
};

export default BridgeSectionItem;

const Content = ({ children, ...props }: { children: ReactNode } & TextProps) => {
  return (
    <Text
      fontFamily="heading"
      fontWeight={400}
      fontSize="12px"
      lineHeight="16px"
      color="gray.500"
      {...props}
    >
      {children}
    </Text>
  );
};
