import { Spinner } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';
import { useCollateralTypes, usePools } from './hooks';
import { useOwnerAccounts } from './hooks/useOwnerAccounts';

export const Initializer: FC<PropsWithChildren> = ({ children }) => {
  const { isLoading: isLoadingCollateralTypes } = useCollateralTypes();
  const { isLoading: isLoadingOwnerAccounts } = useOwnerAccounts();
  const { isLoading: isLoadingPools } = usePools();

  const isLoading = isLoadingCollateralTypes || isLoadingOwnerAccounts || isLoadingPools;

  return isLoading ? <Spinner mx="auto" my="auto" /> : <>{children}</>;
};
