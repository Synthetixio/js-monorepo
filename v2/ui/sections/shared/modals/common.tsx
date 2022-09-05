import styled from 'styled-components';
import { FlexDivRow } from '@snx-v1/styles';

import BaseModal from 'components/BaseModal';
import media from '@snx-v1/media';

export const RowsContainer = styled.div`
  overflow: auto;
`;

export const RowsHeader = styled(FlexDivRow)`
  text-transform: uppercase;
  font-family: ${(props) => props.theme.fonts.condensedBold};
  padding: 0 16px 9px 16px;
`;

export const CenteredModal = styled(BaseModal)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  [data-reach-dialog-content] {
    margin: 0;
  }
  ${media.lessThan('sm')`
    display: unset;
  `}
`;

export const MenuModal = styled(CenteredModal)`
  justify-content: flex-start;
  padding-top: 90px;
  .card-body {
    padding: 36px;
  }
`;
