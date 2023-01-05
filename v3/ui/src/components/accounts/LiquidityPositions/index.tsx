import { LiquidityPosition } from './LiquidityPosition';
import { Box, Heading, Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { FC } from 'react';
import { LiquidityPositionsById } from '@snx-v3/useLiquidityPositions';

interface Props {
  positions: LiquidityPositionsById;
  refetch: () => void;
}

export const LiquidityPositions: FC<Props> = ({ positions, refetch }) => {
  return (
    <Box>
      <Heading size="md" mb="3">
        Liquidity Positions
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
              Pool
            </Th>
            <Th color="rgba(255,255,255,0.8)" pb="2"></Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.values(positions).map((position) => (
            <LiquidityPosition key={position.id} position={position} refetch={refetch} />
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
