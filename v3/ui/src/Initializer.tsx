import { Spinner } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';
import { usePools } from './hooks/usePools';
import { useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { useOwnerAccounts } from './hooks/useOwnerAccounts';

export const Initializer: FC<PropsWithChildren> = ({ children }) => {
  const { isLoading: isLoadingCollateralTypes } = useCollateralTypes();
  const { isLoading: isLoadingOwnerAccounts } = useOwnerAccounts();
  const { isLoading: isLoadingPools } = usePools();

  const isLoading = isLoadingCollateralTypes || isLoadingOwnerAccounts || isLoadingPools;

  return isLoading ? <Spinner mx="auto" my="auto" /> : <>{children}</>;
};
