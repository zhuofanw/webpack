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
                语法检查:eslint-loader eslint
                注意：只检查自己写的源代码，第三方的库是不用检查的
                设置检查规则：
                package.json中eslintConfig中设置~
                airbnb--eslint-config-airbnb-base eslint-plugin-import
                        eslint 
                        eslint-loader 
            */
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "eslint-loader",
				options: {
					fix: true, //自动fix，修复eslint的错误
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
