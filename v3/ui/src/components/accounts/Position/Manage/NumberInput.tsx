import { Input } from '@chakra-ui/react';
import { FC } from 'react';

interface Props {
  onChange: (value: number) => void;
  value: number;
}

export const NumberInput: FC<Props> = ({ value, onChange }) => (
  <Input
    flex="1"
    type="number"
    border="none"
    placeholder="0.0"
    min="0"
    step="any"
    value={value ? `${value}`.replace(/^0+/, '') : 0}
    onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
  />
);
