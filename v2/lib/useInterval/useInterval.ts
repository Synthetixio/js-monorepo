import { useEffect } from 'react';

export const useInterval = (callback: () => void, delay: number) => {
  useEffect(() => {
    const intervalId = setInterval(() => callback(), delay || 0);
    return () => clearInterval(intervalId);
  }, [delay, callback]);
};
