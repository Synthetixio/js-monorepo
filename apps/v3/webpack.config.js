const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
		loader: require.resolve('babel-loader'),
		options: {
			presets: [
				require.resolve('@babel/preset-env'),
				require.resolve('@babel/preset-react'),
				require.resolve('@babel/preset-typescript'),
			],
		},
	},
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
	use: [require.resolve('style-loader'), require.resolve('css-loader')],
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

module.exports = {
	devtool: 'eval',
	mode: 'development',
	entry: './src/index.tsx',

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
