const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const IS_DEV = (process.env.NODE_ENV !== 'production');
const IS_BUILD = !IS_DEV;

module.exports = {
	devtool: 'eval-cheap-module-source-map',
	cache: true,
	entry: {
		bundle: IS_DEV ? [
			// 'babel-polyfill',
			'react-hot-loader/patch',
			'./src/index'
		] : [
			'./src/index'
		]
	},
	output: IS_DEV ? {
		pathinfo: true,
		publicPath: '/',
		filename: '[name].js'
	} : {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].[chunkhash].js'
	},

	plugins: [
		new HtmlWebpackPlugin({
			title: 'Boilerplate',
		}),
		new webpack.NamedModulesPlugin(),
		
		IS_DEV && new webpack.HotModuleReplacementPlugin(),

		IS_BUILD && new CleanWebpackPlugin(['dist']),
		IS_BUILD && new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}),
		IS_BUILD && new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			}
		})
	].filter(k => k),
	module: {
		rules: [
			{ 
				test: /\.js$/, 
				exclude: /node_modules/, 
				use: {
					loader: 'babel-loader', 
					options: {
						cacheDirectory: true,
						"presets": [["env", {"modules": false}], "react", "stage-0"],
						"plugins": ["react-hot-loader/babel"]
					}
				}
			},
			{
				test: /\.css$/,
				loaders: ["style-loader", "css-loader", "less-loader"]
			},
			{
				test: /\.(jpe?g|png|gif|svg|pdf)$/i,
				loader: "file-loader"
			}
		]
	},
	node: {
		'fs': 'empty',
	}
}
