import { useRecoilState } from 'recoil';
import { chainIdState } from '../utils/state';
import { useNavigate, NavigateOptions, Path, createSearchParams } from 'react-router-dom';
import { getChainNameById } from '../utils/constants';

/**
 * Overloads navigate function to navigate user to a specific route WITH
 * chain parameter set automatically based on localChainId.
 * @returns {NavigateFunction}
 */
export const useNavigateWithChain = () => {
  const [localChainId] = useRecoilState(chainIdState);
  const chainName = getChainNameById(localChainId);
  const navigate = useNavigate();

  return (to: Partial<Path>, options?: NavigateOptions) =>
    navigate(
      {
        ...to,
        search: chainName ? `?${createSearchParams({ chain: chainName })}` : undefined,
      },
      options
    );
};
