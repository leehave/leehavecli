"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.getCustomConfig = exports.getProjectPath = exports.fileTree = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

//读取文件目录树
var fileTree = function fileTree(list, dirPath) {
  var files = _fs["default"].readFileSync(dirPath);

  for (var i = 0; i < files.length; i++) {
    var filePath = _path["default"].join(dirPath, files[i]);

    var stats = _fs["default"].statSync(filePath);

    if (stats.isDirectory()) {
      fileTree(list, filePath);
    } else {
      var type = _path["default"].extname(files[i]).substring(1);

      list.push({
        filePath: filePath,
        type: type
      });
    }
  }
}; //获取项目文件


exports.fileTree = fileTree;

var getProjectPath = function getProjectPath() {
  var dir = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : './';
  return _path["default"].join(process.cwd(), dir);
};

exports.getProjectPath = getProjectPath;

//获取项目文件
var getCustomConfig = function getCustomConfig() {
  var configFileName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'lee.config.js';

  var configPath = _path["default"].join(process.cwd(), configFileName);

  if (_fs["default"].existsSync(configPath)) {
    return require(configPath);
  }

  return {};
};

exports.getCustomConfig = getCustomConfig;