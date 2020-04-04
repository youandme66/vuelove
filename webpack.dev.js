const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map',
    optimization: {
        splitChunks: {
            chunks: 'initial'
        }
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: ['vue-loader']
        }, {
            test: /\.css$/,
            use: ['vue-style-loader', 'css-loader']
        }, {
            test: /\.(png|jpg|gif|eot|svg|ttf|woff|woff2)/,
            use: [{
                loader: 'file-loader',
                options: {}
            }]
        }]
    },
     devServer:{//开发服务器
         hot:true,//热更新
         inline: true,
        //  open:true,//是否自动打开默认浏览器
         contentBase: './',//发布目录
         port:'8081',//控制端口
         host:'0.0.0.0',//host地址
        //  historyApiFallback:true,
        //  useLocalIp:true,//是否用自己的IP
        //  proxy:{
        //      '/action':'http://127.0.0.1:8080/'
        //  }
     }
});