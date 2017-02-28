const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = function () {
  return {
    context: __dirname,
    entry: './components/BrowserEntry.jsx',
    output: {
      path: path.join(__dirname, 'public'),
      publicPath: '/public/',
      filename: 'bundle.js'
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json']
    },
    node: {
      net: 'empty',
      dns: 'empty'
    },
    stats: "minimal",
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          enforce: 'pre',
          loader: 'eslint-loader',
          exclude: /node_modules/
        },
        {
          test: /\.jsx?$/,
          loader: 'babel-loader?sourceMap',
          exclude: /node_modules/
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader?limit=10000&minetype=application/font-woff&name=fonts/[name].[ext]'
        },
        {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader?name=fonts/[name].[ext]'
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader','sass-loader']
          })
        }
      ]
    },
    devtool: 'source-map',
    performance: {
      hints: "warning",
      maxEntrypointSize: 400000,
      maxAssetSize: 300000
    },
    plugins: [
      new ExtractTextPlugin('/css/style.css'),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
      })
  /*    ,
      new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000,
        server: { baseDir: [''] }
      })*/
    ]
  }
}
