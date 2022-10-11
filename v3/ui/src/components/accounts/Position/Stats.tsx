import { InfoOutlineIcon } from '@chakra-ui/icons';
import { Box, Heading, Text, Grid, GridItem, Tooltip } from '@chakra-ui/react';

export default function Stats() {
  return (
    <Box>
      <Grid mb="1" textAlign="center" templateColumns="repeat(4, 1fr)">
        <GridItem mb="3">
          <Text fontSize="sm" fontWeight="semibold">
            Collateral
          </Text>
          <Heading size="md">1,000 SNX</Heading>
          <Text opacity="0.6" fontSize="sm">
            $4,200
          </Text>
        </GridItem>
        <GridItem mb="3">
          <Text fontSize="sm" fontWeight="semibold">
            Debt
          </Text>
          <Heading size="md">$2,400</Heading>
          <Text opacity="0.6" fontSize="sm">
            $X net issuance
          </Text>
        </GridItem>
        <GridItem mb="3">
          <Text fontSize="sm" fontWeight="semibold">
            C-Ratio
          </Text>
          <Heading size="md">200%</Heading>
          <Text opacity="0.6" fontSize="sm">
            Minimum 150%
          </Text>
        </GridItem>
        <GridItem mb="3">
          <Text fontSize="sm" fontWeight="semibold">
            Projected Fees
          </Text>
          <Heading size="md">25% APY</Heading>
          <Text opacity="0.6" fontSize="sm">
            $1,000 earned
            <Tooltip label="Your fees, earned when the synths in your staking position are exchanged, are automatically deducted from your debt. You can retrieve the earned fees by minting sUSD.">
              <InfoOutlineIcon ml="1" transform="translateY(-1.5px)" />
            </Tooltip>
          </Text>
        </GridItem>
      </Grid>
    </Box>
  );
}
