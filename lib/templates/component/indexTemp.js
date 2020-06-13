"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

/*
 * @Author: lizhixiang.have@gmail.com
 * @Date: 2020-06-03 17:20:07
 * @LastEditors: lizhixiang.have@gmail.com
 * @LastEditTime: 2020-06-04 13:55:22
 */
var _default = function _default(compName) {
  var _context, _context2;

  return (0, _concat["default"])(_context = (0, _concat["default"])(_context2 = "import ".concat(compName, " from './")).call(_context2, compName, "';\nexport default ")).call(_context, compName, ";\n");
};

exports["default"] = _default;