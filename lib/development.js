"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));

var _fs = _interopRequireDefault(require("fs"));

var _webpack = _interopRequireDefault(require("webpack"));

var _webpackDevServer = _interopRequireDefault(require("webpack-dev-server"));

var _webpackConfig = _interopRequireDefault(require("./config/webpackConfig"));

var _forkTsCheckerWebpackPlugin = _interopRequireDefault(require("fork-ts-checker-webpack-plugin"));

var _utils = require("./utils");

var _deploy = require("./deploy");

var _default = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var _context, _context3;

    var mode, host, port, config, compiler, serverConfig, devServer;
    return _regenerator["default"].wrap(function _callee$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            mode = _ref.mode, host = _ref.host, port = _ref.port;
            config = (0, _deploy.getProjectConfig)((0, _webpackConfig["default"])('dev'));
            (0, _forEach["default"])(_context = (0, _keys["default"])(config.entry)).call(_context, function (key) {
              config.entry[key].unshift(require.resolve('react-hot-loader/patch'));
            });

            if (_fs["default"].existsSync((0, _utils.getProjectPath)('tsconfig.json'))) {
              config.plugins.push(new _forkTsCheckerWebpackPlugin["default"]());
            }

            compiler = (0, _webpack["default"])(config);
            serverConfig = {
              publicPath: '/',
              compress: true,
              noInfo: true,
              inline: true,
              hot: true
            };
            devServer = new _webpackDevServer["default"](compiler, serverConfig);
            devServer.listen(port, host, function (err) {
              var _context2;

              if (err) {
                return console.error(err);
              }

              console.warn((0, _concat["default"])(_context2 = "http://".concat(host, ":")).call(_context2, port, "\n"));
            });
            (0, _forEach["default"])(_context3 = ['SIGINT', 'SIGTERM']).call(_context3, function (sig) {
              process.on(sig, function () {
                devServer.close();
                process.exit();
              });
            });

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports["default"] = _default;