/**
 * Created by Reid on 2018/8/1.
 */
const path = require("path");
const merge = require('webpack-merge');//webpack配置文件合并
const AssetsPlugin = require('assets-webpack-plugin');
const baseConfig = require("./webpack.base.js");//基础配置

let config = {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "[hash].index.js",
        chunkFilename: "[name].[chunkhash:8].js",
        publicPath: '/dist/'
    },
    plugins:[
        new AssetsPlugin({
            filename: 'dist/webpack.assets.js',
            processOutput: function(assets){
                return 'window.WEBPACK_ASSETS='+JSON.stringify(assets);
            }
        })
    ]
};

module.exports = merge(baseConfig, config);
