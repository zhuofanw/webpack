const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    output:{
        filename:'built.js',
        path:resolve(__dirname,'build')
    },
    module:{
        rules:[
            {
                test:/\.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test:/\.(jpeg|png|gif)$/,
                //需要下载两个loader url-loader file-loader
                loader:'url-loader',
                options:{
                //图片大小小于8kb，就会被base64处理
                //base64优点：减少请求数量（减轻服务器压力）
                //base64缺点：图片体积会更大（文件请求速度更慢）
                    limit: 8*1024
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ],
    mode:'development'
};