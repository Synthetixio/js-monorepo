import { Td, Text } from '@chakra-ui/react';
import { utils } from 'ethers';
import { SYNTH_ICONS } from '../../../utils';

interface MarketProps {
  asset: string;
  leverage: string;
  long: boolean;
}

export const Market = ({ asset, leverage, long }: MarketProps) => {
  const marketName = utils.parseBytes32String(asset);
  // SYNTH_ICONS[]
  console.log(marketName, leverage, long);
  return (
    <Td border="none">
      <Text>Hello</Text>
      <Text>World</Text>
    </Td>
  );
};
