var webpack = require('webpack'),
    path = require('path');

module.exports = {
    mode:"development",
    entry: {
        bundle: './node_modules/jquery/dist/jquery.js'
    },
    output: {
        path: path.join(__dirname, 'public/javascripts'),
        filename: '[name].js'
    },
};