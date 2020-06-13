"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _changeCase = _interopRequireDefault(require("change-case"));

/*
 * @Author: lizhixiang.have@gmail.com
 * @Date: 2020-06-03 17:20:35
 * @LastEditors: lizhixiang.have@gmail.com
 * @LastEditTime: 2020-06-05 08:53:01
 */
var _default = function _default(compName) {
  return "@import '../../style/core/index';\n@include b(".concat(_changeCase["default"].paramCase(compName), "){\n  \n}\n");
};

exports["default"] = _default;