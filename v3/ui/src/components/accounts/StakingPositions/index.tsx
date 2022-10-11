import { StakingPosition } from './StakingPosition';
import { Box, Heading, Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { StakingPositionType } from '../../../utils/types';
import { FC } from 'react';

interface Props {
  positions: Record<string, StakingPositionType>;
  refetch: () => void;
}

export const StakingPositions: FC<Props> = ({ positions, refetch }) => {
  return (
    <Box>
      <Heading size="md" mb="3">
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
              Pool
            </Th>
            <Th color="rgba(255,255,255,0.8)" pb="2"></Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.keys(positions).map((positionId) => {
            return (
              <StakingPosition
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
