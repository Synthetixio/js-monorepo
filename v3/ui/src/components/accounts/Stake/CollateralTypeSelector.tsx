// import { collateralTypesState } from '../../../state/index';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Box, Text, Flex, Menu, MenuButton, MenuList, MenuItem, Image } from '@chakra-ui/react';
import { useFormContext, useWatch } from 'react-hook-form';
import { CollateralType } from '../../../utils/types';

type Props = {
  collateralTypes: CollateralType[];
};

export default function CollateralTypeSelector({ collateralTypes }: Props) {
  // on loading dropdown and token amount https://chakra-ui.com/docs/components/feedback/skeleton ?

  const { setValue, register } = useFormContext();
  const selectedCollateralType = useWatch({
    name: 'collateralType',
  });

  return (
    <Menu>
      <MenuButton
        border="1px solid rgba(255,255,255,0.33)"
        borderRadius="6px"
        alignItems="center"
        cursor="pointer"
        type="button"
      >
        <Flex>
          <Box w="24px" h="24px" borderRadius="12px" overflow="hidden" ml="3.5" mr="2">
            <Image
              alt="collateral image"
              width="24"
              height="24"
              src={selectedCollateralType?.logoURI}
            />
          </Box>
          <Text fontWeight="600">{selectedCollateralType?.symbol.toUpperCase()}</Text>
          <ChevronDownIcon opacity="0.66" w="5" h="5" ml="4" mr="2" />
        </Flex>
      </MenuButton>
      <MenuList p={1} minW="0" w="125px" bg="black" border="1px solid rgba(255,255,255,0.33)">
        {Object.values(collateralTypes).map((collateralType) => (
          <MenuItem
            key={collateralType.symbol}
            alignItems="left"
            // mb={collateralTypes.length !== i + 1 && 1}
            py={2}
            borderRadius="sm"
            flexDirection="column"
            _hover={{ bg: 'gray.800' }}
            _focus={{ bg: 'gray.800' }}
            _active={{ bg: 'gray.800' }}
            {...register('collateralType')}
            onClick={() => {
              setValue('collateralType', collateralType);
            }}
          >
            <Flex flexDirection="row">
              <Box w="24px" h="24px" borderRadius="12px" overflow="hidden" mr="2">
                <Image
                  alt="collateral image"
                  width="24"
                  height="24"
                  src={collateralType?.logoURI}
                />
              </Box>
              <Text fontWeight="600">{collateralType?.symbol.toUpperCase()}</Text>
            </Flex>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
