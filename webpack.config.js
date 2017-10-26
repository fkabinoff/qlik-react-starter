const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: ['babel-polyfill', 'react-hot-loader/patch', './src/index'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        include: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['latest', 'react'],
          plugins: ['react-hot-loader/babel'],
        },
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'eslint-loader',
      },
      {
        test: /\.(scss)$/,
        use: [{
          loader: 'style-loader', // inject CSS to page
        }, {
          loader: 'css-loader', // translates CSS into CommonJS modules
        }, {
          loader: 'postcss-loader', // Run post css actions
          options: {
            plugins() { // post css plugins, can be exported to postcss.config.js
              return [
                require('precss'),
                require('autoprefixer'),
              ];
            },
          },
        }, {
          loader: 'sass-loader', // compiles SASS to CSS
        }],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
