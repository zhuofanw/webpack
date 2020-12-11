const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:'./src/index.js',
    output:{
        filename:'built.js',
        path:resolve(__dirname,'build')
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]        
            },
            //打包其他资源（除了html/js/css）
            {
                exclude:/\.(css|js|html)$/,
                loader:'file-loader',
                options:{
                    name:'[hash:5].[ext]'
                }
            }
        ]
    },

    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ],

    mode:'development'
};