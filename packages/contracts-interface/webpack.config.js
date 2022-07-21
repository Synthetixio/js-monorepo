'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebpackPlugin({
	template: './examples/browser-example.html',
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
		extensions: ['.ts', '.js'],
		fallback: {
			child_process: false,
			fs: false,
			net: false,
		},
	},
	plugins: [htmlPlugin],
};
