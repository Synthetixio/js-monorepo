import { useState } from 'react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, MenuList, Flex } from '@chakra-ui/react';
import { MarketCheckbox } from './MarketCheckbox';
import { CurrencyIcon } from '../../CurrencyIcon';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface MarketSelectProps {
  markets?: string[];
  route: string;
}

export const MarketSelect = ({ markets, route }: MarketSelectProps) => {
  const [searchParams] = useSearchParams();
  const initialState = searchParams.get('markets')?.split(',') || [];

  const [activeAssets, setActiveAssets] = useState<string[]>(initialState);

  const navigate = useNavigate();

  const onClick = (markets: string) => {

    const newParams = new URLSearchParams(searchParams.toString());

    if (markets.length !== 0) {
        newParams.set('markets', markets);
    } else {
        newParams.delete('markets');
    }

    newParams.delete('page');

    navigate({
        pathname: `/${route}`,
        search: `?${newParams.toString()}`,
    });
};

  return (
    <Menu>
      <MenuButton
        color="gray.500"
        fontSize="16px"
        lineHeight="24px"
        fontWeight={400}
        width={{ base: '225px', md: '25%' }}
        minWidth="225px"
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
        {activeAssets.length === 0 ? 'All Markets' : activeAssets.join(', ')}
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
            onChange={() => {
              setActiveAssets([]);
              onClick('');
            }}
          />
          {markets?.map((market) => (
            <MarketCheckbox
              key={market}
              icon={<CurrencyIcon width={20} height={20} currencyKey={market} />}
              label={market}
              onChange={(e) => {
                if (activeAssets.includes(market) && !e.target.checked) {
                  const newState = activeAssets.filter((asset) => asset !== market);
                  setActiveAssets(newState);
                  return onClick(newState.join(','));
                } else {
                  const newState = [...activeAssets, market];
                  setActiveAssets(newState);
                  return onClick(newState.join(','));
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
