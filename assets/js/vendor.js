"use strict";

function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/**
 * Skipped minification because the original files appears to be already minified.
 * Original file: /npm/@editorjs/code@2.9.0/dist/code.umd.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
(function () {
  "use strict";

  try {
    if ((typeof document === "undefined" ? "undefined" : _typeof(document)) < "u") {
      var e = document.createElement("style");
      e.appendChild(document.createTextNode(".ce-code__textarea{min-height:200px;font-family:Menlo,Monaco,Consolas,Courier New,monospace;color:#41314e;line-height:1.6em;font-size:12px;background:#f8f7fa;border:1px solid #f1f1f4;box-shadow:none;white-space:pre;word-wrap:normal;overflow-x:auto;resize:vertical}")), document.head.appendChild(e);
    }
  } catch (o) {
    console.error("vite-plugin-css-injected-by-js", o);
  }
})();
(function (o, i) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) == "object" && (typeof module === "undefined" ? "undefined" : _typeof(module)) < "u" ? module.exports = i() : typeof define == "function" && define.amd ? define(i) : (o = (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) < "u" ? globalThis : o || self, o.CodeTool = i());
})(void 0, function () {
  "use strict";

  var o = "";
  function i(u, t) {
    var s = "";
    for (; s !== "\n" && t > 0;) t = t - 1, s = u.substr(t, 1);
    return s === "\n" && (t += 1), t;
  }
  var h = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 8L5 12L9 16"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 8L19 12L15 16"/></svg>'; /**
                                                                                                                                                                                                                                                                                                                                                      * CodeTool for Editor.js
                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                      * @author CodeX (team@ifmo.su)
                                                                                                                                                                                                                                                                                                                                                      * @copyright CodeX 2018
                                                                                                                                                                                                                                                                                                                                                      * @license MIT
                                                                                                                                                                                                                                                                                                                                                      * @version 2.0.0
                                                                                                                                                                                                                                                                                                                                                      */
  var c = /*#__PURE__*/function () {
    function c(_ref) {
      var t = _ref.data,
        e = _ref.config,
        s = _ref.api,
        n = _ref.readOnly;
      _classCallCheck(this, c);
      this.api = s, this.readOnly = n, this.placeholder = this.api.i18n.t(e.placeholder || c.DEFAULT_PLACEHOLDER), this.CSS = {
        baseClass: this.api.styles.block,
        input: this.api.styles.input,
        wrapper: "ce-code",
        textarea: "ce-code__textarea"
      }, this.nodes = {
        holder: null,
        textarea: null
      }, this.data = {
        code: t.code || ""
      }, this.nodes.holder = this.drawView();
    }
    return _createClass(c, [{
      key: "drawView",
      value: function drawView() {
        var _this = this;
        var t = document.createElement("div"),
          e = document.createElement("textarea");
        return t.classList.add(this.CSS.baseClass, this.CSS.wrapper), e.classList.add(this.CSS.textarea, this.CSS.input), e.textContent = this.data.code, e.placeholder = this.placeholder, this.readOnly && (e.disabled = !0), t.appendChild(e), e.addEventListener("keydown", function (s) {
          switch (s.code) {
            case "Tab":
              _this.tabHandler(s);
              break;
          }
        }), this.nodes.textarea = e, t;
      }
    }, {
      key: "render",
      value: function render() {
        return this.nodes.holder;
      }
    }, {
      key: "save",
      value: function save(t) {
        return {
          code: t.querySelector("textarea").value
        };
      }
    }, {
      key: "onPaste",
      value: function onPaste(t) {
        var e = t.detail.data;
        this.data = {
          code: e.textContent
        };
      }
    }, {
      key: "data",
      get: function get() {
        return this._data;
      },
      set: function set(t) {
        this._data = t, this.nodes.textarea && (this.nodes.textarea.textContent = t.code);
      }
    }, {
      key: "tabHandler",
      value: function tabHandler(t) {
        t.stopPropagation(), t.preventDefault();
        var e = t.target,
          s = t.shiftKey,
          n = e.selectionStart,
          r = e.value,
          a = "  ";
        var d;
        if (!s) d = n + a.length, e.value = r.substring(0, n) + a + r.substring(n);else {
          var l = i(r, n);
          if (r.substr(l, a.length) !== a) return;
          e.value = r.substring(0, l) + r.substring(l + a.length), d = n - a.length;
        }
        e.setSelectionRange(d, d);
      }
    }], [{
      key: "isReadOnlySupported",
      get: function get() {
        return !0;
      }
    }, {
      key: "enableLineBreaks",
      get: function get() {
        return !0;
      }
    }, {
      key: "toolbox",
      get: function get() {
        return {
          icon: h,
          title: "Code"
        };
      }
    }, {
      key: "DEFAULT_PLACEHOLDER",
      get: function get() {
        return "Enter a code";
      }
    }, {
      key: "pasteConfig",
      get: function get() {
        return {
          tags: ["pre"]
        };
      }
    }, {
      key: "sanitize",
      get: function get() {
        return {
          code: !0
        };
      }
    }]);
  }();
  return c;
});
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var DefaultBlock = /*#__PURE__*/function () {
  function DefaultBlock() {
    _classCallCheck(this, DefaultBlock);
  }
  return _createClass(DefaultBlock, [{
    key: "render",
    value: function render() {
      return document.createElement('span');
    }
  }, {
    key: "save",
    value: function save(blockContent) {
      return "";
    }
  }], [{
    key: "isReadOnlySupported",
    get: function get() {
      return true;
    }
  }]);
}();
"use strict";

var _excluded = ["class", "isInternal"];
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n3 = 0, F = function F() {}; return { s: F, n: function n() { return _n3 >= r.length ? { done: !0 } : { done: !1, value: r[_n3++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function (de, J) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) == "object" && (typeof module === "undefined" ? "undefined" : _typeof(module)) < "u" ? module.exports = J() : typeof define == "function" && define.amd ? define(J) : (de = (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) < "u" ? globalThis : de || self, de.EditorJS = J());
})(void 0, function () {
  "use strict";

  var de = (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) < "u" ? globalThis : (typeof window === "undefined" ? "undefined" : _typeof(window)) < "u" ? window : (typeof global === "undefined" ? "undefined" : _typeof(global)) < "u" ? global : (typeof self === "undefined" ? "undefined" : _typeof(self)) < "u" ? self : {};
  function J(s) {
    return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
  }
  function Se() {}
  Object.assign(Se, {
    default: Se,
    register: Se,
    revert: function revert() {},
    __esModule: !0
  }), Element.prototype.matches || (Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (s) {
    var e = (this.document || this.ownerDocument).querySelectorAll(s);
    var t = e.length;
    for (; --t >= 0 && e.item(t) !== this;);
    return t > -1;
  }), Element.prototype.closest || (Element.prototype.closest = function (s) {
    var e = this;
    if (!document.documentElement.contains(e)) return null;
    do {
      if (e.matches(s)) return e;
      e = e.parentElement || e.parentNode;
    } while (e !== null);
    return null;
  }), Element.prototype.prepend || (Element.prototype.prepend = function (e) {
    var t = document.createDocumentFragment();
    Array.isArray(e) || (e = [e]), e.forEach(function (o) {
      var i = o instanceof Node;
      t.appendChild(i ? o : document.createTextNode(o));
    }), this.insertBefore(t, this.firstChild);
  }), Element.prototype.scrollIntoViewIfNeeded || (Element.prototype.scrollIntoViewIfNeeded = function (s) {
    s = arguments.length === 0 ? !0 : !!s;
    var e = this.parentNode,
      t = window.getComputedStyle(e, null),
      o = parseInt(t.getPropertyValue("border-top-width")),
      i = parseInt(t.getPropertyValue("border-left-width")),
      n = this.offsetTop - e.offsetTop < e.scrollTop,
      r = this.offsetTop - e.offsetTop + this.clientHeight - o > e.scrollTop + e.clientHeight,
      a = this.offsetLeft - e.offsetLeft < e.scrollLeft,
      l = this.offsetLeft - e.offsetLeft + this.clientWidth - i > e.scrollLeft + e.clientWidth,
      d = n && !r;
    (n || r) && s && (e.scrollTop = this.offsetTop - e.offsetTop - e.clientHeight / 2 - o + this.clientHeight / 2), (a || l) && s && (e.scrollLeft = this.offsetLeft - e.offsetLeft - e.clientWidth / 2 - i + this.clientWidth / 2), (n || r || a || l) && !s && this.scrollIntoView(d);
  }), window.requestIdleCallback = window.requestIdleCallback || function (s) {
    var e = Date.now();
    return setTimeout(function () {
      s({
        didTimeout: !1,
        timeRemaining: function timeRemaining() {
          return Math.max(0, 50 - (Date.now() - e));
        }
      });
    }, 1);
  }, window.cancelIdleCallback = window.cancelIdleCallback || function (s) {
    clearTimeout(s);
  };
  var Nt = function Nt() {
    var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 21;
    return crypto.getRandomValues(new Uint8Array(s)).reduce(function (e, t) {
      return t &= 63, t < 36 ? e += t.toString(36) : t < 62 ? e += (t - 26).toString(36).toUpperCase() : t > 62 ? e += "-" : e += "_", e;
    }, "");
  };
  var Je = function (s) {
    return s.VERBOSE = "VERBOSE", s.INFO = "INFO", s.WARN = "WARN", s.ERROR = "ERROR", s;
  }(Je || {});
  var k = {
      BACKSPACE: 8,
      TAB: 9,
      ENTER: 13,
      SHIFT: 16,
      CTRL: 17,
      ALT: 18,
      ESC: 27,
      SPACE: 32,
      LEFT: 37,
      UP: 38,
      DOWN: 40,
      RIGHT: 39,
      DELETE: 46,
      META: 91,
      SLASH: 191
    },
    Rt = {
      LEFT: 0,
      WHEEL: 1,
      RIGHT: 2,
      BACKWARD: 3,
      FORWARD: 4
    };
  function he(s, e) {
    var t = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "log";
    var o = arguments.length > 3 ? arguments[3] : undefined;
    var i = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "color: inherit";
    if (!("console" in window) || !window.console[t]) return;
    var n = ["info", "log", "warn", "error"].includes(t),
      r = [];
    switch (he.logLevel) {
      case "ERROR":
        if (t !== "error") return;
        break;
      case "WARN":
        if (!["error", "warn"].includes(t)) return;
        break;
      case "INFO":
        if (!n || s) return;
        break;
    }
    o && r.push(o);
    var a = "Editor.js 2.29.1",
      l = "line-height: 1em;\n            color: #006FEA;\n            display: inline-block;\n            font-size: 11px;\n            line-height: 1em;\n            background-color: #fff;\n            padding: 4px 9px;\n            border-radius: 30px;\n            border: 1px solid rgba(56, 138, 229, 0.16);\n            margin: 4px 5px 4px 0;";
    s && (n ? (r.unshift(l, i), e = "%c".concat(a, "%c ").concat(e)) : e = "( ".concat(a, " )").concat(e));
    try {
      var _console, _console2;
      n ? o ? (_console = console)[t].apply(_console, ["".concat(e, " %o")].concat(r)) : (_console2 = console)[t].apply(_console2, [e].concat(r)) : console[t](e);
    } catch (_unused) {}
  }
  he.logLevel = "VERBOSE";
  function Dt(s) {
    he.logLevel = s;
  }
  var T = he.bind(window, !1),
    Y = he.bind(window, !0);
  function Q(s) {
    return Object.prototype.toString.call(s).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  }
  function M(s) {
    return Q(s) === "function" || Q(s) === "asyncfunction";
  }
  function O(s) {
    return Q(s) === "object";
  }
  function Z(s) {
    return Q(s) === "string";
  }
  function Pt(s) {
    return Q(s) === "boolean";
  }
  function Qe(s) {
    return Q(s) === "number";
  }
  function et(s) {
    return Q(s) === "undefined";
  }
  function W(s) {
    return s ? Object.keys(s).length === 0 && s.constructor === Object : !0;
  }
  function tt(s) {
    return s > 47 && s < 58 || s === 32 || s === 13 || s === 229 || s > 64 && s < 91 || s > 95 && s < 112 || s > 185 && s < 193 || s > 218 && s < 223;
  }
  function Ft(_x) {
    return _Ft.apply(this, arguments);
  }
  function _Ft() {
    _Ft = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee50(s) {
      var e,
        t,
        o,
        _o7,
        _args50 = arguments;
      return _regeneratorRuntime().wrap(function _callee50$(_context50) {
        while (1) switch (_context50.prev = _context50.next) {
          case 0:
            _o7 = function _o9() {
              _o7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee49(i, n, r) {
                return _regeneratorRuntime().wrap(function _callee49$(_context49) {
                  while (1) switch (_context49.prev = _context49.next) {
                    case 0:
                      _context49.prev = 0;
                      _context49.next = 3;
                      return i.function(i.data);
                    case 3:
                      _context49.next = 5;
                      return n(et(i.data) ? {} : i.data);
                    case 5:
                      _context49.next = 10;
                      break;
                    case 7:
                      _context49.prev = 7;
                      _context49.t0 = _context49["catch"](0);
                      r(et(i.data) ? {} : i.data);
                    case 10:
                    case "end":
                      return _context49.stop();
                  }
                }, _callee49, null, [[0, 7]]);
              }));
              return _o7.apply(this, arguments);
            };
            o = function _o8(_x36, _x37, _x38) {
              return _o7.apply(this, arguments);
            };
            e = _args50.length > 1 && _args50[1] !== undefined ? _args50[1] : function () {};
            t = _args50.length > 2 && _args50[2] !== undefined ? _args50[2] : function () {};
            return _context50.abrupt("return", s.reduce(/*#__PURE__*/function () {
              var _ref82 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee48(i, n) {
                return _regeneratorRuntime().wrap(function _callee48$(_context48) {
                  while (1) switch (_context48.prev = _context48.next) {
                    case 0:
                      _context48.next = 2;
                      return i;
                    case 2:
                      return _context48.abrupt("return", o(n, e, t));
                    case 3:
                    case "end":
                      return _context48.stop();
                  }
                }, _callee48);
              }));
              return function (_x39, _x40) {
                return _ref82.apply(this, arguments);
              };
            }(), Promise.resolve()));
          case 5:
          case "end":
            return _context50.stop();
        }
      }, _callee50);
    }));
    return _Ft.apply(this, arguments);
  }
  function ot(s) {
    return Array.prototype.slice.call(s);
  }
  function xe(s, e) {
    return function () {
      var t = this,
        o = arguments;
      window.setTimeout(function () {
        return s.apply(t, o);
      }, e);
    };
  }
  function Ht(s) {
    return s.name.split(".").pop();
  }
  function zt(s) {
    return /^[-\w]+\/([-+\w]+|\*)$/.test(s);
  }
  function it(s, e, t) {
    var _this = this;
    var o;
    return function () {
      for (var _len = arguments.length, i = new Array(_len), _key = 0; _key < _len; _key++) {
        i[_key] = arguments[_key];
      }
      var n = _this,
        r = function r() {
          o = null, t || s.apply(n, i);
        },
        a = t && !o;
      window.clearTimeout(o), o = window.setTimeout(r, e), a && s.apply(n, i);
    };
  }
  function Ie(s, e) {
    var t = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : void 0;
    var o,
      i,
      n,
      r = null,
      a = 0;
    t || (t = {});
    var l = function l() {
      a = t.leading === !1 ? 0 : Date.now(), r = null, n = s.apply(o, i), r || (o = i = null);
    };
    return function () {
      var d = Date.now();
      !a && t.leading === !1 && (a = d);
      var u = e - (d - a);
      return o = this, i = arguments, u <= 0 || u > e ? (r && (clearTimeout(r), r = null), a = d, n = s.apply(o, i), r || (o = i = null)) : !r && t.trailing !== !1 && (r = setTimeout(l, u)), n;
    };
  }
  function Ut() {
    var s = {
        win: !1,
        mac: !1,
        x11: !1,
        linux: !1
      },
      e = Object.keys(s).find(function (t) {
        return window.navigator.appVersion.toLowerCase().indexOf(t) !== -1;
      });
    return e && (s[e] = !0), s;
  }
  function ne(s) {
    return s[0].toUpperCase() + s.slice(1);
  }
  function Me(s) {
    for (var _len2 = arguments.length, e = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      e[_key2 - 1] = arguments[_key2];
    }
    if (!e.length) return s;
    var t = e.shift();
    if (O(s) && O(t)) for (var o in t) O(t[o]) ? (s[o] || Object.assign(s, _defineProperty({}, o, {})), Me(s[o], t[o])) : Object.assign(s, _defineProperty({}, o, t[o]));
    return Me.apply(void 0, [s].concat(e));
  }
  function we(s) {
    var e = Ut();
    return s = s.replace(/shift/gi, "⇧").replace(/backspace/gi, "⌫").replace(/enter/gi, "⏎").replace(/up/gi, "↑").replace(/left/gi, "→").replace(/down/gi, "↓").replace(/right/gi, "←").replace(/escape/gi, "⎋").replace(/insert/gi, "Ins").replace(/delete/gi, "␡").replace(/\+/gi, " + "), e.mac ? s = s.replace(/ctrl|cmd/gi, "⌘").replace(/alt/gi, "⌥") : s = s.replace(/cmd/gi, "Ctrl").replace(/windows/gi, "WIN"), s;
  }
  function jt(s) {
    try {
      return new URL(s).href;
    } catch (_unused2) {}
    return s.substring(0, 2) === "//" ? window.location.protocol + s : window.location.origin + s;
  }
  function $t() {
    return Nt(10);
  }
  function Wt(s) {
    window.open(s, "_blank");
  }
  function Yt() {
    var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    return "".concat(s).concat(Math.floor(Math.random() * 1e8).toString(16));
  }
  function Le(s, e, t) {
    var o = "\xAB".concat(e, "\xBB is deprecated and will be removed in the next major release. Please use the \xAB").concat(t, "\xBB instead.");
    s && Y(o, "warn");
  }
  function se(s, e, t) {
    var o = t.value ? "value" : "get",
      i = t[o],
      n = "#".concat(e, "Cache");
    if (t[o] = function () {
      for (var _len3 = arguments.length, r = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        r[_key3] = arguments[_key3];
      }
      return this[n] === void 0 && (this[n] = i.apply.apply(i, [this].concat(r))), this[n];
    }, o === "get" && t.set) {
      var r = t.set;
      t.set = function (a) {
        delete s[n], r.apply(this, a);
      };
    }
    return t;
  }
  var nt = 650;
  function ee() {
    return window.matchMedia("(max-width: ".concat(nt, "px)")).matches;
  }
  var st = (typeof window === "undefined" ? "undefined" : _typeof(window)) < "u" && window.navigator && window.navigator.platform && (/iP(ad|hone|od)/.test(window.navigator.platform) || window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1);
  function Kt(s, e) {
    var t = Array.isArray(s) || O(s),
      o = Array.isArray(e) || O(e);
    return t || o ? JSON.stringify(s) === JSON.stringify(e) : s === e;
  }
  var c = /*#__PURE__*/function () {
    function c() {
      _classCallCheck(this, c);
    }
    return _createClass(c, null, [{
      key: "isSingleTag",
      value: function isSingleTag(e) {
        return e.tagName && ["AREA", "BASE", "BR", "COL", "COMMAND", "EMBED", "HR", "IMG", "INPUT", "KEYGEN", "LINK", "META", "PARAM", "SOURCE", "TRACK", "WBR"].includes(e.tagName);
      }
    }, {
      key: "isLineBreakTag",
      value: function isLineBreakTag(e) {
        return e && e.tagName && ["BR", "WBR"].includes(e.tagName);
      }
    }, {
      key: "make",
      value: function make(e) {
        var _i$classList;
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var o = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var i = document.createElement(e);
        Array.isArray(t) ? (_i$classList = i.classList).add.apply(_i$classList, _toConsumableArray(t)) : t && i.classList.add(t);
        for (var n in o) Object.prototype.hasOwnProperty.call(o, n) && (i[n] = o[n]);
        return i;
      }
    }, {
      key: "text",
      value: function text(e) {
        return document.createTextNode(e);
      }
    }, {
      key: "append",
      value: function append(e, t) {
        Array.isArray(t) ? t.forEach(function (o) {
          return e.appendChild(o);
        }) : e.appendChild(t);
      }
    }, {
      key: "prepend",
      value: function prepend(e, t) {
        Array.isArray(t) ? (t = t.reverse(), t.forEach(function (o) {
          return e.prepend(o);
        })) : e.prepend(t);
      }
    }, {
      key: "swap",
      value: function swap(e, t) {
        var o = document.createElement("div"),
          i = e.parentNode;
        i.insertBefore(o, e), i.insertBefore(e, t), i.insertBefore(t, o), i.removeChild(o);
      }
    }, {
      key: "find",
      value: function find() {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
        var t = arguments.length > 1 ? arguments[1] : undefined;
        return e.querySelector(t);
      }
    }, {
      key: "get",
      value: function get(e) {
        return document.getElementById(e);
      }
    }, {
      key: "findAll",
      value: function findAll() {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
        var t = arguments.length > 1 ? arguments[1] : undefined;
        return e.querySelectorAll(t);
      }
    }, {
      key: "allInputsSelector",
      get: function get() {
        return "[contenteditable=true], textarea, input:not([type]), " + ["text", "password", "email", "number", "search", "tel", "url"].map(function (t) {
          return "input[type=\"".concat(t, "\"]");
        }).join(", ");
      }
    }, {
      key: "findAllInputs",
      value: function findAllInputs(e) {
        return ot(e.querySelectorAll(c.allInputsSelector)).reduce(function (t, o) {
          return c.isNativeInput(o) || c.containsOnlyInlineElements(o) ? [].concat(_toConsumableArray(t), [o]) : [].concat(_toConsumableArray(t), _toConsumableArray(c.getDeepestBlockElements(o)));
        }, []);
      }
    }, {
      key: "getDeepestNode",
      value: function getDeepestNode(e) {
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
        var o = t ? "lastChild" : "firstChild",
          i = t ? "previousSibling" : "nextSibling";
        if (e && e.nodeType === Node.ELEMENT_NODE && e[o]) {
          var n = e[o];
          if (c.isSingleTag(n) && !c.isNativeInput(n) && !c.isLineBreakTag(n)) if (n[i]) n = n[i];else if (n.parentNode[i]) n = n.parentNode[i];else return n.parentNode;
          return this.getDeepestNode(n, t);
        }
        return e;
      }
    }, {
      key: "isElement",
      value: function isElement(e) {
        return Qe(e) ? !1 : e && e.nodeType && e.nodeType === Node.ELEMENT_NODE;
      }
    }, {
      key: "isFragment",
      value: function isFragment(e) {
        return Qe(e) ? !1 : e && e.nodeType && e.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
      }
    }, {
      key: "isContentEditable",
      value: function isContentEditable(e) {
        return e.contentEditable === "true";
      }
    }, {
      key: "isNativeInput",
      value: function isNativeInput(e) {
        var t = ["INPUT", "TEXTAREA"];
        return e && e.tagName ? t.includes(e.tagName) : !1;
      }
    }, {
      key: "canSetCaret",
      value: function canSetCaret(e) {
        var t = !0;
        if (c.isNativeInput(e)) switch (e.type) {
          case "file":
          case "checkbox":
          case "radio":
          case "hidden":
          case "submit":
          case "button":
          case "image":
          case "reset":
            t = !1;
            break;
        } else t = c.isContentEditable(e);
        return t;
      }
    }, {
      key: "isNodeEmpty",
      value: function isNodeEmpty(e, t) {
        var o;
        return this.isSingleTag(e) && !this.isLineBreakTag(e) ? !1 : (this.isElement(e) && this.isNativeInput(e) ? o = e.value : o = e.textContent.replace("​", ""), t && (o = o.replace(new RegExp(t, "g"), "")), o.trim().length === 0);
      }
    }, {
      key: "isLeaf",
      value: function isLeaf(e) {
        return e ? e.childNodes.length === 0 : !1;
      }
    }, {
      key: "isEmpty",
      value: function isEmpty(e, t) {
        e.normalize();
        var o = [e];
        for (; o.length > 0;) if (e = o.shift(), !!e) {
          if (this.isLeaf(e) && !this.isNodeEmpty(e, t)) return !1;
          e.childNodes && o.push.apply(o, _toConsumableArray(Array.from(e.childNodes)));
        }
        return !0;
      }
    }, {
      key: "isHTMLString",
      value: function isHTMLString(e) {
        var t = c.make("div");
        return t.innerHTML = e, t.childElementCount > 0;
      }
    }, {
      key: "getContentLength",
      value: function getContentLength(e) {
        return c.isNativeInput(e) ? e.value.length : e.nodeType === Node.TEXT_NODE ? e.length : e.textContent.length;
      }
    }, {
      key: "blockElements",
      get: function get() {
        return ["address", "article", "aside", "blockquote", "canvas", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "li", "main", "nav", "noscript", "ol", "output", "p", "pre", "ruby", "section", "table", "tbody", "thead", "tr", "tfoot", "ul", "video"];
      }
    }, {
      key: "containsOnlyInlineElements",
      value: function containsOnlyInlineElements(e) {
        var t;
        Z(e) ? (t = document.createElement("div"), t.innerHTML = e) : t = e;
        var _o2 = function o(i) {
          return !c.blockElements.includes(i.tagName.toLowerCase()) && Array.from(i.children).every(_o2);
        };
        return Array.from(t.children).every(_o2);
      }
    }, {
      key: "getDeepestBlockElements",
      value: function getDeepestBlockElements(e) {
        return c.containsOnlyInlineElements(e) ? [e] : Array.from(e.children).reduce(function (t, o) {
          return [].concat(_toConsumableArray(t), _toConsumableArray(c.getDeepestBlockElements(o)));
        }, []);
      }
    }, {
      key: "getHolder",
      value: function getHolder(e) {
        return Z(e) ? document.getElementById(e) : e;
      }
    }, {
      key: "isAnchor",
      value: function isAnchor(e) {
        return e.tagName.toLowerCase() === "a";
      }
    }, {
      key: "offset",
      value: function offset(e) {
        var t = e.getBoundingClientRect(),
          o = window.pageXOffset || document.documentElement.scrollLeft,
          i = window.pageYOffset || document.documentElement.scrollTop,
          n = t.top + i,
          r = t.left + o;
        return {
          top: n,
          left: r,
          bottom: n + t.height,
          right: r + t.width
        };
      }
    }]);
  }();
  var rt = {
      ui: {
        blockTunes: {
          toggler: {
            "Click to tune": "",
            "or drag to move": ""
          }
        },
        inlineToolbar: {
          converter: {
            "Convert to": ""
          }
        },
        toolbar: {
          toolbox: {
            Add: ""
          }
        },
        popover: {
          Filter: "",
          "Nothing found": ""
        }
      },
      toolNames: {
        Text: "",
        Link: "",
        Bold: "",
        Italic: ""
      },
      tools: {
        link: {
          "Add a link": ""
        },
        stub: {
          "The block can not be displayed correctly.": ""
        }
      },
      blockTunes: {
        delete: {
          Delete: "",
          "Click to delete": ""
        },
        moveUp: {
          "Move up": ""
        },
        moveDown: {
          "Move down": ""
        }
      }
    },
    _re = /*#__PURE__*/function () {
      function re() {
        _classCallCheck(this, re);
      }
      return _createClass(re, null, [{
        key: "ui",
        value: function ui(s, e) {
          return _re._t(s, e);
        }
      }, {
        key: "t",
        value: function t(s, e) {
          return _re._t(s, e);
        }
      }, {
        key: "setDictionary",
        value: function setDictionary(s) {
          _re.currentDictionary = s;
        }
      }, {
        key: "_t",
        value: function _t(s, e) {
          var t = _re.getNamespace(s);
          return !t || !t[e] ? e : t[e];
        }
      }, {
        key: "getNamespace",
        value: function getNamespace(s) {
          return s.split(".").reduce(function (t, o) {
            return !t || !Object.keys(t).length ? {} : t[o];
          }, _re.currentDictionary);
        }
      }]);
    }();
  var H = _re;
  H.currentDictionary = rt;
  var at = /*#__PURE__*/function (_Error) {
    function at() {
      _classCallCheck(this, at);
      return _callSuper(this, at, arguments);
    }
    _inherits(at, _Error);
    return _createClass(at);
  }(/*#__PURE__*/_wrapNativeSuper(Error));
  var ye = /*#__PURE__*/function () {
    function ye() {
      _classCallCheck(this, ye);
      this.subscribers = {};
    }
    return _createClass(ye, [{
      key: "on",
      value: function on(e, t) {
        e in this.subscribers || (this.subscribers[e] = []), this.subscribers[e].push(t);
      }
    }, {
      key: "once",
      value: function once(e, t) {
        var _this2 = this;
        e in this.subscribers || (this.subscribers[e] = []);
        var _o3 = function o(i) {
          var n = t(i),
            r = _this2.subscribers[e].indexOf(_o3);
          return r !== -1 && _this2.subscribers[e].splice(r, 1), n;
        };
        this.subscribers[e].push(_o3);
      }
    }, {
      key: "emit",
      value: function emit(e, t) {
        W(this.subscribers) || !this.subscribers[e] || this.subscribers[e].reduce(function (o, i) {
          var n = i(o);
          return n !== void 0 ? n : o;
        }, t);
      }
    }, {
      key: "off",
      value: function off(e, t) {
        if (this.subscribers[e] === void 0) {
          console.warn("EventDispatcher .off(): there is no subscribers for event \"".concat(e.toString(), "\". Probably, .off() called before .on()"));
          return;
        }
        for (var o = 0; o < this.subscribers[e].length; o++) if (this.subscribers[e][o] === t) {
          delete this.subscribers[e][o];
          break;
        }
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.subscribers = {};
      }
    }]);
  }();
  function te(s) {
    Object.setPrototypeOf(this, {
      get id() {
        return s.id;
      },
      get name() {
        return s.name;
      },
      get config() {
        return s.config;
      },
      get holder() {
        return s.holder;
      },
      get isEmpty() {
        return s.isEmpty;
      },
      get selected() {
        return s.selected;
      },
      set stretched(t) {
        s.stretched = t;
      },
      get stretched() {
        return s.stretched;
      },
      get focusable() {
        return s.focusable;
      },
      call: function call(t, o) {
        return s.call(t, o);
      },
      save: function save() {
        return s.save();
      },
      validate: function validate(t) {
        return s.validate(t);
      },
      dispatchChange: function dispatchChange() {
        s.dispatchChange();
      }
    });
  }
  var Ae = /*#__PURE__*/function () {
    function Ae() {
      _classCallCheck(this, Ae);
      this.allListeners = [];
    }
    return _createClass(Ae, [{
      key: "on",
      value: function on(e, t, o) {
        var i = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
        var n = Yt("l"),
          r = {
            id: n,
            element: e,
            eventType: t,
            handler: o,
            options: i
          };
        if (!this.findOne(e, t, o)) return this.allListeners.push(r), e.addEventListener(t, o, i), n;
      }
    }, {
      key: "off",
      value: function off(e, t, o, i) {
        var _this3 = this;
        var n = this.findAll(e, t, o);
        n.forEach(function (r, a) {
          var l = _this3.allListeners.indexOf(n[a]);
          l > -1 && (_this3.allListeners.splice(l, 1), r.element.removeEventListener(r.eventType, r.handler, r.options));
        });
      }
    }, {
      key: "offById",
      value: function offById(e) {
        var t = this.findById(e);
        t && t.element.removeEventListener(t.eventType, t.handler, t.options);
      }
    }, {
      key: "findOne",
      value: function findOne(e, t, o) {
        var i = this.findAll(e, t, o);
        return i.length > 0 ? i[0] : null;
      }
    }, {
      key: "findAll",
      value: function findAll(e, t, o) {
        var i;
        var n = e ? this.findByEventTarget(e) : [];
        return e && t && o ? i = n.filter(function (r) {
          return r.eventType === t && r.handler === o;
        }) : e && t ? i = n.filter(function (r) {
          return r.eventType === t;
        }) : i = n, i;
      }
    }, {
      key: "removeAll",
      value: function removeAll() {
        this.allListeners.map(function (e) {
          e.element.removeEventListener(e.eventType, e.handler, e.options);
        }), this.allListeners = [];
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.removeAll();
      }
    }, {
      key: "findByEventTarget",
      value: function findByEventTarget(e) {
        return this.allListeners.filter(function (t) {
          if (t.element === e) return t;
        });
      }
    }, {
      key: "findByType",
      value: function findByType(e) {
        return this.allListeners.filter(function (t) {
          if (t.eventType === e) return t;
        });
      }
    }, {
      key: "findByHandler",
      value: function findByHandler(e) {
        return this.allListeners.filter(function (t) {
          if (t.handler === e) return t;
        });
      }
    }, {
      key: "findById",
      value: function findById(e) {
        return this.allListeners.find(function (t) {
          return t.id === e;
        });
      }
    }]);
  }();
  var y = /*#__PURE__*/function () {
    function y(_ref) {
      var _this4 = this;
      var e = _ref.config,
        t = _ref.eventsDispatcher;
      _classCallCheck(this, y);
      if (this.nodes = {}, this.listeners = new Ae(), this.readOnlyMutableListeners = {
        on: function on(o, i, n) {
          var r = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
          _this4.mutableListenerIds.push(_this4.listeners.on(o, i, n, r));
        },
        clearAll: function clearAll() {
          var _iterator = _createForOfIteratorHelper(_this4.mutableListenerIds),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var o = _step.value;
              _this4.listeners.offById(o);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          _this4.mutableListenerIds = [];
        }
      }, this.mutableListenerIds = [], (this instanceof y ? this.constructor : void 0) === y) throw new TypeError("Constructors for abstract class Module are not allowed.");
      this.config = e, this.eventsDispatcher = t;
    }
    return _createClass(y, [{
      key: "state",
      set: function set(e) {
        this.Editor = e;
      }
    }, {
      key: "removeAllNodes",
      value: function removeAllNodes() {
        for (var e in this.nodes) {
          var t = this.nodes[e];
          t instanceof HTMLElement && t.remove();
        }
      }
    }, {
      key: "isRtl",
      get: function get() {
        return this.config.i18n.direction === "rtl";
      }
    }]);
  }();
  var g = /*#__PURE__*/function () {
    function g() {
      _classCallCheck(this, g);
      this.instance = null, this.selection = null, this.savedSelectionRange = null, this.isFakeBackgroundEnabled = !1, this.commandBackground = "backColor", this.commandRemoveFormat = "removeFormat";
    }
    return _createClass(g, [{
      key: "removeFakeBackground",
      value: function removeFakeBackground() {
        this.isFakeBackgroundEnabled && (this.isFakeBackgroundEnabled = !1, document.execCommand(this.commandRemoveFormat));
      }
    }, {
      key: "setFakeBackground",
      value: function setFakeBackground() {
        document.execCommand(this.commandBackground, !1, "#a8d6ff"), this.isFakeBackgroundEnabled = !0;
      }
    }, {
      key: "save",
      value: function save() {
        this.savedSelectionRange = g.range;
      }
    }, {
      key: "restore",
      value: function restore() {
        if (!this.savedSelectionRange) return;
        var e = window.getSelection();
        e.removeAllRanges(), e.addRange(this.savedSelectionRange);
      }
    }, {
      key: "clearSaved",
      value: function clearSaved() {
        this.savedSelectionRange = null;
      }
    }, {
      key: "collapseToEnd",
      value: function collapseToEnd() {
        var e = window.getSelection(),
          t = document.createRange();
        t.selectNodeContents(e.focusNode), t.collapse(!1), e.removeAllRanges(), e.addRange(t);
      }
    }, {
      key: "findParentTag",
      value: function findParentTag(e, t) {
        var o = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
        var i = window.getSelection();
        var n = null;
        return !i || !i.anchorNode || !i.focusNode ? null : ([i.anchorNode, i.focusNode].forEach(function (a) {
          var l = o;
          for (; l > 0 && a.parentNode && !(a.tagName === e && (n = a, t && a.classList && !a.classList.contains(t) && (n = null), n));) a = a.parentNode, l--;
        }), n);
      }
    }, {
      key: "expandToTag",
      value: function expandToTag(e) {
        var t = window.getSelection();
        t.removeAllRanges();
        var o = document.createRange();
        o.selectNodeContents(e), t.addRange(o);
      }
    }], [{
      key: "CSS",
      get: function get() {
        return {
          editorWrapper: "codex-editor",
          editorZone: "codex-editor__redactor"
        };
      }
    }, {
      key: "anchorNode",
      get: function get() {
        var e = window.getSelection();
        return e ? e.anchorNode : null;
      }
    }, {
      key: "anchorElement",
      get: function get() {
        var e = window.getSelection();
        if (!e) return null;
        var t = e.anchorNode;
        return t ? c.isElement(t) ? t : t.parentElement : null;
      }
    }, {
      key: "anchorOffset",
      get: function get() {
        var e = window.getSelection();
        return e ? e.anchorOffset : null;
      }
    }, {
      key: "isCollapsed",
      get: function get() {
        var e = window.getSelection();
        return e ? e.isCollapsed : null;
      }
    }, {
      key: "isAtEditor",
      get: function get() {
        return this.isSelectionAtEditor(g.get());
      }
    }, {
      key: "isSelectionAtEditor",
      value: function isSelectionAtEditor(e) {
        if (!e) return !1;
        var t = e.anchorNode || e.focusNode;
        t && t.nodeType === Node.TEXT_NODE && (t = t.parentNode);
        var o = null;
        return t && t instanceof Element && (o = t.closest(".".concat(g.CSS.editorZone))), o ? o.nodeType === Node.ELEMENT_NODE : !1;
      }
    }, {
      key: "isRangeAtEditor",
      value: function isRangeAtEditor(e) {
        if (!e) return;
        var t = e.startContainer;
        t && t.nodeType === Node.TEXT_NODE && (t = t.parentNode);
        var o = null;
        return t && t instanceof Element && (o = t.closest(".".concat(g.CSS.editorZone))), o ? o.nodeType === Node.ELEMENT_NODE : !1;
      }
    }, {
      key: "isSelectionExists",
      get: function get() {
        return !!g.get().anchorNode;
      }
    }, {
      key: "range",
      get: function get() {
        return this.getRangeFromSelection(this.get());
      }
    }, {
      key: "getRangeFromSelection",
      value: function getRangeFromSelection(e) {
        return e && e.rangeCount ? e.getRangeAt(0) : null;
      }
    }, {
      key: "rect",
      get: function get() {
        var e = document.selection,
          t,
          o = {
            x: 0,
            y: 0,
            width: 0,
            height: 0
          };
        if (e && e.type !== "Control") return e = e, t = e.createRange(), o.x = t.boundingLeft, o.y = t.boundingTop, o.width = t.boundingWidth, o.height = t.boundingHeight, o;
        if (!window.getSelection) return T("Method window.getSelection is not supported", "warn"), o;
        if (e = window.getSelection(), e.rangeCount === null || isNaN(e.rangeCount)) return T("Method SelectionUtils.rangeCount is not supported", "warn"), o;
        if (e.rangeCount === 0) return o;
        if (t = e.getRangeAt(0).cloneRange(), t.getBoundingClientRect && (o = t.getBoundingClientRect()), o.x === 0 && o.y === 0) {
          var i = document.createElement("span");
          if (i.getBoundingClientRect) {
            i.appendChild(document.createTextNode("​")), t.insertNode(i), o = i.getBoundingClientRect();
            var n = i.parentNode;
            n.removeChild(i), n.normalize();
          }
        }
        return o;
      }
    }, {
      key: "text",
      get: function get() {
        return window.getSelection ? window.getSelection().toString() : "";
      }
    }, {
      key: "get",
      value: function get() {
        return window.getSelection();
      }
    }, {
      key: "setCursor",
      value: function setCursor(e) {
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var o = document.createRange(),
          i = window.getSelection();
        return c.isNativeInput(e) ? c.canSetCaret(e) ? (e.focus(), e.selectionStart = e.selectionEnd = t, e.getBoundingClientRect()) : void 0 : (o.setStart(e, t), o.setEnd(e, t), i.removeAllRanges(), i.addRange(o), o.getBoundingClientRect());
      }
    }, {
      key: "isRangeInsideContainer",
      value: function isRangeInsideContainer(e) {
        var t = g.range;
        return t === null ? !1 : e.contains(t.startContainer);
      }
    }, {
      key: "addFakeCursor",
      value: function addFakeCursor() {
        var e = g.range;
        if (e === null) return;
        var t = c.make("span", "codex-editor__fake-cursor");
        t.dataset.mutationFree = "true", e.collapse(), e.insertNode(t);
      }
    }, {
      key: "isFakeCursorInsideContainer",
      value: function isFakeCursorInsideContainer(e) {
        return c.find(e, ".codex-editor__fake-cursor") !== null;
      }
    }, {
      key: "removeFakeCursor",
      value: function removeFakeCursor() {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;
        var t = c.find(e, ".codex-editor__fake-cursor");
        t && t.remove();
      }
    }]);
  }();
  function Xt(s, e) {
    var t = s.type,
      o = s.target,
      i = s.addedNodes,
      n = s.removedNodes;
    if (o === e) return !0;
    if (["characterData", "attributes"].includes(t)) {
      var l = o.nodeType === Node.TEXT_NODE ? o.parentNode : o;
      return e.contains(l);
    }
    var r = Array.from(i).some(function (l) {
        return e.contains(l);
      }),
      a = Array.from(n).some(function (l) {
        return e.contains(l);
      });
    return r || a;
  }
  var _e = "redactor dom changed",
    lt = "block changed",
    ct = "fake cursor is about to be toggled",
    dt = "fake cursor have been set";
  function ht(s, e) {
    return s.mergeable && s.name === e.name;
  }
  function Vt(s, e) {
    var t = e == null ? void 0 : e.export;
    return M(t) ? t(s) : Z(t) ? s[t] : (t !== void 0 && T("Conversion «export» property must be a string or function. String means key of saved data object to export. Function should export processed string to export."), "");
  }
  function qt(s, e) {
    var t = e == null ? void 0 : e.import;
    return M(t) ? t(s) : Z(t) ? _defineProperty({}, t, s) : (t !== void 0 && T("Conversion «import» property must be a string or function. String means key of tool data to import. Function accepts a imported string and return composed tool data."), {});
  }
  var X = function (s) {
    return s.APPEND_CALLBACK = "appendCallback", s.RENDERED = "rendered", s.MOVED = "moved", s.UPDATED = "updated", s.REMOVED = "removed", s.ON_PASTE = "onPaste", s;
  }(X || {});
  var N = /*#__PURE__*/function (_ye) {
    function N(_ref3, a) {
      var _this5;
      var _ref3$id = _ref3.id,
        e = _ref3$id === void 0 ? $t() : _ref3$id,
        t = _ref3.data,
        o = _ref3.tool,
        i = _ref3.api,
        n = _ref3.readOnly,
        r = _ref3.tunesData;
      _classCallCheck(this, N);
      _this5 = _callSuper(this, N), _this5.cachedInputs = [], _this5.toolRenderedElement = null, _this5.tunesInstances = new Map(), _this5.defaultTunesInstances = new Map(), _this5.unavailableTunesData = {}, _this5.inputIndex = 0, _this5.editorEventBus = null, _this5.handleFocus = function () {
        _this5.dropInputsCache(), _this5.updateCurrentInput();
      }, _this5.didMutated = function () {
        var l = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : void 0;
        var d = l === void 0,
          u = l instanceof InputEvent;
        !d && !u && _this5.detectToolRootChange(l);
        var h;
        d || u ? h = !0 : h = !(l.length > 0 && l.every(function (x) {
          var p = x.addedNodes,
            m = x.removedNodes,
            L = x.target;
          return [].concat(_toConsumableArray(Array.from(p)), _toConsumableArray(Array.from(m)), [L]).some(function (S) {
            return c.isElement(S) || (S = S.parentElement), S && S.closest('[data-mutation-free="true"]') !== null;
          });
        })), h && (_this5.dropInputsCache(), _this5.updateCurrentInput(), _this5.call("updated"), _this5.emit("didMutated", _assertThisInitialized(_this5)));
      }, _this5.name = o.name, _this5.id = e, _this5.settings = o.settings, _this5.config = o.settings.config || {}, _this5.api = i, _this5.editorEventBus = a || null, _this5.blockAPI = new te(_assertThisInitialized(_this5)), _this5.tool = o, _this5.toolInstance = o.create(t, _this5.blockAPI, n), _this5.tunes = o.tunes, _this5.composeTunes(r), _this5.holder = _this5.compose(), window.requestIdleCallback(function () {
        _this5.watchBlockMutations(), _this5.addInputEvents();
      });
      return _this5;
    }
    _inherits(N, _ye);
    return _createClass(N, [{
      key: "inputs",
      get: function get() {
        if (this.cachedInputs.length !== 0) return this.cachedInputs;
        var e = c.findAllInputs(this.holder);
        return this.inputIndex > e.length - 1 && (this.inputIndex = e.length - 1), this.cachedInputs = e, e;
      }
    }, {
      key: "currentInput",
      get: function get() {
        return this.inputs[this.inputIndex];
      },
      set: function set(e) {
        var t = this.inputs.findIndex(function (o) {
          return o === e || o.contains(e);
        });
        t !== -1 && (this.inputIndex = t);
      }
    }, {
      key: "firstInput",
      get: function get() {
        return this.inputs[0];
      }
    }, {
      key: "lastInput",
      get: function get() {
        var e = this.inputs;
        return e[e.length - 1];
      }
    }, {
      key: "nextInput",
      get: function get() {
        return this.inputs[this.inputIndex + 1];
      }
    }, {
      key: "previousInput",
      get: function get() {
        return this.inputs[this.inputIndex - 1];
      }
    }, {
      key: "data",
      get: function get() {
        return this.save().then(function (e) {
          return e && !W(e.data) ? e.data : {};
        });
      }
    }, {
      key: "sanitize",
      get: function get() {
        return this.tool.sanitizeConfig;
      }
    }, {
      key: "mergeable",
      get: function get() {
        return M(this.toolInstance.merge);
      }
    }, {
      key: "focusable",
      get: function get() {
        return this.inputs.length !== 0;
      }
    }, {
      key: "isEmpty",
      get: function get() {
        var e = c.isEmpty(this.pluginsContent, "/"),
          t = !this.hasMedia;
        return e && t;
      }
    }, {
      key: "hasMedia",
      get: function get() {
        var e = ["img", "iframe", "video", "audio", "source", "input", "textarea", "twitterwidget"];
        return !!this.holder.querySelector(e.join(","));
      }
    }, {
      key: "selected",
      get: function get() {
        return this.holder.classList.contains(N.CSS.selected);
      },
      set: function set(e) {
        var i, n;
        this.holder.classList.toggle(N.CSS.selected, e);
        var t = e === !0 && g.isRangeInsideContainer(this.holder),
          o = e === !1 && g.isFakeCursorInsideContainer(this.holder);
        (t || o) && ((i = this.editorEventBus) == null || i.emit(ct, {
          state: e
        }), t ? g.addFakeCursor() : g.removeFakeCursor(this.holder), (n = this.editorEventBus) == null || n.emit(dt, {
          state: e
        }));
      }
    }, {
      key: "stretched",
      get: function get() {
        return this.holder.classList.contains(N.CSS.wrapperStretched);
      },
      set: function set(e) {
        this.holder.classList.toggle(N.CSS.wrapperStretched, e);
      }
    }, {
      key: "dropTarget",
      set: function set(e) {
        this.holder.classList.toggle(N.CSS.dropTarget, e);
      }
    }, {
      key: "pluginsContent",
      get: function get() {
        return this.toolRenderedElement;
      }
    }, {
      key: "call",
      value: function call(e, t) {
        if (M(this.toolInstance[e])) {
          e === "appendCallback" && T("`appendCallback` hook is deprecated and will be removed in the next major release. Use `rendered` hook instead", "warn");
          try {
            this.toolInstance[e].call(this.toolInstance, t);
          } catch (o) {
            T("Error during '".concat(e, "' call: ").concat(o.message), "error");
          }
        }
      }
    }, {
      key: "mergeWith",
      value: function () {
        var _mergeWith = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.toolInstance.merge(e);
              case 2:
              case "end":
                return _context.stop();
            }
          }, _callee, this);
        }));
        function mergeWith(_x2) {
          return _mergeWith.apply(this, arguments);
        }
        return mergeWith;
      }()
    }, {
      key: "save",
      value: function () {
        var _save = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var _this6 = this;
          var e, t, o, i;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.toolInstance.save(this.pluginsContent);
              case 2:
                e = _context2.sent;
                t = this.unavailableTunesData;
                [].concat(_toConsumableArray(this.tunesInstances.entries()), _toConsumableArray(this.defaultTunesInstances.entries())).forEach(function (_ref4) {
                  var _ref5 = _slicedToArray(_ref4, 2),
                    n = _ref5[0],
                    r = _ref5[1];
                  if (M(r.save)) try {
                    t[n] = r.save();
                  } catch (a) {
                    T("Tune ".concat(r.constructor.name, " save method throws an Error %o"), "warn", a);
                  }
                });
                o = window.performance.now();
                return _context2.abrupt("return", Promise.resolve(e).then(function (n) {
                  return i = window.performance.now(), {
                    id: _this6.id,
                    tool: _this6.name,
                    data: n,
                    tunes: t,
                    time: i - o
                  };
                }).catch(function (n) {
                  T("Saving process for ".concat(_this6.name, " tool failed due to the ").concat(n), "log", "red");
                }));
              case 7:
              case "end":
                return _context2.stop();
            }
          }, _callee2, this);
        }));
        function save() {
          return _save.apply(this, arguments);
        }
        return save;
      }()
    }, {
      key: "validate",
      value: function () {
        var _validate = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(e) {
          var t;
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                t = !0;
                _context3.t0 = this.toolInstance.validate instanceof Function;
                if (!_context3.t0) {
                  _context3.next = 6;
                  break;
                }
                _context3.next = 5;
                return this.toolInstance.validate(e);
              case 5:
                t = _context3.sent;
              case 6:
                return _context3.abrupt("return", t);
              case 7:
              case "end":
                return _context3.stop();
            }
          }, _callee3, this);
        }));
        function validate(_x3) {
          return _validate.apply(this, arguments);
        }
        return validate;
      }()
    }, {
      key: "getTunes",
      value: function getTunes() {
        var e = document.createElement("div"),
          t = [],
          o = typeof this.toolInstance.renderSettings == "function" ? this.toolInstance.renderSettings() : [],
          i = [].concat(_toConsumableArray(this.tunesInstances.values()), _toConsumableArray(this.defaultTunesInstances.values())).map(function (n) {
            return n.render();
          });
        return [o, i].flat().forEach(function (n) {
          c.isElement(n) ? e.appendChild(n) : Array.isArray(n) ? t.push.apply(t, _toConsumableArray(n)) : t.push(n);
        }), [t, e];
      }
    }, {
      key: "updateCurrentInput",
      value: function updateCurrentInput() {
        this.currentInput = c.isNativeInput(document.activeElement) || !g.anchorNode ? document.activeElement : g.anchorNode;
      }
    }, {
      key: "dispatchChange",
      value: function dispatchChange() {
        this.didMutated();
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.unwatchBlockMutations(), this.removeInputEvents(), _superPropGet(N, "destroy", this, 3)([]), M(this.toolInstance.destroy) && this.toolInstance.destroy();
      }
    }, {
      key: "getActiveToolboxEntry",
      value: function () {
        var _getActiveToolboxEntry = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
          var e, t;
          return _regeneratorRuntime().wrap(function _callee4$(_context4) {
            while (1) switch (_context4.prev = _context4.next) {
              case 0:
                e = this.tool.toolbox;
                if (!(e.length === 1)) {
                  _context4.next = 3;
                  break;
                }
                return _context4.abrupt("return", Promise.resolve(this.tool.toolbox[0]));
              case 3:
                _context4.next = 5;
                return this.data;
              case 5:
                t = _context4.sent;
                return _context4.abrupt("return", e.find(function (i) {
                  return Object.entries(i.data).some(function (_ref6) {
                    var _ref7 = _slicedToArray(_ref6, 2),
                      n = _ref7[0],
                      r = _ref7[1];
                    return t[n] && Kt(t[n], r);
                  });
                }));
              case 7:
              case "end":
                return _context4.stop();
            }
          }, _callee4, this);
        }));
        function getActiveToolboxEntry() {
          return _getActiveToolboxEntry.apply(this, arguments);
        }
        return getActiveToolboxEntry;
      }()
    }, {
      key: "exportDataAsString",
      value: function () {
        var _exportDataAsString = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
          var e;
          return _regeneratorRuntime().wrap(function _callee5$(_context5) {
            while (1) switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.data;
              case 2:
                e = _context5.sent;
                return _context5.abrupt("return", Vt(e, this.tool.conversionConfig));
              case 4:
              case "end":
                return _context5.stop();
            }
          }, _callee5, this);
        }));
        function exportDataAsString() {
          return _exportDataAsString.apply(this, arguments);
        }
        return exportDataAsString;
      }()
    }, {
      key: "compose",
      value: function compose() {
        var e = c.make("div", N.CSS.wrapper),
          t = c.make("div", N.CSS.content),
          o = this.toolInstance.render();
        e.dataset.id = this.id, this.toolRenderedElement = o, t.appendChild(this.toolRenderedElement);
        var i = t;
        return [].concat(_toConsumableArray(this.tunesInstances.values()), _toConsumableArray(this.defaultTunesInstances.values())).forEach(function (n) {
          if (M(n.wrap)) try {
            i = n.wrap(i);
          } catch (r) {
            T("Tune ".concat(n.constructor.name, " wrap method throws an Error %o"), "warn", r);
          }
        }), e.appendChild(i), e;
      }
    }, {
      key: "composeTunes",
      value: function composeTunes(e) {
        var _this7 = this;
        Array.from(this.tunes.values()).forEach(function (t) {
          (t.isInternal ? _this7.defaultTunesInstances : _this7.tunesInstances).set(t.name, t.create(e[t.name], _this7.blockAPI));
        }), Object.entries(e).forEach(function (_ref8) {
          var _ref9 = _slicedToArray(_ref8, 2),
            t = _ref9[0],
            o = _ref9[1];
          _this7.tunesInstances.has(t) || (_this7.unavailableTunesData[t] = o);
        });
      }
    }, {
      key: "addInputEvents",
      value: function addInputEvents() {
        var _this8 = this;
        this.inputs.forEach(function (e) {
          e.addEventListener("focus", _this8.handleFocus), c.isNativeInput(e) && e.addEventListener("input", _this8.didMutated);
        });
      }
    }, {
      key: "removeInputEvents",
      value: function removeInputEvents() {
        var _this9 = this;
        this.inputs.forEach(function (e) {
          e.removeEventListener("focus", _this9.handleFocus), c.isNativeInput(e) && e.removeEventListener("input", _this9.didMutated);
        });
      }
    }, {
      key: "watchBlockMutations",
      value: function watchBlockMutations() {
        var _this10 = this;
        var e;
        this.redactorDomChangedCallback = function (t) {
          var o = t.mutations;
          o.some(function (n) {
            return Xt(n, _this10.toolRenderedElement);
          }) && _this10.didMutated(o);
        }, (e = this.editorEventBus) == null || e.on(_e, this.redactorDomChangedCallback);
      }
    }, {
      key: "unwatchBlockMutations",
      value: function unwatchBlockMutations() {
        var e;
        (e = this.editorEventBus) == null || e.off(_e, this.redactorDomChangedCallback);
      }
    }, {
      key: "detectToolRootChange",
      value: function detectToolRootChange(e) {
        var _this11 = this;
        e.forEach(function (t) {
          if (Array.from(t.removedNodes).includes(_this11.toolRenderedElement)) {
            var i = t.addedNodes[t.addedNodes.length - 1];
            _this11.toolRenderedElement = i;
          }
        });
      }
    }, {
      key: "dropInputsCache",
      value: function dropInputsCache() {
        this.cachedInputs = [];
      }
    }], [{
      key: "CSS",
      get: function get() {
        return {
          wrapper: "ce-block",
          wrapperStretched: "ce-block--stretched",
          content: "ce-block__content",
          selected: "ce-block--selected",
          dropTarget: "ce-block--drop-target"
        };
      }
    }]);
  }(ye);
  var Zt = /*#__PURE__*/function (_y) {
    function Zt() {
      var _this12;
      _classCallCheck(this, Zt);
      _this12 = _callSuper(this, Zt, arguments), _this12.insert = function () {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this12.config.defaultBlock;
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var o = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var i = arguments.length > 3 ? arguments[3] : undefined;
        var n = arguments.length > 4 ? arguments[4] : undefined;
        var r = arguments.length > 5 ? arguments[5] : undefined;
        var a = arguments.length > 6 ? arguments[6] : undefined;
        var l = _this12.Editor.BlockManager.insert({
          id: a,
          tool: e,
          data: t,
          index: i,
          needToFocus: n,
          replace: r
        });
        return new te(l);
      }, _this12.composeBlockData = /*#__PURE__*/function () {
        var _ref10 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(e) {
          var t;
          return _regeneratorRuntime().wrap(function _callee6$(_context6) {
            while (1) switch (_context6.prev = _context6.next) {
              case 0:
                t = _this12.Editor.Tools.blockTools.get(e);
                return _context6.abrupt("return", new N({
                  tool: t,
                  api: _this12.Editor.API,
                  readOnly: !0,
                  data: {},
                  tunesData: {}
                }).data);
              case 2:
              case "end":
                return _context6.stop();
            }
          }, _callee6);
        }));
        return function (_x4) {
          return _ref10.apply(this, arguments);
        };
      }(), _this12.update = /*#__PURE__*/function () {
        var _ref11 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(e, t) {
          var o, i, n;
          return _regeneratorRuntime().wrap(function _callee7$(_context7) {
            while (1) switch (_context7.prev = _context7.next) {
              case 0:
                o = _this12.Editor.BlockManager, i = o.getBlockById(e);
                if (!(i === void 0)) {
                  _context7.next = 3;
                  break;
                }
                throw new Error("Block with id \"".concat(e, "\" not found"));
              case 3:
                _context7.next = 5;
                return o.update(i, t);
              case 5:
                n = _context7.sent;
                return _context7.abrupt("return", new te(n));
              case 7:
              case "end":
                return _context7.stop();
            }
          }, _callee7);
        }));
        return function (_x5, _x6) {
          return _ref11.apply(this, arguments);
        };
      }(), _this12.convert = function (e, t, o) {
        var h, f;
        var _this12$Editor = _this12.Editor,
          i = _this12$Editor.BlockManager,
          n = _this12$Editor.Tools,
          r = i.getBlockById(e);
        if (!r) throw new Error("Block with id \"".concat(e, "\" not found"));
        var a = n.blockTools.get(r.name),
          l = n.blockTools.get(t);
        if (!l) throw new Error("Block Tool with type \"".concat(t, "\" not found"));
        var d = ((h = a == null ? void 0 : a.conversionConfig) == null ? void 0 : h.export) !== void 0,
          u = ((f = l.conversionConfig) == null ? void 0 : f.import) !== void 0;
        if (d && u) i.convert(r, t, o);else {
          var x = [d ? !1 : ne(r.name), u ? !1 : ne(t)].filter(Boolean).join(" and ");
          throw new Error("Conversion from \"".concat(r.name, "\" to \"").concat(t, "\" is not possible. ").concat(x, " tool(s) should provide a \"conversionConfig\""));
        }
      }, _this12.insertMany = function (e) {
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this12.Editor.BlockManager.blocks.length - 1;
        _this12.validateIndex(t);
        var o = e.map(function (_ref12) {
          var i = _ref12.id,
            n = _ref12.type,
            r = _ref12.data;
          return _this12.Editor.BlockManager.composeBlock({
            id: i,
            tool: n || _this12.config.defaultBlock,
            data: r
          });
        });
        return _this12.Editor.BlockManager.insertMany(o, t), o.map(function (i) {
          return new te(i);
        });
      };
      return _this12;
    }
    _inherits(Zt, _y);
    return _createClass(Zt, [{
      key: "methods",
      get: function get() {
        var _this13 = this;
        return {
          clear: function clear() {
            return _this13.clear();
          },
          render: function render(e) {
            return _this13.render(e);
          },
          renderFromHTML: function renderFromHTML(e) {
            return _this13.renderFromHTML(e);
          },
          delete: function _delete(e) {
            return _this13.delete(e);
          },
          swap: function swap(e, t) {
            return _this13.swap(e, t);
          },
          move: function move(e, t) {
            return _this13.move(e, t);
          },
          getBlockByIndex: function getBlockByIndex(e) {
            return _this13.getBlockByIndex(e);
          },
          getById: function getById(e) {
            return _this13.getById(e);
          },
          getCurrentBlockIndex: function getCurrentBlockIndex() {
            return _this13.getCurrentBlockIndex();
          },
          getBlockIndex: function getBlockIndex(e) {
            return _this13.getBlockIndex(e);
          },
          getBlocksCount: function getBlocksCount() {
            return _this13.getBlocksCount();
          },
          stretchBlock: function stretchBlock(e) {
            var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
            return _this13.stretchBlock(e, t);
          },
          insertNewBlock: function insertNewBlock() {
            return _this13.insertNewBlock();
          },
          insert: this.insert,
          insertMany: this.insertMany,
          update: this.update,
          composeBlockData: this.composeBlockData,
          convert: this.convert
        };
      }
    }, {
      key: "getBlocksCount",
      value: function getBlocksCount() {
        return this.Editor.BlockManager.blocks.length;
      }
    }, {
      key: "getCurrentBlockIndex",
      value: function getCurrentBlockIndex() {
        return this.Editor.BlockManager.currentBlockIndex;
      }
    }, {
      key: "getBlockIndex",
      value: function getBlockIndex(e) {
        var t = this.Editor.BlockManager.getBlockById(e);
        if (!t) {
          Y("There is no block with id `" + e + "`", "warn");
          return;
        }
        return this.Editor.BlockManager.getBlockIndex(t);
      }
    }, {
      key: "getBlockByIndex",
      value: function getBlockByIndex(e) {
        var t = this.Editor.BlockManager.getBlockByIndex(e);
        if (t === void 0) {
          Y("There is no block at index `" + e + "`", "warn");
          return;
        }
        return new te(t);
      }
    }, {
      key: "getById",
      value: function getById(e) {
        var t = this.Editor.BlockManager.getBlockById(e);
        return t === void 0 ? (Y("There is no block with id `" + e + "`", "warn"), null) : new te(t);
      }
    }, {
      key: "swap",
      value: function swap(e, t) {
        T("`blocks.swap()` method is deprecated and will be removed in the next major release. Use `block.move()` method instead", "info"), this.Editor.BlockManager.swap(e, t);
      }
    }, {
      key: "move",
      value: function move(e, t) {
        this.Editor.BlockManager.move(e, t);
      }
    }, {
      key: "delete",
      value: function _delete() {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.Editor.BlockManager.currentBlockIndex;
        try {
          var t = this.Editor.BlockManager.getBlockByIndex(e);
          this.Editor.BlockManager.removeBlock(t);
        } catch (t) {
          Y(t, "warn");
          return;
        }
        this.Editor.BlockManager.blocks.length === 0 && this.Editor.BlockManager.insert(), this.Editor.BlockManager.currentBlock && this.Editor.Caret.setToBlock(this.Editor.BlockManager.currentBlock, this.Editor.Caret.positions.END), this.Editor.Toolbar.close();
      }
    }, {
      key: "clear",
      value: function () {
        var _clear = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
          return _regeneratorRuntime().wrap(function _callee8$(_context8) {
            while (1) switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this.Editor.BlockManager.clear(!0);
              case 2:
                this.Editor.InlineToolbar.close();
              case 3:
              case "end":
                return _context8.stop();
            }
          }, _callee8, this);
        }));
        function clear() {
          return _clear.apply(this, arguments);
        }
        return clear;
      }()
    }, {
      key: "render",
      value: function () {
        var _render = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(e) {
          return _regeneratorRuntime().wrap(function _callee9$(_context9) {
            while (1) switch (_context9.prev = _context9.next) {
              case 0:
                if (!(e === void 0 || e.blocks === void 0)) {
                  _context9.next = 2;
                  break;
                }
                throw new Error("Incorrect data passed to the render() method");
              case 2:
                this.Editor.ModificationsObserver.disable();
                _context9.next = 5;
                return this.Editor.BlockManager.clear();
              case 5:
                _context9.next = 7;
                return this.Editor.Renderer.render(e.blocks);
              case 7:
                this.Editor.ModificationsObserver.enable();
              case 8:
              case "end":
                return _context9.stop();
            }
          }, _callee9, this);
        }));
        function render(_x7) {
          return _render.apply(this, arguments);
        }
        return render;
      }()
    }, {
      key: "renderFromHTML",
      value: function renderFromHTML(e) {
        return this.Editor.BlockManager.clear(), this.Editor.Paste.processText(e, !0);
      }
    }, {
      key: "stretchBlock",
      value: function stretchBlock(e) {
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
        Le(!0, "blocks.stretchBlock()", "BlockAPI");
        var o = this.Editor.BlockManager.getBlockByIndex(e);
        o && (o.stretched = t);
      }
    }, {
      key: "insertNewBlock",
      value: function insertNewBlock() {
        T("Method blocks.insertNewBlock() is deprecated and it will be removed in the next major release. Use blocks.insert() instead.", "warn"), this.insert();
      }
    }, {
      key: "validateIndex",
      value: function validateIndex(e) {
        if (typeof e != "number") throw new Error("Index should be a number");
        if (e < 0) throw new Error("Index should be greater than or equal to 0");
        if (e === null) throw new Error("Index should be greater than or equal to 0");
      }
    }]);
  }(y);
  var Gt = /*#__PURE__*/function (_y2) {
    function Gt() {
      var _this14;
      _classCallCheck(this, Gt);
      _this14 = _callSuper(this, Gt, arguments), _this14.setToFirstBlock = function () {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this14.Editor.Caret.positions.DEFAULT;
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        return _this14.Editor.BlockManager.firstBlock ? (_this14.Editor.Caret.setToBlock(_this14.Editor.BlockManager.firstBlock, e, t), !0) : !1;
      }, _this14.setToLastBlock = function () {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this14.Editor.Caret.positions.DEFAULT;
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        return _this14.Editor.BlockManager.lastBlock ? (_this14.Editor.Caret.setToBlock(_this14.Editor.BlockManager.lastBlock, e, t), !0) : !1;
      }, _this14.setToPreviousBlock = function () {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this14.Editor.Caret.positions.DEFAULT;
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        return _this14.Editor.BlockManager.previousBlock ? (_this14.Editor.Caret.setToBlock(_this14.Editor.BlockManager.previousBlock, e, t), !0) : !1;
      }, _this14.setToNextBlock = function () {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this14.Editor.Caret.positions.DEFAULT;
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        return _this14.Editor.BlockManager.nextBlock ? (_this14.Editor.Caret.setToBlock(_this14.Editor.BlockManager.nextBlock, e, t), !0) : !1;
      }, _this14.setToBlock = function (e) {
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this14.Editor.Caret.positions.DEFAULT;
        var o = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        return _this14.Editor.BlockManager.blocks[e] ? (_this14.Editor.Caret.setToBlock(_this14.Editor.BlockManager.blocks[e], t, o), !0) : !1;
      }, _this14.focus = function () {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
        return e ? _this14.setToLastBlock(_this14.Editor.Caret.positions.END) : _this14.setToFirstBlock(_this14.Editor.Caret.positions.START);
      };
      return _this14;
    }
    _inherits(Gt, _y2);
    return _createClass(Gt, [{
      key: "methods",
      get: function get() {
        return {
          setToFirstBlock: this.setToFirstBlock,
          setToLastBlock: this.setToLastBlock,
          setToPreviousBlock: this.setToPreviousBlock,
          setToNextBlock: this.setToNextBlock,
          setToBlock: this.setToBlock,
          focus: this.focus
        };
      }
    }]);
  }(y);
  var Jt = /*#__PURE__*/function (_y3) {
    function Jt() {
      _classCallCheck(this, Jt);
      return _callSuper(this, Jt, arguments);
    }
    _inherits(Jt, _y3);
    return _createClass(Jt, [{
      key: "methods",
      get: function get() {
        var _this15 = this;
        return {
          emit: function emit(e, t) {
            return _this15.emit(e, t);
          },
          off: function off(e, t) {
            return _this15.off(e, t);
          },
          on: function on(e, t) {
            return _this15.on(e, t);
          }
        };
      }
    }, {
      key: "on",
      value: function on(e, t) {
        this.eventsDispatcher.on(e, t);
      }
    }, {
      key: "emit",
      value: function emit(e, t) {
        this.eventsDispatcher.emit(e, t);
      }
    }, {
      key: "off",
      value: function off(e, t) {
        this.eventsDispatcher.off(e, t);
      }
    }]);
  }(y);
  var Oe = /*#__PURE__*/function (_y4) {
    function Oe() {
      _classCallCheck(this, Oe);
      return _callSuper(this, Oe, arguments);
    }
    _inherits(Oe, _y4);
    return _createClass(Oe, [{
      key: "methods",
      get: function get() {
        return {
          t: function t() {
            Y("I18n.t() method can be accessed only from Tools", "warn");
          }
        };
      }
    }, {
      key: "getMethodsForTool",
      value: function getMethodsForTool(e) {
        return Object.assign(this.methods, {
          t: function t(_t2) {
            return H.t(Oe.getNamespace(e), _t2);
          }
        });
      }
    }], [{
      key: "getNamespace",
      value: function getNamespace(e) {
        return e.isTune() ? "blockTunes.".concat(e.name) : "tools.".concat(e.name);
      }
    }]);
  }(y);
  var Qt = /*#__PURE__*/function (_y5) {
    function Qt() {
      _classCallCheck(this, Qt);
      return _callSuper(this, Qt, arguments);
    }
    _inherits(Qt, _y5);
    return _createClass(Qt, [{
      key: "methods",
      get: function get() {
        return {
          blocks: this.Editor.BlocksAPI.methods,
          caret: this.Editor.CaretAPI.methods,
          events: this.Editor.EventsAPI.methods,
          listeners: this.Editor.ListenersAPI.methods,
          notifier: this.Editor.NotifierAPI.methods,
          sanitizer: this.Editor.SanitizerAPI.methods,
          saver: this.Editor.SaverAPI.methods,
          selection: this.Editor.SelectionAPI.methods,
          styles: this.Editor.StylesAPI.classes,
          toolbar: this.Editor.ToolbarAPI.methods,
          inlineToolbar: this.Editor.InlineToolbarAPI.methods,
          tooltip: this.Editor.TooltipAPI.methods,
          i18n: this.Editor.I18nAPI.methods,
          readOnly: this.Editor.ReadOnlyAPI.methods,
          ui: this.Editor.UiAPI.methods
        };
      }
    }, {
      key: "getMethodsForTool",
      value: function getMethodsForTool(e) {
        return Object.assign(this.methods, {
          i18n: this.Editor.I18nAPI.getMethodsForTool(e)
        });
      }
    }]);
  }(y);
  var eo = /*#__PURE__*/function (_y6) {
    function eo() {
      _classCallCheck(this, eo);
      return _callSuper(this, eo, arguments);
    }
    _inherits(eo, _y6);
    return _createClass(eo, [{
      key: "methods",
      get: function get() {
        var _this16 = this;
        return {
          close: function close() {
            return _this16.close();
          },
          open: function open() {
            return _this16.open();
          }
        };
      }
    }, {
      key: "open",
      value: function open() {
        this.Editor.InlineToolbar.tryToShow();
      }
    }, {
      key: "close",
      value: function close() {
        this.Editor.InlineToolbar.close();
      }
    }]);
  }(y);
  var to = /*#__PURE__*/function (_y7) {
    function to() {
      _classCallCheck(this, to);
      return _callSuper(this, to, arguments);
    }
    _inherits(to, _y7);
    return _createClass(to, [{
      key: "methods",
      get: function get() {
        var _this17 = this;
        return {
          on: function on(e, t, o, i) {
            return _this17.on(e, t, o, i);
          },
          off: function off(e, t, o, i) {
            return _this17.off(e, t, o, i);
          },
          offById: function offById(e) {
            return _this17.offById(e);
          }
        };
      }
    }, {
      key: "on",
      value: function on(e, t, o, i) {
        return this.listeners.on(e, t, o, i);
      }
    }, {
      key: "off",
      value: function off(e, t, o, i) {
        this.listeners.off(e, t, o, i);
      }
    }, {
      key: "offById",
      value: function offById(e) {
        this.listeners.offById(e);
      }
    }]);
  }(y);
  var Ne = {},
    oo = {
      get exports() {
        return Ne;
      },
      set exports(s) {
        Ne = s;
      }
    };
  (function (s, e) {
    (function (t, o) {
      s.exports = o();
    })(window, function () {
      return function (t) {
        var o = {};
        function i(n) {
          if (o[n]) return o[n].exports;
          var r = o[n] = {
            i: n,
            l: !1,
            exports: {}
          };
          return t[n].call(r.exports, r, r.exports, i), r.l = !0, r.exports;
        }
        return i.m = t, i.c = o, i.d = function (n, r, a) {
          i.o(n, r) || Object.defineProperty(n, r, {
            enumerable: !0,
            get: a
          });
        }, i.r = function (n) {
          (typeof Symbol === "undefined" ? "undefined" : _typeof(Symbol)) < "u" && Symbol.toStringTag && Object.defineProperty(n, Symbol.toStringTag, {
            value: "Module"
          }), Object.defineProperty(n, "__esModule", {
            value: !0
          });
        }, i.t = function (n, r) {
          if (1 & r && (n = i(n)), 8 & r || 4 & r && _typeof(n) == "object" && n && n.__esModule) return n;
          var a = Object.create(null);
          if (i.r(a), Object.defineProperty(a, "default", {
            enumerable: !0,
            value: n
          }), 2 & r && typeof n != "string") for (var l in n) i.d(a, l, function (d) {
            return n[d];
          }.bind(null, l));
          return a;
        }, i.n = function (n) {
          var r = n && n.__esModule ? function () {
            return n.default;
          } : function () {
            return n;
          };
          return i.d(r, "a", r), r;
        }, i.o = function (n, r) {
          return Object.prototype.hasOwnProperty.call(n, r);
        }, i.p = "/", i(i.s = 0);
      }([function (t, o, i) {
        i(1), t.exports = function () {
          var n = i(6),
            r = "cdx-notify--bounce-in",
            a = null;
          return {
            show: function show(l) {
              if (l.message) {
                (function () {
                  if (a) return !0;
                  a = n.getWrapper(), document.body.appendChild(a);
                })();
                var d = null,
                  u = l.time || 8e3;
                switch (l.type) {
                  case "confirm":
                    d = n.confirm(l);
                    break;
                  case "prompt":
                    d = n.prompt(l);
                    break;
                  default:
                    d = n.alert(l), window.setTimeout(function () {
                      d.remove();
                    }, u);
                }
                a.appendChild(d), d.classList.add(r);
              }
            }
          };
        }();
      }, function (t, o, i) {
        var n = i(2);
        typeof n == "string" && (n = [[t.i, n, ""]]);
        var r = {
          hmr: !0,
          transform: void 0,
          insertInto: void 0
        };
        i(4)(n, r), n.locals && (t.exports = n.locals);
      }, function (t, o, i) {
        (t.exports = i(3)(!1)).push([t.i, ".cdx-notify--error{background:#fffbfb!important}.cdx-notify--error::before{background:#fb5d5d!important}.cdx-notify__input{max-width:130px;padding:5px 10px;background:#f7f7f7;border:0;border-radius:3px;font-size:13px;color:#656b7c;outline:0}.cdx-notify__input:-ms-input-placeholder{color:#656b7c}.cdx-notify__input::placeholder{color:#656b7c}.cdx-notify__input:focus:-ms-input-placeholder{color:rgba(101,107,124,.3)}.cdx-notify__input:focus::placeholder{color:rgba(101,107,124,.3)}.cdx-notify__button{border:none;border-radius:3px;font-size:13px;padding:5px 10px;cursor:pointer}.cdx-notify__button:last-child{margin-left:10px}.cdx-notify__button--cancel{background:#f2f5f7;box-shadow:0 2px 1px 0 rgba(16,19,29,0);color:#656b7c}.cdx-notify__button--cancel:hover{background:#eee}.cdx-notify__button--confirm{background:#34c992;box-shadow:0 1px 1px 0 rgba(18,49,35,.05);color:#fff}.cdx-notify__button--confirm:hover{background:#33b082}.cdx-notify__btns-wrapper{display:-ms-flexbox;display:flex;-ms-flex-flow:row nowrap;flex-flow:row nowrap;margin-top:5px}.cdx-notify__cross{position:absolute;top:5px;right:5px;width:10px;height:10px;padding:5px;opacity:.54;cursor:pointer}.cdx-notify__cross::after,.cdx-notify__cross::before{content:'';position:absolute;left:9px;top:5px;height:12px;width:2px;background:#575d67}.cdx-notify__cross::before{transform:rotate(-45deg)}.cdx-notify__cross::after{transform:rotate(45deg)}.cdx-notify__cross:hover{opacity:1}.cdx-notifies{position:fixed;z-index:2;bottom:20px;left:20px;font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Oxygen,Ubuntu,Cantarell,\"Fira Sans\",\"Droid Sans\",\"Helvetica Neue\",sans-serif}.cdx-notify{position:relative;width:220px;margin-top:15px;padding:13px 16px;background:#fff;box-shadow:0 11px 17px 0 rgba(23,32,61,.13);border-radius:5px;font-size:14px;line-height:1.4em;word-wrap:break-word}.cdx-notify::before{content:'';position:absolute;display:block;top:0;left:0;width:3px;height:calc(100% - 6px);margin:3px;border-radius:5px;background:0 0}@keyframes bounceIn{0%{opacity:0;transform:scale(.3)}50%{opacity:1;transform:scale(1.05)}70%{transform:scale(.9)}100%{transform:scale(1)}}.cdx-notify--bounce-in{animation-name:bounceIn;animation-duration:.6s;animation-iteration-count:1}.cdx-notify--success{background:#fafffe!important}.cdx-notify--success::before{background:#41ffb1!important}", ""]);
      }, function (t, o) {
        t.exports = function (i) {
          var n = [];
          return n.toString = function () {
            return this.map(function (r) {
              var a = function (l, d) {
                var u = l[1] || "",
                  h = l[3];
                if (!h) return u;
                if (d && typeof btoa == "function") {
                  var f = (p = h, "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(p)))) + " */"),
                    x = h.sources.map(function (m) {
                      return "/*# sourceURL=" + h.sourceRoot + m + " */";
                    });
                  return [u].concat(x).concat([f]).join("\n");
                }
                var p;
                return [u].join("\n");
              }(r, i);
              return r[2] ? "@media " + r[2] + "{" + a + "}" : a;
            }).join("");
          }, n.i = function (r, a) {
            typeof r == "string" && (r = [[null, r, ""]]);
            for (var l = {}, d = 0; d < this.length; d++) {
              var u = this[d][0];
              typeof u == "number" && (l[u] = !0);
            }
            for (d = 0; d < r.length; d++) {
              var h = r[d];
              typeof h[0] == "number" && l[h[0]] || (a && !h[2] ? h[2] = a : a && (h[2] = "(" + h[2] + ") and (" + a + ")"), n.push(h));
            }
          }, n;
        };
      }, function (t, o, i) {
        var n,
          r,
          a = {},
          l = (n = function n() {
            return window && document && document.all && !window.atob;
          }, function () {
            return r === void 0 && (r = n.apply(this, arguments)), r;
          }),
          d = function (v) {
            var b = {};
            return function (w) {
              if (typeof w == "function") return w();
              if (b[w] === void 0) {
                var E = function (I) {
                  return document.querySelector(I);
                }.call(this, w);
                if (window.HTMLIFrameElement && E instanceof window.HTMLIFrameElement) try {
                  E = E.contentDocument.head;
                } catch (_unused3) {
                  E = null;
                }
                b[w] = E;
              }
              return b[w];
            };
          }(),
          u = null,
          h = 0,
          f = [],
          x = i(5);
        function p(v, b) {
          for (var w = 0; w < v.length; w++) {
            var E = v[w],
              I = a[E.id];
            if (I) {
              I.refs++;
              for (var C = 0; C < I.parts.length; C++) I.parts[C](E.parts[C]);
              for (; C < E.parts.length; C++) I.parts.push(z(E.parts[C], b));
            } else {
              var D = [];
              for (C = 0; C < E.parts.length; C++) D.push(z(E.parts[C], b));
              a[E.id] = {
                id: E.id,
                refs: 1,
                parts: D
              };
            }
          }
        }
        function m(v, b) {
          for (var w = [], E = {}, I = 0; I < v.length; I++) {
            var C = v[I],
              D = b.base ? C[0] + b.base : C[0],
              B = {
                css: C[1],
                media: C[2],
                sourceMap: C[3]
              };
            E[D] ? E[D].parts.push(B) : w.push(E[D] = {
              id: D,
              parts: [B]
            });
          }
          return w;
        }
        function L(v, b) {
          var w = d(v.insertInto);
          if (!w) throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
          var E = f[f.length - 1];
          if (v.insertAt === "top") E ? E.nextSibling ? w.insertBefore(b, E.nextSibling) : w.appendChild(b) : w.insertBefore(b, w.firstChild), f.push(b);else if (v.insertAt === "bottom") w.appendChild(b);else {
            if (_typeof(v.insertAt) != "object" || !v.insertAt.before) throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
            var I = d(v.insertInto + " " + v.insertAt.before);
            w.insertBefore(b, I);
          }
        }
        function _(v) {
          if (v.parentNode === null) return !1;
          v.parentNode.removeChild(v);
          var b = f.indexOf(v);
          b >= 0 && f.splice(b, 1);
        }
        function S(v) {
          var b = document.createElement("style");
          return v.attrs.type === void 0 && (v.attrs.type = "text/css"), G(b, v.attrs), L(v, b), b;
        }
        function G(v, b) {
          Object.keys(b).forEach(function (w) {
            v.setAttribute(w, b[w]);
          });
        }
        function z(v, b) {
          var w, E, I, C;
          if (b.transform && v.css) {
            if (!(C = b.transform(v.css))) return function () {};
            v.css = C;
          }
          if (b.singleton) {
            var D = h++;
            w = u || (u = S(b)), E = ke.bind(null, w, D, !1), I = ke.bind(null, w, D, !0);
          } else v.sourceMap && typeof URL == "function" && typeof URL.createObjectURL == "function" && typeof URL.revokeObjectURL == "function" && typeof Blob == "function" && typeof btoa == "function" ? (w = function (B) {
            var $ = document.createElement("link");
            return B.attrs.type === void 0 && (B.attrs.type = "text/css"), B.attrs.rel = "stylesheet", G($, B.attrs), L(B, $), $;
          }(b), E = function (B, $, ve) {
            var ie = ve.css,
              Ge = ve.sourceMap,
              vi = $.convertToAbsoluteUrls === void 0 && Ge;
            ($.convertToAbsoluteUrls || vi) && (ie = x(ie)), Ge && (ie += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(Ge)))) + " */");
            var xi = new Blob([ie], {
                type: "text/css"
              }),
              Ot = B.href;
            B.href = URL.createObjectURL(xi), Ot && URL.revokeObjectURL(Ot);
          }.bind(null, w, b), I = function I() {
            _(w), w.href && URL.revokeObjectURL(w.href);
          }) : (w = S(b), E = function (B, $) {
            var ve = $.css,
              ie = $.media;
            if (ie && B.setAttribute("media", ie), B.styleSheet) B.styleSheet.cssText = ve;else {
              for (; B.firstChild;) B.removeChild(B.firstChild);
              B.appendChild(document.createTextNode(ve));
            }
          }.bind(null, w), I = function I() {
            _(w);
          });
          return E(v), function (B) {
            if (B) {
              if (B.css === v.css && B.media === v.media && B.sourceMap === v.sourceMap) return;
              E(v = B);
            } else I();
          };
        }
        t.exports = function (v, b) {
          if ((typeof DEBUG === "undefined" ? "undefined" : _typeof(DEBUG)) < "u" && DEBUG && (typeof document === "undefined" ? "undefined" : _typeof(document)) != "object") throw new Error("The style-loader cannot be used in a non-browser environment");
          (b = b || {}).attrs = _typeof(b.attrs) == "object" ? b.attrs : {}, b.singleton || typeof b.singleton == "boolean" || (b.singleton = l()), b.insertInto || (b.insertInto = "head"), b.insertAt || (b.insertAt = "bottom");
          var w = m(v, b);
          return p(w, b), function (E) {
            for (var I = [], C = 0; C < w.length; C++) {
              var D = w[C];
              (B = a[D.id]).refs--, I.push(B);
            }
            for (E && p(m(E, b), b), C = 0; C < I.length; C++) {
              var B;
              if ((B = I[C]).refs === 0) {
                for (var $ = 0; $ < B.parts.length; $++) B.parts[$]();
                delete a[B.id];
              }
            }
          };
        };
        var j,
          oe = (j = [], function (v, b) {
            return j[v] = b, j.filter(Boolean).join("\n");
          });
        function ke(v, b, w, E) {
          var I = w ? "" : E.css;
          if (v.styleSheet) v.styleSheet.cssText = oe(b, I);else {
            var C = document.createTextNode(I),
              D = v.childNodes;
            D[b] && v.removeChild(D[b]), D.length ? v.insertBefore(C, D[b]) : v.appendChild(C);
          }
        }
      }, function (t, o) {
        t.exports = function (i) {
          var n = (typeof window === "undefined" ? "undefined" : _typeof(window)) < "u" && window.location;
          if (!n) throw new Error("fixUrls requires window.location");
          if (!i || typeof i != "string") return i;
          var r = n.protocol + "//" + n.host,
            a = r + n.pathname.replace(/\/[^\/]*$/, "/");
          return i.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (l, d) {
            var u,
              h = d.trim().replace(/^"(.*)"$/, function (f, x) {
                return x;
              }).replace(/^'(.*)'$/, function (f, x) {
                return x;
              });
            return /^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(h) ? l : (u = h.indexOf("//") === 0 ? h : h.indexOf("/") === 0 ? r + h : a + h.replace(/^\.\//, ""), "url(" + JSON.stringify(u) + ")");
          });
        };
      }, function (t, o, i) {
        var n, r, a, l, d, u, h, f, x;
        t.exports = (n = "cdx-notifies", r = "cdx-notify", a = "cdx-notify__cross", l = "cdx-notify__button--confirm", d = "cdx-notify__button--cancel", u = "cdx-notify__input", h = "cdx-notify__button", f = "cdx-notify__btns-wrapper", {
          alert: x = function x(p) {
            var m = document.createElement("DIV"),
              L = document.createElement("DIV"),
              _ = p.message,
              S = p.style;
            return m.classList.add(r), S && m.classList.add(r + "--" + S), m.innerHTML = _, L.classList.add(a), L.addEventListener("click", m.remove.bind(m)), m.appendChild(L), m;
          },
          confirm: function confirm(p) {
            var m = x(p),
              L = document.createElement("div"),
              _ = document.createElement("button"),
              S = document.createElement("button"),
              G = m.querySelector("." + a),
              z = p.cancelHandler,
              j = p.okHandler;
            return L.classList.add(f), _.innerHTML = p.okText || "Confirm", S.innerHTML = p.cancelText || "Cancel", _.classList.add(h), S.classList.add(h), _.classList.add(l), S.classList.add(d), z && typeof z == "function" && (S.addEventListener("click", z), G.addEventListener("click", z)), j && typeof j == "function" && _.addEventListener("click", j), _.addEventListener("click", m.remove.bind(m)), S.addEventListener("click", m.remove.bind(m)), L.appendChild(_), L.appendChild(S), m.appendChild(L), m;
          },
          prompt: function prompt(p) {
            var m = x(p),
              L = document.createElement("div"),
              _ = document.createElement("button"),
              S = document.createElement("input"),
              G = m.querySelector("." + a),
              z = p.cancelHandler,
              j = p.okHandler;
            return L.classList.add(f), _.innerHTML = p.okText || "Ok", _.classList.add(h), _.classList.add(l), S.classList.add(u), p.placeholder && S.setAttribute("placeholder", p.placeholder), p.default && (S.value = p.default), p.inputType && (S.type = p.inputType), z && typeof z == "function" && G.addEventListener("click", z), j && typeof j == "function" && _.addEventListener("click", function () {
              j(S.value);
            }), _.addEventListener("click", m.remove.bind(m)), L.appendChild(S), L.appendChild(_), m.appendChild(L), m;
          },
          getWrapper: function getWrapper() {
            var p = document.createElement("DIV");
            return p.classList.add(n), p;
          }
        });
      }]);
    });
  })(oo);
  var io = J(Ne);
  var no = /*#__PURE__*/function () {
    function no() {
      _classCallCheck(this, no);
    }
    return _createClass(no, [{
      key: "show",
      value: function show(e) {
        io.show(e);
      }
    }]);
  }();
  var so = /*#__PURE__*/function (_y8) {
    function so(_ref13) {
      var _this18;
      var e = _ref13.config,
        t = _ref13.eventsDispatcher;
      _classCallCheck(this, so);
      _this18 = _callSuper(this, so, [{
        config: e,
        eventsDispatcher: t
      }]), _this18.notifier = new no();
      return _this18;
    }
    _inherits(so, _y8);
    return _createClass(so, [{
      key: "methods",
      get: function get() {
        var _this19 = this;
        return {
          show: function show(e) {
            return _this19.show(e);
          }
        };
      }
    }, {
      key: "show",
      value: function show(e) {
        return this.notifier.show(e);
      }
    }]);
  }(y);
  var ro = /*#__PURE__*/function (_y9) {
    function ro() {
      _classCallCheck(this, ro);
      return _callSuper(this, ro, arguments);
    }
    _inherits(ro, _y9);
    return _createClass(ro, [{
      key: "methods",
      get: function get() {
        var _this20 = this;
        var e = function e() {
          return _this20.isEnabled;
        };
        return {
          toggle: function toggle(t) {
            return _this20.toggle(t);
          },
          get isEnabled() {
            return e();
          }
        };
      }
    }, {
      key: "toggle",
      value: function toggle(e) {
        return this.Editor.ReadOnly.toggle(e);
      }
    }, {
      key: "isEnabled",
      get: function get() {
        return this.Editor.ReadOnly.isEnabled;
      }
    }]);
  }(y);
  var Re = {},
    ao = {
      get exports() {
        return Re;
      },
      set exports(s) {
        Re = s;
      }
    };
  (function (s, e) {
    (function (t, o) {
      s.exports = o();
    })(de, function () {
      function t(h) {
        var f = h.tags,
          x = Object.keys(f),
          p = x.map(function (m) {
            return _typeof(f[m]);
          }).every(function (m) {
            return m === "object" || m === "boolean" || m === "function";
          });
        if (!p) throw new Error("The configuration was invalid");
        this.config = h;
      }
      var o = ["P", "LI", "TD", "TH", "DIV", "H1", "H2", "H3", "H4", "H5", "H6", "PRE"];
      function i(h) {
        return o.indexOf(h.nodeName) !== -1;
      }
      var n = ["A", "B", "STRONG", "I", "EM", "SUB", "SUP", "U", "STRIKE"];
      function r(h) {
        return n.indexOf(h.nodeName) !== -1;
      }
      t.prototype.clean = function (h) {
        var f = document.implementation.createHTMLDocument(),
          x = f.createElement("div");
        return x.innerHTML = h, this._sanitize(f, x), x.innerHTML;
      }, t.prototype._sanitize = function (h, f) {
        var x = a(h, f),
          p = x.firstChild();
        if (p) do {
          if (p.nodeType === Node.TEXT_NODE) if (p.data.trim() === "" && (p.previousElementSibling && i(p.previousElementSibling) || p.nextElementSibling && i(p.nextElementSibling))) {
            f.removeChild(p), this._sanitize(h, f);
            break;
          } else continue;
          if (p.nodeType === Node.COMMENT_NODE) {
            f.removeChild(p), this._sanitize(h, f);
            break;
          }
          var m = r(p),
            L;
          m && (L = Array.prototype.some.call(p.childNodes, i));
          var _ = !!f.parentNode,
            S = i(f) && i(p) && _,
            G = p.nodeName.toLowerCase(),
            z = l(this.config, G, p),
            j = m && L;
          if (j || d(p, z) || !this.config.keepNestedBlockElements && S) {
            if (!(p.nodeName === "SCRIPT" || p.nodeName === "STYLE")) for (; p.childNodes.length > 0;) f.insertBefore(p.childNodes[0], p);
            f.removeChild(p), this._sanitize(h, f);
            break;
          }
          for (var oe = 0; oe < p.attributes.length; oe += 1) {
            var ke = p.attributes[oe];
            u(ke, z, p) && (p.removeAttribute(ke.name), oe = oe - 1);
          }
          this._sanitize(h, p);
        } while (p = x.nextSibling());
      };
      function a(h, f) {
        return h.createTreeWalker(f, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT, null, !1);
      }
      function l(h, f, x) {
        return typeof h.tags[f] == "function" ? h.tags[f](x) : h.tags[f];
      }
      function d(h, f) {
        return _typeof(f) > "u" ? !0 : typeof f == "boolean" ? !f : !1;
      }
      function u(h, f, x) {
        var p = h.name.toLowerCase();
        return f === !0 ? !1 : typeof f[p] == "function" ? !f[p](h.value, x) : _typeof(f[p]) > "u" || f[p] === !1 ? !0 : typeof f[p] == "string" ? f[p] !== h.value : !1;
      }
      return t;
    });
  })(ao);
  var lo = Re;
  function ut(s, e) {
    return s.map(function (t) {
      var o = M(e) ? e(t.tool) : e;
      return W(o) || (t.data = De(t.data, o)), t;
    });
  }
  function V(s) {
    var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var t = {
      tags: e
    };
    return new lo(t).clean(s);
  }
  function De(s, e) {
    return Array.isArray(s) ? co(s, e) : O(s) ? ho(s, e) : Z(s) ? uo(s, e) : s;
  }
  function co(s, e) {
    return s.map(function (t) {
      return De(t, e);
    });
  }
  function ho(s, e) {
    var t = {};
    for (var o in s) {
      if (!Object.prototype.hasOwnProperty.call(s, o)) continue;
      var i = s[o],
        n = po(e[o]) ? e[o] : e;
      t[o] = De(i, n);
    }
    return t;
  }
  function uo(s, e) {
    return O(e) ? V(s, e) : e === !1 ? V(s, {}) : s;
  }
  function po(s) {
    return O(s) || Pt(s) || M(s);
  }
  var fo = /*#__PURE__*/function (_y10) {
    function fo() {
      _classCallCheck(this, fo);
      return _callSuper(this, fo, arguments);
    }
    _inherits(fo, _y10);
    return _createClass(fo, [{
      key: "methods",
      get: function get() {
        var _this21 = this;
        return {
          clean: function clean(e, t) {
            return _this21.clean(e, t);
          }
        };
      }
    }, {
      key: "clean",
      value: function clean(e, t) {
        return V(e, t);
      }
    }]);
  }(y);
  var go = /*#__PURE__*/function (_y11) {
    function go() {
      _classCallCheck(this, go);
      return _callSuper(this, go, arguments);
    }
    _inherits(go, _y11);
    return _createClass(go, [{
      key: "methods",
      get: function get() {
        var _this22 = this;
        return {
          save: function save() {
            return _this22.save();
          }
        };
      }
    }, {
      key: "save",
      value: function save() {
        var e = "Editor's content can not be saved in read-only mode";
        return this.Editor.ReadOnly.isEnabled ? (Y(e, "warn"), Promise.reject(new Error(e))) : this.Editor.Saver.save();
      }
    }]);
  }(y);
  var bo = /*#__PURE__*/function (_y12) {
    function bo() {
      _classCallCheck(this, bo);
      return _callSuper(this, bo, arguments);
    }
    _inherits(bo, _y12);
    return _createClass(bo, [{
      key: "methods",
      get: function get() {
        var _this23 = this;
        return {
          findParentTag: function findParentTag(e, t) {
            return _this23.findParentTag(e, t);
          },
          expandToTag: function expandToTag(e) {
            return _this23.expandToTag(e);
          }
        };
      }
    }, {
      key: "findParentTag",
      value: function findParentTag(e, t) {
        return new g().findParentTag(e, t);
      }
    }, {
      key: "expandToTag",
      value: function expandToTag(e) {
        new g().expandToTag(e);
      }
    }]);
  }(y);
  var mo = /*#__PURE__*/function (_y13) {
    function mo() {
      _classCallCheck(this, mo);
      return _callSuper(this, mo, arguments);
    }
    _inherits(mo, _y13);
    return _createClass(mo, [{
      key: "classes",
      get: function get() {
        return {
          block: "cdx-block",
          inlineToolButton: "ce-inline-tool",
          inlineToolButtonActive: "ce-inline-tool--active",
          input: "cdx-input",
          loader: "cdx-loader",
          button: "cdx-button",
          settingsButton: "cdx-settings-button",
          settingsButtonActive: "cdx-settings-button--active"
        };
      }
    }]);
  }(y);
  var ko = /*#__PURE__*/function (_y14) {
    function ko() {
      _classCallCheck(this, ko);
      return _callSuper(this, ko, arguments);
    }
    _inherits(ko, _y14);
    return _createClass(ko, [{
      key: "methods",
      get: function get() {
        var _this24 = this;
        return {
          close: function close() {
            return _this24.close();
          },
          open: function open() {
            return _this24.open();
          },
          toggleBlockSettings: function toggleBlockSettings(e) {
            return _this24.toggleBlockSettings(e);
          },
          toggleToolbox: function toggleToolbox(e) {
            return _this24.toggleToolbox(e);
          }
        };
      }
    }, {
      key: "open",
      value: function open() {
        this.Editor.Toolbar.moveAndOpen();
      }
    }, {
      key: "close",
      value: function close() {
        this.Editor.Toolbar.close();
      }
    }, {
      key: "toggleBlockSettings",
      value: function toggleBlockSettings(e) {
        if (this.Editor.BlockManager.currentBlockIndex === -1) {
          Y("Could't toggle the Toolbar because there is no block selected ", "warn");
          return;
        }
        (e !== null && e !== void 0 ? e : !this.Editor.BlockSettings.opened) ? (this.Editor.Toolbar.moveAndOpen(), this.Editor.BlockSettings.open()) : this.Editor.BlockSettings.close();
      }
    }, {
      key: "toggleToolbox",
      value: function toggleToolbox(e) {
        if (this.Editor.BlockManager.currentBlockIndex === -1) {
          Y("Could't toggle the Toolbox because there is no block selected ", "warn");
          return;
        }
        (e !== null && e !== void 0 ? e : !this.Editor.Toolbar.toolbox.opened) ? (this.Editor.Toolbar.moveAndOpen(), this.Editor.Toolbar.toolbox.open()) : this.Editor.Toolbar.toolbox.close();
      }
    }]);
  }(y);
  var Pe = {},
    vo = {
      get exports() {
        return Pe;
      },
      set exports(s) {
        Pe = s;
      }
    }; /*!
       * CodeX.Tooltips
       * 
       * @version 1.0.5
       * 
       * @licence MIT
       * @author CodeX <https://codex.so>
       * 
       * 
       */
  (function (s, e) {
    (function (t, o) {
      s.exports = o();
    })(window, function () {
      return function (t) {
        var o = {};
        function i(n) {
          if (o[n]) return o[n].exports;
          var r = o[n] = {
            i: n,
            l: !1,
            exports: {}
          };
          return t[n].call(r.exports, r, r.exports, i), r.l = !0, r.exports;
        }
        return i.m = t, i.c = o, i.d = function (n, r, a) {
          i.o(n, r) || Object.defineProperty(n, r, {
            enumerable: !0,
            get: a
          });
        }, i.r = function (n) {
          (typeof Symbol === "undefined" ? "undefined" : _typeof(Symbol)) < "u" && Symbol.toStringTag && Object.defineProperty(n, Symbol.toStringTag, {
            value: "Module"
          }), Object.defineProperty(n, "__esModule", {
            value: !0
          });
        }, i.t = function (n, r) {
          if (1 & r && (n = i(n)), 8 & r || 4 & r && _typeof(n) == "object" && n && n.__esModule) return n;
          var a = Object.create(null);
          if (i.r(a), Object.defineProperty(a, "default", {
            enumerable: !0,
            value: n
          }), 2 & r && typeof n != "string") for (var l in n) i.d(a, l, function (d) {
            return n[d];
          }.bind(null, l));
          return a;
        }, i.n = function (n) {
          var r = n && n.__esModule ? function () {
            return n.default;
          } : function () {
            return n;
          };
          return i.d(r, "a", r), r;
        }, i.o = function (n, r) {
          return Object.prototype.hasOwnProperty.call(n, r);
        }, i.p = "", i(i.s = 0);
      }([function (t, o, i) {
        t.exports = i(1);
      }, function (t, o, i) {
        i.r(o), i.d(o, "default", function () {
          return n;
        });
        var n = /*#__PURE__*/function () {
          function n() {
            var _this25 = this;
            _classCallCheck(this, n);
            this.nodes = {
              wrapper: null,
              content: null
            }, this.showed = !1, this.offsetTop = 10, this.offsetLeft = 10, this.offsetRight = 10, this.hidingDelay = 0, this.handleWindowScroll = function () {
              _this25.showed && _this25.hide(!0);
            }, this.loadStyles(), this.prepare(), window.addEventListener("scroll", this.handleWindowScroll, {
              passive: !0
            });
          }
          return _createClass(n, [{
            key: "CSS",
            get: function get() {
              return {
                tooltip: "ct",
                tooltipContent: "ct__content",
                tooltipShown: "ct--shown",
                placement: {
                  left: "ct--left",
                  bottom: "ct--bottom",
                  right: "ct--right",
                  top: "ct--top"
                }
              };
            }
          }, {
            key: "show",
            value: function show(a, l, d) {
              var _this$nodes$wrapper$c,
                _this26 = this;
              this.nodes.wrapper || this.prepare(), this.hidingTimeout && clearTimeout(this.hidingTimeout);
              var u = Object.assign({
                placement: "bottom",
                marginTop: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
                delay: 70,
                hidingDelay: 0
              }, d);
              if (u.hidingDelay && (this.hidingDelay = u.hidingDelay), this.nodes.content.innerHTML = "", typeof l == "string") this.nodes.content.appendChild(document.createTextNode(l));else {
                if (!(l instanceof Node)) throw Error("[CodeX Tooltip] Wrong type of «content» passed. It should be an instance of Node or String. But " + _typeof(l) + " given.");
                this.nodes.content.appendChild(l);
              }
              switch ((_this$nodes$wrapper$c = this.nodes.wrapper.classList).remove.apply(_this$nodes$wrapper$c, _toConsumableArray(Object.values(this.CSS.placement))), u.placement) {
                case "top":
                  this.placeTop(a, u);
                  break;
                case "left":
                  this.placeLeft(a, u);
                  break;
                case "right":
                  this.placeRight(a, u);
                  break;
                case "bottom":
                default:
                  this.placeBottom(a, u);
              }
              u && u.delay ? this.showingTimeout = setTimeout(function () {
                _this26.nodes.wrapper.classList.add(_this26.CSS.tooltipShown), _this26.showed = !0;
              }, u.delay) : (this.nodes.wrapper.classList.add(this.CSS.tooltipShown), this.showed = !0);
            }
          }, {
            key: "hide",
            value: function hide() {
              var _this27 = this;
              var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
              if (this.hidingDelay && !a) return this.hidingTimeout && clearTimeout(this.hidingTimeout), void (this.hidingTimeout = setTimeout(function () {
                _this27.hide(!0);
              }, this.hidingDelay));
              this.nodes.wrapper.classList.remove(this.CSS.tooltipShown), this.showed = !1, this.showingTimeout && clearTimeout(this.showingTimeout);
            }
          }, {
            key: "onHover",
            value: function onHover(a, l, d) {
              var _this28 = this;
              a.addEventListener("mouseenter", function () {
                _this28.show(a, l, d);
              }), a.addEventListener("mouseleave", function () {
                _this28.hide();
              });
            }
          }, {
            key: "destroy",
            value: function destroy() {
              this.nodes.wrapper.remove(), window.removeEventListener("scroll", this.handleWindowScroll);
            }
          }, {
            key: "prepare",
            value: function prepare() {
              this.nodes.wrapper = this.make("div", this.CSS.tooltip), this.nodes.content = this.make("div", this.CSS.tooltipContent), this.append(this.nodes.wrapper, this.nodes.content), this.append(document.body, this.nodes.wrapper);
            }
          }, {
            key: "loadStyles",
            value: function loadStyles() {
              var a = "codex-tooltips-style";
              if (document.getElementById(a)) return;
              var l = i(2),
                d = this.make("style", null, {
                  textContent: l.toString(),
                  id: a
                });
              this.prepend(document.head, d);
            }
          }, {
            key: "placeBottom",
            value: function placeBottom(a, l) {
              var d = a.getBoundingClientRect(),
                u = d.left + a.clientWidth / 2 - this.nodes.wrapper.offsetWidth / 2,
                h = d.bottom + window.pageYOffset + this.offsetTop + l.marginTop;
              this.applyPlacement("bottom", u, h);
            }
          }, {
            key: "placeTop",
            value: function placeTop(a, l) {
              var d = a.getBoundingClientRect(),
                u = d.left + a.clientWidth / 2 - this.nodes.wrapper.offsetWidth / 2,
                h = d.top + window.pageYOffset - this.nodes.wrapper.clientHeight - this.offsetTop;
              this.applyPlacement("top", u, h);
            }
          }, {
            key: "placeLeft",
            value: function placeLeft(a, l) {
              var d = a.getBoundingClientRect(),
                u = d.left - this.nodes.wrapper.offsetWidth - this.offsetLeft - l.marginLeft,
                h = d.top + window.pageYOffset + a.clientHeight / 2 - this.nodes.wrapper.offsetHeight / 2;
              this.applyPlacement("left", u, h);
            }
          }, {
            key: "placeRight",
            value: function placeRight(a, l) {
              var d = a.getBoundingClientRect(),
                u = d.right + this.offsetRight + l.marginRight,
                h = d.top + window.pageYOffset + a.clientHeight / 2 - this.nodes.wrapper.offsetHeight / 2;
              this.applyPlacement("right", u, h);
            }
          }, {
            key: "applyPlacement",
            value: function applyPlacement(a, l, d) {
              this.nodes.wrapper.classList.add(this.CSS.placement[a]), this.nodes.wrapper.style.left = l + "px", this.nodes.wrapper.style.top = d + "px";
            }
          }, {
            key: "make",
            value: function make(a) {
              var _u$classList;
              var l = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
              var d = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
              var u = document.createElement(a);
              Array.isArray(l) ? (_u$classList = u.classList).add.apply(_u$classList, _toConsumableArray(l)) : l && u.classList.add(l);
              for (var h in d) d.hasOwnProperty(h) && (u[h] = d[h]);
              return u;
            }
          }, {
            key: "append",
            value: function append(a, l) {
              Array.isArray(l) ? l.forEach(function (d) {
                return a.appendChild(d);
              }) : a.appendChild(l);
            }
          }, {
            key: "prepend",
            value: function prepend(a, l) {
              Array.isArray(l) ? (l = l.reverse()).forEach(function (d) {
                return a.prepend(d);
              }) : a.prepend(l);
            }
          }]);
        }();
      }, function (t, o) {
        t.exports = ".ct{z-index:999;opacity:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none;-webkit-transition:opacity 50ms ease-in,-webkit-transform 70ms cubic-bezier(.215,.61,.355,1);transition:opacity 50ms ease-in,-webkit-transform 70ms cubic-bezier(.215,.61,.355,1);transition:opacity 50ms ease-in,transform 70ms cubic-bezier(.215,.61,.355,1);transition:opacity 50ms ease-in,transform 70ms cubic-bezier(.215,.61,.355,1),-webkit-transform 70ms cubic-bezier(.215,.61,.355,1);will-change:opacity,top,left;-webkit-box-shadow:0 8px 12px 0 rgba(29,32,43,.17),0 4px 5px -3px rgba(5,6,12,.49);box-shadow:0 8px 12px 0 rgba(29,32,43,.17),0 4px 5px -3px rgba(5,6,12,.49);border-radius:9px}.ct,.ct:before{position:absolute;top:0;left:0}.ct:before{content:\"\";bottom:0;right:0;background-color:#1d202b;z-index:-1;border-radius:4px}@supports(-webkit-mask-box-image:url(\"\")){.ct:before{border-radius:0;-webkit-mask-box-image:url('data:image/svg+xml;charset=utf-8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\"><path d=\"M10.71 0h2.58c3.02 0 4.64.42 6.1 1.2a8.18 8.18 0 013.4 3.4C23.6 6.07 24 7.7 24 10.71v2.58c0 3.02-.42 4.64-1.2 6.1a8.18 8.18 0 01-3.4 3.4c-1.47.8-3.1 1.21-6.11 1.21H10.7c-3.02 0-4.64-.42-6.1-1.2a8.18 8.18 0 01-3.4-3.4C.4 17.93 0 16.3 0 13.29V10.7c0-3.02.42-4.64 1.2-6.1a8.18 8.18 0 013.4-3.4C6.07.4 7.7 0 10.71 0z\"/></svg>') 48% 41% 37.9% 53.3%}}@media (--mobile){.ct{display:none}}.ct__content{padding:6px 10px;color:#cdd1e0;font-size:12px;text-align:center;letter-spacing:.02em;line-height:1em}.ct:after{content:\"\";width:8px;height:8px;position:absolute;background-color:#1d202b;z-index:-1}.ct--bottom{-webkit-transform:translateY(5px);transform:translateY(5px)}.ct--bottom:after{top:-3px;left:50%;-webkit-transform:translateX(-50%) rotate(-45deg);transform:translateX(-50%) rotate(-45deg)}.ct--top{-webkit-transform:translateY(-5px);transform:translateY(-5px)}.ct--top:after{top:auto;bottom:-3px;left:50%;-webkit-transform:translateX(-50%) rotate(-45deg);transform:translateX(-50%) rotate(-45deg)}.ct--left{-webkit-transform:translateX(-5px);transform:translateX(-5px)}.ct--left:after{top:50%;left:auto;right:0;-webkit-transform:translate(41.6%,-50%) rotate(-45deg);transform:translate(41.6%,-50%) rotate(-45deg)}.ct--right{-webkit-transform:translateX(5px);transform:translateX(5px)}.ct--right:after{top:50%;left:0;-webkit-transform:translate(-41.6%,-50%) rotate(-45deg);transform:translate(-41.6%,-50%) rotate(-45deg)}.ct--shown{opacity:1;-webkit-transform:none;transform:none}";
      }]).default;
    });
  })(vo);
  var xo = J(Pe);
  var F = null;
  function Fe() {
    F || (F = new xo());
  }
  function wo(s, e, t) {
    Fe(), F == null || F.show(s, e, t);
  }
  function He() {
    var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
    Fe(), F == null || F.hide(s);
  }
  function ue(s, e, t) {
    Fe(), F == null || F.onHover(s, e, t);
  }
  function yo() {
    F == null || F.destroy(), F = null;
  }
  var Eo = /*#__PURE__*/function (_y15) {
    function Eo(_ref14) {
      var e = _ref14.config,
        t = _ref14.eventsDispatcher;
      _classCallCheck(this, Eo);
      return _callSuper(this, Eo, [{
        config: e,
        eventsDispatcher: t
      }]);
    }
    _inherits(Eo, _y15);
    return _createClass(Eo, [{
      key: "methods",
      get: function get() {
        var _this29 = this;
        return {
          show: function show(e, t, o) {
            return _this29.show(e, t, o);
          },
          hide: function hide() {
            return _this29.hide();
          },
          onHover: function onHover(e, t, o) {
            return _this29.onHover(e, t, o);
          }
        };
      }
    }, {
      key: "show",
      value: function show(e, t, o) {
        wo(e, t, o);
      }
    }, {
      key: "hide",
      value: function hide() {
        He();
      }
    }, {
      key: "onHover",
      value: function onHover(e, t, o) {
        ue(e, t, o);
      }
    }]);
  }(y);
  var Bo = /*#__PURE__*/function (_y16) {
    function Bo() {
      _classCallCheck(this, Bo);
      return _callSuper(this, Bo, arguments);
    }
    _inherits(Bo, _y16);
    return _createClass(Bo, [{
      key: "methods",
      get: function get() {
        return {
          nodes: this.editorNodes
        };
      }
    }, {
      key: "editorNodes",
      get: function get() {
        return {
          wrapper: this.Editor.UI.nodes.wrapper,
          redactor: this.Editor.UI.nodes.redactor
        };
      }
    }]);
  }(y);
  function pt(s, e) {
    var t = {};
    return Object.entries(s).forEach(function (_ref15) {
      var _ref16 = _slicedToArray(_ref15, 2),
        o = _ref16[0],
        i = _ref16[1];
      if (O(i)) {
        var n = e ? "".concat(e, ".").concat(o) : o;
        Object.values(i).every(function (a) {
          return Z(a);
        }) ? t[o] = n : t[o] = pt(i, n);
        return;
      }
      t[o] = i;
    }), t;
  }
  var K = pt(rt);
  function To(s, e) {
    var t = {};
    return Object.keys(s).forEach(function (o) {
      var i = e[o];
      i !== void 0 ? t[i] = s[o] : t[o] = s[o];
    }), t;
  }
  var Co = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M9 12L9 7.1C9 7.04477 9.04477 7 9.1 7H10.4C11.5 7 14 7.1 14 9.5C14 9.5 14 12 11 12M9 12V16.8C9 16.9105 9.08954 17 9.2 17H12.5C14 17 15 16 15 14.5C15 11.7046 11 12 11 12M9 12H11"/></svg>',
    ft = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7 10L11.8586 14.8586C11.9367 14.9367 12.0633 14.9367 12.1414 14.8586L17 10"/></svg>',
    So = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7 15L11.8586 10.1414C11.9367 10.0633 12.0633 10.0633 12.1414 10.1414L17 15"/></svg>',
    Io = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8 8L12 12M12 12L16 16M12 12L16 8M12 12L8 16"/></svg>',
    Mo = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2"/></svg>',
    Lo = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M13.34 10C12.4223 12.7337 11 17 11 17"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M14.21 7H14.2"/></svg>',
    gt = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7.69998 12.6L7.67896 12.62C6.53993 13.7048 6.52012 15.5155 7.63516 16.625V16.625C8.72293 17.7073 10.4799 17.7102 11.5712 16.6314L13.0263 15.193C14.0703 14.1609 14.2141 12.525 13.3662 11.3266L13.22 11.12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16.22 11.12L16.3564 10.9805C17.2895 10.0265 17.3478 8.5207 16.4914 7.49733V7.49733C15.5691 6.39509 13.9269 6.25143 12.8271 7.17675L11.3901 8.38588C10.0935 9.47674 9.95706 11.4241 11.0888 12.6852L11.12 12.72"/></svg>',
    Ao = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M9.40999 7.29999H9.4"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M14.6 7.29999H14.59"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M9.30999 12H9.3"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M14.6 12H14.59"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M9.40999 16.7H9.4"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M14.6 16.7H14.59"/></svg>',
    _o = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M12 7V12M12 17V12M17 12H12M12 12H7"/></svg>',
    Oo = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="5.5" stroke="currentColor" stroke-width="2"/><line x1="15.4142" x2="19" y1="15" y2="18.5858" stroke="currentColor" stroke-linecap="round" stroke-width="2"/></svg>',
    No = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M15.7795 11.5C15.7795 11.5 16.053 11.1962 16.5497 10.6722C17.4442 9.72856 17.4701 8.2475 16.5781 7.30145V7.30145C15.6482 6.31522 14.0873 6.29227 13.1288 7.25073L11.8796 8.49999"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8.24517 12.3883C8.24517 12.3883 7.97171 12.6922 7.47504 13.2161C6.58051 14.1598 6.55467 15.6408 7.44666 16.5869V16.5869C8.37653 17.5731 9.93744 17.5961 10.8959 16.6376L12.1452 15.3883"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M17.7802 15.1032L16.597 14.9422C16.0109 14.8624 15.4841 15.3059 15.4627 15.8969L15.4199 17.0818"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6.39064 9.03238L7.58432 9.06668C8.17551 9.08366 8.6522 8.58665 8.61056 7.99669L8.5271 6.81397"/><line x1="12.1142" x2="11.7" y1="12.2" y2="11.7858" stroke="currentColor" stroke-linecap="round" stroke-width="2"/></svg>',
    Ro = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="14" height="14" x="5" y="5" stroke="currentColor" stroke-width="2" rx="4"/><line x1="12" x2="12" y1="9" y2="12" stroke="currentColor" stroke-linecap="round" stroke-width="2"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M12 15.02V15.01"/></svg>';
  var A = /*#__PURE__*/function () {
    function A(e) {
      var _this30 = this;
      _classCallCheck(this, A);
      this.nodes = {
        root: null,
        icon: null
      }, this.confirmationState = null, this.removeSpecialFocusBehavior = function () {
        _this30.nodes.root.classList.remove(A.CSS.noFocus);
      }, this.removeSpecialHoverBehavior = function () {
        _this30.nodes.root.classList.remove(A.CSS.noHover);
      }, this.onErrorAnimationEnd = function () {
        _this30.nodes.icon.classList.remove(A.CSS.wobbleAnimation), _this30.nodes.icon.removeEventListener("animationend", _this30.onErrorAnimationEnd);
      }, this.params = e, this.nodes.root = this.make(e);
    }
    return _createClass(A, [{
      key: "isDisabled",
      get: function get() {
        return this.params.isDisabled;
      }
    }, {
      key: "toggle",
      get: function get() {
        return this.params.toggle;
      }
    }, {
      key: "title",
      get: function get() {
        return this.params.title;
      }
    }, {
      key: "closeOnActivate",
      get: function get() {
        return this.params.closeOnActivate;
      }
    }, {
      key: "isConfirmationStateEnabled",
      get: function get() {
        return this.confirmationState !== null;
      }
    }, {
      key: "isFocused",
      get: function get() {
        return this.nodes.root.classList.contains(A.CSS.focused);
      }
    }, {
      key: "getElement",
      value: function getElement() {
        return this.nodes.root;
      }
    }, {
      key: "handleClick",
      value: function handleClick() {
        if (this.isConfirmationStateEnabled) {
          this.activateOrEnableConfirmationMode(this.confirmationState);
          return;
        }
        this.activateOrEnableConfirmationMode(this.params);
      }
    }, {
      key: "toggleActive",
      value: function toggleActive(e) {
        this.nodes.root.classList.toggle(A.CSS.active, e);
      }
    }, {
      key: "toggleHidden",
      value: function toggleHidden(e) {
        this.nodes.root.classList.toggle(A.CSS.hidden, e);
      }
    }, {
      key: "reset",
      value: function reset() {
        this.isConfirmationStateEnabled && this.disableConfirmationMode();
      }
    }, {
      key: "onFocus",
      value: function onFocus() {
        this.disableSpecialHoverAndFocusBehavior();
      }
    }, {
      key: "make",
      value: function make(e) {
        var t = c.make("div", A.CSS.container);
        return e.name && (t.dataset.itemName = e.name), this.nodes.icon = c.make("div", A.CSS.icon, {
          innerHTML: e.icon || Mo
        }), t.appendChild(this.nodes.icon), t.appendChild(c.make("div", A.CSS.title, {
          innerHTML: e.title || ""
        })), e.secondaryLabel && t.appendChild(c.make("div", A.CSS.secondaryTitle, {
          textContent: e.secondaryLabel
        })), e.isActive && t.classList.add(A.CSS.active), e.isDisabled && t.classList.add(A.CSS.disabled), t;
      }
    }, {
      key: "enableConfirmationMode",
      value: function enableConfirmationMode(e) {
        var t = _objectSpread(_objectSpread(_objectSpread({}, this.params), e), {}, {
            confirmation: e.confirmation
          }),
          o = this.make(t);
        this.nodes.root.innerHTML = o.innerHTML, this.nodes.root.classList.add(A.CSS.confirmationState), this.confirmationState = e, this.enableSpecialHoverAndFocusBehavior();
      }
    }, {
      key: "disableConfirmationMode",
      value: function disableConfirmationMode() {
        var e = this.make(this.params);
        this.nodes.root.innerHTML = e.innerHTML, this.nodes.root.classList.remove(A.CSS.confirmationState), this.confirmationState = null, this.disableSpecialHoverAndFocusBehavior();
      }
    }, {
      key: "enableSpecialHoverAndFocusBehavior",
      value: function enableSpecialHoverAndFocusBehavior() {
        this.nodes.root.classList.add(A.CSS.noHover), this.nodes.root.classList.add(A.CSS.noFocus), this.nodes.root.addEventListener("mouseleave", this.removeSpecialHoverBehavior, {
          once: !0
        });
      }
    }, {
      key: "disableSpecialHoverAndFocusBehavior",
      value: function disableSpecialHoverAndFocusBehavior() {
        this.removeSpecialFocusBehavior(), this.removeSpecialHoverBehavior(), this.nodes.root.removeEventListener("mouseleave", this.removeSpecialHoverBehavior);
      }
    }, {
      key: "activateOrEnableConfirmationMode",
      value: function activateOrEnableConfirmationMode(e) {
        if (e.confirmation === void 0) try {
          e.onActivate(e), this.disableConfirmationMode();
        } catch (_unused4) {
          this.animateError();
        } else this.enableConfirmationMode(e.confirmation);
      }
    }, {
      key: "animateError",
      value: function animateError() {
        this.nodes.icon.classList.contains(A.CSS.wobbleAnimation) || (this.nodes.icon.classList.add(A.CSS.wobbleAnimation), this.nodes.icon.addEventListener("animationend", this.onErrorAnimationEnd));
      }
    }], [{
      key: "CSS",
      get: function get() {
        return {
          container: "ce-popover-item",
          title: "ce-popover-item__title",
          secondaryTitle: "ce-popover-item__secondary-title",
          icon: "ce-popover-item__icon",
          active: "ce-popover-item--active",
          disabled: "ce-popover-item--disabled",
          focused: "ce-popover-item--focused",
          hidden: "ce-popover-item--hidden",
          confirmationState: "ce-popover-item--confirmation",
          noHover: "ce-popover-item--no-hover",
          noFocus: "ce-popover-item--no-focus",
          wobbleAnimation: "wobble"
        };
      }
    }]);
  }();
  var _pe = /*#__PURE__*/function () {
    function pe(s, e) {
      _classCallCheck(this, pe);
      this.cursor = -1, this.items = [], this.items = s || [], this.focusedCssClass = e;
    }
    return _createClass(pe, [{
      key: "currentItem",
      get: function get() {
        return this.cursor === -1 ? null : this.items[this.cursor];
      }
    }, {
      key: "setCursor",
      value: function setCursor(s) {
        s < this.items.length && s >= -1 && (this.dropCursor(), this.cursor = s, this.items[this.cursor].classList.add(this.focusedCssClass));
      }
    }, {
      key: "setItems",
      value: function setItems(s) {
        this.items = s;
      }
    }, {
      key: "next",
      value: function next() {
        this.cursor = this.leafNodesAndReturnIndex(_pe.directions.RIGHT);
      }
    }, {
      key: "previous",
      value: function previous() {
        this.cursor = this.leafNodesAndReturnIndex(_pe.directions.LEFT);
      }
    }, {
      key: "dropCursor",
      value: function dropCursor() {
        this.cursor !== -1 && (this.items[this.cursor].classList.remove(this.focusedCssClass), this.cursor = -1);
      }
    }, {
      key: "leafNodesAndReturnIndex",
      value: function leafNodesAndReturnIndex(s) {
        var _this31 = this;
        if (this.items.length === 0) return this.cursor;
        var e = this.cursor;
        return e === -1 ? e = s === _pe.directions.RIGHT ? -1 : 0 : this.items[e].classList.remove(this.focusedCssClass), s === _pe.directions.RIGHT ? e = (e + 1) % this.items.length : e = (this.items.length + e - 1) % this.items.length, c.canSetCaret(this.items[e]) && xe(function () {
          return g.setCursor(_this31.items[e]);
        }, 50)(), this.items[e].classList.add(this.focusedCssClass), e;
      }
    }]);
  }();
  var ae = _pe;
  ae.directions = {
    RIGHT: "right",
    LEFT: "left"
  };
  var q = /*#__PURE__*/function () {
    function q(e) {
      var _this32 = this;
      _classCallCheck(this, q);
      this.iterator = null, this.activated = !1, this.flipCallbacks = [], this.onKeyDown = function (t) {
        if (_this32.isEventReadyForHandling(t)) switch (q.usedKeys.includes(t.keyCode) && t.preventDefault(), t.keyCode) {
          case k.TAB:
            _this32.handleTabPress(t);
            break;
          case k.LEFT:
          case k.UP:
            _this32.flipLeft();
            break;
          case k.RIGHT:
          case k.DOWN:
            _this32.flipRight();
            break;
          case k.ENTER:
            _this32.handleEnterPress(t);
            break;
        }
      }, this.iterator = new ae(e.items, e.focusedItemClass), this.activateCallback = e.activateCallback, this.allowedKeys = e.allowedKeys || q.usedKeys;
    }
    return _createClass(q, [{
      key: "isActivated",
      get: function get() {
        return this.activated;
      }
    }, {
      key: "activate",
      value: function activate(e, t) {
        this.activated = !0, e && this.iterator.setItems(e), t !== void 0 && this.iterator.setCursor(t), document.addEventListener("keydown", this.onKeyDown, !0);
      }
    }, {
      key: "deactivate",
      value: function deactivate() {
        this.activated = !1, this.dropCursor(), document.removeEventListener("keydown", this.onKeyDown);
      }
    }, {
      key: "focusFirst",
      value: function focusFirst() {
        this.dropCursor(), this.flipRight();
      }
    }, {
      key: "flipLeft",
      value: function flipLeft() {
        this.iterator.previous(), this.flipCallback();
      }
    }, {
      key: "flipRight",
      value: function flipRight() {
        this.iterator.next(), this.flipCallback();
      }
    }, {
      key: "hasFocus",
      value: function hasFocus() {
        return !!this.iterator.currentItem;
      }
    }, {
      key: "onFlip",
      value: function onFlip(e) {
        this.flipCallbacks.push(e);
      }
    }, {
      key: "removeOnFlip",
      value: function removeOnFlip(e) {
        this.flipCallbacks = this.flipCallbacks.filter(function (t) {
          return t !== e;
        });
      }
    }, {
      key: "dropCursor",
      value: function dropCursor() {
        this.iterator.dropCursor();
      }
    }, {
      key: "isEventReadyForHandling",
      value: function isEventReadyForHandling(e) {
        return this.activated && this.allowedKeys.includes(e.keyCode);
      }
    }, {
      key: "handleTabPress",
      value: function handleTabPress(e) {
        switch (e.shiftKey ? ae.directions.LEFT : ae.directions.RIGHT) {
          case ae.directions.RIGHT:
            this.flipRight();
            break;
          case ae.directions.LEFT:
            this.flipLeft();
            break;
        }
      }
    }, {
      key: "handleEnterPress",
      value: function handleEnterPress(e) {
        this.activated && (this.iterator.currentItem && (e.stopPropagation(), e.preventDefault(), this.iterator.currentItem.click()), M(this.activateCallback) && this.activateCallback(this.iterator.currentItem));
      }
    }, {
      key: "flipCallback",
      value: function flipCallback() {
        this.iterator.currentItem && this.iterator.currentItem.scrollIntoViewIfNeeded(), this.flipCallbacks.forEach(function (e) {
          return e();
        });
      }
    }], [{
      key: "usedKeys",
      get: function get() {
        return [k.TAB, k.LEFT, k.RIGHT, k.ENTER, k.UP, k.DOWN];
      }
    }]);
  }();
  var fe = /*#__PURE__*/function () {
    function fe(_ref17) {
      var e = _ref17.items,
        t = _ref17.onSearch,
        o = _ref17.placeholder;
      _classCallCheck(this, fe);
      this.listeners = new Ae(), this.items = e, this.onSearch = t, this.render(o);
    }
    return _createClass(fe, [{
      key: "getElement",
      value: function getElement() {
        return this.wrapper;
      }
    }, {
      key: "focus",
      value: function focus() {
        this.input.focus();
      }
    }, {
      key: "clear",
      value: function clear() {
        this.input.value = "", this.searchQuery = "", this.onSearch("", this.foundItems);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.listeners.removeAll();
      }
    }, {
      key: "render",
      value: function render(e) {
        var _this33 = this;
        this.wrapper = c.make("div", fe.CSS.wrapper);
        var t = c.make("div", fe.CSS.icon, {
          innerHTML: Oo
        });
        this.input = c.make("input", fe.CSS.input, {
          placeholder: e,
          tabIndex: -1
        }), this.wrapper.appendChild(t), this.wrapper.appendChild(this.input), this.listeners.on(this.input, "input", function () {
          _this33.searchQuery = _this33.input.value, _this33.onSearch(_this33.searchQuery, _this33.foundItems);
        });
      }
    }, {
      key: "foundItems",
      get: function get() {
        var _this34 = this;
        return this.items.filter(function (e) {
          return _this34.checkItem(e);
        });
      }
    }, {
      key: "checkItem",
      value: function checkItem(e) {
        var i;
        var t = ((i = e.title) == null ? void 0 : i.toLowerCase()) || "",
          o = this.searchQuery.toLowerCase();
        return t.includes(o);
      }
    }], [{
      key: "CSS",
      get: function get() {
        return {
          wrapper: "cdx-search-field",
          icon: "cdx-search-field__icon",
          input: "cdx-search-field__input"
        };
      }
    }]);
  }();
  var _ge = /*#__PURE__*/function () {
    function ge() {
      _classCallCheck(this, ge);
    }
    return _createClass(ge, [{
      key: "lock",
      value: function lock() {
        st ? this.lockHard() : document.body.classList.add(_ge.CSS.scrollLocked);
      }
    }, {
      key: "unlock",
      value: function unlock() {
        st ? this.unlockHard() : document.body.classList.remove(_ge.CSS.scrollLocked);
      }
    }, {
      key: "lockHard",
      value: function lockHard() {
        this.scrollPosition = window.pageYOffset, document.documentElement.style.setProperty("--window-scroll-offset", "".concat(this.scrollPosition, "px")), document.body.classList.add(_ge.CSS.scrollLockedHard);
      }
    }, {
      key: "unlockHard",
      value: function unlockHard() {
        document.body.classList.remove(_ge.CSS.scrollLockedHard), this.scrollPosition !== null && window.scrollTo(0, this.scrollPosition), this.scrollPosition = null;
      }
    }]);
  }();
  var bt = _ge;
  bt.CSS = {
    scrollLocked: "ce-scroll-locked",
    scrollLockedHard: "ce-scroll-locked--hard"
  };
  var Do = Object.defineProperty,
    Po = Object.getOwnPropertyDescriptor,
    Fo = function Fo(s, e, t, o) {
      for (var i = o > 1 ? void 0 : o ? Po(e, t) : e, n = s.length - 1, r; n >= 0; n--) (r = s[n]) && (i = (o ? r(e, t, i) : r(i)) || i);
      return o && i && Do(e, t, i), i;
    },
    be = function (s) {
      return s.Close = "close", s;
    }(be || {});
  var _R = /*#__PURE__*/function (_ye2) {
    function R(s) {
      var _this35;
      _classCallCheck(this, R);
      _this35 = _callSuper(this, R), _this35.scopeElement = document.body, _this35.listeners = new Ae(), _this35.scrollLocker = new bt(), _this35.nodes = {
        wrapper: null,
        popover: null,
        nothingFoundMessage: null,
        customContent: null,
        items: null,
        overlay: null
      }, _this35.messages = {
        nothingFound: "Nothing found",
        search: "Search"
      }, _this35.onFlip = function () {
        _this35.items.find(function (t) {
          return t.isFocused;
        }).onFocus();
      }, _this35.items = s.items.map(function (e) {
        return new A(e);
      }), s.scopeElement !== void 0 && (_this35.scopeElement = s.scopeElement), s.messages && (_this35.messages = _objectSpread(_objectSpread({}, _this35.messages), s.messages)), s.customContentFlippableItems && (_this35.customContentFlippableItems = s.customContentFlippableItems), _this35.make(), s.customContent && _this35.addCustomContent(s.customContent), s.searchable && _this35.addSearch(), _this35.initializeFlipper();
      return _this35;
    }
    _inherits(R, _ye2);
    return _createClass(R, [{
      key: "getElement",
      value: function getElement() {
        return this.nodes.wrapper;
      }
    }, {
      key: "hasFocus",
      value: function hasFocus() {
        return this.flipper.hasFocus();
      }
    }, {
      key: "show",
      value: function show() {
        var _this36 = this;
        this.shouldOpenBottom || (this.nodes.popover.style.setProperty("--popover-height", this.height + "px"), this.nodes.popover.classList.add(_R.CSS.popoverOpenTop)), this.nodes.overlay.classList.remove(_R.CSS.overlayHidden), this.nodes.popover.classList.add(_R.CSS.popoverOpened), this.flipper.activate(this.flippableElements), this.search !== void 0 && requestAnimationFrame(function () {
          var s;
          (s = _this36.search) == null || s.focus();
        }), ee() && this.scrollLocker.lock();
      }
    }, {
      key: "hide",
      value: function hide() {
        this.nodes.popover.classList.remove(_R.CSS.popoverOpened), this.nodes.popover.classList.remove(_R.CSS.popoverOpenTop), this.nodes.overlay.classList.add(_R.CSS.overlayHidden), this.flipper.deactivate(), this.items.forEach(function (s) {
          return s.reset();
        }), this.search !== void 0 && this.search.clear(), ee() && this.scrollLocker.unlock(), this.emit("close");
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.flipper.deactivate(), this.listeners.removeAll(), ee() && this.scrollLocker.unlock();
      }
    }, {
      key: "make",
      value: function make() {
        var _this37 = this;
        this.nodes.popover = c.make("div", [_R.CSS.popover]), this.nodes.nothingFoundMessage = c.make("div", [_R.CSS.nothingFoundMessage], {
          textContent: this.messages.nothingFound
        }), this.nodes.popover.appendChild(this.nodes.nothingFoundMessage), this.nodes.items = c.make("div", [_R.CSS.items]), this.items.forEach(function (s) {
          _this37.nodes.items.appendChild(s.getElement());
        }), this.nodes.popover.appendChild(this.nodes.items), this.listeners.on(this.nodes.popover, "click", function (s) {
          var e = _this37.getTargetItem(s);
          e !== void 0 && _this37.handleItemClick(e);
        }), this.nodes.wrapper = c.make("div"), this.nodes.overlay = c.make("div", [_R.CSS.overlay, _R.CSS.overlayHidden]), this.listeners.on(this.nodes.overlay, "click", function () {
          _this37.hide();
        }), this.nodes.wrapper.appendChild(this.nodes.overlay), this.nodes.wrapper.appendChild(this.nodes.popover);
      }
    }, {
      key: "addSearch",
      value: function addSearch() {
        var _this38 = this;
        this.search = new fe({
          items: this.items,
          placeholder: this.messages.search,
          onSearch: function onSearch(e, t) {
            _this38.items.forEach(function (i) {
              var n = !t.includes(i);
              i.toggleHidden(n);
            }), _this38.toggleNothingFoundMessage(t.length === 0), _this38.toggleCustomContent(e !== "");
            var o = e === "" ? _this38.flippableElements : t.map(function (i) {
              return i.getElement();
            });
            _this38.flipper.isActivated && (_this38.flipper.deactivate(), _this38.flipper.activate(o));
          }
        });
        var s = this.search.getElement();
        s.classList.add(_R.CSS.search), this.nodes.popover.insertBefore(s, this.nodes.popover.firstChild);
      }
    }, {
      key: "addCustomContent",
      value: function addCustomContent(s) {
        this.nodes.customContent = s, this.nodes.customContent.classList.add(_R.CSS.customContent), this.nodes.popover.insertBefore(s, this.nodes.popover.firstChild);
      }
    }, {
      key: "getTargetItem",
      value: function getTargetItem(s) {
        return this.items.find(function (e) {
          return s.composedPath().includes(e.getElement());
        });
      }
    }, {
      key: "handleItemClick",
      value: function handleItemClick(s) {
        s.isDisabled || (this.items.filter(function (e) {
          return e !== s;
        }).forEach(function (e) {
          return e.reset();
        }), s.handleClick(), this.toggleItemActivenessIfNeeded(s), s.closeOnActivate && this.hide());
      }
    }, {
      key: "initializeFlipper",
      value: function initializeFlipper() {
        this.flipper = new q({
          items: this.flippableElements,
          focusedItemClass: A.CSS.focused,
          allowedKeys: [k.TAB, k.UP, k.DOWN, k.ENTER]
        }), this.flipper.onFlip(this.onFlip);
      }
    }, {
      key: "flippableElements",
      get: function get() {
        var s = this.items.map(function (t) {
          return t.getElement();
        });
        return (this.customContentFlippableItems || []).concat(s);
      }
    }, {
      key: "height",
      get: function get() {
        var s = 0;
        if (this.nodes.popover === null) return s;
        var e = this.nodes.popover.cloneNode(!0);
        return e.style.visibility = "hidden", e.style.position = "absolute", e.style.top = "-1000px", e.classList.add(_R.CSS.popoverOpened), document.body.appendChild(e), s = e.offsetHeight, e.remove(), s;
      }
    }, {
      key: "shouldOpenBottom",
      get: function get() {
        var s = this.nodes.popover.getBoundingClientRect(),
          e = this.scopeElement.getBoundingClientRect(),
          t = this.height,
          o = s.top + t,
          i = s.top - t,
          n = Math.min(window.innerHeight, e.bottom);
        return i < e.top || o <= n;
      }
    }, {
      key: "toggleNothingFoundMessage",
      value: function toggleNothingFoundMessage(s) {
        this.nodes.nothingFoundMessage.classList.toggle(_R.CSS.nothingFoundMessageDisplayed, s);
      }
    }, {
      key: "toggleCustomContent",
      value: function toggleCustomContent(s) {
        var e;
        (e = this.nodes.customContent) == null || e.classList.toggle(_R.CSS.customContentHidden, s);
      }
    }, {
      key: "toggleItemActivenessIfNeeded",
      value: function toggleItemActivenessIfNeeded(s) {
        if (s.toggle === !0 && s.toggleActive(), typeof s.toggle == "string") {
          var e = this.items.filter(function (t) {
            return t.toggle === s.toggle;
          });
          if (e.length === 1) {
            s.toggleActive();
            return;
          }
          e.forEach(function (t) {
            t.toggleActive(t === s);
          });
        }
      }
    }], [{
      key: "CSS",
      get: function get() {
        return {
          popover: "ce-popover",
          popoverOpenTop: "ce-popover--open-top",
          popoverOpened: "ce-popover--opened",
          search: "ce-popover__search",
          nothingFoundMessage: "ce-popover__nothing-found-message",
          nothingFoundMessageDisplayed: "ce-popover__nothing-found-message--displayed",
          customContent: "ce-popover__custom-content",
          customContentHidden: "ce-popover__custom-content--hidden",
          items: "ce-popover__items",
          overlay: "ce-popover__overlay",
          overlayHidden: "ce-popover__overlay--hidden"
        };
      }
    }]);
  }(ye);
  var ze = _R;
  Fo([se], ze.prototype, "height", 1);
  var Ho = /*#__PURE__*/function (_y17) {
    function Ho() {
      var _this39;
      _classCallCheck(this, Ho);
      _this39 = _callSuper(this, Ho, arguments), _this39.opened = !1, _this39.selection = new g(), _this39.onPopoverClose = function () {
        _this39.close();
      };
      return _this39;
    }
    _inherits(Ho, _y17);
    return _createClass(Ho, [{
      key: "events",
      get: function get() {
        return {
          opened: "block-settings-opened",
          closed: "block-settings-closed"
        };
      }
    }, {
      key: "CSS",
      get: function get() {
        return {
          settings: "ce-settings"
        };
      }
    }, {
      key: "flipper",
      get: function get() {
        var e;
        return (e = this.popover) == null ? void 0 : e.flipper;
      }
    }, {
      key: "make",
      value: function make() {
        this.nodes.wrapper = c.make("div", [this.CSS.settings]);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.removeAllNodes();
      }
    }, {
      key: "open",
      value: function open() {
        var _this40 = this;
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.Editor.BlockManager.currentBlock;
        this.opened = !0, this.selection.save(), this.Editor.BlockSelection.selectBlock(e), this.Editor.BlockSelection.clearCache();
        var _e$getTunes = e.getTunes(),
          _e$getTunes2 = _slicedToArray(_e$getTunes, 2),
          t = _e$getTunes2[0],
          o = _e$getTunes2[1];
        this.eventsDispatcher.emit(this.events.opened), this.popover = new ze({
          searchable: !0,
          items: t.map(function (i) {
            return _this40.resolveTuneAliases(i);
          }),
          customContent: o,
          customContentFlippableItems: this.getControls(o),
          scopeElement: this.Editor.API.methods.ui.nodes.redactor,
          messages: {
            nothingFound: H.ui(K.ui.popover, "Nothing found"),
            search: H.ui(K.ui.popover, "Filter")
          }
        }), this.popover.on(be.Close, this.onPopoverClose), this.nodes.wrapper.append(this.popover.getElement()), this.popover.show();
      }
    }, {
      key: "getElement",
      value: function getElement() {
        return this.nodes.wrapper;
      }
    }, {
      key: "close",
      value: function close() {
        this.opened && (this.opened = !1, g.isAtEditor || this.selection.restore(), this.selection.clearSaved(), !this.Editor.CrossBlockSelection.isCrossBlockSelectionStarted && this.Editor.BlockManager.currentBlock && this.Editor.BlockSelection.unselectBlock(this.Editor.BlockManager.currentBlock), this.eventsDispatcher.emit(this.events.closed), this.popover && (this.popover.off(be.Close, this.onPopoverClose), this.popover.destroy(), this.popover.getElement().remove(), this.popover = null));
      }
    }, {
      key: "getControls",
      value: function getControls(e) {
        var t = this.Editor.StylesAPI,
          o = e.querySelectorAll(".".concat(t.classes.settingsButton, ", ").concat(c.allInputsSelector));
        return Array.from(o);
      }
    }, {
      key: "resolveTuneAliases",
      value: function resolveTuneAliases(e) {
        var t = To(e, {
          label: "title"
        });
        return e.confirmation && (t.confirmation = this.resolveTuneAliases(e.confirmation)), t;
      }
    }]);
  }(y);
  var U = /*#__PURE__*/function (_y18) {
    function U() {
      var _this41;
      _classCallCheck(this, U);
      _this41 = _callSuper(this, U, arguments), _this41.opened = !1, _this41.tools = [], _this41.flipper = null, _this41.togglingCallback = null;
      return _this41;
    }
    _inherits(U, _y18);
    return _createClass(U, [{
      key: "make",
      value: function make() {
        this.nodes.wrapper = c.make("div", [U.CSS.conversionToolbarWrapper].concat(_toConsumableArray(this.isRtl ? [this.Editor.UI.CSS.editorRtlFix] : []))), this.nodes.tools = c.make("div", U.CSS.conversionToolbarTools);
        var e = c.make("div", U.CSS.conversionToolbarLabel, {
          textContent: H.ui(K.ui.inlineToolbar.converter, "Convert to")
        });
        return this.addTools(), this.enableFlipper(), c.append(this.nodes.wrapper, e), c.append(this.nodes.wrapper, this.nodes.tools), this.nodes.wrapper;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.flipper && (this.flipper.deactivate(), this.flipper = null), this.removeAllNodes();
      }
    }, {
      key: "toggle",
      value: function toggle(e) {
        this.opened ? this.close() : this.open(), M(e) && (this.togglingCallback = e);
      }
    }, {
      key: "open",
      value: function open() {
        var _this42 = this;
        this.filterTools(), this.opened = !0, this.nodes.wrapper.classList.add(U.CSS.conversionToolbarShowed), window.requestAnimationFrame(function () {
          _this42.flipper.activate(_this42.tools.map(function (e) {
            return e.button;
          }).filter(function (e) {
            return !e.classList.contains(U.CSS.conversionToolHidden);
          })), _this42.flipper.focusFirst(), M(_this42.togglingCallback) && _this42.togglingCallback(!0);
        });
      }
    }, {
      key: "close",
      value: function close() {
        this.opened = !1, this.flipper.deactivate(), this.nodes.wrapper.classList.remove(U.CSS.conversionToolbarShowed), M(this.togglingCallback) && this.togglingCallback(!1);
      }
    }, {
      key: "hasTools",
      value: function hasTools() {
        return this.tools.length === 1 ? this.tools[0].name !== this.config.defaultBlock : !0;
      }
    }, {
      key: "replaceWithBlock",
      value: function () {
        var _replaceWithBlock = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(e, t) {
          var _this43 = this;
          var _this$Editor, o, i, n, r;
          return _regeneratorRuntime().wrap(function _callee10$(_context10) {
            while (1) switch (_context10.prev = _context10.next) {
              case 0:
                _this$Editor = this.Editor, o = _this$Editor.BlockManager, i = _this$Editor.BlockSelection, n = _this$Editor.InlineToolbar, r = _this$Editor.Caret;
                o.convert(this.Editor.BlockManager.currentBlock, e, t), i.clearSelection(), this.close(), n.close(), window.requestAnimationFrame(function () {
                  r.setToBlock(_this43.Editor.BlockManager.currentBlock, r.positions.END);
                });
              case 2:
              case "end":
                return _context10.stop();
            }
          }, _callee10, this);
        }));
        function replaceWithBlock(_x8, _x9) {
          return _replaceWithBlock.apply(this, arguments);
        }
        return replaceWithBlock;
      }()
    }, {
      key: "addTools",
      value: function addTools() {
        var _this44 = this;
        var e = this.Editor.Tools.blockTools;
        Array.from(e.entries()).forEach(function (_ref18) {
          var _ref19 = _slicedToArray(_ref18, 2),
            t = _ref19[0],
            o = _ref19[1];
          var n;
          var i = o.conversionConfig;
          !i || !i.import || (n = o.toolbox) == null || n.forEach(function (r) {
            return _this44.addToolIfValid(t, r);
          });
        });
      }
    }, {
      key: "addToolIfValid",
      value: function addToolIfValid(e, t) {
        W(t) || !t.icon || this.addTool(e, t);
      }
    }, {
      key: "addTool",
      value: function addTool(e, t) {
        var _this45 = this;
        var r;
        var o = c.make("div", [U.CSS.conversionTool]),
          i = c.make("div", [U.CSS.conversionToolIcon]);
        o.dataset.tool = e, i.innerHTML = t.icon, c.append(o, i), c.append(o, c.text(H.t(K.toolNames, t.title || ne(e))));
        var n = (r = this.Editor.Tools.blockTools.get(e)) == null ? void 0 : r.shortcut;
        if (n) {
          var a = c.make("span", U.CSS.conversionToolSecondaryLabel, {
            innerText: we(n)
          });
          c.append(o, a);
        }
        c.append(this.nodes.tools, o), this.tools.push({
          name: e,
          button: o,
          toolboxItem: t
        }), this.listeners.on(o, "click", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
          return _regeneratorRuntime().wrap(function _callee11$(_context11) {
            while (1) switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return _this45.replaceWithBlock(e, t.data);
              case 2:
              case "end":
                return _context11.stop();
            }
          }, _callee11);
        })));
      }
    }, {
      key: "filterTools",
      value: function () {
        var _filterTools = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
          var e, t, o;
          return _regeneratorRuntime().wrap(function _callee12$(_context12) {
            while (1) switch (_context12.prev = _context12.next) {
              case 0:
                o = function _o4(i, n) {
                  return i.icon === n.icon && i.title === n.title;
                };
                e = this.Editor.BlockManager.currentBlock;
                _context12.next = 4;
                return e.getActiveToolboxEntry();
              case 4:
                t = _context12.sent;
                this.tools.forEach(function (i) {
                  var n = !1;
                  if (t) {
                    var r = o(t, i.toolboxItem);
                    n = i.button.dataset.tool === e.name && r;
                  }
                  i.button.hidden = n, i.button.classList.toggle(U.CSS.conversionToolHidden, n);
                });
              case 6:
              case "end":
                return _context12.stop();
            }
          }, _callee12, this);
        }));
        function filterTools() {
          return _filterTools.apply(this, arguments);
        }
        return filterTools;
      }()
    }, {
      key: "enableFlipper",
      value: function enableFlipper() {
        this.flipper = new q({
          focusedItemClass: U.CSS.conversionToolFocused
        });
      }
    }], [{
      key: "CSS",
      get: function get() {
        return {
          conversionToolbarWrapper: "ce-conversion-toolbar",
          conversionToolbarShowed: "ce-conversion-toolbar--showed",
          conversionToolbarTools: "ce-conversion-toolbar__tools",
          conversionToolbarLabel: "ce-conversion-toolbar__label",
          conversionTool: "ce-conversion-tool",
          conversionToolHidden: "ce-conversion-tool--hidden",
          conversionToolIcon: "ce-conversion-tool__icon",
          conversionToolSecondaryLabel: "ce-conversion-tool__secondary-label",
          conversionToolFocused: "ce-conversion-tool--focused",
          conversionToolActive: "ce-conversion-tool--active"
        };
      }
    }]);
  }(y);
  var Ue = {},
    zo = {
      get exports() {
        return Ue;
      },
      set exports(s) {
        Ue = s;
      }
    }; /*!
       * Library for handling keyboard shortcuts
       * @copyright CodeX (https://codex.so)
       * @license MIT
       * @author CodeX (https://codex.so)
       * @version 1.2.0
       */
  (function (s, e) {
    (function (t, o) {
      s.exports = o();
    })(window, function () {
      return function (t) {
        var o = {};
        function i(n) {
          if (o[n]) return o[n].exports;
          var r = o[n] = {
            i: n,
            l: !1,
            exports: {}
          };
          return t[n].call(r.exports, r, r.exports, i), r.l = !0, r.exports;
        }
        return i.m = t, i.c = o, i.d = function (n, r, a) {
          i.o(n, r) || Object.defineProperty(n, r, {
            enumerable: !0,
            get: a
          });
        }, i.r = function (n) {
          (typeof Symbol === "undefined" ? "undefined" : _typeof(Symbol)) < "u" && Symbol.toStringTag && Object.defineProperty(n, Symbol.toStringTag, {
            value: "Module"
          }), Object.defineProperty(n, "__esModule", {
            value: !0
          });
        }, i.t = function (n, r) {
          if (1 & r && (n = i(n)), 8 & r || 4 & r && _typeof(n) == "object" && n && n.__esModule) return n;
          var a = Object.create(null);
          if (i.r(a), Object.defineProperty(a, "default", {
            enumerable: !0,
            value: n
          }), 2 & r && typeof n != "string") for (var l in n) i.d(a, l, function (d) {
            return n[d];
          }.bind(null, l));
          return a;
        }, i.n = function (n) {
          var r = n && n.__esModule ? function () {
            return n.default;
          } : function () {
            return n;
          };
          return i.d(r, "a", r), r;
        }, i.o = function (n, r) {
          return Object.prototype.hasOwnProperty.call(n, r);
        }, i.p = "", i(i.s = 0);
      }([function (t, o, i) {
        function n(l, d) {
          for (var u = 0; u < d.length; u++) {
            var h = d[u];
            h.enumerable = h.enumerable || !1, h.configurable = !0, "value" in h && (h.writable = !0), Object.defineProperty(l, h.key, h);
          }
        }
        function r(l, d, u) {
          return d && n(l.prototype, d), u && n(l, u), l;
        }
        i.r(o);
        var a = function () {
          function l(d) {
            var u = this;
            (function (h, f) {
              if (!(h instanceof f)) throw new TypeError("Cannot call a class as a function");
            })(this, l), this.commands = {}, this.keys = {}, this.name = d.name, this.parseShortcutName(d.name), this.element = d.on, this.callback = d.callback, this.executeShortcut = function (h) {
              u.execute(h);
            }, this.element.addEventListener("keydown", this.executeShortcut, !1);
          }
          return r(l, null, [{
            key: "supportedCommands",
            get: function get() {
              return {
                SHIFT: ["SHIFT"],
                CMD: ["CMD", "CONTROL", "COMMAND", "WINDOWS", "CTRL"],
                ALT: ["ALT", "OPTION"]
              };
            }
          }, {
            key: "keyCodes",
            get: function get() {
              return {
                0: 48,
                1: 49,
                2: 50,
                3: 51,
                4: 52,
                5: 53,
                6: 54,
                7: 55,
                8: 56,
                9: 57,
                A: 65,
                B: 66,
                C: 67,
                D: 68,
                E: 69,
                F: 70,
                G: 71,
                H: 72,
                I: 73,
                J: 74,
                K: 75,
                L: 76,
                M: 77,
                N: 78,
                O: 79,
                P: 80,
                Q: 81,
                R: 82,
                S: 83,
                T: 84,
                U: 85,
                V: 86,
                W: 87,
                X: 88,
                Y: 89,
                Z: 90,
                BACKSPACE: 8,
                ENTER: 13,
                ESCAPE: 27,
                LEFT: 37,
                UP: 38,
                RIGHT: 39,
                DOWN: 40,
                INSERT: 45,
                DELETE: 46,
                ".": 190
              };
            }
          }]), r(l, [{
            key: "parseShortcutName",
            value: function value(d) {
              d = d.split("+");
              for (var u = 0; u < d.length; u++) {
                d[u] = d[u].toUpperCase();
                var h = !1;
                for (var f in l.supportedCommands) if (l.supportedCommands[f].includes(d[u])) {
                  h = this.commands[f] = !0;
                  break;
                }
                h || (this.keys[d[u]] = !0);
              }
              for (var x in l.supportedCommands) this.commands[x] || (this.commands[x] = !1);
            }
          }, {
            key: "execute",
            value: function value(d) {
              var u,
                h = {
                  CMD: d.ctrlKey || d.metaKey,
                  SHIFT: d.shiftKey,
                  ALT: d.altKey
                },
                f = !0;
              for (u in this.commands) this.commands[u] !== h[u] && (f = !1);
              var x,
                p = !0;
              for (x in this.keys) p = p && d.keyCode === l.keyCodes[x];
              f && p && this.callback(d);
            }
          }, {
            key: "remove",
            value: function value() {
              this.element.removeEventListener("keydown", this.executeShortcut);
            }
          }]), l;
        }();
        o.default = a;
      }]).default;
    });
  })(zo);
  var Uo = J(Ue);
  var jo = /*#__PURE__*/function () {
    function jo() {
      _classCallCheck(this, jo);
      this.registeredShortcuts = new Map();
    }
    return _createClass(jo, [{
      key: "add",
      value: function add(e) {
        if (this.findShortcut(e.on, e.name)) throw Error("Shortcut ".concat(e.name, " is already registered for ").concat(e.on, ". Please remove it before add a new handler."));
        var o = new Uo({
            name: e.name,
            on: e.on,
            callback: e.handler
          }),
          i = this.registeredShortcuts.get(e.on) || [];
        this.registeredShortcuts.set(e.on, [].concat(_toConsumableArray(i), [o]));
      }
    }, {
      key: "remove",
      value: function remove(e, t) {
        var o = this.findShortcut(e, t);
        if (!o) return;
        o.remove();
        var i = this.registeredShortcuts.get(e);
        this.registeredShortcuts.set(e, i.filter(function (n) {
          return n !== o;
        }));
      }
    }, {
      key: "findShortcut",
      value: function findShortcut(e, t) {
        return (this.registeredShortcuts.get(e) || []).find(function (_ref21) {
          var i = _ref21.name;
          return i === t;
        });
      }
    }]);
  }();
  var le = new jo();
  var $o = Object.defineProperty,
    Wo = Object.getOwnPropertyDescriptor,
    mt = function mt(s, e, t, o) {
      for (var i = o > 1 ? void 0 : o ? Wo(e, t) : e, n = s.length - 1, r; n >= 0; n--) (r = s[n]) && (i = (o ? r(e, t, i) : r(i)) || i);
      return o && i && $o(e, t, i), i;
    },
    Ee = function (s) {
      return s.Opened = "toolbox-opened", s.Closed = "toolbox-closed", s.BlockAdded = "toolbox-block-added", s;
    }(Ee || {});
  var _kt = /*#__PURE__*/function (_ye3) {
    function kt(_ref22) {
      var _this46;
      var s = _ref22.api,
        e = _ref22.tools,
        t = _ref22.i18nLabels;
      _classCallCheck(this, kt);
      _this46 = _callSuper(this, kt), _this46.opened = !1, _this46.nodes = {
        toolbox: null
      }, _this46.onPopoverClose = function () {
        _this46.opened = !1, _this46.emit("toolbox-closed");
      }, _this46.api = s, _this46.tools = e, _this46.i18nLabels = t;
      return _this46;
    }
    _inherits(kt, _ye3);
    return _createClass(kt, [{
      key: "isEmpty",
      get: function get() {
        return this.toolsToBeDisplayed.length === 0;
      }
    }, {
      key: "make",
      value: function make() {
        return this.popover = new ze({
          scopeElement: this.api.ui.nodes.redactor,
          searchable: !0,
          messages: {
            nothingFound: this.i18nLabels.nothingFound,
            search: this.i18nLabels.filter
          },
          items: this.toolboxItemsToBeDisplayed
        }), this.popover.on(be.Close, this.onPopoverClose), this.enableShortcuts(), this.nodes.toolbox = this.popover.getElement(), this.nodes.toolbox.classList.add(_kt.CSS.toolbox), this.nodes.toolbox;
      }
    }, {
      key: "hasFocus",
      value: function hasFocus() {
        var s;
        return (s = this.popover) == null ? void 0 : s.hasFocus();
      }
    }, {
      key: "destroy",
      value: function destroy() {
        var s;
        _superPropGet(kt, "destroy", this, 3)([]), this.nodes && this.nodes.toolbox && (this.nodes.toolbox.remove(), this.nodes.toolbox = null), this.removeAllShortcuts(), (s = this.popover) == null || s.off(be.Close, this.onPopoverClose);
      }
    }, {
      key: "toolButtonActivated",
      value: function toolButtonActivated(s, e) {
        this.insertNewBlock(s, e);
      }
    }, {
      key: "open",
      value: function open() {
        var s;
        this.isEmpty || ((s = this.popover) == null || s.show(), this.opened = !0, this.emit("toolbox-opened"));
      }
    }, {
      key: "close",
      value: function close() {
        var s;
        (s = this.popover) == null || s.hide(), this.opened = !1, this.emit("toolbox-closed");
      }
    }, {
      key: "toggle",
      value: function toggle() {
        this.opened ? this.close() : this.open();
      }
    }, {
      key: "toolsToBeDisplayed",
      get: function get() {
        var s = [];
        return this.tools.forEach(function (e) {
          e.toolbox && s.push(e);
        }), s;
      }
    }, {
      key: "toolboxItemsToBeDisplayed",
      get: function get() {
        var _this47 = this;
        var s = function s(e, t) {
          return {
            icon: e.icon,
            title: H.t(K.toolNames, e.title || ne(t.name)),
            name: t.name,
            onActivate: function onActivate() {
              _this47.toolButtonActivated(t.name, e.data);
            },
            secondaryLabel: t.shortcut ? we(t.shortcut) : ""
          };
        };
        return this.toolsToBeDisplayed.reduce(function (e, t) {
          return Array.isArray(t.toolbox) ? t.toolbox.forEach(function (o) {
            e.push(s(o, t));
          }) : t.toolbox !== void 0 && e.push(s(t.toolbox, t)), e;
        }, []);
      }
    }, {
      key: "enableShortcuts",
      value: function enableShortcuts() {
        var _this48 = this;
        this.toolsToBeDisplayed.forEach(function (s) {
          var e = s.shortcut;
          e && _this48.enableShortcutForTool(s.name, e);
        });
      }
    }, {
      key: "enableShortcutForTool",
      value: function enableShortcutForTool(s, e) {
        var _this49 = this;
        le.add({
          name: e,
          on: this.api.ui.nodes.redactor,
          handler: function handler(t) {
            t.preventDefault();
            var o = _this49.api.blocks.getCurrentBlockIndex(),
              i = _this49.api.blocks.getBlockByIndex(o);
            if (i) try {
              _this49.api.blocks.convert(i.id, s), window.requestAnimationFrame(function () {
                _this49.api.caret.setToBlock(o, "end");
              });
              return;
            } catch (_unused5) {}
            _this49.insertNewBlock(s);
          }
        });
      }
    }, {
      key: "removeAllShortcuts",
      value: function removeAllShortcuts() {
        var _this50 = this;
        this.toolsToBeDisplayed.forEach(function (s) {
          var e = s.shortcut;
          e && le.remove(_this50.api.ui.nodes.redactor, e);
        });
      }
    }, {
      key: "insertNewBlock",
      value: function () {
        var _insertNewBlock = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13(s, e) {
          var t, o, i, n, a, r;
          return _regeneratorRuntime().wrap(function _callee13$(_context13) {
            while (1) switch (_context13.prev = _context13.next) {
              case 0:
                t = this.api.blocks.getCurrentBlockIndex(), o = this.api.blocks.getBlockByIndex(t);
                if (o) {
                  _context13.next = 3;
                  break;
                }
                return _context13.abrupt("return");
              case 3:
                i = o.isEmpty ? t : t + 1;
                if (!e) {
                  _context13.next = 9;
                  break;
                }
                _context13.next = 7;
                return this.api.blocks.composeBlockData(s);
              case 7:
                a = _context13.sent;
                n = Object.assign(a, e);
              case 9:
                r = this.api.blocks.insert(s, n, void 0, i, void 0, o.isEmpty);
                r.call(X.APPEND_CALLBACK), this.api.caret.setToBlock(i), this.emit("toolbox-block-added", {
                  block: r
                }), this.api.toolbar.close();
              case 11:
              case "end":
                return _context13.stop();
            }
          }, _callee13, this);
        }));
        function insertNewBlock(_x10, _x11) {
          return _insertNewBlock.apply(this, arguments);
        }
        return insertNewBlock;
      }()
    }], [{
      key: "CSS",
      get: function get() {
        return {
          toolbox: "ce-toolbox"
        };
      }
    }]);
  }(ye);
  var je = _kt;
  mt([se], je.prototype, "toolsToBeDisplayed", 1), mt([se], je.prototype, "toolboxItemsToBeDisplayed", 1);
  var vt = "block hovered";
  function Yo(_x12, _x13) {
    return _Yo.apply(this, arguments);
  }
  function _Yo() {
    _Yo = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee51(s, e) {
      var t;
      return _regeneratorRuntime().wrap(function _callee51$(_context51) {
        while (1) switch (_context51.prev = _context51.next) {
          case 0:
            t = navigator.keyboard;
            _context51.t1 = t;
            if (!_context51.t1) {
              _context51.next = 6;
              break;
            }
            _context51.next = 5;
            return t.getLayoutMap();
          case 5:
            _context51.t1 = _context51.sent.get(s);
          case 6:
            _context51.t0 = _context51.t1;
            if (_context51.t0) {
              _context51.next = 9;
              break;
            }
            _context51.t0 = e;
          case 9:
            return _context51.abrupt("return", _context51.t0);
          case 10:
          case "end":
            return _context51.stop();
        }
      }, _callee51);
    }));
    return _Yo.apply(this, arguments);
  }
  var Ko = /*#__PURE__*/function (_y19) {
    function Ko(_ref23) {
      var _this51;
      var e = _ref23.config,
        t = _ref23.eventsDispatcher;
      _classCallCheck(this, Ko);
      _this51 = _callSuper(this, Ko, [{
        config: e,
        eventsDispatcher: t
      }]), _this51.toolboxInstance = null;
      return _this51;
    }
    _inherits(Ko, _y19);
    return _createClass(Ko, [{
      key: "CSS",
      get: function get() {
        return {
          toolbar: "ce-toolbar",
          content: "ce-toolbar__content",
          actions: "ce-toolbar__actions",
          actionsOpened: "ce-toolbar__actions--opened",
          toolbarOpened: "ce-toolbar--opened",
          openedToolboxHolderModifier: "codex-editor--toolbox-opened",
          plusButton: "ce-toolbar__plus",
          plusButtonShortcut: "ce-toolbar__plus-shortcut",
          settingsToggler: "ce-toolbar__settings-btn",
          settingsTogglerHidden: "ce-toolbar__settings-btn--hidden"
        };
      }
    }, {
      key: "opened",
      get: function get() {
        return this.nodes.wrapper.classList.contains(this.CSS.toolbarOpened);
      }
    }, {
      key: "toolbox",
      get: function get() {
        var _this52 = this;
        var e;
        return {
          opened: (e = this.toolboxInstance) == null ? void 0 : e.opened,
          close: function close() {
            var t;
            (t = _this52.toolboxInstance) == null || t.close();
          },
          open: function open() {
            if (_this52.toolboxInstance === null) {
              T("toolbox.open() called before initialization is finished", "warn");
              return;
            }
            _this52.Editor.BlockManager.currentBlock = _this52.hoveredBlock, _this52.toolboxInstance.open();
          },
          toggle: function toggle() {
            if (_this52.toolboxInstance === null) {
              T("toolbox.toggle() called before initialization is finished", "warn");
              return;
            }
            _this52.toolboxInstance.toggle();
          },
          hasFocus: function hasFocus() {
            var t;
            return (t = _this52.toolboxInstance) == null ? void 0 : t.hasFocus();
          }
        };
      }
    }, {
      key: "blockActions",
      get: function get() {
        var _this53 = this;
        return {
          hide: function hide() {
            _this53.nodes.actions.classList.remove(_this53.CSS.actionsOpened);
          },
          show: function show() {
            _this53.nodes.actions.classList.add(_this53.CSS.actionsOpened);
          }
        };
      }
    }, {
      key: "blockTunesToggler",
      get: function get() {
        var _this54 = this;
        return {
          hide: function hide() {
            return _this54.nodes.settingsToggler.classList.add(_this54.CSS.settingsTogglerHidden);
          },
          show: function show() {
            return _this54.nodes.settingsToggler.classList.remove(_this54.CSS.settingsTogglerHidden);
          }
        };
      }
    }, {
      key: "toggleReadOnly",
      value: function toggleReadOnly(e) {
        var _this55 = this;
        e ? (this.destroy(), this.Editor.BlockSettings.destroy(), this.disableModuleBindings()) : window.requestIdleCallback(function () {
          _this55.drawUI(), _this55.enableModuleBindings();
        }, {
          timeout: 2e3
        });
      }
    }, {
      key: "moveAndOpen",
      value: function moveAndOpen() {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.Editor.BlockManager.currentBlock;
        if (this.toolboxInstance === null) {
          T("Can't open Toolbar since Editor initialization is not finished yet", "warn");
          return;
        }
        if (this.toolboxInstance.opened && this.toolboxInstance.close(), this.Editor.BlockSettings.opened && this.Editor.BlockSettings.close(), !e) return;
        this.hoveredBlock = e;
        var t = e.holder,
          o = this.Editor.UI.isMobile,
          i = e.pluginsContent,
          n = window.getComputedStyle(i),
          r = parseInt(n.paddingTop, 10),
          a = t.offsetHeight;
        var l;
        o ? l = t.offsetTop + a : l = t.offsetTop + r, this.nodes.wrapper.style.top = "".concat(Math.floor(l), "px"), this.Editor.BlockManager.blocks.length === 1 && e.isEmpty ? this.blockTunesToggler.hide() : this.blockTunesToggler.show(), this.open();
      }
    }, {
      key: "close",
      value: function close() {
        var e, t;
        this.Editor.ReadOnly.isEnabled || ((e = this.nodes.wrapper) == null || e.classList.remove(this.CSS.toolbarOpened), this.blockActions.hide(), (t = this.toolboxInstance) == null || t.close(), this.Editor.BlockSettings.close(), this.reset());
      }
    }, {
      key: "reset",
      value: function reset() {
        this.nodes.wrapper.style.top = "unset";
      }
    }, {
      key: "open",
      value: function open() {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !0;
        this.nodes.wrapper.classList.add(this.CSS.toolbarOpened), e ? this.blockActions.show() : this.blockActions.hide();
      }
    }, {
      key: "make",
      value: function () {
        var _make = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee14() {
          var _this56 = this;
          var e, t, o, i;
          return _regeneratorRuntime().wrap(function _callee14$(_context14) {
            while (1) switch (_context14.prev = _context14.next) {
              case 0:
                this.nodes.wrapper = c.make("div", this.CSS.toolbar), ["content", "actions"].forEach(function (n) {
                  _this56.nodes[n] = c.make("div", _this56.CSS[n]);
                }), c.append(this.nodes.wrapper, this.nodes.content), c.append(this.nodes.content, this.nodes.actions), this.nodes.plusButton = c.make("div", this.CSS.plusButton, {
                  innerHTML: _o
                }), c.append(this.nodes.actions, this.nodes.plusButton), this.readOnlyMutableListeners.on(this.nodes.plusButton, "click", function () {
                  He(!0), _this56.plusButtonClicked();
                }, !1);
                e = c.make("div");
                e.appendChild(document.createTextNode(H.ui(K.ui.toolbar.toolbox, "Add"))), e.appendChild(c.make("div", this.CSS.plusButtonShortcut, {
                  textContent: "/"
                })), ue(this.nodes.plusButton, e, {
                  hidingDelay: 400
                }), this.nodes.settingsToggler = c.make("span", this.CSS.settingsToggler, {
                  innerHTML: Ao
                }), c.append(this.nodes.actions, this.nodes.settingsToggler);
                t = c.make("div");
                o = c.text(H.ui(K.ui.blockTunes.toggler, "Click to tune"));
                _context14.next = 7;
                return Yo("Slash", "/");
              case 7:
                i = _context14.sent;
                t.appendChild(o), t.appendChild(c.make("div", this.CSS.plusButtonShortcut, {
                  textContent: we("CMD + ".concat(i))
                })), ue(this.nodes.settingsToggler, t, {
                  hidingDelay: 400
                }), c.append(this.nodes.actions, this.makeToolbox()), c.append(this.nodes.actions, this.Editor.BlockSettings.getElement()), c.append(this.Editor.UI.nodes.wrapper, this.nodes.wrapper);
              case 9:
              case "end":
                return _context14.stop();
            }
          }, _callee14, this);
        }));
        function make() {
          return _make.apply(this, arguments);
        }
        return make;
      }()
    }, {
      key: "makeToolbox",
      value: function makeToolbox() {
        var _this57 = this;
        return this.toolboxInstance = new je({
          api: this.Editor.API.methods,
          tools: this.Editor.Tools.blockTools,
          i18nLabels: {
            filter: H.ui(K.ui.popover, "Filter"),
            nothingFound: H.ui(K.ui.popover, "Nothing found")
          }
        }), this.toolboxInstance.on(Ee.Opened, function () {
          _this57.Editor.UI.nodes.wrapper.classList.add(_this57.CSS.openedToolboxHolderModifier);
        }), this.toolboxInstance.on(Ee.Closed, function () {
          _this57.Editor.UI.nodes.wrapper.classList.remove(_this57.CSS.openedToolboxHolderModifier);
        }), this.toolboxInstance.on(Ee.BlockAdded, function (_ref24) {
          var e = _ref24.block;
          var _this57$Editor = _this57.Editor,
            t = _this57$Editor.BlockManager,
            o = _this57$Editor.Caret,
            i = t.getBlockById(e.id);
          i.inputs.length === 0 && (i === t.lastBlock ? (t.insertAtEnd(), o.setToBlock(t.lastBlock)) : o.setToBlock(t.nextBlock));
        }), this.toolboxInstance.make();
      }
    }, {
      key: "plusButtonClicked",
      value: function plusButtonClicked() {
        var e;
        this.Editor.BlockManager.currentBlock = this.hoveredBlock, (e = this.toolboxInstance) == null || e.toggle();
      }
    }, {
      key: "enableModuleBindings",
      value: function enableModuleBindings() {
        var _this58 = this;
        this.readOnlyMutableListeners.on(this.nodes.settingsToggler, "mousedown", function (e) {
          var t;
          e.stopPropagation(), _this58.settingsTogglerClicked(), (t = _this58.toolboxInstance) != null && t.opened && _this58.toolboxInstance.close(), He(!0);
        }, !0), ee() || this.eventsDispatcher.on(vt, function (e) {
          var t;
          _this58.Editor.BlockSettings.opened || (t = _this58.toolboxInstance) != null && t.opened || _this58.moveAndOpen(e.block);
        });
      }
    }, {
      key: "disableModuleBindings",
      value: function disableModuleBindings() {
        this.readOnlyMutableListeners.clearAll();
      }
    }, {
      key: "settingsTogglerClicked",
      value: function settingsTogglerClicked() {
        this.Editor.BlockManager.currentBlock = this.hoveredBlock, this.Editor.BlockSettings.opened ? this.Editor.BlockSettings.close() : this.Editor.BlockSettings.open(this.hoveredBlock);
      }
    }, {
      key: "drawUI",
      value: function drawUI() {
        this.Editor.BlockSettings.make(), this.make();
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.removeAllNodes(), this.toolboxInstance && this.toolboxInstance.destroy();
      }
    }]);
  }(y);
  var Be = function (s) {
      return s[s.Block = 0] = "Block", s[s.Inline = 1] = "Inline", s[s.Tune = 2] = "Tune", s;
    }(Be || {}),
    Te = function (s) {
      return s.Shortcut = "shortcut", s.Toolbox = "toolbox", s.EnabledInlineTools = "inlineToolbar", s.EnabledBlockTunes = "tunes", s.Config = "config", s;
    }(Te || {}),
    xt = function (s) {
      return s.Shortcut = "shortcut", s.SanitizeConfig = "sanitize", s;
    }(xt || {}),
    ce = function (s) {
      return s.IsEnabledLineBreaks = "enableLineBreaks", s.Toolbox = "toolbox", s.ConversionConfig = "conversionConfig", s.IsReadOnlySupported = "isReadOnlySupported", s.PasteConfig = "pasteConfig", s;
    }(ce || {}),
    $e = function (s) {
      return s.IsInline = "isInline", s.Title = "title", s;
    }($e || {}),
    wt = function (s) {
      return s.IsTune = "isTune", s;
    }(wt || {});
  var We = /*#__PURE__*/function () {
    function We(_ref25) {
      var e = _ref25.name,
        t = _ref25.constructable,
        o = _ref25.config,
        i = _ref25.api,
        n = _ref25.isDefault,
        _ref25$isInternal = _ref25.isInternal,
        r = _ref25$isInternal === void 0 ? !1 : _ref25$isInternal,
        a = _ref25.defaultPlaceholder;
      _classCallCheck(this, We);
      this.api = i, this.name = e, this.constructable = t, this.config = o, this.isDefault = n, this.isInternal = r, this.defaultPlaceholder = a;
    }
    return _createClass(We, [{
      key: "settings",
      get: function get() {
        var e = this.config.config || {};
        return this.isDefault && !("placeholder" in e) && this.defaultPlaceholder && (e.placeholder = this.defaultPlaceholder), e;
      }
    }, {
      key: "reset",
      value: function reset() {
        if (M(this.constructable.reset)) return this.constructable.reset();
      }
    }, {
      key: "prepare",
      value: function prepare() {
        if (M(this.constructable.prepare)) return this.constructable.prepare({
          toolName: this.name,
          config: this.settings
        });
      }
    }, {
      key: "shortcut",
      get: function get() {
        var e = this.constructable.shortcut;
        return this.config.shortcut || e;
      }
    }, {
      key: "sanitizeConfig",
      get: function get() {
        return this.constructable.sanitize || {};
      }
    }, {
      key: "isInline",
      value: function isInline() {
        return this.type === 1;
      }
    }, {
      key: "isBlock",
      value: function isBlock() {
        return this.type === 0;
      }
    }, {
      key: "isTune",
      value: function isTune() {
        return this.type === 2;
      }
    }]);
  }();
  var Xo = /*#__PURE__*/function (_y20) {
    function Xo(_ref26) {
      var _this59;
      var e = _ref26.config,
        t = _ref26.eventsDispatcher;
      _classCallCheck(this, Xo);
      _this59 = _callSuper(this, Xo, [{
        config: e,
        eventsDispatcher: t
      }]), _this59.CSS = {
        inlineToolbar: "ce-inline-toolbar",
        inlineToolbarShowed: "ce-inline-toolbar--showed",
        inlineToolbarLeftOriented: "ce-inline-toolbar--left-oriented",
        inlineToolbarRightOriented: "ce-inline-toolbar--right-oriented",
        inlineToolbarShortcut: "ce-inline-toolbar__shortcut",
        buttonsWrapper: "ce-inline-toolbar__buttons",
        actionsWrapper: "ce-inline-toolbar__actions",
        inlineToolButton: "ce-inline-tool",
        inputField: "cdx-input",
        focusedButton: "ce-inline-tool--focused",
        conversionToggler: "ce-inline-toolbar__dropdown",
        conversionTogglerArrow: "ce-inline-toolbar__dropdown-arrow",
        conversionTogglerHidden: "ce-inline-toolbar__dropdown--hidden",
        conversionTogglerContent: "ce-inline-toolbar__dropdown-content",
        togglerAndButtonsWrapper: "ce-inline-toolbar__toggler-and-button-wrapper"
      }, _this59.opened = !1, _this59.toolbarVerticalMargin = ee() ? 20 : 6, _this59.buttonsList = null, _this59.width = 0, _this59.flipper = null;
      return _this59;
    }
    _inherits(Xo, _y20);
    return _createClass(Xo, [{
      key: "toggleReadOnly",
      value: function toggleReadOnly(e) {
        var _this60 = this;
        e ? (this.destroy(), this.Editor.ConversionToolbar.destroy()) : window.requestIdleCallback(function () {
          _this60.make();
        }, {
          timeout: 2e3
        });
      }
    }, {
      key: "tryToShow",
      value: function () {
        var _tryToShow = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee15() {
          var e,
            t,
            _args15 = arguments;
          return _regeneratorRuntime().wrap(function _callee15$(_context15) {
            while (1) switch (_context15.prev = _context15.next) {
              case 0:
                e = _args15.length > 0 && _args15[0] !== undefined ? _args15[0] : !1;
                t = _args15.length > 1 && _args15[1] !== undefined ? _args15[1] : !0;
                e && this.close();
                _context15.t0 = this.allowedToShow();
                if (!_context15.t0) {
                  _context15.next = 10;
                  break;
                }
                _context15.next = 7;
                return this.addToolsFiltered(t);
              case 7:
                this.move();
                this.open(t);
                this.Editor.Toolbar.close();
              case 10:
              case "end":
                return _context15.stop();
            }
          }, _callee15, this);
        }));
        function tryToShow() {
          return _tryToShow.apply(this, arguments);
        }
        return tryToShow;
      }()
    }, {
      key: "close",
      value: function close() {
        var _this61 = this;
        this.opened && (this.Editor.ReadOnly.isEnabled || (this.nodes.wrapper.classList.remove(this.CSS.inlineToolbarShowed), Array.from(this.toolsInstances.entries()).forEach(function (_ref27) {
          var _ref28 = _slicedToArray(_ref27, 2),
            e = _ref28[0],
            t = _ref28[1];
          var o = _this61.getToolShortcut(e);
          o && le.remove(_this61.Editor.UI.nodes.redactor, o), M(t.clear) && t.clear();
        }), this.reset(), this.opened = !1, this.flipper.deactivate(), this.Editor.ConversionToolbar.close()));
      }
    }, {
      key: "containsNode",
      value: function containsNode(e) {
        return this.nodes.wrapper === void 0 ? !1 : this.nodes.wrapper.contains(e);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.flipper && (this.flipper.deactivate(), this.flipper = null), this.removeAllNodes();
      }
    }, {
      key: "make",
      value: function make() {
        var _this62 = this;
        this.nodes.wrapper = c.make("div", [this.CSS.inlineToolbar].concat(_toConsumableArray(this.isRtl ? [this.Editor.UI.CSS.editorRtlFix] : []))), this.nodes.togglerAndButtonsWrapper = c.make("div", this.CSS.togglerAndButtonsWrapper), this.nodes.buttons = c.make("div", this.CSS.buttonsWrapper), this.nodes.actions = c.make("div", this.CSS.actionsWrapper), this.listeners.on(this.nodes.wrapper, "mousedown", function (e) {
          e.target.closest(".".concat(_this62.CSS.actionsWrapper)) || e.preventDefault();
        }), c.append(this.nodes.wrapper, [this.nodes.togglerAndButtonsWrapper, this.nodes.actions]), c.append(this.Editor.UI.nodes.wrapper, this.nodes.wrapper), this.addConversionToggler(), c.append(this.nodes.togglerAndButtonsWrapper, this.nodes.buttons), this.prepareConversionToolbar(), window.requestAnimationFrame(function () {
          _this62.recalculateWidth();
        }), this.enableFlipper();
      }
    }, {
      key: "open",
      value: function open() {
        if (this.opened) return;
        this.nodes.wrapper.classList.add(this.CSS.inlineToolbarShowed), this.buttonsList = this.nodes.buttons.querySelectorAll(".".concat(this.CSS.inlineToolButton)), this.opened = !0;
        var e = Array.from(this.buttonsList);
        e.unshift(this.nodes.conversionToggler), e = e.filter(function (t) {
          return !t.hidden;
        }), this.flipper.activate(e);
      }
    }, {
      key: "move",
      value: function move() {
        var e = g.rect,
          t = this.Editor.UI.nodes.wrapper.getBoundingClientRect(),
          o = {
            x: e.x - t.x,
            y: e.y + e.height - t.top + this.toolbarVerticalMargin
          };
        o.x + this.width + t.x > this.Editor.UI.contentRect.right && (o.x = this.Editor.UI.contentRect.right - this.width - t.x), this.nodes.wrapper.style.left = Math.floor(o.x) + "px", this.nodes.wrapper.style.top = Math.floor(o.y) + "px";
      }
    }, {
      key: "reset",
      value: function reset() {
        this.nodes.wrapper.classList.remove(this.CSS.inlineToolbarLeftOriented, this.CSS.inlineToolbarRightOriented), this.nodes.wrapper.style.left = "0", this.nodes.wrapper.style.top = "0";
      }
    }, {
      key: "allowedToShow",
      value: function allowedToShow() {
        var e = ["IMG", "INPUT"],
          t = g.get(),
          o = g.text;
        if (!t || !t.anchorNode || t.isCollapsed || o.length < 1) return !1;
        var i = c.isElement(t.anchorNode) ? t.anchorNode : t.anchorNode.parentElement;
        if (t && e.includes(i.tagName) || i.closest('[contenteditable="true"]') === null) return !1;
        var r = this.Editor.BlockManager.getBlock(t.anchorNode);
        return r ? r.tool.inlineTools.size !== 0 : !1;
      }
    }, {
      key: "recalculateWidth",
      value: function recalculateWidth() {
        this.width = this.nodes.wrapper.offsetWidth;
      }
    }, {
      key: "addConversionToggler",
      value: function addConversionToggler() {
        var _this63 = this;
        this.nodes.conversionToggler = c.make("div", this.CSS.conversionToggler), this.nodes.conversionTogglerContent = c.make("div", this.CSS.conversionTogglerContent);
        var e = c.make("div", this.CSS.conversionTogglerArrow, {
          innerHTML: ft
        });
        this.nodes.conversionToggler.appendChild(this.nodes.conversionTogglerContent), this.nodes.conversionToggler.appendChild(e), this.nodes.togglerAndButtonsWrapper.appendChild(this.nodes.conversionToggler), this.listeners.on(this.nodes.conversionToggler, "click", function () {
          _this63.Editor.ConversionToolbar.toggle(function (t) {
            !t && _this63.opened ? _this63.flipper.activate() : _this63.opened && _this63.flipper.deactivate();
          });
        }), ee() === !1 && ue(this.nodes.conversionToggler, H.ui(K.ui.inlineToolbar.converter, "Convert to"), {
          placement: "top",
          hidingDelay: 100
        });
      }
    }, {
      key: "setConversionTogglerContent",
      value: function () {
        var _setConversionTogglerContent = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee16() {
          var e, t, o, i, n, r;
          return _regeneratorRuntime().wrap(function _callee16$(_context16) {
            while (1) switch (_context16.prev = _context16.next) {
              case 0:
                e = this.Editor.BlockManager, t = e.currentBlock, o = t.name, i = t.tool.conversionConfig, n = i && i.export;
                this.nodes.conversionToggler.hidden = !n, this.nodes.conversionToggler.classList.toggle(this.CSS.conversionTogglerHidden, !n);
                _context16.next = 4;
                return t.getActiveToolboxEntry();
              case 4:
                _context16.t0 = _context16.sent;
                if (_context16.t0) {
                  _context16.next = 7;
                  break;
                }
                _context16.t0 = {};
              case 7:
                r = _context16.t0;
                this.nodes.conversionTogglerContent.innerHTML = r.icon || r.title || ne(o);
              case 9:
              case "end":
                return _context16.stop();
            }
          }, _callee16, this);
        }));
        function setConversionTogglerContent() {
          return _setConversionTogglerContent.apply(this, arguments);
        }
        return setConversionTogglerContent;
      }()
    }, {
      key: "prepareConversionToolbar",
      value: function prepareConversionToolbar() {
        var e = this.Editor.ConversionToolbar.make();
        c.append(this.nodes.wrapper, e);
      }
    }, {
      key: "addToolsFiltered",
      value: function () {
        var _addToolsFiltered = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee17() {
          var _this64 = this;
          var e,
            t,
            o,
            _args17 = arguments;
          return _regeneratorRuntime().wrap(function _callee17$(_context17) {
            while (1) switch (_context17.prev = _context17.next) {
              case 0:
                e = _args17.length > 0 && _args17[0] !== undefined ? _args17[0] : !0;
                t = g.get(), o = this.Editor.BlockManager.getBlock(t.anchorNode);
                this.nodes.buttons.innerHTML = "";
                this.nodes.actions.innerHTML = "";
                this.toolsInstances = new Map();
                Array.from(o.tool.inlineTools.values()).forEach(function (i) {
                  _this64.addTool(i);
                });
                if (!(e && this.Editor.ConversionToolbar.hasTools())) {
                  _context17.next = 11;
                  break;
                }
                _context17.next = 9;
                return this.setConversionTogglerContent();
              case 9:
                _context17.next = 12;
                break;
              case 11:
                this.nodes.conversionToggler.hidden = !0;
              case 12:
                this.recalculateWidth();
              case 13:
              case "end":
                return _context17.stop();
            }
          }, _callee17, this);
        }));
        function addToolsFiltered() {
          return _addToolsFiltered.apply(this, arguments);
        }
        return addToolsFiltered;
      }()
    }, {
      key: "addTool",
      value: function addTool(e) {
        var _this65 = this;
        var t = e.create(),
          o = t.render();
        if (!o) {
          T("Render method must return an instance of Node", "warn", e.name);
          return;
        }
        if (o.dataset.tool = e.name, this.nodes.buttons.appendChild(o), this.toolsInstances.set(e.name, t), M(t.renderActions)) {
          var a = t.renderActions();
          this.nodes.actions.appendChild(a);
        }
        this.listeners.on(o, "click", function (a) {
          _this65.toolClicked(t), a.preventDefault();
        });
        var i = this.getToolShortcut(e.name);
        if (i) try {
          this.enableShortcuts(t, i);
        } catch (_unused6) {}
        var n = c.make("div"),
          r = H.t(K.toolNames, e.title || ne(e.name));
        n.appendChild(c.text(r)), i && n.appendChild(c.make("div", this.CSS.inlineToolbarShortcut, {
          textContent: we(i)
        })), ee() === !1 && ue(o, n, {
          placement: "top",
          hidingDelay: 100
        }), t.checkState(g.get());
      }
    }, {
      key: "getToolShortcut",
      value: function getToolShortcut(e) {
        var t = this.Editor.Tools,
          o = t.inlineTools.get(e),
          i = t.internal.inlineTools;
        return Array.from(i.keys()).includes(e) ? this.inlineTools[e][xt.Shortcut] : o.shortcut;
      }
    }, {
      key: "enableShortcuts",
      value: function enableShortcuts(e, t) {
        var _this66 = this;
        le.add({
          name: t,
          handler: function handler(o) {
            var i = _this66.Editor.BlockManager.currentBlock;
            i && i.tool.enabledInlineTools && (o.preventDefault(), _this66.toolClicked(e));
          },
          on: this.Editor.UI.nodes.redactor
        });
      }
    }, {
      key: "toolClicked",
      value: function toolClicked(e) {
        var t = g.range;
        e.surround(t), this.checkToolsState(), e.renderActions !== void 0 && this.flipper.deactivate();
      }
    }, {
      key: "checkToolsState",
      value: function checkToolsState() {
        this.toolsInstances.forEach(function (e) {
          e.checkState(g.get());
        });
      }
    }, {
      key: "inlineTools",
      get: function get() {
        var e = {};
        return Array.from(this.Editor.Tools.inlineTools.entries()).forEach(function (_ref29) {
          var _ref30 = _slicedToArray(_ref29, 2),
            t = _ref30[0],
            o = _ref30[1];
          e[t] = o.create();
        }), e;
      }
    }, {
      key: "enableFlipper",
      value: function enableFlipper() {
        this.flipper = new q({
          focusedItemClass: this.CSS.focusedButton,
          allowedKeys: [k.ENTER, k.TAB]
        });
      }
    }]);
  }(y);
  var Vo = /*#__PURE__*/function (_y21) {
    function Vo() {
      _classCallCheck(this, Vo);
      return _callSuper(this, Vo, arguments);
    }
    _inherits(Vo, _y21);
    return _createClass(Vo, [{
      key: "keydown",
      value: function keydown(e) {
        switch (this.beforeKeydownProcessing(e), e.keyCode) {
          case k.BACKSPACE:
            this.backspace(e);
            break;
          case k.DELETE:
            this.delete(e);
            break;
          case k.ENTER:
            this.enter(e);
            break;
          case k.DOWN:
          case k.RIGHT:
            this.arrowRightAndDown(e);
            break;
          case k.UP:
          case k.LEFT:
            this.arrowLeftAndUp(e);
            break;
          case k.TAB:
            this.tabPressed(e);
            break;
        }
        e.key === "/" && !e.ctrlKey && !e.metaKey && this.slashPressed(), e.code === "Slash" && (e.ctrlKey || e.metaKey) && (e.preventDefault(), this.commandSlashPressed());
      }
    }, {
      key: "beforeKeydownProcessing",
      value: function beforeKeydownProcessing(e) {
        this.needToolbarClosing(e) && tt(e.keyCode) && (this.Editor.Toolbar.close(), this.Editor.ConversionToolbar.close(), e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || this.Editor.BlockSelection.clearSelection(e));
      }
    }, {
      key: "keyup",
      value: function keyup(e) {
        e.shiftKey || this.Editor.UI.checkEmptiness();
      }
    }, {
      key: "dragOver",
      value: function dragOver(e) {
        var t = this.Editor.BlockManager.getBlockByChildNode(e.target);
        t.dropTarget = !0;
      }
    }, {
      key: "dragLeave",
      value: function dragLeave(e) {
        var t = this.Editor.BlockManager.getBlockByChildNode(e.target);
        t.dropTarget = !1;
      }
    }, {
      key: "handleCommandC",
      value: function handleCommandC(e) {
        var t = this.Editor.BlockSelection;
        t.anyBlockSelected && t.copySelectedBlocks(e);
      }
    }, {
      key: "handleCommandX",
      value: function handleCommandX(e) {
        var _this$Editor2 = this.Editor,
          t = _this$Editor2.BlockSelection,
          o = _this$Editor2.BlockManager,
          i = _this$Editor2.Caret;
        t.anyBlockSelected && t.copySelectedBlocks(e).then(function () {
          var n = o.removeSelectedBlocks(),
            r = o.insertDefaultBlockAtIndex(n, !0);
          i.setToBlock(r, i.positions.START), t.clearSelection(e);
        });
      }
    }, {
      key: "tabPressed",
      value: function tabPressed(e) {
        var _this$Editor3 = this.Editor,
          t = _this$Editor3.InlineToolbar,
          o = _this$Editor3.ConversionToolbar,
          i = _this$Editor3.Caret;
        if (o.opened || t.opened) return;
        (e.shiftKey ? i.navigatePrevious(!0) : i.navigateNext(!0)) && e.preventDefault();
      }
    }, {
      key: "commandSlashPressed",
      value: function commandSlashPressed() {
        this.Editor.BlockSelection.selectedBlocks.length > 1 || this.activateBlockSettings();
      }
    }, {
      key: "slashPressed",
      value: function slashPressed() {
        this.Editor.BlockManager.currentBlock.isEmpty && this.activateToolbox();
      }
    }, {
      key: "enter",
      value: function enter(e) {
        var _this$Editor4 = this.Editor,
          t = _this$Editor4.BlockManager,
          o = _this$Editor4.UI;
        if (t.currentBlock.tool.isLineBreaksEnabled || o.someToolbarOpened && o.someFlipperButtonFocused || e.shiftKey) return;
        var n = this.Editor.BlockManager.currentBlock;
        this.Editor.Caret.isAtStart && !this.Editor.BlockManager.currentBlock.hasMedia ? this.Editor.BlockManager.insertDefaultBlockAtIndex(this.Editor.BlockManager.currentBlockIndex) : this.Editor.Caret.isAtEnd ? n = this.Editor.BlockManager.insertDefaultBlockAtIndex(this.Editor.BlockManager.currentBlockIndex + 1) : n = this.Editor.BlockManager.split(), this.Editor.Caret.setToBlock(n), this.Editor.Toolbar.moveAndOpen(n), e.preventDefault();
      }
    }, {
      key: "backspace",
      value: function backspace(e) {
        var _this$Editor5 = this.Editor,
          t = _this$Editor5.BlockManager,
          o = _this$Editor5.Caret,
          i = t.currentBlock,
          n = t.previousBlock;
        if (!g.isCollapsed || !o.isAtStart) return;
        if (e.preventDefault(), this.Editor.Toolbar.close(), !(i.currentInput === i.firstInput)) {
          o.navigatePrevious();
          return;
        }
        if (n === null) return;
        if (n.isEmpty) {
          t.removeBlock(n);
          return;
        }
        if (i.isEmpty) {
          t.removeBlock(i);
          var l = t.currentBlock;
          o.setToBlock(l, o.positions.END);
          return;
        }
        ht(i, n) ? this.mergeBlocks(n, i) : o.setToBlock(n, o.positions.END);
      }
    }, {
      key: "delete",
      value: function _delete(e) {
        var _this$Editor6 = this.Editor,
          t = _this$Editor6.BlockManager,
          o = _this$Editor6.Caret,
          i = t.currentBlock,
          n = t.nextBlock;
        if (!g.isCollapsed || !o.isAtEnd) return;
        if (e.preventDefault(), this.Editor.Toolbar.close(), !(i.currentInput === i.lastInput)) {
          o.navigateNext();
          return;
        }
        if (n === null) return;
        if (n.isEmpty) {
          t.removeBlock(n);
          return;
        }
        if (i.isEmpty) {
          t.removeBlock(i), o.setToBlock(n, o.positions.START);
          return;
        }
        ht(i, n) ? this.mergeBlocks(i, n) : o.setToBlock(n, o.positions.START);
      }
    }, {
      key: "mergeBlocks",
      value: function mergeBlocks(e, t) {
        var _this$Editor7 = this.Editor,
          o = _this$Editor7.BlockManager,
          i = _this$Editor7.Caret,
          n = _this$Editor7.Toolbar;
        i.createShadow(e.pluginsContent), o.mergeBlocks(e, t).then(function () {
          window.requestAnimationFrame(function () {
            i.restoreCaret(e.pluginsContent), e.pluginsContent.normalize(), n.close();
          });
        });
      }
    }, {
      key: "arrowRightAndDown",
      value: function arrowRightAndDown(e) {
        var _this67 = this;
        var t = q.usedKeys.includes(e.keyCode) && (!e.shiftKey || e.keyCode === k.TAB);
        if (this.Editor.UI.someToolbarOpened && t) return;
        this.Editor.Toolbar.close();
        var o = this.Editor.Caret.isAtEnd || this.Editor.BlockSelection.anyBlockSelected;
        if (e.shiftKey && e.keyCode === k.DOWN && o) {
          this.Editor.CrossBlockSelection.toggleBlockSelectedState();
          return;
        }
        if (e.keyCode === k.DOWN || e.keyCode === k.RIGHT && !this.isRtl ? this.Editor.Caret.navigateNext() : this.Editor.Caret.navigatePrevious()) {
          e.preventDefault();
          return;
        }
        xe(function () {
          _this67.Editor.BlockManager.currentBlock && _this67.Editor.BlockManager.currentBlock.updateCurrentInput();
        }, 20)(), this.Editor.BlockSelection.clearSelection(e);
      }
    }, {
      key: "arrowLeftAndUp",
      value: function arrowLeftAndUp(e) {
        var _this68 = this;
        if (this.Editor.UI.someToolbarOpened) {
          if (q.usedKeys.includes(e.keyCode) && (!e.shiftKey || e.keyCode === k.TAB)) return;
          this.Editor.UI.closeAllToolbars();
        }
        this.Editor.Toolbar.close();
        var t = this.Editor.Caret.isAtStart || this.Editor.BlockSelection.anyBlockSelected;
        if (e.shiftKey && e.keyCode === k.UP && t) {
          this.Editor.CrossBlockSelection.toggleBlockSelectedState(!1);
          return;
        }
        if (e.keyCode === k.UP || e.keyCode === k.LEFT && !this.isRtl ? this.Editor.Caret.navigatePrevious() : this.Editor.Caret.navigateNext()) {
          e.preventDefault();
          return;
        }
        xe(function () {
          _this68.Editor.BlockManager.currentBlock && _this68.Editor.BlockManager.currentBlock.updateCurrentInput();
        }, 20)(), this.Editor.BlockSelection.clearSelection(e);
      }
    }, {
      key: "needToolbarClosing",
      value: function needToolbarClosing(e) {
        var t = e.keyCode === k.ENTER && this.Editor.Toolbar.toolbox.opened,
          o = e.keyCode === k.ENTER && this.Editor.BlockSettings.opened,
          i = e.keyCode === k.ENTER && this.Editor.InlineToolbar.opened,
          n = e.keyCode === k.ENTER && this.Editor.ConversionToolbar.opened,
          r = e.keyCode === k.TAB;
        return !(e.shiftKey || r || t || o || i || n);
      }
    }, {
      key: "activateToolbox",
      value: function activateToolbox() {
        this.Editor.Toolbar.opened || this.Editor.Toolbar.moveAndOpen(), this.Editor.Toolbar.toolbox.open();
      }
    }, {
      key: "activateBlockSettings",
      value: function activateBlockSettings() {
        this.Editor.Toolbar.opened || this.Editor.Toolbar.moveAndOpen(), this.Editor.BlockSettings.opened || this.Editor.BlockSettings.open();
      }
    }]);
  }(y);
  var Ye = /*#__PURE__*/function () {
    function Ye(e) {
      _classCallCheck(this, Ye);
      this.blocks = [], this.workingArea = e;
    }
    return _createClass(Ye, [{
      key: "length",
      get: function get() {
        return this.blocks.length;
      }
    }, {
      key: "array",
      get: function get() {
        return this.blocks;
      }
    }, {
      key: "nodes",
      get: function get() {
        return ot(this.workingArea.children);
      }
    }, {
      key: "push",
      value: function push(e) {
        this.blocks.push(e), this.insertToDOM(e);
      }
    }, {
      key: "swap",
      value: function swap(e, t) {
        var o = this.blocks[t];
        c.swap(this.blocks[e].holder, o.holder), this.blocks[t] = this.blocks[e], this.blocks[e] = o;
      }
    }, {
      key: "move",
      value: function move(e, t) {
        var o = this.blocks.splice(t, 1)[0],
          i = e - 1,
          n = Math.max(0, i),
          r = this.blocks[n];
        e > 0 ? this.insertToDOM(o, "afterend", r) : this.insertToDOM(o, "beforebegin", r), this.blocks.splice(e, 0, o);
        var a = this.composeBlockEvent("move", {
          fromIndex: t,
          toIndex: e
        });
        o.call(X.MOVED, a);
      }
    }, {
      key: "insert",
      value: function insert(e, t) {
        var o = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
        if (!this.length) {
          this.push(t);
          return;
        }
        e > this.length && (e = this.length), o && (this.blocks[e].holder.remove(), this.blocks[e].call(X.REMOVED));
        var i = o ? 1 : 0;
        if (this.blocks.splice(e, i, t), e > 0) {
          var n = this.blocks[e - 1];
          this.insertToDOM(t, "afterend", n);
        } else {
          var _n = this.blocks[e + 1];
          _n ? this.insertToDOM(t, "beforebegin", _n) : this.insertToDOM(t);
        }
      }
    }, {
      key: "replace",
      value: function replace(e, t) {
        if (this.blocks[e] === void 0) throw Error("Incorrect index");
        this.blocks[e].holder.replaceWith(t.holder), this.blocks[e] = t;
      }
    }, {
      key: "insertMany",
      value: function insertMany(e, t) {
        var _this$blocks2;
        var o = new DocumentFragment();
        var _iterator2 = _createForOfIteratorHelper(e),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _i = _step2.value;
            o.appendChild(_i.holder);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        if (this.length > 0) {
          var _this$blocks;
          if (t > 0) {
            var i = Math.min(t - 1, this.length - 1);
            this.blocks[i].holder.after(o);
          } else t === 0 && this.workingArea.prepend(o);
          (_this$blocks = this.blocks).splice.apply(_this$blocks, [t, 0].concat(_toConsumableArray(e)));
        } else (_this$blocks2 = this.blocks).push.apply(_this$blocks2, _toConsumableArray(e)), this.workingArea.appendChild(o);
        e.forEach(function (i) {
          return i.call(X.RENDERED);
        });
      }
    }, {
      key: "remove",
      value: function remove(e) {
        isNaN(e) && (e = this.length - 1), this.blocks[e].holder.remove(), this.blocks[e].call(X.REMOVED), this.blocks.splice(e, 1);
      }
    }, {
      key: "removeAll",
      value: function removeAll() {
        this.workingArea.innerHTML = "", this.blocks.forEach(function (e) {
          return e.call(X.REMOVED);
        }), this.blocks.length = 0;
      }
    }, {
      key: "insertAfter",
      value: function insertAfter(e, t) {
        var o = this.blocks.indexOf(e);
        this.insert(o + 1, t);
      }
    }, {
      key: "get",
      value: function get(e) {
        return this.blocks[e];
      }
    }, {
      key: "indexOf",
      value: function indexOf(e) {
        return this.blocks.indexOf(e);
      }
    }, {
      key: "insertToDOM",
      value: function insertToDOM(e, t, o) {
        t ? o.holder.insertAdjacentElement(t, e.holder) : this.workingArea.appendChild(e.holder), e.call(X.RENDERED);
      }
    }, {
      key: "composeBlockEvent",
      value: function composeBlockEvent(e, t) {
        return new CustomEvent(e, {
          detail: t
        });
      }
    }], [{
      key: "set",
      value: function set(e, t, o) {
        return isNaN(Number(t)) ? (Reflect.set(e, t, o), !0) : (e.insert(+t, o), !0);
      }
    }, {
      key: "get",
      value: function get(e, t) {
        return isNaN(Number(t)) ? Reflect.get(e, t) : e.get(+t);
      }
    }]);
  }();
  var yt = "block-removed",
    Et = "block-added",
    qo = "block-moved",
    Bt = "block-changed";
  var Zo = /*#__PURE__*/function () {
    function Zo() {
      _classCallCheck(this, Zo);
      this.completed = Promise.resolve();
    }
    return _createClass(Zo, [{
      key: "add",
      value: function add(e) {
        var _this69 = this;
        return new Promise(function (t, o) {
          _this69.completed = _this69.completed.then(e).then(t).catch(o);
        });
      }
    }]);
  }();
  var Go = /*#__PURE__*/function (_y22) {
    function Go() {
      var _this70;
      _classCallCheck(this, Go);
      _this70 = _callSuper(this, Go, arguments), _this70._currentBlockIndex = -1, _this70._blocks = null;
      return _this70;
    }
    _inherits(Go, _y22);
    return _createClass(Go, [{
      key: "currentBlockIndex",
      get: function get() {
        return this._currentBlockIndex;
      },
      set: function set(e) {
        this._currentBlockIndex = e;
      }
    }, {
      key: "firstBlock",
      get: function get() {
        return this._blocks[0];
      }
    }, {
      key: "lastBlock",
      get: function get() {
        return this._blocks[this._blocks.length - 1];
      }
    }, {
      key: "currentBlock",
      get: function get() {
        return this._blocks[this.currentBlockIndex];
      },
      set: function set(e) {
        this.currentBlockIndex = this.getBlockIndex(e);
      }
    }, {
      key: "nextBlock",
      get: function get() {
        return this.currentBlockIndex === this._blocks.length - 1 ? null : this._blocks[this.currentBlockIndex + 1];
      }
    }, {
      key: "nextContentfulBlock",
      get: function get() {
        return this.blocks.slice(this.currentBlockIndex + 1).find(function (t) {
          return !!t.inputs.length;
        });
      }
    }, {
      key: "previousContentfulBlock",
      get: function get() {
        return this.blocks.slice(0, this.currentBlockIndex).reverse().find(function (t) {
          return !!t.inputs.length;
        });
      }
    }, {
      key: "previousBlock",
      get: function get() {
        return this.currentBlockIndex === 0 ? null : this._blocks[this.currentBlockIndex - 1];
      }
    }, {
      key: "blocks",
      get: function get() {
        return this._blocks.array;
      }
    }, {
      key: "isEditorEmpty",
      get: function get() {
        return this.blocks.every(function (e) {
          return e.isEmpty;
        });
      }
    }, {
      key: "prepare",
      value: function prepare() {
        var _this71 = this;
        var e = new Ye(this.Editor.UI.nodes.redactor);
        this._blocks = new Proxy(e, {
          set: Ye.set,
          get: Ye.get
        }), this.listeners.on(document, "copy", function (t) {
          return _this71.Editor.BlockEvents.handleCommandC(t);
        });
      }
    }, {
      key: "toggleReadOnly",
      value: function toggleReadOnly(e) {
        e ? this.disableModuleBindings() : this.enableModuleBindings();
      }
    }, {
      key: "composeBlock",
      value: function composeBlock(_ref31) {
        var _this72 = this;
        var e = _ref31.tool,
          _ref31$data = _ref31.data,
          t = _ref31$data === void 0 ? {} : _ref31$data,
          _ref31$id = _ref31.id,
          o = _ref31$id === void 0 ? void 0 : _ref31$id,
          _ref31$tunes = _ref31.tunes,
          i = _ref31$tunes === void 0 ? {} : _ref31$tunes;
        var n = this.Editor.ReadOnly.isEnabled,
          r = this.Editor.Tools.blockTools.get(e),
          a = new N({
            id: o,
            data: t,
            tool: r,
            api: this.Editor.API,
            readOnly: n,
            tunesData: i
          }, this.eventsDispatcher);
        return n || window.requestIdleCallback(function () {
          _this72.bindBlockEvents(a);
        }, {
          timeout: 2e3
        }), a;
      }
    }, {
      key: "insert",
      value: function insert() {
        var _ref32 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref32$id = _ref32.id,
          e = _ref32$id === void 0 ? void 0 : _ref32$id,
          _ref32$tool = _ref32.tool,
          t = _ref32$tool === void 0 ? this.config.defaultBlock : _ref32$tool,
          _ref32$data = _ref32.data,
          o = _ref32$data === void 0 ? {} : _ref32$data,
          i = _ref32.index,
          _ref32$needToFocus = _ref32.needToFocus,
          n = _ref32$needToFocus === void 0 ? !0 : _ref32$needToFocus,
          _ref32$replace = _ref32.replace,
          r = _ref32$replace === void 0 ? !1 : _ref32$replace,
          _ref32$tunes = _ref32.tunes,
          a = _ref32$tunes === void 0 ? {} : _ref32$tunes;
        var l = i;
        l === void 0 && (l = this.currentBlockIndex + (r ? 0 : 1));
        var d = this.composeBlock({
          id: e,
          tool: t,
          data: o,
          tunes: a
        });
        return r && this.blockDidMutated(yt, this.getBlockByIndex(l), {
          index: l
        }), this._blocks.insert(l, d, r), this.blockDidMutated(Et, d, {
          index: l
        }), n ? this.currentBlockIndex = l : l <= this.currentBlockIndex && this.currentBlockIndex++, d;
      }
    }, {
      key: "insertMany",
      value: function insertMany(e) {
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        this._blocks.insertMany(e, t);
      }
    }, {
      key: "update",
      value: function () {
        var _update = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee18(e, t) {
          var o, i, n;
          return _regeneratorRuntime().wrap(function _callee18$(_context18) {
            while (1) switch (_context18.prev = _context18.next) {
              case 0:
                _context18.next = 2;
                return e.data;
              case 2:
                o = _context18.sent;
                i = this.composeBlock({
                  id: e.id,
                  tool: e.name,
                  data: Object.assign({}, o, t),
                  tunes: e.tunes
                });
                n = this.getBlockIndex(e);
                return _context18.abrupt("return", (this._blocks.replace(n, i), this.blockDidMutated(Bt, i, {
                  index: n
                }), i));
              case 6:
              case "end":
                return _context18.stop();
            }
          }, _callee18, this);
        }));
        function update(_x14, _x15) {
          return _update.apply(this, arguments);
        }
        return update;
      }()
    }, {
      key: "replace",
      value: function replace(e, t, o) {
        var i = this.getBlockIndex(e);
        this.insert({
          tool: t,
          data: o,
          index: i,
          replace: !0
        });
      }
    }, {
      key: "paste",
      value: function paste(e, t) {
        var o = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
        var i = this.insert({
          tool: e,
          replace: o
        });
        try {
          window.requestIdleCallback(function () {
            i.call(X.ON_PASTE, t);
          });
        } catch (n) {
          T("".concat(e, ": onPaste callback call is failed"), "error", n);
        }
        return i;
      }
    }, {
      key: "insertDefaultBlockAtIndex",
      value: function insertDefaultBlockAtIndex(e) {
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
        var o = this.composeBlock({
          tool: this.config.defaultBlock
        });
        return this._blocks[e] = o, this.blockDidMutated(Et, o, {
          index: e
        }), t ? this.currentBlockIndex = e : e <= this.currentBlockIndex && this.currentBlockIndex++, o;
      }
    }, {
      key: "insertAtEnd",
      value: function insertAtEnd() {
        return this.currentBlockIndex = this.blocks.length - 1, this.insert();
      }
    }, {
      key: "mergeBlocks",
      value: function () {
        var _mergeBlocks = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee19(e, t) {
          var o;
          return _regeneratorRuntime().wrap(function _callee19$(_context19) {
            while (1) switch (_context19.prev = _context19.next) {
              case 0:
                _context19.next = 2;
                return t.data;
              case 2:
                o = _context19.sent;
                _context19.t0 = W(o);
                if (_context19.t0) {
                  _context19.next = 7;
                  break;
                }
                _context19.next = 7;
                return e.mergeWith(o);
              case 7:
                this.removeBlock(t);
                this.currentBlockIndex = this._blocks.indexOf(e);
              case 9:
              case "end":
                return _context19.stop();
            }
          }, _callee19, this);
        }));
        function mergeBlocks(_x16, _x17) {
          return _mergeBlocks.apply(this, arguments);
        }
        return mergeBlocks;
      }()
    }, {
      key: "removeBlock",
      value: function removeBlock(e) {
        var _this73 = this;
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
        return new Promise(function (o) {
          var i = _this73._blocks.indexOf(e);
          if (!_this73.validateIndex(i)) throw new Error("Can't find a Block to remove");
          e.destroy(), _this73._blocks.remove(i), _this73.blockDidMutated(yt, e, {
            index: i
          }), _this73.currentBlockIndex >= i && _this73.currentBlockIndex--, _this73.blocks.length ? i === 0 && (_this73.currentBlockIndex = 0) : (_this73.currentBlockIndex = -1, t && _this73.insert()), o();
        });
      }
    }, {
      key: "removeSelectedBlocks",
      value: function removeSelectedBlocks() {
        var e;
        for (var t = this.blocks.length - 1; t >= 0; t--) this.blocks[t].selected && (this.removeBlock(this.blocks[t]), e = t);
        return e;
      }
    }, {
      key: "removeAllBlocks",
      value: function removeAllBlocks() {
        for (var e = this.blocks.length - 1; e >= 0; e--) this._blocks.remove(e);
        this.currentBlockIndex = -1, this.insert(), this.currentBlock.firstInput.focus();
      }
    }, {
      key: "split",
      value: function split() {
        var e = this.Editor.Caret.extractFragmentFromCaretPosition(),
          t = c.make("div");
        t.appendChild(e);
        var o = {
          text: c.isEmpty(t) ? "" : t.innerHTML
        };
        return this.insert({
          data: o
        });
      }
    }, {
      key: "getBlockByIndex",
      value: function getBlockByIndex(e) {
        return e === -1 && (e = this._blocks.length - 1), this._blocks[e];
      }
    }, {
      key: "getBlockIndex",
      value: function getBlockIndex(e) {
        return this._blocks.indexOf(e);
      }
    }, {
      key: "getBlockById",
      value: function getBlockById(e) {
        return this._blocks.array.find(function (t) {
          return t.id === e;
        });
      }
    }, {
      key: "getBlock",
      value: function getBlock(e) {
        c.isElement(e) || (e = e.parentNode);
        var t = this._blocks.nodes,
          o = e.closest(".".concat(N.CSS.wrapper)),
          i = t.indexOf(o);
        if (i >= 0) return this._blocks[i];
      }
    }, {
      key: "setCurrentBlockByChildNode",
      value: function setCurrentBlockByChildNode(e) {
        c.isElement(e) || (e = e.parentNode);
        var t = e.closest(".".concat(N.CSS.wrapper));
        if (!t) return;
        var o = t.closest(".".concat(this.Editor.UI.CSS.editorWrapper));
        if (o != null && o.isEqualNode(this.Editor.UI.nodes.wrapper)) return this.currentBlockIndex = this._blocks.nodes.indexOf(t), this.currentBlock.updateCurrentInput(), this.currentBlock;
      }
    }, {
      key: "getBlockByChildNode",
      value: function getBlockByChildNode(e) {
        if (!e || !(e instanceof Node)) return;
        c.isElement(e) || (e = e.parentNode);
        var t = e.closest(".".concat(N.CSS.wrapper));
        return this.blocks.find(function (o) {
          return o.holder === t;
        });
      }
    }, {
      key: "swap",
      value: function swap(e, t) {
        this._blocks.swap(e, t), this.currentBlockIndex = t;
      }
    }, {
      key: "move",
      value: function move(e) {
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.currentBlockIndex;
        if (isNaN(e) || isNaN(t)) {
          T("Warning during 'move' call: incorrect indices provided.", "warn");
          return;
        }
        if (!this.validateIndex(e) || !this.validateIndex(t)) {
          T("Warning during 'move' call: indices cannot be lower than 0 or greater than the amount of blocks.", "warn");
          return;
        }
        this._blocks.move(e, t), this.currentBlockIndex = e, this.blockDidMutated(qo, this.currentBlock, {
          fromIndex: t,
          toIndex: e
        });
      }
    }, {
      key: "convert",
      value: function () {
        var _convert = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee20(e, t, o) {
          var n, r, a, l;
          return _regeneratorRuntime().wrap(function _callee20$(_context20) {
            while (1) switch (_context20.prev = _context20.next) {
              case 0:
                _context20.next = 2;
                return e.save();
              case 2:
                if (_context20.sent) {
                  _context20.next = 4;
                  break;
                }
                throw new Error("Could not convert Block. Failed to extract original Block data.");
              case 4:
                n = this.Editor.Tools.blockTools.get(t);
                if (n) {
                  _context20.next = 7;
                  break;
                }
                throw new Error("Could not convert Block. Tool \xAB".concat(t, "\xBB not found."));
              case 7:
                _context20.next = 9;
                return e.exportDataAsString();
              case 9:
                r = _context20.sent;
                a = V(r, n.sanitizeConfig);
                l = qt(a, n.conversionConfig);
                o && (l = Object.assign(l, o)), this.replace(e, n.name, l);
              case 13:
              case "end":
                return _context20.stop();
            }
          }, _callee20, this);
        }));
        function convert(_x18, _x19, _x20) {
          return _convert.apply(this, arguments);
        }
        return convert;
      }()
    }, {
      key: "dropPointer",
      value: function dropPointer() {
        this.currentBlockIndex = -1;
      }
    }, {
      key: "clear",
      value: function () {
        var _clear2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee22() {
          var _this74 = this;
          var e,
            t,
            _args22 = arguments;
          return _regeneratorRuntime().wrap(function _callee22$(_context22) {
            while (1) switch (_context22.prev = _context22.next) {
              case 0:
                e = _args22.length > 0 && _args22[0] !== undefined ? _args22[0] : !1;
                t = new Zo();
                this.blocks.forEach(function (o) {
                  t.add(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee21() {
                    return _regeneratorRuntime().wrap(function _callee21$(_context21) {
                      while (1) switch (_context21.prev = _context21.next) {
                        case 0:
                          _context21.next = 2;
                          return _this74.removeBlock(o, !1);
                        case 2:
                        case "end":
                          return _context21.stop();
                      }
                    }, _callee21);
                  })));
                });
                _context22.next = 5;
                return t.completed;
              case 5:
                this.dropPointer();
                e && this.insert();
                this.Editor.UI.checkEmptiness();
              case 8:
              case "end":
                return _context22.stop();
            }
          }, _callee22, this);
        }));
        function clear() {
          return _clear2.apply(this, arguments);
        }
        return clear;
      }()
    }, {
      key: "destroy",
      value: function () {
        var _destroy = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee23() {
          return _regeneratorRuntime().wrap(function _callee23$(_context23) {
            while (1) switch (_context23.prev = _context23.next) {
              case 0:
                _context23.next = 2;
                return Promise.all(this.blocks.map(function (e) {
                  return e.destroy();
                }));
              case 2:
              case "end":
                return _context23.stop();
            }
          }, _callee23, this);
        }));
        function destroy() {
          return _destroy.apply(this, arguments);
        }
        return destroy;
      }()
    }, {
      key: "bindBlockEvents",
      value: function bindBlockEvents(e) {
        var _this75 = this;
        var t = this.Editor.BlockEvents;
        this.readOnlyMutableListeners.on(e.holder, "keydown", function (o) {
          t.keydown(o);
        }), this.readOnlyMutableListeners.on(e.holder, "keyup", function (o) {
          t.keyup(o);
        }), this.readOnlyMutableListeners.on(e.holder, "dragover", function (o) {
          t.dragOver(o);
        }), this.readOnlyMutableListeners.on(e.holder, "dragleave", function (o) {
          t.dragLeave(o);
        }), e.on("didMutated", function (o) {
          return _this75.blockDidMutated(Bt, o, {
            index: _this75.getBlockIndex(o)
          });
        });
      }
    }, {
      key: "disableModuleBindings",
      value: function disableModuleBindings() {
        this.readOnlyMutableListeners.clearAll();
      }
    }, {
      key: "enableModuleBindings",
      value: function enableModuleBindings() {
        var _this76 = this;
        this.readOnlyMutableListeners.on(document, "cut", function (e) {
          return _this76.Editor.BlockEvents.handleCommandX(e);
        }), this.blocks.forEach(function (e) {
          _this76.bindBlockEvents(e);
        });
      }
    }, {
      key: "validateIndex",
      value: function validateIndex(e) {
        return !(e < 0 || e >= this._blocks.length);
      }
    }, {
      key: "blockDidMutated",
      value: function blockDidMutated(e, t, o) {
        var i = new CustomEvent(e, {
          detail: _objectSpread({
            target: new te(t)
          }, o)
        });
        return this.eventsDispatcher.emit(lt, {
          event: i
        }), t;
      }
    }]);
  }(y);
  var Jo = /*#__PURE__*/function (_y23) {
    function Jo() {
      var _this77;
      _classCallCheck(this, Jo);
      _this77 = _callSuper(this, Jo, arguments), _this77.anyBlockSelectedCache = null, _this77.needToSelectAll = !1, _this77.nativeInputSelected = !1, _this77.readyToBlockSelection = !1;
      return _this77;
    }
    _inherits(Jo, _y23);
    return _createClass(Jo, [{
      key: "sanitizerConfig",
      get: function get() {
        return {
          p: {},
          h1: {},
          h2: {},
          h3: {},
          h4: {},
          h5: {},
          h6: {},
          ol: {},
          ul: {},
          li: {},
          br: !0,
          img: {
            src: !0,
            width: !0,
            height: !0
          },
          a: {
            href: !0
          },
          b: {},
          i: {},
          u: {}
        };
      }
    }, {
      key: "allBlocksSelected",
      get: function get() {
        var e = this.Editor.BlockManager;
        return e.blocks.every(function (t) {
          return t.selected === !0;
        });
      },
      set: function set(e) {
        var t = this.Editor.BlockManager;
        t.blocks.forEach(function (o) {
          o.selected = e;
        }), this.clearCache();
      }
    }, {
      key: "anyBlockSelected",
      get: function get() {
        var e = this.Editor.BlockManager;
        return this.anyBlockSelectedCache === null && (this.anyBlockSelectedCache = e.blocks.some(function (t) {
          return t.selected === !0;
        })), this.anyBlockSelectedCache;
      }
    }, {
      key: "selectedBlocks",
      get: function get() {
        return this.Editor.BlockManager.blocks.filter(function (e) {
          return e.selected;
        });
      }
    }, {
      key: "prepare",
      value: function prepare() {
        var _this78 = this;
        this.selection = new g(), le.add({
          name: "CMD+A",
          handler: function handler(e) {
            var _this78$Editor = _this78.Editor,
              t = _this78$Editor.BlockManager,
              o = _this78$Editor.ReadOnly;
            if (o.isEnabled) {
              e.preventDefault(), _this78.selectAllBlocks();
              return;
            }
            t.currentBlock && _this78.handleCommandA(e);
          },
          on: this.Editor.UI.nodes.redactor
        });
      }
    }, {
      key: "toggleReadOnly",
      value: function toggleReadOnly() {
        g.get().removeAllRanges(), this.allBlocksSelected = !1;
      }
    }, {
      key: "unSelectBlockByIndex",
      value: function unSelectBlockByIndex(e) {
        var t = this.Editor.BlockManager;
        var o;
        isNaN(e) ? o = t.currentBlock : o = t.getBlockByIndex(e), o.selected = !1, this.clearCache();
      }
    }, {
      key: "clearSelection",
      value: function clearSelection(e) {
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
        var _this$Editor8 = this.Editor,
          o = _this$Editor8.BlockManager,
          i = _this$Editor8.Caret,
          n = _this$Editor8.RectangleSelection;
        this.needToSelectAll = !1, this.nativeInputSelected = !1, this.readyToBlockSelection = !1;
        var r = e && e instanceof KeyboardEvent,
          a = r && tt(e.keyCode);
        if (this.anyBlockSelected && r && a && !g.isSelectionExists) {
          var l = o.removeSelectedBlocks();
          o.insertDefaultBlockAtIndex(l, !0), i.setToBlock(o.currentBlock), xe(function () {
            var d = e.key;
            i.insertContentAtCaretPosition(d.length > 1 ? "" : d);
          }, 20)();
        }
        if (this.Editor.CrossBlockSelection.clear(e), !this.anyBlockSelected || n.isRectActivated()) {
          this.Editor.RectangleSelection.clearSelection();
          return;
        }
        t && this.selection.restore(), this.allBlocksSelected = !1;
      }
    }, {
      key: "copySelectedBlocks",
      value: function copySelectedBlocks(e) {
        var _this79 = this;
        e.preventDefault();
        var t = c.make("div");
        this.selectedBlocks.forEach(function (n) {
          var r = V(n.holder.innerHTML, _this79.sanitizerConfig),
            a = c.make("p");
          a.innerHTML = r, t.appendChild(a);
        });
        var o = Array.from(t.childNodes).map(function (n) {
            return n.textContent;
          }).join("\n\n"),
          i = t.innerHTML;
        return e.clipboardData.setData("text/plain", o), e.clipboardData.setData("text/html", i), Promise.all(this.selectedBlocks.map(function (n) {
          return n.save();
        })).then(function (n) {
          try {
            e.clipboardData.setData(_this79.Editor.Paste.MIME_TYPE, JSON.stringify(n));
          } catch (_unused7) {}
        });
      }
    }, {
      key: "selectBlockByIndex",
      value: function selectBlockByIndex(e) {
        var t = this.Editor.BlockManager,
          o = t.getBlockByIndex(e);
        o !== void 0 && this.selectBlock(o);
      }
    }, {
      key: "selectBlock",
      value: function selectBlock(e) {
        this.selection.save(), g.get().removeAllRanges(), e.selected = !0, this.clearCache(), this.Editor.InlineToolbar.close();
      }
    }, {
      key: "unselectBlock",
      value: function unselectBlock(e) {
        e.selected = !1, this.clearCache();
      }
    }, {
      key: "clearCache",
      value: function clearCache() {
        this.anyBlockSelectedCache = null;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        le.remove(this.Editor.UI.nodes.redactor, "CMD+A");
      }
    }, {
      key: "handleCommandA",
      value: function handleCommandA(e) {
        if (this.Editor.RectangleSelection.clearSelection(), c.isNativeInput(e.target) && !this.readyToBlockSelection) {
          this.readyToBlockSelection = !0;
          return;
        }
        var t = this.Editor.BlockManager.getBlock(e.target),
          o = t.inputs;
        if (o.length > 1 && !this.readyToBlockSelection) {
          this.readyToBlockSelection = !0;
          return;
        }
        if (o.length === 1 && !this.needToSelectAll) {
          this.needToSelectAll = !0;
          return;
        }
        this.needToSelectAll ? (e.preventDefault(), this.selectAllBlocks(), this.needToSelectAll = !1, this.readyToBlockSelection = !1, this.Editor.ConversionToolbar.close()) : this.readyToBlockSelection && (e.preventDefault(), this.selectBlock(t), this.needToSelectAll = !0);
      }
    }, {
      key: "selectAllBlocks",
      value: function selectAllBlocks() {
        this.selection.save(), g.get().removeAllRanges(), this.allBlocksSelected = !0, this.Editor.InlineToolbar.close();
      }
    }]);
  }(y);
  var Ce = /*#__PURE__*/function (_y24) {
    function Ce() {
      _classCallCheck(this, Ce);
      return _callSuper(this, Ce, arguments);
    }
    _inherits(Ce, _y24);
    return _createClass(Ce, [{
      key: "positions",
      get: function get() {
        return {
          START: "start",
          END: "end",
          DEFAULT: "default"
        };
      }
    }, {
      key: "isAtStart",
      get: function get() {
        var e = this.Editor.BlockManager.currentBlock;
        if (!e.focusable) return !0;
        var t = g.get(),
          o = c.getDeepestNode(e.currentInput);
        var i = t.focusNode;
        if (c.isNativeInput(o)) return o.selectionEnd === 0;
        if (!t.anchorNode) return !1;
        var n = i.textContent.search(/\S/);
        n === -1 && (n = 0);
        var r = t.focusOffset;
        return i.nodeType !== Node.TEXT_NODE && i.childNodes.length && (i.childNodes[r] ? (i = i.childNodes[r], r = 0) : (i = i.childNodes[r - 1], r = i.textContent.length)), (c.isLineBreakTag(o) || c.isEmpty(o)) && this.getHigherLevelSiblings(i, "left").every(function (d) {
          var u = c.isLineBreakTag(d),
            h = d.children.length === 1 && c.isLineBreakTag(d.children[0]),
            f = u || h;
          return c.isEmpty(d) && !f;
        }) && r === n ? !0 : o === null || i === o && r <= n;
      }
    }, {
      key: "isAtEnd",
      get: function get() {
        var e = this.Editor.BlockManager.currentBlock;
        if (!e.focusable) return !0;
        var t = g.get();
        var o = t.focusNode;
        var i = c.getDeepestNode(e.currentInput, !0);
        if (c.isNativeInput(i)) return i.selectionEnd === i.value.length;
        if (!t.focusNode) return !1;
        var n = t.focusOffset;
        if (o.nodeType !== Node.TEXT_NODE && o.childNodes.length && (o.childNodes[n - 1] ? (o = o.childNodes[n - 1], n = o.textContent.length) : (o = o.childNodes[0], n = 0)), c.isLineBreakTag(i) || c.isEmpty(i)) {
          var a = this.getHigherLevelSiblings(o, "right");
          if (a.every(function (d, u) {
            return u === a.length - 1 && c.isLineBreakTag(d) || c.isEmpty(d) && !c.isLineBreakTag(d);
          }) && n === o.textContent.length) return !0;
        }
        var r = i.textContent.replace(/\s+$/, "");
        return o === i && n >= r.length;
      }
    }, {
      key: "setToBlock",
      value: function setToBlock(e) {
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.positions.DEFAULT;
        var o = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var d;
        var _this$Editor9 = this.Editor,
          i = _this$Editor9.BlockManager,
          n = _this$Editor9.BlockSelection;
        if (n.clearSelection(), !e.focusable) {
          (d = window.getSelection()) == null || d.removeAllRanges(), n.selectBlock(e), i.currentBlock = e;
          return;
        }
        var r;
        switch (t) {
          case this.positions.START:
            r = e.firstInput;
            break;
          case this.positions.END:
            r = e.lastInput;
            break;
          default:
            r = e.currentInput;
        }
        if (!r) return;
        var a = c.getDeepestNode(r, t === this.positions.END),
          l = c.getContentLength(a);
        switch (!0) {
          case t === this.positions.START:
            o = 0;
            break;
          case t === this.positions.END:
          case o > l:
            o = l;
            break;
        }
        this.set(a, o), i.setCurrentBlockByChildNode(e.holder), i.currentBlock.currentInput = r;
      }
    }, {
      key: "setToInput",
      value: function setToInput(e) {
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.positions.DEFAULT;
        var o = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var i = this.Editor.BlockManager.currentBlock,
          n = c.getDeepestNode(e);
        switch (t) {
          case this.positions.START:
            this.set(n, 0);
            break;
          case this.positions.END:
            this.set(n, c.getContentLength(n));
            break;
          default:
            o && this.set(n, o);
        }
        i.currentInput = e;
      }
    }, {
      key: "set",
      value: function set(e) {
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var _g$setCursor = g.setCursor(e, t),
          i = _g$setCursor.top,
          n = _g$setCursor.bottom,
          _window = window,
          r = _window.innerHeight;
        i < 0 ? window.scrollBy(0, i - 30) : n > r && window.scrollBy(0, n - r + 30);
      }
    }, {
      key: "setToTheLastBlock",
      value: function setToTheLastBlock() {
        var e = this.Editor.BlockManager.lastBlock;
        if (e) if (e.tool.isDefault && e.isEmpty) this.setToBlock(e);else {
          var t = this.Editor.BlockManager.insertAtEnd();
          this.setToBlock(t);
        }
      }
    }, {
      key: "extractFragmentFromCaretPosition",
      value: function extractFragmentFromCaretPosition() {
        var e = g.get();
        if (e.rangeCount) {
          var t = e.getRangeAt(0),
            o = this.Editor.BlockManager.currentBlock.currentInput;
          if (t.deleteContents(), o) if (c.isNativeInput(o)) {
            var i = o,
              n = document.createDocumentFragment(),
              r = i.value.substring(0, i.selectionStart),
              a = i.value.substring(i.selectionStart);
            return n.textContent = a, i.value = r, n;
          } else {
            var _i2 = t.cloneRange();
            return _i2.selectNodeContents(o), _i2.setStart(t.endContainer, t.endOffset), _i2.extractContents();
          }
        }
      }
    }, {
      key: "navigateNext",
      value: function navigateNext() {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
        var t = this.Editor.BlockManager,
          o = t.currentBlock,
          i = t.nextBlock,
          n = o.nextInput,
          r = this.isAtEnd;
        var a = i;
        var l = e || r;
        if (n && l) return this.setToInput(n, this.positions.START), !0;
        if (a === null) {
          if (o.tool.isDefault || !l) return !1;
          a = t.insertAtEnd();
        }
        return l ? (this.setToBlock(a, this.positions.START), !0) : !1;
      }
    }, {
      key: "navigatePrevious",
      value: function navigatePrevious() {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
        var _this$Editor$BlockMan = this.Editor.BlockManager,
          t = _this$Editor$BlockMan.currentBlock,
          o = _this$Editor$BlockMan.previousBlock;
        if (!t) return !1;
        var i = t.previousInput,
          n = e || this.isAtStart;
        return i && n ? (this.setToInput(i, this.positions.END), !0) : o !== null && n ? (this.setToBlock(o, this.positions.END), !0) : !1;
      }
    }, {
      key: "createShadow",
      value: function createShadow(e) {
        var t = document.createElement("span");
        t.classList.add(Ce.CSS.shadowCaret), e.insertAdjacentElement("beforeend", t);
      }
    }, {
      key: "restoreCaret",
      value: function restoreCaret(e) {
        var t = e.querySelector(".".concat(Ce.CSS.shadowCaret));
        if (!t) return;
        new g().expandToTag(t);
        var i = document.createRange();
        i.selectNode(t), i.extractContents();
      }
    }, {
      key: "insertContentAtCaretPosition",
      value: function insertContentAtCaretPosition(e) {
        var t = document.createDocumentFragment(),
          o = document.createElement("div"),
          i = g.get(),
          n = g.range;
        o.innerHTML = e, Array.from(o.childNodes).forEach(function (d) {
          return t.appendChild(d);
        }), t.childNodes.length === 0 && t.appendChild(new Text());
        var r = t.lastChild;
        n.deleteContents(), n.insertNode(t);
        var a = document.createRange(),
          l = r.nodeType === Node.TEXT_NODE ? r : r.firstChild;
        l !== null && l.textContent !== null && a.setStart(l, l.textContent.length), i.removeAllRanges(), i.addRange(a);
      }
    }, {
      key: "getHigherLevelSiblings",
      value: function getHigherLevelSiblings(e, t) {
        var o = e;
        var i = [];
        for (; o.parentNode && o.parentNode.contentEditable !== "true";) o = o.parentNode;
        var n = t === "left" ? "previousSibling" : "nextSibling";
        for (; o[n];) o = o[n], i.push(o);
        return i;
      }
    }], [{
      key: "CSS",
      get: function get() {
        return {
          shadowCaret: "cdx-shadow-caret"
        };
      }
    }]);
  }(y);
  var Qo = /*#__PURE__*/function (_y25) {
    function Qo() {
      var _this80;
      _classCallCheck(this, Qo);
      _this80 = _callSuper(this, Qo, arguments), _this80.onMouseUp = function () {
        _this80.listeners.off(document, "mouseover", _this80.onMouseOver), _this80.listeners.off(document, "mouseup", _this80.onMouseUp);
      }, _this80.onMouseOver = function (e) {
        var _this80$Editor = _this80.Editor,
          t = _this80$Editor.BlockManager,
          o = _this80$Editor.BlockSelection;
        if (e.relatedTarget === null && e.target === null) return;
        var i = t.getBlockByChildNode(e.relatedTarget) || _this80.lastSelectedBlock,
          n = t.getBlockByChildNode(e.target);
        if (!(!i || !n) && n !== i) {
          if (i === _this80.firstSelectedBlock) {
            g.get().removeAllRanges(), i.selected = !0, n.selected = !0, o.clearCache();
            return;
          }
          if (n === _this80.firstSelectedBlock) {
            i.selected = !1, n.selected = !1, o.clearCache();
            return;
          }
          _this80.Editor.InlineToolbar.close(), _this80.toggleBlocksSelectedState(i, n), _this80.lastSelectedBlock = n;
        }
      };
      return _this80;
    }
    _inherits(Qo, _y25);
    return _createClass(Qo, [{
      key: "prepare",
      value: function () {
        var _prepare = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee24() {
          var _this81 = this;
          return _regeneratorRuntime().wrap(function _callee24$(_context24) {
            while (1) switch (_context24.prev = _context24.next) {
              case 0:
                this.listeners.on(document, "mousedown", function (e) {
                  _this81.enableCrossBlockSelection(e);
                });
              case 1:
              case "end":
                return _context24.stop();
            }
          }, _callee24, this);
        }));
        function prepare() {
          return _prepare.apply(this, arguments);
        }
        return prepare;
      }()
    }, {
      key: "watchSelection",
      value: function watchSelection(e) {
        if (e.button !== Rt.LEFT) return;
        var t = this.Editor.BlockManager;
        this.firstSelectedBlock = t.getBlock(e.target), this.lastSelectedBlock = this.firstSelectedBlock, this.listeners.on(document, "mouseover", this.onMouseOver), this.listeners.on(document, "mouseup", this.onMouseUp);
      }
    }, {
      key: "isCrossBlockSelectionStarted",
      get: function get() {
        return !!this.firstSelectedBlock && !!this.lastSelectedBlock;
      }
    }, {
      key: "toggleBlockSelectedState",
      value: function toggleBlockSelectedState() {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !0;
        var _this$Editor10 = this.Editor,
          t = _this$Editor10.BlockManager,
          o = _this$Editor10.BlockSelection;
        this.lastSelectedBlock || (this.lastSelectedBlock = this.firstSelectedBlock = t.currentBlock), this.firstSelectedBlock === this.lastSelectedBlock && (this.firstSelectedBlock.selected = !0, o.clearCache(), g.get().removeAllRanges());
        var i = t.blocks.indexOf(this.lastSelectedBlock) + (e ? 1 : -1),
          n = t.blocks[i];
        n && (this.lastSelectedBlock.selected !== n.selected ? (n.selected = !0, o.clearCache()) : (this.lastSelectedBlock.selected = !1, o.clearCache()), this.lastSelectedBlock = n, this.Editor.InlineToolbar.close(), n.holder.scrollIntoView({
          block: "nearest"
        }));
      }
    }, {
      key: "clear",
      value: function clear(e) {
        var _this$Editor11 = this.Editor,
          t = _this$Editor11.BlockManager,
          o = _this$Editor11.BlockSelection,
          i = _this$Editor11.Caret,
          n = t.blocks.indexOf(this.firstSelectedBlock),
          r = t.blocks.indexOf(this.lastSelectedBlock);
        if (o.anyBlockSelected && n > -1 && r > -1 && e && e instanceof KeyboardEvent) switch (e.keyCode) {
          case k.DOWN:
          case k.RIGHT:
            i.setToBlock(t.blocks[Math.max(n, r)], i.positions.END);
            break;
          case k.UP:
          case k.LEFT:
            i.setToBlock(t.blocks[Math.min(n, r)], i.positions.START);
            break;
          default:
            i.setToBlock(t.blocks[Math.max(n, r)], i.positions.END);
        }
        this.firstSelectedBlock = this.lastSelectedBlock = null;
      }
    }, {
      key: "enableCrossBlockSelection",
      value: function enableCrossBlockSelection(e) {
        var t = this.Editor.UI;
        g.isCollapsed || this.Editor.BlockSelection.clearSelection(e), t.nodes.redactor.contains(e.target) ? this.watchSelection(e) : this.Editor.BlockSelection.clearSelection(e);
      }
    }, {
      key: "toggleBlocksSelectedState",
      value: function toggleBlocksSelectedState(e, t) {
        var _this$Editor12 = this.Editor,
          o = _this$Editor12.BlockManager,
          i = _this$Editor12.BlockSelection,
          n = o.blocks.indexOf(e),
          r = o.blocks.indexOf(t),
          a = e.selected !== t.selected;
        for (var l = Math.min(n, r); l <= Math.max(n, r); l++) {
          var d = o.blocks[l];
          d !== this.firstSelectedBlock && d !== (a ? e : t) && (o.blocks[l].selected = !o.blocks[l].selected, i.clearCache());
        }
      }
    }]);
  }(y);
  var ei = /*#__PURE__*/function (_y26) {
    function ei() {
      var _this82;
      _classCallCheck(this, ei);
      _this82 = _callSuper(this, ei, arguments), _this82.isStartedAtEditor = !1;
      return _this82;
    }
    _inherits(ei, _y26);
    return _createClass(ei, [{
      key: "toggleReadOnly",
      value: function toggleReadOnly(e) {
        e ? this.disableModuleBindings() : this.enableModuleBindings();
      }
    }, {
      key: "enableModuleBindings",
      value: function enableModuleBindings() {
        var _this83 = this;
        var e = this.Editor.UI;
        this.readOnlyMutableListeners.on(e.nodes.holder, "drop", /*#__PURE__*/function () {
          var _ref34 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee25(t) {
            return _regeneratorRuntime().wrap(function _callee25$(_context25) {
              while (1) switch (_context25.prev = _context25.next) {
                case 0:
                  _context25.next = 2;
                  return _this83.processDrop(t);
                case 2:
                case "end":
                  return _context25.stop();
              }
            }, _callee25);
          }));
          return function (_x21) {
            return _ref34.apply(this, arguments);
          };
        }(), !0), this.readOnlyMutableListeners.on(e.nodes.holder, "dragstart", function () {
          _this83.processDragStart();
        }), this.readOnlyMutableListeners.on(e.nodes.holder, "dragover", function (t) {
          _this83.processDragOver(t);
        }, !0);
      }
    }, {
      key: "disableModuleBindings",
      value: function disableModuleBindings() {
        this.readOnlyMutableListeners.clearAll();
      }
    }, {
      key: "processDrop",
      value: function () {
        var _processDrop = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee26(e) {
          var _this$Editor13, t, o, i, n, r;
          return _regeneratorRuntime().wrap(function _callee26$(_context26) {
            while (1) switch (_context26.prev = _context26.next) {
              case 0:
                _this$Editor13 = this.Editor, t = _this$Editor13.BlockManager, o = _this$Editor13.Caret, i = _this$Editor13.Paste;
                e.preventDefault(), t.blocks.forEach(function (r) {
                  r.dropTarget = !1;
                }), g.isAtEditor && !g.isCollapsed && this.isStartedAtEditor && document.execCommand("delete"), this.isStartedAtEditor = !1;
                n = t.setCurrentBlockByChildNode(e.target);
                if (n) this.Editor.Caret.setToBlock(n, o.positions.END);else {
                  r = t.setCurrentBlockByChildNode(t.lastBlock.holder);
                  this.Editor.Caret.setToBlock(r, o.positions.END);
                }
                _context26.next = 6;
                return i.processDataTransfer(e.dataTransfer, !0);
              case 6:
              case "end":
                return _context26.stop();
            }
          }, _callee26, this);
        }));
        function processDrop(_x22) {
          return _processDrop.apply(this, arguments);
        }
        return processDrop;
      }()
    }, {
      key: "processDragStart",
      value: function processDragStart() {
        g.isAtEditor && !g.isCollapsed && (this.isStartedAtEditor = !0), this.Editor.InlineToolbar.close();
      }
    }, {
      key: "processDragOver",
      value: function processDragOver(e) {
        e.preventDefault();
      }
    }]);
  }(y);
  var ti = /*#__PURE__*/function (_y27) {
    function ti(_ref35) {
      var _this84;
      var e = _ref35.config,
        t = _ref35.eventsDispatcher;
      _classCallCheck(this, ti);
      _this84 = _callSuper(this, ti, [{
        config: e,
        eventsDispatcher: t
      }]), _this84.disabled = !1, _this84.batchingTimeout = null, _this84.batchingOnChangeQueue = new Map(), _this84.batchTime = 400, _this84.mutationObserver = new MutationObserver(function (o) {
        _this84.redactorChanged(o);
      }), _this84.eventsDispatcher.on(lt, function (o) {
        _this84.particularBlockChanged(o.event);
      }), _this84.eventsDispatcher.on(ct, function () {
        _this84.disable();
      }), _this84.eventsDispatcher.on(dt, function () {
        _this84.enable();
      });
      return _this84;
    }
    _inherits(ti, _y27);
    return _createClass(ti, [{
      key: "enable",
      value: function enable() {
        this.mutationObserver.observe(this.Editor.UI.nodes.redactor, {
          childList: !0,
          subtree: !0,
          characterData: !0,
          attributes: !0
        }), this.disabled = !1;
      }
    }, {
      key: "disable",
      value: function disable() {
        this.mutationObserver.disconnect(), this.disabled = !0;
      }
    }, {
      key: "particularBlockChanged",
      value: function particularBlockChanged(e) {
        var _this85 = this;
        this.disabled || !M(this.config.onChange) || (this.batchingOnChangeQueue.set("block:".concat(e.detail.target.id, ":event:").concat(e.type), e), this.batchingTimeout && clearTimeout(this.batchingTimeout), this.batchingTimeout = setTimeout(function () {
          var t;
          _this85.batchingOnChangeQueue.size === 1 ? t = _this85.batchingOnChangeQueue.values().next().value : t = Array.from(_this85.batchingOnChangeQueue.values()), _this85.config.onChange && _this85.config.onChange(_this85.Editor.API.methods, t), _this85.batchingOnChangeQueue.clear();
        }, this.batchTime));
      }
    }, {
      key: "redactorChanged",
      value: function redactorChanged(e) {
        this.eventsDispatcher.emit(_e, {
          mutations: e
        });
      }
    }]);
  }(y);
  var _Tt = /*#__PURE__*/function (_y28) {
    function Tt() {
      var _this86;
      _classCallCheck(this, Tt);
      _this86 = _callSuper(this, Tt, arguments), _this86.MIME_TYPE = "application/x-editor-js", _this86.toolsTags = {}, _this86.tagsByTool = {}, _this86.toolsPatterns = [], _this86.toolsFiles = {}, _this86.exceptionList = [], _this86.processTool = function (s) {
        try {
          var e = s.create({}, {}, !1);
          if (s.pasteConfig === !1) {
            _this86.exceptionList.push(s.name);
            return;
          }
          if (!M(e.onPaste)) return;
          _this86.getTagsConfig(s), _this86.getFilesConfig(s), _this86.getPatternsConfig(s);
        } catch (e) {
          T("Paste handling for \xAB".concat(s.name, "\xBB Tool hasn't been set up because of the error"), "warn", e);
        }
      }, _this86.handlePasteEvent = /*#__PURE__*/function () {
        var _ref36 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee27(s) {
          var _this86$Editor, e, t, o;
          return _regeneratorRuntime().wrap(function _callee27$(_context27) {
            while (1) switch (_context27.prev = _context27.next) {
              case 0:
                _this86$Editor = _this86.Editor, e = _this86$Editor.BlockManager, t = _this86$Editor.Toolbar, o = e.setCurrentBlockByChildNode(s.target);
                !o || _this86.isNativeBehaviour(s.target) && !s.clipboardData.types.includes("Files") || o && _this86.exceptionList.includes(o.name) || (s.preventDefault(), _this86.processDataTransfer(s.clipboardData), t.close());
              case 2:
              case "end":
                return _context27.stop();
            }
          }, _callee27);
        }));
        return function (_x23) {
          return _ref36.apply(this, arguments);
        };
      }();
      return _this86;
    }
    _inherits(Tt, _y28);
    return _createClass(Tt, [{
      key: "prepare",
      value: function () {
        var _prepare2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee28() {
          return _regeneratorRuntime().wrap(function _callee28$(_context28) {
            while (1) switch (_context28.prev = _context28.next) {
              case 0:
                this.processTools();
              case 1:
              case "end":
                return _context28.stop();
            }
          }, _callee28, this);
        }));
        function prepare() {
          return _prepare2.apply(this, arguments);
        }
        return prepare;
      }()
    }, {
      key: "toggleReadOnly",
      value: function toggleReadOnly(s) {
        s ? this.unsetCallback() : this.setCallback();
      }
    }, {
      key: "processDataTransfer",
      value: function () {
        var _processDataTransfer = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee29(s) {
          var _this87 = this;
          var e,
            t,
            o,
            n,
            r,
            a,
            l,
            d,
            u,
            _args29 = arguments;
          return _regeneratorRuntime().wrap(function _callee29$(_context29) {
            while (1) switch (_context29.prev = _context29.next) {
              case 0:
                e = _args29.length > 1 && _args29[1] !== undefined ? _args29[1] : !1;
                t = this.Editor.Tools, o = s.types;
                if (!((o.includes ? o.includes("Files") : o.contains("Files")) && !W(this.toolsFiles))) {
                  _context29.next = 6;
                  break;
                }
                _context29.next = 5;
                return this.processFiles(s.files);
              case 5:
                return _context29.abrupt("return");
              case 6:
                n = s.getData(this.MIME_TYPE), r = s.getData("text/plain");
                a = s.getData("text/html");
                if (!n) {
                  _context29.next = 16;
                  break;
                }
                _context29.prev = 9;
                this.insertEditorJSData(JSON.parse(n));
                return _context29.abrupt("return");
              case 14:
                _context29.prev = 14;
                _context29.t0 = _context29["catch"](9);
              case 16:
                e && r.trim() && a.trim() && (a = "<p>" + (a.trim() ? a : r) + "</p>");
                l = Object.keys(this.toolsTags).reduce(function (h, f) {
                  var _this87$toolsTags$f$s;
                  return h[f.toLowerCase()] = (_this87$toolsTags$f$s = _this87.toolsTags[f].sanitizationConfig) !== null && _this87$toolsTags$f$s !== void 0 ? _this87$toolsTags$f$s : {}, h;
                }, {}), d = Object.assign({}, l, t.getAllInlineToolsSanitizeConfig(), {
                  br: {}
                }), u = V(a, d);
                if (!(!u.trim() || u.trim() === r || !c.isHTMLString(u))) {
                  _context29.next = 23;
                  break;
                }
                _context29.next = 21;
                return this.processText(r);
              case 21:
                _context29.next = 25;
                break;
              case 23:
                _context29.next = 25;
                return this.processText(u, !0);
              case 25:
              case "end":
                return _context29.stop();
            }
          }, _callee29, this, [[9, 14]]);
        }));
        function processDataTransfer(_x24) {
          return _processDataTransfer.apply(this, arguments);
        }
        return processDataTransfer;
      }()
    }, {
      key: "processText",
      value: function () {
        var _processText = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee31(s) {
          var _this88 = this;
          var e,
            _this$Editor14,
            t,
            o,
            i,
            r,
            _args31 = arguments;
          return _regeneratorRuntime().wrap(function _callee31$(_context31) {
            while (1) switch (_context31.prev = _context31.next) {
              case 0:
                e = _args31.length > 1 && _args31[1] !== undefined ? _args31[1] : !1;
                _this$Editor14 = this.Editor, t = _this$Editor14.Caret, o = _this$Editor14.BlockManager, i = e ? this.processHTML(s) : this.processPlain(s);
                if (i.length) {
                  _context31.next = 4;
                  break;
                }
                return _context31.abrupt("return");
              case 4:
                if (!(i.length === 1)) {
                  _context31.next = 7;
                  break;
                }
                i[0].isBlock ? this.processSingleBlock(i.pop()) : this.processInlinePaste(i.pop());
                return _context31.abrupt("return");
              case 7:
                r = o.currentBlock && o.currentBlock.tool.isDefault && o.currentBlock.isEmpty;
                i.map(/*#__PURE__*/function () {
                  var _ref37 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee30(a, l) {
                    return _regeneratorRuntime().wrap(function _callee30$(_context30) {
                      while (1) switch (_context30.prev = _context30.next) {
                        case 0:
                          return _context30.abrupt("return", _this88.insertBlock(a, l === 0 && r));
                        case 1:
                        case "end":
                          return _context30.stop();
                      }
                    }, _callee30);
                  }));
                  return function (_x26, _x27) {
                    return _ref37.apply(this, arguments);
                  };
                }()), o.currentBlock && t.setToBlock(o.currentBlock, t.positions.END);
              case 9:
              case "end":
                return _context31.stop();
            }
          }, _callee31, this);
        }));
        function processText(_x25) {
          return _processText.apply(this, arguments);
        }
        return processText;
      }()
    }, {
      key: "setCallback",
      value: function setCallback() {
        this.listeners.on(this.Editor.UI.nodes.holder, "paste", this.handlePasteEvent);
      }
    }, {
      key: "unsetCallback",
      value: function unsetCallback() {
        this.listeners.off(this.Editor.UI.nodes.holder, "paste", this.handlePasteEvent);
      }
    }, {
      key: "processTools",
      value: function processTools() {
        var s = this.Editor.Tools.blockTools;
        Array.from(s.values()).forEach(this.processTool);
      }
    }, {
      key: "collectTagNames",
      value: function collectTagNames(s) {
        return Z(s) ? [s] : O(s) ? Object.keys(s) : [];
      }
    }, {
      key: "getTagsConfig",
      value: function getTagsConfig(s) {
        var _this89 = this;
        if (s.pasteConfig === !1) return;
        var e = s.pasteConfig.tags || [],
          t = [];
        e.forEach(function (o) {
          var i = _this89.collectTagNames(o);
          t.push.apply(t, _toConsumableArray(i)), i.forEach(function (n) {
            if (Object.prototype.hasOwnProperty.call(_this89.toolsTags, n)) {
              T("Paste handler for \xAB".concat(s.name, "\xBB Tool on \xAB").concat(n, "\xBB tag is skipped because it is already used by \xAB").concat(_this89.toolsTags[n].tool.name, "\xBB Tool."), "warn");
              return;
            }
            var r = O(o) ? o[n] : null;
            _this89.toolsTags[n.toUpperCase()] = {
              tool: s,
              sanitizationConfig: r
            };
          });
        }), this.tagsByTool[s.name] = t.map(function (o) {
          return o.toUpperCase();
        });
      }
    }, {
      key: "getFilesConfig",
      value: function getFilesConfig(s) {
        if (s.pasteConfig === !1) return;
        var _s$pasteConfig$files = s.pasteConfig.files,
          e = _s$pasteConfig$files === void 0 ? {} : _s$pasteConfig$files;
        var t = e.extensions,
          o = e.mimeTypes;
        !t && !o || (t && !Array.isArray(t) && (T("\xABextensions\xBB property of the onDrop config for \xAB".concat(s.name, "\xBB Tool should be an array")), t = []), o && !Array.isArray(o) && (T("\xABmimeTypes\xBB property of the onDrop config for \xAB".concat(s.name, "\xBB Tool should be an array")), o = []), o && (o = o.filter(function (i) {
          return zt(i) ? !0 : (T("MIME type value \xAB".concat(i, "\xBB for the \xAB").concat(s.name, "\xBB Tool is not a valid MIME type"), "warn"), !1);
        })), this.toolsFiles[s.name] = {
          extensions: t || [],
          mimeTypes: o || []
        });
      }
    }, {
      key: "getPatternsConfig",
      value: function getPatternsConfig(s) {
        var _this90 = this;
        s.pasteConfig === !1 || !s.pasteConfig.patterns || W(s.pasteConfig.patterns) || Object.entries(s.pasteConfig.patterns).forEach(function (_ref38) {
          var _ref39 = _slicedToArray(_ref38, 2),
            e = _ref39[0],
            t = _ref39[1];
          t instanceof RegExp || T("Pattern ".concat(t, " for \xAB").concat(s.name, "\xBB Tool is skipped because it should be a Regexp instance."), "warn"), _this90.toolsPatterns.push({
            key: e,
            pattern: t,
            tool: s
          });
        });
      }
    }, {
      key: "isNativeBehaviour",
      value: function isNativeBehaviour(s) {
        return c.isNativeInput(s);
      }
    }, {
      key: "processFiles",
      value: function () {
        var _processFiles = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee32(s) {
          var _this91 = this;
          var e, t, i;
          return _regeneratorRuntime().wrap(function _callee32$(_context32) {
            while (1) switch (_context32.prev = _context32.next) {
              case 0:
                e = this.Editor.BlockManager;
                _context32.next = 3;
                return Promise.all(Array.from(s).map(function (n) {
                  return _this91.processFile(n);
                }));
              case 3:
                t = _context32.sent;
                t = t.filter(function (n) {
                  return !!n;
                });
                i = e.currentBlock.tool.isDefault && e.currentBlock.isEmpty;
                t.forEach(function (n, r) {
                  e.paste(n.type, n.event, r === 0 && i);
                });
              case 7:
              case "end":
                return _context32.stop();
            }
          }, _callee32, this);
        }));
        function processFiles(_x28) {
          return _processFiles.apply(this, arguments);
        }
        return processFiles;
      }()
    }, {
      key: "processFile",
      value: function () {
        var _processFile = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee33(s) {
          var e, t, _t3, o;
          return _regeneratorRuntime().wrap(function _callee33$(_context33) {
            while (1) switch (_context33.prev = _context33.next) {
              case 0:
                e = Ht(s), t = Object.entries(this.toolsFiles).find(function (_ref40) {
                  var _ref41 = _slicedToArray(_ref40, 2),
                    n = _ref41[0],
                    _ref41$ = _ref41[1],
                    r = _ref41$.mimeTypes,
                    a = _ref41$.extensions;
                  var _s$type$split = s.type.split("/"),
                    _s$type$split2 = _slicedToArray(_s$type$split, 2),
                    l = _s$type$split2[0],
                    d = _s$type$split2[1],
                    u = a.find(function (f) {
                      return f.toLowerCase() === e.toLowerCase();
                    }),
                    h = r.find(function (f) {
                      var _f$split = f.split("/"),
                        _f$split2 = _slicedToArray(_f$split, 2),
                        x = _f$split2[0],
                        p = _f$split2[1];
                      return x === l && (p === d || p === "*");
                    });
                  return !!u || !!h;
                });
                if (t) {
                  _context33.next = 3;
                  break;
                }
                return _context33.abrupt("return");
              case 3:
                _t3 = _slicedToArray(t, 1), o = _t3[0];
                return _context33.abrupt("return", {
                  event: this.composePasteEvent("file", {
                    file: s
                  }),
                  type: o
                });
              case 5:
              case "end":
                return _context33.stop();
            }
          }, _callee33, this);
        }));
        function processFile(_x29) {
          return _processFile.apply(this, arguments);
        }
        return processFile;
      }()
    }, {
      key: "processHTML",
      value: function processHTML(s) {
        var _this92 = this;
        var e = this.Editor.Tools,
          t = c.make("DIV");
        return t.innerHTML = s, this.getNodes(t).map(function (i) {
          var n,
            r = e.defaultTool,
            a = !1;
          switch (i.nodeType) {
            case Node.DOCUMENT_FRAGMENT_NODE:
              n = c.make("div"), n.appendChild(i);
              break;
            case Node.ELEMENT_NODE:
              n = i, a = !0, _this92.toolsTags[n.tagName] && (r = _this92.toolsTags[n.tagName].tool);
              break;
          }
          var _ref42 = r.pasteConfig || {
              tags: []
            },
            l = _ref42.tags,
            d = l.reduce(function (f, x) {
              return _this92.collectTagNames(x).forEach(function (m) {
                var L = O(x) ? x[m] : null;
                f[m.toLowerCase()] = L || {};
              }), f;
            }, {}),
            u = Object.assign({}, d, r.baseSanitizeConfig);
          if (n.tagName.toLowerCase() === "table") {
            var f = V(n.outerHTML, u);
            n = c.make("div", void 0, {
              innerHTML: f
            }).firstChild;
          } else n.innerHTML = V(n.innerHTML, u);
          var h = _this92.composePasteEvent("tag", {
            data: n
          });
          return {
            content: n,
            isBlock: a,
            tool: r.name,
            event: h
          };
        }).filter(function (i) {
          var n = c.isEmpty(i.content),
            r = c.isSingleTag(i.content);
          return !n || r;
        });
      }
    }, {
      key: "processPlain",
      value: function processPlain(s) {
        var _this93 = this;
        var e = this.config.defaultBlock;
        if (!s) return [];
        var t = e;
        return s.split(/\r?\n/).filter(function (o) {
          return o.trim();
        }).map(function (o) {
          var i = c.make("div");
          i.textContent = o;
          var n = _this93.composePasteEvent("tag", {
            data: i
          });
          return {
            content: i,
            tool: t,
            isBlock: !1,
            event: n
          };
        });
      }
    }, {
      key: "processSingleBlock",
      value: function () {
        var _processSingleBlock = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee34(s) {
          var _this$Editor15, e, t, o;
          return _regeneratorRuntime().wrap(function _callee34$(_context34) {
            while (1) switch (_context34.prev = _context34.next) {
              case 0:
                _this$Editor15 = this.Editor, e = _this$Editor15.Caret, t = _this$Editor15.BlockManager, o = t.currentBlock;
                if (!(!o || s.tool !== o.name || !c.containsOnlyInlineElements(s.content.innerHTML))) {
                  _context34.next = 4;
                  break;
                }
                this.insertBlock(s, (o == null ? void 0 : o.tool.isDefault) && o.isEmpty);
                return _context34.abrupt("return");
              case 4:
                e.insertContentAtCaretPosition(s.content.innerHTML);
              case 5:
              case "end":
                return _context34.stop();
            }
          }, _callee34, this);
        }));
        function processSingleBlock(_x30) {
          return _processSingleBlock.apply(this, arguments);
        }
        return processSingleBlock;
      }()
    }, {
      key: "processInlinePaste",
      value: function () {
        var _processInlinePaste = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee35(s) {
          var _this$Editor16, e, t, o, n, r, a, _n2;
          return _regeneratorRuntime().wrap(function _callee35$(_context35) {
            while (1) switch (_context35.prev = _context35.next) {
              case 0:
                _this$Editor16 = this.Editor, e = _this$Editor16.BlockManager, t = _this$Editor16.Caret, o = s.content;
                if (!(e.currentBlock && e.currentBlock.tool.isDefault && o.textContent.length < _Tt.PATTERN_PROCESSING_MAX_LENGTH)) {
                  _context35.next = 9;
                  break;
                }
                _context35.next = 4;
                return this.processPattern(o.textContent);
              case 4:
                n = _context35.sent;
                if (!n) {
                  _context35.next = 9;
                  break;
                }
                r = e.currentBlock && e.currentBlock.tool.isDefault && e.currentBlock.isEmpty, a = e.paste(n.tool, n.event, r);
                t.setToBlock(a, t.positions.END);
                return _context35.abrupt("return");
              case 9:
                if (e.currentBlock && e.currentBlock.currentInput) {
                  _n2 = e.currentBlock.tool.baseSanitizeConfig;
                  document.execCommand("insertHTML", !1, V(o.innerHTML, _n2));
                } else this.insertBlock(s);
              case 10:
              case "end":
                return _context35.stop();
            }
          }, _callee35, this);
        }));
        function processInlinePaste(_x31) {
          return _processInlinePaste.apply(this, arguments);
        }
        return processInlinePaste;
      }()
    }, {
      key: "processPattern",
      value: function () {
        var _processPattern = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee36(s) {
          var e;
          return _regeneratorRuntime().wrap(function _callee36$(_context36) {
            while (1) switch (_context36.prev = _context36.next) {
              case 0:
                e = this.toolsPatterns.find(function (o) {
                  var i = o.pattern.exec(s);
                  return i ? s === i.shift() : !1;
                });
                return _context36.abrupt("return", e ? {
                  event: this.composePasteEvent("pattern", {
                    key: e.key,
                    data: s
                  }),
                  tool: e.tool.name
                } : void 0);
              case 2:
              case "end":
                return _context36.stop();
            }
          }, _callee36, this);
        }));
        function processPattern(_x32) {
          return _processPattern.apply(this, arguments);
        }
        return processPattern;
      }()
    }, {
      key: "insertBlock",
      value: function insertBlock(s) {
        var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
        var _this$Editor17 = this.Editor,
          t = _this$Editor17.BlockManager,
          o = _this$Editor17.Caret,
          i = t.currentBlock;
        var n;
        if (e && i && i.isEmpty) {
          n = t.paste(s.tool, s.event, !0), o.setToBlock(n, o.positions.END);
          return;
        }
        n = t.paste(s.tool, s.event), o.setToBlock(n, o.positions.END);
      }
    }, {
      key: "insertEditorJSData",
      value: function insertEditorJSData(s) {
        var _this$Editor18 = this.Editor,
          e = _this$Editor18.BlockManager,
          t = _this$Editor18.Caret,
          o = _this$Editor18.Tools;
        ut(s, function (n) {
          return o.blockTools.get(n).sanitizeConfig;
        }).forEach(function (_ref43, a) {
          var n = _ref43.tool,
            r = _ref43.data;
          var l = !1;
          a === 0 && (l = e.currentBlock && e.currentBlock.tool.isDefault && e.currentBlock.isEmpty);
          var d = e.insert({
            tool: n,
            data: r,
            replace: l
          });
          t.setToBlock(d, t.positions.END);
        });
      }
    }, {
      key: "processElementNode",
      value: function processElementNode(s, e, t) {
        var o = Object.keys(this.toolsTags),
          i = s,
          _ref44 = this.toolsTags[i.tagName] || {},
          n = _ref44.tool,
          r = this.tagsByTool[n == null ? void 0 : n.name] || [],
          a = o.includes(i.tagName),
          l = c.blockElements.includes(i.tagName.toLowerCase()),
          d = Array.from(i.children).some(function (_ref45) {
            var h = _ref45.tagName;
            return o.includes(h) && !r.includes(h);
          }),
          u = Array.from(i.children).some(function (_ref46) {
            var h = _ref46.tagName;
            return c.blockElements.includes(h.toLowerCase());
          });
        if (!l && !a && !d) return t.appendChild(i), [].concat(_toConsumableArray(e), [t]);
        if (a && !d || l && !u && !d) return [].concat(_toConsumableArray(e), [t, i]);
      }
    }, {
      key: "getNodes",
      value: function getNodes(s) {
        var _this94 = this;
        var e = Array.from(s.childNodes);
        var t;
        var _o5 = function o(i, n) {
          if (c.isEmpty(n) && !c.isSingleTag(n)) return i;
          var r = i[i.length - 1];
          var a = new DocumentFragment();
          switch (r && c.isFragment(r) && (a = i.pop()), n.nodeType) {
            case Node.ELEMENT_NODE:
              if (t = _this94.processElementNode(n, i, a), t) return t;
              break;
            case Node.TEXT_NODE:
              return a.appendChild(n), [].concat(_toConsumableArray(i), [a]);
            default:
              return [].concat(_toConsumableArray(i), [a]);
          }
          return [].concat(_toConsumableArray(i), _toConsumableArray(Array.from(n.childNodes).reduce(_o5, [])));
        };
        return e.reduce(_o5, []);
      }
    }, {
      key: "composePasteEvent",
      value: function composePasteEvent(s, e) {
        return new CustomEvent(s, {
          detail: e
        });
      }
    }]);
  }(y);
  var Ct = _Tt;
  Ct.PATTERN_PROCESSING_MAX_LENGTH = 450;
  var oi = /*#__PURE__*/function (_y29) {
    function oi() {
      var _this95;
      _classCallCheck(this, oi);
      _this95 = _callSuper(this, oi, arguments), _this95.toolsDontSupportReadOnly = [], _this95.readOnlyEnabled = !1;
      return _this95;
    }
    _inherits(oi, _y29);
    return _createClass(oi, [{
      key: "isEnabled",
      get: function get() {
        return this.readOnlyEnabled;
      }
    }, {
      key: "prepare",
      value: function () {
        var _prepare3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee37() {
          var e, t, o;
          return _regeneratorRuntime().wrap(function _callee37$(_context37) {
            while (1) switch (_context37.prev = _context37.next) {
              case 0:
                e = this.Editor.Tools, t = e.blockTools, o = [];
                Array.from(t.entries()).forEach(function (_ref47) {
                  var _ref48 = _slicedToArray(_ref47, 2),
                    i = _ref48[0],
                    n = _ref48[1];
                  n.isReadOnlySupported || o.push(i);
                }), this.toolsDontSupportReadOnly = o, this.config.readOnly && o.length > 0 && this.throwCriticalError(), this.toggle(this.config.readOnly);
              case 2:
              case "end":
                return _context37.stop();
            }
          }, _callee37, this);
        }));
        function prepare() {
          return _prepare3.apply(this, arguments);
        }
        return prepare;
      }()
    }, {
      key: "toggle",
      value: function () {
        var _toggle = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee38() {
          var e,
            t,
            i,
            o,
            _args38 = arguments;
          return _regeneratorRuntime().wrap(function _callee38$(_context38) {
            while (1) switch (_context38.prev = _context38.next) {
              case 0:
                e = _args38.length > 0 && _args38[0] !== undefined ? _args38[0] : !this.readOnlyEnabled;
                e && this.toolsDontSupportReadOnly.length > 0 && this.throwCriticalError();
                t = this.readOnlyEnabled;
                this.readOnlyEnabled = e;
                for (i in this.Editor) this.Editor[i].toggleReadOnly && this.Editor[i].toggleReadOnly(e);
                if (!(t === e)) {
                  _context38.next = 7;
                  break;
                }
                return _context38.abrupt("return", this.readOnlyEnabled);
              case 7:
                _context38.next = 9;
                return this.Editor.Saver.save();
              case 9:
                o = _context38.sent;
                _context38.next = 12;
                return this.Editor.BlockManager.clear();
              case 12:
                _context38.next = 14;
                return this.Editor.Renderer.render(o.blocks);
              case 14:
                return _context38.abrupt("return", this.readOnlyEnabled);
              case 15:
              case "end":
                return _context38.stop();
            }
          }, _callee38, this);
        }));
        function toggle() {
          return _toggle.apply(this, arguments);
        }
        return toggle;
      }()
    }, {
      key: "throwCriticalError",
      value: function throwCriticalError() {
        throw new at("To enable read-only mode all connected tools should support it. Tools ".concat(this.toolsDontSupportReadOnly.join(", "), " don't support read-only mode."));
      }
    }]);
  }(y);
  var me = /*#__PURE__*/function (_y30) {
    function me() {
      var _this96;
      _classCallCheck(this, me);
      _this96 = _callSuper(this, me, arguments), _this96.isRectSelectionActivated = !1, _this96.SCROLL_SPEED = 3, _this96.HEIGHT_OF_SCROLL_ZONE = 40, _this96.BOTTOM_SCROLL_ZONE = 1, _this96.TOP_SCROLL_ZONE = 2, _this96.MAIN_MOUSE_BUTTON = 0, _this96.mousedown = !1, _this96.isScrolling = !1, _this96.inScrollZone = null, _this96.startX = 0, _this96.startY = 0, _this96.mouseX = 0, _this96.mouseY = 0, _this96.stackOfSelected = [], _this96.listenerIds = [];
      return _this96;
    }
    _inherits(me, _y30);
    return _createClass(me, [{
      key: "prepare",
      value: function prepare() {
        this.enableModuleBindings();
      }
    }, {
      key: "startSelection",
      value: function startSelection(e, t) {
        var o = document.elementFromPoint(e - window.pageXOffset, t - window.pageYOffset);
        o.closest(".".concat(this.Editor.Toolbar.CSS.toolbar)) || (this.Editor.BlockSelection.allBlocksSelected = !1, this.clearSelection(), this.stackOfSelected = []);
        var n = [".".concat(N.CSS.content), ".".concat(this.Editor.Toolbar.CSS.toolbar), ".".concat(this.Editor.InlineToolbar.CSS.inlineToolbar)],
          r = o.closest("." + this.Editor.UI.CSS.editorWrapper),
          a = n.some(function (l) {
            return !!o.closest(l);
          });
        !r || a || (this.mousedown = !0, this.startX = e, this.startY = t);
      }
    }, {
      key: "endSelection",
      value: function endSelection() {
        this.mousedown = !1, this.startX = 0, this.startY = 0, this.overlayRectangle.style.display = "none";
      }
    }, {
      key: "isRectActivated",
      value: function isRectActivated() {
        return this.isRectSelectionActivated;
      }
    }, {
      key: "clearSelection",
      value: function clearSelection() {
        this.isRectSelectionActivated = !1;
      }
    }, {
      key: "enableModuleBindings",
      value: function enableModuleBindings() {
        var _this97 = this;
        var _this$genHTML = this.genHTML(),
          e = _this$genHTML.container;
        this.listeners.on(e, "mousedown", function (t) {
          _this97.processMouseDown(t);
        }, !1), this.listeners.on(document.body, "mousemove", Ie(function (t) {
          _this97.processMouseMove(t);
        }, 10), {
          passive: !0
        }), this.listeners.on(document.body, "mouseleave", function () {
          _this97.processMouseLeave();
        }), this.listeners.on(window, "scroll", Ie(function (t) {
          _this97.processScroll(t);
        }, 10), {
          passive: !0
        }), this.listeners.on(document.body, "mouseup", function () {
          _this97.processMouseUp();
        }, !1);
      }
    }, {
      key: "processMouseDown",
      value: function processMouseDown(e) {
        if (e.button !== this.MAIN_MOUSE_BUTTON) return;
        e.target.closest(c.allInputsSelector) !== null || this.startSelection(e.pageX, e.pageY);
      }
    }, {
      key: "processMouseMove",
      value: function processMouseMove(e) {
        this.changingRectangle(e), this.scrollByZones(e.clientY);
      }
    }, {
      key: "processMouseLeave",
      value: function processMouseLeave() {
        this.clearSelection(), this.endSelection();
      }
    }, {
      key: "processScroll",
      value: function processScroll(e) {
        this.changingRectangle(e);
      }
    }, {
      key: "processMouseUp",
      value: function processMouseUp() {
        this.clearSelection(), this.endSelection();
      }
    }, {
      key: "scrollByZones",
      value: function scrollByZones(e) {
        if (this.inScrollZone = null, e <= this.HEIGHT_OF_SCROLL_ZONE && (this.inScrollZone = this.TOP_SCROLL_ZONE), document.documentElement.clientHeight - e <= this.HEIGHT_OF_SCROLL_ZONE && (this.inScrollZone = this.BOTTOM_SCROLL_ZONE), !this.inScrollZone) {
          this.isScrolling = !1;
          return;
        }
        this.isScrolling || (this.scrollVertical(this.inScrollZone === this.TOP_SCROLL_ZONE ? -this.SCROLL_SPEED : this.SCROLL_SPEED), this.isScrolling = !0);
      }
    }, {
      key: "genHTML",
      value: function genHTML() {
        var e = this.Editor.UI,
          t = e.nodes.holder.querySelector("." + e.CSS.editorWrapper),
          o = c.make("div", me.CSS.overlay, {}),
          i = c.make("div", me.CSS.overlayContainer, {}),
          n = c.make("div", me.CSS.rect, {});
        return i.appendChild(n), o.appendChild(i), t.appendChild(o), this.overlayRectangle = n, {
          container: t,
          overlay: o
        };
      }
    }, {
      key: "scrollVertical",
      value: function scrollVertical(e) {
        var _this98 = this;
        if (!(this.inScrollZone && this.mousedown)) return;
        var t = window.pageYOffset;
        window.scrollBy(0, e), this.mouseY += window.pageYOffset - t, setTimeout(function () {
          _this98.scrollVertical(e);
        }, 0);
      }
    }, {
      key: "changingRectangle",
      value: function changingRectangle(e) {
        if (!this.mousedown) return;
        e.pageY !== void 0 && (this.mouseX = e.pageX, this.mouseY = e.pageY);
        var _this$genInfoForMouse = this.genInfoForMouseSelection(),
          t = _this$genInfoForMouse.rightPos,
          o = _this$genInfoForMouse.leftPos,
          i = _this$genInfoForMouse.index,
          n = this.startX > t && this.mouseX > t,
          r = this.startX < o && this.mouseX < o;
        this.rectCrossesBlocks = !(n || r), this.isRectSelectionActivated || (this.rectCrossesBlocks = !1, this.isRectSelectionActivated = !0, this.shrinkRectangleToPoint(), this.overlayRectangle.style.display = "block"), this.updateRectangleSize(), this.Editor.Toolbar.close(), i !== void 0 && (this.trySelectNextBlock(i), this.inverseSelection(), g.get().removeAllRanges());
      }
    }, {
      key: "shrinkRectangleToPoint",
      value: function shrinkRectangleToPoint() {
        this.overlayRectangle.style.left = "".concat(this.startX - window.pageXOffset, "px"), this.overlayRectangle.style.top = "".concat(this.startY - window.pageYOffset, "px"), this.overlayRectangle.style.bottom = "calc(100% - ".concat(this.startY - window.pageYOffset, "px"), this.overlayRectangle.style.right = "calc(100% - ".concat(this.startX - window.pageXOffset, "px");
      }
    }, {
      key: "inverseSelection",
      value: function inverseSelection() {
        var t = this.Editor.BlockManager.getBlockByIndex(this.stackOfSelected[0]).selected;
        if (this.rectCrossesBlocks && !t) {
          var _iterator3 = _createForOfIteratorHelper(this.stackOfSelected),
            _step3;
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var o = _step3.value;
              this.Editor.BlockSelection.selectBlockByIndex(o);
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        }
        if (!this.rectCrossesBlocks && t) {
          var _iterator4 = _createForOfIteratorHelper(this.stackOfSelected),
            _step4;
          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var _o6 = _step4.value;
              this.Editor.BlockSelection.unSelectBlockByIndex(_o6);
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
        }
      }
    }, {
      key: "updateRectangleSize",
      value: function updateRectangleSize() {
        this.mouseY >= this.startY ? (this.overlayRectangle.style.top = "".concat(this.startY - window.pageYOffset, "px"), this.overlayRectangle.style.bottom = "calc(100% - ".concat(this.mouseY - window.pageYOffset, "px")) : (this.overlayRectangle.style.bottom = "calc(100% - ".concat(this.startY - window.pageYOffset, "px"), this.overlayRectangle.style.top = "".concat(this.mouseY - window.pageYOffset, "px")), this.mouseX >= this.startX ? (this.overlayRectangle.style.left = "".concat(this.startX - window.pageXOffset, "px"), this.overlayRectangle.style.right = "calc(100% - ".concat(this.mouseX - window.pageXOffset, "px")) : (this.overlayRectangle.style.right = "calc(100% - ".concat(this.startX - window.pageXOffset, "px"), this.overlayRectangle.style.left = "".concat(this.mouseX - window.pageXOffset, "px"));
      }
    }, {
      key: "genInfoForMouseSelection",
      value: function genInfoForMouseSelection() {
        var t = document.body.offsetWidth / 2,
          o = this.mouseY - window.pageYOffset,
          i = document.elementFromPoint(t, o),
          n = this.Editor.BlockManager.getBlockByChildNode(i);
        var r;
        n !== void 0 && (r = this.Editor.BlockManager.blocks.findIndex(function (h) {
          return h.holder === n.holder;
        }));
        var a = this.Editor.BlockManager.lastBlock.holder.querySelector("." + N.CSS.content),
          l = Number.parseInt(window.getComputedStyle(a).width, 10) / 2,
          d = t - l,
          u = t + l;
        return {
          index: r,
          leftPos: d,
          rightPos: u
        };
      }
    }, {
      key: "addBlockInSelection",
      value: function addBlockInSelection(e) {
        this.rectCrossesBlocks && this.Editor.BlockSelection.selectBlockByIndex(e), this.stackOfSelected.push(e);
      }
    }, {
      key: "trySelectNextBlock",
      value: function trySelectNextBlock(e) {
        var _this99 = this;
        var t = this.stackOfSelected[this.stackOfSelected.length - 1] === e,
          o = this.stackOfSelected.length,
          i = 1,
          n = -1,
          r = 0;
        if (t) return;
        var a = this.stackOfSelected[o - 1] - this.stackOfSelected[o - 2] > 0;
        var l = r;
        o > 1 && (l = a ? i : n);
        var d = e > this.stackOfSelected[o - 1] && l === i,
          u = e < this.stackOfSelected[o - 1] && l === n,
          f = !(d || u || l === r);
        if (!f && (e > this.stackOfSelected[o - 1] || this.stackOfSelected[o - 1] === void 0)) {
          var m = this.stackOfSelected[o - 1] + 1 || e;
          for (m; m <= e; m++) this.addBlockInSelection(m);
          return;
        }
        if (!f && e < this.stackOfSelected[o - 1]) {
          for (var _m = this.stackOfSelected[o - 1] - 1; _m >= e; _m--) this.addBlockInSelection(_m);
          return;
        }
        if (!f) return;
        var x = o - 1,
          p;
        for (e > this.stackOfSelected[o - 1] ? p = function p() {
          return e > _this99.stackOfSelected[x];
        } : p = function p() {
          return e < _this99.stackOfSelected[x];
        }; p();) this.rectCrossesBlocks && this.Editor.BlockSelection.unSelectBlockByIndex(this.stackOfSelected[x]), this.stackOfSelected.pop(), x--;
      }
    }], [{
      key: "CSS",
      get: function get() {
        return {
          overlay: "codex-editor-overlay",
          overlayContainer: "codex-editor-overlay__container",
          rect: "codex-editor-overlay__rectangle",
          topScrollZone: "codex-editor-overlay__scroll-zone--top",
          bottomScrollZone: "codex-editor-overlay__scroll-zone--bottom"
        };
      }
    }]);
  }(y);
  var ii = /*#__PURE__*/function (_y31) {
    function ii() {
      _classCallCheck(this, ii);
      return _callSuper(this, ii, arguments);
    }
    _inherits(ii, _y31);
    return _createClass(ii, [{
      key: "render",
      value: function () {
        var _render2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee39(e) {
          var _this100 = this;
          return _regeneratorRuntime().wrap(function _callee39$(_context39) {
            while (1) switch (_context39.prev = _context39.next) {
              case 0:
                return _context39.abrupt("return", new Promise(function (t) {
                  var _this100$Editor = _this100.Editor,
                    o = _this100$Editor.Tools,
                    i = _this100$Editor.BlockManager;
                  if (e.length === 0) i.insert();else {
                    var n = e.map(function (_ref49) {
                      var r = _ref49.type,
                        a = _ref49.data,
                        l = _ref49.tunes,
                        d = _ref49.id;
                      o.available.has(r) === !1 && (Y("Tool \xAB".concat(r, "\xBB is not found. Check 'tools' property at the Editor.js config."), "warn"), a = _this100.composeStubDataForTool(r, a, d), r = o.stubTool);
                      var u;
                      try {
                        u = i.composeBlock({
                          id: d,
                          tool: r,
                          data: a,
                          tunes: l
                        });
                      } catch (h) {
                        T("Block \xAB".concat(r, "\xBB skipped because of plugins error"), "error", {
                          data: a,
                          error: h
                        }), a = _this100.composeStubDataForTool(r, a, d), r = o.stubTool, u = i.composeBlock({
                          id: d,
                          tool: r,
                          data: a,
                          tunes: l
                        });
                      }
                      return u;
                    });
                    i.insertMany(n);
                  }
                  window.requestIdleCallback(function () {
                    t();
                  }, {
                    timeout: 2e3
                  });
                }));
              case 1:
              case "end":
                return _context39.stop();
            }
          }, _callee39);
        }));
        function render(_x33) {
          return _render2.apply(this, arguments);
        }
        return render;
      }()
    }, {
      key: "composeStubDataForTool",
      value: function composeStubDataForTool(e, t, o) {
        var i = this.Editor.Tools;
        var n = e;
        if (i.unavailable.has(e)) {
          var r = i.unavailable.get(e).toolbox;
          r !== void 0 && r[0].title !== void 0 && (n = r[0].title);
        }
        return {
          savedData: {
            id: o,
            type: e,
            data: t
          },
          title: n
        };
      }
    }]);
  }(y);
  var ni = /*#__PURE__*/function (_y32) {
    function ni() {
      _classCallCheck(this, ni);
      return _callSuper(this, ni, arguments);
    }
    _inherits(ni, _y32);
    return _createClass(ni, [{
      key: "save",
      value: function () {
        var _save2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee40() {
          var _this101 = this;
          var _this$Editor19, e, t, o, i, n, r;
          return _regeneratorRuntime().wrap(function _callee40$(_context40) {
            while (1) switch (_context40.prev = _context40.next) {
              case 0:
                _this$Editor19 = this.Editor, e = _this$Editor19.BlockManager, t = _this$Editor19.Tools, o = e.blocks, i = [];
                _context40.prev = 1;
                o.forEach(function (a) {
                  i.push(_this101.getSavedData(a));
                });
                _context40.next = 5;
                return Promise.all(i);
              case 5:
                n = _context40.sent;
                _context40.next = 8;
                return ut(n, function (a) {
                  return t.blockTools.get(a).sanitizeConfig;
                });
              case 8:
                r = _context40.sent;
                return _context40.abrupt("return", this.makeOutput(r));
              case 12:
                _context40.prev = 12;
                _context40.t0 = _context40["catch"](1);
                Y("Saving failed due to the Error %o", "error", _context40.t0);
              case 15:
              case "end":
                return _context40.stop();
            }
          }, _callee40, this, [[1, 12]]);
        }));
        function save() {
          return _save2.apply(this, arguments);
        }
        return save;
      }()
    }, {
      key: "getSavedData",
      value: function () {
        var _getSavedData = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee41(e) {
          var t, o;
          return _regeneratorRuntime().wrap(function _callee41$(_context41) {
            while (1) switch (_context41.prev = _context41.next) {
              case 0:
                _context41.next = 2;
                return e.save();
              case 2:
                t = _context41.sent;
                _context41.t0 = t;
                if (!_context41.t0) {
                  _context41.next = 8;
                  break;
                }
                _context41.next = 7;
                return e.validate(t.data);
              case 7:
                _context41.t0 = _context41.sent;
              case 8:
                o = _context41.t0;
                return _context41.abrupt("return", _objectSpread(_objectSpread({}, t), {}, {
                  isValid: o
                }));
              case 10:
              case "end":
                return _context41.stop();
            }
          }, _callee41);
        }));
        function getSavedData(_x34) {
          return _getSavedData.apply(this, arguments);
        }
        return getSavedData;
      }()
    }, {
      key: "makeOutput",
      value: function makeOutput(e) {
        var _this102 = this;
        var t = [];
        return e.forEach(function (_ref50) {
          var o = _ref50.id,
            i = _ref50.tool,
            n = _ref50.data,
            r = _ref50.tunes,
            a = _ref50.isValid;
          if (!a) {
            T("Block \xAB".concat(i, "\xBB skipped because saved data is invalid"));
            return;
          }
          if (i === _this102.Editor.Tools.stubTool) {
            t.push(n);
            return;
          }
          var l = _objectSpread({
            id: o,
            type: i,
            data: n
          }, !W(r) && {
            tunes: r
          });
          t.push(l);
        }), {
          time: +new Date(),
          blocks: t,
          version: "2.29.1"
        };
      }
    }]);
  }(y);
  (function () {
    try {
      if ((typeof document === "undefined" ? "undefined" : _typeof(document)) < "u") {
        var s = document.createElement("style");
        s.appendChild(document.createTextNode(".ce-paragraph{line-height:1.6em;outline:none}.ce-paragraph[data-placeholder]:empty:before{content:attr(data-placeholder);color:#707684;font-weight:400;opacity:0}.codex-editor--empty .ce-block:first-child .ce-paragraph[data-placeholder]:empty:before{opacity:1}.codex-editor--toolbox-opened .ce-block:first-child .ce-paragraph[data-placeholder]:empty:before,.codex-editor--empty .ce-block:first-child .ce-paragraph[data-placeholder]:empty:focus:before{opacity:0}.ce-paragraph p:first-of-type{margin-top:0}.ce-paragraph p:last-of-type{margin-bottom:0}")), document.head.appendChild(s);
      }
    } catch (e) {
      console.error("vite-plugin-css-injected-by-js", e);
    }
  })();
  var si = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8 9V7.2C8 7.08954 8.08954 7 8.2 7L12 7M16 9V7.2C16 7.08954 15.9105 7 15.8 7L12 7M12 7L12 17M12 17H10M12 17H14"/></svg>'; /**
                                                                                                                                                                                                                                                                                                            * Base Paragraph Block for the Editor.js.
                                                                                                                                                                                                                                                                                                            * Represents a regular text block
                                                                                                                                                                                                                                                                                                            *
                                                                                                                                                                                                                                                                                                            * @author CodeX (team@codex.so)
                                                                                                                                                                                                                                                                                                            * @copyright CodeX 2018
                                                                                                                                                                                                                                                                                                            * @license The MIT License (MIT)
                                                                                                                                                                                                                                                                                                            */
  var Ke = /*#__PURE__*/function () {
    function Ke(_ref51) {
      var e = _ref51.data,
        t = _ref51.config,
        o = _ref51.api,
        i = _ref51.readOnly;
      _classCallCheck(this, Ke);
      this.api = o, this.readOnly = i, this._CSS = {
        block: this.api.styles.block,
        wrapper: "ce-paragraph"
      }, this.readOnly || (this.onKeyUp = this.onKeyUp.bind(this)), this._placeholder = t.placeholder ? t.placeholder : Ke.DEFAULT_PLACEHOLDER, this._data = {}, this._element = null, this._preserveBlank = t.preserveBlank !== void 0 ? t.preserveBlank : !1, this.data = e;
    }
    return _createClass(Ke, [{
      key: "onKeyUp",
      value: function onKeyUp(e) {
        if (e.code !== "Backspace" && e.code !== "Delete") return;
        var t = this._element.textContent;
        t === "" && (this._element.innerHTML = "");
      }
    }, {
      key: "drawView",
      value: function drawView() {
        var e = document.createElement("DIV");
        return e.classList.add(this._CSS.wrapper, this._CSS.block), e.contentEditable = !1, e.dataset.placeholder = this.api.i18n.t(this._placeholder), this._data.text && (e.innerHTML = this._data.text), this.readOnly || (e.contentEditable = !0, e.addEventListener("keyup", this.onKeyUp)), e;
      }
    }, {
      key: "render",
      value: function render() {
        return this._element = this.drawView(), this._element;
      }
    }, {
      key: "merge",
      value: function merge(e) {
        var t = {
          text: this.data.text + e.text
        };
        this.data = t;
      }
    }, {
      key: "validate",
      value: function validate(e) {
        return !(e.text.trim() === "" && !this._preserveBlank);
      }
    }, {
      key: "save",
      value: function save(e) {
        return {
          text: e.innerHTML
        };
      }
    }, {
      key: "onPaste",
      value: function onPaste(e) {
        var t = {
          text: e.detail.data.innerHTML
        };
        this.data = t;
      }
    }, {
      key: "data",
      get: function get() {
        if (this._element !== null) {
          var e = this._element.innerHTML;
          this._data.text = e;
        }
        return this._data;
      },
      set: function set(e) {
        this._data = e || {}, this._element !== null && this.hydrate();
      }
    }, {
      key: "hydrate",
      value: function hydrate() {
        var _this103 = this;
        window.requestAnimationFrame(function () {
          _this103._element.innerHTML = _this103._data.text || "";
        });
      }
    }], [{
      key: "DEFAULT_PLACEHOLDER",
      get: function get() {
        return "";
      }
    }, {
      key: "conversionConfig",
      get: function get() {
        return {
          export: "text",
          import: "text"
        };
      }
    }, {
      key: "sanitize",
      get: function get() {
        return {
          text: {
            br: !0
          }
        };
      }
    }, {
      key: "isReadOnlySupported",
      get: function get() {
        return !0;
      }
    }, {
      key: "pasteConfig",
      get: function get() {
        return {
          tags: ["P"]
        };
      }
    }, {
      key: "toolbox",
      get: function get() {
        return {
          icon: si,
          title: "Text"
        };
      }
    }]);
  }();
  var Xe = /*#__PURE__*/function () {
    function Xe() {
      _classCallCheck(this, Xe);
      this.commandName = "bold", this.CSS = {
        button: "ce-inline-tool",
        buttonActive: "ce-inline-tool--active",
        buttonModifier: "ce-inline-tool--bold"
      }, this.nodes = {
        button: void 0
      };
    }
    return _createClass(Xe, [{
      key: "render",
      value: function render() {
        return this.nodes.button = document.createElement("button"), this.nodes.button.type = "button", this.nodes.button.classList.add(this.CSS.button, this.CSS.buttonModifier), this.nodes.button.innerHTML = Co, this.nodes.button;
      }
    }, {
      key: "surround",
      value: function surround() {
        document.execCommand(this.commandName);
      }
    }, {
      key: "checkState",
      value: function checkState() {
        var e = document.queryCommandState(this.commandName);
        return this.nodes.button.classList.toggle(this.CSS.buttonActive, e), e;
      }
    }, {
      key: "shortcut",
      get: function get() {
        return "CMD+B";
      }
    }], [{
      key: "sanitize",
      get: function get() {
        return {
          b: {}
        };
      }
    }]);
  }();
  Xe.isInline = !0, Xe.title = "Bold";
  var Ve = /*#__PURE__*/function () {
    function Ve() {
      _classCallCheck(this, Ve);
      this.commandName = "italic", this.CSS = {
        button: "ce-inline-tool",
        buttonActive: "ce-inline-tool--active",
        buttonModifier: "ce-inline-tool--italic"
      }, this.nodes = {
        button: null
      };
    }
    return _createClass(Ve, [{
      key: "render",
      value: function render() {
        return this.nodes.button = document.createElement("button"), this.nodes.button.type = "button", this.nodes.button.classList.add(this.CSS.button, this.CSS.buttonModifier), this.nodes.button.innerHTML = Lo, this.nodes.button;
      }
    }, {
      key: "surround",
      value: function surround() {
        document.execCommand(this.commandName);
      }
    }, {
      key: "checkState",
      value: function checkState() {
        var e = document.queryCommandState(this.commandName);
        return this.nodes.button.classList.toggle(this.CSS.buttonActive, e), e;
      }
    }, {
      key: "shortcut",
      get: function get() {
        return "CMD+I";
      }
    }], [{
      key: "sanitize",
      get: function get() {
        return {
          i: {}
        };
      }
    }]);
  }();
  Ve.isInline = !0, Ve.title = "Italic";
  var qe = /*#__PURE__*/function () {
    function qe(_ref52) {
      var e = _ref52.api;
      _classCallCheck(this, qe);
      this.commandLink = "createLink", this.commandUnlink = "unlink", this.ENTER_KEY = 13, this.CSS = {
        button: "ce-inline-tool",
        buttonActive: "ce-inline-tool--active",
        buttonModifier: "ce-inline-tool--link",
        buttonUnlink: "ce-inline-tool--unlink",
        input: "ce-inline-tool-input",
        inputShowed: "ce-inline-tool-input--showed"
      }, this.nodes = {
        button: null,
        input: null
      }, this.inputOpened = !1, this.toolbar = e.toolbar, this.inlineToolbar = e.inlineToolbar, this.notifier = e.notifier, this.i18n = e.i18n, this.selection = new g();
    }
    return _createClass(qe, [{
      key: "render",
      value: function render() {
        return this.nodes.button = document.createElement("button"), this.nodes.button.type = "button", this.nodes.button.classList.add(this.CSS.button, this.CSS.buttonModifier), this.nodes.button.innerHTML = gt, this.nodes.button;
      }
    }, {
      key: "renderActions",
      value: function renderActions() {
        var _this104 = this;
        return this.nodes.input = document.createElement("input"), this.nodes.input.placeholder = this.i18n.t("Add a link"), this.nodes.input.classList.add(this.CSS.input), this.nodes.input.addEventListener("keydown", function (e) {
          e.keyCode === _this104.ENTER_KEY && _this104.enterPressed(e);
        }), this.nodes.input;
      }
    }, {
      key: "surround",
      value: function surround(e) {
        if (e) {
          this.inputOpened ? (this.selection.restore(), this.selection.removeFakeBackground()) : (this.selection.setFakeBackground(), this.selection.save());
          var t = this.selection.findParentTag("A");
          if (t) {
            this.selection.expandToTag(t), this.unlink(), this.closeActions(), this.checkState(), this.toolbar.close();
            return;
          }
        }
        this.toggleActions();
      }
    }, {
      key: "checkState",
      value: function checkState() {
        var e = this.selection.findParentTag("A");
        if (e) {
          this.nodes.button.innerHTML = No, this.nodes.button.classList.add(this.CSS.buttonUnlink), this.nodes.button.classList.add(this.CSS.buttonActive), this.openActions();
          var t = e.getAttribute("href");
          this.nodes.input.value = t !== "null" ? t : "", this.selection.save();
        } else this.nodes.button.innerHTML = gt, this.nodes.button.classList.remove(this.CSS.buttonUnlink), this.nodes.button.classList.remove(this.CSS.buttonActive);
        return !!e;
      }
    }, {
      key: "clear",
      value: function clear() {
        this.closeActions();
      }
    }, {
      key: "shortcut",
      get: function get() {
        return "CMD+K";
      }
    }, {
      key: "toggleActions",
      value: function toggleActions() {
        this.inputOpened ? this.closeActions(!1) : this.openActions(!0);
      }
    }, {
      key: "openActions",
      value: function openActions() {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
        this.nodes.input.classList.add(this.CSS.inputShowed), e && this.nodes.input.focus(), this.inputOpened = !0;
      }
    }, {
      key: "closeActions",
      value: function closeActions() {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !0;
        if (this.selection.isFakeBackgroundEnabled) {
          var t = new g();
          t.save(), this.selection.restore(), this.selection.removeFakeBackground(), t.restore();
        }
        this.nodes.input.classList.remove(this.CSS.inputShowed), this.nodes.input.value = "", e && this.selection.clearSaved(), this.inputOpened = !1;
      }
    }, {
      key: "enterPressed",
      value: function enterPressed(e) {
        var t = this.nodes.input.value || "";
        if (!t.trim()) {
          this.selection.restore(), this.unlink(), e.preventDefault(), this.closeActions();
          return;
        }
        if (!this.validateURL(t)) {
          this.notifier.show({
            message: "Pasted link is not valid.",
            style: "error"
          }), T("Incorrect Link pasted", "warn", t);
          return;
        }
        t = this.prepareLink(t), this.selection.restore(), this.selection.removeFakeBackground(), this.insertLink(t), e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), this.selection.collapseToEnd(), this.inlineToolbar.close();
      }
    }, {
      key: "validateURL",
      value: function validateURL(e) {
        return !/\s/.test(e);
      }
    }, {
      key: "prepareLink",
      value: function prepareLink(e) {
        return e = e.trim(), e = this.addProtocol(e), e;
      }
    }, {
      key: "addProtocol",
      value: function addProtocol(e) {
        if (/^(\w+):(\/\/)?/.test(e)) return e;
        var t = /^\/[^/\s]/.test(e),
          o = e.substring(0, 1) === "#",
          i = /^\/\/[^/\s]/.test(e);
        return !t && !o && !i && (e = "http://" + e), e;
      }
    }, {
      key: "insertLink",
      value: function insertLink(e) {
        var t = this.selection.findParentTag("A");
        t && this.selection.expandToTag(t), document.execCommand(this.commandLink, !1, e);
      }
    }, {
      key: "unlink",
      value: function unlink() {
        document.execCommand(this.commandUnlink);
      }
    }], [{
      key: "sanitize",
      get: function get() {
        return {
          a: {
            href: !0,
            target: "_blank",
            rel: "nofollow"
          }
        };
      }
    }]);
  }();
  qe.isInline = !0, qe.title = "Link";
  var St = /*#__PURE__*/function () {
    function St(_ref53) {
      var e = _ref53.data,
        t = _ref53.api;
      _classCallCheck(this, St);
      this.CSS = {
        wrapper: "ce-stub",
        info: "ce-stub__info",
        title: "ce-stub__title",
        subtitle: "ce-stub__subtitle"
      }, this.api = t, this.title = e.title || this.api.i18n.t("Error"), this.subtitle = this.api.i18n.t("The block can not be displayed correctly."), this.savedData = e.savedData, this.wrapper = this.make();
    }
    return _createClass(St, [{
      key: "render",
      value: function render() {
        return this.wrapper;
      }
    }, {
      key: "save",
      value: function save() {
        return this.savedData;
      }
    }, {
      key: "make",
      value: function make() {
        var e = c.make("div", this.CSS.wrapper),
          t = Ro,
          o = c.make("div", this.CSS.info),
          i = c.make("div", this.CSS.title, {
            textContent: this.title
          }),
          n = c.make("div", this.CSS.subtitle, {
            textContent: this.subtitle
          });
        return e.innerHTML = t, o.appendChild(i), o.appendChild(n), e.appendChild(o), e;
      }
    }]);
  }();
  St.isReadOnlySupported = !0;
  var ri = /*#__PURE__*/function (_We) {
    function ri() {
      var _this105;
      _classCallCheck(this, ri);
      _this105 = _callSuper(this, ri, arguments), _this105.type = Be.Inline;
      return _this105;
    }
    _inherits(ri, _We);
    return _createClass(ri, [{
      key: "title",
      get: function get() {
        return this.constructable[$e.Title];
      }
    }, {
      key: "create",
      value: function create() {
        return new this.constructable({
          api: this.api.getMethodsForTool(this),
          config: this.settings
        });
      }
    }]);
  }(We);
  var ai = /*#__PURE__*/function (_We2) {
    function ai() {
      var _this106;
      _classCallCheck(this, ai);
      _this106 = _callSuper(this, ai, arguments), _this106.type = Be.Tune;
      return _this106;
    }
    _inherits(ai, _We2);
    return _createClass(ai, [{
      key: "create",
      value: function create(e, t) {
        return new this.constructable({
          api: this.api.getMethodsForTool(this),
          config: this.settings,
          block: t,
          data: e
        });
      }
    }]);
  }(We);
  var P = /*#__PURE__*/function (_Map) {
    function P() {
      _classCallCheck(this, P);
      return _callSuper(this, P, arguments);
    }
    _inherits(P, _Map);
    return _createClass(P, [{
      key: "blockTools",
      get: function get() {
        var e = Array.from(this.entries()).filter(function (_ref54) {
          var _ref55 = _slicedToArray(_ref54, 2),
            t = _ref55[1];
          return t.isBlock();
        });
        return new P(e);
      }
    }, {
      key: "inlineTools",
      get: function get() {
        var e = Array.from(this.entries()).filter(function (_ref56) {
          var _ref57 = _slicedToArray(_ref56, 2),
            t = _ref57[1];
          return t.isInline();
        });
        return new P(e);
      }
    }, {
      key: "blockTunes",
      get: function get() {
        var e = Array.from(this.entries()).filter(function (_ref58) {
          var _ref59 = _slicedToArray(_ref58, 2),
            t = _ref59[1];
          return t.isTune();
        });
        return new P(e);
      }
    }, {
      key: "internalTools",
      get: function get() {
        var e = Array.from(this.entries()).filter(function (_ref60) {
          var _ref61 = _slicedToArray(_ref60, 2),
            t = _ref61[1];
          return t.isInternal;
        });
        return new P(e);
      }
    }, {
      key: "externalTools",
      get: function get() {
        var e = Array.from(this.entries()).filter(function (_ref62) {
          var _ref63 = _slicedToArray(_ref62, 2),
            t = _ref63[1];
          return !t.isInternal;
        });
        return new P(e);
      }
    }]);
  }(/*#__PURE__*/_wrapNativeSuper(Map));
  var li = Object.defineProperty,
    ci = Object.getOwnPropertyDescriptor,
    It = function It(s, e, t, o) {
      for (var i = o > 1 ? void 0 : o ? ci(e, t) : e, n = s.length - 1, r; n >= 0; n--) (r = s[n]) && (i = (o ? r(e, t, i) : r(i)) || i);
      return o && i && li(e, t, i), i;
    };
  var Ze = /*#__PURE__*/function (_We3) {
    function Ze() {
      var _this107;
      _classCallCheck(this, Ze);
      _this107 = _callSuper(this, Ze, arguments), _this107.type = Be.Block, _this107.inlineTools = new P(), _this107.tunes = new P();
      return _this107;
    }
    _inherits(Ze, _We3);
    return _createClass(Ze, [{
      key: "create",
      value: function create(e, t, o) {
        return new this.constructable({
          data: e,
          block: t,
          readOnly: o,
          api: this.api.getMethodsForTool(this),
          config: this.settings
        });
      }
    }, {
      key: "isReadOnlySupported",
      get: function get() {
        return this.constructable[ce.IsReadOnlySupported] === !0;
      }
    }, {
      key: "isLineBreaksEnabled",
      get: function get() {
        return this.constructable[ce.IsEnabledLineBreaks];
      }
    }, {
      key: "toolbox",
      get: function get() {
        var e = this.constructable[ce.Toolbox],
          t = this.config[Te.Toolbox];
        if (!W(e) && t !== !1) return t ? Array.isArray(e) ? Array.isArray(t) ? t.map(function (o, i) {
          var n = e[i];
          return n ? _objectSpread(_objectSpread({}, n), o) : o;
        }) : [t] : Array.isArray(t) ? t : [_objectSpread(_objectSpread({}, e), t)] : Array.isArray(e) ? e : [e];
      }
    }, {
      key: "conversionConfig",
      get: function get() {
        return this.constructable[ce.ConversionConfig];
      }
    }, {
      key: "enabledInlineTools",
      get: function get() {
        return this.config[Te.EnabledInlineTools] || !1;
      }
    }, {
      key: "enabledBlockTunes",
      get: function get() {
        return this.config[Te.EnabledBlockTunes];
      }
    }, {
      key: "pasteConfig",
      get: function get() {
        var _this$constructable$c;
        return (_this$constructable$c = this.constructable[ce.PasteConfig]) !== null && _this$constructable$c !== void 0 ? _this$constructable$c : {};
      }
    }, {
      key: "sanitizeConfig",
      get: function get() {
        var e = _superPropGet(Ze, "sanitizeConfig", this, 1),
          t = this.baseSanitizeConfig;
        if (W(e)) return t;
        var o = {};
        for (var i in e) if (Object.prototype.hasOwnProperty.call(e, i)) {
          var n = e[i];
          O(n) ? o[i] = Object.assign({}, t, n) : o[i] = n;
        }
        return o;
      }
    }, {
      key: "baseSanitizeConfig",
      get: function get() {
        var e = {};
        return Array.from(this.inlineTools.values()).forEach(function (t) {
          return Object.assign(e, t.sanitizeConfig);
        }), Array.from(this.tunes.values()).forEach(function (t) {
          return Object.assign(e, t.sanitizeConfig);
        }), e;
      }
    }]);
  }(We);
  It([se], Ze.prototype, "sanitizeConfig", 1), It([se], Ze.prototype, "baseSanitizeConfig", 1);
  var di = /*#__PURE__*/function () {
    function di(e, t, o) {
      _classCallCheck(this, di);
      this.api = o, this.config = e, this.editorConfig = t;
    }
    return _createClass(di, [{
      key: "get",
      value: function get(e) {
        var _this$config$e = this.config[e],
          t = _this$config$e.class,
          _this$config$e$isInte = _this$config$e.isInternal,
          o = _this$config$e$isInte === void 0 ? !1 : _this$config$e$isInte,
          i = _objectWithoutProperties(_this$config$e, _excluded),
          n = this.getConstructor(t);
        return new n({
          name: e,
          constructable: t,
          config: i,
          api: this.api,
          isDefault: e === this.editorConfig.defaultBlock,
          defaultPlaceholder: this.editorConfig.placeholder,
          isInternal: o
        });
      }
    }, {
      key: "getConstructor",
      value: function getConstructor(e) {
        switch (!0) {
          case e[$e.IsInline]:
            return ri;
          case e[wt.IsTune]:
            return ai;
          default:
            return Ze;
        }
      }
    }]);
  }();
  var Mt = /*#__PURE__*/function () {
    function Mt(_ref64) {
      var e = _ref64.api;
      _classCallCheck(this, Mt);
      this.CSS = {
        animation: "wobble"
      }, this.api = e;
    }
    return _createClass(Mt, [{
      key: "render",
      value: function render() {
        var _this108 = this;
        return {
          icon: ft,
          title: this.api.i18n.t("Move down"),
          onActivate: function onActivate() {
            return _this108.handleClick();
          },
          name: "move-down"
        };
      }
    }, {
      key: "handleClick",
      value: function handleClick() {
        var e = this.api.blocks.getCurrentBlockIndex(),
          t = this.api.blocks.getBlockByIndex(e + 1);
        if (!t) throw new Error("Unable to move Block down since it is already the last");
        var o = t.holder,
          i = o.getBoundingClientRect();
        var n = Math.abs(window.innerHeight - o.offsetHeight);
        i.top < window.innerHeight && (n = window.scrollY + o.offsetHeight), window.scrollTo(0, n), this.api.blocks.move(e + 1), this.api.toolbar.toggleBlockSettings(!0);
      }
    }]);
  }();
  Mt.isTune = !0;
  var Lt = /*#__PURE__*/function () {
    function Lt(_ref65) {
      var e = _ref65.api;
      _classCallCheck(this, Lt);
      this.api = e;
    }
    return _createClass(Lt, [{
      key: "render",
      value: function render() {
        var _this109 = this;
        return {
          icon: Io,
          title: this.api.i18n.t("Delete"),
          name: "delete",
          confirmation: {
            title: this.api.i18n.t("Click to delete"),
            onActivate: function onActivate() {
              return _this109.handleClick();
            }
          }
        };
      }
    }, {
      key: "handleClick",
      value: function handleClick() {
        this.api.blocks.delete();
      }
    }]);
  }();
  Lt.isTune = !0;
  var At = /*#__PURE__*/function () {
    function At(_ref66) {
      var e = _ref66.api;
      _classCallCheck(this, At);
      this.CSS = {
        animation: "wobble"
      }, this.api = e;
    }
    return _createClass(At, [{
      key: "render",
      value: function render() {
        var _this110 = this;
        return {
          icon: So,
          title: this.api.i18n.t("Move up"),
          onActivate: function onActivate() {
            return _this110.handleClick();
          },
          name: "move-up"
        };
      }
    }, {
      key: "handleClick",
      value: function handleClick() {
        var e = this.api.blocks.getCurrentBlockIndex(),
          t = this.api.blocks.getBlockByIndex(e),
          o = this.api.blocks.getBlockByIndex(e - 1);
        if (e === 0 || !t || !o) throw new Error("Unable to move Block up since it is already the first");
        var i = t.holder,
          n = o.holder,
          r = i.getBoundingClientRect(),
          a = n.getBoundingClientRect();
        var l;
        a.top > 0 ? l = Math.abs(r.top) - Math.abs(a.top) : l = Math.abs(r.top) + a.height, window.scrollBy(0, -1 * l), this.api.blocks.move(e - 1), this.api.toolbar.toggleBlockSettings(!0);
      }
    }]);
  }();
  At.isTune = !0;
  var hi = Object.defineProperty,
    ui = Object.getOwnPropertyDescriptor,
    pi = function pi(s, e, t, o) {
      for (var i = o > 1 ? void 0 : o ? ui(e, t) : e, n = s.length - 1, r; n >= 0; n--) (r = s[n]) && (i = (o ? r(e, t, i) : r(i)) || i);
      return o && i && hi(e, t, i), i;
    };
  var _t = /*#__PURE__*/function (_y33) {
    function _t() {
      var _this111;
      _classCallCheck(this, _t);
      _this111 = _callSuper(this, _t, arguments), _this111.stubTool = "stub", _this111.toolsAvailable = new P(), _this111.toolsUnavailable = new P();
      return _this111;
    }
    _inherits(_t, _y33);
    return _createClass(_t, [{
      key: "available",
      get: function get() {
        return this.toolsAvailable;
      }
    }, {
      key: "unavailable",
      get: function get() {
        return this.toolsUnavailable;
      }
    }, {
      key: "inlineTools",
      get: function get() {
        return this.available.inlineTools;
      }
    }, {
      key: "blockTools",
      get: function get() {
        return this.available.blockTools;
      }
    }, {
      key: "blockTunes",
      get: function get() {
        return this.available.blockTunes;
      }
    }, {
      key: "defaultTool",
      get: function get() {
        return this.blockTools.get(this.config.defaultBlock);
      }
    }, {
      key: "internal",
      get: function get() {
        return this.available.internalTools;
      }
    }, {
      key: "prepare",
      value: function () {
        var _prepare4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee42() {
          var _this112 = this;
          var e, t;
          return _regeneratorRuntime().wrap(function _callee42$(_context42) {
            while (1) switch (_context42.prev = _context42.next) {
              case 0:
                if (!(this.validateTools(), this.config.tools = Me({}, this.internalTools, this.config.tools), !Object.prototype.hasOwnProperty.call(this.config, "tools") || Object.keys(this.config.tools).length === 0)) {
                  _context42.next = 2;
                  break;
                }
                throw Error("Can't start without tools");
              case 2:
                e = this.prepareConfig();
                this.factory = new di(e, this.config, this.Editor.API);
                t = this.getListOfPrepareFunctions(e);
                if (!(t.length === 0)) {
                  _context42.next = 7;
                  break;
                }
                return _context42.abrupt("return", Promise.resolve());
              case 7:
                _context42.next = 9;
                return Ft(t, function (o) {
                  _this112.toolPrepareMethodSuccess(o);
                }, function (o) {
                  _this112.toolPrepareMethodFallback(o);
                });
              case 9:
                this.prepareBlockTools();
              case 10:
              case "end":
                return _context42.stop();
            }
          }, _callee42, this);
        }));
        function prepare() {
          return _prepare4.apply(this, arguments);
        }
        return prepare;
      }()
    }, {
      key: "getAllInlineToolsSanitizeConfig",
      value: function getAllInlineToolsSanitizeConfig() {
        var e = {};
        return Array.from(this.inlineTools.values()).forEach(function (t) {
          Object.assign(e, t.sanitizeConfig);
        }), e;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        Object.values(this.available).forEach(/*#__PURE__*/function () {
          var _ref67 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee43(e) {
            return _regeneratorRuntime().wrap(function _callee43$(_context43) {
              while (1) switch (_context43.prev = _context43.next) {
                case 0:
                  _context43.t0 = M(e.reset);
                  if (!_context43.t0) {
                    _context43.next = 4;
                    break;
                  }
                  _context43.next = 4;
                  return e.reset();
                case 4:
                case "end":
                  return _context43.stop();
              }
            }, _callee43);
          }));
          return function (_x35) {
            return _ref67.apply(this, arguments);
          };
        }());
      }
    }, {
      key: "internalTools",
      get: function get() {
        return {
          bold: {
            class: Xe,
            isInternal: !0
          },
          italic: {
            class: Ve,
            isInternal: !0
          },
          link: {
            class: qe,
            isInternal: !0
          },
          paragraph: {
            class: Ke,
            inlineToolbar: !0,
            isInternal: !0
          },
          stub: {
            class: St,
            isInternal: !0
          },
          moveUp: {
            class: At,
            isInternal: !0
          },
          delete: {
            class: Lt,
            isInternal: !0
          },
          moveDown: {
            class: Mt,
            isInternal: !0
          }
        };
      }
    }, {
      key: "toolPrepareMethodSuccess",
      value: function toolPrepareMethodSuccess(e) {
        var t = this.factory.get(e.toolName);
        if (t.isInline()) {
          var i = ["render", "surround", "checkState"].filter(function (n) {
            return !t.create()[n];
          });
          if (i.length) {
            T("Incorrect Inline Tool: ".concat(t.name, ". Some of required methods is not implemented %o"), "warn", i), this.toolsUnavailable.set(t.name, t);
            return;
          }
        }
        this.toolsAvailable.set(t.name, t);
      }
    }, {
      key: "toolPrepareMethodFallback",
      value: function toolPrepareMethodFallback(e) {
        this.toolsUnavailable.set(e.toolName, this.factory.get(e.toolName));
      }
    }, {
      key: "getListOfPrepareFunctions",
      value: function getListOfPrepareFunctions(e) {
        var t = [];
        return Object.entries(e).forEach(function (_ref68) {
          var _ref69 = _slicedToArray(_ref68, 2),
            o = _ref69[0],
            i = _ref69[1];
          t.push({
            function: M(i.class.prepare) ? i.class.prepare : function () {},
            data: {
              toolName: o,
              config: i.config
            }
          });
        }), t;
      }
    }, {
      key: "prepareBlockTools",
      value: function prepareBlockTools() {
        var _this113 = this;
        Array.from(this.blockTools.values()).forEach(function (e) {
          _this113.assignInlineToolsToBlockTool(e), _this113.assignBlockTunesToBlockTool(e);
        });
      }
    }, {
      key: "assignInlineToolsToBlockTool",
      value: function assignInlineToolsToBlockTool(e) {
        var _this114 = this;
        if (this.config.inlineToolbar !== !1) {
          if (e.enabledInlineTools === !0) {
            e.inlineTools = new P(Array.isArray(this.config.inlineToolbar) ? this.config.inlineToolbar.map(function (t) {
              return [t, _this114.inlineTools.get(t)];
            }) : Array.from(this.inlineTools.entries()));
            return;
          }
          Array.isArray(e.enabledInlineTools) && (e.inlineTools = new P(e.enabledInlineTools.map(function (t) {
            return [t, _this114.inlineTools.get(t)];
          })));
        }
      }
    }, {
      key: "assignBlockTunesToBlockTool",
      value: function assignBlockTunesToBlockTool(e) {
        var _this115 = this;
        if (e.enabledBlockTunes !== !1) {
          if (Array.isArray(e.enabledBlockTunes)) {
            var t = new P(e.enabledBlockTunes.map(function (o) {
              return [o, _this115.blockTunes.get(o)];
            }));
            e.tunes = new P([].concat(_toConsumableArray(t), _toConsumableArray(this.blockTunes.internalTools)));
            return;
          }
          if (Array.isArray(this.config.tunes)) {
            var _t4 = new P(this.config.tunes.map(function (o) {
              return [o, _this115.blockTunes.get(o)];
            }));
            e.tunes = new P([].concat(_toConsumableArray(_t4), _toConsumableArray(this.blockTunes.internalTools)));
            return;
          }
          e.tunes = this.blockTunes.internalTools;
        }
      }
    }, {
      key: "validateTools",
      value: function validateTools() {
        for (var e in this.config.tools) if (Object.prototype.hasOwnProperty.call(this.config.tools, e)) {
          if (e in this.internalTools) return;
          var t = this.config.tools[e];
          if (!M(t) && !M(t.class)) throw Error("Tool \xAB".concat(e, "\xBB must be a constructor function or an object with function in the \xABclass\xBB property"));
        }
      }
    }, {
      key: "prepareConfig",
      value: function prepareConfig() {
        var e = {};
        for (var t in this.config.tools) O(this.config.tools[t]) ? e[t] = this.config.tools[t] : e[t] = {
          class: this.config.tools[t]
        };
        return e;
      }
    }]);
  }(y);
  pi([se], _t.prototype, "getAllInlineToolsSanitizeConfig", 1);
  var fi = ":root{--selectionColor: #e1f2ff;--inlineSelectionColor: #d4ecff;--bg-light: #eff2f5;--grayText: #707684;--color-dark: #1D202B;--color-active-icon: #388AE5;--color-gray-border: rgba(201, 201, 204, .48);--content-width: 650px;--narrow-mode-right-padding: 50px;--toolbox-buttons-size: 26px;--toolbox-buttons-size--mobile: 36px;--icon-size: 20px;--icon-size--mobile: 28px;--block-padding-vertical: .4em;--color-line-gray: #EFF0F1 }.codex-editor{position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;z-index:1}.codex-editor .hide{display:none}.codex-editor__redactor [contenteditable]:empty:after{content:\"\\feff\"}@media (min-width: 651px){.codex-editor--narrow .codex-editor__redactor{margin-right:50px}}@media (min-width: 651px){.codex-editor--narrow.codex-editor--rtl .codex-editor__redactor{margin-left:50px;margin-right:0}}@media (min-width: 651px){.codex-editor--narrow .ce-toolbar__actions{right:-5px}}.codex-editor-copyable{position:absolute;height:1px;width:1px;top:-400%;opacity:.001}.codex-editor-overlay{position:fixed;top:0px;left:0px;right:0px;bottom:0px;z-index:999;pointer-events:none;overflow:hidden}.codex-editor-overlay__container{position:relative;pointer-events:auto;z-index:0}.codex-editor-overlay__rectangle{position:absolute;pointer-events:none;background-color:#2eaadc33;border:1px solid transparent}.codex-editor svg{max-height:100%}.codex-editor path{stroke:currentColor}.codex-editor ::-moz-selection{background-color:#d4ecff}.codex-editor ::selection{background-color:#d4ecff}.codex-editor--toolbox-opened [contentEditable=true][data-placeholder]:focus:before{opacity:0!important}.ce-scroll-locked{overflow:hidden}.ce-scroll-locked--hard{overflow:hidden;top:calc(-1 * var(--window-scroll-offset));position:fixed;width:100%}.ce-toolbar{position:absolute;left:0;right:0;top:0;-webkit-transition:opacity .1s ease;transition:opacity .1s ease;will-change:opacity,top;display:none}.ce-toolbar--opened{display:block}.ce-toolbar__content{max-width:650px;margin:0 auto;position:relative}.ce-toolbar__plus{color:#1d202b;cursor:pointer;width:26px;height:26px;border-radius:7px;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-ms-flex-negative:0;flex-shrink:0}@media (max-width: 650px){.ce-toolbar__plus{width:36px;height:36px}}@media (hover: hover){.ce-toolbar__plus:hover{background-color:#eff2f5}}.ce-toolbar__plus--active{background-color:#eff2f5;-webkit-animation:bounceIn .75s 1;animation:bounceIn .75s 1;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}.ce-toolbar__plus-shortcut{opacity:.6;word-spacing:-2px;margin-top:5px}@media (max-width: 650px){.ce-toolbar__plus{position:absolute;background-color:#fff;border:1px solid #E8E8EB;-webkit-box-shadow:0 3px 15px -3px rgba(13,20,33,.13);box-shadow:0 3px 15px -3px #0d142121;border-radius:6px;z-index:2;position:static}.ce-toolbar__plus--left-oriented:before{left:15px;margin-left:0}.ce-toolbar__plus--right-oriented:before{left:auto;right:15px;margin-left:0}}.ce-toolbar__actions{position:absolute;right:100%;opacity:0;display:-webkit-box;display:-ms-flexbox;display:flex;padding-right:5px}.ce-toolbar__actions--opened{opacity:1}@media (max-width: 650px){.ce-toolbar__actions{right:auto}}.ce-toolbar__settings-btn{color:#1d202b;width:26px;height:26px;border-radius:7px;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;margin-left:3px;cursor:pointer;user-select:none}@media (max-width: 650px){.ce-toolbar__settings-btn{width:36px;height:36px}}@media (hover: hover){.ce-toolbar__settings-btn:hover{background-color:#eff2f5}}.ce-toolbar__settings-btn--active{background-color:#eff2f5;-webkit-animation:bounceIn .75s 1;animation:bounceIn .75s 1;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}@media (min-width: 651px){.ce-toolbar__settings-btn{width:24px}}.ce-toolbar__settings-btn--hidden{display:none}@media (max-width: 650px){.ce-toolbar__settings-btn{position:absolute;background-color:#fff;border:1px solid #E8E8EB;-webkit-box-shadow:0 3px 15px -3px rgba(13,20,33,.13);box-shadow:0 3px 15px -3px #0d142121;border-radius:6px;z-index:2;position:static}.ce-toolbar__settings-btn--left-oriented:before{left:15px;margin-left:0}.ce-toolbar__settings-btn--right-oriented:before{left:auto;right:15px;margin-left:0}}.ce-toolbar__plus svg,.ce-toolbar__settings-btn svg{width:24px;height:24px}@media (min-width: 651px){.codex-editor--narrow .ce-toolbar__plus{left:5px}}@media (min-width: 651px){.codex-editor--narrow .ce-toolbox .ce-popover{right:0;left:auto;left:initial}}.ce-inline-toolbar{--y-offset: 8px;position:absolute;background-color:#fff;border:1px solid #E8E8EB;-webkit-box-shadow:0 3px 15px -3px rgba(13,20,33,.13);box-shadow:0 3px 15px -3px #0d142121;border-radius:6px;z-index:2;opacity:0;visibility:hidden;-webkit-transition:opacity .25s ease;transition:opacity .25s ease;will-change:opacity,left,top;top:0;left:0;z-index:3}.ce-inline-toolbar--left-oriented:before{left:15px;margin-left:0}.ce-inline-toolbar--right-oriented:before{left:auto;right:15px;margin-left:0}.ce-inline-toolbar--showed{opacity:1;visibility:visible}.ce-inline-toolbar [hidden]{display:none!important}.ce-inline-toolbar__toggler-and-button-wrapper{display:-webkit-box;display:-ms-flexbox;display:flex;width:100%;padding:0 6px}.ce-inline-toolbar__buttons{display:-webkit-box;display:-ms-flexbox;display:flex}.ce-inline-toolbar__dropdown{display:-webkit-box;display:-ms-flexbox;display:flex;padding:6px;margin:0 6px 0 -6px;-webkit-box-align:center;-ms-flex-align:center;align-items:center;cursor:pointer;border-right:1px solid rgba(201,201,204,.48);-webkit-box-sizing:border-box;box-sizing:border-box}@media (hover: hover){.ce-inline-toolbar__dropdown:hover{background:#eff2f5}}.ce-inline-toolbar__dropdown--hidden{display:none}.ce-inline-toolbar__dropdown-content,.ce-inline-toolbar__dropdown-arrow{display:-webkit-box;display:-ms-flexbox;display:flex}.ce-inline-toolbar__dropdown-content svg,.ce-inline-toolbar__dropdown-arrow svg{width:20px;height:20px}.ce-inline-toolbar__shortcut{opacity:.6;word-spacing:-3px;margin-top:3px}.ce-inline-tool{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;padding:6px 1px;cursor:pointer;border:0;outline:none;background-color:transparent;vertical-align:bottom;color:inherit;margin:0;border-radius:0;line-height:normal}.ce-inline-tool svg{width:20px;height:20px}@media (max-width: 650px){.ce-inline-tool svg{width:28px;height:28px}}@media (hover: hover){.ce-inline-tool:hover{background-color:#eff2f5}}.ce-inline-tool--active{color:#388ae5}.ce-inline-tool--focused{background:rgba(34,186,255,.08)!important}.ce-inline-tool--focused{-webkit-box-shadow:inset 0 0 0px 1px rgba(7,161,227,.08);box-shadow:inset 0 0 0 1px #07a1e314}.ce-inline-tool--focused-animated{-webkit-animation-name:buttonClicked;animation-name:buttonClicked;-webkit-animation-duration:.25s;animation-duration:.25s}.ce-inline-tool--link .icon--unlink,.ce-inline-tool--unlink .icon--link{display:none}.ce-inline-tool--unlink .icon--unlink{display:inline-block;margin-bottom:-1px}.ce-inline-tool-input{outline:none;border:0;border-radius:0 0 4px 4px;margin:0;font-size:13px;padding:10px;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;display:none;font-weight:500;border-top:1px solid rgba(201,201,204,.48);-webkit-appearance:none;font-family:inherit}@media (max-width: 650px){.ce-inline-tool-input{font-size:15px;font-weight:500}}.ce-inline-tool-input::-webkit-input-placeholder{color:#707684}.ce-inline-tool-input::-moz-placeholder{color:#707684}.ce-inline-tool-input:-ms-input-placeholder{color:#707684}.ce-inline-tool-input::-ms-input-placeholder{color:#707684}.ce-inline-tool-input::placeholder{color:#707684}.ce-inline-tool-input--showed{display:block}.ce-conversion-toolbar{position:absolute;background-color:#fff;border:1px solid #E8E8EB;-webkit-box-shadow:0 3px 15px -3px rgba(13,20,33,.13);box-shadow:0 3px 15px -3px #0d142121;border-radius:6px;z-index:2;opacity:0;visibility:hidden;will-change:transform,opacity;-webkit-transition:opacity .1s ease,-webkit-transform .1s ease;transition:opacity .1s ease,-webkit-transform .1s ease;transition:transform .1s ease,opacity .1s ease;transition:transform .1s ease,opacity .1s ease,-webkit-transform .1s ease;-webkit-transform:translateY(-8px);transform:translateY(-8px);left:-1px;width:190px;margin-top:5px;-webkit-box-sizing:content-box;box-sizing:content-box}.ce-conversion-toolbar--left-oriented:before{left:15px;margin-left:0}.ce-conversion-toolbar--right-oriented:before{left:auto;right:15px;margin-left:0}.ce-conversion-toolbar--showed{opacity:1;visibility:visible;-webkit-transform:none;transform:none}.ce-conversion-toolbar [hidden]{display:none!important}.ce-conversion-toolbar__buttons{display:-webkit-box;display:-ms-flexbox;display:flex}.ce-conversion-toolbar__label{color:#707684;font-size:11px;font-weight:500;letter-spacing:.33px;padding:10px 10px 5px;text-transform:uppercase}.ce-conversion-tool{display:-webkit-box;display:-ms-flexbox;display:flex;padding:5px 10px;font-size:14px;line-height:20px;font-weight:500;cursor:pointer;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.ce-conversion-tool--hidden{display:none}.ce-conversion-tool--focused{background:rgba(34,186,255,.08)!important}.ce-conversion-tool--focused{-webkit-box-shadow:inset 0 0 0px 1px rgba(7,161,227,.08);box-shadow:inset 0 0 0 1px #07a1e314}.ce-conversion-tool--focused-animated{-webkit-animation-name:buttonClicked;animation-name:buttonClicked;-webkit-animation-duration:.25s;animation-duration:.25s}.ce-conversion-tool:hover{background:#eff2f5}.ce-conversion-tool__icon{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;width:26px;height:26px;-webkit-box-shadow:0 0 0 1px rgba(201,201,204,.48);box-shadow:0 0 0 1px #c9c9cc7a;border-radius:5px;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;background:#fff;-webkit-box-sizing:content-box;box-sizing:content-box;-ms-flex-negative:0;flex-shrink:0;margin-right:10px}.ce-conversion-tool__icon svg{width:20px;height:20px}@media (max-width: 650px){.ce-conversion-tool__icon{width:36px;height:36px;border-radius:8px}.ce-conversion-tool__icon svg{width:28px;height:28px}}.ce-conversion-tool--last{margin-right:0!important}.ce-conversion-tool--active{color:#388ae5!important}.ce-conversion-tool--active{-webkit-animation:bounceIn .75s 1;animation:bounceIn .75s 1;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}.ce-conversion-tool__secondary-label{color:#707684;font-size:12px;margin-left:auto;white-space:nowrap;letter-spacing:-.1em;padding-right:5px;margin-bottom:-2px;opacity:.6}@media (max-width: 650px){.ce-conversion-tool__secondary-label{display:none}}.ce-settings__button{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;padding:6px 1px;border-radius:3px;cursor:pointer;border:0;outline:none;background-color:transparent;vertical-align:bottom;color:inherit;margin:0;line-height:32px}.ce-settings__button svg{width:20px;height:20px}@media (max-width: 650px){.ce-settings__button svg{width:28px;height:28px}}@media (hover: hover){.ce-settings__button:hover{background-color:#eff2f5}}.ce-settings__button--active{color:#388ae5}.ce-settings__button--focused{background:rgba(34,186,255,.08)!important}.ce-settings__button--focused{-webkit-box-shadow:inset 0 0 0px 1px rgba(7,161,227,.08);box-shadow:inset 0 0 0 1px #07a1e314}.ce-settings__button--focused-animated{-webkit-animation-name:buttonClicked;animation-name:buttonClicked;-webkit-animation-duration:.25s;animation-duration:.25s}.ce-settings__button:not(:nth-child(3n+3)){margin-right:3px}.ce-settings__button:nth-child(n+4){margin-top:3px}.ce-settings__button--disabled{cursor:not-allowed!important}.ce-settings__button--disabled{opacity:.3}.ce-settings__button--selected{color:#388ae5}@media (min-width: 651px){.codex-editor--narrow .ce-settings .ce-popover{right:0;left:auto;left:initial}}@-webkit-keyframes fade-in{0%{opacity:0}to{opacity:1}}@keyframes fade-in{0%{opacity:0}to{opacity:1}}.ce-block{-webkit-animation:fade-in .3s ease;animation:fade-in .3s ease;-webkit-animation-fill-mode:none;animation-fill-mode:none;-webkit-animation-fill-mode:initial;animation-fill-mode:initial}.ce-block:first-of-type{margin-top:0}.ce-block--selected .ce-block__content{background:#e1f2ff}.ce-block--selected .ce-block__content [contenteditable]{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ce-block--selected .ce-block__content img,.ce-block--selected .ce-block__content .ce-stub{opacity:.55}.ce-block--stretched .ce-block__content{max-width:none}.ce-block__content{position:relative;max-width:650px;margin:0 auto;-webkit-transition:background-color .15s ease;transition:background-color .15s ease}.ce-block--drop-target .ce-block__content:before{content:\"\";position:absolute;top:100%;left:-20px;margin-top:-1px;height:8px;width:8px;border:solid #388AE5;border-width:1px 1px 0 0;-webkit-transform-origin:right;transform-origin:right;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.ce-block--drop-target .ce-block__content:after{content:\"\";position:absolute;top:100%;height:1px;width:100%;color:#388ae5;background:repeating-linear-gradient(90deg,#388AE5,#388AE5 1px,#fff 1px,#fff 6px)}.ce-block a{cursor:pointer;-webkit-text-decoration:underline;text-decoration:underline}.ce-block b{font-weight:700}.ce-block i{font-style:italic}@-webkit-keyframes bounceIn{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{-webkit-transform:scale3d(.9,.9,.9);transform:scale3d(.9,.9,.9)}20%{-webkit-transform:scale3d(1.03,1.03,1.03);transform:scale3d(1.03,1.03,1.03)}60%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@keyframes bounceIn{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{-webkit-transform:scale3d(.9,.9,.9);transform:scale3d(.9,.9,.9)}20%{-webkit-transform:scale3d(1.03,1.03,1.03);transform:scale3d(1.03,1.03,1.03)}60%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@-webkit-keyframes selectionBounce{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}50%{-webkit-transform:scale3d(1.01,1.01,1.01);transform:scale3d(1.01,1.01,1.01)}70%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@keyframes selectionBounce{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}50%{-webkit-transform:scale3d(1.01,1.01,1.01);transform:scale3d(1.01,1.01,1.01)}70%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@-webkit-keyframes buttonClicked{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{-webkit-transform:scale3d(.95,.95,.95);transform:scale3d(.95,.95,.95)}60%{-webkit-transform:scale3d(1.02,1.02,1.02);transform:scale3d(1.02,1.02,1.02)}80%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@keyframes buttonClicked{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{-webkit-transform:scale3d(.95,.95,.95);transform:scale3d(.95,.95,.95)}60%{-webkit-transform:scale3d(1.02,1.02,1.02);transform:scale3d(1.02,1.02,1.02)}80%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}.cdx-block{padding:.4em 0}.cdx-block::-webkit-input-placeholder{line-height:normal!important}.cdx-input{border:1px solid rgba(201,201,204,.48);-webkit-box-shadow:inset 0 1px 2px 0 rgba(35,44,72,.06);box-shadow:inset 0 1px 2px #232c480f;border-radius:3px;padding:10px 12px;outline:none;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box}.cdx-input[data-placeholder]:before{position:static!important}.cdx-input[data-placeholder]:before{display:inline-block;width:0;white-space:nowrap;pointer-events:none}.cdx-settings-button{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;padding:6px 1px;border-radius:3px;cursor:pointer;border:0;outline:none;background-color:transparent;vertical-align:bottom;color:inherit;margin:0;min-width:26px;min-height:26px}.cdx-settings-button svg{width:20px;height:20px}@media (max-width: 650px){.cdx-settings-button svg{width:28px;height:28px}}@media (hover: hover){.cdx-settings-button:hover{background-color:#eff2f5}}.cdx-settings-button--focused{background:rgba(34,186,255,.08)!important}.cdx-settings-button--focused{-webkit-box-shadow:inset 0 0 0px 1px rgba(7,161,227,.08);box-shadow:inset 0 0 0 1px #07a1e314}.cdx-settings-button--focused-animated{-webkit-animation-name:buttonClicked;animation-name:buttonClicked;-webkit-animation-duration:.25s;animation-duration:.25s}.cdx-settings-button--active{color:#388ae5}.cdx-settings-button svg{width:auto;height:auto}@media (max-width: 650px){.cdx-settings-button{width:36px;height:36px;border-radius:8px}}.cdx-loader{position:relative;border:1px solid rgba(201,201,204,.48)}.cdx-loader:before{content:\"\";position:absolute;left:50%;top:50%;width:18px;height:18px;margin:-11px 0 0 -11px;border:2px solid rgba(201,201,204,.48);border-left-color:#388ae5;border-radius:50%;-webkit-animation:cdxRotation 1.2s infinite linear;animation:cdxRotation 1.2s infinite linear}@-webkit-keyframes cdxRotation{0%{-webkit-transform:rotate(0deg);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes cdxRotation{0%{-webkit-transform:rotate(0deg);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.cdx-button{padding:13px;border-radius:3px;border:1px solid rgba(201,201,204,.48);font-size:14.9px;background:#fff;-webkit-box-shadow:0 2px 2px 0 rgba(18,30,57,.04);box-shadow:0 2px 2px #121e390a;color:#707684;text-align:center;cursor:pointer}@media (hover: hover){.cdx-button:hover{background:#FBFCFE;-webkit-box-shadow:0 1px 3px 0 rgba(18,30,57,.08);box-shadow:0 1px 3px #121e3914}}.cdx-button svg{height:20px;margin-right:.2em;margin-top:-2px}.ce-stub{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:12px 18px;margin:10px 0;border-radius:10px;background:#eff2f5;border:1px solid #EFF0F1;color:#707684;font-size:14px}.ce-stub svg{width:20px;height:20px}.ce-stub__info{margin-left:14px}.ce-stub__title{font-weight:500;text-transform:capitalize}.codex-editor.codex-editor--rtl{direction:rtl}.codex-editor.codex-editor--rtl .cdx-list{padding-left:0;padding-right:40px}.codex-editor.codex-editor--rtl .ce-toolbar__plus{right:-26px;left:auto}.codex-editor.codex-editor--rtl .ce-toolbar__actions{right:auto;left:-26px}@media (max-width: 650px){.codex-editor.codex-editor--rtl .ce-toolbar__actions{margin-left:0;margin-right:auto;padding-right:0;padding-left:10px}}.codex-editor.codex-editor--rtl .ce-settings{left:5px;right:auto}.codex-editor.codex-editor--rtl .ce-settings:before{right:auto;left:25px}.codex-editor.codex-editor--rtl .ce-settings__button:not(:nth-child(3n+3)){margin-left:3px;margin-right:0}.codex-editor.codex-editor--rtl .ce-conversion-tool__icon{margin-right:0;margin-left:10px}.codex-editor.codex-editor--rtl .ce-inline-toolbar__dropdown{border-right:0px solid transparent;border-left:1px solid rgba(201,201,204,.48);margin:0 -6px 0 6px}.codex-editor.codex-editor--rtl .ce-inline-toolbar__dropdown .icon--toggler-down{margin-left:0;margin-right:4px}@media (min-width: 651px){.codex-editor--narrow.codex-editor--rtl .ce-toolbar__plus{left:0px;right:5px}}@media (min-width: 651px){.codex-editor--narrow.codex-editor--rtl .ce-toolbar__actions{left:-5px}}.cdx-search-field{--icon-margin-right: 10px;background:rgba(232,232,235,.49);border:1px solid rgba(226,226,229,.2);border-radius:6px;padding:2px;display:grid;grid-template-columns:auto auto 1fr;grid-template-rows:auto}.cdx-search-field__icon{width:26px;height:26px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;margin-right:var(--icon-margin-right)}.cdx-search-field__icon svg{width:20px;height:20px;color:#707684}.cdx-search-field__input{font-size:14px;outline:none;font-weight:500;font-family:inherit;border:0;background:transparent;margin:0;padding:0;line-height:22px;min-width:calc(100% - 26px - var(--icon-margin-right))}.cdx-search-field__input::-webkit-input-placeholder{color:#707684;font-weight:500}.cdx-search-field__input::-moz-placeholder{color:#707684;font-weight:500}.cdx-search-field__input:-ms-input-placeholder{color:#707684;font-weight:500}.cdx-search-field__input::-ms-input-placeholder{color:#707684;font-weight:500}.cdx-search-field__input::placeholder{color:#707684;font-weight:500}.ce-popover{--border-radius: 6px;--width: 200px;--max-height: 270px;--padding: 6px;--offset-from-target: 8px;--color-border: #e8e8eb;--color-shadow: rgba(13,20,33,.13);--color-background: white;--color-text-primary: black;--color-text-secondary: #707684;--color-border-icon: rgba(201, 201, 204, .48);--color-border-icon-disabled: #EFF0F1;--color-text-icon-active: #388AE5;--color-background-icon-active: rgba(56, 138, 229, .1);--color-background-item-focus: rgba(34, 186, 255, .08);--color-shadow-item-focus: rgba(7, 161, 227, .08);--color-background-item-hover: #eff2f5;--color-background-item-confirm: #E24A4A;--color-background-item-confirm-hover: #CE4343;min-width:var(--width);width:var(--width);max-height:var(--max-height);border-radius:var(--border-radius);overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-shadow:0 3px 15px -3px var(--color-shadow);box-shadow:0 3px 15px -3px var(--color-shadow);position:absolute;left:0;top:calc(100% + var(--offset-from-target));background:var(--color-background);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;z-index:4;opacity:0;max-height:0;pointer-events:none;padding:0;border:none}.ce-popover--opened{opacity:1;padding:var(--padding);max-height:var(--max-height);pointer-events:auto;-webkit-animation:panelShowing .1s ease;animation:panelShowing .1s ease;border:1px solid var(--color-border)}@media (max-width: 650px){.ce-popover--opened{-webkit-animation:panelShowingMobile .25s ease;animation:panelShowingMobile .25s ease}}.ce-popover__items{overflow-y:auto;-ms-scroll-chaining:none;overscroll-behavior:contain}@media (max-width: 650px){.ce-popover__overlay{position:fixed;top:0;bottom:0;left:0;right:0;background:#1D202B;z-index:3;opacity:.5;-webkit-transition:opacity .12s ease-in;transition:opacity .12s ease-in;will-change:opacity;visibility:visible}}.ce-popover__overlay--hidden{display:none}.ce-popover--open-top{top:calc(-1 * (var(--offset-from-target) + var(--popover-height)))}@media (max-width: 650px){.ce-popover{--offset: 5px;position:fixed;max-width:none;min-width:calc(100% - var(--offset) * 2);left:var(--offset);right:var(--offset);bottom:calc(var(--offset) + env(safe-area-inset-bottom));top:auto;border-radius:10px}.ce-popover .ce-popover__search{display:none}}.ce-popover__search,.ce-popover__custom-content:not(:empty){margin-bottom:5px}.ce-popover__nothing-found-message{color:#707684;display:none;cursor:default;padding:3px;font-size:14px;line-height:20px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ce-popover__nothing-found-message--displayed{display:block}.ce-popover__custom-content:not(:empty){padding:4px}@media (min-width: 651px){.ce-popover__custom-content:not(:empty){padding:0}}.ce-popover__custom-content--hidden{display:none}.ce-popover-item{--border-radius: 6px;--icon-size: 20px;--icon-size-mobile: 28px;border-radius:var(--border-radius);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:3px;color:var(--color-text-primary);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}@media (max-width: 650px){.ce-popover-item{padding:4px}}.ce-popover-item:not(:last-of-type){margin-bottom:1px}.ce-popover-item__icon{border-radius:5px;width:26px;height:26px;-webkit-box-shadow:0 0 0 1px var(--color-border-icon);box-shadow:0 0 0 1px var(--color-border-icon);background:#fff;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;margin-right:10px}.ce-popover-item__icon svg{width:20px;height:20px}@media (max-width: 650px){.ce-popover-item__icon{width:36px;height:36px;border-radius:8px}.ce-popover-item__icon svg{width:var(--icon-size-mobile);height:var(--icon-size-mobile)}}.ce-popover-item__title{font-size:14px;line-height:20px;font-weight:500;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}@media (max-width: 650px){.ce-popover-item__title{font-size:16px}}.ce-popover-item__secondary-title{color:var(--color-text-secondary);font-size:12px;margin-left:auto;white-space:nowrap;letter-spacing:-.1em;padding-right:5px;margin-bottom:-2px;opacity:.6}@media (max-width: 650px){.ce-popover-item__secondary-title{display:none}}.ce-popover-item--active{background:var(--color-background-icon-active);color:var(--color-text-icon-active)}.ce-popover-item--active .ce-popover-item__icon{-webkit-box-shadow:none;box-shadow:none}.ce-popover-item--disabled{color:var(--color-text-secondary);cursor:default;pointer-events:none}.ce-popover-item--disabled .ce-popover-item__icon{-webkit-box-shadow:0 0 0 1px var(--color-border-icon-disabled);box-shadow:0 0 0 1px var(--color-border-icon-disabled)}.ce-popover-item--focused:not(.ce-popover-item--no-focus){background:var(--color-background-item-focus)!important}.ce-popover-item--focused:not(.ce-popover-item--no-focus){-webkit-box-shadow:inset 0 0 0px 1px var(--color-shadow-item-focus);box-shadow:inset 0 0 0 1px var(--color-shadow-item-focus)}.ce-popover-item--hidden{display:none}@media (hover: hover){.ce-popover-item:hover{cursor:pointer}.ce-popover-item:hover:not(.ce-popover-item--no-hover){background-color:var(--color-background-item-hover)}.ce-popover-item:hover .ce-popover-item__icon{-webkit-box-shadow:none;box-shadow:none}}.ce-popover-item--confirmation{background:var(--color-background-item-confirm)}.ce-popover-item--confirmation .ce-popover-item__icon{color:var(--color-background-item-confirm)}.ce-popover-item--confirmation .ce-popover-item__title{color:#fff}@media (hover: hover){.ce-popover-item--confirmation:not(.ce-popover-item--no-hover):hover{background:var(--color-background-item-confirm-hover)}}.ce-popover-item--confirmation:not(.ce-popover-item--no-focus).ce-popover-item--focused{background:var(--color-background-item-confirm-hover)!important}.ce-popover-item--confirmation .ce-popover-item__icon,.ce-popover-item--active .ce-popover-item__icon,.ce-popover-item--focused .ce-popover-item__icon{-webkit-box-shadow:none;box-shadow:none}@-webkit-keyframes panelShowing{0%{opacity:0;-webkit-transform:translateY(-8px) scale(.9);transform:translateY(-8px) scale(.9)}70%{opacity:1;-webkit-transform:translateY(2px);transform:translateY(2px)}to{-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes panelShowing{0%{opacity:0;-webkit-transform:translateY(-8px) scale(.9);transform:translateY(-8px) scale(.9)}70%{opacity:1;-webkit-transform:translateY(2px);transform:translateY(2px)}to{-webkit-transform:translateY(0);transform:translateY(0)}}@-webkit-keyframes panelShowingMobile{0%{opacity:0;-webkit-transform:translateY(14px) scale(.98);transform:translateY(14px) scale(.98)}70%{opacity:1;-webkit-transform:translateY(-4px);transform:translateY(-4px)}to{-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes panelShowingMobile{0%{opacity:0;-webkit-transform:translateY(14px) scale(.98);transform:translateY(14px) scale(.98)}70%{opacity:1;-webkit-transform:translateY(-4px);transform:translateY(-4px)}to{-webkit-transform:translateY(0);transform:translateY(0)}}.wobble{-webkit-animation-name:wobble;animation-name:wobble;-webkit-animation-duration:.4s;animation-duration:.4s}@-webkit-keyframes wobble{0%{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}15%{-webkit-transform:translate3d(-9%,0,0);transform:translate3d(-9%,0,0)}30%{-webkit-transform:translate3d(9%,0,0);transform:translate3d(9%,0,0)}45%{-webkit-transform:translate3d(-4%,0,0);transform:translate3d(-4%,0,0)}60%{-webkit-transform:translate3d(4%,0,0);transform:translate3d(4%,0,0)}75%{-webkit-transform:translate3d(-1%,0,0);transform:translate3d(-1%,0,0)}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}@keyframes wobble{0%{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}15%{-webkit-transform:translate3d(-9%,0,0);transform:translate3d(-9%,0,0)}30%{-webkit-transform:translate3d(9%,0,0);transform:translate3d(9%,0,0)}45%{-webkit-transform:translate3d(-4%,0,0);transform:translate3d(-4%,0,0)}60%{-webkit-transform:translate3d(4%,0,0);transform:translate3d(4%,0,0)}75%{-webkit-transform:translate3d(-1%,0,0);transform:translate3d(-1%,0,0)}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}\n";
  var gi = /*#__PURE__*/function (_y34) {
    function gi() {
      var _this116;
      _classCallCheck(this, gi);
      _this116 = _callSuper(this, gi, arguments), _this116.isMobile = !1, _this116.contentRectCache = void 0, _this116.resizeDebouncer = it(function () {
        _this116.windowResize();
      }, 200);
      return _this116;
    }
    _inherits(gi, _y34);
    return _createClass(gi, [{
      key: "CSS",
      get: function get() {
        return {
          editorWrapper: "codex-editor",
          editorWrapperNarrow: "codex-editor--narrow",
          editorZone: "codex-editor__redactor",
          editorZoneHidden: "codex-editor__redactor--hidden",
          editorEmpty: "codex-editor--empty",
          editorRtlFix: "codex-editor--rtl"
        };
      }
    }, {
      key: "contentRect",
      get: function get() {
        if (this.contentRectCache) return this.contentRectCache;
        var e = this.nodes.wrapper.querySelector(".".concat(N.CSS.content));
        return e ? (this.contentRectCache = e.getBoundingClientRect(), this.contentRectCache) : {
          width: 650,
          left: 0,
          right: 0
        };
      }
    }, {
      key: "prepare",
      value: function () {
        var _prepare5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee44() {
          return _regeneratorRuntime().wrap(function _callee44$(_context44) {
            while (1) switch (_context44.prev = _context44.next) {
              case 0:
                this.checkIsMobile(), this.make(), this.loadStyles();
              case 1:
              case "end":
                return _context44.stop();
            }
          }, _callee44, this);
        }));
        function prepare() {
          return _prepare5.apply(this, arguments);
        }
        return prepare;
      }()
    }, {
      key: "toggleReadOnly",
      value: function toggleReadOnly(e) {
        var _this117 = this;
        e ? this.disableModuleBindings() : window.requestIdleCallback(function () {
          _this117.enableModuleBindings();
        }, {
          timeout: 2e3
        });
      }
    }, {
      key: "checkEmptiness",
      value: function checkEmptiness() {
        var e = this.Editor.BlockManager;
        this.nodes.wrapper.classList.toggle(this.CSS.editorEmpty, e.isEditorEmpty);
      }
    }, {
      key: "someToolbarOpened",
      get: function get() {
        var _this$Editor20 = this.Editor,
          e = _this$Editor20.Toolbar,
          t = _this$Editor20.BlockSettings,
          o = _this$Editor20.InlineToolbar,
          i = _this$Editor20.ConversionToolbar;
        return t.opened || o.opened || i.opened || e.toolbox.opened;
      }
    }, {
      key: "someFlipperButtonFocused",
      get: function get() {
        return this.Editor.Toolbar.toolbox.hasFocus() ? !0 : Object.entries(this.Editor).filter(function (_ref70) {
          var _ref71 = _slicedToArray(_ref70, 2),
            e = _ref71[0],
            t = _ref71[1];
          return t.flipper instanceof q;
        }).some(function (_ref72) {
          var _ref73 = _slicedToArray(_ref72, 2),
            e = _ref73[0],
            t = _ref73[1];
          return t.flipper.hasFocus();
        });
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.nodes.holder.innerHTML = "";
      }
    }, {
      key: "closeAllToolbars",
      value: function closeAllToolbars() {
        var _this$Editor21 = this.Editor,
          e = _this$Editor21.Toolbar,
          t = _this$Editor21.BlockSettings,
          o = _this$Editor21.InlineToolbar,
          i = _this$Editor21.ConversionToolbar;
        t.close(), o.close(), i.close(), e.toolbox.close();
      }
    }, {
      key: "checkIsMobile",
      value: function checkIsMobile() {
        this.isMobile = window.innerWidth < nt;
      }
    }, {
      key: "make",
      value: function make() {
        this.nodes.holder = c.getHolder(this.config.holder), this.nodes.wrapper = c.make("div", [this.CSS.editorWrapper].concat(_toConsumableArray(this.isRtl ? [this.CSS.editorRtlFix] : []))), this.nodes.redactor = c.make("div", this.CSS.editorZone), this.nodes.holder.offsetWidth < this.contentRect.width && this.nodes.wrapper.classList.add(this.CSS.editorWrapperNarrow), this.nodes.redactor.style.paddingBottom = this.config.minHeight + "px", this.nodes.wrapper.appendChild(this.nodes.redactor), this.nodes.holder.appendChild(this.nodes.wrapper);
      }
    }, {
      key: "loadStyles",
      value: function loadStyles() {
        var e = "editor-js-styles";
        if (c.get(e)) return;
        var t = c.make("style", null, {
          id: e,
          textContent: fi.toString()
        });
        this.config.style && !W(this.config.style) && this.config.style.nonce && t.setAttribute("nonce", this.config.style.nonce), c.prepend(document.head, t);
      }
    }, {
      key: "enableModuleBindings",
      value: function enableModuleBindings() {
        var _this118 = this;
        this.readOnlyMutableListeners.on(this.nodes.redactor, "click", function (o) {
          _this118.redactorClicked(o);
        }, !1), this.readOnlyMutableListeners.on(this.nodes.redactor, "mousedown", function (o) {
          _this118.documentTouched(o);
        }, {
          capture: !0,
          passive: !0
        }), this.readOnlyMutableListeners.on(this.nodes.redactor, "touchstart", function (o) {
          _this118.documentTouched(o);
        }, {
          capture: !0,
          passive: !0
        }), this.readOnlyMutableListeners.on(document, "keydown", function (o) {
          _this118.documentKeydown(o);
        }, !0), this.readOnlyMutableListeners.on(document, "mousedown", function (o) {
          _this118.documentClicked(o);
        }, !0);
        var t = it(function () {
          _this118.selectionChanged();
        }, 180);
        this.readOnlyMutableListeners.on(document, "selectionchange", t, !0), this.readOnlyMutableListeners.on(window, "resize", function () {
          _this118.resizeDebouncer();
        }, {
          passive: !0
        }), this.watchBlockHoveredEvents();
      }
    }, {
      key: "watchBlockHoveredEvents",
      value: function watchBlockHoveredEvents() {
        var _this119 = this;
        var e;
        this.readOnlyMutableListeners.on(this.nodes.redactor, "mousemove", Ie(function (t) {
          var o = t.target.closest(".ce-block");
          _this119.Editor.BlockSelection.anyBlockSelected || o && e !== o && (e = o, _this119.eventsDispatcher.emit(vt, {
            block: _this119.Editor.BlockManager.getBlockByChildNode(o)
          }));
        }, 20), {
          passive: !0
        });
      }
    }, {
      key: "disableModuleBindings",
      value: function disableModuleBindings() {
        this.readOnlyMutableListeners.clearAll();
      }
    }, {
      key: "windowResize",
      value: function windowResize() {
        this.contentRectCache = null, this.checkIsMobile();
      }
    }, {
      key: "documentKeydown",
      value: function documentKeydown(e) {
        switch (e.keyCode) {
          case k.ENTER:
            this.enterPressed(e);
            break;
          case k.BACKSPACE:
          case k.DELETE:
            this.backspacePressed(e);
            break;
          case k.ESC:
            this.escapePressed(e);
            break;
          default:
            this.defaultBehaviour(e);
            break;
        }
      }
    }, {
      key: "defaultBehaviour",
      value: function defaultBehaviour(e) {
        var t = this.Editor.BlockManager.currentBlock,
          o = e.target.closest(".".concat(this.CSS.editorWrapper)),
          i = e.altKey || e.ctrlKey || e.metaKey || e.shiftKey;
        if (t !== void 0 && o === null) {
          this.Editor.BlockEvents.keydown(e);
          return;
        }
        o || t && i || (this.Editor.BlockManager.dropPointer(), this.Editor.Toolbar.close());
      }
    }, {
      key: "backspacePressed",
      value: function backspacePressed(e) {
        var _this$Editor22 = this.Editor,
          t = _this$Editor22.BlockManager,
          o = _this$Editor22.BlockSelection,
          i = _this$Editor22.Caret;
        if (o.anyBlockSelected && !g.isSelectionExists) {
          var n = t.removeSelectedBlocks(),
            r = t.insertDefaultBlockAtIndex(n, !0);
          i.setToBlock(r, i.positions.START), o.clearSelection(e), e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation();
        }
      }
    }, {
      key: "escapePressed",
      value: function escapePressed(e) {
        this.Editor.BlockSelection.clearSelection(e), this.Editor.Toolbar.toolbox.opened ? (this.Editor.Toolbar.toolbox.close(), this.Editor.Caret.setToBlock(this.Editor.BlockManager.currentBlock, this.Editor.Caret.positions.END)) : this.Editor.BlockSettings.opened ? this.Editor.BlockSettings.close() : this.Editor.ConversionToolbar.opened ? this.Editor.ConversionToolbar.close() : this.Editor.InlineToolbar.opened ? this.Editor.InlineToolbar.close() : this.Editor.Toolbar.close();
      }
    }, {
      key: "enterPressed",
      value: function enterPressed(e) {
        var _this$Editor23 = this.Editor,
          t = _this$Editor23.BlockManager,
          o = _this$Editor23.BlockSelection,
          i = t.currentBlockIndex >= 0;
        if (o.anyBlockSelected && !g.isSelectionExists) {
          o.clearSelection(e), e.preventDefault(), e.stopImmediatePropagation(), e.stopPropagation();
          return;
        }
        if (!this.someToolbarOpened && i && e.target.tagName === "BODY") {
          var n = this.Editor.BlockManager.insert();
          this.Editor.Caret.setToBlock(n), this.Editor.Toolbar.moveAndOpen(n);
        }
        this.Editor.BlockSelection.clearSelection(e);
      }
    }, {
      key: "documentClicked",
      value: function documentClicked(e) {
        var a, l;
        if (!e.isTrusted) return;
        var t = e.target;
        this.nodes.holder.contains(t) || g.isAtEditor || (this.Editor.BlockManager.dropPointer(), this.Editor.Toolbar.close());
        var i = (a = this.Editor.BlockSettings.nodes.wrapper) == null ? void 0 : a.contains(t),
          n = (l = this.Editor.Toolbar.nodes.settingsToggler) == null ? void 0 : l.contains(t),
          r = i || n;
        if (this.Editor.BlockSettings.opened && !r) {
          this.Editor.BlockSettings.close();
          var d = this.Editor.BlockManager.getBlockByChildNode(t);
          this.Editor.Toolbar.moveAndOpen(d);
        }
        this.Editor.BlockSelection.clearSelection(e);
      }
    }, {
      key: "documentTouched",
      value: function documentTouched(e) {
        var t = e.target;
        if (t === this.nodes.redactor) {
          var o = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX,
            i = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;
          t = document.elementFromPoint(o, i);
        }
        try {
          this.Editor.BlockManager.setCurrentBlockByChildNode(t);
        } catch (_unused9) {
          this.Editor.RectangleSelection.isRectActivated() || this.Editor.Caret.setToTheLastBlock();
        }
        this.Editor.Toolbar.moveAndOpen();
      }
    }, {
      key: "redactorClicked",
      value: function redactorClicked(e) {
        if (!g.isCollapsed) return;
        var t = e.target,
          o = e.metaKey || e.ctrlKey;
        if (c.isAnchor(t) && o) {
          e.stopImmediatePropagation(), e.stopPropagation();
          var i = t.getAttribute("href"),
            n = jt(i);
          Wt(n);
          return;
        }
        this.processBottomZoneClick(e);
      }
    }, {
      key: "processBottomZoneClick",
      value: function processBottomZoneClick(e) {
        var t = this.Editor.BlockManager.getBlockByIndex(-1),
          o = c.offset(t.holder).bottom,
          i = e.pageY,
          n = this.Editor.BlockSelection;
        if (e.target instanceof Element && e.target.isEqualNode(this.nodes.redactor) && !n.anyBlockSelected && o < i) {
          e.stopImmediatePropagation(), e.stopPropagation();
          var _this$Editor24 = this.Editor,
            a = _this$Editor24.BlockManager,
            l = _this$Editor24.Caret,
            d = _this$Editor24.Toolbar;
          (!a.lastBlock.tool.isDefault || !a.lastBlock.isEmpty) && a.insertAtEnd(), l.setToTheLastBlock(), d.moveAndOpen(a.lastBlock);
        }
      }
    }, {
      key: "selectionChanged",
      value: function selectionChanged() {
        var _this$Editor25 = this.Editor,
          e = _this$Editor25.CrossBlockSelection,
          t = _this$Editor25.BlockSelection,
          o = g.anchorElement;
        if (e.isCrossBlockSelectionStarted && t.anyBlockSelected && g.get().removeAllRanges(), !o) {
          g.range || this.Editor.InlineToolbar.close();
          return;
        }
        var i = o.closest(".".concat(N.CSS.content)) === null;
        if (i && (this.Editor.InlineToolbar.containsNode(o) || this.Editor.InlineToolbar.close(), !(o.dataset.inlineToolbar === "true"))) return;
        this.Editor.BlockManager.currentBlock || this.Editor.BlockManager.setCurrentBlockByChildNode(o);
        var n = i !== !0;
        this.Editor.InlineToolbar.tryToShow(!0, n);
      }
    }]);
  }(y);
  var bi = {
    BlocksAPI: Zt,
    CaretAPI: Gt,
    EventsAPI: Jt,
    I18nAPI: Oe,
    API: Qt,
    InlineToolbarAPI: eo,
    ListenersAPI: to,
    NotifierAPI: so,
    ReadOnlyAPI: ro,
    SanitizerAPI: fo,
    SaverAPI: go,
    SelectionAPI: bo,
    StylesAPI: mo,
    ToolbarAPI: ko,
    TooltipAPI: Eo,
    UiAPI: Bo,
    BlockSettings: Ho,
    ConversionToolbar: U,
    Toolbar: Ko,
    InlineToolbar: Xo,
    BlockEvents: Vo,
    BlockManager: Go,
    BlockSelection: Jo,
    Caret: Ce,
    CrossBlockSelection: Qo,
    DragNDrop: ei,
    ModificationsObserver: ti,
    Paste: Ct,
    ReadOnly: oi,
    RectangleSelection: me,
    Renderer: ii,
    Saver: ni,
    Tools: _t,
    UI: gi
  };
  var mi = /*#__PURE__*/function () {
    function mi(e) {
      var _this120 = this;
      _classCallCheck(this, mi);
      this.moduleInstances = {}, this.eventsDispatcher = new ye();
      var t, o;
      this.isReady = new Promise(function (i, n) {
        t = i, o = n;
      }), Promise.resolve().then(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee45() {
        var _this120$moduleInstan, i, n, r, a;
        return _regeneratorRuntime().wrap(function _callee45$(_context45) {
          while (1) switch (_context45.prev = _context45.next) {
            case 0:
              _this120.configuration = e;
              _this120.validate();
              _this120.init();
              _context45.next = 5;
              return _this120.start();
            case 5:
              _context45.next = 7;
              return _this120.render();
            case 7:
              _this120$moduleInstan = _this120.moduleInstances, i = _this120$moduleInstan.BlockManager, n = _this120$moduleInstan.Caret, r = _this120$moduleInstan.UI, a = _this120$moduleInstan.ModificationsObserver;
              r.checkEmptiness(), a.enable(), _this120.configuration.autofocus && n.setToBlock(i.blocks[0], n.positions.START), t();
            case 9:
            case "end":
              return _context45.stop();
          }
        }, _callee45);
      }))).catch(function (i) {
        T("Editor.js is not ready because of ".concat(i), "error"), o(i);
      });
    }
    return _createClass(mi, [{
      key: "configuration",
      get: function get() {
        return this.config;
      },
      set: function set(e) {
        var o, i;
        O(e) ? this.config = _objectSpread({}, e) : this.config = {
          holder: e
        }, Le(!!this.config.holderId, "config.holderId", "config.holder"), this.config.holderId && !this.config.holder && (this.config.holder = this.config.holderId, this.config.holderId = null), this.config.holder == null && (this.config.holder = "editorjs"), this.config.logLevel || (this.config.logLevel = Je.VERBOSE), Dt(this.config.logLevel), Le(!!this.config.initialBlock, "config.initialBlock", "config.defaultBlock"), this.config.defaultBlock = this.config.defaultBlock || this.config.initialBlock || "paragraph", this.config.minHeight = this.config.minHeight !== void 0 ? this.config.minHeight : 300;
        var t = {
          type: this.config.defaultBlock,
          data: {}
        };
        this.config.placeholder = this.config.placeholder || !1, this.config.sanitizer = this.config.sanitizer || {
          p: !0,
          b: !0,
          a: !0
        }, this.config.hideToolbar = this.config.hideToolbar ? this.config.hideToolbar : !1, this.config.tools = this.config.tools || {}, this.config.i18n = this.config.i18n || {}, this.config.data = this.config.data || {
          blocks: []
        }, this.config.onReady = this.config.onReady || function () {}, this.config.onChange = this.config.onChange || function () {}, this.config.inlineToolbar = this.config.inlineToolbar !== void 0 ? this.config.inlineToolbar : !0, (W(this.config.data) || !this.config.data.blocks || this.config.data.blocks.length === 0) && (this.config.data = {
          blocks: [t]
        }), this.config.readOnly = this.config.readOnly || !1, (o = this.config.i18n) != null && o.messages && H.setDictionary(this.config.i18n.messages), this.config.i18n.direction = ((i = this.config.i18n) == null ? void 0 : i.direction) || "ltr";
      }
    }, {
      key: "validate",
      value: function validate() {
        var _this$config = this.config,
          e = _this$config.holderId,
          t = _this$config.holder;
        if (e && t) throw Error("«holderId» and «holder» param can't assign at the same time.");
        if (Z(t) && !c.get(t)) throw Error("element with ID \xAB".concat(t, "\xBB is missing. Pass correct holder's ID."));
        if (t && O(t) && !c.isElement(t)) throw Error("«holder» value must be an Element node");
      }
    }, {
      key: "init",
      value: function init() {
        this.constructModules(), this.configureModules();
      }
    }, {
      key: "start",
      value: function () {
        var _start = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee47() {
          var _this121 = this;
          return _regeneratorRuntime().wrap(function _callee47$(_context47) {
            while (1) switch (_context47.prev = _context47.next) {
              case 0:
                _context47.next = 2;
                return ["Tools", "UI", "BlockManager", "Paste", "BlockSelection", "RectangleSelection", "CrossBlockSelection", "ReadOnly"].reduce(function (t, o) {
                  return t.then(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee46() {
                    return _regeneratorRuntime().wrap(function _callee46$(_context46) {
                      while (1) switch (_context46.prev = _context46.next) {
                        case 0:
                          _context46.prev = 0;
                          _context46.next = 3;
                          return _this121.moduleInstances[o].prepare();
                        case 3:
                          _context46.next = 10;
                          break;
                        case 5:
                          _context46.prev = 5;
                          _context46.t0 = _context46["catch"](0);
                          if (!(_context46.t0 instanceof at)) {
                            _context46.next = 9;
                            break;
                          }
                          throw new Error(_context46.t0.message);
                        case 9:
                          T("Module ".concat(o, " was skipped because of %o"), "warn", _context46.t0);
                        case 10:
                        case "end":
                          return _context46.stop();
                      }
                    }, _callee46, null, [[0, 5]]);
                  })));
                }, Promise.resolve());
              case 2:
              case "end":
                return _context47.stop();
            }
          }, _callee47);
        }));
        function start() {
          return _start.apply(this, arguments);
        }
        return start;
      }()
    }, {
      key: "render",
      value: function render() {
        return this.moduleInstances.Renderer.render(this.config.data.blocks);
      }
    }, {
      key: "constructModules",
      value: function constructModules() {
        var _this122 = this;
        Object.entries(bi).forEach(function (_ref76) {
          var _ref77 = _slicedToArray(_ref76, 2),
            e = _ref77[0],
            t = _ref77[1];
          try {
            _this122.moduleInstances[e] = new t({
              config: _this122.configuration,
              eventsDispatcher: _this122.eventsDispatcher
            });
          } catch (o) {
            T("[constructModules]", "Module ".concat(e, " skipped because"), "error", o);
          }
        });
      }
    }, {
      key: "configureModules",
      value: function configureModules() {
        for (var e in this.moduleInstances) Object.prototype.hasOwnProperty.call(this.moduleInstances, e) && (this.moduleInstances[e].state = this.getModulesDiff(e));
      }
    }, {
      key: "getModulesDiff",
      value: function getModulesDiff(e) {
        var t = {};
        for (var o in this.moduleInstances) o !== e && (t[o] = this.moduleInstances[o]);
        return t;
      }
    }]);
  }();
  /**
  * Editor.js
  *
  * @license Apache-2.0
  * @see Editor.js <https://editorjs.io>
  * @author CodeX Team <https://codex.so>
  */
  var ki = /*#__PURE__*/function () {
    function ki(e) {
      var _this123 = this;
      _classCallCheck(this, ki);
      var t = function t() {};
      O(e) && M(e.onReady) && (t = e.onReady);
      var o = new mi(e);
      this.isReady = o.isReady.then(function () {
        _this123.exportAPI(o), t();
      });
    }
    return _createClass(ki, [{
      key: "exportAPI",
      value: function exportAPI(e) {
        var _this124 = this;
        var t = ["configuration"],
          o = function o() {
            Object.values(e.moduleInstances).forEach(function (n) {
              M(n.destroy) && n.destroy(), n.listeners.removeAll();
            }), yo(), e = null;
            for (var n in _this124) Object.prototype.hasOwnProperty.call(_this124, n) && delete _this124[n];
            Object.setPrototypeOf(_this124, null);
          };
        t.forEach(function (n) {
          _this124[n] = e[n];
        }), this.destroy = o, Object.setPrototypeOf(this, e.moduleInstances.API.methods), delete this.exportAPI, Object.entries({
          blocks: {
            clear: "clear",
            render: "render"
          },
          caret: {
            focus: "focus"
          },
          events: {
            on: "on",
            off: "off",
            emit: "emit"
          },
          saver: {
            save: "save"
          }
        }).forEach(function (_ref78) {
          var _ref79 = _slicedToArray(_ref78, 2),
            n = _ref79[0],
            r = _ref79[1];
          Object.entries(r).forEach(function (_ref80) {
            var _ref81 = _slicedToArray(_ref80, 2),
              a = _ref81[0],
              l = _ref81[1];
            _this124[l] = e.moduleInstances.API.methods[n][a];
          });
        });
      }
    }], [{
      key: "version",
      get: function get() {
        return "2.29.1";
      }
    }]);
  }();
  return ki;
});
"use strict";

function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/**
 * Skipped minification because the original files appears to be already minified.
 * Original file: /npm/@editorjs/marker@1.4.0/dist/marker.umd.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
(function () {
  "use strict";

  try {
    if ((typeof document === "undefined" ? "undefined" : _typeof(document)) < "u") {
      var e = document.createElement("style");
      e.appendChild(document.createTextNode(".cdx-marker{background:rgba(245,235,111,.29);padding:3px 0}")), document.head.appendChild(e);
    }
  } catch (d) {
    console.error("vite-plugin-css-injected-by-js", d);
  }
})();
(function (i, s) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) == "object" && (typeof module === "undefined" ? "undefined" : _typeof(module)) < "u" ? module.exports = s() : typeof define == "function" && define.amd ? define(s) : (i = (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) < "u" ? globalThis : i || self, i.Marker = s());
})(void 0, function () {
  "use strict";

  var i = "",
    s = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-width="2" d="M11.3536 9.31802L12.7678 7.90381C13.5488 7.12276 14.8151 7.12276 15.5962 7.90381C16.3772 8.68486 16.3772 9.95119 15.5962 10.7322L14.182 12.1464M11.3536 9.31802L7.96729 12.7043C7.40889 13.2627 7.02827 13.9739 6.8734 14.7482L6.69798 15.6253C6.55804 16.325 7.17496 16.942 7.87468 16.802L8.75176 16.6266C9.52612 16.4717 10.2373 16.0911 10.7957 15.5327L14.182 12.1464M11.3536 9.31802L14.182 12.1464"/><line x1="15" x2="19" y1="17" y2="17" stroke="currentColor" stroke-linecap="round" stroke-width="2"/></svg>';
  var n = /*#__PURE__*/function () {
    function n(_ref) {
      var t = _ref.api;
      _classCallCheck(this, n);
      this.api = t, this.button = null, this.tag = "MARK", this.iconClasses = {
        base: this.api.styles.inlineToolButton,
        active: this.api.styles.inlineToolButtonActive
      };
    }
    return _createClass(n, [{
      key: "render",
      value: function render() {
        return this.button = document.createElement("button"), this.button.type = "button", this.button.classList.add(this.iconClasses.base), this.button.innerHTML = this.toolboxIcon, this.button;
      }
    }, {
      key: "surround",
      value: function surround(t) {
        if (!t) return;
        var e = this.api.selection.findParentTag(this.tag, n.CSS);
        e ? this.unwrap(e) : this.wrap(t);
      }
    }, {
      key: "wrap",
      value: function wrap(t) {
        var e = document.createElement(this.tag);
        e.classList.add(n.CSS), e.appendChild(t.extractContents()), t.insertNode(e), this.api.selection.expandToTag(e);
      }
    }, {
      key: "unwrap",
      value: function unwrap(t) {
        this.api.selection.expandToTag(t);
        var e = window.getSelection(),
          o = e.getRangeAt(0),
          a = o.extractContents();
        t.parentNode.removeChild(t), o.insertNode(a), e.removeAllRanges(), e.addRange(o);
      }
    }, {
      key: "checkState",
      value: function checkState() {
        var t = this.api.selection.findParentTag(this.tag, n.CSS);
        this.button.classList.toggle(this.iconClasses.active, !!t);
      }
    }, {
      key: "toolboxIcon",
      get: function get() {
        return s;
      }
    }], [{
      key: "CSS",
      get: function get() {
        return "cdx-marker";
      }
    }, {
      key: "isInline",
      get: function get() {
        return !0;
      }
    }, {
      key: "sanitize",
      get: function get() {
        return {
          mark: {
            class: n.CSS
          }
        };
      }
    }]);
  }();
  return n;
});
"use strict";

function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/**
 * Skipped minification because the original files appears to be already minified.
 * Original file: /npm/@editorjs/simple-image@1.6.0/dist/simple-image.umd.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
(function () {
  "use strict";

  try {
    if ((typeof document === "undefined" ? "undefined" : _typeof(document)) < "u") {
      var e = document.createElement("style");
      e.appendChild(document.createTextNode(".cdx-simple-image .cdx-loader{min-height:200px}.cdx-simple-image .cdx-input{margin-top:10px}.cdx-simple-image img{max-width:100%;vertical-align:bottom}.cdx-simple-image__caption[contentEditable=true][data-placeholder]:empty:before{position:absolute;content:attr(data-placeholder);color:#707684;font-weight:400;opacity:0}.cdx-simple-image__caption[contentEditable=true][data-placeholder]:empty:before{opacity:1}.cdx-simple-image__caption[contentEditable=true][data-placeholder]:empty:focus:before{opacity:0}.cdx-simple-image__picture--with-background{background:#eff2f5;padding:10px}.cdx-simple-image__picture--with-background img{display:block;max-width:60%;margin:0 auto}.cdx-simple-image__picture--with-border{border:1px solid #e8e8eb;padding:1px}.cdx-simple-image__picture--stretched img{max-width:none;width:100%}")), document.head.appendChild(e);
    }
  } catch (t) {
    console.error("vite-plugin-css-injected-by-js", t);
  }
})();
(function (s, n) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) == "object" && (typeof module === "undefined" ? "undefined" : _typeof(module)) < "u" ? module.exports = n() : typeof define == "function" && define.amd ? define(n) : (s = (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) < "u" ? globalThis : s || self, s.SimpleImage = n());
})(void 0, function () {
  "use strict";

  var s = "",
    n = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19V19C9.13623 19 8.20435 19 7.46927 18.6955C6.48915 18.2895 5.71046 17.5108 5.30448 16.5307C5 15.7956 5 14.8638 5 13V12C5 9.19108 5 7.78661 5.67412 6.77772C5.96596 6.34096 6.34096 5.96596 6.77772 5.67412C7.78661 5 9.19108 5 12 5H13.5C14.8956 5 15.5933 5 16.1611 5.17224C17.4395 5.56004 18.44 6.56046 18.8278 7.83886C19 8.40666 19 9.10444 19 10.5V10.5"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16 13V16M16 19V16M19 16H16M16 16H13"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6.5 17.5L17.5 6.5"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.9919 10.5H19.0015"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.9919 19H11.0015"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13L13 5"/></svg>',
    a = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.9919 9.5H19.0015"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.5 5H14.5096"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M14.625 5H15C17.2091 5 19 6.79086 19 9V9.375"/><path stroke="currentColor" stroke-width="2" d="M9.375 5L9 5C6.79086 5 5 6.79086 5 9V9.375"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.3725 5H9.38207"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 9.5H5.00957"/><path stroke="currentColor" stroke-width="2" d="M9.375 19H9C6.79086 19 5 17.2091 5 15V14.625"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.3725 19H9.38207"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 14.55H5.00957"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16 13V16M16 19V16M19 16H16M16 16H13"/></svg>',
    d = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9L20 12L17 15"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 12H20"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 9L4 12L7 15"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12H10"/></svg>';
  var l = /*#__PURE__*/function () {
    function l(_ref) {
      var e = _ref.data,
        t = _ref.config,
        r = _ref.api,
        i = _ref.readOnly;
      _classCallCheck(this, l);
      this.api = r, this.readOnly = i, this.blockIndex = this.api.blocks.getCurrentBlockIndex() + 1, this.CSS = {
        baseClass: this.api.styles.block,
        loading: this.api.styles.loader,
        input: this.api.styles.input,
        wrapper: "cdx-simple-image",
        imageHolder: "cdx-simple-image__picture",
        caption: "cdx-simple-image__caption"
      }, this.nodes = {
        wrapper: null,
        imageHolder: null,
        image: null,
        caption: null
      }, this.data = {
        url: e.url || "",
        caption: e.caption || "",
        withBorder: e.withBorder !== void 0 ? e.withBorder : !1,
        withBackground: e.withBackground !== void 0 ? e.withBackground : !1,
        stretched: e.stretched !== void 0 ? e.stretched : !1
      }, this.tunes = [{
        name: "withBorder",
        label: "Add Border",
        icon: a
      }, {
        name: "stretched",
        label: "Stretch Image",
        icon: d
      }, {
        name: "withBackground",
        label: "Add Background",
        icon: n
      }];
    }
    return _createClass(l, [{
      key: "render",
      value: function render() {
        var _this = this;
        var e = this._make("div", [this.CSS.baseClass, this.CSS.wrapper]),
          t = this._make("div", this.CSS.loading),
          r = this._make("div", this.CSS.imageHolder),
          i = this._make("img"),
          o = this._make("div", [this.CSS.input, this.CSS.caption], {
            contentEditable: !this.readOnly,
            innerHTML: this.data.caption || ""
          });
        return o.dataset.placeholder = "Enter a caption", e.appendChild(t), this.data.url && (i.src = this.data.url), i.onload = function () {
          e.classList.remove(_this.CSS.loading), r.appendChild(i), e.appendChild(r), e.appendChild(o), t.remove(), _this._acceptTuneView();
        }, i.onerror = function (h) {
          console.log("Failed to load an image", h);
        }, this.nodes.imageHolder = r, this.nodes.wrapper = e, this.nodes.image = i, this.nodes.caption = o, e;
      }
    }, {
      key: "save",
      value: function save(e) {
        var t = e.querySelector("img"),
          r = e.querySelector("." + this.CSS.input);
        return t ? Object.assign(this.data, {
          url: t.src,
          caption: r.innerHTML
        }) : this.data;
      }
    }, {
      key: "onDropHandler",
      value: function onDropHandler(e) {
        var t = new FileReader();
        return t.readAsDataURL(e), new Promise(function (r) {
          t.onload = function (i) {
            r({
              url: i.target.result,
              caption: e.name
            });
          };
        });
      }
    }, {
      key: "onPaste",
      value: function onPaste(e) {
        var _this2 = this;
        switch (e.type) {
          case "tag":
            {
              var t = e.detail.data;
              this.data = {
                url: t.src
              };
              break;
            }
          case "pattern":
            {
              var _t = e.detail.data;
              this.data = {
                url: _t
              };
              break;
            }
          case "file":
            {
              var _t2 = e.detail.file;
              this.onDropHandler(_t2).then(function (r) {
                _this2.data = r;
              });
              break;
            }
        }
      }
    }, {
      key: "data",
      get: function get() {
        return this._data;
      },
      set: function set(e) {
        this._data = Object.assign({}, this.data, e), this.nodes.image && (this.nodes.image.src = this.data.url), this.nodes.caption && (this.nodes.caption.innerHTML = this.data.caption);
      }
    }, {
      key: "renderSettings",
      value: function renderSettings() {
        var _this3 = this;
        return this.tunes.map(function (e) {
          return _objectSpread(_objectSpread({}, e), {}, {
            label: _this3.api.i18n.t(e.label),
            toggle: !0,
            onActivate: function onActivate() {
              return _this3._toggleTune(e.name);
            },
            isActive: !!_this3.data[e.name]
          });
        });
      }
    }, {
      key: "_make",
      value: function _make(e) {
        var _i$classList;
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var i = document.createElement(e);
        Array.isArray(t) ? (_i$classList = i.classList).add.apply(_i$classList, _toConsumableArray(t)) : t && i.classList.add(t);
        for (var o in r) i[o] = r[o];
        return i;
      }
    }, {
      key: "_toggleTune",
      value: function _toggleTune(e) {
        this.data[e] = !this.data[e], this._acceptTuneView();
      }
    }, {
      key: "_acceptTuneView",
      value: function _acceptTuneView() {
        var _this4 = this;
        this.tunes.forEach(function (e) {
          _this4.nodes.imageHolder.classList.toggle(_this4.CSS.imageHolder + "--" + e.name.replace(/([A-Z])/g, function (t) {
            return "-".concat(t[0].toLowerCase());
          }), !!_this4.data[e.name]), e.name === "stretched" && _this4.api.blocks.stretchBlock(_this4.blockIndex, !!_this4.data.stretched);
        });
      }
    }], [{
      key: "sanitize",
      get: function get() {
        return {
          url: {},
          withBorder: {},
          withBackground: {},
          stretched: {},
          caption: {
            br: !0
          }
        };
      }
    }, {
      key: "isReadOnlySupported",
      get: function get() {
        return !0;
      }
    }, {
      key: "pasteConfig",
      get: function get() {
        return {
          patterns: {
            image: /https?:\/\/\S+\.(gif|jpe?g|tiff|png|webp)$/i
          },
          tags: [{
            img: {
              src: !0
            }
          }],
          files: {
            mimeTypes: ["image/*"]
          }
        };
      }
    }]);
  }();
  return l;
});