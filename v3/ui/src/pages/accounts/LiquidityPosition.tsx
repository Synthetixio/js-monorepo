import { Container } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { collateralTypesState } from '../../utils/state';
import { useMemo } from 'react';
import { Position } from '../../components/accounts/Position';
import { DepositingNav } from '../../components/accounts/DepositingNav';

export function LiquidityPosition() {
  const { id: accountId, poolId, collateral: collateralSymbol } = useParams();

  const [collateralTypes] = useRecoilState(collateralTypesState);

  const collateral = useMemo(() => {
    return collateralTypes.find(
      (item) => item.symbol.toLowerCase() === collateralSymbol?.toLocaleLowerCase()
    );
  }, [collateralTypes, collateralSymbol]);

  if (!collateral || !poolId || !accountId) return null;

  return (
    <Container>
      <DepositingNav />
      <Position collateral={collateral} poolId={poolId} accountId={accountId} />
    </Container>
  );
}
