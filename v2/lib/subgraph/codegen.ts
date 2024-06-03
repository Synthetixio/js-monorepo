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
      schema:
        'https://gateway-arbitrum.network.thegraph.com/api/3955c204decac48c529b8105344afb7f/subgraphs/id/39nXvA89wrgSz7vRAq6uxmvYn2CTNDuSfXJue3m7PVKA',
      plugins: ['@graphql-codegen/schema-ast'],
    },

    './optimism.ts': {
      schema:
        'https://gateway-arbitrum.network.thegraph.com/api/3955c204decac48c529b8105344afb7f/subgraphs/id/39nXvA89wrgSz7vRAq6uxmvYn2CTNDuSfXJue3m7PVKA',
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
