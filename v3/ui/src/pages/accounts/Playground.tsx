import {
  Box,
  Heading,
  Text,
  Grid,
  GridItem,
  Flex,
  Button,
  Container,
  Tooltip,
  Link,
  InputGroup,
  Input,
  InputLeftAddon,
} from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import Position from '../../components/accounts/Position/index';
import { Link as NavLink } from 'react-router-dom';

export function Playground() {
  return (
    <Container>
      <Grid mb="3" textAlign="center" templateColumns="repeat(4, 1fr)" gap={6}>
        <GridItem mb="3">
          <Text fontSize="sm" fontWeight="semibold">
            Staked
          </Text>
          <Heading size="lg">$5,000</Heading>
          <Text fontSize="sm">
            <NavLink to={'/accounts/example/collateral'}>
              <Link fontWeight="normal" color="blue.400">
                Manage Collateral
              </Link>
            </NavLink>
          </Text>
        </GridItem>
        <GridItem mb="3">
          <Text fontSize="sm" fontWeight="semibold">
            C-Ratio
          </Text>
          <Heading size="lg">300%</Heading>
          <Text opacity="0.6" fontSize="sm">
            Minimum 250%
          </Text>
        </GridItem>
        <GridItem mb="3">
          <Text fontSize="sm" fontWeight="semibold">
            Fees APY
          </Text>
          <Heading size="lg">25%</Heading>
          <Text opacity="0.6" fontSize="sm">
            in sUSD
          </Text>
        </GridItem>
        <GridItem mb="3">
          <Text fontSize="sm" fontWeight="semibold">
            Rewards APY
          </Text>
          <Heading size="lg">75%</Heading>
          <Text opacity="0.6" fontSize="sm">
            in SNX
          </Text>
        </GridItem>
      </Grid>

      <Text fontSize="xl" mb="6">
        You’ve earned a total of <strong>$2,230</strong> in exchange fees.{' '}
        <Tooltip label="Your fees, earned when the synths in your staking position are exchanged, are automatically deducted from your debt. You can retrieve the earned fees by minting sUSD.">
          <InfoOutlineIcon transform="translateY(-2px)" />
        </Tooltip>
      </Text>

      <Text fontSize="xl" mb="6"></Text>

      <Box bg="gray.900" mb="12" p="6" borderRadius="12px">
        <Heading size="sm" mb="2">
          Maintain Your C-Ratio
        </Heading>
        {/* timeseries of c-ratio */}
        <Text fontSize="sm" mb="2">
          As a staker, you’re enabling the creation of synthetic assets by providing collateral to
          back them. Your <strong>C-Ratio</strong> is the value of your staked collateral divided by
          the value of synths you’re responsible for. It’s important for everyone to keep a high
          C-Ratio, ensuring that the synths stay properly backed even when prices are volatile.
        </Text>
        <Text fontSize="sm" mb="4">
          <strong>
            If your C-Ratio drops below your minimum of 250%, you may be liquidated and lose your
            collateral.
          </strong>{' '}
          There are two ways to increase your C-Ratio:
        </Text>

        <Grid templateColumns="repeat(2, 1fr)" gap={8}>
          <GridItem>
            <Heading size="sm" mb="1">
              Increase Your Stake
            </Heading>
            <Text fontSize="xs" mb="2">
              Provide more collateral to the system.{' '}
              <Tooltip label="Use the form below to have your staking position managed by the Spartan Council. Click 'Manage Collateral' above to customize your staking position and leverage.">
                <InfoOutlineIcon transform="translateY(-1.5px)" />
              </Tooltip>
            </Text>
            <Grid templateColumns="repeat(4, 1fr)" gap={3}>
              <GridItem colSpan={3}>
                <Input size="sm" id="amount" type="amount" />
              </GridItem>
              <GridItem>
                <Button size="sm" colorScheme="blue" w="100%">
                  Stake
                </Button>
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem>
            <Heading size="sm" mb="1">
              Burn Synths
            </Heading>
            <Text fontSize="xs" mb="2">
              Reduce the amount of synths in circulation.
            </Text>
            <Grid templateColumns="repeat(4, 1fr)" gap={3}>
              <GridItem colSpan={3}>
                <Input size="sm" id="amount" type="amount" />
              </GridItem>
              <GridItem>
                <Button size="sm" colorScheme="blue" w="100%">
                  Burn
                </Button>
              </GridItem>
            </Grid>
          </GridItem>
        </Grid>
      </Box>

      <Grid templateColumns="repeat(2, 1fr)" gap={8}>
        <GridItem>
          <Heading size="md" mb="1">
            Claim Rewards
          </Heading>
          <Text fontSize="sm" mb="2">
            Rewards incentivize stakers to back synthetic assets.
          </Text>

          <Flex alignItems="center" borderBottom="1px solid white" mb="3" pb="3">
            3.2343 SNX
            <Box ml="auto">
              <Button colorScheme="blue" size="xs">
                Withdraw
              </Button>
              <Button ml="2" colorScheme="blue" size="xs">
                Restake
              </Button>
            </Box>
          </Flex>
          <Flex alignItems="center" borderBottom="1px solid white" mb="3" pb="3">
            0.00034 ETH
            <Box ml="auto">
              <Button colorScheme="blue" size="xs">
                Withdraw
              </Button>
              <Button ml="2" colorScheme="blue" size="xs">
                Restake
              </Button>
            </Box>
          </Flex>
          <Flex alignItems="center" borderBottom="1px solid white" mb="3" pb="3">
            0.003 LUSD
            <Box ml="auto">
              <Button colorScheme="blue" size="xs">
                Withdraw
              </Button>
              <Button ml="2" colorScheme="blue" size="xs">
                Restake
              </Button>
            </Box>
          </Flex>
          <Flex alignItems="center" mb="8">
            <Box ml="auto">
              <Button colorScheme="blue" size="xs">
                Withdraw All{' '}
              </Button>
              <Button ml="2" colorScheme="blue" size="xs">
                Restake All
              </Button>
            </Box>
          </Flex>
        </GridItem>
        <GridItem>
          <Heading size="md" mb="1">
            Mint sUSD
          </Heading>
          <Text fontSize="sm" mb="2">
            Receive a loan of sUSD against your staked collateral.{' '}
            <strong>This will reduce your c-ratio.</strong>
          </Text>
          <Grid templateColumns="repeat(4, 1fr)" gap={3}>
            <GridItem colSpan={3}>
              <InputGroup size="sm">
                <InputLeftAddon bg="black">$</InputLeftAddon>
                <Input id="amount" type="amount" borderLeft="none" />
              </InputGroup>
            </GridItem>
            <GridItem>
              <Button size="sm" colorScheme="blue" w="100%">
                Mint
              </Button>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>

      <Heading size="md" mb="1">
        Staking Position
      </Heading>
      <Text fontSize="sm" mb="4">
        Your staking position effects your rewards/fees APY as well as how your c-ratio fluctuates.
        You’re currently enabling the creation of the following synthetic assets:
      </Text>

      <Position />

      <Heading size="sm" mb="1">
        Hedging Your Staking Position
      </Heading>
      <Text fontSize="sm" mb="12">
        If you’re concerned about maintaining your C-Ratio, you can hedge your staking position. To
        become fully hedged, hold your position of your staked value in each of the assets above or
        their non-synthetic equivalent. (For example, if you have $2,000 staked and a 50% position
        on sBTC, you would hold $1,000 BTC.) These assets will change in value by the amount that
        you would need to restore your C-Ratio to its current value.
      </Text>
    </Container>
  );
}
