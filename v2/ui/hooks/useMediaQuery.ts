import { useMediaQuery as baseUseMediaQuery } from 'react-responsive';
import { breakpoints, Breakpoint } from '@snx-v2/media';

const useMediaQuery = (screen: Breakpoint) => {
  const query = `(max-width: ${breakpoints[screen]}px)`;
  return baseUseMediaQuery({ query });
};

export default useMediaQuery;
