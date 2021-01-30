const { join } = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const { HotModuleReplacementPlugin } = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: ['babel-polyfill', './app/index.js'],
    output: {
        path: join(__dirname, 'build'),
        filename: 'index.min.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/, 
                use: [{
                    loader: 'vue-style-loader'
                }, {
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }]
            }, {
                test: /\.(js)$/, 
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }, {
                test: /\.vue$/, 
                loader: 'vue-loader'
            }
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