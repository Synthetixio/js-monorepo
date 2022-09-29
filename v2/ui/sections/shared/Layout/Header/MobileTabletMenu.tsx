import { FC, useMemo } from 'react';
import styled from 'styled-components';

import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import UIContainer from 'containers/UI';
import TitleIcon from 'assets/svg/app/menu-hamburger-white.svg';
import { headerInfo } from '../../helpers';

const MobileTabletMenu: FC = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const { headerTitle, headerSubtitle } = useMemo(
    () => headerInfo(location.pathname),
    [location.pathname]
  );

  const { dispatch } = UIContainer.useContainer();
  //@ts-ignore
  const titleText = `${t(`header.${headerTitle}`)}`;
  //@ts-ignore
  const subTitleText = `${t(`header.${headerTitle}/${headerSubtitle}`)}`;
  return (
    <>
      <Title onClick={() => dispatch({ type: 'open' })}>
        <TitleIcon width="18" />
        {headerTitle && <TitleText hasSubTitle={!!headerSubtitle}>{titleText}</TitleText>}
        {headerSubtitle && (
          <>
            <TitleSep>|</TitleSep>
            <SubtitleText>{subTitleText}</SubtitleText>
          </>
        )}
      </Title>
    </>
  );
};

const Title = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-family: ${(props) => props.theme.fonts.condensedMedium};
  font-size: 12px;
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.gray};

  svg {
    margin-right: 10px;
  }
`;

const TitleText = styled.div<{ hasSubTitle: boolean }>`
  color: ${(props) => (props.hasSubTitle ? props.theme.colors.gray : props.theme.colors.blue)};
`;

const TitleSep = styled.div`
  padding: 0 5px;
`;

const SubtitleText = styled.div`
  color: ${(props) => props.theme.colors.blue};
`;

export default MobileTabletMenu;
