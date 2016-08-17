const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isDevServer = process.env.NODE_ENV === 'dev-server';

module.exports = {

  context: path.resolve('src'),

  output: {
    filename: '[name].js',
    path: './dist',
  },

  entry: {
    main: [
      './ga.js',
      './styles.sass',
    ],
  },

  module: {
    loaders: [
      {
        test: /\.pug$/,
        loader: 'pug',
      },
      {
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract(['css?sourceMap', 'postcss?sourceMap', 'sass?sourceMap']),
      },
      {
        test: /\.(jpg|jpeg|png|gif|woff|woff2|eot|otf|ttf|svg|svgz)(\?.*$|$)/,
        loader: 'file-loader',
        query: {
          name: 'assets/[hash].[ext]',
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.pug',
      isDevServer,
    }),
    new ExtractTextPlugin('[name].css'),
    new webpack.DefinePlugin({
      IS_DEV: isDevServer,
    }),
  ],

  postcss() {
    return [
      autoprefixer({
        // browser prefixing used by Bootstrap 3
        browsers: [
          'Android 2.3',
          'Android >= 4',
          'Chrome >= 20',
          'Firefox >= 24',
          'Explorer >= 8',
          'iOS >= 6',
          'Opera >= 12',
          'Safari >= 6',
        ],
      }),
    ];
  },

  sassLoader: {
    precision: 8,
  },

  devtool: 'sourcemap',

};
