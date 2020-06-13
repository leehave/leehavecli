"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _mkdirp = require("mkdirp");

var _changeCase = _interopRequireDefault(require("change-case"));

var _chalk = _interopRequireDefault(require("chalk"));

var _signale = _interopRequireDefault(require("signale"));

var _templates = require("./templates");

var write = function write(dir, code) {
  _fs["default"].writeSync(_fs["default"].openSync(dir, 'w'), code);
};

var _default = function _default(_ref) {
  var _context;

  var compName = _ref.compName;
  var rootDir = "components/".concat(_changeCase["default"].paramCase(compName));
  var folder = {
    component: rootDir,
    style: "".concat(rootDir, "/style")
  };
  var pages = {
    component: [{
      name: 'index.tsx',
      module: _templates.component.indexTemp(compName)
    }, {
      name: 'demo.md',
      module: _templates.component.demoTemp(compName)
    }, {
      name: "".concat(compName, ".tsx"),
      module: _templates.component.compTemp(compName)
    }],
    style: [{
      name: 'index.tsx',
      module: _templates.style.indexTemp()
    }, {
      name: 'index.scss',
      module: _templates.style.indexScssTemp(compName)
    }]
  };
  (0, _forEach["default"])(_context = (0, _keys["default"])(pages)).call(_context, function (key) {
    var _context2;

    (0, _mkdirp.sync)(folder[key]);
    (0, _forEach["default"])(_context2 = pages[key]).call(_context2, function (page) {
      var _context3, _context4;

      write(_path["default"].resolve("./".concat(folder[key]), page.name), page.module);
      console.info((0, _concat["default"])(_context3 = (0, _concat["default"])(_context4 = "  ".concat(_chalk["default"].green('create'), " ")).call(_context4, folder[key], "/")).call(_context3, page.name));
    });
  });

  _signale["default"].success('create component templates successfully!!');
};

exports["default"] = _default;