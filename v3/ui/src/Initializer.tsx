import { Spinner } from '@chakra-ui/react';
import { ReactNode, FC } from 'react';
import { useCollateralTypes, useFunds } from './hooks';
import { useOwnerAccounts } from './hooks/useOwnerAccounts';

type Props = {
  children?: ReactNode;
};

export const Initializer: FC<Props> = ({ children }) => {
  const { isLoading: isLoadingCollateralTypes } = useCollateralTypes();
  const { isLoading: isLoadingOwnerAccounts } = useOwnerAccounts();
  const { isLoading: isLoadingFunds } = useFunds();

  const isLoading = isLoadingCollateralTypes || isLoadingOwnerAccounts || isLoadingFunds;

  return isLoading ? <Spinner mx="auto" my="auto" /> : <>{children}</>;
};
