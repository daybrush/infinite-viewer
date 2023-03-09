/*
Copyright (c) Daybrush
name: infinite-viewer
license: MIT
author: Daybrush
repository: git+https://github.com/daybrush/infinite-viewer.git
version: 0.21.1
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.InfiniteViewer = factory());
}(this, (function () { 'use strict';

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

    /*
    Copyright (c) 2018 Daybrush
    @name: @daybrush/utils
    license: MIT
    author: Daybrush
    repository: https://github.com/daybrush/utils
    @version 1.10.0
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

    var OBJECT = "object";
    /**
    * get string "string"
    * @memberof Consts
    * @example
    import {STRING} from "@daybrush/utils";

    console.log(STRING); // "string"
    */

    var STRING = "string";
    var OPEN_CLOSED_CHARACTERS = [{
      open: "(",
      close: ")"
    }, {
      open: "\"",
      close: "\""
    }, {
      open: "'",
      close: "'"
    }, {
      open: "\\\"",
      close: "\\\""
    }, {
      open: "\\'",
      close: "\\'"
    }];
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
    function __spreadArrays() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

      for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

      return r;
    }
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
    * Check the type that the value is isArray.
    * @memberof Utils
    * @param {string} value - Value to check the type
    * @return {} true if the type is correct, false otherwise
    * @example
    import {isArray} from "@daybrush/utils";

    console.log(isArray([])); // true
    console.log(isArray({})); // false
    console.log(isArray(undefined)); // false
    console.log(isArray(null)); // false
    */

    function isArray(value) {
      return Array.isArray(value);
    }
    /**
    * Check the type that the value is string.
    * @memberof Utils
    * @param {string} value - Value to check the type
    * @return {} true if the type is correct, false otherwise
    * @example
    import {isString} from "@daybrush/utils";

    console.log(isString("1234")); // true
    console.log(isString(undefined)); // false
    console.log(isString(1)); // false
    console.log(isString(null)); // false
    */

    function isString(value) {
      return typeof value === STRING;
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

    function isEqualSeparator(character, separator) {
      var isCharacterSpace = character === "" || character == " ";
      var isSeparatorSpace = separator === "" || separator == " ";
      return isSeparatorSpace && isCharacterSpace || character === separator;
    }

    function findOpen(openCharacter, texts, index, length, openCloseCharacters) {
      var isIgnore = findIgnore(openCharacter, texts, index);

      if (!isIgnore) {
        return findClose(openCharacter, texts, index + 1, length, openCloseCharacters);
      }

      return index;
    }

    function findIgnore(character, texts, index) {
      if (!character.ignore) {
        return null;
      }

      var otherText = texts.slice(Math.max(index - 3, 0), index + 3).join("");
      return new RegExp(character.ignore).exec(otherText);
    }

    function findClose(closeCharacter, texts, index, length, openCloseCharacters) {
      var _loop_1 = function (i) {
        var character = texts[i].trim();

        if (character === closeCharacter.close && !findIgnore(closeCharacter, texts, i)) {
          return {
            value: i
          };
        }

        var nextIndex = i; // re open

        var openCharacter = find(openCloseCharacters, function (_a) {
          var open = _a.open;
          return open === character;
        });

        if (openCharacter) {
          nextIndex = findOpen(openCharacter, texts, i, length, openCloseCharacters);
        }

        if (nextIndex === -1) {
          return out_i_1 = i, "break";
        }

        i = nextIndex;
        out_i_1 = i;
      };

      var out_i_1;

      for (var i = index; i < length; ++i) {
        var state_1 = _loop_1(i);

        i = out_i_1;
        if (typeof state_1 === "object") return state_1.value;
        if (state_1 === "break") break;
      }

      return -1;
    }

    function splitText(text, splitOptions) {
      var _a = isString(splitOptions) ? {
        separator: splitOptions
      } : splitOptions,
          _b = _a.separator,
          separator = _b === void 0 ? "," : _b,
          isSeparateFirst = _a.isSeparateFirst,
          isSeparateOnlyOpenClose = _a.isSeparateOnlyOpenClose,
          _c = _a.isSeparateOpenClose,
          isSeparateOpenClose = _c === void 0 ? isSeparateOnlyOpenClose : _c,
          _d = _a.openCloseCharacters,
          openCloseCharacters = _d === void 0 ? OPEN_CLOSED_CHARACTERS : _d;

      var openClosedText = openCloseCharacters.map(function (_a) {
        var open = _a.open,
            close = _a.close;

        if (open === close) {
          return open;
        }

        return open + "|" + close;
      }).join("|");
      var regexText = "(\\s*" + separator + "\\s*|" + openClosedText + "|\\s+)";
      var regex = new RegExp(regexText, "g");
      var texts = text.split(regex).filter(Boolean);
      var length = texts.length;
      var values = [];
      var tempValues = [];

      function resetTemp() {
        if (tempValues.length) {
          values.push(tempValues.join(""));
          tempValues = [];
          return true;
        }

        return false;
      }

      var _loop_2 = function (i) {
        var character = texts[i].trim();
        var nextIndex = i;
        var openCharacter = find(openCloseCharacters, function (_a) {
          var open = _a.open;
          return open === character;
        });
        var closeCharacter = find(openCloseCharacters, function (_a) {
          var close = _a.close;
          return close === character;
        });

        if (openCharacter) {
          nextIndex = findOpen(openCharacter, texts, i, length, openCloseCharacters);

          if (nextIndex !== -1 && isSeparateOpenClose) {
            if (resetTemp() && isSeparateFirst) {
              return out_i_2 = i, "break";
            }

            values.push(texts.slice(i, nextIndex + 1).join(""));
            i = nextIndex;

            if (isSeparateFirst) {
              return out_i_2 = i, "break";
            }

            return out_i_2 = i, "continue";
          }
        } else if (closeCharacter && !findIgnore(closeCharacter, texts, i)) {
          var nextOpenCloseCharacters = __spreadArrays(openCloseCharacters);

          nextOpenCloseCharacters.splice(openCloseCharacters.indexOf(closeCharacter), 1);
          return {
            value: splitText(text, {
              separator: separator,
              isSeparateFirst: isSeparateFirst,
              isSeparateOnlyOpenClose: isSeparateOnlyOpenClose,
              isSeparateOpenClose: isSeparateOpenClose,
              openCloseCharacters: nextOpenCloseCharacters
            })
          };
        } else if (isEqualSeparator(character, separator) && !isSeparateOnlyOpenClose) {
          resetTemp();

          if (isSeparateFirst) {
            return out_i_2 = i, "break";
          }

          return out_i_2 = i, "continue";
        }

        if (nextIndex === -1) {
          nextIndex = length - 1;
        }

        tempValues.push(texts.slice(i, nextIndex + 1).join(""));
        i = nextIndex;
        out_i_2 = i;
      };

      var out_i_2;

      for (var i = 0; i < length; ++i) {
        var state_2 = _loop_2(i);

        i = out_i_2;
        if (typeof state_2 === "object") return state_2.value;
        if (state_2 === "break") break;
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
    /**
    * Returns the value of the first element in the array that satisfies the provided testing function.
    * @function
    * @memberof CrossBrowser
    * @param - The array `find` was called upon.
    * @param - A function to execute on each value in the array,
    * @param - Returns defalutValue if not found by the function.
    * @example
    import { find } from "@daybrush/utils";

    find([{a: 1}, {a: 2}, {a: 3}, {a: 4}], ({ a }) => a === 2); // {a: 2}
    */

    function find(arr, callback, defalutValue) {
      var index = findIndex(arr, callback);
      return index > -1 ? arr[index] : defalutValue;
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

      if (isObject(size)) {
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
    * calculate between min, max
    * @function
    * @memberof Utils
    */

    function between(value, min, max) {
      return Math.max(min, Math.min(value, max));
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
    * @param - An options object that specifies characteristics about the event listener.
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
    * @param - An options object that specifies characteristics about the event listener.
    * @example
    import {addEvent, removeEvent} from "@daybrush/utils";
    const listener = e => {
      console.log(e);
    };
    addEvent(el, "click", listener);
    removeEvent(el, "click", listener);
    */

    function removeEvent(el, type, listener, options) {
      el.removeEventListener(type, listener, options);
    }

    /*
    Copyright (c) 2019 Daybrush
    name: @scena/event-emitter
    license: MIT
    author: Daybrush
    repository: git+https://github.com/daybrush/gesture.git
    version: 1.0.5
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
    Copyright (c) 2019 Daybrush
    name: gesto
    license: MIT
    author: Daybrush
    repository: git+https://github.com/daybrush/gesto.git
    version: 1.15.1
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
    /* global Reflect, Promise */

    var extendStatics$1 = function(d, b) {
        extendStatics$1 = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics$1(d, b);
    };

    function __extends$1(d, b) {
        extendStatics$1(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign$2 = function() {
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
        return getRad([
            touches[0].clientX,
            touches[0].clientY,
        ], [
            touches[1].clientX,
            touches[1].clientY,
        ]) / Math.PI * 180;
    }
    function isMultiTouch(e) {
        return e.touches && e.touches.length >= 2;
    }
    function getEventClients(e) {
        if (!e) {
            return [];
        }
        if (e.touches) {
            return getClients(e.touches);
        }
        else {
            return [getClient(e)];
        }
    }
    function isMouseEvent(e) {
        return e && (e.type.indexOf("mouse") > -1 || "button" in e);
    }
    function getPosition(clients, prevClients, startClients) {
        var length = startClients.length;
        var _a = getAverageClient(clients, length), clientX = _a.clientX, clientY = _a.clientY, originalClientX = _a.originalClientX, originalClientY = _a.originalClientY;
        var _b = getAverageClient(prevClients, length), prevX = _b.clientX, prevY = _b.clientY;
        var _c = getAverageClient(startClients, length), startX = _c.clientX, startY = _c.clientY;
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
            distY: distY,
        };
    }
    function getDist(clients) {
        return Math.sqrt(Math.pow(clients[0].clientX - clients[1].clientX, 2)
            + Math.pow(clients[0].clientY - clients[1].clientY, 2));
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
            clientY: e.clientY,
        };
    }
    function getAverageClient(clients, length) {
        if (length === void 0) { length = clients.length; }
        var sumClient = {
            clientX: 0,
            clientY: 0,
            originalClientX: 0,
            originalClientY: 0,
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
            originalClientY: sumClient.originalClientY / length,
        };
    }

    var ClientStore = /*#__PURE__*/ (function () {
        function ClientStore(clients) {
            this.prevClients = [];
            this.startClients = [];
            this.movement = 0;
            this.length = 0;
            this.startClients = clients;
            this.prevClients = clients;
            this.length = clients.length;
        }
        ClientStore.prototype.getAngle = function (clients) {
            if (clients === void 0) { clients = this.prevClients; }
            return getRotatiion(clients);
        };
        ClientStore.prototype.getRotation = function (clients) {
            if (clients === void 0) { clients = this.prevClients; }
            return getRotatiion(clients) - getRotatiion(this.startClients);
        };
        ClientStore.prototype.getPosition = function (clients, isAdd) {
            if (clients === void 0) { clients = this.prevClients; }
            var position = getPosition(clients || this.prevClients, this.prevClients, this.startClients);
            var deltaX = position.deltaX, deltaY = position.deltaY;
            this.movement += Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            this.prevClients = clients;
            return position;
        };
        ClientStore.prototype.getPositions = function (clients) {
            if (clients === void 0) { clients = this.prevClients; }
            var prevClients = this.prevClients;
            return this.startClients.map(function (startClient, i) { return getPosition([clients[i]], [prevClients[i]], [startClient]); });
        };
        ClientStore.prototype.getMovement = function (clients) {
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
        ClientStore.prototype.getDistance = function (clients) {
            if (clients === void 0) { clients = this.prevClients; }
            return getDist(clients);
        };
        ClientStore.prototype.getScale = function (clients) {
            if (clients === void 0) { clients = this.prevClients; }
            return getDist(clients) / getDist(this.startClients);
        };
        ClientStore.prototype.move = function (deltaX, deltaY) {
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
    }());

    var INPUT_TAGNAMES = ["textarea", "input"];
    /**
     * You can set up drag, pinch events in any browser.
     */
    var Gesto = /*#__PURE__*/ (function (_super) {
        __extends$1(Gesto, _super);
        /**
         *
         */
        function Gesto(targets, options) {
            if (options === void 0) { options = {}; }
            var _this = _super.call(this) || this;
            _this.options = {};
            _this.flag = false;
            _this.pinchFlag = false;
            _this.data = {};
            _this.isDrag = false;
            _this.isPinch = false;
            _this.isMouse = false;
            _this.isTouch = false;
            _this.clientStores = [];
            _this.targets = [];
            _this.prevTime = 0;
            _this.doubleFlag = false;
            _this._dragFlag = false;
            _this._isTrusted = false;
            _this._isMouseEvent = false;
            _this._isSecondaryButton = false;
            _this._preventMouseEvent = false;
            _this._prevInputEvent = null;
            _this.onDragStart = function (e, isTrusted) {
                if (isTrusted === void 0) { isTrusted = true; }
                if (!_this.flag && e.cancelable === false) {
                    return;
                }
                var _a = _this.options, container = _a.container, pinchOutside = _a.pinchOutside, preventWheelClick = _a.preventWheelClick, preventRightClick = _a.preventRightClick, preventDefault = _a.preventDefault, checkInput = _a.checkInput, preventClickEventOnDragStart = _a.preventClickEventOnDragStart, preventClickEventOnDrag = _a.preventClickEventOnDrag, preventClickEventByCondition = _a.preventClickEventByCondition;
                var isTouch = _this.isTouch;
                var isDragStart = !_this.flag;
                _this._isSecondaryButton = e.which === 3 || e.button === 2;
                if ((preventWheelClick && (e.which === 2 || e.button === 1))
                    || (preventRightClick && (e.which === 3 || e.button === 2))) {
                    _this.stop();
                    return false;
                }
                if (isDragStart) {
                    var activeElement = document.activeElement;
                    var target = e.target;
                    if (target) {
                        var tagName = target.tagName.toLowerCase();
                        var hasInput = INPUT_TAGNAMES.indexOf(tagName) > -1;
                        var hasContentEditable = target.isContentEditable;
                        if (hasInput || hasContentEditable) {
                            if (checkInput || activeElement === target) {
                                // force false or already focused.
                                return false;
                            }
                            // no focus
                            if (activeElement
                                && hasContentEditable
                                && activeElement.isContentEditable
                                && activeElement.contains(target)) {
                                return false;
                            }
                        }
                        else if ((preventDefault || e.type === "touchstart") && activeElement) {
                            var activeTagName = activeElement.tagName.toLowerCase();
                            if (activeElement.isContentEditable || INPUT_TAGNAMES.indexOf(activeTagName) > -1) {
                                activeElement.blur();
                            }
                        }
                        if (preventClickEventOnDragStart || preventClickEventOnDrag || preventClickEventByCondition) {
                            addEvent(window, "click", _this._onClick, true);
                        }
                    }
                    _this.clientStores = [new ClientStore(getEventClients(e))];
                    _this.flag = true;
                    _this.isDrag = false;
                    _this._isTrusted = isTrusted;
                    _this._dragFlag = true;
                    _this._prevInputEvent = e;
                    _this.data = {};
                    _this.doubleFlag = now() - _this.prevTime < 200;
                    _this._isMouseEvent = isMouseEvent(e);
                    if (!_this._isMouseEvent && _this._preventMouseEvent) {
                        _this._preventMouseEvent = false;
                    }
                    var result = _this._preventMouseEvent || _this.emit("dragStart", __assign$2(__assign$2({ data: _this.data, datas: _this.data, inputEvent: e, isMouseEvent: _this._isMouseEvent, isSecondaryButton: _this._isSecondaryButton, isTrusted: isTrusted, isDouble: _this.doubleFlag }, _this.getCurrentStore().getPosition()), { preventDefault: function () {
                            e.preventDefault();
                        }, preventDrag: function () {
                            _this._dragFlag = false;
                        } }));
                    if (result === false) {
                        _this.stop();
                    }
                    if (_this._isMouseEvent && _this.flag && preventDefault) {
                        e.preventDefault();
                    }
                }
                if (!_this.flag) {
                    return false;
                }
                var timer = 0;
                if (isDragStart) {
                    _this._attchDragEvent();
                    // wait pinch
                    if (isTouch && pinchOutside) {
                        timer = setTimeout(function () {
                            addEvent(container, "touchstart", _this.onDragStart, {
                                passive: false
                            });
                        });
                    }
                }
                else if (isTouch && pinchOutside) {
                    // pinch is occured
                    removeEvent(container, "touchstart", _this.onDragStart);
                }
                if (_this.flag && isMultiTouch(e)) {
                    clearTimeout(timer);
                    if (isDragStart && (e.touches.length !== e.changedTouches.length)) {
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
                var preventDefault = _this.options.preventDefault;
                if (!_this._isMouseEvent && preventDefault) {
                    e.preventDefault();
                }
                _this._prevInputEvent = e;
                var clients = getEventClients(e);
                var result = _this.moveClients(clients, e, false);
                if (_this._dragFlag) {
                    if (_this.pinchFlag || result.deltaX || result.deltaY) {
                        var dragResult = _this._preventMouseEvent || _this.emit("drag", __assign$2(__assign$2({}, result), { isScroll: !!isScroll, inputEvent: e }));
                        if (dragResult === false) {
                            _this.stop();
                            return;
                        }
                    }
                    if (_this.pinchFlag) {
                        _this.onPinch(e, clients);
                    }
                }
                _this.getCurrentStore().getPosition(clients, true);
            };
            _this.onDragEnd = function (e) {
                if (!_this.flag) {
                    return;
                }
                var _a = _this.options, pinchOutside = _a.pinchOutside, container = _a.container, preventClickEventOnDrag = _a.preventClickEventOnDrag, preventClickEventOnDragStart = _a.preventClickEventOnDragStart, preventClickEventByCondition = _a.preventClickEventByCondition;
                var isDrag = _this.isDrag;
                if (preventClickEventOnDrag || preventClickEventOnDragStart || preventClickEventByCondition) {
                    requestAnimationFrame(function () {
                        _this._allowClickEvent();
                    });
                }
                if (!preventClickEventByCondition && !preventClickEventOnDragStart && preventClickEventOnDrag && !isDrag) {
                    _this._allowClickEvent();
                }
                if (_this.isTouch && pinchOutside) {
                    removeEvent(container, "touchstart", _this.onDragStart);
                }
                if (_this.pinchFlag) {
                    _this.onPinchEnd(e);
                }
                var clients = (e === null || e === void 0 ? void 0 : e.touches) ? getEventClients(e) : [];
                var clientsLength = clients.length;
                if (clientsLength === 0 || !_this.options.keepDragging) {
                    _this.flag = false;
                }
                else {
                    _this._addStore(new ClientStore(clients));
                }
                var position = _this._getPosition();
                var currentTime = now();
                var isDouble = !isDrag && _this.doubleFlag;
                _this._prevInputEvent = null;
                _this.prevTime = isDrag || isDouble ? 0 : currentTime;
                if (!_this.flag) {
                    _this._dettachDragEvent();
                    _this._preventMouseEvent || _this.emit("dragEnd", __assign$2({ data: _this.data, datas: _this.data, isDouble: isDouble, isDrag: isDrag, isClick: !isDrag, isMouseEvent: _this._isMouseEvent, isSecondaryButton: _this._isSecondaryButton, inputEvent: e, isTrusted: _this._isTrusted }, position));
                    _this.clientStores = [];
                    if (!_this._isMouseEvent) {
                        _this._preventMouseEvent = true;
                        requestAnimationFrame(function () {
                            requestAnimationFrame(function () {
                                _this._preventMouseEvent = false;
                            });
                        });
                    }
                }
            };
            _this.onBlur = function () {
                _this.onDragEnd();
            };
            _this._allowClickEvent = function () {
                removeEvent(window, "click", _this._onClick, true);
            };
            _this._onClick = function (e) {
                _this._allowClickEvent();
                _this._preventMouseEvent = false;
                var preventClickEventByCondition = _this.options.preventClickEventByCondition;
                if (preventClickEventByCondition === null || preventClickEventByCondition === void 0 ? void 0 : preventClickEventByCondition(e)) {
                    return;
                }
                e.stopPropagation();
                e.preventDefault();
            };
            _this._onContextMenu = function (e) {
                var options = _this.options;
                if (!options.preventRightClick) {
                    e.preventDefault();
                }
                else {
                    _this.onDragEnd(e);
                }
            };
            _this._passCallback = function () { };
            var elements = [].concat(targets);
            _this.options = __assign$2({ checkInput: false, container: elements.length > 1 ? window : elements[0], preventRightClick: true, preventWheelClick: true, preventClickEventOnDragStart: false, preventClickEventOnDrag: false, preventClickEventByCondition: null, preventDefault: true, checkWindowBlur: false, keepDragging: false, pinchThreshold: 0, events: ["touch", "mouse"] }, options);
            var _a = _this.options, container = _a.container, events = _a.events, checkWindowBlur = _a.checkWindowBlur;
            _this.isTouch = events.indexOf("touch") > -1;
            _this.isMouse = events.indexOf("mouse") > -1;
            _this.targets = elements;
            if (_this.isMouse) {
                elements.forEach(function (el) {
                    addEvent(el, "mousedown", _this.onDragStart);
                    addEvent(el, "mousemove", _this._passCallback);
                });
                addEvent(container, "contextmenu", _this._onContextMenu);
            }
            if (checkWindowBlur) {
                addEvent(window, "blur", _this.onBlur);
            }
            if (_this.isTouch) {
                var passive_1 = {
                    passive: false,
                };
                elements.forEach(function (el) {
                    addEvent(el, "touchstart", _this.onDragStart, passive_1);
                    addEvent(el, "touchmove", _this._passCallback, passive_1);
                });
            }
            return _this;
        }
        /**
         * Stop Gesto's drag events.
         */
        Gesto.prototype.stop = function () {
            this.isDrag = false;
            this.data = {};
            this.clientStores = [];
            this.pinchFlag = false;
            this.doubleFlag = false;
            this.prevTime = 0;
            this.flag = false;
            this._allowClickEvent();
            this._dettachDragEvent();
        };
        /**
         * The total moved distance
         */
        Gesto.prototype.getMovement = function (clients) {
            return this.getCurrentStore().getMovement(clients) + this.clientStores.slice(1).reduce(function (prev, cur) {
                return prev + cur.movement;
            }, 0);
        };
        /**
         * Whether to drag
         */
        Gesto.prototype.isDragging = function () {
            return this.isDrag;
        };
        /**
         * Whether to start drag
         */
        Gesto.prototype.isFlag = function () {
            return this.flag;
        };
        /**
         * Whether to start pinch
         */
        Gesto.prototype.isPinchFlag = function () {
            return this.pinchFlag;
        };
        /**
         * Whether to start double click
         */
        Gesto.prototype.isDoubleFlag = function () {
            return this.doubleFlag;
        };
        /**
         * Whether to pinch
         */
        Gesto.prototype.isPinching = function () {
            return this.isPinch;
        };
        /**
         * If a scroll event occurs, it is corrected by the scroll distance.
         */
        Gesto.prototype.scrollBy = function (deltaX, deltaY, e, isCallDrag) {
            if (isCallDrag === void 0) { isCallDrag = true; }
            if (!this.flag) {
                return;
            }
            this.clientStores[0].move(deltaX, deltaY);
            isCallDrag && this.onDrag(e, true);
        };
        /**
         * Create a virtual drag event.
         */
        Gesto.prototype.move = function (_a, inputEvent) {
            var deltaX = _a[0], deltaY = _a[1];
            var store = this.getCurrentStore();
            var nextClients = store.prevClients;
            return this.moveClients(nextClients.map(function (_a) {
                var clientX = _a.clientX, clientY = _a.clientY;
                return {
                    clientX: clientX + deltaX,
                    clientY: clientY + deltaY,
                    originalClientX: clientX,
                    originalClientY: clientY,
                };
            }), inputEvent, true);
        };
        /**
         * The dragStart event is triggered by an external event.
         */
        Gesto.prototype.triggerDragStart = function (e) {
            this.onDragStart(e, false);
        };
        /**
         * Set the event data while dragging.
         */
        Gesto.prototype.setEventData = function (data) {
            var currentData = this.data;
            for (var name_1 in data) {
                currentData[name_1] = data[name_1];
            }
            return this;
        };
        /**
         * Set the event data while dragging.
         * Use `setEventData`
         * @deprecated
         */
        Gesto.prototype.setEventDatas = function (data) {
            return this.setEventData(data);
        };
        /**
         * Get the current event state while dragging.
         */
        Gesto.prototype.getCurrentEvent = function (inputEvent) {
            if (inputEvent === void 0) { inputEvent = this._prevInputEvent; }
            return __assign$2(__assign$2({ data: this.data, datas: this.data }, this._getPosition()), { movement: this.getMovement(), isDrag: this.isDrag, isPinch: this.isPinch, isScroll: false, inputEvent: inputEvent });
        };
        /**
         * Get & Set the event data while dragging.
         */
        Gesto.prototype.getEventData = function () {
            return this.data;
        };
        /**
         * Get & Set the event data while dragging.
         * Use getEventData method
         * @depreacated
         */
        Gesto.prototype.getEventDatas = function () {
            return this.data;
        };
        /**
         * Unset Gesto
         */
        Gesto.prototype.unset = function () {
            var _this = this;
            var targets = this.targets;
            var container = this.options.container;
            this.off();
            removeEvent(window, "blur", this.onBlur);
            if (this.isMouse) {
                targets.forEach(function (target) {
                    removeEvent(target, "mousedown", _this.onDragStart);
                });
                removeEvent(container, "contextmenu", this._onContextMenu);
            }
            if (this.isTouch) {
                targets.forEach(function (target) {
                    removeEvent(target, "touchstart", _this.onDragStart);
                });
                removeEvent(container, "touchstart", this.onDragStart);
            }
            this._prevInputEvent = null;
            this._allowClickEvent();
            this._dettachDragEvent();
        };
        Gesto.prototype.onPinchStart = function (e) {
            var pinchThreshold = this.options.pinchThreshold;
            if (this.isDrag && this.getMovement() > pinchThreshold) {
                return;
            }
            var store = new ClientStore(getEventClients(e));
            this.pinchFlag = true;
            this._addStore(store);
            var result = this.emit("pinchStart", __assign$2(__assign$2({ data: this.data, datas: this.data, angle: store.getAngle(), touches: this.getCurrentStore().getPositions() }, store.getPosition()), { inputEvent: e, isTrusted: this._isTrusted }));
            if (result === false) {
                this.pinchFlag = false;
            }
        };
        Gesto.prototype.onPinch = function (e, clients) {
            if (!this.flag || !this.pinchFlag || clients.length < 2) {
                return;
            }
            var store = this.getCurrentStore();
            this.isPinch = true;
            this.emit("pinch", __assign$2(__assign$2({ data: this.data, datas: this.data, movement: this.getMovement(clients), angle: store.getAngle(clients), rotation: store.getRotation(clients), touches: store.getPositions(clients), scale: store.getScale(clients), distance: store.getDistance(clients) }, store.getPosition(clients)), { inputEvent: e, isTrusted: this._isTrusted }));
        };
        Gesto.prototype.onPinchEnd = function (e) {
            if (!this.pinchFlag) {
                return;
            }
            var isPinch = this.isPinch;
            this.isPinch = false;
            this.pinchFlag = false;
            var store = this.getCurrentStore();
            this.emit("pinchEnd", __assign$2(__assign$2({ data: this.data, datas: this.data, isPinch: isPinch, touches: store.getPositions() }, store.getPosition()), { inputEvent: e }));
        };
        Gesto.prototype.getCurrentStore = function () {
            return this.clientStores[0];
        };
        Gesto.prototype.moveClients = function (clients, inputEvent, isAdd) {
            var position = this._getPosition(clients, isAdd);
            var isPrevDrag = this.isDrag;
            if (position.deltaX || position.deltaY) {
                this.isDrag = true;
            }
            var isFirstDrag = false;
            if (!isPrevDrag && this.isDrag) {
                isFirstDrag = true;
            }
            return __assign$2(__assign$2({ data: this.data, datas: this.data }, position), { movement: this.getMovement(clients), isDrag: this.isDrag, isPinch: this.isPinch, isScroll: false, isMouseEvent: this._isMouseEvent, isSecondaryButton: this._isSecondaryButton, inputEvent: inputEvent, isTrusted: this._isTrusted, isFirstDrag: isFirstDrag });
        };
        Gesto.prototype._addStore = function (store) {
            this.clientStores.splice(0, 0, store);
        };
        Gesto.prototype._getPosition = function (clients, isAdd) {
            var store = this.getCurrentStore();
            var position = store.getPosition(clients, isAdd);
            var _a = this.clientStores.slice(1).reduce(function (prev, cur) {
                var storePosition = cur.getPosition();
                prev.distX += storePosition.distX;
                prev.distY += storePosition.distY;
                return prev;
            }, position), distX = _a.distX, distY = _a.distY;
            return __assign$2(__assign$2({}, position), { distX: distX, distY: distY });
        };
        Gesto.prototype._attchDragEvent = function () {
            var container = this.options.container;
            var passive = {
                passive: false
            };
            if (this.isMouse) {
                addEvent(container, "mousemove", this.onDrag);
                addEvent(container, "mouseup", this.onDragEnd);
            }
            if (this.isTouch) {
                addEvent(container, "touchmove", this.onDrag, passive);
                addEvent(container, "touchend", this.onDragEnd, passive);
                addEvent(container, "touchcancel", this.onDragEnd, passive);
            }
        };
        Gesto.prototype._dettachDragEvent = function () {
            var container = this.options.container;
            if (this.isMouse) {
                removeEvent(container, "mousemove", this.onDrag);
                removeEvent(container, "mouseup", this.onDragEnd);
            }
            if (this.isTouch) {
                removeEvent(container, "touchstart", this.onDragStart);
                removeEvent(container, "touchmove", this.onDrag);
                removeEvent(container, "touchend", this.onDragEnd);
                removeEvent(container, "touchcancel", this.onDragEnd);
            }
        };
        return Gesto;
    }(EventEmitter));

    /*
    Copyright (c) 2019 Daybrush
    name: framework-utils
    license: MIT
    author: Daybrush
    repository: git+https://github.com/daybrush/framework-utils.git
    version: 1.1.0
    */
    function prefixCSS(prefix, css) {
      return css.replace(/([^}{]*){/gm, function (_, selector) {
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
    version: 1.0.1
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
                shadowRoot.removeChild(styleElement);
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
    version: 2.4.3
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
    function find$1(arr, callback) {
      var length = arr.length;

      for (var i = 0; i < length; ++i) {
        if (callback(arr[i], i)) {
          return arr[i];
        }
      }

      return null;
    }
    function getUserAgentString(agent) {
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
      var result = execRegExp("(" + versionTest + ")((?:\\/|\\s|:)([0-9|\\.|_]+))", userAgent);
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
    function findPresetBrand(presets, brands) {
      var brandInfo = {
        brand: "",
        version: "-1"
      };
      some(presets, function (preset) {
        var result = findBrand(brands, preset);

        if (!result) {
          return false;
        }

        brandInfo.brand = preset.id;
        brandInfo.version = preset.versionAlias || result.version;
        return brandInfo.version !== "-1";
      });
      return brandInfo;
    }
    function findBrand(brands, preset) {
      return find$1(brands, function (_a) {
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
      id: "chrome",
      versionTest: "chrome"
    }, {
      test: "chromium",
      id: "chrome"
    }, {
      test: "whale",
      id: "chrome",
      versionAlias: "-1",
      brand: true
    }];
    var WEBKIT_PRESETS = [{
      test: "applewebkit",
      id: "webkit",
      versionTest: "applewebkit|safari"
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
      test: "win32|windows",
      id: "window"
    }, {
      test: "iphone|ipad|ipod",
      id: "ios",
      versionTest: "iphone os|cpu os"
    }, {
      test: "macos|macintel|mac os x",
      id: "mac"
    }, {
      test: "android|linux armv81",
      id: "android"
    }, {
      test: "tizen",
      id: "tizen"
    }, {
      test: "webos|web0s",
      id: "webos"
    }];

    function isWebView(userAgent) {
      return !!findPreset(WEBVIEW_PRESETS, userAgent).preset;
    }
    function getLegacyAgent(userAgent) {
      var nextAgent = getUserAgentString(userAgent);
      var isMobile = !!/mobi/g.exec(nextAgent);
      var browser = {
        name: "unknown",
        version: "-1",
        majorVersion: -1,
        webview: isWebView(nextAgent),
        chromium: false,
        chromiumVersion: "-1",
        webkit: false,
        webkitVersion: "-1"
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

      var chromiumPreset = findPreset(CHROMIUM_PRESETS, nextAgent);
      browser.chromium = !!chromiumPreset.preset;
      browser.chromiumVersion = chromiumPreset.version;

      if (!browser.chromium) {
        var webkitPreset = findPreset(WEBKIT_PRESETS, nextAgent);
        browser.webkit = !!webkitPreset.preset;
        browser.webkitVersion = webkitPreset.version;
      }

      if (osPreset) {
        os.name = osPreset.id;
        os.version = osVersion;
        os.majorVersion = parseInt(osVersion, 10);
      }

      if (browserPreset) {
        browser.name = browserPreset.id;
        browser.version = browserVersion; // Early whale bugs

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

    function getClientHintsAgent(osData) {
      var userAgentData = navigator.userAgentData;
      var brands = (userAgentData.uaList || userAgentData.brands).slice();
      var fullVersionList = osData && osData.fullVersionList;
      var isMobile = userAgentData.mobile || false;
      var firstBrand = brands[0];
      var platform = (osData && osData.platform || userAgentData.platform || navigator.platform).toLowerCase();
      var browser = {
        name: firstBrand.brand,
        version: firstBrand.version,
        majorVersion: -1,
        webkit: false,
        webkitVersion: "-1",
        chromium: false,
        chromiumVersion: "-1",
        webview: !!findPresetBrand(WEBVIEW_PRESETS, brands).brand || isWebView(getUserAgentString())
      };
      var os = {
        name: "unknown",
        version: "-1",
        majorVersion: -1
      };
      browser.webkit = !browser.chromium && some(WEBKIT_PRESETS, function (preset) {
        return findBrand(brands, preset);
      });
      var chromiumBrand = findPresetBrand(CHROMIUM_PRESETS, brands);
      browser.chromium = !!chromiumBrand.brand;
      browser.chromiumVersion = chromiumBrand.version;

      if (!browser.chromium) {
        var webkitBrand = findPresetBrand(WEBKIT_PRESETS, brands);
        browser.webkit = !!webkitBrand.brand;
        browser.webkitVersion = webkitBrand.version;
      }

      var platfomResult = find$1(OS_PRESETS, function (preset) {
        return new RegExp("" + preset.test, "g").exec(platform);
      });
      os.name = platfomResult ? platfomResult.id : "";

      if (osData) {
        os.version = osData.platformVersion;
      }

      if (fullVersionList && fullVersionList.length) {
        var browserBrandByFullVersionList = findPresetBrand(BROWSER_PRESETS, fullVersionList);
        browser.name = browserBrandByFullVersionList.brand || browser.name;
        browser.version = browserBrandByFullVersionList.version || browser.version;
      } else {
        var browserBrand = findPresetBrand(BROWSER_PRESETS, brands);
        browser.name = browserBrand.brand || browser.name;
        browser.version = browserBrand.brand && osData ? osData.uaFullVersion : browserBrand.version;
      }

      if (browser.webkit) {
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
        return getClientHintsAgent();
      } else {
        return getLegacyAgent(userAgent);
      }
    }

    var agent$1 = agent();
    var IS_SAFARI = agent$1.browser.name === "safari";
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
      pinchDirection: "all",
      preventWheelClick: true
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

    var OPTIONS = __spreadArray(__spreadArray([], PROPERTIES, true), ["preventWheelClick", "useWheel", "useGesture", "cspNonce", "wrapperElement", "scrollAreaElement", "verticalScrollElement", "horizontalScrollElement", "useResizeObserver"], false);
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


      function InfiniteViewer(_containerElement, viewportElement, options) {
        if (viewportElement === void 0) {
          viewportElement = {};
        }

        if (options === void 0) {
          options = {};
        }

        var _this = _super.call(this) || this;

        _this._containerElement = _containerElement;
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
        _this._viewportElement = null;
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
          var _a = _this._containerElement,
              containerWidth = _a.offsetWidth,
              containerHeight = _a.offsetHeight;
          var _b = _this._viewportElement,
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

        if (viewportElement instanceof Element) {
          _this._viewportElement = viewportElement;
          _this.options = __assign(__assign({}, DEFAULT_OPTIONS), options);
        } else {
          _this._viewportElement = _containerElement.children[0];
          _this.options = __assign(__assign({}, DEFAULT_OPTIONS), viewportElement);
        }

        _this.init();

        return _this;
      }
      /**
       * Get Container Element
       */


      var __proto = InfiniteViewer.prototype;

      __proto.getContainer = function () {
        return this._containerElement;
      };
      /**
       * Get Viewport Element
       */


      __proto.getViewport = function () {
        return this._viewportElement;
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
        var containerElement = this._containerElement;

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
        this._containerElement = null;
        this._viewportElement = null;
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
          this._setZoom([this.zoomX + deltaX, this.zoomY + deltaY], options);
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
          this._setZoom(zoom, options);
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
        var _this = this;

        var _a; // infinite-viewer(container)
        // viewport
        // children


        var containerElement = this._containerElement;
        var options = this.options; // vanilla

        var wrapperElement = options.wrapperElement || containerElement.querySelector(".".concat(WRAPPER_CLASS_NAME));
        var scrollAreaElement = options.scrollAreaElement || containerElement.querySelector(".".concat(SCROLL_AREA_CLASS_NAME));
        var horizontalScrollElement = options.horizontalScrollElement || containerElement.querySelector(".".concat(HORIZONTAL_SCROLL_BAR_CLASS_NAME));
        var verticalScrollElement = options.verticalScrollElement || containerElement.querySelector(".".concat(VERTICAL_SCROLL_BAR_CLASS_NAME));

        if (wrapperElement) {
          this.wrapperElement = wrapperElement;
        } else {
          wrapperElement = document.createElement("div");
          wrapperElement.insertBefore(this._viewportElement, null);
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
          container: window,
          events: ["touch", "mouse"],
          preventWheelClick: (_a = this.options.preventWheelClick) !== null && _a !== void 0 ? _a : true
        }).on("dragStart", function (e) {
          var inputEvent = e.inputEvent,
              stop = e.stop,
              datas = e.datas;

          if (!_this.useMouseDrag && e.isMouseEvent) {
            stop();
            return;
          }

          _this._pauseScrollAnimation();

          _this.dragFlag = false;

          var result = _this.trigger("dragStart", e);

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
          observer_1.observe(this._viewportElement);
          observer_1.observe(this._containerElement);

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
        var viewportStyle = this._viewportElement.style;

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
          return _this._setZoom([_this.zoomX + dest[0] * distRatio, _this.zoomY + dest[1] * distRatio], options);
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

        this._setZoom(zoom, {
          zoomBase: "screen"
        });

        options.zoomOffsetX = originalZoomOffsetX;
        options.zoomOffsetY = originalZoomOffsetY;
      };

      __proto._setZoom = function (zoom, zoomOptions) {
        if (zoomOptions === void 0) {
          zoomOptions = {};
        }

        var zoomBase = zoomOptions.zoomBase;

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

        if ("zoomOffsetX" in zoomOptions) {
          zoomOffsetX = zoomOptions.zoomOffsetX;
        }

        if ("zoomOffsetY" in zoomOptions) {
          zoomOffsetY = zoomOptions.zoomOffsetY;
        }

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



    var modules = {
        __proto__: null,
        'default': InfiniteViewer$1,
        OPTIONS: OPTIONS,
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
