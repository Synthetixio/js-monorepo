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
import { Trans, useTranslation } from 'react-i18next';

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
            <Trans i18nKey="synths.createSynth.priceFeedAddressHelp" components={[<u />]} />
          </FormHelperText>
        </FormControl>

        <Heading size="md" mb="2">
          {t('common.fees')}
        </Heading>
        <Text mb="4" opacity="0.66" fontStyle="italic">
          {t('synths.createSynth.feesInfo')}
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
            {t('synths.createSynth.addFee')}
          </MenuButton>
          <MenuList px={2} bg="black" border="1px solid rgba(255,255,255,0.33)">
            <MenuItem
              mb={1}
              _hover={{ bg: 'gray.800' }}
              _focus={{ bg: 'gray.800' }}
              _active={{ bg: 'gray.800' }}
            >
              {t('synths.createSynth.flat')}
            </MenuItem>
            <MenuItem
              mb={1}
              _hover={{ bg: 'gray.800' }}
              _focus={{ bg: 'gray.800' }}
              _active={{ bg: 'gray.800' }}
            >
              {t('synths.createSynth.dynamicExchange')}
            </MenuItem>
            <MenuItem
              mb={1}
              _hover={{ bg: 'gray.800' }}
              _focus={{ bg: 'gray.800' }}
              _active={{ bg: 'gray.800' }}
            >
              {t('synths.createSynth.simulatedLiquidity')}
            </MenuItem>
            <MenuItem
              _hover={{ bg: 'gray.800' }}
              _focus={{ bg: 'gray.800' }}
              _active={{ bg: 'gray.800' }}
            >
              {t('synths.createSynth.custom')}
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
