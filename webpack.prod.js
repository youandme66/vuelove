const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(common, {
    mode: 'production', // 压缩代码
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader // 提取css到外部文件中
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|eot|svg|ttf|woff|woff2)/,
                use: [{
                    loader: 'file-loader',
                    options: {}
                }]
            }, 
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: { appendTsSuffixTo: [/.vue$/] }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css'
        })
    ]
});