import { Badge, Tooltip } from '@chakra-ui/react';
import { FC } from 'react';
import { Amount } from '../../../shared/Amount/Amount';

interface Props {
  CRatio: number;
  debt: number;
}

export const CRatio: FC<Props> = ({ CRatio, debt }) =>
  debt !== 0 ? (
    <Amount value={CRatio} suffix="%" />
  ) : (
    <Tooltip color="white" label="You Don't have a C-Ratio if you have no Debt.">
      <Badge>No Debt</Badge>
    </Tooltip>
  );
