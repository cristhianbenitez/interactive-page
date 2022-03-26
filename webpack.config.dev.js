const webpack = require('webpack');
const { merge } = require('webpack-merge');
const path = require('path');

const config = require('./webpack.config');

module.exports = merge(config, {
  mode: 'development',
  entry: ['webpack-hot-middleware/client'],
  devtool: 'inline-source-map',

  devServer: {
    static: './dist',
    hot: true,
    watchFiles: ['views/**/*.pug'],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],

  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/',
  },
});
