import { Td } from '@chakra-ui/react';

interface FundingProps {
  amount: string;
}

export const Funding = ({ amount }: FundingProps) => {
  console.log(amount);
  return <Td border="none">{amount}</Td>;
};
