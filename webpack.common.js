const {join:pathJoin, resolve} = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
    entry:{
        app:'./src/index.js' // 入口文件的位置
    },
    output:{
        filename:'[name].[hash].js', // 输出文件名字的格式
        path:pathJoin(__dirname,'./dist') // 输出的绝对路径
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template:'template.html',// 指定模板html文件
            filename:'index.html'// 输出的html文件名称
        }),
        new VueLoaderPlugin()
    ],
    resolve: {
        alias: {
            '@': resolve('src')
        }
    }
}

// https://segmentfault.com/a/1190000016505920
// https://blog.csdn.net/xyr0709/article/details/92835670
// https://www.iconfont.cn/manage/index
// https://cn.vuejs.org/v2/guide/components.html
// https://vuex.vuejs.org/zh/guide/actions.html
// https://router.vuejs.org/zh/guide