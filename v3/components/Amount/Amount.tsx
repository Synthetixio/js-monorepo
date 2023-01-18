import { Tooltip } from '@chakra-ui/react';
import { useMemo } from 'react';
import { currency, formatValue, parseUnits } from '@snx-v3/format';
import { WeiSource } from '@synthetixio/wei';

export function Amount({
  value,
  prefix = '',
  suffix = '',
}: {
  prefix?: string;
  value?: WeiSource;
  suffix?: string;
}) {
  const { formattedValue, preciseValue } = useMemo(() => {
    if (!value) {
      return { formattedValue: '-', preciseValue: '-' };
    }
    const parsedValue = parseUnits(value);
    const formattedValue = currency(formatValue(parsedValue));
    const cleanNumber = parseUnits(formattedValue.replaceAll(',', ''));
    return {
      formattedValue,
      preciseValue: parsedValue.eq(cleanNumber) ? formattedValue : value.toString(),
    };
  }, [value]);

  return (
    <Tooltip
      label={
        <>
          {prefix}
          {preciseValue}
          {suffix}
        </>
      }
      isDisabled={formattedValue === preciseValue}
    >
      <span>
        {prefix}
        {formattedValue}
        {suffix}
      </span>
    </Tooltip>
  );
}
