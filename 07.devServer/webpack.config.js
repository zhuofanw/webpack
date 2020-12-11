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

    mode:'development',

    //开发服务器devServer：用来自动化（自动编译，自动打开浏览器，自动刷新浏览器）
    //特点：只会在内存中编译打包，不会有任何输出
    //启动devServer指令为：webpack serve（针对webpack-cli @4.0以上）
    devServer:{
        //项目构件后的路径
        contentBase:resolve(__dirname,'build'),
        //启动gzip压缩
        compress:true,
        port:3000,
        //自动打开浏览器
        open:true
    }
};