const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');

const generate = require('./scripts/minify-synthetix-contract');

// For depcheck to be happy
require.resolve('webpack-dev-server');

const isProd = process.env.NODE_ENV === 'production';

function optimiseContracts() {
  const networks = ['goerli', 'goerli-ovm', 'mainnet', 'mainnet-ovm'];
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
        new RegExp('/synthetix/publish/deployed/(kovan|local)'),
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

const tsxRule = {
  test: /\.(ts|tsx)$/,
  include: [/v1\/lib/, /v1\/components/, /v2\/lib/, /v2\/components/, /v2\/ui/],
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

const cssRule = {
  test: /\.css$/,
  use: ['style-loader', 'css-loader'],
};

const devServer = {
  port: '3000',

  hot: true,
  liveReload: false,

  historyApiFallback: {
    index: '/index.html',
  },

  devMiddleware: {
    writeToDisk: true,
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
  compress: true,
};

module.exports = {
  devtool: isProd ? 'source-map' : 'eval',
  devServer,
  mode: isProd ? 'production' : 'development',
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
    .concat([
      new webpack.NormalModuleReplacementPlugin(
        /^@tanstack\/react-query$/,
        require.resolve('@tanstack/react-query')
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
      }),
    ])
    .concat(isProd ? [] : [new ReactRefreshWebpackPlugin({ overlay: false })])
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
    rules: [tsxRule, svgRule, imgRule, cssRule],
  },
};
