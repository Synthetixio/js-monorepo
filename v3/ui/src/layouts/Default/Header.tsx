import Kwenta from '../../assets/svgs/kwenta.svg';
import logo from '../../assets/svgs/logo.png';
import Logomark from '../../assets/svgs/logomark.svg';
import Lyra from '../../assets/svgs/lyra.svg';
import Thales from '../../assets/svgs/thales.svg';
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
  PopoverArrow,
  PopoverBody,
  Text,
  IconButton,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { NetworkController } from '../../components/NetworkController';

export default function Header() {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const toggleMobileMenu = () => {
    setOpenMobileMenu(!openMobileMenu);
  };
  return (
    <Container mb="8" maxW="container.lg" py="4">
      <Flex alignItems="center">
        <Box display={['none', 'none', 'inline-block']}>
          <Link to="/" as={RouterLink} _focus={{ boxShadow: 'none' }}>
            <img src={logo} alt="Synthetix" width={200} height={14.5} />
          </Link>
        </Box>
        <Box display={['inline-block', 'inline-block', 'none']} pt={1.5}>
          <Link to="/" as={RouterLink} _focus={{ boxShadow: 'none' }}>
            <Logomark height={24} />
            {/* <img src={logomark} alt="Synthetix" height={24} /> */}
          </Link>
        </Box>
        <Spacer />
        <Box display={['none', 'none', 'none', 'inline-block']}>
          <Link to="/" as={RouterLink} _focus={{ boxShadow: 'none' }} mx="3" fontWeight="semibold">
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
              <PopoverArrow bg="gray.800" />
              <PopoverBody bg="gray.800" color="white" p="5">
                <a href="https://kwenta.io" target="_blank" rel="noreferrer">
                  <Flex mb="3" cursor="pointer">
                    <Kwenta width={36} height={36} />
                    {/* <img src={kwenta} alt="Kwenta" width={36} height={36} /> */}
                    <Box pl="3">
                      <Text fontWeight="500">Kwenta</Text>
                      <Text fontSize="xs">Trade perpetual futures with up to 10x leverage.</Text>
                    </Box>
                  </Flex>
                </a>
                <a href="https://lyra.finance" target="_blank" rel="noreferrer">
                  <Flex mb="3" cursor="pointer">
                    <Lyra width={36} height={36} />
                    {/* <img src={lyra} alt="Lyra" width={36} height={36} /> */}
                    <Box pl="3">
                      <Text fontWeight="500">Lyra</Text>
                      <Text fontSize="xs">
                        The first completely decentralized options protocol.
                      </Text>
                    </Box>
                  </Flex>
                </a>
                <a href="https://thalesmarket.io" target="_blank" rel="noreferrer">
                  <Flex cursor="pointer">
                    <Thales width={36} height={36} />
                    {/* <img src={thales} alt="Thales" width={36} height={36} /> */}
                    <Box pl="3">
                      <Text fontWeight="500">Thales</Text>
                      <Text fontSize="xs">
                        A parimutuel markets protocol for price, sports, and more.
                      </Text>
                    </Box>
                  </Flex>
                </a>
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
          bg="gray.800"
          _hover={{ bg: 'gray.700' }}
          onClick={toggleMobileMenu}
          ml="4"
          size="sm"
        />
      </Flex>
    </Container>
  );
}
