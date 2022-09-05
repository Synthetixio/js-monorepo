import { Input } from '@chakra-ui/react';
import { FC, useCallback } from 'react';

interface Props {
  onChange: (value: number) => void;
  value: number;
  max?: number;
}

export const NumberInput: FC<Props> = ({ value, onChange, max }) => {
  const handleChange = useCallback(
    (value: number) => onChange(max ? Math.min(max, value) : value),
    [max, onChange]
  );
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
    />
  );
};
