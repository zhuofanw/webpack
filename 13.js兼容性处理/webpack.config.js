const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./src/js/index.js",
	output: {
		filename: "js/built.js",
		path: resolve(__dirname, "build"),
	},
	module: {
		rules: [
			/* 
				js兼容性处理：babel-loader @babel/preset-env @babel/core
					1.基本js兼容性处理->@babel/preset-env 
					问题：只能转换基本语法，如promise不能转换
					2.全部js兼容性处理-> @babel/polyfill
					问题：我只需要解决部分兼容性问题，全部引入体积太大
					3.按需加载-> codejs
			*/
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				options: {
					presets: [
						[
							"@babel/preset-env",
							{
								//按需加载
								useBuiltIns: "usage",
								//指定core-js版本
								corejs: {
									version: 3,
								},
								//指定兼容浏览器到特定版本
								targets: {
									chrome: "60",
									firefox: "60",
									ie: "9",
									safari: "10",
									edge: "17",
								},
							},
						],
					],
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
		}),
	],
	mode: "development",
};
