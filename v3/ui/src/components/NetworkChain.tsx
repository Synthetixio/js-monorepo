import { FC, PropsWithChildren } from 'react';
import { Spinner } from '@chakra-ui/react';
import { useProvider } from 'wagmi';

export const NetworkChain: FC<PropsWithChildren> = ({ children }) => {
  const provider = useProvider();
  return Boolean(provider.network.chainId) ? <>{children}</> : <Spinner mx="auto" my="auto" />;
};
