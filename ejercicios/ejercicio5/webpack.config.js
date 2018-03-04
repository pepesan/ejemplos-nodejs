/**
 * @Author Ashwin Hariharan
 * @Details Webpack config file for adding new vendors, defining entry points and shimming modules. 
 */

var webpack = require('webpack');
var path = require("path");

var lib_dir = __dirname + '/public/javascripts',
    node_dir = __dirname + '/node_modules';
   // bower_dir = __dirname + '/bower_components'

var config = {
    resolve: {
        alias: {
            jquery: lib_dir + '/jquery-1.11.2.min.js', 
        }
    },   

    entry: {
        app: ['./public/javascripts/script.js'],
        vendors: ['jquery']
    },

    output: {
        path: path.join(__dirname, "public/javascripts"),
        filename: "[name].bundle.js"
    },

    plugins: [
        new webpack.ProvidePlugin({
            jQuery: "jquery",
            'window.jQuery': "jquery"
        }),
        //new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js', Infinity),
    ],
    
    module: {
        noParse: [
            new RegExp(lib_dir +'/jquery-1.11.2.min.js')
        ],
        loaders: [
            { 
                test: /\.js$/, 
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }, 
        ]
    }
};