require('dotenv').config({ path: '.env.local', override: true });
import { CodegenConfig } from '@graphql-codegen/cli';
import { PERPS_V2_DASHBOARD_GRAPH_GOERLI_URL, PERPS_V2_DASHBOARD_GRAPH_URL } from './src/utils';
import { isStaging } from './src/utils/isStaging';

const config: CodegenConfig = {
  schema: isStaging ? PERPS_V2_DASHBOARD_GRAPH_GOERLI_URL : PERPS_V2_DASHBOARD_GRAPH_URL,
  documents: ['src/**/*.ts'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [],
      config: {
        scalars: {
          Bytes: 'string',
          BigInt: 'string',
          BigDecimal: 'string',
        },
      },
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
