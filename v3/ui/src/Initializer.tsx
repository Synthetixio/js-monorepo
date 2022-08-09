import React from 'react';
import { Spinner } from '@chakra-ui/react';
import { ReactNode, FC } from 'react';
import { useCollateralTypes } from './hooks';
import { useOwnerAccounts } from './hooks/useOwnerAccounts';

type Props = {
  children?: ReactNode;
};

export const Initializer: FC<Props> = ({ children }) => {
  const { isLoading: isLoadingCollateralTypes } = useCollateralTypes();
  const { isLoading: isLoadingOwnerAccounts } = useOwnerAccounts();

  const isLoading = isLoadingCollateralTypes || isLoadingOwnerAccounts;

  return isLoading ? <Spinner mx="auto" my="auto" /> : <>{children}</>;
};
