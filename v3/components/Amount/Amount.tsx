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
  value: WeiSource;
  suffix?: string;
}) {
  const { formattedValue, isPrecise } = useMemo(() => {
    const parsedValue = parseUnits(value);
    const formattedValue = currency(formatValue(parsedValue));
    const cleanNumber = parseUnits(formattedValue.replaceAll(',', ''));
    return { formattedValue, isPrecise: parsedValue.eq(cleanNumber) };
  }, [value]);

  return (
    <Tooltip
      label={
        <>
          {prefix}
          {value.toString()}
          {suffix}
        </>
      }
      isDisabled={isPrecise}
    >
      <span>
        {prefix}
        {formattedValue}
        {suffix}
      </span>
    </Tooltip>
  );
}
