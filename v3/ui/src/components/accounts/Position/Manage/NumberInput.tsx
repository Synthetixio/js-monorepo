import { Input, InputProps } from '@chakra-ui/react';
import { FC, useCallback, useEffect } from 'react';

interface Props extends Omit<InputProps, 'onChange'> {
  onChange: (value: number) => void;
  value: number;
  max?: number;
}

export const NumberInput: FC<Props> = ({ value, onChange, max, ...props }) => {
  const handleChange = useCallback(
    (value: number) => onChange(max !== undefined ? Math.min(max, value) : value),
    [max, onChange]
  );
  useEffect(() => {
    if (max !== undefined && value > max) {
      onChange(max);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [max]);
  return (
    <Input
      flex="1"
      type="number"
      border="none"
      placeholder="0.0"
      min="0"
      step="any"
      value={value ? `${value}`.replace(/^0+/, '') : 0}
      onChange={(e) => handleChange(parseFloat(e.target.value) || 0)}
      {...props}
    />
  );
};
