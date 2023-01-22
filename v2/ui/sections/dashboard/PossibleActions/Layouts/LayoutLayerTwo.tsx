import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import ROUTES from 'constants/routes';
import { EXTERNAL_LINKS } from 'constants/links';

import { formatPercent } from 'utils/formatters/number';

import KwentaIcon from 'assets/svg/app/kwenta.svg';
import MintIcon from 'assets/svg/app/mint.svg';
import BurnIcon from 'assets/svg/app/burn.svg';

import GridBox, { GridBoxProps } from 'components/GridBox/Gridbox';

import { GlowingCircle } from '@snx-v1/styles';
import media from '@snx-v1/media';

import useUserStakingData from 'hooks/useUserStakingData';

import useStakingCalculations from 'sections/staking/hooks/useStakingCalculations';

import { ActionsContainer as Container } from './common-styles';
import { wei } from '@synthetixio/wei';
import useLiquidationRewards from 'hooks/useLiquidationRewards';
import getSynthetixRewardTile from './getSynthetixRewardTile';
import Connector from 'containers/Connector';

const LayoutLayerTwo: FC = () => {
  const { t } = useTranslation();

  const { walletAddress } = Connector.useContainer();

  const liquidationRewardsQuery = useLiquidationRewards(walletAddress);
  const { stakingRewards, tradingRewards } = useUserStakingData(walletAddress);
  const { currentCRatio, targetCRatio } = useStakingCalculations();

  const liquidationRewards = liquidationRewardsQuery.data ?? wei(0);
  const stakingAndTradingRewards = stakingRewards.add(tradingRewards);
  const gridItems: GridBoxProps[] = useMemo(() => {
    const aboveTargetCRatio = currentCRatio.lte(targetCRatio);
    return [
      getSynthetixRewardTile(t, stakingAndTradingRewards, liquidationRewards),

      {
        icon: (
          <GlowingCircle variant={!aboveTargetCRatio ? 'orange' : 'blue'} size="md">
            {!aboveTargetCRatio ? <BurnIcon width="38" /> : <MintIcon width="27" />}
          </GlowingCircle>
        ),
        title: !aboveTargetCRatio
          ? t('dashboard.actions.burn.title', {
              targetCRatio: formatPercent(wei(1).div(targetCRatio), { minDecimals: 0 }),
            })
          : t('dashboard.actions.mint.title'),
        copy: !aboveTargetCRatio
          ? t('dashboard.actions.burn.copy')
          : t('dashboard.actions.mint.title'),
        link: !aboveTargetCRatio ? ROUTES.Staking.Burn : ROUTES.Staking.Mint,
      },
      {
        icon: (
          <GlowingCircle variant="orange" size="md">
            <KwentaIcon width="32" />
          </GlowingCircle>
        ),
        title: t('dashboard.actions.trade.title'),
        copy: t('dashboard.actions.trade.copy'),
        externalLink: EXTERNAL_LINKS.Trading.Kwenta,
        isDisabled: false,
      },
    ].map((cell, i) => ({ ...cell, gridArea: `tile-${i + 1}` }));
  }, [currentCRatio, targetCRatio, t, stakingAndTradingRewards, liquidationRewards]);

  return (
    <StyledContainer>
      {gridItems.map((props, index) => (
        <GridBox key={`${props.title}-${index}`} {...props} />
      ))}
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
  grid-template-areas: 'tile-1 tile-2 tile-3 tile-4';
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1rem;

  ${media.lessThan('md')`
    grid-template-areas:
      'tile-1 tile-2'
      'tile-3 tile-4';
    grid-template-columns: 1fr 1fr;
    display: grid;
    flex-direction: unset;
  `}
`;

export default LayoutLayerTwo;
