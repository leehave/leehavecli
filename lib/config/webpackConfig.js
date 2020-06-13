"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _isWsl = _interopRequireDefault(require("is-wsl"));

var _terserWebpackPlugin = _interopRequireDefault(require("terser-webpack-plugin"));

var _optimizeCssAssetsWebpackPlugin = _interopRequireDefault(require("optimize-css-assets-webpack-plugin"));

var _postcssSafeParser = _interopRequireDefault(require("postcss-safe-parser"));

var _miniCssExtractPlugin = _interopRequireDefault(require("mini-css-extract-plugin"));

var _webpackMerge = _interopRequireDefault(require("webpack-merge"));

var _webpackbar = _interopRequireDefault(require("webpackbar"));

var _webpack = _interopRequireDefault(require("webpack"));

var _base = _interopRequireDefault(require("./babelConfig/base"));

var optimization = {
  minimizer: [new _terserWebpackPlugin["default"]({
    terserOptions: {
      parse: {
        ecma: 8
      },
      compress: {
        ecma: 5,
        warnings: false,
        comparisons: false,
        inline: 2
      },
      mangle: {
        safari10: true
      },
      output: {
        ecma: 5,
        comments: false,
        ascii_only: true
      }
    },
    parallel: !_isWsl["default"],
    cache: true,
    sourceMap: true
  }), new _optimizeCssAssetsWebpackPlugin["default"]({
    cssProcessorOptons: {
      parser: _postcssSafeParser["default"]
    },
    cssProcessorPluginOptions: {
      preset: ['default', {
        reducetransforms: false,
        discardComments: {
          removeAll: true
        },
        calc: false
      }]
    }
  })]
};
var config = {
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].[chunkhash:8].js',
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: /node_modules/,
      use: [{
        loader: require.resolve('babel-loader'),
        options: _base["default"]
      }]
    }, {
      test: /\.(css|scss)$/,
      use: [{
        loader: _miniCssExtractPlugin["default"].loader,
        options: {
          publicPath: '../'
        }
      }, {
        loader: require.resolve('css-loader'),
        options: {
          importLoaders: 2
        }
      }, {
        loader: require.resolve('postcss-loader'),
        options: {
          plugins: [require('postcss-flexbugs-fixes'), // eslint-disable-next-line @typescript-eslint/novar-requires
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009'
            },
            stage: 3
          })]
        }
      }, {
        loader: require.resolve('sass-loader'),
        options: {
          sourceMap: true,
          implementation: require('sass')
        }
      }]
    }, {
      test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
      exclude: /node_modules/,
      use: [{
        loader: require.resolve('url-loader'),
        options: {
          limit: 1,
          name: 'images/[name].[hash:8].[ext]'
        }
      }]
    }, {
      test: /\.(woff|woff2|tts|eot)$/,
      use: [{
        loader: 'file-loader?name=fonts/[name].[hash:8].[ext]'
      }]
    }]
  },
  resolve: {
    extensions: ['', '.ts', '.tsx', '.js', '.jsx', '.scss', '.svg'],
    alias: {
      'react-dom$': 'react-dom/profiling',
      'scheduler/tracing': 'scheduler/tracing-profiling'
    }
  },
  plugins: [new _webpackbar["default"]()]
};
var devConfig = (0, _webpackMerge["default"])({}, config, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  optimization: {
    minimize: false
  },
  plugins: [new _webpack["default"].HotModuleReplacementPlugin()]
});
var umdConfig = (0, _webpackMerge["default"])({}, config, {
  mode: 'development',
  devtool: 'source-map',
  output: {
    libraryTarget: 'umd',
    filename: '[name].js'
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    }
  }
});
var umdUglyConfig = (0, _webpackMerge["default"])({}, umdConfig, {
  mode: 'production',
  output: {
    filename: '[name].min.js'
  },
  optimization: optimization
});
var umdZipConfig = (0, _webpackMerge["default"])({}, umdConfig, {
  mode: 'production',
  optimization: optimization
});

var getWebpackConfig = function getWebpackConfig(type) {
  switch (type) {
    case 'umd':
      umdConfig.plugin.push(new _miniCssExtractPlugin["default"]({
        filename: '[name].css'
      }));
      return umdConfig;
      break;

    case 'umd-ugly':
      umdUglyConfig.plugin.push(new _miniCssExtractPlugin["default"]({
        filename: '[name].min.css'
      }));
      return umdUglyConfig;

    case 'umd-zip':
      umdZipConfig.plugin.push(new _miniCssExtractPlugin["default"]({
        filename: '[name].css'
      }));
      return umdZipConfig;

    case 'dev':
      devConfig.output.publicPath = '/';
      devConfig.module.rules[0].use[0].options.plugins.push(require.resolve('react-hot-loader/babel'));
      return devConfig;

    default:
      return devConfig;
      break;
  }
};

var _default = getWebpackConfig;
exports["default"] = _default;