/*
Copyright (c) Daybrush
name: infinite-viewer
license: MIT
author: Daybrush
repository: git+https://github.com/daybrush/infinite-viewer.git
version: 0.20.0
*/
import EventEmitter from '@scena/event-emitter';
import Gesto from 'gesto';
import { prefixCSS, Properties } from 'framework-utils';
import { addClass, addEvent, removeEvent, isObject, isArray, between, convertUnitSize, camelize } from '@daybrush/utils';
import styled from 'css-styled';
import getAgent from '@egjs/agent';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

/* global Reflect, Promise */
var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
  };

  return extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

var agent = getAgent();
var IS_SAFARI = agent.browser.name === "safari";
var PREFIX = "infinite-viewer-";
var WRAPPER_CLASS_NAME = "".concat(PREFIX, "wrapper");
var SCROLL_AREA_CLASS_NAME = "".concat(PREFIX, "scroll-area");
var SCROLL_BAR_CLASS_NAME = "".concat(PREFIX, "scroll-bar");
var HORIZONTAL_SCROLL_BAR_CLASS_NAME = "".concat(PREFIX, "horizontal-scroll-bar");
var VERTICAL_SCROLL_BAR_CLASS_NAME = "".concat(PREFIX, "vertical-scroll-bar");
var SCROLL_THUMB_CLASS_NAME = "".concat(PREFIX, "scroll-thumb");
var injector = styled(prefixCSS(PREFIX, "\n{\n    position: relative;\n    overscroll-behavior: none;\n}\n.wrapper {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    overflow: auto;\n    top: 0;\n    left: 0;\n    will-change: scroll-position;\n}\n.wrapper::-webkit-scrollbar {\n    display: none;\n}\n.scroll-area {\n    position:absolute;\n    top:0;\n    left:0;\n    transform-origin: 0 0;\n}\n.scroll-bar {\n    position:absolute;\n    width: 10px;\n    height: 10px;\n    box-sizing: border-box;\n    right: 0;\n    bottom: 0;\n    overflow: hidden;\n}\n.horizontal-scroll-bar {\n    width: 100%;\n    height: 14px;\n}\n.vertical-scroll-bar {\n    height: 100%;\n    width: 14px;\n}\n.scroll-thumb {\n    position:relative;\n    opacity: 0.7;\n    background: #333;\n    border-radius: 3px;\n    left: 0px;\n    top: 0px;\n    z-index: 10;\n    width: 6px;\n    height: 6px;\n    transition: all ease 0.2s;\n}\n.horizontal-scroll-bar .scroll-thumb {\n    margin: 4px 0px;\n    transition-property: margin, height, border-radius;\n}\n.vertical-scroll-bar .scroll-thumb {\n    margin: 0px 4px;\n    transition-property: margin, width, border-radius;\n}\n.horizontal-scroll-bar:hover .scroll-thumb {\n    height: 10px;\n    margin: 2px 0px;\n    border-radius: 5px;\n}\n.vertical-scroll-bar:hover .scroll-thumb {\n    width: 10px;\n    margin: 0px 2px;\n    border-radius: 5px;\n}\n"));
var DEFAULT_OPTIONS = {
  margin: 500,
  threshold: 100,
  zoom: 1,
  zoomX: 1,
  zoomY: 1,
  rangeX: [-Infinity, Infinity],
  rangeY: [-Infinity, Infinity],
  rangeOffsetX: [0, 0],
  rangeOffsetY: [0, 0],
  wrapperElement: null,
  scrollAreaElement: null,
  horizontalScrollElement: null,
  verticalScrollElement: null,
  usePinch: false,
  useAutoZoom: false,
  useMouseDrag: false,
  pinchThreshold: 30,
  cspNonce: "",
  maxPinchWheel: Infinity,
  wheelScale: 0.01,
  displayHorizontalScroll: true,
  displayVerticalScroll: true,
  useTransform: true,
  useWheelPinch: true,
  zoomRange: [0.001, Infinity],
  wheelPinchKey: "ctrl",
  useWheelScroll: IS_SAFARI,
  zoomOffsetX: "50%",
  zoomOffsetY: "50%",
  translateZ: 0,
  useGesture: true,
  useResizeObserver: false,
  pinchDirection: "all"
};
var DEFAULT_EASING = function (x) {
  return 1 - Math.pow(1 - x, 3);
};
var NAMES = {
  horizontal: {
    pos: "Left",
    coord: "X",
    size: "Width"
  },
  vertical: {
    pos: "Top",
    coord: "Y",
    size: "Height"
  }
};
/**
 * @memberof InfiniteViewer
 */

var CLASS_NAME = injector.className;
/**
 * @memberof InfiniteViewer
 */

var PROPERTIES = ["margin", "threshold", "zoomOffsetX", "zoomOffsetY", "zoom", "zoomX", "zoomY", "rangeX", "rangeY", "rangeOffsetX", "rangeOffsetY", "usePinch", "useMouseDrag", "pinchThreshold", "maxPinchWheel", "wheelScale", "displayVerticalScroll", "displayHorizontalScroll", "useWheelScroll", "translateZ", "useAutoZoom", "wheelPinchKey", "zoomRange", "pinchDirection"];
/**
 * @memberof InfiniteViewer
 */

var OPTIONS = __spreadArray(__spreadArray([], PROPERTIES, true), ["useWheel", "useGesture", "cspNonce", "wrapperElement", "scrollAreaElement", "verticalScrollElement", "horizontalScrollElement", "useResizeObserver"], false);
/**
 * @memberof InfiniteViewer
 */

var EVENTS = ["scroll", "abortPinch", "dragStart", "dragEnd", "pinchStart", "pinch"];
/**
 * @memberof InfiniteViewer
 */

var METHODS = ["getScrollLeft", "getScrollTop", "getScrollWidth", "getScrollHeight", "scrollTo", "scrollBy", "zoomBy", "scrollCenter", "getContainer", "getViewport", "getWrapper", "setZoom", "getRangeX", "getRangeY", "resize", "getZoom", "getZoomX", "getZoomY"];
var TINY_NUM = 0.000001;

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
  return [-speed[0] / 2 * duration, -speed[1] / 2 * duration];
}
function abs(v) {
  return Math.abs(v);
}
function getRange(pos, margin, range, threshold, isReal) {
  var min = isReal || isFinite(range[0]) ? range[0] : Math.min(-1, Math.floor(pos / margin)) * margin - threshold;
  var max = isReal || isFinite(range[1]) ? range[1] : Math.max(1, Math.ceil(pos / margin)) * margin + threshold;
  return [min, max];
}
function checkDefault(value, defaultValue) {
  return value != null ? value : defaultValue;
}
function startAnimation(callback, timerCallback, options) {
  var duration = options.duration;

  var easing = options.easing || function (x) {
    return 1 - Math.pow(1 - x, 3);
  };

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
    callback(ratio - prevRatio);

    if (t >= duration) {
      return;
    }

    timerCallback(next);
  };

  timerCallback(next);
}

var ScrollBar =
/*#__PURE__*/
function (_super) {
  __extends(ScrollBar, _super);

  function ScrollBar(type, container) {
    var _this = _super.call(this) || this;

    _this.type = type;
    _this.isAppend = false;
    _this.pos = 0;
    _this.size = 0;
    _this.scrollSize = 0;
    _this.isHorizontal = false;

    _this.onWheel = function (e) {
      var delta = _this.isHorizontal ? e.deltaX : e.deltaY;

      if (delta) {
        e.preventDefault();
      }

      _this.trigger("scroll", {
        delta: delta
      });
    };

    var isHorizontal = type === "horizontal";
    var thumbElement;
    var barElement = container;

    if (!container) {
      barElement = document.createElement("div");
      thumbElement = document.createElement("div");
      barElement.insertBefore(thumbElement, null);
      _this.isAppend = true;
    } else {
      thumbElement = container.querySelector(".".concat(SCROLL_THUMB_CLASS_NAME));
    }

    addClass(barElement, isHorizontal ? HORIZONTAL_SCROLL_BAR_CLASS_NAME : VERTICAL_SCROLL_BAR_CLASS_NAME);
    addClass(barElement, SCROLL_BAR_CLASS_NAME);
    addClass(thumbElement, SCROLL_THUMB_CLASS_NAME);
    _this.thumbElement = thumbElement;
    _this.barElement = barElement;
    _this.isHorizontal = isHorizontal;
    _this.gesto = new Gesto(barElement, {
      container: window
    }).on("dragStart", function (e) {
      var target = e.inputEvent.target;
      var datas = e.datas;
      var isThumb = _this.thumbElement === target;

      if (!isThumb) {
        setTimeout(function () {
          requestAnimationFrame(function () {
            var thumbRect = _this.thumbElement.getBoundingClientRect();

            var pos1 = thumbRect[isHorizontal ? "left" : "top"];
            var thumbSize = thumbRect[isHorizontal ? "width" : "height"];
            var pos2 = pos1 + thumbSize;
            var clientPos = e[isHorizontal ? "clientX" : "clientY"];

            if (pos1 <= clientPos && clientPos <= pos2) {
              return;
            }

            var size = _this.size;
            var delta = size * size / _this.scrollSize;

            _this.scrollBy(pos1 < clientPos ? delta : -delta);
          });
        }, 100);
      }

      datas.isThumb = isThumb;
      e.inputEvent.stopPropagation();
      e.inputEvent.preventDefault();
    }).on("drag", function (e) {
      if (!e.datas.isThumb) {
        return;
      }

      _this.scrollBy(_this.isHorizontal ? e.deltaX : e.deltaY);
    });
    addEvent(_this.barElement, "wheel", _this.onWheel, {
      passive: false
    });
    return _this;
  }

  var __proto = ScrollBar.prototype;

  __proto.scrollBy = function (delta) {
    var ratio = delta / this.size;
    this.trigger("scroll", {
      delta: this.scrollSize * ratio
    });
  };

  __proto.render = function (isDisplay, pos, size, scrollSize) {
    this.pos = pos;
    this.size = size;
    this.scrollSize = scrollSize;
    var display = isDisplay && scrollSize > size ? "block" : "none";

    var _a = this.isHorizontal ? ["X", "width"] : ["Y", "height"],
        dirName1 = _a[0],
        sizeName = _a[1];

    this.barElement.style.cssText = "display: ".concat(display, ";");
    this.thumbElement.style.cssText += "".concat(sizeName, ": ").concat(size * size / scrollSize, "px;") + "transform: translate".concat(dirName1, "(").concat(pos / scrollSize * size, "px)");
  };

  __proto.destroy = function () {
    removeEvent(this.barElement, "wheel", this.onWheel);
    this.gesto.off();
    this.off();
  };

  return ScrollBar;
}(EventEmitter);

var InfiniteViewer =
/*#__PURE__*/
function (_super) {
  __extends(InfiniteViewer, _super);
  /**
   * @sort 1
   */


  function InfiniteViewer(containerElement, viewportElement, options) {
    if (options === void 0) {
      options = {};
    }

    var _this = _super.call(this) || this;

    _this.containerElement = containerElement;
    _this.viewportElement = viewportElement;
    _this.offsetX = 0;
    _this.offsetY = 0;
    _this.containerWidth = 0;
    _this.containerHeight = 0;
    _this.viewportWidth = 0;
    _this.viewportHeight = 0;
    _this.scrollLeft = 0;
    _this.scrollTop = 0;
    _this._scrollTimer = 0;
    _this._zoomTimer = 0;
    _this.dragFlag = false;
    _this.isLoop = false;
    _this._tempScale = [1, 1];
    _this._tempRect = null;
    _this._tempRectTimer = null;
    _this._onDestroys = [];
    _this._asLeft = 0;
    _this._asTop = 0;
    /**
     * Update Viewer Sizes
     * @method
     */

    _this.resize = function () {
      var _a = _this.containerElement,
          containerWidth = _a.offsetWidth,
          containerHeight = _a.offsetHeight;
      var _b = _this.viewportElement,
          viewportWidth = _b.offsetWidth,
          viewportHeight = _b.offsetHeight;
      _this.containerWidth = containerWidth;
      _this.containerHeight = containerHeight;
      _this.viewportWidth = viewportWidth;
      _this.viewportHeight = viewportHeight;

      _this.render();

      _this._scrollBy(0, 0);
    };

    _this._onScroll = function () {
      var _a = _this.wrapperElement,
          scrollLeft = _a.scrollLeft,
          scrollTop = _a.scrollTop;
      var _b = _this.zoom,
          zoom = _b === void 0 ? DEFAULT_OPTIONS.zoom : _b;
      var deltaX = scrollLeft - _this.scrollLeft;
      var deltaY = scrollTop - _this.scrollTop;

      var viewerScrollLeft = _this.getScrollLeft();

      var viewerScrollTop = _this.getScrollTop();

      if (_this.isLoop) {
        _this.isLoop = false;
      }

      _this.scrollLeft = scrollLeft;
      _this.scrollTop = scrollTop;

      _this.scrollTo(viewerScrollLeft + deltaX / zoom, viewerScrollTop + deltaY / zoom);
    };

    _this.onWheel = function (e) {
      var options = _this.options;
      var pinchDirection = options.pinchDirection;
      var maxPinchWheel = options.maxPinchWheel || Infinity;
      var isKeydown = e["".concat(_this.wheelPinchKey, "Key")] || e.ctrlKey;

      if (options.useWheelPinch && isKeydown) {
        var deltaY = e.deltaY;
        var sign = deltaY >= 0 ? 1 : -1;
        var distance = Math.min(maxPinchWheel, Math.abs(deltaY));
        deltaY = sign * distance;
        var delta = -deltaY;
        var scale = Math.max(1 + delta * (options.wheelScale || 0.01), TINY_NUM);
        clearTimeout(_this._tempRectTimer);
        _this._tempRectTimer = window.setTimeout(function () {
          _this._tempRect = null;
        }, 100);

        _this._triggerPinch({
          distance: distance,
          scale: scale,
          rotation: 0,
          zoom: _this.zoom * scale,
          zoomX: _this.zoomX * (pinchDirection === "vertical" ? 1 : scale),
          zoomY: _this.zoomY * (pinchDirection === "horizontal" ? 1 : scale),
          inputEvent: e,
          isWheel: true,
          clientX: e.clientX,
          clientY: e.clientY,
          ratioX: 0,
          ratioY: 0
        });
      } else if (options.useWheelScroll) {
        var deltaX = e.deltaX;
        var deltaY = e.deltaY;

        if (e.shiftKey && !deltaX) {
          deltaX = deltaY;
          deltaY = 0;
        }

        _this.scrollBy(deltaX / _this.zoomX, deltaY / _this.zoomY);
      } else {
        return;
      }

      e.preventDefault();
    };

    _this.onGestureStart = function (e) {
      _this._tempScale = [_this.zoomX, _this.zoomY];

      _this._setClientRect();

      e.preventDefault();
    };

    _this.onGestureChange = function (e) {
      e.preventDefault();

      if (_this.gesto.isFlag() || !_this._tempScale) {
        _this._tempScale = [1, 1];
        return;
      }

      var scale = e.scale;
      var zoomX = _this._tempScale[0];
      var zoomY = _this._tempScale[1];
      var pinchDirection = _this.options.pinchDirection;

      _this._triggerPinch({
        distance: 0,
        scale: scale,
        rotation: e.rotation,
        inputEvent: e,
        isWheel: true,
        zoom: (zoomX + zoomY) * scale / 2,
        zoomX: zoomX * (pinchDirection === "vertical" ? 1 : scale),
        zoomY: zoomY * (pinchDirection === "horizontal" ? 1 : scale),
        clientX: e.clientX,
        clientY: e.clientY,
        ratioX: 0,
        ratioY: 0
      });
    };

    _this.onGestureEnd = function () {};

    _this.options = __assign(__assign({}, DEFAULT_OPTIONS), options);

    _this.init();

    return _this;
  }
  /**
   * Get Container Element
   */


  var __proto = InfiniteViewer.prototype;

  __proto.getContainer = function () {
    return this.containerElement;
  };
  /**
   * Get Viewport Element
   */


  __proto.getViewport = function () {
    return this.viewportElement;
  };
  /**
   * Get Wrapper Element
   */


  __proto.getWrapper = function () {
    return this.wrapperElement;
  };
  /**
   * Get Scroll Area Element
   */


  __proto.geScrollArea = function () {
    return this.scrollAreaElement;
  };
  /**
   * Destroy elements, properties, and events.
   */


  __proto.destroy = function () {
    this.off();
    this.gesto.unset();
    this.verticalScrollbar.destroy();
    this.horizontalScrollbar.destroy();
    this.injectResult.destroy();
    var containerElement = this.containerElement;

    this._onDestroys.forEach(function (callback) {
      callback();
    });

    removeEvent(this.wrapperElement, "scroll", this._onScroll);
    removeEvent(containerElement, "wheel", this.onWheel);
    removeEvent(containerElement, "gesturestart", this.onGestureStart);
    removeEvent(containerElement, "gesturechange", this.onGestureChange);
    removeEvent(containerElement, "gesturesend", this.onGestureEnd);
    this.gesto = null;
    this.injectResult = null;
    this.containerElement = null;
    this.viewportElement = null;
    this.options = null;
  };
  /**
   * Gets the number of pixels that an element's content is scrolled vertically.
   */


  __proto.getScrollTop = function (options) {
    if (options === void 0) {
      options = {};
    }

    var range = false;
    var absolute = false;

    if (isObject(options)) {
      range = options.range;
      absolute = options.absolute;
    } else {
      range = options;
    }

    var zoom = this.zoomY;
    var pos = this.scrollTop / zoom + this.offsetY + (range ? abs(this.getRangeY()[0]) : 0);
    return absolute ? pos * zoom : pos;
  };
  /**
   * Gets the number of pixels that an element's content is scrolled vertically.
   */


  __proto.getScrollLeft = function (options) {
    if (options === void 0) {
      options = {};
    }

    var range = false;
    var absolute = false;

    if (isObject(options)) {
      range = options.range;
      absolute = options.absolute;
    } else {
      range = options;
    }

    var zoom = this.zoomX;
    var pos = this.scrollLeft / zoom + this.offsetX + (range ? abs(this.getRangeX()[0]) : 0);
    return absolute ? pos * zoom : pos;
  };
  /**
   * Gets measurement of the width of an element's content with overflow
   */


  __proto.getScrollWidth = function (isZoom) {
    var range = this.getRangeX(isZoom);
    return this.containerWidth + abs(range[0]) + abs(range[1]);
  };
  /**
   * Gets measurement of the height of an element's content with overflow
   */


  __proto.getScrollHeight = function (isZoom) {
    var range = this.getRangeY(isZoom);
    return this.containerHeight + abs(range[0]) + abs(range[1]);
  };
  /**
   * Scroll the element to the center
   */


  __proto.scrollCenter = function (options) {
    this.resize();
    var zoomX = this.zoomX;
    var zoomY = this.zoomY;
    var left = -(this.containerWidth / zoomX - this.viewportWidth) / 2;
    var top = -(this.containerHeight / zoomY - this.viewportHeight) / 2;

    if (options === null || options === void 0 ? void 0 : options.absolute) {
      left *= zoomX;
      top *= zoomY;
    }

    return this.scrollTo(left, top, options);
  };
  /**
   * Scrolls the container by the given amount.
   */


  __proto.scrollBy = function (deltaX, deltaY, options) {
    this._pauseScrollAnimation();

    if (!options || !options.duration) {
      var scrollLeft = this.getScrollLeft();
      var scrollTop = this.getScrollTop();

      if (options === null || options === void 0 ? void 0 : options.absolute) {
        scrollLeft *= this.zoomX;
        scrollTop *= this.zoomY;
      }

      return this._scrollTo(scrollLeft + deltaX, scrollTop + deltaY, options);
    } else {
      this._startScrollAnimation([deltaX, deltaY], options);

      return true;
    }
  };
  /**
   * Scrolls the container to set of coordinates.
   * @param scrollLeft
   * @param scrollTop
   */


  __proto.scrollTo = function (x, y, options) {
    this._pauseScrollAnimation();

    if (!options || !options.duration) {
      return this._scrollTo(x, y, options);
    } else {
      var scrollLeft = this.getScrollLeft();
      var scrollTop = this.getScrollTop();

      if (options === null || options === void 0 ? void 0 : options.absolute) {
        scrollLeft *= this.zoomX;
        scrollTop *= this.zoomY;
      }

      return this.scrollBy(x - scrollLeft, y - scrollTop, options);
    }
  };
  /**
   * Set viewer zoom by the given amount
   */


  __proto.zoomBy = function (deltaZoom, options) {
    this._pauseZoomAnimation();

    var _a = isArray(deltaZoom) ? deltaZoom : [deltaZoom, deltaZoom],
        deltaX = _a[0],
        deltaY = _a[1];

    if (!options || !options.duration) {
      this._setZoom([this.zoomX + deltaX, this.zoomY + deltaY]);
    } else {
      this._startZoomAnimation([deltaX, deltaY], options);
    }
  };
  /**
   * Set viewer zoom
   */


  __proto.setZoom = function (zoom, options) {
    this._pauseZoomAnimation();

    if (!options || !options.duration) {
      this._setZoom(zoom);
    } else {
      var _a = isArray(zoom) ? zoom : [zoom, zoom],
          zoomX = _a[0],
          zoomY = _a[1];

      this._startZoomAnimation([zoomX - this.zoomX, zoomY - this.zoomY], options);
    }
  };
  /**
   * Get viewer zoom
   */


  __proto.getZoom = function () {
    return (this.zoomX + this.zoomY) / 2;
  };
  /**
   * Get viewer zoomX
   * @since 0.20.0
   */


  __proto.getZoomX = function () {
    return this.zoomX;
  };
  /**
   * Get viewer zoom
   * @since 0.20.0
   */


  __proto.getZoomY = function () {
    return this.zoomY;
  };
  /**
   * get x ranges
   */


  __proto.getRangeX = function (isZoom, isReal) {
    return this._getRangeCoord("horizontal", isZoom, isReal);
  };
  /**
   * get y ranges
   */


  __proto.getRangeY = function (isZoom, isReal) {
    return this._getRangeCoord("vertical", isZoom, isReal);
  };

  __proto.init = function () {
    var _this = this; // infinite-viewer(container)
    // viewport
    // children


    var containerElement = this.containerElement;
    var options = this.options; // vanilla

    var wrapperElement = options.wrapperElement || containerElement.querySelector(".".concat(WRAPPER_CLASS_NAME));
    var scrollAreaElement = options.scrollAreaElement || containerElement.querySelector(".".concat(SCROLL_AREA_CLASS_NAME));
    var horizontalScrollElement = options.horizontalScrollElement || containerElement.querySelector(".".concat(HORIZONTAL_SCROLL_BAR_CLASS_NAME));
    var verticalScrollElement = options.verticalScrollElement || containerElement.querySelector(".".concat(VERTICAL_SCROLL_BAR_CLASS_NAME));

    if (wrapperElement) {
      this.wrapperElement = wrapperElement;
    } else {
      wrapperElement = document.createElement("div");
      wrapperElement.insertBefore(this.viewportElement, null);
      containerElement.insertBefore(wrapperElement, null);
      this.wrapperElement = wrapperElement;
    }

    if (scrollAreaElement) {
      this.scrollAreaElement = scrollAreaElement;
    } else {
      scrollAreaElement = document.createElement("div");
      wrapperElement.insertBefore(scrollAreaElement, wrapperElement.firstChild);
      this.scrollAreaElement = scrollAreaElement;
    }

    addClass(containerElement, CLASS_NAME);
    addClass(wrapperElement, WRAPPER_CLASS_NAME);
    addClass(scrollAreaElement, SCROLL_AREA_CLASS_NAME);
    this.horizontalScrollbar = new ScrollBar("horizontal", horizontalScrollElement);
    this.verticalScrollbar = new ScrollBar("vertical", verticalScrollElement);
    this.horizontalScrollbar.on("scroll", function (e) {
      _this.scrollBy(e.delta / _this.zoomX, 0);
    });
    this.verticalScrollbar.on("scroll", function (e) {
      _this.scrollBy(0, e.delta / _this.zoomY);
    });

    if (this.horizontalScrollbar.isAppend) {
      containerElement.insertBefore(this.horizontalScrollbar.barElement, null);
    }

    if (this.verticalScrollbar.isAppend) {
      containerElement.insertBefore(this.verticalScrollbar.barElement, null);
    }

    this.injectResult = injector.inject(containerElement, {
      nonce: this.options.cspNonce
    });
    /**
     * the `dragStart` event fires when `touchstart` does occur.
     * @memberof InfiniteViewer
     * @event dragStart
     * @param {InfiniteViewer.OnDragStart} - Parameters for the `dragStart` event
     * @example
     * import InfiniteViewer from "infinite-viewer";
     *
     * const viewer = new InfiniteViewer(
     *   document.querySelector(".container"),
     *   document.querySelector(".viewport"),
     * ).on("dragStart", e => {
     *   console.log(e.inputEvent);
     * });
     */

    /**
     * the `drag` event fires when `touch` does occur.
     * @memberof InfiniteViewer
     * @event drag
     * @param {InfiniteViewer.OnDrag} - Parameters for the `drag` event
     * @example
     * import InfiniteViewer from "infinite-viewer";
     *
     * const viewer = new InfiniteViewer(
     *   document.querySelector(".container"),
     *   document.querySelector(".viewport"),
     * ).on("drag", e => {
     *   console.log(e.inputEvent);
     * });
     */

    /**
     * the `dragEnd` event fires when `touchend` does occur.
     * @memberof InfiniteViewer
     * @event dragEnd
     * @param {InfiniteViewer.OnDragEnd} - Parameters for the `dragEnd` event
     * @example
     * import InfiniteViewer from "infinite-viewer";
     *
     * const viewer = new InfiniteViewer(
     *   document.querySelector(".container"),
     *   document.querySelector(".viewport"),
     * ).on("dragEnd", e => {
     *   console.log(e.inputEvent);
     * });
     */

    /**
     * the `abortPinch` event fires when `pinch` event does not occur by dragging a certain area.
     * @memberof InfiniteViewer
     * @event abortPinch
     * @param {InfiniteViewer.OnAbortPinch} - Parameters for the abortPinch event
     * @example
     * import InfiniteViewer from "infinite-viewer";
     *
     * const viewer = new InfiniteViewer(
     *   document.querySelector(".container"),
     *   document.querySelector(".viewport"),
     *   {
     *     usePinch: true,
     *   }
     * ).on("abortPinch", e => {
     *   console.log(e.inputEvent);
     * });
     */

    /**
     * the `pinch` event fires when two points pinch the viewer
     * The pinchStart and abortPinch events do not occur when pinching through the wheel.
     * @memberof InfiniteViewer
     * @event pinch
     * @param {InfiniteViewer.OnPinch} - Parameters for the `pinch` event
     * @example
     * import InfiniteViewer from "infinite-viewer";
     *
     * const viewer = new InfiniteViewer(
     *   document.querySelector(".container"),
     *   document.querySelector(".viewport"),
     *   {
     *     usePinch: true,
     *   }
     * ).on("pinch", e => {
     *   console.log(e.zoom, e.inputEvent);
     * });
     */

    this.gesto = new Gesto(containerElement, {
      container: document.body,
      events: ["touch", "mouse"]
    }).on("dragStart", function (_a) {
      var inputEvent = _a.inputEvent,
          datas = _a.datas,
          stop = _a.stop,
          isMouseEvent = _a.isMouseEvent;

      if (!_this.useMouseDrag && isMouseEvent) {
        stop();
        return;
      }

      _this._pauseScrollAnimation();

      _this.dragFlag = false;

      var result = _this.trigger("dragStart", {
        inputEvent: inputEvent
      });

      if (result === false) {
        stop();
        return;
      }

      inputEvent.preventDefault();
      datas.startEvent = inputEvent;
    }).on("drag", function (e) {
      if (!_this.options.usePinch || e.isPinch || _this.useMouseDrag && e.isMouseEvent) {
        _this.trigger("drag", __assign(__assign({}, e), {
          inputEvent: e.inputEvent
        }));

        measureSpeed(e);

        _this.scrollBy(-e.deltaX / _this.zoomX, -e.deltaY / _this.zoomY);
      } else if (!_this.dragFlag && e.movement > options.pinchThreshold) {
        _this.dragFlag = true;

        _this.trigger("abortPinch", {
          inputEvent: e.datas.startEvent || e.inputEvent
        });
      }
    }).on("dragEnd", function (e) {
      _this.trigger("dragEnd", {
        isDrag: e.isDrag,
        isDouble: e.isDouble,
        inputEvent: e.inputEvent
      });

      _this._startScrollAnimationBySpeed(e.datas.speed);
    }).on("pinchStart", function (_a) {
      var inputEvent = _a.inputEvent,
          datas = _a.datas,
          stop = _a.stop;
      inputEvent.preventDefault();

      _this._pauseScrollAnimation();

      datas.startZoom = [_this.zoomX, _this.zoomY];

      var result = _this.trigger("pinchStart", {
        inputEvent: inputEvent
      });

      if (result === false) {
        stop();
      }

      _this._setClientRect();
    }).on("pinch", function (e) {
      var scale = e.scale;
      var pinchDirection = _this.options.pinchDirection;

      _this._triggerPinch({
        rotation: e.rotation,
        distance: e.distance,
        scale: e.scale,
        inputEvent: e.inputEvent,
        isWheel: false,
        zoom: e.datas.startZoom * scale,
        zoomX: _this.zoomX * (pinchDirection === "vertical" ? 1 : scale),
        zoomY: _this.zoomY * (pinchDirection === "horizontal" ? 1 : scale),
        clientX: e.clientX,
        clientY: e.clientY,
        ratioX: 0,
        ratioY: 0
      });
    }).on("pinchEnd", function () {
      _this._tempRect = null;
    });
    addEvent(wrapperElement, "scroll", this._onScroll);

    if (options.useResizeObserver) {
      var observer_1 = new ResizeObserver(function () {
        _this.resize();
      });
      observer_1.observe(this.viewportElement);
      observer_1.observe(this.containerElement);

      this._onDestroys.push(function () {
        observer_1.disconnect();
      });
    } else {
      addEvent(window, "resize", this.resize);

      this._onDestroys.push(function () {
        removeEvent(window, "resize", _this.resize);
      });
    }

    if (options.useWheelPinch || options.useWheelScroll) {
      addEvent(containerElement, "wheel", this.onWheel, {
        passive: false
      });
    }

    if (options.useGesture) {
      addEvent(containerElement, "gesturestart", this.onGestureStart, {
        passive: false
      });
      addEvent(containerElement, "gesturechange", this.onGestureChange, {
        passive: false
      });
    }

    this.resize();
  };

  __proto.render = function () {
    var _a = this,
        offsetX = _a.offsetX,
        offsetY = _a.offsetY,
        _b = _a.zoomX,
        zoomX = _b === void 0 ? DEFAULT_OPTIONS.zoomX : _b,
        _c = _a.zoomY,
        zoomY = _c === void 0 ? DEFAULT_OPTIONS.zoomY : _c,
        _d = _a.translateZ,
        translateZ = _d === void 0 ? 0 : _d;

    var _e = this.options.useTransform,
        useTransform = _e === void 0 ? DEFAULT_OPTIONS.useTransform : _e;
    var nextOffsetX = -offsetX * zoomX;
    var nextOffsetY = -offsetY * zoomY;
    this.scrollAreaElement.style.cssText = "width:calc(100% + ".concat(this.getScrollAreaWidth(), "px);") + "height:calc(100% + ".concat(this.getScrollAreaHeight(), "px);");
    var viewportStyle = this.viewportElement.style;

    if (useTransform === false) {
      viewportStyle.cssText += "position: relative; top: ".concat(nextOffsetY, "px; left: ").concat(nextOffsetX, "px;");
    } else {
      viewportStyle.cssText += "transform-origin: 0 0;transform:translate3d(".concat(nextOffsetX, "px, ").concat(nextOffsetY, "px, ").concat(translateZ, "px) scale(").concat(zoomX, ", ").concat(zoomY, ");");
    }

    this.renderScroll();
  };

  __proto.renderScroll = function () {
    var _a = this,
        containerWidth = _a.containerWidth,
        containerHeight = _a.containerHeight,
        zoomX = _a.zoomX,
        zoomY = _a.zoomY;

    var scrollLeft = this.getScrollLeft({
      range: true
    }) * zoomX;
    var scrollTop = this.getScrollTop({
      range: true
    }) * zoomY;
    var scrollWidth = this.getScrollWidth(true);
    var scrollHeight = this.getScrollHeight(true);
    this.horizontalScrollbar.render(this.displayHorizontalScroll, scrollLeft, containerWidth, scrollWidth);
    this.verticalScrollbar.render(this.displayVerticalScroll, scrollTop, containerHeight, scrollHeight);
  };

  __proto.move = function (scrollLeft, scrollTop) {
    var wrapperElement = this.wrapperElement;
    wrapperElement.scrollLeft = scrollLeft;
    wrapperElement.scrollTop = scrollTop;
  };

  __proto._startZoomAnimation = function (dest, options) {
    var _this = this;

    if (!dest) {
      return;
    }

    var duration = options.duration;
    var easing = options.easing || DEFAULT_EASING;
    startAnimation(function (distRatio) {
      return _this._setZoom([_this.zoomX + dest[0] * distRatio, _this.zoomY + dest[1] * distRatio], options.zoomBase);
    }, function (next) {
      _this._zoomTimer = requestAnimationFrame(next);
    }, {
      easing: easing,
      duration: duration
    });
  };

  __proto._startScrollAnimation = function (dest, options) {
    var _this = this;

    if (!dest[0] && !dest[1]) {
      return;
    }

    var duration = options.duration;
    var easing = options.easing || DEFAULT_EASING;
    startAnimation(function (distRatio) {
      return _this._scrollBy(dest[0] * distRatio, dest[1] * distRatio, options);
    }, function (next) {
      _this._scrollTimer = requestAnimationFrame(next);
    }, {
      easing: easing,
      duration: duration
    });
  };

  __proto._startScrollAnimationBySpeed = function (speed) {
    if (!speed || !speed[0] && !speed[1]) {
      return;
    }

    var a = -0.0006;
    var duration = getDuration(speed, a);
    var destPos = getDestPos(speed, a);
    return this._startScrollAnimation(destPos, {
      duration: duration
    });
  };

  __proto._pauseScrollAnimation = function () {
    cancelAnimationFrame(this._scrollTimer);
    this._scrollTimer = 0;
  };

  __proto._pauseZoomAnimation = function () {
    cancelAnimationFrame(this._zoomTimer);
    this._zoomTimer = 0;
  };

  __proto.getScrollAreaWidth = function () {
    var _a = this.getRangeX(true),
        min = _a[0],
        max = _a[1];

    return min || max ? this.margin * 2 : 0;
  };

  __proto.getScrollAreaHeight = function () {
    var _a = this.getRangeY(true),
        min = _a[0],
        max = _a[1];

    return min || max ? this.margin * 2 : 0;
  };

  __proto._triggerPinch = function (event) {
    var clientX = event.clientX,
        clientY = event.clientY,
        zoomX = event.zoomX,
        zoomY = event.zoomY;

    if (this.useAutoZoom) {
      this._zoomByClient([zoomX, zoomY], clientX, clientY);
    }

    if (!this._tempRect) {
      this._setClientRect();
    }

    var zoomRange = this.zoomRange;
    var _a = this._tempRect,
        left = _a.left,
        top = _a.top,
        width = _a.width,
        height = _a.height;
    var ratioX = (clientX - left) / width * 100;
    var ratioY = (clientY - top) / height * 100;
    this.trigger("pinch", __assign(__assign({}, event), {
      zoom: between((zoomX + zoomY) / 2, zoomRange[0], zoomRange[1]),
      zoomX: between(zoomX, zoomRange[0], zoomRange[1]),
      zoomY: between(zoomY, zoomRange[0], zoomRange[1]),
      ratioX: ratioX,
      ratioY: ratioY
    }));
  };

  __proto._setClientRect = function () {
    var rect = this.getContainer().getBoundingClientRect();
    this._tempRect = {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height
    };
  };

  __proto._zoomByClient = function (zoom, clientX, clientY) {
    if (!this._tempRect) {
      this._setClientRect();
    }

    var _a = this._tempRect,
        left = _a.left,
        top = _a.top,
        width = _a.width,
        height = _a.height;
    var options = this.options;
    var originalZoomOffsetX = options.zoomOffsetX;
    var originalZoomOffsetY = options.zoomOffsetY;
    options.zoomOffsetX = "".concat((clientX - left) / width * 100, "%");
    options.zoomOffsetY = "".concat((clientY - top) / height * 100, "%");

    this._setZoom(zoom, "screen");

    options.zoomOffsetX = originalZoomOffsetX;
    options.zoomOffsetY = originalZoomOffsetY;
  };

  __proto._setZoom = function (zoom, zoomBase) {
    var _a = this,
        containerWidth = _a.containerWidth,
        containerHeight = _a.containerHeight,
        prevZoomX = _a.zoomX,
        prevZoomY = _a.zoomY,
        zoomRange = _a.zoomRange;

    var _b = this,
        _c = _b.zoomOffsetX,
        zoomOffsetX = _c === void 0 ? DEFAULT_OPTIONS.zoomOffsetX : _c,
        _d = _b.zoomOffsetY,
        zoomOffsetY = _d === void 0 ? DEFAULT_OPTIONS.zoomOffsetY : _d;

    var scrollLeft = this.getScrollLeft();
    var scrollTop = this.getScrollTop();

    var _e = isArray(zoom) ? zoom : [zoom, zoom],
        zoomX = _e[0],
        zoomY = _e[1];

    var nextZoomX = between(zoomX, zoomRange[0], zoomRange[1]);
    var nextZoomY = between(zoomY, zoomRange[0], zoomRange[1]);
    var options = this.options;
    options.zoomX = nextZoomX;
    options.zoomY = nextZoomY;
    options.zoom = (nextZoomX + nextZoomY) / 2;
    var nextScrollLeft = this.getScrollLeft();
    var nextScrollTop = this.getScrollTop();
    var zoomXPos = 0;
    var zoomYPos = 0;

    if (zoomBase === "viewport") {
      zoomXPos = (-scrollLeft + convertUnitSize("".concat(zoomOffsetX), this.viewportWidth)) * prevZoomX;
      zoomYPos = (-scrollTop + convertUnitSize("".concat(zoomOffsetY), this.viewportHeight)) * prevZoomY;
    } else {
      zoomXPos = convertUnitSize("".concat(zoomOffsetX), containerWidth);
      zoomYPos = convertUnitSize("".concat(zoomOffsetY), containerHeight);
    }

    var centerX = scrollLeft + zoomXPos / prevZoomX;
    var centerY = scrollTop + zoomYPos / prevZoomY;
    var nextCenterX = nextScrollLeft + zoomXPos / nextZoomX;
    var nextCenterY = nextScrollTop + zoomYPos / nextZoomY;

    this._scrollBy(centerX - nextCenterX, centerY - nextCenterY);

    this.render();
  };

  __proto._scrollBy = function (deltaX, deltaY, options) {
    var scrollLeft = this.getScrollLeft();
    var scrollTop = this.getScrollTop();

    if (options === null || options === void 0 ? void 0 : options.absolute) {
      scrollLeft *= this.zoomX;
      scrollTop *= this.zoomY;
    }

    return this._scrollTo(scrollLeft + deltaX, scrollTop + deltaY, options);
  };

  __proto._scrollTo = function (x, y, options) {
    var _this = this;

    var _a = this,
        prevScrollLeft = _a.scrollLeft,
        prevScrollTop = _a.scrollTop;

    var isAbsolute = options === null || options === void 0 ? void 0 : options.absolute;

    this._scrollToType("horizontal", x, isAbsolute);

    this._scrollToType("vertical", y, isAbsolute);

    var scrollLeft = this.scrollLeft;
    var scrollTop = this.scrollTop;
    this.render();
    var nextScrollAbsoluteLeft = this.getScrollLeft();
    var nextScrollAbsoluteTop = this.getScrollTop();

    this._emitScrollEvent(nextScrollAbsoluteLeft, nextScrollAbsoluteTop);

    if (Math.round(prevScrollLeft) !== scrollLeft || Math.round(prevScrollTop) !== scrollTop) {
      this.isLoop = true;
      this.move(scrollLeft, scrollTop);
      requestAnimationFrame(function () {
        if (!_this.isLoop) {
          return;
        }

        _this.isLoop = false;
        var _a = _this.wrapperElement,
            requestScrollLeft = _a.scrollLeft,
            requestScrollTop = _a.scrollTop;
        _this.scrollLeft = requestScrollLeft;
        _this.scrollTop = requestScrollTop;

        if (scrollLeft !== Math.round(requestScrollLeft) || scrollTop !== Math.round(requestScrollTop)) {
          _this._scrollTo(nextScrollAbsoluteLeft, nextScrollAbsoluteTop);
        }
      });
      return false;
    }

    return true;
  };

  __proto._scrollToType = function (type, coord, isAbsolute) {
    var names = NAMES[type];

    var _a = this,
        _b = _a.margin,
        margin = _b === void 0 ? DEFAULT_OPTIONS.margin : _b,
        _c = _a.threshold,
        threshold = _c === void 0 ? DEFAULT_OPTIONS.threshold : _c;

    var prevScrollPos = this["scroll".concat(names.pos)];

    var _d = this["getRange".concat(names.coord)](true, true),
        minCoord = _d[0],
        maxCoord = _d[1];

    var scrollPos = Math.round(prevScrollPos);
    var scrollAreaSize = this["getScrollArea".concat(names.size)]();
    var zoom = this["zoom".concat(names.coord)];

    if (isAbsolute) {
      coord = coord / zoom;
    }

    var zoomCoord = coord * zoom;

    if (minCoord === maxCoord) {
      scrollPos = minCoord;
      coord = minCoord / zoom;
    } else if (zoomCoord - threshold <= minCoord) {
      var minThreshold = Math.max(0, zoomCoord - minCoord);
      scrollPos = minThreshold;
      coord = (minCoord + minThreshold) / zoom;
    } else if (zoomCoord + threshold >= maxCoord) {
      var maxThreshold = Math.max(0, maxCoord - zoomCoord);
      scrollPos = scrollAreaSize - maxThreshold;
      coord = (maxCoord - maxThreshold) / zoom;
    } else if (scrollPos < threshold) {
      scrollPos += margin;
    } else if (scrollPos > scrollAreaSize - threshold) {
      scrollPos -= margin;
    }

    scrollPos = Math.round(scrollPos);
    this["scroll".concat(names.pos)] = scrollPos;
    this["offset".concat(names.coord)] = coord - scrollPos / zoom;
  };

  __proto._getRangeCoord = function (type, isZoom, isReal) {
    var _a = this,
        _b = _a.margin,
        margin = _b === void 0 ? DEFAULT_OPTIONS.margin : _b,
        threshold = _a.threshold;

    var names = NAMES[type];
    var rangeCoord = checkDefault(this["range".concat(names.coord)], DEFAULT_OPTIONS["range".concat(names.coord)]);
    var rangeOffsetCoord = checkDefault(this["rangeOffset".concat(names.coord)], DEFAULT_OPTIONS["rangeOffset".concat(names.coord)]);
    var zoom = this["zoom".concat(names.coord)];
    var range = getRange(this["getScroll".concat(names.pos)](), margin, rangeCoord, threshold, isReal);

    if (!isZoom) {
      return [range[0] + rangeOffsetCoord[0], range[1] + rangeOffsetCoord[1]];
    }

    return [range[0] * zoom + rangeOffsetCoord[0], Math.max(this["viewport".concat(names.size)] * zoom - this["container".concat(names.size)], range[1] * zoom + rangeOffsetCoord[1])];
  };

  __proto._emitScrollEvent = function (scrollLeft, scrollTop) {
    var prevScrollLeft = this._asLeft;
    var prevScrollTop = this._asTop;

    if (prevScrollLeft === scrollLeft && prevScrollTop === scrollTop) {
      return;
    }

    this._asLeft = scrollLeft;
    this._asTop = scrollTop;
    /**
     * The `scroll` event fires when the document view or an element has been scrolled.
     * @memberof InfiniteViewer
     * @event scroll
     * @param {InfiniteViewer.OnScroll} - Parameters for the scroll event
     * @example
     * import InfiniteViewer from "infinite-viewer";
     *
     * const viewer = new InfiniteViewer(
     *   document.querySelector(".container"),
     *   document.querySelector(".viewport"),
     * ).on("scroll", () => {
     *   console.log(viewer.getScrollLeft(), viewer.getScrollTop());
     * });
     */

    this.trigger("scroll", {
      scrollLeft: scrollLeft,
      scrollTop: scrollTop
    });
  };

  InfiniteViewer = __decorate([Properties(PROPERTIES, function (prototype, property) {
    var attributes = {
      enumerable: true,
      configurable: true,
      get: function () {
        return this.options[property];
      }
    };
    var setter = camelize("set ".concat(property));

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
  })
  /**
   * @sort 1
   */
  ], InfiniteViewer);
  return InfiniteViewer;
}(EventEmitter);

var InfiniteViewer$1 =
/*#__PURE__*/
function (_super) {
  __extends(InfiniteViewer, _super);

  function InfiniteViewer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  return InfiniteViewer;
}(InfiniteViewer);

export default InfiniteViewer$1;
export { CLASS_NAME, EVENTS, METHODS, OPTIONS, PROPERTIES };
//# sourceMappingURL=infinite-viewer.esm.js.map
