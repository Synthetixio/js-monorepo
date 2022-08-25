import StakingPosition from './StakingPosition';
import { StakingPositionType } from './types';
import { Box, Heading, Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';

export default function StakingPositions({
  positions,
}: {
  positions: Record<string, StakingPositionType>;
}) {
  return (
    <Box>
      <Heading size="md" mb="2">
        Staking Positions
      </Heading>

      <Table size="sm" variant="simple" mb="9">
        <Thead>
          <Tr>
            <Th color="rgba(255,255,255,0.8)" pb="2">
              Collateral
            </Th>
            <Th color="rgba(255,255,255,0.8)" pb="2">
              Debt
            </Th>
            <Th color="rgba(255,255,255,0.8)" pb="2">
              C-Ratio
            </Th>
            <Th color="rgba(255,255,255,0.8)" pb="2">
              Fund
            </Th>
            <Th color="rgba(255,255,255,0.8)" pb="2"></Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.keys(positions).map((positionId) => {
            return <StakingPosition key={positionId} position={positions[positionId]} />;
          })}
          {/*
            <Tr>
              <Td py="4">
                <Text fontSize="xs" mb="1">Total Staked Value</Text>
                $6,264.32
              </Td>
              <Td>
              </Td>
              <Td>
                <Text fontSize="xs" mb="1">Total Voting Power</Text>
                17,000
              </Td>
              <Td isNumeric>
              </Td>
            </Tr>
            */}
        </Tbody>
      </Table>
    </Box>
  );
}
