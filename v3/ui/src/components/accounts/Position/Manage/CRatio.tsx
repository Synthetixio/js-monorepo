import { Badge, Tooltip } from '@chakra-ui/react';
import { FC } from 'react';
import { currency } from '../../../../utils/currency';

interface Props {
  CRatio: number;
  debt: number;
}

export const CRatio: FC<Props> = ({ CRatio, debt }) =>
  debt !== 0 ? (
    <>{currency(CRatio.toString())}%</>
  ) : (
    <Tooltip color="white" label="You Don't have a C-Ratio if you have no Debt.">
      <Badge bg="green.400">No Debt</Badge>
    </Tooltip>
  );
