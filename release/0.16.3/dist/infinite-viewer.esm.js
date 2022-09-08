/*
Copyright (c) 2019 Daybrush
name: infinite-viewer
license: MIT
author: Daybrush
repository: git+https://github.com/daybrush/infinite-viewer.git
version: 0.16.3
*/
import EventEmitter from '@scena/event-emitter';
import Gesto from 'gesto';
import { prefixCSS, Properties } from 'framework-utils';
import { addClass, addEvent, removeEvent, between, convertUnitSize, camelize } from '@daybrush/utils';
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
  useResizeObserver: false
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

var PROPERTIES = ["margin", "threshold", "zoomOffsetX", "zoomOffsetY", "zoom", "rangeX", "rangeY", "rangeOffsetX", "rangeOffsetY", "usePinch", "useMouseDrag", "pinchThreshold", "maxPinchWheel", "wheelScale", "displayVerticalScroll", "displayHorizontalScroll", "useWheelScroll", "translateZ", "useAutoZoom", "wheelPinchKey", "zoomRange"];
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

var METHODS = ["getScrollLeft", "getScrollTop", "getScrollWidth", "getScrollHeight", "scrollTo", "scrollBy", "scrollCenter", "getContainer", "getViewport", "getWrapper", "setZoom", "getRangeX", "getRangeY", "resize"];
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
  return [speed[0] / 2 * duration, speed[1] / 2 * duration];
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
    _this.timer = 0;
    _this.dragFlag = false;
    _this.isLoop = false;
    _this._tempScale = 1;
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

      _this.scrollBy(0, 0);
    };

    _this.onScroll = function () {
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
      var maxPinchWheel = options.maxPinchWheel || Infinity;
      var isKeydown = e["".concat(_this.wheelPinchKey, "Key")];

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
          inputEvent: e,
          isWheel: true,
          clientX: e.clientX,
          clientY: e.clientY,
          ratioX: 0,
          ratioY: 0
        });
      } else if (options.useWheelScroll) {
        var zoom = _this.zoom;
        var deltaX = e.deltaX;
        var deltaY = e.deltaY;

        if (e.shiftKey && !deltaX) {
          deltaX = deltaY;
          deltaY = 0;
        }

        _this.scrollBy(deltaX / zoom, deltaY / zoom);
      } else {
        return;
      }

      e.preventDefault();
    };

    _this.onGestureStart = function (e) {
      _this._tempScale = _this.zoom;

      _this._setClientRect();

      e.preventDefault();
    };

    _this.onGestureChange = function (e) {
      e.preventDefault();

      if (_this.gesto.isFlag() || !_this._tempScale) {
        _this._tempScale = 0;
        return;
      }

      var scale = e.scale;

      _this._triggerPinch({
        distance: 0,
        scale: scale,
        rotation: e.rotation,
        inputEvent: e,
        isWheel: true,
        zoom: _this._tempScale * scale,
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

    removeEvent(this.wrapperElement, "scroll", this.onScroll);
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
   * @param - Get absolute top position
   */


  __proto.getScrollTop = function (isAbsolute) {
    return this.scrollTop / this.zoom + this.offsetY + (isAbsolute ? abs(this.getRangeY()[0]) : 0);
  };
  /**
   * Gets the number of pixels that an element's content is scrolled vertically.
   * @param - Get absolute left position
   */


  __proto.getScrollLeft = function (isAbsolute) {
    return this.scrollLeft / this.zoom + this.offsetX + (isAbsolute ? abs(this.getRangeX()[0]) : 0);
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


  __proto.scrollCenter = function () {
    this.resize();
    var zoom = this.zoom;
    var left = -(this.containerWidth / zoom - this.viewportWidth) / 2;
    var top = -(this.containerHeight / zoom - this.viewportHeight) / 2;
    return this.scrollTo(left, top);
  };
  /**
   * Scrolls the container by the given amount.
   */


  __proto.scrollBy = function (deltaX, deltaY) {
    return this.scrollTo(this.getScrollLeft() + deltaX, this.getScrollTop() + deltaY);
  };
  /**
   * Scrolls the container to set of coordinates.
   * @param scrollLeft
   * @param scrollTop
   */


  __proto.scrollTo = function (x, y) {
    var _this = this;

    var _a = this,
        prevScrollLeft = _a.scrollLeft,
        prevScrollTop = _a.scrollTop;

    this._scrollTo("horizontal", x);

    this._scrollTo("vertical", y);

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
          _this.scrollTo(nextScrollAbsoluteLeft, nextScrollAbsoluteTop);
        }
      });
      return false;
    }

    return true;
  };
  /**
   * Set viewer zoom
   */


  __proto.setZoom = function (zoom, isSetter) {
    if (isSetter && this.useAutoZoom) {
      return;
    }

    var _a = this,
        containerWidth = _a.containerWidth,
        containerHeight = _a.containerHeight,
        prevZoom = _a.zoom,
        zoomRange = _a.zoomRange;

    var _b = this,
        _c = _b.zoomOffsetX,
        zoomOffsetX = _c === void 0 ? DEFAULT_OPTIONS.zoomOffsetX : _c,
        _d = _b.zoomOffsetY,
        zoomOffsetY = _d === void 0 ? DEFAULT_OPTIONS.zoomOffsetY : _d;

    var scrollLeft = this.getScrollLeft();
    var scrollTop = this.getScrollTop();
    var nextZoom = between(zoom, zoomRange[0], zoomRange[1]);
    this.options.zoom = nextZoom;
    var nextScrollLeft = this.getScrollLeft();
    var nextScrollTop = this.getScrollTop();
    var zoomX = convertUnitSize("".concat(zoomOffsetX), containerWidth);
    var zoomY = convertUnitSize("".concat(zoomOffsetY), containerHeight);
    var centerX = scrollLeft + zoomX / prevZoom;
    var centerY = scrollTop + zoomY / prevZoom;
    var nextCenterX = nextScrollLeft + zoomX / nextZoom;
    var nextCenterY = nextScrollTop + zoomY / nextZoom;
    this.scrollBy(centerX - nextCenterX, centerY - nextCenterY);
    this.render();
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
      _this.scrollBy(e.delta / _this.zoom, 0);
    });
    this.verticalScrollbar.on("scroll", function (e) {
      _this.scrollBy(0, e.delta / _this.zoom);
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

      _this.pauseAnimation();

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
      if (!_this.options.usePinch || e.isPinch) {
        _this.trigger("drag", __assign(__assign({}, e), {
          inputEvent: e.inputEvent
        }));

        measureSpeed(e);
        var zoom = _this.zoom;

        _this.scrollBy(-e.deltaX / zoom, -e.deltaY / zoom);
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

      _this.startAnimation(e.datas.speed);
    }).on("pinchStart", function (_a) {
      var inputEvent = _a.inputEvent,
          datas = _a.datas,
          stop = _a.stop;
      inputEvent.preventDefault();

      _this.pauseAnimation();

      datas.startZoom = _this.zoom;

      var result = _this.trigger("pinchStart", {
        inputEvent: inputEvent
      });

      if (result === false) {
        stop();
      }

      _this._setClientRect();
    }).on("pinch", function (e) {
      _this._triggerPinch({
        rotation: e.rotation,
        distance: e.distance,
        scale: e.scale,
        inputEvent: e.inputEvent,
        isWheel: false,
        zoom: e.datas.startZoom * e.scale,
        clientX: e.clientX,
        clientY: e.clientY,
        ratioX: 0,
        ratioY: 0
      });
    }).on("pinchEnd", function () {
      _this._tempRect = null;
    });
    addEvent(wrapperElement, "scroll", this.onScroll);

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
        _b = _a.zoom,
        zoom = _b === void 0 ? DEFAULT_OPTIONS.zoom : _b,
        _c = _a.translateZ,
        translateZ = _c === void 0 ? 0 : _c;

    var _d = this.options.useTransform,
        useTransform = _d === void 0 ? DEFAULT_OPTIONS.useTransform : _d;
    var nextOffsetX = -offsetX * zoom;
    var nextOffsetY = -offsetY * zoom;
    this.scrollAreaElement.style.cssText = "width:calc(100% + ".concat(this.getScrollAreaWidth(), "px);") + "height:calc(100% + ".concat(this.getScrollAreaHeight(), "px);");
    var viewportStyle = this.viewportElement.style;

    if (useTransform === false) {
      viewportStyle.cssText += "position: relative; top: ".concat(nextOffsetY, "px; left: ").concat(nextOffsetX, "px;");
    } else {
      viewportStyle.cssText += "transform-origin: 0 0;transform:translate3d(".concat(nextOffsetX, "px, ").concat(nextOffsetY, "px, ").concat(translateZ, "px) scale(").concat(zoom, ");");
    }

    this.renderScroll();
  };

  __proto.renderScroll = function () {
    var _a = this,
        containerWidth = _a.containerWidth,
        containerHeight = _a.containerHeight,
        zoom = _a.zoom;

    var scrollLeft = this.getScrollLeft(true) * zoom;
    var scrollTop = this.getScrollTop(true) * zoom;
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
        zoom = event.zoom;

    if (this.useAutoZoom) {
      this._zoomByClient(event.zoom, clientX, clientY);
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
      zoom: between(zoom, zoomRange[0], zoomRange[1]),
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
    this.setZoom(zoom);
    options.zoomOffsetX = originalZoomOffsetX;
    options.zoomOffsetY = originalZoomOffsetY;
  };

  __proto._scrollTo = function (type, coord) {
    var names = NAMES[type];

    var _a = this,
        _b = _a.zoom,
        zoom = _b === void 0 ? DEFAULT_OPTIONS.zoom : _b,
        _c = _a.margin,
        margin = _c === void 0 ? DEFAULT_OPTIONS.margin : _c,
        _d = _a.threshold,
        threshold = _d === void 0 ? DEFAULT_OPTIONS.threshold : _d;

    var prevScrollPos = this["scroll".concat(names.pos)];

    var _e = this["getRange".concat(names.coord)](true, true),
        minCoord = _e[0],
        maxCoord = _e[1];

    var scrollPos = Math.round(prevScrollPos);
    var scrollAreaSize = this["getScrollArea".concat(names.size)]();
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
    this["offset".concat(names.coord)] = Math.round(coord - scrollPos / zoom);
  };

  __proto._getRangeCoord = function (type, isZoom, isReal) {
    var _a = this,
        _b = _a.margin,
        margin = _b === void 0 ? DEFAULT_OPTIONS.margin : _b,
        _c = _a.zoom,
        zoom = _c === void 0 ? DEFAULT_OPTIONS.zoom : _c,
        threshold = _a.threshold;

    var names = NAMES[type];
    var rangeCoord = checkDefault(this["range".concat(names.coord)], DEFAULT_OPTIONS["range".concat(names.coord)]);
    var rangeOffsetCoord = checkDefault(this["rangeOffset".concat(names.coord)], DEFAULT_OPTIONS["rangeOffset".concat(names.coord)]);
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
        this[setter](value, true);
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
