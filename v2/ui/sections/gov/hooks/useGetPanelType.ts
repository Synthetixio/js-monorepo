import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { PanelType } from 'store/gov';

const useGetPanelType = () => {
  const { search } = useLocation();
  return useMemo(() => {
    const [, panel] = new URLSearchParams(search).getAll('panel');
    switch (true) {
      case panel === 'create':
        return PanelType.CREATE;
      case Boolean(panel):
        return PanelType.PROPOSAL;
      default:
        return PanelType.LIST;
    }
  }, [search]);
};
export default useGetPanelType;
