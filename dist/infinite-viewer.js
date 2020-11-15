/*
Copyright (c) 2019 Daybrush
name: infinite-viewer
license: MIT
author: Daybrush
repository: git+https://github.com/daybrush/infinite-viewer.git
version: 0.10.1
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.InfiniteViewer = factory());
}(this, (function () { 'use strict';

    /*! *****************************************************************************
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
    function __spreadArrays() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

      for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

      return r;
    }

    /*
    Copyright (c) 2018 Daybrush
    @name: @daybrush/utils
    license: MIT
    author: Daybrush
    repository: https://github.com/daybrush/utils
    @version 1.3.1
    */
    /**
    * get string "object"
    * @memberof Consts
    * @example
    import {OBJECT} from "@daybrush/utils";

    console.log(OBJECT); // "object"
    */

    var OBJECT = "object";
    /**
    * Check the type that the value is object.
    * @memberof Utils
    * @param {string} value - Value to check the type
    * @return {} true if the type is correct, false otherwise
    * @example
    import {isObject} from "@daybrush/utils";

    console.log(isObject({})); // true
    console.log(isObject(undefined)); // false
    console.log(isObject("")); // false
    console.log(isObject(null)); // false
    */

    function isObject(value) {
      return value && typeof value === OBJECT;
    }
    /**
    * Returns the index of the first element in the array that satisfies the provided testing function.
    * @function
    * @memberof CrossBrowser
    * @param - The array `findIndex` was called upon.
    * @param - A function to execute on each value in the array until the function returns true, indicating that the satisfying element was found.
    * @param - Returns defaultIndex if not found by the function.
    * @example
    import { findIndex } from "@daybrush/utils";

    findIndex([{a: 1}, {a: 2}, {a: 3}, {a: 4}], ({ a }) => a === 2); // 1
    */

    function findIndex(arr, callback, defaultIndex) {
      if (defaultIndex === void 0) {
        defaultIndex = -1;
      }

      var length = arr.length;

      for (var i = 0; i < length; ++i) {
        if (callback(arr[i], i, arr)) {
          return i;
        }
      }

      return defaultIndex;
    }

    /*
    Copyright (c) 2019 Daybrush
    name: @scena/event-emitter
    license: MIT
    author: Daybrush
    repository: git+https://github.com/daybrush/gesture.git
    version: 1.0.4
    */

    /*! *****************************************************************************
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
    var __assign$1 = function () {
      __assign$1 = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];

          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }

        return t;
      };

      return __assign$1.apply(this, arguments);
    };
    function __spreadArrays$1() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

      for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

      return r;
    }

    /**
     * Implement EventEmitter on object or component.
     */

    var EventEmitter =
    /*#__PURE__*/
    function () {
      function EventEmitter() {
        this._events = {};
      }
      /**
       * Add a listener to the registered event.
       * @param - Name of the event to be added
       * @param - listener function of the event to be added
       * @example
       * import EventEmitter from "@scena/event-emitter";
       * cosnt emitter = new EventEmitter();
       *
       * // Add listener in "a" event
       * emitter.on("a", () => {
       * });
       * // Add listeners
       * emitter.on({
       *  a: () => {},
       *  b: () => {},
       * });
       */


      var __proto = EventEmitter.prototype;

      __proto.on = function (eventName, listener) {
        if (isObject(eventName)) {
          for (var name in eventName) {
            this.on(name, eventName[name]);
          }
        } else {
          this._addEvent(eventName, listener, {});
        }

        return this;
      };
      /**
       * Remove listeners registered in the event target.
       * @param - Name of the event to be removed
       * @param - listener function of the event to be removed
       * @example
       * import EventEmitter from "@scena/event-emitter";
       * cosnt emitter = new EventEmitter();
       *
       * // Remove all listeners.
       * emitter.off();
       *
       * // Remove all listeners in "A" event.
       * emitter.off("a");
       *
       *
       * // Remove "listener" listener in "a" event.
       * emitter.off("a", listener);
       */


      __proto.off = function (eventName, listener) {
        if (!eventName) {
          this._events = {};
        } else if (isObject(eventName)) {
          for (var name in eventName) {
            this.off(name);
          }
        } else if (!listener) {
          this._events[eventName] = [];
        } else {
          var events = this._events[eventName];

          if (events) {
            var index = findIndex(events, function (e) {
              return e.listener === listener;
            });

            if (index > -1) {
              events.splice(index, 1);
            }
          }
        }

        return this;
      };
      /**
       * Add a disposable listener and Use promise to the registered event.
       * @param - Name of the event to be added
       * @param - disposable listener function of the event to be added
       * @example
       * import EventEmitter from "@scena/event-emitter";
       * cosnt emitter = new EventEmitter();
       *
       * // Add a disposable listener in "a" event
       * emitter.once("a", () => {
       * });
       *
       * // Use Promise
       * emitter.once("a").then(e => {
       * });
       */


      __proto.once = function (eventName, listener) {
        var _this = this;

        if (listener) {
          this._addEvent(eventName, listener, {
            once: true
          });
        }

        return new Promise(function (resolve) {
          _this._addEvent(eventName, resolve, {
            once: true
          });
        });
      };
      /**
       * Fires an event to call listeners.
       * @param - Event name
       * @param - Event parameter
       * @return If false, stop the event.
       * @example
       *
       * import EventEmitter from "@scena/event-emitter";
       *
       *
       * const emitter = new EventEmitter();
       *
       * emitter.on("a", e => {
       * });
       *
       *
       * emitter.emit("a", {
       *   a: 1,
       * });
       */


      __proto.emit = function (eventName, param) {
        var _this = this;

        if (param === void 0) {
          param = {};
        }

        var events = this._events[eventName];

        if (!eventName || !events) {
          return true;
        }

        var isStop = false;
        param.eventType = eventName;

        param.stop = function () {
          isStop = true;
        };

        param.currentTarget = this;

        __spreadArrays$1(events).forEach(function (info) {
          info.listener(param);

          if (info.once) {
            _this.off(eventName, info.listener);
          }
        });

        return !isStop;
      };
      /**
       * Fires an event to call listeners.
       * @param - Event name
       * @param - Event parameter
       * @return If false, stop the event.
       * @example
       *
       * import EventEmitter from "@scena/event-emitter";
       *
       *
       * const emitter = new EventEmitter();
       *
       * emitter.on("a", e => {
       * });
       *
       *
       * emitter.emit("a", {
       *   a: 1,
       * });
       */

      /**
      * Fires an event to call listeners.
      * @param - Event name
      * @param - Event parameter
      * @return If false, stop the event.
      * @example
      *
      * import EventEmitter from "@scena/event-emitter";
      *
      *
      * const emitter = new EventEmitter();
      *
      * emitter.on("a", e => {
      * });
      *
      * // emit
      * emitter.trigger("a", {
      *   a: 1,
      * });
      */


      __proto.trigger = function (eventName, param) {
        if (param === void 0) {
          param = {};
        }

        return this.emit(eventName, param);
      };

      __proto._addEvent = function (eventName, listener, options) {
        var events = this._events;
        events[eventName] = events[eventName] || [];
        var listeners = events[eventName];
        listeners.push(__assign$1({
          listener: listener
        }, options));
      };

      return EventEmitter;
    }();

    /*
    Copyright (c) 2018 Daybrush
    @name: @daybrush/utils
    license: MIT
    author: Daybrush
    repository: https://github.com/daybrush/utils
    @version 1.3.1
    */
    /**
    * get string "function"
    * @memberof Consts
    * @example
    import {FUNCTION} from "@daybrush/utils";

    console.log(FUNCTION); // "function"
    */

    var FUNCTION = "function";
    /**
    * get string "object"
    * @memberof Consts
    * @example
    import {OBJECT} from "@daybrush/utils";

    console.log(OBJECT); // "object"
    */

    var OBJECT$1 = "object";
    var OPEN_CLOSED_CHARACTER = ["\"", "'", "\\\"", "\\'"];
    var DEFAULT_UNIT_PRESETS = {
      "cm": function (pos) {
        return pos * 96 / 2.54;
      },
      "mm": function (pos) {
        return pos * 96 / 254;
      },
      "in": function (pos) {
        return pos * 96;
      },
      "pt": function (pos) {
        return pos * 96 / 72;
      },
      "pc": function (pos) {
        return pos * 96 / 6;
      },
      "%": function (pos, size) {
        return pos * size / 100;
      },
      "vw": function (pos, size) {
        if (size === void 0) {
          size = window.innerWidth;
        }

        return pos / 100 * size;
      },
      "vh": function (pos, size) {
        if (size === void 0) {
          size = window.innerHeight;
        }

        return pos / 100 * size;
      },
      "vmax": function (pos, size) {
        if (size === void 0) {
          size = Math.max(window.innerWidth, window.innerHeight);
        }

        return pos / 100 * size;
      },
      "vmin": function (pos, size) {
        if (size === void 0) {
          size = Math.min(window.innerWidth, window.innerHeight);
        }

        return pos / 100 * size;
      }
    };
    /**
    * Check the type that the value is object.
    * @memberof Utils
    * @param {string} value - Value to check the type
    * @return {} true if the type is correct, false otherwise
    * @example
    import {isObject} from "@daybrush/utils";

    console.log(isObject({})); // true
    console.log(isObject(undefined)); // false
    console.log(isObject("")); // false
    console.log(isObject(null)); // false
    */

    function isObject$1(value) {
      return value && typeof value === OBJECT$1;
    }
    /**
    * Check the type that the value is function.
    * @memberof Utils
    * @param {string} value - Value to check the type
    * @return {} true if the type is correct, false otherwise
    * @example
    import {isFunction} from "@daybrush/utils";

    console.log(isFunction(function a() {})); // true
    console.log(isFunction(() => {})); // true
    console.log(isFunction("1234")); // false
    console.log(isFunction(1)); // false
    console.log(isFunction(null)); // false
    */

    function isFunction(value) {
      return typeof value === FUNCTION;
    }

    function findClosed(closedCharacter, texts, index, length) {
      for (var i = index; i < length; ++i) {
        var character = texts[i].trim();

        if (character === closedCharacter) {
          return i;
        }

        var nextIndex = i;

        if (character === "(") {
          nextIndex = findClosed(")", texts, i + 1, length);
        } else if (OPEN_CLOSED_CHARACTER.indexOf(character) > -1) {
          nextIndex = findClosed(character, texts, i + 1, length);
        }

        if (nextIndex === -1) {
          break;
        }

        i = nextIndex;
      }

      return -1;
    }

    function splitText(text, separator) {
      var regexText = "(\\s*" + (separator || ",") + "\\s*|\\(|\\)|\"|'|\\\\\"|\\\\'|\\s+)";
      var regex = new RegExp(regexText, "g");
      var texts = text.split(regex).filter(Boolean);
      var length = texts.length;
      var values = [];
      var tempValues = [];

      for (var i = 0; i < length; ++i) {
        var character = texts[i].trim();
        var nextIndex = i;

        if (character === "(") {
          nextIndex = findClosed(")", texts, i + 1, length);
        } else if (character === ")") {
          throw new Error("invalid format");
        } else if (OPEN_CLOSED_CHARACTER.indexOf(character) > -1) {
          nextIndex = findClosed(character, texts, i + 1, length);
        } else if (character === separator) {
          if (tempValues.length) {
            values.push(tempValues.join(""));
            tempValues = [];
          }

          continue;
        }

        if (nextIndex === -1) {
          nextIndex = length - 1;
        }

        tempValues.push(texts.slice(i, nextIndex + 1).join(""));
        i = nextIndex;
      }

      if (tempValues.length) {
        values.push(tempValues.join(""));
      }

      return values;
    }
    /**
    * divide text by comma.
    * @memberof Utils
    * @param {string} text - text to divide
    * @return {Array} divided texts
    * @example
    import {splitComma} from "@daybrush/utils";

    console.log(splitComma("a,b,c,d,e,f,g"));
    // ["a", "b", "c", "d", "e", "f", "g"]
    console.log(splitComma("'a,b',c,'d,e',f,g"));
    // ["'a,b'", "c", "'d,e'", "f", "g"]
    */

    function splitComma(text) {
      // divide comma(,)
      // "[^"]*"|'[^']*'
      return splitText(text, ",");
    }
    /**
    * divide text by number and unit.
    * @memberof Utils
    * @param {string} text - text to divide
    * @return {} divided texts
    * @example
    import {splitUnit} from "@daybrush/utils";

    console.log(splitUnit("10px"));
    // {prefix: "", value: 10, unit: "px"}
    console.log(splitUnit("-10px"));
    // {prefix: "", value: -10, unit: "px"}
    console.log(splitUnit("a10%"));
    // {prefix: "a", value: 10, unit: "%"}
    */

    function splitUnit(text) {
      var matches = /^([^\d|e|\-|\+]*)((?:\d|\.|-|e-|e\+)+)(\S*)$/g.exec(text);

      if (!matches) {
        return {
          prefix: "",
          unit: "",
          value: NaN
        };
      }

      var prefix = matches[1];
      var value = matches[2];
      var unit = matches[3];
      return {
        prefix: prefix,
        unit: unit,
        value: parseFloat(value)
      };
    }
    /**
    * transform strings to camel-case
    * @memberof Utils
    * @param {String} text - string
    * @return {String} camel-case string
    * @example
    import {camelize} from "@daybrush/utils";

    console.log(camelize("transform-origin")); // transformOrigin
    console.log(camelize("abcd_efg")); // abcdEfg
    console.log(camelize("abcd efg")); // abcdEfg
    */

    function camelize(str) {
      return str.replace(/[\s-_]([a-z])/g, function (all, letter) {
        return letter.toUpperCase();
      });
    }
    /**
    * Date.now() method
    * @memberof CrossBrowser
    * @return {number} milliseconds
    * @example
    import {now} from "@daybrush/utils";

    console.log(now()); // 12121324241(milliseconds)
    */

    function now() {
      return Date.now ? Date.now() : new Date().getTime();
    }
    /**
    * convert unit size to px size
    * @function
    * @memberof Utils
    */

    function convertUnitSize(pos, size) {
      var _a = splitUnit(pos),
          value = _a.value,
          unit = _a.unit;

      if (isObject$1(size)) {
        var sizeFunction = size[unit];

        if (sizeFunction) {
          if (isFunction(sizeFunction)) {
            return sizeFunction(value);
          } else if (DEFAULT_UNIT_PRESETS[unit]) {
            return DEFAULT_UNIT_PRESETS[unit](value, sizeFunction);
          }
        }
      } else if (unit === "%") {
        return value * size / 100;
      }

      if (DEFAULT_UNIT_PRESETS[unit]) {
        return DEFAULT_UNIT_PRESETS[unit](value);
      }

      return value;
    }
    /**
    * Add the specified class value. If these classe already exist in the element's class attribute they are ignored.
    * @memberof DOM
    * @param element - target
    * @param className - the class name to add
    * @example
    import {addClass} from "@daybrush/utils";

    addClass(element, "start");
    */

    function addClass(element, className) {
      if (element.classList) {
        element.classList.add(className);
      } else {
        element.className += " " + className;
      }
    }
    /**
    * Sets up a function that will be called whenever the specified event is delivered to the target
    * @memberof DOM
    * @param - event target
    * @param - A case-sensitive string representing the event type to listen for.
    * @param - The object which receives a notification (an object that implements the Event interface) when an event of the specified type occurs
    * @param - An options object that specifies characteristics about the event listener. The available options are:
    * @example
    import {addEvent} from "@daybrush/utils";

    addEvent(el, "click", e => {
      console.log(e);
    });
    */

    function addEvent(el, type, listener, options) {
      el.addEventListener(type, listener, options);
    }
    /**
    * removes from the EventTarget an event listener previously registered with EventTarget.addEventListener()
    * @memberof DOM
    * @param - event target
    * @param - A case-sensitive string representing the event type to listen for.
    * @param - The EventListener function of the event handler to remove from the event target.
    * @example
    import {addEvent, removeEvent} from "@daybrush/utils";
    const listener = e => {
      console.log(e);
    };
    addEvent(el, "click", listener);
    removeEvent(el, "click", listener);
    */

    function removeEvent(el, type, listener) {
      el.removeEventListener(type, listener);
    }

    /*
    Copyright (c) 2019 Daybrush
    name: gesto
    license: MIT
    author: Daybrush
    repository: git+https://github.com/daybrush/gesture.git
    version: 1.3.0
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
    var extendStatics$1 = function (d, b) {
      extendStatics$1 = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      };

      return extendStatics$1(d, b);
    };

    function __extends$1(d, b) {
      extendStatics$1(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign$2 = function () {
      __assign$2 = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];

          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }

        return t;
      };

      return __assign$2.apply(this, arguments);
    };

    function getRad(pos1, pos2) {
      var distX = pos2[0] - pos1[0];
      var distY = pos2[1] - pos1[1];
      var rad = Math.atan2(distY, distX);
      return rad >= 0 ? rad : rad + Math.PI * 2;
    }
    function getRotatiion(touches) {
      return getRad([touches[0].clientX, touches[0].clientY], [touches[1].clientX, touches[1].clientY]) / Math.PI * 180;
    }
    function isMultiTouch(e) {
      return e.touches && e.touches.length >= 2;
    }
    function getEventClients(e) {
      if (e.touches) {
        return getClients(e.touches);
      } else {
        return [getClient(e)];
      }
    }
    function getPosition(clients, prevClients, startClients) {
      var length = startClients.length;

      var _a = getAverageClient(clients, length),
          clientX = _a.clientX,
          clientY = _a.clientY,
          originalClientX = _a.originalClientX,
          originalClientY = _a.originalClientY;

      var _b = getAverageClient(prevClients, length),
          prevX = _b.clientX,
          prevY = _b.clientY;

      var _c = getAverageClient(startClients, length),
          startX = _c.clientX,
          startY = _c.clientY;

      var deltaX = clientX - prevX;
      var deltaY = clientY - prevY;
      var distX = clientX - startX;
      var distY = clientY - startY;
      return {
        clientX: originalClientX,
        clientY: originalClientY,
        deltaX: deltaX,
        deltaY: deltaY,
        distX: distX,
        distY: distY
      };
    }
    function getDist(clients) {
      return Math.sqrt(Math.pow(clients[0].clientX - clients[1].clientX, 2) + Math.pow(clients[0].clientY - clients[1].clientY, 2));
    }
    function getClients(touches) {
      var length = Math.min(touches.length, 2);
      var clients = [];

      for (var i = 0; i < length; ++i) {
        clients.push(getClient(touches[i]));
      }

      return clients;
    }
    function getClient(e) {
      return {
        clientX: e.clientX,
        clientY: e.clientY
      };
    }
    function getAverageClient(clients, length) {
      if (length === void 0) {
        length = clients.length;
      }

      var sumClient = {
        clientX: 0,
        clientY: 0,
        originalClientX: 0,
        originalClientY: 0
      };

      for (var i = 0; i < length; ++i) {
        var client = clients[i];
        sumClient.originalClientX += "originalClientX" in client ? client.originalClientX : client.clientX;
        sumClient.originalClientY += "originalClientY" in client ? client.originalClientY : client.clientY;
        sumClient.clientX += client.clientX;
        sumClient.clientY += client.clientY;
      }

      if (!length) {
        return sumClient;
      }

      return {
        clientX: sumClient.clientX / length,
        clientY: sumClient.clientY / length,
        originalClientX: sumClient.originalClientX / length,
        originalClientY: sumClient.originalClientY / length
      };
    }

    var ClientStore =
    /*#__PURE__*/
    function () {
      function ClientStore(clients) {
        this.prevClients = [];
        this.startClients = [];
        this.movement = 0;
        this.length = 0;
        this.startClients = clients;
        this.prevClients = clients;
        this.length = clients.length;
      }

      var __proto = ClientStore.prototype;

      __proto.addClients = function (clients) {
        if (clients === void 0) {
          clients = this.prevClients;
        }

        var position = this.getPosition(clients);
        var deltaX = position.deltaX,
            deltaY = position.deltaY;
        this.movement += Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        this.prevClients = clients;
        return position;
      };

      __proto.getAngle = function (clients) {
        if (clients === void 0) {
          clients = this.prevClients;
        }

        return getRotatiion(clients);
      };

      __proto.getRotation = function (clients) {
        if (clients === void 0) {
          clients = this.prevClients;
        }

        return getRotatiion(clients) - getRotatiion(this.startClients);
      };

      __proto.getPosition = function (clients) {
        return getPosition(clients || this.prevClients, this.prevClients, this.startClients);
      };

      __proto.getPositions = function (clients) {
        if (clients === void 0) {
          clients = this.prevClients;
        }

        var prevClients = this.prevClients;
        return this.startClients.map(function (startClient, i) {
          return getPosition([clients[i]], [prevClients[i]], [startClient]);
        });
      };

      __proto.getMovement = function (clients) {
        var movement = this.movement;

        if (!clients) {
          return movement;
        }

        var currentClient = getAverageClient(clients, this.length);
        var prevClient = getAverageClient(this.prevClients, this.length);
        var deltaX = currentClient.clientX - prevClient.clientX;
        var deltaY = currentClient.clientY - prevClient.clientY;
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY) + movement;
      };

      __proto.getDistance = function (clients) {
        if (clients === void 0) {
          clients = this.prevClients;
        }

        return getDist(clients);
      };

      __proto.getScale = function (clients) {
        if (clients === void 0) {
          clients = this.prevClients;
        }

        return getDist(clients) / getDist(this.startClients);
      };

      __proto.move = function (deltaX, deltaY) {
        this.startClients.forEach(function (client) {
          client.clientX -= deltaX;
          client.clientY -= deltaY;
        });
        this.prevClients.forEach(function (client) {
          client.clientX -= deltaX;
          client.clientY -= deltaY;
        });
      };

      return ClientStore;
    }();

    var INPUT_TAGNAMES = ["textarea", "input"];
    /**
     * You can set up drag, pinch events in any browser.
     */

    var Gesto =
    /*#__PURE__*/
    function (_super) {
      __extends$1(Gesto, _super);
      /**
       *
       */


      function Gesto(targets, options) {
        if (options === void 0) {
          options = {};
        }

        var _this = _super.call(this) || this;

        _this.options = {};
        _this.flag = false;
        _this.pinchFlag = false;
        _this.datas = {};
        _this.isDrag = false;
        _this.isPinch = false;
        _this.isMouse = false;
        _this.isTouch = false;
        _this.clientStores = [];
        _this.targets = [];
        _this.prevTime = 0;
        _this.doubleFlag = false;

        _this.onDragStart = function (e, isTrusted) {
          if (isTrusted === void 0) {
            isTrusted = true;
          }

          if (!_this.flag && e.cancelable === false) {
            return;
          }

          var _a = _this.options,
              container = _a.container,
              pinchOutside = _a.pinchOutside,
              preventRightClick = _a.preventRightClick,
              preventDefault = _a.preventDefault,
              checkInput = _a.checkInput;
          var isTouch = _this.isTouch;
          var isDragStart = !_this.flag;

          if (isDragStart) {
            var activeElement = document.activeElement;
            var target = e.target;
            var tagName = target.tagName.toLowerCase();
            var hasInput = INPUT_TAGNAMES.indexOf(tagName) > -1;
            var hasContentEditable = target.isContentEditable;

            if (hasInput || hasContentEditable) {
              if (checkInput || activeElement === target) {
                // force false or already focused.
                return false;
              }

              if (activeElement && hasContentEditable && activeElement.isContentEditable && activeElement.contains(target)) {
                return false;
              }
            } else if ((preventDefault || e.type === "touchstart") && activeElement) {
              var activeTagName = activeElement.tagName;

              if (activeElement.isContentEditable || INPUT_TAGNAMES.indexOf(activeTagName) > -1) {
                activeElement.blur();
              }
            }

            _this.clientStores = [new ClientStore(getEventClients(e))];
            _this.flag = true;
            _this.isDrag = false;
            _this.datas = {};

            if (preventRightClick && (e.which === 3 || e.button === 2)) {
              _this.initDrag();

              return false;
            }

            _this.doubleFlag = now() - _this.prevTime < 200;

            var result = _this.emit("dragStart", __assign$2({
              datas: _this.datas,
              inputEvent: e,
              isTrusted: isTrusted,
              isDouble: _this.doubleFlag
            }, _this.getCurrentStore().getPosition()));

            if (result === false) {
              _this.initDrag();
            }

            _this.flag && preventDefault && e.preventDefault();
          }

          if (!_this.flag) {
            return false;
          }

          var timer = 0;

          if (isDragStart && isTouch && pinchOutside) {
            timer = setTimeout(function () {
              addEvent(container, "touchstart", _this.onDragStart, {
                passive: false
              });
            });
          }

          if (!isDragStart && isTouch && pinchOutside) {
            removeEvent(container, "touchstart", _this.onDragStart);
          }

          if (_this.flag && isMultiTouch(e)) {
            clearTimeout(timer);

            if (isDragStart && e.touches.length !== e.changedTouches.length) {
              return;
            }

            if (!_this.pinchFlag) {
              _this.onPinchStart(e);
            }
          }
        };

        _this.onDrag = function (e, isScroll) {
          if (!_this.flag) {
            return;
          }

          var clients = getEventClients(e);

          var result = _this.moveClients(clients, e, false);

          if (_this.pinchFlag || result.deltaX || result.deltaY) {
            _this.emit("drag", __assign$2({}, result, {
              isScroll: !!isScroll,
              inputEvent: e
            }));
          }

          if (_this.pinchFlag) {
            _this.onPinch(e, clients);
          }

          _this.getCurrentStore().addClients(clients);
        };

        _this.onDragEnd = function (e) {
          if (!_this.flag) {
            return;
          }

          var _a = _this.options,
              pinchOutside = _a.pinchOutside,
              container = _a.container;

          if (_this.isTouch && pinchOutside) {
            removeEvent(container, "touchstart", _this.onDragStart);
          }

          _this.flag = false;

          var position = _this.getCurrentStore().getPosition();

          var currentTime = now();
          var isDouble = !_this.isDrag && _this.doubleFlag;
          _this.prevTime = _this.isDrag || isDouble ? 0 : currentTime;

          _this.emit("dragEnd", __assign$2({
            datas: _this.datas,
            isDouble: isDouble,
            isDrag: _this.isDrag,
            inputEvent: e
          }, position));

          if (_this.pinchFlag) {
            _this.onPinchEnd(e);
          }

          _this.clientStores = [];
        };

        _this.onBlur = function () {
          _this.onDragEnd();
        };

        var elements = [].concat(targets);
        _this.options = __assign$2({
          checkInput: false,
          container: elements.length > 1 ? window : elements[0],
          preventRightClick: true,
          preventDefault: true,
          checkWindowBlur: false,
          pinchThreshold: 0,
          events: ["touch", "mouse"]
        }, options);
        var _a = _this.options,
            container = _a.container,
            events = _a.events,
            checkWindowBlur = _a.checkWindowBlur;
        _this.isTouch = events.indexOf("touch") > -1;
        _this.isMouse = events.indexOf("mouse") > -1;
        _this.targets = elements;

        if (_this.isMouse) {
          elements.forEach(function (el) {
            addEvent(el, "mousedown", _this.onDragStart);
          });
          addEvent(container, "mousemove", _this.onDrag);
          addEvent(container, "mouseup", _this.onDragEnd);
          addEvent(container, "contextmenu", _this.onDragEnd);
        }

        if (checkWindowBlur) {
          addEvent(window, "blur", _this.onBlur);
        }

        if (_this.isTouch) {
          var passive_1 = {
            passive: false
          };
          elements.forEach(function (el) {
            addEvent(el, "touchstart", _this.onDragStart, passive_1);
          });
          addEvent(container, "touchmove", _this.onDrag, passive_1);
          addEvent(container, "touchend", _this.onDragEnd, passive_1);
          addEvent(container, "touchcancel", _this.onDragEnd, passive_1);
        }

        return _this;
      }
      /**
       * The total moved distance
       */


      var __proto = Gesto.prototype;

      __proto.getMovement = function (clients) {
        return this.getCurrentStore().getMovement(clients) + this.clientStores.slice(1).reduce(function (prev, cur) {
          return prev + cur.movement;
        }, 0);
      };
      /**
       * Whether to drag
       */


      __proto.isDragging = function () {
        return this.isDrag;
      };
      /**
       * Whether to start drag
       */


      __proto.isFlag = function () {
        return this.flag;
      };
      /**
       * Whether to start pinch
       */


      __proto.isPinchFlag = function () {
        return this.pinchFlag;
      };
      /**
      * Whether to start double click
      */


      __proto.isDoubleFlag = function () {
        return this.doubleFlag;
      };
      /**
       * Whether to pinch
       */


      __proto.isPinching = function () {
        return this.isPinch;
      };
      /**
       * If a scroll event occurs, it is corrected by the scroll distance.
       */


      __proto.scrollBy = function (deltaX, deltaY, e, isCallDrag) {
        if (isCallDrag === void 0) {
          isCallDrag = true;
        }

        if (!this.flag) {
          return;
        }

        this.clientStores[0].move(deltaX, deltaY);
        isCallDrag && this.onDrag(e, true);
      };
      /**
       * Create a virtual drag event.
       */


      __proto.move = function (_a, inputEvent) {
        var deltaX = _a[0],
            deltaY = _a[1];
        var store = this.getCurrentStore();
        var nextClients = store.prevClients;
        return this.moveClients(nextClients.map(function (_a) {
          var clientX = _a.clientX,
              clientY = _a.clientY;
          return {
            clientX: clientX + deltaX,
            clientY: clientY + deltaY,
            originalClientX: clientX,
            originalClientY: clientY
          };
        }), inputEvent, true);
      };
      /**
       * The dragStart event is triggered by an external event.
       */


      __proto.triggerDragStart = function (e) {
        this.onDragStart(e, false);
      };
      /**
       * Set the event data while dragging.
       */


      __proto.setEventDatas = function (datas) {
        var currentDatas = this.datas;

        for (var name in datas) {
          currentDatas[name] = datas[name];
        }

        return this;
      };
      /**
       * Set the event data while dragging.
       */


      __proto.getEventDatas = function () {
        return this.datas;
      };
      /**
       * Unset Gesto
       */


      __proto.unset = function () {
        var _this = this;

        var targets = this.targets;
        var container = this.options.container;
        this.off();
        removeEvent(window, "blur", this.onBlur);

        if (this.isMouse) {
          targets.forEach(function (target) {
            removeEvent(target, "mousedown", _this.onDragStart);
          });
          removeEvent(container, "mousemove", this.onDrag);
          removeEvent(container, "mouseup", this.onDragEnd);
          removeEvent(container, "contextmenu", this.onDragEnd);
        }

        if (this.isTouch) {
          targets.forEach(function (target) {
            removeEvent(target, "touchstart", _this.onDragStart);
          });
          removeEvent(container, "touchstart", this.onDragStart);
          removeEvent(container, "touchmove", this.onDrag);
          removeEvent(container, "touchend", this.onDragEnd);
          removeEvent(container, "touchcancel", this.onDragEnd);
        }
      };

      __proto.onPinchStart = function (e) {
        var pinchThreshold = this.options.pinchThreshold;

        if (this.isDrag && this.getMovement() > pinchThreshold) {
          return;
        }

        var store = new ClientStore(getEventClients(e));
        this.pinchFlag = true;
        this.clientStores.splice(0, 0, store);
        var result = this.emit("pinchStart", __assign$2({
          datas: this.datas,
          angle: store.getAngle(),
          touches: this.getCurrentStore().getPositions()
        }, store.getPosition(), {
          inputEvent: e
        }));

        if (result === false) {
          this.pinchFlag = false;
        }
      };

      __proto.onPinch = function (e, clients) {
        if (!this.flag || !this.pinchFlag || clients.length < 2) {
          return;
        }

        var store = this.getCurrentStore();
        this.isPinch = true;
        this.emit("pinch", __assign$2({
          datas: this.datas,
          movement: this.getMovement(clients),
          angle: store.getAngle(clients),
          rotation: store.getRotation(clients),
          touches: store.getPositions(clients),
          scale: store.getScale(clients),
          distance: store.getDistance(clients)
        }, store.getPosition(clients), {
          inputEvent: e
        }));
      };

      __proto.onPinchEnd = function (e) {
        if (!this.pinchFlag) {
          return;
        }

        var isPinch = this.isPinch;
        this.isPinch = false;
        this.pinchFlag = false;
        var store = this.getCurrentStore();
        this.emit("pinchEnd", __assign$2({
          datas: this.datas,
          isPinch: isPinch,
          touches: store.getPositions()
        }, store.getPosition(), {
          inputEvent: e
        }));
        this.isPinch = false;
        this.pinchFlag = false;
      };

      __proto.initDrag = function () {
        this.clientStores = [];
        this.pinchFlag = false;
        this.doubleFlag = false;
        this.prevTime = 0;
        this.flag = false;
      };

      __proto.getCurrentStore = function () {
        return this.clientStores[0];
      };

      __proto.moveClients = function (clients, inputEvent, isAdd) {
        var store = this.getCurrentStore();
        var position = store[isAdd ? "addClients" : "getPosition"](clients);
        this.isDrag = true;
        return __assign$2({
          datas: this.datas
        }, position, {
          movement: this.getMovement(clients),
          isDrag: this.isDrag,
          isPinch: this.isPinch,
          isScroll: false,
          inputEvent: inputEvent
        });
      };

      return Gesto;
    }(EventEmitter);

    /*
    Copyright (c) 2019 Daybrush
    name: framework-utils
    license: MIT
    author: Daybrush
    repository: git+https://github.com/daybrush/framework-utils.git
    version: 0.3.4
    */
    function prefixCSS(prefix, css) {
      return css.replace(/([^}{]*){/mg, function (_, selector) {
        return selector.replace(/\.([^{,\s\d.]+)/g, "." + prefix + "$1") + "{";
      });
    }
    /* Class Decorator */

    function Properties(properties, action) {
      return function (component) {
        var prototype = component.prototype;
        properties.forEach(function (property) {
          action(prototype, property);
        });
      };
    }

    /*
    Copyright (c) 2019 Daybrush
    name: css-styled
    license: MIT
    author: Daybrush
    repository: git+https://github.com/daybrush/css-styled.git
    version: 1.0.0
    */

    function hash(str) {
      var hash = 5381,
          i    = str.length;

      while(i) {
        hash = (hash * 33) ^ str.charCodeAt(--i);
      }

      /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
       * integers. Since we want the results to be always positive, convert the
       * signed int to an unsigned by doing an unsigned bitshift. */
      return hash >>> 0;
    }

    var stringHash = hash;

    function getHash(str) {
      return stringHash(str).toString(36);
    }
    function getShadowRoot(parentElement) {
      if (parentElement && parentElement.getRootNode) {
        var rootNode = parentElement.getRootNode();

        if (rootNode.nodeType === 11) {
          return rootNode;
        }
      }

      return;
    }
    function replaceStyle(className, css, options) {
      if (options.original) {
        return css;
      }

      return css.replace(/([^};{\s}][^};{]*|^\s*){/mg, function (_, selector) {
        var trimmedSelector = selector.trim();
        return (trimmedSelector ? splitComma(trimmedSelector) : [""]).map(function (subSelector) {
          var trimmedSubSelector = subSelector.trim();

          if (trimmedSubSelector.indexOf("@") === 0) {
            return trimmedSubSelector;
          } else if (trimmedSubSelector.indexOf(":global") > -1) {
            return trimmedSubSelector.replace(/\:global/g, "");
          } else if (trimmedSubSelector.indexOf(":host") > -1) {
            return "" + trimmedSubSelector.replace(/\:host/g, "." + className);
          } else if (trimmedSubSelector) {
            return "." + className + " " + trimmedSubSelector;
          } else {
            return "." + className;
          }
        }).join(", ") + " {";
      });
    }
    function injectStyle(className, css, options, shadowRoot) {
      var style = document.createElement("style");
      style.setAttribute("type", "text/css");
      style.setAttribute("data-styled-id", className);

      if (options.nonce) {
        style.setAttribute("nonce", options.nonce);
      }

      style.innerHTML = replaceStyle(className, css, options);
      (shadowRoot || document.head || document.body).appendChild(style);
      return style;
    }

    /**
     * Create an styled object that can be defined and inserted into the css.
     * @param - css styles
     */

    function styled(css) {
      var injectClassName = "rCS" + getHash(css);
      var injectCount = 0;
      var injectElement;
      return {
        className: injectClassName,
        inject: function (el, options) {
          if (options === void 0) {
            options = {};
          }

          var shadowRoot = getShadowRoot(el);
          var firstMount = injectCount === 0;
          var styleElement;

          if (shadowRoot || firstMount) {
            styleElement = injectStyle(injectClassName, css, options, shadowRoot);
          }

          if (firstMount) {
            injectElement = styleElement;
          }

          if (!shadowRoot) {
            ++injectCount;
          }

          return {
            destroy: function () {
              if (shadowRoot) {
                el.removeChild(styleElement);
                styleElement = null;
              } else {
                if (injectCount > 0) {
                  --injectCount;
                }

                if (injectCount === 0 && injectElement) {
                  injectElement.parentNode.removeChild(injectElement);
                  injectElement = null;
                }
              }
            }
          };
        }
      };
    }

    /*
    Copyright (c) 2015 NAVER Corp.
    name: @egjs/agent
    license: MIT
    author: NAVER Corp.
    repository: git+https://github.com/naver/agent.git
    version: 2.2.1
    */
    function some(arr, callback) {
      var length = arr.length;

      for (var i = 0; i < length; ++i) {
        if (callback(arr[i], i)) {
          return true;
        }
      }

      return false;
    }
    function find(arr, callback) {
      var length = arr.length;

      for (var i = 0; i < length; ++i) {
        if (callback(arr[i], i)) {
          return arr[i];
        }
      }

      return null;
    }
    function getUserAgent(agent) {
      var userAgent = agent;

      if (typeof userAgent === "undefined") {
        if (typeof navigator === "undefined" || !navigator) {
          return "";
        }

        userAgent = navigator.userAgent || "";
      }

      return userAgent.toLowerCase();
    }
    function execRegExp(pattern, text) {
      try {
        return new RegExp(pattern, "g").exec(text);
      } catch (e) {
        return null;
      }
    }
    function hasUserAgentData() {
      if (typeof navigator === "undefined" || !navigator || !navigator.userAgentData) {
        return false;
      }

      var userAgentData = navigator.userAgentData;
      var brands = userAgentData.brands || userAgentData.uaList;
      return !!(brands && brands.length);
    }
    function findVersion(versionTest, userAgent) {
      var result = execRegExp("(" + versionTest + ")((?:\\/|\\s|:)([0-9|\\.|_]+))?", userAgent);
      return result ? result[3] : "";
    }
    function convertVersion(text) {
      return text.replace(/_/g, ".");
    }
    function findPreset(presets, userAgent) {
      var userPreset = null;
      var version = "-1";
      some(presets, function (preset) {
        var result = execRegExp("(" + preset.test + ")((?:\\/|\\s|:)([0-9|\\.|_]+))?", userAgent);

        if (!result || preset.brand) {
          return false;
        }

        userPreset = preset;
        version = result[3] || "-1";

        if (preset.versionAlias) {
          version = preset.versionAlias;
        } else if (preset.versionTest) {
          version = findVersion(preset.versionTest.toLowerCase(), userAgent) || version;
        }

        version = convertVersion(version);
        return true;
      });
      return {
        preset: userPreset,
        version: version
      };
    }
    function findBrand(brands, preset) {
      return find(brands, function (_a) {
        var brand = _a.brand;
        return execRegExp("" + preset.test, brand.toLowerCase());
      });
    }

    var BROWSER_PRESETS = [{
      test: "phantomjs",
      id: "phantomjs"
    }, {
      test: "whale",
      id: "whale"
    }, {
      test: "edgios|edge|edg",
      id: "edge"
    }, {
      test: "msie|trident|windows phone",
      id: "ie",
      versionTest: "iemobile|msie|rv"
    }, {
      test: "miuibrowser",
      id: "miui browser"
    }, {
      test: "samsungbrowser",
      id: "samsung internet"
    }, {
      test: "samsung",
      id: "samsung internet",
      versionTest: "version"
    }, {
      test: "chrome|crios",
      id: "chrome"
    }, {
      test: "firefox|fxios",
      id: "firefox"
    }, {
      test: "android",
      id: "android browser",
      versionTest: "version"
    }, {
      test: "safari|iphone|ipad|ipod",
      id: "safari",
      versionTest: "version"
    }]; // chromium's engine(blink) is based on applewebkit 537.36.

    var CHROMIUM_PRESETS = [{
      test: "(?=.*applewebkit/(53[0-7]|5[0-2]|[0-4]))(?=.*\\schrome)",
      id: "chrome"
    }, {
      test: "chromium",
      id: "chrome"
    }, {
      test: "whale",
      id: "chrome",
      brand: true
    }];
    var WEBKIT_PRESETS = [{
      test: "applewebkit",
      id: "webkit"
    }];
    var WEBVIEW_PRESETS = [{
      test: "(?=(iphone|ipad))(?!(.*version))",
      id: "webview"
    }, {
      test: "(?=(android|iphone|ipad))(?=.*(naver|daum|; wv))",
      id: "webview"
    }, {
      // test webview
      test: "webview",
      id: "webview"
    }];
    var OS_PRESETS = [{
      test: "windows phone",
      id: "windows phone"
    }, {
      test: "windows 2000",
      id: "window",
      versionAlias: "5.0"
    }, {
      test: "windows nt",
      id: "window"
    }, {
      test: "iphone|ipad|ipod",
      id: "ios",
      versionTest: "iphone os|cpu os"
    }, {
      test: "mac os x",
      id: "mac"
    }, {
      test: "android",
      id: "android"
    }, {
      test: "tizen",
      id: "tizen"
    }, {
      test: "webos|web0s",
      id: "webos"
    }];

    function parseUserAgentData(osData) {
      var userAgentData = navigator.userAgentData;
      var brands = (userAgentData.uaList || userAgentData.brands).slice();
      var isMobile = userAgentData.mobile || false;
      var firstBrand = brands[0];
      var browser = {
        name: firstBrand.brand,
        version: firstBrand.version,
        majorVersion: -1,
        webkit: false,
        webview: some(WEBVIEW_PRESETS, function (preset) {
          return findBrand(brands, preset);
        }),
        chromium: some(CHROMIUM_PRESETS, function (preset) {
          return findBrand(brands, preset);
        })
      };
      var os = {
        name: "unknown",
        version: "-1",
        majorVersion: -1
      };
      browser.webkit = !browser.chromium && some(WEBKIT_PRESETS, function (preset) {
        return findBrand(brands, preset);
      });

      if (osData) {
        var platform_1 = osData.platform.toLowerCase();
        var result = find(OS_PRESETS, function (preset) {
          return new RegExp("" + preset.test, "g").exec(platform_1);
        });
        os.name = result ? result.id : platform_1;
        os.version = osData.platformVersion;
      }

      some(BROWSER_PRESETS, function (preset) {
        var result = findBrand(brands, preset);

        if (!result) {
          return false;
        }

        browser.name = preset.id;
        browser.version = osData ? osData.uaFullVersion : result.version;
        return true;
      });

      if (navigator.platform === "Linux armv8l") {
        os.name = "android";
      } else if (browser.webkit) {
        os.name = isMobile ? "ios" : "mac";
      }

      if (os.name === "ios" && browser.webview) {
        browser.version = "-1";
      }

      os.version = convertVersion(os.version);
      browser.version = convertVersion(browser.version);
      os.majorVersion = parseInt(os.version, 10);
      browser.majorVersion = parseInt(browser.version, 10);
      return {
        browser: browser,
        os: os,
        isMobile: isMobile,
        isHints: true
      };
    }

    function parseUserAgent(userAgent) {
      var nextAgent = getUserAgent(userAgent);
      var isMobile = !!/mobi/g.exec(nextAgent);
      var browser = {
        name: "unknown",
        version: "-1",
        majorVersion: -1,
        webview: !!findPreset(WEBVIEW_PRESETS, nextAgent).preset,
        chromium: !!findPreset(CHROMIUM_PRESETS, nextAgent).preset,
        webkit: false
      };
      var os = {
        name: "unknown",
        version: "-1",
        majorVersion: -1
      };

      var _a = findPreset(BROWSER_PRESETS, nextAgent),
          browserPreset = _a.preset,
          browserVersion = _a.version;

      var _b = findPreset(OS_PRESETS, nextAgent),
          osPreset = _b.preset,
          osVersion = _b.version;

      browser.webkit = !browser.chromium && !!findPreset(WEBKIT_PRESETS, nextAgent).preset;

      if (osPreset) {
        os.name = osPreset.id;
        os.version = osVersion;
        os.majorVersion = parseInt(osVersion, 10);
      }

      if (browserPreset) {
        browser.name = browserPreset.id;
        browser.version = browserVersion;

        if (browser.webview && os.name === "ios" && browser.name !== "safari") {
          browser.webview = false;
        }
      }

      browser.majorVersion = parseInt(browser.version, 10);
      return {
        browser: browser,
        os: os,
        isMobile: isMobile,
        isHints: false
      };
    }
    /**
     * Extracts browser and operating system information from the user agent string.
     * @ko 유저 에이전트 문자열에서 브라우저와 운영체제 정보를 추출한다.
     * @function eg.agent#agent
     * @param - user agent string to parse <ko>파싱할 유저에이전트 문자열</ko>
     * @return - agent Info <ko> 에이전트 정보 </ko>
     * @example
    import agent from "@egjs/agent";
    // eg.agent();
    const { os, browser, isMobile } = agent();
     */

    function agent(userAgent) {
      if (typeof userAgent === "undefined" && hasUserAgentData()) {
        return parseUserAgentData();
      } else {
        return parseUserAgent(userAgent);
      }
    }

    var agent$1 = agent();
    var IS_SAFARI = agent$1.browser.name === "safari";
    var PREFIX = "infinite-viewer-";
    var WRAPPER_CLASS_NAME = PREFIX + "wrapper";
    var SCROLL_AREA_CLASS_NAME = PREFIX + "scroll-area";
    var SCROLL_BAR_CLASS_NAME = PREFIX + "scroll-bar";
    var HORIZONTAL_SCROLL_BAR_CLASS_NAME = PREFIX + "horizontal-scroll-bar";
    var VERTICAL_SCROLL_BAR_CLASS_NAME = PREFIX + "vertical-scroll-bar";
    var SCROLL_THUMB_CLASS_NAME = PREFIX + "scroll-thumb";
    var injector = styled(prefixCSS(PREFIX, "\n{\n    position: relative;\n    overscroll-behavior: none;\n}\n.wrapper {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    overflow: auto;\n    top: 0;\n    left: 0;\n    will-change: scroll-position;\n}\n.wrapper::-webkit-scrollbar {\n    display: none;\n}\n.scroll-area {\n    position:absolute;\n    top:0;\n    left:0;\n    transform-origin: 0 0;\n}\n.scroll-bar {\n    position:absolute;\n    width: 10px;\n    height: 10px;\n    box-sizing: border-box;\n    right: 0;\n    bottom: 0;\n    overflow: hidden;\n}\n.horizontal-scroll-bar {\n    width: 100%;\n    height: 14px;\n}\n.vertical-scroll-bar {\n    height: 100%;\n    width: 14px;\n}\n.scroll-thumb {\n    position:relative;\n    opacity: 0.7;\n    background: #333;\n    border-radius: 3px;\n    left: 0px;\n    top: 0px;\n    z-index: 10;\n    width: 6px;\n    height: 6px;\n    transition: all ease 0.2s;\n}\n.horizontal-scroll-bar .scroll-thumb {\n    margin: 4px 0px;\n    transition-property: margin, height, border-radius;\n}\n.vertical-scroll-bar .scroll-thumb {\n    margin: 0px 4px;\n    transition-property: margin, width, border-radius;\n}\n.horizontal-scroll-bar:hover .scroll-thumb {\n    height: 10px;\n    margin: 2px 0px;\n    border-radius: 5px;\n}\n.vertical-scroll-bar:hover .scroll-thumb {\n    width: 10px;\n    margin: 0px 2px;\n    border-radius: 5px;\n}\n"));
    var DEFAULT_OPTIONS = {
      margin: 500,
      threshold: 100,
      zoom: 1,
      rangeX: [-Infinity, Infinity],
      rangeY: [-Infinity, Infinity],
      wrapperElement: null,
      scrollAreaElement: null,
      horizontalScrollElement: null,
      verticalScrollElement: null,
      usePinch: false,
      pinchThreshold: 30,
      cspNonce: "",
      wheelScale: 0.01,
      displayHorizontalScroll: true,
      displayVerticalScroll: true,
      useForceWheel: false,
      zoomOffsetX: "50%",
      zoomOffsetY: "50%"
    };
    /**
     * @memberof InfiniteViewer
     */

    var CLASS_NAME = injector.className;
    /**
     * @memberof InfiniteViewer
     */

    var PROPERTIES = ["margin", "threshold", "zoomOffsetX", "zoomOffsetY", "zoom", "rangeX", "rangeY", "usePinch", "pinchThreshold", "wheelScale", "displayVerticalScroll", "displayHorizontalScroll", "useForceWheel"];
    /**
     * @memberof InfiniteViewer
     */

    var OPTIONS = __spreadArrays(PROPERTIES, ["cspNonce", "wrapperElement", "scrollAreaElement", "verticalScrollElement", "horizontalScrollElement"]);
    var OPTION_TYPES = {
      margin: Number,
      threshold: Number,
      zoomOffsetX: String,
      zoomOffsetY: String,
      zoom: Number,
      wrapperElement: Object,
      scrollAreaElement: Object,
      verticalScrollElement: Object,
      horizontalScrollElement: Object,
      rangeX: Array,
      rangeY: Array,
      pinchThreshold: Number,
      usePinch: Boolean,
      useForceWheel: Boolean,
      cspNonce: String,
      wheelScale: Number,
      displayHorizontalScroll: Boolean,
      displayVerticalScroll: Boolean
    };
    /**
     * @memberof InfiniteViewer
     */

    var EVENTS = ["scroll", "abortPinch", "dragStart", "dragEnd", "pinchStart", "pinch"];
    /**
     * @memberof InfiniteViewer
     */

    var METHODS = ["getScrollLeft", "getScrollTop", "getScrollWidth", "getScrollHeight", "scrollTo", "scrollBy", "scrollCenter", "getContainer", "getViewport", "getWrapper", "setZoom", "getRangeX", "getRangeY"];
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

    var ScrollBar =
    /*#__PURE__*/
    function (_super) {
      __extends(ScrollBar, _super);

      function ScrollBar(type, barElement) {
        var _this = _super.call(this) || this;

        _this.type = type;
        _this.barElement = barElement;
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
        _this.isHorizontal = isHorizontal;

        if (!barElement) {
          barElement = document.createElement("div");
          var thumbElement = document.createElement("div");
          addClass(barElement, isHorizontal ? HORIZONTAL_SCROLL_BAR_CLASS_NAME : VERTICAL_SCROLL_BAR_CLASS_NAME);
          addClass(barElement, SCROLL_BAR_CLASS_NAME);
          addClass(thumbElement, SCROLL_THUMB_CLASS_NAME);
          barElement.insertBefore(thumbElement, null);
          _this.barElement = barElement;
          _this.thumbElement = thumbElement;
          _this.isAppend = true;
        } else {
          _this.thumbElement = barElement.querySelector("." + SCROLL_THUMB_CLASS_NAME);
        }

        _this.gesto = new Gesto(_this.barElement, {
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

        this.barElement.style.cssText = "display: " + display + ";";
        this.thumbElement.style.cssText += sizeName + ": " + size * size / scrollSize + "px;" + ("transform: translate" + dirName1 + "(" + pos / scrollSize * size + "px)");
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
        _this.tempScale = 1;
        _this.dragFlag = false;
        _this.isLoop = false;
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

          if (e.ctrlKey) {
            var distance = -e.deltaY;
            var scale = Math.max(1 + distance * (options.wheelScale || 0.01), TINY_NUM);

            _this.trigger("pinch", {
              distance: distance,
              scale: scale,
              rotation: 0,
              zoom: _this.zoom * scale,
              inputEvent: e
            });
          } else if (IS_SAFARI || options.useForceWheel) {
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
          _this.tempScale = _this.zoom;
          e.preventDefault();
        };

        _this.onGestureChange = function (e) {
          e.preventDefault();

          if (_this.gesto.isFlag() || !_this.tempScale) {
            _this.tempScale = 0;
            return;
          }

          var scale = e.scale;

          _this.trigger("pinch", {
            distance: 0,
            scale: scale,
            rotation: e.rotation,
            zoom: _this.tempScale * scale,
            inputEvent: e
          });
        };

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
       * Destroy elements, properties, and events.
       */


      __proto.destroy = function () {
        this.off();
        this.gesto.unset();
        this.verticalScrollbar.destroy();
        this.horizontalScrollbar.destroy();
        this.injectResult.destroy();
        var containerElement = this.containerElement;
        removeEvent(window, "resize", this.resize);
        removeEvent(this.wrapperElement, "scroll", this.onScroll);
        removeEvent(containerElement, "wheel", this.onWheel);
        removeEvent(containerElement, "tgesturestart", this.onGestureStart);
        removeEvent(containerElement, "gesturechange", this.onGestureChange);
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
            _b = _a.zoom,
            zoom = _b === void 0 ? DEFAULT_OPTIONS.zoom : _b,
            _c = _a.margin,
            margin = _c === void 0 ? DEFAULT_OPTIONS.margin : _c,
            _d = _a.threshold,
            threshold = _d === void 0 ? DEFAULT_OPTIONS.threshold : _d,
            prevScrollLeft = _a.scrollLeft,
            prevScrollTop = _a.scrollTop;

        var _e = this.getRangeX(true, true),
            minX = _e[0],
            maxX = _e[1];

        var _f = this.getRangeY(true, true),
            minY = _f[0],
            maxY = _f[1];

        var scrollLeft = prevScrollLeft;
        var scrollTop = prevScrollTop;
        var scrollAreaWidth = this.getScrollAreaWidth();
        var scrollAreaHeight = this.getScrollAreaHeight();
        var zoomX = x * zoom;
        var zoomY = y * zoom;

        if (zoomX - threshold <= minX) {
          var minThreshold = Math.max(0, zoomX - minX);
          scrollLeft = minThreshold;
          x = (minX + minThreshold) / zoom;
        } else if (zoomX + threshold >= maxX) {
          var maxThreshold = Math.max(0, maxX - zoomX);
          scrollLeft = scrollAreaWidth - maxThreshold;
          x = (maxX - maxThreshold) / zoom;
        } else if (scrollLeft < threshold) {
          scrollLeft += margin;
        } else if (scrollLeft > scrollAreaWidth - threshold) {
          scrollLeft -= margin;
        }

        if (zoomY - threshold <= minY) {
          var minThreshold = Math.max(0, zoomY - minY);
          scrollTop = minThreshold;
          y = (minY + minThreshold) / zoom;
        } else if (zoomY + threshold >= maxY) {
          var maxThreshold = Math.max(0, maxY - zoomY);
          scrollTop = scrollAreaHeight - maxThreshold;
          y = (maxY - maxThreshold) / zoom;
        } else if (scrollTop < threshold) {
          scrollTop += margin;
        } else if (scrollTop > scrollAreaHeight - threshold) {
          scrollTop -= margin;
        }

        scrollLeft = Math.round(scrollLeft);
        scrollTop = Math.round(scrollTop);
        this.scrollLeft = scrollLeft;
        this.scrollTop = scrollTop;
        this.offsetX = x - scrollLeft / zoom;
        this.offsetY = y - scrollTop / zoom;
        this.render();
        var nextX = this.getScrollLeft();
        var nextY = this.getScrollTop();
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
          scrollLeft: nextX,
          scrollTop: nextY
        });

        if (prevScrollLeft !== scrollLeft || prevScrollTop !== scrollTop) {
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

            if (scrollLeft !== requestScrollLeft || scrollTop !== requestScrollTop) {
              _this.scrollTo(nextX, nextY);
            }
          });
          return false;
        }

        return true;
      };
      /**
       * Set viewer zoom
       */


      __proto.setZoom = function (zoom) {
        var _a = this,
            containerWidth = _a.containerWidth,
            containerHeight = _a.containerHeight,
            _b = _a.zoomOffsetX,
            zoomOffsetX = _b === void 0 ? DEFAULT_OPTIONS.zoomOffsetX : _b,
            _c = _a.zoomOffsetY,
            zoomOffsetY = _c === void 0 ? DEFAULT_OPTIONS.zoomOffsetY : _c,
            prevZoom = _a.zoom;

        var scrollLeft = this.getScrollLeft();
        var scrollTop = this.getScrollTop();
        this.options.zoom = zoom;
        var nextScrollLeft = this.getScrollLeft();
        var nextScrollTop = this.getScrollTop();
        var zoomX = convertUnitSize("" + zoomOffsetX, containerWidth);
        var zoomY = convertUnitSize("" + zoomOffsetY, containerHeight);
        var centerX = scrollLeft + zoomX / prevZoom;
        var centerY = scrollTop + zoomY / prevZoom;
        var nextCenterX = nextScrollLeft + zoomX / zoom;
        var nextCenterY = nextScrollTop + zoomY / zoom;
        this.scrollBy(centerX - nextCenterX, centerY - nextCenterY);
        this.render();
      };
      /**
       * get x ranges
       */


      __proto.getRangeX = function (isZoom, isReal) {
        var _a = this,
            _b = _a.rangeX,
            rangeX = _b === void 0 ? DEFAULT_OPTIONS.rangeX : _b,
            _c = _a.margin,
            margin = _c === void 0 ? DEFAULT_OPTIONS.margin : _c,
            _d = _a.zoom,
            zoom = _d === void 0 ? DEFAULT_OPTIONS.zoom : _d,
            threshold = _a.threshold;

        var range = getRange(this.getScrollLeft(), margin, rangeX, threshold, isReal);

        if (!isZoom) {
          return range;
        }

        return [range[0] * zoom, Math.max(this.viewportWidth * zoom - this.containerWidth, range[1] * zoom)];
      };
      /**
       * get y ranges
       */


      __proto.getRangeY = function (isZoom, isReal) {
        var _a = this,
            _b = _a.rangeY,
            rangeY = _b === void 0 ? DEFAULT_OPTIONS.rangeY : _b,
            _c = _a.margin,
            margin = _c === void 0 ? DEFAULT_OPTIONS.margin : _c,
            _d = _a.zoom,
            zoom = _d === void 0 ? DEFAULT_OPTIONS.zoom : _d,
            threshold = _a.threshold;

        var range = getRange(this.getScrollTop(), margin, rangeY, threshold, isReal);

        if (!isZoom) {
          return range;
        }

        return [range[0] * zoom, Math.max(this.viewportHeight * zoom - this.containerHeight, range[1] * zoom)];
      };

      __proto.init = function () {
        var _this = this; // infinite-viewer(container)
        // viewport
        // children


        var containerElement = this.containerElement;
        var options = this.options;
        addClass(containerElement, CLASS_NAME); // vanilla

        var wrapperElement = options.wrapperElement || containerElement.querySelector("." + WRAPPER_CLASS_NAME);
        var scrollAreaElement = options.scrollAreaElement || containerElement.querySelector("." + SCROLL_AREA_CLASS_NAME);
        var horizontalScrollElement = options.horizontalScrollElement || containerElement.querySelector("." + HORIZONTAL_SCROLL_BAR_CLASS_NAME);
        var verticalScrollElement = options.verticalScrollElement || containerElement.querySelector("." + VERTICAL_SCROLL_BAR_CLASS_NAME);

        if (wrapperElement) {
          this.wrapperElement = wrapperElement;
        } else {
          wrapperElement = document.createElement("div");
          addClass(wrapperElement, WRAPPER_CLASS_NAME);
          wrapperElement.insertBefore(this.viewportElement, null);
          containerElement.insertBefore(wrapperElement, null);
          this.wrapperElement = wrapperElement;
        }

        if (scrollAreaElement) {
          this.scrollAreaElement = scrollAreaElement;
        } else {
          scrollAreaElement = document.createElement("div");
          addClass(scrollAreaElement, SCROLL_AREA_CLASS_NAME);
          wrapperElement.insertBefore(scrollAreaElement, wrapperElement.firstChild);
          this.scrollAreaElement = scrollAreaElement;
        }

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

        addClass(containerElement, CLASS_NAME);
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
          events: ["touch"]
        }).on("dragStart", function (_a) {
          var inputEvent = _a.inputEvent,
              datas = _a.datas,
              stop = _a.stop;

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
            _this.trigger("drag", {
              inputEvent: e.inputEvent
            });

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
        }).on("pinch", function (e) {
          // e.distance;
          // e.scale
          _this.trigger("pinch", {
            rotation: e.rotation,
            distance: e.distance,
            scale: e.scale,
            zoom: e.datas.startZoom * e.scale,
            inputEvent: e.inputEvent
          });
        });
        addEvent(wrapperElement, "scroll", this.onScroll);
        addEvent(window, "resize", this.resize);
        addEvent(containerElement, "wheel", this.onWheel, {
          passive: false
        });
        addEvent(containerElement, "gesturestart", this.onGestureStart, {
          passive: false
        });
        addEvent(containerElement, "gesturechange", this.onGestureChange, {
          passive: false
        });
        this.resize();
        this.render();
        this.scrollTo(0, 0);
      };

      __proto.render = function () {
        var _a = this,
            offsetX = _a.offsetX,
            offsetY = _a.offsetY,
            _b = _a.zoom,
            zoom = _b === void 0 ? DEFAULT_OPTIONS.zoom : _b;

        var nextOffsetX = -offsetX * zoom;
        var nextOffsetY = -offsetY * zoom;
        this.scrollAreaElement.style.cssText = "width:calc(100% + " + this.getScrollAreaWidth() + "px);" + ("height:calc(100% + " + this.getScrollAreaHeight() + "px);");
        this.viewportElement.style.cssText += "transform-origin: 0 0;transform:translate(" + nextOffsetX + "px, " + nextOffsetY + "px) scale(" + zoom + ");";
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

      InfiniteViewer = __decorate([Properties(PROPERTIES, function (prototype, property) {
        var attributes = {
          enumerable: true,
          configurable: true,
          get: function () {
            return this.options[property];
          }
        };
        var setter = camelize("set " + property);

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



    var modules = {
        __proto__: null,
        'default': InfiniteViewer$1,
        OPTIONS: OPTIONS,
        OPTION_TYPES: OPTION_TYPES,
        PROPERTIES: PROPERTIES,
        EVENTS: EVENTS,
        METHODS: METHODS,
        CLASS_NAME: CLASS_NAME
    };

    for (var name in modules) {
      InfiniteViewer$1[name] = modules[name];
    }

    return InfiniteViewer$1;

})));
//# sourceMappingURL=infinite-viewer.js.map
