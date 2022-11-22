import { PropsWithChildren, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigateWithChain } from '../../hooks';
import { accountsState } from '../../utils/state';

const RequireAccount: React.FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigateWithChain();
  const [{ accounts }] = useRecoilState(accountsState);
  const numOfAccount = accounts.length;
  useEffect(() => {
    if (numOfAccount === 0) {
      navigate({ pathname: `/` }, { replace: true });
    }
  }, [numOfAccount]);
  return <>{children}</>;
};
export default RequireAccount;
