import { Flex, Text } from '@chakra-ui/react';
import { formatNumber } from '@snx-v2/formatters';
import { KeyColour } from '../../Dashboard';
import { BLOCKCHAIN_COLORS } from './Delegation';
import { format } from 'date-fns';

type HistoricalDelegationsTooltipProps = {
  active?: boolean;
  payload?: any[];
  blockchains?: string[];
  label?: string;
};

export const HistoricalDelegationsTooltip = ({ payload, blockchains }: HistoricalDelegationsTooltipProps) => {
  const historicalDelegations = payload?.[0]?.payload as any;

  if (!historicalDelegations) {
    return null;
  }

  return (
    <Flex
      flexDirection="column"
      bg="navy.900"
      padding={4}
      minWidth="190px"
      width="fit-content"
      borderRadius="md"
      borderWidth="1px"
    >
      <Text mb={2} fontFamily="heading" color="gray.500" fontSize="12px" lineHeight="16px">
        {historicalDelegations.labelType === 'M'
          ? historicalDelegations.label
          : format(new Date(historicalDelegations.day), 'yyyy-MM-dd')}
      </Text>
      {blockchains?.map((blockchain, index) => {
        return (
          <Flex key={index} mb={2} justifyContent="space-between" w="100%">
            <KeyColour label={historicalDelegations[blockchain].id} colour={BLOCKCHAIN_COLORS[index]} />
            <Text ml={3} fontFamily="heading" fontSize="12px" lineHeight="16px" textAlign="center">
              ${formatNumber(historicalDelegations[blockchain].cumDelegation)}
            </Text>
          </Flex>
        );
      })}
    </Flex>
  );
};
