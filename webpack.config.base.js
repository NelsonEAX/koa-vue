const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

const path = require('path');

module.exports = {
  entry: ['./src/main.js'],
  output: {
    publicPath: '/dist/',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.s(c|a)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                // fiber: require('fibers'),
                indentedSyntax: true // optional
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.template.html',
    }),
    new VueLoaderPlugin(),
    new VuetifyLoaderPlugin(),
    new CleanWebpackPlugin(),
  ],
};
