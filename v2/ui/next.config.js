const withPlugins = require('next-compose-plugins');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.GENERATE_BUNDLE_REPORT === 'true',
});

function optimiseContracts(config, { webpack }) {
  const networks = ['goerli', 'goerli-ovm', 'mainnet', 'mainnet-ovm'];
  const generate = require('./scripts/minify-synthetix-contract');
  const out = require('path').resolve(__dirname, '.next/tmp');
  require('fs').mkdirSync(out, { recursive: true });
  generate({ networks, out });

  networks.forEach((network) =>
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        new RegExp(`/synthetix/publish/deployed/${network}/deployment.json`),
        require.resolve(`${out}/${network}.json`)
      )
    )
  );
  config.plugins.push(
    new webpack.NormalModuleReplacementPlugin(
      new RegExp('/synthetix/publish/deployed/(kovan|local)'),
      require.resolve('./scripts/noop')
    )
  );
  config.plugins.push(
    new webpack.NormalModuleReplacementPlugin(/^synthetix$/, require.resolve('synthetix/index.js'))
  );
}

const path = require('path');
const tsxRule = {
  test: /\.tsx?$/,
  include: [/v1\/lib/, /v1\/components/, /v2\/lib/, /v2\/components/],
  use: {
    loader: require.resolve('swc-loader'),
    options: {
      test: '.tsx?$',
      sourceMaps: true,
      env: {
        mode: 'entry',
        coreJs: '3.22',
      },
      jsc: {
        baseUrl: path.resolve(__dirname),
        paths: {
          i18n: [path.resolve(__dirname, 'i18n.ts')],
          'assets/*': [path.resolve(__dirname, 'assets', '*')],
          'components/*': [path.resolve(__dirname, 'components', '*')],
          'constants/*': [path.resolve(__dirname, 'constants', '*')],
          containers: [path.resolve(__dirname, 'containers')],
          'containers/*': [path.resolve(__dirname, 'containers', '*')],
          'content/*': [path.resolve(__dirname, 'content', '*')],
          contracts: [path.resolve(__dirname, 'contracts')],
          'contracts/*': [path.resolve(__dirname, 'contracts', '*')],
          'hoc/*': [path.resolve(__dirname, 'hoc', '*')],
          'hooks/*': [path.resolve(__dirname, 'hooks', '*')],
          'lib/*': [path.resolve(__dirname, 'lib', '*')],
          'mutations/*': [path.resolve(__dirname, 'mutations', '*')],
          'queries/*': [path.resolve(__dirname, 'queries', '*')],
          'scripts/*': [path.resolve(__dirname, 'scripts', '*')],
          'sections/*': [path.resolve(__dirname, 'sections', '*')],
          'store/*': [path.resolve(__dirname, 'store', '*')],
          'styles/*': [path.resolve(__dirname, 'styles', '*')],
          'translations/*': [path.resolve(__dirname, 'translations', '*')],
          'typings/*': [path.resolve(__dirname, 'typings', '*')],
          'utils/*': [path.resolve(__dirname, 'utils', '*')],
        },
        parser: {
          syntax: 'typescript',
          tsx: true,
          decorators: false,
          dynamicImport: true,
        },
        transform: {
          react: {
            runtime: 'automatic',
          },
          optimizer: {
            globals: {
              vars: {
                'process.env.NEXT_PUBLIC_PORTIS_APP_ID': JSON.stringify(
                  process.env.NEXT_PUBLIC_PORTIS_APP_ID
                ),
                'process.env.NEXT_PUBLIC_BN_NOTIFY_API_KEY': JSON.stringify(
                  process.env.NEXT_PUBLIC_BN_NOTIFY_API_KEY
                ),
                'process.env.NEXT_PUBLIC_BN_ONBOARD_API_KEY': JSON.stringify(
                  process.env.NEXT_PUBLIC_BN_ONBOARD_API_KEY
                ),
                'process.env.NEXT_PUBLIC_INFURA_PROJECT_ID': JSON.stringify(
                  process.env.NEXT_PUBLIC_INFURA_PROJECT_ID
                ),
                'process.env.NODE_ENV': JSON.stringify('development'),
              },
            },
          },
        },
      },
    },
  },
};

module.exports = withPlugins([withBundleAnalyzer], {
  swcMinify: true,

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    disableStaticImages: true,
  },

  webpack: (config, context) => {
    config.resolve.mainFields = ['module', 'browser', 'main'];
    config.module.rules.unshift(tsxRule);
    if (!context.isServer) {
      optimiseContracts(config, context);
    }

    config.module.rules.push({
      test: /\.svg$/,
      use: require.resolve('@svgr/webpack'),
    });

    config.module.rules.push({
      test: /\.(png|jpg|ico|gif|woff|woff2|ttf|eot|doc|pdf|zip|wav|avi|txt|webp)$/,
      type: 'asset',
      generator: {
        outputPath: './static/images',
        publicPath: '/_next/static/images',
      },
      parser: {
        dataUrlCondition: {
          maxSize: 4 * 1024, // 4kb
        },
      },
    });

    return config;
  },
  trailingSlash: !!process.env.NEXT_PUBLIC_TRAILING_SLASH_ENABLED,
  exportPathMap: function (defaultPathMap) {
    return {
      ...defaultPathMap,

      // all the dynamic pages need to be defined here (this needs to be imported from the routes)
      '/staking': { page: '/staking/[[...action]]' },
      '/staking/burn': { page: '/staking/[[...action]]' },
      '/staking/mint': { page: '/staking/[[...action]]' },

      '/earn': { page: '/earn/[[...pool]]' },
      '/earn/claim': { page: '/earn/[[...pool]]' },
      '/earn/curve-LP': { page: '/earn/[[...pool]]' },
      '/earn/iBTC-LP': { page: '/earn/[[...pool]]' },
      '/earn/iETH-LP': { page: '/earn/[[...pool]]' },

      '/pools/weth-snx': { page: '/pools/[[...pool]]' },
    };
  },
});
