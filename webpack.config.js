var PROD = process.argv.indexOf('-p') > 0;

var webpack = require('webpack');
var path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: "./src/index.js",
    output: {
        libraryTarget: 'umd',
        library: 'leaflet-graph',
        path: path.resolve(__dirname, 'dist'),
        filename: PROD ? 'leaflet-graph.min.js' : 'leaflet-graph.js'
    },
    externals: {
        'leaflet': 'L'
    },
    plugins: [
        new webpack.DefinePlugin({
            'typeof __DEV__': JSON.stringify('boolean'),
            __DEV__: PROD ? false : true
        })
    ]
};
