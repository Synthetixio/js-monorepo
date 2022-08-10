const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const { NODE_ENV: mode = 'development' } = process.env;

const htmlPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, 'public', 'index.html'),
  favicon: path.join(__dirname, 'public', 'images', 'favicon.ico'),
  scriptLoading: 'defer',
  minify: false,
  hash: false,
  xhtml: true,
});

const tsxRule = {
  test: /\.(ts|js)x?$/,
  exclude: /node_modules/,
  use: require.resolve('babel-loader'),
};

const svgRule = {
  test: /\.svg$/,
  use: require.resolve('@svgr/webpack'),
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
  include: [new RegExp('./src'), new RegExp('@rainbow-me/rainbowkit')],
  exclude: [],
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '/',
      },
    },
    {
      loader: require.resolve('css-loader'),
    },
  ],
};

const devServer = {
  port: '3000',

  hot: true,
  liveReload: false,

  historyApiFallback: true,

  devMiddleware: {
    writeToDisk: true,
  },

  client: {
    logging: 'log',
    overlay: false,
    progress: false,
  },

  allowedHosts: 'all',
  open: false,
  compress: true,

  static: ['public'],
};

const optimization = {
  minimizer: [new CssMinimizerPlugin()],
};

module.exports = {
  devtool: 'source-map',
  mode,
  entry: './src/index.tsx',

  output: {
    clean: true,
    publicPath: '/',
  },

  devServer,

  plugins: [htmlPlugin, new MiniCssExtractPlugin()],

  resolve: {
    fallback: {
      stream: false,
      crypto: false,
      http: false,
      https: false,
      os: false,
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },

  module: {
    rules: [tsxRule, svgRule, imgRule, cssRule],
  },

  optimization,
};
