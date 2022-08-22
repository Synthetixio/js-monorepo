import { InfoIcon } from '@chakra-ui/icons';
import { Text } from '@chakra-ui/react';
import { FC } from 'react';

interface Props {
  debt: string | number;
}

export const PositionDebt: FC<Props> = ({ debt }) => {
  return Number(debt) <= 0 ? (
    <Text fontWeight="bold" color="green">
      No debt <InfoIcon transform="translateY(-1px)" />
    </Text>
  ) : (
    <>0%</>
  );
};
