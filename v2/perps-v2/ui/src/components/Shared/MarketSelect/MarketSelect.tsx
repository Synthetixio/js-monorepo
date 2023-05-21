import { useState } from 'react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Flex, Menu, MenuButton, MenuList, Checkbox, Text } from '@chakra-ui/react';
import { FuturesMarketAsset } from '../../../utils';

interface MarketSelectProps {
  markets: FuturesMarketAsset[];
}

export const MarketSelect = ({ markets }: MarketSelectProps) => {
  const [activeAssets, setActiveAssets] = useState<FuturesMarketAsset[]>(markets);

  console.log(activeAssets, setActiveAssets);
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        Assets
      </MenuButton>
      <MenuList>
        {markets.map((market) => (
          <Flex>
            <Checkbox aria-label="Helo">
              <Text>{market}</Text>
            </Checkbox>
          </Flex>
        ))}
      </MenuList>
    </Menu>
  );
};
