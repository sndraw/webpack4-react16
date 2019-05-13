/**
 * Created by sn on 2018/5/13.
 */
const utils = require('./utils')
const path = require('path');
const webpack = require('webpack'); //to access built-in plugins
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
module.exports = {
  //页面入口文件配置
  context: path.resolve(__dirname, '../'),
  entry: {
    vendor: [
      'react',
      'react-dom',
    ],
    main: [
      path.resolve(__dirname, '../src/main.js')
    ]
  },
  resolve: {
    extensions: ['.js', 'css', 'scss', '.less', 'jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, '../src'),
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: "html-loader"
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }, {
        test: /\.json$/,
        loader: 'json-loader',
        options: {
          name: 'json/[name].[hash:7].[ext]' //输出目录以及名称
        }
      },
    ]
  },
  optimization: {
    runtimeChunk: {
      name: "manifest"
    },
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        vendor: {
          name: "vendor", //拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成；
          test: /\.(js|.jsx)$/,
          chunks: "initial", //表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
          enforce: true,
        },
        style: {
          name: 'style',
          test: /\.(scss|less|css)$/,
          chunks: 'initial',
          enforce: true
        }
      }
    },
    runtimeChunk: {
      name: 'runtime',
    },
    minimizer: [
      new OptimizeCSSAssetsPlugin({})  // use OptimizeCSSAssetsPlugin
    ]

  }
}
