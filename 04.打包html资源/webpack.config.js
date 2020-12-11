/*  loader : 1.npm下载loader 2.在module里配置loader
    plugins: 1.npm下载 2.引入 3.使用
*/
const { resolve } = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:'./src/index.js',
    output:{
        filename:'built.js',
        path: resolve(__dirname,'build')
    },
    module:{
        rules:[

        ]
    },
    plugins:[
        //html-webpack-plugin
        //功能：默认会创建一个空的html，自动引入打包输出的所有资源（JS/CSS）
        //需要：需要有结构的HTML文件
        new HTMLWebpackPlugin({
            //复制'./src/index.html'文件，并自动引入打包输出的所有资源（JS/CSS）
            template: './src/index.html'
        })
    ],

    mode:'development',
};