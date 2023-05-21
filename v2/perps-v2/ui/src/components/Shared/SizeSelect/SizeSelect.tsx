import { useState } from 'react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Flex, Menu, MenuButton, MenuList, Checkbox, Text } from '@chakra-ui/react';
import { FuturesMarketAsset } from '../../../utils';

interface SizeSelect {
  markets: FuturesMarketAsset[];
}

export const SizeSelect = ({ markets }: SizeSelect) => {
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
