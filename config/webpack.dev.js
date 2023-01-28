/**
 * Created by Reid on 2018/8/1.
 */
const merge = require('webpack-merge');//webpack配置文件合并
const baseConfig = require("./webpack.base.js");//基础配置

let config = {
    mode: 'development',
    devServer: {
        port: 80,
        hot: true,
        historyApiFallback: {
            index: 'index.html'
        }
    }
};

module.exports = merge(baseConfig, config);
