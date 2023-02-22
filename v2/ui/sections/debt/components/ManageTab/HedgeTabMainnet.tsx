import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { ExternalLink } from '@snx-v1/styles';
import { EXTERNAL_LINKS } from '../../../../constants/links';
import { handleSwitchChain } from '@synthetixio/providers';
import Connector from '../../../../containers/Connector';
import { providers } from 'ethers';

export default function HedgeTapMainnet() {
  const { t } = useTranslation();
  const { provider } = Connector.useContainer();
  return (
    <StyledHedgeWrapper>
      <Headline>Hedging with dSNX is only available on Optimism</Headline>
      <StyledLink
        onClick={(e) => {
          e.preventDefault();
          handleSwitchChain(provider as providers.Web3Provider, false);
        }}
      >
        {t('debt.actions.manage.l1-deprecation.switch-link')}
      </StyledLink>
      <SubHeadline>
        Or buy on{' '}
        <StyledExternalLink href={EXTERNAL_LINKS.Toros.dSNXPool}>Toros</StyledExternalLink>
      </SubHeadline>
    </StyledHedgeWrapper>
  );
}

const SubHeadline = styled.h3`
  font-weight: bold;
  color: white;
  margin-bottom: 0;
  font-size: 16px;
  margin-top: 16px;
`;

const StyledLink = styled(ExternalLink)`
  color: ${(props) => props.theme.colors.pink};
  cursor: pointer;
  margin-top: 16px;
`;
const StyledHedgeWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #828295;
  font-family: Inter;
  font-size: 14px;
  text-transform: initial;
`;

const Headline = styled.h2`
  color: white;
  font-size: 21px;
`;
const StyledExternalLink = styled.a`
  text-decoration: none;
  color: ${(props) => props.theme.colors.blue};
  &:hover {
    text-decoration: none;
  }
`;
