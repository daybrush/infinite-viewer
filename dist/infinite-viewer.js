/*
Copyright (c) 2019 Daybrush
name: infinite-viewer
license: MIT
author: Daybrush
repository: git+https://github.com/daybrush/infinite-viewer.git
version: 0.1.1
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@egjs/component'), require('@daybrush/drag'), require('framework-utils'), require('@daybrush/utils'), require('css-styled')) :
    typeof define === 'function' && define.amd ? define(['@egjs/component', '@daybrush/drag', 'framework-utils', '@daybrush/utils', 'css-styled'], factory) :
    (global = global || self, global.InfiniteViewer = factory(global.Component, global.Dragger, global.frameworkUtils, global.utils, global.styled));
}(this, (function (Component, Dragger, frameworkUtils, utils, styled) { 'use strict';

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

    var injector = styled("\n{\n    position: relative;\n    display: block;\n    overflow: auto;\n}\n:host::-webkit-scrollbar {\n    display: none;\n}\n");
    /**
     * @memberof InfiniteViewer
     */

    var CLASS_NAME = injector.className;
    /**
     * @memberof InfiniteViewer
     */

    var OPTIONS = [// ignore target, container,
    "margin", "threshold", "zoom", "scrollArea", "rangeX", "rangeY"];
    /**
     * @memberof InfiniteViewer
     */

    var PROPERTIES = ["margin", "threshold", "zoom", "rangeX", "rangeY"];
    var OPTION_TYPES = {
      margin: Number,
      threshold: Number,
      zoom: Number,
      scrollArea: Object,
      rangeX: Array,
      rangeY: Array
    };
    /**
     * @memberof InfiniteViewer
     */

    var EVENTS = ["scroll"];
    /**
     * @memberof InfiniteViewer
     */

    var METHODS = ["getScrollLeft", "getScrollTop", "getScrollWidth", "getScrollHeight", "scrollTo", "scrollBy"];

    function measureSpeed(e) {
      var deltaX = e.deltaX,
          deltaY = e.deltaY,
          datas = e.datas;
      var time = Date.now();
      var prevSpeed = datas.speed;

      if (!prevSpeed) {
        datas.speed = [0, 0];
        datas.time = time;
        return;
      }

      var dt = time - datas.time;
      datas.speed = [prevSpeed[0] / 2 + deltaX / dt, prevSpeed[1] / 2 + deltaY / dt];
    }
    function getDuration(speed, a) {
      var normalSpeed = Math.sqrt(speed[0] * speed[0] + speed[1] * speed[1]);
      return Math.abs(normalSpeed / a);
    }
    function getDestPos(speed, a) {
      var duration = getDuration(speed, a);
      return [speed[0] / 2 * duration, speed[1] / 2 * duration];
    }
    function minmax(value, min, max) {
      return Math.min(max, Math.max(min, value));
    }

    var InfiniteViewer =
    /*#__PURE__*/
    function (_super) {
      __extends(InfiniteViewer, _super);
      /**
       *
       */


      function InfiniteViewer(container, viewport, options) {
        if (options === void 0) {
          options = {};
        }

        var _this = _super.call(this) || this;

        _this.container = container;
        _this.viewport = viewport;
        _this.loopX = 0;
        _this.loopY = 0;
        _this.offsetX = 0;
        _this.offsetY = 0;
        _this.scrollLeft = 0;
        _this.scrollTop = 0;
        _this.timer = 0;

        _this.onScroll = function () {
          var container = _this.container;
          var scrollLeft = container.scrollLeft,
              scrollTop = container.scrollTop;
          var _a = _this,
              margin = _a.margin,
              threshold = _a.threshold,
              loopX = _a.loopX,
              loopY = _a.loopY,
              rangeX = _a.rangeX,
              rangeY = _a.rangeY;
          var endThreshold = margin * 2 - threshold;
          var nextLoopX = loopX;
          var nextLoopY = loopY;
          var nextScrollLeft = scrollLeft;
          var nextScrollTop = scrollTop;

          if (scrollLeft < threshold) {
            if (nextLoopX > rangeX[0]) {
              nextScrollLeft = scrollLeft + margin;
              --nextLoopX;
            }
          } else if (scrollLeft > endThreshold) {
            if (nextLoopX < rangeX[1]) {
              nextScrollLeft = scrollLeft - margin;
              ++nextLoopX;
            }
          }

          if (scrollTop < threshold) {
            if (nextLoopY > rangeY[0]) {
              nextScrollTop = scrollTop + margin;
              --nextLoopY;
            }
          } else if (scrollTop > endThreshold) {
            if (nextLoopY > rangeY[1]) {
              nextScrollTop = scrollTop - margin;
              ++nextLoopY;
            }
          }

          var isChangeScroll = _this.scrollLeft !== nextScrollLeft || _this.scrollTop !== nextScrollTop;
          var isChangeLoop = loopX !== nextLoopX || loopY !== nextLoopY;
          _this.scrollLeft = nextScrollLeft;
          _this.scrollTop = nextScrollTop;
          _this.loopX = nextLoopX;
          _this.loopY = nextLoopY;

          _this.render();

          if (isChangeLoop || isChangeScroll) {
            _this.trigger("scroll");
          }

          if (isChangeScroll) {
            _this.move(nextScrollLeft, nextScrollTop);
          }
        };

        _this.options = __assign({
          margin: 500,
          threshold: 100,
          zoom: 1,
          rangeX: [-Infinity, Infinity],
          rangeY: [-Infinity, Infinity],
          scrollArea: null
        }, options);
        _this.scrollArea = _this.options.scrollArea;

        _this.init();

        return _this;
      }
      /**
       * Destroy elements, properties, and events.
       */


      var __proto = InfiniteViewer.prototype;

      __proto.destroy = function () {
        this.off();
        this.dragger.unset();
        this.injectResult.destroy();
        utils.removeEvent(this.container, "scroll", this.onScroll);
        this.dragger = null;
        this.injectResult = null;
        this.container = null;
        this.options = null;
      };

      __proto.getScrollTop = function (isAbsolute) {
        return this.scrollTop + (this.loopY - 1) * this.margin - this.offsetY + (isAbsolute ? (-this.rangeY[0] + 1) * this.margin : 1);
      };

      __proto.getScrollLeft = function (isAbsolute) {
        return this.scrollLeft + (this.loopX - 1) * this.margin - this.offsetX + (isAbsolute ? (-this.rangeX[0] + 1) * this.margin : 0);
      };

      __proto.getScrollWidth = function () {
        return this.container.offsetWidth + this.margin * (this.rangeX[1] - this.rangeX[0] + 2);
      };

      __proto.getScrollHeight = function () {
        return this.container.offsetHeight + this.margin * (this.rangeY[1] - this.rangeY[0] + 2);
      };

      __proto.scrollBy = function (deltaX, deltaY) {
        this.scrollTo(this.getScrollLeft() + deltaX, this.getScrollTop() + deltaY);
      };

      __proto.scrollTo = function (scrollLeft, scrollTop) {
        var _a = this,
            rangeX = _a.rangeX,
            rangeY = _a.rangeY,
            margin = _a.margin;

        this.loopX = minmax(Math.floor((margin + scrollLeft) / margin), rangeX[0], rangeX[1]);
        this.loopY = minmax(Math.floor((margin + scrollTop) / margin), rangeY[0], rangeY[1]);
        this.offsetX = (this.loopX - 1) * margin - scrollLeft + this.scrollLeft;
        this.offsetY = (this.loopY - 1) * margin - scrollTop + this.scrollTop;
        this.render();
        this.trigger("scroll");
      };

      __proto.init = function () {
        var _this = this; // infinite-viewer(container)
        // viewport
        // children


        var container = this.container;
        utils.addClass(container, CLASS_NAME); // vanilla

        if (!this.scrollArea) {
          this.scrollArea = document.createElement("div");
          var scrollArea = this.scrollArea;
          scrollArea.style.cssText = "position:absolute;top:0;left:0;width:calc(100% + 400px);height:calc(100% + 400px);";
          container.insertBefore(scrollArea, container.firstChild);
        }

        this.injectResult = injector.inject(container);
        this.dragger = new Dragger(container, {
          container: document.body,
          events: ["touch"],
          dragstart: function (_a) {
            var inputEvent = _a.inputEvent;
            inputEvent.preventDefault();

            _this.pauseAnimation();
          },
          drag: function (e) {
            measureSpeed(e);

            _this.scrollBy(-e.deltaX, -e.deltaY);
          },
          dragend: function (e) {
            _this.startAnimation(e.datas.speed);
          }
        });
        var margin = this.margin;
        utils.addEvent(container, "scroll", this.onScroll);
        this.render();
        this.move(margin, margin);
      };

      __proto.render = function () {
        var _a = this,
            margin = _a.margin,
            loopX = _a.loopX,
            loopY = _a.loopY,
            offsetX = _a.offsetX,
            offsetY = _a.offsetY,
            zoom = _a.zoom;

        var size = "calc(100% + " + margin * 2 + "px)";
        var nextOffsetX = (1 - loopX) * margin + offsetX;
        var nextOffsetY = (1 - loopY) * margin + offsetY;
        this.scrollArea.style.cssText += "width:" + size + ";height:" + size + ";";
        this.viewport.style.transform = "translate(" + nextOffsetX + "px, " + nextOffsetY + "px) scale(" + zoom + ")";
      };

      __proto.move = function (scrollLeft, scrollTop) {
        var container = this.container;
        container.scrollLeft = scrollLeft;
        container.scrollTop = scrollTop;
      };

      __proto.startAnimation = function (speed) {
        var _this = this;

        if (!speed || !speed[0] && !speed[1]) {
          return;
        }

        var a = -0.0006;

        var easing = function (x) {
          return 1 - Math.pow(1 - x, 3);
        };

        var duration = getDuration(speed, a);
        var destPos = getDestPos(speed, a);
        var startTime = Date.now();
        var prevTime = startTime;

        var next = function () {
          var now = Date.now();
          var t = now - startTime;

          if (duration < t) {
            t = duration;
          }

          var ratio = easing(t / duration);
          var prevRatio = easing((prevTime - startTime) / duration);
          prevTime = now;

          _this.scrollBy(-destPos[0] * (ratio - prevRatio), -destPos[1] * (ratio - prevRatio));

          if (t >= duration) {
            return;
          }

          _this.timer = requestAnimationFrame(next);
        };

        this.timer = requestAnimationFrame(next);
      };

      __proto.pauseAnimation = function () {
        cancelAnimationFrame(this.timer);
      };

      InfiniteViewer = __decorate([frameworkUtils.Properties(PROPERTIES, function (prototype, property) {
        var attributes = {
          enumerable: true,
          configurable: true,
          get: function () {
            return this.options[property];
          }
        };
        var setter = utils.camelize("set " + property);

        if (prototype[setter]) {
          attributes.set = function (value) {
            this[setter](value);
          };
        } else {
          attributes.set = function (value) {
            this.options[property] = value;
          };
        }

        Object.defineProperty(prototype, property, attributes);
      })], InfiniteViewer);
      return InfiniteViewer;
    }(Component);



    var modules = {
        __proto__: null,
        'default': InfiniteViewer,
        OPTIONS: OPTIONS,
        OPTION_TYPES: OPTION_TYPES,
        PROPERTIES: PROPERTIES,
        EVENTS: EVENTS,
        METHODS: METHODS,
        CLASS_NAME: CLASS_NAME
    };

    for (var name in modules) {
      InfiniteViewer[name] = modules[name];
    }

    return InfiniteViewer;

})));
//# sourceMappingURL=infinite-viewer.js.map
