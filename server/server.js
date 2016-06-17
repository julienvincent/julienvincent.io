var express = require('express'),
    server = express(),
    fs = require('fs'),
    webpack = require('webpack'),
    config = require('./webpack.dev'),
    path = require('path')

server.use(require('webpack-dev-middleware')(webpack(config), {
    noInfo: true,
    publicPath: config.output.publicPath
}))

server.use(express.static(path.join(__dirname, '../static')))
server.get('*', function(req, res) {
    res.send(fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8'))
})

server.listen(3000, function() {
    console.log('Server listening at http://localhost:3000/')
})