var fs = require("fs-extra"),
    path = require("path"),
    postcss = require("postcss"),
    sass = require("node-sass"),
    webpack = require("webpack"),
    config = require('./webpack.bundle'),
    prefix = require('autoprefixer')

var dir = path.join(__dirname, "../build")
fs.mkdirsSync(dir)

postcss([prefix({browsers: 'last 8 versions'})]).process(sass.renderSync({
    file: path.join(__dirname, "../app/index.scss"),
    outputStyle: 'compressed',
    sourceMap: false
}).css, {
    from: path.join(__dirname, "../app/index.scss"),
    to: path.join(dir, 'index.css')
}).then(function(result) {
    fs.writeFileSync(path.join(dir, 'index.css'), result.css);
    console.log('scss compiled')
})

webpack(config).run(function(err) {
    console.log('js compiled')
})

fs.copy(path.join(__dirname, "../index.html"), path.join(dir, 'index.html'), {})
fs.copy(path.join(__dirname, "../static/icomoon"), path.join(dir, 'icomoon'), {})