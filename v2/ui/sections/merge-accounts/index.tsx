import { FC, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import Landing from './landing';
import Burn from './burn';
import Nominate from './nominate';
import Merge from './merge';
import Connector from 'containers/Connector';

const Index: FC = () => {
  const { isAppReady } = Connector.useContainer();

  const { search } = useLocation();
  const activeTab = useMemo(() => new URLSearchParams(search).get('action'), [search]);

  switch (true) {
    case isAppReady && activeTab === 'burn':
      return <Burn />;
    case isAppReady && activeTab === 'nominate':
      return <Nominate />;
    case isAppReady && activeTab === 'merge':
      return <Merge />;
    case isAppReady:
      return <Landing />;
    default:
      return null;
  }
};

export default Index;
