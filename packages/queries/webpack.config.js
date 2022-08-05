'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebpackPlugin({
	minify: false,
	hash: false,
	xhtml: true,
});

module.exports = {
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: ['/node_modules/'],
				use: {
					loader: 'ts-loader',
				},
			},
		],
	},
	entry: './examples/index.js',
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
		fallback: {
			child_process: false,
			fs: false,
			net: false,
		},
	},
	plugins: [htmlPlugin],
};
