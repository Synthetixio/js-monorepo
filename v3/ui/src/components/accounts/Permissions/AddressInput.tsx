import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { utils } from 'ethers';
import { useMemo } from 'react';

type Props = {
  address: string;
  onChange(address: string): void;
};

export const AddressInput = ({ address, onChange }: Props) => {
  const isValidAddress = useMemo(() => utils.isAddress(address), [address]);

  return (
    <FormControl mb={5} isInvalid={!isValidAddress}>
      <FormLabel htmlFor="address">Address</FormLabel>
      <Input
        id="address"
        value={address}
        onChange={(e) => onChange(e.target.value)}
        readOnly={Boolean(address)}
      />
      {!isValidAddress && address !== '' && <FormErrorMessage>Invalid address</FormErrorMessage>}
    </FormControl>
  );
};
