const webpackMerge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const commonConfiguration = require('./webpack.common.js')

module.exports = webpackMerge.merge(
  commonConfiguration,
  {
    mode: 'production',
    plugins: [
      new MiniCssExtractPlugin()
    ],
    module:
    {
      rules: [
        {
          test: /\.styl$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: './',
              },
            },
            'css-loader',
            'stylus-loader'
          ]
        }
      ]
    }
  }
)
