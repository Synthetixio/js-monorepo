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
import { useTranslation } from 'react-i18next';

export function CreateSynth() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box>
      <Helmet>
        <title>{t('synths.createSynth.title')}</title>
        <meta name="description" content="Create a Synth" />
      </Helmet>
      <Box>
        <Heading size="lg" mb="8" mr="auto">
          {t('synths.createSynth.deploySynth')}
        </Heading>
        <SimpleGrid columns={2} spacing={4}>
          <FormControl mb="6">
            <FormLabel htmlFor="name">{t('common.name')}</FormLabel>
            <Input id="name" type="name" />
          </FormControl>
          <FormControl mb="6">
            <FormLabel htmlFor="ticker">{t('common.ticker')}</FormLabel>
            <Input id="ticker" type="ticker" />
          </FormControl>
        </SimpleGrid>
        <SimpleGrid columns={2} spacing={4}>
          <FormControl mb="6">
            <FormLabel htmlFor="icon">{t('synths.createSynth.iconURI')}</FormLabel>
            <Input id="icon" type="icon" />
          </FormControl>
          <FormControl mb="6">
            <FormLabel htmlFor="category">{t('common.category')}</FormLabel>
            <Input id="category" type="category" />
          </FormControl>
        </SimpleGrid>

        <FormControl mb="8">
          <FormLabel htmlFor="priceFeed">{t('synths.createSynth.priceFeedAddress')}</FormLabel>
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
        <Button
          w="100%"
          size="lg"
          colorScheme="blue"
          mb="1"
          onClick={() => navigate('/synths/example')}
        >
          {t('synths.createSynth.cta')}
        </Button>
      </Box>
    </Box>
  );
}
