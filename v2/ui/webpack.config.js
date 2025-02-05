const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const generate = require('./scripts/minify-synthetix-contract');

// For depcheck to be happy
require.resolve('webpack-dev-server');

const isProd = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';

function optimiseContracts() {
  const networks = isTest ? ['mainnet'] : ['mainnet', 'mainnet-ovm'];
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
  devtool: isProd ? 'source-map' : isTest ? false : 'source-map',
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
    .concat(isProd ? [new CopyWebpackPlugin({ patterns: ['public', '_redirects'] })] : [])
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
    ])
    .concat([
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
        process: 'process/browser.js',
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development'),
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
      url: require.resolve('url/'),
      buffer: require.resolve('buffer'),
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
      process: require.resolve('process/browser.js'),
      zlib: require.resolve('browserify-zlib'),
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
