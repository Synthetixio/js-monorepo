import React, { useEffect, useState } from 'react';
import intervalToDuration from 'date-fns/intervalToDuration';

export const CountDown: React.FC<{ toDate: Date; intervalMs?: number }> = ({
  toDate,
  intervalMs = 1000,
}) => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(new Date());
    }, intervalMs);
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalMs]);
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
