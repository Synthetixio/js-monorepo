import { Flex, Link, Text, FlexProps } from '@chakra-ui/react';
import { truncateAddress } from '../../../utils';

interface SmartWalletProps extends FlexProps {
  label: string;
  account: string;
}

export const SmartWallet = ({ label, account, ...props }: SmartWalletProps) => {
  return (
    <Flex {...props} flexDirection="column">
      <Text
        color="gray.600"
        fontSize="12px"
        lineHeight="16px"
        fontWeight={700}
        fontFamily="heading"
      >
        {label}
      </Text>
      <Link
        fontFamily="heading"
        color="gray.600"
        fontSize="12px"
        lineHeight="16px"
        href={`/${account}`}
      >
        {truncateAddress(account)}
      </Link>
    </Flex>
  );
};
