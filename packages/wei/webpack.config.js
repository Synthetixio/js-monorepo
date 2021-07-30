'use strict';

const path = require('path');

module.exports = {
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
	node: {
		child_process: 'empty',
		fs: 'empty',
		net: 'empty',
	},
	entry: path.resolve(__dirname, 'src/index.ts'),
	target: 'web',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'index.js',
		libraryTarget: 'umd',
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
	plugins: [],
};
