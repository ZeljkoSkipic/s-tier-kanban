"use strict";

var cardView = function cardView(e) {
  // Open Modal

  if (e.target.closest(".kanban-card") && !e.target.closest('.dynamic-select') && !e.target.closest(".card-priority") && !e.target.closest(".card-status") && !e.target.closest(".delete-card-btn") && !e.target.closest(".card-title") && !e.target.closest("a")) {
    var cardID = e.target.closest(".kanban-card").dataset.cardId;
    var commentsSaveButton = document.querySelector(".kanban-comment-save");
    var descriptionSaveButton = document.querySelector(".kanban-description-save");
    var commentForm = document.querySelector(".kanban-card-view");
    var cardTitle = e.target.closest(".kanban-card").querySelector(".card-title").innerHTML;
    var cardViewTitle = document.querySelector(".kanban-card-view").querySelector('.card-title');
    commentsSaveButton.dataset.cardId = cardID;
    descriptionSaveButton.dataset.cardId = cardID;
    cardViewTitle.innerHTML = cardTitle;
    cardViewTitle.dataset.cardId = cardID;
    commentForm.classList.remove("hide");
    commentForm.classList.add("show");
    document.querySelector("body").style.overflow = "hidden";
    var modalOpened = new CustomEvent("cardViewOpened", {
      detail: {
        cardID: cardID
      }
    });
    document.dispatchEvent(modalOpened);
  }

  // Close modal

  if (e.target.matches(".kanban-card-view-close") || e.target.matches(".kanban-card-view")) {
    var _commentForm = document.querySelector(".kanban-card-view");
    var commnetsWrapper = document.querySelector(".kanban-comments");
    _commentForm.classList.remove("show");
    _commentForm.classList.add("hide");
    document.querySelector("body").style.overflow = "visible";
    var error = document.querySelector(".comment-error");
    if (error) {
      error.remove();
    }
    commnetsWrapper.innerHTML = "";
    var modalClosed = new CustomEvent("cardViewClosed");
    document.dispatchEvent(modalClosed);
  }
};
document.addEventListener("click", cardView);
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// Comment Editor

var commentEditors = [];
var editor = new EditorJS({
  holder: "kanban-comment-editor-js",
  minHeight: 100,
  placeholder: "Post a comment...",
  tools: {
    Marker: {
      class: Marker,
      inlineToolbar: true,
      shortcut: "CMD+SHIFT+M"
    },
    image: {
      class: SimpleImage,
      inlineToolbar: true,
      config: {
        placeholder: "Paste image URL"
      }
    },
    code: {
      class: CodeTool,
      shortcut: "CMD+SHIFT+C"
    }
  },
  data: {}
});
var createEditorsPromise = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return Promise.all(Array.from(document.querySelectorAll(".kanban-comment-text")).map(/*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(field) {
              var textFieldID, data, commentsEditor;
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    textFieldID = field.id;
                    data = field.dataset.content; // Clear existing editors
                    if (commentEditors.length) {
                      commentEditors.forEach(function (editor) {
                        editor.destroy();
                      });
                      commentEditors = [];
                    }
                    if (!textFieldID) {
                      _context.next = 8;
                      break;
                    }
                    commentsEditor = new EditorJS({
                      holder: textFieldID,
                      readOnly: true,
                      minHeight: 0,
                      defaultBlock: "defaultBlock",
                      tools: {
                        Marker: {
                          class: Marker,
                          inlineToolbar: true,
                          shortcut: "CMD+SHIFT+M"
                        },
                        image: {
                          class: SimpleImage,
                          inlineToolbar: ["link"]
                        },
                        code: {
                          class: CodeTool,
                          shortcut: "CMD+SHIFT+C"
                        },
                        defaultBlock: DefaultBlock
                      },
                      data: JSON.parse(data)
                    });
                    _context.next = 7;
                    return commentsEditor.isReady;
                  case 7:
                    commentEditors.push(commentsEditor);
                  case 8:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            return function (_x) {
              return _ref2.apply(this, arguments);
            };
          }()));
        case 2:
          return _context2.abrupt("return", commentEditors);
        case 3:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function createEditorsPromise() {
    return _ref.apply(this, arguments);
  };
}();

// Find editor instance

var findEditor = function findEditor(editors, holder) {
  if (editors.length) {
    return editors.filter(function (editor) {
      if (editor !== undefined) {
        if (editor.configuration !== undefined) {
          return editor.configuration.holder === holder;
        }
      }
    });
  }
};
var comments = function comments(e) {
  e.preventDefault();
  var cardId = e.target.dataset.cardId;
  var data = new FormData();
  editor.save().then(/*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(savedData) {
      var request, response, userID, cardCommentUsers, usersWrapper;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            if (!(savedData.blocks.length === 0)) {
              _context3.next = 2;
              break;
            }
            return _context3.abrupt("return");
          case 2:
            data.append("action", "stk_card_comments");
            data.append("cardId", cardId);
            data.append("security", myAjax.security);
            data.append("comment", JSON.stringify(savedData, null, 4));
            _context3.next = 8;
            return fetch(myAjax.ajaxurl, {
              method: "POST",
              body: data
            });
          case 8:
            request = _context3.sent;
            _context3.next = 11;
            return request.json();
          case 11:
            response = _context3.sent;
            if (response && response.success === true) {
              getComments(cardId);
              editor.clear();
              Swal.fire({
                title: "Comment Added!",
                text: "You have successfully added new comment.",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
              });

              // Add user to comment list if does not exist
              userID = response.data.user_id;
              cardCommentUsers = document.querySelector("[data-card-id=\"".concat(cardId, "\"]")).querySelectorAll("[data-user=\"".concat(userID, "\"]"));
              usersWrapper = document.querySelector("[data-card-id=\"".concat(cardId, "\"]")).querySelector(".card-members");
              if (!cardCommentUsers.length) {
                usersWrapper.insertAdjacentHTML("beforeend", "<div data-user=\"".concat(userID, "\" class=\"user-avatar\">\n              ").concat(response.data.user_avatar, "\n          </div>"));
              }
            }
          case 13:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return function (_x2) {
      return _ref3.apply(this, arguments);
    };
  }());
};
var getComments = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(cardID) {
    var data, commnetsWrapper, loader, request, response, commentsTextField, editors, _editMode, discardMode, commentEdited, noComments, _noComments;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          data = new FormData();
          data.append("action", "stk_get_comments");
          data.append("cardId", cardID);
          data.append("security", myAjax.security);

          // Add loader
          commnetsWrapper = document.querySelector(".kanban-comments");
          loader = document.createElement("div");
          loader.classList.add("loader");
          commnetsWrapper.append(loader);
          _context5.next = 10;
          return fetch(myAjax.ajaxurl, {
            method: "POST",
            body: data
          });
        case 10:
          request = _context5.sent;
          _context5.next = 13;
          return request.json();
        case 13:
          response = _context5.sent;
          commnetsWrapper.innerHTML = "";
          if (!(response && response.success === true)) {
            _context5.next = 36;
            break;
          }
          if (!response.data.comments) {
            _context5.next = 34;
            break;
          }
          commnetsWrapper.innerHTML = response.data.comments;
          commentsTextField = document.querySelectorAll(".kanban-comment-text");
          if (!(commentsTextField.length !== 0)) {
            _context5.next = 32;
            break;
          }
          _context5.next = 22;
          return createEditorsPromise();
        case 22:
          editors = _context5.sent;
          _editMode = function _editMode(e) {
            var editor = findEditor(editors, "comment_" + String(e.detail.commentID));
            if (editor[0] === undefined) return;
            editor[0].readOnly.toggle("", true);
          };
          document.removeEventListener("editMode", _editMode);
          document.addEventListener("editMode", _editMode);
          discardMode = function discardMode(e) {
            var editor = findEditor(editors, "comment_" + String(e.detail.commentID));
            if (editor[0] === undefined) return;
            editor[0].readOnly.toggle();
          };
          document.removeEventListener("discardMode", discardMode);
          document.addEventListener("discardMode", discardMode);
          commentEdited = function commentEdited(e) {
            var editor = findEditor(editors, "comment_" + String(e.detail.commentID));
            if (editor[0] === undefined) return;
            editor[0].save().then(/*#__PURE__*/function () {
              var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(savedData) {
                return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                  while (1) switch (_context4.prev = _context4.next) {
                    case 0:
                      if (!(savedData.blocks.length === 0)) {
                        _context4.next = 2;
                        break;
                      }
                      return _context4.abrupt("return");
                    case 2:
                      commentsAction("", true, e.detail.commentID, JSON.stringify(savedData, null, 4));
                    case 3:
                    case "end":
                      return _context4.stop();
                  }
                }, _callee4);
              }));
              return function (_x4) {
                return _ref5.apply(this, arguments);
              };
            }());
          };
          document.removeEventListener("commentEdited", commentEdited);
          document.addEventListener("commentEdited", commentEdited);
        case 32:
          _context5.next = 36;
          break;
        case 34:
          noComments = document.querySelector(".no-comments");
          if (!noComments) {
            _noComments = document.createElement("p");
            _noComments.classList.add("no-comments");
            _noComments.innerHTML = "Currently, there are no comments";
            commnetsWrapper.append(_noComments);
          }
        case 36:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function getComments(_x3) {
    return _ref4.apply(this, arguments);
  };
}();
var commentsAction = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(e) {
    var editSaveButtonAction,
      commentIDEvent,
      dataBlocks,
      deleteButton,
      editButton,
      editSaveButton,
      commentDeleted,
      commentID,
      _editMode2,
      _commentID,
      commentEdited,
      data,
      _commentID2,
      request,
      response,
      comment,
      commentUserID,
      commentCardID,
      commentsByUser,
      noComments,
      commnetsWrapper,
      _args6 = arguments;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          editSaveButtonAction = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : false;
          commentIDEvent = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : null;
          dataBlocks = _args6.length > 3 && _args6[3] !== undefined ? _args6[3] : null;
          deleteButton = e ? e.target.matches(".kanban-comment-delete") : "";
          editButton = e ? e.target.matches(".kanban-comment-edit") : "";
          editSaveButton = e ? e.target.matches(".kanban-comment-edit-save") : "";
          commentDeleted = null;
          if (!deleteButton) {
            _context6.next = 11;
            break;
          }
          _context6.next = 10;
          return Swal.fire({
            title: "Are you sure?",
            text: "Are you sure that you want to delete this comment?",
            icon: "warning",
            showDenyButton: true,
            confirmButtonText: "Delete",
            denyButtonText: "Cancel"
          });
        case 10:
          commentDeleted = _context6.sent;
        case 11:
          if (!editButton) {
            _context6.next = 16;
            break;
          }
          commentID = e.target.dataset.commentId;
          _editMode2 = new CustomEvent("editMode", {
            detail: {
              commentID: commentID
            }
          });
          document.dispatchEvent(_editMode2);
          return _context6.abrupt("return");
        case 16:
          if (!editSaveButton) {
            _context6.next = 21;
            break;
          }
          _commentID = e.target.dataset.commentId;
          commentEdited = new CustomEvent("commentEdited", {
            detail: {
              commentID: _commentID
            }
          });
          document.dispatchEvent(commentEdited);
          return _context6.abrupt("return");
        case 21:
          if (!(deleteButton && commentDeleted.isConfirmed || editSaveButtonAction)) {
            _context6.next = 36;
            break;
          }
          data = new FormData();
          _commentID2 = e ? e.target.dataset.commentId : commentIDEvent;
          data.append("action", "stk_comments_actions");
          data.append("commentAction", deleteButton ? "delete" : "edit");
          data.append("commentID", _commentID2);
          data.append("security", myAjax.security);
          if (data !== null) {
            data.append("comment", dataBlocks);
          }
          _context6.next = 31;
          return fetch(myAjax.ajaxurl, {
            method: "POST",
            body: data
          });
        case 31:
          request = _context6.sent;
          _context6.next = 34;
          return request.json();
        case 34:
          response = _context6.sent;
          if (response && response.success === true) {
            if (deleteButton) {
              comment = e.target.closest(".kanban-comment");
              commentUserID = comment.dataset.userId;
              commentCardID = comment.dataset.cardId; // Delete comment
              comment.remove();

              // Delete user avatar if is last comment that user added
              commentsByUser = document.querySelectorAll(".kanban-comments [data-user-id=\"".concat(commentUserID, "\"]"));
              if (!commentsByUser.length) {
                document.querySelector(".kanban-card[data-card-id=\"".concat(commentCardID, "\"]")).querySelector(".card-members [data-user=\"".concat(commentUserID, "\"]")).remove();
              }
              if (document.querySelectorAll(".kanban-comment").length === 0) {
                noComments = document.createElement("p");
                commnetsWrapper = document.querySelector(".kanban-comments");
                noComments.classList.add("no-comments");
                noComments.innerHTML = "Currently, there are no comments";
                commnetsWrapper.append(noComments);
              }
            } else {
              discardEditMode("", _commentID2);
            }
          }
        case 36:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function commentsAction(_x5) {
    return _ref6.apply(this, arguments);
  };
}();
var editMode = function editMode(e) {
  var commentID = "#comment_" + String(e.detail.commentID);
  var commentField = document.querySelector(commentID);
  var comment = document.querySelector(commentID).parentElement;
  comment.querySelector(".kanban-comment-buttons-edit-mode").style.display = "block";
  comment.querySelector(".kanban-comment-buttons").style.display = "none";
  commentField.classList.add("edit-mode");
};
var discardEditMode = function discardEditMode(e) {
  var commentIDAction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (e ? e.target.matches(".kanban-comment-discard") : "" || commentIDAction) {
    var commentID = "#comment_" + String(e ? e.target.dataset.commentId : commentIDAction);
    var commentField = document.querySelector(commentID);
    var comment = document.querySelector(commentID).parentElement;
    comment.querySelector(".kanban-comment-buttons-edit-mode").style.display = "none";
    comment.querySelector(".kanban-comment-buttons").style.display = "block";
    commentField.classList.remove("edit-mode");
    var discardMode = new CustomEvent("discardMode", {
      detail: {
        commentID: e ? e.target.dataset.commentId : commentIDAction
      }
    });
    document.dispatchEvent(discardMode);
  }
};

// When card view in opened load comments for that card

document.addEventListener("cardViewOpened", function (e) {
  return getComments(e.detail.cardID);
});

// when card view closed clear comment editor

document.addEventListener("cardViewClosed", function (e) {
  return editor.clear();
});
var commentsSave = document.querySelector(".kanban-comment-save");
commentsSave.addEventListener("click", comments);
document.addEventListener("editMode", editMode);
document.addEventListener("click", commentsAction);
document.addEventListener("click", discardEditMode);
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var checkForEmptyObject = function checkForEmptyObject(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
};

// Front cards view only editors

var descriptionEditors = [];
var createEditorsPromiseDescription = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return Promise.all(Array.from(document.querySelectorAll(".card-description")).map(/*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(field) {
              var textFieldID, data, descriptionPreviewEditor, placeholder;
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    textFieldID = field.id;
                    data = JSON.parse(field.dataset.description); // Clear existing editors
                    if (descriptionEditors.length) {
                      descriptionEditors.forEach(function (editor) {
                        editor.destroy();
                      });
                      descriptionEditors = [];
                    }
                    if (!textFieldID) {
                      _context.next = 9;
                      break;
                    }
                    descriptionPreviewEditor = new EditorJS({
                      holder: textFieldID,
                      readOnly: true,
                      minHeight: 100,
                      defaultBlock: 'defaultBlock',
                      tools: {
                        Marker: {
                          class: Marker,
                          inlineToolbar: true,
                          shortcut: "CMD+SHIFT+M"
                        },
                        image: {
                          class: SimpleImage,
                          inlineToolbar: ["link"]
                        },
                        code: {
                          class: CodeTool,
                          shortcut: "CMD+SHIFT+C"
                        },
                        defaultBlock: {
                          class: DefaultBlock
                        }
                      },
                      data: data
                    }); // Add placeholder
                    if (checkForEmptyObject(data) === true || data.blocks.length === 0) {
                      placeholder = document.createElement('span');
                      placeholder.innerHTML = 'Add a description';
                      placeholder.classList.add('description-placeholder');
                      field.before(placeholder);
                    }
                    _context.next = 8;
                    return descriptionPreviewEditor.isReady;
                  case 8:
                    descriptionEditors.push(descriptionPreviewEditor);
                  case 9:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            return function (_x) {
              return _ref2.apply(this, arguments);
            };
          }()));
        case 2:
          return _context2.abrupt("return", descriptionEditors);
        case 3:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function createEditorsPromiseDescription() {
    return _ref.apply(this, arguments);
  };
}();

// Description Single View Editor

var descriptionEditor = new EditorJS({
  holder: "description-editor-js",
  minHeight: 100,
  placeholder: "Write a description...",
  readOnly: true,
  tools: {
    Marker: {
      class: Marker,
      inlineToolbar: true,
      shortcut: "CMD+SHIFT+M"
    },
    image: {
      class: SimpleImage,
      inlineToolbar: true,
      config: {
        placeholder: "Paste image URL"
      }
    },
    code: {
      class: CodeTool,
      shortcut: "CMD+SHIFT+C"
    }
  },
  data: {}
});

// Add discription active on click

var activeDescriptionEditor = function activeDescriptionEditor(e) {
  var editorHtml = document.querySelector('.kanban-card-view-description-editor');
  var saveButton = document.querySelector('.kanban-description-save');
  if (e.target.closest(".kanban-card-view-description-editor")) {
    if (!editorHtml.classList.contains('active')) {
      editorHtml.classList.add('active');
      descriptionEditor.readOnly.toggle();
      saveButton.style.display = "inline-block";
    }
  } else {
    if (editorHtml.classList.contains('active') && !e.target.matches('.kanban-description-save')) {
      editorHtml.classList.remove('active');
      descriptionEditor.readOnly.toggle();
      saveButton.style.display = "none";
    }
  }
};
var updateDescription = function updateDescription(e) {
  if (e.target.matches(".kanban-description-save")) {
    e.preventDefault();
    var cardId = e.target.dataset.cardId;
    var data = new FormData();
    descriptionEditor.save().then(/*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(savedData) {
        var request, response, card, placeholder, placeholderCreate;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              data.append("action", "stk_card_description_save");
              data.append("cardId", cardId);
              data.append("security", myAjax.security);
              data.append("description", JSON.stringify(savedData, null, 4));
              _context3.next = 6;
              return fetch(myAjax.ajaxurl, {
                method: "POST",
                body: data
              });
            case 6:
              request = _context3.sent;
              _context3.next = 9;
              return request.json();
            case 9:
              response = _context3.sent;
              if (response && response.success === true) {
                if (descriptionEditors.length !== 0) {
                  descriptionEditors.map(function (editor) {
                    var editorIDString = editor.configuration.holder;
                    var editorIDSplit = editorIDString.split("-");
                    var editorID = parseInt(editorIDSplit[editorIDSplit.length - 1]);
                    if (editorID == cardId) {
                      var _card = document.querySelector("[data-card-id=\"".concat(cardId, "\"]"));
                      _card.querySelector(".card-description").dataset.description = response.data.description;
                      var _data = JSON.parse(response.data.description);
                      editor.render(_data);
                      var editorHtml = document.querySelector('.kanban-card-view-description-editor');
                      var saveButton = document.querySelector('.kanban-description-save');
                      editorHtml.classList.remove('active');
                      descriptionEditor.readOnly.toggle();
                      saveButton.style.display = "none";
                    }
                  });
                }

                // Remove placeholder
                card = document.querySelector("[data-card-id=\"".concat(cardId, "\"]"));
                placeholder = card.querySelector('.description-placeholder');
                if (placeholder) {
                  placeholder.remove();
                }

                // Add placeholder if description is blank

                if (JSON.parse(response.data.description).blocks.length === 0) {
                  placeholderCreate = document.createElement('span');
                  placeholderCreate.innerHTML = 'Add a description';
                  placeholderCreate.classList.add('description-placeholder');
                  card.querySelector(".card-description").before(placeholderCreate);
                }
              }
            case 11:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      return function (_x2) {
        return _ref3.apply(this, arguments);
      };
    }());
  }
};
var initDescriptionEditors = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return createEditorsPromiseDescription();
        case 2:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function initDescriptionEditors() {
    return _ref4.apply(this, arguments);
  };
}();
initDescriptionEditors();
var renderDescription = function renderDescription(e) {
  var card = document.querySelector("[data-card-id=\"".concat(e.detail.cardID, "\"]"));
  var data = card.querySelector(".card-description").dataset.description;
  data = JSON.parse(data);
  if (data && !checkForEmptyObject(data)) {
    descriptionEditor.render(data);
  } else {
    descriptionEditor.clear();
  }
};
var initDescriptionEditorCardAdded = function initDescriptionEditorCardAdded(e) {
  var cardID = e.detail.cardID;
  var card = document.querySelector("[data-card-id=\"".concat(cardID, "\"]"));
  var descriptionField = card.querySelector(".card-description");
  var descriptionPreviewEditor = new EditorJS({
    holder: descriptionField.id,
    readOnly: true,
    minHeight: 100,
    defaultBlock: false,
    tools: {
      Marker: {
        class: Marker,
        inlineToolbar: true,
        shortcut: "CMD+SHIFT+M"
      },
      image: {
        class: SimpleImage,
        inlineToolbar: ["link"]
      },
      code: {
        class: CodeTool,
        shortcut: "CMD+SHIFT+C"
      }
    },
    data: {}
  });

  // Add editor placeholder

  var placeholderCreate = document.createElement('span');
  placeholderCreate.innerHTML = 'Add a description';
  placeholderCreate.classList.add('description-placeholder');
  descriptionField.before(placeholderCreate);
  descriptionEditors.push(descriptionPreviewEditor);
};

// Events
document.addEventListener('click', activeDescriptionEditor);
document.addEventListener("cardAdded", initDescriptionEditorCardAdded);
document.addEventListener("cardViewOpened", renderDescription);
document.addEventListener("click", updateDescription);
"use strict";

jQuery(function ($) {
  var dynamicSelectItem = ".dynamic-select-item";
  var dynamicSelectCurrent = ".dynamic-select-current";
  var updateOption = function updateOption(e) {
    var currentTarget = e.target.closest(dynamicSelectItem);
    var dropdownTriggerTarget = e.target.closest(dynamicSelectCurrent);

    // Open dropdown

    if (dropdownTriggerTarget) {
      var dynamicSelect = $(dropdownTriggerTarget).closest('.dynamic-select');
      var selectDropdown = dynamicSelect.find('.dynamic-select-dropdown');
      if (!selectDropdown.hasClass("active")) {
        selectDropdown.addClass("active");
        selectDropdown.slideDown(".4s");
        dynamicSelect.addClass('dropdown-opened');
      } else {
        selectDropdown.removeClass("active");
        selectDropdown.slideUp(".4s");
        dynamicSelect.removeClass('dropdown-opened');
      }
    } else {
      if (!currentTarget) {
        var _dynamicSelect = $('.dynamic-select');
        var _selectDropdown = $('.dynamic-select-dropdown');
        _selectDropdown.removeClass("active");
        _selectDropdown.slideUp(".4s");
        _dynamicSelect.removeClass('dropdown-opened');
      }
    }
    if (currentTarget) {
      var currentOption = $(currentTarget);
      var _dynamicSelect2 = currentOption.closest('.dynamic-select');
      var optionValue = currentOption.data('option');
      if (!currentOption.hasClass("active")) {
        // Remove active to all otgers options

        var allOptions = $(".dynamic-select-item");
        allOptions.removeClass("active");

        // Add active to current item

        currentOption.addClass("active");

        // Change select option

        var select = _dynamicSelect2.next();
        select.val(optionValue);
        var event = new CustomEvent("change", {
          bubbles: true,
          cancelable: true
        });
        select[0].dispatchEvent(event);
      }

      // Switch current target

      var cloneCurrentOption = currentOption.clone();
      cloneCurrentOption.removeClass('active dynamic-select-item');
      cloneCurrentOption.addClass('dynamic-select-current-item');
      if (optionValue == "") {
        cloneCurrentOption.find('.dynamic-select-label').addClass('dynamic-select-label--default');
      }
      var dynamicSelectCurrentOptionWrapper = $('.dynamic-select-current');
      _dynamicSelect2.find(dynamicSelectCurrentOptionWrapper).html('');
      _dynamicSelect2.find(dynamicSelectCurrentOptionWrapper).append(cloneCurrentOption);

      // Close dropdown
      var _selectDropdown2 = $(".dynamic-select-dropdown");
      _dynamicSelect2.find(_selectDropdown2).removeClass("active");
      _dynamicSelect2.find(_selectDropdown2).slideUp(".4s");
      _dynamicSelect2.removeClass('dropdown-opened');
    }
  };
  document.addEventListener("click", updateOption);
});
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
document.getElementById("add-column-btn").addEventListener("click", function () {
  var columnName = prompt("Enter column name:", "New Column");
  if (columnName != null && columnName.trim() !== "") {
    // Send AJAX request to server to create new column
    jQuery.ajax({
      url: myAjax.ajaxurl,
      type: "POST",
      data: {
        action: "stk_add_column",
        // Action hook name for WP to execute the server-side function
        columnName: columnName,
        // Data being sent, including the new column name
        projectId: jQuery("#kanban-board").data("project-id"),
        // The ID of the project, assumed to be stored in the data attribute of the Kanban board
        security: myAjax.security // Security nonce for verification
      },
      success: function success(response) {
        if (response.success) {
          // Create the column div
          var column = document.createElement("div");
          var cardContainer = document.createElement("div");
          cardContainer.classList.add("kanban-cards-container");
          column.classList.add("kanban-column");
          column.setAttribute("data-column-id", response.data.columnId);
          column.setAttribute("data-column-order", response.data.columnOrder);

          // Create the h3 element for the column title
          var columnTitle = document.createElement("h3");
          columnTitle.textContent = columnName;
          columnTitle.classList.add("column-title");

          // Create the delete button
          var deleteBtn = document.createElement("button");
          deleteBtn.textContent = "Delete Column";
          deleteBtn.classList.add("delete-column-btn");

          // Add Card button
          var addButton = document.createElement("button");
          addButton.className = "add-card-btn";
          addButton.setAttribute("data-column-id", response.data.columnId);
          addButton.textContent = "Add a Card";

          // Append the title and delete button to the column
          column.appendChild(columnTitle);
          column.appendChild(deleteBtn);
          column.appendChild(cardContainer);
          column.appendChild(addButton);

          // Append the new column to the Kanban board
          var isChildAppnded = document.getElementById("kanban-board").appendChild(column);
          if (isChildAppnded) {
            var event = new CustomEvent("columnAdded", {
              detail: {
                column: column
              }
            });
            document.dispatchEvent(event);
          }
        } else {
          alert("Error: " + response.data.message);
        }
      },
      error: function error() {
        alert("There was an error adding the column. Please try again.");
      }
    });
  } else {
    alert("Please enter a valid column name.");
  }
});

// Update Column Title

var updateColumnTitle = function updateColumnTitle(e) {
  if (!e.target.matches(".column-title")) {
    return;
  }
  if (e.type === "click") {
    e.target.setAttribute("contenteditable", "true");
    e.target.focus();
  }
  if (e.type === "focusout" || e.type === "keydown" && e.keyCode === 13) {
    e.preventDefault(); // Prevent newline on Enter key for title
    var column = e.target.closest(".kanban-column");
    var columnId = column.dataset.columnId;
    var newText = e.target.textContent;
    var data = {
      action: "stk_card_title_description",
      columnId: columnId,
      security: myAjax.security
    };
    if (e.target.className === "card-title") {
      if (!newText) e.target.textContent = "Add Title";
      data.title = newText;
    }
    // AJAX call to save the updated title
    jQuery.ajax({
      url: myAjax.ajaxurl,
      type: "POST",
      data: data,
      success: function success(response) {
        if (!response.success) {
          console.log("Error saving title.");
        } else {
          if (card === null) {
            var _card = document.querySelector("[data-card-id=\"".concat(cardId, "\"]"));
            _card.querySelector(".card-title").innerHTML = newText ? newText : "Add Title";
          }
        }
      }
    });
    if (e.type === "keydown") {
      e.target.blur(); // Remove focus when Enter is pressed
    }
  }
};

// Delete Column Button
document.getElementById("kanban-board").addEventListener("click", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(event) {
    var deleteBtn, column, columnId, columnDeleted;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          deleteBtn = event.target.closest(".delete-column-btn");
          if (!deleteBtn) {
            _context.next = 9;
            break;
          }
          column = deleteBtn.closest(".kanban-column");
          columnId = column.getAttribute("data-column-id"); // Get the column ID
          columnDeleted = null;
          _context.next = 7;
          return Swal.fire({
            title: "Are you sure?",
            text: "Are you sure that you want to delete this column?",
            icon: "warning",
            showDenyButton: true,
            confirmButtonText: "Delete",
            denyButtonText: "Cancel"
          });
        case 7:
          columnDeleted = _context.sent;
          if (columnId && columnDeleted.isConfirmed) {
            // Send AJAX request to server to delete the column
            jQuery.ajax({
              url: myAjax.ajaxurl,
              type: "POST",
              data: {
                action: "stk_delete_column",
                // The AJAX action hook name
                columnId: columnId,
                security: myAjax.security // Nonce for security, passed from PHP
              },
              success: function success(response) {
                if (response.success) {
                  column.remove(); // Remove the column from the DOM
                } else {
                  alert("Error: Column could not be deleted.");
                }
              },
              error: function error() {
                alert("There was an error deleting the column. Please try again.");
              }
            });
          }
        case 9:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

// Adding Cards

document.addEventListener("click", function (event) {
  if (event.target.matches(".add-card-btn")) {
    var columnId = event.target.closest(".kanban-column").getAttribute("data-column-id");
    var cardTitle = prompt("Enter card title:");
    var cardDescription = ""; // Static value for the card description

    if (cardTitle) {
      // Send AJAX request to create a new card
      jQuery.ajax({
        url: myAjax.ajaxurl,
        type: "POST",
        data: {
          action: "stk_add_card",
          columnId: columnId,
          title: cardTitle,
          description: cardDescription,
          security: myAjax.security
        },
        success: function success(response) {
          if (response.success && response.data && response.data.cardId) {
            // Append the new card to the column's card container
            var cardContainer = event.target.closest(".kanban-column").querySelector(".kanban-cards-container");
            cardContainer.insertAdjacentHTML('beforeend', response.data.cardHTML);
            var cardAdded = new CustomEvent("cardAdded", {
              detail: {
                cardID: response.data.cardId
              }
            });
            document.dispatchEvent(cardAdded);
          } else {
            alert("Error: " + (response.data && response.data.message ? response.data.message : "Unknown error"));
          }
        },
        error: function error() {
          alert("There was an error adding the card. Please try again.");
        }
      });
    }
  }
});

// Delete Card
document.addEventListener("click", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(event) {
    var _card2, _cardId, cardDeleted;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (!event.target.matches(".delete-card-btn")) {
            _context2.next = 8;
            break;
          }
          _card2 = event.target.closest(".kanban-card");
          _cardId = event.target.getAttribute("data-card-id");
          cardDeleted = null;
          _context2.next = 6;
          return Swal.fire({
            title: "Are you sure?",
            text: "Are you sure that you want to delete this card?",
            icon: "warning",
            showDenyButton: true,
            confirmButtonText: "Delete",
            denyButtonText: "Cancel"
          });
        case 6:
          cardDeleted = _context2.sent;
          if (_cardId && cardDeleted.isConfirmed) {
            // Send AJAX request to server to delete the card
            jQuery.ajax({
              url: myAjax.ajaxurl,
              type: "POST",
              data: {
                action: "stk_delete_card",
                cardId: _cardId,
                security: myAjax.security // Nonce for security
              },
              success: function success(response) {
                if (response.success) {
                  _card2.remove();
                } else {
                  alert("Error: Card could not be deleted.");
                }
              },
              error: function error() {
                alert("There was an error updating status and priority");
              }
            });
          }
        case 8:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}());

// Update card priority and card status

var updateStatusPriority = function updateStatusPriority(e) {
  if (!e.target.matches(".card-status") && !e.target.matches(".card-priority")) {
    return;
  }
  var card = e.target.closest(".kanban-card");
  var cardId = card.getAttribute("data-card-id");
  var status = card.querySelector(".card-status").value;
  var priority = card.querySelector(".card-priority").value;
  if (cardId) {
    jQuery.ajax({
      url: myAjax.ajaxurl,
      type: "POST",
      data: {
        action: "stk_status_priority",
        cardId: cardId,
        security: myAjax.security,
        // Nonce for security
        status: status,
        priority: priority
      },
      success: function success(response) {
        console.log(response);
      },
      error: function error() {
        console.log("There was an error deleting the card. Please try again.");
      }
    });
  }
};
document.addEventListener("change", updateStatusPriority);

// Update card title

var updateCardTitle = function updateCardTitle(e) {
  if (!e.target.matches(".card-title")) {
    return;
  }
  if (e.type === "click") {
    e.target.setAttribute("contenteditable", "true");
    e.target.focus();
  }
  if (e.type === "focusout" || e.type === "keydown" && e.keyCode === 13) {
    e.preventDefault(); // Prevent newline on Enter key for title
    var _card3 = e.target.closest(".kanban-card");
    var _cardId2 = _card3 ? _card3.dataset.cardId : e.target.dataset.cardId;
    var newText = e.target.textContent;
    var data = {
      action: "stk_card_title_description",
      cardId: _cardId2,
      security: myAjax.security
    };
    if (e.target.className === "card-title") {
      if (!newText) e.target.textContent = "Add Title";
      data.title = newText;
    }
    // AJAX call to save the updated title
    jQuery.ajax({
      url: myAjax.ajaxurl,
      type: "POST",
      data: data,
      success: function success(response) {
        if (!response.success) {
          console.log("Error saving title.");
        } else {
          if (_card3 === null) {
            var _card4 = document.querySelector("[data-card-id=\"".concat(_cardId2, "\"]"));
            _card4.querySelector(".card-title").innerHTML = newText ? newText : "Add Title";
          }
        }
      }
    });
    if (e.type === "keydown") {
      e.target.blur(); // Remove focus when Enter is pressed
    }
  }
};
document.addEventListener("click", updateCardTitle);
document.addEventListener("focusout", updateCardTitle);
document.addEventListener("keydown", updateCardTitle);

// Miscellaneous

jQuery(document).ready(function ($) {
  $(".side_expander").on("click", function () {
    $(".side_hidden, .user_info").toggleClass("side-open");
    $(this).toggleClass("open");
  });
  $(".top_expander").on("click", function () {
    $(".board-header .bottom").slideToggle();
    $(this).toggleClass("open");
  });
});