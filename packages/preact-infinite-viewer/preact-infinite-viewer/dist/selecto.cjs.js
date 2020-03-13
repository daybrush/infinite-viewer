/*
Copyright (c) 2019 Daybrush
name: preact-selecto
license: MIT
author: Daybrush
repository: https://github.com/daybrush/selecto/blob/master/packages/preact-selecto
version: 0.0.9
*/
'use strict';

var compat = require('preact/compat');
var VanillaSelecto = require('selecto');
var frameworkUtils = require('framework-utils');
var utils = require('@daybrush/utils');

/*
Copyright (c) 2019 Daybrush
name: react-selecto
license: MIT
author: Daybrush
repository: https://github.com/daybrush/selecto/blob/master/packages/react-selecto
version: 0.0.10
*/

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

/* global Reflect, Promise */
var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  };

  return extendStatics(d, b);
};

function __extends(d, b) {
  extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function () {
  __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};
function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

var REACT_EVENTS = VanillaSelecto.EVENTS.map(function (name) {
  return utils.camelize("on " + name);
});

var Selecto =
/*#__PURE__*/
function (_super) {
  __extends(Selecto, _super);

  function Selecto() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  var __proto = Selecto.prototype;

  __proto.render = function () {
    return compat.createElement("div", {
      className: VanillaSelecto.CLASS_NAME,
      ref: frameworkUtils.ref(this, "selectionElement")
    });
  };

  __proto.componentDidMount = function () {
    var _this = this;

    var props = this.props;
    var options = {};
    VanillaSelecto.OPTIONS.forEach(function (name) {
      if (name in props) {
        options[name] = props[name];
      }
    });
    this.selecto = new VanillaSelecto(__assign(__assign({}, options), {
      target: this.selectionElement
    }));
    VanillaSelecto.EVENTS.forEach(function (name, i) {
      _this.selecto.on(name, function (e) {
        var selfProps = _this.props;
        var result = selfProps[REACT_EVENTS[i]] && selfProps[REACT_EVENTS[i]](e);

        if (result === false) {
          e.stop();
        }
      });
    });
  };

  __proto.componentDidUpdate = function (prevProps) {
    var props = this.props;
    var selecto = this.selecto;
    VanillaSelecto.PROPERTIES.forEach(function (name) {
      if (prevProps[name] !== props[name]) {
        selecto[name] = props[name];
      }
    });
  };

  __proto.componentWillUnmount = function () {
    this.selecto.destroy();
  };

  __decorate([frameworkUtils.withMethods(VanillaSelecto.METHODS)], Selecto.prototype, "selecto", void 0);

  return Selecto;
}(compat.PureComponent);

module.exports = Selecto;
