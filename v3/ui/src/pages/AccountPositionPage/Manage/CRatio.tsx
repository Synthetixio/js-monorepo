import { Badge, Tooltip } from '@chakra-ui/react';
import { Amount } from '@snx-v3/Amount';
import { Wei } from '@synthetixio/wei';

export function CRatio({ CRatio, debt }: { CRatio: Wei; debt: Wei }) {
  return debt.gt(0) ? (
    <Amount value={CRatio} suffix="%" />
  ) : (
    <Tooltip color="white" label="You Don't have a C-Ratio if you have no Debt.">
      <Badge>No Debt</Badge>
    </Tooltip>
  );
}
