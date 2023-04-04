import { CodegenConfig } from '@graphql-codegen/cli';

// TODO change this back to non goerli once we're happy with the changes
const config: CodegenConfig = {
  schema: 'https://api.thegraph.com/subgraphs/name/synthetix-perps/perps-op-goerli',
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
