module.exports = {
  env: {
    test: {
      presets: [
        require.resolve('@babel/preset-typescript'),
        [require.resolve('@babel/preset-react'), { runtime: 'automatic' }],
        [
          require.resolve('@babel/preset-env'),
          {
            modules: 'commonjs',
            targets: { node: 'current' },
          },
        ],
      ],
      plugins: [
        [
          require.resolve('babel-plugin-module-resolver'),
          {
            root: ['.'],
            alias: {
              i18n: './v2/ui/i18n.ts',
              assets: './v2/ui/assets',
              components: './v2/ui/components',
              constants: './v2/ui/constants',
              containers: './v2/ui/containers',
              content: './v2/ui/content',
              contracts: './v2/ui/contracts',
              hoc: './v2/ui/hoc',
              hooks: './v2/ui/hooks',
              lib: './v2/ui/lib',
              mutations: './v2/ui/mutations',
              queries: './v2/ui/queries',
              scripts: './v2/ui/scripts',
              sections: './v2/ui/sections',
              store: './v2/ui/store',
              styles: './v2/ui/styles',
              translations: './v2/ui/translations',
              typings: './v2/ui/typings',
              utils: './v2/ui/utils',

              '@synthetixio/contracts-interface': './packages/contracts-interface/src',
              '@synthetixio/optimism-networks': './packages/optimism-networks/src',
              '@synthetixio/queries': './packages/queries/src',
              '@synthetixio/generate-subgraph-query': './tools/generate-subgraph-query/src',

              '@synthetixio/contracts/build': './v2/contracts/src',

              '@synthetixio/v3-contracts/build': './v3/contracts/src',
              '@synthetixio/v3-theme': './v3/theme/src',
            },
          },
        ],
      ],
    },
  },
};
