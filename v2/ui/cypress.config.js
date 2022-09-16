const { defineConfig } = require('cypress');
const webpack = require('webpack');

module.exports = defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig: {
        devtool: false,
        mode: 'development',
        entry: './index.ts',
        optimization: false,
        plugins: [
          new webpack.NormalModuleReplacementPlugin(
            /^@tanstack\/react-query$/,
            require.resolve('@tanstack/react-query')
          ),
          new webpack.NormalModuleReplacementPlugin(/^bn.js$/, require.resolve('bn.js')),
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
              include: [/v1\/lib/, /v1\/components/, /v2\/lib/, /v2\/components/, /v2\/ui/],
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
                          i18n: './i18n.ts',
                          assets: './assets',
                          components: './components',
                          constants: './constants',
                          containers: './containers',
                          content: './content',
                          contracts: './contracts',
                          hoc: './hoc',
                          hooks: './hooks',
                          lib: './lib',
                          mutations: './mutations',
                          queries: './queries',
                          scripts: './scripts',
                          sections: './sections',
                          store: './store',
                          styles: './styles',
                          translations: './translations',
                          typings: './typings',
                          utils: './utils',
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
    setupNodeEvents(_on, _config) {
      // implement node event listeners here
    },
  },
});
