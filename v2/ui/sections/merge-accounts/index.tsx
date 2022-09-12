import { FC } from 'react';
import { useParams } from 'react-router-dom';

import Landing from './landing';
import Burn from './burn';
import Nominate from './nominate';
import Merge from './merge';
import Connector from 'containers/Connector';

const Index: FC = () => {
  const { isAppReady } = Connector.useContainer();
  const { action } = useParams();
  switch (true) {
    case isAppReady && action === 'burn':
      return <Burn />;
    case isAppReady && action === 'nominate':
      return <Nominate />;
    case isAppReady && action === 'merge':
      return <Merge />;
    case isAppReady:
      return <Landing />;
    default:
      return null;
  }
};

export default Index;
