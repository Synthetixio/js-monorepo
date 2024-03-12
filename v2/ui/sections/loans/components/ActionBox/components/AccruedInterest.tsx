import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FlexDivRow, FlexDivRowCentered } from '@snx-v1/styles';
import InfoSVG from './InfoSVG';

const AccruedInterest: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Header>{t('loans.interest-accrued')}</Header>
      <FlexDivRowCentered>
        <Item>
          <Text>Not calculated</Text>
          <InfoSVG tip="Accrued interest is not shown for this loan. It is recommended to close this position as interest can lead to liquidation." />
        </Item>
      </FlexDivRowCentered>
    </Container>
  );
};

const Container = styled(FlexDivRow)`
  width: 100%;
  justify-content: space-between;
`;

const Header = styled.p`
  font-family: ${(props) => props.theme.fonts.interBold};
  font-size: 12px;
  color: ${(props) => props.theme.colors.gray};
  text-transform: uppercase;
`;

const Text = styled.span`
  font-family: ${(props) => props.theme.fonts.interBold};
  font-size: 12px;
  color: ${(props) => props.theme.colors.white};
`;

const Item = styled.span`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  svg {
    margin-left: 5px;
  }
`;

export default AccruedInterest;
