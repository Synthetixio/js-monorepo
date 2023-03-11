import { Td, Text } from '@chakra-ui/react';
import { utils } from 'ethers';

interface MarketProps {
  asset: string;
  leverage: string;
  long: boolean;
}

export const Market = ({ asset, leverage, long }: MarketProps) => {
  console.log(utils.parseBytes32String(asset));
  console.log(asset, leverage, long);
  return (
    <Td border="none">
      <Text>Hello</Text>
      <Text>World</Text>
    </Td>
  );
};
