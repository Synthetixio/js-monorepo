const path = require('path');
const AutoExport = require('webpack-auto-export');

module.exports = {
	entry: './src/index.ts',
	mode: 'production',
	plugins: [
		new AutoExport({
			extension: '.js', // define extension of generated index file
			exportType: 'named', // the default way to export. values can be: 'named' | 'default' | 'detect'
			baseDir: './src', // base directory to observe the changes
			paths: ['components'],
		}),
	],
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'fonts/',
						},
					},
				],
			},
			{
				test: /\.css/i,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'styles/',
					},
				},
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.css', '.woff', '.woff2'],
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.js',
	},
};
