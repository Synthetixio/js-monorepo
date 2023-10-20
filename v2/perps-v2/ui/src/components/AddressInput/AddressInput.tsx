import { ethers } from 'ethers';
import { SearchIcon } from '@chakra-ui/icons';
import { Button, Flex, Input } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useGlobalProvidersWithFallback } from '@snx-v2/useGlobalProvidersWithFallback';
import { useState } from 'react';

export const AddressInput = () => {
  const { globalProviders } = useGlobalProvidersWithFallback();
  const L1DefaultProvider = globalProviders.mainnet;

  const [inputError, setInputError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { register, getValues } = useForm({
    defaultValues: { address: '' },
  });

  const onSubmit = async () => {
    setInputError(null);
    const address = getValues('address');
    if (address) {
      if (address.endsWith('.ens') || !ethers.utils.isAddress(address)) {
        try {
          const ens: string | null = await L1DefaultProvider.resolveName(address);
          if (ens) {
            navigate(`/${ens}`);
            return;
          } else {
            setInputError(`Failed to resolve ENS name: ${address}`);
            return;
          }
        } catch (e) {
          setInputError('Error resolving ENS name');
          return;
        }
      }

      navigate(`/${address}`);
    } else {
      setInputError('Please enter an address or ENS name');
    }
  };

  return (
    <Flex alignSelf="end" width="50%" justifyContent="flex-end" alignItems="center" mb="3px">
      <Input
        placeholder="Search by ENS / address"
        w="38%"
        minW={{ base: '180px', md: '250px' }}
        {...register('address')}
        alignSelf="end"
        borderColor={inputError ? 'red.500' : 'gray.900'}
        isInvalid={!!inputError}
        onChange={(e) => {
          if (!e.target.value.trim()) setInputError(null);
        }}
        onKeyDown={({ key }) => {
          if (key === 'Enter') {
            onSubmit();
          }
        }}
      />
      <Button
        variant="unstyled"
        ml={3}
        borderWidth="1px"
        borderColor="gray.900"
        py="7px"
        px="12px"
        borderRadius="7px"
        onClick={onSubmit}
      >
        <SearchIcon color="gray.100" />
      </Button>
    </Flex>
  );
};
