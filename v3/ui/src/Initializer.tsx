import { FC, PropsWithChildren } from 'react';
import { Spinner } from '@chakra-ui/react';
import { useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { usePools } from '@snx-v3/usePools';
import { useAccounts } from '@snx-v3/useAccounts';

export const Initializer: FC<PropsWithChildren> = ({ children }) => {
  const { isLoading: isLoadingCollateralTypes } = useCollateralTypes();
  const { isLoading: isLoadingAccounts } = useAccounts();
  const { isLoading: isLoadingPools } = usePools();

  const isLoading = isLoadingCollateralTypes || isLoadingAccounts || isLoadingPools;

  return isLoading ? <Spinner mx="auto" my="auto" /> : <>{children}</>;
};
