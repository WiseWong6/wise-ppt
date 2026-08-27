var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/tslib/tslib.es6.js
var tslib_es6_exports = {};
__export(tslib_es6_exports, {
  __assign: () => __assign,
  __asyncDelegator: () => __asyncDelegator,
  __asyncGenerator: () => __asyncGenerator,
  __asyncValues: () => __asyncValues,
  __await: () => __await,
  __awaiter: () => __awaiter,
  __classPrivateFieldGet: () => __classPrivateFieldGet,
  __classPrivateFieldSet: () => __classPrivateFieldSet,
  __createBinding: () => __createBinding,
  __decorate: () => __decorate,
  __exportStar: () => __exportStar,
  __extends: () => __extends,
  __generator: () => __generator,
  __importDefault: () => __importDefault,
  __importStar: () => __importStar,
  __makeTemplateObject: () => __makeTemplateObject,
  __metadata: () => __metadata,
  __param: () => __param,
  __read: () => __read,
  __rest: () => __rest,
  __spread: () => __spread,
  __spreadArrays: () => __spreadArrays,
  __values: () => __values
});
function __extends(d, b) {
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() {
    if (t[0] & 1) throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return { value: op[1], done: false };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __createBinding(o, m, k, k2) {
  if (k2 === void 0) k2 = k;
  o[k2] = m[k];
}
function __exportStar(m, exports) {
  for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function() {
      if (o && i >= o.length) o = void 0;
      return { value: o && o[i++], done: !o };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
}
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
    ar = ar.concat(__read(arguments[i]));
  return ar;
}
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
      r[k] = a[j];
  return r;
}
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function verb(n) {
    if (g[n]) i[n] = function(v) {
      return new Promise(function(a, b) {
        q.push([n, v, a, b]) > 1 || resume(n, v);
      });
    };
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
}
function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function(e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function() {
    return this;
  }, i;
  function verb(n, f) {
    i[n] = o[n] ? function(v) {
      return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v;
    } : f;
  }
}
function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i);
  function verb(n) {
    i[n] = o[n] && function(v) {
      return new Promise(function(resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }
  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function(v2) {
      resolve({ value: v2, done: d });
    }, reject);
  }
}
function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
}
function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) {
    for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  }
  result.default = mod;
  return result;
}
function __importDefault(mod) {
  return mod && mod.__esModule ? mod : { default: mod };
}
function __classPrivateFieldGet(receiver, privateMap) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }
  return privateMap.get(receiver);
}
function __classPrivateFieldSet(receiver, privateMap, value) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to set private field on non-instance");
  }
  privateMap.set(receiver, value);
  return value;
}
var extendStatics, __assign;
var init_tslib_es6 = __esm({
  "node_modules/tslib/tslib.es6.js"() {
    extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    __assign = function() {
      __assign = Object.assign || function __assign2(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
  }
});

// node_modules/pdf-lib/cjs/utils/base64.js
var require_base64 = __commonJS({
  "node_modules/pdf-lib/cjs/utils/base64.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.decodeFromBase64DataUri = exports.decodeFromBase64 = exports.encodeToBase64 = void 0;
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var lookup = new Uint8Array(256);
    for (i = 0; i < chars.length; i++) {
      lookup[chars.charCodeAt(i)] = i;
    }
    var i;
    exports.encodeToBase64 = function(bytes) {
      var base64 = "";
      var len = bytes.length;
      for (var i2 = 0; i2 < len; i2 += 3) {
        base64 += chars[bytes[i2] >> 2];
        base64 += chars[(bytes[i2] & 3) << 4 | bytes[i2 + 1] >> 4];
        base64 += chars[(bytes[i2 + 1] & 15) << 2 | bytes[i2 + 2] >> 6];
        base64 += chars[bytes[i2 + 2] & 63];
      }
      if (len % 3 === 2) {
        base64 = base64.substring(0, base64.length - 1) + "=";
      } else if (len % 3 === 1) {
        base64 = base64.substring(0, base64.length - 2) + "==";
      }
      return base64;
    };
    exports.decodeFromBase64 = function(base64) {
      var bufferLength = base64.length * 0.75;
      var len = base64.length;
      var i2;
      var p = 0;
      var encoded1;
      var encoded2;
      var encoded3;
      var encoded4;
      if (base64[base64.length - 1] === "=") {
        bufferLength--;
        if (base64[base64.length - 2] === "=") {
          bufferLength--;
        }
      }
      var bytes = new Uint8Array(bufferLength);
      for (i2 = 0; i2 < len; i2 += 4) {
        encoded1 = lookup[base64.charCodeAt(i2)];
        encoded2 = lookup[base64.charCodeAt(i2 + 1)];
        encoded3 = lookup[base64.charCodeAt(i2 + 2)];
        encoded4 = lookup[base64.charCodeAt(i2 + 3)];
        bytes[p++] = encoded1 << 2 | encoded2 >> 4;
        bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
        bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
      }
      return bytes;
    };
    var DATA_URI_PREFIX_REGEX = /^(data)?:?([\w\/\+]+)?;?(charset=[\w-]+|base64)?.*,/i;
    exports.decodeFromBase64DataUri = function(dataUri) {
      var trimmedUri = dataUri.trim();
      var prefix = trimmedUri.substring(0, 100);
      var res = prefix.match(DATA_URI_PREFIX_REGEX);
      if (!res)
        return exports.decodeFromBase64(trimmedUri);
      var fullMatch = res[0];
      var data = trimmedUri.substring(fullMatch.length);
      return exports.decodeFromBase64(data);
    };
  }
});

// node_modules/pdf-lib/cjs/utils/strings.js
var require_strings = __commonJS({
  "node_modules/pdf-lib/cjs/utils/strings.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.findLastMatch = exports.parseDate = exports.breakTextIntoLines = exports.charSplit = exports.charAtIndex = exports.mergeLines = exports.lineSplit = exports.isNewlineChar = exports.newlineChars = exports.escapedNewlineChars = exports.cleanText = exports.escapeRegExp = exports.addRandomSuffix = exports.copyStringIntoBuffer = exports.padStart = exports.charFromHexCode = exports.charFromCode = exports.toHexString = exports.toHexStringOfMinLength = exports.toCodePoint = exports.toCharCode = void 0;
    exports.toCharCode = function(character) {
      return character.charCodeAt(0);
    };
    exports.toCodePoint = function(character) {
      return character.codePointAt(0);
    };
    exports.toHexStringOfMinLength = function(num, minLength) {
      return exports.padStart(num.toString(16), minLength, "0").toUpperCase();
    };
    exports.toHexString = function(num) {
      return exports.toHexStringOfMinLength(num, 2);
    };
    exports.charFromCode = function(code) {
      return String.fromCharCode(code);
    };
    exports.charFromHexCode = function(hex) {
      return exports.charFromCode(parseInt(hex, 16));
    };
    exports.padStart = function(value, length, padChar) {
      var padding = "";
      for (var idx = 0, len = length - value.length; idx < len; idx++) {
        padding += padChar;
      }
      return padding + value;
    };
    exports.copyStringIntoBuffer = function(str, buffer, offset) {
      var length = str.length;
      for (var idx = 0; idx < length; idx++) {
        buffer[offset++] = str.charCodeAt(idx);
      }
      return length;
    };
    exports.addRandomSuffix = function(prefix, suffixLength) {
      if (suffixLength === void 0) {
        suffixLength = 4;
      }
      return prefix + "-" + Math.floor(Math.random() * Math.pow(10, suffixLength));
    };
    exports.escapeRegExp = function(str) {
      return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    };
    exports.cleanText = function(text) {
      return text.replace(/\t|\u0085|\u2028|\u2029/g, "    ").replace(/[\b\v]/g, "");
    };
    exports.escapedNewlineChars = ["\\n", "\\f", "\\r", "\\u000B"];
    exports.newlineChars = ["\n", "\f", "\r", "\v"];
    exports.isNewlineChar = function(text) {
      return /^[\n\f\r\u000B]$/.test(text);
    };
    exports.lineSplit = function(text) {
      return text.split(/[\n\f\r\u000B]/);
    };
    exports.mergeLines = function(text) {
      return text.replace(/[\n\f\r\u000B]/g, " ");
    };
    exports.charAtIndex = function(text, index) {
      var cuFirst = text.charCodeAt(index);
      var cuSecond;
      var nextIndex = index + 1;
      var length = 1;
      if (
        // Check if it's the start of a surrogate pair.
        cuFirst >= 55296 && cuFirst <= 56319 && // high surrogate
        text.length > nextIndex
      ) {
        cuSecond = text.charCodeAt(nextIndex);
        if (cuSecond >= 56320 && cuSecond <= 57343)
          length = 2;
      }
      return [text.slice(index, index + length), length];
    };
    exports.charSplit = function(text) {
      var chars = [];
      for (var idx = 0, len = text.length; idx < len; ) {
        var _a = exports.charAtIndex(text, idx), c = _a[0], cLen = _a[1];
        chars.push(c);
        idx += cLen;
      }
      return chars;
    };
    var buildWordBreakRegex = function(wordBreaks) {
      var newlineCharUnion = exports.escapedNewlineChars.join("|");
      var escapedRules = ["$"];
      for (var idx = 0, len = wordBreaks.length; idx < len; idx++) {
        var wordBreak = wordBreaks[idx];
        if (exports.isNewlineChar(wordBreak)) {
          throw new TypeError("`wordBreak` must not include " + newlineCharUnion);
        }
        escapedRules.push(wordBreak === "" ? "." : exports.escapeRegExp(wordBreak));
      }
      var breakRules = escapedRules.join("|");
      return new RegExp("(" + newlineCharUnion + ")|((.*?)(" + breakRules + "))", "gm");
    };
    exports.breakTextIntoLines = function(text, wordBreaks, maxWidth, computeWidthOfText) {
      var regex = buildWordBreakRegex(wordBreaks);
      var words = exports.cleanText(text).match(regex);
      var currLine = "";
      var currWidth = 0;
      var lines = [];
      var pushCurrLine = function() {
        if (currLine !== "")
          lines.push(currLine);
        currLine = "";
        currWidth = 0;
      };
      for (var idx = 0, len = words.length; idx < len; idx++) {
        var word = words[idx];
        if (exports.isNewlineChar(word)) {
          pushCurrLine();
        } else {
          var width = computeWidthOfText(word);
          if (currWidth + width > maxWidth)
            pushCurrLine();
          currLine += word;
          currWidth += width;
        }
      }
      pushCurrLine();
      return lines;
    };
    var dateRegex = /^D:(\d\d\d\d)(\d\d)?(\d\d)?(\d\d)?(\d\d)?(\d\d)?([+\-Z])?(\d\d)?'?(\d\d)?'?$/;
    exports.parseDate = function(dateStr) {
      var match = dateStr.match(dateRegex);
      if (!match)
        return void 0;
      var year = match[1], _a = match[2], month = _a === void 0 ? "01" : _a, _b = match[3], day = _b === void 0 ? "01" : _b, _c = match[4], hours = _c === void 0 ? "00" : _c, _d = match[5], mins = _d === void 0 ? "00" : _d, _e = match[6], secs = _e === void 0 ? "00" : _e, _f = match[7], offsetSign = _f === void 0 ? "Z" : _f, _g = match[8], offsetHours = _g === void 0 ? "00" : _g, _h = match[9], offsetMins = _h === void 0 ? "00" : _h;
      var tzOffset = offsetSign === "Z" ? "Z" : "" + offsetSign + offsetHours + ":" + offsetMins;
      var date = /* @__PURE__ */ new Date(year + "-" + month + "-" + day + "T" + hours + ":" + mins + ":" + secs + tzOffset);
      return date;
    };
    exports.findLastMatch = function(value, regex) {
      var _a;
      var position = 0;
      var lastMatch;
      while (position < value.length) {
        var match = value.substring(position).match(regex);
        if (!match)
          return { match: lastMatch, pos: position };
        lastMatch = match;
        position += ((_a = match.index) !== null && _a !== void 0 ? _a : 0) + match[0].length;
      }
      return { match: lastMatch, pos: position };
    };
  }
});

// node_modules/pdf-lib/cjs/utils/arrays.js
var require_arrays = __commonJS({
  "node_modules/pdf-lib/cjs/utils/arrays.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.toUint8Array = exports.canBeConvertedToUint8Array = exports.pluckIndices = exports.range = exports.sum = exports.reverseArray = exports.sortedUniq = exports.byAscendingId = exports.arrayAsString = exports.mergeUint8Arrays = exports.mergeIntoTypedArray = exports.typedArrayFor = exports.last = void 0;
    var base64_1 = require_base64();
    var strings_1 = require_strings();
    exports.last = function(array) {
      return array[array.length - 1];
    };
    exports.typedArrayFor = function(value) {
      if (value instanceof Uint8Array)
        return value;
      var length = value.length;
      var typedArray = new Uint8Array(length);
      for (var idx = 0; idx < length; idx++) {
        typedArray[idx] = value.charCodeAt(idx);
      }
      return typedArray;
    };
    exports.mergeIntoTypedArray = function() {
      var arrays = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        arrays[_i] = arguments[_i];
      }
      var arrayCount = arrays.length;
      var typedArrays = [];
      for (var idx = 0; idx < arrayCount; idx++) {
        var element = arrays[idx];
        typedArrays[idx] = element instanceof Uint8Array ? element : exports.typedArrayFor(element);
      }
      var totalSize = 0;
      for (var idx = 0; idx < arrayCount; idx++) {
        totalSize += arrays[idx].length;
      }
      var merged = new Uint8Array(totalSize);
      var offset = 0;
      for (var arrIdx = 0; arrIdx < arrayCount; arrIdx++) {
        var arr = typedArrays[arrIdx];
        for (var byteIdx = 0, arrLen = arr.length; byteIdx < arrLen; byteIdx++) {
          merged[offset++] = arr[byteIdx];
        }
      }
      return merged;
    };
    exports.mergeUint8Arrays = function(arrays) {
      var totalSize = 0;
      for (var idx = 0, len = arrays.length; idx < len; idx++) {
        totalSize += arrays[idx].length;
      }
      var mergedBuffer = new Uint8Array(totalSize);
      var offset = 0;
      for (var idx = 0, len = arrays.length; idx < len; idx++) {
        var array = arrays[idx];
        mergedBuffer.set(array, offset);
        offset += array.length;
      }
      return mergedBuffer;
    };
    exports.arrayAsString = function(array) {
      var str = "";
      for (var idx = 0, len = array.length; idx < len; idx++) {
        str += strings_1.charFromCode(array[idx]);
      }
      return str;
    };
    exports.byAscendingId = function(a, b) {
      return a.id - b.id;
    };
    exports.sortedUniq = function(array, indexer) {
      var uniq = [];
      for (var idx = 0, len = array.length; idx < len; idx++) {
        var curr = array[idx];
        var prev = array[idx - 1];
        if (idx === 0 || indexer(curr) !== indexer(prev)) {
          uniq.push(curr);
        }
      }
      return uniq;
    };
    exports.reverseArray = function(array) {
      var arrayLen = array.length;
      for (var idx = 0, len = Math.floor(arrayLen / 2); idx < len; idx++) {
        var leftIdx = idx;
        var rightIdx = arrayLen - idx - 1;
        var temp = array[idx];
        array[leftIdx] = array[rightIdx];
        array[rightIdx] = temp;
      }
      return array;
    };
    exports.sum = function(array) {
      var total = 0;
      for (var idx = 0, len = array.length; idx < len; idx++) {
        total += array[idx];
      }
      return total;
    };
    exports.range = function(start, end) {
      var arr = new Array(end - start);
      for (var idx = 0, len = arr.length; idx < len; idx++) {
        arr[idx] = start + idx;
      }
      return arr;
    };
    exports.pluckIndices = function(arr, indices) {
      var plucked = new Array(indices.length);
      for (var idx = 0, len = indices.length; idx < len; idx++) {
        plucked[idx] = arr[indices[idx]];
      }
      return plucked;
    };
    exports.canBeConvertedToUint8Array = function(input) {
      return input instanceof Uint8Array || input instanceof ArrayBuffer || typeof input === "string";
    };
    exports.toUint8Array = function(input) {
      if (typeof input === "string") {
        return base64_1.decodeFromBase64DataUri(input);
      } else if (input instanceof ArrayBuffer) {
        return new Uint8Array(input);
      } else if (input instanceof Uint8Array) {
        return input;
      } else {
        throw new TypeError("`input` must be one of `string | ArrayBuffer | Uint8Array`");
      }
    };
  }
});

// node_modules/pdf-lib/cjs/utils/async.js
var require_async = __commonJS({
  "node_modules/pdf-lib/cjs/utils/async.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.waitForTick = void 0;
    exports.waitForTick = function() {
      return new Promise(function(resolve) {
        setTimeout(function() {
          return resolve();
        }, 0);
      });
    };
  }
});

// node_modules/pdf-lib/cjs/utils/unicode.js
var require_unicode = __commonJS({
  "node_modules/pdf-lib/cjs/utils/unicode.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.hasUtf16BOM = exports.utf16Decode = exports.lowSurrogate = exports.highSurrogate = exports.hasSurrogates = exports.isWithinBMP = exports.utf16Encode = exports.utf8Encode = void 0;
    var strings_1 = require_strings();
    exports.utf8Encode = function(input, byteOrderMark) {
      if (byteOrderMark === void 0) {
        byteOrderMark = true;
      }
      var encoded = [];
      if (byteOrderMark)
        encoded.push(239, 187, 191);
      for (var idx = 0, len = input.length; idx < len; ) {
        var codePoint = input.codePointAt(idx);
        if (codePoint < 128) {
          var byte1 = codePoint & 127;
          encoded.push(byte1);
          idx += 1;
        } else if (codePoint < 2048) {
          var byte1 = codePoint >> 6 & 31 | 192;
          var byte2 = codePoint & 63 | 128;
          encoded.push(byte1, byte2);
          idx += 1;
        } else if (codePoint < 65536) {
          var byte1 = codePoint >> 12 & 15 | 224;
          var byte2 = codePoint >> 6 & 63 | 128;
          var byte3 = codePoint & 63 | 128;
          encoded.push(byte1, byte2, byte3);
          idx += 1;
        } else if (codePoint < 1114112) {
          var byte1 = codePoint >> 18 & 7 | 240;
          var byte2 = codePoint >> 12 & 63 | 128;
          var byte3 = codePoint >> 6 & 63 | 128;
          var byte4 = codePoint >> 0 & 63 | 128;
          encoded.push(byte1, byte2, byte3, byte4);
          idx += 2;
        } else
          throw new Error("Invalid code point: 0x" + strings_1.toHexString(codePoint));
      }
      return new Uint8Array(encoded);
    };
    exports.utf16Encode = function(input, byteOrderMark) {
      if (byteOrderMark === void 0) {
        byteOrderMark = true;
      }
      var encoded = [];
      if (byteOrderMark)
        encoded.push(65279);
      for (var idx = 0, len = input.length; idx < len; ) {
        var codePoint = input.codePointAt(idx);
        if (codePoint < 65536) {
          encoded.push(codePoint);
          idx += 1;
        } else if (codePoint < 1114112) {
          encoded.push(exports.highSurrogate(codePoint), exports.lowSurrogate(codePoint));
          idx += 2;
        } else
          throw new Error("Invalid code point: 0x" + strings_1.toHexString(codePoint));
      }
      return new Uint16Array(encoded);
    };
    exports.isWithinBMP = function(codePoint) {
      return codePoint >= 0 && codePoint <= 65535;
    };
    exports.hasSurrogates = function(codePoint) {
      return codePoint >= 65536 && codePoint <= 1114111;
    };
    exports.highSurrogate = function(codePoint) {
      return Math.floor((codePoint - 65536) / 1024) + 55296;
    };
    exports.lowSurrogate = function(codePoint) {
      return (codePoint - 65536) % 1024 + 56320;
    };
    var ByteOrder;
    (function(ByteOrder2) {
      ByteOrder2["BigEndian"] = "BigEndian";
      ByteOrder2["LittleEndian"] = "LittleEndian";
    })(ByteOrder || (ByteOrder = {}));
    var REPLACEMENT = "\uFFFD".codePointAt(0);
    exports.utf16Decode = function(input, byteOrderMark) {
      if (byteOrderMark === void 0) {
        byteOrderMark = true;
      }
      if (input.length <= 1)
        return String.fromCodePoint(REPLACEMENT);
      var byteOrder = byteOrderMark ? readBOM(input) : ByteOrder.BigEndian;
      var idx = byteOrderMark ? 2 : 0;
      var codePoints = [];
      while (input.length - idx >= 2) {
        var first = decodeValues(input[idx++], input[idx++], byteOrder);
        if (isHighSurrogate(first)) {
          if (input.length - idx < 2) {
            codePoints.push(REPLACEMENT);
          } else {
            var second = decodeValues(input[idx++], input[idx++], byteOrder);
            if (isLowSurrogate(second)) {
              codePoints.push(first, second);
            } else {
              codePoints.push(REPLACEMENT);
            }
          }
        } else if (isLowSurrogate(first)) {
          idx += 2;
          codePoints.push(REPLACEMENT);
        } else {
          codePoints.push(first);
        }
      }
      if (idx < input.length)
        codePoints.push(REPLACEMENT);
      return String.fromCodePoint.apply(String, codePoints);
    };
    var isHighSurrogate = function(codePoint) {
      return codePoint >= 55296 && codePoint <= 56319;
    };
    var isLowSurrogate = function(codePoint) {
      return codePoint >= 56320 && codePoint <= 57343;
    };
    var decodeValues = function(first, second, byteOrder) {
      if (byteOrder === ByteOrder.LittleEndian)
        return second << 8 | first;
      if (byteOrder === ByteOrder.BigEndian)
        return first << 8 | second;
      throw new Error("Invalid byteOrder: " + byteOrder);
    };
    var readBOM = function(bytes) {
      return hasUtf16BigEndianBOM(bytes) ? ByteOrder.BigEndian : hasUtf16LittleEndianBOM(bytes) ? ByteOrder.LittleEndian : ByteOrder.BigEndian;
    };
    var hasUtf16BigEndianBOM = function(bytes) {
      return bytes[0] === 254 && bytes[1] === 255;
    };
    var hasUtf16LittleEndianBOM = function(bytes) {
      return bytes[0] === 255 && bytes[1] === 254;
    };
    exports.hasUtf16BOM = function(bytes) {
      return hasUtf16BigEndianBOM(bytes) || hasUtf16LittleEndianBOM(bytes);
    };
  }
});

// node_modules/pdf-lib/cjs/utils/numbers.js
var require_numbers = __commonJS({
  "node_modules/pdf-lib/cjs/utils/numbers.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.bytesFor = exports.sizeInBytes = exports.numberToString = void 0;
    exports.numberToString = function(num) {
      var numStr = String(num);
      if (Math.abs(num) < 1) {
        var e = parseInt(num.toString().split("e-")[1]);
        if (e) {
          var negative = num < 0;
          if (negative)
            num *= -1;
          num *= Math.pow(10, e - 1);
          numStr = "0." + new Array(e).join("0") + num.toString().substring(2);
          if (negative)
            numStr = "-" + numStr;
        }
      } else {
        var e = parseInt(num.toString().split("+")[1]);
        if (e > 20) {
          e -= 20;
          num /= Math.pow(10, e);
          numStr = num.toString() + new Array(e + 1).join("0");
        }
      }
      return numStr;
    };
    exports.sizeInBytes = function(n) {
      return Math.ceil(n.toString(2).length / 8);
    };
    exports.bytesFor = function(n) {
      var bytes = new Uint8Array(exports.sizeInBytes(n));
      for (var i = 1; i <= bytes.length; i++) {
        bytes[i - 1] = n >> (bytes.length - i) * 8;
      }
      return bytes;
    };
  }
});

// node_modules/pdf-lib/cjs/utils/errors.js
var require_errors = __commonJS({
  "node_modules/pdf-lib/cjs/utils/errors.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.error = void 0;
    exports.error = function(msg) {
      throw new Error(msg);
    };
  }
});

// scripts/stubs/pako-stub.mjs
var pako_stub_exports = {};
__export(pako_stub_exports, {
  Deflate: () => Deflate,
  Inflate: () => Inflate,
  default: () => pako_stub_default,
  deflate: () => deflate,
  deflateRaw: () => deflateRaw,
  gzip: () => gzip,
  inflate: () => inflate,
  inflateRaw: () => inflateRaw,
  ungzip: () => ungzip
});
import { deflateSync, inflateSync, deflateRawSync, inflateRawSync, gzipSync, gunzipSync } from "node:zlib";
function deflate(data, options) {
  return toU8(deflateSync(data, options));
}
function inflate(data, options) {
  return toU8(inflateSync(data, options));
}
function deflateRaw(data, options) {
  return toU8(deflateRawSync(data, options));
}
function inflateRaw(data, options) {
  return toU8(inflateRawSync(data, options));
}
function gzip(data, options) {
  return toU8(gzipSync(data, options));
}
function ungzip(data, options) {
  return toU8(gunzipSync(data, options));
}
var toU8, Deflate, Inflate, pako_stub_default;
var init_pako_stub = __esm({
  "scripts/stubs/pako-stub.mjs"() {
    toU8 = (data) => new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
    Deflate = class {
      constructor(options) {
        this._options = options;
        this._chunks = [];
      }
      push(chunk, final) {
        if (chunk) this._chunks.push(chunk);
        if (final) this.result = deflateSync(Buffer.concat(this._chunks.map(Buffer.from)), this._options);
      }
    };
    Inflate = class {
      constructor(options) {
        this._options = options;
        this._chunks = [];
      }
      push(chunk, final) {
        if (chunk) this._chunks.push(chunk);
        if (final) this.result = inflateSync(Buffer.concat(this._chunks.map(Buffer.from)), this._options);
      }
    };
    pako_stub_default = { deflate, inflate, deflateRaw, inflateRaw, gzip, ungzip, Deflate, Inflate };
  }
});

// node_modules/@pdf-lib/standard-fonts/lib/utils.js
var require_utils = __commonJS({
  "node_modules/@pdf-lib/standard-fonts/lib/utils.js"(exports) {
    "use strict";
    var __importDefault2 = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var pako_1 = __importDefault2((init_pako_stub(), __toCommonJS(pako_stub_exports)));
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var lookup = new Uint8Array(256);
    for (i = 0; i < chars.length; i++) {
      lookup[chars.charCodeAt(i)] = i;
    }
    var i;
    exports.decodeFromBase64 = function(base64) {
      var bufferLength = base64.length * 0.75;
      var len = base64.length;
      var i2;
      var p = 0;
      var encoded1;
      var encoded2;
      var encoded3;
      var encoded4;
      if (base64[base64.length - 1] === "=") {
        bufferLength--;
        if (base64[base64.length - 2] === "=") {
          bufferLength--;
        }
      }
      var bytes = new Uint8Array(bufferLength);
      for (i2 = 0; i2 < len; i2 += 4) {
        encoded1 = lookup[base64.charCodeAt(i2)];
        encoded2 = lookup[base64.charCodeAt(i2 + 1)];
        encoded3 = lookup[base64.charCodeAt(i2 + 2)];
        encoded4 = lookup[base64.charCodeAt(i2 + 3)];
        bytes[p++] = encoded1 << 2 | encoded2 >> 4;
        bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
        bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
      }
      return bytes;
    };
    var arrayToString = function(array) {
      var str = "";
      for (var i2 = 0; i2 < array.length; i2++) {
        str += String.fromCharCode(array[i2]);
      }
      return str;
    };
    exports.decompressJson = function(compressedJson) {
      return arrayToString(pako_1.default.inflate(exports.decodeFromBase64(compressedJson)));
    };
    exports.padStart = function(value, length, padChar) {
      var padding = "";
      for (var idx = 0, len = length - value.length; idx < len; idx++) {
        padding += padChar;
      }
      return padding + value;
    };
  }
});

// node_modules/@pdf-lib/standard-fonts/lib/Courier-Bold.compressed.json
var require_Courier_Bold_compressed = __commonJS({
  "node_modules/@pdf-lib/standard-fonts/lib/Courier-Bold.compressed.json"(exports, module) {
    module.exports = "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";
  }
});

// node_modules/@pdf-lib/standard-fonts/lib/Courier-BoldOblique.compressed.json
var require_Courier_BoldOblique_compressed = __commonJS({
  "node_modules/@pdf-lib/standard-fonts/lib/Courier-BoldOblique.compressed.json"(exports, module) {
    module.exports = "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";
  }
});

// node_modules/@pdf-lib/standard-fonts/lib/Courier-Oblique.compressed.json
var require_Courier_Oblique_compressed = __commonJS({
  "node_modules/@pdf-lib/standard-fonts/lib/Courier-Oblique.compressed.json"(exports, module) {
    module.exports = "eJyFWVtT2zgU/isZP+3OhE5Iy/UtDaHNFhI2IdDS4UGxFUeLbKW6AKHT/77Hhnbb1fnUFw98x9K5fzpyvmZDU1Wy9tlxdnUenChlZ3e//+awc7B32D/Kutmpqf1EVJJeGJpglbQ706VWX4JshEHrX4Wdn4SiUnr7q5jga6nKdaPvXBYqVISMvdAqH9Slpjd3dvuEuFP1KIsL5fN1duxtkN1suBZW5F7auWxWjx69rAtZzEwl6hc73741j9nx553+QXenv9frHr456h729m672YJetVrV8sI45ZWpG0W93k+Cy7XK72rpXHZMK7MraV37WtbrvX7V6/VIxcR4lT87s9naxovOH/mfnd2jw6MuPY967XO3ffbb5+v2edAZFGYpO/Ot87JynXGdG7sxVnhZvOp0Blp3Zs1urjOTTtp7QknbiN4qVF3O87VsQ9huMveiLoQtvkvpxaHYvH+J6d4+Be/j9//e9Pe72cDlTZxsdrzfP+pmJ/LH/zu7ewfdbO6L99e0crf98+rlzybY59JblVM8Pn/Nrj/S+iZeEzLEbQSF4Vv3f7B8zLWoYvxLMOToUseSOlTLJs5lHcsKo7WwMb6RNm/qNRKIikSOogMsaBPG7CesrLVcIRFYJlyzo7tjVungYjSnNhMxvN5u1pLxnlxRhvHEaeHWMfwkrYlRUzNZ8g/Mm35tJfPuipqWQdU9865Tjwwo7znvJB/TWnEG50YbZg8nKwVEuuniWOmXIJgaLK2kPmTcJBJzLVPEuWdsH8TQ2xgaxtBJDI1i6DSG3sXQ+xgax9BfMfQhhs5i6DyGJjE0jaGLGPo7hmYxNI+hyxhaxNBVDF3H0McY+hRDNzG0pJPoTnqeNpYkA336sg5ySq5UrmweGBYNDWk7OjiYFmn5jTeG4Zwl02MM/zIdxHAB01AMy8WQiqF/YoihV6aFmWgxXcvQ3oYJZQwx3MDQCxP7EEP3MfQQQwyTbhnS5+sLFMKSO0zb91PV6JUu4FFfmAcmzvzp3ByXuplX4hJqpjqWZ7fc2bHSxir2PAC75MHSMZ4zAWzbxql27oRTCx/NMiiSVAZQQCNuN/6NGIR+xXTHiil8GuRYmilEWXJH2jPOjmLPA0eTO2kl0/s0C4nSig1HanQJkIwX/4V3KVwiwmkpCNGPBAC51FptnGIalTz1axPQpPh86POlTQHgRh+RB88NLi2Tr7Rk2hn0VSVyy9Xw0kpOcWG8yPl+K+iyJVn/LduFOV3GaOBmuDvUpbCh0iIwakxJQybD0rlg/ZAVX7ADZuQxtljRjMcPhWfggJ0inFdQEckFzWoQfLyb2ZLpTg30GoQzu1Nr0lWWSp5J2hjnU4LyE6BoQjqjEqTuE7agUPeKq+ZPwLJBqjMEWLRILdqCRa69dqEekaktF3yfLHAYBGqGBbAuoAUjrOSECIK7fyQdzb9/r2BUIcrJQR0IPi6TpAEa1Shg1MvkbkO0G2DVUYInHXDTQUJUQLs2T7IuGcEMqHiXdDIkmyQlHKCUWmBIDn29SUTucm0ss9kUaZ+BuM0BXgBrF0hB4Cuz/bbhQjvgMDPRFJTgAOGAVqugvdpoZswMwMFL4CCNWl4JXagVc7vaYmqYAD0qVSyjZJklTh0syoEdNaJBlNAJCNAYbNR8eaOBgfv8trTmTtbsHcjKUjkw9b4DyR6nGCVQV/NXkRGoKQscMigyN2DBDYjYy0cu8Als5JkJZQhJQSd5y6PRD56OSDBA40OiKkGAn1BrIN1TlBF09KBMOaQZOzFNjiXAwxOpPZMrz5O0fzAJRsSmVcwnDQUsMuk5c4RCX4AJp+VxKmBLhcyYNk/UK1+RH5J1fAYS560oZCUsY7lMsMIYRGmMCucMWE1BWwvNnAzNzQQ0uElVVA2mpsVv8gfiI5FDJeBScuglq1xS+SDMk6mbpi0viCW4XzsMSNEQGBEgmxcq59JwAjaySW8mID8G4LN0WSelA7DnAHI0P3NNwT5PiQ4ZodMe6b5LugIGgXGyFYAJPn25MWWT79pw30cwlwYsoq3Qr1XpCy13kD8Bp+rkVhRyfEIo1OOj0PwOedvNPkhbXwhlm1+Pb7/9C/NFF2U=";
  }
});

// node_modules/@pdf-lib/standard-fonts/lib/Courier.compressed.json
var require_Courier_compressed = __commonJS({
  "node_modules/@pdf-lib/standard-fonts/lib/Courier.compressed.json"(exports, module) {
    module.exports = "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";
  }
});

// node_modules/@pdf-lib/standard-fonts/lib/Helvetica-Bold.compressed.json
var require_Helvetica_Bold_compressed = __commonJS({
  "node_modules/@pdf-lib/standard-fonts/lib/Helvetica-Bold.compressed.json"(exports, module) {
    module.exports = "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";
  }
});

// node_modules/@pdf-lib/standard-fonts/lib/Helvetica-BoldOblique.compressed.json
var require_Helvetica_BoldOblique_compressed = __commonJS({
  "node_modules/@pdf-lib/standard-fonts/lib/Helvetica-BoldOblique.compressed.json"(exports, module) {
    module.exports = "eJyNnVtzG0eyrf8KA0/7RMhzRIq6+U2+zMX2mJYsEuJMzANEtihsgYQMEITaO/Z/P41CV+bKlaug86JQf6uArsrKXNVX8H8m3y9vb7u7+8m3k4t/btazm+7o+PT0xcnRsxdPXzybPJr8dXl3/+vsthsa/L1bPHT386vZN98tF9dn7xfzPzbdrslmseAmR7smR9Bmdjtf9NxqEKbd/Objbve7Dwzb/7ifLeZXr+5uFkPLb45PBrL+6/xLd/3b/P7q4+Tb+9WmezT5/uNsNbu671a/d7vP/vjlvru77q7fLG9nd2Onv/tu+WXy7b+/OX5++uibk5MXj46Pj08fvXx28p9Hk/Oh8Woxv+t+W67n9/Pl3W5Xjx+D8Pbj/OrTXbdeT759OvCLbrUuzSaPH5/85fHjx8NOfl0OQ9gN5/vl5361G8XRf139n6Pjly+ePtr9+7z8+3L378vH5d/nR6+ul++7o9/79X13uz76x93VcvV5uZrdd9d/OTp6tVgcvdl9z/roTbfuVg8D9YDO10ezo/vV7Lq7na0+HS0/HP0yv1ve95+7b4ZGi6NXfzua3V3/3+XqaD58wXrzfj2/ns9W8279l6GzPw67up7f3fx+9bErc1B68vv98JHZ6rqqQ8PvZ5//Pk7J8+MXjybv6tbTJ8NcvFpf7QK9GsUfOtv+5uTx80eT3++v/z6dfHu8E4f/X+z+f/p4P1//7O5X86shoP/+n8n03eTbk+dDo1+Hrqw/z4Y4/u+jPX7y5Mked1+uFrNb46fDPBb+x2Y5xOv9wpSnT5/tlbvN7fvdRN3cZe16uVjMVsZfDBNT+OdudbXL/yo8PznZC7PbQVoP8THJOlx6UGY89/rzbNXdLboPLYk+VrsxW+++cf3JO/5iHO7nxWadu3A1lO0s7+Jj//ljd5ebD0OZL8VI1ovZ+mMO1p/dapnp8q7L8H4rWt5/XHWi7YflZiXo/EG0Xc+/CNg9dGJuuxBTT4f5nUirq+VieZfxurudR8lmYLGzgUS7PzazRcY3q24oZx/ms+PjmjTdulhNVV4+fzrOvci+Vxl9l9H3Gf3ge372fI9+zJ35q3+wpsLf8nf9PSfMP3KYf8of/Dnv8RcvvRryf+YP/pr7dZYH9Ftu9Tp/15v8wd9zv97mD57nD174rJ2OEz3Nrd5ldJn3+K+cfO+HxexTdx9sw0L+ftBinfLnoqdYKs7WV/P51Xx1tbnNs7bZ2fZ6WH+6vMfib6Ez9rFZHs/73Ooqt7rOrURxfsgfvMnoY+7yPKP/znv8lFt5CduScJv3eJfRMqPPouqz1QsLXOdI3Ofv2uQPPuRK2OZWwkl7R7vjnmL6uau7/IqJcPLicc3KVaP9oWy8ny+um0v99XIrzD2szh6x+3Kc5slxXCvuw+7AEH3Wx6zWjg+L5Wou+LprfMvVZjUs41cewJMnWDbreTl0TdGtRy26rG4280G5Xd7rI4edXL74K3IMvSXOh7lg4vhpOJSThwPXs5ubTqTtnuOhGB1w7OauW3Wi9odjodnNavYZTO1pzazhdKITPujhfT9bH4jwYXWljxVsAqI+nBSMnx8Oseef1/O1kIax3n9cbsKxYlr2Q3L7zK1mD6IeZlebe3XoUrz8w6L7krVGZd3OrlbqcOf9qlM7vl7ez65Cxbk0H2YSA2DKCuvQO9tdDyFVx6ibu5vZanO7mG3EbpY3w2HmJ/F1MxwHzMttyFkXXvlhz5PnI1uurj8Mx3nhwNCPUOIi6wcgkfsezmAPz57aHm4Hp9sscBe2sszEYnu9K/r1Wixgi7hjX3kityOSpRjUUJ/DKfGQ9+Ic4h9pSt0JYgb68h/zxpcmOan+dXH2/Ogo96AuF9fzhzkktH8k9swPmEVxeLcbHzo/9KG+EYN1OfeiMoGh5q/0/YVScdyeiBnVg38m9s5ngj7gZwFpJ37OMHgEnIScVCdWA33+5HkVx6seYlfkOr52xjzwUeq4/Ko64OXRytFoqn6kL4djp1Ktb4vGCuFMVgkZooe5Zk/0w9e499OX9dRz+Wd3dyMy903chZ/FqUF6chwskkOZ+4oXEjuabYz1isfq5z85chbVtx+XKzGqM9q7h4GqwE70qOBP6yJGYbNqoh14xPTiVi5wrDflKGcl+htT0KPY4tFWzQRvN4v7+edFL/rVKP+3cYCWSMPx1v18trief/iQ56pvW8OvcT+esCJZvDYOptmBVactXTXGe9eywVbG/BoD5Ish1T9efhuOGPAanJ0CrZafujs8ETJzXHU383U89PUSjZMNy3Gui3qosd4MVR3ORzzYdAxphdmIzLKV6v9qfOBfVOGnL+uxa7nSFa+DWZx/vP+Y4fdNA1wo37Kx3DdMpmuuji3hVevw4UBWxgD7+XKrNHjf5gqtGWktPa1ldN3ac65j2/fBwxJeMetxQbe4FwZ+H0zaPXG7POCIqWv2dbcbMZLGGr6Ux5leC3zwY1ef4hHOiyen4ONDAq+GRF7n7/ud8/W0Tv6isZD8fHD9/SVOnJ9K2H0dZYrJFtwyYpict2r8l9hti8MQtY+zBSwNtch3pyaxwn0u1BJgvhwPmzzVvjKBjVLoWgO6iWaKAxqnVc2qPhv5XR4gWgbLnltCXA820amMbSz531MnbOEitzk1O7+eXymj/SF+ERyYHTrc/ZUOa627jXl7czivD+7rVeM7XzVNOp4O2AzE73EjPnBA+WNruad9+yVieXZnB2TxSMC+7WAp0ASZXx7c02J5s5vvu6UI97Jtppu8jtUMGr6qUck3Bye3g5XcY95I3zu5jtvFnbt80Oye31ruftzs7kb+59Hk525199tsvtrdQ/735NXubvXk0Tenj//zaNzau0dA+35GNJo6wr8NW099a+8qAeHAUDgL33OWu4BLb+A2VYHu6z+g4DxBGUMW2P7qUED7wkH0Omy9HbZe+laNGaIwehfOQyzO6+gBhdEDh9EDraMHRKMHxUYPbKzrwIqdILkYtl7Y1nTYemZbl8PW8bFv1iEhg74D3gybT3yrfhBQiAVw+D6gNRaAKBagWCyAWSyAjbFw8hAyYRu0Pm7lEfW552MjLE1DVBzGqUidc6VWBcrVENWscVm4VT3L380lbFzVsYm5mE2iijauy9pkrm0TqMCNU5VX/jojqHdDVPTOVeVX9TxHlD3AuDICE7MbmESWYFz7gslsDiawQ5gQbaJi8IqKwDAqQtcwxtZhgvCPqoGJGKK6M67sxMR2ZbKxGNfuYjJbjAnsMyZEs6n4ISfkNrfqBWoEQrjQaAboQoaovo2TCzlnF6oKuJAhciHj0oWqepa/m13IuHIhE7MLmUQuZFy7kMnsQiaQCxknF6r8dUbgQobIhZwrF6rqeY4ou5Bx5UImZhcyiVzIuHYhk9mFTGAXMiG6UMXgQhWBC1WELmSMXcgE4UJVAxcyRMVnXLmQie3KZBcyrl3IZHYhE9iFTIguVPFDTshtbtUL1AiEcCEMDVpR5FTpUSRTIpGdKchgT5GTR0VRGlVoctbYH1tWFJVvxRbZvKJODhZFbWOxDXtZVMnQokiuFsTXDQ7+FjmZHInK6UKT88a8sOdFURlfbJHdL+pkgVHUPhjbsBlGlR0xqtEWgwbeGDgYZODoklFgq4yq8MvQAEwzcjKMKCr7jC2+4itspFHUbhrbsKVGlX01qtFcg/bQqItto33f4ofiJ1zXCXouUjIqlMhvg8RuCyJ4LVJyWpSkz0KDM7kf9liUlMOinv0VVXJXlLS3Ygt2VtTIV1EiVwXptaTgqEjJT4Ok3BQanMvYs5OipHwU9eyiqJKHoqQdFFuwf6LG7ola9E5QwDmBgm8CRddEzJ6JmnBMkMEvkVK1o6S8EvWDXsA+iZJ2SWzBHokaOyRq0R9BeZAZvpVte03bkRKuOI4eLdEQmYpxMkPn7IRVARs0RB5oXBpgVc/yd7P1GVe+Z2I2PZPI8YxruzOZvc4EMjrj5HKVv84I/M0QmZtz5WxVPc8RZU8zrgzNxOxmJpGVGdc+ZjKbmAnsYCZE+6oYvKsiMK6K0LWMsWWZIPyqamBWhqj+jCubMrFdmWxQxrU7mczWZAL7kgnRlCp+yAm5za16gRqBEC5U+4o25Iwq3AUyIhDYiUwCK3JGXuSCNCOTz8T3sx25oPzI1WxIrpEjuaAtyXX2JFfIlFwgVzLhtWDgS87ImEBQzmTyuYgve5MLypxcze7kGtmTC9qfXGeDcoUdypVoUcbBo4yBSRlDl3LINuWK8CkTwaicUYG6oKzK1QP1y2blgnYr19muXGG/ciUalvEHkatb0a5XrBUT4Vq1Y+hazsgIXCDXAoFdyyRwLWfkWi5I1zL5THw/u5YLyrVcza7lGrmWC9q1XGfXcoVcywVyLRNeCwau5YxcCwTlWiafi/iya7mgXMvV7FqukWu5oF3LdXYtV9i1XImuZRxcyxi4ljF0LYfsWq4I1zIRXMsZVagLyrVcPVC/7FouaNdynV3LFXYtV6JrGX8QuboV7XrFWjERrrUaf9HDd1cJmUDF5FeG2a1GAbyqEnKqiqVPjeJZ+l72qIqVQ1Ut+1NVyJ0q1t5UVXamysmXKiZXGvHrRMCRKiE/MqzcaBTPUwzZiSpWPlS17EJVIQ+qWDtQVdl/Kmf3qTx6z0jBeUYCvjMSdJ2K2HMqF44zSuA3lVBlVay8pmrNmmOfqVi7TFXZYypnh6k8+stIH1LWbVObPhM9euEqY66jrRiiwjVOxuKcnaUqYC2GyFuMS3Op6ln+brYX48pfTMwGYxI5jHFtMSazx5hAJmOcXKby1xmBzxgio3GunKaq5zmi7DXGldmYmN3GJLIb49pvTGbDMYEdx4RoORWD51QEplMRuo4xth0ThO9UDYzHENWecWU9JrYrk83HuHYfk9l+TGD/MSEaUMUPOSG3uVUvUCMQ2YW+G+iruBU/W1B1DEAipIXrPcRAFkRBKoziU1gITSG1fB3tquvYtyydHIXuAscEc1q7C4imHBQbCDAbCLBxIHvywxj3U9+KbvoDxh2Q8NYfKO5Ao6P+EOIOzLoLbOwukGibP4wl71vTsLUr9Oe+VUcHCLrsdP97bHVyd2T8yTVDo/9i+AxRDI1TII2raJqYQ2oSxdU4B9cEjrAJMcyGKdaVX2Q0zQhCb4jibzxPQpVoJipO01FeCIzTURFPR+U8HZXL6aiimI4q8XRUnqajCmk6qkDTUTFPx8gvMppmhNNREU9H5WI6RomnY8Q0HX8dZ+KFb9VdAarxBxRCDxw6BLQGHJDFGpiFGdgYYSA1uI524zzxrToCQHUEgMIIgMMIgNYRALIRALMRABtHAKSOwFGdrePHhmymRvbTOFUnvhUH+hNOFSAx0J9oqoDGgf4UpgoYDfQnmCogcaA/wUCd2DgdbeJWHuamMaaNHNMmj4kPyUARo92I0W7CaH+e7E95nvhWPC4qSBwEFZ4OggqNB0EFyQPJotDhUWH1fAZQPBbaoXLc8tS27FjIUT2BQRQOj5zj4RFQe000YDtqcuTHRs782MjYcjcC37JIO4qRdo6RdmqRdsSRdsUj7cwi7cgibWgT4r7J+aHOO36eqFOOnyfpbONnkdWgiPzg04ufJ3xmsSO9LVBlKy7RBaWFNryLH+qCBAoBqSoa1CQHhhpQjEjV4aJGHDmSqchIpXqLKiQ/CVSFpFJBsipqk5rkMuUGuWKpBRUvqVzHJHNJRxmqmwQqdFJVzVOTXP7UgJyAVG0K1Ij9gWSyClLJNaK6aSUSewmpXy8k4TDU4GAhNXyHGh0upORGJEdjiiJ4FAlkV6Qm5/plgtfwyla8fLdH4srdTtgd3o+XnXabUztG3W2VC1knvmklDgzr0nH8Bc1BOo2S4H6N55dJurzzy0Rd2fklv6PqiIJw8B1VUzEc+Abni4gwMPkNThZEiKrWilPQW2KfA8Fha7/1+EvMK4ggCRRHVlU0YxuMaVQgslHA+JLCUSZZxDq2aEVctDrcpG+FkuegXcBjg9FecQ4MUfSdq7hXFSNeGcS6IoyyMY6vCSKyVWvFNOgtsc+B4AgaT7EbjtPKCeZT34q3HAqKd4MKEjcgCk/3HgqNtx0KolsKhdHdhMLCjYRC6nrp6K2Z+RnOOaIw3S5chO+Zhq13Ycuv0JxN0sWZs4m6LrOj9dzXd2nnviOqFgPTYIjmwjhNiHE1KybmqTGJ5sc4T5IJPFMmxOkyTHOG6w6FgWevse6QepG/e5rRu4xgWtNCxDxPcJVolivmqQ4vU8F8R06THkWa+Siq6Y8tcg5EnRIhipwNUeWUiGrMi6hRcqT3OlX0OE0Ovdepmlw09jdt8HcNDvmjX2+UYs6koFM6BY1zCl5EgYxCSvmEEmUTSiqXUM+ZhCrlEUqcRahxDqEWMwgVyh96hy3HiXOn/Q5bbnAh9zOV9J2kkDHq1S4h5WwBlXIFFM6U+qYApIkhyhHjlCDGVXaYmFPDJMoL45wUJnBGmBDTwTDlAr7sQ2HgLGi87EPqRf7uaUbvMoJpT+/GMM8TXiWa7Yp5quO5Oc44KzTxLNP8s6zSgNvkbOAWlBQsc26wzinCeswUVilhSH7bjCmnT5JVFlGji+Z+p03lXVOBDGOFEo3lnG/UgtKOVM4+e7of8s4ZZZwLlGsuqCxzNeeXa5RZLnBOucLZ5ErMI+eUQeFFHo4IZ03rRR6WL8T3TwV7JxjkRX7fJQk5F0yjLDDO819PN2H6DdHsG6fJN67m3sQ89SbRzBvniTeB592EOO2GadbxGgSFgee8cQ2C1Iv83dOM3mUE050uSjDPk10lmuuKearrU2Mw1YZoqo3TVBtXU21inmqTaKqN81SbwFNtQpxqwzTV+OAnhYGnuvHgJ6kX+bunGb3LCKY6PSfJPE91lWiqK6ap/m2c5fHJhN9whpHV2UVGT9a5EB6tc+zP1jmDR+gcwjN0Du0hOkd1BoH5czJlK14xKyg+0ViQuKtSeLquVmi8f1IQ3Q8pjG6CFBbufBQS7yr+BvM2Xk3codigy4Oy+4iI9KA6OahwmxBwHmsnxtqJsS5Ditn9PkDika/C062cQuODXgXJh8OLQk9/FRYfCS8oPtv1G1bHGP3XE3zEtGzFR0wLEo+YFp4eMS00PmJakHzEtCj0iGlh9IhpYeER09eeRj6MOrQ9eTPZ382HrfhsTkHi2ZzC07M5hcZncwqSz+YUhZ7NKaxOEaD42NGb0Z9hq2Y+ouDKLpzHrTze88Z4z+V4z/N4eSJBEeM9p2eR3sBEOvFl5M0EHzJ8M64Url3GpfkNrQ8jrVcxYfYNUUiMq7iYmINjEkXIuA6TyRwrEyhBjFOW4HVoRpQvjevQpJ4L1IiVzCET27HibDJ+OFYpr0zg5DIhZli+1G4Icg2vq1Mrzjp1XX2U6oPEkHqGKJzGVThNzOE0icJpXIfTZA6nCZR6xin1Kn8rEKWec5V6VT0XqBErmXomtmPFqWf8cKxS6pnAqWdCTD18tJ0yBFIPH22nVpx66tH2KqXn2E6kwKE98BybbiLCrJ9j02oj5I3n2LTMqaqfY5Pq26bAyXvoeQfZ5rwpHIy5TurY5GsxTwke1f+fmOdkj3JK+ShT4qcHQWSWYhGk50DkJ1JBNJ8C2TcYpruc/b30rfoNgOoZE6AwKcBhD0Br+AFZOIFZDIGNgQNS89eRv6D6FksYkDjVeEvFCjSearwVZQkKnWq8xQIEFE81dmh3jvfCt+K7GgXFdzUKEu9qFJ7e1Sg0vqtREL2rURi9q1FYeFejkPiuxg5dLRc08nru6m12n3jmW3WUgKqxIMJRAodRIoVTV8B18IBs8MBs8M4+9p8/duWc68TYMoxqmWdr2ZiapZyaZZ4aPp0FRUyanc4CyjNkp7OOVnErD2QVvdyFdXc7z1O+CaW4yfaxaXjFRnrFJnsFP5IKinCRjXCRTXKRbZjwPm7lJO1z5uG7iC8JURDSu4jMVYTUu4gsUazyu4gscGz4XUTG5LV4/H5KiFxXH7+zmP03Hb8z106cj99ZIE9Ox+/EwcUMUa0YJ582rhzBxGwLJpE3GGcbMIEN3ITo4obJKPy1z4UKHZl6xV2uBbZ34+TxzoXRm9iuOWX5ppHvG2fzN4FXgCqkZaAKyxwMXhCMH8oBsTSY1MiBxiJhcitFeLkw3kgFXjgqXwnUGLpeR6oqFpMqwYpiqOGocm0xse2cvMoY10uNyS1jTYuOCdpYtznbeoEa5aRWo3Cgj2tSFDiOUeX1Kaoy1rGJiHhswHGPagpvlFOQo0yhjiKvZOlywKkUeFU7cDlANxErnL4coNXGate4HKBlXvn05QCpou1HgYs+qrwiRlV6YmwinDE2YH+MarLBKKf1Msq0akaRDTOo7GgkxnU0vkjXquW0pkaVV1ZS1foam3zNS+RaG1vwihvVtO5GOa2+Qc5rcHzJrhXOtB5H9esZqNbm2OBgBrbW6djocJqmNTuqBxMxrd9BXTWFg2FrrOihjVrXQwNc3aNwcG3SK31s8rXVJ636UW2s/bHR4SUqHwdE+dAStW3VQN8UDlpDPko4n+ATPed4PAAoPsdznlZ+4Ol64jmu8YDomZ3zsJoDC0/qnOO67aja6BMj9EMo9XoyjrXx6o1zGvWhV29czONvvHrjnCPRevXGhRiTxqs3xik66ZWVkTdeWSFOwTr0ygqJKmxfeWWFdArgwVdWSOVQHnhlhTQKqnx7Q0WQwyvf3giUQtt+eyNIKqwH394IKoX0wNsbQeNwNt/eCAqFUrzakGPFYcyvNjiiADZebXCuQtd+tcElClrr1QYXOFz61QbHFCh+JYBCwSFqvhKQFArY4VcCkqzC99VXAlILCuZXXglIOof24CsBSaVAN56F13HlsItn4YFRqFvPwoOgwnvgWXjQKKTNZ+FB4TA2noUHTqFLj45zVDhc9hPbEC5nFC4XKFwuqHC5msPlGoXLBQ6XKxwuV2K4nFO4TKBwGedwjb8cDMGqhEJVMQWqYhWmquUgVYVCVDEHqHIOT+UxOJVSaEZMgRkpheViDMkL34qnKxcYCkDibO+CQgA0ntddhKEDo2sIFzBkIPEkbYf8Z5nLVpy5guJZlgtncSumQkFivgtPc11onOeC5O8FF4Vmv7B6fgooTu8O7ab1mW/FU5aCaggAiesWhadTmkLj9YeC6KJDYXSlobBxxoDUETiKp7MXk/SI9g7FQXd5cuxKDSI9X52cr3AhBnCexk5MVkdlumN2ccWzc3dB5aVvxVPygsR5eOHp5LvQeMZdkDzNLgqdWxdWcwxQvJR7MclPbe9YvhCxo5sws5ucjZtG6m1k6m1y6vFlBFBEUm5EUm5CUk5H14Ot2Ospuh4gMZApuR7QOJBpcD1g1N0puB6QWEPTCT5wN0XvAiQe85qSdwGND3RNhXeBQo9uTdG7AMUH46ajd536VrwZMEXvAiRuCkzJu4DGy//T4F3A6Fdrp+BdQOK1/Cl41zEQvAo9Ha1r/yNlU7QuQPZ2CaD8C21Tsi6k+HaJ4/gTbdNgXcD87RJjZl0+1GVIuGUukmWjIpayIpa5Iti6QBG1YtYFKBcGXaidknP5vO2c69TGb84FKCaec0w8p5Z4jvhmkyueks48JZ3VlDTSh3rqc933qb4vR8Mbf6npEh0Pmb2RBiy+iAMCvokD2F7FAeZv3AD0V24A1nduANkbac521vfct+KLfJfJ+oCnd/su0foA0cSBYoMBVvMSUO22o5ktsJdofYDizeLLZH3A07HBJVofIDoCuAzWByxcR79E63NUS+gpkFv8ZebL0fte+FY8n7hE70OUzycuyfuQgvcBjqcZl8H7gNFpxuVodDAEczpk6tXMS/I6xPRq5qVwO5T4rc1L9Dtk9Ibm5ST/GPYlWZ7P1yY22oiBbloD3eiBbsRA2fdQUgN150MYX0+9tOv0YAbpJkQS2NP0bYikCndLNyKSkHwu34pICjleuhnBAnhfeseMuXJB9Y4ZS+SHrXfMWGZnTO+YMSePrByM0hC5pXGyTOPKN03M5mkSOahxtlET2EtNiIZqmFzVbzKFUuV7T1wDYHOGyGmNk906F55rYjZel7L7mkYWbJx92AQ24yosxaCTLZsgLctU4VumsXmZ0HAw05ONmcKmbQI7d7qTyILw8CptRPPk5iYcjI/yddNa8Wk5vOnN+GSvN4UMn275VSdU9/yUxs7fvOunGgj/V/f9lJZWAXnnT4m0Fqh7f0KDFQEpLQooqXUB9bw0oEqrA0p6gcAWvEagRssESrRSgASLBVJaL1CiJQMltWqgnhcOVGntQImXD9R4BUEtLiKo0DoSbgYHxxC3iUWBgWkjpTUFJVpWgiRWFtTz4hLUvL6gTEsMSrzKoMYLDWhLHZK03KAmHRUbCFNFmX0VtYa1YpPkrijyAoQar0HqUQGhiZUI1I3+UFqPUPtaANWqhPKBALbWJmxyKIB5hUIxLlJDOU38V0LKlv+uj6F4/8mF3d8k3P+Vh93WNmz5dZ6yFa/zFJSu81TXwx4Zom4Zl32rKnSwom1Gfe4B99d47vTYMey0Ieq0cdnpqkKnK9pm1OcecKeN506HZ5Wg55FT96MoxxCawEAC3zZ43+gfjyuKeXCQ7jA0pDQwlOSwoAEMCuhW0l72iYeDUh5MfcwHRmKIhmFcjqGqMICKthn1uQfcb+O50/bYB/TaGXXbBdlvk6HjxraC9aIf3HcXcuftIQzovDPqvAuy8+HP048dDX+enlkv+sGdl3+eftTGByWg65VQxyuW3Ya/ej12EP7qdSR92jd3V/zV61Gpv0AHvTVE3TUu+4t/JHfsHv6RXEJ97gH3Wf2R3L30fqAL23PZ8uMEQ6qXRfCDm4o24avp7+G9T8cawGXf6O/hvRcHFKDQjdD34fABWPi1ivdjpH2rj1t5DDmOVwP1QOy2PgXtk/oBkasx+LAV93WVgw9CvMV7NXbce9DHmbyijo+0Hgt8zAiGYEj2pqoLgWhExg9/EY0Nj22okzxKdWwzSvbia0YwVEOyh1VdCERDNX74i2io+L4kdZKHqt6XrNJwWrdYzGiwBnG4DnU/TV9IyIN25WtfxwM3pVddToN3JQ9/f3I0WX+eXe0+cjrScsKd/2zNSZYbWvzC4fRscm07LVtX+79dC8hN/Dr493UdqG/ZCB3h0PZ03APu2BDtvfKH/OltRr1A1CPjqVu7ihuDtN85Xko9MfIQPrANW1/CVh+3YkdSfe8pXacfO8IXdk8ifsif32b0JaNeIOqm9KK9RD8+MPaVX08/ifghf36b0ZeMeoGor9JMRkm8JlI7rN4SORHaQ+Prtg3+pcH7FufhtM6qRj1fiBtHJK7BnCTlQX7RVtIvkvaa0igaJ1NV9WtzPAhQeBQgPejv2mr8ReO+gXkoqOWx0Gsh4zj4rZCTiB/y57cZfcmoF4j6q84HR4lfDxg7m94OOCH+IL5iK9gXwXrFqMvyNHDU+Bn9sc/pEf0T4g/iK7aCfRGsV4z6LM/+9tqHCV4kr6SLW/GooKB6LRxR/gHjwtORw57in5R1HH/XuCD69eLC6NeLd2xpRzllKx4yFSROigpPJxqFxpOiguRJUVHopKiweOhVUHw69MMkXIKuiA6dnkQh0Jv9XB37xjhsIONMIYE4APYwIPRpAjrGBkgNAKA6R478pF1cXmheWqjtYKRG4nANxzE7zgM3LY3elRQCk2IcDFMwjFNE8mXgm8Zl4JuDl4EjhDDpH4HQYgzZgZ+A0C1S+No/AKEbxFA2fv5BqxTWqN60wsQhJlUFuv5JzRPfijbDf0hzTz+N7rR33E/oToCifTpPlv0J3QkQ3wNyxR3UmV1VcmR3yvYo/0qGFmgsh34lQzfJI2z8SoZW9bhbv5KhZYpG41cy9uoirM6LsAYv8uq7kOvuIp8HLfJJz6Jx0rNon/TEKwL49fkHIbRAu2r/IMTYoP79l21GvUD09ervz+6l2wle6SxbsdoKEot64akKC42LekFyUS8KLeqF0ZXOwsKVztsJ/tndWxwxIOjdnt5N6k1l24pHXXdpsMDTIdbdJNwwNiT/RsTdJN4eNkZHWXcTvBlcye7g9dS23B7FPRR99+QuPuEVEQWh9XxXFHM4xNNdkevAqGe7osAhyk92BQzByreS71K1M8+xw9+7OyZEsdO/d8dijl36vTvmOnb59+5Y4Njx790RhtjhJRcKBMdOXXKpUvpNoWMpcBwP/KaQbiJiqn9TSKuN+DZ+U0jLKdbyN4WkiHFPS4gMZZqD5hIyNqj3zmAODFH0jau4m5gjbhLF2riOsskcXxM4sibEmOL9xtOI+hwIjmD75uJygnfWlmEd3m35H25ahl0t816WegfoXYRgV3gR90ls1ecP8p7bDrdMVzgVh46kK5xPRPu+8T3cr688NwKHrtg1ebkSKXRLPvsRKHXp4LMfS7xqRwi6glftnsRWff4g96D9FAcdi2MvSIHOkAJ9IqVvfhv3kOXc0XC9kBl0LlwvfELtevFZ7sqBx0bqWQf2IR9MG4Ie4PE1fZD3r46vRwktiRDsviLYfTauZcO4lm3j+jzB84PP+FlA6aygXjBr3WGMekuM9xjpq0x94eqi+3Bfv3T//29On5laP3gdP2S43jMUmt/wjTjGMWrqpm9sEa89Bi3ERYxhFcNiuHZIafVqsNRCZ0WL3dw+E7juUGnxF0tJqzettRq6o1rkya+SF8oQpN2zHrgVJ6yg2ktE1jmA4/X3Z0aug27p4+jG6qFs2aUsR3T9ygR76d2/bBm38kDUlfPCU1EXGk+yC5In2UWhk+zCYvYWFK+c75BdOfew/REarMO419FcVphFiGx+EDZieV9v5ZSN0Mr5Q70wudobHmyEC7KraHcjtNvtPjRDNFHGKe2cc+7RvfwayYqvc0tORXum2uNiiJLSuIymPSFF6Vn5UqDG+GW2mphT1iTKW+M6eU3mDDaB0tg45TI/O8HT8Eduus6B4/w2TknunDPdlUMT5LltRCU+nDRQJveZxDoQ5wKjYs9zeEQMUTIYp2JwzsXAf6niWcTXuSUXQ+VQDIaoGIzLWKc/HkE7WArUGL8sBvW3I1iiYmj97QiWuRjS345gTsWQ/nYETcMfuek6B46LwTgVg3MuBlcOTZDnuxFVDHAFizK5zyQWg7h8VZVwUQVLIgqcGFHl8iA1FUnUqVSCeN36VCqbfL/uqRK4hA7er1NtUjmlG1xaOBhBXWDNG1y6ARfbwRtculEqPH2DS6tchEFNpRjUP1ofW7emIRVnVLlESU2FSvrX0wDqMnJZunwpVFZf3+JUzK3roHs9Xi+qYUKUH0j0gATYuAcILzXSKfC4Vf525/iinyF/1oc43SIP6oWdQlUyTWT3JyjHM3NDlhzE8UJAlOrZ+3ha/iKLo7LP32EOJ+5oZSsWeEHVbACJQi88VXehsaQLohItjO4nFhbuJxYS6/MBrPeFkZ1/PfGteNPxITkV8HQz8gE9CRAZESj+i2vOquUAquNwRD9dtoWhnRpxa95mP942THgrnXeb7Xbb9NitMNZtdtNtttAtDm0/kN0VZL/vULbirY2C4nN1e5RvdBSe7nHsaXquruB416MguqNRGN3M6MdaeeJbMa96rBVAItV6qhWgMdX6UCvA/Cf8nI21AiTmWJ9qpQ/z0Od56PM89I156OU89Hoe+jwPvZiHvjEPpQie2pYVgaNYBM6xCJxaETjiInDFi8CZFYEjKwJDVN91QcSsMkSpZZzyy7hKMhNzpplE6Wacc84ETjwTYvYZphTkyywUCkgHQ5SRxiktnYvcNDEnqEs5S02jVDXO+WoCJ224dvM0IkrfxrUbEnMi52s3xHVKi2s3JFBy52s3kXOaw006yHSklOwoUb6jpFIe9Zz1qFLio8S5jxqnP2qxAlChIsjvgohYQbohpWpAiQoiSKImUM9lEdRcGShTcaDE9YEalwhoUCVIqVBQUrWCei4XVKliUNJFgy24blCj0kGJqke8BjQmxZ8TeI75T8gBIOGJ5T95xgHzedafNL9Aw1PIf+JsAorPG/8JPs4kdppdPOHcfeHhSUkDYQdnTENK/j3yerLZZRLHZTiOy3Eel2lpXK6kcZkUx2WYxmWcxoUvSXWaxvEFKY4xSnmcQU9jjWoab5DjmINE4w4ajP0///v/AGoZ428=";
  }
});

// node_modules/@pdf-lib/standard-fonts/lib/Helvetica-Oblique.compressed.json
var require_Helvetica_Oblique_compressed = __commonJS({
  "node_modules/@pdf-lib/standard-fonts/lib/Helvetica-Oblique.compressed.json"(exports, module) {
    module.exports = "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";
  }
});

// node_modules/@pdf-lib/standard-fonts/lib/Helvetica.compressed.json
var require_Helvetica_compressed = __commonJS({
  "node_modules/@pdf-lib/standard-fonts/lib/Helvetica.compressed.json"(exports, module) {
    module.exports = "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";
  }
});

// node_modules/@pdf-lib/standard-fonts/lib/Times-Bold.compressed.json
var require_Times_Bold_compressed = __commonJS({
  "node_modules/@pdf-lib/standard-fonts/lib/Times-Bold.compressed.json"(exports, module) {
    module.exports = "eJyFnVtzG0eShf8KA0+7EfKseJXkN9nj0Vj0yNaNEHZiHkCySWEJsmmAIA1PzH/fRqMr8+TJU9CLQv2dYqMrK/NU9Q349+jH9va2uXsYfT86+8dqOb1u9o72Tw5P9o4PTk72R89Gf2vvHt5Nb5uuwafZbbP87od2frnhq/kc+V7h09vZfI1KB8fN7Prr5jOGRj8/TOezi9d31/Ou1fNue/m32R/N5W+zh4uvo+8fFqvm2ejHr9PF9OKhWXxsNn/50x8Pzd1lc/mhvZ3eDcf1ww/tH6Pv//nd/snLZ98d7L98tv/8+fNnrw6P//Vs9LlrvJjP7prf2uXsYdbejb7/rpNB+PR1dnFz1yyXo++PO37WLJZ9s9Hz5wd/6XbUfci79mF2senIj+39erHpw95/Xfz33v6rl8fPNv++6P99tfn31fP+38P+3xd7ry/b82bv43r50Nwu936+u2gX9+1i+tBc/mVv7/V8vvdhs7fl3odm2SweO7oN4my5N917WEwvm9vp4mavvdr7ZXbXPqzvm+/+3nR/9frN3vTu8n/axd6s++Pl6nw5u5xNF7Nm+ZfucH/qPuZydnf98eJr08e/P4qPD92fTBeXRe0a/ji9//swJCcvTp6NvpSto5P9Z6PXy4tNqBed+PLw2eivjW13QX7xbPTx4fLv467tUf/fs+6/+4evtgP2j+ZhMbvoIvrPf4/GX0bfH2wi+647kuX9tAvkf55t8eHh4RY3f1zMp7fGj4+Pt/z3VduF6nzuyvNhR3er2/PNSF3fZe2ync+nC+N9NvTCfbO42CR5UV6Wz5/edtKyi08+tP4Q+jHP2v100dzNm6uaFP/Mjm+63OxxeePKi3KA89XSqAXtoqvNaf6Ir+v7r81dbt51ZdZ6Tw5evBxiP58uv+aj+bNZtJm2d02GD0+i5cPXRSPaXrWrhaCzR9F2OftDwOaxEYPb6Jjeze5EXl208/Yu42VzO4uSjcB8YwSJNr+vpvOMrxdNV8qim7+vmmVvNkV5dVjG3o/9xcHBlr02dHLyYot+yK1+zOiv+Q9/crS/v0V/8z8sqfAmo797mDon69HPuWNv8x+e5oP4xfu9cYcN+kc++nd5X7/mo/8tt3qf9/UBvONkiz7m4/qU//BzRmfCOca52ZeMJvkj/zdn33k3n900D8E3rEjPOy0WKv8dmcrL/WIqF7PZxWxxsbrNw7ba+Paym3xEjfQGFw7GjSpH9dzQURnai9zqMrcSn3yVP/E67+trDtIs7+v/8h/e5D/0Gjbrv81/KFynza3uM/o9d9vNwcpqmY/+Ie9rlQ/iMWfcU24lrHSdj+tPP4hXR55fMREODp6XrFxU2lM2HjyHbHyYzS+rk/1l+yTiHKZnnwoe+qWaJ8d+Ka+rzdoQjdb7rCaPq3m7mAm+bCp7uVgtunn8Yp1TqS+b5axfuwr/365bdFldr2adcts+6KXDRu53/A2ZQl8S52ommFhBdWs5uR64nF5fqzlty3ExRiuOzdg1i8Zr//io6N0S/noxvQdTK3963p0/NKKXHt7z6XJHhHerlQWYDUDU3e67NfbsfjlbCqnr68PXdhUWi2neD8ntI7eYPop6mF6sHtTapffyq3nzR9YqlXU7vVio9c75olEffNk+TC9Cxbk060YSA2DKAuvQD7a57EKqFqmru+vpYnU7n67Ex7TX3TrzRuxuiv2AcbkNOevCa1/3HJpnLy6vuoVeWBn6EiVOsr4Cidw/4Vf4hEP/hNvO6VZz/Ajz5qkzc43LTdEvl7OszCvL85YOtOy9hbQvZd7VZ3dW3OU9jJst5tKQ+tQcM9Cn/5g3PjXJQfXdxdHz1VE6AltIX84eZ5cihJN4ZL5iFsXhh135o8+7/mhNVWiTdX/yRWUCXc279M8LpeI4h8GOnOrB/4ZGyEaC/sBPA9KH+ElD5xFwFhLPMqmjL45eFHG48CE+ilzH14UxD7yXOi7v1AF4edRyNJqqL/Vld+xcqra3aKwQzmyVniGhm8DJE335Gj/9qCyo5u2fzd21yNwPVFF2Gqc66cmxs0h2Ze7r2pAu4oHAUFNf/fwnR85O7T59bReiV7/Sp3sYKlXwMfKTF0P7y4oRfaYP8IjFyS1c4Viu+lXOQhxvTEGPYo2TrRYTvF3NH2b387U4LuqgJ3kcjpJI3XrrYTadX86uxCnWum4N7+LneMKKZPHa2JlmO2adunRRGei7mg3WMuZdpTZ/ph3h9bduxYAX4ewUaNHeNHd4ImTmuGiuZ8u49PUSpbWXT8e5LuxsZNVVdTgf8WDHnPLCrBhaS5Hxuqyk1P+SaR+9KmvX/lJXvBBmcf7pQaxQfqwa4FxOqvvDaD5UTKapzo414XVt+bAjKysB/rNWGvzZ5gq1EalNPbx4t3mk9sm5ju2zdy5LaMbcL+uCZv4gLvg8BJN2T3xqdzhiXuKU3d2uRE/iEXmo5DrTa4FC71ef4grnxTH6eJfAiy6RxaF9TCcxNjFX5t9Tlcd+ihEHzk8l7MaOMsX6QuNnOn80XqvxX+iwSxy6qH2dzmFqKEW+OTWhS902FsrlzZfjsslT7RsDSOsgCwLPz3beHs0UOzQMqxrVqZzrP8oFomWwPsWxayGdTaibHm1lyv+xchAryvwyEF2CzC6U0f614o2Lncvdd3F8/HAr4/Zhd17v/KzXlX2+rpp0PB2wEYj7cSMWE6cvRSrTfc0pbuQC2hZkYSXge9tZCnQIdsVm5yfN2+vNeN+14mJVWzfTVZZKBnW7qlTytTwSu8ICM7nHvJK+d2pXfv3lLi+a3fNrNf7TanM78l/PRqfN4u636WyxuYv8z9Hrze3q0bPvjo//9WzY2rpHQNvjjGgwdYRv4tbWVQLCjqHwa7d15FvlEABBcgRuQxXotv4DCs4TlCFkgW2vDgW0LRxE78PWp27rlW+VmCEKvXfh8yYWz23LBsBR6D1w6D3Q0ntA1HtQrPfAhroOrLcTJGfd1r53f7zZPDR1stl87pulU8jg6AHfd5sHtlt4TuDZdy+OCl6FQ1nlkK0qIVvJkK1yyFbVkK1EyFYiZKsUssfY06dNFtjWOnRwXboECA59oEMjLGFDVMfGqZidc0UX5Y1AVNvGZYEXFarcEJW6cVXvJuaiN4kq37guf5PZA0wgIzBOblD4+4zAFwyROThXDlFUsAlDlPjGVfabmEvAJKoD47oYTOaKMIHLwoRYGwWjpxSGxlIYuosxthgThM8UDcymIOU4RVvlQ2bvMb5rCIQLmVQZgoofmVwbguRMJugheBRRAqMqaJ2Dw5ZlPPvWYB/oW4bIt4yTbzln3yrKG4HIt4xL3yoq+JYh8i3jyrdMzL5lEvmWce1bJrNvmUC+ZZx8q/D3GYFvGSLfcq58q6jgW4aoaIyrojExF41JVDTGddGYzEVjAheNCbFoCkbfKgx9qzD0LWPsWyYI3yoa+FZByreKtsqHzL5lfNcQCN8yqTIEFd8yuTYEybdM0EPwKKIEvlXQOgeHfct49i2MDZpX5ORgUSQbI5G9LMhvapxcLYrS2kIT8LfIyeSiqJwutsh2F3XyvChq44tt2P2iShYYRfLBIL6vcHDEyMkWSVTeGJqAQUZOJRpFVaexRS7WqFPFRlGXbWzDtRtVLuCoxioOGrppENBSg4C+GgU216gKhw0NwGYDV14bGqwqXWPXjeI3h1T4b9R3DWnFiWObnUOaPDmqO4b0sRZhsOjA15XAsllHMTu2E/RrpOTWKJFXB4mdGsQ3mpJLoyQ9GhqAQyMlf0ZJuTPq2ZtRJWdGSfsytmBXRo08GSVyZJDeSwpujJS8OEjKiaEB+DBSKlmUVMGinssVVSpWlHSpYgsuVNS4TFGLRQoKui5g9FzA6LiI2W9RE24LMngtUOW0IK9kV9hlUfrGkAmHRbU+ZBV3xRY7hiw5K2rVIXvUkQRPBbqWAWQ/RSm76dB9tFJD5KPGyUSds4MW5Y1A5J3GpXEWFVzTEFmmceWXJmazNImc0ri2SZPZI00ggzRO7lj4+4zAFw2RKTpXjlhUsENDVFjGVVWZmEvKJKon47qYTOZKMoHLyIRYQwWj5xWGhlcYup0xtjoThM8VDUyuIOVwRVvlQ2ZvM75rCISrmVQZgoqfmVwbguRkJugheBRRAgMraJ2Dw9ZlPPtWOVg0LmfkXC6QdYHA3mXSG8XIvVyQ9mUy+JczMjAXlIO5mi3MNfIwF7SJuc4u5grZmAvkYya8FwyczBlZGQjKy0wGM3NGpeSCqiVXczG5RtXkgi4n17meXOGCciVWlHF0NYNoawbR1xyysbkinM1EsDZjyttMXIlDZ3dzYeeQCH9zrTYkFYdzvTokyeNcqQzJo4oY2JyxtQgUG50L2enKkaHTOSOnc4GcDgR2OpPeKEZO54J0OpPB6ZyR07mgnM7V7HSukdO5oJ3OdXY6V8jpXCCnM+G9YOB0zsjpQFBOZzI4nTMqKxdUWbmay8o1KisXdFm5zmXlCpeVK7GsjKPTGUSnM4hO55CdzhXhdCaC0xlTTmfiShw6O50LO4dEOJ1rtSGpOJ3r1SFJTudKZUgeVcTA6YxtnO6QAmVOlwTo9qAthi9bcTsphFyuYPI4w+xwg/AmE3K3gqW3DSI4WyHkawUrVyta9rSikKMVrP2sqOxmhZOXFUxONuD3iYCLFUIeZlg52CCCfxVCpVKwKpSi5TIpChVJwbpEisoFUjiXR+GxOAaKbjUg9KoBoVMVxD5VuHCpQQKPGohyqEFapUNldyp4R8iFMxVFh7ziSkWthDw5UuEy5I85MuBFA1mngPCKq+C83hpqA23IEPmQcTIi5+xERXkjEHmRcWlGRQU3MkR2ZFz5kYnZkEwiRzKuLclk9iQTyJSMkysV/j4j8CVDZEzOlTMVFazJEBWKcVUpJuZSMYlqxbguFpO5WkzgcjEh1kvB6FGFoUkVhi5ljG3KBOFTRQOjKkg5VdFW+ZDZq4zvGgLhViZVhqDiVybXhiA5lgl6CB5FlMC0Clrn4LBtGU++9UNHX2/WUs9ty5ZejorHAAoxBY7rM6clkoAsSsAsQMCG2AApBe/ocx8p2/L0MxQOF3hISKPlcAHRmINiHQFmHQE2dGRL/lrifmxbFndHFndHMe7OMe5OLe6OPO7OPO7OStydWNwNbUziyPozDluTuGWziyOcO4wO367XecEWDf6MwTJEETNOYTOuYmdiDqBJFEXjHEoTOJ4mxKAapsgWDuEtaJzRRCCKtvEc8iKluPfveMa4F8RxL5zjXriMexFF3IvEcS88xb0IKe5FoLgXzHEfOMZ9QOOMJgJx3AsXcR8kivvfhpC/8q2yT0Al0IBCjIHDJwMtkQVkQQVm8QQ2hBJIiaKjqc3l/VbpAaDSA0ChB8ChB0BLDwBZD4BZD4ANPQBSeuBo+52gXZ8OCol6k/vUlKUkIt2nRvYJXk4OOHe1EV1tRFfbuJWPua0cYCsPsM1H0tK8CIo4xras4QHl2FtJ7G/nyrdhjfI2r1He5jXK28oa5a1co7zNa5S3Yo3yVqxR3qY1ytu8Rnk71MT+sW3ZGsVR6QGguGxxjssWp7ZsceSLE2e+OHFWFidOSg8c0VbugVUAIt2DRvYgVADg3LFGdKwRHWvjVj7mtnKArTzANh8JVwAo4hitAgDlSNOksEGr0GCVO7KqdGQlO7LKHeHTGlBER1Yi2KuQRaej7XWGbQn0W7FseyRqtOepRnsaa7RHdNSgUPX2rIQfUCzV02D1p9nqT7PVn1as/lRa/am2+tNs9afC6k+F1Z8Gqz/NVn9asfpTafWn2epPq1Z/Kqz+NFv9abb605DVpzmrTytZfSqz+jRn9Wk1q09FVp+KrD6VWb054z7yrXjhrEfpslj4KpNQFyRQiZCqqoWa5MKhBlRDpOpyokZcWSRTkZFK9RZVSA8SKKNJpYJkVaQ+NclVwA1yxVILKhlSuUZI5pKOclsVdoZF1jw1+VbH2QlI1aZAjXb3na2CVHKNqIKBkEBeQqqyFWqSHYYakNmQqn2HGrEFkcxuRHI0piiCR5FAdkVqcq5fRsOF8wPbsmvmgOLlchPOwtY4bE3ilp3nOsKTV6Pxy4fLGsmUgoeTh1+GWBxbZywAgPAi8JaGt/YPIqL+197aj+pZRuOMJgJRYNTr7CRVQiTfbC9xwhe6KQYcMfVC9yDFbILgkUAhZFUFMrY5qwnjmjCpChRgUnOYY4NKsEUjDnmuWBlFDn+9YocGg59i+A1R4J2rkBf1LKNxRhOBKLTGc1CLVAlnkDmQRVznGHDwjKewvRttLzNsP7DfssnVkV24chQnWec4szq16dSRT4/OfD3grFy4cmJz4xaVwnwtEPXFOHXIuOqViblrJlH/jHMnTeCemhC7a5j6jDcIGFGf0w0C5qrP6gYBS9TnfIOABe4z3yBgzH0ODvC6KnD/o8pRiKqMRWwiIhIbcFyimqIT5RSjKFOkokjxKvc/XwtEMTJO0TGu4mJijohJFAvjHAUTuP8mxJ4bjn3+dejukW/FmxO/YicBxcc9nKdbGL9irwD5AxzOrC/Ahm4AsSc5DH2KW2XyQhTmLRc2U9axbY3D1pfQchI0m7EApUcEfkWjPSJEYU5Gy1wFXBktSxT6bLQs8CCw0TKm4cAVMSMamMqKmNSzHM9xRl/yH05yKx42tUgepPCmOAxg5DSKUaShjKIaz9giD2rUaWSjyMMbVR7jqMaBjhqNdvrCC8lp3Hd94YVqclYZlXGFf6nsZ1Jpz1lR/dKHQYeXXiExkFJaoERJgZJKCdRzQqBK6YASJwNqnAqoxURAhdKA3rMXlFKg/p59bnAmIz+W9Ivcw0S25WGvvHs+qOV1QRhxQzTcxmmsjauBNjGPskk0xMZ5fE3gwTUhjqxhGlZ8R5gRDWjlHWFSz3I8xxl9yX84ya14+NT7tIMUL7LhELJCI8kyDSjLaly5TR5ebkGjzDIPNus85qzHoWeVMoDkT3WF8iHJKi2o0Vl1xMZV5Ut1b5Pq33DmsJwTyF6hg9RxRknjAqWLCypRXM0p4holhwucFq5wQrgSU8E5JUF4wzYxGvjaG7Ysn4nojgX7Iv52ItrxoMq3UAetXN2B0TREg2mcxtK4GkoT80iaRANpnMfRBB5GE+IoGqZBxKt9jGgIK1f7SD3L8Rxn9CX/4SS34sFTFwAHCU/SjwjR2KWTdOZq7NRJOks0dvkknQUeOz5JZ0xjh28mMKKxq7yZQOpZjuc4oy/5Dye5FY+deop/K/02DNv2mfLfcMQAlcECFMYJeHpO/TccHUA2MMBsTIANwwGkjISj/gkt648/oeXIntByJB4s73l6sLyn8cHyHtHj4z2jx8d7Fh4f74k9N2QoPrW4IX5BqN+KF7t6ZHfOAeVLXD1PV7e2FG+MO47Xu3pEl7p6Rle5NqyNW/mY28oBtvIA23wk6a61K+IY/f60o3ixbYP4qcX3I3wvod+KGdUjkT49T+nT05g+PZLvJfQKJVbPKLF6FhLr/Sg9ffZhhM+r9FvxIZUeiSdTep4eR+lpfAalR/LBk16hp016Fh8x6VF8ruRDcNUP2VA/1Lz0wzBwvp/Pub+fK/39LPv7OfeXBw4U0d/P9NTpBxg4J735H5etje8f2tYkbsVH+D+Qqw+0XESD0TdEITGu4mJiDo5JFCHjOkwmc6xMoAQxTlmSL2o6onzZeVHT1M9535w+xnfFSiSSSZVYVVLK5FqsUnKZEDMsXLeNGTLOSTMRiLJOXaQdpHLnC1LPEIXTuAqniTmcJlE4jetwmszhNIFSzzilXuGQeoYo9Zyr1Cvq57xvTj3ju2IlUs+kSqwqqWdyLVYp9UyIqYdvRB3HDBnnpJkIRKmn3ogqUuVJTRY4tN98UpObiDDvelKT1UrIdz6pyTKn6q4nNUnFtNXP9lRUmcKhzefaZ6Z0juq3Y65SOzbYGfNamsdGu2OeUz7KlPjpoadjlaXjWvpOqgIXRPWhp22DbrjhxbR+y57tcRRfTOuReDGt5+nFtJ7GF9N6RC+m9YxeTOtZeDGtJ/HFtE9DNe+/tC1bkDuKC3LnuCB3agtyR7wgd8UX5M7sdRBHdlpnyE/p+q34TFWP7EsgHMWX3p3jybtTe9Xdkb/G7szj7qzE3Unpgf/hRTuHs/Qt2Z6qOoldanIv7VQVUcgu57KX4VQVGufON6Lzjej81/X91yYe0iwM3Syn2MxPwoy1YRdt7ntb6Sie8gK1MnJEeQmKF5izkpeArJoM2YmiF9giDOkiXgXqURlERGFKcGHZ3M5y5qzCMaxyrFaVWK1krFY5VvzsNigiViuRF6tUFE+hD/6dV/2WebGj9D1XZVpFF04PujEnP9YPurGYnTk96MacPTo/6MZCdOv0oBtx8O10GsBcObg6DWCJvLx2GsAyu3o6DWBO/l44mLwhym3jZPfGleebmC3RJDJA4+yCJnDKmxDz3jDNCIVTcTsOc0PBIhI8SxinqcK5sAYT6xFSM4dpleilOcSEWvR4Nil8lrOF5xXjPLkUoc275WnG+K4giQnHJHJS49pOTWZPNYEmIeM0ExXO01Hhi5xKPDEZp9nJuZqiiirmqSKt8mHyjGV8V9jF3GVSJeyVWczkWtjTfGaCLu6n3GuY3gzRHGdcTHTp6eYyoPrpZq3y1Lfj6WbdREyD+ulmraYpsfJ0s5ZpetRPN0sVp0p9wUKrctqsXrDQDXgK3XnBQjdK06m+YKFVnlqDihNsFLggo8qTbVTllBubiGklNuAJJKppGolyqtYoU81GkafloLKjkRin6Pgya+0D03QdVZ60SVX2GJt8K9JyGo8tdo5FntKjvHss0vQe1Fktb9NUH9U04Qe5rX1cmvyj+u1gq4VAbMDzUlQrs1NslOaoKPMCIaq8TAhqWiwEdVFL7bRwiCovH0iVi4jQRi0lQoNVrUNpWRHVbw+oWmLEBjsHtLbciI12D2heekR5l5k91SKGi5Eo8JIkqmlh8nlYjZw8t62yB0BlugAUYg8cPgFoiTIgixowCxWwIT5ASg04Ks59bMRKYUD4cssJIepwermFueq6ermFJQpCfrmFBQ4Hv9zCmAJTOEWnYA5ReofkRHEKln6HRIoqbNV3SKROAay8QyJVDqV8h0RqFNQgUmSDxuGl9zBOMqXQqvcwhKTCWnkPQ6gUUvkehtA4nOI9DKFQKEGiQILCYcQ3G04IUQDTmw3MVejUmw0sUdDymw0scLj4zQbGFKjCKUoFc4jECwQnWqGA1V4gqMgqfDteIKi0oGBWXyCo6BzaygsEFZUCTTLFm1QOe3js/oQZhTo/dp8EFV752H3SKKTisfukcBjTY/eJU+hMoKAZ53DZz19AuJxRuFygcLmgwuVqDpdrFC4XOFyucLhcieFyTuEygcLlv8NC4Rq+pR+CVQiFqmAKVMEqTEXLQSoKhahgDlDhHJ7CY3AKpdAMmAJTfvohhuVsCMn+9ob+GcYDmT3kDCxeHAIBLwkBtgtBwPzKDkA/ewVYnkgFZFd2nG1+DOHQema/gwAonm+54L9+0G/ZywWOxG8e9Dx9O1JP4y8d9Ej+yEGv0O8b9Cz+tEGP4q8abJBfv+q34ulej+ySpyNx2tfzdK7X03iC1yM6YesZnaX1LJya9SSefp+N/IoSkm3i7h+8Kqgf5ec2Vv41o8DKaXZg8UlqF8Kj1IDxq0aB+zPWzuBRaofwLLVBu8SzPRPdoM11ncMXtmXnnI7iY0vO8QTUqT2g5MgfOHLmTxkZa+OxtiKybS2KrY5iK6KVvhAVJBVI/0pUYP5ugzF/wN5rAi+XeFat4lauFHU1pOeyLFa5LPTFjl4RBcOXNXoWCmZcvHn7yP04eDMw82ZgcchAwCEDbEMGzMcFoCc4wOLNgGysnPU3IXwrvvgwTg4LPL34MEaHBSRffBgHhwXmOWYovj4zHhz25Ni2bLHgyBYKjuIiwTkuEJza4sCRLwyc+aLAWVkQOLHFgKFSC8dA8JWg8WCw/hdN7qXZKyLdy0b2Mngr4Nz5RnS+EZ03X9262XiE18vHo3SRfDzKV8bHgwW+sL2aAwKKb6Q5xzfSnNobaY4oL0Hxd9WclbwEZC+mGfJr1TaIaHw+2P6jOGM0PkDip3DGZHxA4w/gjIXxgUI/ezMOxgcs/NjNhmwu0J74Vlyj9ygttifFL/d90zIAmPklsOg8IKD1ADbvAeYWA9DzDWDxS0BmPM76p8yPbSs+mztJfgk8Pag7Qb8ExI8uu0I/pzFBvwQUfyxjMvjlS98qRw2oxB9Q6Ahw6AjQ0hFAdrjALPTAhsgDKT1wFNcOk+SXk8Ev9/f3bdPzzJktSJHFPHMBrQQorkehtVmMIzcSZ5B8BumG42SEq9HJKK1GJ6O8cJwMrgm7bUUE2lpvw8IRsFeVM57SQYKCc2iTOjAvLmNkn5ORWjdORrhunIzSunGS7BN4WjdORmndOBH2CQqtGyejvG6cjHjdOLH7GeAn6WZNEtgW9e2apAqDTDdskpCsMt+ySQqZZrppwwLYZ35BkbgyUvmCIklkqdUXFElmc80vKBInmy0cvNYQGa5xcl3jynpNzP5rEpmwcXZiE9iOTYiebJiM2W/GhQrle3SEseqNsVWZwI7tgjIyU7N3uyQM3ERyceNs5SYkPy8Km3rh4OyGyN6Ns8cXoRWfl9zehJ2RUr5vGpu/CZUZwPQ0DZjCc4EJPCGkW7oURzE1FGklEE0SxtVMYWKeLkyiOcO4njhM5tnDBJ5CTIjzCN1xLQarbrkqjSeU6k1X1UBMK+q2q9LS5CJvvCqRphh161VoMNEgpbkGJTXdoJ5nHFRp0kFJzzvYgqce1Gj2QYkmIJBgDkJK0xBKNBOhpCYj1PN8hCpNSSjxrIQaT0yoxbkJFZqewr34YBTiLn1W0IwQs8+ixrNV0JQNY4M8ZwVVTFuo08yFEk9eqKX5C0SewkCCWQwpTWQo8VwGWqs/Ps1oqH0rmmpeQ5mnNtQqsxs2SRMcijzHocbTnHosJIdbTHagrjSlKQ8lNeuhnic+VGnuQ0lPf9iCZ0DUeBJELcyDXcX2P7u8/a2Z4myIBkdDFB5lAg6fArQ8iQLI7vsDs5vbwOC37AeCPxW9Refd1vmoXNU+x+E/MrQZ2APfKgMKSHzD0jkNIND4DUvnYsBAoW9YOg8DBCx8zfn50Mntb90M5pp+K+Ioq0XaXiTtwtA/KLrdzeXF8COsjprwOQ0mwIDKiyuIOAEGTglQqBsuYsyLAYW8GFjIiy27gunGSfcx82a5nNlMfjXY64FttXHL0sCR+P2oKzJBoPGXoq6E5YFCvwl1hQYHKP760xXms/eV8mB7afmKUmCbAdd5D9elpplXnhjfquX3RmDL5hVHOFv0dFaGrj/GWUiwLcrZtOWcTVsa0maLYtpsWUybnt2UtYhvxft0N2HlASjfuruhdQbScJ/dcLyjdxOWE8DoC8tuyqx+bFsx6Dd5DneeBuMmzNiO5G933cT52Vn8Sc+bMBsbWsetfNQ5VW7yWzVDFCpv1WiVRnDXWzW6SR7XHW/V6BY02rW3arTMOZDfcJHx4szY9YaLbvKtEeHU2f2Gi27ECVV5w0WrlGb5vQct7AxMzsNiJdv1wx1a1oBwTiwo7BQEXLJsURtsqS3z8XYrG6QhaFXxzMihvfRSpNA2O6whaEUPvD5WFfgbYdTOoF350tzHjKAVBpaQtyqTWFo6bWfHKEet/MW8uSqPSm/3yUK0I1bjd6iyKuyImyQ74gbRbFgls2GZzIbl8GWZLMYnSnpVB2tHpHaE6Vsx2h2gHdHZFZpdcakH5dsRgf9/d3Jo6pByI//60YiHFbvSQsqKXS70ny3i2U/UytwptfB0qWjhD+5FHC9mRK18oNS6mXg+n9bU+LCraHE/vegv5Bwl6dE60AVpdLEZsJe2FZ+s6ZEtKQDZwQEM18AWZQ1jepN33eRd0xLFOeY5UFyMOI6vpi/issMZPTO0YZ7a/VYszB7F0LtATy1tkM/0/VaciXtkAQAU9+9CnP8XZTVkh97mALeVaLYymm0OW1rWuCIC2sYX9hdh1WLoPoTNT7SeG/s9tPcprlQvJq0h6r1xyjHnnMP6jqNhsW9O6Xy/kbkYDnW3MUk5zdPNRuY8PuJmYxSuc5w5/43LIkg3LYdKKBwS3RDVhHEqDOeqOkylEgl3OmNnuVgq9zlJrA8R1071JifJtVHiUsp3OCO/z8OQKqsIv+c/hxqz72XyVoYoaMYp351zjfGXPg01hl/6RC25xtKXPiUuBlB96VOSco2lL31izqOXv/SJhOscZ64x47LG0rdHDTVWONSMIaox41RjzlWNmUo1hl85RZ3lGtNfOcVifYi4xmpfOcVybZS4xtJXThG/z8OQaqwIv+c/xxqLX68CbaPAAYwqVwCpqfbkd7qUCsxXn9RfpWqsXH3Sqhr2+tUn3UBUaeXqk1RTLtSuPin5ujaCqYajqitZf11MqeegYpVGgWs7qlzhpMo6j2242vPVOBWoVPm7rsbJJt9KhOQFu6/GyUa7cyG5Q+VqnFLva8Oc/SLIv9d26N4xnNj1Fxm2l2qMlKATtq+0iji+HBA1fEEgKvaSQMT+OkDk/kpA5OW1gEjtG6oC/jQqr3MasRNnwuIV0CJuvk37KOx3nNpM0mdPdEwnKUDdAMFPCvVb8XpPj6JN9Ehc3+l5uq7T03g9p0d0HadndP2mZ+G6TU/i9ZpHmBS8T1Fvcp/ojsNjNnrnsk/ihsJj8HFHoqt8v+Cx2JJv5WPmFx+NywNs85Hktx5NEcfYxvfRHoN9GDJreNGjpzQcT6FrT7lrT5WuPcmuPeWuPVW79iS69pS79pS79pS7tk5dW4dMW+dMW+dMW1cybS0zba0zbZ0zbS0ybS0ybT3Ce+prHA5A4p76moYDaLynvhbDAQrdU1/jcACK99TXYjj4wscwJuHCR2zJo5MvfDAX4yQvfLCURyxf+CDOYycufEQBRjFdHmCuxlNdHmCJRrZ2eYBlHuN0eYA5jXa6FjAMuXh2cRh1fnYxteexl08uCklkQOW5RaXmPFCPLQqJs0E/tpg0yAn1MKGQVGZUHiUUKuXHjgcJRQvOEvUYoZAoV9RDhF26/Os//w8s8zdF";
  }
});

// node_modules/@pdf-lib/standard-fonts/lib/Times-BoldItalic.compressed.json
var require_Times_BoldItalic_compressed = __commonJS({
  "node_modules/@pdf-lib/standard-fonts/lib/Times-BoldItalic.compressed.json"(exports, module) {
    module.exports = "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";
  }
});

// node_modules/@pdf-lib/standard-fonts/lib/Times-Italic.compressed.json
var require_Times_Italic_compressed = __commonJS({
  "node_modules/@pdf-lib/standard-fonts/lib/Times-Italic.compressed.json"(exports, module) {
    module.exports = "eJyNnV1320aWtf+KF6/mXcvpsWTJsnPnTtLdsdNx7ESGMb36gpZgmSNKcEhRCjNr/vsLgqhz9tlnFz03XsaziwDqVNWuDxSg/5l919/cdLd3s29n7/+5Wc+vukcnZ2fHZ49On5+dHs8ez/7W3979PL/phgS/LW669Tc/3s2Xi4udslkuUXnkyvxmsdyiNsCmW1x93l3nn93lYnMzkH36l7dXyyHdN0enfzkd2Ppviz+6y18WdxefZ9/erTbd49l3n+er+cVdt/q12/3+hz/uutvL7vJdfzO/ne7wr3/t/5h9+69vjp69ePzN8dHZ46MnR08eP3/+9N+PZ+dD4tVycdv90q8Xd4v+dnexJ09A+O3z4uL6tluvZ9+eDvx9t1qPyWZPnhz/5cmTJ8NFfu7vFhe77HzXf9mudjl59B8X/+/R0Yvnp493/56N/77Y/fviyfjv0/Hfs0cvL/uP3aNft+u77maI0e1Fv/rSr+Z33eVfHj16uVw+erc72/rRu27dre4Hug/mYv1o/uhuNb/sbuar60f9p0c/LW77u+2X7pt/dMOvXv790fz28j/71aPF8OP15uN6cbmYrxbd+i/D7f4wXOZycXv168XnbiyF8S5+vRt+Ml9dFnVI+N38yz+mgnl2+vTx7EM5Ojk5ejx7ub7YhXo1iM8H8fvOjscgz369u/xHM/v26fH43/fDf8+e7cvrn93danExBPRf/zNrPsy+Pd4F9ufhRtZf5kMc//fxHj99+nSPuz8ulvMb4yfHU/LfN/0QqY9LU06fTMrt5ubjrqCubrN22S+X85Xx5+UqX7rVxa6yF+Hs7PlemN8M0nqITr6z8Q7GEs/al/mqu112n2pS/Jnd3ny9O+P62pRnZ6fTr5abtVGL2cXQRuf5Ep+3Xz53tzn5kJVF7zk5LplcL+frz/lu/uxWfab9bZfh3YNIefd51Ym0n/rNStDFvUi7XvwhYHffibLtdExvF7eiWl30y/4243V3s4iSlcByZwOJdr9v5suMr1bd0JBFNn/fdOvRaoryolToud/7s6OjPXuZ0V8dPTvbo++82h4f79H3+Yc/ZPS3/MO/Z/SPHKYfvT2enOzRq3xfrz37p8/26Kfc9P6Zf/hzvok3+e5/yane5lTvchn8mu/rt3yu83yu9/num5zqQz59m9F/eVSH3mFEH4fO7Lq7C7ZhbfTjoMV2yr+LnnJS8jFfXywWF4vVxeYmh2KzM+310POIJjL6W7gZ96mMPuYqcSH8N6fqcl4/5R9eZfQ5/3CR0X/nK17nVMtc/iJawnSE7X0RrT4X2iqjdb4vEftNztB9bkIPOdUfGW3zTfzpqaxoh/rVUa08LbVyVUlPPdzJEdTGu8XyssuX3nf1l/2DiHPonb0nuBvHaV45jkr+P+0Ghuiz9put6js+LfvVQvB1VznLxWY1dOMXHsDjoxNoNuvFOHhNrb6MWnSzutosBuWmv9Mjh508nvgrcmVw8Wmh8i360WEoqIYDl/OrK9Wl7TkOxWjAsSu7btV52z899rHQ/Go1/wKmVn76cZhEdCKXHt6P8/WBCB9WKyGyAoj6c6uhy+Xiy3rhDXWYLnhW7z73mzBUTL1+qNtecKv5vfDf+cXmTo1cRiv/tOz+yBo1rIJv5hcrNdr5uOrUhS/7u/lFaHAuLYaCxACYssJm6Dc7TOmGEbcYom5ur+arzc1yvhGX6a+GUea1ON0c8+HFchNqrPGXPuY5PptqQL+6/DQM8sKo0IcnsYf10UfkL4p/vvELPD16Yhe4GVxus8QrmC/PRXd3uWvw67XovJaVkXkfuZ29F0PooW0O0+GhzotC+zGVp3fLsfp51x8rjXdLskT9dLHofGSU7sDG0JeL+8WlKKQ23pkPlkXL8NuOP/JRnviRd4/UBK2jHudd1EYgq/mUfr3QThynMPidU2Pw31RKaEM/8BlAuojPFwaDgAlInGBSRs+emTiteIhLkeX4mJDqgeUyxMVnAuoGvHnU6mh0VB/lq7P5NKp2tuiqEM7sk15DQjaBkyH60DVe/eRsusqy/7O7vRKXfxcv4TM4lUmvHAcbiRC9eXEvYiPZeCNQ1JRXn/vkyNllfvvcr0Su3tDVPQyVUvuVeLmry0rYzukCHrHYs4XFjfVmHOGsxP3GKuhRrPFoq2aCN5vl3eLLcivuizLolTwWR+n4hrHW3WK+vFx8+pTLaptt2JpgvI5X2EOV5YeD1exAr1OXLioFfVuzQa4x7ilzORr6kfoVXHobBgy4/mbTn1V/3d3iJMjMcdVdLdZx2OtNtDLw+lG0C5uJbIZWHeYiHmwaQFrDrESm56pu7bJSpf6LTPvkRRm4jqtccQ3McvnDnRihfFc1wKXyLW9uFZPpqr1jrRd8WRs+HKiVlQD/WWsatZt6UyuRWtdT89x17cr1Lv7NwWEJ21IZF3TLO7HYcxdM2gvpoT/giPUhzs1G5IT6cAuVHGd6W6DQ+yw1jnDOTtHHhwq8GiqyuLVf0wymKMtYI33VU/a/NsOIBffiebmN8kBHeWJ9PvZjZe74Y627/Im6vxKGIWif50tYeCttfDcziQ3ci+KQyd/GUZPXtK+UHw2DLAi17vkqeilmaCpVVah6EPqrHO5aBdYzHKtgg0uoxx09NS13Qn0Tm5j+5LRMsIdu80L57PeVsebq4Gj351g+fruV0e67w9VaXsustXLOl1WP1rOkN5WFwz8PjCd/qPX2dG1fHZZZsfFYGAj42Q42hXgLvrh78ErL/mpX3re9GMX3dS/dZKk05eFUlZZ8dXDO0N2Jhw5/Vqrv7cFufAh56iHc8mtt/IfN7kHkvx/PXner21/mi9Xu8fG/Zi93j6lnj795+uTfj6ejvXsEtL/PiCZPR/j33dGpHe1dJSDMGApvhqMTO8+bcguAoHIEbkUV6L79BxScJyhTyALbLw4FtG84iN6Go992OTqzI4sZoJh7E86Ho1M7z3nJPaCQe+CQe6Al94Ao96BY7oFN7Tqw0U6QvB+Ojp5YETbD4Qs7andJ/ciy5Ahv3SjsB8AAbYajY7vwppwNUAgQcLgK0BIgQBQgUCxAwCxAwKYAObkPWXsIR9t4lOOzzfGZEmF7NUSN1ji1XOfcfIsCbdgQNWTjsjUXFZq0IWrXxlXjNjG3cJOomRvXbd1kbvAmUKs3Tk2/8LcZgQkYIidwruygqOAJhsgYjCt3MDFbhEnkE8a1WZjMjmEC24YJ0TsKRgMpDFykoDa3APYT4/VGo5ylaGAvhshjjCujMTG7jUlkOca175jM5mMCO5AJ0YYKvs8RechoK1Al1MKfJptAfzJE/mSc/Mk5+1NRwJ8MkT8Zl/5UVPAnQ+RPxpU/mZj9ySTyJ+Pan0xmfzKB/Mk4+VPhbzMCfzJE/uRc+VNRwZ8MkT8ZV/5kYvYnk8ifjGt/Mpn9yQT2JxOiPxWM/lQY+FNBbW4B7E/G641G+VPRwJ8MkT8ZV/5kYvYnk8ifjGt/Mpn9yQT2JxOiPxV8nyPykNFWoEqohT9haNCkIieniiLZFYnsWUEG44qc3CuK0sJCEvCxyMnMoqgcLabIthZ18rYoaoOLadjlokpWF0XyuyC+rXBwvsjJ/khUHhiSgBFGTm4YRWWJMUX2xaiTOUZRO2RMwzYZVfbKqEbDDBq6ZhDAOgNvKy2UTTSKX2neyk5DAvDUyMlYo6jcNabIFht18tkoarONadhxo8q2G9XovUG7rwTyocK3NX6o1IQpO0FLRkqGjBLZcZDYjEEEK0ZKRoyStGFIACaMlCwYJWXAqGf7RZXMFyVtvZiCjRc1sl2UyHRBeispGC5SstsgKbOFBGC1SMloUVI2i3o2WVTJYlHSBosp2F5RY3NFLVorKGisgMFWgbayhbGlonSwaSo7BRnMFClZKUrKSFHPNooqmShK2kIxBRsoamyfqEXzBOVehuxB0q2m9XIRljnlHv3SEJmlcXJK52yTRQGPNEQGaVy6Y1HBGg2RLxpXpmhidkSTyA6Nay80mY3QBHJB42SBhb/NCMzPEDmfc2V7RQXPM0SGZ1y5nYnZ6kwinzOuTc5kdjgT2N5MiN5WMBpbYeBqBbW5BbCfGa83GuVkRQMbM0QeZlwZmInZvUwi6zKufctkNi0T2LFMiHZV8H2OyENGW4EqoRb+VO4VDcoZOZQLZFEgsEeZBCbljFzKBWlTJoNPOSOjckE5lavZqlwjr3JBm5Xr7FaukF25QH5lwlvBwLGckWWBoDzLZDAtZ+RaLijbcjX7lmtkXC5o53KdrcsV9i5XonkZR/cyCPZlrBUthA3MhQPNSlmYieBhzsjEXFAu5mq2MdfIx1zQRuY6O5krbGWuRC8zfi+C8yDYVrFa5IWhlRtDQ3NGhuYCGRoIbGgmgaE5I0NzQRqayWBozsjQXFCG5mo2NNfI0FzQhuY6G5orZGgukKGZ8FYwMDRnZGggKEMzGQzNGRmaC8rQXM2G5hoZmgva0FxnQ3OFDc2VaGjG0dAMgqEZa0ULYUNz4UCzUoZmIhiaMzI0F5ShuZoNzTUyNBe0obnOhuYKG5or0dCM34vgPAi2VawWeWFoq+n7JO5AhZCZFUxWZpiNbBLAxgohEytYWtgkgoEVQvZVsDKvomXrKgoZV8HatorKplU4WVbBZFgTfpsImFUhZFWGlVFNIthUIWRSBSuLKlo2qKKQPRWszamobE2FszEVHm1pomhKEwJLmkibajjbUcHVJqGsaJLAiAohGypYmVDRsgUVhQyoYG0/RWXzKZytp/BoPBO9T2F4SGSbiY6tsJupEaDfGCLDMU6O45wtpyjgOYbIdIxL1ykq2I4h8h3jynhMzM5jElmPce09JrP5mEDuY5zsp/C3GYEBGSIHcq4sqKjgQYbIhIwrFzIx25BJ5EPGtRGZzE5kAluRCdGLCkYzKgzcqKA2twD2I+P1RqMcqWhgSYbIk4wrUzIxu5JJZEvGtS+ZzMZkAjuTCdGaCr7PEXnIaCtQJdTZn/460Je7K/uRBdFR8RJAMaTOMZpOLZCOPEjOPD7OSmiclIbt6HyslHZUcgAo3C5wuF2g5XYBUZGDYhkBZhkBNmVkT76f4r733+8x7oCih3+f4g4cMgK0ZASQ3S4wu11g0+0CKXF39N689PvJBvyojUexF/me2v1EJ9PFyBii8BinGBlXgTIxR8skCplxjpsJHDwTYgQNUxgLf5/D0GTUCkShNS7iO77DGONbEMe3cI5v4TK+RRTxLRLHt/AU3yKk+BaB4lswx3fi73MYmoxagTi+haf4/m0K7dHRqR2aFwErIUUWDQoEdCjAZlHA3IkAuhUBLF4EqIQN2G6keeZHJSuASk4AhYwAh3wALdkAZLkAZpkANuUBSMmCo/0HLodMPTUUE3Q5U10Z+iHSmepkpuCF24BzXjuR107kdbGrYn5kFdJRHIw7xzrq1Ibgjnx47czuxFnvw7/x0LtaZ9TXuhA6W8fe2zpL3a1L0N86LJMAZFajnU1fMA0VYmWDofEoDp1GVCoEojAN2Auvpua/N4NX2PoBlSYDSMykXlHTBxrnT69CwwfmhedsajJA4iTp1dTon1p+5rFbeIWNHpDoDF5Rowcau4BXodEDI+N/BY0eSLT7V9Doj4108SiOcF9hm0eUR7ivqM0jhTYPOA58X4U2D4wGvq+mlgZH+Z77yg328gb7fCfcyEAR92hNDFAcib/CBuZoEwpnkyvUplJ7NrL2bHLt4fkYKKJebUS92oR69Xq2XwnZT33HoziLH5GYwI88zd1HGqftI5Iz9lGhyfrISvgBlfA76kIeuhjr11jREeXwv6aKjhQqOuBYKq9DRQdGsX89VfQTy0EfLfN1qujAkz++xooOSC4tvQ4VHVhcUHqNFd3RJh7lu95U7noj73qT75prNSjirjfk96+hVjvZxqN819t8d6Grw3ZBAjURUlVroSS54VACakOk6uZEibhlkUyNjFRqb1GFyk8CtUJSqUGyKtomJcnNlBPkFkspqPGSyu2YZG7SUe5rFYkbOqmq9VCSr1VVdgJSdfOiRNzSSCarIJVcI6qbqnAwMNJWKMnXAsNmQ+r/JTDJgkhmNyI5GlMUt1XhYGCyc/002y/tH/uRDfMAhZG8C7v1gv24fnfUhKM2pGzjsvOI0qLyjorl7J+mDD+1RJZLQNjE9xTfuT8mRJmsvHNPKmQX30cn1OYfcu7V++gkqTjga9iUR46Ieg17kmKVgOCQQCFiVQUqpoFwRaGpCW3tVBxAUnMYYwIVzNygZHw4sPUGNSWY7A4Da4hC6lwFs6gQxoKajNr8Qw6a8RyuIqlAFW2b88jBMZ7C8vNseoZyZkd2d47sGYqjOIFzjnlwahM4Rz5Nc+ZTSWflGYoTm7ntUWlSLwWivBinDBlXuTIxZ80kyp9xzqQJnFMTYnYNU57xYQMjynN62MBc5Vk9bGCJ8pwfNrDAeeaHDYw5z6GFv6wKnP+ochSiKmMRk4iIxAQcl6im6EQ5xSjKFKkoUrzKg9OXAlGMjFN0jKu4mJgjYhLFwjhHwQTOvwkx54Zjnt9M2d178BvMKaCSSUBxhuc8PXN+g7kC5HMzZ747wVnZmODEJmaGfrNR4BvsnBCFfsmFsUuyoyYcfQgp26D59gZHaUb7Bo12uttktMwp1tpoWcxRT0bLnOOfjZaFWBLJaIlDmaSxauKqdMJYNaImow/5h21OxcWmhq+TFF7nhgKMnEoxilSUUVTlGVPkQo06lWwUuXijymUc1VjQUaPSTh+eOBHR43I/9OEJleR9pVSaCv9QOU9bSc+1ov79hb0OL61CxUBK1QIlqhQoqSqBeq4QqFJ1QIkrA2pcFVCLFQEVqgb0MvxJihNXgfrL8DnBexn5RtIP8gytTMvFXntHfK+W1wChxA1RcRunsjauCtrEXMomUREb5/I1gQvXhFiyhqlY8R3fkxgGLtDKO76kvs/xbDL6kH/Y5lRcfPKV2L0U17iwCFmhkmSZCpRlVa6cJhcvp6BSZpkLm3Uuc9Zj0bNKNYBkqAisUH1IsqoWlOh9tcSaqvKhera2+huuOSznCmTvzEHVcUaVxgWqLi6oiuJqriKuUeVwgauFK1whXIlVwTlVgvDm7AlFhAu+9uYsy+9FdBvBPojftiIdF6p+wXSvldUdKE1DVJjGqSyNq6I0MZekSVSQxrkcTeBiNCGWomEqRFzNO4lh4CKsrOaR+j7Hs8noQ/5hm1Nx4akFvknCSfqUtTRJZ05lpyfpLOayS5N05lx2eZLOQiy7NEknDmWXXl1IXJUd7uuneDYZfcg/bHMqLju503+UfpmK7YUfld8CKoUFKJQTcLgC0FI6gKxggFmZAJuKA0gpCUe7zUbP/ajkAFDJAaCQA+CQA6AlB4AsB8AsB8CmHAApOXBE+yR3KCbocqbsyTUinalOZio8mAac89qJvHYir308yvfcV26wlzfY5zvhp8agiHu058OAcvB5U+LbGb7RMB7FNxpGJN5oGHl6o2Gk8Y2GEck3GkaF3mgYGb3RMLLwRsO7Gb4+Nh7F57UjEk+vR54e3o40PqcekXw4PSr0RHpk8fn8iOJD+XdTrOEo3/V55a7P5V2f57vmWIMi7vqcHp6/g1g7GV/Eel6OmnDUxiOrPY6wluxpWfiCMjREITGu4mJiDo5JFCHjOkwmc6xMoGI2TmVd+LlAlSzKojexnkWuBMYPZzFVBxO4TpgQKwYukVLBNhm1AlFlUeuhk1QeMkGNMUThNK7CaWIOp0kUTuM6nCZzOE2gGmOcakzh5wJVsihrjIn1LHKNMX44i6nGmMA1xoRYY/D9IyrYJqNWIKox6v2jIqWthOUm9FZCrcoAV7cS6gQc7INbCXWiFHi9lVCrXM+Cel4VDgZG17yY5GuBSbUwqv+XwOQaGeVUL6NMtTPtupFVqakJbVXgWlvddbNPMEy09hPMJ3YUZzkjsmmlI7HxdeRpLjTSuMV1RLRldWT00vbIwvvaI4n7VX+bmpzn502MwW+pcQGXAbFmBIiHla74sNKZvbfjyF7bMbSbmbw4tiObITqyGaKjOEN0jjNEpzZDdOQzRGc+Q3RWZohObIZo6KJfwirAnuxnXGcnhcRfdDmXNuFCFGqXc6xdQGHCBSexSufIK50zkfnP2y+fu9uQjUXIpr2rBoiWPnasD2ftc977SnH2sjj7XJw8cQNFFLRN3ADlUrWJm+d+FbK1yrmnl8n2SLxMthPW3c2i1JxnRjchzSZfYiMWsUae1q9GGpeuRsRb6V2h9ayRifLchFWsHXkIYdrGo5IHQLjLbk9xv9bkaGm/FnPyY71fi8XszGm/FnP26Lxfi4Xo1mm/FnHw7TTEZq4cXA2xWSIvrw2xWWZXT0Ns5uTvhYPJGyIfME52b1yZhInZKUwiuzDOzmACW6EJsTMwTN5ROHULjkPfULA4AfcSxqmrcC76CxNzp+FS7jlMo+7DOPchJtSix71J4YscIu5XjLMZFaHPl+NuxvihaiQ6HJMq1ajS9Zhcq2XcCRmv1Cbujgpf5Whwx2SceifnqosqquinirTJqbnHMq66LRNz32USdWDGdS9mMndlJtSqEHVqBT/kiG8Foj7OuOjo0ibd0hvoTbpa5a7vwCZdnUR0g3qTrlZTl1jZpKtl6h71Jl2pYlepVxW0KrvN6qqCTsBd6MFVBZ0odad6VUGr3LUGFTvYKLAPRpU726hKr4xJhGPGBOybUU32GOXUmUSZOuQospEGlTtnEmMXnV4FladM3bV+FbSiqq67+ipoJYHoxvWroPr3qUuvvAoqz52696AuaqFOXX1Uk1vHdzBrN5M6/6h+vVqrgUBMcLBa1wYFMdHhup8GCFE9WLvTYCGoq1o808Ahqjx8IFUOIkIaNZSIr47WfpmGFVGVg4uYRAwxYgIeaES1MtyIidKgI8qHKzMPQIL4UCvLbVXgIUn99b8xwfk0GtkvzZ7jEARQ/L7NeRpsAE+L0ec4rABEK8rnYQABLKwdn+NQwVFx7v0HSs5n6ZslZZEd85re0WBOudbvaLCY85/e0WDOkcjvaLAQY5Le0SBO0SmYQ5RehZhOo1+FkCJF7MCrEDJFjp1+FUKKHMXKqxBSjfHUr0IokSIbNA4vvU4wnU69TiAkCmz1dQKh56Cq1wmExAGVrxMILQZTvU6QJQokKBxG3KA/nSdt0GdO0dMb9FnMcUsb9JlzxPIGfRZirNIGfeIUpYI5RGIf/HSi2j74ikxxO7gPvpImR7G2D74ic0yr++AreoxwbR+8linepHLYw+7x6YR593gSKMiV3eNJzYHNu8eTwMEUu8eTEgOYd4+zQEEzzuGyv+cA4XJG4XKBwuWCCperOVyuUbhc4HC5wuFyJYbLOYXLBAqXcQ7X9DV6CFYhFKqCKVAFqzAVLQepKBSigjlAhXN4Co/BKZRCM2EKzEQpLO+nkDx7YkclHIBKKACFMACHEAAt2QdkWQdm2QY2ZRlIya6j3fLWUz8qOQAUPxnlPH23YqT26SdH/DU9V/xLUM7KHBSQfZLR0Li3+OjIDm0pDph/FdcZfRXXBVyKA+xfxXUGX8V1CF/FdWhfxXXkX8U1Fqen76H6HR2/KIh+04kM23JPYJUMhy/NAoX1HExtn5p15J+adaaiYKs0p5a/3dLMfo44HsVp44hinXOe5pAjtTrnyGuWM/8QrrE+3msvwtrXQtjrOtOLOpM+PwuSqk7++Vlgour4Tm+vKbji4RndxKMc8rigARwrilOrEI4oj6B4VXEmCqMsR+xJE+y1yfbaZHttKvbaSHttsr02wl4bYa9Nstcm22sz2eu+u2jQXgGJr642ZK9A41dXG2GvoNBXVxu0V0Dxq6vNDJf2m1laz29maRG/Sd4KPK1rNrO0Rt/M8sJ8M8ur8c2Ml+CbWVp3b5KpNmCqnib+osu5pAX0Jhkq8LRU3rCfQuK4KN7M8kp4M8vL3w266f6DU80MF7qbWVrdbmZ5SbuZ4Tp2M0uL102yPeCyOPtcnHpBupnlVehmlpaem1lab27Q7xzlBd5mhqu6zSwt5TbJ7oCnRdtmllZqG2F3oNCabDPLC7HNjFdfd2RcWTXr8OVUR2jGI21n+ES3RZcEFJ/dtsklgaentC26JCB6HtsGlwQWnry26JKOxmesp3ZkvbCj2Ak7xz7YqXXBjrgHdsU7YGfW/zqy7teQu0mbXbLNLtlWXLKVLtlml2yFS7bCJdvkkm12yTa5ZJtcsg0u2WaXbLNLthWXbKVLttol2+ySrXDJVrhkO0tPBtsZjjnbWRpzjkiMOUeexpwjjWPOEdGYs53lMWcbrLfN1ttWrLeV1ttm622r1tsK622z9bbZettsva203nayXk+zydnbVLK3kdnb5Oyx9YIisrcR9WMTGwc+oJlMKT2gYU6Wqh/QsJjNNT2gYc42mx/QsBANNz2gIQ7Wm17PY65MWL2exxLZce31PJbZmNPreczJoguf55JmszZOjm1c1VkTc8U1iWqvca6oJnBtNUFXWTZ1f+4W2iU/jqPU4gRs9MbJ7Z0fiJDwfZey+ZtGPYBx7gZMqEWPO4TCFwJR12Bc9Q8m5k7CJOopjHN3YQL3GUXoc7649zB+qDREP2JSpb5WehSTa9WZ+xbjlWrLvUzhoqsp0ian5k7H+KGoiO7HpEpUKh2RybWopC7JhNjI+StwTxKl3kl+BS5Lqo+qfQUuq9RT6a/AZY37K/UVuKxQrwUSdFxIqe9CSXVfqOceDFXqxFDS/Rim4K4MNerNUKIODaS5rCXcraFEPRtKqlmgnlsGqtQ4UOIGgBq3AdSqzYC7u/AYP9iDeMCff6PPxF0fStT7BelwFEUfGNTcDaJMPSFK3BmidiDI3CWCtNCUOkaUVN+Ieu4eUaUeEiXuJFHjfhK0XmaZe0uUvlJ6os9Etd4GKj0npjjQSrj/RKneFLgXBUl0pKBu5G+4O0XpK2ETnSqq9bBVulZMcSBsqYNFLZjL4Asz/+bMeGTPDR3FjaaTUDrtK4HoHMbliabEeCJDdCLj8kRhD9hVjdMpoyjPC9G70pTOiZI8Y9k+dCUQncu4PJFt8bhSjE7lgjyX7X+4UozO5YI817Rl4CoTOk/B8izlQ2dXAtF5jKsTfURTODHkf/L8IzZzQPHhlHN8OOXUHk45kn/Z/GNovsDo75l/hOa6Jxe7jssGRLuj66Bdx9xPgs0C/ZcFXedU+hz2TqGfo6DrnKpyjmEMsFzO6SwGr1VKfab9iGb/J0guPy7LXyE5OskyabgKcGTEd8aEugUo3oYL/gj6tKD7cPQQjrwe7Y78z6SMR3HzyYjSJpMyOONMoBufEKLsVNyYVM5Y4fcZPWQE+Sxom/PAOTaes83v8h5FDNk2RNk2LrOdXvqcMlT4fUYPGUG28d1FygNnW767OElqy/OR0DAAsruTog6F3EpdcorifYU/VDiGB/m2kuEUqCDmaIlJz1FSIFKqCxeSjJIab055Bule0gdJITpAtzJ7HBmURFx8cpUCAxJGBjGHBjUdG0iRggPavcYPGmN8AG91PlOEUMsh4n3eRxFDaNJAjbkMSdowPmWw8PuMHjKCEBS0zXngrBvP2U5bh4+IQ8bzuDIJMut5G/KUKxPuBXsQDLJvbCsywwFwIUcg7QY+Ig4RyKPhJMgI5J3FU85MuBfsQTCIgLGtyAxHwIUUgU8p7zsyNJdlt17vlkKeGfw0K+9C744Wdi/jEQ1eP+XsfqIx2X4KepWuvyNdPLJlTUe23RNQ/obryHFlEyhu9nQcP+06IvqA68joA65xtiNmOtVZzlUOVPkpx6XgTiCKkHEKk3MRKxNzwFzKUTONQmec42cCBzEvBVxVlgKuDi4FmMqB1W+dTz/Kb51rgUJdeeu8ooqw1986ryTIRVB561yrXBy1t86lfFUVqIBIlcVUeYd6X1jXoRCuc+Svc7ivKzG+loG91tG8ziG8FnG7FsHasT4e5XvuKzfYyxvs852k/dSuiHv03dSO7MmKoW08yne9zXdXazAs0MkONpikilh9rcGkBLmIDzYYVjmohxsMyX1VOBgWWUnqn0zQCQ5mq1KLap9M0DLVrconE6S6rQoHA5PrYRlC7kdbt7hSMSGcxRcUTgpCWUl01Afb67PX9TWD68vQbn+Ul8z7tEjDXJ42LMbsUWXxuz+0+N1/ffG7zxP+PZeL4r2aUQtJXomnzXual8r7ylJ5f3CpvA8zrT2it0qv6gpdiWV5QUoE1xWr9n1t1b4/vGrfx0nUnpU/7nIlEJ3duDx5UeHceU2+r6zJ9wfX5HtsZ3tU+v/aum7USRzZsvt0V/T9/8vrQviTmb/EGPEQyfmd1uIlxTlX+nf2gRellZ5PanHdO6dYmz9FXC6otHJBqZU1d62KeW1M8WV+0VVis/vJ0/yTu3hSkcLrxhDe/VuPp3YUt7qMyCqgI7HrZeRpt8tI4y6XEdHelZF5j++svO3oJG5f2aGLWXlzZTyySbqjUkKIrGAAlpnLPtqrqVJ7AqvLjuKVunzxLl88Dr+A4zICUBhoAbYNDo58Y4Mzi6qzq3hUyhcQ1SETbH/HsdWf3UjsxMrChl+A4hvaziG3QO3NbEf8QXdX/H1tZ/ZNe0f2QrYhnxV5Wf8esuojoRUaAKA4xF7F5o5QGHVxMGx+aR8xc2qIeh8xi7lJpn3EzLlx5n3ELMRmmvYRE4cGa4gajnFqPc65/aZHeFPBFn6Zk3Jzxp3LjCr3x61b71xmMbdzuXOZNWrxeecyC9z2cajMiFygMlQmlf0AdxWfxEJnZ9C7ilnMHpF2FTPXbpF3FbNAvpF2FRNPDlKE33OYwEsMkaEYJ1dxztbiivIX/GL11PzSF6uZk7/oL1azmP0lfbGaOftL/mI1C9Ff0heriYO/GKL2a5zar3P2l/SsfCr2wi9zUvYX/EY2o8r9sb/ob2SzmP1FfiObNfKX/I1sFthfcOMAI/KXysYBUtlf8EPZJ7HQ2V/0h7JZzP6SPpTNXPtL/lA2C+Qv6UPZxJO/FOH3HCbwF0PkL8bJX5yzv7gi/SWs9KDLRIG9JqrsOFGVvhOTCPeJCdiDopqcKMrJj6JMrhRF9qb4jATKMArsA1FlNyA1eZZ+MFMqVFAvaz9LLpbWp7VwMCfJ1w6sT+skwuPq69M6BftdZX1ay8n70gMdLbAPHnqgI9MkT0wL4yeqyiV/PLAwrpMIr9QL41qt+GZlYVzL7KF6YVyq2U+D/Hst3OitUWCHjSr7LKnJbUkXnjstBo2vbe03DBixW4nY7DVi8RV509BQoxK/G2+YvgVv3L0z8mKakcaPwhf8WyYWVsIxXkHc/UG2/R+tLWT3l9hOQkx3f4LtLKSxv71GGAK0V+7BWvcvjdxjddujh5ToISfaQqL9Bzy2mGhCPNElzMnF9r2s4I/+/b//H63X5Vs=";
  }
});

// node_modules/@pdf-lib/standard-fonts/lib/Times-Roman.compressed.json
var require_Times_Roman_compressed = __commonJS({
  "node_modules/@pdf-lib/standard-fonts/lib/Times-Roman.compressed.json"(exports, module) {
    module.exports = "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";
  }
});

// node_modules/@pdf-lib/standard-fonts/lib/Symbol.compressed.json
var require_Symbol_compressed = __commonJS({
  "node_modules/@pdf-lib/standard-fonts/lib/Symbol.compressed.json"(exports, module) {
    module.exports = "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";
  }
});

// node_modules/@pdf-lib/standard-fonts/lib/ZapfDingbats.compressed.json
var require_ZapfDingbats_compressed = __commonJS({
  "node_modules/@pdf-lib/standard-fonts/lib/ZapfDingbats.compressed.json"(exports, module) {
    module.exports = "eJxtmNtu20YQhl+F4FULyMGeD7pz3AY1ChtG7NpFA18w1NomIlECSRcxgrx7SVk7+wOdG8H5OJydf2Z2d5gf9cV+t0v9VK/r+6vXsXlOlbHe28paq229qj/t++m62aXZ4J/m8PRb1z9/baZxefK63Z6eXN5dVMvTCh83u277xr/6kLrnl2XNq7TpXnczuZyabdee98/b2VzM/x4/dd/T5qab2pd6PQ2vaVVfvDRD005puE3Lu7eH1HbN9hTjx4/77/X6y5lcnUmjVzHIVVDicVX/1W/SsO36dLMfu6nb9/X6TAoBD+5euvZbn8axXtuZ36dhPJrVQqgPQoh5hev91LWLkIv94W1Ygq9+aX+tZAx2tfz64284/sblN/rqfLP/mqrbt3FKu7G67Nv9cNgPzZQ2H6rz7bb6vLgZq89pTMO/M/xfEqturJpqSM/d7GJIm2oamk3aNcO3av80O5xh3yyKmm1193ZIT02bqovTKjP+MAf++7zsZvZ3276kYyWWXB0z99S18/PbafPHQ71W4fjn/fxnFO+ZvkrT0LVzTr78qB/+nk38bHM9exgP8zr1z9U7jt6840YW5uSJKcZOCaBBnKgm5mU8MVNYyMwWFvO7Ukagkmgg6sDWQ5yFFqjzUrLEaQ3BEmiwNsMSaZS0vgWfOkPHWQowNeTUc0kumnxZvsgPxlGai6VTGUqAVCTQ6QkWnc77DKEiLktSUBJKqHIQZ86d8gCpHYoiEzMsb1ubYy8vW50DChB5ZhGqrijD0EqUIeiaEHIfCg5Kpuu0ApiToaGPSY0uaQsyr65L2oKi1yFt1PLaQ3lzfXTgXodGoJYzglndSLDMPg1sTPJpQJHJigw0QrGERqD9YhyTOgONQDUyuF1zaxuokc/BW2ztXCMrGZ9WMW1oQZHIXWNBkSCfRZEL5BMUiZw6CzVSFCfUSGZFNjIldoKDkonTKQiJIGzWmFd3BizJJ9SINoLDriOfUCOZS+zg+KGD1qGiLNMLxtJD1/ns00ON6EzyUCM6vbxhoBKaqbG3DFQCNiL1iHccBPV0DHhQH/JW8EW90dkyFKGywCJU0WkVSvSGeiSUODWFFD0HYdPQVoiRgfPMA+/nnRgiAyNYSjpWNQcNSMrtFCUH4ZIRpSCWocFCSuhCEY6hoUClc0WC52BJlCYYLQdhN+hygRRRlo5BKRRLS6oihSqh+ZzzRGG1Mo4Iz1LoP0qsxDGFzk0JE42ji0jCPejomJKCuwil4m5CiRMEUMVSzVLDUstSx1Juc0oVWMpqY295qVltmtWmWW2a1aZZbZrVplltmtWmWW2G1WZYbYbVZlhthtVmWG2G1WZYbYbVZlhtltVmWW2W1WZZbZbVZlltltVmWW2W1QYjQCh7E2aAQHeGhCFgPoNoy8KNb2wxBhmGKBxoUZXlLGsLI6AsftEDHV0wIURVbANLcTKlGGBIKPOAxCmhePCKUwFzAmpDFRQvjA9R06Hq8TONvshgKDCuRAZTXigUxjxNFfKRo3CLhnIJBMFRvMZpqpNBMlQJzGT5WFQMVQI/AikPMIhEU1aDjqJvQwmjSHB05cC9jbYwc5UtAHNLhDw41ha+lEqF4JaH3gmB61SYcqInxTDmQK8v08vjqv4zDf1N0w3Lf4A8/vwPpfK11w==";
  }
});

// node_modules/@pdf-lib/standard-fonts/lib/Font.js
var require_Font = __commonJS({
  "node_modules/@pdf-lib/standard-fonts/lib/Font.js"(exports) {
    "use strict";
    var __importDefault2 = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils_1 = require_utils();
    var Courier_Bold_compressed_json_1 = __importDefault2(require_Courier_Bold_compressed());
    var Courier_BoldOblique_compressed_json_1 = __importDefault2(require_Courier_BoldOblique_compressed());
    var Courier_Oblique_compressed_json_1 = __importDefault2(require_Courier_Oblique_compressed());
    var Courier_compressed_json_1 = __importDefault2(require_Courier_compressed());
    var Helvetica_Bold_compressed_json_1 = __importDefault2(require_Helvetica_Bold_compressed());
    var Helvetica_BoldOblique_compressed_json_1 = __importDefault2(require_Helvetica_BoldOblique_compressed());
    var Helvetica_Oblique_compressed_json_1 = __importDefault2(require_Helvetica_Oblique_compressed());
    var Helvetica_compressed_json_1 = __importDefault2(require_Helvetica_compressed());
    var Times_Bold_compressed_json_1 = __importDefault2(require_Times_Bold_compressed());
    var Times_BoldItalic_compressed_json_1 = __importDefault2(require_Times_BoldItalic_compressed());
    var Times_Italic_compressed_json_1 = __importDefault2(require_Times_Italic_compressed());
    var Times_Roman_compressed_json_1 = __importDefault2(require_Times_Roman_compressed());
    var Symbol_compressed_json_1 = __importDefault2(require_Symbol_compressed());
    var ZapfDingbats_compressed_json_1 = __importDefault2(require_ZapfDingbats_compressed());
    var compressedJsonForFontName = {
      "Courier": Courier_compressed_json_1.default,
      "Courier-Bold": Courier_Bold_compressed_json_1.default,
      "Courier-Oblique": Courier_Oblique_compressed_json_1.default,
      "Courier-BoldOblique": Courier_BoldOblique_compressed_json_1.default,
      "Helvetica": Helvetica_compressed_json_1.default,
      "Helvetica-Bold": Helvetica_Bold_compressed_json_1.default,
      "Helvetica-Oblique": Helvetica_Oblique_compressed_json_1.default,
      "Helvetica-BoldOblique": Helvetica_BoldOblique_compressed_json_1.default,
      "Times-Roman": Times_Roman_compressed_json_1.default,
      "Times-Bold": Times_Bold_compressed_json_1.default,
      "Times-Italic": Times_Italic_compressed_json_1.default,
      "Times-BoldItalic": Times_BoldItalic_compressed_json_1.default,
      "Symbol": Symbol_compressed_json_1.default,
      "ZapfDingbats": ZapfDingbats_compressed_json_1.default
    };
    var FontNames;
    (function(FontNames2) {
      FontNames2["Courier"] = "Courier";
      FontNames2["CourierBold"] = "Courier-Bold";
      FontNames2["CourierOblique"] = "Courier-Oblique";
      FontNames2["CourierBoldOblique"] = "Courier-BoldOblique";
      FontNames2["Helvetica"] = "Helvetica";
      FontNames2["HelveticaBold"] = "Helvetica-Bold";
      FontNames2["HelveticaOblique"] = "Helvetica-Oblique";
      FontNames2["HelveticaBoldOblique"] = "Helvetica-BoldOblique";
      FontNames2["TimesRoman"] = "Times-Roman";
      FontNames2["TimesRomanBold"] = "Times-Bold";
      FontNames2["TimesRomanItalic"] = "Times-Italic";
      FontNames2["TimesRomanBoldItalic"] = "Times-BoldItalic";
      FontNames2["Symbol"] = "Symbol";
      FontNames2["ZapfDingbats"] = "ZapfDingbats";
    })(FontNames = exports.FontNames || (exports.FontNames = {}));
    var fontCache = {};
    var Font = (
      /** @class */
      (function() {
        function Font2() {
          var _this = this;
          this.getWidthOfGlyph = function(glyphName) {
            return _this.CharWidths[glyphName];
          };
          this.getXAxisKerningForPair = function(leftGlyphName, rightGlyphName) {
            return (_this.KernPairXAmounts[leftGlyphName] || {})[rightGlyphName];
          };
        }
        Font2.load = function(fontName) {
          var cachedFont = fontCache[fontName];
          if (cachedFont)
            return cachedFont;
          var json = utils_1.decompressJson(compressedJsonForFontName[fontName]);
          var font = Object.assign(new Font2(), JSON.parse(json));
          font.CharWidths = font.CharMetrics.reduce(function(acc, metric) {
            acc[metric.N] = metric.WX;
            return acc;
          }, {});
          font.KernPairXAmounts = font.KernPairs.reduce(function(acc, _a) {
            var name1 = _a[0], name2 = _a[1], width = _a[2];
            if (!acc[name1])
              acc[name1] = {};
            acc[name1][name2] = width;
            return acc;
          }, {});
          fontCache[fontName] = font;
          return font;
        };
        return Font2;
      })()
    );
    exports.Font = Font;
  }
});

// node_modules/@pdf-lib/standard-fonts/lib/all-encodings.compressed.json
var require_all_encodings_compressed = __commonJS({
  "node_modules/@pdf-lib/standard-fonts/lib/all-encodings.compressed.json"(exports, module) {
    module.exports = "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";
  }
});

// node_modules/@pdf-lib/standard-fonts/lib/Encoding.js
var require_Encoding = __commonJS({
  "node_modules/@pdf-lib/standard-fonts/lib/Encoding.js"(exports) {
    "use strict";
    var __importDefault2 = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils_1 = require_utils();
    var all_encodings_compressed_json_1 = __importDefault2(require_all_encodings_compressed());
    var decompressedEncodings = utils_1.decompressJson(all_encodings_compressed_json_1.default);
    var allUnicodeMappings = JSON.parse(decompressedEncodings);
    var Encoding = (
      /** @class */
      /* @__PURE__ */ (function() {
        function Encoding2(name, unicodeMappings) {
          var _this = this;
          this.canEncodeUnicodeCodePoint = function(codePoint) {
            return codePoint in _this.unicodeMappings;
          };
          this.encodeUnicodeCodePoint = function(codePoint) {
            var mapped = _this.unicodeMappings[codePoint];
            if (!mapped) {
              var str = String.fromCharCode(codePoint);
              var hexCode = "0x" + utils_1.padStart(codePoint.toString(16), 4, "0");
              var msg = _this.name + ' cannot encode "' + str + '" (' + hexCode + ")";
              throw new Error(msg);
            }
            return { code: mapped[0], name: mapped[1] };
          };
          this.name = name;
          this.supportedCodePoints = Object.keys(unicodeMappings).map(Number).sort(function(a, b) {
            return a - b;
          });
          this.unicodeMappings = unicodeMappings;
        }
        return Encoding2;
      })()
    );
    exports.Encodings = {
      Symbol: new Encoding("Symbol", allUnicodeMappings.symbol),
      ZapfDingbats: new Encoding("ZapfDingbats", allUnicodeMappings.zapfdingbats),
      WinAnsi: new Encoding("WinAnsi", allUnicodeMappings.win1252)
    };
  }
});

// node_modules/@pdf-lib/standard-fonts/lib/index.js
var require_lib = __commonJS({
  "node_modules/@pdf-lib/standard-fonts/lib/index.js"(exports) {
    "use strict";
    function __export2(m) {
      for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export2(require_Font());
    __export2(require_Encoding());
  }
});

// node_modules/pdf-lib/cjs/utils/objects.js
var require_objects = __commonJS({
  "node_modules/pdf-lib/cjs/utils/objects.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.rectanglesAreEqual = exports.isStandardFont = exports.StandardFontValues = exports.values = void 0;
    var standard_fonts_1 = require_lib();
    exports.values = function(obj) {
      return Object.keys(obj).map(function(k) {
        return obj[k];
      });
    };
    exports.StandardFontValues = exports.values(standard_fonts_1.FontNames);
    exports.isStandardFont = function(input) {
      return exports.StandardFontValues.includes(input);
    };
    exports.rectanglesAreEqual = function(a, b) {
      return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
    };
  }
});

// node_modules/pdf-lib/cjs/utils/validators.js
var require_validators = __commonJS({
  "node_modules/pdf-lib/cjs/utils/validators.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.assertPositive = exports.assertInteger = exports.assertMultiple = exports.assertRangeOrUndefined = exports.assertRange = exports.assertEachIs = exports.assertOrUndefined = exports.assertIs = exports.createTypeErrorMsg = exports.isType = exports.getType = exports.assertIsSubset = exports.assertIsOneOfOrUndefined = exports.assertIsOneOf = exports.createValueErrorMsg = exports.singleQuote = exports.backtick = void 0;
    var objects_1 = require_objects();
    exports.backtick = function(val) {
      return "`" + val + "`";
    };
    exports.singleQuote = function(val) {
      return "'" + val + "'";
    };
    var formatValue = function(value) {
      var type = typeof value;
      if (type === "string")
        return exports.singleQuote(value);
      else if (type === "undefined")
        return exports.backtick(value);
      else
        return value;
    };
    exports.createValueErrorMsg = function(value, valueName, values) {
      var allowedValues = new Array(values.length);
      for (var idx = 0, len = values.length; idx < len; idx++) {
        var v = values[idx];
        allowedValues[idx] = formatValue(v);
      }
      var joinedValues = allowedValues.join(" or ");
      return exports.backtick(valueName) + " must be one of " + joinedValues + ", but was actually " + formatValue(value);
    };
    exports.assertIsOneOf = function(value, valueName, allowedValues) {
      if (!Array.isArray(allowedValues)) {
        allowedValues = objects_1.values(allowedValues);
      }
      for (var idx = 0, len = allowedValues.length; idx < len; idx++) {
        if (value === allowedValues[idx])
          return;
      }
      throw new TypeError(exports.createValueErrorMsg(value, valueName, allowedValues));
    };
    exports.assertIsOneOfOrUndefined = function(value, valueName, allowedValues) {
      if (!Array.isArray(allowedValues)) {
        allowedValues = objects_1.values(allowedValues);
      }
      exports.assertIsOneOf(value, valueName, allowedValues.concat(void 0));
    };
    exports.assertIsSubset = function(values, valueName, allowedValues) {
      if (!Array.isArray(allowedValues)) {
        allowedValues = objects_1.values(allowedValues);
      }
      for (var idx = 0, len = values.length; idx < len; idx++) {
        exports.assertIsOneOf(values[idx], valueName, allowedValues);
      }
    };
    exports.getType = function(val) {
      if (val === null)
        return "null";
      if (val === void 0)
        return "undefined";
      if (typeof val === "string")
        return "string";
      if (isNaN(val))
        return "NaN";
      if (typeof val === "number")
        return "number";
      if (typeof val === "boolean")
        return "boolean";
      if (typeof val === "symbol")
        return "symbol";
      if (typeof val === "bigint")
        return "bigint";
      if (val.constructor && val.constructor.name)
        return val.constructor.name;
      if (val.name)
        return val.name;
      if (val.constructor)
        return String(val.constructor);
      return String(val);
    };
    exports.isType = function(value, type) {
      if (type === "null")
        return value === null;
      if (type === "undefined")
        return value === void 0;
      if (type === "string")
        return typeof value === "string";
      if (type === "number")
        return typeof value === "number" && !isNaN(value);
      if (type === "boolean")
        return typeof value === "boolean";
      if (type === "symbol")
        return typeof value === "symbol";
      if (type === "bigint")
        return typeof value === "bigint";
      if (type === Date)
        return value instanceof Date;
      if (type === Array)
        return value instanceof Array;
      if (type === Uint8Array)
        return value instanceof Uint8Array;
      if (type === ArrayBuffer)
        return value instanceof ArrayBuffer;
      if (type === Function)
        return value instanceof Function;
      return value instanceof type[0];
    };
    exports.createTypeErrorMsg = function(value, valueName, types) {
      var allowedTypes = new Array(types.length);
      for (var idx = 0, len = types.length; idx < len; idx++) {
        var type = types[idx];
        if (type === "null")
          allowedTypes[idx] = exports.backtick("null");
        if (type === "undefined")
          allowedTypes[idx] = exports.backtick("undefined");
        if (type === "string")
          allowedTypes[idx] = exports.backtick("string");
        else if (type === "number")
          allowedTypes[idx] = exports.backtick("number");
        else if (type === "boolean")
          allowedTypes[idx] = exports.backtick("boolean");
        else if (type === "symbol")
          allowedTypes[idx] = exports.backtick("symbol");
        else if (type === "bigint")
          allowedTypes[idx] = exports.backtick("bigint");
        else if (type === Array)
          allowedTypes[idx] = exports.backtick("Array");
        else if (type === Uint8Array)
          allowedTypes[idx] = exports.backtick("Uint8Array");
        else if (type === ArrayBuffer)
          allowedTypes[idx] = exports.backtick("ArrayBuffer");
        else
          allowedTypes[idx] = exports.backtick(type[1]);
      }
      var joinedTypes = allowedTypes.join(" or ");
      return exports.backtick(valueName) + " must be of type " + joinedTypes + ", but was actually of type " + exports.backtick(exports.getType(value));
    };
    exports.assertIs = function(value, valueName, types) {
      for (var idx = 0, len = types.length; idx < len; idx++) {
        if (exports.isType(value, types[idx]))
          return;
      }
      throw new TypeError(exports.createTypeErrorMsg(value, valueName, types));
    };
    exports.assertOrUndefined = function(value, valueName, types) {
      exports.assertIs(value, valueName, types.concat("undefined"));
    };
    exports.assertEachIs = function(values, valueName, types) {
      for (var idx = 0, len = values.length; idx < len; idx++) {
        exports.assertIs(values[idx], valueName, types);
      }
    };
    exports.assertRange = function(value, valueName, min, max) {
      exports.assertIs(value, valueName, ["number"]);
      exports.assertIs(min, "min", ["number"]);
      exports.assertIs(max, "max", ["number"]);
      max = Math.max(min, max);
      if (value < min || value > max) {
        throw new Error(exports.backtick(valueName) + " must be at least " + min + " and at most " + max + ", but was actually " + value);
      }
    };
    exports.assertRangeOrUndefined = function(value, valueName, min, max) {
      exports.assertIs(value, valueName, ["number", "undefined"]);
      if (typeof value === "number")
        exports.assertRange(value, valueName, min, max);
    };
    exports.assertMultiple = function(value, valueName, multiplier) {
      exports.assertIs(value, valueName, ["number"]);
      if (value % multiplier !== 0) {
        throw new Error(exports.backtick(valueName) + " must be a multiple of " + multiplier + ", but was actually " + value);
      }
    };
    exports.assertInteger = function(value, valueName) {
      if (!Number.isInteger(value)) {
        throw new Error(exports.backtick(valueName) + " must be an integer, but was actually " + value);
      }
    };
    exports.assertPositive = function(value, valueName) {
      if (![1, 0].includes(Math.sign(value))) {
        throw new Error(exports.backtick(valueName) + " must be a positive number or 0, but was actually " + value);
      }
    };
  }
});

// node_modules/pdf-lib/cjs/utils/pdfDocEncoding.js
var require_pdfDocEncoding = __commonJS({
  "node_modules/pdf-lib/cjs/utils/pdfDocEncoding.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.pdfDocEncodingDecode = void 0;
    var strings_1 = require_strings();
    var pdfDocEncodingToUnicode = new Uint16Array(256);
    for (idx = 0; idx < 256; idx++) {
      pdfDocEncodingToUnicode[idx] = idx;
    }
    var idx;
    pdfDocEncodingToUnicode[22] = strings_1.toCharCode("");
    pdfDocEncodingToUnicode[24] = strings_1.toCharCode("\u02D8");
    pdfDocEncodingToUnicode[25] = strings_1.toCharCode("\u02C7");
    pdfDocEncodingToUnicode[26] = strings_1.toCharCode("\u02C6");
    pdfDocEncodingToUnicode[27] = strings_1.toCharCode("\u02D9");
    pdfDocEncodingToUnicode[28] = strings_1.toCharCode("\u02DD");
    pdfDocEncodingToUnicode[29] = strings_1.toCharCode("\u02DB");
    pdfDocEncodingToUnicode[30] = strings_1.toCharCode("\u02DA");
    pdfDocEncodingToUnicode[31] = strings_1.toCharCode("\u02DC");
    pdfDocEncodingToUnicode[127] = strings_1.toCharCode("\uFFFD");
    pdfDocEncodingToUnicode[128] = strings_1.toCharCode("\u2022");
    pdfDocEncodingToUnicode[129] = strings_1.toCharCode("\u2020");
    pdfDocEncodingToUnicode[130] = strings_1.toCharCode("\u2021");
    pdfDocEncodingToUnicode[131] = strings_1.toCharCode("\u2026");
    pdfDocEncodingToUnicode[132] = strings_1.toCharCode("\u2014");
    pdfDocEncodingToUnicode[133] = strings_1.toCharCode("\u2013");
    pdfDocEncodingToUnicode[134] = strings_1.toCharCode("\u0192");
    pdfDocEncodingToUnicode[135] = strings_1.toCharCode("\u2044");
    pdfDocEncodingToUnicode[136] = strings_1.toCharCode("\u2039");
    pdfDocEncodingToUnicode[137] = strings_1.toCharCode("\u203A");
    pdfDocEncodingToUnicode[138] = strings_1.toCharCode("\u2212");
    pdfDocEncodingToUnicode[139] = strings_1.toCharCode("\u2030");
    pdfDocEncodingToUnicode[140] = strings_1.toCharCode("\u201E");
    pdfDocEncodingToUnicode[141] = strings_1.toCharCode("\u201C");
    pdfDocEncodingToUnicode[142] = strings_1.toCharCode("\u201D");
    pdfDocEncodingToUnicode[143] = strings_1.toCharCode("\u2018");
    pdfDocEncodingToUnicode[144] = strings_1.toCharCode("\u2019");
    pdfDocEncodingToUnicode[145] = strings_1.toCharCode("\u201A");
    pdfDocEncodingToUnicode[146] = strings_1.toCharCode("\u2122");
    pdfDocEncodingToUnicode[147] = strings_1.toCharCode("\uFB01");
    pdfDocEncodingToUnicode[148] = strings_1.toCharCode("\uFB02");
    pdfDocEncodingToUnicode[149] = strings_1.toCharCode("\u0141");
    pdfDocEncodingToUnicode[150] = strings_1.toCharCode("\u0152");
    pdfDocEncodingToUnicode[151] = strings_1.toCharCode("\u0160");
    pdfDocEncodingToUnicode[152] = strings_1.toCharCode("\u0178");
    pdfDocEncodingToUnicode[153] = strings_1.toCharCode("\u017D");
    pdfDocEncodingToUnicode[154] = strings_1.toCharCode("\u0131");
    pdfDocEncodingToUnicode[155] = strings_1.toCharCode("\u0142");
    pdfDocEncodingToUnicode[156] = strings_1.toCharCode("\u0153");
    pdfDocEncodingToUnicode[157] = strings_1.toCharCode("\u0161");
    pdfDocEncodingToUnicode[158] = strings_1.toCharCode("\u017E");
    pdfDocEncodingToUnicode[159] = strings_1.toCharCode("\uFFFD");
    pdfDocEncodingToUnicode[160] = strings_1.toCharCode("\u20AC");
    pdfDocEncodingToUnicode[173] = strings_1.toCharCode("\uFFFD");
    exports.pdfDocEncodingDecode = function(bytes) {
      var codePoints = new Array(bytes.length);
      for (var idx2 = 0, len = bytes.length; idx2 < len; idx2++) {
        codePoints[idx2] = pdfDocEncodingToUnicode[bytes[idx2]];
      }
      return String.fromCodePoint.apply(String, codePoints);
    };
  }
});

// node_modules/pdf-lib/cjs/utils/Cache.js
var require_Cache = __commonJS({
  "node_modules/pdf-lib/cjs/utils/Cache.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Cache = (
      /** @class */
      (function() {
        function Cache2(populate) {
          this.populate = populate;
          this.value = void 0;
        }
        Cache2.prototype.getValue = function() {
          return this.value;
        };
        Cache2.prototype.access = function() {
          if (!this.value)
            this.value = this.populate();
          return this.value;
        };
        Cache2.prototype.invalidate = function() {
          this.value = void 0;
        };
        Cache2.populatedBy = function(populate) {
          return new Cache2(populate);
        };
        return Cache2;
      })()
    );
    exports.default = Cache;
  }
});

// node_modules/pdf-lib/cjs/utils/index.js
var require_utils2 = __commonJS({
  "node_modules/pdf-lib/cjs/utils/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_arrays(), exports);
    tslib_1.__exportStar(require_async(), exports);
    tslib_1.__exportStar(require_strings(), exports);
    tslib_1.__exportStar(require_unicode(), exports);
    tslib_1.__exportStar(require_numbers(), exports);
    tslib_1.__exportStar(require_errors(), exports);
    tslib_1.__exportStar(require_base64(), exports);
    tslib_1.__exportStar(require_objects(), exports);
    tslib_1.__exportStar(require_validators(), exports);
    tslib_1.__exportStar(require_pdfDocEncoding(), exports);
    var Cache_1 = require_Cache();
    Object.defineProperty(exports, "Cache", { enumerable: true, get: function() {
      return Cache_1.default;
    } });
  }
});

// node_modules/pdf-lib/cjs/core/errors.js
var require_errors2 = __commonJS({
  "node_modules/pdf-lib/cjs/core/errors.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MissingKeywordError = exports.MissingPDFHeaderError = exports.StalledParserError = exports.UnbalancedParenthesisError = exports.PDFStreamParsingError = exports.PDFInvalidObjectParsingError = exports.PDFObjectParsingError = exports.NextByteAssertionError = exports.PDFParsingError = exports.NumberParsingError = exports.MissingTfOperatorError = exports.MissingDAEntryError = exports.MultiSelectValueError = exports.InvalidAcroFieldValueError = exports.IndexOutOfBoundsError = exports.CorruptPageTreeError = exports.InvalidTargetIndexError = exports.InvalidPDFDateStringError = exports.PDFArrayIsNotRectangleError = exports.PageEmbeddingMismatchedContextError = exports.UnrecognizedStreamTypeError = exports.MissingPageContentsEmbeddingError = exports.MissingCatalogError = exports.ReparseError = exports.UnsupportedEncodingError = exports.UnexpectedObjectTypeError = exports.PrivateConstructorError = exports.MethodNotImplementedError = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var utils_1 = require_utils2();
    var MethodNotImplementedError = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(MethodNotImplementedError2, _super);
        function MethodNotImplementedError2(className, methodName) {
          var _this = this;
          var msg = "Method " + className + "." + methodName + "() not implemented";
          _this = _super.call(this, msg) || this;
          return _this;
        }
        return MethodNotImplementedError2;
      })(Error)
    );
    exports.MethodNotImplementedError = MethodNotImplementedError;
    var PrivateConstructorError = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PrivateConstructorError2, _super);
        function PrivateConstructorError2(className) {
          var _this = this;
          var msg = "Cannot construct " + className + " - it has a private constructor";
          _this = _super.call(this, msg) || this;
          return _this;
        }
        return PrivateConstructorError2;
      })(Error)
    );
    exports.PrivateConstructorError = PrivateConstructorError;
    var UnexpectedObjectTypeError = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(UnexpectedObjectTypeError2, _super);
        function UnexpectedObjectTypeError2(expected, actual) {
          var _this = this;
          var name = function(t) {
            var _a, _b;
            return (_a = t === null || t === void 0 ? void 0 : t.name) !== null && _a !== void 0 ? _a : (_b = t === null || t === void 0 ? void 0 : t.constructor) === null || _b === void 0 ? void 0 : _b.name;
          };
          var expectedTypes = Array.isArray(expected) ? expected.map(name) : [name(expected)];
          var msg = "Expected instance of " + expectedTypes.join(" or ") + ", " + ("but got instance of " + (actual ? name(actual) : actual));
          _this = _super.call(this, msg) || this;
          return _this;
        }
        return UnexpectedObjectTypeError2;
      })(Error)
    );
    exports.UnexpectedObjectTypeError = UnexpectedObjectTypeError;
    var UnsupportedEncodingError = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(UnsupportedEncodingError2, _super);
        function UnsupportedEncodingError2(encoding) {
          var _this = this;
          var msg = encoding + " stream encoding not supported";
          _this = _super.call(this, msg) || this;
          return _this;
        }
        return UnsupportedEncodingError2;
      })(Error)
    );
    exports.UnsupportedEncodingError = UnsupportedEncodingError;
    var ReparseError = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(ReparseError2, _super);
        function ReparseError2(className, methodName) {
          var _this = this;
          var msg = "Cannot call " + className + "." + methodName + "() more than once";
          _this = _super.call(this, msg) || this;
          return _this;
        }
        return ReparseError2;
      })(Error)
    );
    exports.ReparseError = ReparseError;
    var MissingCatalogError = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(MissingCatalogError2, _super);
        function MissingCatalogError2(ref) {
          var _this = this;
          var msg = "Missing catalog (ref=" + ref + ")";
          _this = _super.call(this, msg) || this;
          return _this;
        }
        return MissingCatalogError2;
      })(Error)
    );
    exports.MissingCatalogError = MissingCatalogError;
    var MissingPageContentsEmbeddingError = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(MissingPageContentsEmbeddingError2, _super);
        function MissingPageContentsEmbeddingError2() {
          var _this = this;
          var msg = "Can't embed page with missing Contents";
          _this = _super.call(this, msg) || this;
          return _this;
        }
        return MissingPageContentsEmbeddingError2;
      })(Error)
    );
    exports.MissingPageContentsEmbeddingError = MissingPageContentsEmbeddingError;
    var UnrecognizedStreamTypeError = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(UnrecognizedStreamTypeError2, _super);
        function UnrecognizedStreamTypeError2(stream) {
          var _a, _b, _c;
          var _this = this;
          var streamType = (_c = (_b = (_a = stream === null || stream === void 0 ? void 0 : stream.contructor) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : stream === null || stream === void 0 ? void 0 : stream.name) !== null && _c !== void 0 ? _c : stream;
          var msg = "Unrecognized stream type: " + streamType;
          _this = _super.call(this, msg) || this;
          return _this;
        }
        return UnrecognizedStreamTypeError2;
      })(Error)
    );
    exports.UnrecognizedStreamTypeError = UnrecognizedStreamTypeError;
    var PageEmbeddingMismatchedContextError = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PageEmbeddingMismatchedContextError2, _super);
        function PageEmbeddingMismatchedContextError2() {
          var _this = this;
          var msg = "Found mismatched contexts while embedding pages. All pages in the array passed to `PDFDocument.embedPages()` must be from the same document.";
          _this = _super.call(this, msg) || this;
          return _this;
        }
        return PageEmbeddingMismatchedContextError2;
      })(Error)
    );
    exports.PageEmbeddingMismatchedContextError = PageEmbeddingMismatchedContextError;
    var PDFArrayIsNotRectangleError = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PDFArrayIsNotRectangleError2, _super);
        function PDFArrayIsNotRectangleError2(size) {
          var _this = this;
          var msg = "Attempted to convert PDFArray with " + size + " elements to rectangle, but must have exactly 4 elements.";
          _this = _super.call(this, msg) || this;
          return _this;
        }
        return PDFArrayIsNotRectangleError2;
      })(Error)
    );
    exports.PDFArrayIsNotRectangleError = PDFArrayIsNotRectangleError;
    var InvalidPDFDateStringError = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(InvalidPDFDateStringError2, _super);
        function InvalidPDFDateStringError2(value) {
          var _this = this;
          var msg = 'Attempted to convert "' + value + '" to a date, but it does not match the PDF date string format.';
          _this = _super.call(this, msg) || this;
          return _this;
        }
        return InvalidPDFDateStringError2;
      })(Error)
    );
    exports.InvalidPDFDateStringError = InvalidPDFDateStringError;
    var InvalidTargetIndexError = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(InvalidTargetIndexError2, _super);
        function InvalidTargetIndexError2(targetIndex, Count) {
          var _this = this;
          var msg = "Invalid targetIndex specified: targetIndex=" + targetIndex + " must be less than Count=" + Count;
          _this = _super.call(this, msg) || this;
          return _this;
        }
        return InvalidTargetIndexError2;
      })(Error)
    );
    exports.InvalidTargetIndexError = InvalidTargetIndexError;
    var CorruptPageTreeError = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(CorruptPageTreeError2, _super);
        function CorruptPageTreeError2(targetIndex, operation) {
          var _this = this;
          var msg = "Failed to " + operation + " at targetIndex=" + targetIndex + " due to corrupt page tree: It is likely that one or more 'Count' entries are invalid";
          _this = _super.call(this, msg) || this;
          return _this;
        }
        return CorruptPageTreeError2;
      })(Error)
    );
    exports.CorruptPageTreeError = CorruptPageTreeError;
    var IndexOutOfBoundsError = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(IndexOutOfBoundsError2, _super);
        function IndexOutOfBoundsError2(index, min, max) {
          var _this = this;
          var msg = "index should be at least " + min + " and at most " + max + ", but was actually " + index;
          _this = _super.call(this, msg) || this;
          return _this;
        }
        return IndexOutOfBoundsError2;
      })(Error)
    );
    exports.IndexOutOfBoundsError = IndexOutOfBoundsError;
    var InvalidAcroFieldValueError = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(InvalidAcroFieldValueError2, _super);
        function InvalidAcroFieldValueError2() {
          var _this = this;
          var msg = "Attempted to set invalid field value";
          _this = _super.call(this, msg) || this;
          return _this;
        }
        return InvalidAcroFieldValueError2;
      })(Error)
    );
    exports.InvalidAcroFieldValueError = InvalidAcroFieldValueError;
    var MultiSelectValueError = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(MultiSelectValueError2, _super);
        function MultiSelectValueError2() {
          var _this = this;
          var msg = "Attempted to select multiple values for single-select field";
          _this = _super.call(this, msg) || this;
          return _this;
        }
        return MultiSelectValueError2;
      })(Error)
    );
    exports.MultiSelectValueError = MultiSelectValueError;
    var MissingDAEntryError = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(MissingDAEntryError2, _super);
        function MissingDAEntryError2(fieldName) {
          var _this = this;
          var msg = "No /DA (default appearance) entry found for field: " + fieldName;
          _this = _super.call(this, msg) || this;
          return _this;
        }
        return MissingDAEntryError2;
      })(Error)
    );
    exports.MissingDAEntryError = MissingDAEntryError;
    var MissingTfOperatorError = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(MissingTfOperatorError2, _super);
        function MissingTfOperatorError2(fieldName) {
          var _this = this;
          var msg = "No Tf operator found for DA of field: " + fieldName;
          _this = _super.call(this, msg) || this;
          return _this;
        }
        return MissingTfOperatorError2;
      })(Error)
    );
    exports.MissingTfOperatorError = MissingTfOperatorError;
    var NumberParsingError = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(NumberParsingError2, _super);
        function NumberParsingError2(pos, value) {
          var _this = this;
          var msg = "Failed to parse number " + ("(line:" + pos.line + " col:" + pos.column + " offset=" + pos.offset + '): "' + value + '"');
          _this = _super.call(this, msg) || this;
          return _this;
        }
        return NumberParsingError2;
      })(Error)
    );
    exports.NumberParsingError = NumberParsingError;
    var PDFParsingError = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PDFParsingError2, _super);
        function PDFParsingError2(pos, details) {
          var _this = this;
          var msg = "Failed to parse PDF document " + ("(line:" + pos.line + " col:" + pos.column + " offset=" + pos.offset + "): " + details);
          _this = _super.call(this, msg) || this;
          return _this;
        }
        return PDFParsingError2;
      })(Error)
    );
    exports.PDFParsingError = PDFParsingError;
    var NextByteAssertionError = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(NextByteAssertionError2, _super);
        function NextByteAssertionError2(pos, expectedByte, actualByte) {
          var _this = this;
          var msg = "Expected next byte to be " + expectedByte + " but it was actually " + actualByte;
          _this = _super.call(this, pos, msg) || this;
          return _this;
        }
        return NextByteAssertionError2;
      })(PDFParsingError)
    );
    exports.NextByteAssertionError = NextByteAssertionError;
    var PDFObjectParsingError = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PDFObjectParsingError2, _super);
        function PDFObjectParsingError2(pos, byte) {
          var _this = this;
          var msg = "Failed to parse PDF object starting with the following byte: " + byte;
          _this = _super.call(this, pos, msg) || this;
          return _this;
        }
        return PDFObjectParsingError2;
      })(PDFParsingError)
    );
    exports.PDFObjectParsingError = PDFObjectParsingError;
    var PDFInvalidObjectParsingError = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PDFInvalidObjectParsingError2, _super);
        function PDFInvalidObjectParsingError2(pos) {
          var _this = this;
          var msg = "Failed to parse invalid PDF object";
          _this = _super.call(this, pos, msg) || this;
          return _this;
        }
        return PDFInvalidObjectParsingError2;
      })(PDFParsingError)
    );
    exports.PDFInvalidObjectParsingError = PDFInvalidObjectParsingError;
    var PDFStreamParsingError = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PDFStreamParsingError2, _super);
        function PDFStreamParsingError2(pos) {
          var _this = this;
          var msg = "Failed to parse PDF stream";
          _this = _super.call(this, pos, msg) || this;
          return _this;
        }
        return PDFStreamParsingError2;
      })(PDFParsingError)
    );
    exports.PDFStreamParsingError = PDFStreamParsingError;
    var UnbalancedParenthesisError = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(UnbalancedParenthesisError2, _super);
        function UnbalancedParenthesisError2(pos) {
          var _this = this;
          var msg = "Failed to parse PDF literal string due to unbalanced parenthesis";
          _this = _super.call(this, pos, msg) || this;
          return _this;
        }
        return UnbalancedParenthesisError2;
      })(PDFParsingError)
    );
    exports.UnbalancedParenthesisError = UnbalancedParenthesisError;
    var StalledParserError = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(StalledParserError2, _super);
        function StalledParserError2(pos) {
          var _this = this;
          var msg = "Parser stalled";
          _this = _super.call(this, pos, msg) || this;
          return _this;
        }
        return StalledParserError2;
      })(PDFParsingError)
    );
    exports.StalledParserError = StalledParserError;
    var MissingPDFHeaderError = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(MissingPDFHeaderError2, _super);
        function MissingPDFHeaderError2(pos) {
          var _this = this;
          var msg = "No PDF header found";
          _this = _super.call(this, pos, msg) || this;
          return _this;
        }
        return MissingPDFHeaderError2;
      })(PDFParsingError)
    );
    exports.MissingPDFHeaderError = MissingPDFHeaderError;
    var MissingKeywordError = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(MissingKeywordError2, _super);
        function MissingKeywordError2(pos, keyword) {
          var _this = this;
          var msg = "Did not find expected keyword '" + utils_1.arrayAsString(keyword) + "'";
          _this = _super.call(this, pos, msg) || this;
          return _this;
        }
        return MissingKeywordError2;
      })(PDFParsingError)
    );
    exports.MissingKeywordError = MissingKeywordError;
  }
});

// node_modules/pdf-lib/cjs/core/syntax/CharCodes.js
var require_CharCodes = __commonJS({
  "node_modules/pdf-lib/cjs/core/syntax/CharCodes.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CharCodes;
    (function(CharCodes2) {
      CharCodes2[CharCodes2["Null"] = 0] = "Null";
      CharCodes2[CharCodes2["Backspace"] = 8] = "Backspace";
      CharCodes2[CharCodes2["Tab"] = 9] = "Tab";
      CharCodes2[CharCodes2["Newline"] = 10] = "Newline";
      CharCodes2[CharCodes2["FormFeed"] = 12] = "FormFeed";
      CharCodes2[CharCodes2["CarriageReturn"] = 13] = "CarriageReturn";
      CharCodes2[CharCodes2["Space"] = 32] = "Space";
      CharCodes2[CharCodes2["ExclamationPoint"] = 33] = "ExclamationPoint";
      CharCodes2[CharCodes2["Hash"] = 35] = "Hash";
      CharCodes2[CharCodes2["Percent"] = 37] = "Percent";
      CharCodes2[CharCodes2["LeftParen"] = 40] = "LeftParen";
      CharCodes2[CharCodes2["RightParen"] = 41] = "RightParen";
      CharCodes2[CharCodes2["Plus"] = 43] = "Plus";
      CharCodes2[CharCodes2["Minus"] = 45] = "Minus";
      CharCodes2[CharCodes2["Dash"] = 45] = "Dash";
      CharCodes2[CharCodes2["Period"] = 46] = "Period";
      CharCodes2[CharCodes2["ForwardSlash"] = 47] = "ForwardSlash";
      CharCodes2[CharCodes2["Zero"] = 48] = "Zero";
      CharCodes2[CharCodes2["One"] = 49] = "One";
      CharCodes2[CharCodes2["Two"] = 50] = "Two";
      CharCodes2[CharCodes2["Three"] = 51] = "Three";
      CharCodes2[CharCodes2["Four"] = 52] = "Four";
      CharCodes2[CharCodes2["Five"] = 53] = "Five";
      CharCodes2[CharCodes2["Six"] = 54] = "Six";
      CharCodes2[CharCodes2["Seven"] = 55] = "Seven";
      CharCodes2[CharCodes2["Eight"] = 56] = "Eight";
      CharCodes2[CharCodes2["Nine"] = 57] = "Nine";
      CharCodes2[CharCodes2["LessThan"] = 60] = "LessThan";
      CharCodes2[CharCodes2["GreaterThan"] = 62] = "GreaterThan";
      CharCodes2[CharCodes2["A"] = 65] = "A";
      CharCodes2[CharCodes2["D"] = 68] = "D";
      CharCodes2[CharCodes2["E"] = 69] = "E";
      CharCodes2[CharCodes2["F"] = 70] = "F";
      CharCodes2[CharCodes2["O"] = 79] = "O";
      CharCodes2[CharCodes2["P"] = 80] = "P";
      CharCodes2[CharCodes2["R"] = 82] = "R";
      CharCodes2[CharCodes2["LeftSquareBracket"] = 91] = "LeftSquareBracket";
      CharCodes2[CharCodes2["BackSlash"] = 92] = "BackSlash";
      CharCodes2[CharCodes2["RightSquareBracket"] = 93] = "RightSquareBracket";
      CharCodes2[CharCodes2["a"] = 97] = "a";
      CharCodes2[CharCodes2["b"] = 98] = "b";
      CharCodes2[CharCodes2["d"] = 100] = "d";
      CharCodes2[CharCodes2["e"] = 101] = "e";
      CharCodes2[CharCodes2["f"] = 102] = "f";
      CharCodes2[CharCodes2["i"] = 105] = "i";
      CharCodes2[CharCodes2["j"] = 106] = "j";
      CharCodes2[CharCodes2["l"] = 108] = "l";
      CharCodes2[CharCodes2["m"] = 109] = "m";
      CharCodes2[CharCodes2["n"] = 110] = "n";
      CharCodes2[CharCodes2["o"] = 111] = "o";
      CharCodes2[CharCodes2["r"] = 114] = "r";
      CharCodes2[CharCodes2["s"] = 115] = "s";
      CharCodes2[CharCodes2["t"] = 116] = "t";
      CharCodes2[CharCodes2["u"] = 117] = "u";
      CharCodes2[CharCodes2["x"] = 120] = "x";
      CharCodes2[CharCodes2["LeftCurly"] = 123] = "LeftCurly";
      CharCodes2[CharCodes2["RightCurly"] = 125] = "RightCurly";
      CharCodes2[CharCodes2["Tilde"] = 126] = "Tilde";
    })(CharCodes || (CharCodes = {}));
    exports.default = CharCodes;
  }
});

// node_modules/pdf-lib/cjs/core/document/PDFHeader.js
var require_PDFHeader = __commonJS({
  "node_modules/pdf-lib/cjs/core/document/PDFHeader.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var CharCodes_1 = tslib_1.__importDefault(require_CharCodes());
    var utils_1 = require_utils2();
    var PDFHeader = (
      /** @class */
      (function() {
        function PDFHeader2(major, minor) {
          this.major = String(major);
          this.minor = String(minor);
        }
        PDFHeader2.prototype.toString = function() {
          var bc = utils_1.charFromCode(129);
          return "%PDF-" + this.major + "." + this.minor + "\n%" + bc + bc + bc + bc;
        };
        PDFHeader2.prototype.sizeInBytes = function() {
          return 12 + this.major.length + this.minor.length;
        };
        PDFHeader2.prototype.copyBytesInto = function(buffer, offset) {
          var initialOffset = offset;
          buffer[offset++] = CharCodes_1.default.Percent;
          buffer[offset++] = CharCodes_1.default.P;
          buffer[offset++] = CharCodes_1.default.D;
          buffer[offset++] = CharCodes_1.default.F;
          buffer[offset++] = CharCodes_1.default.Dash;
          offset += utils_1.copyStringIntoBuffer(this.major, buffer, offset);
          buffer[offset++] = CharCodes_1.default.Period;
          offset += utils_1.copyStringIntoBuffer(this.minor, buffer, offset);
          buffer[offset++] = CharCodes_1.default.Newline;
          buffer[offset++] = CharCodes_1.default.Percent;
          buffer[offset++] = 129;
          buffer[offset++] = 129;
          buffer[offset++] = 129;
          buffer[offset++] = 129;
          return offset - initialOffset;
        };
        PDFHeader2.forVersion = function(major, minor) {
          return new PDFHeader2(major, minor);
        };
        return PDFHeader2;
      })()
    );
    exports.default = PDFHeader;
  }
});

// node_modules/pdf-lib/cjs/core/objects/PDFObject.js
var require_PDFObject = __commonJS({
  "node_modules/pdf-lib/cjs/core/objects/PDFObject.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var errors_1 = require_errors2();
    var PDFObject = (
      /** @class */
      (function() {
        function PDFObject2() {
        }
        PDFObject2.prototype.clone = function(_context) {
          throw new errors_1.MethodNotImplementedError(this.constructor.name, "clone");
        };
        PDFObject2.prototype.toString = function() {
          throw new errors_1.MethodNotImplementedError(this.constructor.name, "toString");
        };
        PDFObject2.prototype.sizeInBytes = function() {
          throw new errors_1.MethodNotImplementedError(this.constructor.name, "sizeInBytes");
        };
        PDFObject2.prototype.copyBytesInto = function(_buffer, _offset) {
          throw new errors_1.MethodNotImplementedError(this.constructor.name, "copyBytesInto");
        };
        return PDFObject2;
      })()
    );
    exports.default = PDFObject;
  }
});

// node_modules/pdf-lib/cjs/core/objects/PDFNumber.js
var require_PDFNumber = __commonJS({
  "node_modules/pdf-lib/cjs/core/objects/PDFNumber.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var index_1 = require_utils2();
    var PDFObject_1 = tslib_1.__importDefault(require_PDFObject());
    var PDFNumber = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PDFNumber2, _super);
        function PDFNumber2(value) {
          var _this = _super.call(this) || this;
          _this.numberValue = value;
          _this.stringValue = index_1.numberToString(value);
          return _this;
        }
        PDFNumber2.prototype.asNumber = function() {
          return this.numberValue;
        };
        PDFNumber2.prototype.value = function() {
          return this.numberValue;
        };
        PDFNumber2.prototype.clone = function() {
          return PDFNumber2.of(this.numberValue);
        };
        PDFNumber2.prototype.toString = function() {
          return this.stringValue;
        };
        PDFNumber2.prototype.sizeInBytes = function() {
          return this.stringValue.length;
        };
        PDFNumber2.prototype.copyBytesInto = function(buffer, offset) {
          offset += index_1.copyStringIntoBuffer(this.stringValue, buffer, offset);
          return this.stringValue.length;
        };
        PDFNumber2.of = function(value) {
          return new PDFNumber2(value);
        };
        return PDFNumber2;
      })(PDFObject_1.default)
    );
    exports.default = PDFNumber;
  }
});

// node_modules/pdf-lib/cjs/core/objects/PDFArray.js
var require_PDFArray = __commonJS({
  "node_modules/pdf-lib/cjs/core/objects/PDFArray.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFNumber_1 = tslib_1.__importDefault(require_PDFNumber());
    var PDFObject_1 = tslib_1.__importDefault(require_PDFObject());
    var CharCodes_1 = tslib_1.__importDefault(require_CharCodes());
    var errors_1 = require_errors2();
    var PDFArray = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PDFArray2, _super);
        function PDFArray2(context) {
          var _this = _super.call(this) || this;
          _this.array = [];
          _this.context = context;
          return _this;
        }
        PDFArray2.prototype.size = function() {
          return this.array.length;
        };
        PDFArray2.prototype.push = function(object) {
          this.array.push(object);
        };
        PDFArray2.prototype.insert = function(index, object) {
          this.array.splice(index, 0, object);
        };
        PDFArray2.prototype.indexOf = function(object) {
          var index = this.array.indexOf(object);
          return index === -1 ? void 0 : index;
        };
        PDFArray2.prototype.remove = function(index) {
          this.array.splice(index, 1);
        };
        PDFArray2.prototype.set = function(idx, object) {
          this.array[idx] = object;
        };
        PDFArray2.prototype.get = function(index) {
          return this.array[index];
        };
        PDFArray2.prototype.lookupMaybe = function(index) {
          var _a;
          var types = [];
          for (var _i = 1; _i < arguments.length; _i++) {
            types[_i - 1] = arguments[_i];
          }
          return (_a = this.context).lookupMaybe.apply(_a, tslib_1.__spreadArrays([this.get(index)], types));
        };
        PDFArray2.prototype.lookup = function(index) {
          var _a;
          var types = [];
          for (var _i = 1; _i < arguments.length; _i++) {
            types[_i - 1] = arguments[_i];
          }
          return (_a = this.context).lookup.apply(_a, tslib_1.__spreadArrays([this.get(index)], types));
        };
        PDFArray2.prototype.asRectangle = function() {
          if (this.size() !== 4)
            throw new errors_1.PDFArrayIsNotRectangleError(this.size());
          var lowerLeftX = this.lookup(0, PDFNumber_1.default).asNumber();
          var lowerLeftY = this.lookup(1, PDFNumber_1.default).asNumber();
          var upperRightX = this.lookup(2, PDFNumber_1.default).asNumber();
          var upperRightY = this.lookup(3, PDFNumber_1.default).asNumber();
          var x = lowerLeftX;
          var y = lowerLeftY;
          var width = upperRightX - lowerLeftX;
          var height = upperRightY - lowerLeftY;
          return { x, y, width, height };
        };
        PDFArray2.prototype.asArray = function() {
          return this.array.slice();
        };
        PDFArray2.prototype.clone = function(context) {
          var clone = PDFArray2.withContext(context || this.context);
          for (var idx = 0, len = this.size(); idx < len; idx++) {
            clone.push(this.array[idx]);
          }
          return clone;
        };
        PDFArray2.prototype.toString = function() {
          var arrayString = "[ ";
          for (var idx = 0, len = this.size(); idx < len; idx++) {
            arrayString += this.get(idx).toString();
            arrayString += " ";
          }
          arrayString += "]";
          return arrayString;
        };
        PDFArray2.prototype.sizeInBytes = function() {
          var size = 3;
          for (var idx = 0, len = this.size(); idx < len; idx++) {
            size += this.get(idx).sizeInBytes() + 1;
          }
          return size;
        };
        PDFArray2.prototype.copyBytesInto = function(buffer, offset) {
          var initialOffset = offset;
          buffer[offset++] = CharCodes_1.default.LeftSquareBracket;
          buffer[offset++] = CharCodes_1.default.Space;
          for (var idx = 0, len = this.size(); idx < len; idx++) {
            offset += this.get(idx).copyBytesInto(buffer, offset);
            buffer[offset++] = CharCodes_1.default.Space;
          }
          buffer[offset++] = CharCodes_1.default.RightSquareBracket;
          return offset - initialOffset;
        };
        PDFArray2.prototype.scalePDFNumbers = function(x, y) {
          for (var idx = 0, len = this.size(); idx < len; idx++) {
            var el = this.lookup(idx);
            if (el instanceof PDFNumber_1.default) {
              var factor = idx % 2 === 0 ? x : y;
              this.set(idx, PDFNumber_1.default.of(el.asNumber() * factor));
            }
          }
        };
        PDFArray2.withContext = function(context) {
          return new PDFArray2(context);
        };
        return PDFArray2;
      })(PDFObject_1.default)
    );
    exports.default = PDFArray;
  }
});

// node_modules/pdf-lib/cjs/core/objects/PDFBool.js
var require_PDFBool = __commonJS({
  "node_modules/pdf-lib/cjs/core/objects/PDFBool.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var errors_1 = require_errors2();
    var PDFObject_1 = tslib_1.__importDefault(require_PDFObject());
    var CharCodes_1 = tslib_1.__importDefault(require_CharCodes());
    var ENFORCER = {};
    var PDFBool = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PDFBool2, _super);
        function PDFBool2(enforcer, value) {
          var _this = this;
          if (enforcer !== ENFORCER)
            throw new errors_1.PrivateConstructorError("PDFBool");
          _this = _super.call(this) || this;
          _this.value = value;
          return _this;
        }
        PDFBool2.prototype.asBoolean = function() {
          return this.value;
        };
        PDFBool2.prototype.clone = function() {
          return this;
        };
        PDFBool2.prototype.toString = function() {
          return String(this.value);
        };
        PDFBool2.prototype.sizeInBytes = function() {
          return this.value ? 4 : 5;
        };
        PDFBool2.prototype.copyBytesInto = function(buffer, offset) {
          if (this.value) {
            buffer[offset++] = CharCodes_1.default.t;
            buffer[offset++] = CharCodes_1.default.r;
            buffer[offset++] = CharCodes_1.default.u;
            buffer[offset++] = CharCodes_1.default.e;
            return 4;
          } else {
            buffer[offset++] = CharCodes_1.default.f;
            buffer[offset++] = CharCodes_1.default.a;
            buffer[offset++] = CharCodes_1.default.l;
            buffer[offset++] = CharCodes_1.default.s;
            buffer[offset++] = CharCodes_1.default.e;
            return 5;
          }
        };
        PDFBool2.True = new PDFBool2(ENFORCER, true);
        PDFBool2.False = new PDFBool2(ENFORCER, false);
        return PDFBool2;
      })(PDFObject_1.default)
    );
    exports.default = PDFBool;
  }
});

// node_modules/pdf-lib/cjs/core/syntax/Delimiters.js
var require_Delimiters = __commonJS({
  "node_modules/pdf-lib/cjs/core/syntax/Delimiters.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IsDelimiter = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var CharCodes_1 = tslib_1.__importDefault(require_CharCodes());
    exports.IsDelimiter = new Uint8Array(256);
    exports.IsDelimiter[CharCodes_1.default.LeftParen] = 1;
    exports.IsDelimiter[CharCodes_1.default.RightParen] = 1;
    exports.IsDelimiter[CharCodes_1.default.LessThan] = 1;
    exports.IsDelimiter[CharCodes_1.default.GreaterThan] = 1;
    exports.IsDelimiter[CharCodes_1.default.LeftSquareBracket] = 1;
    exports.IsDelimiter[CharCodes_1.default.RightSquareBracket] = 1;
    exports.IsDelimiter[CharCodes_1.default.LeftCurly] = 1;
    exports.IsDelimiter[CharCodes_1.default.RightCurly] = 1;
    exports.IsDelimiter[CharCodes_1.default.ForwardSlash] = 1;
    exports.IsDelimiter[CharCodes_1.default.Percent] = 1;
  }
});

// node_modules/pdf-lib/cjs/core/syntax/Whitespace.js
var require_Whitespace = __commonJS({
  "node_modules/pdf-lib/cjs/core/syntax/Whitespace.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IsWhitespace = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var CharCodes_1 = tslib_1.__importDefault(require_CharCodes());
    exports.IsWhitespace = new Uint8Array(256);
    exports.IsWhitespace[CharCodes_1.default.Null] = 1;
    exports.IsWhitespace[CharCodes_1.default.Tab] = 1;
    exports.IsWhitespace[CharCodes_1.default.Newline] = 1;
    exports.IsWhitespace[CharCodes_1.default.FormFeed] = 1;
    exports.IsWhitespace[CharCodes_1.default.CarriageReturn] = 1;
    exports.IsWhitespace[CharCodes_1.default.Space] = 1;
  }
});

// node_modules/pdf-lib/cjs/core/syntax/Irregular.js
var require_Irregular = __commonJS({
  "node_modules/pdf-lib/cjs/core/syntax/Irregular.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IsIrregular = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var CharCodes_1 = tslib_1.__importDefault(require_CharCodes());
    var Delimiters_1 = require_Delimiters();
    var Whitespace_1 = require_Whitespace();
    exports.IsIrregular = new Uint8Array(256);
    for (idx = 0, len = 256; idx < len; idx++) {
      exports.IsIrregular[idx] = Whitespace_1.IsWhitespace[idx] || Delimiters_1.IsDelimiter[idx] ? 1 : 0;
    }
    var idx;
    var len;
    exports.IsIrregular[CharCodes_1.default.Hash] = 1;
  }
});

// node_modules/pdf-lib/cjs/core/objects/PDFName.js
var require_PDFName = __commonJS({
  "node_modules/pdf-lib/cjs/core/objects/PDFName.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var errors_1 = require_errors2();
    var PDFObject_1 = tslib_1.__importDefault(require_PDFObject());
    var CharCodes_1 = tslib_1.__importDefault(require_CharCodes());
    var Irregular_1 = require_Irregular();
    var utils_1 = require_utils2();
    var decodeName = function(name) {
      return name.replace(/#([\dABCDEF]{2})/g, function(_, hex) {
        return utils_1.charFromHexCode(hex);
      });
    };
    var isRegularChar = function(charCode) {
      return charCode >= CharCodes_1.default.ExclamationPoint && charCode <= CharCodes_1.default.Tilde && !Irregular_1.IsIrregular[charCode];
    };
    var ENFORCER = {};
    var pool = /* @__PURE__ */ new Map();
    var PDFName = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PDFName2, _super);
        function PDFName2(enforcer, name) {
          var _this = this;
          if (enforcer !== ENFORCER)
            throw new errors_1.PrivateConstructorError("PDFName");
          _this = _super.call(this) || this;
          var encodedName = "/";
          for (var idx = 0, len = name.length; idx < len; idx++) {
            var character = name[idx];
            var code = utils_1.toCharCode(character);
            encodedName += isRegularChar(code) ? character : "#" + utils_1.toHexString(code);
          }
          _this.encodedName = encodedName;
          return _this;
        }
        PDFName2.prototype.asBytes = function() {
          var bytes = [];
          var hex = "";
          var escaped = false;
          var pushByte = function(byte2) {
            if (byte2 !== void 0)
              bytes.push(byte2);
            escaped = false;
          };
          for (var idx = 1, len = this.encodedName.length; idx < len; idx++) {
            var char = this.encodedName[idx];
            var byte = utils_1.toCharCode(char);
            var nextChar = this.encodedName[idx + 1];
            if (!escaped) {
              if (byte === CharCodes_1.default.Hash)
                escaped = true;
              else
                pushByte(byte);
            } else {
              if (byte >= CharCodes_1.default.Zero && byte <= CharCodes_1.default.Nine || byte >= CharCodes_1.default.a && byte <= CharCodes_1.default.f || byte >= CharCodes_1.default.A && byte <= CharCodes_1.default.F) {
                hex += char;
                if (hex.length === 2 || !(nextChar >= "0" && nextChar <= "9" || nextChar >= "a" && nextChar <= "f" || nextChar >= "A" && nextChar <= "F")) {
                  pushByte(parseInt(hex, 16));
                  hex = "";
                }
              } else {
                pushByte(byte);
              }
            }
          }
          return new Uint8Array(bytes);
        };
        PDFName2.prototype.decodeText = function() {
          var bytes = this.asBytes();
          return String.fromCharCode.apply(String, Array.from(bytes));
        };
        PDFName2.prototype.asString = function() {
          return this.encodedName;
        };
        PDFName2.prototype.value = function() {
          return this.encodedName;
        };
        PDFName2.prototype.clone = function() {
          return this;
        };
        PDFName2.prototype.toString = function() {
          return this.encodedName;
        };
        PDFName2.prototype.sizeInBytes = function() {
          return this.encodedName.length;
        };
        PDFName2.prototype.copyBytesInto = function(buffer, offset) {
          offset += utils_1.copyStringIntoBuffer(this.encodedName, buffer, offset);
          return this.encodedName.length;
        };
        PDFName2.of = function(name) {
          var decodedValue = decodeName(name);
          var instance = pool.get(decodedValue);
          if (!instance) {
            instance = new PDFName2(ENFORCER, decodedValue);
            pool.set(decodedValue, instance);
          }
          return instance;
        };
        PDFName2.Length = PDFName2.of("Length");
        PDFName2.FlateDecode = PDFName2.of("FlateDecode");
        PDFName2.Resources = PDFName2.of("Resources");
        PDFName2.Font = PDFName2.of("Font");
        PDFName2.XObject = PDFName2.of("XObject");
        PDFName2.ExtGState = PDFName2.of("ExtGState");
        PDFName2.Contents = PDFName2.of("Contents");
        PDFName2.Type = PDFName2.of("Type");
        PDFName2.Parent = PDFName2.of("Parent");
        PDFName2.MediaBox = PDFName2.of("MediaBox");
        PDFName2.Page = PDFName2.of("Page");
        PDFName2.Annots = PDFName2.of("Annots");
        PDFName2.TrimBox = PDFName2.of("TrimBox");
        PDFName2.ArtBox = PDFName2.of("ArtBox");
        PDFName2.BleedBox = PDFName2.of("BleedBox");
        PDFName2.CropBox = PDFName2.of("CropBox");
        PDFName2.Rotate = PDFName2.of("Rotate");
        PDFName2.Title = PDFName2.of("Title");
        PDFName2.Author = PDFName2.of("Author");
        PDFName2.Subject = PDFName2.of("Subject");
        PDFName2.Creator = PDFName2.of("Creator");
        PDFName2.Keywords = PDFName2.of("Keywords");
        PDFName2.Producer = PDFName2.of("Producer");
        PDFName2.CreationDate = PDFName2.of("CreationDate");
        PDFName2.ModDate = PDFName2.of("ModDate");
        return PDFName2;
      })(PDFObject_1.default)
    );
    exports.default = PDFName;
  }
});

// node_modules/pdf-lib/cjs/core/objects/PDFNull.js
var require_PDFNull = __commonJS({
  "node_modules/pdf-lib/cjs/core/objects/PDFNull.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFObject_1 = tslib_1.__importDefault(require_PDFObject());
    var CharCodes_1 = tslib_1.__importDefault(require_CharCodes());
    var PDFNull = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PDFNull2, _super);
        function PDFNull2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        PDFNull2.prototype.asNull = function() {
          return null;
        };
        PDFNull2.prototype.clone = function() {
          return this;
        };
        PDFNull2.prototype.toString = function() {
          return "null";
        };
        PDFNull2.prototype.sizeInBytes = function() {
          return 4;
        };
        PDFNull2.prototype.copyBytesInto = function(buffer, offset) {
          buffer[offset++] = CharCodes_1.default.n;
          buffer[offset++] = CharCodes_1.default.u;
          buffer[offset++] = CharCodes_1.default.l;
          buffer[offset++] = CharCodes_1.default.l;
          return 4;
        };
        return PDFNull2;
      })(PDFObject_1.default)
    );
    exports.default = new PDFNull();
  }
});

// node_modules/pdf-lib/cjs/core/objects/PDFDict.js
var require_PDFDict = __commonJS({
  "node_modules/pdf-lib/cjs/core/objects/PDFDict.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFName_1 = tslib_1.__importDefault(require_PDFName());
    var PDFNull_1 = tslib_1.__importDefault(require_PDFNull());
    var PDFObject_1 = tslib_1.__importDefault(require_PDFObject());
    var CharCodes_1 = tslib_1.__importDefault(require_CharCodes());
    var PDFDict = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PDFDict2, _super);
        function PDFDict2(map, context) {
          var _this = _super.call(this) || this;
          _this.dict = map;
          _this.context = context;
          return _this;
        }
        PDFDict2.prototype.keys = function() {
          return Array.from(this.dict.keys());
        };
        PDFDict2.prototype.values = function() {
          return Array.from(this.dict.values());
        };
        PDFDict2.prototype.entries = function() {
          return Array.from(this.dict.entries());
        };
        PDFDict2.prototype.set = function(key, value) {
          this.dict.set(key, value);
        };
        PDFDict2.prototype.get = function(key, preservePDFNull) {
          if (preservePDFNull === void 0) {
            preservePDFNull = false;
          }
          var value = this.dict.get(key);
          if (value === PDFNull_1.default && !preservePDFNull)
            return void 0;
          return value;
        };
        PDFDict2.prototype.has = function(key) {
          var value = this.dict.get(key);
          return value !== void 0 && value !== PDFNull_1.default;
        };
        PDFDict2.prototype.lookupMaybe = function(key) {
          var _a;
          var types = [];
          for (var _i = 1; _i < arguments.length; _i++) {
            types[_i - 1] = arguments[_i];
          }
          var preservePDFNull = types.includes(PDFNull_1.default);
          var value = (_a = this.context).lookupMaybe.apply(_a, tslib_1.__spreadArrays([this.get(key, preservePDFNull)], types));
          if (value === PDFNull_1.default && !preservePDFNull)
            return void 0;
          return value;
        };
        PDFDict2.prototype.lookup = function(key) {
          var _a;
          var types = [];
          for (var _i = 1; _i < arguments.length; _i++) {
            types[_i - 1] = arguments[_i];
          }
          var preservePDFNull = types.includes(PDFNull_1.default);
          var value = (_a = this.context).lookup.apply(_a, tslib_1.__spreadArrays([this.get(key, preservePDFNull)], types));
          if (value === PDFNull_1.default && !preservePDFNull)
            return void 0;
          return value;
        };
        PDFDict2.prototype.delete = function(key) {
          return this.dict.delete(key);
        };
        PDFDict2.prototype.asMap = function() {
          return new Map(this.dict);
        };
        PDFDict2.prototype.uniqueKey = function(tag) {
          if (tag === void 0) {
            tag = "";
          }
          var existingKeys = this.keys();
          var key = PDFName_1.default.of(this.context.addRandomSuffix(tag, 10));
          while (existingKeys.includes(key)) {
            key = PDFName_1.default.of(this.context.addRandomSuffix(tag, 10));
          }
          return key;
        };
        PDFDict2.prototype.clone = function(context) {
          var clone = PDFDict2.withContext(context || this.context);
          var entries = this.entries();
          for (var idx = 0, len = entries.length; idx < len; idx++) {
            var _a = entries[idx], key = _a[0], value = _a[1];
            clone.set(key, value);
          }
          return clone;
        };
        PDFDict2.prototype.toString = function() {
          var dictString = "<<\n";
          var entries = this.entries();
          for (var idx = 0, len = entries.length; idx < len; idx++) {
            var _a = entries[idx], key = _a[0], value = _a[1];
            dictString += key.toString() + " " + value.toString() + "\n";
          }
          dictString += ">>";
          return dictString;
        };
        PDFDict2.prototype.sizeInBytes = function() {
          var size = 5;
          var entries = this.entries();
          for (var idx = 0, len = entries.length; idx < len; idx++) {
            var _a = entries[idx], key = _a[0], value = _a[1];
            size += key.sizeInBytes() + value.sizeInBytes() + 2;
          }
          return size;
        };
        PDFDict2.prototype.copyBytesInto = function(buffer, offset) {
          var initialOffset = offset;
          buffer[offset++] = CharCodes_1.default.LessThan;
          buffer[offset++] = CharCodes_1.default.LessThan;
          buffer[offset++] = CharCodes_1.default.Newline;
          var entries = this.entries();
          for (var idx = 0, len = entries.length; idx < len; idx++) {
            var _a = entries[idx], key = _a[0], value = _a[1];
            offset += key.copyBytesInto(buffer, offset);
            buffer[offset++] = CharCodes_1.default.Space;
            offset += value.copyBytesInto(buffer, offset);
            buffer[offset++] = CharCodes_1.default.Newline;
          }
          buffer[offset++] = CharCodes_1.default.GreaterThan;
          buffer[offset++] = CharCodes_1.default.GreaterThan;
          return offset - initialOffset;
        };
        PDFDict2.withContext = function(context) {
          return new PDFDict2(/* @__PURE__ */ new Map(), context);
        };
        PDFDict2.fromMapWithContext = function(map, context) {
          return new PDFDict2(map, context);
        };
        return PDFDict2;
      })(PDFObject_1.default)
    );
    exports.default = PDFDict;
  }
});

// node_modules/pdf-lib/cjs/core/objects/PDFStream.js
var require_PDFStream = __commonJS({
  "node_modules/pdf-lib/cjs/core/objects/PDFStream.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var errors_1 = require_errors2();
    var PDFName_1 = tslib_1.__importDefault(require_PDFName());
    var PDFNumber_1 = tslib_1.__importDefault(require_PDFNumber());
    var PDFObject_1 = tslib_1.__importDefault(require_PDFObject());
    var CharCodes_1 = tslib_1.__importDefault(require_CharCodes());
    var PDFStream = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PDFStream2, _super);
        function PDFStream2(dict) {
          var _this = _super.call(this) || this;
          _this.dict = dict;
          return _this;
        }
        PDFStream2.prototype.clone = function(_context) {
          throw new errors_1.MethodNotImplementedError(this.constructor.name, "clone");
        };
        PDFStream2.prototype.getContentsString = function() {
          throw new errors_1.MethodNotImplementedError(this.constructor.name, "getContentsString");
        };
        PDFStream2.prototype.getContents = function() {
          throw new errors_1.MethodNotImplementedError(this.constructor.name, "getContents");
        };
        PDFStream2.prototype.getContentsSize = function() {
          throw new errors_1.MethodNotImplementedError(this.constructor.name, "getContentsSize");
        };
        PDFStream2.prototype.updateDict = function() {
          var contentsSize = this.getContentsSize();
          this.dict.set(PDFName_1.default.Length, PDFNumber_1.default.of(contentsSize));
        };
        PDFStream2.prototype.sizeInBytes = function() {
          this.updateDict();
          return this.dict.sizeInBytes() + this.getContentsSize() + 18;
        };
        PDFStream2.prototype.toString = function() {
          this.updateDict();
          var streamString = this.dict.toString();
          streamString += "\nstream\n";
          streamString += this.getContentsString();
          streamString += "\nendstream";
          return streamString;
        };
        PDFStream2.prototype.copyBytesInto = function(buffer, offset) {
          this.updateDict();
          var initialOffset = offset;
          offset += this.dict.copyBytesInto(buffer, offset);
          buffer[offset++] = CharCodes_1.default.Newline;
          buffer[offset++] = CharCodes_1.default.s;
          buffer[offset++] = CharCodes_1.default.t;
          buffer[offset++] = CharCodes_1.default.r;
          buffer[offset++] = CharCodes_1.default.e;
          buffer[offset++] = CharCodes_1.default.a;
          buffer[offset++] = CharCodes_1.default.m;
          buffer[offset++] = CharCodes_1.default.Newline;
          var contents = this.getContents();
          for (var idx = 0, len = contents.length; idx < len; idx++) {
            buffer[offset++] = contents[idx];
          }
          buffer[offset++] = CharCodes_1.default.Newline;
          buffer[offset++] = CharCodes_1.default.e;
          buffer[offset++] = CharCodes_1.default.n;
          buffer[offset++] = CharCodes_1.default.d;
          buffer[offset++] = CharCodes_1.default.s;
          buffer[offset++] = CharCodes_1.default.t;
          buffer[offset++] = CharCodes_1.default.r;
          buffer[offset++] = CharCodes_1.default.e;
          buffer[offset++] = CharCodes_1.default.a;
          buffer[offset++] = CharCodes_1.default.m;
          return offset - initialOffset;
        };
        return PDFStream2;
      })(PDFObject_1.default)
    );
    exports.default = PDFStream;
  }
});

// node_modules/pdf-lib/cjs/core/objects/PDFRawStream.js
var require_PDFRawStream = __commonJS({
  "node_modules/pdf-lib/cjs/core/objects/PDFRawStream.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFStream_1 = tslib_1.__importDefault(require_PDFStream());
    var utils_1 = require_utils2();
    var PDFRawStream = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PDFRawStream2, _super);
        function PDFRawStream2(dict, contents) {
          var _this = _super.call(this, dict) || this;
          _this.contents = contents;
          return _this;
        }
        PDFRawStream2.prototype.asUint8Array = function() {
          return this.contents.slice();
        };
        PDFRawStream2.prototype.clone = function(context) {
          return PDFRawStream2.of(this.dict.clone(context), this.contents.slice());
        };
        PDFRawStream2.prototype.getContentsString = function() {
          return utils_1.arrayAsString(this.contents);
        };
        PDFRawStream2.prototype.getContents = function() {
          return this.contents;
        };
        PDFRawStream2.prototype.getContentsSize = function() {
          return this.contents.length;
        };
        PDFRawStream2.of = function(dict, contents) {
          return new PDFRawStream2(dict, contents);
        };
        return PDFRawStream2;
      })(PDFStream_1.default)
    );
    exports.default = PDFRawStream;
  }
});

// node_modules/pdf-lib/cjs/core/objects/PDFRef.js
var require_PDFRef = __commonJS({
  "node_modules/pdf-lib/cjs/core/objects/PDFRef.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var errors_1 = require_errors2();
    var PDFObject_1 = tslib_1.__importDefault(require_PDFObject());
    var utils_1 = require_utils2();
    var ENFORCER = {};
    var pool = /* @__PURE__ */ new Map();
    var PDFRef = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PDFRef2, _super);
        function PDFRef2(enforcer, objectNumber, generationNumber) {
          var _this = this;
          if (enforcer !== ENFORCER)
            throw new errors_1.PrivateConstructorError("PDFRef");
          _this = _super.call(this) || this;
          _this.objectNumber = objectNumber;
          _this.generationNumber = generationNumber;
          _this.tag = objectNumber + " " + generationNumber + " R";
          return _this;
        }
        PDFRef2.prototype.clone = function() {
          return this;
        };
        PDFRef2.prototype.toString = function() {
          return this.tag;
        };
        PDFRef2.prototype.sizeInBytes = function() {
          return this.tag.length;
        };
        PDFRef2.prototype.copyBytesInto = function(buffer, offset) {
          offset += utils_1.copyStringIntoBuffer(this.tag, buffer, offset);
          return this.tag.length;
        };
        PDFRef2.of = function(objectNumber, generationNumber) {
          if (generationNumber === void 0) {
            generationNumber = 0;
          }
          var tag = objectNumber + " " + generationNumber + " R";
          var instance = pool.get(tag);
          if (!instance) {
            instance = new PDFRef2(ENFORCER, objectNumber, generationNumber);
            pool.set(tag, instance);
          }
          return instance;
        };
        return PDFRef2;
      })(PDFObject_1.default)
    );
    exports.default = PDFRef;
  }
});

// node_modules/pdf-lib/cjs/core/operators/PDFOperator.js
var require_PDFOperator = __commonJS({
  "node_modules/pdf-lib/cjs/core/operators/PDFOperator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFObject_1 = tslib_1.__importDefault(require_PDFObject());
    var CharCodes_1 = tslib_1.__importDefault(require_CharCodes());
    var utils_1 = require_utils2();
    var PDFOperator = (
      /** @class */
      (function() {
        function PDFOperator2(name, args) {
          this.name = name;
          this.args = args || [];
        }
        PDFOperator2.prototype.clone = function(context) {
          var args = new Array(this.args.length);
          for (var idx = 0, len = args.length; idx < len; idx++) {
            var arg = this.args[idx];
            args[idx] = arg instanceof PDFObject_1.default ? arg.clone(context) : arg;
          }
          return PDFOperator2.of(this.name, args);
        };
        PDFOperator2.prototype.toString = function() {
          var value = "";
          for (var idx = 0, len = this.args.length; idx < len; idx++) {
            value += String(this.args[idx]) + " ";
          }
          value += this.name;
          return value;
        };
        PDFOperator2.prototype.sizeInBytes = function() {
          var size = 0;
          for (var idx = 0, len = this.args.length; idx < len; idx++) {
            var arg = this.args[idx];
            size += (arg instanceof PDFObject_1.default ? arg.sizeInBytes() : arg.length) + 1;
          }
          size += this.name.length;
          return size;
        };
        PDFOperator2.prototype.copyBytesInto = function(buffer, offset) {
          var initialOffset = offset;
          for (var idx = 0, len = this.args.length; idx < len; idx++) {
            var arg = this.args[idx];
            if (arg instanceof PDFObject_1.default) {
              offset += arg.copyBytesInto(buffer, offset);
            } else {
              offset += utils_1.copyStringIntoBuffer(arg, buffer, offset);
            }
            buffer[offset++] = CharCodes_1.default.Space;
          }
          offset += utils_1.copyStringIntoBuffer(this.name, buffer, offset);
          return offset - initialOffset;
        };
        PDFOperator2.of = function(name, args) {
          return new PDFOperator2(name, args);
        };
        return PDFOperator2;
      })()
    );
    exports.default = PDFOperator;
  }
});

// node_modules/pdf-lib/cjs/core/operators/PDFOperatorNames.js
var require_PDFOperatorNames = __commonJS({
  "node_modules/pdf-lib/cjs/core/operators/PDFOperatorNames.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PDFOperatorNames;
    (function(PDFOperatorNames2) {
      PDFOperatorNames2["NonStrokingColor"] = "sc";
      PDFOperatorNames2["NonStrokingColorN"] = "scn";
      PDFOperatorNames2["NonStrokingColorRgb"] = "rg";
      PDFOperatorNames2["NonStrokingColorGray"] = "g";
      PDFOperatorNames2["NonStrokingColorCmyk"] = "k";
      PDFOperatorNames2["NonStrokingColorspace"] = "cs";
      PDFOperatorNames2["StrokingColor"] = "SC";
      PDFOperatorNames2["StrokingColorN"] = "SCN";
      PDFOperatorNames2["StrokingColorRgb"] = "RG";
      PDFOperatorNames2["StrokingColorGray"] = "G";
      PDFOperatorNames2["StrokingColorCmyk"] = "K";
      PDFOperatorNames2["StrokingColorspace"] = "CS";
      PDFOperatorNames2["BeginMarkedContentSequence"] = "BDC";
      PDFOperatorNames2["BeginMarkedContent"] = "BMC";
      PDFOperatorNames2["EndMarkedContent"] = "EMC";
      PDFOperatorNames2["MarkedContentPointWithProps"] = "DP";
      PDFOperatorNames2["MarkedContentPoint"] = "MP";
      PDFOperatorNames2["DrawObject"] = "Do";
      PDFOperatorNames2["ConcatTransformationMatrix"] = "cm";
      PDFOperatorNames2["PopGraphicsState"] = "Q";
      PDFOperatorNames2["PushGraphicsState"] = "q";
      PDFOperatorNames2["SetFlatness"] = "i";
      PDFOperatorNames2["SetGraphicsStateParams"] = "gs";
      PDFOperatorNames2["SetLineCapStyle"] = "J";
      PDFOperatorNames2["SetLineDashPattern"] = "d";
      PDFOperatorNames2["SetLineJoinStyle"] = "j";
      PDFOperatorNames2["SetLineMiterLimit"] = "M";
      PDFOperatorNames2["SetLineWidth"] = "w";
      PDFOperatorNames2["SetTextMatrix"] = "Tm";
      PDFOperatorNames2["SetRenderingIntent"] = "ri";
      PDFOperatorNames2["AppendRectangle"] = "re";
      PDFOperatorNames2["BeginInlineImage"] = "BI";
      PDFOperatorNames2["BeginInlineImageData"] = "ID";
      PDFOperatorNames2["EndInlineImage"] = "EI";
      PDFOperatorNames2["ClipEvenOdd"] = "W*";
      PDFOperatorNames2["ClipNonZero"] = "W";
      PDFOperatorNames2["CloseAndStroke"] = "s";
      PDFOperatorNames2["CloseFillEvenOddAndStroke"] = "b*";
      PDFOperatorNames2["CloseFillNonZeroAndStroke"] = "b";
      PDFOperatorNames2["ClosePath"] = "h";
      PDFOperatorNames2["AppendBezierCurve"] = "c";
      PDFOperatorNames2["CurveToReplicateFinalPoint"] = "y";
      PDFOperatorNames2["CurveToReplicateInitialPoint"] = "v";
      PDFOperatorNames2["EndPath"] = "n";
      PDFOperatorNames2["FillEvenOddAndStroke"] = "B*";
      PDFOperatorNames2["FillEvenOdd"] = "f*";
      PDFOperatorNames2["FillNonZeroAndStroke"] = "B";
      PDFOperatorNames2["FillNonZero"] = "f";
      PDFOperatorNames2["LegacyFillNonZero"] = "F";
      PDFOperatorNames2["LineTo"] = "l";
      PDFOperatorNames2["MoveTo"] = "m";
      PDFOperatorNames2["ShadingFill"] = "sh";
      PDFOperatorNames2["StrokePath"] = "S";
      PDFOperatorNames2["BeginText"] = "BT";
      PDFOperatorNames2["EndText"] = "ET";
      PDFOperatorNames2["MoveText"] = "Td";
      PDFOperatorNames2["MoveTextSetLeading"] = "TD";
      PDFOperatorNames2["NextLine"] = "T*";
      PDFOperatorNames2["SetCharacterSpacing"] = "Tc";
      PDFOperatorNames2["SetFontAndSize"] = "Tf";
      PDFOperatorNames2["SetTextHorizontalScaling"] = "Tz";
      PDFOperatorNames2["SetTextLineHeight"] = "TL";
      PDFOperatorNames2["SetTextRenderingMode"] = "Tr";
      PDFOperatorNames2["SetTextRise"] = "Ts";
      PDFOperatorNames2["SetWordSpacing"] = "Tw";
      PDFOperatorNames2["ShowText"] = "Tj";
      PDFOperatorNames2["ShowTextAdjusted"] = "TJ";
      PDFOperatorNames2["ShowTextLine"] = "'";
      PDFOperatorNames2["ShowTextLineAndSpace"] = '"';
      PDFOperatorNames2["Type3D0"] = "d0";
      PDFOperatorNames2["Type3D1"] = "d1";
      PDFOperatorNames2["BeginCompatibilitySection"] = "BX";
      PDFOperatorNames2["EndCompatibilitySection"] = "EX";
    })(PDFOperatorNames || (PDFOperatorNames = {}));
    exports.default = PDFOperatorNames;
  }
});

// node_modules/pdf-lib/cjs/core/structures/PDFFlateStream.js
var require_PDFFlateStream = __commonJS({
  "node_modules/pdf-lib/cjs/core/structures/PDFFlateStream.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var pako_1 = tslib_1.__importDefault((init_pako_stub(), __toCommonJS(pako_stub_exports)));
    var errors_1 = require_errors2();
    var PDFName_1 = tslib_1.__importDefault(require_PDFName());
    var PDFStream_1 = tslib_1.__importDefault(require_PDFStream());
    var utils_1 = require_utils2();
    var PDFFlateStream = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PDFFlateStream2, _super);
        function PDFFlateStream2(dict, encode) {
          var _this = _super.call(this, dict) || this;
          _this.computeContents = function() {
            var unencodedContents = _this.getUnencodedContents();
            return _this.encode ? pako_1.default.deflate(unencodedContents) : unencodedContents;
          };
          _this.encode = encode;
          if (encode)
            dict.set(PDFName_1.default.of("Filter"), PDFName_1.default.of("FlateDecode"));
          _this.contentsCache = utils_1.Cache.populatedBy(_this.computeContents);
          return _this;
        }
        PDFFlateStream2.prototype.getContents = function() {
          return this.contentsCache.access();
        };
        PDFFlateStream2.prototype.getContentsSize = function() {
          return this.contentsCache.access().length;
        };
        PDFFlateStream2.prototype.getUnencodedContents = function() {
          throw new errors_1.MethodNotImplementedError(this.constructor.name, "getUnencodedContents");
        };
        return PDFFlateStream2;
      })(PDFStream_1.default)
    );
    exports.default = PDFFlateStream;
  }
});

// node_modules/pdf-lib/cjs/core/structures/PDFContentStream.js
var require_PDFContentStream = __commonJS({
  "node_modules/pdf-lib/cjs/core/structures/PDFContentStream.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFFlateStream_1 = tslib_1.__importDefault(require_PDFFlateStream());
    var CharCodes_1 = tslib_1.__importDefault(require_CharCodes());
    var PDFContentStream = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PDFContentStream2, _super);
        function PDFContentStream2(dict, operators, encode) {
          if (encode === void 0) {
            encode = true;
          }
          var _this = _super.call(this, dict, encode) || this;
          _this.operators = operators;
          return _this;
        }
        PDFContentStream2.prototype.push = function() {
          var _a;
          var operators = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            operators[_i] = arguments[_i];
          }
          (_a = this.operators).push.apply(_a, operators);
        };
        PDFContentStream2.prototype.clone = function(context) {
          var operators = new Array(this.operators.length);
          for (var idx = 0, len = this.operators.length; idx < len; idx++) {
            operators[idx] = this.operators[idx].clone(context);
          }
          var _a = this, dict = _a.dict, encode = _a.encode;
          return PDFContentStream2.of(dict.clone(context), operators, encode);
        };
        PDFContentStream2.prototype.getContentsString = function() {
          var value = "";
          for (var idx = 0, len = this.operators.length; idx < len; idx++) {
            value += this.operators[idx] + "\n";
          }
          return value;
        };
        PDFContentStream2.prototype.getUnencodedContents = function() {
          var buffer = new Uint8Array(this.getUnencodedContentsSize());
          var offset = 0;
          for (var idx = 0, len = this.operators.length; idx < len; idx++) {
            offset += this.operators[idx].copyBytesInto(buffer, offset);
            buffer[offset++] = CharCodes_1.default.Newline;
          }
          return buffer;
        };
        PDFContentStream2.prototype.getUnencodedContentsSize = function() {
          var size = 0;
          for (var idx = 0, len = this.operators.length; idx < len; idx++) {
            size += this.operators[idx].sizeInBytes() + 1;
          }
          return size;
        };
        PDFContentStream2.of = function(dict, operators, encode) {
          if (encode === void 0) {
            encode = true;
          }
          return new PDFContentStream2(dict, operators, encode);
        };
        return PDFContentStream2;
      })(PDFFlateStream_1.default)
    );
    exports.default = PDFContentStream;
  }
});

// node_modules/pdf-lib/cjs/utils/rng.js
var require_rng = __commonJS({
  "node_modules/pdf-lib/cjs/utils/rng.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SimpleRNG = void 0;
    var SimpleRNG = (
      /** @class */
      (function() {
        function SimpleRNG2(seed) {
          this.seed = seed;
        }
        SimpleRNG2.prototype.nextInt = function() {
          var x = Math.sin(this.seed++) * 1e4;
          return x - Math.floor(x);
        };
        SimpleRNG2.withSeed = function(seed) {
          return new SimpleRNG2(seed);
        };
        return SimpleRNG2;
      })()
    );
    exports.SimpleRNG = SimpleRNG;
  }
});

// node_modules/pdf-lib/cjs/core/PDFContext.js
var require_PDFContext = __commonJS({
  "node_modules/pdf-lib/cjs/core/PDFContext.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var pako_1 = tslib_1.__importDefault((init_pako_stub(), __toCommonJS(pako_stub_exports)));
    var PDFHeader_1 = tslib_1.__importDefault(require_PDFHeader());
    var errors_1 = require_errors2();
    var PDFArray_1 = tslib_1.__importDefault(require_PDFArray());
    var PDFBool_1 = tslib_1.__importDefault(require_PDFBool());
    var PDFDict_1 = tslib_1.__importDefault(require_PDFDict());
    var PDFName_1 = tslib_1.__importDefault(require_PDFName());
    var PDFNull_1 = tslib_1.__importDefault(require_PDFNull());
    var PDFNumber_1 = tslib_1.__importDefault(require_PDFNumber());
    var PDFObject_1 = tslib_1.__importDefault(require_PDFObject());
    var PDFRawStream_1 = tslib_1.__importDefault(require_PDFRawStream());
    var PDFRef_1 = tslib_1.__importDefault(require_PDFRef());
    var PDFOperator_1 = tslib_1.__importDefault(require_PDFOperator());
    var PDFOperatorNames_1 = tslib_1.__importDefault(require_PDFOperatorNames());
    var PDFContentStream_1 = tslib_1.__importDefault(require_PDFContentStream());
    var utils_1 = require_utils2();
    var rng_1 = require_rng();
    var byAscendingObjectNumber = function(_a, _b) {
      var a = _a[0];
      var b = _b[0];
      return a.objectNumber - b.objectNumber;
    };
    var PDFContext = (
      /** @class */
      (function() {
        function PDFContext2() {
          this.largestObjectNumber = 0;
          this.header = PDFHeader_1.default.forVersion(1, 7);
          this.trailerInfo = {};
          this.indirectObjects = /* @__PURE__ */ new Map();
          this.rng = rng_1.SimpleRNG.withSeed(1);
        }
        PDFContext2.prototype.assign = function(ref, object) {
          this.indirectObjects.set(ref, object);
          if (ref.objectNumber > this.largestObjectNumber) {
            this.largestObjectNumber = ref.objectNumber;
          }
        };
        PDFContext2.prototype.nextRef = function() {
          this.largestObjectNumber += 1;
          return PDFRef_1.default.of(this.largestObjectNumber);
        };
        PDFContext2.prototype.register = function(object) {
          var ref = this.nextRef();
          this.assign(ref, object);
          return ref;
        };
        PDFContext2.prototype.delete = function(ref) {
          return this.indirectObjects.delete(ref);
        };
        PDFContext2.prototype.lookupMaybe = function(ref) {
          var types = [];
          for (var _i = 1; _i < arguments.length; _i++) {
            types[_i - 1] = arguments[_i];
          }
          var preservePDFNull = types.includes(PDFNull_1.default);
          var result = ref instanceof PDFRef_1.default ? this.indirectObjects.get(ref) : ref;
          if (!result || result === PDFNull_1.default && !preservePDFNull)
            return void 0;
          for (var idx = 0, len = types.length; idx < len; idx++) {
            var type = types[idx];
            if (type === PDFNull_1.default) {
              if (result === PDFNull_1.default)
                return result;
            } else {
              if (result instanceof type)
                return result;
            }
          }
          throw new errors_1.UnexpectedObjectTypeError(types, result);
        };
        PDFContext2.prototype.lookup = function(ref) {
          var types = [];
          for (var _i = 1; _i < arguments.length; _i++) {
            types[_i - 1] = arguments[_i];
          }
          var result = ref instanceof PDFRef_1.default ? this.indirectObjects.get(ref) : ref;
          if (types.length === 0)
            return result;
          for (var idx = 0, len = types.length; idx < len; idx++) {
            var type = types[idx];
            if (type === PDFNull_1.default) {
              if (result === PDFNull_1.default)
                return result;
            } else {
              if (result instanceof type)
                return result;
            }
          }
          throw new errors_1.UnexpectedObjectTypeError(types, result);
        };
        PDFContext2.prototype.getObjectRef = function(pdfObject) {
          var entries = Array.from(this.indirectObjects.entries());
          for (var idx = 0, len = entries.length; idx < len; idx++) {
            var _a = entries[idx], ref = _a[0], object = _a[1];
            if (object === pdfObject) {
              return ref;
            }
          }
          return void 0;
        };
        PDFContext2.prototype.enumerateIndirectObjects = function() {
          return Array.from(this.indirectObjects.entries()).sort(byAscendingObjectNumber);
        };
        PDFContext2.prototype.obj = function(literal) {
          if (literal instanceof PDFObject_1.default) {
            return literal;
          } else if (literal === null || literal === void 0) {
            return PDFNull_1.default;
          } else if (typeof literal === "string") {
            return PDFName_1.default.of(literal);
          } else if (typeof literal === "number") {
            return PDFNumber_1.default.of(literal);
          } else if (typeof literal === "boolean") {
            return literal ? PDFBool_1.default.True : PDFBool_1.default.False;
          } else if (Array.isArray(literal)) {
            var array = PDFArray_1.default.withContext(this);
            for (var idx = 0, len = literal.length; idx < len; idx++) {
              array.push(this.obj(literal[idx]));
            }
            return array;
          } else {
            var dict = PDFDict_1.default.withContext(this);
            var keys = Object.keys(literal);
            for (var idx = 0, len = keys.length; idx < len; idx++) {
              var key = keys[idx];
              var value = literal[key];
              if (value !== void 0)
                dict.set(PDFName_1.default.of(key), this.obj(value));
            }
            return dict;
          }
        };
        PDFContext2.prototype.stream = function(contents, dict) {
          if (dict === void 0) {
            dict = {};
          }
          return PDFRawStream_1.default.of(this.obj(dict), utils_1.typedArrayFor(contents));
        };
        PDFContext2.prototype.flateStream = function(contents, dict) {
          if (dict === void 0) {
            dict = {};
          }
          return this.stream(pako_1.default.deflate(utils_1.typedArrayFor(contents)), tslib_1.__assign(tslib_1.__assign({}, dict), { Filter: "FlateDecode" }));
        };
        PDFContext2.prototype.contentStream = function(operators, dict) {
          if (dict === void 0) {
            dict = {};
          }
          return PDFContentStream_1.default.of(this.obj(dict), operators);
        };
        PDFContext2.prototype.formXObject = function(operators, dict) {
          if (dict === void 0) {
            dict = {};
          }
          return this.contentStream(operators, tslib_1.__assign(tslib_1.__assign({ BBox: this.obj([0, 0, 0, 0]), Matrix: this.obj([1, 0, 0, 1, 0, 0]) }, dict), { Type: "XObject", Subtype: "Form" }));
        };
        PDFContext2.prototype.getPushGraphicsStateContentStream = function() {
          if (this.pushGraphicsStateContentStreamRef) {
            return this.pushGraphicsStateContentStreamRef;
          }
          var dict = this.obj({});
          var op = PDFOperator_1.default.of(PDFOperatorNames_1.default.PushGraphicsState);
          var stream = PDFContentStream_1.default.of(dict, [op]);
          this.pushGraphicsStateContentStreamRef = this.register(stream);
          return this.pushGraphicsStateContentStreamRef;
        };
        PDFContext2.prototype.getPopGraphicsStateContentStream = function() {
          if (this.popGraphicsStateContentStreamRef) {
            return this.popGraphicsStateContentStreamRef;
          }
          var dict = this.obj({});
          var op = PDFOperator_1.default.of(PDFOperatorNames_1.default.PopGraphicsState);
          var stream = PDFContentStream_1.default.of(dict, [op]);
          this.popGraphicsStateContentStreamRef = this.register(stream);
          return this.popGraphicsStateContentStreamRef;
        };
        PDFContext2.prototype.addRandomSuffix = function(prefix, suffixLength) {
          if (suffixLength === void 0) {
            suffixLength = 4;
          }
          return prefix + "-" + Math.floor(this.rng.nextInt() * Math.pow(10, suffixLength));
        };
        PDFContext2.create = function() {
          return new PDFContext2();
        };
        return PDFContext2;
      })()
    );
    exports.default = PDFContext;
  }
});

// node_modules/pdf-lib/cjs/core/structures/PDFPageLeaf.js
var require_PDFPageLeaf = __commonJS({
  "node_modules/pdf-lib/cjs/core/structures/PDFPageLeaf.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFArray_1 = tslib_1.__importDefault(require_PDFArray());
    var PDFDict_1 = tslib_1.__importDefault(require_PDFDict());
    var PDFName_1 = tslib_1.__importDefault(require_PDFName());
    var PDFNumber_1 = tslib_1.__importDefault(require_PDFNumber());
    var PDFStream_1 = tslib_1.__importDefault(require_PDFStream());
    var PDFPageLeaf = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PDFPageLeaf2, _super);
        function PDFPageLeaf2(map, context, autoNormalizeCTM) {
          if (autoNormalizeCTM === void 0) {
            autoNormalizeCTM = true;
          }
          var _this = _super.call(this, map, context) || this;
          _this.normalized = false;
          _this.autoNormalizeCTM = autoNormalizeCTM;
          return _this;
        }
        PDFPageLeaf2.prototype.clone = function(context) {
          var clone = PDFPageLeaf2.fromMapWithContext(/* @__PURE__ */ new Map(), context || this.context, this.autoNormalizeCTM);
          var entries = this.entries();
          for (var idx = 0, len = entries.length; idx < len; idx++) {
            var _a = entries[idx], key = _a[0], value = _a[1];
            clone.set(key, value);
          }
          return clone;
        };
        PDFPageLeaf2.prototype.Parent = function() {
          return this.lookupMaybe(PDFName_1.default.Parent, PDFDict_1.default);
        };
        PDFPageLeaf2.prototype.Contents = function() {
          return this.lookup(PDFName_1.default.of("Contents"));
        };
        PDFPageLeaf2.prototype.Annots = function() {
          return this.lookupMaybe(PDFName_1.default.Annots, PDFArray_1.default);
        };
        PDFPageLeaf2.prototype.BleedBox = function() {
          return this.lookupMaybe(PDFName_1.default.BleedBox, PDFArray_1.default);
        };
        PDFPageLeaf2.prototype.TrimBox = function() {
          return this.lookupMaybe(PDFName_1.default.TrimBox, PDFArray_1.default);
        };
        PDFPageLeaf2.prototype.ArtBox = function() {
          return this.lookupMaybe(PDFName_1.default.ArtBox, PDFArray_1.default);
        };
        PDFPageLeaf2.prototype.Resources = function() {
          var dictOrRef = this.getInheritableAttribute(PDFName_1.default.Resources);
          return this.context.lookupMaybe(dictOrRef, PDFDict_1.default);
        };
        PDFPageLeaf2.prototype.MediaBox = function() {
          var arrayOrRef = this.getInheritableAttribute(PDFName_1.default.MediaBox);
          return this.context.lookup(arrayOrRef, PDFArray_1.default);
        };
        PDFPageLeaf2.prototype.CropBox = function() {
          var arrayOrRef = this.getInheritableAttribute(PDFName_1.default.CropBox);
          return this.context.lookupMaybe(arrayOrRef, PDFArray_1.default);
        };
        PDFPageLeaf2.prototype.Rotate = function() {
          var numberOrRef = this.getInheritableAttribute(PDFName_1.default.Rotate);
          return this.context.lookupMaybe(numberOrRef, PDFNumber_1.default);
        };
        PDFPageLeaf2.prototype.getInheritableAttribute = function(name) {
          var attribute;
          this.ascend(function(node) {
            if (!attribute)
              attribute = node.get(name);
          });
          return attribute;
        };
        PDFPageLeaf2.prototype.setParent = function(parentRef) {
          this.set(PDFName_1.default.Parent, parentRef);
        };
        PDFPageLeaf2.prototype.addContentStream = function(contentStreamRef) {
          var Contents = this.normalizedEntries().Contents || this.context.obj([]);
          this.set(PDFName_1.default.Contents, Contents);
          Contents.push(contentStreamRef);
        };
        PDFPageLeaf2.prototype.wrapContentStreams = function(startStream, endStream) {
          var Contents = this.Contents();
          if (Contents instanceof PDFArray_1.default) {
            Contents.insert(0, startStream);
            Contents.push(endStream);
            return true;
          }
          return false;
        };
        PDFPageLeaf2.prototype.addAnnot = function(annotRef) {
          var Annots = this.normalizedEntries().Annots;
          Annots.push(annotRef);
        };
        PDFPageLeaf2.prototype.removeAnnot = function(annotRef) {
          var Annots = this.normalizedEntries().Annots;
          var index = Annots.indexOf(annotRef);
          if (index !== void 0) {
            Annots.remove(index);
          }
        };
        PDFPageLeaf2.prototype.setFontDictionary = function(name, fontDictRef) {
          var Font = this.normalizedEntries().Font;
          Font.set(name, fontDictRef);
        };
        PDFPageLeaf2.prototype.newFontDictionaryKey = function(tag) {
          var Font = this.normalizedEntries().Font;
          return Font.uniqueKey(tag);
        };
        PDFPageLeaf2.prototype.newFontDictionary = function(tag, fontDictRef) {
          var key = this.newFontDictionaryKey(tag);
          this.setFontDictionary(key, fontDictRef);
          return key;
        };
        PDFPageLeaf2.prototype.setXObject = function(name, xObjectRef) {
          var XObject = this.normalizedEntries().XObject;
          XObject.set(name, xObjectRef);
        };
        PDFPageLeaf2.prototype.newXObjectKey = function(tag) {
          var XObject = this.normalizedEntries().XObject;
          return XObject.uniqueKey(tag);
        };
        PDFPageLeaf2.prototype.newXObject = function(tag, xObjectRef) {
          var key = this.newXObjectKey(tag);
          this.setXObject(key, xObjectRef);
          return key;
        };
        PDFPageLeaf2.prototype.setExtGState = function(name, extGStateRef) {
          var ExtGState = this.normalizedEntries().ExtGState;
          ExtGState.set(name, extGStateRef);
        };
        PDFPageLeaf2.prototype.newExtGStateKey = function(tag) {
          var ExtGState = this.normalizedEntries().ExtGState;
          return ExtGState.uniqueKey(tag);
        };
        PDFPageLeaf2.prototype.newExtGState = function(tag, extGStateRef) {
          var key = this.newExtGStateKey(tag);
          this.setExtGState(key, extGStateRef);
          return key;
        };
        PDFPageLeaf2.prototype.ascend = function(visitor) {
          visitor(this);
          var Parent = this.Parent();
          if (Parent)
            Parent.ascend(visitor);
        };
        PDFPageLeaf2.prototype.normalize = function() {
          if (this.normalized)
            return;
          var context = this.context;
          var contentsRef = this.get(PDFName_1.default.Contents);
          var contents = this.context.lookup(contentsRef);
          if (contents instanceof PDFStream_1.default) {
            this.set(PDFName_1.default.Contents, context.obj([contentsRef]));
          }
          if (this.autoNormalizeCTM) {
            this.wrapContentStreams(this.context.getPushGraphicsStateContentStream(), this.context.getPopGraphicsStateContentStream());
          }
          var dictOrRef = this.getInheritableAttribute(PDFName_1.default.Resources);
          var Resources = context.lookupMaybe(dictOrRef, PDFDict_1.default) || context.obj({});
          this.set(PDFName_1.default.Resources, Resources);
          var Font = Resources.lookupMaybe(PDFName_1.default.Font, PDFDict_1.default) || context.obj({});
          Resources.set(PDFName_1.default.Font, Font);
          var XObject = Resources.lookupMaybe(PDFName_1.default.XObject, PDFDict_1.default) || context.obj({});
          Resources.set(PDFName_1.default.XObject, XObject);
          var ExtGState = Resources.lookupMaybe(PDFName_1.default.ExtGState, PDFDict_1.default) || context.obj({});
          Resources.set(PDFName_1.default.ExtGState, ExtGState);
          var Annots = this.Annots() || context.obj([]);
          this.set(PDFName_1.default.Annots, Annots);
          this.normalized = true;
        };
        PDFPageLeaf2.prototype.normalizedEntries = function() {
          this.normalize();
          var Annots = this.Annots();
          var Resources = this.Resources();
          var Contents = this.Contents();
          return {
            Annots,
            Resources,
            Contents,
            Font: Resources.lookup(PDFName_1.default.Font, PDFDict_1.default),
            XObject: Resources.lookup(PDFName_1.default.XObject, PDFDict_1.default),
            ExtGState: Resources.lookup(PDFName_1.default.ExtGState, PDFDict_1.default)
          };
        };
        PDFPageLeaf2.InheritableEntries = [
          "Resources",
          "MediaBox",
          "CropBox",
          "Rotate"
        ];
        PDFPageLeaf2.withContextAndParent = function(context, parent) {
          var dict = /* @__PURE__ */ new Map();
          dict.set(PDFName_1.default.Type, PDFName_1.default.Page);
          dict.set(PDFName_1.default.Parent, parent);
          dict.set(PDFName_1.default.Resources, context.obj({}));
          dict.set(PDFName_1.default.MediaBox, context.obj([0, 0, 612, 792]));
          return new PDFPageLeaf2(dict, context, false);
        };
        PDFPageLeaf2.fromMapWithContext = function(map, context, autoNormalizeCTM) {
          if (autoNormalizeCTM === void 0) {
            autoNormalizeCTM = true;
          }
          return new PDFPageLeaf2(map, context, autoNormalizeCTM);
        };
        return PDFPageLeaf2;
      })(PDFDict_1.default)
    );
    exports.default = PDFPageLeaf;
  }
});

// node_modules/pdf-lib/cjs/core/PDFObjectCopier.js
var require_PDFObjectCopier = __commonJS({
  "node_modules/pdf-lib/cjs/core/PDFObjectCopier.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFArray_1 = tslib_1.__importDefault(require_PDFArray());
    var PDFDict_1 = tslib_1.__importDefault(require_PDFDict());
    var PDFName_1 = tslib_1.__importDefault(require_PDFName());
    var PDFRef_1 = tslib_1.__importDefault(require_PDFRef());
    var PDFStream_1 = tslib_1.__importDefault(require_PDFStream());
    var PDFPageLeaf_1 = tslib_1.__importDefault(require_PDFPageLeaf());
    var PDFObjectCopier = (
      /** @class */
      (function() {
        function PDFObjectCopier2(src, dest) {
          var _this = this;
          this.traversedObjects = /* @__PURE__ */ new Map();
          this.copy = function(object) {
            return object instanceof PDFPageLeaf_1.default ? _this.copyPDFPage(object) : object instanceof PDFDict_1.default ? _this.copyPDFDict(object) : object instanceof PDFArray_1.default ? _this.copyPDFArray(object) : object instanceof PDFStream_1.default ? _this.copyPDFStream(object) : object instanceof PDFRef_1.default ? _this.copyPDFIndirectObject(object) : object.clone();
          };
          this.copyPDFPage = function(originalPage) {
            var clonedPage = originalPage.clone();
            var InheritableEntries = PDFPageLeaf_1.default.InheritableEntries;
            for (var idx = 0, len = InheritableEntries.length; idx < len; idx++) {
              var key = PDFName_1.default.of(InheritableEntries[idx]);
              var value = clonedPage.getInheritableAttribute(key);
              if (!clonedPage.get(key) && value)
                clonedPage.set(key, value);
            }
            clonedPage.delete(PDFName_1.default.of("Parent"));
            return _this.copyPDFDict(clonedPage);
          };
          this.copyPDFDict = function(originalDict) {
            if (_this.traversedObjects.has(originalDict)) {
              return _this.traversedObjects.get(originalDict);
            }
            var clonedDict = originalDict.clone(_this.dest);
            _this.traversedObjects.set(originalDict, clonedDict);
            var entries = originalDict.entries();
            for (var idx = 0, len = entries.length; idx < len; idx++) {
              var _a = entries[idx], key = _a[0], value = _a[1];
              clonedDict.set(key, _this.copy(value));
            }
            return clonedDict;
          };
          this.copyPDFArray = function(originalArray) {
            if (_this.traversedObjects.has(originalArray)) {
              return _this.traversedObjects.get(originalArray);
            }
            var clonedArray = originalArray.clone(_this.dest);
            _this.traversedObjects.set(originalArray, clonedArray);
            for (var idx = 0, len = originalArray.size(); idx < len; idx++) {
              var value = originalArray.get(idx);
              clonedArray.set(idx, _this.copy(value));
            }
            return clonedArray;
          };
          this.copyPDFStream = function(originalStream) {
            if (_this.traversedObjects.has(originalStream)) {
              return _this.traversedObjects.get(originalStream);
            }
            var clonedStream = originalStream.clone(_this.dest);
            _this.traversedObjects.set(originalStream, clonedStream);
            var entries = originalStream.dict.entries();
            for (var idx = 0, len = entries.length; idx < len; idx++) {
              var _a = entries[idx], key = _a[0], value = _a[1];
              clonedStream.dict.set(key, _this.copy(value));
            }
            return clonedStream;
          };
          this.copyPDFIndirectObject = function(ref) {
            var alreadyMapped = _this.traversedObjects.has(ref);
            if (!alreadyMapped) {
              var newRef = _this.dest.nextRef();
              _this.traversedObjects.set(ref, newRef);
              var dereferencedValue = _this.src.lookup(ref);
              if (dereferencedValue) {
                var cloned = _this.copy(dereferencedValue);
                _this.dest.assign(newRef, cloned);
              }
            }
            return _this.traversedObjects.get(ref);
          };
          this.src = src;
          this.dest = dest;
        }
        PDFObjectCopier2.for = function(src, dest) {
          return new PDFObjectCopier2(src, dest);
        };
        return PDFObjectCopier2;
      })()
    );
    exports.default = PDFObjectCopier;
  }
});

// node_modules/pdf-lib/cjs/core/document/PDFCrossRefSection.js
var require_PDFCrossRefSection = __commonJS({
  "node_modules/pdf-lib/cjs/core/document/PDFCrossRefSection.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFRef_1 = tslib_1.__importDefault(require_PDFRef());
    var CharCodes_1 = tslib_1.__importDefault(require_CharCodes());
    var utils_1 = require_utils2();
    var PDFCrossRefSection = (
      /** @class */
      (function() {
        function PDFCrossRefSection2(firstEntry) {
          this.subsections = firstEntry ? [[firstEntry]] : [];
          this.chunkIdx = 0;
          this.chunkLength = firstEntry ? 1 : 0;
        }
        PDFCrossRefSection2.prototype.addEntry = function(ref, offset) {
          this.append({ ref, offset, deleted: false });
        };
        PDFCrossRefSection2.prototype.addDeletedEntry = function(ref, nextFreeObjectNumber) {
          this.append({ ref, offset: nextFreeObjectNumber, deleted: true });
        };
        PDFCrossRefSection2.prototype.toString = function() {
          var section = "xref\n";
          for (var rangeIdx = 0, rangeLen = this.subsections.length; rangeIdx < rangeLen; rangeIdx++) {
            var range = this.subsections[rangeIdx];
            section += range[0].ref.objectNumber + " " + range.length + "\n";
            for (var entryIdx = 0, entryLen = range.length; entryIdx < entryLen; entryIdx++) {
              var entry = range[entryIdx];
              section += utils_1.padStart(String(entry.offset), 10, "0");
              section += " ";
              section += utils_1.padStart(String(entry.ref.generationNumber), 5, "0");
              section += " ";
              section += entry.deleted ? "f" : "n";
              section += " \n";
            }
          }
          return section;
        };
        PDFCrossRefSection2.prototype.sizeInBytes = function() {
          var size = 5;
          for (var idx = 0, len = this.subsections.length; idx < len; idx++) {
            var subsection = this.subsections[idx];
            var subsectionLength = subsection.length;
            var firstEntry = subsection[0];
            size += 2;
            size += String(firstEntry.ref.objectNumber).length;
            size += String(subsectionLength).length;
            size += 20 * subsectionLength;
          }
          return size;
        };
        PDFCrossRefSection2.prototype.copyBytesInto = function(buffer, offset) {
          var initialOffset = offset;
          buffer[offset++] = CharCodes_1.default.x;
          buffer[offset++] = CharCodes_1.default.r;
          buffer[offset++] = CharCodes_1.default.e;
          buffer[offset++] = CharCodes_1.default.f;
          buffer[offset++] = CharCodes_1.default.Newline;
          offset += this.copySubsectionsIntoBuffer(this.subsections, buffer, offset);
          return offset - initialOffset;
        };
        PDFCrossRefSection2.prototype.copySubsectionsIntoBuffer = function(subsections, buffer, offset) {
          var initialOffset = offset;
          var length = subsections.length;
          for (var idx = 0; idx < length; idx++) {
            var subsection = this.subsections[idx];
            var firstObjectNumber = String(subsection[0].ref.objectNumber);
            offset += utils_1.copyStringIntoBuffer(firstObjectNumber, buffer, offset);
            buffer[offset++] = CharCodes_1.default.Space;
            var rangeLength = String(subsection.length);
            offset += utils_1.copyStringIntoBuffer(rangeLength, buffer, offset);
            buffer[offset++] = CharCodes_1.default.Newline;
            offset += this.copyEntriesIntoBuffer(subsection, buffer, offset);
          }
          return offset - initialOffset;
        };
        PDFCrossRefSection2.prototype.copyEntriesIntoBuffer = function(entries, buffer, offset) {
          var length = entries.length;
          for (var idx = 0; idx < length; idx++) {
            var entry = entries[idx];
            var entryOffset = utils_1.padStart(String(entry.offset), 10, "0");
            offset += utils_1.copyStringIntoBuffer(entryOffset, buffer, offset);
            buffer[offset++] = CharCodes_1.default.Space;
            var entryGen = utils_1.padStart(String(entry.ref.generationNumber), 5, "0");
            offset += utils_1.copyStringIntoBuffer(entryGen, buffer, offset);
            buffer[offset++] = CharCodes_1.default.Space;
            buffer[offset++] = entry.deleted ? CharCodes_1.default.f : CharCodes_1.default.n;
            buffer[offset++] = CharCodes_1.default.Space;
            buffer[offset++] = CharCodes_1.default.Newline;
          }
          return 20 * length;
        };
        PDFCrossRefSection2.prototype.append = function(currEntry) {
          if (this.chunkLength === 0) {
            this.subsections.push([currEntry]);
            this.chunkIdx = 0;
            this.chunkLength = 1;
            return;
          }
          var chunk = this.subsections[this.chunkIdx];
          var prevEntry = chunk[this.chunkLength - 1];
          if (currEntry.ref.objectNumber - prevEntry.ref.objectNumber > 1) {
            this.subsections.push([currEntry]);
            this.chunkIdx += 1;
            this.chunkLength = 1;
          } else {
            chunk.push(currEntry);
            this.chunkLength += 1;
          }
        };
        PDFCrossRefSection2.create = function() {
          return new PDFCrossRefSection2({
            ref: PDFRef_1.default.of(0, 65535),
            offset: 0,
            deleted: true
          });
        };
        PDFCrossRefSection2.createEmpty = function() {
          return new PDFCrossRefSection2();
        };
        return PDFCrossRefSection2;
      })()
    );
    exports.default = PDFCrossRefSection;
  }
});

// node_modules/pdf-lib/cjs/core/document/PDFTrailer.js
var require_PDFTrailer = __commonJS({
  "node_modules/pdf-lib/cjs/core/document/PDFTrailer.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var CharCodes_1 = tslib_1.__importDefault(require_CharCodes());
    var utils_1 = require_utils2();
    var PDFTrailer = (
      /** @class */
      (function() {
        function PDFTrailer2(lastXRefOffset) {
          this.lastXRefOffset = String(lastXRefOffset);
        }
        PDFTrailer2.prototype.toString = function() {
          return "startxref\n" + this.lastXRefOffset + "\n%%EOF";
        };
        PDFTrailer2.prototype.sizeInBytes = function() {
          return 16 + this.lastXRefOffset.length;
        };
        PDFTrailer2.prototype.copyBytesInto = function(buffer, offset) {
          var initialOffset = offset;
          buffer[offset++] = CharCodes_1.default.s;
          buffer[offset++] = CharCodes_1.default.t;
          buffer[offset++] = CharCodes_1.default.a;
          buffer[offset++] = CharCodes_1.default.r;
          buffer[offset++] = CharCodes_1.default.t;
          buffer[offset++] = CharCodes_1.default.x;
          buffer[offset++] = CharCodes_1.default.r;
          buffer[offset++] = CharCodes_1.default.e;
          buffer[offset++] = CharCodes_1.default.f;
          buffer[offset++] = CharCodes_1.default.Newline;
          offset += utils_1.copyStringIntoBuffer(this.lastXRefOffset, buffer, offset);
          buffer[offset++] = CharCodes_1.default.Newline;
          buffer[offset++] = CharCodes_1.default.Percent;
          buffer[offset++] = CharCodes_1.default.Percent;
          buffer[offset++] = CharCodes_1.default.E;
          buffer[offset++] = CharCodes_1.default.O;
          buffer[offset++] = CharCodes_1.default.F;
          return offset - initialOffset;
        };
        PDFTrailer2.forLastCrossRefSectionOffset = function(offset) {
          return new PDFTrailer2(offset);
        };
        return PDFTrailer2;
      })()
    );
    exports.default = PDFTrailer;
  }
});

// node_modules/pdf-lib/cjs/core/document/PDFTrailerDict.js
var require_PDFTrailerDict = __commonJS({
  "node_modules/pdf-lib/cjs/core/document/PDFTrailerDict.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var CharCodes_1 = tslib_1.__importDefault(require_CharCodes());
    var PDFTrailerDict = (
      /** @class */
      (function() {
        function PDFTrailerDict2(dict) {
          this.dict = dict;
        }
        PDFTrailerDict2.prototype.toString = function() {
          return "trailer\n" + this.dict.toString();
        };
        PDFTrailerDict2.prototype.sizeInBytes = function() {
          return 8 + this.dict.sizeInBytes();
        };
        PDFTrailerDict2.prototype.copyBytesInto = function(buffer, offset) {
          var initialOffset = offset;
          buffer[offset++] = CharCodes_1.default.t;
          buffer[offset++] = CharCodes_1.default.r;
          buffer[offset++] = CharCodes_1.default.a;
          buffer[offset++] = CharCodes_1.default.i;
          buffer[offset++] = CharCodes_1.default.l;
          buffer[offset++] = CharCodes_1.default.e;
          buffer[offset++] = CharCodes_1.default.r;
          buffer[offset++] = CharCodes_1.default.Newline;
          offset += this.dict.copyBytesInto(buffer, offset);
          return offset - initialOffset;
        };
        PDFTrailerDict2.of = function(dict) {
          return new PDFTrailerDict2(dict);
        };
        return PDFTrailerDict2;
      })()
    );
    exports.default = PDFTrailerDict;
  }
});

// node_modules/pdf-lib/cjs/core/structures/PDFObjectStream.js
var require_PDFObjectStream = __commonJS({
  "node_modules/pdf-lib/cjs/core/structures/PDFObjectStream.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFName_1 = tslib_1.__importDefault(require_PDFName());
    var PDFNumber_1 = tslib_1.__importDefault(require_PDFNumber());
    var PDFFlateStream_1 = tslib_1.__importDefault(require_PDFFlateStream());
    var CharCodes_1 = tslib_1.__importDefault(require_CharCodes());
    var utils_1 = require_utils2();
    var PDFObjectStream = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PDFObjectStream2, _super);
        function PDFObjectStream2(context, objects, encode) {
          if (encode === void 0) {
            encode = true;
          }
          var _this = _super.call(this, context.obj({}), encode) || this;
          _this.objects = objects;
          _this.offsets = _this.computeObjectOffsets();
          _this.offsetsString = _this.computeOffsetsString();
          _this.dict.set(PDFName_1.default.of("Type"), PDFName_1.default.of("ObjStm"));
          _this.dict.set(PDFName_1.default.of("N"), PDFNumber_1.default.of(_this.objects.length));
          _this.dict.set(PDFName_1.default.of("First"), PDFNumber_1.default.of(_this.offsetsString.length));
          return _this;
        }
        PDFObjectStream2.prototype.getObjectsCount = function() {
          return this.objects.length;
        };
        PDFObjectStream2.prototype.clone = function(context) {
          return PDFObjectStream2.withContextAndObjects(context || this.dict.context, this.objects.slice(), this.encode);
        };
        PDFObjectStream2.prototype.getContentsString = function() {
          var value = this.offsetsString;
          for (var idx = 0, len = this.objects.length; idx < len; idx++) {
            var _a = this.objects[idx], object = _a[1];
            value += object + "\n";
          }
          return value;
        };
        PDFObjectStream2.prototype.getUnencodedContents = function() {
          var buffer = new Uint8Array(this.getUnencodedContentsSize());
          var offset = utils_1.copyStringIntoBuffer(this.offsetsString, buffer, 0);
          for (var idx = 0, len = this.objects.length; idx < len; idx++) {
            var _a = this.objects[idx], object = _a[1];
            offset += object.copyBytesInto(buffer, offset);
            buffer[offset++] = CharCodes_1.default.Newline;
          }
          return buffer;
        };
        PDFObjectStream2.prototype.getUnencodedContentsSize = function() {
          return this.offsetsString.length + utils_1.last(this.offsets)[1] + utils_1.last(this.objects)[1].sizeInBytes() + 1;
        };
        PDFObjectStream2.prototype.computeOffsetsString = function() {
          var offsetsString = "";
          for (var idx = 0, len = this.offsets.length; idx < len; idx++) {
            var _a = this.offsets[idx], objectNumber = _a[0], offset = _a[1];
            offsetsString += objectNumber + " " + offset + " ";
          }
          return offsetsString;
        };
        PDFObjectStream2.prototype.computeObjectOffsets = function() {
          var offset = 0;
          var offsets = new Array(this.objects.length);
          for (var idx = 0, len = this.objects.length; idx < len; idx++) {
            var _a = this.objects[idx], ref = _a[0], object = _a[1];
            offsets[idx] = [ref.objectNumber, offset];
            offset += object.sizeInBytes() + 1;
          }
          return offsets;
        };
        PDFObjectStream2.withContextAndObjects = function(context, objects, encode) {
          if (encode === void 0) {
            encode = true;
          }
          return new PDFObjectStream2(context, objects, encode);
        };
        return PDFObjectStream2;
      })(PDFFlateStream_1.default)
    );
    exports.default = PDFObjectStream;
  }
});

// node_modules/pdf-lib/cjs/core/writers/PDFWriter.js
var require_PDFWriter = __commonJS({
  "node_modules/pdf-lib/cjs/core/writers/PDFWriter.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFCrossRefSection_1 = tslib_1.__importDefault(require_PDFCrossRefSection());
    var PDFHeader_1 = tslib_1.__importDefault(require_PDFHeader());
    var PDFTrailer_1 = tslib_1.__importDefault(require_PDFTrailer());
    var PDFTrailerDict_1 = tslib_1.__importDefault(require_PDFTrailerDict());
    var PDFObjectStream_1 = tslib_1.__importDefault(require_PDFObjectStream());
    var CharCodes_1 = tslib_1.__importDefault(require_CharCodes());
    var utils_1 = require_utils2();
    var PDFWriter = (
      /** @class */
      (function() {
        function PDFWriter2(context, objectsPerTick) {
          var _this = this;
          this.parsedObjects = 0;
          this.shouldWaitForTick = function(n) {
            _this.parsedObjects += n;
            return _this.parsedObjects % _this.objectsPerTick === 0;
          };
          this.context = context;
          this.objectsPerTick = objectsPerTick;
        }
        PDFWriter2.prototype.serializeToBuffer = function() {
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            var _a, size, header, indirectObjects, xref, trailerDict, trailer, offset, buffer, idx, len, _b, ref, object, objectNumber, generationNumber, n;
            return tslib_1.__generator(this, function(_c) {
              switch (_c.label) {
                case 0:
                  return [4, this.computeBufferSize()];
                case 1:
                  _a = _c.sent(), size = _a.size, header = _a.header, indirectObjects = _a.indirectObjects, xref = _a.xref, trailerDict = _a.trailerDict, trailer = _a.trailer;
                  offset = 0;
                  buffer = new Uint8Array(size);
                  offset += header.copyBytesInto(buffer, offset);
                  buffer[offset++] = CharCodes_1.default.Newline;
                  buffer[offset++] = CharCodes_1.default.Newline;
                  idx = 0, len = indirectObjects.length;
                  _c.label = 2;
                case 2:
                  if (!(idx < len)) return [3, 5];
                  _b = indirectObjects[idx], ref = _b[0], object = _b[1];
                  objectNumber = String(ref.objectNumber);
                  offset += utils_1.copyStringIntoBuffer(objectNumber, buffer, offset);
                  buffer[offset++] = CharCodes_1.default.Space;
                  generationNumber = String(ref.generationNumber);
                  offset += utils_1.copyStringIntoBuffer(generationNumber, buffer, offset);
                  buffer[offset++] = CharCodes_1.default.Space;
                  buffer[offset++] = CharCodes_1.default.o;
                  buffer[offset++] = CharCodes_1.default.b;
                  buffer[offset++] = CharCodes_1.default.j;
                  buffer[offset++] = CharCodes_1.default.Newline;
                  offset += object.copyBytesInto(buffer, offset);
                  buffer[offset++] = CharCodes_1.default.Newline;
                  buffer[offset++] = CharCodes_1.default.e;
                  buffer[offset++] = CharCodes_1.default.n;
                  buffer[offset++] = CharCodes_1.default.d;
                  buffer[offset++] = CharCodes_1.default.o;
                  buffer[offset++] = CharCodes_1.default.b;
                  buffer[offset++] = CharCodes_1.default.j;
                  buffer[offset++] = CharCodes_1.default.Newline;
                  buffer[offset++] = CharCodes_1.default.Newline;
                  n = object instanceof PDFObjectStream_1.default ? object.getObjectsCount() : 1;
                  if (!this.shouldWaitForTick(n)) return [3, 4];
                  return [4, utils_1.waitForTick()];
                case 3:
                  _c.sent();
                  _c.label = 4;
                case 4:
                  idx++;
                  return [3, 2];
                case 5:
                  if (xref) {
                    offset += xref.copyBytesInto(buffer, offset);
                    buffer[offset++] = CharCodes_1.default.Newline;
                  }
                  if (trailerDict) {
                    offset += trailerDict.copyBytesInto(buffer, offset);
                    buffer[offset++] = CharCodes_1.default.Newline;
                    buffer[offset++] = CharCodes_1.default.Newline;
                  }
                  offset += trailer.copyBytesInto(buffer, offset);
                  return [2, buffer];
              }
            });
          });
        };
        PDFWriter2.prototype.computeIndirectObjectSize = function(_a) {
          var ref = _a[0], object = _a[1];
          var refSize = ref.sizeInBytes() + 3;
          var objectSize = object.sizeInBytes() + 9;
          return refSize + objectSize;
        };
        PDFWriter2.prototype.createTrailerDict = function() {
          return this.context.obj({
            Size: this.context.largestObjectNumber + 1,
            Root: this.context.trailerInfo.Root,
            Encrypt: this.context.trailerInfo.Encrypt,
            Info: this.context.trailerInfo.Info,
            ID: this.context.trailerInfo.ID
          });
        };
        PDFWriter2.prototype.computeBufferSize = function() {
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            var header, size, xref, indirectObjects, idx, len, indirectObject, ref, xrefOffset, trailerDict, trailer;
            return tslib_1.__generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  header = PDFHeader_1.default.forVersion(1, 7);
                  size = header.sizeInBytes() + 2;
                  xref = PDFCrossRefSection_1.default.create();
                  indirectObjects = this.context.enumerateIndirectObjects();
                  idx = 0, len = indirectObjects.length;
                  _a.label = 1;
                case 1:
                  if (!(idx < len)) return [3, 4];
                  indirectObject = indirectObjects[idx];
                  ref = indirectObject[0];
                  xref.addEntry(ref, size);
                  size += this.computeIndirectObjectSize(indirectObject);
                  if (!this.shouldWaitForTick(1)) return [3, 3];
                  return [4, utils_1.waitForTick()];
                case 2:
                  _a.sent();
                  _a.label = 3;
                case 3:
                  idx++;
                  return [3, 1];
                case 4:
                  xrefOffset = size;
                  size += xref.sizeInBytes() + 1;
                  trailerDict = PDFTrailerDict_1.default.of(this.createTrailerDict());
                  size += trailerDict.sizeInBytes() + 2;
                  trailer = PDFTrailer_1.default.forLastCrossRefSectionOffset(xrefOffset);
                  size += trailer.sizeInBytes();
                  return [2, { size, header, indirectObjects, xref, trailerDict, trailer }];
              }
            });
          });
        };
        PDFWriter2.forContext = function(context, objectsPerTick) {
          return new PDFWriter2(context, objectsPerTick);
        };
        return PDFWriter2;
      })()
    );
    exports.default = PDFWriter;
  }
});

// node_modules/pdf-lib/cjs/core/objects/PDFInvalidObject.js
var require_PDFInvalidObject = __commonJS({
  "node_modules/pdf-lib/cjs/core/objects/PDFInvalidObject.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFObject_1 = tslib_1.__importDefault(require_PDFObject());
    var PDFInvalidObject = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PDFInvalidObject2, _super);
        function PDFInvalidObject2(data) {
          var _this = _super.call(this) || this;
          _this.data = data;
          return _this;
        }
        PDFInvalidObject2.prototype.clone = function() {
          return PDFInvalidObject2.of(this.data.slice());
        };
        PDFInvalidObject2.prototype.toString = function() {
          return "PDFInvalidObject(" + this.data.length + " bytes)";
        };
        PDFInvalidObject2.prototype.sizeInBytes = function() {
          return this.data.length;
        };
        PDFInvalidObject2.prototype.copyBytesInto = function(buffer, offset) {
          var length = this.data.length;
          for (var idx = 0; idx < length; idx++) {
            buffer[offset++] = this.data[idx];
          }
          return length;
        };
        PDFInvalidObject2.of = function(data) {
          return new PDFInvalidObject2(data);
        };
        return PDFInvalidObject2;
      })(PDFObject_1.default)
    );
    exports.default = PDFInvalidObject;
  }
});

// node_modules/pdf-lib/cjs/core/structures/PDFCrossRefStream.js
var require_PDFCrossRefStream = __commonJS({
  "node_modules/pdf-lib/cjs/core/structures/PDFCrossRefStream.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EntryType = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFName_1 = tslib_1.__importDefault(require_PDFName());
    var PDFRef_1 = tslib_1.__importDefault(require_PDFRef());
    var PDFFlateStream_1 = tslib_1.__importDefault(require_PDFFlateStream());
    var utils_1 = require_utils2();
    var EntryType;
    (function(EntryType2) {
      EntryType2[EntryType2["Deleted"] = 0] = "Deleted";
      EntryType2[EntryType2["Uncompressed"] = 1] = "Uncompressed";
      EntryType2[EntryType2["Compressed"] = 2] = "Compressed";
    })(EntryType = exports.EntryType || (exports.EntryType = {}));
    var PDFCrossRefStream = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PDFCrossRefStream2, _super);
        function PDFCrossRefStream2(dict, entries, encode) {
          if (encode === void 0) {
            encode = true;
          }
          var _this = _super.call(this, dict, encode) || this;
          _this.computeIndex = function() {
            var subsections = [];
            var subsectionLength = 0;
            for (var idx = 0, len = _this.entries.length; idx < len; idx++) {
              var currEntry = _this.entries[idx];
              var prevEntry = _this.entries[idx - 1];
              if (idx === 0) {
                subsections.push(currEntry.ref.objectNumber);
              } else if (currEntry.ref.objectNumber - prevEntry.ref.objectNumber > 1) {
                subsections.push(subsectionLength);
                subsections.push(currEntry.ref.objectNumber);
                subsectionLength = 0;
              }
              subsectionLength += 1;
            }
            subsections.push(subsectionLength);
            return subsections;
          };
          _this.computeEntryTuples = function() {
            var entryTuples = new Array(_this.entries.length);
            for (var idx = 0, len = _this.entries.length; idx < len; idx++) {
              var entry = _this.entries[idx];
              if (entry.type === EntryType.Deleted) {
                var type = entry.type, nextFreeObjectNumber = entry.nextFreeObjectNumber, ref = entry.ref;
                entryTuples[idx] = [type, nextFreeObjectNumber, ref.generationNumber];
              }
              if (entry.type === EntryType.Uncompressed) {
                var type = entry.type, offset = entry.offset, ref = entry.ref;
                entryTuples[idx] = [type, offset, ref.generationNumber];
              }
              if (entry.type === EntryType.Compressed) {
                var type = entry.type, objectStreamRef = entry.objectStreamRef, index = entry.index;
                entryTuples[idx] = [type, objectStreamRef.objectNumber, index];
              }
            }
            return entryTuples;
          };
          _this.computeMaxEntryByteWidths = function() {
            var entryTuples = _this.entryTuplesCache.access();
            var widths = [0, 0, 0];
            for (var idx = 0, len = entryTuples.length; idx < len; idx++) {
              var _a = entryTuples[idx], first = _a[0], second = _a[1], third = _a[2];
              var firstSize = utils_1.sizeInBytes(first);
              var secondSize = utils_1.sizeInBytes(second);
              var thirdSize = utils_1.sizeInBytes(third);
              if (firstSize > widths[0])
                widths[0] = firstSize;
              if (secondSize > widths[1])
                widths[1] = secondSize;
              if (thirdSize > widths[2])
                widths[2] = thirdSize;
            }
            return widths;
          };
          _this.entries = entries || [];
          _this.entryTuplesCache = utils_1.Cache.populatedBy(_this.computeEntryTuples);
          _this.maxByteWidthsCache = utils_1.Cache.populatedBy(_this.computeMaxEntryByteWidths);
          _this.indexCache = utils_1.Cache.populatedBy(_this.computeIndex);
          dict.set(PDFName_1.default.of("Type"), PDFName_1.default.of("XRef"));
          return _this;
        }
        PDFCrossRefStream2.prototype.addDeletedEntry = function(ref, nextFreeObjectNumber) {
          var type = EntryType.Deleted;
          this.entries.push({ type, ref, nextFreeObjectNumber });
          this.entryTuplesCache.invalidate();
          this.maxByteWidthsCache.invalidate();
          this.indexCache.invalidate();
          this.contentsCache.invalidate();
        };
        PDFCrossRefStream2.prototype.addUncompressedEntry = function(ref, offset) {
          var type = EntryType.Uncompressed;
          this.entries.push({ type, ref, offset });
          this.entryTuplesCache.invalidate();
          this.maxByteWidthsCache.invalidate();
          this.indexCache.invalidate();
          this.contentsCache.invalidate();
        };
        PDFCrossRefStream2.prototype.addCompressedEntry = function(ref, objectStreamRef, index) {
          var type = EntryType.Compressed;
          this.entries.push({ type, ref, objectStreamRef, index });
          this.entryTuplesCache.invalidate();
          this.maxByteWidthsCache.invalidate();
          this.indexCache.invalidate();
          this.contentsCache.invalidate();
        };
        PDFCrossRefStream2.prototype.clone = function(context) {
          var _a = this, dict = _a.dict, entries = _a.entries, encode = _a.encode;
          return PDFCrossRefStream2.of(dict.clone(context), entries.slice(), encode);
        };
        PDFCrossRefStream2.prototype.getContentsString = function() {
          var entryTuples = this.entryTuplesCache.access();
          var byteWidths = this.maxByteWidthsCache.access();
          var value = "";
          for (var entryIdx = 0, entriesLen = entryTuples.length; entryIdx < entriesLen; entryIdx++) {
            var _a = entryTuples[entryIdx], first = _a[0], second = _a[1], third = _a[2];
            var firstBytes = utils_1.reverseArray(utils_1.bytesFor(first));
            var secondBytes = utils_1.reverseArray(utils_1.bytesFor(second));
            var thirdBytes = utils_1.reverseArray(utils_1.bytesFor(third));
            for (var idx = byteWidths[0] - 1; idx >= 0; idx--) {
              value += (firstBytes[idx] || 0).toString(2);
            }
            for (var idx = byteWidths[1] - 1; idx >= 0; idx--) {
              value += (secondBytes[idx] || 0).toString(2);
            }
            for (var idx = byteWidths[2] - 1; idx >= 0; idx--) {
              value += (thirdBytes[idx] || 0).toString(2);
            }
          }
          return value;
        };
        PDFCrossRefStream2.prototype.getUnencodedContents = function() {
          var entryTuples = this.entryTuplesCache.access();
          var byteWidths = this.maxByteWidthsCache.access();
          var buffer = new Uint8Array(this.getUnencodedContentsSize());
          var offset = 0;
          for (var entryIdx = 0, entriesLen = entryTuples.length; entryIdx < entriesLen; entryIdx++) {
            var _a = entryTuples[entryIdx], first = _a[0], second = _a[1], third = _a[2];
            var firstBytes = utils_1.reverseArray(utils_1.bytesFor(first));
            var secondBytes = utils_1.reverseArray(utils_1.bytesFor(second));
            var thirdBytes = utils_1.reverseArray(utils_1.bytesFor(third));
            for (var idx = byteWidths[0] - 1; idx >= 0; idx--) {
              buffer[offset++] = firstBytes[idx] || 0;
            }
            for (var idx = byteWidths[1] - 1; idx >= 0; idx--) {
              buffer[offset++] = secondBytes[idx] || 0;
            }
            for (var idx = byteWidths[2] - 1; idx >= 0; idx--) {
              buffer[offset++] = thirdBytes[idx] || 0;
            }
          }
          return buffer;
        };
        PDFCrossRefStream2.prototype.getUnencodedContentsSize = function() {
          var byteWidths = this.maxByteWidthsCache.access();
          var entryWidth = utils_1.sum(byteWidths);
          return entryWidth * this.entries.length;
        };
        PDFCrossRefStream2.prototype.updateDict = function() {
          _super.prototype.updateDict.call(this);
          var byteWidths = this.maxByteWidthsCache.access();
          var index = this.indexCache.access();
          var context = this.dict.context;
          this.dict.set(PDFName_1.default.of("W"), context.obj(byteWidths));
          this.dict.set(PDFName_1.default.of("Index"), context.obj(index));
        };
        PDFCrossRefStream2.create = function(dict, encode) {
          if (encode === void 0) {
            encode = true;
          }
          var stream = new PDFCrossRefStream2(dict, [], encode);
          stream.addDeletedEntry(PDFRef_1.default.of(0, 65535), 0);
          return stream;
        };
        PDFCrossRefStream2.of = function(dict, entries, encode) {
          if (encode === void 0) {
            encode = true;
          }
          return new PDFCrossRefStream2(dict, entries, encode);
        };
        return PDFCrossRefStream2;
      })(PDFFlateStream_1.default)
    );
    exports.default = PDFCrossRefStream;
  }
});

// node_modules/pdf-lib/cjs/core/writers/PDFStreamWriter.js
var require_PDFStreamWriter = __commonJS({
  "node_modules/pdf-lib/cjs/core/writers/PDFStreamWriter.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFHeader_1 = tslib_1.__importDefault(require_PDFHeader());
    var PDFTrailer_1 = tslib_1.__importDefault(require_PDFTrailer());
    var PDFInvalidObject_1 = tslib_1.__importDefault(require_PDFInvalidObject());
    var PDFName_1 = tslib_1.__importDefault(require_PDFName());
    var PDFNumber_1 = tslib_1.__importDefault(require_PDFNumber());
    var PDFRef_1 = tslib_1.__importDefault(require_PDFRef());
    var PDFStream_1 = tslib_1.__importDefault(require_PDFStream());
    var PDFCrossRefStream_1 = tslib_1.__importDefault(require_PDFCrossRefStream());
    var PDFObjectStream_1 = tslib_1.__importDefault(require_PDFObjectStream());
    var PDFWriter_1 = tslib_1.__importDefault(require_PDFWriter());
    var utils_1 = require_utils2();
    var PDFStreamWriter = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PDFStreamWriter2, _super);
        function PDFStreamWriter2(context, objectsPerTick, encodeStreams, objectsPerStream) {
          var _this = _super.call(this, context, objectsPerTick) || this;
          _this.encodeStreams = encodeStreams;
          _this.objectsPerStream = objectsPerStream;
          return _this;
        }
        PDFStreamWriter2.prototype.computeBufferSize = function() {
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            var objectNumber, header, size, xrefStream, uncompressedObjects, compressedObjects, objectStreamRefs, indirectObjects, idx, len, indirectObject, ref, object, shouldNotCompress, chunk, objectStreamRef, idx, len, chunk, ref, objectStream, xrefStreamRef, xrefOffset, trailer;
            return tslib_1.__generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  objectNumber = this.context.largestObjectNumber + 1;
                  header = PDFHeader_1.default.forVersion(1, 7);
                  size = header.sizeInBytes() + 2;
                  xrefStream = PDFCrossRefStream_1.default.create(this.createTrailerDict(), this.encodeStreams);
                  uncompressedObjects = [];
                  compressedObjects = [];
                  objectStreamRefs = [];
                  indirectObjects = this.context.enumerateIndirectObjects();
                  idx = 0, len = indirectObjects.length;
                  _a.label = 1;
                case 1:
                  if (!(idx < len)) return [3, 6];
                  indirectObject = indirectObjects[idx];
                  ref = indirectObject[0], object = indirectObject[1];
                  shouldNotCompress = ref === this.context.trailerInfo.Encrypt || object instanceof PDFStream_1.default || object instanceof PDFInvalidObject_1.default || ref.generationNumber !== 0;
                  if (!shouldNotCompress) return [3, 4];
                  uncompressedObjects.push(indirectObject);
                  xrefStream.addUncompressedEntry(ref, size);
                  size += this.computeIndirectObjectSize(indirectObject);
                  if (!this.shouldWaitForTick(1)) return [3, 3];
                  return [4, utils_1.waitForTick()];
                case 2:
                  _a.sent();
                  _a.label = 3;
                case 3:
                  return [3, 5];
                case 4:
                  chunk = utils_1.last(compressedObjects);
                  objectStreamRef = utils_1.last(objectStreamRefs);
                  if (!chunk || chunk.length % this.objectsPerStream === 0) {
                    chunk = [];
                    compressedObjects.push(chunk);
                    objectStreamRef = PDFRef_1.default.of(objectNumber++);
                    objectStreamRefs.push(objectStreamRef);
                  }
                  xrefStream.addCompressedEntry(ref, objectStreamRef, chunk.length);
                  chunk.push(indirectObject);
                  _a.label = 5;
                case 5:
                  idx++;
                  return [3, 1];
                case 6:
                  idx = 0, len = compressedObjects.length;
                  _a.label = 7;
                case 7:
                  if (!(idx < len)) return [3, 10];
                  chunk = compressedObjects[idx];
                  ref = objectStreamRefs[idx];
                  objectStream = PDFObjectStream_1.default.withContextAndObjects(this.context, chunk, this.encodeStreams);
                  xrefStream.addUncompressedEntry(ref, size);
                  size += this.computeIndirectObjectSize([ref, objectStream]);
                  uncompressedObjects.push([ref, objectStream]);
                  if (!this.shouldWaitForTick(chunk.length)) return [3, 9];
                  return [4, utils_1.waitForTick()];
                case 8:
                  _a.sent();
                  _a.label = 9;
                case 9:
                  idx++;
                  return [3, 7];
                case 10:
                  xrefStreamRef = PDFRef_1.default.of(objectNumber++);
                  xrefStream.dict.set(PDFName_1.default.of("Size"), PDFNumber_1.default.of(objectNumber));
                  xrefStream.addUncompressedEntry(xrefStreamRef, size);
                  xrefOffset = size;
                  size += this.computeIndirectObjectSize([xrefStreamRef, xrefStream]);
                  uncompressedObjects.push([xrefStreamRef, xrefStream]);
                  trailer = PDFTrailer_1.default.forLastCrossRefSectionOffset(xrefOffset);
                  size += trailer.sizeInBytes();
                  return [2, { size, header, indirectObjects: uncompressedObjects, trailer }];
              }
            });
          });
        };
        PDFStreamWriter2.forContext = function(context, objectsPerTick, encodeStreams, objectsPerStream) {
          if (encodeStreams === void 0) {
            encodeStreams = true;
          }
          if (objectsPerStream === void 0) {
            objectsPerStream = 50;
          }
          return new PDFStreamWriter2(context, objectsPerTick, encodeStreams, objectsPerStream);
        };
        return PDFStreamWriter2;
      })(PDFWriter_1.default)
    );
    exports.default = PDFStreamWriter;
  }
});

// node_modules/pdf-lib/cjs/core/objects/PDFHexString.js
var require_PDFHexString = __commonJS({
  "node_modules/pdf-lib/cjs/core/objects/PDFHexString.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFObject_1 = tslib_1.__importDefault(require_PDFObject());
    var CharCodes_1 = tslib_1.__importDefault(require_CharCodes());
    var utils_1 = require_utils2();
    var errors_1 = require_errors2();
    var PDFHexString = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PDFHexString2, _super);
        function PDFHexString2(value) {
          var _this = _super.call(this) || this;
          _this.value = value;
          return _this;
        }
        PDFHexString2.prototype.asBytes = function() {
          var hex = this.value + (this.value.length % 2 === 1 ? "0" : "");
          var hexLength = hex.length;
          var bytes = new Uint8Array(hex.length / 2);
          var hexOffset = 0;
          var bytesOffset = 0;
          while (hexOffset < hexLength) {
            var byte = parseInt(hex.substring(hexOffset, hexOffset + 2), 16);
            bytes[bytesOffset] = byte;
            hexOffset += 2;
            bytesOffset += 1;
          }
          return bytes;
        };
        PDFHexString2.prototype.decodeText = function() {
          var bytes = this.asBytes();
          if (utils_1.hasUtf16BOM(bytes))
            return utils_1.utf16Decode(bytes);
          return utils_1.pdfDocEncodingDecode(bytes);
        };
        PDFHexString2.prototype.decodeDate = function() {
          var text = this.decodeText();
          var date = utils_1.parseDate(text);
          if (!date)
            throw new errors_1.InvalidPDFDateStringError(text);
          return date;
        };
        PDFHexString2.prototype.asString = function() {
          return this.value;
        };
        PDFHexString2.prototype.clone = function() {
          return PDFHexString2.of(this.value);
        };
        PDFHexString2.prototype.toString = function() {
          return "<" + this.value + ">";
        };
        PDFHexString2.prototype.sizeInBytes = function() {
          return this.value.length + 2;
        };
        PDFHexString2.prototype.copyBytesInto = function(buffer, offset) {
          buffer[offset++] = CharCodes_1.default.LessThan;
          offset += utils_1.copyStringIntoBuffer(this.value, buffer, offset);
          buffer[offset++] = CharCodes_1.default.GreaterThan;
          return this.value.length + 2;
        };
        PDFHexString2.of = function(value) {
          return new PDFHexString2(value);
        };
        PDFHexString2.fromText = function(value) {
          var encoded = utils_1.utf16Encode(value);
          var hex = "";
          for (var idx = 0, len = encoded.length; idx < len; idx++) {
            hex += utils_1.toHexStringOfMinLength(encoded[idx], 4);
          }
          return new PDFHexString2(hex);
        };
        return PDFHexString2;
      })(PDFObject_1.default)
    );
    exports.default = PDFHexString;
  }
});

// node_modules/pdf-lib/cjs/core/embedders/StandardFontEmbedder.js
var require_StandardFontEmbedder = __commonJS({
  "node_modules/pdf-lib/cjs/core/embedders/StandardFontEmbedder.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var standard_fonts_1 = require_lib();
    var PDFHexString_1 = tslib_1.__importDefault(require_PDFHexString());
    var utils_1 = require_utils2();
    var StandardFontEmbedder = (
      /** @class */
      (function() {
        function StandardFontEmbedder2(fontName, customName) {
          this.encoding = fontName === standard_fonts_1.FontNames.ZapfDingbats ? standard_fonts_1.Encodings.ZapfDingbats : fontName === standard_fonts_1.FontNames.Symbol ? standard_fonts_1.Encodings.Symbol : standard_fonts_1.Encodings.WinAnsi;
          this.font = standard_fonts_1.Font.load(fontName);
          this.fontName = this.font.FontName;
          this.customName = customName;
        }
        StandardFontEmbedder2.prototype.encodeText = function(text) {
          var glyphs = this.encodeTextAsGlyphs(text);
          var hexCodes = new Array(glyphs.length);
          for (var idx = 0, len = glyphs.length; idx < len; idx++) {
            hexCodes[idx] = utils_1.toHexString(glyphs[idx].code);
          }
          return PDFHexString_1.default.of(hexCodes.join(""));
        };
        StandardFontEmbedder2.prototype.widthOfTextAtSize = function(text, size) {
          var glyphs = this.encodeTextAsGlyphs(text);
          var totalWidth = 0;
          for (var idx = 0, len = glyphs.length; idx < len; idx++) {
            var left = glyphs[idx].name;
            var right = (glyphs[idx + 1] || {}).name;
            var kernAmount = this.font.getXAxisKerningForPair(left, right) || 0;
            totalWidth += this.widthOfGlyph(left) + kernAmount;
          }
          var scale = size / 1e3;
          return totalWidth * scale;
        };
        StandardFontEmbedder2.prototype.heightOfFontAtSize = function(size, options) {
          if (options === void 0) {
            options = {};
          }
          var _a = options.descender, descender = _a === void 0 ? true : _a;
          var _b = this.font, Ascender = _b.Ascender, Descender = _b.Descender, FontBBox = _b.FontBBox;
          var yTop = Ascender || FontBBox[3];
          var yBottom = Descender || FontBBox[1];
          var height = yTop - yBottom;
          if (!descender)
            height += Descender || 0;
          return height / 1e3 * size;
        };
        StandardFontEmbedder2.prototype.sizeOfFontAtHeight = function(height) {
          var _a = this.font, Ascender = _a.Ascender, Descender = _a.Descender, FontBBox = _a.FontBBox;
          var yTop = Ascender || FontBBox[3];
          var yBottom = Descender || FontBBox[1];
          return 1e3 * height / (yTop - yBottom);
        };
        StandardFontEmbedder2.prototype.embedIntoContext = function(context, ref) {
          var fontDict = context.obj({
            Type: "Font",
            Subtype: "Type1",
            BaseFont: this.customName || this.fontName,
            Encoding: this.encoding === standard_fonts_1.Encodings.WinAnsi ? "WinAnsiEncoding" : void 0
          });
          if (ref) {
            context.assign(ref, fontDict);
            return ref;
          } else {
            return context.register(fontDict);
          }
        };
        StandardFontEmbedder2.prototype.widthOfGlyph = function(glyphName) {
          return this.font.getWidthOfGlyph(glyphName) || 250;
        };
        StandardFontEmbedder2.prototype.encodeTextAsGlyphs = function(text) {
          var codePoints = Array.from(text);
          var glyphs = new Array(codePoints.length);
          for (var idx = 0, len = codePoints.length; idx < len; idx++) {
            var codePoint = utils_1.toCodePoint(codePoints[idx]);
            glyphs[idx] = this.encoding.encodeUnicodeCodePoint(codePoint);
          }
          return glyphs;
        };
        StandardFontEmbedder2.for = function(fontName, customName) {
          return new StandardFontEmbedder2(fontName, customName);
        };
        return StandardFontEmbedder2;
      })()
    );
    exports.default = StandardFontEmbedder;
  }
});

// node_modules/pdf-lib/cjs/core/embedders/CMap.js
var require_CMap = __commonJS({
  "node_modules/pdf-lib/cjs/core/embedders/CMap.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createCmap = void 0;
    var utils_1 = require_utils2();
    var unicode_1 = require_unicode();
    exports.createCmap = function(glyphs, glyphId) {
      var bfChars = new Array(glyphs.length);
      for (var idx = 0, len = glyphs.length; idx < len; idx++) {
        var glyph = glyphs[idx];
        var id = cmapHexFormat(cmapHexString(glyphId(glyph)));
        var unicode = cmapHexFormat.apply(void 0, glyph.codePoints.map(cmapCodePointFormat));
        bfChars[idx] = [id, unicode];
      }
      return fillCmapTemplate(bfChars);
    };
    var fillCmapTemplate = function(bfChars) {
      return "/CIDInit /ProcSet findresource begin\n12 dict begin\nbegincmap\n/CIDSystemInfo <<\n  /Registry (Adobe)\n  /Ordering (UCS)\n  /Supplement 0\n>> def\n/CMapName /Adobe-Identity-UCS def\n/CMapType 2 def\n1 begincodespacerange\n<0000><ffff>\nendcodespacerange\n" + bfChars.length + " beginbfchar\n" + bfChars.map(function(_a) {
        var glyphId = _a[0], codePoint = _a[1];
        return glyphId + " " + codePoint;
      }).join("\n") + "\nendbfchar\nendcmap\nCMapName currentdict /CMap defineresource pop\nend\nend";
    };
    var cmapHexFormat = function() {
      var values = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
      }
      return "<" + values.join("") + ">";
    };
    var cmapHexString = function(value) {
      return utils_1.toHexStringOfMinLength(value, 4);
    };
    var cmapCodePointFormat = function(codePoint) {
      if (unicode_1.isWithinBMP(codePoint))
        return cmapHexString(codePoint);
      if (unicode_1.hasSurrogates(codePoint)) {
        var hs = unicode_1.highSurrogate(codePoint);
        var ls = unicode_1.lowSurrogate(codePoint);
        return "" + cmapHexString(hs) + cmapHexString(ls);
      }
      var hex = utils_1.toHexString(codePoint);
      var msg = "0x" + hex + " is not a valid UTF-8 or UTF-16 codepoint.";
      throw new Error(msg);
    };
  }
});

// node_modules/pdf-lib/cjs/core/embedders/FontFlags.js
var require_FontFlags = __commonJS({
  "node_modules/pdf-lib/cjs/core/embedders/FontFlags.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.deriveFontFlags = void 0;
    var makeFontFlags = function(options) {
      var flags = 0;
      var flipBit = function(bit) {
        flags |= 1 << bit - 1;
      };
      if (options.fixedPitch)
        flipBit(1);
      if (options.serif)
        flipBit(2);
      if (options.symbolic)
        flipBit(3);
      if (options.script)
        flipBit(4);
      if (options.nonsymbolic)
        flipBit(6);
      if (options.italic)
        flipBit(7);
      if (options.allCap)
        flipBit(17);
      if (options.smallCap)
        flipBit(18);
      if (options.forceBold)
        flipBit(19);
      return flags;
    };
    exports.deriveFontFlags = function(font) {
      var familyClass = font["OS/2"] ? font["OS/2"].sFamilyClass : 0;
      var flags = makeFontFlags({
        fixedPitch: font.post.isFixedPitch,
        serif: 1 <= familyClass && familyClass <= 7,
        symbolic: true,
        script: familyClass === 10,
        italic: font.head.macStyle.italic
      });
      return flags;
    };
  }
});

// node_modules/pdf-lib/cjs/core/objects/PDFString.js
var require_PDFString = __commonJS({
  "node_modules/pdf-lib/cjs/core/objects/PDFString.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFObject_1 = tslib_1.__importDefault(require_PDFObject());
    var CharCodes_1 = tslib_1.__importDefault(require_CharCodes());
    var utils_1 = require_utils2();
    var errors_1 = require_errors2();
    var PDFString = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PDFString2, _super);
        function PDFString2(value) {
          var _this = _super.call(this) || this;
          _this.value = value;
          return _this;
        }
        PDFString2.prototype.asBytes = function() {
          var bytes = [];
          var octal = "";
          var escaped = false;
          var pushByte = function(byte2) {
            if (byte2 !== void 0)
              bytes.push(byte2);
            escaped = false;
          };
          for (var idx = 0, len = this.value.length; idx < len; idx++) {
            var char = this.value[idx];
            var byte = utils_1.toCharCode(char);
            var nextChar = this.value[idx + 1];
            if (!escaped) {
              if (byte === CharCodes_1.default.BackSlash)
                escaped = true;
              else
                pushByte(byte);
            } else {
              if (byte === CharCodes_1.default.Newline)
                pushByte();
              else if (byte === CharCodes_1.default.CarriageReturn)
                pushByte();
              else if (byte === CharCodes_1.default.n)
                pushByte(CharCodes_1.default.Newline);
              else if (byte === CharCodes_1.default.r)
                pushByte(CharCodes_1.default.CarriageReturn);
              else if (byte === CharCodes_1.default.t)
                pushByte(CharCodes_1.default.Tab);
              else if (byte === CharCodes_1.default.b)
                pushByte(CharCodes_1.default.Backspace);
              else if (byte === CharCodes_1.default.f)
                pushByte(CharCodes_1.default.FormFeed);
              else if (byte === CharCodes_1.default.LeftParen)
                pushByte(CharCodes_1.default.LeftParen);
              else if (byte === CharCodes_1.default.RightParen)
                pushByte(CharCodes_1.default.RightParen);
              else if (byte === CharCodes_1.default.Backspace)
                pushByte(CharCodes_1.default.BackSlash);
              else if (byte >= CharCodes_1.default.Zero && byte <= CharCodes_1.default.Seven) {
                octal += char;
                if (octal.length === 3 || !(nextChar >= "0" && nextChar <= "7")) {
                  pushByte(parseInt(octal, 8));
                  octal = "";
                }
              } else {
                pushByte(byte);
              }
            }
          }
          return new Uint8Array(bytes);
        };
        PDFString2.prototype.decodeText = function() {
          var bytes = this.asBytes();
          if (utils_1.hasUtf16BOM(bytes))
            return utils_1.utf16Decode(bytes);
          return utils_1.pdfDocEncodingDecode(bytes);
        };
        PDFString2.prototype.decodeDate = function() {
          var text = this.decodeText();
          var date = utils_1.parseDate(text);
          if (!date)
            throw new errors_1.InvalidPDFDateStringError(text);
          return date;
        };
        PDFString2.prototype.asString = function() {
          return this.value;
        };
        PDFString2.prototype.clone = function() {
          return PDFString2.of(this.value);
        };
        PDFString2.prototype.toString = function() {
          return "(" + this.value + ")";
        };
        PDFString2.prototype.sizeInBytes = function() {
          return this.value.length + 2;
        };
        PDFString2.prototype.copyBytesInto = function(buffer, offset) {
          buffer[offset++] = CharCodes_1.default.LeftParen;
          offset += utils_1.copyStringIntoBuffer(this.value, buffer, offset);
          buffer[offset++] = CharCodes_1.default.RightParen;
          return this.value.length + 2;
        };
        PDFString2.of = function(value) {
          return new PDFString2(value);
        };
        PDFString2.fromDate = function(date) {
          var year = utils_1.padStart(String(date.getUTCFullYear()), 4, "0");
          var month = utils_1.padStart(String(date.getUTCMonth() + 1), 2, "0");
          var day = utils_1.padStart(String(date.getUTCDate()), 2, "0");
          var hours = utils_1.padStart(String(date.getUTCHours()), 2, "0");
          var mins = utils_1.padStart(String(date.getUTCMinutes()), 2, "0");
          var secs = utils_1.padStart(String(date.getUTCSeconds()), 2, "0");
          return new PDFString2("D:" + year + month + day + hours + mins + secs + "Z");
        };
        return PDFString2;
      })(PDFObject_1.default)
    );
    exports.default = PDFString;
  }
});

// node_modules/pdf-lib/cjs/core/embedders/CustomFontEmbedder.js
var require_CustomFontEmbedder = __commonJS({
  "node_modules/pdf-lib/cjs/core/embedders/CustomFontEmbedder.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var CMap_1 = require_CMap();
    var FontFlags_1 = require_FontFlags();
    var PDFHexString_1 = tslib_1.__importDefault(require_PDFHexString());
    var PDFString_1 = tslib_1.__importDefault(require_PDFString());
    var utils_1 = require_utils2();
    var CustomFontEmbedder = (
      /** @class */
      (function() {
        function CustomFontEmbedder2(font, fontData, customName, fontFeatures) {
          var _this = this;
          this.allGlyphsInFontSortedById = function() {
            var glyphs = new Array(_this.font.characterSet.length);
            for (var idx = 0, len = glyphs.length; idx < len; idx++) {
              var codePoint = _this.font.characterSet[idx];
              glyphs[idx] = _this.font.glyphForCodePoint(codePoint);
            }
            return utils_1.sortedUniq(glyphs.sort(utils_1.byAscendingId), function(g) {
              return g.id;
            });
          };
          this.font = font;
          this.scale = 1e3 / this.font.unitsPerEm;
          this.fontData = fontData;
          this.fontName = this.font.postscriptName || "Font";
          this.customName = customName;
          this.fontFeatures = fontFeatures;
          this.baseFontName = "";
          this.glyphCache = utils_1.Cache.populatedBy(this.allGlyphsInFontSortedById);
        }
        CustomFontEmbedder2.for = function(fontkit, fontData, customName, fontFeatures) {
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            var font;
            return tslib_1.__generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  return [4, fontkit.create(fontData)];
                case 1:
                  font = _a.sent();
                  return [2, new CustomFontEmbedder2(font, fontData, customName, fontFeatures)];
              }
            });
          });
        };
        CustomFontEmbedder2.prototype.encodeText = function(text) {
          var glyphs = this.font.layout(text, this.fontFeatures).glyphs;
          var hexCodes = new Array(glyphs.length);
          for (var idx = 0, len = glyphs.length; idx < len; idx++) {
            hexCodes[idx] = utils_1.toHexStringOfMinLength(glyphs[idx].id, 4);
          }
          return PDFHexString_1.default.of(hexCodes.join(""));
        };
        CustomFontEmbedder2.prototype.widthOfTextAtSize = function(text, size) {
          var glyphs = this.font.layout(text, this.fontFeatures).glyphs;
          var totalWidth = 0;
          for (var idx = 0, len = glyphs.length; idx < len; idx++) {
            totalWidth += glyphs[idx].advanceWidth * this.scale;
          }
          var scale = size / 1e3;
          return totalWidth * scale;
        };
        CustomFontEmbedder2.prototype.heightOfFontAtSize = function(size, options) {
          if (options === void 0) {
            options = {};
          }
          var _a = options.descender, descender = _a === void 0 ? true : _a;
          var _b = this.font, ascent = _b.ascent, descent = _b.descent, bbox = _b.bbox;
          var yTop = (ascent || bbox.maxY) * this.scale;
          var yBottom = (descent || bbox.minY) * this.scale;
          var height = yTop - yBottom;
          if (!descender)
            height -= Math.abs(descent) || 0;
          return height / 1e3 * size;
        };
        CustomFontEmbedder2.prototype.sizeOfFontAtHeight = function(height) {
          var _a = this.font, ascent = _a.ascent, descent = _a.descent, bbox = _a.bbox;
          var yTop = (ascent || bbox.maxY) * this.scale;
          var yBottom = (descent || bbox.minY) * this.scale;
          return 1e3 * height / (yTop - yBottom);
        };
        CustomFontEmbedder2.prototype.embedIntoContext = function(context, ref) {
          this.baseFontName = this.customName || context.addRandomSuffix(this.fontName);
          return this.embedFontDict(context, ref);
        };
        CustomFontEmbedder2.prototype.embedFontDict = function(context, ref) {
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            var cidFontDictRef, unicodeCMapRef, fontDict;
            return tslib_1.__generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  return [4, this.embedCIDFontDict(context)];
                case 1:
                  cidFontDictRef = _a.sent();
                  unicodeCMapRef = this.embedUnicodeCmap(context);
                  fontDict = context.obj({
                    Type: "Font",
                    Subtype: "Type0",
                    BaseFont: this.baseFontName,
                    Encoding: "Identity-H",
                    DescendantFonts: [cidFontDictRef],
                    ToUnicode: unicodeCMapRef
                  });
                  if (ref) {
                    context.assign(ref, fontDict);
                    return [2, ref];
                  } else {
                    return [2, context.register(fontDict)];
                  }
                  return [
                    2
                    /*return*/
                  ];
              }
            });
          });
        };
        CustomFontEmbedder2.prototype.isCFF = function() {
          return this.font.cff;
        };
        CustomFontEmbedder2.prototype.embedCIDFontDict = function(context) {
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            var fontDescriptorRef, cidFontDict;
            return tslib_1.__generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  return [4, this.embedFontDescriptor(context)];
                case 1:
                  fontDescriptorRef = _a.sent();
                  cidFontDict = context.obj({
                    Type: "Font",
                    Subtype: this.isCFF() ? "CIDFontType0" : "CIDFontType2",
                    CIDToGIDMap: "Identity",
                    BaseFont: this.baseFontName,
                    CIDSystemInfo: {
                      Registry: PDFString_1.default.of("Adobe"),
                      Ordering: PDFString_1.default.of("Identity"),
                      Supplement: 0
                    },
                    FontDescriptor: fontDescriptorRef,
                    W: this.computeWidths()
                  });
                  return [2, context.register(cidFontDict)];
              }
            });
          });
        };
        CustomFontEmbedder2.prototype.embedFontDescriptor = function(context) {
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            var fontStreamRef, scale, _a, italicAngle, ascent, descent, capHeight, xHeight, _b, minX, minY, maxX, maxY, fontDescriptor;
            var _c;
            return tslib_1.__generator(this, function(_d) {
              switch (_d.label) {
                case 0:
                  return [4, this.embedFontStream(context)];
                case 1:
                  fontStreamRef = _d.sent();
                  scale = this.scale;
                  _a = this.font, italicAngle = _a.italicAngle, ascent = _a.ascent, descent = _a.descent, capHeight = _a.capHeight, xHeight = _a.xHeight;
                  _b = this.font.bbox, minX = _b.minX, minY = _b.minY, maxX = _b.maxX, maxY = _b.maxY;
                  fontDescriptor = context.obj((_c = {
                    Type: "FontDescriptor",
                    FontName: this.baseFontName,
                    Flags: FontFlags_1.deriveFontFlags(this.font),
                    FontBBox: [minX * scale, minY * scale, maxX * scale, maxY * scale],
                    ItalicAngle: italicAngle,
                    Ascent: ascent * scale,
                    Descent: descent * scale,
                    CapHeight: (capHeight || ascent) * scale,
                    XHeight: (xHeight || 0) * scale,
                    // Not sure how to compute/find this, nor is anybody else really:
                    // https://stackoverflow.com/questions/35485179/stemv-value-of-the-truetype-font
                    StemV: 0
                  }, _c[this.isCFF() ? "FontFile3" : "FontFile2"] = fontStreamRef, _c));
                  return [2, context.register(fontDescriptor)];
              }
            });
          });
        };
        CustomFontEmbedder2.prototype.serializeFont = function() {
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            return tslib_1.__generator(this, function(_a) {
              return [2, this.fontData];
            });
          });
        };
        CustomFontEmbedder2.prototype.embedFontStream = function(context) {
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            var fontStream, _a, _b;
            return tslib_1.__generator(this, function(_c) {
              switch (_c.label) {
                case 0:
                  _b = (_a = context).flateStream;
                  return [4, this.serializeFont()];
                case 1:
                  fontStream = _b.apply(_a, [_c.sent(), {
                    Subtype: this.isCFF() ? "CIDFontType0C" : void 0
                  }]);
                  return [2, context.register(fontStream)];
              }
            });
          });
        };
        CustomFontEmbedder2.prototype.embedUnicodeCmap = function(context) {
          var cmap = CMap_1.createCmap(this.glyphCache.access(), this.glyphId.bind(this));
          var cmapStream = context.flateStream(cmap);
          return context.register(cmapStream);
        };
        CustomFontEmbedder2.prototype.glyphId = function(glyph) {
          return glyph ? glyph.id : -1;
        };
        CustomFontEmbedder2.prototype.computeWidths = function() {
          var glyphs = this.glyphCache.access();
          var widths = [];
          var currSection = [];
          for (var idx = 0, len = glyphs.length; idx < len; idx++) {
            var currGlyph = glyphs[idx];
            var prevGlyph = glyphs[idx - 1];
            var currGlyphId = this.glyphId(currGlyph);
            var prevGlyphId = this.glyphId(prevGlyph);
            if (idx === 0) {
              widths.push(currGlyphId);
            } else if (currGlyphId - prevGlyphId !== 1) {
              widths.push(currSection);
              widths.push(currGlyphId);
              currSection = [];
            }
            currSection.push(currGlyph.advanceWidth * this.scale);
          }
          widths.push(currSection);
          return widths;
        };
        return CustomFontEmbedder2;
      })()
    );
    exports.default = CustomFontEmbedder;
  }
});

// node_modules/pdf-lib/cjs/core/embedders/CustomFontSubsetEmbedder.js
var require_CustomFontSubsetEmbedder = __commonJS({
  "node_modules/pdf-lib/cjs/core/embedders/CustomFontSubsetEmbedder.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var CustomFontEmbedder_1 = tslib_1.__importDefault(require_CustomFontEmbedder());
    var PDFHexString_1 = tslib_1.__importDefault(require_PDFHexString());
    var utils_1 = require_utils2();
    var CustomFontSubsetEmbedder = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(CustomFontSubsetEmbedder2, _super);
        function CustomFontSubsetEmbedder2(font, fontData, customFontName, fontFeatures) {
          var _this = _super.call(this, font, fontData, customFontName, fontFeatures) || this;
          _this.subset = _this.font.createSubset();
          _this.glyphs = [];
          _this.glyphCache = utils_1.Cache.populatedBy(function() {
            return _this.glyphs;
          });
          _this.glyphIdMap = /* @__PURE__ */ new Map();
          return _this;
        }
        CustomFontSubsetEmbedder2.for = function(fontkit, fontData, customFontName, fontFeatures) {
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            var font;
            return tslib_1.__generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  return [4, fontkit.create(fontData)];
                case 1:
                  font = _a.sent();
                  return [2, new CustomFontSubsetEmbedder2(font, fontData, customFontName, fontFeatures)];
              }
            });
          });
        };
        CustomFontSubsetEmbedder2.prototype.encodeText = function(text) {
          var glyphs = this.font.layout(text, this.fontFeatures).glyphs;
          var hexCodes = new Array(glyphs.length);
          for (var idx = 0, len = glyphs.length; idx < len; idx++) {
            var glyph = glyphs[idx];
            var subsetGlyphId = this.subset.includeGlyph(glyph);
            this.glyphs[subsetGlyphId - 1] = glyph;
            this.glyphIdMap.set(glyph.id, subsetGlyphId);
            hexCodes[idx] = utils_1.toHexStringOfMinLength(subsetGlyphId, 4);
          }
          this.glyphCache.invalidate();
          return PDFHexString_1.default.of(hexCodes.join(""));
        };
        CustomFontSubsetEmbedder2.prototype.isCFF = function() {
          return this.subset.cff;
        };
        CustomFontSubsetEmbedder2.prototype.glyphId = function(glyph) {
          return glyph ? this.glyphIdMap.get(glyph.id) : -1;
        };
        CustomFontSubsetEmbedder2.prototype.serializeFont = function() {
          var _this = this;
          return new Promise(function(resolve, reject) {
            var parts = [];
            _this.subset.encodeStream().on("data", function(bytes) {
              return parts.push(bytes);
            }).on("end", function() {
              return resolve(utils_1.mergeUint8Arrays(parts));
            }).on("error", function(err) {
              return reject(err);
            });
          });
        };
        return CustomFontSubsetEmbedder2;
      })(CustomFontEmbedder_1.default)
    );
    exports.default = CustomFontSubsetEmbedder;
  }
});

// node_modules/pdf-lib/cjs/core/embedders/FileEmbedder.js
var require_FileEmbedder = __commonJS({
  "node_modules/pdf-lib/cjs/core/embedders/FileEmbedder.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AFRelationship = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFString_1 = tslib_1.__importDefault(require_PDFString());
    var PDFHexString_1 = tslib_1.__importDefault(require_PDFHexString());
    var AFRelationship;
    (function(AFRelationship2) {
      AFRelationship2["Source"] = "Source";
      AFRelationship2["Data"] = "Data";
      AFRelationship2["Alternative"] = "Alternative";
      AFRelationship2["Supplement"] = "Supplement";
      AFRelationship2["EncryptedPayload"] = "EncryptedPayload";
      AFRelationship2["FormData"] = "EncryptedPayload";
      AFRelationship2["Schema"] = "Schema";
      AFRelationship2["Unspecified"] = "Unspecified";
    })(AFRelationship = exports.AFRelationship || (exports.AFRelationship = {}));
    var FileEmbedder = (
      /** @class */
      (function() {
        function FileEmbedder2(fileData, fileName, options) {
          if (options === void 0) {
            options = {};
          }
          this.fileData = fileData;
          this.fileName = fileName;
          this.options = options;
        }
        FileEmbedder2.for = function(bytes, fileName, options) {
          if (options === void 0) {
            options = {};
          }
          return new FileEmbedder2(bytes, fileName, options);
        };
        FileEmbedder2.prototype.embedIntoContext = function(context, ref) {
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            var _a, mimeType, description, creationDate, modificationDate, afRelationship, embeddedFileStream, embeddedFileStreamRef, fileSpecDict;
            return tslib_1.__generator(this, function(_b) {
              _a = this.options, mimeType = _a.mimeType, description = _a.description, creationDate = _a.creationDate, modificationDate = _a.modificationDate, afRelationship = _a.afRelationship;
              embeddedFileStream = context.flateStream(this.fileData, {
                Type: "EmbeddedFile",
                Subtype: mimeType !== null && mimeType !== void 0 ? mimeType : void 0,
                Params: {
                  Size: this.fileData.length,
                  CreationDate: creationDate ? PDFString_1.default.fromDate(creationDate) : void 0,
                  ModDate: modificationDate ? PDFString_1.default.fromDate(modificationDate) : void 0
                }
              });
              embeddedFileStreamRef = context.register(embeddedFileStream);
              fileSpecDict = context.obj({
                Type: "Filespec",
                F: PDFString_1.default.of(this.fileName),
                UF: PDFHexString_1.default.fromText(this.fileName),
                EF: { F: embeddedFileStreamRef },
                Desc: description ? PDFHexString_1.default.fromText(description) : void 0,
                AFRelationship: afRelationship !== null && afRelationship !== void 0 ? afRelationship : void 0
              });
              if (ref) {
                context.assign(ref, fileSpecDict);
                return [2, ref];
              } else {
                return [2, context.register(fileSpecDict)];
              }
              return [
                2
                /*return*/
              ];
            });
          });
        };
        return FileEmbedder2;
      })()
    );
    exports.default = FileEmbedder;
  }
});

// node_modules/pdf-lib/cjs/core/embedders/JpegEmbedder.js
var require_JpegEmbedder = __commonJS({
  "node_modules/pdf-lib/cjs/core/embedders/JpegEmbedder.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var MARKERS = [
      65472,
      65473,
      65474,
      65475,
      65477,
      65478,
      65479,
      65480,
      65481,
      65482,
      65483,
      65484,
      65485,
      65486,
      65487
    ];
    var ColorSpace;
    (function(ColorSpace2) {
      ColorSpace2["DeviceGray"] = "DeviceGray";
      ColorSpace2["DeviceRGB"] = "DeviceRGB";
      ColorSpace2["DeviceCMYK"] = "DeviceCMYK";
    })(ColorSpace || (ColorSpace = {}));
    var ChannelToColorSpace = {
      1: ColorSpace.DeviceGray,
      3: ColorSpace.DeviceRGB,
      4: ColorSpace.DeviceCMYK
    };
    var JpegEmbedder = (
      /** @class */
      (function() {
        function JpegEmbedder2(imageData, bitsPerComponent, width, height, colorSpace) {
          this.imageData = imageData;
          this.bitsPerComponent = bitsPerComponent;
          this.width = width;
          this.height = height;
          this.colorSpace = colorSpace;
        }
        JpegEmbedder2.for = function(imageData) {
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            var dataView, soi, pos, marker, bitsPerComponent, height, width, channelByte, channelName, colorSpace;
            return tslib_1.__generator(this, function(_a) {
              dataView = new DataView(imageData.buffer);
              soi = dataView.getUint16(0);
              if (soi !== 65496)
                throw new Error("SOI not found in JPEG");
              pos = 2;
              while (pos < dataView.byteLength) {
                marker = dataView.getUint16(pos);
                pos += 2;
                if (MARKERS.includes(marker))
                  break;
                pos += dataView.getUint16(pos);
              }
              if (!MARKERS.includes(marker))
                throw new Error("Invalid JPEG");
              pos += 2;
              bitsPerComponent = dataView.getUint8(pos++);
              height = dataView.getUint16(pos);
              pos += 2;
              width = dataView.getUint16(pos);
              pos += 2;
              channelByte = dataView.getUint8(pos++);
              channelName = ChannelToColorSpace[channelByte];
              if (!channelName)
                throw new Error("Unknown JPEG channel.");
              colorSpace = channelName;
              return [2, new JpegEmbedder2(imageData, bitsPerComponent, width, height, colorSpace)];
            });
          });
        };
        JpegEmbedder2.prototype.embedIntoContext = function(context, ref) {
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            var xObject;
            return tslib_1.__generator(this, function(_a) {
              xObject = context.stream(this.imageData, {
                Type: "XObject",
                Subtype: "Image",
                BitsPerComponent: this.bitsPerComponent,
                Width: this.width,
                Height: this.height,
                ColorSpace: this.colorSpace,
                Filter: "DCTDecode",
                // CMYK JPEG streams in PDF are typically stored complemented,
                // with 1 as 'off' and 0 as 'on' (PDF 32000-1:2008, 8.6.4.4).
                //
                // Standalone CMYK JPEG (usually exported by Photoshop) are
                // stored inverse, with 0 as 'off' and 1 as 'on', like RGB.
                //
                // Applying a swap here as a hedge that most bytes passing
                // through this method will benefit from it.
                Decode: this.colorSpace === ColorSpace.DeviceCMYK ? [1, 0, 1, 0, 1, 0, 1, 0] : void 0
              });
              if (ref) {
                context.assign(ref, xObject);
                return [2, ref];
              } else {
                return [2, context.register(xObject)];
              }
              return [
                2
                /*return*/
              ];
            });
          });
        };
        return JpegEmbedder2;
      })()
    );
    exports.default = JpegEmbedder;
  }
});

// node_modules/@pdf-lib/upng/cjs/UPNG.js
var require_UPNG = __commonJS({
  "node_modules/@pdf-lib/upng/cjs/UPNG.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _pako = _interopRequireDefault((init_pako_stub(), __toCommonJS(pako_stub_exports)));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var UPNG = {};
    UPNG.toRGBA8 = function(out) {
      var w = out.width, h = out.height;
      if (out.tabs.acTL == null) return [UPNG.toRGBA8.decodeImage(out.data, w, h, out).buffer];
      var frms = [];
      if (out.frames[0].data == null) out.frames[0].data = out.data;
      var len = w * h * 4, img = new Uint8Array(len), empty = new Uint8Array(len), prev = new Uint8Array(len);
      for (var i = 0; i < out.frames.length; i++) {
        var frm = out.frames[i];
        var fx = frm.rect.x, fy = frm.rect.y, fw = frm.rect.width, fh = frm.rect.height;
        var fdata = UPNG.toRGBA8.decodeImage(frm.data, fw, fh, out);
        if (i != 0) for (var j = 0; j < len; j++) prev[j] = img[j];
        if (frm.blend == 0) UPNG._copyTile(fdata, fw, fh, img, w, h, fx, fy, 0);
        else if (frm.blend == 1) UPNG._copyTile(fdata, fw, fh, img, w, h, fx, fy, 1);
        frms.push(img.buffer.slice(0));
        if (frm.dispose == 0) {
        } else if (frm.dispose == 1) UPNG._copyTile(empty, fw, fh, img, w, h, fx, fy, 0);
        else if (frm.dispose == 2) for (var j = 0; j < len; j++) img[j] = prev[j];
      }
      return frms;
    };
    UPNG.toRGBA8.decodeImage = function(data, w, h, out) {
      var area = w * h, bpp = UPNG.decode._getBPP(out);
      var bpl = Math.ceil(w * bpp / 8);
      var bf = new Uint8Array(area * 4), bf32 = new Uint32Array(bf.buffer);
      var ctype = out.ctype, depth = out.depth;
      var rs = UPNG._bin.readUshort;
      var time = Date.now();
      if (ctype == 6) {
        var qarea = area << 2;
        if (depth == 8) for (var i = 0; i < qarea; i += 4) {
          bf[i] = data[i];
          bf[i + 1] = data[i + 1];
          bf[i + 2] = data[i + 2];
          bf[i + 3] = data[i + 3];
        }
        if (depth == 16) for (var i = 0; i < qarea; i++) {
          bf[i] = data[i << 1];
        }
      } else if (ctype == 2) {
        var ts = out.tabs["tRNS"];
        if (ts == null) {
          if (depth == 8) for (var i = 0; i < area; i++) {
            var ti = i * 3;
            bf32[i] = 255 << 24 | data[ti + 2] << 16 | data[ti + 1] << 8 | data[ti];
          }
          if (depth == 16) for (var i = 0; i < area; i++) {
            var ti = i * 6;
            bf32[i] = 255 << 24 | data[ti + 4] << 16 | data[ti + 2] << 8 | data[ti];
          }
        } else {
          var tr = ts[0], tg = ts[1], tb = ts[2];
          if (depth == 8) for (var i = 0; i < area; i++) {
            var qi = i << 2, ti = i * 3;
            bf32[i] = 255 << 24 | data[ti + 2] << 16 | data[ti + 1] << 8 | data[ti];
            if (data[ti] == tr && data[ti + 1] == tg && data[ti + 2] == tb) bf[qi + 3] = 0;
          }
          if (depth == 16) for (var i = 0; i < area; i++) {
            var qi = i << 2, ti = i * 6;
            bf32[i] = 255 << 24 | data[ti + 4] << 16 | data[ti + 2] << 8 | data[ti];
            if (rs(data, ti) == tr && rs(data, ti + 2) == tg && rs(data, ti + 4) == tb) bf[qi + 3] = 0;
          }
        }
      } else if (ctype == 3) {
        var p = out.tabs["PLTE"], ap = out.tabs["tRNS"], tl = ap ? ap.length : 0;
        if (depth == 1) for (var y = 0; y < h; y++) {
          var s0 = y * bpl, t0 = y * w;
          for (var i = 0; i < w; i++) {
            var qi = t0 + i << 2, j = data[s0 + (i >> 3)] >> 7 - ((i & 7) << 0) & 1, cj = 3 * j;
            bf[qi] = p[cj];
            bf[qi + 1] = p[cj + 1];
            bf[qi + 2] = p[cj + 2];
            bf[qi + 3] = j < tl ? ap[j] : 255;
          }
        }
        if (depth == 2) for (var y = 0; y < h; y++) {
          var s0 = y * bpl, t0 = y * w;
          for (var i = 0; i < w; i++) {
            var qi = t0 + i << 2, j = data[s0 + (i >> 2)] >> 6 - ((i & 3) << 1) & 3, cj = 3 * j;
            bf[qi] = p[cj];
            bf[qi + 1] = p[cj + 1];
            bf[qi + 2] = p[cj + 2];
            bf[qi + 3] = j < tl ? ap[j] : 255;
          }
        }
        if (depth == 4) for (var y = 0; y < h; y++) {
          var s0 = y * bpl, t0 = y * w;
          for (var i = 0; i < w; i++) {
            var qi = t0 + i << 2, j = data[s0 + (i >> 1)] >> 4 - ((i & 1) << 2) & 15, cj = 3 * j;
            bf[qi] = p[cj];
            bf[qi + 1] = p[cj + 1];
            bf[qi + 2] = p[cj + 2];
            bf[qi + 3] = j < tl ? ap[j] : 255;
          }
        }
        if (depth == 8) for (var i = 0; i < area; i++) {
          var qi = i << 2, j = data[i], cj = 3 * j;
          bf[qi] = p[cj];
          bf[qi + 1] = p[cj + 1];
          bf[qi + 2] = p[cj + 2];
          bf[qi + 3] = j < tl ? ap[j] : 255;
        }
      } else if (ctype == 4) {
        if (depth == 8) for (var i = 0; i < area; i++) {
          var qi = i << 2, di = i << 1, gr = data[di];
          bf[qi] = gr;
          bf[qi + 1] = gr;
          bf[qi + 2] = gr;
          bf[qi + 3] = data[di + 1];
        }
        if (depth == 16) for (var i = 0; i < area; i++) {
          var qi = i << 2, di = i << 2, gr = data[di];
          bf[qi] = gr;
          bf[qi + 1] = gr;
          bf[qi + 2] = gr;
          bf[qi + 3] = data[di + 2];
        }
      } else if (ctype == 0) {
        var tr = out.tabs["tRNS"] ? out.tabs["tRNS"] : -1;
        for (var y = 0; y < h; y++) {
          var off = y * bpl, to = y * w;
          if (depth == 1) for (var x = 0; x < w; x++) {
            var gr = 255 * (data[off + (x >>> 3)] >>> 7 - (x & 7) & 1), al = gr == tr * 255 ? 0 : 255;
            bf32[to + x] = al << 24 | gr << 16 | gr << 8 | gr;
          }
          else if (depth == 2) for (var x = 0; x < w; x++) {
            var gr = 85 * (data[off + (x >>> 2)] >>> 6 - ((x & 3) << 1) & 3), al = gr == tr * 85 ? 0 : 255;
            bf32[to + x] = al << 24 | gr << 16 | gr << 8 | gr;
          }
          else if (depth == 4) for (var x = 0; x < w; x++) {
            var gr = 17 * (data[off + (x >>> 1)] >>> 4 - ((x & 1) << 2) & 15), al = gr == tr * 17 ? 0 : 255;
            bf32[to + x] = al << 24 | gr << 16 | gr << 8 | gr;
          }
          else if (depth == 8) for (var x = 0; x < w; x++) {
            var gr = data[off + x], al = gr == tr ? 0 : 255;
            bf32[to + x] = al << 24 | gr << 16 | gr << 8 | gr;
          }
          else if (depth == 16) for (var x = 0; x < w; x++) {
            var gr = data[off + (x << 1)], al = rs(data, off + (x << i)) == tr ? 0 : 255;
            bf32[to + x] = al << 24 | gr << 16 | gr << 8 | gr;
          }
        }
      }
      return bf;
    };
    UPNG.decode = function(buff) {
      var data = new Uint8Array(buff), offset = 8, bin = UPNG._bin, rUs = bin.readUshort, rUi = bin.readUint;
      var out = {
        tabs: {},
        frames: []
      };
      var dd = new Uint8Array(data.length), doff = 0;
      var fd, foff = 0;
      var mgck = [137, 80, 78, 71, 13, 10, 26, 10];
      for (var i = 0; i < 8; i++) if (data[i] != mgck[i]) throw "The input is not a PNG file!";
      while (offset < data.length) {
        var len = bin.readUint(data, offset);
        offset += 4;
        var type = bin.readASCII(data, offset, 4);
        offset += 4;
        if (type == "IHDR") {
          UPNG.decode._IHDR(data, offset, out);
        } else if (type == "IDAT") {
          for (var i = 0; i < len; i++) dd[doff + i] = data[offset + i];
          doff += len;
        } else if (type == "acTL") {
          out.tabs[type] = {
            num_frames: rUi(data, offset),
            num_plays: rUi(data, offset + 4)
          };
          fd = new Uint8Array(data.length);
        } else if (type == "fcTL") {
          if (foff != 0) {
            var fr = out.frames[out.frames.length - 1];
            fr.data = UPNG.decode._decompress(out, fd.slice(0, foff), fr.rect.width, fr.rect.height);
            foff = 0;
          }
          var rct = {
            x: rUi(data, offset + 12),
            y: rUi(data, offset + 16),
            width: rUi(data, offset + 4),
            height: rUi(data, offset + 8)
          };
          var del = rUs(data, offset + 22);
          del = rUs(data, offset + 20) / (del == 0 ? 100 : del);
          var frm = {
            rect: rct,
            delay: Math.round(del * 1e3),
            dispose: data[offset + 24],
            blend: data[offset + 25]
          };
          out.frames.push(frm);
        } else if (type == "fdAT") {
          for (var i = 0; i < len - 4; i++) fd[foff + i] = data[offset + i + 4];
          foff += len - 4;
        } else if (type == "pHYs") {
          out.tabs[type] = [bin.readUint(data, offset), bin.readUint(data, offset + 4), data[offset + 8]];
        } else if (type == "cHRM") {
          out.tabs[type] = [];
          for (var i = 0; i < 8; i++) out.tabs[type].push(bin.readUint(data, offset + i * 4));
        } else if (type == "tEXt") {
          if (out.tabs[type] == null) out.tabs[type] = {};
          var nz = bin.nextZero(data, offset);
          var keyw = bin.readASCII(data, offset, nz - offset);
          var text = bin.readASCII(data, nz + 1, offset + len - nz - 1);
          out.tabs[type][keyw] = text;
        } else if (type == "iTXt") {
          if (out.tabs[type] == null) out.tabs[type] = {};
          var nz = 0, off = offset;
          nz = bin.nextZero(data, off);
          var keyw = bin.readASCII(data, off, nz - off);
          off = nz + 1;
          var cflag = data[off], cmeth = data[off + 1];
          off += 2;
          nz = bin.nextZero(data, off);
          var ltag = bin.readASCII(data, off, nz - off);
          off = nz + 1;
          nz = bin.nextZero(data, off);
          var tkeyw = bin.readUTF8(data, off, nz - off);
          off = nz + 1;
          var text = bin.readUTF8(data, off, len - (off - offset));
          out.tabs[type][keyw] = text;
        } else if (type == "PLTE") {
          out.tabs[type] = bin.readBytes(data, offset, len);
        } else if (type == "hIST") {
          var pl = out.tabs["PLTE"].length / 3;
          out.tabs[type] = [];
          for (var i = 0; i < pl; i++) out.tabs[type].push(rUs(data, offset + i * 2));
        } else if (type == "tRNS") {
          if (out.ctype == 3) out.tabs[type] = bin.readBytes(data, offset, len);
          else if (out.ctype == 0) out.tabs[type] = rUs(data, offset);
          else if (out.ctype == 2) out.tabs[type] = [rUs(data, offset), rUs(data, offset + 2), rUs(data, offset + 4)];
        } else if (type == "gAMA") out.tabs[type] = bin.readUint(data, offset) / 1e5;
        else if (type == "sRGB") out.tabs[type] = data[offset];
        else if (type == "bKGD") {
          if (out.ctype == 0 || out.ctype == 4) out.tabs[type] = [rUs(data, offset)];
          else if (out.ctype == 2 || out.ctype == 6) out.tabs[type] = [rUs(data, offset), rUs(data, offset + 2), rUs(data, offset + 4)];
          else if (out.ctype == 3) out.tabs[type] = data[offset];
        } else if (type == "IEND") {
          break;
        }
        offset += len;
        var crc = bin.readUint(data, offset);
        offset += 4;
      }
      if (foff != 0) {
        var fr = out.frames[out.frames.length - 1];
        fr.data = UPNG.decode._decompress(out, fd.slice(0, foff), fr.rect.width, fr.rect.height);
        foff = 0;
      }
      out.data = UPNG.decode._decompress(out, dd, out.width, out.height);
      delete out.compress;
      delete out.interlace;
      delete out.filter;
      return out;
    };
    UPNG.decode._decompress = function(out, dd, w, h) {
      var time = Date.now();
      var bpp = UPNG.decode._getBPP(out), bpl = Math.ceil(w * bpp / 8), buff = new Uint8Array((bpl + 1 + out.interlace) * h);
      dd = UPNG.decode._inflate(dd, buff);
      var time = Date.now();
      if (out.interlace == 0) dd = UPNG.decode._filterZero(dd, out, 0, w, h);
      else if (out.interlace == 1) dd = UPNG.decode._readInterlace(dd, out);
      return dd;
    };
    UPNG.decode._inflate = function(data, buff) {
      var out = UPNG["inflateRaw"](new Uint8Array(data.buffer, 2, data.length - 6), buff);
      return out;
    };
    UPNG.inflateRaw = (function() {
      var H = {};
      H.H = {};
      H.H.N = function(N, W) {
        var R = Uint8Array, i = 0, m = 0, J = 0, h = 0, Q = 0, X = 0, u = 0, w = 0, d = 0, v, C;
        if (N[0] == 3 && N[1] == 0) return W ? W : new R(0);
        var V = H.H, n = V.b, A = V.e, l = V.R, M = V.n, I = V.A, e = V.Z, b = V.m, Z = W == null;
        if (Z) W = new R(N.length >>> 2 << 3);
        while (i == 0) {
          i = n(N, d, 1);
          m = n(N, d + 1, 2);
          d += 3;
          if (m == 0) {
            if ((d & 7) != 0) d += 8 - (d & 7);
            var D = (d >>> 3) + 4, q = N[D - 4] | N[D - 3] << 8;
            if (Z) W = H.H.W(W, w + q);
            W.set(new R(N.buffer, N.byteOffset + D, q), w);
            d = D + q << 3;
            w += q;
            continue;
          }
          if (Z) W = H.H.W(W, w + (1 << 17));
          if (m == 1) {
            v = b.J;
            C = b.h;
            X = (1 << 9) - 1;
            u = (1 << 5) - 1;
          }
          if (m == 2) {
            J = A(N, d, 5) + 257;
            h = A(N, d + 5, 5) + 1;
            Q = A(N, d + 10, 4) + 4;
            d += 14;
            var E = d, j = 1;
            for (var c = 0; c < 38; c += 2) {
              b.Q[c] = 0;
              b.Q[c + 1] = 0;
            }
            for (var c = 0; c < Q; c++) {
              var K = A(N, d + c * 3, 3);
              b.Q[(b.X[c] << 1) + 1] = K;
              if (K > j) j = K;
            }
            d += 3 * Q;
            M(b.Q, j);
            I(b.Q, j, b.u);
            v = b.w;
            C = b.d;
            d = l(b.u, (1 << j) - 1, J + h, N, d, b.v);
            var r = V.V(b.v, 0, J, b.C);
            X = (1 << r) - 1;
            var S = V.V(b.v, J, h, b.D);
            u = (1 << S) - 1;
            M(b.C, r);
            I(b.C, r, v);
            M(b.D, S);
            I(b.D, S, C);
          }
          while (true) {
            var T = v[e(N, d) & X];
            d += T & 15;
            var p = T >>> 4;
            if (p >>> 8 == 0) {
              W[w++] = p;
            } else if (p == 256) {
              break;
            } else {
              var z = w + p - 254;
              if (p > 264) {
                var _ = b.q[p - 257];
                z = w + (_ >>> 3) + A(N, d, _ & 7);
                d += _ & 7;
              }
              var $ = C[e(N, d) & u];
              d += $ & 15;
              var s = $ >>> 4, Y = b.c[s], a = (Y >>> 4) + n(N, d, Y & 15);
              d += Y & 15;
              while (w < z) {
                W[w] = W[w++ - a];
                W[w] = W[w++ - a];
                W[w] = W[w++ - a];
                W[w] = W[w++ - a];
              }
              w = z;
            }
          }
        }
        return W.length == w ? W : W.slice(0, w);
      };
      H.H.W = function(N, W) {
        var R = N.length;
        if (W <= R) return N;
        var V = new Uint8Array(R << 1);
        V.set(N, 0);
        return V;
      };
      H.H.R = function(N, W, R, V, n, A) {
        var l = H.H.e, M = H.H.Z, I = 0;
        while (I < R) {
          var e = N[M(V, n) & W];
          n += e & 15;
          var b = e >>> 4;
          if (b <= 15) {
            A[I] = b;
            I++;
          } else {
            var Z = 0, m = 0;
            if (b == 16) {
              m = 3 + l(V, n, 2);
              n += 2;
              Z = A[I - 1];
            } else if (b == 17) {
              m = 3 + l(V, n, 3);
              n += 3;
            } else if (b == 18) {
              m = 11 + l(V, n, 7);
              n += 7;
            }
            var J = I + m;
            while (I < J) {
              A[I] = Z;
              I++;
            }
          }
        }
        return n;
      };
      H.H.V = function(N, W, R, V) {
        var n = 0, A = 0, l = V.length >>> 1;
        while (A < R) {
          var M = N[A + W];
          V[A << 1] = 0;
          V[(A << 1) + 1] = M;
          if (M > n) n = M;
          A++;
        }
        while (A < l) {
          V[A << 1] = 0;
          V[(A << 1) + 1] = 0;
          A++;
        }
        return n;
      };
      H.H.n = function(N, W) {
        var R = H.H.m, V = N.length, n, A, l, M, I, e = R.j;
        for (var M = 0; M <= W; M++) e[M] = 0;
        for (M = 1; M < V; M += 2) e[N[M]]++;
        var b = R.K;
        n = 0;
        e[0] = 0;
        for (A = 1; A <= W; A++) {
          n = n + e[A - 1] << 1;
          b[A] = n;
        }
        for (l = 0; l < V; l += 2) {
          I = N[l + 1];
          if (I != 0) {
            N[l] = b[I];
            b[I]++;
          }
        }
      };
      H.H.A = function(N, W, R) {
        var V = N.length, n = H.H.m, A = n.r;
        for (var l = 0; l < V; l += 2) if (N[l + 1] != 0) {
          var M = l >> 1, I = N[l + 1], e = M << 4 | I, b = W - I, Z = N[l] << b, m = Z + (1 << b);
          while (Z != m) {
            var J = A[Z] >>> 15 - W;
            R[J] = e;
            Z++;
          }
        }
      };
      H.H.l = function(N, W) {
        var R = H.H.m.r, V = 15 - W;
        for (var n = 0; n < N.length; n += 2) {
          var A = N[n] << W - N[n + 1];
          N[n] = R[A] >>> V;
        }
      };
      H.H.M = function(N, W, R) {
        R = R << (W & 7);
        var V = W >>> 3;
        N[V] |= R;
        N[V + 1] |= R >>> 8;
      };
      H.H.I = function(N, W, R) {
        R = R << (W & 7);
        var V = W >>> 3;
        N[V] |= R;
        N[V + 1] |= R >>> 8;
        N[V + 2] |= R >>> 16;
      };
      H.H.e = function(N, W, R) {
        return (N[W >>> 3] | N[(W >>> 3) + 1] << 8) >>> (W & 7) & (1 << R) - 1;
      };
      H.H.b = function(N, W, R) {
        return (N[W >>> 3] | N[(W >>> 3) + 1] << 8 | N[(W >>> 3) + 2] << 16) >>> (W & 7) & (1 << R) - 1;
      };
      H.H.Z = function(N, W) {
        return (N[W >>> 3] | N[(W >>> 3) + 1] << 8 | N[(W >>> 3) + 2] << 16) >>> (W & 7);
      };
      H.H.i = function(N, W) {
        return (N[W >>> 3] | N[(W >>> 3) + 1] << 8 | N[(W >>> 3) + 2] << 16 | N[(W >>> 3) + 3] << 24) >>> (W & 7);
      };
      H.H.m = (function() {
        var N = Uint16Array, W = Uint32Array;
        return {
          K: new N(16),
          j: new N(16),
          X: [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
          S: [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 999, 999, 999],
          T: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0],
          q: new N(32),
          p: [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 65535, 65535],
          z: [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0],
          c: new W(32),
          J: new N(512),
          _: [],
          h: new N(32),
          $: [],
          w: new N(32768),
          C: [],
          v: [],
          d: new N(32768),
          D: [],
          u: new N(512),
          Q: [],
          r: new N(1 << 15),
          s: new W(286),
          Y: new W(30),
          a: new W(19),
          t: new W(15e3),
          k: new N(1 << 16),
          g: new N(1 << 15)
        };
      })();
      (function() {
        var N = H.H.m, W = 1 << 15;
        for (var R = 0; R < W; R++) {
          var V = R;
          V = (V & 2863311530) >>> 1 | (V & 1431655765) << 1;
          V = (V & 3435973836) >>> 2 | (V & 858993459) << 2;
          V = (V & 4042322160) >>> 4 | (V & 252645135) << 4;
          V = (V & 4278255360) >>> 8 | (V & 16711935) << 8;
          N.r[R] = (V >>> 16 | V << 16) >>> 17;
        }
        function n(A, l, M) {
          while (l-- != 0) A.push(0, M);
        }
        for (var R = 0; R < 32; R++) {
          N.q[R] = N.S[R] << 3 | N.T[R];
          N.c[R] = N.p[R] << 4 | N.z[R];
        }
        n(N._, 144, 8);
        n(N._, 255 - 143, 9);
        n(N._, 279 - 255, 7);
        n(N._, 287 - 279, 8);
        H.H.n(N._, 9);
        H.H.A(N._, 9, N.J);
        H.H.l(N._, 9);
        n(N.$, 32, 5);
        H.H.n(N.$, 5);
        H.H.A(N.$, 5, N.h);
        H.H.l(N.$, 5);
        n(N.Q, 19, 0);
        n(N.C, 286, 0);
        n(N.D, 30, 0);
        n(N.v, 320, 0);
      })();
      return H.H.N;
    })();
    UPNG.decode._readInterlace = function(data, out) {
      var w = out.width, h = out.height;
      var bpp = UPNG.decode._getBPP(out), cbpp = bpp >> 3, bpl = Math.ceil(w * bpp / 8);
      var img = new Uint8Array(h * bpl);
      var di = 0;
      var starting_row = [0, 0, 4, 0, 2, 0, 1];
      var starting_col = [0, 4, 0, 2, 0, 1, 0];
      var row_increment = [8, 8, 8, 4, 4, 2, 2];
      var col_increment = [8, 8, 4, 4, 2, 2, 1];
      var pass = 0;
      while (pass < 7) {
        var ri = row_increment[pass], ci = col_increment[pass];
        var sw = 0, sh = 0;
        var cr = starting_row[pass];
        while (cr < h) {
          cr += ri;
          sh++;
        }
        var cc = starting_col[pass];
        while (cc < w) {
          cc += ci;
          sw++;
        }
        var bpll = Math.ceil(sw * bpp / 8);
        UPNG.decode._filterZero(data, out, di, sw, sh);
        var y = 0, row = starting_row[pass];
        while (row < h) {
          var col = starting_col[pass];
          var cdi = di + y * bpll << 3;
          while (col < w) {
            if (bpp == 1) {
              var val = data[cdi >> 3];
              val = val >> 7 - (cdi & 7) & 1;
              img[row * bpl + (col >> 3)] |= val << 7 - ((col & 7) << 0);
            }
            if (bpp == 2) {
              var val = data[cdi >> 3];
              val = val >> 6 - (cdi & 7) & 3;
              img[row * bpl + (col >> 2)] |= val << 6 - ((col & 3) << 1);
            }
            if (bpp == 4) {
              var val = data[cdi >> 3];
              val = val >> 4 - (cdi & 7) & 15;
              img[row * bpl + (col >> 1)] |= val << 4 - ((col & 1) << 2);
            }
            if (bpp >= 8) {
              var ii = row * bpl + col * cbpp;
              for (var j = 0; j < cbpp; j++) img[ii + j] = data[(cdi >> 3) + j];
            }
            cdi += bpp;
            col += ci;
          }
          y++;
          row += ri;
        }
        if (sw * sh != 0) di += sh * (1 + bpll);
        pass = pass + 1;
      }
      return img;
    };
    UPNG.decode._getBPP = function(out) {
      var noc = [1, null, 3, 1, 2, null, 4][out.ctype];
      return noc * out.depth;
    };
    UPNG.decode._filterZero = function(data, out, off, w, h) {
      var bpp = UPNG.decode._getBPP(out), bpl = Math.ceil(w * bpp / 8), paeth = UPNG.decode._paeth;
      bpp = Math.ceil(bpp / 8);
      var i = 0, di = 1, type = data[off], x = 0;
      if (type > 1) data[off] = [0, 0, 1][type - 2];
      if (type == 3) for (x = bpp; x < bpl; x++) data[x + 1] = data[x + 1] + (data[x + 1 - bpp] >>> 1) & 255;
      for (var y = 0; y < h; y++) {
        i = off + y * bpl;
        di = i + y + 1;
        type = data[di - 1];
        x = 0;
        if (type == 0) for (; x < bpl; x++) data[i + x] = data[di + x];
        else if (type == 1) {
          for (; x < bpp; x++) data[i + x] = data[di + x];
          for (; x < bpl; x++) data[i + x] = data[di + x] + data[i + x - bpp];
        } else if (type == 2) {
          for (; x < bpl; x++) data[i + x] = data[di + x] + data[i + x - bpl];
        } else if (type == 3) {
          for (; x < bpp; x++) data[i + x] = data[di + x] + (data[i + x - bpl] >>> 1);
          for (; x < bpl; x++) data[i + x] = data[di + x] + (data[i + x - bpl] + data[i + x - bpp] >>> 1);
        } else {
          for (; x < bpp; x++) data[i + x] = data[di + x] + paeth(0, data[i + x - bpl], 0);
          for (; x < bpl; x++) data[i + x] = data[di + x] + paeth(data[i + x - bpp], data[i + x - bpl], data[i + x - bpp - bpl]);
        }
      }
      return data;
    };
    UPNG.decode._paeth = function(a, b, c) {
      var p = a + b - c, pa = p - a, pb = p - b, pc = p - c;
      if (pa * pa <= pb * pb && pa * pa <= pc * pc) return a;
      else if (pb * pb <= pc * pc) return b;
      return c;
    };
    UPNG.decode._IHDR = function(data, offset, out) {
      var bin = UPNG._bin;
      out.width = bin.readUint(data, offset);
      offset += 4;
      out.height = bin.readUint(data, offset);
      offset += 4;
      out.depth = data[offset];
      offset++;
      out.ctype = data[offset];
      offset++;
      out.compress = data[offset];
      offset++;
      out.filter = data[offset];
      offset++;
      out.interlace = data[offset];
      offset++;
    };
    UPNG._bin = {
      nextZero: function(data, p) {
        while (data[p] != 0) p++;
        return p;
      },
      readUshort: function(buff, p) {
        return buff[p] << 8 | buff[p + 1];
      },
      writeUshort: function(buff, p, n) {
        buff[p] = n >> 8 & 255;
        buff[p + 1] = n & 255;
      },
      readUint: function(buff, p) {
        return buff[p] * (256 * 256 * 256) + (buff[p + 1] << 16 | buff[p + 2] << 8 | buff[p + 3]);
      },
      writeUint: function(buff, p, n) {
        buff[p] = n >> 24 & 255;
        buff[p + 1] = n >> 16 & 255;
        buff[p + 2] = n >> 8 & 255;
        buff[p + 3] = n & 255;
      },
      readASCII: function(buff, p, l) {
        var s = "";
        for (var i = 0; i < l; i++) s += String.fromCharCode(buff[p + i]);
        return s;
      },
      writeASCII: function(data, p, s) {
        for (var i = 0; i < s.length; i++) data[p + i] = s.charCodeAt(i);
      },
      readBytes: function(buff, p, l) {
        var arr = [];
        for (var i = 0; i < l; i++) arr.push(buff[p + i]);
        return arr;
      },
      pad: function(n) {
        return n.length < 2 ? "0" + n : n;
      },
      readUTF8: function(buff, p, l) {
        var s = "", ns;
        for (var i = 0; i < l; i++) s += "%" + UPNG._bin.pad(buff[p + i].toString(16));
        try {
          ns = decodeURIComponent(s);
        } catch (e) {
          return UPNG._bin.readASCII(buff, p, l);
        }
        return ns;
      }
    };
    UPNG._copyTile = function(sb, sw, sh, tb, tw, th, xoff, yoff, mode) {
      var w = Math.min(sw, tw), h = Math.min(sh, th);
      var si = 0, ti = 0;
      for (var y = 0; y < h; y++) for (var x = 0; x < w; x++) {
        if (xoff >= 0 && yoff >= 0) {
          si = y * sw + x << 2;
          ti = (yoff + y) * tw + xoff + x << 2;
        } else {
          si = (-yoff + y) * sw - xoff + x << 2;
          ti = y * tw + x << 2;
        }
        if (mode == 0) {
          tb[ti] = sb[si];
          tb[ti + 1] = sb[si + 1];
          tb[ti + 2] = sb[si + 2];
          tb[ti + 3] = sb[si + 3];
        } else if (mode == 1) {
          var fa = sb[si + 3] * (1 / 255), fr = sb[si] * fa, fg = sb[si + 1] * fa, fb = sb[si + 2] * fa;
          var ba = tb[ti + 3] * (1 / 255), br = tb[ti] * ba, bg = tb[ti + 1] * ba, bb = tb[ti + 2] * ba;
          var ifa = 1 - fa, oa = fa + ba * ifa, ioa = oa == 0 ? 0 : 1 / oa;
          tb[ti + 3] = 255 * oa;
          tb[ti + 0] = (fr + br * ifa) * ioa;
          tb[ti + 1] = (fg + bg * ifa) * ioa;
          tb[ti + 2] = (fb + bb * ifa) * ioa;
        } else if (mode == 2) {
          var fa = sb[si + 3], fr = sb[si], fg = sb[si + 1], fb = sb[si + 2];
          var ba = tb[ti + 3], br = tb[ti], bg = tb[ti + 1], bb = tb[ti + 2];
          if (fa == ba && fr == br && fg == bg && fb == bb) {
            tb[ti] = 0;
            tb[ti + 1] = 0;
            tb[ti + 2] = 0;
            tb[ti + 3] = 0;
          } else {
            tb[ti] = fr;
            tb[ti + 1] = fg;
            tb[ti + 2] = fb;
            tb[ti + 3] = fa;
          }
        } else if (mode == 3) {
          var fa = sb[si + 3], fr = sb[si], fg = sb[si + 1], fb = sb[si + 2];
          var ba = tb[ti + 3], br = tb[ti], bg = tb[ti + 1], bb = tb[ti + 2];
          if (fa == ba && fr == br && fg == bg && fb == bb) continue;
          if (fa < 220 && ba > 20) return false;
        }
      }
      return true;
    };
    UPNG.encode = function(bufs, w, h, ps, dels, tabs, forbidPlte) {
      if (ps == null) ps = 0;
      if (forbidPlte == null) forbidPlte = false;
      var nimg = UPNG.encode.compress(bufs, w, h, ps, [false, false, false, 0, forbidPlte]);
      UPNG.encode.compressPNG(nimg, -1);
      return UPNG.encode._main(nimg, w, h, dels, tabs);
    };
    UPNG.encodeLL = function(bufs, w, h, cc, ac, depth, dels, tabs) {
      var nimg = {
        ctype: 0 + (cc == 1 ? 0 : 2) + (ac == 0 ? 0 : 4),
        depth,
        frames: []
      };
      var time = Date.now();
      var bipp = (cc + ac) * depth, bipl = bipp * w;
      for (var i = 0; i < bufs.length; i++) nimg.frames.push({
        rect: {
          x: 0,
          y: 0,
          width: w,
          height: h
        },
        img: new Uint8Array(bufs[i]),
        blend: 0,
        dispose: 1,
        bpp: Math.ceil(bipp / 8),
        bpl: Math.ceil(bipl / 8)
      });
      UPNG.encode.compressPNG(nimg, 0, true);
      var out = UPNG.encode._main(nimg, w, h, dels, tabs);
      return out;
    };
    UPNG.encode._main = function(nimg, w, h, dels, tabs) {
      if (tabs == null) tabs = {};
      var crc = UPNG.crc.crc, wUi = UPNG._bin.writeUint, wUs = UPNG._bin.writeUshort, wAs = UPNG._bin.writeASCII;
      var offset = 8, anim = nimg.frames.length > 1, pltAlpha = false;
      var leng = 8 + (16 + 5 + 4) + (anim ? 20 : 0);
      if (tabs["sRGB"] != null) leng += 8 + 1 + 4;
      if (tabs["pHYs"] != null) leng += 8 + 9 + 4;
      if (nimg.ctype == 3) {
        var dl = nimg.plte.length;
        for (var i = 0; i < dl; i++) if (nimg.plte[i] >>> 24 != 255) pltAlpha = true;
        leng += 8 + dl * 3 + 4 + (pltAlpha ? 8 + dl * 1 + 4 : 0);
      }
      for (var j = 0; j < nimg.frames.length; j++) {
        var fr = nimg.frames[j];
        if (anim) leng += 38;
        leng += fr.cimg.length + 12;
        if (j != 0) leng += 4;
      }
      leng += 12;
      var data = new Uint8Array(leng);
      var wr = [137, 80, 78, 71, 13, 10, 26, 10];
      for (var i = 0; i < 8; i++) data[i] = wr[i];
      wUi(data, offset, 13);
      offset += 4;
      wAs(data, offset, "IHDR");
      offset += 4;
      wUi(data, offset, w);
      offset += 4;
      wUi(data, offset, h);
      offset += 4;
      data[offset] = nimg.depth;
      offset++;
      data[offset] = nimg.ctype;
      offset++;
      data[offset] = 0;
      offset++;
      data[offset] = 0;
      offset++;
      data[offset] = 0;
      offset++;
      wUi(data, offset, crc(data, offset - 17, 17));
      offset += 4;
      if (tabs["sRGB"] != null) {
        wUi(data, offset, 1);
        offset += 4;
        wAs(data, offset, "sRGB");
        offset += 4;
        data[offset] = tabs["sRGB"];
        offset++;
        wUi(data, offset, crc(data, offset - 5, 5));
        offset += 4;
      }
      if (tabs["pHYs"] != null) {
        wUi(data, offset, 9);
        offset += 4;
        wAs(data, offset, "pHYs");
        offset += 4;
        wUi(data, offset, tabs["pHYs"][0]);
        offset += 4;
        wUi(data, offset, tabs["pHYs"][1]);
        offset += 4;
        data[offset] = tabs["pHYs"][2];
        offset++;
        wUi(data, offset, crc(data, offset - 13, 13));
        offset += 4;
      }
      if (anim) {
        wUi(data, offset, 8);
        offset += 4;
        wAs(data, offset, "acTL");
        offset += 4;
        wUi(data, offset, nimg.frames.length);
        offset += 4;
        wUi(data, offset, tabs["loop"] != null ? tabs["loop"] : 0);
        offset += 4;
        wUi(data, offset, crc(data, offset - 12, 12));
        offset += 4;
      }
      if (nimg.ctype == 3) {
        var dl = nimg.plte.length;
        wUi(data, offset, dl * 3);
        offset += 4;
        wAs(data, offset, "PLTE");
        offset += 4;
        for (var i = 0; i < dl; i++) {
          var ti = i * 3, c = nimg.plte[i], r = c & 255, g = c >>> 8 & 255, b = c >>> 16 & 255;
          data[offset + ti + 0] = r;
          data[offset + ti + 1] = g;
          data[offset + ti + 2] = b;
        }
        offset += dl * 3;
        wUi(data, offset, crc(data, offset - dl * 3 - 4, dl * 3 + 4));
        offset += 4;
        if (pltAlpha) {
          wUi(data, offset, dl);
          offset += 4;
          wAs(data, offset, "tRNS");
          offset += 4;
          for (var i = 0; i < dl; i++) data[offset + i] = nimg.plte[i] >>> 24 & 255;
          offset += dl;
          wUi(data, offset, crc(data, offset - dl - 4, dl + 4));
          offset += 4;
        }
      }
      var fi = 0;
      for (var j = 0; j < nimg.frames.length; j++) {
        var fr = nimg.frames[j];
        if (anim) {
          wUi(data, offset, 26);
          offset += 4;
          wAs(data, offset, "fcTL");
          offset += 4;
          wUi(data, offset, fi++);
          offset += 4;
          wUi(data, offset, fr.rect.width);
          offset += 4;
          wUi(data, offset, fr.rect.height);
          offset += 4;
          wUi(data, offset, fr.rect.x);
          offset += 4;
          wUi(data, offset, fr.rect.y);
          offset += 4;
          wUs(data, offset, dels[j]);
          offset += 2;
          wUs(data, offset, 1e3);
          offset += 2;
          data[offset] = fr.dispose;
          offset++;
          data[offset] = fr.blend;
          offset++;
          wUi(data, offset, crc(data, offset - 30, 30));
          offset += 4;
        }
        var imgd = fr.cimg, dl = imgd.length;
        wUi(data, offset, dl + (j == 0 ? 0 : 4));
        offset += 4;
        var ioff = offset;
        wAs(data, offset, j == 0 ? "IDAT" : "fdAT");
        offset += 4;
        if (j != 0) {
          wUi(data, offset, fi++);
          offset += 4;
        }
        data.set(imgd, offset);
        offset += dl;
        wUi(data, offset, crc(data, ioff, offset - ioff));
        offset += 4;
      }
      wUi(data, offset, 0);
      offset += 4;
      wAs(data, offset, "IEND");
      offset += 4;
      wUi(data, offset, crc(data, offset - 4, 4));
      offset += 4;
      return data.buffer;
    };
    UPNG.encode.compressPNG = function(out, filter, levelZero) {
      for (var i = 0; i < out.frames.length; i++) {
        var frm = out.frames[i], nw = frm.rect.width, nh = frm.rect.height;
        var fdata = new Uint8Array(nh * frm.bpl + nh);
        frm.cimg = UPNG.encode._filterZero(frm.img, nh, frm.bpp, frm.bpl, fdata, filter, levelZero);
      }
    };
    UPNG.encode.compress = function(bufs, w, h, ps, prms) {
      var onlyBlend = prms[0], evenCrd = prms[1], forbidPrev = prms[2], minBits = prms[3], forbidPlte = prms[4];
      var ctype = 6, depth = 8, alphaAnd = 255;
      for (var j = 0; j < bufs.length; j++) {
        var img = new Uint8Array(bufs[j]), ilen = img.length;
        for (var i = 0; i < ilen; i += 4) alphaAnd &= img[i + 3];
      }
      var gotAlpha = alphaAnd != 255;
      var frms = UPNG.encode.framize(bufs, w, h, onlyBlend, evenCrd, forbidPrev);
      var cmap = {}, plte = [], inds = [];
      if (ps != 0) {
        var nbufs = [];
        for (var i = 0; i < frms.length; i++) nbufs.push(frms[i].img.buffer);
        var abuf = UPNG.encode.concatRGBA(nbufs), qres = UPNG.quantize(abuf, ps);
        var cof = 0, bb = new Uint8Array(qres.abuf);
        for (var i = 0; i < frms.length; i++) {
          var ti = frms[i].img, bln = ti.length;
          inds.push(new Uint8Array(qres.inds.buffer, cof >> 2, bln >> 2));
          for (var j = 0; j < bln; j += 4) {
            ti[j] = bb[cof + j];
            ti[j + 1] = bb[cof + j + 1];
            ti[j + 2] = bb[cof + j + 2];
            ti[j + 3] = bb[cof + j + 3];
          }
          cof += bln;
        }
        for (var i = 0; i < qres.plte.length; i++) plte.push(qres.plte[i].est.rgba);
      } else {
        for (var j = 0; j < frms.length; j++) {
          var frm = frms[j], img32 = new Uint32Array(frm.img.buffer), nw = frm.rect.width, ilen = img32.length;
          var ind = new Uint8Array(ilen);
          inds.push(ind);
          for (var i = 0; i < ilen; i++) {
            var c = img32[i];
            if (i != 0 && c == img32[i - 1]) ind[i] = ind[i - 1];
            else if (i > nw && c == img32[i - nw]) ind[i] = ind[i - nw];
            else {
              var cmc = cmap[c];
              if (cmc == null) {
                cmap[c] = cmc = plte.length;
                plte.push(c);
                if (plte.length >= 300) break;
              }
              ind[i] = cmc;
            }
          }
        }
      }
      var cc = plte.length;
      if (cc <= 256 && forbidPlte == false) {
        if (cc <= 2) depth = 1;
        else if (cc <= 4) depth = 2;
        else if (cc <= 16) depth = 4;
        else depth = 8;
        depth = Math.max(depth, minBits);
      }
      for (var j = 0; j < frms.length; j++) {
        var frm = frms[j], nx = frm.rect.x, ny = frm.rect.y, nw = frm.rect.width, nh = frm.rect.height;
        var cimg = frm.img, cimg32 = new Uint32Array(cimg.buffer);
        var bpl = 4 * nw, bpp = 4;
        if (cc <= 256 && forbidPlte == false) {
          bpl = Math.ceil(depth * nw / 8);
          var nimg = new Uint8Array(bpl * nh);
          var inj = inds[j];
          for (var y = 0; y < nh; y++) {
            var i = y * bpl, ii = y * nw;
            if (depth == 8) for (var x = 0; x < nw; x++) nimg[i + x] = inj[ii + x];
            else if (depth == 4) for (var x = 0; x < nw; x++) nimg[i + (x >> 1)] |= inj[ii + x] << 4 - (x & 1) * 4;
            else if (depth == 2) for (var x = 0; x < nw; x++) nimg[i + (x >> 2)] |= inj[ii + x] << 6 - (x & 3) * 2;
            else if (depth == 1) for (var x = 0; x < nw; x++) nimg[i + (x >> 3)] |= inj[ii + x] << 7 - (x & 7) * 1;
          }
          cimg = nimg;
          ctype = 3;
          bpp = 1;
        } else if (gotAlpha == false && frms.length == 1) {
          var nimg = new Uint8Array(nw * nh * 3), area = nw * nh;
          for (var i = 0; i < area; i++) {
            var ti = i * 3, qi = i * 4;
            nimg[ti] = cimg[qi];
            nimg[ti + 1] = cimg[qi + 1];
            nimg[ti + 2] = cimg[qi + 2];
          }
          cimg = nimg;
          ctype = 2;
          bpp = 3;
          bpl = 3 * nw;
        }
        frm.img = cimg;
        frm.bpl = bpl;
        frm.bpp = bpp;
      }
      return {
        ctype,
        depth,
        plte,
        frames: frms
      };
    };
    UPNG.encode.framize = function(bufs, w, h, alwaysBlend, evenCrd, forbidPrev) {
      var frms = [];
      for (var j = 0; j < bufs.length; j++) {
        var cimg = new Uint8Array(bufs[j]), cimg32 = new Uint32Array(cimg.buffer);
        var nimg;
        var nx = 0, ny = 0, nw = w, nh = h, blend = alwaysBlend ? 1 : 0;
        if (j != 0) {
          var tlim = forbidPrev || alwaysBlend || j == 1 || frms[j - 2].dispose != 0 ? 1 : 2, tstp = 0, tarea = 1e9;
          for (var it = 0; it < tlim; it++) {
            var pimg = new Uint8Array(bufs[j - 1 - it]), p32 = new Uint32Array(bufs[j - 1 - it]);
            var mix = w, miy = h, max = -1, may = -1;
            for (var y = 0; y < h; y++) for (var x = 0; x < w; x++) {
              var i = y * w + x;
              if (cimg32[i] != p32[i]) {
                if (x < mix) mix = x;
                if (x > max) max = x;
                if (y < miy) miy = y;
                if (y > may) may = y;
              }
            }
            if (max == -1) mix = miy = max = may = 0;
            if (evenCrd) {
              if ((mix & 1) == 1) mix--;
              if ((miy & 1) == 1) miy--;
            }
            var sarea = (max - mix + 1) * (may - miy + 1);
            if (sarea < tarea) {
              tarea = sarea;
              tstp = it;
              nx = mix;
              ny = miy;
              nw = max - mix + 1;
              nh = may - miy + 1;
            }
          }
          var pimg = new Uint8Array(bufs[j - 1 - tstp]);
          if (tstp == 1) frms[j - 1].dispose = 2;
          nimg = new Uint8Array(nw * nh * 4);
          UPNG._copyTile(pimg, w, h, nimg, nw, nh, -nx, -ny, 0);
          blend = UPNG._copyTile(cimg, w, h, nimg, nw, nh, -nx, -ny, 3) ? 1 : 0;
          if (blend == 1) UPNG.encode._prepareDiff(cimg, w, h, nimg, {
            x: nx,
            y: ny,
            width: nw,
            height: nh
          });
          else UPNG._copyTile(cimg, w, h, nimg, nw, nh, -nx, -ny, 0);
        } else nimg = cimg.slice(0);
        frms.push({
          rect: {
            x: nx,
            y: ny,
            width: nw,
            height: nh
          },
          img: nimg,
          blend,
          dispose: 0
        });
      }
      if (alwaysBlend) for (var j = 0; j < frms.length; j++) {
        var frm = frms[j];
        if (frm.blend == 1) continue;
        var r0 = frm.rect, r1 = frms[j - 1].rect;
        var miX = Math.min(r0.x, r1.x), miY = Math.min(r0.y, r1.y);
        var maX = Math.max(r0.x + r0.width, r1.x + r1.width), maY = Math.max(r0.y + r0.height, r1.y + r1.height);
        var r = {
          x: miX,
          y: miY,
          width: maX - miX,
          height: maY - miY
        };
        frms[j - 1].dispose = 1;
        if (j - 1 != 0) UPNG.encode._updateFrame(bufs, w, h, frms, j - 1, r, evenCrd);
        UPNG.encode._updateFrame(bufs, w, h, frms, j, r, evenCrd);
      }
      var area = 0;
      if (bufs.length != 1) for (var i = 0; i < frms.length; i++) {
        var frm = frms[i];
        area += frm.rect.width * frm.rect.height;
      }
      return frms;
    };
    UPNG.encode._updateFrame = function(bufs, w, h, frms, i, r, evenCrd) {
      var U8 = Uint8Array, U32 = Uint32Array;
      var pimg = new U8(bufs[i - 1]), pimg32 = new U32(bufs[i - 1]), nimg = i + 1 < bufs.length ? new U8(bufs[i + 1]) : null;
      var cimg = new U8(bufs[i]), cimg32 = new U32(cimg.buffer);
      var mix = w, miy = h, max = -1, may = -1;
      for (var y = 0; y < r.height; y++) for (var x = 0; x < r.width; x++) {
        var cx = r.x + x, cy = r.y + y;
        var j = cy * w + cx, cc = cimg32[j];
        if (cc == 0 || frms[i - 1].dispose == 0 && pimg32[j] == cc && (nimg == null || nimg[j * 4 + 3] != 0)) {
        } else {
          if (cx < mix) mix = cx;
          if (cx > max) max = cx;
          if (cy < miy) miy = cy;
          if (cy > may) may = cy;
        }
      }
      if (max == -1) mix = miy = max = may = 0;
      if (evenCrd) {
        if ((mix & 1) == 1) mix--;
        if ((miy & 1) == 1) miy--;
      }
      r = {
        x: mix,
        y: miy,
        width: max - mix + 1,
        height: may - miy + 1
      };
      var fr = frms[i];
      fr.rect = r;
      fr.blend = 1;
      fr.img = new Uint8Array(r.width * r.height * 4);
      if (frms[i - 1].dispose == 0) {
        UPNG._copyTile(pimg, w, h, fr.img, r.width, r.height, -r.x, -r.y, 0);
        UPNG.encode._prepareDiff(cimg, w, h, fr.img, r);
      } else UPNG._copyTile(cimg, w, h, fr.img, r.width, r.height, -r.x, -r.y, 0);
    };
    UPNG.encode._prepareDiff = function(cimg, w, h, nimg, rec) {
      UPNG._copyTile(cimg, w, h, nimg, rec.width, rec.height, -rec.x, -rec.y, 2);
    };
    UPNG.encode._filterZero = function(img, h, bpp, bpl, data, filter, levelZero) {
      var fls = [], ftry = [0, 1, 2, 3, 4];
      if (filter != -1) ftry = [filter];
      else if (h * bpl > 5e5 || bpp == 1) ftry = [0];
      var opts;
      if (levelZero) opts = {
        level: 0
      };
      var CMPR = levelZero && UZIP != null ? UZIP : _pako.default;
      for (var i = 0; i < ftry.length; i++) {
        for (var y = 0; y < h; y++) UPNG.encode._filterLine(data, img, y, bpl, bpp, ftry[i]);
        fls.push(CMPR["deflate"](data, opts));
      }
      var ti, tsize = 1e9;
      for (var i = 0; i < fls.length; i++) if (fls[i].length < tsize) {
        ti = i;
        tsize = fls[i].length;
      }
      return fls[ti];
    };
    UPNG.encode._filterLine = function(data, img, y, bpl, bpp, type) {
      var i = y * bpl, di = i + y, paeth = UPNG.decode._paeth;
      data[di] = type;
      di++;
      if (type == 0) {
        if (bpl < 500) for (var x = 0; x < bpl; x++) data[di + x] = img[i + x];
        else data.set(new Uint8Array(img.buffer, i, bpl), di);
      } else if (type == 1) {
        for (var x = 0; x < bpp; x++) data[di + x] = img[i + x];
        for (var x = bpp; x < bpl; x++) data[di + x] = img[i + x] - img[i + x - bpp] + 256 & 255;
      } else if (y == 0) {
        for (var x = 0; x < bpp; x++) data[di + x] = img[i + x];
        if (type == 2) for (var x = bpp; x < bpl; x++) data[di + x] = img[i + x];
        if (type == 3) for (var x = bpp; x < bpl; x++) data[di + x] = img[i + x] - (img[i + x - bpp] >> 1) + 256 & 255;
        if (type == 4) for (var x = bpp; x < bpl; x++) data[di + x] = img[i + x] - paeth(img[i + x - bpp], 0, 0) + 256 & 255;
      } else {
        if (type == 2) {
          for (var x = 0; x < bpl; x++) data[di + x] = img[i + x] + 256 - img[i + x - bpl] & 255;
        }
        if (type == 3) {
          for (var x = 0; x < bpp; x++) data[di + x] = img[i + x] + 256 - (img[i + x - bpl] >> 1) & 255;
          for (var x = bpp; x < bpl; x++) data[di + x] = img[i + x] + 256 - (img[i + x - bpl] + img[i + x - bpp] >> 1) & 255;
        }
        if (type == 4) {
          for (var x = 0; x < bpp; x++) data[di + x] = img[i + x] + 256 - paeth(0, img[i + x - bpl], 0) & 255;
          for (var x = bpp; x < bpl; x++) data[di + x] = img[i + x] + 256 - paeth(img[i + x - bpp], img[i + x - bpl], img[i + x - bpp - bpl]) & 255;
        }
      }
    };
    UPNG.crc = {
      table: (function() {
        var tab = new Uint32Array(256);
        for (var n = 0; n < 256; n++) {
          var c = n;
          for (var k = 0; k < 8; k++) {
            if (c & 1) c = 3988292384 ^ c >>> 1;
            else c = c >>> 1;
          }
          tab[n] = c;
        }
        return tab;
      })(),
      update: function(c, buf, off, len) {
        for (var i = 0; i < len; i++) c = UPNG.crc.table[(c ^ buf[off + i]) & 255] ^ c >>> 8;
        return c;
      },
      crc: function(b, o, l) {
        return UPNG.crc.update(4294967295, b, o, l) ^ 4294967295;
      }
    };
    UPNG.quantize = function(abuf, ps) {
      var oimg = new Uint8Array(abuf), nimg = oimg.slice(0), nimg32 = new Uint32Array(nimg.buffer);
      var KD = UPNG.quantize.getKDtree(nimg, ps);
      var root = KD[0], leafs = KD[1];
      var planeDst = UPNG.quantize.planeDst;
      var sb = oimg, tb = nimg32, len = sb.length;
      var inds = new Uint8Array(oimg.length >> 2);
      for (var i = 0; i < len; i += 4) {
        var r = sb[i] * (1 / 255), g = sb[i + 1] * (1 / 255), b = sb[i + 2] * (1 / 255), a = sb[i + 3] * (1 / 255);
        var nd = UPNG.quantize.getNearest(root, r, g, b, a);
        inds[i >> 2] = nd.ind;
        tb[i >> 2] = nd.est.rgba;
      }
      return {
        abuf: nimg.buffer,
        inds,
        plte: leafs
      };
    };
    UPNG.quantize.getKDtree = function(nimg, ps, err) {
      if (err == null) err = 1e-4;
      var nimg32 = new Uint32Array(nimg.buffer);
      var root = {
        i0: 0,
        i1: nimg.length,
        bst: null,
        est: null,
        tdst: 0,
        left: null,
        right: null
      };
      root.bst = UPNG.quantize.stats(nimg, root.i0, root.i1);
      root.est = UPNG.quantize.estats(root.bst);
      var leafs = [root];
      while (leafs.length < ps) {
        var maxL = 0, mi = 0;
        for (var i = 0; i < leafs.length; i++) if (leafs[i].est.L > maxL) {
          maxL = leafs[i].est.L;
          mi = i;
        }
        if (maxL < err) break;
        var node = leafs[mi];
        var s0 = UPNG.quantize.splitPixels(nimg, nimg32, node.i0, node.i1, node.est.e, node.est.eMq255);
        var s0wrong = node.i0 >= s0 || node.i1 <= s0;
        if (s0wrong) {
          node.est.L = 0;
          continue;
        }
        var ln = {
          i0: node.i0,
          i1: s0,
          bst: null,
          est: null,
          tdst: 0,
          left: null,
          right: null
        };
        ln.bst = UPNG.quantize.stats(nimg, ln.i0, ln.i1);
        ln.est = UPNG.quantize.estats(ln.bst);
        var rn = {
          i0: s0,
          i1: node.i1,
          bst: null,
          est: null,
          tdst: 0,
          left: null,
          right: null
        };
        rn.bst = {
          R: [],
          m: [],
          N: node.bst.N - ln.bst.N
        };
        for (var i = 0; i < 16; i++) rn.bst.R[i] = node.bst.R[i] - ln.bst.R[i];
        for (var i = 0; i < 4; i++) rn.bst.m[i] = node.bst.m[i] - ln.bst.m[i];
        rn.est = UPNG.quantize.estats(rn.bst);
        node.left = ln;
        node.right = rn;
        leafs[mi] = ln;
        leafs.push(rn);
      }
      leafs.sort(function(a, b) {
        return b.bst.N - a.bst.N;
      });
      for (var i = 0; i < leafs.length; i++) leafs[i].ind = i;
      return [root, leafs];
    };
    UPNG.quantize.getNearest = function(nd, r, g, b, a) {
      if (nd.left == null) {
        nd.tdst = UPNG.quantize.dist(nd.est.q, r, g, b, a);
        return nd;
      }
      var planeDst = UPNG.quantize.planeDst(nd.est, r, g, b, a);
      var node0 = nd.left, node1 = nd.right;
      if (planeDst > 0) {
        node0 = nd.right;
        node1 = nd.left;
      }
      var ln = UPNG.quantize.getNearest(node0, r, g, b, a);
      if (ln.tdst <= planeDst * planeDst) return ln;
      var rn = UPNG.quantize.getNearest(node1, r, g, b, a);
      return rn.tdst < ln.tdst ? rn : ln;
    };
    UPNG.quantize.planeDst = function(est, r, g, b, a) {
      var e = est.e;
      return e[0] * r + e[1] * g + e[2] * b + e[3] * a - est.eMq;
    };
    UPNG.quantize.dist = function(q, r, g, b, a) {
      var d0 = r - q[0], d1 = g - q[1], d2 = b - q[2], d3 = a - q[3];
      return d0 * d0 + d1 * d1 + d2 * d2 + d3 * d3;
    };
    UPNG.quantize.splitPixels = function(nimg, nimg32, i0, i1, e, eMq) {
      var vecDot = UPNG.quantize.vecDot;
      i1 -= 4;
      var shfs = 0;
      while (i0 < i1) {
        while (vecDot(nimg, i0, e) <= eMq) i0 += 4;
        while (vecDot(nimg, i1, e) > eMq) i1 -= 4;
        if (i0 >= i1) break;
        var t = nimg32[i0 >> 2];
        nimg32[i0 >> 2] = nimg32[i1 >> 2];
        nimg32[i1 >> 2] = t;
        i0 += 4;
        i1 -= 4;
      }
      while (vecDot(nimg, i0, e) > eMq) i0 -= 4;
      return i0 + 4;
    };
    UPNG.quantize.vecDot = function(nimg, i, e) {
      return nimg[i] * e[0] + nimg[i + 1] * e[1] + nimg[i + 2] * e[2] + nimg[i + 3] * e[3];
    };
    UPNG.quantize.stats = function(nimg, i0, i1) {
      var R = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      var m = [0, 0, 0, 0];
      var N = i1 - i0 >> 2;
      for (var i = i0; i < i1; i += 4) {
        var r = nimg[i] * (1 / 255), g = nimg[i + 1] * (1 / 255), b = nimg[i + 2] * (1 / 255), a = nimg[i + 3] * (1 / 255);
        m[0] += r;
        m[1] += g;
        m[2] += b;
        m[3] += a;
        R[0] += r * r;
        R[1] += r * g;
        R[2] += r * b;
        R[3] += r * a;
        R[5] += g * g;
        R[6] += g * b;
        R[7] += g * a;
        R[10] += b * b;
        R[11] += b * a;
        R[15] += a * a;
      }
      R[4] = R[1];
      R[8] = R[2];
      R[9] = R[6];
      R[12] = R[3];
      R[13] = R[7];
      R[14] = R[11];
      return {
        R,
        m,
        N
      };
    };
    UPNG.quantize.estats = function(stats) {
      var R = stats.R, m = stats.m, N = stats.N;
      var m0 = m[0], m1 = m[1], m2 = m[2], m3 = m[3], iN = N == 0 ? 0 : 1 / N;
      var Rj = [R[0] - m0 * m0 * iN, R[1] - m0 * m1 * iN, R[2] - m0 * m2 * iN, R[3] - m0 * m3 * iN, R[4] - m1 * m0 * iN, R[5] - m1 * m1 * iN, R[6] - m1 * m2 * iN, R[7] - m1 * m3 * iN, R[8] - m2 * m0 * iN, R[9] - m2 * m1 * iN, R[10] - m2 * m2 * iN, R[11] - m2 * m3 * iN, R[12] - m3 * m0 * iN, R[13] - m3 * m1 * iN, R[14] - m3 * m2 * iN, R[15] - m3 * m3 * iN];
      var A = Rj, M = UPNG.M4;
      var b = [0.5, 0.5, 0.5, 0.5], mi = 0, tmi = 0;
      if (N != 0) for (var i = 0; i < 10; i++) {
        b = M.multVec(A, b);
        tmi = Math.sqrt(M.dot(b, b));
        b = M.sml(1 / tmi, b);
        if (Math.abs(tmi - mi) < 1e-9) break;
        mi = tmi;
      }
      var q = [m0 * iN, m1 * iN, m2 * iN, m3 * iN];
      var eMq255 = M.dot(M.sml(255, q), b);
      return {
        Cov: Rj,
        q,
        e: b,
        L: mi,
        eMq255,
        eMq: M.dot(b, q),
        rgba: (Math.round(255 * q[3]) << 24 | Math.round(255 * q[2]) << 16 | Math.round(255 * q[1]) << 8 | Math.round(255 * q[0]) << 0) >>> 0
      };
    };
    UPNG.M4 = {
      multVec: function(m, v) {
        return [m[0] * v[0] + m[1] * v[1] + m[2] * v[2] + m[3] * v[3], m[4] * v[0] + m[5] * v[1] + m[6] * v[2] + m[7] * v[3], m[8] * v[0] + m[9] * v[1] + m[10] * v[2] + m[11] * v[3], m[12] * v[0] + m[13] * v[1] + m[14] * v[2] + m[15] * v[3]];
      },
      dot: function(x, y) {
        return x[0] * y[0] + x[1] * y[1] + x[2] * y[2] + x[3] * y[3];
      },
      sml: function(a, y) {
        return [a * y[0], a * y[1], a * y[2], a * y[3]];
      }
    };
    UPNG.encode.concatRGBA = function(bufs) {
      var tlen = 0;
      for (var i = 0; i < bufs.length; i++) tlen += bufs[i].byteLength;
      var nimg = new Uint8Array(tlen), noff = 0;
      for (var i = 0; i < bufs.length; i++) {
        var img = new Uint8Array(bufs[i]), il = img.length;
        for (var j = 0; j < il; j += 4) {
          var r = img[j], g = img[j + 1], b = img[j + 2], a = img[j + 3];
          if (a == 0) r = g = b = 0;
          nimg[noff + j] = r;
          nimg[noff + j + 1] = g;
          nimg[noff + j + 2] = b;
          nimg[noff + j + 3] = a;
        }
        noff += il;
      }
      return nimg.buffer;
    };
    var _default = UPNG;
    exports.default = _default;
  }
});

// node_modules/pdf-lib/cjs/utils/png.js
var require_png = __commonJS({
  "node_modules/pdf-lib/cjs/utils/png.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PNG = exports.PngType = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var upng_1 = tslib_1.__importDefault(require_UPNG());
    var getImageType = function(ctype) {
      if (ctype === 0)
        return PngType.Greyscale;
      if (ctype === 2)
        return PngType.Truecolour;
      if (ctype === 3)
        return PngType.IndexedColour;
      if (ctype === 4)
        return PngType.GreyscaleWithAlpha;
      if (ctype === 6)
        return PngType.TruecolourWithAlpha;
      throw new Error("Unknown color type: " + ctype);
    };
    var splitAlphaChannel = function(rgbaChannel) {
      var pixelCount = Math.floor(rgbaChannel.length / 4);
      var rgbChannel = new Uint8Array(pixelCount * 3);
      var alphaChannel = new Uint8Array(pixelCount * 1);
      var rgbaOffset = 0;
      var rgbOffset = 0;
      var alphaOffset = 0;
      while (rgbaOffset < rgbaChannel.length) {
        rgbChannel[rgbOffset++] = rgbaChannel[rgbaOffset++];
        rgbChannel[rgbOffset++] = rgbaChannel[rgbaOffset++];
        rgbChannel[rgbOffset++] = rgbaChannel[rgbaOffset++];
        alphaChannel[alphaOffset++] = rgbaChannel[rgbaOffset++];
      }
      return { rgbChannel, alphaChannel };
    };
    var PngType;
    (function(PngType2) {
      PngType2["Greyscale"] = "Greyscale";
      PngType2["Truecolour"] = "Truecolour";
      PngType2["IndexedColour"] = "IndexedColour";
      PngType2["GreyscaleWithAlpha"] = "GreyscaleWithAlpha";
      PngType2["TruecolourWithAlpha"] = "TruecolourWithAlpha";
    })(PngType = exports.PngType || (exports.PngType = {}));
    var PNG = (
      /** @class */
      (function() {
        function PNG2(pngData) {
          var upng = upng_1.default.decode(pngData);
          var frames = upng_1.default.toRGBA8(upng);
          if (frames.length > 1)
            throw new Error("Animated PNGs are not supported");
          var frame = new Uint8Array(frames[0]);
          var _a = splitAlphaChannel(frame), rgbChannel = _a.rgbChannel, alphaChannel = _a.alphaChannel;
          this.rgbChannel = rgbChannel;
          var hasAlphaValues = alphaChannel.some(function(a) {
            return a < 255;
          });
          if (hasAlphaValues)
            this.alphaChannel = alphaChannel;
          this.type = getImageType(upng.ctype);
          this.width = upng.width;
          this.height = upng.height;
          this.bitsPerComponent = 8;
        }
        PNG2.load = function(pngData) {
          return new PNG2(pngData);
        };
        return PNG2;
      })()
    );
    exports.PNG = PNG;
  }
});

// node_modules/pdf-lib/cjs/core/embedders/PngEmbedder.js
var require_PngEmbedder = __commonJS({
  "node_modules/pdf-lib/cjs/core/embedders/PngEmbedder.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var png_1 = require_png();
    var PngEmbedder = (
      /** @class */
      (function() {
        function PngEmbedder2(png) {
          this.image = png;
          this.bitsPerComponent = png.bitsPerComponent;
          this.width = png.width;
          this.height = png.height;
          this.colorSpace = "DeviceRGB";
        }
        PngEmbedder2.for = function(imageData) {
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            var png;
            return tslib_1.__generator(this, function(_a) {
              png = png_1.PNG.load(imageData);
              return [2, new PngEmbedder2(png)];
            });
          });
        };
        PngEmbedder2.prototype.embedIntoContext = function(context, ref) {
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            var SMask, xObject;
            return tslib_1.__generator(this, function(_a) {
              SMask = this.embedAlphaChannel(context);
              xObject = context.flateStream(this.image.rgbChannel, {
                Type: "XObject",
                Subtype: "Image",
                BitsPerComponent: this.image.bitsPerComponent,
                Width: this.image.width,
                Height: this.image.height,
                ColorSpace: this.colorSpace,
                SMask
              });
              if (ref) {
                context.assign(ref, xObject);
                return [2, ref];
              } else {
                return [2, context.register(xObject)];
              }
              return [
                2
                /*return*/
              ];
            });
          });
        };
        PngEmbedder2.prototype.embedAlphaChannel = function(context) {
          if (!this.image.alphaChannel)
            return void 0;
          var xObject = context.flateStream(this.image.alphaChannel, {
            Type: "XObject",
            Subtype: "Image",
            Height: this.image.height,
            Width: this.image.width,
            BitsPerComponent: this.image.bitsPerComponent,
            ColorSpace: "DeviceGray",
            Decode: [0, 1]
          });
          return context.register(xObject);
        };
        return PngEmbedder2;
      })()
    );
    exports.default = PngEmbedder;
  }
});

// node_modules/pdf-lib/cjs/core/streams/Stream.js
var require_Stream = __commonJS({
  "node_modules/pdf-lib/cjs/core/streams/Stream.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Stream = (
      /** @class */
      (function() {
        function Stream2(buffer, start, length) {
          this.bytes = buffer;
          this.start = start || 0;
          this.pos = this.start;
          this.end = !!start && !!length ? start + length : this.bytes.length;
        }
        Object.defineProperty(Stream2.prototype, "length", {
          get: function() {
            return this.end - this.start;
          },
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(Stream2.prototype, "isEmpty", {
          get: function() {
            return this.length === 0;
          },
          enumerable: false,
          configurable: true
        });
        Stream2.prototype.getByte = function() {
          if (this.pos >= this.end) {
            return -1;
          }
          return this.bytes[this.pos++];
        };
        Stream2.prototype.getUint16 = function() {
          var b0 = this.getByte();
          var b1 = this.getByte();
          if (b0 === -1 || b1 === -1) {
            return -1;
          }
          return (b0 << 8) + b1;
        };
        Stream2.prototype.getInt32 = function() {
          var b0 = this.getByte();
          var b1 = this.getByte();
          var b2 = this.getByte();
          var b3 = this.getByte();
          return (b0 << 24) + (b1 << 16) + (b2 << 8) + b3;
        };
        Stream2.prototype.getBytes = function(length, forceClamped) {
          if (forceClamped === void 0) {
            forceClamped = false;
          }
          var bytes = this.bytes;
          var pos = this.pos;
          var strEnd = this.end;
          if (!length) {
            var subarray = bytes.subarray(pos, strEnd);
            return forceClamped ? new Uint8ClampedArray(subarray) : subarray;
          } else {
            var end = pos + length;
            if (end > strEnd) {
              end = strEnd;
            }
            this.pos = end;
            var subarray = bytes.subarray(pos, end);
            return forceClamped ? new Uint8ClampedArray(subarray) : subarray;
          }
        };
        Stream2.prototype.peekByte = function() {
          var peekedByte = this.getByte();
          this.pos--;
          return peekedByte;
        };
        Stream2.prototype.peekBytes = function(length, forceClamped) {
          if (forceClamped === void 0) {
            forceClamped = false;
          }
          var bytes = this.getBytes(length, forceClamped);
          this.pos -= bytes.length;
          return bytes;
        };
        Stream2.prototype.skip = function(n) {
          if (!n) {
            n = 1;
          }
          this.pos += n;
        };
        Stream2.prototype.reset = function() {
          this.pos = this.start;
        };
        Stream2.prototype.moveStart = function() {
          this.start = this.pos;
        };
        Stream2.prototype.makeSubStream = function(start, length) {
          return new Stream2(this.bytes, start, length);
        };
        Stream2.prototype.decode = function() {
          return this.bytes;
        };
        return Stream2;
      })()
    );
    exports.default = Stream;
  }
});

// node_modules/pdf-lib/cjs/core/streams/DecodeStream.js
var require_DecodeStream = __commonJS({
  "node_modules/pdf-lib/cjs/core/streams/DecodeStream.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var errors_1 = require_errors2();
    var Stream_1 = tslib_1.__importDefault(require_Stream());
    var emptyBuffer = new Uint8Array(0);
    var DecodeStream = (
      /** @class */
      (function() {
        function DecodeStream2(maybeMinBufferLength) {
          this.pos = 0;
          this.bufferLength = 0;
          this.eof = false;
          this.buffer = emptyBuffer;
          this.minBufferLength = 512;
          if (maybeMinBufferLength) {
            while (this.minBufferLength < maybeMinBufferLength) {
              this.minBufferLength *= 2;
            }
          }
        }
        Object.defineProperty(DecodeStream2.prototype, "isEmpty", {
          get: function() {
            while (!this.eof && this.bufferLength === 0) {
              this.readBlock();
            }
            return this.bufferLength === 0;
          },
          enumerable: false,
          configurable: true
        });
        DecodeStream2.prototype.getByte = function() {
          var pos = this.pos;
          while (this.bufferLength <= pos) {
            if (this.eof) {
              return -1;
            }
            this.readBlock();
          }
          return this.buffer[this.pos++];
        };
        DecodeStream2.prototype.getUint16 = function() {
          var b0 = this.getByte();
          var b1 = this.getByte();
          if (b0 === -1 || b1 === -1) {
            return -1;
          }
          return (b0 << 8) + b1;
        };
        DecodeStream2.prototype.getInt32 = function() {
          var b0 = this.getByte();
          var b1 = this.getByte();
          var b2 = this.getByte();
          var b3 = this.getByte();
          return (b0 << 24) + (b1 << 16) + (b2 << 8) + b3;
        };
        DecodeStream2.prototype.getBytes = function(length, forceClamped) {
          if (forceClamped === void 0) {
            forceClamped = false;
          }
          var end;
          var pos = this.pos;
          if (length) {
            this.ensureBuffer(pos + length);
            end = pos + length;
            while (!this.eof && this.bufferLength < end) {
              this.readBlock();
            }
            var bufEnd = this.bufferLength;
            if (end > bufEnd) {
              end = bufEnd;
            }
          } else {
            while (!this.eof) {
              this.readBlock();
            }
            end = this.bufferLength;
          }
          this.pos = end;
          var subarray = this.buffer.subarray(pos, end);
          return forceClamped && !(subarray instanceof Uint8ClampedArray) ? new Uint8ClampedArray(subarray) : subarray;
        };
        DecodeStream2.prototype.peekByte = function() {
          var peekedByte = this.getByte();
          this.pos--;
          return peekedByte;
        };
        DecodeStream2.prototype.peekBytes = function(length, forceClamped) {
          if (forceClamped === void 0) {
            forceClamped = false;
          }
          var bytes = this.getBytes(length, forceClamped);
          this.pos -= bytes.length;
          return bytes;
        };
        DecodeStream2.prototype.skip = function(n) {
          if (!n) {
            n = 1;
          }
          this.pos += n;
        };
        DecodeStream2.prototype.reset = function() {
          this.pos = 0;
        };
        DecodeStream2.prototype.makeSubStream = function(start, length) {
          var end = start + length;
          while (this.bufferLength <= end && !this.eof) {
            this.readBlock();
          }
          return new Stream_1.default(
            this.buffer,
            start,
            length
            /* dict */
          );
        };
        DecodeStream2.prototype.decode = function() {
          while (!this.eof)
            this.readBlock();
          return this.buffer.subarray(0, this.bufferLength);
        };
        DecodeStream2.prototype.readBlock = function() {
          throw new errors_1.MethodNotImplementedError(this.constructor.name, "readBlock");
        };
        DecodeStream2.prototype.ensureBuffer = function(requested) {
          var buffer = this.buffer;
          if (requested <= buffer.byteLength) {
            return buffer;
          }
          var size = this.minBufferLength;
          while (size < requested) {
            size *= 2;
          }
          var buffer2 = new Uint8Array(size);
          buffer2.set(buffer);
          return this.buffer = buffer2;
        };
        return DecodeStream2;
      })()
    );
    exports.default = DecodeStream;
  }
});

// node_modules/pdf-lib/cjs/core/streams/Ascii85Stream.js
var require_Ascii85Stream = __commonJS({
  "node_modules/pdf-lib/cjs/core/streams/Ascii85Stream.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var DecodeStream_1 = tslib_1.__importDefault(require_DecodeStream());
    var isSpace = function(ch) {
      return ch === 32 || ch === 9 || ch === 13 || ch === 10;
    };
    var Ascii85Stream = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(Ascii85Stream2, _super);
        function Ascii85Stream2(stream, maybeLength) {
          var _this = _super.call(this, maybeLength) || this;
          _this.stream = stream;
          _this.input = new Uint8Array(5);
          if (maybeLength) {
            maybeLength = 0.8 * maybeLength;
          }
          return _this;
        }
        Ascii85Stream2.prototype.readBlock = function() {
          var TILDA_CHAR = 126;
          var Z_LOWER_CHAR = 122;
          var EOF = -1;
          var stream = this.stream;
          var c = stream.getByte();
          while (isSpace(c)) {
            c = stream.getByte();
          }
          if (c === EOF || c === TILDA_CHAR) {
            this.eof = true;
            return;
          }
          var bufferLength = this.bufferLength;
          var buffer;
          var i;
          if (c === Z_LOWER_CHAR) {
            buffer = this.ensureBuffer(bufferLength + 4);
            for (i = 0; i < 4; ++i) {
              buffer[bufferLength + i] = 0;
            }
            this.bufferLength += 4;
          } else {
            var input = this.input;
            input[0] = c;
            for (i = 1; i < 5; ++i) {
              c = stream.getByte();
              while (isSpace(c)) {
                c = stream.getByte();
              }
              input[i] = c;
              if (c === EOF || c === TILDA_CHAR) {
                break;
              }
            }
            buffer = this.ensureBuffer(bufferLength + i - 1);
            this.bufferLength += i - 1;
            if (i < 5) {
              for (; i < 5; ++i) {
                input[i] = 33 + 84;
              }
              this.eof = true;
            }
            var t = 0;
            for (i = 0; i < 5; ++i) {
              t = t * 85 + (input[i] - 33);
            }
            for (i = 3; i >= 0; --i) {
              buffer[bufferLength + i] = t & 255;
              t >>= 8;
            }
          }
        };
        return Ascii85Stream2;
      })(DecodeStream_1.default)
    );
    exports.default = Ascii85Stream;
  }
});

// node_modules/pdf-lib/cjs/core/streams/AsciiHexStream.js
var require_AsciiHexStream = __commonJS({
  "node_modules/pdf-lib/cjs/core/streams/AsciiHexStream.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var DecodeStream_1 = tslib_1.__importDefault(require_DecodeStream());
    var AsciiHexStream = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(AsciiHexStream2, _super);
        function AsciiHexStream2(stream, maybeLength) {
          var _this = _super.call(this, maybeLength) || this;
          _this.stream = stream;
          _this.firstDigit = -1;
          if (maybeLength) {
            maybeLength = 0.5 * maybeLength;
          }
          return _this;
        }
        AsciiHexStream2.prototype.readBlock = function() {
          var UPSTREAM_BLOCK_SIZE = 8e3;
          var bytes = this.stream.getBytes(UPSTREAM_BLOCK_SIZE);
          if (!bytes.length) {
            this.eof = true;
            return;
          }
          var maxDecodeLength = bytes.length + 1 >> 1;
          var buffer = this.ensureBuffer(this.bufferLength + maxDecodeLength);
          var bufferLength = this.bufferLength;
          var firstDigit = this.firstDigit;
          for (var i = 0, ii = bytes.length; i < ii; i++) {
            var ch = bytes[i];
            var digit = void 0;
            if (ch >= 48 && ch <= 57) {
              digit = ch & 15;
            } else if (ch >= 65 && ch <= 70 || ch >= 97 && ch <= 102) {
              digit = (ch & 15) + 9;
            } else if (ch === 62) {
              this.eof = true;
              break;
            } else {
              continue;
            }
            if (firstDigit < 0) {
              firstDigit = digit;
            } else {
              buffer[bufferLength++] = firstDigit << 4 | digit;
              firstDigit = -1;
            }
          }
          if (firstDigit >= 0 && this.eof) {
            buffer[bufferLength++] = firstDigit << 4;
            firstDigit = -1;
          }
          this.firstDigit = firstDigit;
          this.bufferLength = bufferLength;
        };
        return AsciiHexStream2;
      })(DecodeStream_1.default)
    );
    exports.default = AsciiHexStream;
  }
});

// node_modules/pdf-lib/cjs/core/streams/FlateStream.js
var require_FlateStream = __commonJS({
  "node_modules/pdf-lib/cjs/core/streams/FlateStream.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var DecodeStream_1 = tslib_1.__importDefault(require_DecodeStream());
    var codeLenCodeMap = new Int32Array([
      16,
      17,
      18,
      0,
      8,
      7,
      9,
      6,
      10,
      5,
      11,
      4,
      12,
      3,
      13,
      2,
      14,
      1,
      15
    ]);
    var lengthDecode = new Int32Array([
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      65547,
      65549,
      65551,
      65553,
      131091,
      131095,
      131099,
      131103,
      196643,
      196651,
      196659,
      196667,
      262211,
      262227,
      262243,
      262259,
      327811,
      327843,
      327875,
      327907,
      258,
      258,
      258
    ]);
    var distDecode = new Int32Array([
      1,
      2,
      3,
      4,
      65541,
      65543,
      131081,
      131085,
      196625,
      196633,
      262177,
      262193,
      327745,
      327777,
      393345,
      393409,
      459009,
      459137,
      524801,
      525057,
      590849,
      591361,
      657409,
      658433,
      724993,
      727041,
      794625,
      798721,
      868353,
      876545
    ]);
    var fixedLitCodeTab = [new Int32Array([
      459008,
      524368,
      524304,
      524568,
      459024,
      524400,
      524336,
      590016,
      459016,
      524384,
      524320,
      589984,
      524288,
      524416,
      524352,
      590048,
      459012,
      524376,
      524312,
      589968,
      459028,
      524408,
      524344,
      590032,
      459020,
      524392,
      524328,
      59e4,
      524296,
      524424,
      524360,
      590064,
      459010,
      524372,
      524308,
      524572,
      459026,
      524404,
      524340,
      590024,
      459018,
      524388,
      524324,
      589992,
      524292,
      524420,
      524356,
      590056,
      459014,
      524380,
      524316,
      589976,
      459030,
      524412,
      524348,
      590040,
      459022,
      524396,
      524332,
      590008,
      524300,
      524428,
      524364,
      590072,
      459009,
      524370,
      524306,
      524570,
      459025,
      524402,
      524338,
      590020,
      459017,
      524386,
      524322,
      589988,
      524290,
      524418,
      524354,
      590052,
      459013,
      524378,
      524314,
      589972,
      459029,
      524410,
      524346,
      590036,
      459021,
      524394,
      524330,
      590004,
      524298,
      524426,
      524362,
      590068,
      459011,
      524374,
      524310,
      524574,
      459027,
      524406,
      524342,
      590028,
      459019,
      524390,
      524326,
      589996,
      524294,
      524422,
      524358,
      590060,
      459015,
      524382,
      524318,
      589980,
      459031,
      524414,
      524350,
      590044,
      459023,
      524398,
      524334,
      590012,
      524302,
      524430,
      524366,
      590076,
      459008,
      524369,
      524305,
      524569,
      459024,
      524401,
      524337,
      590018,
      459016,
      524385,
      524321,
      589986,
      524289,
      524417,
      524353,
      590050,
      459012,
      524377,
      524313,
      589970,
      459028,
      524409,
      524345,
      590034,
      459020,
      524393,
      524329,
      590002,
      524297,
      524425,
      524361,
      590066,
      459010,
      524373,
      524309,
      524573,
      459026,
      524405,
      524341,
      590026,
      459018,
      524389,
      524325,
      589994,
      524293,
      524421,
      524357,
      590058,
      459014,
      524381,
      524317,
      589978,
      459030,
      524413,
      524349,
      590042,
      459022,
      524397,
      524333,
      590010,
      524301,
      524429,
      524365,
      590074,
      459009,
      524371,
      524307,
      524571,
      459025,
      524403,
      524339,
      590022,
      459017,
      524387,
      524323,
      589990,
      524291,
      524419,
      524355,
      590054,
      459013,
      524379,
      524315,
      589974,
      459029,
      524411,
      524347,
      590038,
      459021,
      524395,
      524331,
      590006,
      524299,
      524427,
      524363,
      590070,
      459011,
      524375,
      524311,
      524575,
      459027,
      524407,
      524343,
      590030,
      459019,
      524391,
      524327,
      589998,
      524295,
      524423,
      524359,
      590062,
      459015,
      524383,
      524319,
      589982,
      459031,
      524415,
      524351,
      590046,
      459023,
      524399,
      524335,
      590014,
      524303,
      524431,
      524367,
      590078,
      459008,
      524368,
      524304,
      524568,
      459024,
      524400,
      524336,
      590017,
      459016,
      524384,
      524320,
      589985,
      524288,
      524416,
      524352,
      590049,
      459012,
      524376,
      524312,
      589969,
      459028,
      524408,
      524344,
      590033,
      459020,
      524392,
      524328,
      590001,
      524296,
      524424,
      524360,
      590065,
      459010,
      524372,
      524308,
      524572,
      459026,
      524404,
      524340,
      590025,
      459018,
      524388,
      524324,
      589993,
      524292,
      524420,
      524356,
      590057,
      459014,
      524380,
      524316,
      589977,
      459030,
      524412,
      524348,
      590041,
      459022,
      524396,
      524332,
      590009,
      524300,
      524428,
      524364,
      590073,
      459009,
      524370,
      524306,
      524570,
      459025,
      524402,
      524338,
      590021,
      459017,
      524386,
      524322,
      589989,
      524290,
      524418,
      524354,
      590053,
      459013,
      524378,
      524314,
      589973,
      459029,
      524410,
      524346,
      590037,
      459021,
      524394,
      524330,
      590005,
      524298,
      524426,
      524362,
      590069,
      459011,
      524374,
      524310,
      524574,
      459027,
      524406,
      524342,
      590029,
      459019,
      524390,
      524326,
      589997,
      524294,
      524422,
      524358,
      590061,
      459015,
      524382,
      524318,
      589981,
      459031,
      524414,
      524350,
      590045,
      459023,
      524398,
      524334,
      590013,
      524302,
      524430,
      524366,
      590077,
      459008,
      524369,
      524305,
      524569,
      459024,
      524401,
      524337,
      590019,
      459016,
      524385,
      524321,
      589987,
      524289,
      524417,
      524353,
      590051,
      459012,
      524377,
      524313,
      589971,
      459028,
      524409,
      524345,
      590035,
      459020,
      524393,
      524329,
      590003,
      524297,
      524425,
      524361,
      590067,
      459010,
      524373,
      524309,
      524573,
      459026,
      524405,
      524341,
      590027,
      459018,
      524389,
      524325,
      589995,
      524293,
      524421,
      524357,
      590059,
      459014,
      524381,
      524317,
      589979,
      459030,
      524413,
      524349,
      590043,
      459022,
      524397,
      524333,
      590011,
      524301,
      524429,
      524365,
      590075,
      459009,
      524371,
      524307,
      524571,
      459025,
      524403,
      524339,
      590023,
      459017,
      524387,
      524323,
      589991,
      524291,
      524419,
      524355,
      590055,
      459013,
      524379,
      524315,
      589975,
      459029,
      524411,
      524347,
      590039,
      459021,
      524395,
      524331,
      590007,
      524299,
      524427,
      524363,
      590071,
      459011,
      524375,
      524311,
      524575,
      459027,
      524407,
      524343,
      590031,
      459019,
      524391,
      524327,
      589999,
      524295,
      524423,
      524359,
      590063,
      459015,
      524383,
      524319,
      589983,
      459031,
      524415,
      524351,
      590047,
      459023,
      524399,
      524335,
      590015,
      524303,
      524431,
      524367,
      590079
    ]), 9];
    var fixedDistCodeTab = [new Int32Array([
      327680,
      327696,
      327688,
      327704,
      327684,
      327700,
      327692,
      327708,
      327682,
      327698,
      327690,
      327706,
      327686,
      327702,
      327694,
      0,
      327681,
      327697,
      327689,
      327705,
      327685,
      327701,
      327693,
      327709,
      327683,
      327699,
      327691,
      327707,
      327687,
      327703,
      327695,
      0
    ]), 5];
    var FlateStream = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(FlateStream2, _super);
        function FlateStream2(stream, maybeLength) {
          var _this = _super.call(this, maybeLength) || this;
          _this.stream = stream;
          var cmf = stream.getByte();
          var flg = stream.getByte();
          if (cmf === -1 || flg === -1) {
            throw new Error("Invalid header in flate stream: " + cmf + ", " + flg);
          }
          if ((cmf & 15) !== 8) {
            throw new Error("Unknown compression method in flate stream: " + cmf + ", " + flg);
          }
          if (((cmf << 8) + flg) % 31 !== 0) {
            throw new Error("Bad FCHECK in flate stream: " + cmf + ", " + flg);
          }
          if (flg & 32) {
            throw new Error("FDICT bit set in flate stream: " + cmf + ", " + flg);
          }
          _this.codeSize = 0;
          _this.codeBuf = 0;
          return _this;
        }
        FlateStream2.prototype.readBlock = function() {
          var buffer;
          var len;
          var str = this.stream;
          var hdr = this.getBits(3);
          if (hdr & 1) {
            this.eof = true;
          }
          hdr >>= 1;
          if (hdr === 0) {
            var b = void 0;
            if ((b = str.getByte()) === -1) {
              throw new Error("Bad block header in flate stream");
            }
            var blockLen = b;
            if ((b = str.getByte()) === -1) {
              throw new Error("Bad block header in flate stream");
            }
            blockLen |= b << 8;
            if ((b = str.getByte()) === -1) {
              throw new Error("Bad block header in flate stream");
            }
            var check = b;
            if ((b = str.getByte()) === -1) {
              throw new Error("Bad block header in flate stream");
            }
            check |= b << 8;
            if (check !== (~blockLen & 65535) && (blockLen !== 0 || check !== 0)) {
              throw new Error("Bad uncompressed block length in flate stream");
            }
            this.codeBuf = 0;
            this.codeSize = 0;
            var bufferLength = this.bufferLength;
            buffer = this.ensureBuffer(bufferLength + blockLen);
            var end = bufferLength + blockLen;
            this.bufferLength = end;
            if (blockLen === 0) {
              if (str.peekByte() === -1) {
                this.eof = true;
              }
            } else {
              for (var n = bufferLength; n < end; ++n) {
                if ((b = str.getByte()) === -1) {
                  this.eof = true;
                  break;
                }
                buffer[n] = b;
              }
            }
            return;
          }
          var litCodeTable;
          var distCodeTable;
          if (hdr === 1) {
            litCodeTable = fixedLitCodeTab;
            distCodeTable = fixedDistCodeTab;
          } else if (hdr === 2) {
            var numLitCodes = this.getBits(5) + 257;
            var numDistCodes = this.getBits(5) + 1;
            var numCodeLenCodes = this.getBits(4) + 4;
            var codeLenCodeLengths = new Uint8Array(codeLenCodeMap.length);
            var i = void 0;
            for (i = 0; i < numCodeLenCodes; ++i) {
              codeLenCodeLengths[codeLenCodeMap[i]] = this.getBits(3);
            }
            var codeLenCodeTab = this.generateHuffmanTable(codeLenCodeLengths);
            len = 0;
            i = 0;
            var codes = numLitCodes + numDistCodes;
            var codeLengths = new Uint8Array(codes);
            var bitsLength = void 0;
            var bitsOffset = void 0;
            var what = void 0;
            while (i < codes) {
              var code = this.getCode(codeLenCodeTab);
              if (code === 16) {
                bitsLength = 2;
                bitsOffset = 3;
                what = len;
              } else if (code === 17) {
                bitsLength = 3;
                bitsOffset = 3;
                what = len = 0;
              } else if (code === 18) {
                bitsLength = 7;
                bitsOffset = 11;
                what = len = 0;
              } else {
                codeLengths[i++] = len = code;
                continue;
              }
              var repeatLength = this.getBits(bitsLength) + bitsOffset;
              while (repeatLength-- > 0) {
                codeLengths[i++] = what;
              }
            }
            litCodeTable = this.generateHuffmanTable(codeLengths.subarray(0, numLitCodes));
            distCodeTable = this.generateHuffmanTable(codeLengths.subarray(numLitCodes, codes));
          } else {
            throw new Error("Unknown block type in flate stream");
          }
          buffer = this.buffer;
          var limit = buffer ? buffer.length : 0;
          var pos = this.bufferLength;
          while (true) {
            var code1 = this.getCode(litCodeTable);
            if (code1 < 256) {
              if (pos + 1 >= limit) {
                buffer = this.ensureBuffer(pos + 1);
                limit = buffer.length;
              }
              buffer[pos++] = code1;
              continue;
            }
            if (code1 === 256) {
              this.bufferLength = pos;
              return;
            }
            code1 -= 257;
            code1 = lengthDecode[code1];
            var code2 = code1 >> 16;
            if (code2 > 0) {
              code2 = this.getBits(code2);
            }
            len = (code1 & 65535) + code2;
            code1 = this.getCode(distCodeTable);
            code1 = distDecode[code1];
            code2 = code1 >> 16;
            if (code2 > 0) {
              code2 = this.getBits(code2);
            }
            var dist = (code1 & 65535) + code2;
            if (pos + len >= limit) {
              buffer = this.ensureBuffer(pos + len);
              limit = buffer.length;
            }
            for (var k = 0; k < len; ++k, ++pos) {
              buffer[pos] = buffer[pos - dist];
            }
          }
        };
        FlateStream2.prototype.getBits = function(bits) {
          var str = this.stream;
          var codeSize = this.codeSize;
          var codeBuf = this.codeBuf;
          var b;
          while (codeSize < bits) {
            if ((b = str.getByte()) === -1) {
              throw new Error("Bad encoding in flate stream");
            }
            codeBuf |= b << codeSize;
            codeSize += 8;
          }
          b = codeBuf & (1 << bits) - 1;
          this.codeBuf = codeBuf >> bits;
          this.codeSize = codeSize -= bits;
          return b;
        };
        FlateStream2.prototype.getCode = function(table) {
          var str = this.stream;
          var codes = table[0];
          var maxLen = table[1];
          var codeSize = this.codeSize;
          var codeBuf = this.codeBuf;
          var b;
          while (codeSize < maxLen) {
            if ((b = str.getByte()) === -1) {
              break;
            }
            codeBuf |= b << codeSize;
            codeSize += 8;
          }
          var code = codes[codeBuf & (1 << maxLen) - 1];
          if (typeof codes === "number") {
            console.log("FLATE:", code);
          }
          var codeLen = code >> 16;
          var codeVal = code & 65535;
          if (codeLen < 1 || codeSize < codeLen) {
            throw new Error("Bad encoding in flate stream");
          }
          this.codeBuf = codeBuf >> codeLen;
          this.codeSize = codeSize - codeLen;
          return codeVal;
        };
        FlateStream2.prototype.generateHuffmanTable = function(lengths) {
          var n = lengths.length;
          var maxLen = 0;
          var i;
          for (i = 0; i < n; ++i) {
            if (lengths[i] > maxLen) {
              maxLen = lengths[i];
            }
          }
          var size = 1 << maxLen;
          var codes = new Int32Array(size);
          for (var len = 1, code = 0, skip = 2; len <= maxLen; ++len, code <<= 1, skip <<= 1) {
            for (var val = 0; val < n; ++val) {
              if (lengths[val] === len) {
                var code2 = 0;
                var t = code;
                for (i = 0; i < len; ++i) {
                  code2 = code2 << 1 | t & 1;
                  t >>= 1;
                }
                for (i = code2; i < size; i += skip) {
                  codes[i] = len << 16 | val;
                }
                ++code;
              }
            }
          }
          return [codes, maxLen];
        };
        return FlateStream2;
      })(DecodeStream_1.default)
    );
    exports.default = FlateStream;
  }
});

// node_modules/pdf-lib/cjs/core/streams/LZWStream.js
var require_LZWStream = __commonJS({
  "node_modules/pdf-lib/cjs/core/streams/LZWStream.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var DecodeStream_1 = tslib_1.__importDefault(require_DecodeStream());
    var LZWStream = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(LZWStream2, _super);
        function LZWStream2(stream, maybeLength, earlyChange) {
          var _this = _super.call(this, maybeLength) || this;
          _this.stream = stream;
          _this.cachedData = 0;
          _this.bitsCached = 0;
          var maxLzwDictionarySize = 4096;
          var lzwState = {
            earlyChange,
            codeLength: 9,
            nextCode: 258,
            dictionaryValues: new Uint8Array(maxLzwDictionarySize),
            dictionaryLengths: new Uint16Array(maxLzwDictionarySize),
            dictionaryPrevCodes: new Uint16Array(maxLzwDictionarySize),
            currentSequence: new Uint8Array(maxLzwDictionarySize),
            currentSequenceLength: 0
          };
          for (var i = 0; i < 256; ++i) {
            lzwState.dictionaryValues[i] = i;
            lzwState.dictionaryLengths[i] = 1;
          }
          _this.lzwState = lzwState;
          return _this;
        }
        LZWStream2.prototype.readBlock = function() {
          var blockSize = 512;
          var estimatedDecodedSize = blockSize * 2;
          var decodedSizeDelta = blockSize;
          var i;
          var j;
          var q;
          var lzwState = this.lzwState;
          if (!lzwState) {
            return;
          }
          var earlyChange = lzwState.earlyChange;
          var nextCode = lzwState.nextCode;
          var dictionaryValues = lzwState.dictionaryValues;
          var dictionaryLengths = lzwState.dictionaryLengths;
          var dictionaryPrevCodes = lzwState.dictionaryPrevCodes;
          var codeLength = lzwState.codeLength;
          var prevCode = lzwState.prevCode;
          var currentSequence = lzwState.currentSequence;
          var currentSequenceLength = lzwState.currentSequenceLength;
          var decodedLength = 0;
          var currentBufferLength = this.bufferLength;
          var buffer = this.ensureBuffer(this.bufferLength + estimatedDecodedSize);
          for (i = 0; i < blockSize; i++) {
            var code = this.readBits(codeLength);
            var hasPrev = currentSequenceLength > 0;
            if (!code || code < 256) {
              currentSequence[0] = code;
              currentSequenceLength = 1;
            } else if (code >= 258) {
              if (code < nextCode) {
                currentSequenceLength = dictionaryLengths[code];
                for (j = currentSequenceLength - 1, q = code; j >= 0; j--) {
                  currentSequence[j] = dictionaryValues[q];
                  q = dictionaryPrevCodes[q];
                }
              } else {
                currentSequence[currentSequenceLength++] = currentSequence[0];
              }
            } else if (code === 256) {
              codeLength = 9;
              nextCode = 258;
              currentSequenceLength = 0;
              continue;
            } else {
              this.eof = true;
              delete this.lzwState;
              break;
            }
            if (hasPrev) {
              dictionaryPrevCodes[nextCode] = prevCode;
              dictionaryLengths[nextCode] = dictionaryLengths[prevCode] + 1;
              dictionaryValues[nextCode] = currentSequence[0];
              nextCode++;
              codeLength = nextCode + earlyChange & nextCode + earlyChange - 1 ? codeLength : Math.min(Math.log(nextCode + earlyChange) / 0.6931471805599453 + 1, 12) | 0;
            }
            prevCode = code;
            decodedLength += currentSequenceLength;
            if (estimatedDecodedSize < decodedLength) {
              do {
                estimatedDecodedSize += decodedSizeDelta;
              } while (estimatedDecodedSize < decodedLength);
              buffer = this.ensureBuffer(this.bufferLength + estimatedDecodedSize);
            }
            for (j = 0; j < currentSequenceLength; j++) {
              buffer[currentBufferLength++] = currentSequence[j];
            }
          }
          lzwState.nextCode = nextCode;
          lzwState.codeLength = codeLength;
          lzwState.prevCode = prevCode;
          lzwState.currentSequenceLength = currentSequenceLength;
          this.bufferLength = currentBufferLength;
        };
        LZWStream2.prototype.readBits = function(n) {
          var bitsCached = this.bitsCached;
          var cachedData = this.cachedData;
          while (bitsCached < n) {
            var c = this.stream.getByte();
            if (c === -1) {
              this.eof = true;
              return null;
            }
            cachedData = cachedData << 8 | c;
            bitsCached += 8;
          }
          this.bitsCached = bitsCached -= n;
          this.cachedData = cachedData;
          return cachedData >>> bitsCached & (1 << n) - 1;
        };
        return LZWStream2;
      })(DecodeStream_1.default)
    );
    exports.default = LZWStream;
  }
});

// node_modules/pdf-lib/cjs/core/streams/RunLengthStream.js
var require_RunLengthStream = __commonJS({
  "node_modules/pdf-lib/cjs/core/streams/RunLengthStream.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var DecodeStream_1 = tslib_1.__importDefault(require_DecodeStream());
    var RunLengthStream = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(RunLengthStream2, _super);
        function RunLengthStream2(stream, maybeLength) {
          var _this = _super.call(this, maybeLength) || this;
          _this.stream = stream;
          return _this;
        }
        RunLengthStream2.prototype.readBlock = function() {
          var repeatHeader = this.stream.getBytes(2);
          if (!repeatHeader || repeatHeader.length < 2 || repeatHeader[0] === 128) {
            this.eof = true;
            return;
          }
          var buffer;
          var bufferLength = this.bufferLength;
          var n = repeatHeader[0];
          if (n < 128) {
            buffer = this.ensureBuffer(bufferLength + n + 1);
            buffer[bufferLength++] = repeatHeader[1];
            if (n > 0) {
              var source = this.stream.getBytes(n);
              buffer.set(source, bufferLength);
              bufferLength += n;
            }
          } else {
            n = 257 - n;
            var b = repeatHeader[1];
            buffer = this.ensureBuffer(bufferLength + n + 1);
            for (var i = 0; i < n; i++) {
              buffer[bufferLength++] = b;
            }
          }
          this.bufferLength = bufferLength;
        };
        return RunLengthStream2;
      })(DecodeStream_1.default)
    );
    exports.default = RunLengthStream;
  }
});

// node_modules/pdf-lib/cjs/core/streams/decode.js
var require_decode = __commonJS({
  "node_modules/pdf-lib/cjs/core/streams/decode.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.decodePDFRawStream = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var errors_1 = require_errors2();
    var PDFArray_1 = tslib_1.__importDefault(require_PDFArray());
    var PDFDict_1 = tslib_1.__importDefault(require_PDFDict());
    var PDFName_1 = tslib_1.__importDefault(require_PDFName());
    var PDFNumber_1 = tslib_1.__importDefault(require_PDFNumber());
    var Ascii85Stream_1 = tslib_1.__importDefault(require_Ascii85Stream());
    var AsciiHexStream_1 = tslib_1.__importDefault(require_AsciiHexStream());
    var FlateStream_1 = tslib_1.__importDefault(require_FlateStream());
    var LZWStream_1 = tslib_1.__importDefault(require_LZWStream());
    var RunLengthStream_1 = tslib_1.__importDefault(require_RunLengthStream());
    var Stream_1 = tslib_1.__importDefault(require_Stream());
    var decodeStream = function(stream, encoding, params) {
      if (encoding === PDFName_1.default.of("FlateDecode")) {
        return new FlateStream_1.default(stream);
      }
      if (encoding === PDFName_1.default.of("LZWDecode")) {
        var earlyChange = 1;
        if (params instanceof PDFDict_1.default) {
          var EarlyChange = params.lookup(PDFName_1.default.of("EarlyChange"));
          if (EarlyChange instanceof PDFNumber_1.default) {
            earlyChange = EarlyChange.asNumber();
          }
        }
        return new LZWStream_1.default(stream, void 0, earlyChange);
      }
      if (encoding === PDFName_1.default.of("ASCII85Decode")) {
        return new Ascii85Stream_1.default(stream);
      }
      if (encoding === PDFName_1.default.of("ASCIIHexDecode")) {
        return new AsciiHexStream_1.default(stream);
      }
      if (encoding === PDFName_1.default.of("RunLengthDecode")) {
        return new RunLengthStream_1.default(stream);
      }
      throw new errors_1.UnsupportedEncodingError(encoding.asString());
    };
    exports.decodePDFRawStream = function(_a) {
      var dict = _a.dict, contents = _a.contents;
      var stream = new Stream_1.default(contents);
      var Filter = dict.lookup(PDFName_1.default.of("Filter"));
      var DecodeParms = dict.lookup(PDFName_1.default.of("DecodeParms"));
      if (Filter instanceof PDFName_1.default) {
        stream = decodeStream(stream, Filter, DecodeParms);
      } else if (Filter instanceof PDFArray_1.default) {
        for (var idx = 0, len = Filter.size(); idx < len; idx++) {
          stream = decodeStream(stream, Filter.lookup(idx, PDFName_1.default), DecodeParms && DecodeParms.lookupMaybe(idx, PDFDict_1.default));
        }
      } else if (!!Filter) {
        throw new errors_1.UnexpectedObjectTypeError([PDFName_1.default, PDFArray_1.default], Filter);
      }
      return stream;
    };
  }
});

// node_modules/pdf-lib/cjs/core/embedders/PDFPageEmbedder.js
var require_PDFPageEmbedder = __commonJS({
  "node_modules/pdf-lib/cjs/core/embedders/PDFPageEmbedder.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var errors_1 = require_errors2();
    var PDFNumber_1 = tslib_1.__importDefault(require_PDFNumber());
    var PDFRawStream_1 = tslib_1.__importDefault(require_PDFRawStream());
    var PDFStream_1 = tslib_1.__importDefault(require_PDFStream());
    var decode_1 = require_decode();
    var PDFContentStream_1 = tslib_1.__importDefault(require_PDFContentStream());
    var CharCodes_1 = tslib_1.__importDefault(require_CharCodes());
    var utils_1 = require_utils2();
    var fullPageBoundingBox = function(page) {
      var mediaBox = page.MediaBox();
      var width = mediaBox.lookup(2, PDFNumber_1.default).asNumber() - mediaBox.lookup(0, PDFNumber_1.default).asNumber();
      var height = mediaBox.lookup(3, PDFNumber_1.default).asNumber() - mediaBox.lookup(1, PDFNumber_1.default).asNumber();
      return { left: 0, bottom: 0, right: width, top: height };
    };
    var boundingBoxAdjustedMatrix = function(bb) {
      return [1, 0, 0, 1, -bb.left, -bb.bottom];
    };
    var PDFPageEmbedder = (
      /** @class */
      (function() {
        function PDFPageEmbedder2(page, boundingBox, transformationMatrix) {
          this.page = page;
          var bb = boundingBox !== null && boundingBox !== void 0 ? boundingBox : fullPageBoundingBox(page);
          this.width = bb.right - bb.left;
          this.height = bb.top - bb.bottom;
          this.boundingBox = bb;
          this.transformationMatrix = transformationMatrix !== null && transformationMatrix !== void 0 ? transformationMatrix : boundingBoxAdjustedMatrix(bb);
        }
        PDFPageEmbedder2.for = function(page, boundingBox, transformationMatrix) {
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            return tslib_1.__generator(this, function(_a) {
              return [2, new PDFPageEmbedder2(page, boundingBox, transformationMatrix)];
            });
          });
        };
        PDFPageEmbedder2.prototype.embedIntoContext = function(context, ref) {
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            var _a, Contents, Resources, decodedContents, _b, left, bottom, right, top, xObject;
            return tslib_1.__generator(this, function(_c) {
              _a = this.page.normalizedEntries(), Contents = _a.Contents, Resources = _a.Resources;
              if (!Contents)
                throw new errors_1.MissingPageContentsEmbeddingError();
              decodedContents = this.decodeContents(Contents);
              _b = this.boundingBox, left = _b.left, bottom = _b.bottom, right = _b.right, top = _b.top;
              xObject = context.flateStream(decodedContents, {
                Type: "XObject",
                Subtype: "Form",
                FormType: 1,
                BBox: [left, bottom, right, top],
                Matrix: this.transformationMatrix,
                Resources
              });
              if (ref) {
                context.assign(ref, xObject);
                return [2, ref];
              } else {
                return [2, context.register(xObject)];
              }
              return [
                2
                /*return*/
              ];
            });
          });
        };
        PDFPageEmbedder2.prototype.decodeContents = function(contents) {
          var newline = Uint8Array.of(CharCodes_1.default.Newline);
          var decodedContents = [];
          for (var idx = 0, len = contents.size(); idx < len; idx++) {
            var stream = contents.lookup(idx, PDFStream_1.default);
            var content = void 0;
            if (stream instanceof PDFRawStream_1.default) {
              content = decode_1.decodePDFRawStream(stream).decode();
            } else if (stream instanceof PDFContentStream_1.default) {
              content = stream.getUnencodedContents();
            } else {
              throw new errors_1.UnrecognizedStreamTypeError(stream);
            }
            decodedContents.push(content, newline);
          }
          return utils_1.mergeIntoTypedArray.apply(void 0, decodedContents);
        };
        return PDFPageEmbedder2;
      })()
    );
    exports.default = PDFPageEmbedder;
  }
});

// node_modules/pdf-lib/cjs/core/interactive/ViewerPreferences.js
var require_ViewerPreferences = __commonJS({
  "node_modules/pdf-lib/cjs/core/interactive/ViewerPreferences.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Duplex = exports.PrintScaling = exports.ReadingDirection = exports.NonFullScreenPageMode = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFArray_1 = tslib_1.__importDefault(require_PDFArray());
    var PDFBool_1 = tslib_1.__importDefault(require_PDFBool());
    var PDFName_1 = tslib_1.__importDefault(require_PDFName());
    var PDFNumber_1 = tslib_1.__importDefault(require_PDFNumber());
    var utils_1 = require_utils2();
    var asEnum = function(rawValue, enumType) {
      if (rawValue === void 0)
        return void 0;
      return enumType[rawValue];
    };
    var NonFullScreenPageMode;
    (function(NonFullScreenPageMode2) {
      NonFullScreenPageMode2["UseNone"] = "UseNone";
      NonFullScreenPageMode2["UseOutlines"] = "UseOutlines";
      NonFullScreenPageMode2["UseThumbs"] = "UseThumbs";
      NonFullScreenPageMode2["UseOC"] = "UseOC";
    })(NonFullScreenPageMode = exports.NonFullScreenPageMode || (exports.NonFullScreenPageMode = {}));
    var ReadingDirection;
    (function(ReadingDirection2) {
      ReadingDirection2["L2R"] = "L2R";
      ReadingDirection2["R2L"] = "R2L";
    })(ReadingDirection = exports.ReadingDirection || (exports.ReadingDirection = {}));
    var PrintScaling;
    (function(PrintScaling2) {
      PrintScaling2["None"] = "None";
      PrintScaling2["AppDefault"] = "AppDefault";
    })(PrintScaling = exports.PrintScaling || (exports.PrintScaling = {}));
    var Duplex;
    (function(Duplex2) {
      Duplex2["Simplex"] = "Simplex";
      Duplex2["DuplexFlipShortEdge"] = "DuplexFlipShortEdge";
      Duplex2["DuplexFlipLongEdge"] = "DuplexFlipLongEdge";
    })(Duplex = exports.Duplex || (exports.Duplex = {}));
    var ViewerPreferences = (
      /** @class */
      (function() {
        function ViewerPreferences2(dict) {
          this.dict = dict;
        }
        ViewerPreferences2.prototype.lookupBool = function(key) {
          var returnObj = this.dict.lookup(PDFName_1.default.of(key));
          if (returnObj instanceof PDFBool_1.default)
            return returnObj;
          return void 0;
        };
        ViewerPreferences2.prototype.lookupName = function(key) {
          var returnObj = this.dict.lookup(PDFName_1.default.of(key));
          if (returnObj instanceof PDFName_1.default)
            return returnObj;
          return void 0;
        };
        ViewerPreferences2.prototype.HideToolbar = function() {
          return this.lookupBool("HideToolbar");
        };
        ViewerPreferences2.prototype.HideMenubar = function() {
          return this.lookupBool("HideMenubar");
        };
        ViewerPreferences2.prototype.HideWindowUI = function() {
          return this.lookupBool("HideWindowUI");
        };
        ViewerPreferences2.prototype.FitWindow = function() {
          return this.lookupBool("FitWindow");
        };
        ViewerPreferences2.prototype.CenterWindow = function() {
          return this.lookupBool("CenterWindow");
        };
        ViewerPreferences2.prototype.DisplayDocTitle = function() {
          return this.lookupBool("DisplayDocTitle");
        };
        ViewerPreferences2.prototype.NonFullScreenPageMode = function() {
          return this.lookupName("NonFullScreenPageMode");
        };
        ViewerPreferences2.prototype.Direction = function() {
          return this.lookupName("Direction");
        };
        ViewerPreferences2.prototype.PrintScaling = function() {
          return this.lookupName("PrintScaling");
        };
        ViewerPreferences2.prototype.Duplex = function() {
          return this.lookupName("Duplex");
        };
        ViewerPreferences2.prototype.PickTrayByPDFSize = function() {
          return this.lookupBool("PickTrayByPDFSize");
        };
        ViewerPreferences2.prototype.PrintPageRange = function() {
          var PrintPageRange = this.dict.lookup(PDFName_1.default.of("PrintPageRange"));
          if (PrintPageRange instanceof PDFArray_1.default)
            return PrintPageRange;
          return void 0;
        };
        ViewerPreferences2.prototype.NumCopies = function() {
          var NumCopies = this.dict.lookup(PDFName_1.default.of("NumCopies"));
          if (NumCopies instanceof PDFNumber_1.default)
            return NumCopies;
          return void 0;
        };
        ViewerPreferences2.prototype.getHideToolbar = function() {
          var _a, _b;
          return (_b = (_a = this.HideToolbar()) === null || _a === void 0 ? void 0 : _a.asBoolean()) !== null && _b !== void 0 ? _b : false;
        };
        ViewerPreferences2.prototype.getHideMenubar = function() {
          var _a, _b;
          return (_b = (_a = this.HideMenubar()) === null || _a === void 0 ? void 0 : _a.asBoolean()) !== null && _b !== void 0 ? _b : false;
        };
        ViewerPreferences2.prototype.getHideWindowUI = function() {
          var _a, _b;
          return (_b = (_a = this.HideWindowUI()) === null || _a === void 0 ? void 0 : _a.asBoolean()) !== null && _b !== void 0 ? _b : false;
        };
        ViewerPreferences2.prototype.getFitWindow = function() {
          var _a, _b;
          return (_b = (_a = this.FitWindow()) === null || _a === void 0 ? void 0 : _a.asBoolean()) !== null && _b !== void 0 ? _b : false;
        };
        ViewerPreferences2.prototype.getCenterWindow = function() {
          var _a, _b;
          return (_b = (_a = this.CenterWindow()) === null || _a === void 0 ? void 0 : _a.asBoolean()) !== null && _b !== void 0 ? _b : false;
        };
        ViewerPreferences2.prototype.getDisplayDocTitle = function() {
          var _a, _b;
          return (_b = (_a = this.DisplayDocTitle()) === null || _a === void 0 ? void 0 : _a.asBoolean()) !== null && _b !== void 0 ? _b : false;
        };
        ViewerPreferences2.prototype.getNonFullScreenPageMode = function() {
          var _a, _b;
          var mode = (_a = this.NonFullScreenPageMode()) === null || _a === void 0 ? void 0 : _a.decodeText();
          return (_b = asEnum(mode, NonFullScreenPageMode)) !== null && _b !== void 0 ? _b : NonFullScreenPageMode.UseNone;
        };
        ViewerPreferences2.prototype.getReadingDirection = function() {
          var _a, _b;
          var direction = (_a = this.Direction()) === null || _a === void 0 ? void 0 : _a.decodeText();
          return (_b = asEnum(direction, ReadingDirection)) !== null && _b !== void 0 ? _b : ReadingDirection.L2R;
        };
        ViewerPreferences2.prototype.getPrintScaling = function() {
          var _a, _b;
          var scaling = (_a = this.PrintScaling()) === null || _a === void 0 ? void 0 : _a.decodeText();
          return (_b = asEnum(scaling, PrintScaling)) !== null && _b !== void 0 ? _b : PrintScaling.AppDefault;
        };
        ViewerPreferences2.prototype.getDuplex = function() {
          var _a;
          var duplex = (_a = this.Duplex()) === null || _a === void 0 ? void 0 : _a.decodeText();
          return asEnum(duplex, Duplex);
        };
        ViewerPreferences2.prototype.getPickTrayByPDFSize = function() {
          var _a;
          return (_a = this.PickTrayByPDFSize()) === null || _a === void 0 ? void 0 : _a.asBoolean();
        };
        ViewerPreferences2.prototype.getPrintPageRange = function() {
          var rng = this.PrintPageRange();
          if (!rng)
            return [];
          var pageRanges = [];
          for (var i = 0; i < rng.size(); i += 2) {
            var start = rng.lookup(i, PDFNumber_1.default).asNumber();
            var end = rng.lookup(i + 1, PDFNumber_1.default).asNumber();
            pageRanges.push({ start, end });
          }
          return pageRanges;
        };
        ViewerPreferences2.prototype.getNumCopies = function() {
          var _a, _b;
          return (_b = (_a = this.NumCopies()) === null || _a === void 0 ? void 0 : _a.asNumber()) !== null && _b !== void 0 ? _b : 1;
        };
        ViewerPreferences2.prototype.setHideToolbar = function(hideToolbar) {
          var HideToolbar = this.dict.context.obj(hideToolbar);
          this.dict.set(PDFName_1.default.of("HideToolbar"), HideToolbar);
        };
        ViewerPreferences2.prototype.setHideMenubar = function(hideMenubar) {
          var HideMenubar = this.dict.context.obj(hideMenubar);
          this.dict.set(PDFName_1.default.of("HideMenubar"), HideMenubar);
        };
        ViewerPreferences2.prototype.setHideWindowUI = function(hideWindowUI) {
          var HideWindowUI = this.dict.context.obj(hideWindowUI);
          this.dict.set(PDFName_1.default.of("HideWindowUI"), HideWindowUI);
        };
        ViewerPreferences2.prototype.setFitWindow = function(fitWindow) {
          var FitWindow = this.dict.context.obj(fitWindow);
          this.dict.set(PDFName_1.default.of("FitWindow"), FitWindow);
        };
        ViewerPreferences2.prototype.setCenterWindow = function(centerWindow) {
          var CenterWindow = this.dict.context.obj(centerWindow);
          this.dict.set(PDFName_1.default.of("CenterWindow"), CenterWindow);
        };
        ViewerPreferences2.prototype.setDisplayDocTitle = function(displayTitle) {
          var DisplayDocTitle = this.dict.context.obj(displayTitle);
          this.dict.set(PDFName_1.default.of("DisplayDocTitle"), DisplayDocTitle);
        };
        ViewerPreferences2.prototype.setNonFullScreenPageMode = function(nonFullScreenPageMode) {
          utils_1.assertIsOneOf(nonFullScreenPageMode, "nonFullScreenPageMode", NonFullScreenPageMode);
          var mode = PDFName_1.default.of(nonFullScreenPageMode);
          this.dict.set(PDFName_1.default.of("NonFullScreenPageMode"), mode);
        };
        ViewerPreferences2.prototype.setReadingDirection = function(readingDirection) {
          utils_1.assertIsOneOf(readingDirection, "readingDirection", ReadingDirection);
          var direction = PDFName_1.default.of(readingDirection);
          this.dict.set(PDFName_1.default.of("Direction"), direction);
        };
        ViewerPreferences2.prototype.setPrintScaling = function(printScaling) {
          utils_1.assertIsOneOf(printScaling, "printScaling", PrintScaling);
          var scaling = PDFName_1.default.of(printScaling);
          this.dict.set(PDFName_1.default.of("PrintScaling"), scaling);
        };
        ViewerPreferences2.prototype.setDuplex = function(duplex) {
          utils_1.assertIsOneOf(duplex, "duplex", Duplex);
          var dup = PDFName_1.default.of(duplex);
          this.dict.set(PDFName_1.default.of("Duplex"), dup);
        };
        ViewerPreferences2.prototype.setPickTrayByPDFSize = function(pickTrayByPDFSize) {
          var PickTrayByPDFSize = this.dict.context.obj(pickTrayByPDFSize);
          this.dict.set(PDFName_1.default.of("PickTrayByPDFSize"), PickTrayByPDFSize);
        };
        ViewerPreferences2.prototype.setPrintPageRange = function(printPageRange) {
          if (!Array.isArray(printPageRange))
            printPageRange = [printPageRange];
          var flatRange = [];
          for (var idx = 0, len = printPageRange.length; idx < len; idx++) {
            flatRange.push(printPageRange[idx].start);
            flatRange.push(printPageRange[idx].end);
          }
          utils_1.assertEachIs(flatRange, "printPageRange", ["number"]);
          var pageRanges = this.dict.context.obj(flatRange);
          this.dict.set(PDFName_1.default.of("PrintPageRange"), pageRanges);
        };
        ViewerPreferences2.prototype.setNumCopies = function(numCopies) {
          utils_1.assertRange(numCopies, "numCopies", 1, Number.MAX_VALUE);
          utils_1.assertInteger(numCopies, "numCopies");
          var NumCopies = this.dict.context.obj(numCopies);
          this.dict.set(PDFName_1.default.of("NumCopies"), NumCopies);
        };
        ViewerPreferences2.fromDict = function(dict) {
          return new ViewerPreferences2(dict);
        };
        ViewerPreferences2.create = function(context) {
          var dict = context.obj({});
          return new ViewerPreferences2(dict);
        };
        return ViewerPreferences2;
      })()
    );
    exports.default = ViewerPreferences;
  }
});

// node_modules/pdf-lib/cjs/core/acroform/PDFAcroField.js
var require_PDFAcroField = __commonJS({
  "node_modules/pdf-lib/cjs/core/acroform/PDFAcroField.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFDict_1 = tslib_1.__importDefault(require_PDFDict());
    var PDFString_1 = tslib_1.__importDefault(require_PDFString());
    var PDFHexString_1 = tslib_1.__importDefault(require_PDFHexString());
    var PDFName_1 = tslib_1.__importDefault(require_PDFName());
    var PDFNumber_1 = tslib_1.__importDefault(require_PDFNumber());
    var PDFArray_1 = tslib_1.__importDefault(require_PDFArray());
    var PDFRef_1 = tslib_1.__importDefault(require_PDFRef());
    var utils_1 = require_utils2();
    var errors_1 = require_errors2();
    var tfRegex = /\/([^\0\t\n\f\r\ ]+)[\0\t\n\f\r\ ]*(\d*\.\d+|\d+)?[\0\t\n\f\r\ ]+Tf/;
    var PDFAcroField = (
      /** @class */
      (function() {
        function PDFAcroField2(dict, ref) {
          this.dict = dict;
          this.ref = ref;
        }
        PDFAcroField2.prototype.T = function() {
          return this.dict.lookupMaybe(PDFName_1.default.of("T"), PDFString_1.default, PDFHexString_1.default);
        };
        PDFAcroField2.prototype.Ff = function() {
          var numberOrRef = this.getInheritableAttribute(PDFName_1.default.of("Ff"));
          return this.dict.context.lookupMaybe(numberOrRef, PDFNumber_1.default);
        };
        PDFAcroField2.prototype.V = function() {
          var valueOrRef = this.getInheritableAttribute(PDFName_1.default.of("V"));
          return this.dict.context.lookup(valueOrRef);
        };
        PDFAcroField2.prototype.Kids = function() {
          return this.dict.lookupMaybe(PDFName_1.default.of("Kids"), PDFArray_1.default);
        };
        PDFAcroField2.prototype.DA = function() {
          var da = this.dict.lookup(PDFName_1.default.of("DA"));
          if (da instanceof PDFString_1.default || da instanceof PDFHexString_1.default)
            return da;
          return void 0;
        };
        PDFAcroField2.prototype.setKids = function(kids) {
          this.dict.set(PDFName_1.default.of("Kids"), this.dict.context.obj(kids));
        };
        PDFAcroField2.prototype.getParent = function() {
          var parentRef = this.dict.get(PDFName_1.default.of("Parent"));
          if (parentRef instanceof PDFRef_1.default) {
            var parent_1 = this.dict.lookup(PDFName_1.default.of("Parent"), PDFDict_1.default);
            return new PDFAcroField2(parent_1, parentRef);
          }
          return void 0;
        };
        PDFAcroField2.prototype.setParent = function(parent) {
          if (!parent)
            this.dict.delete(PDFName_1.default.of("Parent"));
          else
            this.dict.set(PDFName_1.default.of("Parent"), parent);
        };
        PDFAcroField2.prototype.getFullyQualifiedName = function() {
          var parent = this.getParent();
          if (!parent)
            return this.getPartialName();
          return parent.getFullyQualifiedName() + "." + this.getPartialName();
        };
        PDFAcroField2.prototype.getPartialName = function() {
          var _a;
          return (_a = this.T()) === null || _a === void 0 ? void 0 : _a.decodeText();
        };
        PDFAcroField2.prototype.setPartialName = function(partialName) {
          if (!partialName)
            this.dict.delete(PDFName_1.default.of("T"));
          else
            this.dict.set(PDFName_1.default.of("T"), PDFHexString_1.default.fromText(partialName));
        };
        PDFAcroField2.prototype.setDefaultAppearance = function(appearance) {
          this.dict.set(PDFName_1.default.of("DA"), PDFString_1.default.of(appearance));
        };
        PDFAcroField2.prototype.getDefaultAppearance = function() {
          var DA = this.DA();
          if (DA instanceof PDFHexString_1.default) {
            return DA.decodeText();
          }
          return DA === null || DA === void 0 ? void 0 : DA.asString();
        };
        PDFAcroField2.prototype.setFontSize = function(fontSize) {
          var _a;
          var name = (_a = this.getFullyQualifiedName()) !== null && _a !== void 0 ? _a : "";
          var da = this.getDefaultAppearance();
          if (!da)
            throw new errors_1.MissingDAEntryError(name);
          var daMatch = utils_1.findLastMatch(da, tfRegex);
          if (!daMatch.match)
            throw new errors_1.MissingTfOperatorError(name);
          var daStart = da.slice(0, daMatch.pos - daMatch.match[0].length);
          var daEnd = daMatch.pos <= da.length ? da.slice(daMatch.pos) : "";
          var fontName = daMatch.match[1];
          var modifiedDa = daStart + " /" + fontName + " " + fontSize + " Tf " + daEnd;
          this.setDefaultAppearance(modifiedDa);
        };
        PDFAcroField2.prototype.getFlags = function() {
          var _a, _b;
          return (_b = (_a = this.Ff()) === null || _a === void 0 ? void 0 : _a.asNumber()) !== null && _b !== void 0 ? _b : 0;
        };
        PDFAcroField2.prototype.setFlags = function(flags) {
          this.dict.set(PDFName_1.default.of("Ff"), PDFNumber_1.default.of(flags));
        };
        PDFAcroField2.prototype.hasFlag = function(flag) {
          var flags = this.getFlags();
          return (flags & flag) !== 0;
        };
        PDFAcroField2.prototype.setFlag = function(flag) {
          var flags = this.getFlags();
          this.setFlags(flags | flag);
        };
        PDFAcroField2.prototype.clearFlag = function(flag) {
          var flags = this.getFlags();
          this.setFlags(flags & ~flag);
        };
        PDFAcroField2.prototype.setFlagTo = function(flag, enable) {
          if (enable)
            this.setFlag(flag);
          else
            this.clearFlag(flag);
        };
        PDFAcroField2.prototype.getInheritableAttribute = function(name) {
          var attribute;
          this.ascend(function(node) {
            if (!attribute)
              attribute = node.dict.get(name);
          });
          return attribute;
        };
        PDFAcroField2.prototype.ascend = function(visitor) {
          visitor(this);
          var parent = this.getParent();
          if (parent)
            parent.ascend(visitor);
        };
        return PDFAcroField2;
      })()
    );
    exports.default = PDFAcroField;
  }
});

// node_modules/pdf-lib/cjs/core/annotation/BorderStyle.js
var require_BorderStyle = __commonJS({
  "node_modules/pdf-lib/cjs/core/annotation/BorderStyle.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFName_1 = tslib_1.__importDefault(require_PDFName());
    var PDFNumber_1 = tslib_1.__importDefault(require_PDFNumber());
    var BorderStyle = (
      /** @class */
      (function() {
        function BorderStyle2(dict) {
          this.dict = dict;
        }
        BorderStyle2.prototype.W = function() {
          var W = this.dict.lookup(PDFName_1.default.of("W"));
          if (W instanceof PDFNumber_1.default)
            return W;
          return void 0;
        };
        BorderStyle2.prototype.getWidth = function() {
          var _a, _b;
          return (_b = (_a = this.W()) === null || _a === void 0 ? void 0 : _a.asNumber()) !== null && _b !== void 0 ? _b : 1;
        };
        BorderStyle2.prototype.setWidth = function(width) {
          var W = this.dict.context.obj(width);
          this.dict.set(PDFName_1.default.of("W"), W);
        };
        BorderStyle2.fromDict = function(dict) {
          return new BorderStyle2(dict);
        };
        return BorderStyle2;
      })()
    );
    exports.default = BorderStyle;
  }
});

// node_modules/pdf-lib/cjs/core/annotation/PDFAnnotation.js
var require_PDFAnnotation = __commonJS({
  "node_modules/pdf-lib/cjs/core/annotation/PDFAnnotation.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFDict_1 = tslib_1.__importDefault(require_PDFDict());
    var PDFName_1 = tslib_1.__importDefault(require_PDFName());
    var PDFStream_1 = tslib_1.__importDefault(require_PDFStream());
    var PDFArray_1 = tslib_1.__importDefault(require_PDFArray());
    var PDFRef_1 = tslib_1.__importDefault(require_PDFRef());
    var PDFNumber_1 = tslib_1.__importDefault(require_PDFNumber());
    var PDFAnnotation = (
      /** @class */
      (function() {
        function PDFAnnotation2(dict) {
          this.dict = dict;
        }
        PDFAnnotation2.prototype.Rect = function() {
          return this.dict.lookup(PDFName_1.default.of("Rect"), PDFArray_1.default);
        };
        PDFAnnotation2.prototype.AP = function() {
          return this.dict.lookupMaybe(PDFName_1.default.of("AP"), PDFDict_1.default);
        };
        PDFAnnotation2.prototype.F = function() {
          var numberOrRef = this.dict.lookup(PDFName_1.default.of("F"));
          return this.dict.context.lookupMaybe(numberOrRef, PDFNumber_1.default);
        };
        PDFAnnotation2.prototype.getRectangle = function() {
          var _a;
          var Rect = this.Rect();
          return (_a = Rect === null || Rect === void 0 ? void 0 : Rect.asRectangle()) !== null && _a !== void 0 ? _a : { x: 0, y: 0, width: 0, height: 0 };
        };
        PDFAnnotation2.prototype.setRectangle = function(rect) {
          var x = rect.x, y = rect.y, width = rect.width, height = rect.height;
          var Rect = this.dict.context.obj([x, y, x + width, y + height]);
          this.dict.set(PDFName_1.default.of("Rect"), Rect);
        };
        PDFAnnotation2.prototype.getAppearanceState = function() {
          var AS = this.dict.lookup(PDFName_1.default.of("AS"));
          if (AS instanceof PDFName_1.default)
            return AS;
          return void 0;
        };
        PDFAnnotation2.prototype.setAppearanceState = function(state) {
          this.dict.set(PDFName_1.default.of("AS"), state);
        };
        PDFAnnotation2.prototype.setAppearances = function(appearances) {
          this.dict.set(PDFName_1.default.of("AP"), appearances);
        };
        PDFAnnotation2.prototype.ensureAP = function() {
          var AP = this.AP();
          if (!AP) {
            AP = this.dict.context.obj({});
            this.dict.set(PDFName_1.default.of("AP"), AP);
          }
          return AP;
        };
        PDFAnnotation2.prototype.getNormalAppearance = function() {
          var AP = this.ensureAP();
          var N = AP.get(PDFName_1.default.of("N"));
          if (N instanceof PDFRef_1.default || N instanceof PDFDict_1.default)
            return N;
          throw new Error("Unexpected N type: " + (N === null || N === void 0 ? void 0 : N.constructor.name));
        };
        PDFAnnotation2.prototype.setNormalAppearance = function(appearance) {
          var AP = this.ensureAP();
          AP.set(PDFName_1.default.of("N"), appearance);
        };
        PDFAnnotation2.prototype.setRolloverAppearance = function(appearance) {
          var AP = this.ensureAP();
          AP.set(PDFName_1.default.of("R"), appearance);
        };
        PDFAnnotation2.prototype.setDownAppearance = function(appearance) {
          var AP = this.ensureAP();
          AP.set(PDFName_1.default.of("D"), appearance);
        };
        PDFAnnotation2.prototype.removeRolloverAppearance = function() {
          var AP = this.AP();
          AP === null || AP === void 0 ? void 0 : AP.delete(PDFName_1.default.of("R"));
        };
        PDFAnnotation2.prototype.removeDownAppearance = function() {
          var AP = this.AP();
          AP === null || AP === void 0 ? void 0 : AP.delete(PDFName_1.default.of("D"));
        };
        PDFAnnotation2.prototype.getAppearances = function() {
          var AP = this.AP();
          if (!AP)
            return void 0;
          var N = AP.lookup(PDFName_1.default.of("N"), PDFDict_1.default, PDFStream_1.default);
          var R = AP.lookupMaybe(PDFName_1.default.of("R"), PDFDict_1.default, PDFStream_1.default);
          var D = AP.lookupMaybe(PDFName_1.default.of("D"), PDFDict_1.default, PDFStream_1.default);
          return { normal: N, rollover: R, down: D };
        };
        PDFAnnotation2.prototype.getFlags = function() {
          var _a, _b;
          return (_b = (_a = this.F()) === null || _a === void 0 ? void 0 : _a.asNumber()) !== null && _b !== void 0 ? _b : 0;
        };
        PDFAnnotation2.prototype.setFlags = function(flags) {
          this.dict.set(PDFName_1.default.of("F"), PDFNumber_1.default.of(flags));
        };
        PDFAnnotation2.prototype.hasFlag = function(flag) {
          var flags = this.getFlags();
          return (flags & flag) !== 0;
        };
        PDFAnnotation2.prototype.setFlag = function(flag) {
          var flags = this.getFlags();
          this.setFlags(flags | flag);
        };
        PDFAnnotation2.prototype.clearFlag = function(flag) {
          var flags = this.getFlags();
          this.setFlags(flags & ~flag);
        };
        PDFAnnotation2.prototype.setFlagTo = function(flag, enable) {
          if (enable)
            this.setFlag(flag);
          else
            this.clearFlag(flag);
        };
        PDFAnnotation2.fromDict = function(dict) {
          return new PDFAnnotation2(dict);
        };
        return PDFAnnotation2;
      })()
    );
    exports.default = PDFAnnotation;
  }
});

// node_modules/pdf-lib/cjs/core/annotation/AppearanceCharacteristics.js
var require_AppearanceCharacteristics = __commonJS({
  "node_modules/pdf-lib/cjs/core/annotation/AppearanceCharacteristics.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFName_1 = tslib_1.__importDefault(require_PDFName());
    var PDFNumber_1 = tslib_1.__importDefault(require_PDFNumber());
    var PDFArray_1 = tslib_1.__importDefault(require_PDFArray());
    var PDFHexString_1 = tslib_1.__importDefault(require_PDFHexString());
    var PDFString_1 = tslib_1.__importDefault(require_PDFString());
    var AppearanceCharacteristics = (
      /** @class */
      (function() {
        function AppearanceCharacteristics2(dict) {
          this.dict = dict;
        }
        AppearanceCharacteristics2.prototype.R = function() {
          var R = this.dict.lookup(PDFName_1.default.of("R"));
          if (R instanceof PDFNumber_1.default)
            return R;
          return void 0;
        };
        AppearanceCharacteristics2.prototype.BC = function() {
          var BC = this.dict.lookup(PDFName_1.default.of("BC"));
          if (BC instanceof PDFArray_1.default)
            return BC;
          return void 0;
        };
        AppearanceCharacteristics2.prototype.BG = function() {
          var BG = this.dict.lookup(PDFName_1.default.of("BG"));
          if (BG instanceof PDFArray_1.default)
            return BG;
          return void 0;
        };
        AppearanceCharacteristics2.prototype.CA = function() {
          var CA = this.dict.lookup(PDFName_1.default.of("CA"));
          if (CA instanceof PDFHexString_1.default || CA instanceof PDFString_1.default)
            return CA;
          return void 0;
        };
        AppearanceCharacteristics2.prototype.RC = function() {
          var RC = this.dict.lookup(PDFName_1.default.of("RC"));
          if (RC instanceof PDFHexString_1.default || RC instanceof PDFString_1.default)
            return RC;
          return void 0;
        };
        AppearanceCharacteristics2.prototype.AC = function() {
          var AC = this.dict.lookup(PDFName_1.default.of("AC"));
          if (AC instanceof PDFHexString_1.default || AC instanceof PDFString_1.default)
            return AC;
          return void 0;
        };
        AppearanceCharacteristics2.prototype.getRotation = function() {
          var _a;
          return (_a = this.R()) === null || _a === void 0 ? void 0 : _a.asNumber();
        };
        AppearanceCharacteristics2.prototype.getBorderColor = function() {
          var BC = this.BC();
          if (!BC)
            return void 0;
          var components = [];
          for (var idx = 0, len = BC === null || BC === void 0 ? void 0 : BC.size(); idx < len; idx++) {
            var component = BC.get(idx);
            if (component instanceof PDFNumber_1.default)
              components.push(component.asNumber());
          }
          return components;
        };
        AppearanceCharacteristics2.prototype.getBackgroundColor = function() {
          var BG = this.BG();
          if (!BG)
            return void 0;
          var components = [];
          for (var idx = 0, len = BG === null || BG === void 0 ? void 0 : BG.size(); idx < len; idx++) {
            var component = BG.get(idx);
            if (component instanceof PDFNumber_1.default)
              components.push(component.asNumber());
          }
          return components;
        };
        AppearanceCharacteristics2.prototype.getCaptions = function() {
          var CA = this.CA();
          var RC = this.RC();
          var AC = this.AC();
          return {
            normal: CA === null || CA === void 0 ? void 0 : CA.decodeText(),
            rollover: RC === null || RC === void 0 ? void 0 : RC.decodeText(),
            down: AC === null || AC === void 0 ? void 0 : AC.decodeText()
          };
        };
        AppearanceCharacteristics2.prototype.setRotation = function(rotation) {
          var R = this.dict.context.obj(rotation);
          this.dict.set(PDFName_1.default.of("R"), R);
        };
        AppearanceCharacteristics2.prototype.setBorderColor = function(color) {
          var BC = this.dict.context.obj(color);
          this.dict.set(PDFName_1.default.of("BC"), BC);
        };
        AppearanceCharacteristics2.prototype.setBackgroundColor = function(color) {
          var BG = this.dict.context.obj(color);
          this.dict.set(PDFName_1.default.of("BG"), BG);
        };
        AppearanceCharacteristics2.prototype.setCaptions = function(captions) {
          var CA = PDFHexString_1.default.fromText(captions.normal);
          this.dict.set(PDFName_1.default.of("CA"), CA);
          if (captions.rollover) {
            var RC = PDFHexString_1.default.fromText(captions.rollover);
            this.dict.set(PDFName_1.default.of("RC"), RC);
          } else {
            this.dict.delete(PDFName_1.default.of("RC"));
          }
          if (captions.down) {
            var AC = PDFHexString_1.default.fromText(captions.down);
            this.dict.set(PDFName_1.default.of("AC"), AC);
          } else {
            this.dict.delete(PDFName_1.default.of("AC"));
          }
        };
        AppearanceCharacteristics2.fromDict = function(dict) {
          return new AppearanceCharacteristics2(dict);
        };
        return AppearanceCharacteristics2;
      })()
    );
    exports.default = AppearanceCharacteristics;
  }
});

// node_modules/pdf-lib/cjs/core/annotation/PDFWidgetAnnotation.js
var require_PDFWidgetAnnotation = __commonJS({
  "node_modules/pdf-lib/cjs/core/annotation/PDFWidgetAnnotation.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFDict_1 = tslib_1.__importDefault(require_PDFDict());
    var PDFName_1 = tslib_1.__importDefault(require_PDFName());
    var PDFRef_1 = tslib_1.__importDefault(require_PDFRef());
    var PDFString_1 = tslib_1.__importDefault(require_PDFString());
    var PDFHexString_1 = tslib_1.__importDefault(require_PDFHexString());
    var BorderStyle_1 = tslib_1.__importDefault(require_BorderStyle());
    var PDFAnnotation_1 = tslib_1.__importDefault(require_PDFAnnotation());
    var AppearanceCharacteristics_1 = tslib_1.__importDefault(require_AppearanceCharacteristics());
    var PDFWidgetAnnotation = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PDFWidgetAnnotation2, _super);
        function PDFWidgetAnnotation2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        PDFWidgetAnnotation2.prototype.MK = function() {
          var MK = this.dict.lookup(PDFName_1.default.of("MK"));
          if (MK instanceof PDFDict_1.default)
            return MK;
          return void 0;
        };
        PDFWidgetAnnotation2.prototype.BS = function() {
          var BS = this.dict.lookup(PDFName_1.default.of("BS"));
          if (BS instanceof PDFDict_1.default)
            return BS;
          return void 0;
        };
        PDFWidgetAnnotation2.prototype.DA = function() {
          var da = this.dict.lookup(PDFName_1.default.of("DA"));
          if (da instanceof PDFString_1.default || da instanceof PDFHexString_1.default)
            return da;
          return void 0;
        };
        PDFWidgetAnnotation2.prototype.P = function() {
          var P = this.dict.get(PDFName_1.default.of("P"));
          if (P instanceof PDFRef_1.default)
            return P;
          return void 0;
        };
        PDFWidgetAnnotation2.prototype.setP = function(page) {
          this.dict.set(PDFName_1.default.of("P"), page);
        };
        PDFWidgetAnnotation2.prototype.setDefaultAppearance = function(appearance) {
          this.dict.set(PDFName_1.default.of("DA"), PDFString_1.default.of(appearance));
        };
        PDFWidgetAnnotation2.prototype.getDefaultAppearance = function() {
          var DA = this.DA();
          if (DA instanceof PDFHexString_1.default) {
            return DA.decodeText();
          }
          return DA === null || DA === void 0 ? void 0 : DA.asString();
        };
        PDFWidgetAnnotation2.prototype.getAppearanceCharacteristics = function() {
          var MK = this.MK();
          if (MK)
            return AppearanceCharacteristics_1.default.fromDict(MK);
          return void 0;
        };
        PDFWidgetAnnotation2.prototype.getOrCreateAppearanceCharacteristics = function() {
          var MK = this.MK();
          if (MK)
            return AppearanceCharacteristics_1.default.fromDict(MK);
          var ac = AppearanceCharacteristics_1.default.fromDict(this.dict.context.obj({}));
          this.dict.set(PDFName_1.default.of("MK"), ac.dict);
          return ac;
        };
        PDFWidgetAnnotation2.prototype.getBorderStyle = function() {
          var BS = this.BS();
          if (BS)
            return BorderStyle_1.default.fromDict(BS);
          return void 0;
        };
        PDFWidgetAnnotation2.prototype.getOrCreateBorderStyle = function() {
          var BS = this.BS();
          if (BS)
            return BorderStyle_1.default.fromDict(BS);
          var bs = BorderStyle_1.default.fromDict(this.dict.context.obj({}));
          this.dict.set(PDFName_1.default.of("BS"), bs.dict);
          return bs;
        };
        PDFWidgetAnnotation2.prototype.getOnValue = function() {
          var _a;
          var normal = (_a = this.getAppearances()) === null || _a === void 0 ? void 0 : _a.normal;
          if (normal instanceof PDFDict_1.default) {
            var keys = normal.keys();
            for (var idx = 0, len = keys.length; idx < len; idx++) {
              var key = keys[idx];
              if (key !== PDFName_1.default.of("Off"))
                return key;
            }
          }
          return void 0;
        };
        PDFWidgetAnnotation2.fromDict = function(dict) {
          return new PDFWidgetAnnotation2(dict);
        };
        PDFWidgetAnnotation2.create = function(context, parent) {
          var dict = context.obj({
            Type: "Annot",
            Subtype: "Widget",
            Rect: [0, 0, 0, 0],
            Parent: parent
          });
          return new PDFWidgetAnnotation2(dict);
        };
        return PDFWidgetAnnotation2;
      })(PDFAnnotation_1.default)
    );
    exports.default = PDFWidgetAnnotation;
  }
});

// node_modules/pdf-lib/cjs/core/acroform/PDFAcroTerminal.js
var require_PDFAcroTerminal = __commonJS({
  "node_modules/pdf-lib/cjs/core/acroform/PDFAcroTerminal.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFDict_1 = tslib_1.__importDefault(require_PDFDict());
    var PDFName_1 = tslib_1.__importDefault(require_PDFName());
    var PDFAcroField_1 = tslib_1.__importDefault(require_PDFAcroField());
    var PDFWidgetAnnotation_1 = tslib_1.__importDefault(require_PDFWidgetAnnotation());
    var errors_1 = require_errors2();
    var PDFAcroTerminal = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PDFAcroTerminal2, _super);
        function PDFAcroTerminal2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        PDFAcroTerminal2.prototype.FT = function() {
          var nameOrRef = this.getInheritableAttribute(PDFName_1.default.of("FT"));
          return this.dict.context.lookup(nameOrRef, PDFName_1.default);
        };
        PDFAcroTerminal2.prototype.getWidgets = function() {
          var kidDicts = this.Kids();
          if (!kidDicts)
            return [PDFWidgetAnnotation_1.default.fromDict(this.dict)];
          var widgets = new Array(kidDicts.size());
          for (var idx = 0, len = kidDicts.size(); idx < len; idx++) {
            var dict = kidDicts.lookup(idx, PDFDict_1.default);
            widgets[idx] = PDFWidgetAnnotation_1.default.fromDict(dict);
          }
          return widgets;
        };
        PDFAcroTerminal2.prototype.addWidget = function(ref) {
          var Kids = this.normalizedEntries().Kids;
          Kids.push(ref);
        };
        PDFAcroTerminal2.prototype.removeWidget = function(idx) {
          var kidDicts = this.Kids();
          if (!kidDicts) {
            if (idx !== 0)
              throw new errors_1.IndexOutOfBoundsError(idx, 0, 0);
            this.setKids([]);
          } else {
            if (idx < 0 || idx > kidDicts.size()) {
              throw new errors_1.IndexOutOfBoundsError(idx, 0, kidDicts.size());
            }
            kidDicts.remove(idx);
          }
        };
        PDFAcroTerminal2.prototype.normalizedEntries = function() {
          var Kids = this.Kids();
          if (!Kids) {
            Kids = this.dict.context.obj([this.ref]);
            this.dict.set(PDFName_1.default.of("Kids"), Kids);
          }
          return { Kids };
        };
        PDFAcroTerminal2.fromDict = function(dict, ref) {
          return new PDFAcroTerminal2(dict, ref);
        };
        return PDFAcroTerminal2;
      })(PDFAcroField_1.default)
    );
    exports.default = PDFAcroTerminal;
  }
});

// node_modules/pdf-lib/cjs/core/acroform/PDFAcroButton.js
var require_PDFAcroButton = __commonJS({
  "node_modules/pdf-lib/cjs/core/acroform/PDFAcroButton.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFString_1 = tslib_1.__importDefault(require_PDFString());
    var PDFHexString_1 = tslib_1.__importDefault(require_PDFHexString());
    var PDFArray_1 = tslib_1.__importDefault(require_PDFArray());
    var PDFName_1 = tslib_1.__importDefault(require_PDFName());
    var PDFAcroTerminal_1 = tslib_1.__importDefault(require_PDFAcroTerminal());
    var errors_1 = require_errors2();
    var PDFAcroButton = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PDFAcroButton2, _super);
        function PDFAcroButton2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        PDFAcroButton2.prototype.Opt = function() {
          return this.dict.lookupMaybe(PDFName_1.default.of("Opt"), PDFString_1.default, PDFHexString_1.default, PDFArray_1.default);
        };
        PDFAcroButton2.prototype.setOpt = function(opt) {
          this.dict.set(PDFName_1.default.of("Opt"), this.dict.context.obj(opt));
        };
        PDFAcroButton2.prototype.getExportValues = function() {
          var opt = this.Opt();
          if (!opt)
            return void 0;
          if (opt instanceof PDFString_1.default || opt instanceof PDFHexString_1.default) {
            return [opt];
          }
          var values = [];
          for (var idx = 0, len = opt.size(); idx < len; idx++) {
            var value = opt.lookup(idx);
            if (value instanceof PDFString_1.default || value instanceof PDFHexString_1.default) {
              values.push(value);
            }
          }
          return values;
        };
        PDFAcroButton2.prototype.removeExportValue = function(idx) {
          var opt = this.Opt();
          if (!opt)
            return;
          if (opt instanceof PDFString_1.default || opt instanceof PDFHexString_1.default) {
            if (idx !== 0)
              throw new errors_1.IndexOutOfBoundsError(idx, 0, 0);
            this.setOpt([]);
          } else {
            if (idx < 0 || idx > opt.size()) {
              throw new errors_1.IndexOutOfBoundsError(idx, 0, opt.size());
            }
            opt.remove(idx);
          }
        };
        PDFAcroButton2.prototype.normalizeExportValues = function() {
          var _a, _b, _c, _d;
          var exportValues = (_a = this.getExportValues()) !== null && _a !== void 0 ? _a : [];
          var Opt = [];
          var widgets = this.getWidgets();
          for (var idx = 0, len = widgets.length; idx < len; idx++) {
            var widget = widgets[idx];
            var exportVal = (_b = exportValues[idx]) !== null && _b !== void 0 ? _b : PDFHexString_1.default.fromText((_d = (_c = widget.getOnValue()) === null || _c === void 0 ? void 0 : _c.decodeText()) !== null && _d !== void 0 ? _d : "");
            Opt.push(exportVal);
          }
          this.setOpt(Opt);
        };
        PDFAcroButton2.prototype.addOpt = function(opt, useExistingOptIdx) {
          var _a;
          this.normalizeExportValues();
          var optText = opt.decodeText();
          var existingIdx;
          if (useExistingOptIdx) {
            var exportValues = (_a = this.getExportValues()) !== null && _a !== void 0 ? _a : [];
            for (var idx = 0, len = exportValues.length; idx < len; idx++) {
              var exportVal = exportValues[idx];
              if (exportVal.decodeText() === optText)
                existingIdx = idx;
            }
          }
          var Opt = this.Opt();
          Opt.push(opt);
          return existingIdx !== null && existingIdx !== void 0 ? existingIdx : Opt.size() - 1;
        };
        PDFAcroButton2.prototype.addWidgetWithOpt = function(widget, opt, useExistingOptIdx) {
          var optIdx = this.addOpt(opt, useExistingOptIdx);
          var apStateValue = PDFName_1.default.of(String(optIdx));
          this.addWidget(widget);
          return apStateValue;
        };
        return PDFAcroButton2;
      })(PDFAcroTerminal_1.default)
    );
    exports.default = PDFAcroButton;
  }
});

// node_modules/pdf-lib/cjs/core/acroform/PDFAcroCheckBox.js
var require_PDFAcroCheckBox = __commonJS({
  "node_modules/pdf-lib/cjs/core/acroform/PDFAcroCheckBox.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFName_1 = tslib_1.__importDefault(require_PDFName());
    var PDFAcroButton_1 = tslib_1.__importDefault(require_PDFAcroButton());
    var errors_1 = require_errors2();
    var PDFAcroCheckBox = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PDFAcroCheckBox2, _super);
        function PDFAcroCheckBox2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        PDFAcroCheckBox2.prototype.setValue = function(value) {
          var _a;
          var onValue = (_a = this.getOnValue()) !== null && _a !== void 0 ? _a : PDFName_1.default.of("Yes");
          if (value !== onValue && value !== PDFName_1.default.of("Off")) {
            throw new errors_1.InvalidAcroFieldValueError();
          }
          this.dict.set(PDFName_1.default.of("V"), value);
          var widgets = this.getWidgets();
          for (var idx = 0, len = widgets.length; idx < len; idx++) {
            var widget = widgets[idx];
            var state = widget.getOnValue() === value ? value : PDFName_1.default.of("Off");
            widget.setAppearanceState(state);
          }
        };
        PDFAcroCheckBox2.prototype.getValue = function() {
          var v = this.V();
          if (v instanceof PDFName_1.default)
            return v;
          return PDFName_1.default.of("Off");
        };
        PDFAcroCheckBox2.prototype.getOnValue = function() {
          var widget = this.getWidgets()[0];
          return widget === null || widget === void 0 ? void 0 : widget.getOnValue();
        };
        PDFAcroCheckBox2.fromDict = function(dict, ref) {
          return new PDFAcroCheckBox2(dict, ref);
        };
        PDFAcroCheckBox2.create = function(context) {
          var dict = context.obj({
            FT: "Btn",
            Kids: []
          });
          var ref = context.register(dict);
          return new PDFAcroCheckBox2(dict, ref);
        };
        return PDFAcroCheckBox2;
      })(PDFAcroButton_1.default)
    );
    exports.default = PDFAcroCheckBox;
  }
});

// node_modules/pdf-lib/cjs/core/acroform/flags.js
var require_flags = __commonJS({
  "node_modules/pdf-lib/cjs/core/acroform/flags.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AcroChoiceFlags = exports.AcroTextFlags = exports.AcroButtonFlags = exports.AcroFieldFlags = void 0;
    var flag = function(bitIndex) {
      return 1 << bitIndex;
    };
    var AcroFieldFlags;
    (function(AcroFieldFlags2) {
      AcroFieldFlags2[AcroFieldFlags2["ReadOnly"] = flag(1 - 1)] = "ReadOnly";
      AcroFieldFlags2[AcroFieldFlags2["Required"] = flag(2 - 1)] = "Required";
      AcroFieldFlags2[AcroFieldFlags2["NoExport"] = flag(3 - 1)] = "NoExport";
    })(AcroFieldFlags = exports.AcroFieldFlags || (exports.AcroFieldFlags = {}));
    var AcroButtonFlags;
    (function(AcroButtonFlags2) {
      AcroButtonFlags2[AcroButtonFlags2["NoToggleToOff"] = flag(15 - 1)] = "NoToggleToOff";
      AcroButtonFlags2[AcroButtonFlags2["Radio"] = flag(16 - 1)] = "Radio";
      AcroButtonFlags2[AcroButtonFlags2["PushButton"] = flag(17 - 1)] = "PushButton";
      AcroButtonFlags2[AcroButtonFlags2["RadiosInUnison"] = flag(26 - 1)] = "RadiosInUnison";
    })(AcroButtonFlags = exports.AcroButtonFlags || (exports.AcroButtonFlags = {}));
    var AcroTextFlags;
    (function(AcroTextFlags2) {
      AcroTextFlags2[AcroTextFlags2["Multiline"] = flag(13 - 1)] = "Multiline";
      AcroTextFlags2[AcroTextFlags2["Password"] = flag(14 - 1)] = "Password";
      AcroTextFlags2[AcroTextFlags2["FileSelect"] = flag(21 - 1)] = "FileSelect";
      AcroTextFlags2[AcroTextFlags2["DoNotSpellCheck"] = flag(23 - 1)] = "DoNotSpellCheck";
      AcroTextFlags2[AcroTextFlags2["DoNotScroll"] = flag(24 - 1)] = "DoNotScroll";
      AcroTextFlags2[AcroTextFlags2["Comb"] = flag(25 - 1)] = "Comb";
      AcroTextFlags2[AcroTextFlags2["RichText"] = flag(26 - 1)] = "RichText";
    })(AcroTextFlags = exports.AcroTextFlags || (exports.AcroTextFlags = {}));
    var AcroChoiceFlags;
    (function(AcroChoiceFlags2) {
      AcroChoiceFlags2[AcroChoiceFlags2["Combo"] = flag(18 - 1)] = "Combo";
      AcroChoiceFlags2[AcroChoiceFlags2["Edit"] = flag(19 - 1)] = "Edit";
      AcroChoiceFlags2[AcroChoiceFlags2["Sort"] = flag(20 - 1)] = "Sort";
      AcroChoiceFlags2[AcroChoiceFlags2["MultiSelect"] = flag(22 - 1)] = "MultiSelect";
      AcroChoiceFlags2[AcroChoiceFlags2["DoNotSpellCheck"] = flag(23 - 1)] = "DoNotSpellCheck";
      AcroChoiceFlags2[AcroChoiceFlags2["CommitOnSelChange"] = flag(27 - 1)] = "CommitOnSelChange";
    })(AcroChoiceFlags = exports.AcroChoiceFlags || (exports.AcroChoiceFlags = {}));
  }
});

// node_modules/pdf-lib/cjs/core/acroform/PDFAcroChoice.js
var require_PDFAcroChoice = __commonJS({
  "node_modules/pdf-lib/cjs/core/acroform/PDFAcroChoice.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFAcroTerminal_1 = tslib_1.__importDefault(require_PDFAcroTerminal());
    var PDFHexString_1 = tslib_1.__importDefault(require_PDFHexString());
    var PDFString_1 = tslib_1.__importDefault(require_PDFString());
    var PDFArray_1 = tslib_1.__importDefault(require_PDFArray());
    var PDFName_1 = tslib_1.__importDefault(require_PDFName());
    var flags_1 = require_flags();
    var errors_1 = require_errors2();
    var PDFAcroChoice = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PDFAcroChoice2, _super);
        function PDFAcroChoice2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        PDFAcroChoice2.prototype.setValues = function(values) {
          if (this.hasFlag(flags_1.AcroChoiceFlags.Combo) && !this.hasFlag(flags_1.AcroChoiceFlags.Edit) && !this.valuesAreValid(values)) {
            throw new errors_1.InvalidAcroFieldValueError();
          }
          if (values.length === 0) {
            this.dict.delete(PDFName_1.default.of("V"));
          }
          if (values.length === 1) {
            this.dict.set(PDFName_1.default.of("V"), values[0]);
          }
          if (values.length > 1) {
            if (!this.hasFlag(flags_1.AcroChoiceFlags.MultiSelect)) {
              throw new errors_1.MultiSelectValueError();
            }
            this.dict.set(PDFName_1.default.of("V"), this.dict.context.obj(values));
          }
          this.updateSelectedIndices(values);
        };
        PDFAcroChoice2.prototype.valuesAreValid = function(values) {
          var options = this.getOptions();
          var _loop_1 = function(idx2, len2) {
            var val = values[idx2].decodeText();
            if (!options.find(function(o) {
              return val === (o.display || o.value).decodeText();
            })) {
              return { value: false };
            }
          };
          for (var idx = 0, len = values.length; idx < len; idx++) {
            var state_1 = _loop_1(idx, len);
            if (typeof state_1 === "object")
              return state_1.value;
          }
          return true;
        };
        PDFAcroChoice2.prototype.updateSelectedIndices = function(values) {
          if (values.length > 1) {
            var indices = new Array(values.length);
            var options = this.getOptions();
            var _loop_2 = function(idx2, len2) {
              var val = values[idx2].decodeText();
              indices[idx2] = options.findIndex(function(o) {
                return val === (o.display || o.value).decodeText();
              });
            };
            for (var idx = 0, len = values.length; idx < len; idx++) {
              _loop_2(idx, len);
            }
            this.dict.set(PDFName_1.default.of("I"), this.dict.context.obj(indices.sort()));
          } else {
            this.dict.delete(PDFName_1.default.of("I"));
          }
        };
        PDFAcroChoice2.prototype.getValues = function() {
          var v = this.V();
          if (v instanceof PDFString_1.default || v instanceof PDFHexString_1.default)
            return [v];
          if (v instanceof PDFArray_1.default) {
            var values = [];
            for (var idx = 0, len = v.size(); idx < len; idx++) {
              var value = v.lookup(idx);
              if (value instanceof PDFString_1.default || value instanceof PDFHexString_1.default) {
                values.push(value);
              }
            }
            return values;
          }
          return [];
        };
        PDFAcroChoice2.prototype.Opt = function() {
          return this.dict.lookupMaybe(PDFName_1.default.of("Opt"), PDFString_1.default, PDFHexString_1.default, PDFArray_1.default);
        };
        PDFAcroChoice2.prototype.setOptions = function(options) {
          var newOpt = new Array(options.length);
          for (var idx = 0, len = options.length; idx < len; idx++) {
            var _a = options[idx], value = _a.value, display = _a.display;
            newOpt[idx] = this.dict.context.obj([value, display || value]);
          }
          this.dict.set(PDFName_1.default.of("Opt"), this.dict.context.obj(newOpt));
        };
        PDFAcroChoice2.prototype.getOptions = function() {
          var Opt = this.Opt();
          if (Opt instanceof PDFString_1.default || Opt instanceof PDFHexString_1.default) {
            return [{ value: Opt, display: Opt }];
          }
          if (Opt instanceof PDFArray_1.default) {
            var res = [];
            for (var idx = 0, len = Opt.size(); idx < len; idx++) {
              var item = Opt.lookup(idx);
              if (item instanceof PDFString_1.default || item instanceof PDFHexString_1.default) {
                res.push({ value: item, display: item });
              }
              if (item instanceof PDFArray_1.default) {
                if (item.size() > 0) {
                  var first = item.lookup(0, PDFString_1.default, PDFHexString_1.default);
                  var second = item.lookupMaybe(1, PDFString_1.default, PDFHexString_1.default);
                  res.push({ value: first, display: second || first });
                }
              }
            }
            return res;
          }
          return [];
        };
        return PDFAcroChoice2;
      })(PDFAcroTerminal_1.default)
    );
    exports.default = PDFAcroChoice;
  }
});

// node_modules/pdf-lib/cjs/core/acroform/PDFAcroComboBox.js
var require_PDFAcroComboBox = __commonJS({
  "node_modules/pdf-lib/cjs/core/acroform/PDFAcroComboBox.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFAcroChoice_1 = tslib_1.__importDefault(require_PDFAcroChoice());
    var flags_1 = require_flags();
    var PDFAcroComboBox = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PDFAcroComboBox2, _super);
        function PDFAcroComboBox2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        PDFAcroComboBox2.fromDict = function(dict, ref) {
          return new PDFAcroComboBox2(dict, ref);
        };
        PDFAcroComboBox2.create = function(context) {
          var dict = context.obj({
            FT: "Ch",
            Ff: flags_1.AcroChoiceFlags.Combo,
            Kids: []
          });
          var ref = context.register(dict);
          return new PDFAcroComboBox2(dict, ref);
        };
        return PDFAcroComboBox2;
      })(PDFAcroChoice_1.default)
    );
    exports.default = PDFAcroComboBox;
  }
});

// node_modules/pdf-lib/cjs/core/acroform/PDFAcroNonTerminal.js
var require_PDFAcroNonTerminal = __commonJS({
  "node_modules/pdf-lib/cjs/core/acroform/PDFAcroNonTerminal.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFName_1 = tslib_1.__importDefault(require_PDFName());
    var PDFAcroField_1 = tslib_1.__importDefault(require_PDFAcroField());
    var PDFAcroNonTerminal = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PDFAcroNonTerminal2, _super);
        function PDFAcroNonTerminal2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        PDFAcroNonTerminal2.prototype.addField = function(field) {
          var Kids = this.normalizedEntries().Kids;
          Kids === null || Kids === void 0 ? void 0 : Kids.push(field);
        };
        PDFAcroNonTerminal2.prototype.normalizedEntries = function() {
          var Kids = this.Kids();
          if (!Kids) {
            Kids = this.dict.context.obj([]);
            this.dict.set(PDFName_1.default.of("Kids"), Kids);
          }
          return { Kids };
        };
        PDFAcroNonTerminal2.fromDict = function(dict, ref) {
          return new PDFAcroNonTerminal2(dict, ref);
        };
        PDFAcroNonTerminal2.create = function(context) {
          var dict = context.obj({});
          var ref = context.register(dict);
          return new PDFAcroNonTerminal2(dict, ref);
        };
        return PDFAcroNonTerminal2;
      })(PDFAcroField_1.default)
    );
    exports.default = PDFAcroNonTerminal;
  }
});

// node_modules/pdf-lib/cjs/core/acroform/PDFAcroSignature.js
var require_PDFAcroSignature = __commonJS({
  "node_modules/pdf-lib/cjs/core/acroform/PDFAcroSignature.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFAcroTerminal_1 = tslib_1.__importDefault(require_PDFAcroTerminal());
    var PDFAcroSignature = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PDFAcroSignature2, _super);
        function PDFAcroSignature2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        PDFAcroSignature2.fromDict = function(dict, ref) {
          return new PDFAcroSignature2(dict, ref);
        };
        return PDFAcroSignature2;
      })(PDFAcroTerminal_1.default)
    );
    exports.default = PDFAcroSignature;
  }
});

// node_modules/pdf-lib/cjs/core/acroform/PDFAcroText.js
var require_PDFAcroText = __commonJS({
  "node_modules/pdf-lib/cjs/core/acroform/PDFAcroText.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFNumber_1 = tslib_1.__importDefault(require_PDFNumber());
    var PDFString_1 = tslib_1.__importDefault(require_PDFString());
    var PDFHexString_1 = tslib_1.__importDefault(require_PDFHexString());
    var PDFName_1 = tslib_1.__importDefault(require_PDFName());
    var PDFAcroTerminal_1 = tslib_1.__importDefault(require_PDFAcroTerminal());
    var PDFAcroText = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PDFAcroText2, _super);
        function PDFAcroText2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        PDFAcroText2.prototype.MaxLen = function() {
          var maxLen = this.dict.lookup(PDFName_1.default.of("MaxLen"));
          if (maxLen instanceof PDFNumber_1.default)
            return maxLen;
          return void 0;
        };
        PDFAcroText2.prototype.Q = function() {
          var q = this.dict.lookup(PDFName_1.default.of("Q"));
          if (q instanceof PDFNumber_1.default)
            return q;
          return void 0;
        };
        PDFAcroText2.prototype.setMaxLength = function(maxLength) {
          this.dict.set(PDFName_1.default.of("MaxLen"), PDFNumber_1.default.of(maxLength));
        };
        PDFAcroText2.prototype.removeMaxLength = function() {
          this.dict.delete(PDFName_1.default.of("MaxLen"));
        };
        PDFAcroText2.prototype.getMaxLength = function() {
          var _a;
          return (_a = this.MaxLen()) === null || _a === void 0 ? void 0 : _a.asNumber();
        };
        PDFAcroText2.prototype.setQuadding = function(quadding) {
          this.dict.set(PDFName_1.default.of("Q"), PDFNumber_1.default.of(quadding));
        };
        PDFAcroText2.prototype.getQuadding = function() {
          var _a;
          return (_a = this.Q()) === null || _a === void 0 ? void 0 : _a.asNumber();
        };
        PDFAcroText2.prototype.setValue = function(value) {
          this.dict.set(PDFName_1.default.of("V"), value);
        };
        PDFAcroText2.prototype.removeValue = function() {
          this.dict.delete(PDFName_1.default.of("V"));
        };
        PDFAcroText2.prototype.getValue = function() {
          var v = this.V();
          if (v instanceof PDFString_1.default || v instanceof PDFHexString_1.default)
            return v;
          return void 0;
        };
        PDFAcroText2.fromDict = function(dict, ref) {
          return new PDFAcroText2(dict, ref);
        };
        PDFAcroText2.create = function(context) {
          var dict = context.obj({
            FT: "Tx",
            Kids: []
          });
          var ref = context.register(dict);
          return new PDFAcroText2(dict, ref);
        };
        return PDFAcroText2;
      })(PDFAcroTerminal_1.default)
    );
    exports.default = PDFAcroText;
  }
});

// node_modules/pdf-lib/cjs/core/acroform/PDFAcroPushButton.js
var require_PDFAcroPushButton = __commonJS({
  "node_modules/pdf-lib/cjs/core/acroform/PDFAcroPushButton.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFAcroButton_1 = tslib_1.__importDefault(require_PDFAcroButton());
    var flags_1 = require_flags();
    var PDFAcroPushButton = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PDFAcroPushButton2, _super);
        function PDFAcroPushButton2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        PDFAcroPushButton2.fromDict = function(dict, ref) {
          return new PDFAcroPushButton2(dict, ref);
        };
        PDFAcroPushButton2.create = function(context) {
          var dict = context.obj({
            FT: "Btn",
            Ff: flags_1.AcroButtonFlags.PushButton,
            Kids: []
          });
          var ref = context.register(dict);
          return new PDFAcroPushButton2(dict, ref);
        };
        return PDFAcroPushButton2;
      })(PDFAcroButton_1.default)
    );
    exports.default = PDFAcroPushButton;
  }
});

// node_modules/pdf-lib/cjs/core/acroform/PDFAcroRadioButton.js
var require_PDFAcroRadioButton = __commonJS({
  "node_modules/pdf-lib/cjs/core/acroform/PDFAcroRadioButton.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFName_1 = tslib_1.__importDefault(require_PDFName());
    var PDFAcroButton_1 = tslib_1.__importDefault(require_PDFAcroButton());
    var flags_1 = require_flags();
    var errors_1 = require_errors2();
    var PDFAcroRadioButton = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PDFAcroRadioButton2, _super);
        function PDFAcroRadioButton2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        PDFAcroRadioButton2.prototype.setValue = function(value) {
          var onValues = this.getOnValues();
          if (!onValues.includes(value) && value !== PDFName_1.default.of("Off")) {
            throw new errors_1.InvalidAcroFieldValueError();
          }
          this.dict.set(PDFName_1.default.of("V"), value);
          var widgets = this.getWidgets();
          for (var idx = 0, len = widgets.length; idx < len; idx++) {
            var widget = widgets[idx];
            var state = widget.getOnValue() === value ? value : PDFName_1.default.of("Off");
            widget.setAppearanceState(state);
          }
        };
        PDFAcroRadioButton2.prototype.getValue = function() {
          var v = this.V();
          if (v instanceof PDFName_1.default)
            return v;
          return PDFName_1.default.of("Off");
        };
        PDFAcroRadioButton2.prototype.getOnValues = function() {
          var widgets = this.getWidgets();
          var onValues = [];
          for (var idx = 0, len = widgets.length; idx < len; idx++) {
            var onValue = widgets[idx].getOnValue();
            if (onValue)
              onValues.push(onValue);
          }
          return onValues;
        };
        PDFAcroRadioButton2.fromDict = function(dict, ref) {
          return new PDFAcroRadioButton2(dict, ref);
        };
        PDFAcroRadioButton2.create = function(context) {
          var dict = context.obj({
            FT: "Btn",
            Ff: flags_1.AcroButtonFlags.Radio,
            Kids: []
          });
          var ref = context.register(dict);
          return new PDFAcroRadioButton2(dict, ref);
        };
        return PDFAcroRadioButton2;
      })(PDFAcroButton_1.default)
    );
    exports.default = PDFAcroRadioButton;
  }
});

// node_modules/pdf-lib/cjs/core/acroform/PDFAcroListBox.js
var require_PDFAcroListBox = __commonJS({
  "node_modules/pdf-lib/cjs/core/acroform/PDFAcroListBox.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFAcroChoice_1 = tslib_1.__importDefault(require_PDFAcroChoice());
    var PDFAcroListBox = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PDFAcroListBox2, _super);
        function PDFAcroListBox2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        PDFAcroListBox2.fromDict = function(dict, ref) {
          return new PDFAcroListBox2(dict, ref);
        };
        PDFAcroListBox2.create = function(context) {
          var dict = context.obj({
            FT: "Ch",
            Kids: []
          });
          var ref = context.register(dict);
          return new PDFAcroListBox2(dict, ref);
        };
        return PDFAcroListBox2;
      })(PDFAcroChoice_1.default)
    );
    exports.default = PDFAcroListBox;
  }
});

// node_modules/pdf-lib/cjs/core/acroform/utils.js
var require_utils3 = __commonJS({
  "node_modules/pdf-lib/cjs/core/acroform/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createPDFAcroField = exports.createPDFAcroFields = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFNumber_1 = tslib_1.__importDefault(require_PDFNumber());
    var PDFDict_1 = tslib_1.__importDefault(require_PDFDict());
    var PDFName_1 = tslib_1.__importDefault(require_PDFName());
    var PDFArray_1 = tslib_1.__importDefault(require_PDFArray());
    var PDFRef_1 = tslib_1.__importDefault(require_PDFRef());
    var PDFAcroTerminal_1 = tslib_1.__importDefault(require_PDFAcroTerminal());
    var PDFAcroNonTerminal_1 = tslib_1.__importDefault(require_PDFAcroNonTerminal());
    var PDFAcroSignature_1 = tslib_1.__importDefault(require_PDFAcroSignature());
    var PDFAcroText_1 = tslib_1.__importDefault(require_PDFAcroText());
    var PDFAcroPushButton_1 = tslib_1.__importDefault(require_PDFAcroPushButton());
    var PDFAcroRadioButton_1 = tslib_1.__importDefault(require_PDFAcroRadioButton());
    var PDFAcroCheckBox_1 = tslib_1.__importDefault(require_PDFAcroCheckBox());
    var PDFAcroComboBox_1 = tslib_1.__importDefault(require_PDFAcroComboBox());
    var PDFAcroListBox_1 = tslib_1.__importDefault(require_PDFAcroListBox());
    var flags_1 = require_flags();
    exports.createPDFAcroFields = function(kidDicts) {
      if (!kidDicts)
        return [];
      var kids = [];
      for (var idx = 0, len = kidDicts.size(); idx < len; idx++) {
        var ref = kidDicts.get(idx);
        var dict = kidDicts.lookup(idx);
        if (ref instanceof PDFRef_1.default && dict instanceof PDFDict_1.default) {
          kids.push([exports.createPDFAcroField(dict, ref), ref]);
        }
      }
      return kids;
    };
    exports.createPDFAcroField = function(dict, ref) {
      var isNonTerminal = isNonTerminalAcroField(dict);
      if (isNonTerminal)
        return PDFAcroNonTerminal_1.default.fromDict(dict, ref);
      return createPDFAcroTerminal(dict, ref);
    };
    var isNonTerminalAcroField = function(dict) {
      var kids = dict.lookup(PDFName_1.default.of("Kids"));
      if (kids instanceof PDFArray_1.default) {
        for (var idx = 0, len = kids.size(); idx < len; idx++) {
          var kid = kids.lookup(idx);
          var kidIsField = kid instanceof PDFDict_1.default && kid.has(PDFName_1.default.of("T"));
          if (kidIsField)
            return true;
        }
      }
      return false;
    };
    var createPDFAcroTerminal = function(dict, ref) {
      var ftNameOrRef = getInheritableAttribute(dict, PDFName_1.default.of("FT"));
      var type = dict.context.lookup(ftNameOrRef, PDFName_1.default);
      if (type === PDFName_1.default.of("Btn"))
        return createPDFAcroButton(dict, ref);
      if (type === PDFName_1.default.of("Ch"))
        return createPDFAcroChoice(dict, ref);
      if (type === PDFName_1.default.of("Tx"))
        return PDFAcroText_1.default.fromDict(dict, ref);
      if (type === PDFName_1.default.of("Sig"))
        return PDFAcroSignature_1.default.fromDict(dict, ref);
      return PDFAcroTerminal_1.default.fromDict(dict, ref);
    };
    var createPDFAcroButton = function(dict, ref) {
      var _a;
      var ffNumberOrRef = getInheritableAttribute(dict, PDFName_1.default.of("Ff"));
      var ffNumber = dict.context.lookupMaybe(ffNumberOrRef, PDFNumber_1.default);
      var flags = (_a = ffNumber === null || ffNumber === void 0 ? void 0 : ffNumber.asNumber()) !== null && _a !== void 0 ? _a : 0;
      if (flagIsSet(flags, flags_1.AcroButtonFlags.PushButton)) {
        return PDFAcroPushButton_1.default.fromDict(dict, ref);
      } else if (flagIsSet(flags, flags_1.AcroButtonFlags.Radio)) {
        return PDFAcroRadioButton_1.default.fromDict(dict, ref);
      } else {
        return PDFAcroCheckBox_1.default.fromDict(dict, ref);
      }
    };
    var createPDFAcroChoice = function(dict, ref) {
      var _a;
      var ffNumberOrRef = getInheritableAttribute(dict, PDFName_1.default.of("Ff"));
      var ffNumber = dict.context.lookupMaybe(ffNumberOrRef, PDFNumber_1.default);
      var flags = (_a = ffNumber === null || ffNumber === void 0 ? void 0 : ffNumber.asNumber()) !== null && _a !== void 0 ? _a : 0;
      if (flagIsSet(flags, flags_1.AcroChoiceFlags.Combo)) {
        return PDFAcroComboBox_1.default.fromDict(dict, ref);
      } else {
        return PDFAcroListBox_1.default.fromDict(dict, ref);
      }
    };
    var flagIsSet = function(flags, flag) {
      return (flags & flag) !== 0;
    };
    var getInheritableAttribute = function(startNode, name) {
      var attribute;
      ascend(startNode, function(node) {
        if (!attribute)
          attribute = node.get(name);
      });
      return attribute;
    };
    var ascend = function(startNode, visitor) {
      visitor(startNode);
      var Parent = startNode.lookupMaybe(PDFName_1.default.of("Parent"), PDFDict_1.default);
      if (Parent)
        ascend(Parent, visitor);
    };
  }
});

// node_modules/pdf-lib/cjs/core/acroform/PDFAcroForm.js
var require_PDFAcroForm = __commonJS({
  "node_modules/pdf-lib/cjs/core/acroform/PDFAcroForm.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFDict_1 = tslib_1.__importDefault(require_PDFDict());
    var PDFArray_1 = tslib_1.__importDefault(require_PDFArray());
    var PDFName_1 = tslib_1.__importDefault(require_PDFName());
    var PDFAcroNonTerminal_1 = tslib_1.__importDefault(require_PDFAcroNonTerminal());
    var utils_1 = require_utils3();
    var PDFAcroForm = (
      /** @class */
      (function() {
        function PDFAcroForm2(dict) {
          this.dict = dict;
        }
        PDFAcroForm2.prototype.Fields = function() {
          var fields = this.dict.lookup(PDFName_1.default.of("Fields"));
          if (fields instanceof PDFArray_1.default)
            return fields;
          return void 0;
        };
        PDFAcroForm2.prototype.getFields = function() {
          var Fields = this.normalizedEntries().Fields;
          var fields = new Array(Fields.size());
          for (var idx = 0, len = Fields.size(); idx < len; idx++) {
            var ref = Fields.get(idx);
            var dict = Fields.lookup(idx, PDFDict_1.default);
            fields[idx] = [utils_1.createPDFAcroField(dict, ref), ref];
          }
          return fields;
        };
        PDFAcroForm2.prototype.getAllFields = function() {
          var allFields = [];
          var pushFields = function(fields) {
            if (!fields)
              return;
            for (var idx = 0, len = fields.length; idx < len; idx++) {
              var field = fields[idx];
              allFields.push(field);
              var fieldModel = field[0];
              if (fieldModel instanceof PDFAcroNonTerminal_1.default) {
                pushFields(utils_1.createPDFAcroFields(fieldModel.Kids()));
              }
            }
          };
          pushFields(this.getFields());
          return allFields;
        };
        PDFAcroForm2.prototype.addField = function(field) {
          var Fields = this.normalizedEntries().Fields;
          Fields === null || Fields === void 0 ? void 0 : Fields.push(field);
        };
        PDFAcroForm2.prototype.removeField = function(field) {
          var parent = field.getParent();
          var fields = parent === void 0 ? this.normalizedEntries().Fields : parent.Kids();
          var index = fields === null || fields === void 0 ? void 0 : fields.indexOf(field.ref);
          if (fields === void 0 || index === void 0) {
            throw new Error("Tried to remove inexistent field " + field.getFullyQualifiedName());
          }
          fields.remove(index);
          if (parent !== void 0 && fields.size() === 0) {
            this.removeField(parent);
          }
        };
        PDFAcroForm2.prototype.normalizedEntries = function() {
          var Fields = this.Fields();
          if (!Fields) {
            Fields = this.dict.context.obj([]);
            this.dict.set(PDFName_1.default.of("Fields"), Fields);
          }
          return { Fields };
        };
        PDFAcroForm2.fromDict = function(dict) {
          return new PDFAcroForm2(dict);
        };
        PDFAcroForm2.create = function(context) {
          var dict = context.obj({ Fields: [] });
          return new PDFAcroForm2(dict);
        };
        return PDFAcroForm2;
      })()
    );
    exports.default = PDFAcroForm;
  }
});

// node_modules/pdf-lib/cjs/core/acroform/index.js
var require_acroform = __commonJS({
  "node_modules/pdf-lib/cjs/core/acroform/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFAcroButton_1 = require_PDFAcroButton();
    Object.defineProperty(exports, "PDFAcroButton", { enumerable: true, get: function() {
      return PDFAcroButton_1.default;
    } });
    var PDFAcroCheckBox_1 = require_PDFAcroCheckBox();
    Object.defineProperty(exports, "PDFAcroCheckBox", { enumerable: true, get: function() {
      return PDFAcroCheckBox_1.default;
    } });
    var PDFAcroChoice_1 = require_PDFAcroChoice();
    Object.defineProperty(exports, "PDFAcroChoice", { enumerable: true, get: function() {
      return PDFAcroChoice_1.default;
    } });
    var PDFAcroComboBox_1 = require_PDFAcroComboBox();
    Object.defineProperty(exports, "PDFAcroComboBox", { enumerable: true, get: function() {
      return PDFAcroComboBox_1.default;
    } });
    var PDFAcroField_1 = require_PDFAcroField();
    Object.defineProperty(exports, "PDFAcroField", { enumerable: true, get: function() {
      return PDFAcroField_1.default;
    } });
    var PDFAcroForm_1 = require_PDFAcroForm();
    Object.defineProperty(exports, "PDFAcroForm", { enumerable: true, get: function() {
      return PDFAcroForm_1.default;
    } });
    var PDFAcroListBox_1 = require_PDFAcroListBox();
    Object.defineProperty(exports, "PDFAcroListBox", { enumerable: true, get: function() {
      return PDFAcroListBox_1.default;
    } });
    var PDFAcroNonTerminal_1 = require_PDFAcroNonTerminal();
    Object.defineProperty(exports, "PDFAcroNonTerminal", { enumerable: true, get: function() {
      return PDFAcroNonTerminal_1.default;
    } });
    var PDFAcroPushButton_1 = require_PDFAcroPushButton();
    Object.defineProperty(exports, "PDFAcroPushButton", { enumerable: true, get: function() {
      return PDFAcroPushButton_1.default;
    } });
    var PDFAcroRadioButton_1 = require_PDFAcroRadioButton();
    Object.defineProperty(exports, "PDFAcroRadioButton", { enumerable: true, get: function() {
      return PDFAcroRadioButton_1.default;
    } });
    var PDFAcroSignature_1 = require_PDFAcroSignature();
    Object.defineProperty(exports, "PDFAcroSignature", { enumerable: true, get: function() {
      return PDFAcroSignature_1.default;
    } });
    var PDFAcroTerminal_1 = require_PDFAcroTerminal();
    Object.defineProperty(exports, "PDFAcroTerminal", { enumerable: true, get: function() {
      return PDFAcroTerminal_1.default;
    } });
    var PDFAcroText_1 = require_PDFAcroText();
    Object.defineProperty(exports, "PDFAcroText", { enumerable: true, get: function() {
      return PDFAcroText_1.default;
    } });
    tslib_1.__exportStar(require_flags(), exports);
    tslib_1.__exportStar(require_utils3(), exports);
  }
});

// node_modules/pdf-lib/cjs/core/structures/PDFCatalog.js
var require_PDFCatalog = __commonJS({
  "node_modules/pdf-lib/cjs/core/structures/PDFCatalog.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFDict_1 = tslib_1.__importDefault(require_PDFDict());
    var PDFName_1 = tslib_1.__importDefault(require_PDFName());
    var acroform_1 = require_acroform();
    var ViewerPreferences_1 = tslib_1.__importDefault(require_ViewerPreferences());
    var PDFCatalog = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PDFCatalog2, _super);
        function PDFCatalog2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        PDFCatalog2.prototype.Pages = function() {
          return this.lookup(PDFName_1.default.of("Pages"), PDFDict_1.default);
        };
        PDFCatalog2.prototype.AcroForm = function() {
          return this.lookupMaybe(PDFName_1.default.of("AcroForm"), PDFDict_1.default);
        };
        PDFCatalog2.prototype.getAcroForm = function() {
          var dict = this.AcroForm();
          if (!dict)
            return void 0;
          return acroform_1.PDFAcroForm.fromDict(dict);
        };
        PDFCatalog2.prototype.getOrCreateAcroForm = function() {
          var acroForm = this.getAcroForm();
          if (!acroForm) {
            acroForm = acroform_1.PDFAcroForm.create(this.context);
            var acroFormRef = this.context.register(acroForm.dict);
            this.set(PDFName_1.default.of("AcroForm"), acroFormRef);
          }
          return acroForm;
        };
        PDFCatalog2.prototype.ViewerPreferences = function() {
          return this.lookupMaybe(PDFName_1.default.of("ViewerPreferences"), PDFDict_1.default);
        };
        PDFCatalog2.prototype.getViewerPreferences = function() {
          var dict = this.ViewerPreferences();
          if (!dict)
            return void 0;
          return ViewerPreferences_1.default.fromDict(dict);
        };
        PDFCatalog2.prototype.getOrCreateViewerPreferences = function() {
          var viewerPrefs = this.getViewerPreferences();
          if (!viewerPrefs) {
            viewerPrefs = ViewerPreferences_1.default.create(this.context);
            var viewerPrefsRef = this.context.register(viewerPrefs.dict);
            this.set(PDFName_1.default.of("ViewerPreferences"), viewerPrefsRef);
          }
          return viewerPrefs;
        };
        PDFCatalog2.prototype.insertLeafNode = function(leafRef, index) {
          var pagesRef = this.get(PDFName_1.default.of("Pages"));
          var maybeParentRef = this.Pages().insertLeafNode(leafRef, index);
          return maybeParentRef || pagesRef;
        };
        PDFCatalog2.prototype.removeLeafNode = function(index) {
          this.Pages().removeLeafNode(index);
        };
        PDFCatalog2.withContextAndPages = function(context, pages) {
          var dict = /* @__PURE__ */ new Map();
          dict.set(PDFName_1.default.of("Type"), PDFName_1.default.of("Catalog"));
          dict.set(PDFName_1.default.of("Pages"), pages);
          return new PDFCatalog2(dict, context);
        };
        PDFCatalog2.fromMapWithContext = function(map, context) {
          return new PDFCatalog2(map, context);
        };
        return PDFCatalog2;
      })(PDFDict_1.default)
    );
    exports.default = PDFCatalog;
  }
});

// node_modules/pdf-lib/cjs/core/structures/PDFPageTree.js
var require_PDFPageTree = __commonJS({
  "node_modules/pdf-lib/cjs/core/structures/PDFPageTree.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFArray_1 = tslib_1.__importDefault(require_PDFArray());
    var PDFDict_1 = tslib_1.__importDefault(require_PDFDict());
    var PDFName_1 = tslib_1.__importDefault(require_PDFName());
    var PDFNumber_1 = tslib_1.__importDefault(require_PDFNumber());
    var PDFPageLeaf_1 = tslib_1.__importDefault(require_PDFPageLeaf());
    var errors_1 = require_errors2();
    var PDFPageTree = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PDFPageTree2, _super);
        function PDFPageTree2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        PDFPageTree2.prototype.Parent = function() {
          return this.lookup(PDFName_1.default.of("Parent"));
        };
        PDFPageTree2.prototype.Kids = function() {
          return this.lookup(PDFName_1.default.of("Kids"), PDFArray_1.default);
        };
        PDFPageTree2.prototype.Count = function() {
          return this.lookup(PDFName_1.default.of("Count"), PDFNumber_1.default);
        };
        PDFPageTree2.prototype.pushTreeNode = function(treeRef) {
          var Kids = this.Kids();
          Kids.push(treeRef);
        };
        PDFPageTree2.prototype.pushLeafNode = function(leafRef) {
          var Kids = this.Kids();
          this.insertLeafKid(Kids.size(), leafRef);
        };
        PDFPageTree2.prototype.insertLeafNode = function(leafRef, targetIndex) {
          var Kids = this.Kids();
          var Count = this.Count().asNumber();
          if (targetIndex > Count) {
            throw new errors_1.InvalidTargetIndexError(targetIndex, Count);
          }
          var leafsRemainingUntilTarget = targetIndex;
          for (var idx = 0, len = Kids.size(); idx < len; idx++) {
            if (leafsRemainingUntilTarget === 0) {
              this.insertLeafKid(idx, leafRef);
              return void 0;
            }
            var kidRef = Kids.get(idx);
            var kid = this.context.lookup(kidRef);
            if (kid instanceof PDFPageTree2) {
              if (kid.Count().asNumber() > leafsRemainingUntilTarget) {
                return kid.insertLeafNode(leafRef, leafsRemainingUntilTarget) || kidRef;
              } else {
                leafsRemainingUntilTarget -= kid.Count().asNumber();
              }
            }
            if (kid instanceof PDFPageLeaf_1.default) {
              leafsRemainingUntilTarget -= 1;
            }
          }
          if (leafsRemainingUntilTarget === 0) {
            this.insertLeafKid(Kids.size(), leafRef);
            return void 0;
          }
          throw new errors_1.CorruptPageTreeError(targetIndex, "insertLeafNode");
        };
        PDFPageTree2.prototype.removeLeafNode = function(targetIndex, prune) {
          if (prune === void 0) {
            prune = true;
          }
          var Kids = this.Kids();
          var Count = this.Count().asNumber();
          if (targetIndex >= Count) {
            throw new errors_1.InvalidTargetIndexError(targetIndex, Count);
          }
          var leafsRemainingUntilTarget = targetIndex;
          for (var idx = 0, len = Kids.size(); idx < len; idx++) {
            var kidRef = Kids.get(idx);
            var kid = this.context.lookup(kidRef);
            if (kid instanceof PDFPageTree2) {
              if (kid.Count().asNumber() > leafsRemainingUntilTarget) {
                kid.removeLeafNode(leafsRemainingUntilTarget, prune);
                if (prune && kid.Kids().size() === 0)
                  Kids.remove(idx);
                return;
              } else {
                leafsRemainingUntilTarget -= kid.Count().asNumber();
              }
            }
            if (kid instanceof PDFPageLeaf_1.default) {
              if (leafsRemainingUntilTarget === 0) {
                this.removeKid(idx);
                return;
              } else {
                leafsRemainingUntilTarget -= 1;
              }
            }
          }
          throw new errors_1.CorruptPageTreeError(targetIndex, "removeLeafNode");
        };
        PDFPageTree2.prototype.ascend = function(visitor) {
          visitor(this);
          var Parent = this.Parent();
          if (Parent)
            Parent.ascend(visitor);
        };
        PDFPageTree2.prototype.traverse = function(visitor) {
          var Kids = this.Kids();
          for (var idx = 0, len = Kids.size(); idx < len; idx++) {
            var kidRef = Kids.get(idx);
            var kid = this.context.lookup(kidRef);
            if (kid instanceof PDFPageTree2)
              kid.traverse(visitor);
            visitor(kid, kidRef);
          }
        };
        PDFPageTree2.prototype.insertLeafKid = function(kidIdx, leafRef) {
          var Kids = this.Kids();
          this.ascend(function(node) {
            var newCount = node.Count().asNumber() + 1;
            node.set(PDFName_1.default.of("Count"), PDFNumber_1.default.of(newCount));
          });
          Kids.insert(kidIdx, leafRef);
        };
        PDFPageTree2.prototype.removeKid = function(kidIdx) {
          var Kids = this.Kids();
          var kid = Kids.lookup(kidIdx);
          if (kid instanceof PDFPageLeaf_1.default) {
            this.ascend(function(node) {
              var newCount = node.Count().asNumber() - 1;
              node.set(PDFName_1.default.of("Count"), PDFNumber_1.default.of(newCount));
            });
          }
          Kids.remove(kidIdx);
        };
        PDFPageTree2.withContext = function(context, parent) {
          var dict = /* @__PURE__ */ new Map();
          dict.set(PDFName_1.default.of("Type"), PDFName_1.default.of("Pages"));
          dict.set(PDFName_1.default.of("Kids"), context.obj([]));
          dict.set(PDFName_1.default.of("Count"), context.obj(0));
          if (parent)
            dict.set(PDFName_1.default.of("Parent"), parent);
          return new PDFPageTree2(dict, context);
        };
        PDFPageTree2.fromMapWithContext = function(map, context) {
          return new PDFPageTree2(map, context);
        };
        return PDFPageTree2;
      })(PDFDict_1.default)
    );
    exports.default = PDFPageTree;
  }
});

// node_modules/pdf-lib/cjs/core/syntax/Numeric.js
var require_Numeric = __commonJS({
  "node_modules/pdf-lib/cjs/core/syntax/Numeric.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IsNumeric = exports.IsNumericPrefix = exports.IsDigit = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var CharCodes_1 = tslib_1.__importDefault(require_CharCodes());
    exports.IsDigit = new Uint8Array(256);
    exports.IsDigit[CharCodes_1.default.Zero] = 1;
    exports.IsDigit[CharCodes_1.default.One] = 1;
    exports.IsDigit[CharCodes_1.default.Two] = 1;
    exports.IsDigit[CharCodes_1.default.Three] = 1;
    exports.IsDigit[CharCodes_1.default.Four] = 1;
    exports.IsDigit[CharCodes_1.default.Five] = 1;
    exports.IsDigit[CharCodes_1.default.Six] = 1;
    exports.IsDigit[CharCodes_1.default.Seven] = 1;
    exports.IsDigit[CharCodes_1.default.Eight] = 1;
    exports.IsDigit[CharCodes_1.default.Nine] = 1;
    exports.IsNumericPrefix = new Uint8Array(256);
    exports.IsNumericPrefix[CharCodes_1.default.Period] = 1;
    exports.IsNumericPrefix[CharCodes_1.default.Plus] = 1;
    exports.IsNumericPrefix[CharCodes_1.default.Minus] = 1;
    exports.IsNumeric = new Uint8Array(256);
    for (idx = 0, len = 256; idx < len; idx++) {
      exports.IsNumeric[idx] = exports.IsDigit[idx] || exports.IsNumericPrefix[idx] ? 1 : 0;
    }
    var idx;
    var len;
  }
});

// node_modules/pdf-lib/cjs/core/parser/BaseParser.js
var require_BaseParser = __commonJS({
  "node_modules/pdf-lib/cjs/core/parser/BaseParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var errors_1 = require_errors2();
    var CharCodes_1 = tslib_1.__importDefault(require_CharCodes());
    var Numeric_1 = require_Numeric();
    var Whitespace_1 = require_Whitespace();
    var utils_1 = require_utils2();
    var Newline = CharCodes_1.default.Newline;
    var CarriageReturn = CharCodes_1.default.CarriageReturn;
    var BaseParser = (
      /** @class */
      (function() {
        function BaseParser2(bytes, capNumbers) {
          if (capNumbers === void 0) {
            capNumbers = false;
          }
          this.bytes = bytes;
          this.capNumbers = capNumbers;
        }
        BaseParser2.prototype.parseRawInt = function() {
          var value = "";
          while (!this.bytes.done()) {
            var byte = this.bytes.peek();
            if (!Numeric_1.IsDigit[byte])
              break;
            value += utils_1.charFromCode(this.bytes.next());
          }
          var numberValue = Number(value);
          if (!value || !isFinite(numberValue)) {
            throw new errors_1.NumberParsingError(this.bytes.position(), value);
          }
          return numberValue;
        };
        BaseParser2.prototype.parseRawNumber = function() {
          var value = "";
          while (!this.bytes.done()) {
            var byte = this.bytes.peek();
            if (!Numeric_1.IsNumeric[byte])
              break;
            value += utils_1.charFromCode(this.bytes.next());
            if (byte === CharCodes_1.default.Period)
              break;
          }
          while (!this.bytes.done()) {
            var byte = this.bytes.peek();
            if (!Numeric_1.IsDigit[byte])
              break;
            value += utils_1.charFromCode(this.bytes.next());
          }
          var numberValue = Number(value);
          if (!value || !isFinite(numberValue)) {
            throw new errors_1.NumberParsingError(this.bytes.position(), value);
          }
          if (numberValue > Number.MAX_SAFE_INTEGER) {
            if (this.capNumbers) {
              var msg = "Parsed number that is too large for some PDF readers: " + value + ", using Number.MAX_SAFE_INTEGER instead.";
              console.warn(msg);
              return Number.MAX_SAFE_INTEGER;
            } else {
              var msg = "Parsed number that is too large for some PDF readers: " + value + ", not capping.";
              console.warn(msg);
            }
          }
          return numberValue;
        };
        BaseParser2.prototype.skipWhitespace = function() {
          while (!this.bytes.done() && Whitespace_1.IsWhitespace[this.bytes.peek()]) {
            this.bytes.next();
          }
        };
        BaseParser2.prototype.skipLine = function() {
          while (!this.bytes.done()) {
            var byte = this.bytes.peek();
            if (byte === Newline || byte === CarriageReturn)
              return;
            this.bytes.next();
          }
        };
        BaseParser2.prototype.skipComment = function() {
          if (this.bytes.peek() !== CharCodes_1.default.Percent)
            return false;
          while (!this.bytes.done()) {
            var byte = this.bytes.peek();
            if (byte === Newline || byte === CarriageReturn)
              return true;
            this.bytes.next();
          }
          return true;
        };
        BaseParser2.prototype.skipWhitespaceAndComments = function() {
          this.skipWhitespace();
          while (this.skipComment())
            this.skipWhitespace();
        };
        BaseParser2.prototype.matchKeyword = function(keyword) {
          var initialOffset = this.bytes.offset();
          for (var idx = 0, len = keyword.length; idx < len; idx++) {
            if (this.bytes.done() || this.bytes.next() !== keyword[idx]) {
              this.bytes.moveTo(initialOffset);
              return false;
            }
          }
          return true;
        };
        return BaseParser2;
      })()
    );
    exports.default = BaseParser;
  }
});

// node_modules/pdf-lib/cjs/core/parser/ByteStream.js
var require_ByteStream = __commonJS({
  "node_modules/pdf-lib/cjs/core/parser/ByteStream.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var errors_1 = require_errors2();
    var decode_1 = require_decode();
    var CharCodes_1 = tslib_1.__importDefault(require_CharCodes());
    var ByteStream = (
      /** @class */
      (function() {
        function ByteStream2(bytes) {
          this.idx = 0;
          this.line = 0;
          this.column = 0;
          this.bytes = bytes;
          this.length = this.bytes.length;
        }
        ByteStream2.prototype.moveTo = function(offset) {
          this.idx = offset;
        };
        ByteStream2.prototype.next = function() {
          var byte = this.bytes[this.idx++];
          if (byte === CharCodes_1.default.Newline) {
            this.line += 1;
            this.column = 0;
          } else {
            this.column += 1;
          }
          return byte;
        };
        ByteStream2.prototype.assertNext = function(expected) {
          if (this.peek() !== expected) {
            throw new errors_1.NextByteAssertionError(this.position(), expected, this.peek());
          }
          return this.next();
        };
        ByteStream2.prototype.peek = function() {
          return this.bytes[this.idx];
        };
        ByteStream2.prototype.peekAhead = function(steps) {
          return this.bytes[this.idx + steps];
        };
        ByteStream2.prototype.peekAt = function(offset) {
          return this.bytes[offset];
        };
        ByteStream2.prototype.done = function() {
          return this.idx >= this.length;
        };
        ByteStream2.prototype.offset = function() {
          return this.idx;
        };
        ByteStream2.prototype.slice = function(start, end) {
          return this.bytes.slice(start, end);
        };
        ByteStream2.prototype.position = function() {
          return { line: this.line, column: this.column, offset: this.idx };
        };
        ByteStream2.of = function(bytes) {
          return new ByteStream2(bytes);
        };
        ByteStream2.fromPDFRawStream = function(rawStream) {
          return ByteStream2.of(decode_1.decodePDFRawStream(rawStream).decode());
        };
        return ByteStream2;
      })()
    );
    exports.default = ByteStream;
  }
});

// node_modules/pdf-lib/cjs/core/syntax/Keywords.js
var require_Keywords = __commonJS({
  "node_modules/pdf-lib/cjs/core/syntax/Keywords.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Keywords = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var CharCodes_1 = tslib_1.__importDefault(require_CharCodes());
    var Space = CharCodes_1.default.Space;
    var CarriageReturn = CharCodes_1.default.CarriageReturn;
    var Newline = CharCodes_1.default.Newline;
    var stream = [
      CharCodes_1.default.s,
      CharCodes_1.default.t,
      CharCodes_1.default.r,
      CharCodes_1.default.e,
      CharCodes_1.default.a,
      CharCodes_1.default.m
    ];
    var endstream = [
      CharCodes_1.default.e,
      CharCodes_1.default.n,
      CharCodes_1.default.d,
      CharCodes_1.default.s,
      CharCodes_1.default.t,
      CharCodes_1.default.r,
      CharCodes_1.default.e,
      CharCodes_1.default.a,
      CharCodes_1.default.m
    ];
    exports.Keywords = {
      header: [
        CharCodes_1.default.Percent,
        CharCodes_1.default.P,
        CharCodes_1.default.D,
        CharCodes_1.default.F,
        CharCodes_1.default.Dash
      ],
      eof: [
        CharCodes_1.default.Percent,
        CharCodes_1.default.Percent,
        CharCodes_1.default.E,
        CharCodes_1.default.O,
        CharCodes_1.default.F
      ],
      obj: [CharCodes_1.default.o, CharCodes_1.default.b, CharCodes_1.default.j],
      endobj: [
        CharCodes_1.default.e,
        CharCodes_1.default.n,
        CharCodes_1.default.d,
        CharCodes_1.default.o,
        CharCodes_1.default.b,
        CharCodes_1.default.j
      ],
      xref: [CharCodes_1.default.x, CharCodes_1.default.r, CharCodes_1.default.e, CharCodes_1.default.f],
      trailer: [
        CharCodes_1.default.t,
        CharCodes_1.default.r,
        CharCodes_1.default.a,
        CharCodes_1.default.i,
        CharCodes_1.default.l,
        CharCodes_1.default.e,
        CharCodes_1.default.r
      ],
      startxref: [
        CharCodes_1.default.s,
        CharCodes_1.default.t,
        CharCodes_1.default.a,
        CharCodes_1.default.r,
        CharCodes_1.default.t,
        CharCodes_1.default.x,
        CharCodes_1.default.r,
        CharCodes_1.default.e,
        CharCodes_1.default.f
      ],
      true: [CharCodes_1.default.t, CharCodes_1.default.r, CharCodes_1.default.u, CharCodes_1.default.e],
      false: [CharCodes_1.default.f, CharCodes_1.default.a, CharCodes_1.default.l, CharCodes_1.default.s, CharCodes_1.default.e],
      null: [CharCodes_1.default.n, CharCodes_1.default.u, CharCodes_1.default.l, CharCodes_1.default.l],
      stream,
      streamEOF1: tslib_1.__spreadArrays(stream, [Space, CarriageReturn, Newline]),
      streamEOF2: tslib_1.__spreadArrays(stream, [CarriageReturn, Newline]),
      streamEOF3: tslib_1.__spreadArrays(stream, [CarriageReturn]),
      streamEOF4: tslib_1.__spreadArrays(stream, [Newline]),
      endstream,
      EOF1endstream: tslib_1.__spreadArrays([CarriageReturn, Newline], endstream),
      EOF2endstream: tslib_1.__spreadArrays([CarriageReturn], endstream),
      EOF3endstream: tslib_1.__spreadArrays([Newline], endstream)
    };
  }
});

// node_modules/pdf-lib/cjs/core/parser/PDFObjectParser.js
var require_PDFObjectParser = __commonJS({
  "node_modules/pdf-lib/cjs/core/parser/PDFObjectParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var errors_1 = require_errors2();
    var PDFArray_1 = tslib_1.__importDefault(require_PDFArray());
    var PDFBool_1 = tslib_1.__importDefault(require_PDFBool());
    var PDFDict_1 = tslib_1.__importDefault(require_PDFDict());
    var PDFHexString_1 = tslib_1.__importDefault(require_PDFHexString());
    var PDFName_1 = tslib_1.__importDefault(require_PDFName());
    var PDFNull_1 = tslib_1.__importDefault(require_PDFNull());
    var PDFNumber_1 = tslib_1.__importDefault(require_PDFNumber());
    var PDFRawStream_1 = tslib_1.__importDefault(require_PDFRawStream());
    var PDFRef_1 = tslib_1.__importDefault(require_PDFRef());
    var PDFString_1 = tslib_1.__importDefault(require_PDFString());
    var BaseParser_1 = tslib_1.__importDefault(require_BaseParser());
    var ByteStream_1 = tslib_1.__importDefault(require_ByteStream());
    var PDFCatalog_1 = tslib_1.__importDefault(require_PDFCatalog());
    var PDFPageLeaf_1 = tslib_1.__importDefault(require_PDFPageLeaf());
    var PDFPageTree_1 = tslib_1.__importDefault(require_PDFPageTree());
    var CharCodes_1 = tslib_1.__importDefault(require_CharCodes());
    var Delimiters_1 = require_Delimiters();
    var Keywords_1 = require_Keywords();
    var Numeric_1 = require_Numeric();
    var Whitespace_1 = require_Whitespace();
    var utils_1 = require_utils2();
    var PDFObjectParser = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PDFObjectParser2, _super);
        function PDFObjectParser2(byteStream, context, capNumbers) {
          if (capNumbers === void 0) {
            capNumbers = false;
          }
          var _this = _super.call(this, byteStream, capNumbers) || this;
          _this.context = context;
          return _this;
        }
        PDFObjectParser2.prototype.parseObject = function() {
          this.skipWhitespaceAndComments();
          if (this.matchKeyword(Keywords_1.Keywords.true))
            return PDFBool_1.default.True;
          if (this.matchKeyword(Keywords_1.Keywords.false))
            return PDFBool_1.default.False;
          if (this.matchKeyword(Keywords_1.Keywords.null))
            return PDFNull_1.default;
          var byte = this.bytes.peek();
          if (byte === CharCodes_1.default.LessThan && this.bytes.peekAhead(1) === CharCodes_1.default.LessThan) {
            return this.parseDictOrStream();
          }
          if (byte === CharCodes_1.default.LessThan)
            return this.parseHexString();
          if (byte === CharCodes_1.default.LeftParen)
            return this.parseString();
          if (byte === CharCodes_1.default.ForwardSlash)
            return this.parseName();
          if (byte === CharCodes_1.default.LeftSquareBracket)
            return this.parseArray();
          if (Numeric_1.IsNumeric[byte])
            return this.parseNumberOrRef();
          throw new errors_1.PDFObjectParsingError(this.bytes.position(), byte);
        };
        PDFObjectParser2.prototype.parseNumberOrRef = function() {
          var firstNum = this.parseRawNumber();
          this.skipWhitespaceAndComments();
          var lookaheadStart = this.bytes.offset();
          if (Numeric_1.IsDigit[this.bytes.peek()]) {
            var secondNum = this.parseRawNumber();
            this.skipWhitespaceAndComments();
            if (this.bytes.peek() === CharCodes_1.default.R) {
              this.bytes.assertNext(CharCodes_1.default.R);
              return PDFRef_1.default.of(firstNum, secondNum);
            }
          }
          this.bytes.moveTo(lookaheadStart);
          return PDFNumber_1.default.of(firstNum);
        };
        PDFObjectParser2.prototype.parseHexString = function() {
          var value = "";
          this.bytes.assertNext(CharCodes_1.default.LessThan);
          while (!this.bytes.done() && this.bytes.peek() !== CharCodes_1.default.GreaterThan) {
            value += utils_1.charFromCode(this.bytes.next());
          }
          this.bytes.assertNext(CharCodes_1.default.GreaterThan);
          return PDFHexString_1.default.of(value);
        };
        PDFObjectParser2.prototype.parseString = function() {
          var nestingLvl = 0;
          var isEscaped = false;
          var value = "";
          while (!this.bytes.done()) {
            var byte = this.bytes.next();
            value += utils_1.charFromCode(byte);
            if (!isEscaped) {
              if (byte === CharCodes_1.default.LeftParen)
                nestingLvl += 1;
              if (byte === CharCodes_1.default.RightParen)
                nestingLvl -= 1;
            }
            if (byte === CharCodes_1.default.BackSlash) {
              isEscaped = !isEscaped;
            } else if (isEscaped) {
              isEscaped = false;
            }
            if (nestingLvl === 0) {
              return PDFString_1.default.of(value.substring(1, value.length - 1));
            }
          }
          throw new errors_1.UnbalancedParenthesisError(this.bytes.position());
        };
        PDFObjectParser2.prototype.parseName = function() {
          this.bytes.assertNext(CharCodes_1.default.ForwardSlash);
          var name = "";
          while (!this.bytes.done()) {
            var byte = this.bytes.peek();
            if (Whitespace_1.IsWhitespace[byte] || Delimiters_1.IsDelimiter[byte])
              break;
            name += utils_1.charFromCode(byte);
            this.bytes.next();
          }
          return PDFName_1.default.of(name);
        };
        PDFObjectParser2.prototype.parseArray = function() {
          this.bytes.assertNext(CharCodes_1.default.LeftSquareBracket);
          this.skipWhitespaceAndComments();
          var pdfArray = PDFArray_1.default.withContext(this.context);
          while (this.bytes.peek() !== CharCodes_1.default.RightSquareBracket) {
            var element = this.parseObject();
            pdfArray.push(element);
            this.skipWhitespaceAndComments();
          }
          this.bytes.assertNext(CharCodes_1.default.RightSquareBracket);
          return pdfArray;
        };
        PDFObjectParser2.prototype.parseDict = function() {
          this.bytes.assertNext(CharCodes_1.default.LessThan);
          this.bytes.assertNext(CharCodes_1.default.LessThan);
          this.skipWhitespaceAndComments();
          var dict = /* @__PURE__ */ new Map();
          while (!this.bytes.done() && this.bytes.peek() !== CharCodes_1.default.GreaterThan && this.bytes.peekAhead(1) !== CharCodes_1.default.GreaterThan) {
            var key = this.parseName();
            var value = this.parseObject();
            dict.set(key, value);
            this.skipWhitespaceAndComments();
          }
          this.skipWhitespaceAndComments();
          this.bytes.assertNext(CharCodes_1.default.GreaterThan);
          this.bytes.assertNext(CharCodes_1.default.GreaterThan);
          var Type = dict.get(PDFName_1.default.of("Type"));
          if (Type === PDFName_1.default.of("Catalog")) {
            return PDFCatalog_1.default.fromMapWithContext(dict, this.context);
          } else if (Type === PDFName_1.default.of("Pages")) {
            return PDFPageTree_1.default.fromMapWithContext(dict, this.context);
          } else if (Type === PDFName_1.default.of("Page")) {
            return PDFPageLeaf_1.default.fromMapWithContext(dict, this.context);
          } else {
            return PDFDict_1.default.fromMapWithContext(dict, this.context);
          }
        };
        PDFObjectParser2.prototype.parseDictOrStream = function() {
          var startPos = this.bytes.position();
          var dict = this.parseDict();
          this.skipWhitespaceAndComments();
          if (!this.matchKeyword(Keywords_1.Keywords.streamEOF1) && !this.matchKeyword(Keywords_1.Keywords.streamEOF2) && !this.matchKeyword(Keywords_1.Keywords.streamEOF3) && !this.matchKeyword(Keywords_1.Keywords.streamEOF4) && !this.matchKeyword(Keywords_1.Keywords.stream)) {
            return dict;
          }
          var start = this.bytes.offset();
          var end;
          var Length = dict.get(PDFName_1.default.of("Length"));
          if (Length instanceof PDFNumber_1.default) {
            end = start + Length.asNumber();
            this.bytes.moveTo(end);
            this.skipWhitespaceAndComments();
            if (!this.matchKeyword(Keywords_1.Keywords.endstream)) {
              this.bytes.moveTo(start);
              end = this.findEndOfStreamFallback(startPos);
            }
          } else {
            end = this.findEndOfStreamFallback(startPos);
          }
          var contents = this.bytes.slice(start, end);
          return PDFRawStream_1.default.of(dict, contents);
        };
        PDFObjectParser2.prototype.findEndOfStreamFallback = function(startPos) {
          var nestingLvl = 1;
          var end = this.bytes.offset();
          while (!this.bytes.done()) {
            end = this.bytes.offset();
            if (this.matchKeyword(Keywords_1.Keywords.stream)) {
              nestingLvl += 1;
            } else if (this.matchKeyword(Keywords_1.Keywords.EOF1endstream) || this.matchKeyword(Keywords_1.Keywords.EOF2endstream) || this.matchKeyword(Keywords_1.Keywords.EOF3endstream) || this.matchKeyword(Keywords_1.Keywords.endstream)) {
              nestingLvl -= 1;
            } else {
              this.bytes.next();
            }
            if (nestingLvl === 0)
              break;
          }
          if (nestingLvl !== 0)
            throw new errors_1.PDFStreamParsingError(startPos);
          return end;
        };
        PDFObjectParser2.forBytes = function(bytes, context, capNumbers) {
          return new PDFObjectParser2(ByteStream_1.default.of(bytes), context, capNumbers);
        };
        PDFObjectParser2.forByteStream = function(byteStream, context, capNumbers) {
          if (capNumbers === void 0) {
            capNumbers = false;
          }
          return new PDFObjectParser2(byteStream, context, capNumbers);
        };
        return PDFObjectParser2;
      })(BaseParser_1.default)
    );
    exports.default = PDFObjectParser;
  }
});

// node_modules/pdf-lib/cjs/core/parser/PDFObjectStreamParser.js
var require_PDFObjectStreamParser = __commonJS({
  "node_modules/pdf-lib/cjs/core/parser/PDFObjectStreamParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var errors_1 = require_errors2();
    var PDFName_1 = tslib_1.__importDefault(require_PDFName());
    var PDFNumber_1 = tslib_1.__importDefault(require_PDFNumber());
    var PDFRef_1 = tslib_1.__importDefault(require_PDFRef());
    var ByteStream_1 = tslib_1.__importDefault(require_ByteStream());
    var PDFObjectParser_1 = tslib_1.__importDefault(require_PDFObjectParser());
    var utils_1 = require_utils2();
    var PDFObjectStreamParser = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PDFObjectStreamParser2, _super);
        function PDFObjectStreamParser2(rawStream, shouldWaitForTick) {
          var _this = _super.call(this, ByteStream_1.default.fromPDFRawStream(rawStream), rawStream.dict.context) || this;
          var dict = rawStream.dict;
          _this.alreadyParsed = false;
          _this.shouldWaitForTick = shouldWaitForTick || (function() {
            return false;
          });
          _this.firstOffset = dict.lookup(PDFName_1.default.of("First"), PDFNumber_1.default).asNumber();
          _this.objectCount = dict.lookup(PDFName_1.default.of("N"), PDFNumber_1.default).asNumber();
          return _this;
        }
        PDFObjectStreamParser2.prototype.parseIntoContext = function() {
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            var offsetsAndObjectNumbers, idx, len, _a, objectNumber, offset, object, ref;
            return tslib_1.__generator(this, function(_b) {
              switch (_b.label) {
                case 0:
                  if (this.alreadyParsed) {
                    throw new errors_1.ReparseError("PDFObjectStreamParser", "parseIntoContext");
                  }
                  this.alreadyParsed = true;
                  offsetsAndObjectNumbers = this.parseOffsetsAndObjectNumbers();
                  idx = 0, len = offsetsAndObjectNumbers.length;
                  _b.label = 1;
                case 1:
                  if (!(idx < len)) return [3, 4];
                  _a = offsetsAndObjectNumbers[idx], objectNumber = _a.objectNumber, offset = _a.offset;
                  this.bytes.moveTo(this.firstOffset + offset);
                  object = this.parseObject();
                  ref = PDFRef_1.default.of(objectNumber, 0);
                  this.context.assign(ref, object);
                  if (!this.shouldWaitForTick()) return [3, 3];
                  return [4, utils_1.waitForTick()];
                case 2:
                  _b.sent();
                  _b.label = 3;
                case 3:
                  idx++;
                  return [3, 1];
                case 4:
                  return [
                    2
                    /*return*/
                  ];
              }
            });
          });
        };
        PDFObjectStreamParser2.prototype.parseOffsetsAndObjectNumbers = function() {
          var offsetsAndObjectNumbers = [];
          for (var idx = 0, len = this.objectCount; idx < len; idx++) {
            this.skipWhitespaceAndComments();
            var objectNumber = this.parseRawInt();
            this.skipWhitespaceAndComments();
            var offset = this.parseRawInt();
            offsetsAndObjectNumbers.push({ objectNumber, offset });
          }
          return offsetsAndObjectNumbers;
        };
        PDFObjectStreamParser2.forStream = function(rawStream, shouldWaitForTick) {
          return new PDFObjectStreamParser2(rawStream, shouldWaitForTick);
        };
        return PDFObjectStreamParser2;
      })(PDFObjectParser_1.default)
    );
    exports.default = PDFObjectStreamParser;
  }
});

// node_modules/pdf-lib/cjs/core/parser/PDFXRefStreamParser.js
var require_PDFXRefStreamParser = __commonJS({
  "node_modules/pdf-lib/cjs/core/parser/PDFXRefStreamParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var errors_1 = require_errors2();
    var PDFArray_1 = tslib_1.__importDefault(require_PDFArray());
    var PDFName_1 = tslib_1.__importDefault(require_PDFName());
    var PDFNumber_1 = tslib_1.__importDefault(require_PDFNumber());
    var PDFRef_1 = tslib_1.__importDefault(require_PDFRef());
    var ByteStream_1 = tslib_1.__importDefault(require_ByteStream());
    var PDFXRefStreamParser = (
      /** @class */
      (function() {
        function PDFXRefStreamParser2(rawStream) {
          this.alreadyParsed = false;
          this.dict = rawStream.dict;
          this.bytes = ByteStream_1.default.fromPDFRawStream(rawStream);
          this.context = this.dict.context;
          var Size = this.dict.lookup(PDFName_1.default.of("Size"), PDFNumber_1.default);
          var Index = this.dict.lookup(PDFName_1.default.of("Index"));
          if (Index instanceof PDFArray_1.default) {
            this.subsections = [];
            for (var idx = 0, len = Index.size(); idx < len; idx += 2) {
              var firstObjectNumber = Index.lookup(idx + 0, PDFNumber_1.default).asNumber();
              var length_1 = Index.lookup(idx + 1, PDFNumber_1.default).asNumber();
              this.subsections.push({ firstObjectNumber, length: length_1 });
            }
          } else {
            this.subsections = [{ firstObjectNumber: 0, length: Size.asNumber() }];
          }
          var W = this.dict.lookup(PDFName_1.default.of("W"), PDFArray_1.default);
          this.byteWidths = [-1, -1, -1];
          for (var idx = 0, len = W.size(); idx < len; idx++) {
            this.byteWidths[idx] = W.lookup(idx, PDFNumber_1.default).asNumber();
          }
        }
        PDFXRefStreamParser2.prototype.parseIntoContext = function() {
          if (this.alreadyParsed) {
            throw new errors_1.ReparseError("PDFXRefStreamParser", "parseIntoContext");
          }
          this.alreadyParsed = true;
          this.context.trailerInfo = {
            Root: this.dict.get(PDFName_1.default.of("Root")),
            Encrypt: this.dict.get(PDFName_1.default.of("Encrypt")),
            Info: this.dict.get(PDFName_1.default.of("Info")),
            ID: this.dict.get(PDFName_1.default.of("ID"))
          };
          var entries = this.parseEntries();
          return entries;
        };
        PDFXRefStreamParser2.prototype.parseEntries = function() {
          var entries = [];
          var _a = this.byteWidths, typeFieldWidth = _a[0], offsetFieldWidth = _a[1], genFieldWidth = _a[2];
          for (var subsectionIdx = 0, subsectionLen = this.subsections.length; subsectionIdx < subsectionLen; subsectionIdx++) {
            var _b = this.subsections[subsectionIdx], firstObjectNumber = _b.firstObjectNumber, length_2 = _b.length;
            for (var objIdx = 0; objIdx < length_2; objIdx++) {
              var type = 0;
              for (var idx = 0, len = typeFieldWidth; idx < len; idx++) {
                type = type << 8 | this.bytes.next();
              }
              var offset = 0;
              for (var idx = 0, len = offsetFieldWidth; idx < len; idx++) {
                offset = offset << 8 | this.bytes.next();
              }
              var generationNumber = 0;
              for (var idx = 0, len = genFieldWidth; idx < len; idx++) {
                generationNumber = generationNumber << 8 | this.bytes.next();
              }
              if (typeFieldWidth === 0)
                type = 1;
              var objectNumber = firstObjectNumber + objIdx;
              var entry = {
                ref: PDFRef_1.default.of(objectNumber, generationNumber),
                offset,
                deleted: type === 0,
                inObjectStream: type === 2
              };
              entries.push(entry);
            }
          }
          return entries;
        };
        PDFXRefStreamParser2.forStream = function(rawStream) {
          return new PDFXRefStreamParser2(rawStream);
        };
        return PDFXRefStreamParser2;
      })()
    );
    exports.default = PDFXRefStreamParser;
  }
});

// node_modules/pdf-lib/cjs/core/parser/PDFParser.js
var require_PDFParser = __commonJS({
  "node_modules/pdf-lib/cjs/core/parser/PDFParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFCrossRefSection_1 = tslib_1.__importDefault(require_PDFCrossRefSection());
    var PDFHeader_1 = tslib_1.__importDefault(require_PDFHeader());
    var PDFTrailer_1 = tslib_1.__importDefault(require_PDFTrailer());
    var errors_1 = require_errors2();
    var PDFDict_1 = tslib_1.__importDefault(require_PDFDict());
    var PDFInvalidObject_1 = tslib_1.__importDefault(require_PDFInvalidObject());
    var PDFName_1 = tslib_1.__importDefault(require_PDFName());
    var PDFRawStream_1 = tslib_1.__importDefault(require_PDFRawStream());
    var PDFRef_1 = tslib_1.__importDefault(require_PDFRef());
    var ByteStream_1 = tslib_1.__importDefault(require_ByteStream());
    var PDFObjectParser_1 = tslib_1.__importDefault(require_PDFObjectParser());
    var PDFObjectStreamParser_1 = tslib_1.__importDefault(require_PDFObjectStreamParser());
    var PDFXRefStreamParser_1 = tslib_1.__importDefault(require_PDFXRefStreamParser());
    var PDFContext_1 = tslib_1.__importDefault(require_PDFContext());
    var CharCodes_1 = tslib_1.__importDefault(require_CharCodes());
    var Keywords_1 = require_Keywords();
    var Numeric_1 = require_Numeric();
    var utils_1 = require_utils2();
    var PDFParser = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PDFParser2, _super);
        function PDFParser2(pdfBytes, objectsPerTick, throwOnInvalidObject, capNumbers) {
          if (objectsPerTick === void 0) {
            objectsPerTick = Infinity;
          }
          if (throwOnInvalidObject === void 0) {
            throwOnInvalidObject = false;
          }
          if (capNumbers === void 0) {
            capNumbers = false;
          }
          var _this = _super.call(this, ByteStream_1.default.of(pdfBytes), PDFContext_1.default.create(), capNumbers) || this;
          _this.alreadyParsed = false;
          _this.parsedObjects = 0;
          _this.shouldWaitForTick = function() {
            _this.parsedObjects += 1;
            return _this.parsedObjects % _this.objectsPerTick === 0;
          };
          _this.objectsPerTick = objectsPerTick;
          _this.throwOnInvalidObject = throwOnInvalidObject;
          return _this;
        }
        PDFParser2.prototype.parseDocument = function() {
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            var prevOffset, offset;
            return tslib_1.__generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  if (this.alreadyParsed) {
                    throw new errors_1.ReparseError("PDFParser", "parseDocument");
                  }
                  this.alreadyParsed = true;
                  this.context.header = this.parseHeader();
                  _a.label = 1;
                case 1:
                  if (!!this.bytes.done()) return [3, 3];
                  return [4, this.parseDocumentSection()];
                case 2:
                  _a.sent();
                  offset = this.bytes.offset();
                  if (offset === prevOffset) {
                    throw new errors_1.StalledParserError(this.bytes.position());
                  }
                  prevOffset = offset;
                  return [3, 1];
                case 3:
                  this.maybeRecoverRoot();
                  if (this.context.lookup(PDFRef_1.default.of(0))) {
                    console.warn("Removing parsed object: 0 0 R");
                    this.context.delete(PDFRef_1.default.of(0));
                  }
                  return [2, this.context];
              }
            });
          });
        };
        PDFParser2.prototype.maybeRecoverRoot = function() {
          var isValidCatalog = function(obj) {
            return obj instanceof PDFDict_1.default && obj.lookup(PDFName_1.default.of("Type")) === PDFName_1.default.of("Catalog");
          };
          var catalog = this.context.lookup(this.context.trailerInfo.Root);
          if (!isValidCatalog(catalog)) {
            var indirectObjects = this.context.enumerateIndirectObjects();
            for (var idx = 0, len = indirectObjects.length; idx < len; idx++) {
              var _a = indirectObjects[idx], ref = _a[0], object = _a[1];
              if (isValidCatalog(object)) {
                this.context.trailerInfo.Root = ref;
              }
            }
          }
        };
        PDFParser2.prototype.parseHeader = function() {
          while (!this.bytes.done()) {
            if (this.matchKeyword(Keywords_1.Keywords.header)) {
              var major = this.parseRawInt();
              this.bytes.assertNext(CharCodes_1.default.Period);
              var minor = this.parseRawInt();
              var header = PDFHeader_1.default.forVersion(major, minor);
              this.skipBinaryHeaderComment();
              return header;
            }
            this.bytes.next();
          }
          throw new errors_1.MissingPDFHeaderError(this.bytes.position());
        };
        PDFParser2.prototype.parseIndirectObjectHeader = function() {
          this.skipWhitespaceAndComments();
          var objectNumber = this.parseRawInt();
          this.skipWhitespaceAndComments();
          var generationNumber = this.parseRawInt();
          this.skipWhitespaceAndComments();
          if (!this.matchKeyword(Keywords_1.Keywords.obj)) {
            throw new errors_1.MissingKeywordError(this.bytes.position(), Keywords_1.Keywords.obj);
          }
          return PDFRef_1.default.of(objectNumber, generationNumber);
        };
        PDFParser2.prototype.matchIndirectObjectHeader = function() {
          var initialOffset = this.bytes.offset();
          try {
            this.parseIndirectObjectHeader();
            return true;
          } catch (e) {
            this.bytes.moveTo(initialOffset);
            return false;
          }
        };
        PDFParser2.prototype.parseIndirectObject = function() {
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            var ref, object;
            return tslib_1.__generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  ref = this.parseIndirectObjectHeader();
                  this.skipWhitespaceAndComments();
                  object = this.parseObject();
                  this.skipWhitespaceAndComments();
                  this.matchKeyword(Keywords_1.Keywords.endobj);
                  if (!(object instanceof PDFRawStream_1.default && object.dict.lookup(PDFName_1.default.of("Type")) === PDFName_1.default.of("ObjStm"))) return [3, 2];
                  return [4, PDFObjectStreamParser_1.default.forStream(object, this.shouldWaitForTick).parseIntoContext()];
                case 1:
                  _a.sent();
                  return [3, 3];
                case 2:
                  if (object instanceof PDFRawStream_1.default && object.dict.lookup(PDFName_1.default.of("Type")) === PDFName_1.default.of("XRef")) {
                    PDFXRefStreamParser_1.default.forStream(object).parseIntoContext();
                  } else {
                    this.context.assign(ref, object);
                  }
                  _a.label = 3;
                case 3:
                  return [2, ref];
              }
            });
          });
        };
        PDFParser2.prototype.tryToParseInvalidIndirectObject = function() {
          var startPos = this.bytes.position();
          var msg = "Trying to parse invalid object: " + JSON.stringify(startPos) + ")";
          if (this.throwOnInvalidObject)
            throw new Error(msg);
          console.warn(msg);
          var ref = this.parseIndirectObjectHeader();
          console.warn("Invalid object ref: " + ref);
          this.skipWhitespaceAndComments();
          var start = this.bytes.offset();
          var failed = true;
          while (!this.bytes.done()) {
            if (this.matchKeyword(Keywords_1.Keywords.endobj)) {
              failed = false;
            }
            if (!failed)
              break;
            this.bytes.next();
          }
          if (failed)
            throw new errors_1.PDFInvalidObjectParsingError(startPos);
          var end = this.bytes.offset() - Keywords_1.Keywords.endobj.length;
          var object = PDFInvalidObject_1.default.of(this.bytes.slice(start, end));
          this.context.assign(ref, object);
          return ref;
        };
        PDFParser2.prototype.parseIndirectObjects = function() {
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            var initialOffset, e_1;
            return tslib_1.__generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  this.skipWhitespaceAndComments();
                  _a.label = 1;
                case 1:
                  if (!(!this.bytes.done() && Numeric_1.IsDigit[this.bytes.peek()])) return [3, 8];
                  initialOffset = this.bytes.offset();
                  _a.label = 2;
                case 2:
                  _a.trys.push([2, 4, , 5]);
                  return [4, this.parseIndirectObject()];
                case 3:
                  _a.sent();
                  return [3, 5];
                case 4:
                  e_1 = _a.sent();
                  this.bytes.moveTo(initialOffset);
                  this.tryToParseInvalidIndirectObject();
                  return [3, 5];
                case 5:
                  this.skipWhitespaceAndComments();
                  this.skipJibberish();
                  if (!this.shouldWaitForTick()) return [3, 7];
                  return [4, utils_1.waitForTick()];
                case 6:
                  _a.sent();
                  _a.label = 7;
                case 7:
                  return [3, 1];
                case 8:
                  return [
                    2
                    /*return*/
                  ];
              }
            });
          });
        };
        PDFParser2.prototype.maybeParseCrossRefSection = function() {
          this.skipWhitespaceAndComments();
          if (!this.matchKeyword(Keywords_1.Keywords.xref))
            return;
          this.skipWhitespaceAndComments();
          var objectNumber = -1;
          var xref = PDFCrossRefSection_1.default.createEmpty();
          while (!this.bytes.done() && Numeric_1.IsDigit[this.bytes.peek()]) {
            var firstInt = this.parseRawInt();
            this.skipWhitespaceAndComments();
            var secondInt = this.parseRawInt();
            this.skipWhitespaceAndComments();
            var byte = this.bytes.peek();
            if (byte === CharCodes_1.default.n || byte === CharCodes_1.default.f) {
              var ref = PDFRef_1.default.of(objectNumber, secondInt);
              if (this.bytes.next() === CharCodes_1.default.n) {
                xref.addEntry(ref, firstInt);
              } else {
                xref.addDeletedEntry(ref, firstInt);
              }
              objectNumber += 1;
            } else {
              objectNumber = firstInt;
            }
            this.skipWhitespaceAndComments();
          }
          return xref;
        };
        PDFParser2.prototype.maybeParseTrailerDict = function() {
          this.skipWhitespaceAndComments();
          if (!this.matchKeyword(Keywords_1.Keywords.trailer))
            return;
          this.skipWhitespaceAndComments();
          var dict = this.parseDict();
          var context = this.context;
          context.trailerInfo = {
            Root: dict.get(PDFName_1.default.of("Root")) || context.trailerInfo.Root,
            Encrypt: dict.get(PDFName_1.default.of("Encrypt")) || context.trailerInfo.Encrypt,
            Info: dict.get(PDFName_1.default.of("Info")) || context.trailerInfo.Info,
            ID: dict.get(PDFName_1.default.of("ID")) || context.trailerInfo.ID
          };
        };
        PDFParser2.prototype.maybeParseTrailer = function() {
          this.skipWhitespaceAndComments();
          if (!this.matchKeyword(Keywords_1.Keywords.startxref))
            return;
          this.skipWhitespaceAndComments();
          var offset = this.parseRawInt();
          this.skipWhitespace();
          this.matchKeyword(Keywords_1.Keywords.eof);
          this.skipWhitespaceAndComments();
          this.matchKeyword(Keywords_1.Keywords.eof);
          this.skipWhitespaceAndComments();
          return PDFTrailer_1.default.forLastCrossRefSectionOffset(offset);
        };
        PDFParser2.prototype.parseDocumentSection = function() {
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            return tslib_1.__generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  return [4, this.parseIndirectObjects()];
                case 1:
                  _a.sent();
                  this.maybeParseCrossRefSection();
                  this.maybeParseTrailerDict();
                  this.maybeParseTrailer();
                  this.skipJibberish();
                  return [
                    2
                    /*return*/
                  ];
              }
            });
          });
        };
        PDFParser2.prototype.skipJibberish = function() {
          this.skipWhitespaceAndComments();
          while (!this.bytes.done()) {
            var initialOffset = this.bytes.offset();
            var byte = this.bytes.peek();
            var isAlphaNumeric = byte >= CharCodes_1.default.Space && byte <= CharCodes_1.default.Tilde;
            if (isAlphaNumeric) {
              if (this.matchKeyword(Keywords_1.Keywords.xref) || this.matchKeyword(Keywords_1.Keywords.trailer) || this.matchKeyword(Keywords_1.Keywords.startxref) || this.matchIndirectObjectHeader()) {
                this.bytes.moveTo(initialOffset);
                break;
              }
            }
            this.bytes.next();
          }
        };
        PDFParser2.prototype.skipBinaryHeaderComment = function() {
          this.skipWhitespaceAndComments();
          try {
            var initialOffset = this.bytes.offset();
            this.parseIndirectObjectHeader();
            this.bytes.moveTo(initialOffset);
          } catch (e) {
            this.bytes.next();
            this.skipWhitespaceAndComments();
          }
        };
        PDFParser2.forBytesWithOptions = function(pdfBytes, objectsPerTick, throwOnInvalidObject, capNumbers) {
          return new PDFParser2(pdfBytes, objectsPerTick, throwOnInvalidObject, capNumbers);
        };
        return PDFParser2;
      })(PDFObjectParser_1.default)
    );
    exports.default = PDFParser;
  }
});

// node_modules/pdf-lib/cjs/core/annotation/flags.js
var require_flags2 = __commonJS({
  "node_modules/pdf-lib/cjs/core/annotation/flags.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AnnotationFlags = void 0;
    var flag = function(bitIndex) {
      return 1 << bitIndex;
    };
    var AnnotationFlags;
    (function(AnnotationFlags2) {
      AnnotationFlags2[AnnotationFlags2["Invisible"] = flag(1 - 1)] = "Invisible";
      AnnotationFlags2[AnnotationFlags2["Hidden"] = flag(2 - 1)] = "Hidden";
      AnnotationFlags2[AnnotationFlags2["Print"] = flag(3 - 1)] = "Print";
      AnnotationFlags2[AnnotationFlags2["NoZoom"] = flag(4 - 1)] = "NoZoom";
      AnnotationFlags2[AnnotationFlags2["NoRotate"] = flag(5 - 1)] = "NoRotate";
      AnnotationFlags2[AnnotationFlags2["NoView"] = flag(6 - 1)] = "NoView";
      AnnotationFlags2[AnnotationFlags2["ReadOnly"] = flag(7 - 1)] = "ReadOnly";
      AnnotationFlags2[AnnotationFlags2["Locked"] = flag(8 - 1)] = "Locked";
      AnnotationFlags2[AnnotationFlags2["ToggleNoView"] = flag(9 - 1)] = "ToggleNoView";
      AnnotationFlags2[AnnotationFlags2["LockedContents"] = flag(10 - 1)] = "LockedContents";
    })(AnnotationFlags = exports.AnnotationFlags || (exports.AnnotationFlags = {}));
  }
});

// node_modules/pdf-lib/cjs/core/annotation/index.js
var require_annotation = __commonJS({
  "node_modules/pdf-lib/cjs/core/annotation/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFAnnotation_1 = require_PDFAnnotation();
    Object.defineProperty(exports, "PDFAnnotation", { enumerable: true, get: function() {
      return PDFAnnotation_1.default;
    } });
    var PDFWidgetAnnotation_1 = require_PDFWidgetAnnotation();
    Object.defineProperty(exports, "PDFWidgetAnnotation", { enumerable: true, get: function() {
      return PDFWidgetAnnotation_1.default;
    } });
    var AppearanceCharacteristics_1 = require_AppearanceCharacteristics();
    Object.defineProperty(exports, "AppearanceCharacteristics", { enumerable: true, get: function() {
      return AppearanceCharacteristics_1.default;
    } });
    tslib_1.__exportStar(require_flags2(), exports);
  }
});

// node_modules/pdf-lib/cjs/core/index.js
var require_core = __commonJS({
  "node_modules/pdf-lib/cjs/core/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_errors2(), exports);
    var CharCodes_1 = require_CharCodes();
    Object.defineProperty(exports, "CharCodes", { enumerable: true, get: function() {
      return CharCodes_1.default;
    } });
    var PDFContext_1 = require_PDFContext();
    Object.defineProperty(exports, "PDFContext", { enumerable: true, get: function() {
      return PDFContext_1.default;
    } });
    var PDFObjectCopier_1 = require_PDFObjectCopier();
    Object.defineProperty(exports, "PDFObjectCopier", { enumerable: true, get: function() {
      return PDFObjectCopier_1.default;
    } });
    var PDFWriter_1 = require_PDFWriter();
    Object.defineProperty(exports, "PDFWriter", { enumerable: true, get: function() {
      return PDFWriter_1.default;
    } });
    var PDFStreamWriter_1 = require_PDFStreamWriter();
    Object.defineProperty(exports, "PDFStreamWriter", { enumerable: true, get: function() {
      return PDFStreamWriter_1.default;
    } });
    var PDFHeader_1 = require_PDFHeader();
    Object.defineProperty(exports, "PDFHeader", { enumerable: true, get: function() {
      return PDFHeader_1.default;
    } });
    var PDFTrailer_1 = require_PDFTrailer();
    Object.defineProperty(exports, "PDFTrailer", { enumerable: true, get: function() {
      return PDFTrailer_1.default;
    } });
    var PDFTrailerDict_1 = require_PDFTrailerDict();
    Object.defineProperty(exports, "PDFTrailerDict", { enumerable: true, get: function() {
      return PDFTrailerDict_1.default;
    } });
    var PDFCrossRefSection_1 = require_PDFCrossRefSection();
    Object.defineProperty(exports, "PDFCrossRefSection", { enumerable: true, get: function() {
      return PDFCrossRefSection_1.default;
    } });
    var StandardFontEmbedder_1 = require_StandardFontEmbedder();
    Object.defineProperty(exports, "StandardFontEmbedder", { enumerable: true, get: function() {
      return StandardFontEmbedder_1.default;
    } });
    var CustomFontEmbedder_1 = require_CustomFontEmbedder();
    Object.defineProperty(exports, "CustomFontEmbedder", { enumerable: true, get: function() {
      return CustomFontEmbedder_1.default;
    } });
    var CustomFontSubsetEmbedder_1 = require_CustomFontSubsetEmbedder();
    Object.defineProperty(exports, "CustomFontSubsetEmbedder", { enumerable: true, get: function() {
      return CustomFontSubsetEmbedder_1.default;
    } });
    var FileEmbedder_1 = require_FileEmbedder();
    Object.defineProperty(exports, "FileEmbedder", { enumerable: true, get: function() {
      return FileEmbedder_1.default;
    } });
    Object.defineProperty(exports, "AFRelationship", { enumerable: true, get: function() {
      return FileEmbedder_1.AFRelationship;
    } });
    var JpegEmbedder_1 = require_JpegEmbedder();
    Object.defineProperty(exports, "JpegEmbedder", { enumerable: true, get: function() {
      return JpegEmbedder_1.default;
    } });
    var PngEmbedder_1 = require_PngEmbedder();
    Object.defineProperty(exports, "PngEmbedder", { enumerable: true, get: function() {
      return PngEmbedder_1.default;
    } });
    var PDFPageEmbedder_1 = require_PDFPageEmbedder();
    Object.defineProperty(exports, "PDFPageEmbedder", { enumerable: true, get: function() {
      return PDFPageEmbedder_1.default;
    } });
    var ViewerPreferences_1 = require_ViewerPreferences();
    Object.defineProperty(exports, "ViewerPreferences", { enumerable: true, get: function() {
      return ViewerPreferences_1.default;
    } });
    Object.defineProperty(exports, "NonFullScreenPageMode", { enumerable: true, get: function() {
      return ViewerPreferences_1.NonFullScreenPageMode;
    } });
    Object.defineProperty(exports, "ReadingDirection", { enumerable: true, get: function() {
      return ViewerPreferences_1.ReadingDirection;
    } });
    Object.defineProperty(exports, "PrintScaling", { enumerable: true, get: function() {
      return ViewerPreferences_1.PrintScaling;
    } });
    Object.defineProperty(exports, "Duplex", { enumerable: true, get: function() {
      return ViewerPreferences_1.Duplex;
    } });
    var PDFObject_1 = require_PDFObject();
    Object.defineProperty(exports, "PDFObject", { enumerable: true, get: function() {
      return PDFObject_1.default;
    } });
    var PDFBool_1 = require_PDFBool();
    Object.defineProperty(exports, "PDFBool", { enumerable: true, get: function() {
      return PDFBool_1.default;
    } });
    var PDFNumber_1 = require_PDFNumber();
    Object.defineProperty(exports, "PDFNumber", { enumerable: true, get: function() {
      return PDFNumber_1.default;
    } });
    var PDFString_1 = require_PDFString();
    Object.defineProperty(exports, "PDFString", { enumerable: true, get: function() {
      return PDFString_1.default;
    } });
    var PDFHexString_1 = require_PDFHexString();
    Object.defineProperty(exports, "PDFHexString", { enumerable: true, get: function() {
      return PDFHexString_1.default;
    } });
    var PDFName_1 = require_PDFName();
    Object.defineProperty(exports, "PDFName", { enumerable: true, get: function() {
      return PDFName_1.default;
    } });
    var PDFNull_1 = require_PDFNull();
    Object.defineProperty(exports, "PDFNull", { enumerable: true, get: function() {
      return PDFNull_1.default;
    } });
    var PDFArray_1 = require_PDFArray();
    Object.defineProperty(exports, "PDFArray", { enumerable: true, get: function() {
      return PDFArray_1.default;
    } });
    var PDFDict_1 = require_PDFDict();
    Object.defineProperty(exports, "PDFDict", { enumerable: true, get: function() {
      return PDFDict_1.default;
    } });
    var PDFRef_1 = require_PDFRef();
    Object.defineProperty(exports, "PDFRef", { enumerable: true, get: function() {
      return PDFRef_1.default;
    } });
    var PDFInvalidObject_1 = require_PDFInvalidObject();
    Object.defineProperty(exports, "PDFInvalidObject", { enumerable: true, get: function() {
      return PDFInvalidObject_1.default;
    } });
    var PDFStream_1 = require_PDFStream();
    Object.defineProperty(exports, "PDFStream", { enumerable: true, get: function() {
      return PDFStream_1.default;
    } });
    var PDFRawStream_1 = require_PDFRawStream();
    Object.defineProperty(exports, "PDFRawStream", { enumerable: true, get: function() {
      return PDFRawStream_1.default;
    } });
    var PDFCatalog_1 = require_PDFCatalog();
    Object.defineProperty(exports, "PDFCatalog", { enumerable: true, get: function() {
      return PDFCatalog_1.default;
    } });
    var PDFContentStream_1 = require_PDFContentStream();
    Object.defineProperty(exports, "PDFContentStream", { enumerable: true, get: function() {
      return PDFContentStream_1.default;
    } });
    var PDFCrossRefStream_1 = require_PDFCrossRefStream();
    Object.defineProperty(exports, "PDFCrossRefStream", { enumerable: true, get: function() {
      return PDFCrossRefStream_1.default;
    } });
    var PDFObjectStream_1 = require_PDFObjectStream();
    Object.defineProperty(exports, "PDFObjectStream", { enumerable: true, get: function() {
      return PDFObjectStream_1.default;
    } });
    var PDFPageTree_1 = require_PDFPageTree();
    Object.defineProperty(exports, "PDFPageTree", { enumerable: true, get: function() {
      return PDFPageTree_1.default;
    } });
    var PDFPageLeaf_1 = require_PDFPageLeaf();
    Object.defineProperty(exports, "PDFPageLeaf", { enumerable: true, get: function() {
      return PDFPageLeaf_1.default;
    } });
    var PDFFlateStream_1 = require_PDFFlateStream();
    Object.defineProperty(exports, "PDFFlateStream", { enumerable: true, get: function() {
      return PDFFlateStream_1.default;
    } });
    var PDFOperator_1 = require_PDFOperator();
    Object.defineProperty(exports, "PDFOperator", { enumerable: true, get: function() {
      return PDFOperator_1.default;
    } });
    var PDFOperatorNames_1 = require_PDFOperatorNames();
    Object.defineProperty(exports, "PDFOperatorNames", { enumerable: true, get: function() {
      return PDFOperatorNames_1.default;
    } });
    var PDFObjectParser_1 = require_PDFObjectParser();
    Object.defineProperty(exports, "PDFObjectParser", { enumerable: true, get: function() {
      return PDFObjectParser_1.default;
    } });
    var PDFObjectStreamParser_1 = require_PDFObjectStreamParser();
    Object.defineProperty(exports, "PDFObjectStreamParser", { enumerable: true, get: function() {
      return PDFObjectStreamParser_1.default;
    } });
    var PDFParser_1 = require_PDFParser();
    Object.defineProperty(exports, "PDFParser", { enumerable: true, get: function() {
      return PDFParser_1.default;
    } });
    var PDFXRefStreamParser_1 = require_PDFXRefStreamParser();
    Object.defineProperty(exports, "PDFXRefStreamParser", { enumerable: true, get: function() {
      return PDFXRefStreamParser_1.default;
    } });
    var decode_1 = require_decode();
    Object.defineProperty(exports, "decodePDFRawStream", { enumerable: true, get: function() {
      return decode_1.decodePDFRawStream;
    } });
    tslib_1.__exportStar(require_annotation(), exports);
    tslib_1.__exportStar(require_acroform(), exports);
  }
});

// node_modules/pdf-lib/cjs/api/objects.js
var require_objects2 = __commonJS({
  "node_modules/pdf-lib/cjs/api/objects.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.asNumber = exports.asPDFNumber = exports.asPDFName = void 0;
    var core_1 = require_core();
    exports.asPDFName = function(name) {
      return name instanceof core_1.PDFName ? name : core_1.PDFName.of(name);
    };
    exports.asPDFNumber = function(num) {
      return num instanceof core_1.PDFNumber ? num : core_1.PDFNumber.of(num);
    };
    exports.asNumber = function(num) {
      return num instanceof core_1.PDFNumber ? num.asNumber() : num;
    };
  }
});

// node_modules/pdf-lib/cjs/api/rotations.js
var require_rotations = __commonJS({
  "node_modules/pdf-lib/cjs/api/rotations.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.rotateRectangle = exports.adjustDimsForRotation = exports.reduceRotation = exports.toDegrees = exports.toRadians = exports.radiansToDegrees = exports.degreesToRadians = exports.degrees = exports.radians = exports.RotationTypes = void 0;
    var utils_1 = require_utils2();
    var RotationTypes;
    (function(RotationTypes2) {
      RotationTypes2["Degrees"] = "degrees";
      RotationTypes2["Radians"] = "radians";
    })(RotationTypes = exports.RotationTypes || (exports.RotationTypes = {}));
    exports.radians = function(radianAngle) {
      utils_1.assertIs(radianAngle, "radianAngle", ["number"]);
      return { type: RotationTypes.Radians, angle: radianAngle };
    };
    exports.degrees = function(degreeAngle) {
      utils_1.assertIs(degreeAngle, "degreeAngle", ["number"]);
      return { type: RotationTypes.Degrees, angle: degreeAngle };
    };
    var Radians = RotationTypes.Radians;
    var Degrees = RotationTypes.Degrees;
    exports.degreesToRadians = function(degree) {
      return degree * Math.PI / 180;
    };
    exports.radiansToDegrees = function(radian) {
      return radian * 180 / Math.PI;
    };
    exports.toRadians = function(rotation) {
      return rotation.type === Radians ? rotation.angle : rotation.type === Degrees ? exports.degreesToRadians(rotation.angle) : utils_1.error("Invalid rotation: " + JSON.stringify(rotation));
    };
    exports.toDegrees = function(rotation) {
      return rotation.type === Radians ? exports.radiansToDegrees(rotation.angle) : rotation.type === Degrees ? rotation.angle : utils_1.error("Invalid rotation: " + JSON.stringify(rotation));
    };
    exports.reduceRotation = function(degreeAngle) {
      if (degreeAngle === void 0) {
        degreeAngle = 0;
      }
      var quadrants = degreeAngle / 90 % 4;
      if (quadrants === 0)
        return 0;
      if (quadrants === 1)
        return 90;
      if (quadrants === 2)
        return 180;
      if (quadrants === 3)
        return 270;
      return 0;
    };
    exports.adjustDimsForRotation = function(dims, degreeAngle) {
      if (degreeAngle === void 0) {
        degreeAngle = 0;
      }
      var rotation = exports.reduceRotation(degreeAngle);
      return rotation === 90 || rotation === 270 ? { width: dims.height, height: dims.width } : { width: dims.width, height: dims.height };
    };
    exports.rotateRectangle = function(rectangle, borderWidth, degreeAngle) {
      if (borderWidth === void 0) {
        borderWidth = 0;
      }
      if (degreeAngle === void 0) {
        degreeAngle = 0;
      }
      var x = rectangle.x, y = rectangle.y, w = rectangle.width, h = rectangle.height;
      var r = exports.reduceRotation(degreeAngle);
      var b = borderWidth / 2;
      if (r === 0)
        return { x: x - b, y: y - b, width: w, height: h };
      else if (r === 90)
        return { x: x - h + b, y: y - b, width: h, height: w };
      else if (r === 180)
        return { x: x - w + b, y: y - h + b, width: w, height: h };
      else if (r === 270)
        return { x: x - b, y: y - w + b, width: h, height: w };
      else
        return { x: x - b, y: y - b, width: w, height: h };
    };
  }
});

// node_modules/pdf-lib/cjs/api/operators.js
var require_operators = __commonJS({
  "node_modules/pdf-lib/cjs/api/operators.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.endMarkedContent = exports.beginMarkedContent = exports.setStrokingCmykColor = exports.setFillingCmykColor = exports.setStrokingRgbColor = exports.setFillingRgbColor = exports.setStrokingGrayscaleColor = exports.setFillingGrayscaleColor = exports.drawObject = exports.rotateAndSkewTextDegreesAndTranslate = exports.rotateAndSkewTextRadiansAndTranslate = exports.setTextMatrix = exports.setTextRenderingMode = exports.TextRenderingMode = exports.setTextRise = exports.setLineHeight = exports.setCharacterSqueeze = exports.setWordSpacing = exports.setCharacterSpacing = exports.setFontAndSize = exports.endText = exports.beginText = exports.showText = exports.moveText = exports.nextLine = exports.endPath = exports.fillAndStroke = exports.fill = exports.stroke = exports.square = exports.rectangle = exports.lineTo = exports.moveTo = exports.closePath = exports.appendQuadraticCurve = exports.appendBezierCurve = exports.setLineWidth = exports.popGraphicsState = exports.pushGraphicsState = exports.setGraphicsState = exports.setLineJoin = exports.LineJoinStyle = exports.setLineCap = exports.LineCapStyle = exports.restoreDashPattern = exports.setDashPattern = exports.skewDegrees = exports.skewRadians = exports.rotateDegrees = exports.rotateRadians = exports.scale = exports.translate = exports.concatTransformationMatrix = exports.clipEvenOdd = exports.clip = void 0;
    var objects_1 = require_objects2();
    var rotations_1 = require_rotations();
    var core_1 = require_core();
    exports.clip = function() {
      return core_1.PDFOperator.of(core_1.PDFOperatorNames.ClipNonZero);
    };
    exports.clipEvenOdd = function() {
      return core_1.PDFOperator.of(core_1.PDFOperatorNames.ClipEvenOdd);
    };
    var cos = Math.cos;
    var sin = Math.sin;
    var tan = Math.tan;
    exports.concatTransformationMatrix = function(a, b, c, d, e, f) {
      return core_1.PDFOperator.of(core_1.PDFOperatorNames.ConcatTransformationMatrix, [
        objects_1.asPDFNumber(a),
        objects_1.asPDFNumber(b),
        objects_1.asPDFNumber(c),
        objects_1.asPDFNumber(d),
        objects_1.asPDFNumber(e),
        objects_1.asPDFNumber(f)
      ]);
    };
    exports.translate = function(xPos, yPos) {
      return exports.concatTransformationMatrix(1, 0, 0, 1, xPos, yPos);
    };
    exports.scale = function(xPos, yPos) {
      return exports.concatTransformationMatrix(xPos, 0, 0, yPos, 0, 0);
    };
    exports.rotateRadians = function(angle) {
      return exports.concatTransformationMatrix(cos(objects_1.asNumber(angle)), sin(objects_1.asNumber(angle)), -sin(objects_1.asNumber(angle)), cos(objects_1.asNumber(angle)), 0, 0);
    };
    exports.rotateDegrees = function(angle) {
      return exports.rotateRadians(rotations_1.degreesToRadians(objects_1.asNumber(angle)));
    };
    exports.skewRadians = function(xSkewAngle, ySkewAngle) {
      return exports.concatTransformationMatrix(1, tan(objects_1.asNumber(xSkewAngle)), tan(objects_1.asNumber(ySkewAngle)), 1, 0, 0);
    };
    exports.skewDegrees = function(xSkewAngle, ySkewAngle) {
      return exports.skewRadians(rotations_1.degreesToRadians(objects_1.asNumber(xSkewAngle)), rotations_1.degreesToRadians(objects_1.asNumber(ySkewAngle)));
    };
    exports.setDashPattern = function(dashArray, dashPhase) {
      return core_1.PDFOperator.of(core_1.PDFOperatorNames.SetLineDashPattern, [
        "[" + dashArray.map(objects_1.asPDFNumber).join(" ") + "]",
        objects_1.asPDFNumber(dashPhase)
      ]);
    };
    exports.restoreDashPattern = function() {
      return exports.setDashPattern([], 0);
    };
    var LineCapStyle;
    (function(LineCapStyle2) {
      LineCapStyle2[LineCapStyle2["Butt"] = 0] = "Butt";
      LineCapStyle2[LineCapStyle2["Round"] = 1] = "Round";
      LineCapStyle2[LineCapStyle2["Projecting"] = 2] = "Projecting";
    })(LineCapStyle = exports.LineCapStyle || (exports.LineCapStyle = {}));
    exports.setLineCap = function(style) {
      return core_1.PDFOperator.of(core_1.PDFOperatorNames.SetLineCapStyle, [objects_1.asPDFNumber(style)]);
    };
    var LineJoinStyle;
    (function(LineJoinStyle2) {
      LineJoinStyle2[LineJoinStyle2["Miter"] = 0] = "Miter";
      LineJoinStyle2[LineJoinStyle2["Round"] = 1] = "Round";
      LineJoinStyle2[LineJoinStyle2["Bevel"] = 2] = "Bevel";
    })(LineJoinStyle = exports.LineJoinStyle || (exports.LineJoinStyle = {}));
    exports.setLineJoin = function(style) {
      return core_1.PDFOperator.of(core_1.PDFOperatorNames.SetLineJoinStyle, [objects_1.asPDFNumber(style)]);
    };
    exports.setGraphicsState = function(state) {
      return core_1.PDFOperator.of(core_1.PDFOperatorNames.SetGraphicsStateParams, [objects_1.asPDFName(state)]);
    };
    exports.pushGraphicsState = function() {
      return core_1.PDFOperator.of(core_1.PDFOperatorNames.PushGraphicsState);
    };
    exports.popGraphicsState = function() {
      return core_1.PDFOperator.of(core_1.PDFOperatorNames.PopGraphicsState);
    };
    exports.setLineWidth = function(width) {
      return core_1.PDFOperator.of(core_1.PDFOperatorNames.SetLineWidth, [objects_1.asPDFNumber(width)]);
    };
    exports.appendBezierCurve = function(x1, y1, x2, y2, x3, y3) {
      return core_1.PDFOperator.of(core_1.PDFOperatorNames.AppendBezierCurve, [
        objects_1.asPDFNumber(x1),
        objects_1.asPDFNumber(y1),
        objects_1.asPDFNumber(x2),
        objects_1.asPDFNumber(y2),
        objects_1.asPDFNumber(x3),
        objects_1.asPDFNumber(y3)
      ]);
    };
    exports.appendQuadraticCurve = function(x1, y1, x2, y2) {
      return core_1.PDFOperator.of(core_1.PDFOperatorNames.CurveToReplicateInitialPoint, [
        objects_1.asPDFNumber(x1),
        objects_1.asPDFNumber(y1),
        objects_1.asPDFNumber(x2),
        objects_1.asPDFNumber(y2)
      ]);
    };
    exports.closePath = function() {
      return core_1.PDFOperator.of(core_1.PDFOperatorNames.ClosePath);
    };
    exports.moveTo = function(xPos, yPos) {
      return core_1.PDFOperator.of(core_1.PDFOperatorNames.MoveTo, [objects_1.asPDFNumber(xPos), objects_1.asPDFNumber(yPos)]);
    };
    exports.lineTo = function(xPos, yPos) {
      return core_1.PDFOperator.of(core_1.PDFOperatorNames.LineTo, [objects_1.asPDFNumber(xPos), objects_1.asPDFNumber(yPos)]);
    };
    exports.rectangle = function(xPos, yPos, width, height) {
      return core_1.PDFOperator.of(core_1.PDFOperatorNames.AppendRectangle, [
        objects_1.asPDFNumber(xPos),
        objects_1.asPDFNumber(yPos),
        objects_1.asPDFNumber(width),
        objects_1.asPDFNumber(height)
      ]);
    };
    exports.square = function(xPos, yPos, size) {
      return exports.rectangle(xPos, yPos, size, size);
    };
    exports.stroke = function() {
      return core_1.PDFOperator.of(core_1.PDFOperatorNames.StrokePath);
    };
    exports.fill = function() {
      return core_1.PDFOperator.of(core_1.PDFOperatorNames.FillNonZero);
    };
    exports.fillAndStroke = function() {
      return core_1.PDFOperator.of(core_1.PDFOperatorNames.FillNonZeroAndStroke);
    };
    exports.endPath = function() {
      return core_1.PDFOperator.of(core_1.PDFOperatorNames.EndPath);
    };
    exports.nextLine = function() {
      return core_1.PDFOperator.of(core_1.PDFOperatorNames.NextLine);
    };
    exports.moveText = function(x, y) {
      return core_1.PDFOperator.of(core_1.PDFOperatorNames.MoveText, [objects_1.asPDFNumber(x), objects_1.asPDFNumber(y)]);
    };
    exports.showText = function(text) {
      return core_1.PDFOperator.of(core_1.PDFOperatorNames.ShowText, [text]);
    };
    exports.beginText = function() {
      return core_1.PDFOperator.of(core_1.PDFOperatorNames.BeginText);
    };
    exports.endText = function() {
      return core_1.PDFOperator.of(core_1.PDFOperatorNames.EndText);
    };
    exports.setFontAndSize = function(name, size) {
      return core_1.PDFOperator.of(core_1.PDFOperatorNames.SetFontAndSize, [objects_1.asPDFName(name), objects_1.asPDFNumber(size)]);
    };
    exports.setCharacterSpacing = function(spacing) {
      return core_1.PDFOperator.of(core_1.PDFOperatorNames.SetCharacterSpacing, [objects_1.asPDFNumber(spacing)]);
    };
    exports.setWordSpacing = function(spacing) {
      return core_1.PDFOperator.of(core_1.PDFOperatorNames.SetWordSpacing, [objects_1.asPDFNumber(spacing)]);
    };
    exports.setCharacterSqueeze = function(squeeze) {
      return core_1.PDFOperator.of(core_1.PDFOperatorNames.SetTextHorizontalScaling, [objects_1.asPDFNumber(squeeze)]);
    };
    exports.setLineHeight = function(lineHeight) {
      return core_1.PDFOperator.of(core_1.PDFOperatorNames.SetTextLineHeight, [objects_1.asPDFNumber(lineHeight)]);
    };
    exports.setTextRise = function(rise) {
      return core_1.PDFOperator.of(core_1.PDFOperatorNames.SetTextRise, [objects_1.asPDFNumber(rise)]);
    };
    var TextRenderingMode;
    (function(TextRenderingMode2) {
      TextRenderingMode2[TextRenderingMode2["Fill"] = 0] = "Fill";
      TextRenderingMode2[TextRenderingMode2["Outline"] = 1] = "Outline";
      TextRenderingMode2[TextRenderingMode2["FillAndOutline"] = 2] = "FillAndOutline";
      TextRenderingMode2[TextRenderingMode2["Invisible"] = 3] = "Invisible";
      TextRenderingMode2[TextRenderingMode2["FillAndClip"] = 4] = "FillAndClip";
      TextRenderingMode2[TextRenderingMode2["OutlineAndClip"] = 5] = "OutlineAndClip";
      TextRenderingMode2[TextRenderingMode2["FillAndOutlineAndClip"] = 6] = "FillAndOutlineAndClip";
      TextRenderingMode2[TextRenderingMode2["Clip"] = 7] = "Clip";
    })(TextRenderingMode = exports.TextRenderingMode || (exports.TextRenderingMode = {}));
    exports.setTextRenderingMode = function(mode) {
      return core_1.PDFOperator.of(core_1.PDFOperatorNames.SetTextRenderingMode, [objects_1.asPDFNumber(mode)]);
    };
    exports.setTextMatrix = function(a, b, c, d, e, f) {
      return core_1.PDFOperator.of(core_1.PDFOperatorNames.SetTextMatrix, [
        objects_1.asPDFNumber(a),
        objects_1.asPDFNumber(b),
        objects_1.asPDFNumber(c),
        objects_1.asPDFNumber(d),
        objects_1.asPDFNumber(e),
        objects_1.asPDFNumber(f)
      ]);
    };
    exports.rotateAndSkewTextRadiansAndTranslate = function(rotationAngle, xSkewAngle, ySkewAngle, x, y) {
      return exports.setTextMatrix(cos(objects_1.asNumber(rotationAngle)), sin(objects_1.asNumber(rotationAngle)) + tan(objects_1.asNumber(xSkewAngle)), -sin(objects_1.asNumber(rotationAngle)) + tan(objects_1.asNumber(ySkewAngle)), cos(objects_1.asNumber(rotationAngle)), x, y);
    };
    exports.rotateAndSkewTextDegreesAndTranslate = function(rotationAngle, xSkewAngle, ySkewAngle, x, y) {
      return exports.rotateAndSkewTextRadiansAndTranslate(rotations_1.degreesToRadians(objects_1.asNumber(rotationAngle)), rotations_1.degreesToRadians(objects_1.asNumber(xSkewAngle)), rotations_1.degreesToRadians(objects_1.asNumber(ySkewAngle)), x, y);
    };
    exports.drawObject = function(name) {
      return core_1.PDFOperator.of(core_1.PDFOperatorNames.DrawObject, [objects_1.asPDFName(name)]);
    };
    exports.setFillingGrayscaleColor = function(gray) {
      return core_1.PDFOperator.of(core_1.PDFOperatorNames.NonStrokingColorGray, [objects_1.asPDFNumber(gray)]);
    };
    exports.setStrokingGrayscaleColor = function(gray) {
      return core_1.PDFOperator.of(core_1.PDFOperatorNames.StrokingColorGray, [objects_1.asPDFNumber(gray)]);
    };
    exports.setFillingRgbColor = function(red, green, blue) {
      return core_1.PDFOperator.of(core_1.PDFOperatorNames.NonStrokingColorRgb, [
        objects_1.asPDFNumber(red),
        objects_1.asPDFNumber(green),
        objects_1.asPDFNumber(blue)
      ]);
    };
    exports.setStrokingRgbColor = function(red, green, blue) {
      return core_1.PDFOperator.of(core_1.PDFOperatorNames.StrokingColorRgb, [
        objects_1.asPDFNumber(red),
        objects_1.asPDFNumber(green),
        objects_1.asPDFNumber(blue)
      ]);
    };
    exports.setFillingCmykColor = function(cyan, magenta, yellow, key) {
      return core_1.PDFOperator.of(core_1.PDFOperatorNames.NonStrokingColorCmyk, [
        objects_1.asPDFNumber(cyan),
        objects_1.asPDFNumber(magenta),
        objects_1.asPDFNumber(yellow),
        objects_1.asPDFNumber(key)
      ]);
    };
    exports.setStrokingCmykColor = function(cyan, magenta, yellow, key) {
      return core_1.PDFOperator.of(core_1.PDFOperatorNames.StrokingColorCmyk, [
        objects_1.asPDFNumber(cyan),
        objects_1.asPDFNumber(magenta),
        objects_1.asPDFNumber(yellow),
        objects_1.asPDFNumber(key)
      ]);
    };
    exports.beginMarkedContent = function(tag) {
      return core_1.PDFOperator.of(core_1.PDFOperatorNames.BeginMarkedContent, [objects_1.asPDFName(tag)]);
    };
    exports.endMarkedContent = function() {
      return core_1.PDFOperator.of(core_1.PDFOperatorNames.EndMarkedContent);
    };
  }
});

// node_modules/pdf-lib/cjs/api/colors.js
var require_colors = __commonJS({
  "node_modules/pdf-lib/cjs/api/colors.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.colorToComponents = exports.componentsToColor = exports.setStrokingColor = exports.setFillingColor = exports.cmyk = exports.rgb = exports.grayscale = exports.ColorTypes = void 0;
    var operators_1 = require_operators();
    var utils_1 = require_utils2();
    var ColorTypes;
    (function(ColorTypes2) {
      ColorTypes2["Grayscale"] = "Grayscale";
      ColorTypes2["RGB"] = "RGB";
      ColorTypes2["CMYK"] = "CMYK";
    })(ColorTypes = exports.ColorTypes || (exports.ColorTypes = {}));
    exports.grayscale = function(gray) {
      utils_1.assertRange(gray, "gray", 0, 1);
      return { type: ColorTypes.Grayscale, gray };
    };
    exports.rgb = function(red, green, blue) {
      utils_1.assertRange(red, "red", 0, 1);
      utils_1.assertRange(green, "green", 0, 1);
      utils_1.assertRange(blue, "blue", 0, 1);
      return { type: ColorTypes.RGB, red, green, blue };
    };
    exports.cmyk = function(cyan, magenta, yellow, key) {
      utils_1.assertRange(cyan, "cyan", 0, 1);
      utils_1.assertRange(magenta, "magenta", 0, 1);
      utils_1.assertRange(yellow, "yellow", 0, 1);
      utils_1.assertRange(key, "key", 0, 1);
      return { type: ColorTypes.CMYK, cyan, magenta, yellow, key };
    };
    var Grayscale = ColorTypes.Grayscale;
    var RGB = ColorTypes.RGB;
    var CMYK = ColorTypes.CMYK;
    exports.setFillingColor = function(color) {
      return color.type === Grayscale ? operators_1.setFillingGrayscaleColor(color.gray) : color.type === RGB ? operators_1.setFillingRgbColor(color.red, color.green, color.blue) : color.type === CMYK ? operators_1.setFillingCmykColor(color.cyan, color.magenta, color.yellow, color.key) : utils_1.error("Invalid color: " + JSON.stringify(color));
    };
    exports.setStrokingColor = function(color) {
      return color.type === Grayscale ? operators_1.setStrokingGrayscaleColor(color.gray) : color.type === RGB ? operators_1.setStrokingRgbColor(color.red, color.green, color.blue) : color.type === CMYK ? operators_1.setStrokingCmykColor(color.cyan, color.magenta, color.yellow, color.key) : utils_1.error("Invalid color: " + JSON.stringify(color));
    };
    exports.componentsToColor = function(comps, scale) {
      if (scale === void 0) {
        scale = 1;
      }
      return (comps === null || comps === void 0 ? void 0 : comps.length) === 1 ? exports.grayscale(comps[0] * scale) : (comps === null || comps === void 0 ? void 0 : comps.length) === 3 ? exports.rgb(comps[0] * scale, comps[1] * scale, comps[2] * scale) : (comps === null || comps === void 0 ? void 0 : comps.length) === 4 ? exports.cmyk(comps[0] * scale, comps[1] * scale, comps[2] * scale, comps[3] * scale) : void 0;
    };
    exports.colorToComponents = function(color) {
      return color.type === Grayscale ? [color.gray] : color.type === RGB ? [color.red, color.green, color.blue] : color.type === CMYK ? [color.cyan, color.magenta, color.yellow, color.key] : utils_1.error("Invalid color: " + JSON.stringify(color));
    };
  }
});

// node_modules/pdf-lib/cjs/api/svgPath.js
var require_svgPath = __commonJS({
  "node_modules/pdf-lib/cjs/api/svgPath.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.svgPathToOperators = void 0;
    var operators_1 = require_operators();
    var cx = 0;
    var cy = 0;
    var px = 0;
    var py = 0;
    var sx = 0;
    var sy = 0;
    var parameters = /* @__PURE__ */ new Map([
      ["A", 7],
      ["a", 7],
      ["C", 6],
      ["c", 6],
      ["H", 1],
      ["h", 1],
      ["L", 2],
      ["l", 2],
      ["M", 2],
      ["m", 2],
      ["Q", 4],
      ["q", 4],
      ["S", 4],
      ["s", 4],
      ["T", 2],
      ["t", 2],
      ["V", 1],
      ["v", 1],
      ["Z", 0],
      ["z", 0]
    ]);
    var parse = function(path) {
      var cmd;
      var ret = [];
      var args = [];
      var curArg = "";
      var foundDecimal = false;
      var params = 0;
      for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
        var c = path_1[_i];
        if (parameters.has(c)) {
          params = parameters.get(c);
          if (cmd) {
            if (curArg.length > 0) {
              args[args.length] = +curArg;
            }
            ret[ret.length] = { cmd, args };
            args = [];
            curArg = "";
            foundDecimal = false;
          }
          cmd = c;
        } else if ([" ", ","].includes(c) || c === "-" && curArg.length > 0 && curArg[curArg.length - 1] !== "e" || c === "." && foundDecimal) {
          if (curArg.length === 0) {
            continue;
          }
          if (args.length === params) {
            ret[ret.length] = { cmd, args };
            args = [+curArg];
            if (cmd === "M") {
              cmd = "L";
            }
            if (cmd === "m") {
              cmd = "l";
            }
          } else {
            args[args.length] = +curArg;
          }
          foundDecimal = c === ".";
          curArg = ["-", "."].includes(c) ? c : "";
        } else {
          curArg += c;
          if (c === ".") {
            foundDecimal = true;
          }
        }
      }
      if (curArg.length > 0) {
        if (args.length === params) {
          ret[ret.length] = { cmd, args };
          args = [+curArg];
          if (cmd === "M") {
            cmd = "L";
          }
          if (cmd === "m") {
            cmd = "l";
          }
        } else {
          args[args.length] = +curArg;
        }
      }
      ret[ret.length] = { cmd, args };
      return ret;
    };
    var apply = function(commands) {
      cx = cy = px = py = sx = sy = 0;
      var cmds = [];
      for (var i = 0; i < commands.length; i++) {
        var c = commands[i];
        if (c.cmd && typeof runners[c.cmd] === "function") {
          var cmd = runners[c.cmd](c.args);
          if (Array.isArray(cmd)) {
            cmds = cmds.concat(cmd);
          } else {
            cmds.push(cmd);
          }
        }
      }
      return cmds;
    };
    var runners = {
      M: function(a) {
        cx = a[0];
        cy = a[1];
        px = py = null;
        sx = cx;
        sy = cy;
        return operators_1.moveTo(cx, cy);
      },
      m: function(a) {
        cx += a[0];
        cy += a[1];
        px = py = null;
        sx = cx;
        sy = cy;
        return operators_1.moveTo(cx, cy);
      },
      C: function(a) {
        cx = a[4];
        cy = a[5];
        px = a[2];
        py = a[3];
        return operators_1.appendBezierCurve(a[0], a[1], a[2], a[3], a[4], a[5]);
      },
      c: function(a) {
        var cmd = operators_1.appendBezierCurve(a[0] + cx, a[1] + cy, a[2] + cx, a[3] + cy, a[4] + cx, a[5] + cy);
        px = cx + a[2];
        py = cy + a[3];
        cx += a[4];
        cy += a[5];
        return cmd;
      },
      S: function(a) {
        if (px === null || py === null) {
          px = cx;
          py = cy;
        }
        var cmd = operators_1.appendBezierCurve(cx - (px - cx), cy - (py - cy), a[0], a[1], a[2], a[3]);
        px = a[0];
        py = a[1];
        cx = a[2];
        cy = a[3];
        return cmd;
      },
      s: function(a) {
        if (px === null || py === null) {
          px = cx;
          py = cy;
        }
        var cmd = operators_1.appendBezierCurve(cx - (px - cx), cy - (py - cy), cx + a[0], cy + a[1], cx + a[2], cy + a[3]);
        px = cx + a[0];
        py = cy + a[1];
        cx += a[2];
        cy += a[3];
        return cmd;
      },
      Q: function(a) {
        px = a[0];
        py = a[1];
        cx = a[2];
        cy = a[3];
        return operators_1.appendQuadraticCurve(a[0], a[1], cx, cy);
      },
      q: function(a) {
        var cmd = operators_1.appendQuadraticCurve(a[0] + cx, a[1] + cy, a[2] + cx, a[3] + cy);
        px = cx + a[0];
        py = cy + a[1];
        cx += a[2];
        cy += a[3];
        return cmd;
      },
      T: function(a) {
        if (px === null || py === null) {
          px = cx;
          py = cy;
        } else {
          px = cx - (px - cx);
          py = cy - (py - cy);
        }
        var cmd = operators_1.appendQuadraticCurve(px, py, a[0], a[1]);
        px = cx - (px - cx);
        py = cy - (py - cy);
        cx = a[0];
        cy = a[1];
        return cmd;
      },
      t: function(a) {
        if (px === null || py === null) {
          px = cx;
          py = cy;
        } else {
          px = cx - (px - cx);
          py = cy - (py - cy);
        }
        var cmd = operators_1.appendQuadraticCurve(px, py, cx + a[0], cy + a[1]);
        cx += a[0];
        cy += a[1];
        return cmd;
      },
      A: function(a) {
        var cmds = solveArc(cx, cy, a);
        cx = a[5];
        cy = a[6];
        return cmds;
      },
      a: function(a) {
        a[5] += cx;
        a[6] += cy;
        var cmds = solveArc(cx, cy, a);
        cx = a[5];
        cy = a[6];
        return cmds;
      },
      L: function(a) {
        cx = a[0];
        cy = a[1];
        px = py = null;
        return operators_1.lineTo(cx, cy);
      },
      l: function(a) {
        cx += a[0];
        cy += a[1];
        px = py = null;
        return operators_1.lineTo(cx, cy);
      },
      H: function(a) {
        cx = a[0];
        px = py = null;
        return operators_1.lineTo(cx, cy);
      },
      h: function(a) {
        cx += a[0];
        px = py = null;
        return operators_1.lineTo(cx, cy);
      },
      V: function(a) {
        cy = a[0];
        px = py = null;
        return operators_1.lineTo(cx, cy);
      },
      v: function(a) {
        cy += a[0];
        px = py = null;
        return operators_1.lineTo(cx, cy);
      },
      Z: function() {
        var cmd = operators_1.closePath();
        cx = sx;
        cy = sy;
        return cmd;
      },
      z: function() {
        var cmd = operators_1.closePath();
        cx = sx;
        cy = sy;
        return cmd;
      }
    };
    var solveArc = function(x, y, coords) {
      var rx = coords[0], ry = coords[1], rot = coords[2], large = coords[3], sweep = coords[4], ex = coords[5], ey = coords[6];
      var segs = arcToSegments(ex, ey, rx, ry, large, sweep, rot, x, y);
      var cmds = [];
      for (var _i = 0, segs_1 = segs; _i < segs_1.length; _i++) {
        var seg = segs_1[_i];
        var bez = segmentToBezier.apply(void 0, seg);
        cmds.push(operators_1.appendBezierCurve.apply(void 0, bez));
      }
      return cmds;
    };
    var arcToSegments = function(x, y, rx, ry, large, sweep, rotateX, ox, oy) {
      var th = rotateX * (Math.PI / 180);
      var sinTh = Math.sin(th);
      var cosTh = Math.cos(th);
      rx = Math.abs(rx);
      ry = Math.abs(ry);
      px = cosTh * (ox - x) * 0.5 + sinTh * (oy - y) * 0.5;
      py = cosTh * (oy - y) * 0.5 - sinTh * (ox - x) * 0.5;
      var pl = px * px / (rx * rx) + py * py / (ry * ry);
      if (pl > 1) {
        pl = Math.sqrt(pl);
        rx *= pl;
        ry *= pl;
      }
      var a00 = cosTh / rx;
      var a01 = sinTh / rx;
      var a10 = -sinTh / ry;
      var a11 = cosTh / ry;
      var x0 = a00 * ox + a01 * oy;
      var y0 = a10 * ox + a11 * oy;
      var x1 = a00 * x + a01 * y;
      var y1 = a10 * x + a11 * y;
      var d = (x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0);
      var sfactorSq = 1 / d - 0.25;
      if (sfactorSq < 0) {
        sfactorSq = 0;
      }
      var sfactor = Math.sqrt(sfactorSq);
      if (sweep === large) {
        sfactor = -sfactor;
      }
      var xc = 0.5 * (x0 + x1) - sfactor * (y1 - y0);
      var yc = 0.5 * (y0 + y1) + sfactor * (x1 - x0);
      var th0 = Math.atan2(y0 - yc, x0 - xc);
      var th1 = Math.atan2(y1 - yc, x1 - xc);
      var thArc = th1 - th0;
      if (thArc < 0 && sweep === 1) {
        thArc += 2 * Math.PI;
      } else if (thArc > 0 && sweep === 0) {
        thArc -= 2 * Math.PI;
      }
      var segments = Math.ceil(Math.abs(thArc / (Math.PI * 0.5 + 1e-3)));
      var result = [];
      for (var i = 0; i < segments; i++) {
        var th2 = th0 + i * thArc / segments;
        var th3 = th0 + (i + 1) * thArc / segments;
        result[i] = [xc, yc, th2, th3, rx, ry, sinTh, cosTh];
      }
      return result;
    };
    var segmentToBezier = function(cx1, cy1, th0, th1, rx, ry, sinTh, cosTh) {
      var a00 = cosTh * rx;
      var a01 = -sinTh * ry;
      var a10 = sinTh * rx;
      var a11 = cosTh * ry;
      var thHalf = 0.5 * (th1 - th0);
      var t = 8 / 3 * Math.sin(thHalf * 0.5) * Math.sin(thHalf * 0.5) / Math.sin(thHalf);
      var x1 = cx1 + Math.cos(th0) - t * Math.sin(th0);
      var y1 = cy1 + Math.sin(th0) + t * Math.cos(th0);
      var x3 = cx1 + Math.cos(th1);
      var y3 = cy1 + Math.sin(th1);
      var x2 = x3 + t * Math.sin(th1);
      var y2 = y3 - t * Math.cos(th1);
      var result = [
        a00 * x1 + a01 * y1,
        a10 * x1 + a11 * y1,
        a00 * x2 + a01 * y2,
        a10 * x2 + a11 * y2,
        a00 * x3 + a01 * y3,
        a10 * x3 + a11 * y3
      ];
      return result;
    };
    exports.svgPathToOperators = function(path) {
      return apply(parse(path));
    };
  }
});

// node_modules/pdf-lib/cjs/api/operations.js
var require_operations = __commonJS({
  "node_modules/pdf-lib/cjs/api/operations.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.drawOptionList = exports.drawTextField = exports.drawTextLines = exports.drawButton = exports.drawRadioButton = exports.drawCheckBox = exports.rotateInPlace = exports.drawCheckMark = exports.drawSvgPath = exports.drawEllipse = exports.drawEllipsePath = exports.drawRectangle = exports.drawLine = exports.drawPage = exports.drawImage = exports.drawLinesOfText = exports.drawText = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var colors_1 = require_colors();
    var operators_1 = require_operators();
    var rotations_1 = require_rotations();
    var svgPath_1 = require_svgPath();
    var objects_1 = require_objects2();
    exports.drawText = function(line, options) {
      return [
        operators_1.pushGraphicsState(),
        options.graphicsState && operators_1.setGraphicsState(options.graphicsState),
        operators_1.beginText(),
        colors_1.setFillingColor(options.color),
        operators_1.setFontAndSize(options.font, options.size),
        operators_1.rotateAndSkewTextRadiansAndTranslate(rotations_1.toRadians(options.rotate), rotations_1.toRadians(options.xSkew), rotations_1.toRadians(options.ySkew), options.x, options.y),
        operators_1.showText(line),
        operators_1.endText(),
        operators_1.popGraphicsState()
      ].filter(Boolean);
    };
    exports.drawLinesOfText = function(lines, options) {
      var operators = [
        operators_1.pushGraphicsState(),
        options.graphicsState && operators_1.setGraphicsState(options.graphicsState),
        operators_1.beginText(),
        colors_1.setFillingColor(options.color),
        operators_1.setFontAndSize(options.font, options.size),
        operators_1.setLineHeight(options.lineHeight),
        operators_1.rotateAndSkewTextRadiansAndTranslate(rotations_1.toRadians(options.rotate), rotations_1.toRadians(options.xSkew), rotations_1.toRadians(options.ySkew), options.x, options.y)
      ].filter(Boolean);
      for (var idx = 0, len = lines.length; idx < len; idx++) {
        operators.push(operators_1.showText(lines[idx]), operators_1.nextLine());
      }
      operators.push(operators_1.endText(), operators_1.popGraphicsState());
      return operators;
    };
    exports.drawImage = function(name, options) {
      return [
        operators_1.pushGraphicsState(),
        options.graphicsState && operators_1.setGraphicsState(options.graphicsState),
        operators_1.translate(options.x, options.y),
        operators_1.rotateRadians(rotations_1.toRadians(options.rotate)),
        operators_1.scale(options.width, options.height),
        operators_1.skewRadians(rotations_1.toRadians(options.xSkew), rotations_1.toRadians(options.ySkew)),
        operators_1.drawObject(name),
        operators_1.popGraphicsState()
      ].filter(Boolean);
    };
    exports.drawPage = function(name, options) {
      return [
        operators_1.pushGraphicsState(),
        options.graphicsState && operators_1.setGraphicsState(options.graphicsState),
        operators_1.translate(options.x, options.y),
        operators_1.rotateRadians(rotations_1.toRadians(options.rotate)),
        operators_1.scale(options.xScale, options.yScale),
        operators_1.skewRadians(rotations_1.toRadians(options.xSkew), rotations_1.toRadians(options.ySkew)),
        operators_1.drawObject(name),
        operators_1.popGraphicsState()
      ].filter(Boolean);
    };
    exports.drawLine = function(options) {
      var _a, _b;
      return [
        operators_1.pushGraphicsState(),
        options.graphicsState && operators_1.setGraphicsState(options.graphicsState),
        options.color && colors_1.setStrokingColor(options.color),
        operators_1.setLineWidth(options.thickness),
        operators_1.setDashPattern((_a = options.dashArray) !== null && _a !== void 0 ? _a : [], (_b = options.dashPhase) !== null && _b !== void 0 ? _b : 0),
        operators_1.moveTo(options.start.x, options.start.y),
        options.lineCap && operators_1.setLineCap(options.lineCap),
        operators_1.moveTo(options.start.x, options.start.y),
        operators_1.lineTo(options.end.x, options.end.y),
        operators_1.stroke(),
        operators_1.popGraphicsState()
      ].filter(Boolean);
    };
    exports.drawRectangle = function(options) {
      var _a, _b;
      return [
        operators_1.pushGraphicsState(),
        options.graphicsState && operators_1.setGraphicsState(options.graphicsState),
        options.color && colors_1.setFillingColor(options.color),
        options.borderColor && colors_1.setStrokingColor(options.borderColor),
        operators_1.setLineWidth(options.borderWidth),
        options.borderLineCap && operators_1.setLineCap(options.borderLineCap),
        operators_1.setDashPattern((_a = options.borderDashArray) !== null && _a !== void 0 ? _a : [], (_b = options.borderDashPhase) !== null && _b !== void 0 ? _b : 0),
        operators_1.translate(options.x, options.y),
        operators_1.rotateRadians(rotations_1.toRadians(options.rotate)),
        operators_1.skewRadians(rotations_1.toRadians(options.xSkew), rotations_1.toRadians(options.ySkew)),
        operators_1.moveTo(0, 0),
        operators_1.lineTo(0, options.height),
        operators_1.lineTo(options.width, options.height),
        operators_1.lineTo(options.width, 0),
        operators_1.closePath(),
        // prettier-ignore
        options.color && options.borderWidth ? operators_1.fillAndStroke() : options.color ? operators_1.fill() : options.borderColor ? operators_1.stroke() : operators_1.closePath(),
        operators_1.popGraphicsState()
      ].filter(Boolean);
    };
    var KAPPA = 4 * ((Math.sqrt(2) - 1) / 3);
    exports.drawEllipsePath = function(config) {
      var x = objects_1.asNumber(config.x);
      var y = objects_1.asNumber(config.y);
      var xScale = objects_1.asNumber(config.xScale);
      var yScale = objects_1.asNumber(config.yScale);
      x -= xScale;
      y -= yScale;
      var ox = xScale * KAPPA;
      var oy = yScale * KAPPA;
      var xe = x + xScale * 2;
      var ye = y + yScale * 2;
      var xm = x + xScale;
      var ym = y + yScale;
      return [
        operators_1.pushGraphicsState(),
        operators_1.moveTo(x, ym),
        operators_1.appendBezierCurve(x, ym - oy, xm - ox, y, xm, y),
        operators_1.appendBezierCurve(xm + ox, y, xe, ym - oy, xe, ym),
        operators_1.appendBezierCurve(xe, ym + oy, xm + ox, ye, xm, ye),
        operators_1.appendBezierCurve(xm - ox, ye, x, ym + oy, x, ym),
        operators_1.popGraphicsState()
      ];
    };
    var drawEllipseCurves = function(config) {
      var centerX = objects_1.asNumber(config.x);
      var centerY = objects_1.asNumber(config.y);
      var xScale = objects_1.asNumber(config.xScale);
      var yScale = objects_1.asNumber(config.yScale);
      var x = -xScale;
      var y = -yScale;
      var ox = xScale * KAPPA;
      var oy = yScale * KAPPA;
      var xe = x + xScale * 2;
      var ye = y + yScale * 2;
      var xm = x + xScale;
      var ym = y + yScale;
      return [
        operators_1.translate(centerX, centerY),
        operators_1.rotateRadians(rotations_1.toRadians(config.rotate)),
        operators_1.moveTo(x, ym),
        operators_1.appendBezierCurve(x, ym - oy, xm - ox, y, xm, y),
        operators_1.appendBezierCurve(xm + ox, y, xe, ym - oy, xe, ym),
        operators_1.appendBezierCurve(xe, ym + oy, xm + ox, ye, xm, ye),
        operators_1.appendBezierCurve(xm - ox, ye, x, ym + oy, x, ym)
      ];
    };
    exports.drawEllipse = function(options) {
      var _a, _b, _c;
      return tslib_1.__spreadArrays([
        operators_1.pushGraphicsState(),
        options.graphicsState && operators_1.setGraphicsState(options.graphicsState),
        options.color && colors_1.setFillingColor(options.color),
        options.borderColor && colors_1.setStrokingColor(options.borderColor),
        operators_1.setLineWidth(options.borderWidth),
        options.borderLineCap && operators_1.setLineCap(options.borderLineCap),
        operators_1.setDashPattern((_a = options.borderDashArray) !== null && _a !== void 0 ? _a : [], (_b = options.borderDashPhase) !== null && _b !== void 0 ? _b : 0)
      ], options.rotate === void 0 ? exports.drawEllipsePath({
        x: options.x,
        y: options.y,
        xScale: options.xScale,
        yScale: options.yScale
      }) : drawEllipseCurves({
        x: options.x,
        y: options.y,
        xScale: options.xScale,
        yScale: options.yScale,
        rotate: (_c = options.rotate) !== null && _c !== void 0 ? _c : rotations_1.degrees(0)
      }), [
        // prettier-ignore
        options.color && options.borderWidth ? operators_1.fillAndStroke() : options.color ? operators_1.fill() : options.borderColor ? operators_1.stroke() : operators_1.closePath(),
        operators_1.popGraphicsState()
      ]).filter(Boolean);
    };
    exports.drawSvgPath = function(path, options) {
      var _a, _b, _c;
      return tslib_1.__spreadArrays([
        operators_1.pushGraphicsState(),
        options.graphicsState && operators_1.setGraphicsState(options.graphicsState),
        operators_1.translate(options.x, options.y),
        operators_1.rotateRadians(rotations_1.toRadians((_a = options.rotate) !== null && _a !== void 0 ? _a : rotations_1.degrees(0))),
        // SVG path Y axis is opposite pdf-lib's
        options.scale ? operators_1.scale(options.scale, -options.scale) : operators_1.scale(1, -1),
        options.color && colors_1.setFillingColor(options.color),
        options.borderColor && colors_1.setStrokingColor(options.borderColor),
        options.borderWidth && operators_1.setLineWidth(options.borderWidth),
        options.borderLineCap && operators_1.setLineCap(options.borderLineCap),
        operators_1.setDashPattern((_b = options.borderDashArray) !== null && _b !== void 0 ? _b : [], (_c = options.borderDashPhase) !== null && _c !== void 0 ? _c : 0)
      ], svgPath_1.svgPathToOperators(path), [
        // prettier-ignore
        options.color && options.borderWidth ? operators_1.fillAndStroke() : options.color ? operators_1.fill() : options.borderColor ? operators_1.stroke() : operators_1.closePath(),
        operators_1.popGraphicsState()
      ]).filter(Boolean);
    };
    exports.drawCheckMark = function(options) {
      var size = objects_1.asNumber(options.size);
      var p2x = -1 + 0.75;
      var p2y = -1 + 0.51;
      var p3y = 1 - 0.525;
      var p3x = 1 - 0.31;
      var p1x = -1 + 0.325;
      var p1y = -((p1x - p2x) * (p3x - p2x)) / (p3y - p2y) + p2y;
      return [
        operators_1.pushGraphicsState(),
        options.color && colors_1.setStrokingColor(options.color),
        operators_1.setLineWidth(options.thickness),
        operators_1.translate(options.x, options.y),
        operators_1.moveTo(p1x * size, p1y * size),
        operators_1.lineTo(p2x * size, p2y * size),
        operators_1.lineTo(p3x * size, p3y * size),
        operators_1.stroke(),
        operators_1.popGraphicsState()
      ].filter(Boolean);
    };
    exports.rotateInPlace = function(options) {
      return options.rotation === 0 ? [
        operators_1.translate(0, 0),
        operators_1.rotateDegrees(0)
      ] : options.rotation === 90 ? [
        operators_1.translate(options.width, 0),
        operators_1.rotateDegrees(90)
      ] : options.rotation === 180 ? [
        operators_1.translate(options.width, options.height),
        operators_1.rotateDegrees(180)
      ] : options.rotation === 270 ? [
        operators_1.translate(0, options.height),
        operators_1.rotateDegrees(270)
      ] : [];
    };
    exports.drawCheckBox = function(options) {
      var outline = exports.drawRectangle({
        x: options.x,
        y: options.y,
        width: options.width,
        height: options.height,
        borderWidth: options.borderWidth,
        color: options.color,
        borderColor: options.borderColor,
        rotate: rotations_1.degrees(0),
        xSkew: rotations_1.degrees(0),
        ySkew: rotations_1.degrees(0)
      });
      if (!options.filled)
        return outline;
      var width = objects_1.asNumber(options.width);
      var height = objects_1.asNumber(options.height);
      var checkMarkSize = Math.min(width, height) / 2;
      var checkMark = exports.drawCheckMark({
        x: width / 2,
        y: height / 2,
        size: checkMarkSize,
        thickness: options.thickness,
        color: options.markColor
      });
      return tslib_1.__spreadArrays([operators_1.pushGraphicsState()], outline, checkMark, [operators_1.popGraphicsState()]);
    };
    exports.drawRadioButton = function(options) {
      var width = objects_1.asNumber(options.width);
      var height = objects_1.asNumber(options.height);
      var outlineScale = Math.min(width, height) / 2;
      var outline = exports.drawEllipse({
        x: options.x,
        y: options.y,
        xScale: outlineScale,
        yScale: outlineScale,
        color: options.color,
        borderColor: options.borderColor,
        borderWidth: options.borderWidth
      });
      if (!options.filled)
        return outline;
      var dot = exports.drawEllipse({
        x: options.x,
        y: options.y,
        xScale: outlineScale * 0.45,
        yScale: outlineScale * 0.45,
        color: options.dotColor,
        borderColor: void 0,
        borderWidth: 0
      });
      return tslib_1.__spreadArrays([operators_1.pushGraphicsState()], outline, dot, [operators_1.popGraphicsState()]);
    };
    exports.drawButton = function(options) {
      var x = objects_1.asNumber(options.x);
      var y = objects_1.asNumber(options.y);
      var width = objects_1.asNumber(options.width);
      var height = objects_1.asNumber(options.height);
      var background = exports.drawRectangle({
        x,
        y,
        width,
        height,
        borderWidth: options.borderWidth,
        color: options.color,
        borderColor: options.borderColor,
        rotate: rotations_1.degrees(0),
        xSkew: rotations_1.degrees(0),
        ySkew: rotations_1.degrees(0)
      });
      var lines = exports.drawTextLines(options.textLines, {
        color: options.textColor,
        font: options.font,
        size: options.fontSize,
        rotate: rotations_1.degrees(0),
        xSkew: rotations_1.degrees(0),
        ySkew: rotations_1.degrees(0)
      });
      return tslib_1.__spreadArrays([operators_1.pushGraphicsState()], background, lines, [operators_1.popGraphicsState()]);
    };
    exports.drawTextLines = function(lines, options) {
      var operators = [
        operators_1.beginText(),
        colors_1.setFillingColor(options.color),
        operators_1.setFontAndSize(options.font, options.size)
      ];
      for (var idx = 0, len = lines.length; idx < len; idx++) {
        var _a = lines[idx], encoded = _a.encoded, x = _a.x, y = _a.y;
        operators.push(operators_1.rotateAndSkewTextRadiansAndTranslate(rotations_1.toRadians(options.rotate), rotations_1.toRadians(options.xSkew), rotations_1.toRadians(options.ySkew), x, y), operators_1.showText(encoded));
      }
      operators.push(operators_1.endText());
      return operators;
    };
    exports.drawTextField = function(options) {
      var x = objects_1.asNumber(options.x);
      var y = objects_1.asNumber(options.y);
      var width = objects_1.asNumber(options.width);
      var height = objects_1.asNumber(options.height);
      var borderWidth = objects_1.asNumber(options.borderWidth);
      var padding = objects_1.asNumber(options.padding);
      var clipX = x + borderWidth / 2 + padding;
      var clipY = y + borderWidth / 2 + padding;
      var clipWidth = width - (borderWidth / 2 + padding) * 2;
      var clipHeight = height - (borderWidth / 2 + padding) * 2;
      var clippingArea = [
        operators_1.moveTo(clipX, clipY),
        operators_1.lineTo(clipX, clipY + clipHeight),
        operators_1.lineTo(clipX + clipWidth, clipY + clipHeight),
        operators_1.lineTo(clipX + clipWidth, clipY),
        operators_1.closePath(),
        operators_1.clip(),
        operators_1.endPath()
      ];
      var background = exports.drawRectangle({
        x,
        y,
        width,
        height,
        borderWidth: options.borderWidth,
        color: options.color,
        borderColor: options.borderColor,
        rotate: rotations_1.degrees(0),
        xSkew: rotations_1.degrees(0),
        ySkew: rotations_1.degrees(0)
      });
      var lines = exports.drawTextLines(options.textLines, {
        color: options.textColor,
        font: options.font,
        size: options.fontSize,
        rotate: rotations_1.degrees(0),
        xSkew: rotations_1.degrees(0),
        ySkew: rotations_1.degrees(0)
      });
      var markedContent = tslib_1.__spreadArrays([
        operators_1.beginMarkedContent("Tx"),
        operators_1.pushGraphicsState()
      ], lines, [
        operators_1.popGraphicsState(),
        operators_1.endMarkedContent()
      ]);
      return tslib_1.__spreadArrays([
        operators_1.pushGraphicsState()
      ], background, clippingArea, markedContent, [
        operators_1.popGraphicsState()
      ]);
    };
    exports.drawOptionList = function(options) {
      var x = objects_1.asNumber(options.x);
      var y = objects_1.asNumber(options.y);
      var width = objects_1.asNumber(options.width);
      var height = objects_1.asNumber(options.height);
      var lineHeight = objects_1.asNumber(options.lineHeight);
      var borderWidth = objects_1.asNumber(options.borderWidth);
      var padding = objects_1.asNumber(options.padding);
      var clipX = x + borderWidth / 2 + padding;
      var clipY = y + borderWidth / 2 + padding;
      var clipWidth = width - (borderWidth / 2 + padding) * 2;
      var clipHeight = height - (borderWidth / 2 + padding) * 2;
      var clippingArea = [
        operators_1.moveTo(clipX, clipY),
        operators_1.lineTo(clipX, clipY + clipHeight),
        operators_1.lineTo(clipX + clipWidth, clipY + clipHeight),
        operators_1.lineTo(clipX + clipWidth, clipY),
        operators_1.closePath(),
        operators_1.clip(),
        operators_1.endPath()
      ];
      var background = exports.drawRectangle({
        x,
        y,
        width,
        height,
        borderWidth: options.borderWidth,
        color: options.color,
        borderColor: options.borderColor,
        rotate: rotations_1.degrees(0),
        xSkew: rotations_1.degrees(0),
        ySkew: rotations_1.degrees(0)
      });
      var highlights = [];
      for (var idx = 0, len = options.selectedLines.length; idx < len; idx++) {
        var line = options.textLines[options.selectedLines[idx]];
        highlights.push.apply(highlights, exports.drawRectangle({
          x: line.x - padding,
          y: line.y - (lineHeight - line.height) / 2,
          width: width - borderWidth,
          height: line.height + (lineHeight - line.height) / 2,
          borderWidth: 0,
          color: options.selectedColor,
          borderColor: void 0,
          rotate: rotations_1.degrees(0),
          xSkew: rotations_1.degrees(0),
          ySkew: rotations_1.degrees(0)
        }));
      }
      var lines = exports.drawTextLines(options.textLines, {
        color: options.textColor,
        font: options.font,
        size: options.fontSize,
        rotate: rotations_1.degrees(0),
        xSkew: rotations_1.degrees(0),
        ySkew: rotations_1.degrees(0)
      });
      var markedContent = tslib_1.__spreadArrays([
        operators_1.beginMarkedContent("Tx"),
        operators_1.pushGraphicsState()
      ], lines, [
        operators_1.popGraphicsState(),
        operators_1.endMarkedContent()
      ]);
      return tslib_1.__spreadArrays([
        operators_1.pushGraphicsState()
      ], background, highlights, clippingArea, markedContent, [
        operators_1.popGraphicsState()
      ]);
    };
  }
});

// node_modules/pdf-lib/cjs/api/errors.js
var require_errors3 = __commonJS({
  "node_modules/pdf-lib/cjs/api/errors.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InvalidMaxLengthError = exports.ExceededMaxLengthError = exports.CombedTextLayoutError = exports.RichTextFieldReadError = exports.FieldExistsAsNonTerminalError = exports.InvalidFieldNamePartError = exports.FieldAlreadyExistsError = exports.MissingOnValueCheckError = exports.UnexpectedFieldTypeError = exports.NoSuchFieldError = exports.RemovePageFromEmptyDocumentError = exports.ForeignPageError = exports.FontkitNotRegisteredError = exports.EncryptedPDFError = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var EncryptedPDFError = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(EncryptedPDFError2, _super);
        function EncryptedPDFError2() {
          var _this = this;
          var msg = "Input document to `PDFDocument.load` is encrypted. You can use `PDFDocument.load(..., { ignoreEncryption: true })` if you wish to load the document anyways.";
          _this = _super.call(this, msg) || this;
          return _this;
        }
        return EncryptedPDFError2;
      })(Error)
    );
    exports.EncryptedPDFError = EncryptedPDFError;
    var FontkitNotRegisteredError = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(FontkitNotRegisteredError2, _super);
        function FontkitNotRegisteredError2() {
          var _this = this;
          var msg = "Input to `PDFDocument.embedFont` was a custom font, but no `fontkit` instance was found. You must register a `fontkit` instance with `PDFDocument.registerFontkit(...)` before embedding custom fonts.";
          _this = _super.call(this, msg) || this;
          return _this;
        }
        return FontkitNotRegisteredError2;
      })(Error)
    );
    exports.FontkitNotRegisteredError = FontkitNotRegisteredError;
    var ForeignPageError = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(ForeignPageError2, _super);
        function ForeignPageError2() {
          var _this = this;
          var msg = "A `page` passed to `PDFDocument.addPage` or `PDFDocument.insertPage` was from a different (foreign) PDF document. If you want to copy pages from one PDFDocument to another, you must use `PDFDocument.copyPages(...)` to copy the pages before adding or inserting them.";
          _this = _super.call(this, msg) || this;
          return _this;
        }
        return ForeignPageError2;
      })(Error)
    );
    exports.ForeignPageError = ForeignPageError;
    var RemovePageFromEmptyDocumentError = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(RemovePageFromEmptyDocumentError2, _super);
        function RemovePageFromEmptyDocumentError2() {
          var _this = this;
          var msg = "PDFDocument has no pages so `PDFDocument.removePage` cannot be called";
          _this = _super.call(this, msg) || this;
          return _this;
        }
        return RemovePageFromEmptyDocumentError2;
      })(Error)
    );
    exports.RemovePageFromEmptyDocumentError = RemovePageFromEmptyDocumentError;
    var NoSuchFieldError = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(NoSuchFieldError2, _super);
        function NoSuchFieldError2(name) {
          var _this = this;
          var msg = 'PDFDocument has no form field with the name "' + name + '"';
          _this = _super.call(this, msg) || this;
          return _this;
        }
        return NoSuchFieldError2;
      })(Error)
    );
    exports.NoSuchFieldError = NoSuchFieldError;
    var UnexpectedFieldTypeError = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(UnexpectedFieldTypeError2, _super);
        function UnexpectedFieldTypeError2(name, expected, actual) {
          var _a, _b;
          var _this = this;
          var expectedType = expected === null || expected === void 0 ? void 0 : expected.name;
          var actualType = (_b = (_a = actual === null || actual === void 0 ? void 0 : actual.constructor) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : actual;
          var msg = 'Expected field "' + name + '" to be of type ' + expectedType + ", " + ("but it is actually of type " + actualType);
          _this = _super.call(this, msg) || this;
          return _this;
        }
        return UnexpectedFieldTypeError2;
      })(Error)
    );
    exports.UnexpectedFieldTypeError = UnexpectedFieldTypeError;
    var MissingOnValueCheckError = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(MissingOnValueCheckError2, _super);
        function MissingOnValueCheckError2(onValue) {
          var _this = this;
          var msg = 'Failed to select check box due to missing onValue: "' + onValue + '"';
          _this = _super.call(this, msg) || this;
          return _this;
        }
        return MissingOnValueCheckError2;
      })(Error)
    );
    exports.MissingOnValueCheckError = MissingOnValueCheckError;
    var FieldAlreadyExistsError = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(FieldAlreadyExistsError2, _super);
        function FieldAlreadyExistsError2(name) {
          var _this = this;
          var msg = 'A field already exists with the specified name: "' + name + '"';
          _this = _super.call(this, msg) || this;
          return _this;
        }
        return FieldAlreadyExistsError2;
      })(Error)
    );
    exports.FieldAlreadyExistsError = FieldAlreadyExistsError;
    var InvalidFieldNamePartError = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(InvalidFieldNamePartError2, _super);
        function InvalidFieldNamePartError2(namePart) {
          var _this = this;
          var msg = 'Field name contains invalid component: "' + namePart + '"';
          _this = _super.call(this, msg) || this;
          return _this;
        }
        return InvalidFieldNamePartError2;
      })(Error)
    );
    exports.InvalidFieldNamePartError = InvalidFieldNamePartError;
    var FieldExistsAsNonTerminalError = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(FieldExistsAsNonTerminalError2, _super);
        function FieldExistsAsNonTerminalError2(name) {
          var _this = this;
          var msg = 'A non-terminal field already exists with the specified name: "' + name + '"';
          _this = _super.call(this, msg) || this;
          return _this;
        }
        return FieldExistsAsNonTerminalError2;
      })(Error)
    );
    exports.FieldExistsAsNonTerminalError = FieldExistsAsNonTerminalError;
    var RichTextFieldReadError = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(RichTextFieldReadError2, _super);
        function RichTextFieldReadError2(fieldName) {
          var _this = this;
          var msg = "Reading rich text fields is not supported: Attempted to read rich text field: " + fieldName;
          _this = _super.call(this, msg) || this;
          return _this;
        }
        return RichTextFieldReadError2;
      })(Error)
    );
    exports.RichTextFieldReadError = RichTextFieldReadError;
    var CombedTextLayoutError = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(CombedTextLayoutError2, _super);
        function CombedTextLayoutError2(lineLength, cellCount) {
          var _this = this;
          var msg = "Failed to layout combed text as lineLength=" + lineLength + " is greater than cellCount=" + cellCount;
          _this = _super.call(this, msg) || this;
          return _this;
        }
        return CombedTextLayoutError2;
      })(Error)
    );
    exports.CombedTextLayoutError = CombedTextLayoutError;
    var ExceededMaxLengthError = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(ExceededMaxLengthError2, _super);
        function ExceededMaxLengthError2(textLength, maxLength, name) {
          var _this = this;
          var msg = "Attempted to set text with length=" + textLength + " for TextField with maxLength=" + maxLength + " and name=" + name;
          _this = _super.call(this, msg) || this;
          return _this;
        }
        return ExceededMaxLengthError2;
      })(Error)
    );
    exports.ExceededMaxLengthError = ExceededMaxLengthError;
    var InvalidMaxLengthError = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(InvalidMaxLengthError2, _super);
        function InvalidMaxLengthError2(textLength, maxLength, name) {
          var _this = this;
          var msg = "Attempted to set maxLength=" + maxLength + ", which is less than " + textLength + ", the length of this field's current value (name=" + name + ")";
          _this = _super.call(this, msg) || this;
          return _this;
        }
        return InvalidMaxLengthError2;
      })(Error)
    );
    exports.InvalidMaxLengthError = InvalidMaxLengthError;
  }
});

// node_modules/pdf-lib/cjs/api/text/alignment.js
var require_alignment = __commonJS({
  "node_modules/pdf-lib/cjs/api/text/alignment.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TextAlignment = void 0;
    var TextAlignment;
    (function(TextAlignment2) {
      TextAlignment2[TextAlignment2["Left"] = 0] = "Left";
      TextAlignment2[TextAlignment2["Center"] = 1] = "Center";
      TextAlignment2[TextAlignment2["Right"] = 2] = "Right";
    })(TextAlignment = exports.TextAlignment || (exports.TextAlignment = {}));
  }
});

// node_modules/pdf-lib/cjs/api/text/layout.js
var require_layout = __commonJS({
  "node_modules/pdf-lib/cjs/api/text/layout.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.layoutSinglelineText = exports.layoutCombedText = exports.layoutMultilineText = void 0;
    var errors_1 = require_errors3();
    var alignment_1 = require_alignment();
    var utils_1 = require_utils2();
    var MIN_FONT_SIZE = 4;
    var MAX_FONT_SIZE = 500;
    var computeFontSize = function(lines, font, bounds, multiline) {
      if (multiline === void 0) {
        multiline = false;
      }
      var fontSize = MIN_FONT_SIZE;
      while (fontSize < MAX_FONT_SIZE) {
        var linesUsed = 0;
        for (var lineIdx = 0, lineLen = lines.length; lineIdx < lineLen; lineIdx++) {
          linesUsed += 1;
          var line = lines[lineIdx];
          var words = line.split(" ");
          var spaceInLineRemaining = bounds.width;
          for (var idx = 0, len = words.length; idx < len; idx++) {
            var isLastWord = idx === len - 1;
            var word = isLastWord ? words[idx] : words[idx] + " ";
            var widthOfWord = font.widthOfTextAtSize(word, fontSize);
            spaceInLineRemaining -= widthOfWord;
            if (spaceInLineRemaining <= 0) {
              linesUsed += 1;
              spaceInLineRemaining = bounds.width - widthOfWord;
            }
          }
        }
        if (!multiline && linesUsed > lines.length)
          return fontSize - 1;
        var height = font.heightAtSize(fontSize);
        var lineHeight = height + height * 0.2;
        var totalHeight = lineHeight * linesUsed;
        if (totalHeight > Math.abs(bounds.height))
          return fontSize - 1;
        fontSize += 1;
      }
      return fontSize;
    };
    var computeCombedFontSize = function(line, font, bounds, cellCount) {
      var cellWidth = bounds.width / cellCount;
      var cellHeight = bounds.height;
      var fontSize = MIN_FONT_SIZE;
      var chars = utils_1.charSplit(line);
      while (fontSize < MAX_FONT_SIZE) {
        for (var idx = 0, len = chars.length; idx < len; idx++) {
          var c = chars[idx];
          var tooLong = font.widthOfTextAtSize(c, fontSize) > cellWidth * 0.75;
          if (tooLong)
            return fontSize - 1;
        }
        var height = font.heightAtSize(fontSize, { descender: false });
        if (height > cellHeight)
          return fontSize - 1;
        fontSize += 1;
      }
      return fontSize;
    };
    var lastIndexOfWhitespace = function(line) {
      for (var idx = line.length; idx > 0; idx--) {
        if (/\s/.test(line[idx]))
          return idx;
      }
      return void 0;
    };
    var splitOutLines = function(input, maxWidth, font, fontSize) {
      var _a;
      var lastWhitespaceIdx = input.length;
      while (lastWhitespaceIdx > 0) {
        var line = input.substring(0, lastWhitespaceIdx);
        var encoded = font.encodeText(line);
        var width = font.widthOfTextAtSize(line, fontSize);
        if (width < maxWidth) {
          var remainder = input.substring(lastWhitespaceIdx) || void 0;
          return { line, encoded, width, remainder };
        }
        lastWhitespaceIdx = (_a = lastIndexOfWhitespace(line)) !== null && _a !== void 0 ? _a : 0;
      }
      return {
        line: input,
        encoded: font.encodeText(input),
        width: font.widthOfTextAtSize(input, fontSize),
        remainder: void 0
      };
    };
    exports.layoutMultilineText = function(text, _a) {
      var alignment = _a.alignment, fontSize = _a.fontSize, font = _a.font, bounds = _a.bounds;
      var lines = utils_1.lineSplit(utils_1.cleanText(text));
      if (fontSize === void 0 || fontSize === 0) {
        fontSize = computeFontSize(lines, font, bounds, true);
      }
      var height = font.heightAtSize(fontSize);
      var lineHeight = height + height * 0.2;
      var textLines = [];
      var minX = bounds.x;
      var minY = bounds.y;
      var maxX = bounds.x + bounds.width;
      var maxY = bounds.y + bounds.height;
      var y = bounds.y + bounds.height;
      for (var idx = 0, len = lines.length; idx < len; idx++) {
        var prevRemainder = lines[idx];
        while (prevRemainder !== void 0) {
          var _b = splitOutLines(prevRemainder, bounds.width, font, fontSize), line = _b.line, encoded = _b.encoded, width = _b.width, remainder = _b.remainder;
          var x = alignment === alignment_1.TextAlignment.Left ? bounds.x : alignment === alignment_1.TextAlignment.Center ? bounds.x + bounds.width / 2 - width / 2 : alignment === alignment_1.TextAlignment.Right ? bounds.x + bounds.width - width : bounds.x;
          y -= lineHeight;
          if (x < minX)
            minX = x;
          if (y < minY)
            minY = y;
          if (x + width > maxX)
            maxX = x + width;
          if (y + height > maxY)
            maxY = y + height;
          textLines.push({ text: line, encoded, width, height, x, y });
          prevRemainder = remainder === null || remainder === void 0 ? void 0 : remainder.trim();
        }
      }
      return {
        fontSize,
        lineHeight,
        lines: textLines,
        bounds: {
          x: minX,
          y: minY,
          width: maxX - minX,
          height: maxY - minY
        }
      };
    };
    exports.layoutCombedText = function(text, _a) {
      var fontSize = _a.fontSize, font = _a.font, bounds = _a.bounds, cellCount = _a.cellCount;
      var line = utils_1.mergeLines(utils_1.cleanText(text));
      if (line.length > cellCount) {
        throw new errors_1.CombedTextLayoutError(line.length, cellCount);
      }
      if (fontSize === void 0 || fontSize === 0) {
        fontSize = computeCombedFontSize(line, font, bounds, cellCount);
      }
      var cellWidth = bounds.width / cellCount;
      var height = font.heightAtSize(fontSize, { descender: false });
      var y = bounds.y + (bounds.height / 2 - height / 2);
      var cells = [];
      var minX = bounds.x;
      var minY = bounds.y;
      var maxX = bounds.x + bounds.width;
      var maxY = bounds.y + bounds.height;
      var cellOffset = 0;
      var charOffset = 0;
      while (cellOffset < cellCount) {
        var _b = utils_1.charAtIndex(line, charOffset), char = _b[0], charLength = _b[1];
        var encoded = font.encodeText(char);
        var width = font.widthOfTextAtSize(char, fontSize);
        var cellCenter = bounds.x + (cellWidth * cellOffset + cellWidth / 2);
        var x = cellCenter - width / 2;
        if (x < minX)
          minX = x;
        if (y < minY)
          minY = y;
        if (x + width > maxX)
          maxX = x + width;
        if (y + height > maxY)
          maxY = y + height;
        cells.push({ text: line, encoded, width, height, x, y });
        cellOffset += 1;
        charOffset += charLength;
      }
      return {
        fontSize,
        cells,
        bounds: {
          x: minX,
          y: minY,
          width: maxX - minX,
          height: maxY - minY
        }
      };
    };
    exports.layoutSinglelineText = function(text, _a) {
      var alignment = _a.alignment, fontSize = _a.fontSize, font = _a.font, bounds = _a.bounds;
      var line = utils_1.mergeLines(utils_1.cleanText(text));
      if (fontSize === void 0 || fontSize === 0) {
        fontSize = computeFontSize([line], font, bounds);
      }
      var encoded = font.encodeText(line);
      var width = font.widthOfTextAtSize(line, fontSize);
      var height = font.heightAtSize(fontSize, { descender: false });
      var x = alignment === alignment_1.TextAlignment.Left ? bounds.x : alignment === alignment_1.TextAlignment.Center ? bounds.x + bounds.width / 2 - width / 2 : alignment === alignment_1.TextAlignment.Right ? bounds.x + bounds.width - width : bounds.x;
      var y = bounds.y + (bounds.height / 2 - height / 2);
      return {
        fontSize,
        line: { text: line, encoded, width, height, x, y },
        bounds: { x, y, width, height }
      };
    };
  }
});

// node_modules/pdf-lib/cjs/api/form/appearances.js
var require_appearances = __commonJS({
  "node_modules/pdf-lib/cjs/api/form/appearances.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.defaultOptionListAppearanceProvider = exports.defaultDropdownAppearanceProvider = exports.defaultTextFieldAppearanceProvider = exports.defaultButtonAppearanceProvider = exports.defaultRadioGroupAppearanceProvider = exports.defaultCheckBoxAppearanceProvider = exports.normalizeAppearance = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var operations_1 = require_operations();
    var colors_1 = require_colors();
    var rotations_1 = require_rotations();
    var layout_1 = require_layout();
    var alignment_1 = require_alignment();
    var operators_1 = require_operators();
    var utils_1 = require_utils2();
    exports.normalizeAppearance = function(appearance) {
      if ("normal" in appearance)
        return appearance;
      return { normal: appearance };
    };
    var tfRegex = /\/([^\0\t\n\f\r\ ]+)[\0\t\n\f\r\ ]+(\d*\.\d+|\d+)[\0\t\n\f\r\ ]+Tf/;
    var getDefaultFontSize = function(field) {
      var _a, _b;
      var da = (_a = field.getDefaultAppearance()) !== null && _a !== void 0 ? _a : "";
      var daMatch = (_b = utils_1.findLastMatch(da, tfRegex).match) !== null && _b !== void 0 ? _b : [];
      var defaultFontSize = Number(daMatch[2]);
      return isFinite(defaultFontSize) ? defaultFontSize : void 0;
    };
    var colorRegex = /(\d*\.\d+|\d+)[\0\t\n\f\r\ ]*(\d*\.\d+|\d+)?[\0\t\n\f\r\ ]*(\d*\.\d+|\d+)?[\0\t\n\f\r\ ]*(\d*\.\d+|\d+)?[\0\t\n\f\r\ ]+(g|rg|k)/;
    var getDefaultColor = function(field) {
      var _a;
      var da = (_a = field.getDefaultAppearance()) !== null && _a !== void 0 ? _a : "";
      var daMatch = utils_1.findLastMatch(da, colorRegex).match;
      var _b = daMatch !== null && daMatch !== void 0 ? daMatch : [], c1 = _b[1], c2 = _b[2], c3 = _b[3], c4 = _b[4], colorSpace = _b[5];
      if (colorSpace === "g" && c1) {
        return colors_1.grayscale(Number(c1));
      }
      if (colorSpace === "rg" && c1 && c2 && c3) {
        return colors_1.rgb(Number(c1), Number(c2), Number(c3));
      }
      if (colorSpace === "k" && c1 && c2 && c3 && c4) {
        return colors_1.cmyk(Number(c1), Number(c2), Number(c3), Number(c4));
      }
      return void 0;
    };
    var updateDefaultAppearance = function(field, color, font, fontSize) {
      var _a;
      if (fontSize === void 0) {
        fontSize = 0;
      }
      var da = [
        colors_1.setFillingColor(color).toString(),
        operators_1.setFontAndSize((_a = font === null || font === void 0 ? void 0 : font.name) !== null && _a !== void 0 ? _a : "dummy__noop", fontSize).toString()
      ].join("\n");
      field.setDefaultAppearance(da);
    };
    exports.defaultCheckBoxAppearanceProvider = function(checkBox, widget) {
      var _a, _b, _c;
      var widgetColor = getDefaultColor(widget);
      var fieldColor = getDefaultColor(checkBox.acroField);
      var rectangle = widget.getRectangle();
      var ap = widget.getAppearanceCharacteristics();
      var bs = widget.getBorderStyle();
      var borderWidth = (_a = bs === null || bs === void 0 ? void 0 : bs.getWidth()) !== null && _a !== void 0 ? _a : 0;
      var rotation = rotations_1.reduceRotation(ap === null || ap === void 0 ? void 0 : ap.getRotation());
      var _d = rotations_1.adjustDimsForRotation(rectangle, rotation), width = _d.width, height = _d.height;
      var rotate = operations_1.rotateInPlace(tslib_1.__assign(tslib_1.__assign({}, rectangle), { rotation }));
      var black = colors_1.rgb(0, 0, 0);
      var borderColor = (_b = colors_1.componentsToColor(ap === null || ap === void 0 ? void 0 : ap.getBorderColor())) !== null && _b !== void 0 ? _b : black;
      var normalBackgroundColor = colors_1.componentsToColor(ap === null || ap === void 0 ? void 0 : ap.getBackgroundColor());
      var downBackgroundColor = colors_1.componentsToColor(ap === null || ap === void 0 ? void 0 : ap.getBackgroundColor(), 0.8);
      var textColor = (_c = widgetColor !== null && widgetColor !== void 0 ? widgetColor : fieldColor) !== null && _c !== void 0 ? _c : black;
      if (widgetColor) {
        updateDefaultAppearance(widget, textColor);
      } else {
        updateDefaultAppearance(checkBox.acroField, textColor);
      }
      var options = {
        x: 0 + borderWidth / 2,
        y: 0 + borderWidth / 2,
        width: width - borderWidth,
        height: height - borderWidth,
        thickness: 1.5,
        borderWidth,
        borderColor,
        markColor: textColor
      };
      return {
        normal: {
          on: tslib_1.__spreadArrays(rotate, operations_1.drawCheckBox(tslib_1.__assign(tslib_1.__assign({}, options), { color: normalBackgroundColor, filled: true }))),
          off: tslib_1.__spreadArrays(rotate, operations_1.drawCheckBox(tslib_1.__assign(tslib_1.__assign({}, options), { color: normalBackgroundColor, filled: false })))
        },
        down: {
          on: tslib_1.__spreadArrays(rotate, operations_1.drawCheckBox(tslib_1.__assign(tslib_1.__assign({}, options), { color: downBackgroundColor, filled: true }))),
          off: tslib_1.__spreadArrays(rotate, operations_1.drawCheckBox(tslib_1.__assign(tslib_1.__assign({}, options), { color: downBackgroundColor, filled: false })))
        }
      };
    };
    exports.defaultRadioGroupAppearanceProvider = function(radioGroup, widget) {
      var _a, _b, _c;
      var widgetColor = getDefaultColor(widget);
      var fieldColor = getDefaultColor(radioGroup.acroField);
      var rectangle = widget.getRectangle();
      var ap = widget.getAppearanceCharacteristics();
      var bs = widget.getBorderStyle();
      var borderWidth = (_a = bs === null || bs === void 0 ? void 0 : bs.getWidth()) !== null && _a !== void 0 ? _a : 0;
      var rotation = rotations_1.reduceRotation(ap === null || ap === void 0 ? void 0 : ap.getRotation());
      var _d = rotations_1.adjustDimsForRotation(rectangle, rotation), width = _d.width, height = _d.height;
      var rotate = operations_1.rotateInPlace(tslib_1.__assign(tslib_1.__assign({}, rectangle), { rotation }));
      var black = colors_1.rgb(0, 0, 0);
      var borderColor = (_b = colors_1.componentsToColor(ap === null || ap === void 0 ? void 0 : ap.getBorderColor())) !== null && _b !== void 0 ? _b : black;
      var normalBackgroundColor = colors_1.componentsToColor(ap === null || ap === void 0 ? void 0 : ap.getBackgroundColor());
      var downBackgroundColor = colors_1.componentsToColor(ap === null || ap === void 0 ? void 0 : ap.getBackgroundColor(), 0.8);
      var textColor = (_c = widgetColor !== null && widgetColor !== void 0 ? widgetColor : fieldColor) !== null && _c !== void 0 ? _c : black;
      if (widgetColor) {
        updateDefaultAppearance(widget, textColor);
      } else {
        updateDefaultAppearance(radioGroup.acroField, textColor);
      }
      var options = {
        x: width / 2,
        y: height / 2,
        width: width - borderWidth,
        height: height - borderWidth,
        borderWidth,
        borderColor,
        dotColor: textColor
      };
      return {
        normal: {
          on: tslib_1.__spreadArrays(rotate, operations_1.drawRadioButton(tslib_1.__assign(tslib_1.__assign({}, options), { color: normalBackgroundColor, filled: true }))),
          off: tslib_1.__spreadArrays(rotate, operations_1.drawRadioButton(tslib_1.__assign(tslib_1.__assign({}, options), { color: normalBackgroundColor, filled: false })))
        },
        down: {
          on: tslib_1.__spreadArrays(rotate, operations_1.drawRadioButton(tslib_1.__assign(tslib_1.__assign({}, options), { color: downBackgroundColor, filled: true }))),
          off: tslib_1.__spreadArrays(rotate, operations_1.drawRadioButton(tslib_1.__assign(tslib_1.__assign({}, options), { color: downBackgroundColor, filled: false })))
        }
      };
    };
    exports.defaultButtonAppearanceProvider = function(button, widget, font) {
      var _a, _b, _c, _d, _e;
      var widgetColor = getDefaultColor(widget);
      var fieldColor = getDefaultColor(button.acroField);
      var widgetFontSize = getDefaultFontSize(widget);
      var fieldFontSize = getDefaultFontSize(button.acroField);
      var rectangle = widget.getRectangle();
      var ap = widget.getAppearanceCharacteristics();
      var bs = widget.getBorderStyle();
      var captions = ap === null || ap === void 0 ? void 0 : ap.getCaptions();
      var normalText = (_a = captions === null || captions === void 0 ? void 0 : captions.normal) !== null && _a !== void 0 ? _a : "";
      var downText = (_c = (_b = captions === null || captions === void 0 ? void 0 : captions.down) !== null && _b !== void 0 ? _b : normalText) !== null && _c !== void 0 ? _c : "";
      var borderWidth = (_d = bs === null || bs === void 0 ? void 0 : bs.getWidth()) !== null && _d !== void 0 ? _d : 0;
      var rotation = rotations_1.reduceRotation(ap === null || ap === void 0 ? void 0 : ap.getRotation());
      var _f = rotations_1.adjustDimsForRotation(rectangle, rotation), width = _f.width, height = _f.height;
      var rotate = operations_1.rotateInPlace(tslib_1.__assign(tslib_1.__assign({}, rectangle), { rotation }));
      var black = colors_1.rgb(0, 0, 0);
      var borderColor = colors_1.componentsToColor(ap === null || ap === void 0 ? void 0 : ap.getBorderColor());
      var normalBackgroundColor = colors_1.componentsToColor(ap === null || ap === void 0 ? void 0 : ap.getBackgroundColor());
      var downBackgroundColor = colors_1.componentsToColor(ap === null || ap === void 0 ? void 0 : ap.getBackgroundColor(), 0.8);
      var bounds = {
        x: borderWidth,
        y: borderWidth,
        width: width - borderWidth * 2,
        height: height - borderWidth * 2
      };
      var normalLayout = layout_1.layoutSinglelineText(normalText, {
        alignment: alignment_1.TextAlignment.Center,
        fontSize: widgetFontSize !== null && widgetFontSize !== void 0 ? widgetFontSize : fieldFontSize,
        font,
        bounds
      });
      var downLayout = layout_1.layoutSinglelineText(downText, {
        alignment: alignment_1.TextAlignment.Center,
        fontSize: widgetFontSize !== null && widgetFontSize !== void 0 ? widgetFontSize : fieldFontSize,
        font,
        bounds
      });
      var fontSize = Math.min(normalLayout.fontSize, downLayout.fontSize);
      var textColor = (_e = widgetColor !== null && widgetColor !== void 0 ? widgetColor : fieldColor) !== null && _e !== void 0 ? _e : black;
      if (widgetColor || widgetFontSize !== void 0) {
        updateDefaultAppearance(widget, textColor, font, fontSize);
      } else {
        updateDefaultAppearance(button.acroField, textColor, font, fontSize);
      }
      var options = {
        x: 0 + borderWidth / 2,
        y: 0 + borderWidth / 2,
        width: width - borderWidth,
        height: height - borderWidth,
        borderWidth,
        borderColor,
        textColor,
        font: font.name,
        fontSize
      };
      return {
        normal: tslib_1.__spreadArrays(rotate, operations_1.drawButton(tslib_1.__assign(tslib_1.__assign({}, options), { color: normalBackgroundColor, textLines: [normalLayout.line] }))),
        down: tslib_1.__spreadArrays(rotate, operations_1.drawButton(tslib_1.__assign(tslib_1.__assign({}, options), { color: downBackgroundColor, textLines: [downLayout.line] })))
      };
    };
    exports.defaultTextFieldAppearanceProvider = function(textField, widget, font) {
      var _a, _b, _c, _d;
      var widgetColor = getDefaultColor(widget);
      var fieldColor = getDefaultColor(textField.acroField);
      var widgetFontSize = getDefaultFontSize(widget);
      var fieldFontSize = getDefaultFontSize(textField.acroField);
      var rectangle = widget.getRectangle();
      var ap = widget.getAppearanceCharacteristics();
      var bs = widget.getBorderStyle();
      var text = (_a = textField.getText()) !== null && _a !== void 0 ? _a : "";
      var borderWidth = (_b = bs === null || bs === void 0 ? void 0 : bs.getWidth()) !== null && _b !== void 0 ? _b : 0;
      var rotation = rotations_1.reduceRotation(ap === null || ap === void 0 ? void 0 : ap.getRotation());
      var _e = rotations_1.adjustDimsForRotation(rectangle, rotation), width = _e.width, height = _e.height;
      var rotate = operations_1.rotateInPlace(tslib_1.__assign(tslib_1.__assign({}, rectangle), { rotation }));
      var black = colors_1.rgb(0, 0, 0);
      var borderColor = colors_1.componentsToColor(ap === null || ap === void 0 ? void 0 : ap.getBorderColor());
      var normalBackgroundColor = colors_1.componentsToColor(ap === null || ap === void 0 ? void 0 : ap.getBackgroundColor());
      var textLines;
      var fontSize;
      var padding = textField.isCombed() ? 0 : 1;
      var bounds = {
        x: borderWidth + padding,
        y: borderWidth + padding,
        width: width - (borderWidth + padding) * 2,
        height: height - (borderWidth + padding) * 2
      };
      if (textField.isMultiline()) {
        var layout = layout_1.layoutMultilineText(text, {
          alignment: textField.getAlignment(),
          fontSize: widgetFontSize !== null && widgetFontSize !== void 0 ? widgetFontSize : fieldFontSize,
          font,
          bounds
        });
        textLines = layout.lines;
        fontSize = layout.fontSize;
      } else if (textField.isCombed()) {
        var layout = layout_1.layoutCombedText(text, {
          fontSize: widgetFontSize !== null && widgetFontSize !== void 0 ? widgetFontSize : fieldFontSize,
          font,
          bounds,
          cellCount: (_c = textField.getMaxLength()) !== null && _c !== void 0 ? _c : 0
        });
        textLines = layout.cells;
        fontSize = layout.fontSize;
      } else {
        var layout = layout_1.layoutSinglelineText(text, {
          alignment: textField.getAlignment(),
          fontSize: widgetFontSize !== null && widgetFontSize !== void 0 ? widgetFontSize : fieldFontSize,
          font,
          bounds
        });
        textLines = [layout.line];
        fontSize = layout.fontSize;
      }
      var textColor = (_d = widgetColor !== null && widgetColor !== void 0 ? widgetColor : fieldColor) !== null && _d !== void 0 ? _d : black;
      if (widgetColor || widgetFontSize !== void 0) {
        updateDefaultAppearance(widget, textColor, font, fontSize);
      } else {
        updateDefaultAppearance(textField.acroField, textColor, font, fontSize);
      }
      var options = {
        x: 0 + borderWidth / 2,
        y: 0 + borderWidth / 2,
        width: width - borderWidth,
        height: height - borderWidth,
        borderWidth: borderWidth !== null && borderWidth !== void 0 ? borderWidth : 0,
        borderColor,
        textColor,
        font: font.name,
        fontSize,
        color: normalBackgroundColor,
        textLines,
        padding
      };
      return tslib_1.__spreadArrays(rotate, operations_1.drawTextField(options));
    };
    exports.defaultDropdownAppearanceProvider = function(dropdown, widget, font) {
      var _a, _b, _c;
      var widgetColor = getDefaultColor(widget);
      var fieldColor = getDefaultColor(dropdown.acroField);
      var widgetFontSize = getDefaultFontSize(widget);
      var fieldFontSize = getDefaultFontSize(dropdown.acroField);
      var rectangle = widget.getRectangle();
      var ap = widget.getAppearanceCharacteristics();
      var bs = widget.getBorderStyle();
      var text = (_a = dropdown.getSelected()[0]) !== null && _a !== void 0 ? _a : "";
      var borderWidth = (_b = bs === null || bs === void 0 ? void 0 : bs.getWidth()) !== null && _b !== void 0 ? _b : 0;
      var rotation = rotations_1.reduceRotation(ap === null || ap === void 0 ? void 0 : ap.getRotation());
      var _d = rotations_1.adjustDimsForRotation(rectangle, rotation), width = _d.width, height = _d.height;
      var rotate = operations_1.rotateInPlace(tslib_1.__assign(tslib_1.__assign({}, rectangle), { rotation }));
      var black = colors_1.rgb(0, 0, 0);
      var borderColor = colors_1.componentsToColor(ap === null || ap === void 0 ? void 0 : ap.getBorderColor());
      var normalBackgroundColor = colors_1.componentsToColor(ap === null || ap === void 0 ? void 0 : ap.getBackgroundColor());
      var padding = 1;
      var bounds = {
        x: borderWidth + padding,
        y: borderWidth + padding,
        width: width - (borderWidth + padding) * 2,
        height: height - (borderWidth + padding) * 2
      };
      var _e = layout_1.layoutSinglelineText(text, {
        alignment: alignment_1.TextAlignment.Left,
        fontSize: widgetFontSize !== null && widgetFontSize !== void 0 ? widgetFontSize : fieldFontSize,
        font,
        bounds
      }), line = _e.line, fontSize = _e.fontSize;
      var textColor = (_c = widgetColor !== null && widgetColor !== void 0 ? widgetColor : fieldColor) !== null && _c !== void 0 ? _c : black;
      if (widgetColor || widgetFontSize !== void 0) {
        updateDefaultAppearance(widget, textColor, font, fontSize);
      } else {
        updateDefaultAppearance(dropdown.acroField, textColor, font, fontSize);
      }
      var options = {
        x: 0 + borderWidth / 2,
        y: 0 + borderWidth / 2,
        width: width - borderWidth,
        height: height - borderWidth,
        borderWidth: borderWidth !== null && borderWidth !== void 0 ? borderWidth : 0,
        borderColor,
        textColor,
        font: font.name,
        fontSize,
        color: normalBackgroundColor,
        textLines: [line],
        padding
      };
      return tslib_1.__spreadArrays(rotate, operations_1.drawTextField(options));
    };
    exports.defaultOptionListAppearanceProvider = function(optionList, widget, font) {
      var _a, _b;
      var widgetColor = getDefaultColor(widget);
      var fieldColor = getDefaultColor(optionList.acroField);
      var widgetFontSize = getDefaultFontSize(widget);
      var fieldFontSize = getDefaultFontSize(optionList.acroField);
      var rectangle = widget.getRectangle();
      var ap = widget.getAppearanceCharacteristics();
      var bs = widget.getBorderStyle();
      var borderWidth = (_a = bs === null || bs === void 0 ? void 0 : bs.getWidth()) !== null && _a !== void 0 ? _a : 0;
      var rotation = rotations_1.reduceRotation(ap === null || ap === void 0 ? void 0 : ap.getRotation());
      var _c = rotations_1.adjustDimsForRotation(rectangle, rotation), width = _c.width, height = _c.height;
      var rotate = operations_1.rotateInPlace(tslib_1.__assign(tslib_1.__assign({}, rectangle), { rotation }));
      var black = colors_1.rgb(0, 0, 0);
      var borderColor = colors_1.componentsToColor(ap === null || ap === void 0 ? void 0 : ap.getBorderColor());
      var normalBackgroundColor = colors_1.componentsToColor(ap === null || ap === void 0 ? void 0 : ap.getBackgroundColor());
      var options = optionList.getOptions();
      var selected = optionList.getSelected();
      if (optionList.isSorted())
        options.sort();
      var text = "";
      for (var idx = 0, len = options.length; idx < len; idx++) {
        text += options[idx];
        if (idx < len - 1)
          text += "\n";
      }
      var padding = 1;
      var bounds = {
        x: borderWidth + padding,
        y: borderWidth + padding,
        width: width - (borderWidth + padding) * 2,
        height: height - (borderWidth + padding) * 2
      };
      var _d = layout_1.layoutMultilineText(text, {
        alignment: alignment_1.TextAlignment.Left,
        fontSize: widgetFontSize !== null && widgetFontSize !== void 0 ? widgetFontSize : fieldFontSize,
        font,
        bounds
      }), lines = _d.lines, fontSize = _d.fontSize, lineHeight = _d.lineHeight;
      var selectedLines = [];
      for (var idx = 0, len = lines.length; idx < len; idx++) {
        var line = lines[idx];
        if (selected.includes(line.text))
          selectedLines.push(idx);
      }
      var blue = colors_1.rgb(153 / 255, 193 / 255, 218 / 255);
      var textColor = (_b = widgetColor !== null && widgetColor !== void 0 ? widgetColor : fieldColor) !== null && _b !== void 0 ? _b : black;
      if (widgetColor || widgetFontSize !== void 0) {
        updateDefaultAppearance(widget, textColor, font, fontSize);
      } else {
        updateDefaultAppearance(optionList.acroField, textColor, font, fontSize);
      }
      return tslib_1.__spreadArrays(rotate, operations_1.drawOptionList({
        x: 0 + borderWidth / 2,
        y: 0 + borderWidth / 2,
        width: width - borderWidth,
        height: height - borderWidth,
        borderWidth: borderWidth !== null && borderWidth !== void 0 ? borderWidth : 0,
        borderColor,
        textColor,
        font: font.name,
        fontSize,
        color: normalBackgroundColor,
        textLines: lines,
        lineHeight,
        selectedColor: blue,
        selectedLines,
        padding
      }));
    };
  }
});

// node_modules/pdf-lib/cjs/api/PDFEmbeddedPage.js
var require_PDFEmbeddedPage = __commonJS({
  "node_modules/pdf-lib/cjs/api/PDFEmbeddedPage.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFDocument_1 = tslib_1.__importDefault(require_PDFDocument());
    var core_1 = require_core();
    var utils_1 = require_utils2();
    var PDFEmbeddedPage = (
      /** @class */
      (function() {
        function PDFEmbeddedPage2(ref, doc, embedder) {
          this.alreadyEmbedded = false;
          utils_1.assertIs(ref, "ref", [[core_1.PDFRef, "PDFRef"]]);
          utils_1.assertIs(doc, "doc", [[PDFDocument_1.default, "PDFDocument"]]);
          utils_1.assertIs(embedder, "embedder", [[core_1.PDFPageEmbedder, "PDFPageEmbedder"]]);
          this.ref = ref;
          this.doc = doc;
          this.width = embedder.width;
          this.height = embedder.height;
          this.embedder = embedder;
        }
        PDFEmbeddedPage2.prototype.scale = function(factor) {
          utils_1.assertIs(factor, "factor", ["number"]);
          return { width: this.width * factor, height: this.height * factor };
        };
        PDFEmbeddedPage2.prototype.size = function() {
          return this.scale(1);
        };
        PDFEmbeddedPage2.prototype.embed = function() {
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            return tslib_1.__generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  if (!!this.alreadyEmbedded) return [3, 2];
                  return [4, this.embedder.embedIntoContext(this.doc.context, this.ref)];
                case 1:
                  _a.sent();
                  this.alreadyEmbedded = true;
                  _a.label = 2;
                case 2:
                  return [
                    2
                    /*return*/
                  ];
              }
            });
          });
        };
        PDFEmbeddedPage2.of = function(ref, doc, embedder) {
          return new PDFEmbeddedPage2(ref, doc, embedder);
        };
        return PDFEmbeddedPage2;
      })()
    );
    exports.default = PDFEmbeddedPage;
  }
});

// node_modules/pdf-lib/cjs/api/PDFFont.js
var require_PDFFont = __commonJS({
  "node_modules/pdf-lib/cjs/api/PDFFont.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFDocument_1 = tslib_1.__importDefault(require_PDFDocument());
    var core_1 = require_core();
    var utils_1 = require_utils2();
    var PDFFont = (
      /** @class */
      (function() {
        function PDFFont2(ref, doc, embedder) {
          this.modified = true;
          utils_1.assertIs(ref, "ref", [[core_1.PDFRef, "PDFRef"]]);
          utils_1.assertIs(doc, "doc", [[PDFDocument_1.default, "PDFDocument"]]);
          utils_1.assertIs(embedder, "embedder", [
            [core_1.CustomFontEmbedder, "CustomFontEmbedder"],
            [core_1.StandardFontEmbedder, "StandardFontEmbedder"]
          ]);
          this.ref = ref;
          this.doc = doc;
          this.name = embedder.fontName;
          this.embedder = embedder;
        }
        PDFFont2.prototype.encodeText = function(text) {
          utils_1.assertIs(text, "text", ["string"]);
          this.modified = true;
          return this.embedder.encodeText(text);
        };
        PDFFont2.prototype.widthOfTextAtSize = function(text, size) {
          utils_1.assertIs(text, "text", ["string"]);
          utils_1.assertIs(size, "size", ["number"]);
          return this.embedder.widthOfTextAtSize(text, size);
        };
        PDFFont2.prototype.heightAtSize = function(size, options) {
          var _a;
          utils_1.assertIs(size, "size", ["number"]);
          utils_1.assertOrUndefined(options === null || options === void 0 ? void 0 : options.descender, "options.descender", ["boolean"]);
          return this.embedder.heightOfFontAtSize(size, {
            descender: (_a = options === null || options === void 0 ? void 0 : options.descender) !== null && _a !== void 0 ? _a : true
          });
        };
        PDFFont2.prototype.sizeAtHeight = function(height) {
          utils_1.assertIs(height, "height", ["number"]);
          return this.embedder.sizeOfFontAtHeight(height);
        };
        PDFFont2.prototype.getCharacterSet = function() {
          if (this.embedder instanceof core_1.StandardFontEmbedder) {
            return this.embedder.encoding.supportedCodePoints;
          } else {
            return this.embedder.font.characterSet;
          }
        };
        PDFFont2.prototype.embed = function() {
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            return tslib_1.__generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  if (!this.modified) return [3, 2];
                  return [4, this.embedder.embedIntoContext(this.doc.context, this.ref)];
                case 1:
                  _a.sent();
                  this.modified = false;
                  _a.label = 2;
                case 2:
                  return [
                    2
                    /*return*/
                  ];
              }
            });
          });
        };
        PDFFont2.of = function(ref, doc, embedder) {
          return new PDFFont2(ref, doc, embedder);
        };
        return PDFFont2;
      })()
    );
    exports.default = PDFFont;
  }
});

// node_modules/pdf-lib/cjs/api/PDFImage.js
var require_PDFImage = __commonJS({
  "node_modules/pdf-lib/cjs/api/PDFImage.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFDocument_1 = tslib_1.__importDefault(require_PDFDocument());
    var core_1 = require_core();
    var utils_1 = require_utils2();
    var PDFImage = (
      /** @class */
      (function() {
        function PDFImage2(ref, doc, embedder) {
          utils_1.assertIs(ref, "ref", [[core_1.PDFRef, "PDFRef"]]);
          utils_1.assertIs(doc, "doc", [[PDFDocument_1.default, "PDFDocument"]]);
          utils_1.assertIs(embedder, "embedder", [
            [core_1.JpegEmbedder, "JpegEmbedder"],
            [core_1.PngEmbedder, "PngEmbedder"]
          ]);
          this.ref = ref;
          this.doc = doc;
          this.width = embedder.width;
          this.height = embedder.height;
          this.embedder = embedder;
        }
        PDFImage2.prototype.scale = function(factor) {
          utils_1.assertIs(factor, "factor", ["number"]);
          return { width: this.width * factor, height: this.height * factor };
        };
        PDFImage2.prototype.scaleToFit = function(width, height) {
          utils_1.assertIs(width, "width", ["number"]);
          utils_1.assertIs(height, "height", ["number"]);
          var imgWidthScale = width / this.width;
          var imgHeightScale = height / this.height;
          var scale = Math.min(imgWidthScale, imgHeightScale);
          return this.scale(scale);
        };
        PDFImage2.prototype.size = function() {
          return this.scale(1);
        };
        PDFImage2.prototype.embed = function() {
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            var _a, doc, ref;
            return tslib_1.__generator(this, function(_b) {
              switch (_b.label) {
                case 0:
                  if (!this.embedder)
                    return [
                      2
                      /*return*/
                    ];
                  if (!this.embedTask) {
                    _a = this, doc = _a.doc, ref = _a.ref;
                    this.embedTask = this.embedder.embedIntoContext(doc.context, ref);
                  }
                  return [4, this.embedTask];
                case 1:
                  _b.sent();
                  this.embedder = void 0;
                  return [
                    2
                    /*return*/
                  ];
              }
            });
          });
        };
        PDFImage2.of = function(ref, doc, embedder) {
          return new PDFImage2(ref, doc, embedder);
        };
        return PDFImage2;
      })()
    );
    exports.default = PDFImage;
  }
});

// node_modules/pdf-lib/cjs/api/image/alignment.js
var require_alignment2 = __commonJS({
  "node_modules/pdf-lib/cjs/api/image/alignment.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ImageAlignment = void 0;
    var ImageAlignment;
    (function(ImageAlignment2) {
      ImageAlignment2[ImageAlignment2["Left"] = 0] = "Left";
      ImageAlignment2[ImageAlignment2["Center"] = 1] = "Center";
      ImageAlignment2[ImageAlignment2["Right"] = 2] = "Right";
    })(ImageAlignment = exports.ImageAlignment || (exports.ImageAlignment = {}));
  }
});

// node_modules/pdf-lib/cjs/api/image/index.js
var require_image = __commonJS({
  "node_modules/pdf-lib/cjs/api/image/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_alignment2(), exports);
  }
});

// node_modules/pdf-lib/cjs/api/form/PDFField.js
var require_PDFField = __commonJS({
  "node_modules/pdf-lib/cjs/api/form/PDFField.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.assertFieldAppearanceOptions = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFDocument_1 = tslib_1.__importDefault(require_PDFDocument());
    var colors_1 = require_colors();
    var rotations_1 = require_rotations();
    var core_1 = require_core();
    var utils_1 = require_utils2();
    var image_1 = require_image();
    var operations_1 = require_operations();
    exports.assertFieldAppearanceOptions = function(options) {
      utils_1.assertOrUndefined(options === null || options === void 0 ? void 0 : options.x, "options.x", ["number"]);
      utils_1.assertOrUndefined(options === null || options === void 0 ? void 0 : options.y, "options.y", ["number"]);
      utils_1.assertOrUndefined(options === null || options === void 0 ? void 0 : options.width, "options.width", ["number"]);
      utils_1.assertOrUndefined(options === null || options === void 0 ? void 0 : options.height, "options.height", ["number"]);
      utils_1.assertOrUndefined(options === null || options === void 0 ? void 0 : options.textColor, "options.textColor", [
        [Object, "Color"]
      ]);
      utils_1.assertOrUndefined(options === null || options === void 0 ? void 0 : options.backgroundColor, "options.backgroundColor", [
        [Object, "Color"]
      ]);
      utils_1.assertOrUndefined(options === null || options === void 0 ? void 0 : options.borderColor, "options.borderColor", [
        [Object, "Color"]
      ]);
      utils_1.assertOrUndefined(options === null || options === void 0 ? void 0 : options.borderWidth, "options.borderWidth", ["number"]);
      utils_1.assertOrUndefined(options === null || options === void 0 ? void 0 : options.rotate, "options.rotate", [[Object, "Rotation"]]);
    };
    var PDFField = (
      /** @class */
      (function() {
        function PDFField2(acroField, ref, doc) {
          utils_1.assertIs(acroField, "acroField", [[core_1.PDFAcroTerminal, "PDFAcroTerminal"]]);
          utils_1.assertIs(ref, "ref", [[core_1.PDFRef, "PDFRef"]]);
          utils_1.assertIs(doc, "doc", [[PDFDocument_1.default, "PDFDocument"]]);
          this.acroField = acroField;
          this.ref = ref;
          this.doc = doc;
        }
        PDFField2.prototype.getName = function() {
          var _a;
          return (_a = this.acroField.getFullyQualifiedName()) !== null && _a !== void 0 ? _a : "";
        };
        PDFField2.prototype.isReadOnly = function() {
          return this.acroField.hasFlag(core_1.AcroFieldFlags.ReadOnly);
        };
        PDFField2.prototype.enableReadOnly = function() {
          this.acroField.setFlagTo(core_1.AcroFieldFlags.ReadOnly, true);
        };
        PDFField2.prototype.disableReadOnly = function() {
          this.acroField.setFlagTo(core_1.AcroFieldFlags.ReadOnly, false);
        };
        PDFField2.prototype.isRequired = function() {
          return this.acroField.hasFlag(core_1.AcroFieldFlags.Required);
        };
        PDFField2.prototype.enableRequired = function() {
          this.acroField.setFlagTo(core_1.AcroFieldFlags.Required, true);
        };
        PDFField2.prototype.disableRequired = function() {
          this.acroField.setFlagTo(core_1.AcroFieldFlags.Required, false);
        };
        PDFField2.prototype.isExported = function() {
          return !this.acroField.hasFlag(core_1.AcroFieldFlags.NoExport);
        };
        PDFField2.prototype.enableExporting = function() {
          this.acroField.setFlagTo(core_1.AcroFieldFlags.NoExport, false);
        };
        PDFField2.prototype.disableExporting = function() {
          this.acroField.setFlagTo(core_1.AcroFieldFlags.NoExport, true);
        };
        PDFField2.prototype.needsAppearancesUpdate = function() {
          throw new core_1.MethodNotImplementedError(this.constructor.name, "needsAppearancesUpdate");
        };
        PDFField2.prototype.defaultUpdateAppearances = function(_font) {
          throw new core_1.MethodNotImplementedError(this.constructor.name, "defaultUpdateAppearances");
        };
        PDFField2.prototype.markAsDirty = function() {
          this.doc.getForm().markFieldAsDirty(this.ref);
        };
        PDFField2.prototype.markAsClean = function() {
          this.doc.getForm().markFieldAsClean(this.ref);
        };
        PDFField2.prototype.isDirty = function() {
          return this.doc.getForm().fieldIsDirty(this.ref);
        };
        PDFField2.prototype.createWidget = function(options) {
          var _a;
          var textColor = options.textColor;
          var backgroundColor = options.backgroundColor;
          var borderColor = options.borderColor;
          var borderWidth = options.borderWidth;
          var degreesAngle = rotations_1.toDegrees(options.rotate);
          var caption = options.caption;
          var x = options.x;
          var y = options.y;
          var width = options.width + borderWidth;
          var height = options.height + borderWidth;
          var hidden = Boolean(options.hidden);
          var pageRef = options.page;
          utils_1.assertMultiple(degreesAngle, "degreesAngle", 90);
          var widget = core_1.PDFWidgetAnnotation.create(this.doc.context, this.ref);
          var rect = rotations_1.rotateRectangle({ x, y, width, height }, borderWidth, degreesAngle);
          widget.setRectangle(rect);
          if (pageRef)
            widget.setP(pageRef);
          var ac = widget.getOrCreateAppearanceCharacteristics();
          if (backgroundColor) {
            ac.setBackgroundColor(colors_1.colorToComponents(backgroundColor));
          }
          ac.setRotation(degreesAngle);
          if (caption)
            ac.setCaptions({ normal: caption });
          if (borderColor)
            ac.setBorderColor(colors_1.colorToComponents(borderColor));
          var bs = widget.getOrCreateBorderStyle();
          if (borderWidth !== void 0)
            bs.setWidth(borderWidth);
          widget.setFlagTo(core_1.AnnotationFlags.Print, true);
          widget.setFlagTo(core_1.AnnotationFlags.Hidden, hidden);
          widget.setFlagTo(core_1.AnnotationFlags.Invisible, false);
          if (textColor) {
            var da = (_a = this.acroField.getDefaultAppearance()) !== null && _a !== void 0 ? _a : "";
            var newDa = da + "\n" + colors_1.setFillingColor(textColor).toString();
            this.acroField.setDefaultAppearance(newDa);
          }
          return widget;
        };
        PDFField2.prototype.updateWidgetAppearanceWithFont = function(widget, font, _a) {
          var normal = _a.normal, rollover = _a.rollover, down = _a.down;
          this.updateWidgetAppearances(widget, {
            normal: this.createAppearanceStream(widget, normal, font),
            rollover: rollover && this.createAppearanceStream(widget, rollover, font),
            down: down && this.createAppearanceStream(widget, down, font)
          });
        };
        PDFField2.prototype.updateOnOffWidgetAppearance = function(widget, onValue, _a) {
          var normal = _a.normal, rollover = _a.rollover, down = _a.down;
          this.updateWidgetAppearances(widget, {
            normal: this.createAppearanceDict(widget, normal, onValue),
            rollover: rollover && this.createAppearanceDict(widget, rollover, onValue),
            down: down && this.createAppearanceDict(widget, down, onValue)
          });
        };
        PDFField2.prototype.updateWidgetAppearances = function(widget, _a) {
          var normal = _a.normal, rollover = _a.rollover, down = _a.down;
          widget.setNormalAppearance(normal);
          if (rollover) {
            widget.setRolloverAppearance(rollover);
          } else {
            widget.removeRolloverAppearance();
          }
          if (down) {
            widget.setDownAppearance(down);
          } else {
            widget.removeDownAppearance();
          }
        };
        PDFField2.prototype.createAppearanceStream = function(widget, appearance, font) {
          var _a;
          var context = this.acroField.dict.context;
          var _b = widget.getRectangle(), width = _b.width, height = _b.height;
          var Resources = font && { Font: (_a = {}, _a[font.name] = font.ref, _a) };
          var stream = context.formXObject(appearance, {
            Resources,
            BBox: context.obj([0, 0, width, height]),
            Matrix: context.obj([1, 0, 0, 1, 0, 0])
          });
          var streamRef = context.register(stream);
          return streamRef;
        };
        PDFField2.prototype.createImageAppearanceStream = function(widget, image, alignment) {
          var _a;
          var _b;
          var context = this.acroField.dict.context;
          var rectangle = widget.getRectangle();
          var ap = widget.getAppearanceCharacteristics();
          var bs = widget.getBorderStyle();
          var borderWidth = (_b = bs === null || bs === void 0 ? void 0 : bs.getWidth()) !== null && _b !== void 0 ? _b : 0;
          var rotation = rotations_1.reduceRotation(ap === null || ap === void 0 ? void 0 : ap.getRotation());
          var rotate = operations_1.rotateInPlace(tslib_1.__assign(tslib_1.__assign({}, rectangle), { rotation }));
          var adj = rotations_1.adjustDimsForRotation(rectangle, rotation);
          var imageDims = image.scaleToFit(adj.width - borderWidth * 2, adj.height - borderWidth * 2);
          var options = {
            x: borderWidth,
            y: borderWidth,
            width: imageDims.width,
            height: imageDims.height,
            //
            rotate: rotations_1.degrees(0),
            xSkew: rotations_1.degrees(0),
            ySkew: rotations_1.degrees(0)
          };
          if (alignment === image_1.ImageAlignment.Center) {
            options.x += (adj.width - borderWidth * 2) / 2 - imageDims.width / 2;
            options.y += (adj.height - borderWidth * 2) / 2 - imageDims.height / 2;
          } else if (alignment === image_1.ImageAlignment.Right) {
            options.x = adj.width - borderWidth - imageDims.width;
            options.y = adj.height - borderWidth - imageDims.height;
          }
          var imageName = this.doc.context.addRandomSuffix("Image", 10);
          var appearance = tslib_1.__spreadArrays(rotate, operations_1.drawImage(imageName, options));
          var Resources = { XObject: (_a = {}, _a[imageName] = image.ref, _a) };
          var stream = context.formXObject(appearance, {
            Resources,
            BBox: context.obj([0, 0, rectangle.width, rectangle.height]),
            Matrix: context.obj([1, 0, 0, 1, 0, 0])
          });
          return context.register(stream);
        };
        PDFField2.prototype.createAppearanceDict = function(widget, appearance, onValue) {
          var context = this.acroField.dict.context;
          var onStreamRef = this.createAppearanceStream(widget, appearance.on);
          var offStreamRef = this.createAppearanceStream(widget, appearance.off);
          var appearanceDict = context.obj({});
          appearanceDict.set(onValue, onStreamRef);
          appearanceDict.set(core_1.PDFName.of("Off"), offStreamRef);
          return appearanceDict;
        };
        return PDFField2;
      })()
    );
    exports.default = PDFField;
  }
});

// node_modules/pdf-lib/cjs/api/form/PDFCheckBox.js
var require_PDFCheckBox = __commonJS({
  "node_modules/pdf-lib/cjs/api/form/PDFCheckBox.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFPage_1 = tslib_1.__importDefault(require_PDFPage());
    var appearances_1 = require_appearances();
    var colors_1 = require_colors();
    var rotations_1 = require_rotations();
    var PDFField_1 = tslib_1.__importStar(require_PDFField());
    var core_1 = require_core();
    var utils_1 = require_utils2();
    var PDFCheckBox = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PDFCheckBox2, _super);
        function PDFCheckBox2(acroCheckBox, ref, doc) {
          var _this = _super.call(this, acroCheckBox, ref, doc) || this;
          utils_1.assertIs(acroCheckBox, "acroCheckBox", [
            [core_1.PDFAcroCheckBox, "PDFAcroCheckBox"]
          ]);
          _this.acroField = acroCheckBox;
          return _this;
        }
        PDFCheckBox2.prototype.check = function() {
          var _a;
          var onValue = (_a = this.acroField.getOnValue()) !== null && _a !== void 0 ? _a : core_1.PDFName.of("Yes");
          this.markAsDirty();
          this.acroField.setValue(onValue);
        };
        PDFCheckBox2.prototype.uncheck = function() {
          this.markAsDirty();
          this.acroField.setValue(core_1.PDFName.of("Off"));
        };
        PDFCheckBox2.prototype.isChecked = function() {
          var onValue = this.acroField.getOnValue();
          return !!onValue && onValue === this.acroField.getValue();
        };
        PDFCheckBox2.prototype.addToPage = function(page, options) {
          var _a, _b, _c, _d, _e, _f;
          utils_1.assertIs(page, "page", [[PDFPage_1.default, "PDFPage"]]);
          PDFField_1.assertFieldAppearanceOptions(options);
          if (!options)
            options = {};
          if (!("textColor" in options))
            options.textColor = colors_1.rgb(0, 0, 0);
          if (!("backgroundColor" in options))
            options.backgroundColor = colors_1.rgb(1, 1, 1);
          if (!("borderColor" in options))
            options.borderColor = colors_1.rgb(0, 0, 0);
          if (!("borderWidth" in options))
            options.borderWidth = 1;
          var widget = this.createWidget({
            x: (_a = options.x) !== null && _a !== void 0 ? _a : 0,
            y: (_b = options.y) !== null && _b !== void 0 ? _b : 0,
            width: (_c = options.width) !== null && _c !== void 0 ? _c : 50,
            height: (_d = options.height) !== null && _d !== void 0 ? _d : 50,
            textColor: options.textColor,
            backgroundColor: options.backgroundColor,
            borderColor: options.borderColor,
            borderWidth: (_e = options.borderWidth) !== null && _e !== void 0 ? _e : 0,
            rotate: (_f = options.rotate) !== null && _f !== void 0 ? _f : rotations_1.degrees(0),
            hidden: options.hidden,
            page: page.ref
          });
          var widgetRef = this.doc.context.register(widget.dict);
          this.acroField.addWidget(widgetRef);
          widget.setAppearanceState(core_1.PDFName.of("Off"));
          this.updateWidgetAppearance(widget, core_1.PDFName.of("Yes"));
          page.node.addAnnot(widgetRef);
        };
        PDFCheckBox2.prototype.needsAppearancesUpdate = function() {
          var _a;
          var widgets = this.acroField.getWidgets();
          for (var idx = 0, len = widgets.length; idx < len; idx++) {
            var widget = widgets[idx];
            var state = widget.getAppearanceState();
            var normal = (_a = widget.getAppearances()) === null || _a === void 0 ? void 0 : _a.normal;
            if (!(normal instanceof core_1.PDFDict))
              return true;
            if (state && !normal.has(state))
              return true;
          }
          return false;
        };
        PDFCheckBox2.prototype.defaultUpdateAppearances = function() {
          this.updateAppearances();
        };
        PDFCheckBox2.prototype.updateAppearances = function(provider) {
          var _a;
          utils_1.assertOrUndefined(provider, "provider", [Function]);
          var widgets = this.acroField.getWidgets();
          for (var idx = 0, len = widgets.length; idx < len; idx++) {
            var widget = widgets[idx];
            var onValue = (_a = widget.getOnValue()) !== null && _a !== void 0 ? _a : core_1.PDFName.of("Yes");
            if (!onValue)
              continue;
            this.updateWidgetAppearance(widget, onValue, provider);
          }
          this.markAsClean();
        };
        PDFCheckBox2.prototype.updateWidgetAppearance = function(widget, onValue, provider) {
          var apProvider = provider !== null && provider !== void 0 ? provider : appearances_1.defaultCheckBoxAppearanceProvider;
          var appearances = appearances_1.normalizeAppearance(apProvider(this, widget));
          this.updateOnOffWidgetAppearance(widget, onValue, appearances);
        };
        PDFCheckBox2.of = function(acroCheckBox, ref, doc) {
          return new PDFCheckBox2(acroCheckBox, ref, doc);
        };
        return PDFCheckBox2;
      })(PDFField_1.default)
    );
    exports.default = PDFCheckBox;
  }
});

// node_modules/pdf-lib/cjs/api/form/PDFDropdown.js
var require_PDFDropdown = __commonJS({
  "node_modules/pdf-lib/cjs/api/form/PDFDropdown.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFPage_1 = tslib_1.__importDefault(require_PDFPage());
    var PDFFont_1 = tslib_1.__importDefault(require_PDFFont());
    var PDFField_1 = tslib_1.__importStar(require_PDFField());
    var appearances_1 = require_appearances();
    var colors_1 = require_colors();
    var rotations_1 = require_rotations();
    var core_1 = require_core();
    var utils_1 = require_utils2();
    var PDFDropdown = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PDFDropdown2, _super);
        function PDFDropdown2(acroComboBox, ref, doc) {
          var _this = _super.call(this, acroComboBox, ref, doc) || this;
          utils_1.assertIs(acroComboBox, "acroComboBox", [
            [core_1.PDFAcroComboBox, "PDFAcroComboBox"]
          ]);
          _this.acroField = acroComboBox;
          return _this;
        }
        PDFDropdown2.prototype.getOptions = function() {
          var rawOptions = this.acroField.getOptions();
          var options = new Array(rawOptions.length);
          for (var idx = 0, len = options.length; idx < len; idx++) {
            var _a = rawOptions[idx], display = _a.display, value = _a.value;
            options[idx] = (display !== null && display !== void 0 ? display : value).decodeText();
          }
          return options;
        };
        PDFDropdown2.prototype.getSelected = function() {
          var values = this.acroField.getValues();
          var selected = new Array(values.length);
          for (var idx = 0, len = values.length; idx < len; idx++) {
            selected[idx] = values[idx].decodeText();
          }
          return selected;
        };
        PDFDropdown2.prototype.setOptions = function(options) {
          utils_1.assertIs(options, "options", [Array]);
          var optionObjects = new Array(options.length);
          for (var idx = 0, len = options.length; idx < len; idx++) {
            optionObjects[idx] = { value: core_1.PDFHexString.fromText(options[idx]) };
          }
          this.acroField.setOptions(optionObjects);
        };
        PDFDropdown2.prototype.addOptions = function(options) {
          utils_1.assertIs(options, "options", ["string", Array]);
          var optionsArr = Array.isArray(options) ? options : [options];
          var existingOptions = this.acroField.getOptions();
          var newOptions = new Array(optionsArr.length);
          for (var idx = 0, len = optionsArr.length; idx < len; idx++) {
            newOptions[idx] = { value: core_1.PDFHexString.fromText(optionsArr[idx]) };
          }
          this.acroField.setOptions(existingOptions.concat(newOptions));
        };
        PDFDropdown2.prototype.select = function(options, merge) {
          if (merge === void 0) {
            merge = false;
          }
          utils_1.assertIs(options, "options", ["string", Array]);
          utils_1.assertIs(merge, "merge", ["boolean"]);
          var optionsArr = Array.isArray(options) ? options : [options];
          var validOptions = this.getOptions();
          var hasCustomOption = optionsArr.find(function(option) {
            return !validOptions.includes(option);
          });
          if (hasCustomOption)
            this.enableEditing();
          this.markAsDirty();
          if (optionsArr.length > 1 || optionsArr.length === 1 && merge) {
            this.enableMultiselect();
          }
          var values = new Array(optionsArr.length);
          for (var idx = 0, len = optionsArr.length; idx < len; idx++) {
            values[idx] = core_1.PDFHexString.fromText(optionsArr[idx]);
          }
          if (merge) {
            var existingValues = this.acroField.getValues();
            this.acroField.setValues(existingValues.concat(values));
          } else {
            this.acroField.setValues(values);
          }
        };
        PDFDropdown2.prototype.clear = function() {
          this.markAsDirty();
          this.acroField.setValues([]);
        };
        PDFDropdown2.prototype.setFontSize = function(fontSize) {
          utils_1.assertPositive(fontSize, "fontSize");
          this.acroField.setFontSize(fontSize);
          this.markAsDirty();
        };
        PDFDropdown2.prototype.isEditable = function() {
          return this.acroField.hasFlag(core_1.AcroChoiceFlags.Edit);
        };
        PDFDropdown2.prototype.enableEditing = function() {
          this.acroField.setFlagTo(core_1.AcroChoiceFlags.Edit, true);
        };
        PDFDropdown2.prototype.disableEditing = function() {
          this.acroField.setFlagTo(core_1.AcroChoiceFlags.Edit, false);
        };
        PDFDropdown2.prototype.isSorted = function() {
          return this.acroField.hasFlag(core_1.AcroChoiceFlags.Sort);
        };
        PDFDropdown2.prototype.enableSorting = function() {
          this.acroField.setFlagTo(core_1.AcroChoiceFlags.Sort, true);
        };
        PDFDropdown2.prototype.disableSorting = function() {
          this.acroField.setFlagTo(core_1.AcroChoiceFlags.Sort, false);
        };
        PDFDropdown2.prototype.isMultiselect = function() {
          return this.acroField.hasFlag(core_1.AcroChoiceFlags.MultiSelect);
        };
        PDFDropdown2.prototype.enableMultiselect = function() {
          this.acroField.setFlagTo(core_1.AcroChoiceFlags.MultiSelect, true);
        };
        PDFDropdown2.prototype.disableMultiselect = function() {
          this.acroField.setFlagTo(core_1.AcroChoiceFlags.MultiSelect, false);
        };
        PDFDropdown2.prototype.isSpellChecked = function() {
          return !this.acroField.hasFlag(core_1.AcroChoiceFlags.DoNotSpellCheck);
        };
        PDFDropdown2.prototype.enableSpellChecking = function() {
          this.acroField.setFlagTo(core_1.AcroChoiceFlags.DoNotSpellCheck, false);
        };
        PDFDropdown2.prototype.disableSpellChecking = function() {
          this.acroField.setFlagTo(core_1.AcroChoiceFlags.DoNotSpellCheck, true);
        };
        PDFDropdown2.prototype.isSelectOnClick = function() {
          return this.acroField.hasFlag(core_1.AcroChoiceFlags.CommitOnSelChange);
        };
        PDFDropdown2.prototype.enableSelectOnClick = function() {
          this.acroField.setFlagTo(core_1.AcroChoiceFlags.CommitOnSelChange, true);
        };
        PDFDropdown2.prototype.disableSelectOnClick = function() {
          this.acroField.setFlagTo(core_1.AcroChoiceFlags.CommitOnSelChange, false);
        };
        PDFDropdown2.prototype.addToPage = function(page, options) {
          var _a, _b, _c, _d, _e, _f, _g;
          utils_1.assertIs(page, "page", [[PDFPage_1.default, "PDFPage"]]);
          PDFField_1.assertFieldAppearanceOptions(options);
          if (!options)
            options = {};
          if (!("textColor" in options))
            options.textColor = colors_1.rgb(0, 0, 0);
          if (!("backgroundColor" in options))
            options.backgroundColor = colors_1.rgb(1, 1, 1);
          if (!("borderColor" in options))
            options.borderColor = colors_1.rgb(0, 0, 0);
          if (!("borderWidth" in options))
            options.borderWidth = 1;
          var widget = this.createWidget({
            x: (_a = options.x) !== null && _a !== void 0 ? _a : 0,
            y: (_b = options.y) !== null && _b !== void 0 ? _b : 0,
            width: (_c = options.width) !== null && _c !== void 0 ? _c : 200,
            height: (_d = options.height) !== null && _d !== void 0 ? _d : 50,
            textColor: options.textColor,
            backgroundColor: options.backgroundColor,
            borderColor: options.borderColor,
            borderWidth: (_e = options.borderWidth) !== null && _e !== void 0 ? _e : 0,
            rotate: (_f = options.rotate) !== null && _f !== void 0 ? _f : rotations_1.degrees(0),
            hidden: options.hidden,
            page: page.ref
          });
          var widgetRef = this.doc.context.register(widget.dict);
          this.acroField.addWidget(widgetRef);
          var font = (_g = options.font) !== null && _g !== void 0 ? _g : this.doc.getForm().getDefaultFont();
          this.updateWidgetAppearance(widget, font);
          page.node.addAnnot(widgetRef);
        };
        PDFDropdown2.prototype.needsAppearancesUpdate = function() {
          var _a;
          if (this.isDirty())
            return true;
          var widgets = this.acroField.getWidgets();
          for (var idx = 0, len = widgets.length; idx < len; idx++) {
            var widget = widgets[idx];
            var hasAppearances = ((_a = widget.getAppearances()) === null || _a === void 0 ? void 0 : _a.normal) instanceof core_1.PDFStream;
            if (!hasAppearances)
              return true;
          }
          return false;
        };
        PDFDropdown2.prototype.defaultUpdateAppearances = function(font) {
          utils_1.assertIs(font, "font", [[PDFFont_1.default, "PDFFont"]]);
          this.updateAppearances(font);
        };
        PDFDropdown2.prototype.updateAppearances = function(font, provider) {
          utils_1.assertIs(font, "font", [[PDFFont_1.default, "PDFFont"]]);
          utils_1.assertOrUndefined(provider, "provider", [Function]);
          var widgets = this.acroField.getWidgets();
          for (var idx = 0, len = widgets.length; idx < len; idx++) {
            var widget = widgets[idx];
            this.updateWidgetAppearance(widget, font, provider);
          }
          this.markAsClean();
        };
        PDFDropdown2.prototype.updateWidgetAppearance = function(widget, font, provider) {
          var apProvider = provider !== null && provider !== void 0 ? provider : appearances_1.defaultDropdownAppearanceProvider;
          var appearances = appearances_1.normalizeAppearance(apProvider(this, widget, font));
          this.updateWidgetAppearanceWithFont(widget, font, appearances);
        };
        PDFDropdown2.of = function(acroComboBox, ref, doc) {
          return new PDFDropdown2(acroComboBox, ref, doc);
        };
        return PDFDropdown2;
      })(PDFField_1.default)
    );
    exports.default = PDFDropdown;
  }
});

// node_modules/pdf-lib/cjs/api/form/PDFOptionList.js
var require_PDFOptionList = __commonJS({
  "node_modules/pdf-lib/cjs/api/form/PDFOptionList.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFPage_1 = tslib_1.__importDefault(require_PDFPage());
    var PDFFont_1 = tslib_1.__importDefault(require_PDFFont());
    var PDFField_1 = tslib_1.__importStar(require_PDFField());
    var appearances_1 = require_appearances();
    var colors_1 = require_colors();
    var rotations_1 = require_rotations();
    var core_1 = require_core();
    var utils_1 = require_utils2();
    var PDFOptionList = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PDFOptionList2, _super);
        function PDFOptionList2(acroListBox, ref, doc) {
          var _this = _super.call(this, acroListBox, ref, doc) || this;
          utils_1.assertIs(acroListBox, "acroListBox", [[core_1.PDFAcroListBox, "PDFAcroListBox"]]);
          _this.acroField = acroListBox;
          return _this;
        }
        PDFOptionList2.prototype.getOptions = function() {
          var rawOptions = this.acroField.getOptions();
          var options = new Array(rawOptions.length);
          for (var idx = 0, len = options.length; idx < len; idx++) {
            var _a = rawOptions[idx], display = _a.display, value = _a.value;
            options[idx] = (display !== null && display !== void 0 ? display : value).decodeText();
          }
          return options;
        };
        PDFOptionList2.prototype.getSelected = function() {
          var values = this.acroField.getValues();
          var selected = new Array(values.length);
          for (var idx = 0, len = values.length; idx < len; idx++) {
            selected[idx] = values[idx].decodeText();
          }
          return selected;
        };
        PDFOptionList2.prototype.setOptions = function(options) {
          utils_1.assertIs(options, "options", [Array]);
          this.markAsDirty();
          var optionObjects = new Array(options.length);
          for (var idx = 0, len = options.length; idx < len; idx++) {
            optionObjects[idx] = { value: core_1.PDFHexString.fromText(options[idx]) };
          }
          this.acroField.setOptions(optionObjects);
        };
        PDFOptionList2.prototype.addOptions = function(options) {
          utils_1.assertIs(options, "options", ["string", Array]);
          this.markAsDirty();
          var optionsArr = Array.isArray(options) ? options : [options];
          var existingOptions = this.acroField.getOptions();
          var newOptions = new Array(optionsArr.length);
          for (var idx = 0, len = optionsArr.length; idx < len; idx++) {
            newOptions[idx] = { value: core_1.PDFHexString.fromText(optionsArr[idx]) };
          }
          this.acroField.setOptions(existingOptions.concat(newOptions));
        };
        PDFOptionList2.prototype.select = function(options, merge) {
          if (merge === void 0) {
            merge = false;
          }
          utils_1.assertIs(options, "options", ["string", Array]);
          utils_1.assertIs(merge, "merge", ["boolean"]);
          var optionsArr = Array.isArray(options) ? options : [options];
          var validOptions = this.getOptions();
          utils_1.assertIsSubset(optionsArr, "option", validOptions);
          this.markAsDirty();
          if (optionsArr.length > 1 || optionsArr.length === 1 && merge) {
            this.enableMultiselect();
          }
          var values = new Array(optionsArr.length);
          for (var idx = 0, len = optionsArr.length; idx < len; idx++) {
            values[idx] = core_1.PDFHexString.fromText(optionsArr[idx]);
          }
          if (merge) {
            var existingValues = this.acroField.getValues();
            this.acroField.setValues(existingValues.concat(values));
          } else {
            this.acroField.setValues(values);
          }
        };
        PDFOptionList2.prototype.clear = function() {
          this.markAsDirty();
          this.acroField.setValues([]);
        };
        PDFOptionList2.prototype.setFontSize = function(fontSize) {
          utils_1.assertPositive(fontSize, "fontSize");
          this.acroField.setFontSize(fontSize);
          this.markAsDirty();
        };
        PDFOptionList2.prototype.isSorted = function() {
          return this.acroField.hasFlag(core_1.AcroChoiceFlags.Sort);
        };
        PDFOptionList2.prototype.enableSorting = function() {
          this.acroField.setFlagTo(core_1.AcroChoiceFlags.Sort, true);
        };
        PDFOptionList2.prototype.disableSorting = function() {
          this.acroField.setFlagTo(core_1.AcroChoiceFlags.Sort, false);
        };
        PDFOptionList2.prototype.isMultiselect = function() {
          return this.acroField.hasFlag(core_1.AcroChoiceFlags.MultiSelect);
        };
        PDFOptionList2.prototype.enableMultiselect = function() {
          this.acroField.setFlagTo(core_1.AcroChoiceFlags.MultiSelect, true);
        };
        PDFOptionList2.prototype.disableMultiselect = function() {
          this.acroField.setFlagTo(core_1.AcroChoiceFlags.MultiSelect, false);
        };
        PDFOptionList2.prototype.isSelectOnClick = function() {
          return this.acroField.hasFlag(core_1.AcroChoiceFlags.CommitOnSelChange);
        };
        PDFOptionList2.prototype.enableSelectOnClick = function() {
          this.acroField.setFlagTo(core_1.AcroChoiceFlags.CommitOnSelChange, true);
        };
        PDFOptionList2.prototype.disableSelectOnClick = function() {
          this.acroField.setFlagTo(core_1.AcroChoiceFlags.CommitOnSelChange, false);
        };
        PDFOptionList2.prototype.addToPage = function(page, options) {
          var _a, _b, _c, _d, _e, _f, _g;
          utils_1.assertIs(page, "page", [[PDFPage_1.default, "PDFPage"]]);
          PDFField_1.assertFieldAppearanceOptions(options);
          if (!options)
            options = {};
          if (!("textColor" in options))
            options.textColor = colors_1.rgb(0, 0, 0);
          if (!("backgroundColor" in options))
            options.backgroundColor = colors_1.rgb(1, 1, 1);
          if (!("borderColor" in options))
            options.borderColor = colors_1.rgb(0, 0, 0);
          if (!("borderWidth" in options))
            options.borderWidth = 1;
          var widget = this.createWidget({
            x: (_a = options.x) !== null && _a !== void 0 ? _a : 0,
            y: (_b = options.y) !== null && _b !== void 0 ? _b : 0,
            width: (_c = options.width) !== null && _c !== void 0 ? _c : 200,
            height: (_d = options.height) !== null && _d !== void 0 ? _d : 100,
            textColor: options.textColor,
            backgroundColor: options.backgroundColor,
            borderColor: options.borderColor,
            borderWidth: (_e = options.borderWidth) !== null && _e !== void 0 ? _e : 0,
            rotate: (_f = options.rotate) !== null && _f !== void 0 ? _f : rotations_1.degrees(0),
            hidden: options.hidden,
            page: page.ref
          });
          var widgetRef = this.doc.context.register(widget.dict);
          this.acroField.addWidget(widgetRef);
          var font = (_g = options.font) !== null && _g !== void 0 ? _g : this.doc.getForm().getDefaultFont();
          this.updateWidgetAppearance(widget, font);
          page.node.addAnnot(widgetRef);
        };
        PDFOptionList2.prototype.needsAppearancesUpdate = function() {
          var _a;
          if (this.isDirty())
            return true;
          var widgets = this.acroField.getWidgets();
          for (var idx = 0, len = widgets.length; idx < len; idx++) {
            var widget = widgets[idx];
            var hasAppearances = ((_a = widget.getAppearances()) === null || _a === void 0 ? void 0 : _a.normal) instanceof core_1.PDFStream;
            if (!hasAppearances)
              return true;
          }
          return false;
        };
        PDFOptionList2.prototype.defaultUpdateAppearances = function(font) {
          utils_1.assertIs(font, "font", [[PDFFont_1.default, "PDFFont"]]);
          this.updateAppearances(font);
        };
        PDFOptionList2.prototype.updateAppearances = function(font, provider) {
          utils_1.assertIs(font, "font", [[PDFFont_1.default, "PDFFont"]]);
          utils_1.assertOrUndefined(provider, "provider", [Function]);
          var widgets = this.acroField.getWidgets();
          for (var idx = 0, len = widgets.length; idx < len; idx++) {
            var widget = widgets[idx];
            this.updateWidgetAppearance(widget, font, provider);
          }
          this.markAsClean();
        };
        PDFOptionList2.prototype.updateWidgetAppearance = function(widget, font, provider) {
          var apProvider = provider !== null && provider !== void 0 ? provider : appearances_1.defaultOptionListAppearanceProvider;
          var appearances = appearances_1.normalizeAppearance(apProvider(this, widget, font));
          this.updateWidgetAppearanceWithFont(widget, font, appearances);
        };
        PDFOptionList2.of = function(acroListBox, ref, doc) {
          return new PDFOptionList2(acroListBox, ref, doc);
        };
        return PDFOptionList2;
      })(PDFField_1.default)
    );
    exports.default = PDFOptionList;
  }
});

// node_modules/pdf-lib/cjs/api/form/PDFRadioGroup.js
var require_PDFRadioGroup = __commonJS({
  "node_modules/pdf-lib/cjs/api/form/PDFRadioGroup.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFPage_1 = tslib_1.__importDefault(require_PDFPage());
    var PDFField_1 = tslib_1.__importStar(require_PDFField());
    var appearances_1 = require_appearances();
    var colors_1 = require_colors();
    var rotations_1 = require_rotations();
    var core_1 = require_core();
    var utils_1 = require_utils2();
    var PDFRadioGroup = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PDFRadioGroup2, _super);
        function PDFRadioGroup2(acroRadioButton, ref, doc) {
          var _this = _super.call(this, acroRadioButton, ref, doc) || this;
          utils_1.assertIs(acroRadioButton, "acroRadioButton", [
            [core_1.PDFAcroRadioButton, "PDFAcroRadioButton"]
          ]);
          _this.acroField = acroRadioButton;
          return _this;
        }
        PDFRadioGroup2.prototype.getOptions = function() {
          var exportValues = this.acroField.getExportValues();
          if (exportValues) {
            var exportOptions = new Array(exportValues.length);
            for (var idx = 0, len = exportValues.length; idx < len; idx++) {
              exportOptions[idx] = exportValues[idx].decodeText();
            }
            return exportOptions;
          }
          var onValues = this.acroField.getOnValues();
          var onOptions = new Array(onValues.length);
          for (var idx = 0, len = onOptions.length; idx < len; idx++) {
            onOptions[idx] = onValues[idx].decodeText();
          }
          return onOptions;
        };
        PDFRadioGroup2.prototype.getSelected = function() {
          var value = this.acroField.getValue();
          if (value === core_1.PDFName.of("Off"))
            return void 0;
          var exportValues = this.acroField.getExportValues();
          if (exportValues) {
            var onValues = this.acroField.getOnValues();
            for (var idx = 0, len = onValues.length; idx < len; idx++) {
              if (onValues[idx] === value)
                return exportValues[idx].decodeText();
            }
          }
          return value.decodeText();
        };
        PDFRadioGroup2.prototype.select = function(option) {
          utils_1.assertIs(option, "option", ["string"]);
          var validOptions = this.getOptions();
          utils_1.assertIsOneOf(option, "option", validOptions);
          this.markAsDirty();
          var onValues = this.acroField.getOnValues();
          var exportValues = this.acroField.getExportValues();
          if (exportValues) {
            for (var idx = 0, len = exportValues.length; idx < len; idx++) {
              if (exportValues[idx].decodeText() === option) {
                this.acroField.setValue(onValues[idx]);
              }
            }
          } else {
            for (var idx = 0, len = onValues.length; idx < len; idx++) {
              var value = onValues[idx];
              if (value.decodeText() === option)
                this.acroField.setValue(value);
            }
          }
        };
        PDFRadioGroup2.prototype.clear = function() {
          this.markAsDirty();
          this.acroField.setValue(core_1.PDFName.of("Off"));
        };
        PDFRadioGroup2.prototype.isOffToggleable = function() {
          return !this.acroField.hasFlag(core_1.AcroButtonFlags.NoToggleToOff);
        };
        PDFRadioGroup2.prototype.enableOffToggling = function() {
          this.acroField.setFlagTo(core_1.AcroButtonFlags.NoToggleToOff, false);
        };
        PDFRadioGroup2.prototype.disableOffToggling = function() {
          this.acroField.setFlagTo(core_1.AcroButtonFlags.NoToggleToOff, true);
        };
        PDFRadioGroup2.prototype.isMutuallyExclusive = function() {
          return !this.acroField.hasFlag(core_1.AcroButtonFlags.RadiosInUnison);
        };
        PDFRadioGroup2.prototype.enableMutualExclusion = function() {
          this.acroField.setFlagTo(core_1.AcroButtonFlags.RadiosInUnison, false);
        };
        PDFRadioGroup2.prototype.disableMutualExclusion = function() {
          this.acroField.setFlagTo(core_1.AcroButtonFlags.RadiosInUnison, true);
        };
        PDFRadioGroup2.prototype.addOptionToPage = function(option, page, options) {
          var _a, _b, _c, _d, _e, _f, _g, _h, _j;
          utils_1.assertIs(option, "option", ["string"]);
          utils_1.assertIs(page, "page", [[PDFPage_1.default, "PDFPage"]]);
          PDFField_1.assertFieldAppearanceOptions(options);
          var widget = this.createWidget({
            x: (_a = options === null || options === void 0 ? void 0 : options.x) !== null && _a !== void 0 ? _a : 0,
            y: (_b = options === null || options === void 0 ? void 0 : options.y) !== null && _b !== void 0 ? _b : 0,
            width: (_c = options === null || options === void 0 ? void 0 : options.width) !== null && _c !== void 0 ? _c : 50,
            height: (_d = options === null || options === void 0 ? void 0 : options.height) !== null && _d !== void 0 ? _d : 50,
            textColor: (_e = options === null || options === void 0 ? void 0 : options.textColor) !== null && _e !== void 0 ? _e : colors_1.rgb(0, 0, 0),
            backgroundColor: (_f = options === null || options === void 0 ? void 0 : options.backgroundColor) !== null && _f !== void 0 ? _f : colors_1.rgb(1, 1, 1),
            borderColor: (_g = options === null || options === void 0 ? void 0 : options.borderColor) !== null && _g !== void 0 ? _g : colors_1.rgb(0, 0, 0),
            borderWidth: (_h = options === null || options === void 0 ? void 0 : options.borderWidth) !== null && _h !== void 0 ? _h : 1,
            rotate: (_j = options === null || options === void 0 ? void 0 : options.rotate) !== null && _j !== void 0 ? _j : rotations_1.degrees(0),
            hidden: options === null || options === void 0 ? void 0 : options.hidden,
            page: page.ref
          });
          var widgetRef = this.doc.context.register(widget.dict);
          var apStateValue = this.acroField.addWidgetWithOpt(widgetRef, core_1.PDFHexString.fromText(option), !this.isMutuallyExclusive());
          widget.setAppearanceState(core_1.PDFName.of("Off"));
          this.updateWidgetAppearance(widget, apStateValue);
          page.node.addAnnot(widgetRef);
        };
        PDFRadioGroup2.prototype.needsAppearancesUpdate = function() {
          var _a;
          var widgets = this.acroField.getWidgets();
          for (var idx = 0, len = widgets.length; idx < len; idx++) {
            var widget = widgets[idx];
            var state = widget.getAppearanceState();
            var normal = (_a = widget.getAppearances()) === null || _a === void 0 ? void 0 : _a.normal;
            if (!(normal instanceof core_1.PDFDict))
              return true;
            if (state && !normal.has(state))
              return true;
          }
          return false;
        };
        PDFRadioGroup2.prototype.defaultUpdateAppearances = function() {
          this.updateAppearances();
        };
        PDFRadioGroup2.prototype.updateAppearances = function(provider) {
          utils_1.assertOrUndefined(provider, "provider", [Function]);
          var widgets = this.acroField.getWidgets();
          for (var idx = 0, len = widgets.length; idx < len; idx++) {
            var widget = widgets[idx];
            var onValue = widget.getOnValue();
            if (!onValue)
              continue;
            this.updateWidgetAppearance(widget, onValue, provider);
          }
        };
        PDFRadioGroup2.prototype.updateWidgetAppearance = function(widget, onValue, provider) {
          var apProvider = provider !== null && provider !== void 0 ? provider : appearances_1.defaultRadioGroupAppearanceProvider;
          var appearances = appearances_1.normalizeAppearance(apProvider(this, widget));
          this.updateOnOffWidgetAppearance(widget, onValue, appearances);
        };
        PDFRadioGroup2.of = function(acroRadioButton, ref, doc) {
          return new PDFRadioGroup2(acroRadioButton, ref, doc);
        };
        return PDFRadioGroup2;
      })(PDFField_1.default)
    );
    exports.default = PDFRadioGroup;
  }
});

// node_modules/pdf-lib/cjs/api/form/PDFSignature.js
var require_PDFSignature = __commonJS({
  "node_modules/pdf-lib/cjs/api/form/PDFSignature.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFField_1 = tslib_1.__importDefault(require_PDFField());
    var core_1 = require_core();
    var utils_1 = require_utils2();
    var PDFSignature = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PDFSignature2, _super);
        function PDFSignature2(acroSignature, ref, doc) {
          var _this = _super.call(this, acroSignature, ref, doc) || this;
          utils_1.assertIs(acroSignature, "acroSignature", [
            [core_1.PDFAcroSignature, "PDFAcroSignature"]
          ]);
          _this.acroField = acroSignature;
          return _this;
        }
        PDFSignature2.prototype.needsAppearancesUpdate = function() {
          return false;
        };
        PDFSignature2.of = function(acroSignature, ref, doc) {
          return new PDFSignature2(acroSignature, ref, doc);
        };
        return PDFSignature2;
      })(PDFField_1.default)
    );
    exports.default = PDFSignature;
  }
});

// node_modules/pdf-lib/cjs/api/form/PDFTextField.js
var require_PDFTextField = __commonJS({
  "node_modules/pdf-lib/cjs/api/form/PDFTextField.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFPage_1 = tslib_1.__importDefault(require_PDFPage());
    var PDFFont_1 = tslib_1.__importDefault(require_PDFFont());
    var PDFField_1 = tslib_1.__importStar(require_PDFField());
    var appearances_1 = require_appearances();
    var colors_1 = require_colors();
    var rotations_1 = require_rotations();
    var errors_1 = require_errors3();
    var alignment_1 = require_alignment2();
    var alignment_2 = require_alignment();
    var core_1 = require_core();
    var utils_1 = require_utils2();
    var PDFTextField = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PDFTextField2, _super);
        function PDFTextField2(acroText, ref, doc) {
          var _this = _super.call(this, acroText, ref, doc) || this;
          utils_1.assertIs(acroText, "acroText", [[core_1.PDFAcroText, "PDFAcroText"]]);
          _this.acroField = acroText;
          return _this;
        }
        PDFTextField2.prototype.getText = function() {
          var value = this.acroField.getValue();
          if (!value && this.isRichFormatted()) {
            throw new errors_1.RichTextFieldReadError(this.getName());
          }
          return value === null || value === void 0 ? void 0 : value.decodeText();
        };
        PDFTextField2.prototype.setText = function(text) {
          utils_1.assertOrUndefined(text, "text", ["string"]);
          var maxLength = this.getMaxLength();
          if (maxLength !== void 0 && text && text.length > maxLength) {
            throw new errors_1.ExceededMaxLengthError(text.length, maxLength, this.getName());
          }
          this.markAsDirty();
          this.disableRichFormatting();
          if (text) {
            this.acroField.setValue(core_1.PDFHexString.fromText(text));
          } else {
            this.acroField.removeValue();
          }
        };
        PDFTextField2.prototype.getAlignment = function() {
          var quadding = this.acroField.getQuadding();
          return quadding === 0 ? alignment_2.TextAlignment.Left : quadding === 1 ? alignment_2.TextAlignment.Center : quadding === 2 ? alignment_2.TextAlignment.Right : alignment_2.TextAlignment.Left;
        };
        PDFTextField2.prototype.setAlignment = function(alignment) {
          utils_1.assertIsOneOf(alignment, "alignment", alignment_2.TextAlignment);
          this.markAsDirty();
          this.acroField.setQuadding(alignment);
        };
        PDFTextField2.prototype.getMaxLength = function() {
          return this.acroField.getMaxLength();
        };
        PDFTextField2.prototype.setMaxLength = function(maxLength) {
          utils_1.assertRangeOrUndefined(maxLength, "maxLength", 0, Number.MAX_SAFE_INTEGER);
          this.markAsDirty();
          if (maxLength === void 0) {
            this.acroField.removeMaxLength();
          } else {
            var text = this.getText();
            if (text && text.length > maxLength) {
              throw new errors_1.InvalidMaxLengthError(text.length, maxLength, this.getName());
            }
            this.acroField.setMaxLength(maxLength);
          }
        };
        PDFTextField2.prototype.removeMaxLength = function() {
          this.markAsDirty();
          this.acroField.removeMaxLength();
        };
        PDFTextField2.prototype.setImage = function(image) {
          var fieldAlignment = this.getAlignment();
          var alignment = fieldAlignment === alignment_2.TextAlignment.Center ? alignment_1.ImageAlignment.Center : fieldAlignment === alignment_2.TextAlignment.Right ? alignment_1.ImageAlignment.Right : alignment_1.ImageAlignment.Left;
          var widgets = this.acroField.getWidgets();
          for (var idx = 0, len = widgets.length; idx < len; idx++) {
            var widget = widgets[idx];
            var streamRef = this.createImageAppearanceStream(widget, image, alignment);
            this.updateWidgetAppearances(widget, { normal: streamRef });
          }
          this.markAsClean();
        };
        PDFTextField2.prototype.setFontSize = function(fontSize) {
          utils_1.assertPositive(fontSize, "fontSize");
          this.acroField.setFontSize(fontSize);
          this.markAsDirty();
        };
        PDFTextField2.prototype.isMultiline = function() {
          return this.acroField.hasFlag(core_1.AcroTextFlags.Multiline);
        };
        PDFTextField2.prototype.enableMultiline = function() {
          this.markAsDirty();
          this.acroField.setFlagTo(core_1.AcroTextFlags.Multiline, true);
        };
        PDFTextField2.prototype.disableMultiline = function() {
          this.markAsDirty();
          this.acroField.setFlagTo(core_1.AcroTextFlags.Multiline, false);
        };
        PDFTextField2.prototype.isPassword = function() {
          return this.acroField.hasFlag(core_1.AcroTextFlags.Password);
        };
        PDFTextField2.prototype.enablePassword = function() {
          this.acroField.setFlagTo(core_1.AcroTextFlags.Password, true);
        };
        PDFTextField2.prototype.disablePassword = function() {
          this.acroField.setFlagTo(core_1.AcroTextFlags.Password, false);
        };
        PDFTextField2.prototype.isFileSelector = function() {
          return this.acroField.hasFlag(core_1.AcroTextFlags.FileSelect);
        };
        PDFTextField2.prototype.enableFileSelection = function() {
          this.acroField.setFlagTo(core_1.AcroTextFlags.FileSelect, true);
        };
        PDFTextField2.prototype.disableFileSelection = function() {
          this.acroField.setFlagTo(core_1.AcroTextFlags.FileSelect, false);
        };
        PDFTextField2.prototype.isSpellChecked = function() {
          return !this.acroField.hasFlag(core_1.AcroTextFlags.DoNotSpellCheck);
        };
        PDFTextField2.prototype.enableSpellChecking = function() {
          this.acroField.setFlagTo(core_1.AcroTextFlags.DoNotSpellCheck, false);
        };
        PDFTextField2.prototype.disableSpellChecking = function() {
          this.acroField.setFlagTo(core_1.AcroTextFlags.DoNotSpellCheck, true);
        };
        PDFTextField2.prototype.isScrollable = function() {
          return !this.acroField.hasFlag(core_1.AcroTextFlags.DoNotScroll);
        };
        PDFTextField2.prototype.enableScrolling = function() {
          this.acroField.setFlagTo(core_1.AcroTextFlags.DoNotScroll, false);
        };
        PDFTextField2.prototype.disableScrolling = function() {
          this.acroField.setFlagTo(core_1.AcroTextFlags.DoNotScroll, true);
        };
        PDFTextField2.prototype.isCombed = function() {
          return this.acroField.hasFlag(core_1.AcroTextFlags.Comb) && !this.isMultiline() && !this.isPassword() && !this.isFileSelector() && this.getMaxLength() !== void 0;
        };
        PDFTextField2.prototype.enableCombing = function() {
          if (this.getMaxLength() === void 0) {
            var msg = "PDFTextFields must have a max length in order to be combed";
            console.warn(msg);
          }
          this.markAsDirty();
          this.disableMultiline();
          this.disablePassword();
          this.disableFileSelection();
          this.acroField.setFlagTo(core_1.AcroTextFlags.Comb, true);
        };
        PDFTextField2.prototype.disableCombing = function() {
          this.markAsDirty();
          this.acroField.setFlagTo(core_1.AcroTextFlags.Comb, false);
        };
        PDFTextField2.prototype.isRichFormatted = function() {
          return this.acroField.hasFlag(core_1.AcroTextFlags.RichText);
        };
        PDFTextField2.prototype.enableRichFormatting = function() {
          this.acroField.setFlagTo(core_1.AcroTextFlags.RichText, true);
        };
        PDFTextField2.prototype.disableRichFormatting = function() {
          this.acroField.setFlagTo(core_1.AcroTextFlags.RichText, false);
        };
        PDFTextField2.prototype.addToPage = function(page, options) {
          var _a, _b, _c, _d, _e, _f, _g;
          utils_1.assertIs(page, "page", [[PDFPage_1.default, "PDFPage"]]);
          PDFField_1.assertFieldAppearanceOptions(options);
          if (!options)
            options = {};
          if (!("textColor" in options))
            options.textColor = colors_1.rgb(0, 0, 0);
          if (!("backgroundColor" in options))
            options.backgroundColor = colors_1.rgb(1, 1, 1);
          if (!("borderColor" in options))
            options.borderColor = colors_1.rgb(0, 0, 0);
          if (!("borderWidth" in options))
            options.borderWidth = 1;
          var widget = this.createWidget({
            x: (_a = options.x) !== null && _a !== void 0 ? _a : 0,
            y: (_b = options.y) !== null && _b !== void 0 ? _b : 0,
            width: (_c = options.width) !== null && _c !== void 0 ? _c : 200,
            height: (_d = options.height) !== null && _d !== void 0 ? _d : 50,
            textColor: options.textColor,
            backgroundColor: options.backgroundColor,
            borderColor: options.borderColor,
            borderWidth: (_e = options.borderWidth) !== null && _e !== void 0 ? _e : 0,
            rotate: (_f = options.rotate) !== null && _f !== void 0 ? _f : rotations_1.degrees(0),
            hidden: options.hidden,
            page: page.ref
          });
          var widgetRef = this.doc.context.register(widget.dict);
          this.acroField.addWidget(widgetRef);
          var font = (_g = options.font) !== null && _g !== void 0 ? _g : this.doc.getForm().getDefaultFont();
          this.updateWidgetAppearance(widget, font);
          page.node.addAnnot(widgetRef);
        };
        PDFTextField2.prototype.needsAppearancesUpdate = function() {
          var _a;
          if (this.isDirty())
            return true;
          var widgets = this.acroField.getWidgets();
          for (var idx = 0, len = widgets.length; idx < len; idx++) {
            var widget = widgets[idx];
            var hasAppearances = ((_a = widget.getAppearances()) === null || _a === void 0 ? void 0 : _a.normal) instanceof core_1.PDFStream;
            if (!hasAppearances)
              return true;
          }
          return false;
        };
        PDFTextField2.prototype.defaultUpdateAppearances = function(font) {
          utils_1.assertIs(font, "font", [[PDFFont_1.default, "PDFFont"]]);
          this.updateAppearances(font);
        };
        PDFTextField2.prototype.updateAppearances = function(font, provider) {
          utils_1.assertIs(font, "font", [[PDFFont_1.default, "PDFFont"]]);
          utils_1.assertOrUndefined(provider, "provider", [Function]);
          var widgets = this.acroField.getWidgets();
          for (var idx = 0, len = widgets.length; idx < len; idx++) {
            var widget = widgets[idx];
            this.updateWidgetAppearance(widget, font, provider);
          }
          this.markAsClean();
        };
        PDFTextField2.prototype.updateWidgetAppearance = function(widget, font, provider) {
          var apProvider = provider !== null && provider !== void 0 ? provider : appearances_1.defaultTextFieldAppearanceProvider;
          var appearances = appearances_1.normalizeAppearance(apProvider(this, widget, font));
          this.updateWidgetAppearanceWithFont(widget, font, appearances);
        };
        PDFTextField2.of = function(acroText, ref, doc) {
          return new PDFTextField2(acroText, ref, doc);
        };
        return PDFTextField2;
      })(PDFField_1.default)
    );
    exports.default = PDFTextField;
  }
});

// node_modules/pdf-lib/cjs/api/StandardFonts.js
var require_StandardFonts = __commonJS({
  "node_modules/pdf-lib/cjs/api/StandardFonts.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StandardFonts = void 0;
    var StandardFonts;
    (function(StandardFonts2) {
      StandardFonts2["Courier"] = "Courier";
      StandardFonts2["CourierBold"] = "Courier-Bold";
      StandardFonts2["CourierOblique"] = "Courier-Oblique";
      StandardFonts2["CourierBoldOblique"] = "Courier-BoldOblique";
      StandardFonts2["Helvetica"] = "Helvetica";
      StandardFonts2["HelveticaBold"] = "Helvetica-Bold";
      StandardFonts2["HelveticaOblique"] = "Helvetica-Oblique";
      StandardFonts2["HelveticaBoldOblique"] = "Helvetica-BoldOblique";
      StandardFonts2["TimesRoman"] = "Times-Roman";
      StandardFonts2["TimesRomanBold"] = "Times-Bold";
      StandardFonts2["TimesRomanItalic"] = "Times-Italic";
      StandardFonts2["TimesRomanBoldItalic"] = "Times-BoldItalic";
      StandardFonts2["Symbol"] = "Symbol";
      StandardFonts2["ZapfDingbats"] = "ZapfDingbats";
    })(StandardFonts = exports.StandardFonts || (exports.StandardFonts = {}));
  }
});

// node_modules/pdf-lib/cjs/api/form/PDFForm.js
var require_PDFForm = __commonJS({
  "node_modules/pdf-lib/cjs/api/form/PDFForm.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFDocument_1 = tslib_1.__importDefault(require_PDFDocument());
    var PDFButton_1 = tslib_1.__importDefault(require_PDFButton());
    var PDFCheckBox_1 = tslib_1.__importDefault(require_PDFCheckBox());
    var PDFDropdown_1 = tslib_1.__importDefault(require_PDFDropdown());
    var PDFOptionList_1 = tslib_1.__importDefault(require_PDFOptionList());
    var PDFRadioGroup_1 = tslib_1.__importDefault(require_PDFRadioGroup());
    var PDFSignature_1 = tslib_1.__importDefault(require_PDFSignature());
    var PDFTextField_1 = tslib_1.__importDefault(require_PDFTextField());
    var errors_1 = require_errors3();
    var PDFFont_1 = tslib_1.__importDefault(require_PDFFont());
    var StandardFonts_1 = require_StandardFonts();
    var operations_1 = require_operations();
    var operators_1 = require_operators();
    var core_1 = require_core();
    var utils_1 = require_utils2();
    var PDFForm = (
      /** @class */
      (function() {
        function PDFForm2(acroForm, doc) {
          var _this = this;
          this.embedDefaultFont = function() {
            return _this.doc.embedStandardFont(StandardFonts_1.StandardFonts.Helvetica);
          };
          utils_1.assertIs(acroForm, "acroForm", [[core_1.PDFAcroForm, "PDFAcroForm"]]);
          utils_1.assertIs(doc, "doc", [[PDFDocument_1.default, "PDFDocument"]]);
          this.acroForm = acroForm;
          this.doc = doc;
          this.dirtyFields = /* @__PURE__ */ new Set();
          this.defaultFontCache = utils_1.Cache.populatedBy(this.embedDefaultFont);
        }
        PDFForm2.prototype.hasXFA = function() {
          return this.acroForm.dict.has(core_1.PDFName.of("XFA"));
        };
        PDFForm2.prototype.deleteXFA = function() {
          this.acroForm.dict.delete(core_1.PDFName.of("XFA"));
        };
        PDFForm2.prototype.getFields = function() {
          var allFields = this.acroForm.getAllFields();
          var fields = [];
          for (var idx = 0, len = allFields.length; idx < len; idx++) {
            var _a = allFields[idx], acroField = _a[0], ref = _a[1];
            var field = convertToPDFField(acroField, ref, this.doc);
            if (field)
              fields.push(field);
          }
          return fields;
        };
        PDFForm2.prototype.getFieldMaybe = function(name) {
          utils_1.assertIs(name, "name", ["string"]);
          var fields = this.getFields();
          for (var idx = 0, len = fields.length; idx < len; idx++) {
            var field = fields[idx];
            if (field.getName() === name)
              return field;
          }
          return void 0;
        };
        PDFForm2.prototype.getField = function(name) {
          utils_1.assertIs(name, "name", ["string"]);
          var field = this.getFieldMaybe(name);
          if (field)
            return field;
          throw new errors_1.NoSuchFieldError(name);
        };
        PDFForm2.prototype.getButton = function(name) {
          utils_1.assertIs(name, "name", ["string"]);
          var field = this.getField(name);
          if (field instanceof PDFButton_1.default)
            return field;
          throw new errors_1.UnexpectedFieldTypeError(name, PDFButton_1.default, field);
        };
        PDFForm2.prototype.getCheckBox = function(name) {
          utils_1.assertIs(name, "name", ["string"]);
          var field = this.getField(name);
          if (field instanceof PDFCheckBox_1.default)
            return field;
          throw new errors_1.UnexpectedFieldTypeError(name, PDFCheckBox_1.default, field);
        };
        PDFForm2.prototype.getDropdown = function(name) {
          utils_1.assertIs(name, "name", ["string"]);
          var field = this.getField(name);
          if (field instanceof PDFDropdown_1.default)
            return field;
          throw new errors_1.UnexpectedFieldTypeError(name, PDFDropdown_1.default, field);
        };
        PDFForm2.prototype.getOptionList = function(name) {
          utils_1.assertIs(name, "name", ["string"]);
          var field = this.getField(name);
          if (field instanceof PDFOptionList_1.default)
            return field;
          throw new errors_1.UnexpectedFieldTypeError(name, PDFOptionList_1.default, field);
        };
        PDFForm2.prototype.getRadioGroup = function(name) {
          utils_1.assertIs(name, "name", ["string"]);
          var field = this.getField(name);
          if (field instanceof PDFRadioGroup_1.default)
            return field;
          throw new errors_1.UnexpectedFieldTypeError(name, PDFRadioGroup_1.default, field);
        };
        PDFForm2.prototype.getSignature = function(name) {
          utils_1.assertIs(name, "name", ["string"]);
          var field = this.getField(name);
          if (field instanceof PDFSignature_1.default)
            return field;
          throw new errors_1.UnexpectedFieldTypeError(name, PDFSignature_1.default, field);
        };
        PDFForm2.prototype.getTextField = function(name) {
          utils_1.assertIs(name, "name", ["string"]);
          var field = this.getField(name);
          if (field instanceof PDFTextField_1.default)
            return field;
          throw new errors_1.UnexpectedFieldTypeError(name, PDFTextField_1.default, field);
        };
        PDFForm2.prototype.createButton = function(name) {
          utils_1.assertIs(name, "name", ["string"]);
          var nameParts = splitFieldName(name);
          var parent = this.findOrCreateNonTerminals(nameParts.nonTerminal);
          var button = core_1.PDFAcroPushButton.create(this.doc.context);
          button.setPartialName(nameParts.terminal);
          addFieldToParent(parent, [button, button.ref], nameParts.terminal);
          return PDFButton_1.default.of(button, button.ref, this.doc);
        };
        PDFForm2.prototype.createCheckBox = function(name) {
          utils_1.assertIs(name, "name", ["string"]);
          var nameParts = splitFieldName(name);
          var parent = this.findOrCreateNonTerminals(nameParts.nonTerminal);
          var checkBox = core_1.PDFAcroCheckBox.create(this.doc.context);
          checkBox.setPartialName(nameParts.terminal);
          addFieldToParent(parent, [checkBox, checkBox.ref], nameParts.terminal);
          return PDFCheckBox_1.default.of(checkBox, checkBox.ref, this.doc);
        };
        PDFForm2.prototype.createDropdown = function(name) {
          utils_1.assertIs(name, "name", ["string"]);
          var nameParts = splitFieldName(name);
          var parent = this.findOrCreateNonTerminals(nameParts.nonTerminal);
          var comboBox = core_1.PDFAcroComboBox.create(this.doc.context);
          comboBox.setPartialName(nameParts.terminal);
          addFieldToParent(parent, [comboBox, comboBox.ref], nameParts.terminal);
          return PDFDropdown_1.default.of(comboBox, comboBox.ref, this.doc);
        };
        PDFForm2.prototype.createOptionList = function(name) {
          utils_1.assertIs(name, "name", ["string"]);
          var nameParts = splitFieldName(name);
          var parent = this.findOrCreateNonTerminals(nameParts.nonTerminal);
          var listBox = core_1.PDFAcroListBox.create(this.doc.context);
          listBox.setPartialName(nameParts.terminal);
          addFieldToParent(parent, [listBox, listBox.ref], nameParts.terminal);
          return PDFOptionList_1.default.of(listBox, listBox.ref, this.doc);
        };
        PDFForm2.prototype.createRadioGroup = function(name) {
          utils_1.assertIs(name, "name", ["string"]);
          var nameParts = splitFieldName(name);
          var parent = this.findOrCreateNonTerminals(nameParts.nonTerminal);
          var radioButton = core_1.PDFAcroRadioButton.create(this.doc.context);
          radioButton.setPartialName(nameParts.terminal);
          addFieldToParent(parent, [radioButton, radioButton.ref], nameParts.terminal);
          return PDFRadioGroup_1.default.of(radioButton, radioButton.ref, this.doc);
        };
        PDFForm2.prototype.createTextField = function(name) {
          utils_1.assertIs(name, "name", ["string"]);
          var nameParts = splitFieldName(name);
          var parent = this.findOrCreateNonTerminals(nameParts.nonTerminal);
          var text = core_1.PDFAcroText.create(this.doc.context);
          text.setPartialName(nameParts.terminal);
          addFieldToParent(parent, [text, text.ref], nameParts.terminal);
          return PDFTextField_1.default.of(text, text.ref, this.doc);
        };
        PDFForm2.prototype.flatten = function(options) {
          if (options === void 0) {
            options = { updateFieldAppearances: true };
          }
          if (options.updateFieldAppearances) {
            this.updateFieldAppearances();
          }
          var fields = this.getFields();
          for (var i = 0, lenFields = fields.length; i < lenFields; i++) {
            var field = fields[i];
            var widgets = field.acroField.getWidgets();
            for (var j = 0, lenWidgets = widgets.length; j < lenWidgets; j++) {
              var widget = widgets[j];
              var page = this.findWidgetPage(widget);
              var widgetRef = this.findWidgetAppearanceRef(field, widget);
              var xObjectKey = page.node.newXObject("FlatWidget", widgetRef);
              var rectangle = widget.getRectangle();
              var operators = tslib_1.__spreadArrays([
                operators_1.pushGraphicsState(),
                operators_1.translate(rectangle.x, rectangle.y)
              ], operations_1.rotateInPlace(tslib_1.__assign(tslib_1.__assign({}, rectangle), { rotation: 0 })), [
                operators_1.drawObject(xObjectKey),
                operators_1.popGraphicsState()
              ]).filter(Boolean);
              page.pushOperators.apply(page, operators);
            }
            this.removeField(field);
          }
        };
        PDFForm2.prototype.removeField = function(field) {
          var widgets = field.acroField.getWidgets();
          var pages = /* @__PURE__ */ new Set();
          for (var i = 0, len = widgets.length; i < len; i++) {
            var widget = widgets[i];
            var widgetRef = this.findWidgetAppearanceRef(field, widget);
            var page = this.findWidgetPage(widget);
            pages.add(page);
            page.node.removeAnnot(widgetRef);
          }
          pages.forEach(function(page2) {
            return page2.node.removeAnnot(field.ref);
          });
          this.acroForm.removeField(field.acroField);
          var fieldKids = field.acroField.normalizedEntries().Kids;
          var kidsCount = fieldKids.size();
          for (var childIndex = 0; childIndex < kidsCount; childIndex++) {
            var child = fieldKids.get(childIndex);
            if (child instanceof core_1.PDFRef) {
              this.doc.context.delete(child);
            }
          }
          this.doc.context.delete(field.ref);
        };
        PDFForm2.prototype.updateFieldAppearances = function(font) {
          utils_1.assertOrUndefined(font, "font", [[PDFFont_1.default, "PDFFont"]]);
          font = font !== null && font !== void 0 ? font : this.getDefaultFont();
          var fields = this.getFields();
          for (var idx = 0, len = fields.length; idx < len; idx++) {
            var field = fields[idx];
            if (field.needsAppearancesUpdate()) {
              field.defaultUpdateAppearances(font);
            }
          }
        };
        PDFForm2.prototype.markFieldAsDirty = function(fieldRef) {
          utils_1.assertOrUndefined(fieldRef, "fieldRef", [[core_1.PDFRef, "PDFRef"]]);
          this.dirtyFields.add(fieldRef);
        };
        PDFForm2.prototype.markFieldAsClean = function(fieldRef) {
          utils_1.assertOrUndefined(fieldRef, "fieldRef", [[core_1.PDFRef, "PDFRef"]]);
          this.dirtyFields.delete(fieldRef);
        };
        PDFForm2.prototype.fieldIsDirty = function(fieldRef) {
          utils_1.assertOrUndefined(fieldRef, "fieldRef", [[core_1.PDFRef, "PDFRef"]]);
          return this.dirtyFields.has(fieldRef);
        };
        PDFForm2.prototype.getDefaultFont = function() {
          return this.defaultFontCache.access();
        };
        PDFForm2.prototype.findWidgetPage = function(widget) {
          var pageRef = widget.P();
          var page = this.doc.getPages().find(function(x) {
            return x.ref === pageRef;
          });
          if (page === void 0) {
            var widgetRef = this.doc.context.getObjectRef(widget.dict);
            if (widgetRef === void 0) {
              throw new Error("Could not find PDFRef for PDFObject");
            }
            page = this.doc.findPageForAnnotationRef(widgetRef);
            if (page === void 0) {
              throw new Error("Could not find page for PDFRef " + widgetRef);
            }
          }
          return page;
        };
        PDFForm2.prototype.findWidgetAppearanceRef = function(field, widget) {
          var _a;
          var refOrDict = widget.getNormalAppearance();
          if (refOrDict instanceof core_1.PDFDict && (field instanceof PDFCheckBox_1.default || field instanceof PDFRadioGroup_1.default)) {
            var value = field.acroField.getValue();
            var ref = (_a = refOrDict.get(value)) !== null && _a !== void 0 ? _a : refOrDict.get(core_1.PDFName.of("Off"));
            if (ref instanceof core_1.PDFRef) {
              refOrDict = ref;
            }
          }
          if (!(refOrDict instanceof core_1.PDFRef)) {
            var name_1 = field.getName();
            throw new Error("Failed to extract appearance ref for: " + name_1);
          }
          return refOrDict;
        };
        PDFForm2.prototype.findOrCreateNonTerminals = function(partialNames) {
          var nonTerminal = [
            this.acroForm
          ];
          for (var idx = 0, len = partialNames.length; idx < len; idx++) {
            var namePart = partialNames[idx];
            if (!namePart)
              throw new errors_1.InvalidFieldNamePartError(namePart);
            var parent_1 = nonTerminal[0], parentRef = nonTerminal[1];
            var res = this.findNonTerminal(namePart, parent_1);
            if (res) {
              nonTerminal = res;
            } else {
              var node = core_1.PDFAcroNonTerminal.create(this.doc.context);
              node.setPartialName(namePart);
              node.setParent(parentRef);
              var nodeRef = this.doc.context.register(node.dict);
              parent_1.addField(nodeRef);
              nonTerminal = [node, nodeRef];
            }
          }
          return nonTerminal;
        };
        PDFForm2.prototype.findNonTerminal = function(partialName, parent) {
          var fields = parent instanceof core_1.PDFAcroForm ? this.acroForm.getFields() : core_1.createPDFAcroFields(parent.Kids());
          for (var idx = 0, len = fields.length; idx < len; idx++) {
            var _a = fields[idx], field = _a[0], ref = _a[1];
            if (field.getPartialName() === partialName) {
              if (field instanceof core_1.PDFAcroNonTerminal)
                return [field, ref];
              throw new errors_1.FieldAlreadyExistsError(partialName);
            }
          }
          return void 0;
        };
        PDFForm2.of = function(acroForm, doc) {
          return new PDFForm2(acroForm, doc);
        };
        return PDFForm2;
      })()
    );
    exports.default = PDFForm;
    var convertToPDFField = function(field, ref, doc) {
      if (field instanceof core_1.PDFAcroPushButton)
        return PDFButton_1.default.of(field, ref, doc);
      if (field instanceof core_1.PDFAcroCheckBox)
        return PDFCheckBox_1.default.of(field, ref, doc);
      if (field instanceof core_1.PDFAcroComboBox)
        return PDFDropdown_1.default.of(field, ref, doc);
      if (field instanceof core_1.PDFAcroListBox)
        return PDFOptionList_1.default.of(field, ref, doc);
      if (field instanceof core_1.PDFAcroText)
        return PDFTextField_1.default.of(field, ref, doc);
      if (field instanceof core_1.PDFAcroRadioButton) {
        return PDFRadioGroup_1.default.of(field, ref, doc);
      }
      if (field instanceof core_1.PDFAcroSignature) {
        return PDFSignature_1.default.of(field, ref, doc);
      }
      return void 0;
    };
    var splitFieldName = function(fullyQualifiedName) {
      if (fullyQualifiedName.length === 0) {
        throw new Error("PDF field names must not be empty strings");
      }
      var parts = fullyQualifiedName.split(".");
      for (var idx = 0, len = parts.length; idx < len; idx++) {
        if (parts[idx] === "") {
          throw new Error('Periods in PDF field names must be separated by at least one character: "' + fullyQualifiedName + '"');
        }
      }
      if (parts.length === 1)
        return { nonTerminal: [], terminal: parts[0] };
      return {
        nonTerminal: parts.slice(0, parts.length - 1),
        terminal: parts[parts.length - 1]
      };
    };
    var addFieldToParent = function(_a, _b, partialName) {
      var parent = _a[0], parentRef = _a[1];
      var field = _b[0], fieldRef = _b[1];
      var entries = parent.normalizedEntries();
      var fields = core_1.createPDFAcroFields("Kids" in entries ? entries.Kids : entries.Fields);
      for (var idx = 0, len = fields.length; idx < len; idx++) {
        if (fields[idx][0].getPartialName() === partialName) {
          throw new errors_1.FieldAlreadyExistsError(partialName);
        }
      }
      parent.addField(fieldRef);
      field.setParent(parentRef);
    };
  }
});

// node_modules/pdf-lib/cjs/api/sizes.js
var require_sizes = __commonJS({
  "node_modules/pdf-lib/cjs/api/sizes.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PageSizes = void 0;
    exports.PageSizes = {
      "4A0": [4767.87, 6740.79],
      "2A0": [3370.39, 4767.87],
      A0: [2383.94, 3370.39],
      A1: [1683.78, 2383.94],
      A2: [1190.55, 1683.78],
      A3: [841.89, 1190.55],
      A4: [595.28, 841.89],
      A5: [419.53, 595.28],
      A6: [297.64, 419.53],
      A7: [209.76, 297.64],
      A8: [147.4, 209.76],
      A9: [104.88, 147.4],
      A10: [73.7, 104.88],
      B0: [2834.65, 4008.19],
      B1: [2004.09, 2834.65],
      B2: [1417.32, 2004.09],
      B3: [1000.63, 1417.32],
      B4: [708.66, 1000.63],
      B5: [498.9, 708.66],
      B6: [354.33, 498.9],
      B7: [249.45, 354.33],
      B8: [175.75, 249.45],
      B9: [124.72, 175.75],
      B10: [87.87, 124.72],
      C0: [2599.37, 3676.54],
      C1: [1836.85, 2599.37],
      C2: [1298.27, 1836.85],
      C3: [918.43, 1298.27],
      C4: [649.13, 918.43],
      C5: [459.21, 649.13],
      C6: [323.15, 459.21],
      C7: [229.61, 323.15],
      C8: [161.57, 229.61],
      C9: [113.39, 161.57],
      C10: [79.37, 113.39],
      RA0: [2437.8, 3458.27],
      RA1: [1729.13, 2437.8],
      RA2: [1218.9, 1729.13],
      RA3: [864.57, 1218.9],
      RA4: [609.45, 864.57],
      SRA0: [2551.18, 3628.35],
      SRA1: [1814.17, 2551.18],
      SRA2: [1275.59, 1814.17],
      SRA3: [907.09, 1275.59],
      SRA4: [637.8, 907.09],
      Executive: [521.86, 756],
      Folio: [612, 936],
      Legal: [612, 1008],
      Letter: [612, 792],
      Tabloid: [792, 1224]
    };
  }
});

// node_modules/pdf-lib/cjs/api/PDFDocumentOptions.js
var require_PDFDocumentOptions = __commonJS({
  "node_modules/pdf-lib/cjs/api/PDFDocumentOptions.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ParseSpeeds = void 0;
    var ParseSpeeds;
    (function(ParseSpeeds2) {
      ParseSpeeds2[ParseSpeeds2["Fastest"] = Infinity] = "Fastest";
      ParseSpeeds2[ParseSpeeds2["Fast"] = 1500] = "Fast";
      ParseSpeeds2[ParseSpeeds2["Medium"] = 500] = "Medium";
      ParseSpeeds2[ParseSpeeds2["Slow"] = 100] = "Slow";
    })(ParseSpeeds = exports.ParseSpeeds || (exports.ParseSpeeds = {}));
  }
});

// node_modules/pdf-lib/cjs/api/PDFEmbeddedFile.js
var require_PDFEmbeddedFile = __commonJS({
  "node_modules/pdf-lib/cjs/api/PDFEmbeddedFile.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var core_1 = require_core();
    var PDFEmbeddedFile = (
      /** @class */
      (function() {
        function PDFEmbeddedFile2(ref, doc, embedder) {
          this.alreadyEmbedded = false;
          this.ref = ref;
          this.doc = doc;
          this.embedder = embedder;
        }
        PDFEmbeddedFile2.prototype.embed = function() {
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            var ref, Names, EmbeddedFiles, EFNames, AF;
            return tslib_1.__generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  if (!!this.alreadyEmbedded) return [3, 2];
                  return [4, this.embedder.embedIntoContext(this.doc.context, this.ref)];
                case 1:
                  ref = _a.sent();
                  if (!this.doc.catalog.has(core_1.PDFName.of("Names"))) {
                    this.doc.catalog.set(core_1.PDFName.of("Names"), this.doc.context.obj({}));
                  }
                  Names = this.doc.catalog.lookup(core_1.PDFName.of("Names"), core_1.PDFDict);
                  if (!Names.has(core_1.PDFName.of("EmbeddedFiles"))) {
                    Names.set(core_1.PDFName.of("EmbeddedFiles"), this.doc.context.obj({}));
                  }
                  EmbeddedFiles = Names.lookup(core_1.PDFName.of("EmbeddedFiles"), core_1.PDFDict);
                  if (!EmbeddedFiles.has(core_1.PDFName.of("Names"))) {
                    EmbeddedFiles.set(core_1.PDFName.of("Names"), this.doc.context.obj([]));
                  }
                  EFNames = EmbeddedFiles.lookup(core_1.PDFName.of("Names"), core_1.PDFArray);
                  EFNames.push(core_1.PDFHexString.fromText(this.embedder.fileName));
                  EFNames.push(ref);
                  if (!this.doc.catalog.has(core_1.PDFName.of("AF"))) {
                    this.doc.catalog.set(core_1.PDFName.of("AF"), this.doc.context.obj([]));
                  }
                  AF = this.doc.catalog.lookup(core_1.PDFName.of("AF"), core_1.PDFArray);
                  AF.push(ref);
                  this.alreadyEmbedded = true;
                  _a.label = 2;
                case 2:
                  return [
                    2
                    /*return*/
                  ];
              }
            });
          });
        };
        PDFEmbeddedFile2.of = function(ref, doc, embedder) {
          return new PDFEmbeddedFile2(ref, doc, embedder);
        };
        return PDFEmbeddedFile2;
      })()
    );
    exports.default = PDFEmbeddedFile;
  }
});

// node_modules/pdf-lib/cjs/api/PDFJavaScript.js
var require_PDFJavaScript = __commonJS({
  "node_modules/pdf-lib/cjs/api/PDFJavaScript.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var core_1 = require_core();
    var PDFJavaScript = (
      /** @class */
      (function() {
        function PDFJavaScript2(ref, doc, embedder) {
          this.alreadyEmbedded = false;
          this.ref = ref;
          this.doc = doc;
          this.embedder = embedder;
        }
        PDFJavaScript2.prototype.embed = function() {
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            var _a, catalog, context, ref, Names, Javascript, JSNames;
            return tslib_1.__generator(this, function(_b) {
              switch (_b.label) {
                case 0:
                  if (!!this.alreadyEmbedded) return [3, 2];
                  _a = this.doc, catalog = _a.catalog, context = _a.context;
                  return [4, this.embedder.embedIntoContext(this.doc.context, this.ref)];
                case 1:
                  ref = _b.sent();
                  if (!catalog.has(core_1.PDFName.of("Names"))) {
                    catalog.set(core_1.PDFName.of("Names"), context.obj({}));
                  }
                  Names = catalog.lookup(core_1.PDFName.of("Names"), core_1.PDFDict);
                  if (!Names.has(core_1.PDFName.of("JavaScript"))) {
                    Names.set(core_1.PDFName.of("JavaScript"), context.obj({}));
                  }
                  Javascript = Names.lookup(core_1.PDFName.of("JavaScript"), core_1.PDFDict);
                  if (!Javascript.has(core_1.PDFName.of("Names"))) {
                    Javascript.set(core_1.PDFName.of("Names"), context.obj([]));
                  }
                  JSNames = Javascript.lookup(core_1.PDFName.of("Names"), core_1.PDFArray);
                  JSNames.push(core_1.PDFHexString.fromText(this.embedder.scriptName));
                  JSNames.push(ref);
                  this.alreadyEmbedded = true;
                  _b.label = 2;
                case 2:
                  return [
                    2
                    /*return*/
                  ];
              }
            });
          });
        };
        PDFJavaScript2.of = function(ref, doc, embedder) {
          return new PDFJavaScript2(ref, doc, embedder);
        };
        return PDFJavaScript2;
      })()
    );
    exports.default = PDFJavaScript;
  }
});

// node_modules/pdf-lib/cjs/core/embedders/JavaScriptEmbedder.js
var require_JavaScriptEmbedder = __commonJS({
  "node_modules/pdf-lib/cjs/core/embedders/JavaScriptEmbedder.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFHexString_1 = tslib_1.__importDefault(require_PDFHexString());
    var JavaScriptEmbedder = (
      /** @class */
      (function() {
        function JavaScriptEmbedder2(script, scriptName) {
          this.script = script;
          this.scriptName = scriptName;
        }
        JavaScriptEmbedder2.for = function(script, scriptName) {
          return new JavaScriptEmbedder2(script, scriptName);
        };
        JavaScriptEmbedder2.prototype.embedIntoContext = function(context, ref) {
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            var jsActionDict;
            return tslib_1.__generator(this, function(_a) {
              jsActionDict = context.obj({
                Type: "Action",
                S: "JavaScript",
                JS: PDFHexString_1.default.fromText(this.script)
              });
              if (ref) {
                context.assign(ref, jsActionDict);
                return [2, ref];
              } else {
                return [2, context.register(jsActionDict)];
              }
              return [
                2
                /*return*/
              ];
            });
          });
        };
        return JavaScriptEmbedder2;
      })()
    );
    exports.default = JavaScriptEmbedder;
  }
});

// node_modules/pdf-lib/cjs/api/PDFDocument.js
var require_PDFDocument = __commonJS({
  "node_modules/pdf-lib/cjs/api/PDFDocument.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var errors_1 = require_errors3();
    var PDFEmbeddedPage_1 = tslib_1.__importDefault(require_PDFEmbeddedPage());
    var PDFFont_1 = tslib_1.__importDefault(require_PDFFont());
    var PDFImage_1 = tslib_1.__importDefault(require_PDFImage());
    var PDFPage_1 = tslib_1.__importDefault(require_PDFPage());
    var PDFForm_1 = tslib_1.__importDefault(require_PDFForm());
    var sizes_1 = require_sizes();
    var core_1 = require_core();
    var PDFDocumentOptions_1 = require_PDFDocumentOptions();
    var utils_1 = require_utils2();
    var FileEmbedder_1 = tslib_1.__importStar(require_FileEmbedder());
    var PDFEmbeddedFile_1 = tslib_1.__importDefault(require_PDFEmbeddedFile());
    var PDFJavaScript_1 = tslib_1.__importDefault(require_PDFJavaScript());
    var JavaScriptEmbedder_1 = tslib_1.__importDefault(require_JavaScriptEmbedder());
    var PDFDocument2 = (
      /** @class */
      (function() {
        function PDFDocument3(context, ignoreEncryption, updateMetadata) {
          var _this = this;
          this.defaultWordBreaks = [" "];
          this.computePages = function() {
            var pages = [];
            _this.catalog.Pages().traverse(function(node, ref) {
              if (node instanceof core_1.PDFPageLeaf) {
                var page = _this.pageMap.get(node);
                if (!page) {
                  page = PDFPage_1.default.of(node, ref, _this);
                  _this.pageMap.set(node, page);
                }
                pages.push(page);
              }
            });
            return pages;
          };
          this.getOrCreateForm = function() {
            var acroForm = _this.catalog.getOrCreateAcroForm();
            return PDFForm_1.default.of(acroForm, _this);
          };
          utils_1.assertIs(context, "context", [[core_1.PDFContext, "PDFContext"]]);
          utils_1.assertIs(ignoreEncryption, "ignoreEncryption", ["boolean"]);
          this.context = context;
          this.catalog = context.lookup(context.trailerInfo.Root);
          this.isEncrypted = !!context.lookup(context.trailerInfo.Encrypt);
          this.pageCache = utils_1.Cache.populatedBy(this.computePages);
          this.pageMap = /* @__PURE__ */ new Map();
          this.formCache = utils_1.Cache.populatedBy(this.getOrCreateForm);
          this.fonts = [];
          this.images = [];
          this.embeddedPages = [];
          this.embeddedFiles = [];
          this.javaScripts = [];
          if (!ignoreEncryption && this.isEncrypted)
            throw new errors_1.EncryptedPDFError();
          if (updateMetadata)
            this.updateInfoDict();
        }
        PDFDocument3.load = function(pdf, options) {
          if (options === void 0) {
            options = {};
          }
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            var _a, ignoreEncryption, _b, parseSpeed, _c, throwOnInvalidObject, _d, updateMetadata, _e, capNumbers, bytes, context;
            return tslib_1.__generator(this, function(_f) {
              switch (_f.label) {
                case 0:
                  _a = options.ignoreEncryption, ignoreEncryption = _a === void 0 ? false : _a, _b = options.parseSpeed, parseSpeed = _b === void 0 ? PDFDocumentOptions_1.ParseSpeeds.Slow : _b, _c = options.throwOnInvalidObject, throwOnInvalidObject = _c === void 0 ? false : _c, _d = options.updateMetadata, updateMetadata = _d === void 0 ? true : _d, _e = options.capNumbers, capNumbers = _e === void 0 ? false : _e;
                  utils_1.assertIs(pdf, "pdf", ["string", Uint8Array, ArrayBuffer]);
                  utils_1.assertIs(ignoreEncryption, "ignoreEncryption", ["boolean"]);
                  utils_1.assertIs(parseSpeed, "parseSpeed", ["number"]);
                  utils_1.assertIs(throwOnInvalidObject, "throwOnInvalidObject", ["boolean"]);
                  bytes = utils_1.toUint8Array(pdf);
                  return [4, core_1.PDFParser.forBytesWithOptions(bytes, parseSpeed, throwOnInvalidObject, capNumbers).parseDocument()];
                case 1:
                  context = _f.sent();
                  return [2, new PDFDocument3(context, ignoreEncryption, updateMetadata)];
              }
            });
          });
        };
        PDFDocument3.create = function(options) {
          if (options === void 0) {
            options = {};
          }
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            var _a, updateMetadata, context, pageTree, pageTreeRef, catalog;
            return tslib_1.__generator(this, function(_b) {
              _a = options.updateMetadata, updateMetadata = _a === void 0 ? true : _a;
              context = core_1.PDFContext.create();
              pageTree = core_1.PDFPageTree.withContext(context);
              pageTreeRef = context.register(pageTree);
              catalog = core_1.PDFCatalog.withContextAndPages(context, pageTreeRef);
              context.trailerInfo.Root = context.register(catalog);
              return [2, new PDFDocument3(context, false, updateMetadata)];
            });
          });
        };
        PDFDocument3.prototype.registerFontkit = function(fontkit) {
          this.fontkit = fontkit;
        };
        PDFDocument3.prototype.getForm = function() {
          var form = this.formCache.access();
          if (form.hasXFA()) {
            console.warn("Removing XFA form data as pdf-lib does not support reading or writing XFA");
            form.deleteXFA();
          }
          return form;
        };
        PDFDocument3.prototype.getTitle = function() {
          var title = this.getInfoDict().lookup(core_1.PDFName.Title);
          if (!title)
            return void 0;
          assertIsLiteralOrHexString(title);
          return title.decodeText();
        };
        PDFDocument3.prototype.getAuthor = function() {
          var author = this.getInfoDict().lookup(core_1.PDFName.Author);
          if (!author)
            return void 0;
          assertIsLiteralOrHexString(author);
          return author.decodeText();
        };
        PDFDocument3.prototype.getSubject = function() {
          var subject = this.getInfoDict().lookup(core_1.PDFName.Subject);
          if (!subject)
            return void 0;
          assertIsLiteralOrHexString(subject);
          return subject.decodeText();
        };
        PDFDocument3.prototype.getKeywords = function() {
          var keywords = this.getInfoDict().lookup(core_1.PDFName.Keywords);
          if (!keywords)
            return void 0;
          assertIsLiteralOrHexString(keywords);
          return keywords.decodeText();
        };
        PDFDocument3.prototype.getCreator = function() {
          var creator = this.getInfoDict().lookup(core_1.PDFName.Creator);
          if (!creator)
            return void 0;
          assertIsLiteralOrHexString(creator);
          return creator.decodeText();
        };
        PDFDocument3.prototype.getProducer = function() {
          var producer = this.getInfoDict().lookup(core_1.PDFName.Producer);
          if (!producer)
            return void 0;
          assertIsLiteralOrHexString(producer);
          return producer.decodeText();
        };
        PDFDocument3.prototype.getCreationDate = function() {
          var creationDate = this.getInfoDict().lookup(core_1.PDFName.CreationDate);
          if (!creationDate)
            return void 0;
          assertIsLiteralOrHexString(creationDate);
          return creationDate.decodeDate();
        };
        PDFDocument3.prototype.getModificationDate = function() {
          var modificationDate = this.getInfoDict().lookup(core_1.PDFName.ModDate);
          if (!modificationDate)
            return void 0;
          assertIsLiteralOrHexString(modificationDate);
          return modificationDate.decodeDate();
        };
        PDFDocument3.prototype.setTitle = function(title, options) {
          utils_1.assertIs(title, "title", ["string"]);
          var key = core_1.PDFName.of("Title");
          this.getInfoDict().set(key, core_1.PDFHexString.fromText(title));
          if (options === null || options === void 0 ? void 0 : options.showInWindowTitleBar) {
            var prefs = this.catalog.getOrCreateViewerPreferences();
            prefs.setDisplayDocTitle(true);
          }
        };
        PDFDocument3.prototype.setAuthor = function(author) {
          utils_1.assertIs(author, "author", ["string"]);
          var key = core_1.PDFName.of("Author");
          this.getInfoDict().set(key, core_1.PDFHexString.fromText(author));
        };
        PDFDocument3.prototype.setSubject = function(subject) {
          utils_1.assertIs(subject, "author", ["string"]);
          var key = core_1.PDFName.of("Subject");
          this.getInfoDict().set(key, core_1.PDFHexString.fromText(subject));
        };
        PDFDocument3.prototype.setKeywords = function(keywords) {
          utils_1.assertIs(keywords, "keywords", [Array]);
          var key = core_1.PDFName.of("Keywords");
          this.getInfoDict().set(key, core_1.PDFHexString.fromText(keywords.join(" ")));
        };
        PDFDocument3.prototype.setCreator = function(creator) {
          utils_1.assertIs(creator, "creator", ["string"]);
          var key = core_1.PDFName.of("Creator");
          this.getInfoDict().set(key, core_1.PDFHexString.fromText(creator));
        };
        PDFDocument3.prototype.setProducer = function(producer) {
          utils_1.assertIs(producer, "creator", ["string"]);
          var key = core_1.PDFName.of("Producer");
          this.getInfoDict().set(key, core_1.PDFHexString.fromText(producer));
        };
        PDFDocument3.prototype.setLanguage = function(language) {
          utils_1.assertIs(language, "language", ["string"]);
          var key = core_1.PDFName.of("Lang");
          this.catalog.set(key, core_1.PDFString.of(language));
        };
        PDFDocument3.prototype.setCreationDate = function(creationDate) {
          utils_1.assertIs(creationDate, "creationDate", [[Date, "Date"]]);
          var key = core_1.PDFName.of("CreationDate");
          this.getInfoDict().set(key, core_1.PDFString.fromDate(creationDate));
        };
        PDFDocument3.prototype.setModificationDate = function(modificationDate) {
          utils_1.assertIs(modificationDate, "modificationDate", [[Date, "Date"]]);
          var key = core_1.PDFName.of("ModDate");
          this.getInfoDict().set(key, core_1.PDFString.fromDate(modificationDate));
        };
        PDFDocument3.prototype.getPageCount = function() {
          if (this.pageCount === void 0)
            this.pageCount = this.getPages().length;
          return this.pageCount;
        };
        PDFDocument3.prototype.getPages = function() {
          return this.pageCache.access();
        };
        PDFDocument3.prototype.getPage = function(index) {
          var pages = this.getPages();
          utils_1.assertRange(index, "index", 0, pages.length - 1);
          return pages[index];
        };
        PDFDocument3.prototype.getPageIndices = function() {
          return utils_1.range(0, this.getPageCount());
        };
        PDFDocument3.prototype.removePage = function(index) {
          var pageCount = this.getPageCount();
          if (this.pageCount === 0)
            throw new errors_1.RemovePageFromEmptyDocumentError();
          utils_1.assertRange(index, "index", 0, pageCount - 1);
          this.catalog.removeLeafNode(index);
          this.pageCount = pageCount - 1;
        };
        PDFDocument3.prototype.addPage = function(page) {
          utils_1.assertIs(page, "page", ["undefined", [PDFPage_1.default, "PDFPage"], Array]);
          return this.insertPage(this.getPageCount(), page);
        };
        PDFDocument3.prototype.insertPage = function(index, page) {
          var pageCount = this.getPageCount();
          utils_1.assertRange(index, "index", 0, pageCount);
          utils_1.assertIs(page, "page", ["undefined", [PDFPage_1.default, "PDFPage"], Array]);
          if (!page || Array.isArray(page)) {
            var dims = Array.isArray(page) ? page : sizes_1.PageSizes.A4;
            page = PDFPage_1.default.create(this);
            page.setSize.apply(page, dims);
          } else if (page.doc !== this) {
            throw new errors_1.ForeignPageError();
          }
          var parentRef = this.catalog.insertLeafNode(page.ref, index);
          page.node.setParent(parentRef);
          this.pageMap.set(page.node, page);
          this.pageCache.invalidate();
          this.pageCount = pageCount + 1;
          return page;
        };
        PDFDocument3.prototype.copyPages = function(srcDoc, indices) {
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            var copier, srcPages, copiedPages, idx, len, srcPage, copiedPage, ref;
            return tslib_1.__generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  utils_1.assertIs(srcDoc, "srcDoc", [[PDFDocument3, "PDFDocument"]]);
                  utils_1.assertIs(indices, "indices", [Array]);
                  return [4, srcDoc.flush()];
                case 1:
                  _a.sent();
                  copier = core_1.PDFObjectCopier.for(srcDoc.context, this.context);
                  srcPages = srcDoc.getPages();
                  copiedPages = new Array(indices.length);
                  for (idx = 0, len = indices.length; idx < len; idx++) {
                    srcPage = srcPages[indices[idx]];
                    copiedPage = copier.copy(srcPage.node);
                    ref = this.context.register(copiedPage);
                    copiedPages[idx] = PDFPage_1.default.of(copiedPage, ref, this);
                  }
                  return [2, copiedPages];
              }
            });
          });
        };
        PDFDocument3.prototype.copy = function() {
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            var pdfCopy, contentPages, idx, len;
            return tslib_1.__generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  return [4, PDFDocument3.create()];
                case 1:
                  pdfCopy = _a.sent();
                  return [4, pdfCopy.copyPages(this, this.getPageIndices())];
                case 2:
                  contentPages = _a.sent();
                  for (idx = 0, len = contentPages.length; idx < len; idx++) {
                    pdfCopy.addPage(contentPages[idx]);
                  }
                  if (this.getAuthor() !== void 0) {
                    pdfCopy.setAuthor(this.getAuthor());
                  }
                  if (this.getCreationDate() !== void 0) {
                    pdfCopy.setCreationDate(this.getCreationDate());
                  }
                  if (this.getCreator() !== void 0) {
                    pdfCopy.setCreator(this.getCreator());
                  }
                  if (this.getModificationDate() !== void 0) {
                    pdfCopy.setModificationDate(this.getModificationDate());
                  }
                  if (this.getProducer() !== void 0) {
                    pdfCopy.setProducer(this.getProducer());
                  }
                  if (this.getSubject() !== void 0) {
                    pdfCopy.setSubject(this.getSubject());
                  }
                  if (this.getTitle() !== void 0) {
                    pdfCopy.setTitle(this.getTitle());
                  }
                  pdfCopy.defaultWordBreaks = this.defaultWordBreaks;
                  return [2, pdfCopy];
              }
            });
          });
        };
        PDFDocument3.prototype.addJavaScript = function(name, script) {
          utils_1.assertIs(name, "name", ["string"]);
          utils_1.assertIs(script, "script", ["string"]);
          var embedder = JavaScriptEmbedder_1.default.for(script, name);
          var ref = this.context.nextRef();
          var javaScript = PDFJavaScript_1.default.of(ref, this, embedder);
          this.javaScripts.push(javaScript);
        };
        PDFDocument3.prototype.attach = function(attachment, name, options) {
          if (options === void 0) {
            options = {};
          }
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            var bytes, embedder, ref, embeddedFile;
            return tslib_1.__generator(this, function(_a) {
              utils_1.assertIs(attachment, "attachment", ["string", Uint8Array, ArrayBuffer]);
              utils_1.assertIs(name, "name", ["string"]);
              utils_1.assertOrUndefined(options.mimeType, "mimeType", ["string"]);
              utils_1.assertOrUndefined(options.description, "description", ["string"]);
              utils_1.assertOrUndefined(options.creationDate, "options.creationDate", [Date]);
              utils_1.assertOrUndefined(options.modificationDate, "options.modificationDate", [
                Date
              ]);
              utils_1.assertIsOneOfOrUndefined(options.afRelationship, "options.afRelationship", FileEmbedder_1.AFRelationship);
              bytes = utils_1.toUint8Array(attachment);
              embedder = FileEmbedder_1.default.for(bytes, name, options);
              ref = this.context.nextRef();
              embeddedFile = PDFEmbeddedFile_1.default.of(ref, this, embedder);
              this.embeddedFiles.push(embeddedFile);
              return [
                2
                /*return*/
              ];
            });
          });
        };
        PDFDocument3.prototype.embedFont = function(font, options) {
          if (options === void 0) {
            options = {};
          }
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            var _a, subset, customName, features, embedder, bytes, fontkit, _b, ref, pdfFont;
            return tslib_1.__generator(this, function(_c) {
              switch (_c.label) {
                case 0:
                  _a = options.subset, subset = _a === void 0 ? false : _a, customName = options.customName, features = options.features;
                  utils_1.assertIs(font, "font", ["string", Uint8Array, ArrayBuffer]);
                  utils_1.assertIs(subset, "subset", ["boolean"]);
                  if (!utils_1.isStandardFont(font)) return [3, 1];
                  embedder = core_1.StandardFontEmbedder.for(font, customName);
                  return [3, 7];
                case 1:
                  if (!utils_1.canBeConvertedToUint8Array(font)) return [3, 6];
                  bytes = utils_1.toUint8Array(font);
                  fontkit = this.assertFontkit();
                  if (!subset) return [3, 3];
                  return [4, core_1.CustomFontSubsetEmbedder.for(fontkit, bytes, customName, features)];
                case 2:
                  _b = _c.sent();
                  return [3, 5];
                case 3:
                  return [4, core_1.CustomFontEmbedder.for(fontkit, bytes, customName, features)];
                case 4:
                  _b = _c.sent();
                  _c.label = 5;
                case 5:
                  embedder = _b;
                  return [3, 7];
                case 6:
                  throw new TypeError("`font` must be one of `StandardFonts | string | Uint8Array | ArrayBuffer`");
                case 7:
                  ref = this.context.nextRef();
                  pdfFont = PDFFont_1.default.of(ref, this, embedder);
                  this.fonts.push(pdfFont);
                  return [2, pdfFont];
              }
            });
          });
        };
        PDFDocument3.prototype.embedStandardFont = function(font, customName) {
          utils_1.assertIs(font, "font", ["string"]);
          if (!utils_1.isStandardFont(font)) {
            throw new TypeError("`font` must be one of type `StandardFonts`");
          }
          var embedder = core_1.StandardFontEmbedder.for(font, customName);
          var ref = this.context.nextRef();
          var pdfFont = PDFFont_1.default.of(ref, this, embedder);
          this.fonts.push(pdfFont);
          return pdfFont;
        };
        PDFDocument3.prototype.embedJpg = function(jpg) {
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            var bytes, embedder, ref, pdfImage;
            return tslib_1.__generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  utils_1.assertIs(jpg, "jpg", ["string", Uint8Array, ArrayBuffer]);
                  bytes = utils_1.toUint8Array(jpg);
                  return [4, core_1.JpegEmbedder.for(bytes)];
                case 1:
                  embedder = _a.sent();
                  ref = this.context.nextRef();
                  pdfImage = PDFImage_1.default.of(ref, this, embedder);
                  this.images.push(pdfImage);
                  return [2, pdfImage];
              }
            });
          });
        };
        PDFDocument3.prototype.embedPng = function(png) {
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            var bytes, embedder, ref, pdfImage;
            return tslib_1.__generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  utils_1.assertIs(png, "png", ["string", Uint8Array, ArrayBuffer]);
                  bytes = utils_1.toUint8Array(png);
                  return [4, core_1.PngEmbedder.for(bytes)];
                case 1:
                  embedder = _a.sent();
                  ref = this.context.nextRef();
                  pdfImage = PDFImage_1.default.of(ref, this, embedder);
                  this.images.push(pdfImage);
                  return [2, pdfImage];
              }
            });
          });
        };
        PDFDocument3.prototype.embedPdf = function(pdf, indices) {
          if (indices === void 0) {
            indices = [0];
          }
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            var srcDoc, _a, srcPages;
            return tslib_1.__generator(this, function(_b) {
              switch (_b.label) {
                case 0:
                  utils_1.assertIs(pdf, "pdf", [
                    "string",
                    Uint8Array,
                    ArrayBuffer,
                    [PDFDocument3, "PDFDocument"]
                  ]);
                  utils_1.assertIs(indices, "indices", [Array]);
                  if (!(pdf instanceof PDFDocument3)) return [3, 1];
                  _a = pdf;
                  return [3, 3];
                case 1:
                  return [4, PDFDocument3.load(pdf)];
                case 2:
                  _a = _b.sent();
                  _b.label = 3;
                case 3:
                  srcDoc = _a;
                  srcPages = utils_1.pluckIndices(srcDoc.getPages(), indices);
                  return [2, this.embedPages(srcPages)];
              }
            });
          });
        };
        PDFDocument3.prototype.embedPage = function(page, boundingBox, transformationMatrix) {
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            var embeddedPage;
            return tslib_1.__generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  utils_1.assertIs(page, "page", [[PDFPage_1.default, "PDFPage"]]);
                  return [4, this.embedPages([page], [boundingBox], [transformationMatrix])];
                case 1:
                  embeddedPage = _a.sent()[0];
                  return [2, embeddedPage];
              }
            });
          });
        };
        PDFDocument3.prototype.embedPages = function(pages, boundingBoxes, transformationMatrices) {
          if (boundingBoxes === void 0) {
            boundingBoxes = [];
          }
          if (transformationMatrices === void 0) {
            transformationMatrices = [];
          }
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            var idx, len, currPage, nextPage, context, maybeCopyPage, embeddedPages, idx, len, page, box, matrix, embedder, ref;
            var _a;
            return tslib_1.__generator(this, function(_b) {
              switch (_b.label) {
                case 0:
                  if (pages.length === 0)
                    return [2, []];
                  for (idx = 0, len = pages.length - 1; idx < len; idx++) {
                    currPage = pages[idx];
                    nextPage = pages[idx + 1];
                    if (currPage.node.context !== nextPage.node.context) {
                      throw new core_1.PageEmbeddingMismatchedContextError();
                    }
                  }
                  context = pages[0].node.context;
                  maybeCopyPage = context === this.context ? function(p) {
                    return p;
                  } : core_1.PDFObjectCopier.for(context, this.context).copy;
                  embeddedPages = new Array(pages.length);
                  idx = 0, len = pages.length;
                  _b.label = 1;
                case 1:
                  if (!(idx < len)) return [3, 4];
                  page = maybeCopyPage(pages[idx].node);
                  box = boundingBoxes[idx];
                  matrix = transformationMatrices[idx];
                  return [4, core_1.PDFPageEmbedder.for(page, box, matrix)];
                case 2:
                  embedder = _b.sent();
                  ref = this.context.nextRef();
                  embeddedPages[idx] = PDFEmbeddedPage_1.default.of(ref, this, embedder);
                  _b.label = 3;
                case 3:
                  idx++;
                  return [3, 1];
                case 4:
                  (_a = this.embeddedPages).push.apply(_a, embeddedPages);
                  return [2, embeddedPages];
              }
            });
          });
        };
        PDFDocument3.prototype.flush = function() {
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            return tslib_1.__generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  return [4, this.embedAll(this.fonts)];
                case 1:
                  _a.sent();
                  return [4, this.embedAll(this.images)];
                case 2:
                  _a.sent();
                  return [4, this.embedAll(this.embeddedPages)];
                case 3:
                  _a.sent();
                  return [4, this.embedAll(this.embeddedFiles)];
                case 4:
                  _a.sent();
                  return [4, this.embedAll(this.javaScripts)];
                case 5:
                  _a.sent();
                  return [
                    2
                    /*return*/
                  ];
              }
            });
          });
        };
        PDFDocument3.prototype.save = function(options) {
          if (options === void 0) {
            options = {};
          }
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            var _a, useObjectStreams, _b, addDefaultPage, _c, objectsPerTick, _d, updateFieldAppearances, form, Writer;
            return tslib_1.__generator(this, function(_e) {
              switch (_e.label) {
                case 0:
                  _a = options.useObjectStreams, useObjectStreams = _a === void 0 ? true : _a, _b = options.addDefaultPage, addDefaultPage = _b === void 0 ? true : _b, _c = options.objectsPerTick, objectsPerTick = _c === void 0 ? 50 : _c, _d = options.updateFieldAppearances, updateFieldAppearances = _d === void 0 ? true : _d;
                  utils_1.assertIs(useObjectStreams, "useObjectStreams", ["boolean"]);
                  utils_1.assertIs(addDefaultPage, "addDefaultPage", ["boolean"]);
                  utils_1.assertIs(objectsPerTick, "objectsPerTick", ["number"]);
                  utils_1.assertIs(updateFieldAppearances, "updateFieldAppearances", ["boolean"]);
                  if (addDefaultPage && this.getPageCount() === 0)
                    this.addPage();
                  if (updateFieldAppearances) {
                    form = this.formCache.getValue();
                    if (form)
                      form.updateFieldAppearances();
                  }
                  return [4, this.flush()];
                case 1:
                  _e.sent();
                  Writer = useObjectStreams ? core_1.PDFStreamWriter : core_1.PDFWriter;
                  return [2, Writer.forContext(this.context, objectsPerTick).serializeToBuffer()];
              }
            });
          });
        };
        PDFDocument3.prototype.saveAsBase64 = function(options) {
          if (options === void 0) {
            options = {};
          }
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            var _a, dataUri, otherOptions, bytes, base64;
            return tslib_1.__generator(this, function(_b) {
              switch (_b.label) {
                case 0:
                  _a = options.dataUri, dataUri = _a === void 0 ? false : _a, otherOptions = tslib_1.__rest(options, ["dataUri"]);
                  utils_1.assertIs(dataUri, "dataUri", ["boolean"]);
                  return [4, this.save(otherOptions)];
                case 1:
                  bytes = _b.sent();
                  base64 = utils_1.encodeToBase64(bytes);
                  return [2, dataUri ? "data:application/pdf;base64," + base64 : base64];
              }
            });
          });
        };
        PDFDocument3.prototype.findPageForAnnotationRef = function(ref) {
          var pages = this.getPages();
          for (var idx = 0, len = pages.length; idx < len; idx++) {
            var page = pages[idx];
            var annotations = page.node.Annots();
            if ((annotations === null || annotations === void 0 ? void 0 : annotations.indexOf(ref)) !== void 0) {
              return page;
            }
          }
          return void 0;
        };
        PDFDocument3.prototype.embedAll = function(embeddables) {
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            var idx, len;
            return tslib_1.__generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  idx = 0, len = embeddables.length;
                  _a.label = 1;
                case 1:
                  if (!(idx < len)) return [3, 4];
                  return [4, embeddables[idx].embed()];
                case 2:
                  _a.sent();
                  _a.label = 3;
                case 3:
                  idx++;
                  return [3, 1];
                case 4:
                  return [
                    2
                    /*return*/
                  ];
              }
            });
          });
        };
        PDFDocument3.prototype.updateInfoDict = function() {
          var pdfLib = "pdf-lib (https://github.com/Hopding/pdf-lib)";
          var now = /* @__PURE__ */ new Date();
          var info = this.getInfoDict();
          this.setProducer(pdfLib);
          this.setModificationDate(now);
          if (!info.get(core_1.PDFName.of("Creator")))
            this.setCreator(pdfLib);
          if (!info.get(core_1.PDFName.of("CreationDate")))
            this.setCreationDate(now);
        };
        PDFDocument3.prototype.getInfoDict = function() {
          var existingInfo = this.context.lookup(this.context.trailerInfo.Info);
          if (existingInfo instanceof core_1.PDFDict)
            return existingInfo;
          var newInfo = this.context.obj({});
          this.context.trailerInfo.Info = this.context.register(newInfo);
          return newInfo;
        };
        PDFDocument3.prototype.assertFontkit = function() {
          if (!this.fontkit)
            throw new errors_1.FontkitNotRegisteredError();
          return this.fontkit;
        };
        return PDFDocument3;
      })()
    );
    exports.default = PDFDocument2;
    function assertIsLiteralOrHexString(pdfObject) {
      if (!(pdfObject instanceof core_1.PDFHexString) && !(pdfObject instanceof core_1.PDFString)) {
        throw new core_1.UnexpectedObjectTypeError([core_1.PDFHexString, core_1.PDFString], pdfObject);
      }
    }
  }
});

// node_modules/pdf-lib/cjs/api/PDFPageOptions.js
var require_PDFPageOptions = __commonJS({
  "node_modules/pdf-lib/cjs/api/PDFPageOptions.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BlendMode = void 0;
    var BlendMode;
    (function(BlendMode2) {
      BlendMode2["Normal"] = "Normal";
      BlendMode2["Multiply"] = "Multiply";
      BlendMode2["Screen"] = "Screen";
      BlendMode2["Overlay"] = "Overlay";
      BlendMode2["Darken"] = "Darken";
      BlendMode2["Lighten"] = "Lighten";
      BlendMode2["ColorDodge"] = "ColorDodge";
      BlendMode2["ColorBurn"] = "ColorBurn";
      BlendMode2["HardLight"] = "HardLight";
      BlendMode2["SoftLight"] = "SoftLight";
      BlendMode2["Difference"] = "Difference";
      BlendMode2["Exclusion"] = "Exclusion";
    })(BlendMode = exports.BlendMode || (exports.BlendMode = {}));
  }
});

// node_modules/pdf-lib/cjs/api/PDFPage.js
var require_PDFPage = __commonJS({
  "node_modules/pdf-lib/cjs/api/PDFPage.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var colors_1 = require_colors();
    var operations_1 = require_operations();
    var operators_1 = require_operators();
    var PDFDocument_1 = tslib_1.__importDefault(require_PDFDocument());
    var PDFEmbeddedPage_1 = tslib_1.__importDefault(require_PDFEmbeddedPage());
    var PDFFont_1 = tslib_1.__importDefault(require_PDFFont());
    var PDFImage_1 = tslib_1.__importDefault(require_PDFImage());
    var PDFPageOptions_1 = require_PDFPageOptions();
    var rotations_1 = require_rotations();
    var StandardFonts_1 = require_StandardFonts();
    var core_1 = require_core();
    var utils_1 = require_utils2();
    var PDFPage = (
      /** @class */
      (function() {
        function PDFPage2(leafNode, ref, doc) {
          this.fontSize = 24;
          this.fontColor = colors_1.rgb(0, 0, 0);
          this.lineHeight = 24;
          this.x = 0;
          this.y = 0;
          utils_1.assertIs(leafNode, "leafNode", [[core_1.PDFPageLeaf, "PDFPageLeaf"]]);
          utils_1.assertIs(ref, "ref", [[core_1.PDFRef, "PDFRef"]]);
          utils_1.assertIs(doc, "doc", [[PDFDocument_1.default, "PDFDocument"]]);
          this.node = leafNode;
          this.ref = ref;
          this.doc = doc;
        }
        PDFPage2.prototype.setRotation = function(angle) {
          var degreesAngle = rotations_1.toDegrees(angle);
          utils_1.assertMultiple(degreesAngle, "degreesAngle", 90);
          this.node.set(core_1.PDFName.of("Rotate"), this.doc.context.obj(degreesAngle));
        };
        PDFPage2.prototype.getRotation = function() {
          var Rotate = this.node.Rotate();
          return rotations_1.degrees(Rotate ? Rotate.asNumber() : 0);
        };
        PDFPage2.prototype.setSize = function(width, height) {
          utils_1.assertIs(width, "width", ["number"]);
          utils_1.assertIs(height, "height", ["number"]);
          var mediaBox = this.getMediaBox();
          this.setMediaBox(mediaBox.x, mediaBox.y, width, height);
          var cropBox = this.getCropBox();
          var bleedBox = this.getBleedBox();
          var trimBox = this.getTrimBox();
          var artBox = this.getArtBox();
          var hasCropBox = this.node.CropBox();
          var hasBleedBox = this.node.BleedBox();
          var hasTrimBox = this.node.TrimBox();
          var hasArtBox = this.node.ArtBox();
          if (hasCropBox && utils_1.rectanglesAreEqual(cropBox, mediaBox)) {
            this.setCropBox(mediaBox.x, mediaBox.y, width, height);
          }
          if (hasBleedBox && utils_1.rectanglesAreEqual(bleedBox, mediaBox)) {
            this.setBleedBox(mediaBox.x, mediaBox.y, width, height);
          }
          if (hasTrimBox && utils_1.rectanglesAreEqual(trimBox, mediaBox)) {
            this.setTrimBox(mediaBox.x, mediaBox.y, width, height);
          }
          if (hasArtBox && utils_1.rectanglesAreEqual(artBox, mediaBox)) {
            this.setArtBox(mediaBox.x, mediaBox.y, width, height);
          }
        };
        PDFPage2.prototype.setWidth = function(width) {
          utils_1.assertIs(width, "width", ["number"]);
          this.setSize(width, this.getSize().height);
        };
        PDFPage2.prototype.setHeight = function(height) {
          utils_1.assertIs(height, "height", ["number"]);
          this.setSize(this.getSize().width, height);
        };
        PDFPage2.prototype.setMediaBox = function(x, y, width, height) {
          utils_1.assertIs(x, "x", ["number"]);
          utils_1.assertIs(y, "y", ["number"]);
          utils_1.assertIs(width, "width", ["number"]);
          utils_1.assertIs(height, "height", ["number"]);
          var mediaBox = this.doc.context.obj([x, y, x + width, y + height]);
          this.node.set(core_1.PDFName.MediaBox, mediaBox);
        };
        PDFPage2.prototype.setCropBox = function(x, y, width, height) {
          utils_1.assertIs(x, "x", ["number"]);
          utils_1.assertIs(y, "y", ["number"]);
          utils_1.assertIs(width, "width", ["number"]);
          utils_1.assertIs(height, "height", ["number"]);
          var cropBox = this.doc.context.obj([x, y, x + width, y + height]);
          this.node.set(core_1.PDFName.CropBox, cropBox);
        };
        PDFPage2.prototype.setBleedBox = function(x, y, width, height) {
          utils_1.assertIs(x, "x", ["number"]);
          utils_1.assertIs(y, "y", ["number"]);
          utils_1.assertIs(width, "width", ["number"]);
          utils_1.assertIs(height, "height", ["number"]);
          var bleedBox = this.doc.context.obj([x, y, x + width, y + height]);
          this.node.set(core_1.PDFName.BleedBox, bleedBox);
        };
        PDFPage2.prototype.setTrimBox = function(x, y, width, height) {
          utils_1.assertIs(x, "x", ["number"]);
          utils_1.assertIs(y, "y", ["number"]);
          utils_1.assertIs(width, "width", ["number"]);
          utils_1.assertIs(height, "height", ["number"]);
          var trimBox = this.doc.context.obj([x, y, x + width, y + height]);
          this.node.set(core_1.PDFName.TrimBox, trimBox);
        };
        PDFPage2.prototype.setArtBox = function(x, y, width, height) {
          utils_1.assertIs(x, "x", ["number"]);
          utils_1.assertIs(y, "y", ["number"]);
          utils_1.assertIs(width, "width", ["number"]);
          utils_1.assertIs(height, "height", ["number"]);
          var artBox = this.doc.context.obj([x, y, x + width, y + height]);
          this.node.set(core_1.PDFName.ArtBox, artBox);
        };
        PDFPage2.prototype.getSize = function() {
          var _a = this.getMediaBox(), width = _a.width, height = _a.height;
          return { width, height };
        };
        PDFPage2.prototype.getWidth = function() {
          return this.getSize().width;
        };
        PDFPage2.prototype.getHeight = function() {
          return this.getSize().height;
        };
        PDFPage2.prototype.getMediaBox = function() {
          var mediaBox = this.node.MediaBox();
          return mediaBox.asRectangle();
        };
        PDFPage2.prototype.getCropBox = function() {
          var _a;
          var cropBox = this.node.CropBox();
          return (_a = cropBox === null || cropBox === void 0 ? void 0 : cropBox.asRectangle()) !== null && _a !== void 0 ? _a : this.getMediaBox();
        };
        PDFPage2.prototype.getBleedBox = function() {
          var _a;
          var bleedBox = this.node.BleedBox();
          return (_a = bleedBox === null || bleedBox === void 0 ? void 0 : bleedBox.asRectangle()) !== null && _a !== void 0 ? _a : this.getCropBox();
        };
        PDFPage2.prototype.getTrimBox = function() {
          var _a;
          var trimBox = this.node.TrimBox();
          return (_a = trimBox === null || trimBox === void 0 ? void 0 : trimBox.asRectangle()) !== null && _a !== void 0 ? _a : this.getCropBox();
        };
        PDFPage2.prototype.getArtBox = function() {
          var _a;
          var artBox = this.node.ArtBox();
          return (_a = artBox === null || artBox === void 0 ? void 0 : artBox.asRectangle()) !== null && _a !== void 0 ? _a : this.getCropBox();
        };
        PDFPage2.prototype.translateContent = function(x, y) {
          utils_1.assertIs(x, "x", ["number"]);
          utils_1.assertIs(y, "y", ["number"]);
          this.node.normalize();
          this.getContentStream();
          var start = this.createContentStream(operators_1.pushGraphicsState(), operators_1.translate(x, y));
          var startRef = this.doc.context.register(start);
          var end = this.createContentStream(operators_1.popGraphicsState());
          var endRef = this.doc.context.register(end);
          this.node.wrapContentStreams(startRef, endRef);
        };
        PDFPage2.prototype.scale = function(x, y) {
          utils_1.assertIs(x, "x", ["number"]);
          utils_1.assertIs(y, "y", ["number"]);
          this.setSize(this.getWidth() * x, this.getHeight() * y);
          this.scaleContent(x, y);
          this.scaleAnnotations(x, y);
        };
        PDFPage2.prototype.scaleContent = function(x, y) {
          utils_1.assertIs(x, "x", ["number"]);
          utils_1.assertIs(y, "y", ["number"]);
          this.node.normalize();
          this.getContentStream();
          var start = this.createContentStream(operators_1.pushGraphicsState(), operators_1.scale(x, y));
          var startRef = this.doc.context.register(start);
          var end = this.createContentStream(operators_1.popGraphicsState());
          var endRef = this.doc.context.register(end);
          this.node.wrapContentStreams(startRef, endRef);
        };
        PDFPage2.prototype.scaleAnnotations = function(x, y) {
          utils_1.assertIs(x, "x", ["number"]);
          utils_1.assertIs(y, "y", ["number"]);
          var annots = this.node.Annots();
          if (!annots)
            return;
          for (var idx = 0; idx < annots.size(); idx++) {
            var annot = annots.lookup(idx);
            if (annot instanceof core_1.PDFDict)
              this.scaleAnnot(annot, x, y);
          }
        };
        PDFPage2.prototype.resetPosition = function() {
          this.getContentStream(false);
          this.x = 0;
          this.y = 0;
        };
        PDFPage2.prototype.setFont = function(font) {
          utils_1.assertIs(font, "font", [[PDFFont_1.default, "PDFFont"]]);
          this.font = font;
          this.fontKey = this.node.newFontDictionary(this.font.name, this.font.ref);
        };
        PDFPage2.prototype.setFontSize = function(fontSize) {
          utils_1.assertIs(fontSize, "fontSize", ["number"]);
          this.fontSize = fontSize;
        };
        PDFPage2.prototype.setFontColor = function(fontColor) {
          utils_1.assertIs(fontColor, "fontColor", [[Object, "Color"]]);
          this.fontColor = fontColor;
        };
        PDFPage2.prototype.setLineHeight = function(lineHeight) {
          utils_1.assertIs(lineHeight, "lineHeight", ["number"]);
          this.lineHeight = lineHeight;
        };
        PDFPage2.prototype.getPosition = function() {
          return { x: this.x, y: this.y };
        };
        PDFPage2.prototype.getX = function() {
          return this.x;
        };
        PDFPage2.prototype.getY = function() {
          return this.y;
        };
        PDFPage2.prototype.moveTo = function(x, y) {
          utils_1.assertIs(x, "x", ["number"]);
          utils_1.assertIs(y, "y", ["number"]);
          this.x = x;
          this.y = y;
        };
        PDFPage2.prototype.moveDown = function(yDecrease) {
          utils_1.assertIs(yDecrease, "yDecrease", ["number"]);
          this.y -= yDecrease;
        };
        PDFPage2.prototype.moveUp = function(yIncrease) {
          utils_1.assertIs(yIncrease, "yIncrease", ["number"]);
          this.y += yIncrease;
        };
        PDFPage2.prototype.moveLeft = function(xDecrease) {
          utils_1.assertIs(xDecrease, "xDecrease", ["number"]);
          this.x -= xDecrease;
        };
        PDFPage2.prototype.moveRight = function(xIncrease) {
          utils_1.assertIs(xIncrease, "xIncrease", ["number"]);
          this.x += xIncrease;
        };
        PDFPage2.prototype.pushOperators = function() {
          var operator = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            operator[_i] = arguments[_i];
          }
          utils_1.assertEachIs(operator, "operator", [[core_1.PDFOperator, "PDFOperator"]]);
          var contentStream = this.getContentStream();
          contentStream.push.apply(contentStream, operator);
        };
        PDFPage2.prototype.drawText = function(text, options) {
          var _a, _b, _c, _d, _e, _f, _g;
          if (options === void 0) {
            options = {};
          }
          utils_1.assertIs(text, "text", ["string"]);
          utils_1.assertOrUndefined(options.color, "options.color", [[Object, "Color"]]);
          utils_1.assertRangeOrUndefined(options.opacity, "opacity.opacity", 0, 1);
          utils_1.assertOrUndefined(options.font, "options.font", [[PDFFont_1.default, "PDFFont"]]);
          utils_1.assertOrUndefined(options.size, "options.size", ["number"]);
          utils_1.assertOrUndefined(options.rotate, "options.rotate", [[Object, "Rotation"]]);
          utils_1.assertOrUndefined(options.xSkew, "options.xSkew", [[Object, "Rotation"]]);
          utils_1.assertOrUndefined(options.ySkew, "options.ySkew", [[Object, "Rotation"]]);
          utils_1.assertOrUndefined(options.x, "options.x", ["number"]);
          utils_1.assertOrUndefined(options.y, "options.y", ["number"]);
          utils_1.assertOrUndefined(options.lineHeight, "options.lineHeight", ["number"]);
          utils_1.assertOrUndefined(options.maxWidth, "options.maxWidth", ["number"]);
          utils_1.assertOrUndefined(options.wordBreaks, "options.wordBreaks", [Array]);
          utils_1.assertIsOneOfOrUndefined(options.blendMode, "options.blendMode", PDFPageOptions_1.BlendMode);
          var _h = this.setOrEmbedFont(options.font), oldFont = _h.oldFont, newFont = _h.newFont, newFontKey = _h.newFontKey;
          var fontSize = options.size || this.fontSize;
          var wordBreaks = options.wordBreaks || this.doc.defaultWordBreaks;
          var textWidth = function(t) {
            return newFont.widthOfTextAtSize(t, fontSize);
          };
          var lines = options.maxWidth === void 0 ? utils_1.lineSplit(utils_1.cleanText(text)) : utils_1.breakTextIntoLines(text, wordBreaks, options.maxWidth, textWidth);
          var encodedLines = new Array(lines.length);
          for (var idx = 0, len = lines.length; idx < len; idx++) {
            encodedLines[idx] = newFont.encodeText(lines[idx]);
          }
          var graphicsStateKey = this.maybeEmbedGraphicsState({
            opacity: options.opacity,
            blendMode: options.blendMode
          });
          var contentStream = this.getContentStream();
          contentStream.push.apply(contentStream, operations_1.drawLinesOfText(encodedLines, {
            color: (_a = options.color) !== null && _a !== void 0 ? _a : this.fontColor,
            font: newFontKey,
            size: fontSize,
            rotate: (_b = options.rotate) !== null && _b !== void 0 ? _b : rotations_1.degrees(0),
            xSkew: (_c = options.xSkew) !== null && _c !== void 0 ? _c : rotations_1.degrees(0),
            ySkew: (_d = options.ySkew) !== null && _d !== void 0 ? _d : rotations_1.degrees(0),
            x: (_e = options.x) !== null && _e !== void 0 ? _e : this.x,
            y: (_f = options.y) !== null && _f !== void 0 ? _f : this.y,
            lineHeight: (_g = options.lineHeight) !== null && _g !== void 0 ? _g : this.lineHeight,
            graphicsState: graphicsStateKey
          }));
          if (options.font) {
            if (oldFont)
              this.setFont(oldFont);
            else
              this.resetFont();
          }
        };
        PDFPage2.prototype.drawImage = function(image, options) {
          var _a, _b, _c, _d, _e, _f, _g;
          if (options === void 0) {
            options = {};
          }
          utils_1.assertIs(image, "image", [[PDFImage_1.default, "PDFImage"]]);
          utils_1.assertOrUndefined(options.x, "options.x", ["number"]);
          utils_1.assertOrUndefined(options.y, "options.y", ["number"]);
          utils_1.assertOrUndefined(options.width, "options.width", ["number"]);
          utils_1.assertOrUndefined(options.height, "options.height", ["number"]);
          utils_1.assertOrUndefined(options.rotate, "options.rotate", [[Object, "Rotation"]]);
          utils_1.assertOrUndefined(options.xSkew, "options.xSkew", [[Object, "Rotation"]]);
          utils_1.assertOrUndefined(options.ySkew, "options.ySkew", [[Object, "Rotation"]]);
          utils_1.assertRangeOrUndefined(options.opacity, "opacity.opacity", 0, 1);
          utils_1.assertIsOneOfOrUndefined(options.blendMode, "options.blendMode", PDFPageOptions_1.BlendMode);
          var xObjectKey = this.node.newXObject("Image", image.ref);
          var graphicsStateKey = this.maybeEmbedGraphicsState({
            opacity: options.opacity,
            blendMode: options.blendMode
          });
          var contentStream = this.getContentStream();
          contentStream.push.apply(contentStream, operations_1.drawImage(xObjectKey, {
            x: (_a = options.x) !== null && _a !== void 0 ? _a : this.x,
            y: (_b = options.y) !== null && _b !== void 0 ? _b : this.y,
            width: (_c = options.width) !== null && _c !== void 0 ? _c : image.size().width,
            height: (_d = options.height) !== null && _d !== void 0 ? _d : image.size().height,
            rotate: (_e = options.rotate) !== null && _e !== void 0 ? _e : rotations_1.degrees(0),
            xSkew: (_f = options.xSkew) !== null && _f !== void 0 ? _f : rotations_1.degrees(0),
            ySkew: (_g = options.ySkew) !== null && _g !== void 0 ? _g : rotations_1.degrees(0),
            graphicsState: graphicsStateKey
          }));
        };
        PDFPage2.prototype.drawPage = function(embeddedPage, options) {
          var _a, _b, _c, _d, _e;
          if (options === void 0) {
            options = {};
          }
          utils_1.assertIs(embeddedPage, "embeddedPage", [
            [PDFEmbeddedPage_1.default, "PDFEmbeddedPage"]
          ]);
          utils_1.assertOrUndefined(options.x, "options.x", ["number"]);
          utils_1.assertOrUndefined(options.y, "options.y", ["number"]);
          utils_1.assertOrUndefined(options.xScale, "options.xScale", ["number"]);
          utils_1.assertOrUndefined(options.yScale, "options.yScale", ["number"]);
          utils_1.assertOrUndefined(options.width, "options.width", ["number"]);
          utils_1.assertOrUndefined(options.height, "options.height", ["number"]);
          utils_1.assertOrUndefined(options.rotate, "options.rotate", [[Object, "Rotation"]]);
          utils_1.assertOrUndefined(options.xSkew, "options.xSkew", [[Object, "Rotation"]]);
          utils_1.assertOrUndefined(options.ySkew, "options.ySkew", [[Object, "Rotation"]]);
          utils_1.assertRangeOrUndefined(options.opacity, "opacity.opacity", 0, 1);
          utils_1.assertIsOneOfOrUndefined(options.blendMode, "options.blendMode", PDFPageOptions_1.BlendMode);
          var xObjectKey = this.node.newXObject("EmbeddedPdfPage", embeddedPage.ref);
          var graphicsStateKey = this.maybeEmbedGraphicsState({
            opacity: options.opacity,
            blendMode: options.blendMode
          });
          var xScale = options.width !== void 0 ? options.width / embeddedPage.width : options.xScale !== void 0 ? options.xScale : 1;
          var yScale = options.height !== void 0 ? options.height / embeddedPage.height : options.yScale !== void 0 ? options.yScale : 1;
          var contentStream = this.getContentStream();
          contentStream.push.apply(contentStream, operations_1.drawPage(xObjectKey, {
            x: (_a = options.x) !== null && _a !== void 0 ? _a : this.x,
            y: (_b = options.y) !== null && _b !== void 0 ? _b : this.y,
            xScale,
            yScale,
            rotate: (_c = options.rotate) !== null && _c !== void 0 ? _c : rotations_1.degrees(0),
            xSkew: (_d = options.xSkew) !== null && _d !== void 0 ? _d : rotations_1.degrees(0),
            ySkew: (_e = options.ySkew) !== null && _e !== void 0 ? _e : rotations_1.degrees(0),
            graphicsState: graphicsStateKey
          }));
        };
        PDFPage2.prototype.drawSvgPath = function(path, options) {
          var _a, _b, _c, _d, _e, _f, _g, _h, _j;
          if (options === void 0) {
            options = {};
          }
          utils_1.assertIs(path, "path", ["string"]);
          utils_1.assertOrUndefined(options.x, "options.x", ["number"]);
          utils_1.assertOrUndefined(options.y, "options.y", ["number"]);
          utils_1.assertOrUndefined(options.scale, "options.scale", ["number"]);
          utils_1.assertOrUndefined(options.rotate, "options.rotate", [[Object, "Rotation"]]);
          utils_1.assertOrUndefined(options.borderWidth, "options.borderWidth", ["number"]);
          utils_1.assertOrUndefined(options.color, "options.color", [[Object, "Color"]]);
          utils_1.assertRangeOrUndefined(options.opacity, "opacity.opacity", 0, 1);
          utils_1.assertOrUndefined(options.borderColor, "options.borderColor", [
            [Object, "Color"]
          ]);
          utils_1.assertOrUndefined(options.borderDashArray, "options.borderDashArray", [
            Array
          ]);
          utils_1.assertOrUndefined(options.borderDashPhase, "options.borderDashPhase", [
            "number"
          ]);
          utils_1.assertIsOneOfOrUndefined(options.borderLineCap, "options.borderLineCap", operators_1.LineCapStyle);
          utils_1.assertRangeOrUndefined(options.borderOpacity, "options.borderOpacity", 0, 1);
          utils_1.assertIsOneOfOrUndefined(options.blendMode, "options.blendMode", PDFPageOptions_1.BlendMode);
          var graphicsStateKey = this.maybeEmbedGraphicsState({
            opacity: options.opacity,
            borderOpacity: options.borderOpacity,
            blendMode: options.blendMode
          });
          if (!("color" in options) && !("borderColor" in options)) {
            options.borderColor = colors_1.rgb(0, 0, 0);
          }
          var contentStream = this.getContentStream();
          contentStream.push.apply(contentStream, operations_1.drawSvgPath(path, {
            x: (_a = options.x) !== null && _a !== void 0 ? _a : this.x,
            y: (_b = options.y) !== null && _b !== void 0 ? _b : this.y,
            scale: options.scale,
            rotate: (_c = options.rotate) !== null && _c !== void 0 ? _c : rotations_1.degrees(0),
            color: (_d = options.color) !== null && _d !== void 0 ? _d : void 0,
            borderColor: (_e = options.borderColor) !== null && _e !== void 0 ? _e : void 0,
            borderWidth: (_f = options.borderWidth) !== null && _f !== void 0 ? _f : 0,
            borderDashArray: (_g = options.borderDashArray) !== null && _g !== void 0 ? _g : void 0,
            borderDashPhase: (_h = options.borderDashPhase) !== null && _h !== void 0 ? _h : void 0,
            borderLineCap: (_j = options.borderLineCap) !== null && _j !== void 0 ? _j : void 0,
            graphicsState: graphicsStateKey
          }));
        };
        PDFPage2.prototype.drawLine = function(options) {
          var _a, _b, _c, _d, _e;
          utils_1.assertIs(options.start, "options.start", [
            [Object, "{ x: number, y: number }"]
          ]);
          utils_1.assertIs(options.end, "options.end", [
            [Object, "{ x: number, y: number }"]
          ]);
          utils_1.assertIs(options.start.x, "options.start.x", ["number"]);
          utils_1.assertIs(options.start.y, "options.start.y", ["number"]);
          utils_1.assertIs(options.end.x, "options.end.x", ["number"]);
          utils_1.assertIs(options.end.y, "options.end.y", ["number"]);
          utils_1.assertOrUndefined(options.thickness, "options.thickness", ["number"]);
          utils_1.assertOrUndefined(options.color, "options.color", [[Object, "Color"]]);
          utils_1.assertOrUndefined(options.dashArray, "options.dashArray", [Array]);
          utils_1.assertOrUndefined(options.dashPhase, "options.dashPhase", ["number"]);
          utils_1.assertIsOneOfOrUndefined(options.lineCap, "options.lineCap", operators_1.LineCapStyle);
          utils_1.assertRangeOrUndefined(options.opacity, "opacity.opacity", 0, 1);
          utils_1.assertIsOneOfOrUndefined(options.blendMode, "options.blendMode", PDFPageOptions_1.BlendMode);
          var graphicsStateKey = this.maybeEmbedGraphicsState({
            borderOpacity: options.opacity,
            blendMode: options.blendMode
          });
          if (!("color" in options)) {
            options.color = colors_1.rgb(0, 0, 0);
          }
          var contentStream = this.getContentStream();
          contentStream.push.apply(contentStream, operations_1.drawLine({
            start: options.start,
            end: options.end,
            thickness: (_a = options.thickness) !== null && _a !== void 0 ? _a : 1,
            color: (_b = options.color) !== null && _b !== void 0 ? _b : void 0,
            dashArray: (_c = options.dashArray) !== null && _c !== void 0 ? _c : void 0,
            dashPhase: (_d = options.dashPhase) !== null && _d !== void 0 ? _d : void 0,
            lineCap: (_e = options.lineCap) !== null && _e !== void 0 ? _e : void 0,
            graphicsState: graphicsStateKey
          }));
        };
        PDFPage2.prototype.drawRectangle = function(options) {
          var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
          if (options === void 0) {
            options = {};
          }
          utils_1.assertOrUndefined(options.x, "options.x", ["number"]);
          utils_1.assertOrUndefined(options.y, "options.y", ["number"]);
          utils_1.assertOrUndefined(options.width, "options.width", ["number"]);
          utils_1.assertOrUndefined(options.height, "options.height", ["number"]);
          utils_1.assertOrUndefined(options.rotate, "options.rotate", [[Object, "Rotation"]]);
          utils_1.assertOrUndefined(options.xSkew, "options.xSkew", [[Object, "Rotation"]]);
          utils_1.assertOrUndefined(options.ySkew, "options.ySkew", [[Object, "Rotation"]]);
          utils_1.assertOrUndefined(options.borderWidth, "options.borderWidth", ["number"]);
          utils_1.assertOrUndefined(options.color, "options.color", [[Object, "Color"]]);
          utils_1.assertRangeOrUndefined(options.opacity, "opacity.opacity", 0, 1);
          utils_1.assertOrUndefined(options.borderColor, "options.borderColor", [
            [Object, "Color"]
          ]);
          utils_1.assertOrUndefined(options.borderDashArray, "options.borderDashArray", [
            Array
          ]);
          utils_1.assertOrUndefined(options.borderDashPhase, "options.borderDashPhase", [
            "number"
          ]);
          utils_1.assertIsOneOfOrUndefined(options.borderLineCap, "options.borderLineCap", operators_1.LineCapStyle);
          utils_1.assertRangeOrUndefined(options.borderOpacity, "options.borderOpacity", 0, 1);
          utils_1.assertIsOneOfOrUndefined(options.blendMode, "options.blendMode", PDFPageOptions_1.BlendMode);
          var graphicsStateKey = this.maybeEmbedGraphicsState({
            opacity: options.opacity,
            borderOpacity: options.borderOpacity,
            blendMode: options.blendMode
          });
          if (!("color" in options) && !("borderColor" in options)) {
            options.color = colors_1.rgb(0, 0, 0);
          }
          var contentStream = this.getContentStream();
          contentStream.push.apply(contentStream, operations_1.drawRectangle({
            x: (_a = options.x) !== null && _a !== void 0 ? _a : this.x,
            y: (_b = options.y) !== null && _b !== void 0 ? _b : this.y,
            width: (_c = options.width) !== null && _c !== void 0 ? _c : 150,
            height: (_d = options.height) !== null && _d !== void 0 ? _d : 100,
            rotate: (_e = options.rotate) !== null && _e !== void 0 ? _e : rotations_1.degrees(0),
            xSkew: (_f = options.xSkew) !== null && _f !== void 0 ? _f : rotations_1.degrees(0),
            ySkew: (_g = options.ySkew) !== null && _g !== void 0 ? _g : rotations_1.degrees(0),
            borderWidth: (_h = options.borderWidth) !== null && _h !== void 0 ? _h : 0,
            color: (_j = options.color) !== null && _j !== void 0 ? _j : void 0,
            borderColor: (_k = options.borderColor) !== null && _k !== void 0 ? _k : void 0,
            borderDashArray: (_l = options.borderDashArray) !== null && _l !== void 0 ? _l : void 0,
            borderDashPhase: (_m = options.borderDashPhase) !== null && _m !== void 0 ? _m : void 0,
            graphicsState: graphicsStateKey,
            borderLineCap: (_o = options.borderLineCap) !== null && _o !== void 0 ? _o : void 0
          }));
        };
        PDFPage2.prototype.drawSquare = function(options) {
          if (options === void 0) {
            options = {};
          }
          var size = options.size;
          utils_1.assertOrUndefined(size, "size", ["number"]);
          this.drawRectangle(tslib_1.__assign(tslib_1.__assign({}, options), { width: size, height: size }));
        };
        PDFPage2.prototype.drawEllipse = function(options) {
          var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
          if (options === void 0) {
            options = {};
          }
          utils_1.assertOrUndefined(options.x, "options.x", ["number"]);
          utils_1.assertOrUndefined(options.y, "options.y", ["number"]);
          utils_1.assertOrUndefined(options.xScale, "options.xScale", ["number"]);
          utils_1.assertOrUndefined(options.yScale, "options.yScale", ["number"]);
          utils_1.assertOrUndefined(options.rotate, "options.rotate", [[Object, "Rotation"]]);
          utils_1.assertOrUndefined(options.color, "options.color", [[Object, "Color"]]);
          utils_1.assertRangeOrUndefined(options.opacity, "opacity.opacity", 0, 1);
          utils_1.assertOrUndefined(options.borderColor, "options.borderColor", [
            [Object, "Color"]
          ]);
          utils_1.assertRangeOrUndefined(options.borderOpacity, "options.borderOpacity", 0, 1);
          utils_1.assertOrUndefined(options.borderWidth, "options.borderWidth", ["number"]);
          utils_1.assertOrUndefined(options.borderDashArray, "options.borderDashArray", [
            Array
          ]);
          utils_1.assertOrUndefined(options.borderDashPhase, "options.borderDashPhase", [
            "number"
          ]);
          utils_1.assertIsOneOfOrUndefined(options.borderLineCap, "options.borderLineCap", operators_1.LineCapStyle);
          utils_1.assertIsOneOfOrUndefined(options.blendMode, "options.blendMode", PDFPageOptions_1.BlendMode);
          var graphicsStateKey = this.maybeEmbedGraphicsState({
            opacity: options.opacity,
            borderOpacity: options.borderOpacity,
            blendMode: options.blendMode
          });
          if (!("color" in options) && !("borderColor" in options)) {
            options.color = colors_1.rgb(0, 0, 0);
          }
          var contentStream = this.getContentStream();
          contentStream.push.apply(contentStream, operations_1.drawEllipse({
            x: (_a = options.x) !== null && _a !== void 0 ? _a : this.x,
            y: (_b = options.y) !== null && _b !== void 0 ? _b : this.y,
            xScale: (_c = options.xScale) !== null && _c !== void 0 ? _c : 100,
            yScale: (_d = options.yScale) !== null && _d !== void 0 ? _d : 100,
            rotate: (_e = options.rotate) !== null && _e !== void 0 ? _e : void 0,
            color: (_f = options.color) !== null && _f !== void 0 ? _f : void 0,
            borderColor: (_g = options.borderColor) !== null && _g !== void 0 ? _g : void 0,
            borderWidth: (_h = options.borderWidth) !== null && _h !== void 0 ? _h : 0,
            borderDashArray: (_j = options.borderDashArray) !== null && _j !== void 0 ? _j : void 0,
            borderDashPhase: (_k = options.borderDashPhase) !== null && _k !== void 0 ? _k : void 0,
            borderLineCap: (_l = options.borderLineCap) !== null && _l !== void 0 ? _l : void 0,
            graphicsState: graphicsStateKey
          }));
        };
        PDFPage2.prototype.drawCircle = function(options) {
          if (options === void 0) {
            options = {};
          }
          var _a = options.size, size = _a === void 0 ? 100 : _a;
          utils_1.assertOrUndefined(size, "size", ["number"]);
          this.drawEllipse(tslib_1.__assign(tslib_1.__assign({}, options), { xScale: size, yScale: size }));
        };
        PDFPage2.prototype.setOrEmbedFont = function(font) {
          var oldFont = this.font;
          var oldFontKey = this.fontKey;
          if (font)
            this.setFont(font);
          else
            this.getFont();
          var newFont = this.font;
          var newFontKey = this.fontKey;
          return { oldFont, oldFontKey, newFont, newFontKey };
        };
        PDFPage2.prototype.getFont = function() {
          if (!this.font || !this.fontKey) {
            var font = this.doc.embedStandardFont(StandardFonts_1.StandardFonts.Helvetica);
            this.setFont(font);
          }
          return [this.font, this.fontKey];
        };
        PDFPage2.prototype.resetFont = function() {
          this.font = void 0;
          this.fontKey = void 0;
        };
        PDFPage2.prototype.getContentStream = function(useExisting) {
          if (useExisting === void 0) {
            useExisting = true;
          }
          if (useExisting && this.contentStream)
            return this.contentStream;
          this.contentStream = this.createContentStream();
          this.contentStreamRef = this.doc.context.register(this.contentStream);
          this.node.addContentStream(this.contentStreamRef);
          return this.contentStream;
        };
        PDFPage2.prototype.createContentStream = function() {
          var operators = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            operators[_i] = arguments[_i];
          }
          var dict = this.doc.context.obj({});
          var contentStream = core_1.PDFContentStream.of(dict, operators);
          return contentStream;
        };
        PDFPage2.prototype.maybeEmbedGraphicsState = function(options) {
          var opacity = options.opacity, borderOpacity = options.borderOpacity, blendMode = options.blendMode;
          if (opacity === void 0 && borderOpacity === void 0 && blendMode === void 0) {
            return void 0;
          }
          var graphicsState = this.doc.context.obj({
            Type: "ExtGState",
            ca: opacity,
            CA: borderOpacity,
            BM: blendMode
          });
          var key = this.node.newExtGState("GS", graphicsState);
          return key;
        };
        PDFPage2.prototype.scaleAnnot = function(annot, x, y) {
          var selectors = ["RD", "CL", "Vertices", "QuadPoints", "L", "Rect"];
          for (var idx = 0, len = selectors.length; idx < len; idx++) {
            var list = annot.lookup(core_1.PDFName.of(selectors[idx]));
            if (list instanceof core_1.PDFArray)
              list.scalePDFNumbers(x, y);
          }
          var inkLists = annot.lookup(core_1.PDFName.of("InkList"));
          if (inkLists instanceof core_1.PDFArray) {
            for (var idx = 0, len = inkLists.size(); idx < len; idx++) {
              var arr = inkLists.lookup(idx);
              if (arr instanceof core_1.PDFArray)
                arr.scalePDFNumbers(x, y);
            }
          }
        };
        PDFPage2.of = function(leafNode, ref, doc) {
          return new PDFPage2(leafNode, ref, doc);
        };
        PDFPage2.create = function(doc) {
          utils_1.assertIs(doc, "doc", [[PDFDocument_1.default, "PDFDocument"]]);
          var dummyRef = core_1.PDFRef.of(-1);
          var pageLeaf = core_1.PDFPageLeaf.withContextAndParent(doc.context, dummyRef);
          var pageRef = doc.context.register(pageLeaf);
          return new PDFPage2(pageLeaf, pageRef, doc);
        };
        return PDFPage2;
      })()
    );
    exports.default = PDFPage;
  }
});

// node_modules/pdf-lib/cjs/api/form/PDFButton.js
var require_PDFButton = __commonJS({
  "node_modules/pdf-lib/cjs/api/form/PDFButton.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var PDFPage_1 = tslib_1.__importDefault(require_PDFPage());
    var PDFFont_1 = tslib_1.__importDefault(require_PDFFont());
    var alignment_1 = require_alignment2();
    var appearances_1 = require_appearances();
    var PDFField_1 = tslib_1.__importStar(require_PDFField());
    var colors_1 = require_colors();
    var rotations_1 = require_rotations();
    var core_1 = require_core();
    var utils_1 = require_utils2();
    var PDFButton = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(PDFButton2, _super);
        function PDFButton2(acroPushButton, ref, doc) {
          var _this = _super.call(this, acroPushButton, ref, doc) || this;
          utils_1.assertIs(acroPushButton, "acroButton", [
            [core_1.PDFAcroPushButton, "PDFAcroPushButton"]
          ]);
          _this.acroField = acroPushButton;
          return _this;
        }
        PDFButton2.prototype.setImage = function(image, alignment) {
          if (alignment === void 0) {
            alignment = alignment_1.ImageAlignment.Center;
          }
          var widgets = this.acroField.getWidgets();
          for (var idx = 0, len = widgets.length; idx < len; idx++) {
            var widget = widgets[idx];
            var streamRef = this.createImageAppearanceStream(widget, image, alignment);
            this.updateWidgetAppearances(widget, { normal: streamRef });
          }
          this.markAsClean();
        };
        PDFButton2.prototype.setFontSize = function(fontSize) {
          utils_1.assertPositive(fontSize, "fontSize");
          this.acroField.setFontSize(fontSize);
          this.markAsDirty();
        };
        PDFButton2.prototype.addToPage = function(text, page, options) {
          var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
          utils_1.assertOrUndefined(text, "text", ["string"]);
          utils_1.assertOrUndefined(page, "page", [[PDFPage_1.default, "PDFPage"]]);
          PDFField_1.assertFieldAppearanceOptions(options);
          var widget = this.createWidget({
            x: ((_a = options === null || options === void 0 ? void 0 : options.x) !== null && _a !== void 0 ? _a : 0) - ((_b = options === null || options === void 0 ? void 0 : options.borderWidth) !== null && _b !== void 0 ? _b : 0) / 2,
            y: ((_c = options === null || options === void 0 ? void 0 : options.y) !== null && _c !== void 0 ? _c : 0) - ((_d = options === null || options === void 0 ? void 0 : options.borderWidth) !== null && _d !== void 0 ? _d : 0) / 2,
            width: (_e = options === null || options === void 0 ? void 0 : options.width) !== null && _e !== void 0 ? _e : 100,
            height: (_f = options === null || options === void 0 ? void 0 : options.height) !== null && _f !== void 0 ? _f : 50,
            textColor: (_g = options === null || options === void 0 ? void 0 : options.textColor) !== null && _g !== void 0 ? _g : colors_1.rgb(0, 0, 0),
            backgroundColor: (_h = options === null || options === void 0 ? void 0 : options.backgroundColor) !== null && _h !== void 0 ? _h : colors_1.rgb(0.75, 0.75, 0.75),
            borderColor: options === null || options === void 0 ? void 0 : options.borderColor,
            borderWidth: (_j = options === null || options === void 0 ? void 0 : options.borderWidth) !== null && _j !== void 0 ? _j : 0,
            rotate: (_k = options === null || options === void 0 ? void 0 : options.rotate) !== null && _k !== void 0 ? _k : rotations_1.degrees(0),
            caption: text,
            hidden: options === null || options === void 0 ? void 0 : options.hidden,
            page: page.ref
          });
          var widgetRef = this.doc.context.register(widget.dict);
          this.acroField.addWidget(widgetRef);
          var font = (_l = options === null || options === void 0 ? void 0 : options.font) !== null && _l !== void 0 ? _l : this.doc.getForm().getDefaultFont();
          this.updateWidgetAppearance(widget, font);
          page.node.addAnnot(widgetRef);
        };
        PDFButton2.prototype.needsAppearancesUpdate = function() {
          var _a;
          if (this.isDirty())
            return true;
          var widgets = this.acroField.getWidgets();
          for (var idx = 0, len = widgets.length; idx < len; idx++) {
            var widget = widgets[idx];
            var hasAppearances = ((_a = widget.getAppearances()) === null || _a === void 0 ? void 0 : _a.normal) instanceof core_1.PDFStream;
            if (!hasAppearances)
              return true;
          }
          return false;
        };
        PDFButton2.prototype.defaultUpdateAppearances = function(font) {
          utils_1.assertIs(font, "font", [[PDFFont_1.default, "PDFFont"]]);
          this.updateAppearances(font);
        };
        PDFButton2.prototype.updateAppearances = function(font, provider) {
          utils_1.assertIs(font, "font", [[PDFFont_1.default, "PDFFont"]]);
          utils_1.assertOrUndefined(provider, "provider", [Function]);
          var widgets = this.acroField.getWidgets();
          for (var idx = 0, len = widgets.length; idx < len; idx++) {
            var widget = widgets[idx];
            this.updateWidgetAppearance(widget, font, provider);
          }
        };
        PDFButton2.prototype.updateWidgetAppearance = function(widget, font, provider) {
          var apProvider = provider !== null && provider !== void 0 ? provider : appearances_1.defaultButtonAppearanceProvider;
          var appearances = appearances_1.normalizeAppearance(apProvider(this, widget, font));
          this.updateWidgetAppearanceWithFont(widget, font, appearances);
        };
        PDFButton2.of = function(acroPushButton, ref, doc) {
          return new PDFButton2(acroPushButton, ref, doc);
        };
        return PDFButton2;
      })(PDFField_1.default)
    );
    exports.default = PDFButton;
  }
});

// node_modules/pdf-lib/cjs/api/form/index.js
var require_form = __commonJS({
  "node_modules/pdf-lib/cjs/api/form/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_appearances(), exports);
    var PDFButton_1 = require_PDFButton();
    Object.defineProperty(exports, "PDFButton", { enumerable: true, get: function() {
      return PDFButton_1.default;
    } });
    var PDFCheckBox_1 = require_PDFCheckBox();
    Object.defineProperty(exports, "PDFCheckBox", { enumerable: true, get: function() {
      return PDFCheckBox_1.default;
    } });
    var PDFDropdown_1 = require_PDFDropdown();
    Object.defineProperty(exports, "PDFDropdown", { enumerable: true, get: function() {
      return PDFDropdown_1.default;
    } });
    var PDFField_1 = require_PDFField();
    Object.defineProperty(exports, "PDFField", { enumerable: true, get: function() {
      return PDFField_1.default;
    } });
    var PDFForm_1 = require_PDFForm();
    Object.defineProperty(exports, "PDFForm", { enumerable: true, get: function() {
      return PDFForm_1.default;
    } });
    var PDFOptionList_1 = require_PDFOptionList();
    Object.defineProperty(exports, "PDFOptionList", { enumerable: true, get: function() {
      return PDFOptionList_1.default;
    } });
    var PDFRadioGroup_1 = require_PDFRadioGroup();
    Object.defineProperty(exports, "PDFRadioGroup", { enumerable: true, get: function() {
      return PDFRadioGroup_1.default;
    } });
    var PDFSignature_1 = require_PDFSignature();
    Object.defineProperty(exports, "PDFSignature", { enumerable: true, get: function() {
      return PDFSignature_1.default;
    } });
    var PDFTextField_1 = require_PDFTextField();
    Object.defineProperty(exports, "PDFTextField", { enumerable: true, get: function() {
      return PDFTextField_1.default;
    } });
  }
});

// node_modules/pdf-lib/cjs/api/text/index.js
var require_text = __commonJS({
  "node_modules/pdf-lib/cjs/api/text/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_alignment(), exports);
    tslib_1.__exportStar(require_layout(), exports);
  }
});

// node_modules/pdf-lib/cjs/api/index.js
var require_api = __commonJS({
  "node_modules/pdf-lib/cjs/api/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_form(), exports);
    tslib_1.__exportStar(require_text(), exports);
    tslib_1.__exportStar(require_colors(), exports);
    tslib_1.__exportStar(require_errors3(), exports);
    tslib_1.__exportStar(require_image(), exports);
    tslib_1.__exportStar(require_objects2(), exports);
    tslib_1.__exportStar(require_operations(), exports);
    tslib_1.__exportStar(require_operators(), exports);
    tslib_1.__exportStar(require_rotations(), exports);
    tslib_1.__exportStar(require_sizes(), exports);
    tslib_1.__exportStar(require_PDFPageOptions(), exports);
    tslib_1.__exportStar(require_PDFDocumentOptions(), exports);
    tslib_1.__exportStar(require_StandardFonts(), exports);
    var PDFDocument_1 = require_PDFDocument();
    Object.defineProperty(exports, "PDFDocument", { enumerable: true, get: function() {
      return PDFDocument_1.default;
    } });
    var PDFFont_1 = require_PDFFont();
    Object.defineProperty(exports, "PDFFont", { enumerable: true, get: function() {
      return PDFFont_1.default;
    } });
    var PDFImage_1 = require_PDFImage();
    Object.defineProperty(exports, "PDFImage", { enumerable: true, get: function() {
      return PDFImage_1.default;
    } });
    var PDFPage_1 = require_PDFPage();
    Object.defineProperty(exports, "PDFPage", { enumerable: true, get: function() {
      return PDFPage_1.default;
    } });
    var PDFEmbeddedPage_1 = require_PDFEmbeddedPage();
    Object.defineProperty(exports, "PDFEmbeddedPage", { enumerable: true, get: function() {
      return PDFEmbeddedPage_1.default;
    } });
    var PDFJavaScript_1 = require_PDFJavaScript();
    Object.defineProperty(exports, "PDFJavaScript", { enumerable: true, get: function() {
      return PDFJavaScript_1.default;
    } });
  }
});

// node_modules/pdf-lib/cjs/types/index.js
var require_types = __commonJS({
  "node_modules/pdf-lib/cjs/types/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/pdf-lib/cjs/index.js
var require_cjs = __commonJS({
  "node_modules/pdf-lib/cjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_api(), exports);
    tslib_1.__exportStar(require_core(), exports);
    tslib_1.__exportStar(require_types(), exports);
    tslib_1.__exportStar(require_utils2(), exports);
  }
});

// scripts/vendor-entries/pdf-lib.mjs
var import_pdf_lib = __toESM(require_cjs(), 1);
var export_PDFDocument = import_pdf_lib.PDFDocument;
export {
  export_PDFDocument as PDFDocument
};
