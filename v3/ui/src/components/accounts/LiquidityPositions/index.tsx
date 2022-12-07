import { LiquidityPosition } from './LiquidityPosition';
import { Box, Heading, Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { LiquidityPositionType } from '../../../utils/types';
import { FC } from 'react';

interface Props {
  positions: Record<string, LiquidityPositionType>;
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
          {Object.keys(positions).map((positionId) => {
            return (
              <LiquidityPosition
                key={positionId}
                position={positions[positionId]}
                refetch={refetch}
              />
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};
