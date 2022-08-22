import { InfoIcon } from '@chakra-ui/icons';
import { Flex, Text, Tooltip } from '@chakra-ui/react';
import { FC } from 'react';

interface Props {
  cRatio: string | number | undefined;
}

export const CRatio: FC<Props> = ({ cRatio }) => {
  return !cRatio ? (
    <Text fontWeight="bold" color="green">
      <Flex alignItems="center" justify="center">
        No C-Ratio
        <Tooltip label="You Don't have a C-Ratio if you have no Debt.">
          <InfoIcon ml={1} />
        </Tooltip>
      </Flex>
    </Text>
  ) : (
    <>{cRatio}%</>
  );
};
