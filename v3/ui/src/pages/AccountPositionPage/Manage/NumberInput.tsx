import { Input, InputProps } from '@chakra-ui/react';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';

interface NumberInputProps extends Omit<InputProps, 'onChange'> {
  onChange: (value: number) => void;
  value: number;
  max?: number;
}

export function NumberInput({ value, onChange, max, ...props }: NumberInputProps) {
  const [inputValue, setInputValue] = useState(value > 0 ? `${value}` : '');

  const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      const value = parseFloat(inputValue) || 0;
      if (max === undefined) {
        return onChange(value);
      }
      return onChange(Math.min(max, value));
    }, 300);
    return () => clearTimeout(t);
  }, [inputValue, max, onChange]);

  useEffect(() => {
    const t = setTimeout(() => {
      setInputValue(value > 0 ? `${value}` : '');
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
      disabled={max === 0}
      {...props}
    />
  );
}
