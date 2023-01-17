import { Badge, Tooltip } from '@chakra-ui/react';
import { FC } from 'react';
import { Amount } from '@snx-v3/Amount';
import { Wei } from '@synthetixio/wei';

export const CRatio: FC<{
  CRatio: Wei;
  debt: Wei;
}> = ({ CRatio, debt }) =>
  debt.gt(0) ? (
    <Amount value={CRatio} suffix="%" />
  ) : (
    <Tooltip color="white" label="You Don't have a C-Ratio if you have no Debt.">
      <Badge>No Debt</Badge>
    </Tooltip>
  );
