import React, { useState } from 'react';
import intervalToDuration from 'date-fns/intervalToDuration';
import { Box, BoxProps } from '@chakra-ui/react';
import { useInterval } from '@snx-v2/useInterval';

interface CountDownProps extends BoxProps {
  toDate: Date;
  intervalMs?: number;
}

export const CountDown: React.FC<CountDownProps> = ({ toDate, intervalMs = 1000, ...props }) => {
  const [now, setNow] = useState(new Date());

  useInterval(() => {
    setNow(new Date());
  }, intervalMs);

  const duration = intervalToDuration({
    start: now,
    end: toDate,
  });

  return (
    <Box as="span" data-testid="countdown" {...props}>
      {String(duration.days).padStart(2, '0')}D {String(duration.hours).padStart(2, '0')}H{' '}
      {String(duration.minutes).padStart(2, '0')}M
    </Box>
  );
};
