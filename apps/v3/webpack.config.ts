import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration } from 'webpack';
import 'webpack-dev-server';

const htmlPlugin = new HtmlWebpackPlugin({
	template: path.join(__dirname, 'public', 'index.html'),
	scriptLoading: 'defer',
	minify: false,
	hash: false,
	xhtml: true,
});

const tsxRule = {
	test: /\.(ts|js)x?$/,
	exclude: /node_modules/,
	use: {
		loader: 'babel-loader',
		options: {
			presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
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
		index: 'public/index.html',
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

	allowedHosts: 'all',
	open: false,
	compress: true,
};

const config: Configuration = {
	devtool: 'eval',
	mode: 'development',
	entry: './src/index.tsx',
	// @ts-ignore
	devServer,

	plugins: [htmlPlugin],

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
};

export default config;
