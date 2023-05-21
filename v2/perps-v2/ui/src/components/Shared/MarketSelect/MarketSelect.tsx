import { useState } from 'react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, MenuList, Flex } from '@chakra-ui/react';
import { FuturesMarketAsset } from '../../../utils';
import { MarketCheckbox } from './MarketCheckbox';
import { CurrencyIcon } from '../../CurrencyIcon';

interface MarketSelectProps {
  markets: FuturesMarketAsset[];
}

export const MarketSelect = ({ markets }: MarketSelectProps) => {
  const [activeAssets, setActiveAssets] = useState<FuturesMarketAsset[]>([]);

  return (
    <Menu>
      <MenuButton
        color="gray.500"
        fontSize="16px"
        lineHeight="24px"
        fontWeight={400}
        width="25%"
        _hover={{
          background: 'none',
        }}
        _active={{
          background: 'none',
        }}
        textAlign="start"
        bg="none"
        borderWidth="1px"
        borderColor="gray.900"
        as={Button}
        rightIcon={<ChevronDownIcon />}
      >
        All Markets
      </MenuButton>
      <MenuList>
        <Flex
          bg="navy.900"
          p={1}
          borderColor="gray.900"
          borderWidth="1px"
          borderRadius="md"
          flexDirection="column"
        >
          <MarketCheckbox
            label="ALL"
            isChecked={activeAssets.length === 0}
            onChange={() => setActiveAssets([])}
          />
          {markets.map((market) => (
            <MarketCheckbox
              key={market}
              icon={<CurrencyIcon width="20px" height="20px" currencyKey={market} />}
              label={market}
              onChange={(e) => {
                if (activeAssets.includes(market) && !e.target.checked) {
                  const newState = activeAssets.filter((asset) => asset !== market);
                  setActiveAssets(newState);
                } else {
                  setActiveAssets([...activeAssets, market]);
                }
              }}
              isChecked={activeAssets.includes(market)}
            />
          ))}
        </Flex>
      </MenuList>
    </Menu>
  );
};
