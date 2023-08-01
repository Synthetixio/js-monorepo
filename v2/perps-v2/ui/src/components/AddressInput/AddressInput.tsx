import { SearchIcon } from '@chakra-ui/icons';
import { Button, Flex, Input } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useGlobalProvidersWithFallback } from '@snx-v2/useGlobalProvidersWithFallback';

export const AddressInput = () => {
  const { globalProviders } = useGlobalProvidersWithFallback();
  const L1DefaultProvider = globalProviders.mainnet;
  const navigate = useNavigate();

  const { register, getValues } = useForm({
    defaultValues: { address: '' },
  });

  const onSubmit = () => {
    if (getValues('address')) {
      (async () => {
        const addressFromEns: string | null = await L1DefaultProvider.resolveName(
          getValues('address')
        );
        if (addressFromEns) {
          navigate(`/${addressFromEns}`);
        } else {
          navigate(`/${getValues('address')}`);
        }
      })();
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
        borderColor="gray.900"
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
