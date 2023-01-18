import { Input, InputProps } from '@chakra-ui/react';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Wei, wei } from '@synthetixio/wei';

export function NumberInput({
  value,
  onChange,
  max,
  InputProps,
}: {
  onChange?: (value: Wei) => void;
  value: Wei;
  max?: Wei;
  InputProps?: InputProps;
}) {
  const [inputValue, setInputValue] = useState(value.gt(0) ? value.toString() : '');

  const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  useEffect(() => {
    if (!onChange) {
      return;
    }
    const t = setTimeout(() => {
      const nextValue = wei(inputValue.replaceAll(',', '') || 0);
      if (value.eq(nextValue)) {
        return;
      }
      if (max === undefined) {
        return onChange(nextValue);
      }
      if (nextValue.gt(max)) {
        return onChange(max);
      }
      return onChange(nextValue);
    }, 300);
    return () => clearTimeout(t);
  }, [value, inputValue, max, onChange]);

  useEffect(() => {
    const t = setTimeout(() => {
      setInputValue(value.gt(0) ? `${value.toNumber()}` : '');
    }, 100);
    return () => clearTimeout(t);
  }, [value]);

  return (
    <Input
      flex="1"
      type="number"
      border="none"
      placeholder="0.0"
      min="0"
      value={inputValue}
      onChange={onInputChange}
      disabled={max?.eq(0)}
      {...InputProps}
    />
  );
}
