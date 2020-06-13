"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _indexOf = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/index-of"));

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _fs = _interopRequireDefault(require("fs"));

var _webpack = _interopRequireDefault(require("webpack"));

var _webpackMerge = _interopRequireDefault(require("webpack-merge"));

var _gulp = _interopRequireDefault(require("gulp"));

var _signale = require("signale");

var _jszip = _interopRequireDefault(require("jszip"));

var _execa = _interopRequireDefault(require("execa"));

var _webpackBundleAnalyzer = require("webpack-bundle-analyzer");

var _webpackConfig = _interopRequireDefault(require("./config/webpackConfig"));

var _gulpConfig = _interopRequireDefault(require("./config/gulpConfig"));

var _utils = require("./utils");

// eslint-disable-next-line
var _require = require((0, _utils.getProjectPath)('package.json')),
    name = _require.name;

var write = function write(dir, code) {
  _fs["default"].writeSync(_fs["default"].openSync(dir, 'w'), code);
};

var showErrors = function showErrors(errors) {
  console.error('lee cli: ');
  (0, _forEach["default"])(errors).call(errors, function (element) {
    console.error(" ".concat(element));
  });
  process.exit(2);
}; // build umd


var umdBuild = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref, barActive) {
    var _context;

    var mode, path, outDir, outZip, libraryName, analyzer, entryKey, entryFiles, analyzerConfig, _getCustomConfig, banner, bannerConfig, umdTask, _context2, jsZip, list;

    return _regenerator["default"].wrap(function _callee$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            mode = _ref.mode, path = _ref.path, outDir = _ref.outDir, outZip = _ref.outZip, libraryName = _ref.libraryName, analyzer = _ref.analyzer;
            libraryName = libraryName || name;
            entryKey = mode === 'umd-zip' ? 'index' : libraryName;
            entryFiles = (0, _map["default"])(_context = path.split(',')).call(_context, function (p) {
              return (0, _utils.getProjectPath)(p);
            });
            analyzerConfig = analyzer && {
              plugins: [new _webpackBundleAnalyzer.BundleAnalyzerPlugin({
                analyzerMode: 'static',
                generateStatsFile: true
              })]
            };
            _getCustomConfig = (0, _utils.getCustomConfig)(), banner = _getCustomConfig.banner;
            bannerConfig = banner && {
              plugins: [new _webpack["default"].BannerPlugin(banner)]
            };

            umdTask = function umdTask(type) {
              return new _promise["default"](function (resolve, reject) {
                var config = (0, _webpackMerge["default"])((0, _webpackConfig["default"])(type), {
                  entry: (0, _defineProperty2["default"])({}, entryKey, entryFiles),
                  output: {
                    path: (0, _utils.getProjectPath)(outDir),
                    library: libraryName
                  }
                }, analyzerConfig, bannerConfig);
                return (0, _webpack["default"])(config).run(function (err, stats) {
                  return err ? reject(err) : resolve(stats);
                });
              });
            };

            barActive.process('building...');

            if (!(mode === 'umd-zip')) {
              _context4.next = 20;
              break;
            }

            _context4.next = 12;
            return umdTask('umd-zip');

          case 12:
            jsZip = new _jszip["default"]();
            list = [];
            (0, _utils.fileTree)(list, outDir);
            jsZip.file("".concat(outDir, "/manifest.json"), (0, _concat["default"])(_context2 = "{\n      \"id\": \"".concat(libraryName, "\",\n      \"name\": \"")).call(_context2, libraryName, "\",\n      \"description\": \"\",\n      \"propsSchema\": {\n\n      }\n    }"));
            (0, _forEach["default"])(list).call(list, function (_ref3) {
              var filePath = _ref3.filePath;
              jsZip.file(filePath, _fs["default"].readFileSync(filePath));
            });
            jsZip.folder(outDir).generateAsync({
              type: 'nodebuffer'
            }).then(function (content) {
              var _context3;

              write((0, _concat["default"])(_context3 = "".concat(outZip, "/")).call(_context3, libraryName, ".zip"), content);
            });
            _context4.next = 22;
            break;

          case 20:
            _context4.next = 22;
            return umdTask(mode);

          case 22:
            barActive.success('Compiled successfully!');

          case 23:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee);
  }));

  return function umdBuild(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var buildLibray = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref4, barActive) {
    var mode, path, ext, outFile, outDir, copyFiles, buildCss, args, _yield$execa, stderr, exitCode;

    return _regenerator["default"].wrap(function _callee2$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            mode = _ref4.mode, path = _ref4.path, ext = _ref4.ext, outFile = _ref4.outFile, outDir = _ref4.outDir, copyFiles = _ref4.copyFiles, buildCss = _ref4.buildCss;
            args = [require.resolve('@babel/cli/bin/babel'), path, '--extensions', ext, '--ignore', '**/*.d.ts', '--config-file', require.resolve("./config/babelConfig/".concat(mode))];

            if (copyFiles) {
              args.push('--copy-files');
            }

            if (outDir) {
              args.push('--out-dir', outDir);
            }

            if (outFile) {
              args.push('--out-file', outFile);
            }

            barActive.process('building...');
            _context5.next = 8;
            return (0, _execa["default"])('node', args);

          case 8:
            _yield$execa = _context5.sent;
            stderr = _yield$execa.stderr;
            exitCode = _yield$execa.exitCode;

            if (!(exitCode !== 0)) {
              _context5.next = 16;
              break;
            }

            process.stderr.write(stderr);
            process.exit(0);
            _context5.next = 21;
            break;

          case 16:
            if (!buildCss) {
              _context5.next = 20;
              break;
            }

            barActive.process('building css file');

            if (mode !== 'native') {
              (0, _gulpConfig["default"])(path, outDir, function () {
                barActive.success('Compiled successfully');
              })(_gulp["default"]);
            }

            return _context5.abrupt("return");

          case 20:
            barActive.success('Compiled successfully!');

          case 21:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee2);
  }));

  return function buildLibray(_x3, _x4) {
    return _ref5.apply(this, arguments);
  };
}();

var _default = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(options) {
    var mode, path, outFile, outDir, outZip, errors, barActive;
    return _regenerator["default"].wrap(function _callee3$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            mode = options.mode, path = options.path, outFile = options.outFile, outDir = options.outDir, outZip = options.outZip;
            errors = [];

            if (!mode) {
              errors.push('--mode require define');
            }

            if (!path) {
              errors.push('--path require define');
            }

            if (!outDir && !outFile) {
              if (!outDir) {
                errors.push('--out-dir require foldername');
              }

              if (!outFile) {
                errors.push('--out-file require filename');
              }
            }

            errors.length && showErrors(errors);
            barActive = new _signale.Signale({
              scope: 'Leecli',
              interactive: true,
              types: {
                process: {
                  badge: '*',
                  color: 'yellow',
                  label: "build ".concat(mode)
                },
                success: {
                  label: "build ".concat(mode)
                }
              }
            });

            if (!((0, _indexOf["default"])(mode).call(mode, 'umd') >= 0)) {
              _context6.next = 10;
              break;
            }

            umdBuild(options, barActive);
            return _context6.abrupt("return");

          case 10:
            buildLibray(options, barActive);

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5) {
    return _ref6.apply(this, arguments);
  };
}();

exports["default"] = _default;