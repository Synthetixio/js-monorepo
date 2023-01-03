import type { ReactElement } from 'react';
import { Spinner } from '@chakra-ui/react';
import { useEffect, useRef, FC } from 'react';
import { useRecoilState } from 'recoil';
import { useNetwork, useSwitchNetwork, goerli } from 'wagmi';
import { getChainNameById, supportedChains } from '../utils/constants';
import { chainIdState } from '../utils/state';
import { useLocation, useSearchParams } from 'react-router-dom';

type Props = {
  children?: ReactElement | ReactElement[];
};

const DEFAULT_CHAIN = goerli;

export const routeToChain = (basePath: string, chainId: number) => {
  const chain = getChainNameById(chainId);
  // Full redirect if user decides to change chains after page load
  window.location.replace(`${basePath}?chain=${chain}`);
};
/*
  This keeps localChainId in sync with RainbowKit/wagmi hooks. 
  localChainId is used to query contracts without needing to connect a wallet.

  Remove this hack, once wagmi adopts this.
*/
export const NetworkChain: FC<Props> = ({ children }) => {
  const [localChainId, setLocalChainId] = useRecoilState(chainIdState);
  const location = useLocation();
  const [search] = useSearchParams();
  const onInitialMount = useRef(true);

  const { chain: activeChain } = useNetwork();

  const { switchNetwork } = useSwitchNetwork({
    onSuccess: (data) => {
      routeToChain(location.pathname, data.id);
    },
  });

  const chainParam = search.get('chain');
  const chainIdParamExists = Boolean(chainParam);
  const chain = supportedChains.find((c) => c.network === chainParam);
  const chainId = Boolean(chain) ? chain!.id : DEFAULT_CHAIN.id;
  const hasWalletConnected = Boolean(switchNetwork);

  // MOUNT
  // 1. if no query param and active chain id, route to active chain id
  // 2. if no query param and no active chain id, route to mainnet
  // 3. if query param and active chain id, if different, switch nework to query param
  // 4. if query param and no active chain id, set local chain id to query param
  useEffect(() => {
    if (!onInitialMount.current) {
      return;
    }

    if (chainIdParamExists && activeChain && !chain) {
      const isActiveChainSupported = supportedChains.find((c) => c.id === activeChain.id);
      routeToChain(location.pathname, isActiveChainSupported ? activeChain.id : chainId);
    }

    if (chainIdParamExists) {
      if (activeChain) {
        if (activeChain.id !== chainId) {
          if (hasWalletConnected) {
            onInitialMount.current = false;
            switchNetwork && switchNetwork(chainId);
          }
        } else {
          onInitialMount.current = false;
          setLocalChainId(chainId);
        }
      } else {
        setLocalChainId(chainId);
      }
    } else {
      if (activeChain) {
        onInitialMount.current = false;
        setLocalChainId(activeChain.id);
        routeToChain(location.pathname, activeChain.id);
      } else {
        onInitialMount.current = false;
        setLocalChainId(supportedChains[0].id);
        routeToChain(location.pathname, supportedChains[0].id);
      }
    }
  }, [
    activeChain,
    chain,
    chainId,
    chainIdParamExists,
    hasWalletConnected,
    location.pathname,
    setLocalChainId,
    switchNetwork,
  ]);

  // ONCHANGE
  // If network is switched via wallet or button on page, then route to that new active chain
  // and keep local chain id in sync
  useEffect(() => {
    if (onInitialMount.current) {
      return;
    }

    if (activeChain && (chainId !== activeChain.id || !chainId)) {
      routeToChain(location.pathname, activeChain.id);
    }
  }, [activeChain, chainId, location.pathname, setLocalChainId]);

  return Boolean(localChainId) ? <>{children}</> : <Spinner mx="auto" my="auto" />;
};
