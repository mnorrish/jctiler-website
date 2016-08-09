const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  context: path.join(__dirname, './src'),

  output: {
    filename: '[name].[ext]',
    path: './dist',
  },

  module: {
    loaders: [
      { test: /\.pug$/, loader: 'pug' },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.pug',
    }),
  ],

};
