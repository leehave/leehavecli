"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _changeCase = _interopRequireDefault(require("change-case"));

/*
 * @Author: lizhixiang.have@gmail.com
 * @Date: 2020-06-03 17:19:41
 * @LastEditors: lizhixiang.have@gmail.com
 * @LastEditTime: 2020-06-03 17:47:54
 */
var _default = function _default(compName) {
  var _context, _context2, _context3, _context4, _context5, _context6;

  return (0, _concat["default"])(_context = (0, _concat["default"])(_context2 = (0, _concat["default"])(_context3 = (0, _concat["default"])(_context4 = (0, _concat["default"])(_context5 = (0, _concat["default"])(_context6 = "import React, { PureComponent } from 'react'\nexport interface ".concat(compName, "Props {\n  prefixCls?: string;\n  className?: string;\n}\nexport interface ")).call(_context6, compName, "States {\n\n}\n\nexport default class ")).call(_context5, compName, " extends PureComponent<")).call(_context4, compName, "Props, ")).call(_context3, compName, "States> {\n  static displayName = '")).call(_context2, compName, "';\n  static defaultProps = {\n    prefixCls: 'ui-")).call(_context, _changeCase["default"].paramCase(compName), "',\n  };\n\n  render() {\n    const {\n      prefixCls,\n      className,\n      children,\n    } = this.props;\n\n    const cls = classnames(prefixCls, className);\n\n    return (\n      <div className={cls}>\n        {children}\n      </div>\n    );\n  }\n}\n");
};

exports["default"] = _default;