var webpack = require('webpack');
var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

var pages = ['bubble', 'images', 'point'];
var htmlWebpackPlugins = pages.map(page => {
    return new HtmlWebpackPlugin({
        filename: page + '.html',
        page: page,
        title: page,
        template: './template.html',
        inject: false,
    });
});

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: "./src/index.js",
    output: {
        libraryTarget: 'umd',
        library: 'leaflet-graph',
        path: path.resolve(__dirname, 'dist'),
        filename: 'leaflet-graph.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    'babel-loader?cacheDirectory'
                ],
                include: path.resolve(__dirname, 'src')
            }
        ]
    },
    devServer: {
        contentBase: './dist',
        hot: true
    },
    externals: {
        'leaflet': 'L'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.HotModuleReplacementPlugin(),
        ...htmlWebpackPlugins,
        new CopyWebpackPlugin([
            'index.html',
            {
                from: __dirname + '/examples',
                to: __dirname + '/dist/examples',
            },
            {
                from: __dirname + '/images',
                to: __dirname + '/dist/images',
            },
            {
                from: __dirname + '/lib',
                to: __dirname + '/dist/lib',
            },
            {
                from: __dirname + '/resource',
                to: __dirname + '/dist/resource',
            },
            {
                from: __dirname + '/map',
                to: __dirname + '/dist/map',
            }
        ])
    ]
};