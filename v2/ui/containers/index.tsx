import { FC, ReactNode } from 'react';

import Connector from './Connector';
import BlockExplorer from './BlockExplorer';

type WithAppContainersProps = {
  children: ReactNode;
};

export const WithAppContainers: FC<WithAppContainersProps> = ({ children }) => (
  <Connector.Provider>
    <BlockExplorer.Provider>{children}</BlockExplorer.Provider>
  </Connector.Provider>
);

export default WithAppContainers;
