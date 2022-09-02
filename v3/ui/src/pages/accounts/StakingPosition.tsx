import { Container, Link, Box } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { useParams, Link as NavLink } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { collateralTypesState } from '../../utils/state';
import { useMemo } from 'react';
import { Position } from '../../components/accounts/Position';

export function StakingPosition() {
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
      <Box mb="6">
        <NavLink to={`/accounts/${accountId}`}>
          <Link
            fontSize="xs"
            fontWeight="normal"
            color="blue.400"
            _hover={{ textDecoration: 'none' }}
          >
            <ChevronLeftIcon transform="translateY(-1px)" /> View all staking positions
          </Link>
        </NavLink>
      </Box>
      <Position collateral={collateral} poolId={poolId} accountId={accountId} />
    </Container>
  );
}
