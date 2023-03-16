import { Button, Fade, Link, Td, Text } from '@chakra-ui/react';
import { formatDistance, parse } from 'date-fns';
import { optimisticEthercanTx } from '../../../utils';
import { RightUpIcon } from '../../Icons';

interface ActionProps {
  label: string;
  txHash: string;
  timestamp: string;
}

export const Action = ({ label, txHash, timestamp }: ActionProps) => {
  return (
    <Td border="none" fontSize="14px" lineHeight="20px" fontFamily="heading" fontWeight={500}>
      <Fade in>
        <Button
          as={Link}
          variant="unstyled"
          href={optimisticEthercanTx(txHash)}
          target="_blank"
          rel="noopener"
          _hover={{ textDecoration: 'underline' }}
          fontFamily="inter"
          fontWeight="500"
          fontSize="14px"
        >
          {label}
          <RightUpIcon ml={1} mb={0.5} />
        </Button>
        <Text color="gray.500" fontSize="12px" lineHeight="16px">
          {formatDate(timestamp)}
        </Text>
      </Fade>
    </Td>
  );
};

function formatDate(timestamp: string) {
  const previousDate = parse(timestamp, 't', new Date());
  const currentDate = new Date();

  const formatted = formatDistance(previousDate, currentDate, { addSuffix: true });

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}
