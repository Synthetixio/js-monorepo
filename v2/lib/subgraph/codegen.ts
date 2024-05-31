import type { CodegenConfig } from '@graphql-codegen/cli';

// Depcheck
import '@graphql-codegen/add';
import '@graphql-codegen/schema-ast';
import '@graphql-codegen/typescript';

const config: CodegenConfig = {
  overwrite: true,
  ignoreNoDocuments: true,
  verbose: false,
  debug: false,
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
  generates: {
    './mainnet.graphql': {
      schema: 'https://subgraph.satsuma-prod.com/ce5e03f52f3b/synthetix/synthetix/api',
      plugins: ['@graphql-codegen/schema-ast'],
    },

    './mainnet.ts': {
      schema: 'https://subgraph.satsuma-prod.com/ce5e03f52f3b/synthetix/synthetix/api',
      plugins: [
        {
          '@graphql-codegen/add': {
            content: '// !!! DO NOT EDIT !!! Automatically generated file\n\n',
          },
        },
        '@graphql-codegen/typescript',
      ],
    },

    './optimism.graphql': {
      schema: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/optimism-main',
      plugins: ['@graphql-codegen/schema-ast'],
    },

    './optimism.ts': {
      schema: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/optimism-main',
      plugins: [
        {
          '@graphql-codegen/add': {
            content: '// !!! DO NOT EDIT !!! Automatically generated file\n\n',
          },
        },
        '@graphql-codegen/typescript',
      ],
    },
  },
};

export default config;
