/* 
    webpack.config.js webpack的配置文件
    作用:指示webpack干哪些活

    所有构件工具斗士基于nodejs平台运行的~模块化默认采用commonJS
*/
//resolve 用来拼接绝对路径的方法
const { resolve } = require('path');

module.exports = {
    //webpack 配置
    //入口起点
    entry: './src/index.js',
    //输出
    output:{
        filename: 'built.js', //输出文件名
        path:resolve(__dirname,'build') //__dirname是nodejs变量，代表当前文件的目录绝对路径
    },
    //loader配置
    module:{
        rules:[
            //详细loader配置
            //不同文件必须配置不同loader处理
            {
                test:/\.css$/, //匹配哪些文件
                use: [//use数组中loader执行顺序:从下到上，依次执行
                    'style-loader',//创建style标签，将js中的样式资源插入进行，添加到head中生效
                    'css-loader'//将css文件变成commonJS模块加载js中，里面内容是样式字符串
                ]
            },

            {
                test:/\.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ]
            },
        ]
    },
    //plugins配置
    plugins:[
        //详细plugin配置
    ],
    //模式
    mode:'development',
    // mode:'production',
}