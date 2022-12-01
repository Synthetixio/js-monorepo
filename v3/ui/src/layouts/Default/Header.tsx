import logo from './logo.png';
import logomark from './logomark.svg';
import kwenta from './kwenta.svg';
import lyra from './lyra.svg';
import thales from './thales.svg';
import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Container,
  Flex,
  Box,
  Link,
  Spacer,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Image,
  PopoverBody,
  Text,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { NetworkController } from '../../components/NetworkController';
import { useEffect } from 'react';

const tradeContent = () => {
  return (
    <>
      <a href="https://kwenta.eth.limo" target="_blank" rel="noreferrer">
        <Flex mb="3" cursor="pointer" alignItems="center">
          <Image src={kwenta} alt="Kwenta" width="28px" height="28px" />
          <Box pl="3">
            <Text fontWeight="500">Kwenta</Text>
            <Text fontSize="xs">Trade perpetual futures with up to 10x leverage.</Text>
          </Box>
        </Flex>
      </a>
      <a href="https://lyra.finance" target="_blank" rel="noreferrer">
        <Flex mb="3" cursor="pointer" alignItems="center">
          <Image src={lyra} alt="Lyra" mx="1" width="21px" height="21px" />
          <Box pl="3">
            <Text fontWeight="500">Lyra</Text>
            <Text fontSize="xs">The first completely decentralized options protocol.</Text>
          </Box>
        </Flex>
      </a>
      <a href="https://thalesmarket.io" target="_blank" rel="noreferrer">
        <Flex cursor="pointer" alignItems="center">
          <Image src={thales} alt="Thales" width="28px" height="28px" />
          <Box pl="3">
            <Text fontWeight="500">Thales</Text>
            <Text fontSize="xs">A parimutuel markets protocol for price, sports, and more.</Text>
          </Box>
        </Flex>
      </a>
    </>
  );
};

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();

  useEffect(() => {
    onClose();
  }, [location, onClose]);

  return (
    <>
      <Container mb="8" maxW="container.lg" py="4">
        <Flex alignItems="center">
          <Box display={['none', 'none', 'inline-block']}>
            <Link to="/" as={RouterLink} _focus={{ boxShadow: 'none' }}>
              <Image src={logo} alt="Synthetix" width={200} height={14.5} />
            </Link>
          </Box>
          <Box display={['inline-block', 'inline-block', 'none']}>
            <Link to="/" as={RouterLink} _focus={{ boxShadow: 'none' }}>
              <Image src={logomark} alt="Synthetix" height="20px" />
            </Link>
          </Box>
          <Spacer />
          <Box display={['none', 'none', 'none', 'inline-block']}>
            <Link
              to="/"
              as={RouterLink}
              _focus={{ boxShadow: 'none' }}
              mx="3"
              fontWeight="semibold"
            >
              Stake
            </Link>
            <Link
              _focus={{ boxShadow: 'none' }}
              mx="3"
              fontWeight="semibold"
              href="https://governance.synthetix.io/"
              isExternal
            >
              DAO
            </Link>
            <Link
              _focus={{ boxShadow: 'none' }}
              mx="3"
              fontWeight="semibold"
              href="https://snx-v3-docs.vercel.app/"
              isExternal
            >
              Developers
            </Link>
            <Popover trigger="hover" variant="responsive">
              <PopoverTrigger>
                <Link
                  _focus={{ boxShadow: 'none' }}
                  _hover={{ textDecoration: 'none' }}
                  mx="3"
                  fontWeight="semibold"
                >
                  Trade <ChevronDownIcon />
                </Link>
              </PopoverTrigger>
              <PopoverContent border="none" maxWidth="260px">
                <PopoverBody
                  bg="black"
                  color="white"
                  border="1px solid"
                  borderColor="gray.900"
                  borderRadius="md"
                  p="5"
                >
                  {tradeContent()}
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Box>
          <Spacer />
          <Box>
            <NetworkController />
          </Box>
          <IconButton
            display={['inline-block', 'inline-block', 'inline-block', 'none']}
            aria-label="Open Menu"
            icon={<HamburgerIcon />}
            colorScheme="gray"
            onClick={onOpen}
            ml="4"
            size="sm"
          />
        </Flex>
      </Container>

      <Drawer onClose={onClose} isOpen={isOpen} size="full">
        <DrawerOverlay />
        <DrawerContent background="black">
          <DrawerCloseButton />
          <DrawerHeader>
            <Link to="/" as={RouterLink} _focus={{ boxShadow: 'none' }}>
              <Image transform="translateY(-2px)" src={logomark} alt="Synthetix" height="20px" />
            </Link>
          </DrawerHeader>
          <DrawerBody>
            <Box mb="3">
              <Link to="/" as={RouterLink} _focus={{ boxShadow: 'none' }} fontWeight="semibold">
                Stake
              </Link>
            </Box>
            <Box mb="3">
              <Link
                _focus={{ boxShadow: 'none' }}
                fontWeight="semibold"
                href="https://governance.synthetix.io/"
                isExternal
              >
                DAO
              </Link>
            </Box>
            <Box mb="3">
              <Link
                _focus={{ boxShadow: 'none' }}
                fontWeight="semibold"
                href="https://snx-v3-docs.vercel.app/"
                isExternal
              >
                Developers
              </Link>
            </Box>
            <Text
              opacity="0.8"
              fontWeight="semibold"
              fontSize="xs"
              textTransform="uppercase"
              letterSpacing="0.75px"
              mb="2"
              mt="5"
            >
              Trade
            </Text>
            {tradeContent()}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
