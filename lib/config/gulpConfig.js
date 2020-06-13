"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _gulp = _interopRequireDefault(require("gulp"));

var _gulpSass = _interopRequireDefault(require("gulp-sass"));

var _through = _interopRequireDefault(require("through2"));

var _utils = require("../utils");

var cssInjection = function cssInjection(content) {
  return content.replace(/\/style\/?'/g, "/style/css'").replace(/\/style\/?"/g, '/style/css"').replace(/\.scss/g, '.css');
};

var gulpTask = function gulpTask(path, outDir, callback) {
  var DIR = {
    sass: (0, _utils.getProjectPath)("".concat(path, "/**/index.scss")),
    js: (0, _utils.getProjectPath)("".concat(outDir, "/**/style/index.js"))
  };

  _gulp["default"].task('sass', function () {
    _gulpSass["default"].compiler = require('sass');
    return _gulp["default"].src(DIR.sass).pipe((0, _gulpSass["default"])({
      includePaths: ['node_modules']
    }).on('error', _gulpSass["default"].logError)).pipe(_gulp["default"].dest(outDir));
  });

  _gulp["default"].task('css', function () {
    return _gulp["default"].src(DIR.js).pipe(_through["default"].obj(function z(file, encoding, next) {
      this.push(file.clone());
      var content = file.contents.toString(encoding);
      file.contents = Buffer.from(cssInjection(content));
      file.path = file.path.replace(/index\.js/, 'css.js');
      this.push(file);
      next();
    })).pipe(_gulp["default"].dest(outDir));
  });

  return _gulp["default"].series(['sass', 'css'], callback);
};

var _default = gulpTask;
exports["default"] = _default;