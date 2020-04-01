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
        }]
    }
});