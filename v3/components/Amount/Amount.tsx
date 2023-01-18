import { Tooltip } from '@chakra-ui/react';
import { useMemo } from 'react';
import { currency, parseUnits } from '@snx-v3/format';
import { Wei } from '@synthetixio/wei';

export function Amount({
  value,
  prefix = '',
  suffix = '',
}: {
  prefix?: string;
  value?: Wei;
  suffix?: string;
}) {
  const { formattedValue, preciseValue } = useMemo(() => {
    if (!value) {
      return { formattedValue: '-', preciseValue: '-' };
    }
    const parsedValue = parseUnits(value);
    const formattedValue = currency(value);
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
