import Connector from 'containers/Connector';
import styled from 'styled-components';
import { FlexDivColCentered } from '@snx-v1/styles';
import HedgeOptimismTabs from './HedgeOptimismTabs';
import ConnectOrSwitchNetwork from 'components/ConnectOrSwitchNetwork';
import HedgeTabMainnet from './HedgeTabMainnet';

const ManageTab = () => {
  const { walletAddress, isWalletConnected, isMainnet } = Connector.useContainer();

  if (!walletAddress || !isWalletConnected) {
    return (
      <ManageContainer>
        <ConnectOrSwitchNetwork />
      </ManageContainer>
    );
  }
  return (
    <ManageContainer>{isMainnet ? <HedgeTabMainnet /> : <HedgeOptimismTabs />}</ManageContainer>
  );
};

const ManageContainer = styled(FlexDivColCentered)`
  height: 100%;
  justify-content: center;
  background: ${(props) => props.theme.colors.navy};
  font-family: ${(props) => props.theme.fonts.extended};
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.mutedGray};
`;

export default ManageTab;
