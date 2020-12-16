/* 
    HMR:hot module replacement 热模块替换
    作用：一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块）
    极大提升构件速度

    css文件：可以使用HMR功能：因为style-loader内部实现了
    js文件：默认不能使用HMR功能 --> 需要修改js代码，添加支持HMR的代码
        注意：HMR功能对js的处理，只能处理非入口js文件的其他文件
    html文件：默认不能使用HMR功能，同时会导致html文件不能热更新了
        解决：修改entry入口，将html文件引入
*/
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: ["./src/js/index.js", "./src/index.html"],
	output: {
		filename: "js/built.js",
		path: resolve(__dirname, "build"),
	},
	module: {
		rules: [
			{
				test: /\.less$/,
				use: ["style-loader", "css-loader", "less-loader"],
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(jpg|jpeg|png|gif)$/,
				loader: "url-loader",
				options: {
					limit: 8 * 1024,
					name: "[hash:10].[ext]",
					//关闭es6模块化
					// esModule:false,
					outputPath: "imgs",
				},
			},
			{
				//处理html中内联img资源
				test: /\.html$/,
				loader: "html-loader",
			},
			{
				//处理其他资源
				exclude: /\.(html|js|css|less|jpg|jpeg|png|gif)$/,
				loader: "file-loader",
				options: {
					name: "[hash:10].[ext]",
					outputPath: "media",
				},
			},
		],
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
		}),
	],
	target: "web",

	mode: "development",

	devServer: {
		contentBase: resolve(__dirname, "build"),
		compress: true,
		port: 3000,
		open: true,
		//开启HMR功能
		hot: true,
	},
	devtool: "inline-source-map",
};

/* 
	source-map: 一种 提供源代码到构建后代码映射 技术（如果构建后代码出错了，通过映射关系可以追踪源代码错误）

	[inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map

	inline-source-map 内联
	hidden-source-map 外联
	eval-source-map	内联
	nosources-source-map 外联
	cheap-source-map 外联
	cheap-module-source-map 外联

*/
