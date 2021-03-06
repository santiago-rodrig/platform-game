/* eslint-disable import/no-unresolved */
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
/* eslint-enable import/no-unresolved */

module.exports = {
  mode: 'development',
  entry: {
    app: path.resolve(__dirname, 'src', 'index.js'),
    loader: path.resolve(__dirname, 'src', 'loader.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /(\.vert|\.frag)$/,
        use: 'raw-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(jpg|gif)$/,
        use: 'file-loader',
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'index.html'),
        to: path.resolve(__dirname, 'dist'),
      },
      {
        from: path.resolve(__dirname, 'assets', '**', '*'),
        to: path.resolve(__dirname, 'dist'),
      },
    ]),
    new webpack.DefinePlugin({
      'typeof CANVAS_RENDERER': JSON.stringify(true),
      'typeof WEBGL_RENDERER': JSON.stringify(true),
    }),
  ],
};
