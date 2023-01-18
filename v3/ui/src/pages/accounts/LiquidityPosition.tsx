import { Container } from '@chakra-ui/react';
import { useParams } from '@snx-v3/useParams';
import { useMemo } from 'react';
import { Position } from '../../components/accounts/Position';
import { AccountNav } from '@snx-v3/AccountNav';
import { useCollateralTypes } from '@snx-v3/useCollateralTypes';

export function LiquidityPosition() {
  const params = useParams();
  const { data: collateralTypes } = useCollateralTypes();

  const collateral = useMemo(() => {
    return collateralTypes?.find(
      (item) => item.symbol?.toLowerCase() === params.collateral?.toLocaleLowerCase()
    );
  }, [collateralTypes, params.collateral]);

  if (!collateral || !params.poolId || !params.accountId) return null;

  return (
    <Container>
      <AccountNav />
      <Position collateral={collateral} poolId={params.poolId} accountId={params.accountId} />
    </Container>
  );
}
