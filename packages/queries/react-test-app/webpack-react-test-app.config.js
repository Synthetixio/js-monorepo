'use strict';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
	entry: path.join(__dirname, '/src/index.tsx'),
	module: {
		rules: [
			{
				test: /\.(ts|tsx)?$/,
				use: {
					loader: 'ts-loader',
					options: {
						configFile: path.join(__dirname, 'tsconfig.react-test-app.json'),
					},
				},
				exclude: /node_modules/,
			},
		],
	},
	resolve: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
	output: {
		path: path.resolve(__dirname, '/dist/'),
		publicPath: '/dist/',
		filename: 'bundle.js',
	},
	devServer: {
		contentBase: path.join(__dirname, '/public/'),
		port: 3000,
		publicPath: 'http://localhost:3000/dist/',
		hotOnly: true,
	},
	plugins: [],
};
