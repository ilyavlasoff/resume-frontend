const { join } = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const { HotModuleReplacementPlugin } = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './app/index.js',
    output: {
        path: join(__dirname, 'build'),
        filename: 'index.min.js'
    },
    module: {
        rules: [
            {test: /\.css$/, use: ['vue-style-loader', 'css-loader']},
            {
                test: /\.(js)$/, 
                use: 'babel-loader', 
                /*options: {
                    presets: ['@babel/preset-env']
                }*/
            },
            {test: /\.vue$/, use: 'vue-loader'}
        ]
    }, 
    resolve: {
        extensions: ['.js', '.vue', '.json',".ts"],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new HotModuleReplacementPlugin(),
        new HTMLWebpackPlugin({
            showErrors: true,
            cache: true,
            template: './app/index.html'
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        })
    ]
};