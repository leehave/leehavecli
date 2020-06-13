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
 * @Date: 2020-06-03 17:19:52
 * @LastEditors: lizhixiang.have@gmail.com
 * @LastEditTime: 2020-06-04 13:53:07
 */
var _default = function _default(compName) {
  var _context, _context2, _context3, _context4;

  return (0, _concat["default"])(_context = (0, _concat["default"])(_context2 = (0, _concat["default"])(_context3 = (0, _concat["default"])(_context4 = "# ".concat(compName, " \u7EC4\u4EF6\u540D\n\n\n## \u57FA\u672C\u7528\u6CD5\n```jsx\nimport { ")).call(_context4, compName, " } from 'leeui';\n\nReactDOM.render(\n  <>\n    <")).call(_context3, compName, " />\n  <>\n, mountNode);\n```\n\n\n## \u7528\u6CD5\u4E8C\n```jsx\nimport { ")).call(_context2, compName, " } from 'leeui';\n\nclass Demo extends React.Component {\n  state = {}\n  render() {\n    return <")).call(_context, compName, " />;\n  }\n}\nReactDOM.render(<Demo />, mountNode);\n```\n\n## API\n| \u5C5E\u6027 | \u7C7B\u578B | \u9ED8\u8BA4\u503C | \u8BF4\u660E |\n| :--- | :--- | :--- | :--- |\n");
};

exports["default"] = _default;