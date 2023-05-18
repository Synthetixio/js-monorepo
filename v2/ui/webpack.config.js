const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const generate = require('./scripts/minify-synthetix-contract');

// For depcheck to be happy
require.resolve('webpack-dev-server');

const isProd = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';

function optimiseContracts() {
  const networks = isTest ? ['mainnet'] : ['goerli', 'goerli-ovm', 'mainnet', 'mainnet-ovm'];
  const out = path.resolve(__dirname, './out');
  generate({ networks, out });

  return []
    .concat(
      networks.map(
        (network) =>
          new webpack.NormalModuleReplacementPlugin(
            new RegExp(`/synthetix/publish/deployed/${network}/deployment.json`),
            require.resolve(`${out}/${network}.json`)
          )
      )
    )
    .concat([
      new webpack.NormalModuleReplacementPlugin(
        isTest
          ? new RegExp('/synthetix/publish/deployed/(kovan|local|goerli|goerli-ovm|mainnet-ovm)')
          : new RegExp('/synthetix/publish/deployed/(local)'),
        require.resolve('./scripts/noop')
      ),
      new webpack.NormalModuleReplacementPlugin(
        /^synthetix$/,
        require.resolve('synthetix/index.js')
      ),
    ]);
}

const contractPlugins = optimiseContracts();

const htmlPlugin = new HtmlWebpackPlugin({
  template: './index.html',
  scriptLoading: 'defer',
  minify: false,
  hash: false,
  xhtml: true,
  excludeChunks: ['main'],
});

const babelRule = {
  test: /\.(ts|tsx|js|jsx)$/,
  include: [
    /v1\/lib/,
    /v1\/components/,
    /v2\/lib/,
    /v2\/contracts/,
    /v2\/components/,
    /v2\/cypress/,
    /v2\/ui/,
    /v3\/theme/,
    /v3\/lib/,

    /packages\/[^\/]+\/src/,
    /tools\/[^\/]+\/src/,
  ],
  resolve: {
    fullySpecified: false,
  },
  use: {
    loader: require.resolve('babel-loader'),
    options: {
      configFile: path.resolve(__dirname, 'babel.config.js'),
    },
  },
};

const svgRule = {
  test: /\.svg$/,
  use: '@svgr/webpack',
  include: [/v1\/lib/, /v1\/components/, /v2\/lib/, /v2\/components/, /v2\/ui\/assets/],
};

const imgRule = {
  test: /\.(png|jpg|ico|gif|woff|woff2|ttf|eot|doc|pdf|zip|wav|avi|txt|webp)$/,
  type: 'asset',
  parser: {
    dataUrlCondition: {
      maxSize: 4 * 1024, // 4kb
    },
  },
};

const rawRule = {
  test: /\.(svg)$/,
  type: require.resolve('raw-loader'),
  include: [/node_modules\/@web3-onboard\/injected-wallets/],
};

const cssRule = {
  test: /\.css$/,
  use: ['style-loader', 'css-loader'],
};

const devServer = {
  port: '3000',

  hot: !isTest,
  liveReload: false,

  historyApiFallback: {
    index: '/index.html',
  },

  devMiddleware: {
    writeToDisk: !isTest,
    publicPath: '/',
  },

  client: {
    logging: 'log',
    overlay: false,
    progress: false,
  },

  static: './public',

  headers: { 'Access-Control-Allow-Origin': '*' },
  allowedHosts: 'all',
  open: false,
  compress: false,
};

module.exports = {
  devtool: isProd ? 'source-map' : isTest ? false : 'eval',
  devServer,
  mode: isProd ? 'production' : 'development',
  //  experiments: {
  //    lazyCompilation: !isProd,
  //  },
  entry: './index.ts',

  output: {
    path: path.resolve(__dirname, 'out'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: isProd ? 'chunk/[name].[contenthash:8].js' : '[name].js',
    assetModuleFilename: '[name].[contenthash:8][ext]',
    clean: true,
  },

  optimization: {
    runtimeChunk: false,
    splitChunks: {
      chunks: 'async',
      maxAsyncRequests: 10,
      maxInitialRequests: 10,
      hidePathInfo: true,
      automaticNameDelimiter: '--',
      name: false,
    },
    moduleIds: isProd ? 'deterministic' : 'named',
    chunkIds: isProd ? 'deterministic' : 'named',
    minimize: isProd,
    minimizer: [new TerserPlugin()],
    innerGraph: true,
    emitOnErrors: false,
  },

  plugins: [htmlPlugin]
    .concat(contractPlugins)
    .concat(isProd ? [new CopyPlugin({ patterns: [path.resolve('./public')] })] : [])
    .concat([
      new webpack.NormalModuleReplacementPlugin(
        /^@tanstack\/react-query$/,
        require.resolve('@tanstack/react-query')
      ),
      new webpack.NormalModuleReplacementPlugin(/^bn.js$/, require.resolve('bn.js')),
    ])
    .concat([
      new webpack.NormalModuleReplacementPlugin(
        new RegExp(`^@synthetixio/contracts-interface$`),
        path.resolve(
          path.dirname(require.resolve(`@synthetixio/contracts-interface/package.json`)),
          'src'
        )
      ),
      new webpack.NormalModuleReplacementPlugin(
        new RegExp(`^@synthetixio/optimism-networks$`),
        path.resolve(
          path.dirname(require.resolve(`@synthetixio/optimism-networks/package.json`)),
          'src'
        )
      ),
      new webpack.NormalModuleReplacementPlugin(
        new RegExp(`^@synthetixio/queries$`),
        path.resolve(path.dirname(require.resolve(`@synthetixio/queries/package.json`)), 'src')
      ),
      new webpack.NormalModuleReplacementPlugin(
        new RegExp(`^@synthetixio/generate-subgraph-query$`),
        path.resolve(
          path.dirname(require.resolve(`@synthetixio/generate-subgraph-query/package.json`)),
          'src'
        )
      ),
      new webpack.NormalModuleReplacementPlugin(
        new RegExp(`^@synthetixio/v3-theme$`),
        path.resolve(path.dirname(require.resolve(`@synthetixio/v3-theme/package.json`)), 'src')
      ),
    ])
    .concat([
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
        process: 'process/browser.js',
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development'),
        'process.env.DEBUG': JSON.stringify(process.env.DEBUG),
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
        'process.env.INFURA_ARCHIVE_KEY': JSON.stringify(process.env.INFURA_ARCHIVE_KEY),
        'process.env.NEXT_PUBLIC_SOCKET_API_KEY': JSON.stringify(
          process.env.NEXT_PUBLIC_SOCKET_API_KEY
        ),
        'process.env.NEXT_PUBLIC_BOARDROOM_KEY': JSON.stringify(
          process.env.NEXT_PUBLIC_BOARDROOM_KEY
        ),
        'process.env.NEXT_PUBLIC_ALCHEMY_MAINNET_KEY': JSON.stringify(
          process.env.NEXT_PUBLIC_ALCHEMY_MAINNET_KEY
        ),
        'process.env.NEXT_PUBLIC_ALCHEMY_OVM_KEY': JSON.stringify(
          process.env.NEXT_PUBLIC_ALCHEMY_OVM_KEY
        ),
      }),
    ])
    .concat(isProd ? [] : isTest ? [] : [new ReactRefreshWebpackPlugin({ overlay: false })])
    .concat(
      process.env.GENERATE_BUNDLE_REPORT === 'true'
        ? [
            new BundleAnalyzerPlugin({
              analyzerMode: 'static',
              reportFilename: path.resolve(__dirname, 'tmp', 'webpack.html'),
              openAnalyzer: false,
              generateStatsFile: false,
            }),
          ]
        : []
    ),

  resolve: {
    alias: {
      '@synthetixio/contracts/build': '@synthetixio/contracts/src',
      '@synthetixio/contracts-interface/build': '@synthetixio/contracts-interface/src',
      '@synthetixio/optimism-networks/build': '@synthetixio/optimism-networks/src',
      '@synthetixio/queries/build': '@synthetixio/queries/src',
    },
    fallback: {
      buffer: require.resolve('buffer'),
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
      process: require.resolve('process/browser.js'),
      http: false,
      https: false,
      os: false,
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs'],
  },

  module: {
    rules: [babelRule, svgRule, imgRule, cssRule, rawRule],
  },
};
