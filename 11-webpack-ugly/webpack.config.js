/*const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

const config = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.bundle.js'
  },
  module: {
    rules: [
      {test: /\.(js|jsx)$/, use: 'babel-loader'}
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
        minimize: true
    }),
  ]
};

module.exports = config;
*/

var webpack = require('webpack');

//var PROD = JSON.parse(process.env.PROD_ENV || '0');

module.exports = {
  "target": "node",
  entry:{
      "bundle": "./index.js",
      "bundle.min": "./index.js"
  },
  devtool: 'source-map',
  output: {
      path: __dirname + "/dist",
      filename: "[name].js"
  },
  plugins:  [
    new webpack.optimize.UglifyJsPlugin({
      	minimize: true,
	include: /\.min\.js$/,
	compress: { warnings: false }
    })
  ]
};
