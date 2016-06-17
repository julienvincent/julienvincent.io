var path = require('path')
var webpack = require('webpack')
var prefix = require('autoprefixer')

module.exports = {
        devtool: 'cheap-module-source-map',
        entry: [
            'eventsource-polyfill',
            'babel-polyfill',
            path.join(__dirname, '../app/index.js')
        ],
        output: {
            path: path.join(__dirname, '../build'),
            filename: `index.js`,
            publicPath: '/'
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin()
        ],
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loaders: ['babel'],
                    exclude: /node_modules/
                },
                {
                    test: /\.scss$/,
                    loaders: [
                        "style",
                        "css",
                        "sass",
                        "postcss"
                    ]
                }
            ]
        },
        postcss: [prefix()]
    }