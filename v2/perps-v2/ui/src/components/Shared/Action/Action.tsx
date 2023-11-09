import { Button, Fade, Link, SystemStyleObject, Td, Text, Tooltip } from '@chakra-ui/react';
import { formatDistance } from 'date-fns';
import { optimisticEthercanTx } from '../../../utils';
import { RightUpIcon } from '../../Icons';

interface ActionProps {
  label: string;
  txHash: string;
  timestamp?: number;
  sx?: SystemStyleObject;
}

export const Action = ({ label, txHash, timestamp, sx }: ActionProps) => {
  const date = timestamp ? new Date(timestamp * 1000) : undefined;
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
          sx={{ ...sx }}
        >
          {label}
          <RightUpIcon ml={1} mb={0.5} />
        </Button>
        {date && (
          <Text color="gray.500" fontSize="12px" lineHeight="16px">
            <Tooltip
              py={2}
              px={4}
              bg="gray.900"
              color="gray.500"
              fontSize="12px"
              fontFamily="heading"
              borderRadius="4px"
              label={date.toISOString()}
            >
              {formatDate(date)}
            </Tooltip>
          </Text>
        )}
      </Fade>
    </Td>
  );
};

function formatDate(previousDate: Date) {
  const currentDate = new Date();

  const formatted = formatDistance(previousDate, currentDate, { addSuffix: true });

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}
