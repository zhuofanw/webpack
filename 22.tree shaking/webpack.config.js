const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/*
	tree shaking:去除无用代码
		前提：1.必须使用ES6模块化 2.开启production环境
		作用：减少代码体积

	在package.json中配置
	"sideEffects": false 所有代码都没有副作用（都可以进行tree shaking）
		问题：可能会把css/@babel/polyfill等文件干掉
		使用 "sideEffects":["*.css"] 解决该问题
		
*/
const commonCssLoader = [
	MiniCssExtractPlugin.loader,
	"css-loader",
	{
		//还需要在package.json中定义browserlist
		loader: "postcss-loader",
		options: {
			postcssOptions: {
				plugins: [["postcss-preset-env"]],
			},
		},
	},
];

module.exports = {
	entry: "./src/js/index.js",
	output: {
		filename: "js/built.[contenthash:10].js",
		path: resolve(__dirname, "build"),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				//优先执行
				enforce: "pre",
				//在package.json中eslintConfig --> airbnb
				loader: "eslint-loader",
				options: {
					fix: true,
				},
			},
			{
				//以下loader只会匹配一个
				//注意：不能有两个配置处理同一种类型的文件
				oneOf: [
					{
						test: /\.css$/,
						use: [...commonCssLoader],
					},
					{
						test: /\.less$/,
						use: [...commonCssLoader, "less-loader"],
					},
					/* 
						正常来讲，一个文件只能被一个loader处理
						当一个文件要被多个loader处理，name一定要注意执行顺序
						对于.js文件 一定要先检查语法再编译，即先eslint-loader再babel-loader
					*/
					{
						test: /\.js$/,
						exclude: /node_modules/,
						//在package.json中eslintConfig --> airbnb
						loader: "babel-loader",
						options: {
							presets: [
								[
									"@babel/preset-env",
									{
										useBuiltIns: "usage",
										corejs: { version: 3 },
										targets: {
											chrome: "60",
											firefox: "50",
										},
									},
								],
							],
							//开启babel缓存
							//第二次构件时，会读取之前的缓存
							cacheDirectory: true,
						},
					},
					{
						test: /\.(jpg|jpeg|png|gif)$/,
						loader: "url-loader",
						options: {
							limit: 8 * 1024,
							name: "[contenthash:10].[ext]",
							outputPath: "imgs",
							esModule: false,
						},
					},
					{
						test: /.\html$/,
						loader: "html-loader",
					},
					{
						exclude: /\.(js|css|less|html|jpg|jpeg|png|gif)$/,
						loader: "file-loader",
						options: {
							outputPath: "media",
						},
					},
				],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "css/built.[hash:10].css",
		}),
		new OptimizeCssAssetsWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			minify: {
				collapseWhitespace: true,
				removeComments: true,
			},
		}),
	],

	mode: "production",

	devtool: "source-map",
};
