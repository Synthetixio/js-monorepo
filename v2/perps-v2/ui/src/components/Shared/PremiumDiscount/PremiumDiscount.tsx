import { Fade, Td, Text } from '@chakra-ui/react';
import { formatNumber } from '@synthetixio/formatters';

interface PremiumDiscountProps {
  amount: number;
  decimals?: number;
}

export const PremiumDiscount = ({ amount, decimals = 4 }: PremiumDiscountProps) => {
  const isPositive = amount >= 0;
  return (
    <Td border="none">
      <Fade in>
        <Text
          fontFamily="heading"
          fontWeight={500}
          fontSize="14px"
          lineHeight="20px"
          color={isPositive ? 'green.500' : 'red.500'}
        >
          {isPositive ? '+' : ''}
          {formatNumber(amount, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })}
        </Text>
        <Text color="gray.500" fontSize="12px" lineHeight="16px" fontFamily="heading">
          {isPositive ? '+' : ''}
          {formatNumber(amount * 100, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })}
          bp
        </Text>
      </Fade>
    </Td>
  );
};
