import { Td, Fade } from '@chakra-ui/react';
import { formatDistance } from 'date-fns';

export const Age = ({ timestamp }: { timestamp: string }) => {
  const dateLiquidated = new Date(parseInt(timestamp) * 1000);
  const dateNow = new Date();
  return (
    <Td border="none" fontSize="14px" lineHeight="20px" fontFamily="heading" fontWeight={500}>
      <Fade in>{formatDistance(dateLiquidated, dateNow, { addSuffix: true })}</Fade>
    </Td>
  );
};
