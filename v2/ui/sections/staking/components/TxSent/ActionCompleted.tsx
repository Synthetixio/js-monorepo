import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { FlexDivRowCentered, FlexDivCentered, ExternalLink, boxShadowBlue } from '@snx-v1/styles';
import Success from 'assets/svg/app/success.svg';
import ROUTES from 'constants/routes';
import { Synths } from 'constants/currency';
import Etherscan from 'containers/BlockExplorer';
import { amountToBurnState, amountToMintState, burnTypeState, mintTypeState } from 'store/staking';

import {
  SectionHeader,
  SectionSubtext,
  Container,
  InfoTitle,
  InfoContainer,
  InfoData,
  MiddleSection,
  IconContainer,
} from './common';
import Connector from 'containers/Connector';

type ActionCompletedProps = {
  resetTransaction: () => void;
  isMint: boolean;
  hash?: string;
  from?: string;
  to?: string;
};

const ActionCompleted: React.FC<ActionCompletedProps> = ({
  resetTransaction,
  isMint,
  hash,
  from,
  to,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isMainnet } = Connector.useContainer();

  const { blockExplorerInstance } = Etherscan.useContainer();
  const link = blockExplorerInstance != null ? blockExplorerInstance.txLink(hash ?? '') : undefined;
  const onMintTypeChange = useSetRecoilState(mintTypeState);
  const onBurnTypeChange = useSetRecoilState(burnTypeState);
  const onBurnChange = useSetRecoilState(amountToBurnState);
  const onMintChange = useSetRecoilState(amountToMintState);

  if (!isMint) {
    return (
      <Container>
        <SectionHeader>{t('staking.actions.burn.completed.title')}</SectionHeader>
        <MiddleSection>
          <IconContainer>
            <Success width="78" />
          </IconContainer>
          <FlexDivCentered>
            <InfoContainer key="one">
              <InfoTitle>{t('staking.actions.burn.completed.unstaking')}</InfoTitle>
              <InfoData>{from}</InfoData>
            </InfoContainer>
            <InfoContainer key="two">
              <InfoTitle>{t('staking.actions.burn.completed.burning')}</InfoTitle>
              <InfoData>{to}</InfoData>
            </InfoContainer>
          </FlexDivCentered>
        </MiddleSection>
        <ButtonWrap>
          {link ? (
            <ExternalLink href={link}>
              <LeftButton onClick={() => resetTransaction()}>
                {t('staking.actions.burn.completed.verify')}
              </LeftButton>
            </ExternalLink>
          ) : null}
          <RightButton
            onClick={() => {
              resetTransaction();
              onBurnTypeChange(null);
              onBurnChange('');
            }}
          >
            {t('staking.actions.burn.completed.dismiss')}
          </RightButton>
        </ButtonWrap>
      </Container>
    );
  } else if (!isMainnet) {
    return (
      <Container>
        <SectionHeader>{t('staking.actions.mint.completed-default.title')}</SectionHeader>
        <MiddleSection>
          <IconContainer>
            <Success width="78" />
          </IconContainer>
          <FlexDivCentered>
            <InfoContainer key="one">
              <InfoTitle>{t('staking.actions.mint.completed-default.staked')}</InfoTitle>
              <InfoData>{from}</InfoData>
            </InfoContainer>
            <InfoContainer key="two">
              <InfoTitle>{t('staking.actions.mint.completed-default.minted')}</InfoTitle>
              <InfoData>{to}</InfoData>
            </InfoContainer>
          </FlexDivCentered>
        </MiddleSection>
        <ButtonWrap>
          {link ? (
            <ExternalLink href={link}>
              <LeftButton onClick={() => resetTransaction()}>
                {t('staking.actions.mint.completed-default.verify')}
              </LeftButton>
            </ExternalLink>
          ) : null}

          <RightButton
            onClick={() => {
              resetTransaction();
              onMintTypeChange(null);
              onMintChange('');
            }}
          >
            {t('staking.actions.mint.completed-default.dismiss')}
          </RightButton>
          <HedgeButton onClick={() => navigate(ROUTES.Debt.Home)}>
            {t('staking.actions.mint.completed-default.hedge')}
          </HedgeButton>
        </ButtonWrap>
      </Container>
    );
  }
  return (
    <Container>
      <SectionHeader>
        {t('staking.actions.mint.completed.title', { synth: Synths.sUSD })}
      </SectionHeader>

      <SectionSubtext>{t('staking.actions.mint.completed.subtext')}</SectionSubtext>
      <ButtonWrap>
        <LeftButton
          onClick={() => {
            resetTransaction();
            onMintTypeChange(null);
            onMintChange('');
          }}
        >
          {t('staking.actions.mint.completed.dismiss')}
        </LeftButton>
        <RightButton onClick={() => navigate(ROUTES.Earn.Home)}>
          {t('staking.actions.mint.completed.see-more')}
        </RightButton>
      </ButtonWrap>
    </Container>
  );
};

const BaseButton = styled.div`
  @media (max-width: 768px) {
    min-width: 60px;
    width: 120px;
  }
  width: 175px;
  height: 50px;
  padding-top: 16px;
  font-family: ${(props) => props.theme.fonts.condensedMedium};
  font-size: 12px;
  border-radius: 4px;
  cursor: pointer;
`;

const ButtonWrap = styled(FlexDivRowCentered)`
  width: 100%;
`;

const LeftButton = styled(BaseButton)`
  background-color: ${(props) => props.theme.colors.black};
  color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.gray};
  text-transform: uppercase;
`;

const RightButton = styled(BaseButton)`
  background-color: ${(props) => props.theme.colors.black};
  color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.gray};
  text-transform: uppercase;
`;

const HedgeButton = styled(BaseButton)`
  ${boxShadowBlue}
  background-color: ${(props) => props.theme.colors.grayBlue};
  color: ${(props) => props.theme.colors.blue};
  text-transform: uppercase;
`;

export default ActionCompleted;
