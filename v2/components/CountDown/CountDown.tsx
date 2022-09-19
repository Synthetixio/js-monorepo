import React, { useState } from 'react';
import intervalToDuration from 'date-fns/intervalToDuration';
import { useInterval } from '@snx-v2/useInterval';

export const CountDown: React.FC<{ toDate: Date; intervalMs?: number }> = ({
  toDate,
  intervalMs = 1000,
}) => {
  const [now, setNow] = useState(new Date());
  useInterval(() => {
    setNow(new Date());
  }, intervalMs);

  const duration = intervalToDuration({
    start: now,
    end: toDate,
  });
  return (
    <span>
      {String(duration.days).padStart(2, '0')}:{String(duration.hours).padStart(2, '0')}:
      {String(duration.minutes).padStart(2, '0')}
    </span>
  );
};
