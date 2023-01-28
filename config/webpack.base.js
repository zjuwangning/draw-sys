/**
 * Created by Reid on 2018/8/1.
 */
const path = require("path");
const webpack = require('webpack');
const providePlugin = new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    'window.$': 'jquery',
});

module.exports = {
    //入口文件
    entry: {
        main: path.resolve(__dirname, '../app.js')
    },
    //出口文件
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "[name].js",
        publicPath: '/dist'
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|eot|ttf|woff|svg)$/,
                loader: 'url-loader?limit=50000'
            },
            {
                test: /\.css$/,
                use: [{loader: "style-loader"},{loader: "css-loader"}]
            },
            {
                test: /\.less/,
                use: [{loader: "style-loader"},
                    {loader: "css-loader"},
                    {loader: 'less-loader', options: { javascriptEnabled: true }}]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    plugins: [providePlugin]
};
