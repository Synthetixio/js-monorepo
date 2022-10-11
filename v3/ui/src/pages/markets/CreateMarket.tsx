import { Helmet } from 'react-helmet';
import {
  Box,
  Heading,
  FormControl,
  Input,
  FormLabel,
  FormHelperText,
  SimpleGrid,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

export function CreateMarket() {
  const navigate = useNavigate();

  return (
    <Box>
      <Helmet>
        <title>Create a Market</title>
        <meta name="description" content="Create a Market" />
      </Helmet>
      <Box>
        <Heading size="lg" mb="8" mr="auto">
          Deploy a New Synth
        </Heading>
        <SimpleGrid columns={2} spacing={4}>
          <FormControl mb="6">
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input id="name" type="name" />
          </FormControl>
          <FormControl mb="6">
            <FormLabel htmlFor="ticker">Ticker</FormLabel>
            <Input id="ticker" type="ticker" />
          </FormControl>
        </SimpleGrid>
        <SimpleGrid columns={2} spacing={4}>
          <FormControl mb="6">
            <FormLabel htmlFor="icon">Icon URI</FormLabel>
            <Input id="icon" type="icon" />
          </FormControl>
          <FormControl mb="6">
            <FormLabel htmlFor="category">Category</FormLabel>
            <Input id="category" type="category" />
          </FormControl>
        </SimpleGrid>

        <FormControl mb="8">
          <FormLabel htmlFor="priceFeed">Price Feed Contract Address</FormLabel>
          <Input id="priceFeed" type="priceFeed" />
          <FormHelperText>
            This contract must implement the Synthetix Price Feed Interface.{' '}
            <u>Review the documentation</u>
          </FormHelperText>
        </FormControl>

        <Heading size="md" mb="2">
          Fees
        </Heading>
        <Text mb="4" opacity="0.66" fontStyle="italic">
          No fees will be applied when this synth is minted or burned.
        </Text>
        <Menu>
          <MenuButton
            as={Button}
            leftIcon={<AddIcon />}
            size="xs"
            colorScheme="green"
            ml="auto"
            mb="16"
          >
            Add a Fee
          </MenuButton>
          <MenuList px={2} bg="black" border="1px solid rgba(255,255,255,0.33)">
            <MenuItem
              mb={1}
              _hover={{ bg: 'gray.800' }}
              _focus={{ bg: 'gray.800' }}
              _active={{ bg: 'gray.800' }}
            >
              Flat
            </MenuItem>
            <MenuItem
              mb={1}
              _hover={{ bg: 'gray.800' }}
              _focus={{ bg: 'gray.800' }}
              _active={{ bg: 'gray.800' }}
            >
              Dynamic Exchange
            </MenuItem>
            <MenuItem
              mb={1}
              _hover={{ bg: 'gray.800' }}
              _focus={{ bg: 'gray.800' }}
              _active={{ bg: 'gray.800' }}
            >
              Simulated Liquidity
            </MenuItem>
            <MenuItem
              _hover={{ bg: 'gray.800' }}
              _focus={{ bg: 'gray.800' }}
              _active={{ bg: 'gray.800' }}
            >
              Custom
            </MenuItem>
          </MenuList>
        </Menu>
        <Button w="100%" size="lg" mb="1" onClick={() => navigate('/synths/example')}>
          Create Synth
        </Button>
      </Box>
    </Box>
  );
}
