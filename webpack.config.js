/* eslint-disable strict */
const path = require('path');
const bundleOutputDir = './dist';
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

// config helpers:
const ensureArray = (config) => config && (Array.isArray(config) ? config : [config]) || [];
const when = (condition, config, negativeConfig) =>
  condition ? ensureArray(config) : ensureArray(negativeConfig);

// eslint-disable-next-line strict
module.exports = ({ production } = {}) => ({
  entry: {
    'app': 'app.ts',
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: ['src', 'scripts/angularControllers', 'scripts/form-builder', 'node_modules'],
    alias: {
      'jquery-ui': 'jquery-ui-dist/jquery-ui.js',
    },
  },
  node: {
    fs: 'empty',
  },
  plugins: [
    new webpack.ProvidePlugin({
      "window.jQuery": "jquery",
      "window.$": "jquery",
      $: 'jquery',
      jQuery: 'jquery',
      _: 'lodash',
      JSONfn: 'json-fn',
      FullCalendar: '@fullcalendar/core/main.js',
      moment: 'moment/moment.js',
    }),
    new MiniCssExtractPlugin({
      filename: production ? '[name].min.css' : '[name].css',
    }),
  ],
  output: {
    path: path.resolve(bundleOutputDir),
    publicPath: 'dist/',
    filename: production ? '[name].min.js' : '[name].js',
    sourceMapFilename: production ? '[name].min.map' : '[name].map',
  },
  devtool: production ? 'nosources-source-map' : 'cheap-module-eval-source-map',
  module: {
    rules: [
      { test: /\.ts$/i, include: /src/, use: 'ts-loader' },
      { test: /\.html$/i, use: 'html-loader' },
      {
        test: /\.css$/, use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './',
            },
          },
          'css-loader',
        ],
      },
      { test: /\.(png|jpe?g|gif)$/i, use: 'file-loader' },
      { test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'file-loader' },
      { test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'url-loader', options: { limit: 10000, mimetype: 'application/font-woff2' } },
      { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'url-loader', options: { limit: 10000, mimetype: 'application/font-woff' } },
    ],
  },
  mode: production ? 'production' : 'development',
  optimization: {
    minimize: production,
    minimizer: [
      ...when(production, [
        new OptimizeCSSAssetsPlugin({}),
        new TerserPlugin({
          extractComments: true,
          parallel: 4,
        })]),
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          test: /node_modules|angular-ts-decorator/,
          name: 'vendor',
          enforce: true,
        },
      },
    },
    },
  performance: {
    hints: false,
  },
});
