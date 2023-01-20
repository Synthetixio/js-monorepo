import { ChevronDownIcon } from '@chakra-ui/icons';
import { Flex, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { CollateralType, useCollateralTypes, useCollateralType } from '@snx-v3/useCollateralTypes';
import { CollateralIcon } from '@snx-v3/icons';

export function CollateralTypeSelectorUI({
  collateralTypes,
  collateralType,
  onChange,
}: {
  collateralTypes: CollateralType[];
  collateralType?: CollateralType;
  onChange: (collateralSymbol: string) => void;
}) {
  return (
    <Menu>
      <MenuButton minHeight="48px" alignItems="center" cursor="pointer" type="button">
        <Flex>
          {collateralType ? (
            <>
              <CollateralIcon symbol={collateralType.symbol} width="24px" height="24px" />
              <Text fontWeight="600" mx="2">
                {collateralType.displaySymbol}
              </Text>
            </>
          ) : null}
          <ChevronDownIcon opacity="0.66" w="6" h="6" ml="auto" mr="2" />
        </Flex>
      </MenuButton>
      <MenuList p={1} minW="0" w="125px" bg="black" border="1px solid rgba(255,255,255,0.33)">
        {collateralTypes.map((collateral) => (
          <MenuItem
            key={collateral.symbol}
            alignItems="left"
            py={2}
            borderRadius="sm"
            flexDirection="column"
            _hover={{ bg: 'gray.800' }}
            _focus={{ bg: 'gray.800' }}
            _active={{ bg: 'gray.800' }}
            onClick={() => onChange(collateral.symbol)}
          >
            <Flex flexDirection="row">
              <CollateralIcon symbol={collateral.symbol} width="24px" height="24px" />
              <Text ml="2" fontWeight="600">
                {collateral?.displaySymbol}
              </Text>
            </Flex>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

export function CollateralTypeSelector({
  collateralSymbol,
  onChange,
}: {
  collateralSymbol?: string;
  onChange: (collateralSymbol: string) => void;
}) {
  const { data: collateralTypes = [] } = useCollateralTypes();
  const collateralType = useCollateralType(collateralSymbol);
  return (
    <CollateralTypeSelectorUI
      onChange={onChange}
      collateralType={collateralType}
      collateralTypes={collateralTypes}
    />
  );
}
