import * as React from 'react';
import { Spinner } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { useEffect, useRef, FC } from 'react';
import { useRecoilState } from 'recoil';
import { useNetwork, chainId as chainMapping, useSwitchNetwork } from 'wagmi';
import { getChainNameById, supportedChains } from '../utils/constants';
import { chainIdState } from '../utils/state';
import { useLocation, useSearchParams } from 'react-router-dom';

type Props = {
  children?: React.ReactElement | React.ReactElement[];
};

type ChainName = 'goerli' | 'hardhat';

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
      setLocalChainId(data.id);
    },
  });

  useEffect(() => {
    if (window.ethereum) {
      const web3Provider = new ethers.providers.Web3Provider(
        window.ethereum as ethers.providers.ExternalProvider,
        'any'
      );

      web3Provider.on('network', (newNetwork, oldNetwork) => {
        if (oldNetwork) {
          routeToChain(location.pathname, newNetwork.chainId);
          setLocalChainId(newNetwork.chainId);
        }
      });
    }
  }, [location.pathname, setLocalChainId]);

  const chainParam = search.get('chain');
  const chainIdParamExists = Boolean(chainParam);
  const chainId = chainMapping[chainParam as ChainName];
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
    chainId,
    chainIdParamExists,
    hasWalletConnected,
    location.pathname,
    setLocalChainId,
    switchNetwork,
  ]);

  return Boolean(localChainId) ? <>{children}</> : <Spinner mx="auto" my="auto" />;
};
