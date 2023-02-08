import { Input, InputProps } from '@chakra-ui/react';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Wei, wei } from '@synthetixio/wei';

export interface NumberInputProps extends InputProps {
  'data-testid'?: string;
  'data-max'?: string;
}

export function NumberInput({
  value,
  onChange,
  max,
  InputProps,
}: {
  onChange?: (value: Wei) => void;
  value: Wei;
  max?: Wei;
  InputProps?: NumberInputProps;
}) {
  const [inputValue, setInputValue] = useState(value.gt(0) ? value.toString() : '');

  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      e.target.setCustomValidity('');
      if (!onChange) {
        // Could be a read-only input
        return;
      }
      let nextValue = value;
      try {
        nextValue = wei(e.target.value || 0);
      } catch (_err) {
        e.target.setCustomValidity('Invalid number');
      }
      if (!value.eq(nextValue)) {
        onChange(nextValue);
      }
    },
    [onChange, value]
  );

  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    if (max && max.gte(0) && value && value.gt(max)) {
      ref.current.setCustomValidity('Value greater than max');
    } else {
      ref.current.setCustomValidity('');
    }
  }, [max, value]);

  useEffect(() => {
    if (value.eq(0)) {
      return setInputValue('');
    }
    // Cleanup trailing precision zeroes
    const float = parseFloat(value.toString());
    if (float === value.toNumber()) {
      return setInputValue(`${float}`);
    }
    return setInputValue(value.toString());
  }, [value]);

  return (
    <Input
      ref={ref}
      flex="1"
      type="text"
      border="none"
      borderWidth="0px"
      textAlign="end"
      p={0}
      outline="none"
      fontFamily="heading"
      fontSize="xl"
      fontWeight="black"
      lineHeight="2xl"
      color="white"
      height="unset"
      autoFocus={true}
      placeholder="Enter Amount"
      _focus={{ boxShadow: 'none !important' }}
      _placeholder={{ color: 'whiteAlpha.700' }}
      value={inputValue}
      onChange={onInputChange}
      {...InputProps}
    />
  );
}
