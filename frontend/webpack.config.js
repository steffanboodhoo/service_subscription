const webpack = require('webpack');

const path = require('path');

const HtmlWebPackPlugin = require('html-webpack-plugin')
const htmlPlugin = new HtmlWebPackPlugin({
    template: './src/index.html'
})

module.exports = {
    entry: './src/index.js'  //relevant to where the webpack config file is stored

    ,output:{
        filename:'[hash].bundle.js', //what we want the name of the output file to be
        path: path.resolve(__dirname,'dist') //create dist folder(if not exist) and put the file there
    }

    ,module:{
        rules:[
            {//first rule
                test: /\.js$/, //check for files that end with .js
                exclude: /node_modules/, //dont check here
                use: {loader: 'babel-loader'}// use these to process the matched files
            },
            {
                test: /\.css$/, 
                use: ['style-loader', 'css-loader'] ,//style-loader allows us to put the css in the html, css-loader allows us to import css in js files/classes
            }
        ]
    }

    ,plugins:[
        htmlPlugin,
        new webpack.HotModuleReplacementPlugin()
    ]
    ,mode: 'development'

    ,devtool: 'inline-source-map' // allows error messages to be mapped to the code we wrote and not compiled version
    ,devServer:{
        host:'localhost',
        port:3000,
        historyApiFallback:true,
        hot:true
    }
}