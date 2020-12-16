const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/*
	缓存：
	babel缓存
		cacheDirectory: true,
	文件资源缓存
	hash:每次webpack构建时，会生成一个唯一hash值
		问题：因为js和css同时使用同一个hash值
			如果重新打包单个js，会导致所有缓存失效
		chunkhash：根据chunk生成hash值，如果打包来源于同一个chunk,hash值就一样
		问题：因为css是在js中引入的，所以同属于一个chunk
		contenthash:根据文件的内容生成hash值，不同文件hash值一定不一样

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
