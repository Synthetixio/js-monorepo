import { request } from 'graphql-request'

import { l1Endpoints, l2Endpoints } from './constants';
import { exchangesQuery } from '../queries';


const synthetixData = ({ useOvm }: { useOvm: boolean }) => ({
  exchanges: ({ maxBlock, max, fromAddress, minTimestamp }: { maxBlock?: number, max?: number, fromAddress?: string, minTimestamp?: number }) => request(useOvm ? l2Endpoints.snx : l1Endpoints.exchanges, exchangesQuery, {
    maxBlock, max, fromAddress, minTimestamp
  })
});


export default synthetixData;