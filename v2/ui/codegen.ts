import type { CodegenConfig } from '@graphql-codegen/cli';

// Depcheck
import '@graphql-codegen/introspection';
import '@graphql-codegen/near-operation-file-preset';
import '@graphql-codegen/schema-ast';
import '@graphql-codegen/typescript';
import '@graphql-codegen/typescript-operations';
import '@graphql-codegen/typescript-react-query';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/synthetix',
  ignoreNoDocuments: true,
  documents: [
    '../lib/**/*.tsx',
    '../lib/**/*.graphql',
    '../components/**/*.tsx',
    '../components/**/*.graphql',
    '**/*.tsx',
    '**/*.graphql',
    '!sections/gov/**/*',
  ],
  verbose: false,
  debug: false,
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
  generates: {
    'schema.graphql': {
      plugins: ['@graphql-codegen/schema-ast'],
    },

    'schema.graphql.ts': {
      plugins: [
        { add: { content: '// !!! DO NOT EDIT !!! Automatically generated file\n\n' } },
        '@graphql-codegen/typescript',
      ],
    },

    './': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.tsx',
        baseTypesPath: './schema.graphql.ts',
      },
      plugins: [
        { add: { content: '// !!! DO NOT EDIT !!! Automatically generated file\n\n' } },
        '@graphql-codegen/typescript-operations',
        '@graphql-codegen/typescript-react-query',
      ],
      config: {
        fetcher: {
          endpoint: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/synthetix',
        },
      },
    },
  },
};

export default config;
