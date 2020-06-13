"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = exports.getProjectConfig = void 0;

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _entries = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/entries"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/objectWithoutProperties"));

var _webpack = _interopRequireDefault(require("webpack"));

var _webpackMerge = _interopRequireDefault(require("webpack-merge"));

var _htmlWebpackPlugin = _interopRequireDefault(require("html-webpack-plugin"));

var _webpackBundleAnalyzer = require("webpack-bundle-analyzer");

var _webpackPlugin = _interopRequireDefault(require("@sentry/webpack-plugin"));

var _webpackConfig = _interopRequireDefault(require("./config/webpackConfig"));

var _utils = require("./utils");

// eslint-disable-next-line
var _require = require((0, _utils.getProjectPath)('package.json')),
    name = _require.name,
    version = _require.version;

var getProjectConfig = function getProjectConfig(config) {
  var _context;

  var _getCustomConfig = (0, _utils.getCustomConfig)(),
      entries = (0, _entries["default"])(_getCustomConfig),
      setBabelOptions = _getCustomConfig.setBabelOptions,
      banner = _getCustomConfig.banner,
      setRules = _getCustomConfig.setRules,
      setPlugins = _getCustomConfig.setPlugins,
      webpackConfig = (0, _objectWithoutProperties2["default"])(_getCustomConfig, ["entries", "setBabelOptions", "banner", "setRules", "setPlugins"]);

  config.entry = {};
  setBabelOptions && setBabelOptions(config.module.rules[0].use[0].options);
  setRules && setRules(config.module.rules);
  setPlugins && setPlugins(config.plugins);
  (0, _forEach["default"])(_context = (0, _keys["default"])(entries || {})).call(_context, function (key) {
    if (entries[key].entry) {
      config.entry[key] = entries[key].entry;
    }

    config.plugins.push(new _htmlWebpackPlugin["default"]({
      template: entries[key].template,
      filename: "".concat(key, ".html"),
      chunks: ['mainfest', key],
      favicon: entries[key].favicon,
      inject: entries[key].inject !== false
    }));
  });
  return (0, _webpackMerge["default"])(config, webpackConfig);
};

exports.getProjectConfig = getProjectConfig;

var _default = function _default(_ref) {
  var outDir = _ref.outDir,
      pushGh = _ref.pushGh,
      analyzer = _ref.analyzer;
  var config = getProjectConfig((0, _webpackConfig["default"])('deploy'));
  config.output.path = (0, _utils.getProjectPath)(outDir);
  pushGh && config.plugins.push(new _webpackPlugin["default"]({
    release: version,
    include: outDir,
    sourceMapReference: false
  }));
  analyzer && config.plugins.push(new _webpackBundleAnalyzer.BundleAnalyzerPlugin({
    analyzerMode: 'static',
    generateStatsFile: true
  }));
  (0, _webpack["default"])(config).run(function () {});
};

exports["default"] = _default;