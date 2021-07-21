'use strict';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './react-test-app/src/index.tsx',
	module: {
		rules: [
			{
				test: /\.(ts|tsx)?$/,
				use: {
					loader: 'ts-loader',
					options: {
						configFile: 'tsconfig.react-test-app.json',
					},
				},
				exclude: /node_modules/,
			},
		],
	},
	resolve: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
	output: {
		path: path.resolve(__dirname, '/react-test-app/dist/'),
		publicPath: '/react-test-app/dist/',
		filename: 'bundle.js',
	},
	devServer: {
		contentBase: path.join(__dirname, '/react-test-app/public/'),
		port: 3000,
		publicPath: 'http://localhost:3000/dist/',
		hotOnly: true,
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: './react-test-app/public/index.html',
			filename: 'index.html',
		}),
	],
};
