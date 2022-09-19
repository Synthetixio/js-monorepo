const { defineConfig } = require('cypress');
const webpack = require('webpack');
const path = require('path');

module.exports = defineConfig({
  component: {
    specPattern: ['../**/*.cy.{js,jsx,ts,tsx}'],
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig: {
        devtool: false,
        mode: 'development',
        entry: './index.ts',
        output: {
          publicPath: '',
          filename: '[name].js',
          chunkFilename: '[name].js',
          assetModuleFilename: '[name].[contenthash:8][ext]',
        },
        plugins: [
          new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
            process: 'process/browser.js',
          }),
          new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
          }),
        ],
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
          rules: [
            {
              test: /\.(ts|tsx|js|jsx)$/,
              include: [
                /v1\/lib/,
                /v1\/components/,
                /v2\/lib/,
                /v2\/components/,
                /v2\/ui/,
                /v2\/cypress/,
              ],
              resolve: {
                fullySpecified: false,
              },
              use: {
                loader: require.resolve('babel-loader'),
                options: {
                  babelrc: false,
                  presets: [
                    require.resolve('@babel/preset-typescript'),
                    [require.resolve('@babel/preset-react'), { runtime: 'automatic' }],
                    [
                      require.resolve('@babel/preset-env'),
                      {
                        modules: false,
                        targets: { browsers: ['last 1 Chrome version'] },
                      },
                    ],
                  ],
                  plugins: [
                    [
                      require.resolve('babel-plugin-module-resolver'),
                      {
                        root: ['.'],
                        alias: {
                          i18n: path.resolve('../ui/i18n.ts'),
                          assets: path.resolve('../ui/assets'),
                          components: path.resolve('../ui/components'),
                          constants: path.resolve('../ui/constants'),
                          containers: path.resolve('../ui/containers'),
                          content: path.resolve('../ui/content'),
                          contracts: path.resolve('../ui/contracts'),
                          hoc: path.resolve('/../ui/hoc'),
                          hooks: path.resolve('../ui/hooks'),
                          lib: path.resolve('/../ui/lib'),
                          mutations: path.resolve('../ui/mutations'),
                          queries: path.resolve('../ui/queries'),
                          scripts: path.resolve('../ui/scripts'),
                          sections: path.resolve('../ui/sections'),
                          store: path.resolve('../ui/store'),
                          styles: path.resolve('../ui/styles'),
                          translations: path.resolve('../ui/translations'),
                          typings: path.resolve('../ui/typings'),
                          utils: path.resolve('../ui/utils'),
                        },
                      },
                    ],
                  ],
                },
              },
            },
            {
              test: /\.svg$/,
              use: '@svgr/webpack',
            },
            {
              test: /\.(png|jpg|ico|gif|woff|woff2|ttf|eot|doc|pdf|zip|wav|avi|txt|webp)$/,
              type: 'asset/inline',
            },
            {
              test: /\.css$/,
              use: ['style-loader', 'css-loader'],
            },
          ],
        },
      },
    },
  },

  e2e: {
    specPattern: ['../**/*.e2e.{js,jsx,ts,tsx}'],
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(_on, _config) {
      // implement node event listeners here
    },
  },
});
