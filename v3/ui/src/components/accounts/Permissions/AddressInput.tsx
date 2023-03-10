export {};
/*
import { CheckIcon } from '@chakra-ui/icons';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { utils } from 'ethers';
import { useMemo } from 'react';

type Props = {
  address: string;
  onChange(address: string): void;
  readOnly?: boolean;
};

export const AddressInput = ({ address, onChange, readOnly = false }: Props) => {
  const isValidAddress = useMemo(() => utils.isAddress(address), [address]);

  return (
    <FormControl mb={5} isInvalid={!isValidAddress}>
      <FormLabel htmlFor="address">Address</FormLabel>
      <InputGroup>
        <Input
          id="address"
          value={address}
          onChange={(e) => onChange(e.target.value)}
          readOnly={readOnly}
        />
        {isValidAddress && (
          <InputRightElement>
            <CheckIcon color="success" />
          </InputRightElement>
        )}
      </InputGroup>
      {!isValidAddress && address !== '' && <FormErrorMessage>Invalid address</FormErrorMessage>}
    </FormControl>
  );
};
*/
