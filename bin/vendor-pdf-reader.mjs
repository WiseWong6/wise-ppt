// node_modules/tslib/tslib.es6.js
var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
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
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s, i2 = 1, n = arguments.length; i2 < n; i2++) {
      s = arguments[i2];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
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
function __spreadArrays() {
  for (var s = 0, i2 = 0, il = arguments.length; i2 < il; i2++) s += arguments[i2].length;
  for (var r = Array(s), k = 0, i2 = 0; i2 < il; i2++)
    for (var a = arguments[i2], j = 0, jl = a.length; j < jl; j++, k++)
      r[k] = a[j];
  return r;
}

// node_modules/pdf-lib/es/utils/base64.js
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var lookup = new Uint8Array(256);
for (i = 0; i < chars.length; i++) {
  lookup[chars.charCodeAt(i)] = i;
}
var i;

// node_modules/pdf-lib/es/utils/strings.js
var toCharCode = function(character) {
  return character.charCodeAt(0);
};
var toHexStringOfMinLength = function(num, minLength) {
  return padStart(num.toString(16), minLength, "0").toUpperCase();
};
var toHexString = function(num) {
  return toHexStringOfMinLength(num, 2);
};
var charFromCode = function(code) {
  return String.fromCharCode(code);
};
var charFromHexCode = function(hex) {
  return charFromCode(parseInt(hex, 16));
};
var padStart = function(value, length, padChar) {
  var padding = "";
  for (var idx4 = 0, len3 = length - value.length; idx4 < len3; idx4++) {
    padding += padChar;
  }
  return padding + value;
};
var copyStringIntoBuffer = function(str, buffer, offset) {
  var length = str.length;
  for (var idx4 = 0; idx4 < length; idx4++) {
    buffer[offset++] = str.charCodeAt(idx4);
  }
  return length;
};
var dateRegex = /^D:(\d\d\d\d)(\d\d)?(\d\d)?(\d\d)?(\d\d)?(\d\d)?([+\-Z])?(\d\d)?'?(\d\d)?'?$/;
var parseDate = function(dateStr) {
  var match = dateStr.match(dateRegex);
  if (!match)
    return void 0;
  var year = match[1], _a = match[2], month = _a === void 0 ? "01" : _a, _b = match[3], day = _b === void 0 ? "01" : _b, _c = match[4], hours = _c === void 0 ? "00" : _c, _d = match[5], mins = _d === void 0 ? "00" : _d, _e = match[6], secs = _e === void 0 ? "00" : _e, _f = match[7], offsetSign = _f === void 0 ? "Z" : _f, _g = match[8], offsetHours = _g === void 0 ? "00" : _g, _h = match[9], offsetMins = _h === void 0 ? "00" : _h;
  var tzOffset = offsetSign === "Z" ? "Z" : "" + offsetSign + offsetHours + ":" + offsetMins;
  var date = /* @__PURE__ */ new Date(year + "-" + month + "-" + day + "T" + hours + ":" + mins + ":" + secs + tzOffset);
  return date;
};
var findLastMatch = function(value, regex) {
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

// node_modules/pdf-lib/es/utils/arrays.js
var typedArrayFor = function(value) {
  if (value instanceof Uint8Array)
    return value;
  var length = value.length;
  var typedArray = new Uint8Array(length);
  for (var idx4 = 0; idx4 < length; idx4++) {
    typedArray[idx4] = value.charCodeAt(idx4);
  }
  return typedArray;
};
var arrayAsString = function(array) {
  var str = "";
  for (var idx4 = 0, len3 = array.length; idx4 < len3; idx4++) {
    str += charFromCode(array[idx4]);
  }
  return str;
};

// node_modules/pdf-lib/es/utils/async.js
var waitForTick = function() {
  return new Promise(function(resolve) {
    setTimeout(function() {
      return resolve();
    }, 0);
  });
};

// node_modules/pdf-lib/es/utils/unicode.js
var utf16Encode = function(input, byteOrderMark) {
  if (byteOrderMark === void 0) {
    byteOrderMark = true;
  }
  var encoded = [];
  if (byteOrderMark)
    encoded.push(65279);
  for (var idx4 = 0, len3 = input.length; idx4 < len3; ) {
    var codePoint = input.codePointAt(idx4);
    if (codePoint < 65536) {
      encoded.push(codePoint);
      idx4 += 1;
    } else if (codePoint < 1114112) {
      encoded.push(highSurrogate(codePoint), lowSurrogate(codePoint));
      idx4 += 2;
    } else
      throw new Error("Invalid code point: 0x" + toHexString(codePoint));
  }
  return new Uint16Array(encoded);
};
var highSurrogate = function(codePoint) {
  return Math.floor((codePoint - 65536) / 1024) + 55296;
};
var lowSurrogate = function(codePoint) {
  return (codePoint - 65536) % 1024 + 56320;
};
var ByteOrder;
(function(ByteOrder2) {
  ByteOrder2["BigEndian"] = "BigEndian";
  ByteOrder2["LittleEndian"] = "LittleEndian";
})(ByteOrder || (ByteOrder = {}));
var REPLACEMENT = "\uFFFD".codePointAt(0);
var utf16Decode = function(input, byteOrderMark) {
  if (byteOrderMark === void 0) {
    byteOrderMark = true;
  }
  if (input.length <= 1)
    return String.fromCodePoint(REPLACEMENT);
  var byteOrder = byteOrderMark ? readBOM(input) : ByteOrder.BigEndian;
  var idx4 = byteOrderMark ? 2 : 0;
  var codePoints = [];
  while (input.length - idx4 >= 2) {
    var first = decodeValues(input[idx4++], input[idx4++], byteOrder);
    if (isHighSurrogate(first)) {
      if (input.length - idx4 < 2) {
        codePoints.push(REPLACEMENT);
      } else {
        var second = decodeValues(input[idx4++], input[idx4++], byteOrder);
        if (isLowSurrogate(second)) {
          codePoints.push(first, second);
        } else {
          codePoints.push(REPLACEMENT);
        }
      }
    } else if (isLowSurrogate(first)) {
      idx4 += 2;
      codePoints.push(REPLACEMENT);
    } else {
      codePoints.push(first);
    }
  }
  if (idx4 < input.length)
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
var hasUtf16BOM = function(bytes) {
  return hasUtf16BigEndianBOM(bytes) || hasUtf16LittleEndianBOM(bytes);
};

// node_modules/pdf-lib/es/utils/numbers.js
var numberToString = function(num) {
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

// scripts/adapters/pdf-standard-fonts-empty.mjs
var FontNames = Object.freeze({});

// node_modules/pdf-lib/es/utils/objects.js
var values = function(obj) {
  return Object.keys(obj).map(function(k) {
    return obj[k];
  });
};
var StandardFontValues = values(FontNames);

// node_modules/pdf-lib/es/utils/validators.js
var backtick = function(val) {
  return "`" + val + "`";
};
var singleQuote = function(val) {
  return "'" + val + "'";
};
var formatValue = function(value) {
  var type = typeof value;
  if (type === "string")
    return singleQuote(value);
  else if (type === "undefined")
    return backtick(value);
  else
    return value;
};
var createValueErrorMsg = function(value, valueName, values2) {
  var allowedValues = new Array(values2.length);
  for (var idx4 = 0, len3 = values2.length; idx4 < len3; idx4++) {
    var v = values2[idx4];
    allowedValues[idx4] = formatValue(v);
  }
  var joinedValues = allowedValues.join(" or ");
  return backtick(valueName) + " must be one of " + joinedValues + ", but was actually " + formatValue(value);
};
var assertIsOneOf = function(value, valueName, allowedValues) {
  if (!Array.isArray(allowedValues)) {
    allowedValues = values(allowedValues);
  }
  for (var idx4 = 0, len3 = allowedValues.length; idx4 < len3; idx4++) {
    if (value === allowedValues[idx4])
      return;
  }
  throw new TypeError(createValueErrorMsg(value, valueName, allowedValues));
};
var getType = function(val) {
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
var isType = function(value, type) {
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
var createTypeErrorMsg = function(value, valueName, types) {
  var allowedTypes = new Array(types.length);
  for (var idx4 = 0, len3 = types.length; idx4 < len3; idx4++) {
    var type = types[idx4];
    if (type === "null")
      allowedTypes[idx4] = backtick("null");
    if (type === "undefined")
      allowedTypes[idx4] = backtick("undefined");
    if (type === "string")
      allowedTypes[idx4] = backtick("string");
    else if (type === "number")
      allowedTypes[idx4] = backtick("number");
    else if (type === "boolean")
      allowedTypes[idx4] = backtick("boolean");
    else if (type === "symbol")
      allowedTypes[idx4] = backtick("symbol");
    else if (type === "bigint")
      allowedTypes[idx4] = backtick("bigint");
    else if (type === Array)
      allowedTypes[idx4] = backtick("Array");
    else if (type === Uint8Array)
      allowedTypes[idx4] = backtick("Uint8Array");
    else if (type === ArrayBuffer)
      allowedTypes[idx4] = backtick("ArrayBuffer");
    else
      allowedTypes[idx4] = backtick(type[1]);
  }
  var joinedTypes = allowedTypes.join(" or ");
  return backtick(valueName) + " must be of type " + joinedTypes + ", but was actually of type " + backtick(getType(value));
};
var assertIs = function(value, valueName, types) {
  for (var idx4 = 0, len3 = types.length; idx4 < len3; idx4++) {
    if (isType(value, types[idx4]))
      return;
  }
  throw new TypeError(createTypeErrorMsg(value, valueName, types));
};
var assertEachIs = function(values2, valueName, types) {
  for (var idx4 = 0, len3 = values2.length; idx4 < len3; idx4++) {
    assertIs(values2[idx4], valueName, types);
  }
};
var assertRange = function(value, valueName, min, max) {
  assertIs(value, valueName, ["number"]);
  assertIs(min, "min", ["number"]);
  assertIs(max, "max", ["number"]);
  max = Math.max(min, max);
  if (value < min || value > max) {
    throw new Error(backtick(valueName) + " must be at least " + min + " and at most " + max + ", but was actually " + value);
  }
};
var assertInteger = function(value, valueName) {
  if (!Number.isInteger(value)) {
    throw new Error(backtick(valueName) + " must be an integer, but was actually " + value);
  }
};

// node_modules/pdf-lib/es/utils/pdfDocEncoding.js
var pdfDocEncodingToUnicode = new Uint16Array(256);
for (idx = 0; idx < 256; idx++) {
  pdfDocEncodingToUnicode[idx] = idx;
}
var idx;
pdfDocEncodingToUnicode[22] = toCharCode("");
pdfDocEncodingToUnicode[24] = toCharCode("\u02D8");
pdfDocEncodingToUnicode[25] = toCharCode("\u02C7");
pdfDocEncodingToUnicode[26] = toCharCode("\u02C6");
pdfDocEncodingToUnicode[27] = toCharCode("\u02D9");
pdfDocEncodingToUnicode[28] = toCharCode("\u02DD");
pdfDocEncodingToUnicode[29] = toCharCode("\u02DB");
pdfDocEncodingToUnicode[30] = toCharCode("\u02DA");
pdfDocEncodingToUnicode[31] = toCharCode("\u02DC");
pdfDocEncodingToUnicode[127] = toCharCode("\uFFFD");
pdfDocEncodingToUnicode[128] = toCharCode("\u2022");
pdfDocEncodingToUnicode[129] = toCharCode("\u2020");
pdfDocEncodingToUnicode[130] = toCharCode("\u2021");
pdfDocEncodingToUnicode[131] = toCharCode("\u2026");
pdfDocEncodingToUnicode[132] = toCharCode("\u2014");
pdfDocEncodingToUnicode[133] = toCharCode("\u2013");
pdfDocEncodingToUnicode[134] = toCharCode("\u0192");
pdfDocEncodingToUnicode[135] = toCharCode("\u2044");
pdfDocEncodingToUnicode[136] = toCharCode("\u2039");
pdfDocEncodingToUnicode[137] = toCharCode("\u203A");
pdfDocEncodingToUnicode[138] = toCharCode("\u2212");
pdfDocEncodingToUnicode[139] = toCharCode("\u2030");
pdfDocEncodingToUnicode[140] = toCharCode("\u201E");
pdfDocEncodingToUnicode[141] = toCharCode("\u201C");
pdfDocEncodingToUnicode[142] = toCharCode("\u201D");
pdfDocEncodingToUnicode[143] = toCharCode("\u2018");
pdfDocEncodingToUnicode[144] = toCharCode("\u2019");
pdfDocEncodingToUnicode[145] = toCharCode("\u201A");
pdfDocEncodingToUnicode[146] = toCharCode("\u2122");
pdfDocEncodingToUnicode[147] = toCharCode("\uFB01");
pdfDocEncodingToUnicode[148] = toCharCode("\uFB02");
pdfDocEncodingToUnicode[149] = toCharCode("\u0141");
pdfDocEncodingToUnicode[150] = toCharCode("\u0152");
pdfDocEncodingToUnicode[151] = toCharCode("\u0160");
pdfDocEncodingToUnicode[152] = toCharCode("\u0178");
pdfDocEncodingToUnicode[153] = toCharCode("\u017D");
pdfDocEncodingToUnicode[154] = toCharCode("\u0131");
pdfDocEncodingToUnicode[155] = toCharCode("\u0142");
pdfDocEncodingToUnicode[156] = toCharCode("\u0153");
pdfDocEncodingToUnicode[157] = toCharCode("\u0161");
pdfDocEncodingToUnicode[158] = toCharCode("\u017E");
pdfDocEncodingToUnicode[159] = toCharCode("\uFFFD");
pdfDocEncodingToUnicode[160] = toCharCode("\u20AC");
pdfDocEncodingToUnicode[173] = toCharCode("\uFFFD");
var pdfDocEncodingDecode = function(bytes) {
  var codePoints = new Array(bytes.length);
  for (var idx4 = 0, len3 = bytes.length; idx4 < len3; idx4++) {
    codePoints[idx4] = pdfDocEncodingToUnicode[bytes[idx4]];
  }
  return String.fromCodePoint.apply(String, codePoints);
};

// node_modules/pdf-lib/es/utils/Cache.js
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
var Cache_default = Cache;

// node_modules/pdf-lib/es/core/errors.js
var MethodNotImplementedError = (
  /** @class */
  (function(_super) {
    __extends(MethodNotImplementedError2, _super);
    function MethodNotImplementedError2(className, methodName) {
      var _this = this;
      var msg = "Method " + className + "." + methodName + "() not implemented";
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return MethodNotImplementedError2;
  })(Error)
);
var PrivateConstructorError = (
  /** @class */
  (function(_super) {
    __extends(PrivateConstructorError2, _super);
    function PrivateConstructorError2(className) {
      var _this = this;
      var msg = "Cannot construct " + className + " - it has a private constructor";
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return PrivateConstructorError2;
  })(Error)
);
var UnexpectedObjectTypeError = (
  /** @class */
  (function(_super) {
    __extends(UnexpectedObjectTypeError2, _super);
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
var UnsupportedEncodingError = (
  /** @class */
  (function(_super) {
    __extends(UnsupportedEncodingError2, _super);
    function UnsupportedEncodingError2(encoding) {
      var _this = this;
      var msg = encoding + " stream encoding not supported";
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return UnsupportedEncodingError2;
  })(Error)
);
var ReparseError = (
  /** @class */
  (function(_super) {
    __extends(ReparseError2, _super);
    function ReparseError2(className, methodName) {
      var _this = this;
      var msg = "Cannot call " + className + "." + methodName + "() more than once";
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return ReparseError2;
  })(Error)
);
var MissingCatalogError = (
  /** @class */
  (function(_super) {
    __extends(MissingCatalogError2, _super);
    function MissingCatalogError2(ref) {
      var _this = this;
      var msg = "Missing catalog (ref=" + ref + ")";
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return MissingCatalogError2;
  })(Error)
);
var MissingPageContentsEmbeddingError = (
  /** @class */
  (function(_super) {
    __extends(MissingPageContentsEmbeddingError2, _super);
    function MissingPageContentsEmbeddingError2() {
      var _this = this;
      var msg = "Can't embed page with missing Contents";
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return MissingPageContentsEmbeddingError2;
  })(Error)
);
var UnrecognizedStreamTypeError = (
  /** @class */
  (function(_super) {
    __extends(UnrecognizedStreamTypeError2, _super);
    function UnrecognizedStreamTypeError2(stream2) {
      var _a, _b, _c;
      var _this = this;
      var streamType = (_c = (_b = (_a = stream2 === null || stream2 === void 0 ? void 0 : stream2.contructor) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : stream2 === null || stream2 === void 0 ? void 0 : stream2.name) !== null && _c !== void 0 ? _c : stream2;
      var msg = "Unrecognized stream type: " + streamType;
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return UnrecognizedStreamTypeError2;
  })(Error)
);
var PageEmbeddingMismatchedContextError = (
  /** @class */
  (function(_super) {
    __extends(PageEmbeddingMismatchedContextError2, _super);
    function PageEmbeddingMismatchedContextError2() {
      var _this = this;
      var msg = "Found mismatched contexts while embedding pages. All pages in the array passed to `PDFDocument.embedPages()` must be from the same document.";
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return PageEmbeddingMismatchedContextError2;
  })(Error)
);
var PDFArrayIsNotRectangleError = (
  /** @class */
  (function(_super) {
    __extends(PDFArrayIsNotRectangleError2, _super);
    function PDFArrayIsNotRectangleError2(size) {
      var _this = this;
      var msg = "Attempted to convert PDFArray with " + size + " elements to rectangle, but must have exactly 4 elements.";
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return PDFArrayIsNotRectangleError2;
  })(Error)
);
var InvalidPDFDateStringError = (
  /** @class */
  (function(_super) {
    __extends(InvalidPDFDateStringError2, _super);
    function InvalidPDFDateStringError2(value) {
      var _this = this;
      var msg = 'Attempted to convert "' + value + '" to a date, but it does not match the PDF date string format.';
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return InvalidPDFDateStringError2;
  })(Error)
);
var InvalidTargetIndexError = (
  /** @class */
  (function(_super) {
    __extends(InvalidTargetIndexError2, _super);
    function InvalidTargetIndexError2(targetIndex, Count) {
      var _this = this;
      var msg = "Invalid targetIndex specified: targetIndex=" + targetIndex + " must be less than Count=" + Count;
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return InvalidTargetIndexError2;
  })(Error)
);
var CorruptPageTreeError = (
  /** @class */
  (function(_super) {
    __extends(CorruptPageTreeError2, _super);
    function CorruptPageTreeError2(targetIndex, operation) {
      var _this = this;
      var msg = "Failed to " + operation + " at targetIndex=" + targetIndex + " due to corrupt page tree: It is likely that one or more 'Count' entries are invalid";
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return CorruptPageTreeError2;
  })(Error)
);
var IndexOutOfBoundsError = (
  /** @class */
  (function(_super) {
    __extends(IndexOutOfBoundsError2, _super);
    function IndexOutOfBoundsError2(index, min, max) {
      var _this = this;
      var msg = "index should be at least " + min + " and at most " + max + ", but was actually " + index;
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return IndexOutOfBoundsError2;
  })(Error)
);
var InvalidAcroFieldValueError = (
  /** @class */
  (function(_super) {
    __extends(InvalidAcroFieldValueError2, _super);
    function InvalidAcroFieldValueError2() {
      var _this = this;
      var msg = "Attempted to set invalid field value";
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return InvalidAcroFieldValueError2;
  })(Error)
);
var MultiSelectValueError = (
  /** @class */
  (function(_super) {
    __extends(MultiSelectValueError2, _super);
    function MultiSelectValueError2() {
      var _this = this;
      var msg = "Attempted to select multiple values for single-select field";
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return MultiSelectValueError2;
  })(Error)
);
var MissingDAEntryError = (
  /** @class */
  (function(_super) {
    __extends(MissingDAEntryError2, _super);
    function MissingDAEntryError2(fieldName) {
      var _this = this;
      var msg = "No /DA (default appearance) entry found for field: " + fieldName;
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return MissingDAEntryError2;
  })(Error)
);
var MissingTfOperatorError = (
  /** @class */
  (function(_super) {
    __extends(MissingTfOperatorError2, _super);
    function MissingTfOperatorError2(fieldName) {
      var _this = this;
      var msg = "No Tf operator found for DA of field: " + fieldName;
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return MissingTfOperatorError2;
  })(Error)
);
var NumberParsingError = (
  /** @class */
  (function(_super) {
    __extends(NumberParsingError2, _super);
    function NumberParsingError2(pos, value) {
      var _this = this;
      var msg = "Failed to parse number " + ("(line:" + pos.line + " col:" + pos.column + " offset=" + pos.offset + '): "' + value + '"');
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return NumberParsingError2;
  })(Error)
);
var PDFParsingError = (
  /** @class */
  (function(_super) {
    __extends(PDFParsingError2, _super);
    function PDFParsingError2(pos, details) {
      var _this = this;
      var msg = "Failed to parse PDF document " + ("(line:" + pos.line + " col:" + pos.column + " offset=" + pos.offset + "): " + details);
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return PDFParsingError2;
  })(Error)
);
var NextByteAssertionError = (
  /** @class */
  (function(_super) {
    __extends(NextByteAssertionError2, _super);
    function NextByteAssertionError2(pos, expectedByte, actualByte) {
      var _this = this;
      var msg = "Expected next byte to be " + expectedByte + " but it was actually " + actualByte;
      _this = _super.call(this, pos, msg) || this;
      return _this;
    }
    return NextByteAssertionError2;
  })(PDFParsingError)
);
var PDFObjectParsingError = (
  /** @class */
  (function(_super) {
    __extends(PDFObjectParsingError2, _super);
    function PDFObjectParsingError2(pos, byte) {
      var _this = this;
      var msg = "Failed to parse PDF object starting with the following byte: " + byte;
      _this = _super.call(this, pos, msg) || this;
      return _this;
    }
    return PDFObjectParsingError2;
  })(PDFParsingError)
);
var PDFInvalidObjectParsingError = (
  /** @class */
  (function(_super) {
    __extends(PDFInvalidObjectParsingError2, _super);
    function PDFInvalidObjectParsingError2(pos) {
      var _this = this;
      var msg = "Failed to parse invalid PDF object";
      _this = _super.call(this, pos, msg) || this;
      return _this;
    }
    return PDFInvalidObjectParsingError2;
  })(PDFParsingError)
);
var PDFStreamParsingError = (
  /** @class */
  (function(_super) {
    __extends(PDFStreamParsingError2, _super);
    function PDFStreamParsingError2(pos) {
      var _this = this;
      var msg = "Failed to parse PDF stream";
      _this = _super.call(this, pos, msg) || this;
      return _this;
    }
    return PDFStreamParsingError2;
  })(PDFParsingError)
);
var UnbalancedParenthesisError = (
  /** @class */
  (function(_super) {
    __extends(UnbalancedParenthesisError2, _super);
    function UnbalancedParenthesisError2(pos) {
      var _this = this;
      var msg = "Failed to parse PDF literal string due to unbalanced parenthesis";
      _this = _super.call(this, pos, msg) || this;
      return _this;
    }
    return UnbalancedParenthesisError2;
  })(PDFParsingError)
);
var StalledParserError = (
  /** @class */
  (function(_super) {
    __extends(StalledParserError2, _super);
    function StalledParserError2(pos) {
      var _this = this;
      var msg = "Parser stalled";
      _this = _super.call(this, pos, msg) || this;
      return _this;
    }
    return StalledParserError2;
  })(PDFParsingError)
);
var MissingPDFHeaderError = (
  /** @class */
  (function(_super) {
    __extends(MissingPDFHeaderError2, _super);
    function MissingPDFHeaderError2(pos) {
      var _this = this;
      var msg = "No PDF header found";
      _this = _super.call(this, pos, msg) || this;
      return _this;
    }
    return MissingPDFHeaderError2;
  })(PDFParsingError)
);
var MissingKeywordError = (
  /** @class */
  (function(_super) {
    __extends(MissingKeywordError2, _super);
    function MissingKeywordError2(pos, keyword) {
      var _this = this;
      var msg = "Did not find expected keyword '" + arrayAsString(keyword) + "'";
      _this = _super.call(this, pos, msg) || this;
      return _this;
    }
    return MissingKeywordError2;
  })(PDFParsingError)
);

// node_modules/pdf-lib/es/core/objects/PDFObject.js
var PDFObject = (
  /** @class */
  (function() {
    function PDFObject2() {
    }
    PDFObject2.prototype.clone = function(_context) {
      throw new MethodNotImplementedError(this.constructor.name, "clone");
    };
    PDFObject2.prototype.toString = function() {
      throw new MethodNotImplementedError(this.constructor.name, "toString");
    };
    PDFObject2.prototype.sizeInBytes = function() {
      throw new MethodNotImplementedError(this.constructor.name, "sizeInBytes");
    };
    PDFObject2.prototype.copyBytesInto = function(_buffer, _offset) {
      throw new MethodNotImplementedError(this.constructor.name, "copyBytesInto");
    };
    return PDFObject2;
  })()
);
var PDFObject_default = PDFObject;

// node_modules/pdf-lib/es/core/objects/PDFRef.js
var ENFORCER = {};
var pool = /* @__PURE__ */ new Map();
var PDFRef = (
  /** @class */
  (function(_super) {
    __extends(PDFRef2, _super);
    function PDFRef2(enforcer, objectNumber, generationNumber) {
      var _this = this;
      if (enforcer !== ENFORCER)
        throw new PrivateConstructorError("PDFRef");
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
      offset += copyStringIntoBuffer(this.tag, buffer, offset);
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
  })(PDFObject_default)
);
var PDFRef_default = PDFRef;

// node_modules/pdf-lib/es/core/syntax/CharCodes.js
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
var CharCodes_default = CharCodes;

// node_modules/pdf-lib/es/core/document/PDFCrossRefSection.js
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
          section += padStart(String(entry.offset), 10, "0");
          section += " ";
          section += padStart(String(entry.ref.generationNumber), 5, "0");
          section += " ";
          section += entry.deleted ? "f" : "n";
          section += " \n";
        }
      }
      return section;
    };
    PDFCrossRefSection2.prototype.sizeInBytes = function() {
      var size = 5;
      for (var idx4 = 0, len3 = this.subsections.length; idx4 < len3; idx4++) {
        var subsection = this.subsections[idx4];
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
      buffer[offset++] = CharCodes_default.x;
      buffer[offset++] = CharCodes_default.r;
      buffer[offset++] = CharCodes_default.e;
      buffer[offset++] = CharCodes_default.f;
      buffer[offset++] = CharCodes_default.Newline;
      offset += this.copySubsectionsIntoBuffer(this.subsections, buffer, offset);
      return offset - initialOffset;
    };
    PDFCrossRefSection2.prototype.copySubsectionsIntoBuffer = function(subsections, buffer, offset) {
      var initialOffset = offset;
      var length = subsections.length;
      for (var idx4 = 0; idx4 < length; idx4++) {
        var subsection = this.subsections[idx4];
        var firstObjectNumber = String(subsection[0].ref.objectNumber);
        offset += copyStringIntoBuffer(firstObjectNumber, buffer, offset);
        buffer[offset++] = CharCodes_default.Space;
        var rangeLength = String(subsection.length);
        offset += copyStringIntoBuffer(rangeLength, buffer, offset);
        buffer[offset++] = CharCodes_default.Newline;
        offset += this.copyEntriesIntoBuffer(subsection, buffer, offset);
      }
      return offset - initialOffset;
    };
    PDFCrossRefSection2.prototype.copyEntriesIntoBuffer = function(entries, buffer, offset) {
      var length = entries.length;
      for (var idx4 = 0; idx4 < length; idx4++) {
        var entry = entries[idx4];
        var entryOffset = padStart(String(entry.offset), 10, "0");
        offset += copyStringIntoBuffer(entryOffset, buffer, offset);
        buffer[offset++] = CharCodes_default.Space;
        var entryGen = padStart(String(entry.ref.generationNumber), 5, "0");
        offset += copyStringIntoBuffer(entryGen, buffer, offset);
        buffer[offset++] = CharCodes_default.Space;
        buffer[offset++] = entry.deleted ? CharCodes_default.f : CharCodes_default.n;
        buffer[offset++] = CharCodes_default.Space;
        buffer[offset++] = CharCodes_default.Newline;
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
        ref: PDFRef_default.of(0, 65535),
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
var PDFCrossRefSection_default = PDFCrossRefSection;

// node_modules/pdf-lib/es/core/document/PDFHeader.js
var PDFHeader = (
  /** @class */
  (function() {
    function PDFHeader2(major, minor) {
      this.major = String(major);
      this.minor = String(minor);
    }
    PDFHeader2.prototype.toString = function() {
      var bc = charFromCode(129);
      return "%PDF-" + this.major + "." + this.minor + "\n%" + bc + bc + bc + bc;
    };
    PDFHeader2.prototype.sizeInBytes = function() {
      return 12 + this.major.length + this.minor.length;
    };
    PDFHeader2.prototype.copyBytesInto = function(buffer, offset) {
      var initialOffset = offset;
      buffer[offset++] = CharCodes_default.Percent;
      buffer[offset++] = CharCodes_default.P;
      buffer[offset++] = CharCodes_default.D;
      buffer[offset++] = CharCodes_default.F;
      buffer[offset++] = CharCodes_default.Dash;
      offset += copyStringIntoBuffer(this.major, buffer, offset);
      buffer[offset++] = CharCodes_default.Period;
      offset += copyStringIntoBuffer(this.minor, buffer, offset);
      buffer[offset++] = CharCodes_default.Newline;
      buffer[offset++] = CharCodes_default.Percent;
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
var PDFHeader_default = PDFHeader;

// node_modules/pdf-lib/es/core/document/PDFTrailer.js
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
      buffer[offset++] = CharCodes_default.s;
      buffer[offset++] = CharCodes_default.t;
      buffer[offset++] = CharCodes_default.a;
      buffer[offset++] = CharCodes_default.r;
      buffer[offset++] = CharCodes_default.t;
      buffer[offset++] = CharCodes_default.x;
      buffer[offset++] = CharCodes_default.r;
      buffer[offset++] = CharCodes_default.e;
      buffer[offset++] = CharCodes_default.f;
      buffer[offset++] = CharCodes_default.Newline;
      offset += copyStringIntoBuffer(this.lastXRefOffset, buffer, offset);
      buffer[offset++] = CharCodes_default.Newline;
      buffer[offset++] = CharCodes_default.Percent;
      buffer[offset++] = CharCodes_default.Percent;
      buffer[offset++] = CharCodes_default.E;
      buffer[offset++] = CharCodes_default.O;
      buffer[offset++] = CharCodes_default.F;
      return offset - initialOffset;
    };
    PDFTrailer2.forLastCrossRefSectionOffset = function(offset) {
      return new PDFTrailer2(offset);
    };
    return PDFTrailer2;
  })()
);
var PDFTrailer_default = PDFTrailer;

// node_modules/pdf-lib/es/core/syntax/Delimiters.js
var IsDelimiter = new Uint8Array(256);
IsDelimiter[CharCodes_default.LeftParen] = 1;
IsDelimiter[CharCodes_default.RightParen] = 1;
IsDelimiter[CharCodes_default.LessThan] = 1;
IsDelimiter[CharCodes_default.GreaterThan] = 1;
IsDelimiter[CharCodes_default.LeftSquareBracket] = 1;
IsDelimiter[CharCodes_default.RightSquareBracket] = 1;
IsDelimiter[CharCodes_default.LeftCurly] = 1;
IsDelimiter[CharCodes_default.RightCurly] = 1;
IsDelimiter[CharCodes_default.ForwardSlash] = 1;
IsDelimiter[CharCodes_default.Percent] = 1;

// node_modules/pdf-lib/es/core/syntax/Whitespace.js
var IsWhitespace = new Uint8Array(256);
IsWhitespace[CharCodes_default.Null] = 1;
IsWhitespace[CharCodes_default.Tab] = 1;
IsWhitespace[CharCodes_default.Newline] = 1;
IsWhitespace[CharCodes_default.FormFeed] = 1;
IsWhitespace[CharCodes_default.CarriageReturn] = 1;
IsWhitespace[CharCodes_default.Space] = 1;

// node_modules/pdf-lib/es/core/syntax/Irregular.js
var IsIrregular = new Uint8Array(256);
for (idx2 = 0, len = 256; idx2 < len; idx2++) {
  IsIrregular[idx2] = IsWhitespace[idx2] || IsDelimiter[idx2] ? 1 : 0;
}
var idx2;
var len;
IsIrregular[CharCodes_default.Hash] = 1;

// node_modules/pdf-lib/es/core/objects/PDFName.js
var decodeName = function(name) {
  return name.replace(/#([\dABCDEF]{2})/g, function(_, hex) {
    return charFromHexCode(hex);
  });
};
var isRegularChar = function(charCode) {
  return charCode >= CharCodes_default.ExclamationPoint && charCode <= CharCodes_default.Tilde && !IsIrregular[charCode];
};
var ENFORCER2 = {};
var pool2 = /* @__PURE__ */ new Map();
var PDFName = (
  /** @class */
  (function(_super) {
    __extends(PDFName2, _super);
    function PDFName2(enforcer, name) {
      var _this = this;
      if (enforcer !== ENFORCER2)
        throw new PrivateConstructorError("PDFName");
      _this = _super.call(this) || this;
      var encodedName = "/";
      for (var idx4 = 0, len3 = name.length; idx4 < len3; idx4++) {
        var character = name[idx4];
        var code = toCharCode(character);
        encodedName += isRegularChar(code) ? character : "#" + toHexString(code);
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
      for (var idx4 = 1, len3 = this.encodedName.length; idx4 < len3; idx4++) {
        var char = this.encodedName[idx4];
        var byte = toCharCode(char);
        var nextChar = this.encodedName[idx4 + 1];
        if (!escaped) {
          if (byte === CharCodes_default.Hash)
            escaped = true;
          else
            pushByte(byte);
        } else {
          if (byte >= CharCodes_default.Zero && byte <= CharCodes_default.Nine || byte >= CharCodes_default.a && byte <= CharCodes_default.f || byte >= CharCodes_default.A && byte <= CharCodes_default.F) {
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
      offset += copyStringIntoBuffer(this.encodedName, buffer, offset);
      return this.encodedName.length;
    };
    PDFName2.of = function(name) {
      var decodedValue = decodeName(name);
      var instance = pool2.get(decodedValue);
      if (!instance) {
        instance = new PDFName2(ENFORCER2, decodedValue);
        pool2.set(decodedValue, instance);
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
  })(PDFObject_default)
);
var PDFName_default = PDFName;

// node_modules/pdf-lib/es/core/objects/PDFNull.js
var PDFNull = (
  /** @class */
  (function(_super) {
    __extends(PDFNull2, _super);
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
      buffer[offset++] = CharCodes_default.n;
      buffer[offset++] = CharCodes_default.u;
      buffer[offset++] = CharCodes_default.l;
      buffer[offset++] = CharCodes_default.l;
      return 4;
    };
    return PDFNull2;
  })(PDFObject_default)
);
var PDFNull_default = new PDFNull();

// node_modules/pdf-lib/es/core/objects/PDFDict.js
var PDFDict = (
  /** @class */
  (function(_super) {
    __extends(PDFDict2, _super);
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
      if (value === PDFNull_default && !preservePDFNull)
        return void 0;
      return value;
    };
    PDFDict2.prototype.has = function(key) {
      var value = this.dict.get(key);
      return value !== void 0 && value !== PDFNull_default;
    };
    PDFDict2.prototype.lookupMaybe = function(key) {
      var _a;
      var types = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        types[_i - 1] = arguments[_i];
      }
      var preservePDFNull = types.includes(PDFNull_default);
      var value = (_a = this.context).lookupMaybe.apply(_a, __spreadArrays([this.get(key, preservePDFNull)], types));
      if (value === PDFNull_default && !preservePDFNull)
        return void 0;
      return value;
    };
    PDFDict2.prototype.lookup = function(key) {
      var _a;
      var types = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        types[_i - 1] = arguments[_i];
      }
      var preservePDFNull = types.includes(PDFNull_default);
      var value = (_a = this.context).lookup.apply(_a, __spreadArrays([this.get(key, preservePDFNull)], types));
      if (value === PDFNull_default && !preservePDFNull)
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
      var key = PDFName_default.of(this.context.addRandomSuffix(tag, 10));
      while (existingKeys.includes(key)) {
        key = PDFName_default.of(this.context.addRandomSuffix(tag, 10));
      }
      return key;
    };
    PDFDict2.prototype.clone = function(context) {
      var clone = PDFDict2.withContext(context || this.context);
      var entries = this.entries();
      for (var idx4 = 0, len3 = entries.length; idx4 < len3; idx4++) {
        var _a = entries[idx4], key = _a[0], value = _a[1];
        clone.set(key, value);
      }
      return clone;
    };
    PDFDict2.prototype.toString = function() {
      var dictString = "<<\n";
      var entries = this.entries();
      for (var idx4 = 0, len3 = entries.length; idx4 < len3; idx4++) {
        var _a = entries[idx4], key = _a[0], value = _a[1];
        dictString += key.toString() + " " + value.toString() + "\n";
      }
      dictString += ">>";
      return dictString;
    };
    PDFDict2.prototype.sizeInBytes = function() {
      var size = 5;
      var entries = this.entries();
      for (var idx4 = 0, len3 = entries.length; idx4 < len3; idx4++) {
        var _a = entries[idx4], key = _a[0], value = _a[1];
        size += key.sizeInBytes() + value.sizeInBytes() + 2;
      }
      return size;
    };
    PDFDict2.prototype.copyBytesInto = function(buffer, offset) {
      var initialOffset = offset;
      buffer[offset++] = CharCodes_default.LessThan;
      buffer[offset++] = CharCodes_default.LessThan;
      buffer[offset++] = CharCodes_default.Newline;
      var entries = this.entries();
      for (var idx4 = 0, len3 = entries.length; idx4 < len3; idx4++) {
        var _a = entries[idx4], key = _a[0], value = _a[1];
        offset += key.copyBytesInto(buffer, offset);
        buffer[offset++] = CharCodes_default.Space;
        offset += value.copyBytesInto(buffer, offset);
        buffer[offset++] = CharCodes_default.Newline;
      }
      buffer[offset++] = CharCodes_default.GreaterThan;
      buffer[offset++] = CharCodes_default.GreaterThan;
      return offset - initialOffset;
    };
    PDFDict2.withContext = function(context) {
      return new PDFDict2(/* @__PURE__ */ new Map(), context);
    };
    PDFDict2.fromMapWithContext = function(map, context) {
      return new PDFDict2(map, context);
    };
    return PDFDict2;
  })(PDFObject_default)
);
var PDFDict_default = PDFDict;

// node_modules/pdf-lib/es/core/objects/PDFInvalidObject.js
var PDFInvalidObject = (
  /** @class */
  (function(_super) {
    __extends(PDFInvalidObject2, _super);
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
      for (var idx4 = 0; idx4 < length; idx4++) {
        buffer[offset++] = this.data[idx4];
      }
      return length;
    };
    PDFInvalidObject2.of = function(data) {
      return new PDFInvalidObject2(data);
    };
    return PDFInvalidObject2;
  })(PDFObject_default)
);
var PDFInvalidObject_default = PDFInvalidObject;

// node_modules/pdf-lib/es/core/objects/PDFNumber.js
var PDFNumber = (
  /** @class */
  (function(_super) {
    __extends(PDFNumber2, _super);
    function PDFNumber2(value) {
      var _this = _super.call(this) || this;
      _this.numberValue = value;
      _this.stringValue = numberToString(value);
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
      offset += copyStringIntoBuffer(this.stringValue, buffer, offset);
      return this.stringValue.length;
    };
    PDFNumber2.of = function(value) {
      return new PDFNumber2(value);
    };
    return PDFNumber2;
  })(PDFObject_default)
);
var PDFNumber_default = PDFNumber;

// node_modules/pdf-lib/es/core/objects/PDFStream.js
var PDFStream = (
  /** @class */
  (function(_super) {
    __extends(PDFStream2, _super);
    function PDFStream2(dict) {
      var _this = _super.call(this) || this;
      _this.dict = dict;
      return _this;
    }
    PDFStream2.prototype.clone = function(_context) {
      throw new MethodNotImplementedError(this.constructor.name, "clone");
    };
    PDFStream2.prototype.getContentsString = function() {
      throw new MethodNotImplementedError(this.constructor.name, "getContentsString");
    };
    PDFStream2.prototype.getContents = function() {
      throw new MethodNotImplementedError(this.constructor.name, "getContents");
    };
    PDFStream2.prototype.getContentsSize = function() {
      throw new MethodNotImplementedError(this.constructor.name, "getContentsSize");
    };
    PDFStream2.prototype.updateDict = function() {
      var contentsSize = this.getContentsSize();
      this.dict.set(PDFName_default.Length, PDFNumber_default.of(contentsSize));
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
      buffer[offset++] = CharCodes_default.Newline;
      buffer[offset++] = CharCodes_default.s;
      buffer[offset++] = CharCodes_default.t;
      buffer[offset++] = CharCodes_default.r;
      buffer[offset++] = CharCodes_default.e;
      buffer[offset++] = CharCodes_default.a;
      buffer[offset++] = CharCodes_default.m;
      buffer[offset++] = CharCodes_default.Newline;
      var contents = this.getContents();
      for (var idx4 = 0, len3 = contents.length; idx4 < len3; idx4++) {
        buffer[offset++] = contents[idx4];
      }
      buffer[offset++] = CharCodes_default.Newline;
      buffer[offset++] = CharCodes_default.e;
      buffer[offset++] = CharCodes_default.n;
      buffer[offset++] = CharCodes_default.d;
      buffer[offset++] = CharCodes_default.s;
      buffer[offset++] = CharCodes_default.t;
      buffer[offset++] = CharCodes_default.r;
      buffer[offset++] = CharCodes_default.e;
      buffer[offset++] = CharCodes_default.a;
      buffer[offset++] = CharCodes_default.m;
      return offset - initialOffset;
    };
    return PDFStream2;
  })(PDFObject_default)
);
var PDFStream_default = PDFStream;

// node_modules/pdf-lib/es/core/objects/PDFRawStream.js
var PDFRawStream = (
  /** @class */
  (function(_super) {
    __extends(PDFRawStream2, _super);
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
      return arrayAsString(this.contents);
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
  })(PDFStream_default)
);
var PDFRawStream_default = PDFRawStream;

// node_modules/pdf-lib/es/core/objects/PDFArray.js
var PDFArray = (
  /** @class */
  (function(_super) {
    __extends(PDFArray2, _super);
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
    PDFArray2.prototype.set = function(idx4, object) {
      this.array[idx4] = object;
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
      return (_a = this.context).lookupMaybe.apply(_a, __spreadArrays([this.get(index)], types));
    };
    PDFArray2.prototype.lookup = function(index) {
      var _a;
      var types = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        types[_i - 1] = arguments[_i];
      }
      return (_a = this.context).lookup.apply(_a, __spreadArrays([this.get(index)], types));
    };
    PDFArray2.prototype.asRectangle = function() {
      if (this.size() !== 4)
        throw new PDFArrayIsNotRectangleError(this.size());
      var lowerLeftX = this.lookup(0, PDFNumber_default).asNumber();
      var lowerLeftY = this.lookup(1, PDFNumber_default).asNumber();
      var upperRightX = this.lookup(2, PDFNumber_default).asNumber();
      var upperRightY = this.lookup(3, PDFNumber_default).asNumber();
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
      for (var idx4 = 0, len3 = this.size(); idx4 < len3; idx4++) {
        clone.push(this.array[idx4]);
      }
      return clone;
    };
    PDFArray2.prototype.toString = function() {
      var arrayString = "[ ";
      for (var idx4 = 0, len3 = this.size(); idx4 < len3; idx4++) {
        arrayString += this.get(idx4).toString();
        arrayString += " ";
      }
      arrayString += "]";
      return arrayString;
    };
    PDFArray2.prototype.sizeInBytes = function() {
      var size = 3;
      for (var idx4 = 0, len3 = this.size(); idx4 < len3; idx4++) {
        size += this.get(idx4).sizeInBytes() + 1;
      }
      return size;
    };
    PDFArray2.prototype.copyBytesInto = function(buffer, offset) {
      var initialOffset = offset;
      buffer[offset++] = CharCodes_default.LeftSquareBracket;
      buffer[offset++] = CharCodes_default.Space;
      for (var idx4 = 0, len3 = this.size(); idx4 < len3; idx4++) {
        offset += this.get(idx4).copyBytesInto(buffer, offset);
        buffer[offset++] = CharCodes_default.Space;
      }
      buffer[offset++] = CharCodes_default.RightSquareBracket;
      return offset - initialOffset;
    };
    PDFArray2.prototype.scalePDFNumbers = function(x, y) {
      for (var idx4 = 0, len3 = this.size(); idx4 < len3; idx4++) {
        var el = this.lookup(idx4);
        if (el instanceof PDFNumber_default) {
          var factor = idx4 % 2 === 0 ? x : y;
          this.set(idx4, PDFNumber_default.of(el.asNumber() * factor));
        }
      }
    };
    PDFArray2.withContext = function(context) {
      return new PDFArray2(context);
    };
    return PDFArray2;
  })(PDFObject_default)
);
var PDFArray_default = PDFArray;

// node_modules/pdf-lib/es/core/streams/Stream.js
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
var Stream_default = Stream;

// node_modules/pdf-lib/es/core/streams/DecodeStream.js
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
      return new Stream_default(
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
      throw new MethodNotImplementedError(this.constructor.name, "readBlock");
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
var DecodeStream_default = DecodeStream;

// node_modules/pdf-lib/es/core/streams/Ascii85Stream.js
var isSpace = function(ch) {
  return ch === 32 || ch === 9 || ch === 13 || ch === 10;
};
var Ascii85Stream = (
  /** @class */
  (function(_super) {
    __extends(Ascii85Stream2, _super);
    function Ascii85Stream2(stream2, maybeLength) {
      var _this = _super.call(this, maybeLength) || this;
      _this.stream = stream2;
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
      var stream2 = this.stream;
      var c = stream2.getByte();
      while (isSpace(c)) {
        c = stream2.getByte();
      }
      if (c === EOF || c === TILDA_CHAR) {
        this.eof = true;
        return;
      }
      var bufferLength = this.bufferLength;
      var buffer;
      var i2;
      if (c === Z_LOWER_CHAR) {
        buffer = this.ensureBuffer(bufferLength + 4);
        for (i2 = 0; i2 < 4; ++i2) {
          buffer[bufferLength + i2] = 0;
        }
        this.bufferLength += 4;
      } else {
        var input = this.input;
        input[0] = c;
        for (i2 = 1; i2 < 5; ++i2) {
          c = stream2.getByte();
          while (isSpace(c)) {
            c = stream2.getByte();
          }
          input[i2] = c;
          if (c === EOF || c === TILDA_CHAR) {
            break;
          }
        }
        buffer = this.ensureBuffer(bufferLength + i2 - 1);
        this.bufferLength += i2 - 1;
        if (i2 < 5) {
          for (; i2 < 5; ++i2) {
            input[i2] = 33 + 84;
          }
          this.eof = true;
        }
        var t = 0;
        for (i2 = 0; i2 < 5; ++i2) {
          t = t * 85 + (input[i2] - 33);
        }
        for (i2 = 3; i2 >= 0; --i2) {
          buffer[bufferLength + i2] = t & 255;
          t >>= 8;
        }
      }
    };
    return Ascii85Stream2;
  })(DecodeStream_default)
);
var Ascii85Stream_default = Ascii85Stream;

// node_modules/pdf-lib/es/core/streams/AsciiHexStream.js
var AsciiHexStream = (
  /** @class */
  (function(_super) {
    __extends(AsciiHexStream2, _super);
    function AsciiHexStream2(stream2, maybeLength) {
      var _this = _super.call(this, maybeLength) || this;
      _this.stream = stream2;
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
      for (var i2 = 0, ii = bytes.length; i2 < ii; i2++) {
        var ch = bytes[i2];
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
  })(DecodeStream_default)
);
var AsciiHexStream_default = AsciiHexStream;

// node_modules/pdf-lib/es/core/streams/FlateStream.js
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
    __extends(FlateStream2, _super);
    function FlateStream2(stream2, maybeLength) {
      var _this = _super.call(this, maybeLength) || this;
      _this.stream = stream2;
      var cmf = stream2.getByte();
      var flg = stream2.getByte();
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
      var len3;
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
        var i2 = void 0;
        for (i2 = 0; i2 < numCodeLenCodes; ++i2) {
          codeLenCodeLengths[codeLenCodeMap[i2]] = this.getBits(3);
        }
        var codeLenCodeTab = this.generateHuffmanTable(codeLenCodeLengths);
        len3 = 0;
        i2 = 0;
        var codes = numLitCodes + numDistCodes;
        var codeLengths = new Uint8Array(codes);
        var bitsLength = void 0;
        var bitsOffset = void 0;
        var what = void 0;
        while (i2 < codes) {
          var code = this.getCode(codeLenCodeTab);
          if (code === 16) {
            bitsLength = 2;
            bitsOffset = 3;
            what = len3;
          } else if (code === 17) {
            bitsLength = 3;
            bitsOffset = 3;
            what = len3 = 0;
          } else if (code === 18) {
            bitsLength = 7;
            bitsOffset = 11;
            what = len3 = 0;
          } else {
            codeLengths[i2++] = len3 = code;
            continue;
          }
          var repeatLength = this.getBits(bitsLength) + bitsOffset;
          while (repeatLength-- > 0) {
            codeLengths[i2++] = what;
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
        len3 = (code1 & 65535) + code2;
        code1 = this.getCode(distCodeTable);
        code1 = distDecode[code1];
        code2 = code1 >> 16;
        if (code2 > 0) {
          code2 = this.getBits(code2);
        }
        var dist = (code1 & 65535) + code2;
        if (pos + len3 >= limit) {
          buffer = this.ensureBuffer(pos + len3);
          limit = buffer.length;
        }
        for (var k = 0; k < len3; ++k, ++pos) {
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
      var i2;
      for (i2 = 0; i2 < n; ++i2) {
        if (lengths[i2] > maxLen) {
          maxLen = lengths[i2];
        }
      }
      var size = 1 << maxLen;
      var codes = new Int32Array(size);
      for (var len3 = 1, code = 0, skip = 2; len3 <= maxLen; ++len3, code <<= 1, skip <<= 1) {
        for (var val = 0; val < n; ++val) {
          if (lengths[val] === len3) {
            var code2 = 0;
            var t = code;
            for (i2 = 0; i2 < len3; ++i2) {
              code2 = code2 << 1 | t & 1;
              t >>= 1;
            }
            for (i2 = code2; i2 < size; i2 += skip) {
              codes[i2] = len3 << 16 | val;
            }
            ++code;
          }
        }
      }
      return [codes, maxLen];
    };
    return FlateStream2;
  })(DecodeStream_default)
);
var FlateStream_default = FlateStream;

// node_modules/pdf-lib/es/core/streams/LZWStream.js
var LZWStream = (
  /** @class */
  (function(_super) {
    __extends(LZWStream2, _super);
    function LZWStream2(stream2, maybeLength, earlyChange) {
      var _this = _super.call(this, maybeLength) || this;
      _this.stream = stream2;
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
      for (var i2 = 0; i2 < 256; ++i2) {
        lzwState.dictionaryValues[i2] = i2;
        lzwState.dictionaryLengths[i2] = 1;
      }
      _this.lzwState = lzwState;
      return _this;
    }
    LZWStream2.prototype.readBlock = function() {
      var blockSize = 512;
      var estimatedDecodedSize = blockSize * 2;
      var decodedSizeDelta = blockSize;
      var i2;
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
      for (i2 = 0; i2 < blockSize; i2++) {
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
  })(DecodeStream_default)
);
var LZWStream_default = LZWStream;

// node_modules/pdf-lib/es/core/streams/RunLengthStream.js
var RunLengthStream = (
  /** @class */
  (function(_super) {
    __extends(RunLengthStream2, _super);
    function RunLengthStream2(stream2, maybeLength) {
      var _this = _super.call(this, maybeLength) || this;
      _this.stream = stream2;
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
        for (var i2 = 0; i2 < n; i2++) {
          buffer[bufferLength++] = b;
        }
      }
      this.bufferLength = bufferLength;
    };
    return RunLengthStream2;
  })(DecodeStream_default)
);
var RunLengthStream_default = RunLengthStream;

// node_modules/pdf-lib/es/core/streams/decode.js
var decodeStream = function(stream2, encoding, params) {
  if (encoding === PDFName_default.of("FlateDecode")) {
    return new FlateStream_default(stream2);
  }
  if (encoding === PDFName_default.of("LZWDecode")) {
    var earlyChange = 1;
    if (params instanceof PDFDict_default) {
      var EarlyChange = params.lookup(PDFName_default.of("EarlyChange"));
      if (EarlyChange instanceof PDFNumber_default) {
        earlyChange = EarlyChange.asNumber();
      }
    }
    return new LZWStream_default(stream2, void 0, earlyChange);
  }
  if (encoding === PDFName_default.of("ASCII85Decode")) {
    return new Ascii85Stream_default(stream2);
  }
  if (encoding === PDFName_default.of("ASCIIHexDecode")) {
    return new AsciiHexStream_default(stream2);
  }
  if (encoding === PDFName_default.of("RunLengthDecode")) {
    return new RunLengthStream_default(stream2);
  }
  throw new UnsupportedEncodingError(encoding.asString());
};
var decodePDFRawStream = function(_a) {
  var dict = _a.dict, contents = _a.contents;
  var stream2 = new Stream_default(contents);
  var Filter = dict.lookup(PDFName_default.of("Filter"));
  var DecodeParms = dict.lookup(PDFName_default.of("DecodeParms"));
  if (Filter instanceof PDFName_default) {
    stream2 = decodeStream(stream2, Filter, DecodeParms);
  } else if (Filter instanceof PDFArray_default) {
    for (var idx4 = 0, len3 = Filter.size(); idx4 < len3; idx4++) {
      stream2 = decodeStream(stream2, Filter.lookup(idx4, PDFName_default), DecodeParms && DecodeParms.lookupMaybe(idx4, PDFDict_default));
    }
  } else if (!!Filter) {
    throw new UnexpectedObjectTypeError([PDFName_default, PDFArray_default], Filter);
  }
  return stream2;
};

// node_modules/pdf-lib/es/core/parser/ByteStream.js
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
      if (byte === CharCodes_default.Newline) {
        this.line += 1;
        this.column = 0;
      } else {
        this.column += 1;
      }
      return byte;
    };
    ByteStream2.prototype.assertNext = function(expected) {
      if (this.peek() !== expected) {
        throw new NextByteAssertionError(this.position(), expected, this.peek());
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
      return ByteStream2.of(decodePDFRawStream(rawStream).decode());
    };
    return ByteStream2;
  })()
);
var ByteStream_default = ByteStream;

// node_modules/pdf-lib/es/core/objects/PDFBool.js
var ENFORCER3 = {};
var PDFBool = (
  /** @class */
  (function(_super) {
    __extends(PDFBool2, _super);
    function PDFBool2(enforcer, value) {
      var _this = this;
      if (enforcer !== ENFORCER3)
        throw new PrivateConstructorError("PDFBool");
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
        buffer[offset++] = CharCodes_default.t;
        buffer[offset++] = CharCodes_default.r;
        buffer[offset++] = CharCodes_default.u;
        buffer[offset++] = CharCodes_default.e;
        return 4;
      } else {
        buffer[offset++] = CharCodes_default.f;
        buffer[offset++] = CharCodes_default.a;
        buffer[offset++] = CharCodes_default.l;
        buffer[offset++] = CharCodes_default.s;
        buffer[offset++] = CharCodes_default.e;
        return 5;
      }
    };
    PDFBool2.True = new PDFBool2(ENFORCER3, true);
    PDFBool2.False = new PDFBool2(ENFORCER3, false);
    return PDFBool2;
  })(PDFObject_default)
);
var PDFBool_default = PDFBool;

// node_modules/pdf-lib/es/core/objects/PDFHexString.js
var PDFHexString = (
  /** @class */
  (function(_super) {
    __extends(PDFHexString2, _super);
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
      if (hasUtf16BOM(bytes))
        return utf16Decode(bytes);
      return pdfDocEncodingDecode(bytes);
    };
    PDFHexString2.prototype.decodeDate = function() {
      var text = this.decodeText();
      var date = parseDate(text);
      if (!date)
        throw new InvalidPDFDateStringError(text);
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
      buffer[offset++] = CharCodes_default.LessThan;
      offset += copyStringIntoBuffer(this.value, buffer, offset);
      buffer[offset++] = CharCodes_default.GreaterThan;
      return this.value.length + 2;
    };
    PDFHexString2.of = function(value) {
      return new PDFHexString2(value);
    };
    PDFHexString2.fromText = function(value) {
      var encoded = utf16Encode(value);
      var hex = "";
      for (var idx4 = 0, len3 = encoded.length; idx4 < len3; idx4++) {
        hex += toHexStringOfMinLength(encoded[idx4], 4);
      }
      return new PDFHexString2(hex);
    };
    return PDFHexString2;
  })(PDFObject_default)
);
var PDFHexString_default = PDFHexString;

// node_modules/pdf-lib/es/core/objects/PDFString.js
var PDFString = (
  /** @class */
  (function(_super) {
    __extends(PDFString2, _super);
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
      for (var idx4 = 0, len3 = this.value.length; idx4 < len3; idx4++) {
        var char = this.value[idx4];
        var byte = toCharCode(char);
        var nextChar = this.value[idx4 + 1];
        if (!escaped) {
          if (byte === CharCodes_default.BackSlash)
            escaped = true;
          else
            pushByte(byte);
        } else {
          if (byte === CharCodes_default.Newline)
            pushByte();
          else if (byte === CharCodes_default.CarriageReturn)
            pushByte();
          else if (byte === CharCodes_default.n)
            pushByte(CharCodes_default.Newline);
          else if (byte === CharCodes_default.r)
            pushByte(CharCodes_default.CarriageReturn);
          else if (byte === CharCodes_default.t)
            pushByte(CharCodes_default.Tab);
          else if (byte === CharCodes_default.b)
            pushByte(CharCodes_default.Backspace);
          else if (byte === CharCodes_default.f)
            pushByte(CharCodes_default.FormFeed);
          else if (byte === CharCodes_default.LeftParen)
            pushByte(CharCodes_default.LeftParen);
          else if (byte === CharCodes_default.RightParen)
            pushByte(CharCodes_default.RightParen);
          else if (byte === CharCodes_default.Backspace)
            pushByte(CharCodes_default.BackSlash);
          else if (byte >= CharCodes_default.Zero && byte <= CharCodes_default.Seven) {
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
      if (hasUtf16BOM(bytes))
        return utf16Decode(bytes);
      return pdfDocEncodingDecode(bytes);
    };
    PDFString2.prototype.decodeDate = function() {
      var text = this.decodeText();
      var date = parseDate(text);
      if (!date)
        throw new InvalidPDFDateStringError(text);
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
      buffer[offset++] = CharCodes_default.LeftParen;
      offset += copyStringIntoBuffer(this.value, buffer, offset);
      buffer[offset++] = CharCodes_default.RightParen;
      return this.value.length + 2;
    };
    PDFString2.of = function(value) {
      return new PDFString2(value);
    };
    PDFString2.fromDate = function(date) {
      var year = padStart(String(date.getUTCFullYear()), 4, "0");
      var month = padStart(String(date.getUTCMonth() + 1), 2, "0");
      var day = padStart(String(date.getUTCDate()), 2, "0");
      var hours = padStart(String(date.getUTCHours()), 2, "0");
      var mins = padStart(String(date.getUTCMinutes()), 2, "0");
      var secs = padStart(String(date.getUTCSeconds()), 2, "0");
      return new PDFString2("D:" + year + month + day + hours + mins + secs + "Z");
    };
    return PDFString2;
  })(PDFObject_default)
);
var PDFString_default = PDFString;

// node_modules/pdf-lib/es/core/syntax/Numeric.js
var IsDigit = new Uint8Array(256);
IsDigit[CharCodes_default.Zero] = 1;
IsDigit[CharCodes_default.One] = 1;
IsDigit[CharCodes_default.Two] = 1;
IsDigit[CharCodes_default.Three] = 1;
IsDigit[CharCodes_default.Four] = 1;
IsDigit[CharCodes_default.Five] = 1;
IsDigit[CharCodes_default.Six] = 1;
IsDigit[CharCodes_default.Seven] = 1;
IsDigit[CharCodes_default.Eight] = 1;
IsDigit[CharCodes_default.Nine] = 1;
var IsNumericPrefix = new Uint8Array(256);
IsNumericPrefix[CharCodes_default.Period] = 1;
IsNumericPrefix[CharCodes_default.Plus] = 1;
IsNumericPrefix[CharCodes_default.Minus] = 1;
var IsNumeric = new Uint8Array(256);
for (idx3 = 0, len2 = 256; idx3 < len2; idx3++) {
  IsNumeric[idx3] = IsDigit[idx3] || IsNumericPrefix[idx3] ? 1 : 0;
}
var idx3;
var len2;

// node_modules/pdf-lib/es/core/parser/BaseParser.js
var Newline = CharCodes_default.Newline;
var CarriageReturn = CharCodes_default.CarriageReturn;
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
        if (!IsDigit[byte])
          break;
        value += charFromCode(this.bytes.next());
      }
      var numberValue = Number(value);
      if (!value || !isFinite(numberValue)) {
        throw new NumberParsingError(this.bytes.position(), value);
      }
      return numberValue;
    };
    BaseParser2.prototype.parseRawNumber = function() {
      var value = "";
      while (!this.bytes.done()) {
        var byte = this.bytes.peek();
        if (!IsNumeric[byte])
          break;
        value += charFromCode(this.bytes.next());
        if (byte === CharCodes_default.Period)
          break;
      }
      while (!this.bytes.done()) {
        var byte = this.bytes.peek();
        if (!IsDigit[byte])
          break;
        value += charFromCode(this.bytes.next());
      }
      var numberValue = Number(value);
      if (!value || !isFinite(numberValue)) {
        throw new NumberParsingError(this.bytes.position(), value);
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
      while (!this.bytes.done() && IsWhitespace[this.bytes.peek()]) {
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
      if (this.bytes.peek() !== CharCodes_default.Percent)
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
      for (var idx4 = 0, len3 = keyword.length; idx4 < len3; idx4++) {
        if (this.bytes.done() || this.bytes.next() !== keyword[idx4]) {
          this.bytes.moveTo(initialOffset);
          return false;
        }
      }
      return true;
    };
    return BaseParser2;
  })()
);
var BaseParser_default = BaseParser;

// node_modules/pdf-lib/es/core/acroform/PDFAcroField.js
var tfRegex = /\/([^\0\t\n\f\r\ ]+)[\0\t\n\f\r\ ]*(\d*\.\d+|\d+)?[\0\t\n\f\r\ ]+Tf/;
var PDFAcroField = (
  /** @class */
  (function() {
    function PDFAcroField2(dict, ref) {
      this.dict = dict;
      this.ref = ref;
    }
    PDFAcroField2.prototype.T = function() {
      return this.dict.lookupMaybe(PDFName_default.of("T"), PDFString_default, PDFHexString_default);
    };
    PDFAcroField2.prototype.Ff = function() {
      var numberOrRef = this.getInheritableAttribute(PDFName_default.of("Ff"));
      return this.dict.context.lookupMaybe(numberOrRef, PDFNumber_default);
    };
    PDFAcroField2.prototype.V = function() {
      var valueOrRef = this.getInheritableAttribute(PDFName_default.of("V"));
      return this.dict.context.lookup(valueOrRef);
    };
    PDFAcroField2.prototype.Kids = function() {
      return this.dict.lookupMaybe(PDFName_default.of("Kids"), PDFArray_default);
    };
    PDFAcroField2.prototype.DA = function() {
      var da = this.dict.lookup(PDFName_default.of("DA"));
      if (da instanceof PDFString_default || da instanceof PDFHexString_default)
        return da;
      return void 0;
    };
    PDFAcroField2.prototype.setKids = function(kids) {
      this.dict.set(PDFName_default.of("Kids"), this.dict.context.obj(kids));
    };
    PDFAcroField2.prototype.getParent = function() {
      var parentRef = this.dict.get(PDFName_default.of("Parent"));
      if (parentRef instanceof PDFRef_default) {
        var parent_1 = this.dict.lookup(PDFName_default.of("Parent"), PDFDict_default);
        return new PDFAcroField2(parent_1, parentRef);
      }
      return void 0;
    };
    PDFAcroField2.prototype.setParent = function(parent) {
      if (!parent)
        this.dict.delete(PDFName_default.of("Parent"));
      else
        this.dict.set(PDFName_default.of("Parent"), parent);
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
        this.dict.delete(PDFName_default.of("T"));
      else
        this.dict.set(PDFName_default.of("T"), PDFHexString_default.fromText(partialName));
    };
    PDFAcroField2.prototype.setDefaultAppearance = function(appearance) {
      this.dict.set(PDFName_default.of("DA"), PDFString_default.of(appearance));
    };
    PDFAcroField2.prototype.getDefaultAppearance = function() {
      var DA = this.DA();
      if (DA instanceof PDFHexString_default) {
        return DA.decodeText();
      }
      return DA === null || DA === void 0 ? void 0 : DA.asString();
    };
    PDFAcroField2.prototype.setFontSize = function(fontSize) {
      var _a;
      var name = (_a = this.getFullyQualifiedName()) !== null && _a !== void 0 ? _a : "";
      var da = this.getDefaultAppearance();
      if (!da)
        throw new MissingDAEntryError(name);
      var daMatch = findLastMatch(da, tfRegex);
      if (!daMatch.match)
        throw new MissingTfOperatorError(name);
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
      this.dict.set(PDFName_default.of("Ff"), PDFNumber_default.of(flags));
    };
    PDFAcroField2.prototype.hasFlag = function(flag2) {
      var flags = this.getFlags();
      return (flags & flag2) !== 0;
    };
    PDFAcroField2.prototype.setFlag = function(flag2) {
      var flags = this.getFlags();
      this.setFlags(flags | flag2);
    };
    PDFAcroField2.prototype.clearFlag = function(flag2) {
      var flags = this.getFlags();
      this.setFlags(flags & ~flag2);
    };
    PDFAcroField2.prototype.setFlagTo = function(flag2, enable) {
      if (enable)
        this.setFlag(flag2);
      else
        this.clearFlag(flag2);
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
var PDFAcroField_default = PDFAcroField;

// node_modules/pdf-lib/es/core/annotation/BorderStyle.js
var BorderStyle = (
  /** @class */
  (function() {
    function BorderStyle2(dict) {
      this.dict = dict;
    }
    BorderStyle2.prototype.W = function() {
      var W = this.dict.lookup(PDFName_default.of("W"));
      if (W instanceof PDFNumber_default)
        return W;
      return void 0;
    };
    BorderStyle2.prototype.getWidth = function() {
      var _a, _b;
      return (_b = (_a = this.W()) === null || _a === void 0 ? void 0 : _a.asNumber()) !== null && _b !== void 0 ? _b : 1;
    };
    BorderStyle2.prototype.setWidth = function(width) {
      var W = this.dict.context.obj(width);
      this.dict.set(PDFName_default.of("W"), W);
    };
    BorderStyle2.fromDict = function(dict) {
      return new BorderStyle2(dict);
    };
    return BorderStyle2;
  })()
);
var BorderStyle_default = BorderStyle;

// node_modules/pdf-lib/es/core/annotation/PDFAnnotation.js
var PDFAnnotation = (
  /** @class */
  (function() {
    function PDFAnnotation2(dict) {
      this.dict = dict;
    }
    PDFAnnotation2.prototype.Rect = function() {
      return this.dict.lookup(PDFName_default.of("Rect"), PDFArray_default);
    };
    PDFAnnotation2.prototype.AP = function() {
      return this.dict.lookupMaybe(PDFName_default.of("AP"), PDFDict_default);
    };
    PDFAnnotation2.prototype.F = function() {
      var numberOrRef = this.dict.lookup(PDFName_default.of("F"));
      return this.dict.context.lookupMaybe(numberOrRef, PDFNumber_default);
    };
    PDFAnnotation2.prototype.getRectangle = function() {
      var _a;
      var Rect = this.Rect();
      return (_a = Rect === null || Rect === void 0 ? void 0 : Rect.asRectangle()) !== null && _a !== void 0 ? _a : { x: 0, y: 0, width: 0, height: 0 };
    };
    PDFAnnotation2.prototype.setRectangle = function(rect) {
      var x = rect.x, y = rect.y, width = rect.width, height = rect.height;
      var Rect = this.dict.context.obj([x, y, x + width, y + height]);
      this.dict.set(PDFName_default.of("Rect"), Rect);
    };
    PDFAnnotation2.prototype.getAppearanceState = function() {
      var AS = this.dict.lookup(PDFName_default.of("AS"));
      if (AS instanceof PDFName_default)
        return AS;
      return void 0;
    };
    PDFAnnotation2.prototype.setAppearanceState = function(state) {
      this.dict.set(PDFName_default.of("AS"), state);
    };
    PDFAnnotation2.prototype.setAppearances = function(appearances) {
      this.dict.set(PDFName_default.of("AP"), appearances);
    };
    PDFAnnotation2.prototype.ensureAP = function() {
      var AP = this.AP();
      if (!AP) {
        AP = this.dict.context.obj({});
        this.dict.set(PDFName_default.of("AP"), AP);
      }
      return AP;
    };
    PDFAnnotation2.prototype.getNormalAppearance = function() {
      var AP = this.ensureAP();
      var N = AP.get(PDFName_default.of("N"));
      if (N instanceof PDFRef_default || N instanceof PDFDict_default)
        return N;
      throw new Error("Unexpected N type: " + (N === null || N === void 0 ? void 0 : N.constructor.name));
    };
    PDFAnnotation2.prototype.setNormalAppearance = function(appearance) {
      var AP = this.ensureAP();
      AP.set(PDFName_default.of("N"), appearance);
    };
    PDFAnnotation2.prototype.setRolloverAppearance = function(appearance) {
      var AP = this.ensureAP();
      AP.set(PDFName_default.of("R"), appearance);
    };
    PDFAnnotation2.prototype.setDownAppearance = function(appearance) {
      var AP = this.ensureAP();
      AP.set(PDFName_default.of("D"), appearance);
    };
    PDFAnnotation2.prototype.removeRolloverAppearance = function() {
      var AP = this.AP();
      AP === null || AP === void 0 ? void 0 : AP.delete(PDFName_default.of("R"));
    };
    PDFAnnotation2.prototype.removeDownAppearance = function() {
      var AP = this.AP();
      AP === null || AP === void 0 ? void 0 : AP.delete(PDFName_default.of("D"));
    };
    PDFAnnotation2.prototype.getAppearances = function() {
      var AP = this.AP();
      if (!AP)
        return void 0;
      var N = AP.lookup(PDFName_default.of("N"), PDFDict_default, PDFStream_default);
      var R = AP.lookupMaybe(PDFName_default.of("R"), PDFDict_default, PDFStream_default);
      var D = AP.lookupMaybe(PDFName_default.of("D"), PDFDict_default, PDFStream_default);
      return { normal: N, rollover: R, down: D };
    };
    PDFAnnotation2.prototype.getFlags = function() {
      var _a, _b;
      return (_b = (_a = this.F()) === null || _a === void 0 ? void 0 : _a.asNumber()) !== null && _b !== void 0 ? _b : 0;
    };
    PDFAnnotation2.prototype.setFlags = function(flags) {
      this.dict.set(PDFName_default.of("F"), PDFNumber_default.of(flags));
    };
    PDFAnnotation2.prototype.hasFlag = function(flag2) {
      var flags = this.getFlags();
      return (flags & flag2) !== 0;
    };
    PDFAnnotation2.prototype.setFlag = function(flag2) {
      var flags = this.getFlags();
      this.setFlags(flags | flag2);
    };
    PDFAnnotation2.prototype.clearFlag = function(flag2) {
      var flags = this.getFlags();
      this.setFlags(flags & ~flag2);
    };
    PDFAnnotation2.prototype.setFlagTo = function(flag2, enable) {
      if (enable)
        this.setFlag(flag2);
      else
        this.clearFlag(flag2);
    };
    PDFAnnotation2.fromDict = function(dict) {
      return new PDFAnnotation2(dict);
    };
    return PDFAnnotation2;
  })()
);
var PDFAnnotation_default = PDFAnnotation;

// node_modules/pdf-lib/es/core/annotation/AppearanceCharacteristics.js
var AppearanceCharacteristics = (
  /** @class */
  (function() {
    function AppearanceCharacteristics2(dict) {
      this.dict = dict;
    }
    AppearanceCharacteristics2.prototype.R = function() {
      var R = this.dict.lookup(PDFName_default.of("R"));
      if (R instanceof PDFNumber_default)
        return R;
      return void 0;
    };
    AppearanceCharacteristics2.prototype.BC = function() {
      var BC = this.dict.lookup(PDFName_default.of("BC"));
      if (BC instanceof PDFArray_default)
        return BC;
      return void 0;
    };
    AppearanceCharacteristics2.prototype.BG = function() {
      var BG = this.dict.lookup(PDFName_default.of("BG"));
      if (BG instanceof PDFArray_default)
        return BG;
      return void 0;
    };
    AppearanceCharacteristics2.prototype.CA = function() {
      var CA = this.dict.lookup(PDFName_default.of("CA"));
      if (CA instanceof PDFHexString_default || CA instanceof PDFString_default)
        return CA;
      return void 0;
    };
    AppearanceCharacteristics2.prototype.RC = function() {
      var RC = this.dict.lookup(PDFName_default.of("RC"));
      if (RC instanceof PDFHexString_default || RC instanceof PDFString_default)
        return RC;
      return void 0;
    };
    AppearanceCharacteristics2.prototype.AC = function() {
      var AC = this.dict.lookup(PDFName_default.of("AC"));
      if (AC instanceof PDFHexString_default || AC instanceof PDFString_default)
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
      for (var idx4 = 0, len3 = BC === null || BC === void 0 ? void 0 : BC.size(); idx4 < len3; idx4++) {
        var component = BC.get(idx4);
        if (component instanceof PDFNumber_default)
          components.push(component.asNumber());
      }
      return components;
    };
    AppearanceCharacteristics2.prototype.getBackgroundColor = function() {
      var BG = this.BG();
      if (!BG)
        return void 0;
      var components = [];
      for (var idx4 = 0, len3 = BG === null || BG === void 0 ? void 0 : BG.size(); idx4 < len3; idx4++) {
        var component = BG.get(idx4);
        if (component instanceof PDFNumber_default)
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
      this.dict.set(PDFName_default.of("R"), R);
    };
    AppearanceCharacteristics2.prototype.setBorderColor = function(color) {
      var BC = this.dict.context.obj(color);
      this.dict.set(PDFName_default.of("BC"), BC);
    };
    AppearanceCharacteristics2.prototype.setBackgroundColor = function(color) {
      var BG = this.dict.context.obj(color);
      this.dict.set(PDFName_default.of("BG"), BG);
    };
    AppearanceCharacteristics2.prototype.setCaptions = function(captions) {
      var CA = PDFHexString_default.fromText(captions.normal);
      this.dict.set(PDFName_default.of("CA"), CA);
      if (captions.rollover) {
        var RC = PDFHexString_default.fromText(captions.rollover);
        this.dict.set(PDFName_default.of("RC"), RC);
      } else {
        this.dict.delete(PDFName_default.of("RC"));
      }
      if (captions.down) {
        var AC = PDFHexString_default.fromText(captions.down);
        this.dict.set(PDFName_default.of("AC"), AC);
      } else {
        this.dict.delete(PDFName_default.of("AC"));
      }
    };
    AppearanceCharacteristics2.fromDict = function(dict) {
      return new AppearanceCharacteristics2(dict);
    };
    return AppearanceCharacteristics2;
  })()
);
var AppearanceCharacteristics_default = AppearanceCharacteristics;

// node_modules/pdf-lib/es/core/annotation/PDFWidgetAnnotation.js
var PDFWidgetAnnotation = (
  /** @class */
  (function(_super) {
    __extends(PDFWidgetAnnotation2, _super);
    function PDFWidgetAnnotation2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    PDFWidgetAnnotation2.prototype.MK = function() {
      var MK = this.dict.lookup(PDFName_default.of("MK"));
      if (MK instanceof PDFDict_default)
        return MK;
      return void 0;
    };
    PDFWidgetAnnotation2.prototype.BS = function() {
      var BS = this.dict.lookup(PDFName_default.of("BS"));
      if (BS instanceof PDFDict_default)
        return BS;
      return void 0;
    };
    PDFWidgetAnnotation2.prototype.DA = function() {
      var da = this.dict.lookup(PDFName_default.of("DA"));
      if (da instanceof PDFString_default || da instanceof PDFHexString_default)
        return da;
      return void 0;
    };
    PDFWidgetAnnotation2.prototype.P = function() {
      var P = this.dict.get(PDFName_default.of("P"));
      if (P instanceof PDFRef_default)
        return P;
      return void 0;
    };
    PDFWidgetAnnotation2.prototype.setP = function(page) {
      this.dict.set(PDFName_default.of("P"), page);
    };
    PDFWidgetAnnotation2.prototype.setDefaultAppearance = function(appearance) {
      this.dict.set(PDFName_default.of("DA"), PDFString_default.of(appearance));
    };
    PDFWidgetAnnotation2.prototype.getDefaultAppearance = function() {
      var DA = this.DA();
      if (DA instanceof PDFHexString_default) {
        return DA.decodeText();
      }
      return DA === null || DA === void 0 ? void 0 : DA.asString();
    };
    PDFWidgetAnnotation2.prototype.getAppearanceCharacteristics = function() {
      var MK = this.MK();
      if (MK)
        return AppearanceCharacteristics_default.fromDict(MK);
      return void 0;
    };
    PDFWidgetAnnotation2.prototype.getOrCreateAppearanceCharacteristics = function() {
      var MK = this.MK();
      if (MK)
        return AppearanceCharacteristics_default.fromDict(MK);
      var ac = AppearanceCharacteristics_default.fromDict(this.dict.context.obj({}));
      this.dict.set(PDFName_default.of("MK"), ac.dict);
      return ac;
    };
    PDFWidgetAnnotation2.prototype.getBorderStyle = function() {
      var BS = this.BS();
      if (BS)
        return BorderStyle_default.fromDict(BS);
      return void 0;
    };
    PDFWidgetAnnotation2.prototype.getOrCreateBorderStyle = function() {
      var BS = this.BS();
      if (BS)
        return BorderStyle_default.fromDict(BS);
      var bs = BorderStyle_default.fromDict(this.dict.context.obj({}));
      this.dict.set(PDFName_default.of("BS"), bs.dict);
      return bs;
    };
    PDFWidgetAnnotation2.prototype.getOnValue = function() {
      var _a;
      var normal = (_a = this.getAppearances()) === null || _a === void 0 ? void 0 : _a.normal;
      if (normal instanceof PDFDict_default) {
        var keys = normal.keys();
        for (var idx4 = 0, len3 = keys.length; idx4 < len3; idx4++) {
          var key = keys[idx4];
          if (key !== PDFName_default.of("Off"))
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
  })(PDFAnnotation_default)
);
var PDFWidgetAnnotation_default = PDFWidgetAnnotation;

// node_modules/pdf-lib/es/core/acroform/PDFAcroTerminal.js
var PDFAcroTerminal = (
  /** @class */
  (function(_super) {
    __extends(PDFAcroTerminal2, _super);
    function PDFAcroTerminal2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    PDFAcroTerminal2.prototype.FT = function() {
      var nameOrRef = this.getInheritableAttribute(PDFName_default.of("FT"));
      return this.dict.context.lookup(nameOrRef, PDFName_default);
    };
    PDFAcroTerminal2.prototype.getWidgets = function() {
      var kidDicts = this.Kids();
      if (!kidDicts)
        return [PDFWidgetAnnotation_default.fromDict(this.dict)];
      var widgets = new Array(kidDicts.size());
      for (var idx4 = 0, len3 = kidDicts.size(); idx4 < len3; idx4++) {
        var dict = kidDicts.lookup(idx4, PDFDict_default);
        widgets[idx4] = PDFWidgetAnnotation_default.fromDict(dict);
      }
      return widgets;
    };
    PDFAcroTerminal2.prototype.addWidget = function(ref) {
      var Kids = this.normalizedEntries().Kids;
      Kids.push(ref);
    };
    PDFAcroTerminal2.prototype.removeWidget = function(idx4) {
      var kidDicts = this.Kids();
      if (!kidDicts) {
        if (idx4 !== 0)
          throw new IndexOutOfBoundsError(idx4, 0, 0);
        this.setKids([]);
      } else {
        if (idx4 < 0 || idx4 > kidDicts.size()) {
          throw new IndexOutOfBoundsError(idx4, 0, kidDicts.size());
        }
        kidDicts.remove(idx4);
      }
    };
    PDFAcroTerminal2.prototype.normalizedEntries = function() {
      var Kids = this.Kids();
      if (!Kids) {
        Kids = this.dict.context.obj([this.ref]);
        this.dict.set(PDFName_default.of("Kids"), Kids);
      }
      return { Kids };
    };
    PDFAcroTerminal2.fromDict = function(dict, ref) {
      return new PDFAcroTerminal2(dict, ref);
    };
    return PDFAcroTerminal2;
  })(PDFAcroField_default)
);
var PDFAcroTerminal_default = PDFAcroTerminal;

// node_modules/pdf-lib/es/core/acroform/PDFAcroButton.js
var PDFAcroButton = (
  /** @class */
  (function(_super) {
    __extends(PDFAcroButton2, _super);
    function PDFAcroButton2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    PDFAcroButton2.prototype.Opt = function() {
      return this.dict.lookupMaybe(PDFName_default.of("Opt"), PDFString_default, PDFHexString_default, PDFArray_default);
    };
    PDFAcroButton2.prototype.setOpt = function(opt) {
      this.dict.set(PDFName_default.of("Opt"), this.dict.context.obj(opt));
    };
    PDFAcroButton2.prototype.getExportValues = function() {
      var opt = this.Opt();
      if (!opt)
        return void 0;
      if (opt instanceof PDFString_default || opt instanceof PDFHexString_default) {
        return [opt];
      }
      var values2 = [];
      for (var idx4 = 0, len3 = opt.size(); idx4 < len3; idx4++) {
        var value = opt.lookup(idx4);
        if (value instanceof PDFString_default || value instanceof PDFHexString_default) {
          values2.push(value);
        }
      }
      return values2;
    };
    PDFAcroButton2.prototype.removeExportValue = function(idx4) {
      var opt = this.Opt();
      if (!opt)
        return;
      if (opt instanceof PDFString_default || opt instanceof PDFHexString_default) {
        if (idx4 !== 0)
          throw new IndexOutOfBoundsError(idx4, 0, 0);
        this.setOpt([]);
      } else {
        if (idx4 < 0 || idx4 > opt.size()) {
          throw new IndexOutOfBoundsError(idx4, 0, opt.size());
        }
        opt.remove(idx4);
      }
    };
    PDFAcroButton2.prototype.normalizeExportValues = function() {
      var _a, _b, _c, _d;
      var exportValues = (_a = this.getExportValues()) !== null && _a !== void 0 ? _a : [];
      var Opt = [];
      var widgets = this.getWidgets();
      for (var idx4 = 0, len3 = widgets.length; idx4 < len3; idx4++) {
        var widget = widgets[idx4];
        var exportVal = (_b = exportValues[idx4]) !== null && _b !== void 0 ? _b : PDFHexString_default.fromText((_d = (_c = widget.getOnValue()) === null || _c === void 0 ? void 0 : _c.decodeText()) !== null && _d !== void 0 ? _d : "");
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
        for (var idx4 = 0, len3 = exportValues.length; idx4 < len3; idx4++) {
          var exportVal = exportValues[idx4];
          if (exportVal.decodeText() === optText)
            existingIdx = idx4;
        }
      }
      var Opt = this.Opt();
      Opt.push(opt);
      return existingIdx !== null && existingIdx !== void 0 ? existingIdx : Opt.size() - 1;
    };
    PDFAcroButton2.prototype.addWidgetWithOpt = function(widget, opt, useExistingOptIdx) {
      var optIdx = this.addOpt(opt, useExistingOptIdx);
      var apStateValue = PDFName_default.of(String(optIdx));
      this.addWidget(widget);
      return apStateValue;
    };
    return PDFAcroButton2;
  })(PDFAcroTerminal_default)
);
var PDFAcroButton_default = PDFAcroButton;

// node_modules/pdf-lib/es/core/acroform/PDFAcroCheckBox.js
var PDFAcroCheckBox = (
  /** @class */
  (function(_super) {
    __extends(PDFAcroCheckBox2, _super);
    function PDFAcroCheckBox2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    PDFAcroCheckBox2.prototype.setValue = function(value) {
      var _a;
      var onValue = (_a = this.getOnValue()) !== null && _a !== void 0 ? _a : PDFName_default.of("Yes");
      if (value !== onValue && value !== PDFName_default.of("Off")) {
        throw new InvalidAcroFieldValueError();
      }
      this.dict.set(PDFName_default.of("V"), value);
      var widgets = this.getWidgets();
      for (var idx4 = 0, len3 = widgets.length; idx4 < len3; idx4++) {
        var widget = widgets[idx4];
        var state = widget.getOnValue() === value ? value : PDFName_default.of("Off");
        widget.setAppearanceState(state);
      }
    };
    PDFAcroCheckBox2.prototype.getValue = function() {
      var v = this.V();
      if (v instanceof PDFName_default)
        return v;
      return PDFName_default.of("Off");
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
  })(PDFAcroButton_default)
);
var PDFAcroCheckBox_default = PDFAcroCheckBox;

// node_modules/pdf-lib/es/core/acroform/flags.js
var flag = function(bitIndex) {
  return 1 << bitIndex;
};
var AcroFieldFlags;
(function(AcroFieldFlags2) {
  AcroFieldFlags2[AcroFieldFlags2["ReadOnly"] = flag(1 - 1)] = "ReadOnly";
  AcroFieldFlags2[AcroFieldFlags2["Required"] = flag(2 - 1)] = "Required";
  AcroFieldFlags2[AcroFieldFlags2["NoExport"] = flag(3 - 1)] = "NoExport";
})(AcroFieldFlags || (AcroFieldFlags = {}));
var AcroButtonFlags;
(function(AcroButtonFlags2) {
  AcroButtonFlags2[AcroButtonFlags2["NoToggleToOff"] = flag(15 - 1)] = "NoToggleToOff";
  AcroButtonFlags2[AcroButtonFlags2["Radio"] = flag(16 - 1)] = "Radio";
  AcroButtonFlags2[AcroButtonFlags2["PushButton"] = flag(17 - 1)] = "PushButton";
  AcroButtonFlags2[AcroButtonFlags2["RadiosInUnison"] = flag(26 - 1)] = "RadiosInUnison";
})(AcroButtonFlags || (AcroButtonFlags = {}));
var AcroTextFlags;
(function(AcroTextFlags2) {
  AcroTextFlags2[AcroTextFlags2["Multiline"] = flag(13 - 1)] = "Multiline";
  AcroTextFlags2[AcroTextFlags2["Password"] = flag(14 - 1)] = "Password";
  AcroTextFlags2[AcroTextFlags2["FileSelect"] = flag(21 - 1)] = "FileSelect";
  AcroTextFlags2[AcroTextFlags2["DoNotSpellCheck"] = flag(23 - 1)] = "DoNotSpellCheck";
  AcroTextFlags2[AcroTextFlags2["DoNotScroll"] = flag(24 - 1)] = "DoNotScroll";
  AcroTextFlags2[AcroTextFlags2["Comb"] = flag(25 - 1)] = "Comb";
  AcroTextFlags2[AcroTextFlags2["RichText"] = flag(26 - 1)] = "RichText";
})(AcroTextFlags || (AcroTextFlags = {}));
var AcroChoiceFlags;
(function(AcroChoiceFlags2) {
  AcroChoiceFlags2[AcroChoiceFlags2["Combo"] = flag(18 - 1)] = "Combo";
  AcroChoiceFlags2[AcroChoiceFlags2["Edit"] = flag(19 - 1)] = "Edit";
  AcroChoiceFlags2[AcroChoiceFlags2["Sort"] = flag(20 - 1)] = "Sort";
  AcroChoiceFlags2[AcroChoiceFlags2["MultiSelect"] = flag(22 - 1)] = "MultiSelect";
  AcroChoiceFlags2[AcroChoiceFlags2["DoNotSpellCheck"] = flag(23 - 1)] = "DoNotSpellCheck";
  AcroChoiceFlags2[AcroChoiceFlags2["CommitOnSelChange"] = flag(27 - 1)] = "CommitOnSelChange";
})(AcroChoiceFlags || (AcroChoiceFlags = {}));

// node_modules/pdf-lib/es/core/acroform/PDFAcroChoice.js
var PDFAcroChoice = (
  /** @class */
  (function(_super) {
    __extends(PDFAcroChoice2, _super);
    function PDFAcroChoice2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    PDFAcroChoice2.prototype.setValues = function(values2) {
      if (this.hasFlag(AcroChoiceFlags.Combo) && !this.hasFlag(AcroChoiceFlags.Edit) && !this.valuesAreValid(values2)) {
        throw new InvalidAcroFieldValueError();
      }
      if (values2.length === 0) {
        this.dict.delete(PDFName_default.of("V"));
      }
      if (values2.length === 1) {
        this.dict.set(PDFName_default.of("V"), values2[0]);
      }
      if (values2.length > 1) {
        if (!this.hasFlag(AcroChoiceFlags.MultiSelect)) {
          throw new MultiSelectValueError();
        }
        this.dict.set(PDFName_default.of("V"), this.dict.context.obj(values2));
      }
      this.updateSelectedIndices(values2);
    };
    PDFAcroChoice2.prototype.valuesAreValid = function(values2) {
      var options = this.getOptions();
      var _loop_1 = function(idx5, len4) {
        var val = values2[idx5].decodeText();
        if (!options.find(function(o) {
          return val === (o.display || o.value).decodeText();
        })) {
          return { value: false };
        }
      };
      for (var idx4 = 0, len3 = values2.length; idx4 < len3; idx4++) {
        var state_1 = _loop_1(idx4, len3);
        if (typeof state_1 === "object")
          return state_1.value;
      }
      return true;
    };
    PDFAcroChoice2.prototype.updateSelectedIndices = function(values2) {
      if (values2.length > 1) {
        var indices = new Array(values2.length);
        var options = this.getOptions();
        var _loop_2 = function(idx5, len4) {
          var val = values2[idx5].decodeText();
          indices[idx5] = options.findIndex(function(o) {
            return val === (o.display || o.value).decodeText();
          });
        };
        for (var idx4 = 0, len3 = values2.length; idx4 < len3; idx4++) {
          _loop_2(idx4, len3);
        }
        this.dict.set(PDFName_default.of("I"), this.dict.context.obj(indices.sort()));
      } else {
        this.dict.delete(PDFName_default.of("I"));
      }
    };
    PDFAcroChoice2.prototype.getValues = function() {
      var v = this.V();
      if (v instanceof PDFString_default || v instanceof PDFHexString_default)
        return [v];
      if (v instanceof PDFArray_default) {
        var values2 = [];
        for (var idx4 = 0, len3 = v.size(); idx4 < len3; idx4++) {
          var value = v.lookup(idx4);
          if (value instanceof PDFString_default || value instanceof PDFHexString_default) {
            values2.push(value);
          }
        }
        return values2;
      }
      return [];
    };
    PDFAcroChoice2.prototype.Opt = function() {
      return this.dict.lookupMaybe(PDFName_default.of("Opt"), PDFString_default, PDFHexString_default, PDFArray_default);
    };
    PDFAcroChoice2.prototype.setOptions = function(options) {
      var newOpt = new Array(options.length);
      for (var idx4 = 0, len3 = options.length; idx4 < len3; idx4++) {
        var _a = options[idx4], value = _a.value, display = _a.display;
        newOpt[idx4] = this.dict.context.obj([value, display || value]);
      }
      this.dict.set(PDFName_default.of("Opt"), this.dict.context.obj(newOpt));
    };
    PDFAcroChoice2.prototype.getOptions = function() {
      var Opt = this.Opt();
      if (Opt instanceof PDFString_default || Opt instanceof PDFHexString_default) {
        return [{ value: Opt, display: Opt }];
      }
      if (Opt instanceof PDFArray_default) {
        var res = [];
        for (var idx4 = 0, len3 = Opt.size(); idx4 < len3; idx4++) {
          var item = Opt.lookup(idx4);
          if (item instanceof PDFString_default || item instanceof PDFHexString_default) {
            res.push({ value: item, display: item });
          }
          if (item instanceof PDFArray_default) {
            if (item.size() > 0) {
              var first = item.lookup(0, PDFString_default, PDFHexString_default);
              var second = item.lookupMaybe(1, PDFString_default, PDFHexString_default);
              res.push({ value: first, display: second || first });
            }
          }
        }
        return res;
      }
      return [];
    };
    return PDFAcroChoice2;
  })(PDFAcroTerminal_default)
);
var PDFAcroChoice_default = PDFAcroChoice;

// node_modules/pdf-lib/es/core/acroform/PDFAcroComboBox.js
var PDFAcroComboBox = (
  /** @class */
  (function(_super) {
    __extends(PDFAcroComboBox2, _super);
    function PDFAcroComboBox2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    PDFAcroComboBox2.fromDict = function(dict, ref) {
      return new PDFAcroComboBox2(dict, ref);
    };
    PDFAcroComboBox2.create = function(context) {
      var dict = context.obj({
        FT: "Ch",
        Ff: AcroChoiceFlags.Combo,
        Kids: []
      });
      var ref = context.register(dict);
      return new PDFAcroComboBox2(dict, ref);
    };
    return PDFAcroComboBox2;
  })(PDFAcroChoice_default)
);
var PDFAcroComboBox_default = PDFAcroComboBox;

// node_modules/pdf-lib/es/core/acroform/PDFAcroNonTerminal.js
var PDFAcroNonTerminal = (
  /** @class */
  (function(_super) {
    __extends(PDFAcroNonTerminal2, _super);
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
        this.dict.set(PDFName_default.of("Kids"), Kids);
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
  })(PDFAcroField_default)
);
var PDFAcroNonTerminal_default = PDFAcroNonTerminal;

// node_modules/pdf-lib/es/core/acroform/PDFAcroSignature.js
var PDFAcroSignature = (
  /** @class */
  (function(_super) {
    __extends(PDFAcroSignature2, _super);
    function PDFAcroSignature2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    PDFAcroSignature2.fromDict = function(dict, ref) {
      return new PDFAcroSignature2(dict, ref);
    };
    return PDFAcroSignature2;
  })(PDFAcroTerminal_default)
);
var PDFAcroSignature_default = PDFAcroSignature;

// node_modules/pdf-lib/es/core/acroform/PDFAcroText.js
var PDFAcroText = (
  /** @class */
  (function(_super) {
    __extends(PDFAcroText2, _super);
    function PDFAcroText2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    PDFAcroText2.prototype.MaxLen = function() {
      var maxLen = this.dict.lookup(PDFName_default.of("MaxLen"));
      if (maxLen instanceof PDFNumber_default)
        return maxLen;
      return void 0;
    };
    PDFAcroText2.prototype.Q = function() {
      var q = this.dict.lookup(PDFName_default.of("Q"));
      if (q instanceof PDFNumber_default)
        return q;
      return void 0;
    };
    PDFAcroText2.prototype.setMaxLength = function(maxLength) {
      this.dict.set(PDFName_default.of("MaxLen"), PDFNumber_default.of(maxLength));
    };
    PDFAcroText2.prototype.removeMaxLength = function() {
      this.dict.delete(PDFName_default.of("MaxLen"));
    };
    PDFAcroText2.prototype.getMaxLength = function() {
      var _a;
      return (_a = this.MaxLen()) === null || _a === void 0 ? void 0 : _a.asNumber();
    };
    PDFAcroText2.prototype.setQuadding = function(quadding) {
      this.dict.set(PDFName_default.of("Q"), PDFNumber_default.of(quadding));
    };
    PDFAcroText2.prototype.getQuadding = function() {
      var _a;
      return (_a = this.Q()) === null || _a === void 0 ? void 0 : _a.asNumber();
    };
    PDFAcroText2.prototype.setValue = function(value) {
      this.dict.set(PDFName_default.of("V"), value);
    };
    PDFAcroText2.prototype.removeValue = function() {
      this.dict.delete(PDFName_default.of("V"));
    };
    PDFAcroText2.prototype.getValue = function() {
      var v = this.V();
      if (v instanceof PDFString_default || v instanceof PDFHexString_default)
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
  })(PDFAcroTerminal_default)
);
var PDFAcroText_default = PDFAcroText;

// node_modules/pdf-lib/es/core/acroform/PDFAcroPushButton.js
var PDFAcroPushButton = (
  /** @class */
  (function(_super) {
    __extends(PDFAcroPushButton2, _super);
    function PDFAcroPushButton2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    PDFAcroPushButton2.fromDict = function(dict, ref) {
      return new PDFAcroPushButton2(dict, ref);
    };
    PDFAcroPushButton2.create = function(context) {
      var dict = context.obj({
        FT: "Btn",
        Ff: AcroButtonFlags.PushButton,
        Kids: []
      });
      var ref = context.register(dict);
      return new PDFAcroPushButton2(dict, ref);
    };
    return PDFAcroPushButton2;
  })(PDFAcroButton_default)
);
var PDFAcroPushButton_default = PDFAcroPushButton;

// node_modules/pdf-lib/es/core/acroform/PDFAcroRadioButton.js
var PDFAcroRadioButton = (
  /** @class */
  (function(_super) {
    __extends(PDFAcroRadioButton2, _super);
    function PDFAcroRadioButton2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    PDFAcroRadioButton2.prototype.setValue = function(value) {
      var onValues = this.getOnValues();
      if (!onValues.includes(value) && value !== PDFName_default.of("Off")) {
        throw new InvalidAcroFieldValueError();
      }
      this.dict.set(PDFName_default.of("V"), value);
      var widgets = this.getWidgets();
      for (var idx4 = 0, len3 = widgets.length; idx4 < len3; idx4++) {
        var widget = widgets[idx4];
        var state = widget.getOnValue() === value ? value : PDFName_default.of("Off");
        widget.setAppearanceState(state);
      }
    };
    PDFAcroRadioButton2.prototype.getValue = function() {
      var v = this.V();
      if (v instanceof PDFName_default)
        return v;
      return PDFName_default.of("Off");
    };
    PDFAcroRadioButton2.prototype.getOnValues = function() {
      var widgets = this.getWidgets();
      var onValues = [];
      for (var idx4 = 0, len3 = widgets.length; idx4 < len3; idx4++) {
        var onValue = widgets[idx4].getOnValue();
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
        Ff: AcroButtonFlags.Radio,
        Kids: []
      });
      var ref = context.register(dict);
      return new PDFAcroRadioButton2(dict, ref);
    };
    return PDFAcroRadioButton2;
  })(PDFAcroButton_default)
);
var PDFAcroRadioButton_default = PDFAcroRadioButton;

// node_modules/pdf-lib/es/core/acroform/PDFAcroListBox.js
var PDFAcroListBox = (
  /** @class */
  (function(_super) {
    __extends(PDFAcroListBox2, _super);
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
  })(PDFAcroChoice_default)
);
var PDFAcroListBox_default = PDFAcroListBox;

// node_modules/pdf-lib/es/core/acroform/utils.js
var createPDFAcroFields = function(kidDicts) {
  if (!kidDicts)
    return [];
  var kids = [];
  for (var idx4 = 0, len3 = kidDicts.size(); idx4 < len3; idx4++) {
    var ref = kidDicts.get(idx4);
    var dict = kidDicts.lookup(idx4);
    if (ref instanceof PDFRef_default && dict instanceof PDFDict_default) {
      kids.push([createPDFAcroField(dict, ref), ref]);
    }
  }
  return kids;
};
var createPDFAcroField = function(dict, ref) {
  var isNonTerminal = isNonTerminalAcroField(dict);
  if (isNonTerminal)
    return PDFAcroNonTerminal_default.fromDict(dict, ref);
  return createPDFAcroTerminal(dict, ref);
};
var isNonTerminalAcroField = function(dict) {
  var kids = dict.lookup(PDFName_default.of("Kids"));
  if (kids instanceof PDFArray_default) {
    for (var idx4 = 0, len3 = kids.size(); idx4 < len3; idx4++) {
      var kid = kids.lookup(idx4);
      var kidIsField = kid instanceof PDFDict_default && kid.has(PDFName_default.of("T"));
      if (kidIsField)
        return true;
    }
  }
  return false;
};
var createPDFAcroTerminal = function(dict, ref) {
  var ftNameOrRef = getInheritableAttribute(dict, PDFName_default.of("FT"));
  var type = dict.context.lookup(ftNameOrRef, PDFName_default);
  if (type === PDFName_default.of("Btn"))
    return createPDFAcroButton(dict, ref);
  if (type === PDFName_default.of("Ch"))
    return createPDFAcroChoice(dict, ref);
  if (type === PDFName_default.of("Tx"))
    return PDFAcroText_default.fromDict(dict, ref);
  if (type === PDFName_default.of("Sig"))
    return PDFAcroSignature_default.fromDict(dict, ref);
  return PDFAcroTerminal_default.fromDict(dict, ref);
};
var createPDFAcroButton = function(dict, ref) {
  var _a;
  var ffNumberOrRef = getInheritableAttribute(dict, PDFName_default.of("Ff"));
  var ffNumber = dict.context.lookupMaybe(ffNumberOrRef, PDFNumber_default);
  var flags = (_a = ffNumber === null || ffNumber === void 0 ? void 0 : ffNumber.asNumber()) !== null && _a !== void 0 ? _a : 0;
  if (flagIsSet(flags, AcroButtonFlags.PushButton)) {
    return PDFAcroPushButton_default.fromDict(dict, ref);
  } else if (flagIsSet(flags, AcroButtonFlags.Radio)) {
    return PDFAcroRadioButton_default.fromDict(dict, ref);
  } else {
    return PDFAcroCheckBox_default.fromDict(dict, ref);
  }
};
var createPDFAcroChoice = function(dict, ref) {
  var _a;
  var ffNumberOrRef = getInheritableAttribute(dict, PDFName_default.of("Ff"));
  var ffNumber = dict.context.lookupMaybe(ffNumberOrRef, PDFNumber_default);
  var flags = (_a = ffNumber === null || ffNumber === void 0 ? void 0 : ffNumber.asNumber()) !== null && _a !== void 0 ? _a : 0;
  if (flagIsSet(flags, AcroChoiceFlags.Combo)) {
    return PDFAcroComboBox_default.fromDict(dict, ref);
  } else {
    return PDFAcroListBox_default.fromDict(dict, ref);
  }
};
var flagIsSet = function(flags, flag2) {
  return (flags & flag2) !== 0;
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
  var Parent = startNode.lookupMaybe(PDFName_default.of("Parent"), PDFDict_default);
  if (Parent)
    ascend(Parent, visitor);
};

// node_modules/pdf-lib/es/core/acroform/PDFAcroForm.js
var PDFAcroForm = (
  /** @class */
  (function() {
    function PDFAcroForm2(dict) {
      this.dict = dict;
    }
    PDFAcroForm2.prototype.Fields = function() {
      var fields = this.dict.lookup(PDFName_default.of("Fields"));
      if (fields instanceof PDFArray_default)
        return fields;
      return void 0;
    };
    PDFAcroForm2.prototype.getFields = function() {
      var Fields = this.normalizedEntries().Fields;
      var fields = new Array(Fields.size());
      for (var idx4 = 0, len3 = Fields.size(); idx4 < len3; idx4++) {
        var ref = Fields.get(idx4);
        var dict = Fields.lookup(idx4, PDFDict_default);
        fields[idx4] = [createPDFAcroField(dict, ref), ref];
      }
      return fields;
    };
    PDFAcroForm2.prototype.getAllFields = function() {
      var allFields = [];
      var pushFields = function(fields) {
        if (!fields)
          return;
        for (var idx4 = 0, len3 = fields.length; idx4 < len3; idx4++) {
          var field = fields[idx4];
          allFields.push(field);
          var fieldModel = field[0];
          if (fieldModel instanceof PDFAcroNonTerminal_default) {
            pushFields(createPDFAcroFields(fieldModel.Kids()));
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
        this.dict.set(PDFName_default.of("Fields"), Fields);
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
var PDFAcroForm_default = PDFAcroForm;

// node_modules/pdf-lib/es/core/interactive/ViewerPreferences.js
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
})(NonFullScreenPageMode || (NonFullScreenPageMode = {}));
var ReadingDirection;
(function(ReadingDirection2) {
  ReadingDirection2["L2R"] = "L2R";
  ReadingDirection2["R2L"] = "R2L";
})(ReadingDirection || (ReadingDirection = {}));
var PrintScaling;
(function(PrintScaling2) {
  PrintScaling2["None"] = "None";
  PrintScaling2["AppDefault"] = "AppDefault";
})(PrintScaling || (PrintScaling = {}));
var Duplex;
(function(Duplex2) {
  Duplex2["Simplex"] = "Simplex";
  Duplex2["DuplexFlipShortEdge"] = "DuplexFlipShortEdge";
  Duplex2["DuplexFlipLongEdge"] = "DuplexFlipLongEdge";
})(Duplex || (Duplex = {}));
var ViewerPreferences = (
  /** @class */
  (function() {
    function ViewerPreferences2(dict) {
      this.dict = dict;
    }
    ViewerPreferences2.prototype.lookupBool = function(key) {
      var returnObj = this.dict.lookup(PDFName_default.of(key));
      if (returnObj instanceof PDFBool_default)
        return returnObj;
      return void 0;
    };
    ViewerPreferences2.prototype.lookupName = function(key) {
      var returnObj = this.dict.lookup(PDFName_default.of(key));
      if (returnObj instanceof PDFName_default)
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
      var PrintPageRange = this.dict.lookup(PDFName_default.of("PrintPageRange"));
      if (PrintPageRange instanceof PDFArray_default)
        return PrintPageRange;
      return void 0;
    };
    ViewerPreferences2.prototype.NumCopies = function() {
      var NumCopies = this.dict.lookup(PDFName_default.of("NumCopies"));
      if (NumCopies instanceof PDFNumber_default)
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
      for (var i2 = 0; i2 < rng.size(); i2 += 2) {
        var start = rng.lookup(i2, PDFNumber_default).asNumber();
        var end = rng.lookup(i2 + 1, PDFNumber_default).asNumber();
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
      this.dict.set(PDFName_default.of("HideToolbar"), HideToolbar);
    };
    ViewerPreferences2.prototype.setHideMenubar = function(hideMenubar) {
      var HideMenubar = this.dict.context.obj(hideMenubar);
      this.dict.set(PDFName_default.of("HideMenubar"), HideMenubar);
    };
    ViewerPreferences2.prototype.setHideWindowUI = function(hideWindowUI) {
      var HideWindowUI = this.dict.context.obj(hideWindowUI);
      this.dict.set(PDFName_default.of("HideWindowUI"), HideWindowUI);
    };
    ViewerPreferences2.prototype.setFitWindow = function(fitWindow) {
      var FitWindow = this.dict.context.obj(fitWindow);
      this.dict.set(PDFName_default.of("FitWindow"), FitWindow);
    };
    ViewerPreferences2.prototype.setCenterWindow = function(centerWindow) {
      var CenterWindow = this.dict.context.obj(centerWindow);
      this.dict.set(PDFName_default.of("CenterWindow"), CenterWindow);
    };
    ViewerPreferences2.prototype.setDisplayDocTitle = function(displayTitle) {
      var DisplayDocTitle = this.dict.context.obj(displayTitle);
      this.dict.set(PDFName_default.of("DisplayDocTitle"), DisplayDocTitle);
    };
    ViewerPreferences2.prototype.setNonFullScreenPageMode = function(nonFullScreenPageMode) {
      assertIsOneOf(nonFullScreenPageMode, "nonFullScreenPageMode", NonFullScreenPageMode);
      var mode = PDFName_default.of(nonFullScreenPageMode);
      this.dict.set(PDFName_default.of("NonFullScreenPageMode"), mode);
    };
    ViewerPreferences2.prototype.setReadingDirection = function(readingDirection) {
      assertIsOneOf(readingDirection, "readingDirection", ReadingDirection);
      var direction = PDFName_default.of(readingDirection);
      this.dict.set(PDFName_default.of("Direction"), direction);
    };
    ViewerPreferences2.prototype.setPrintScaling = function(printScaling) {
      assertIsOneOf(printScaling, "printScaling", PrintScaling);
      var scaling = PDFName_default.of(printScaling);
      this.dict.set(PDFName_default.of("PrintScaling"), scaling);
    };
    ViewerPreferences2.prototype.setDuplex = function(duplex) {
      assertIsOneOf(duplex, "duplex", Duplex);
      var dup = PDFName_default.of(duplex);
      this.dict.set(PDFName_default.of("Duplex"), dup);
    };
    ViewerPreferences2.prototype.setPickTrayByPDFSize = function(pickTrayByPDFSize) {
      var PickTrayByPDFSize = this.dict.context.obj(pickTrayByPDFSize);
      this.dict.set(PDFName_default.of("PickTrayByPDFSize"), PickTrayByPDFSize);
    };
    ViewerPreferences2.prototype.setPrintPageRange = function(printPageRange) {
      if (!Array.isArray(printPageRange))
        printPageRange = [printPageRange];
      var flatRange = [];
      for (var idx4 = 0, len3 = printPageRange.length; idx4 < len3; idx4++) {
        flatRange.push(printPageRange[idx4].start);
        flatRange.push(printPageRange[idx4].end);
      }
      assertEachIs(flatRange, "printPageRange", ["number"]);
      var pageRanges = this.dict.context.obj(flatRange);
      this.dict.set(PDFName_default.of("PrintPageRange"), pageRanges);
    };
    ViewerPreferences2.prototype.setNumCopies = function(numCopies) {
      assertRange(numCopies, "numCopies", 1, Number.MAX_VALUE);
      assertInteger(numCopies, "numCopies");
      var NumCopies = this.dict.context.obj(numCopies);
      this.dict.set(PDFName_default.of("NumCopies"), NumCopies);
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
var ViewerPreferences_default = ViewerPreferences;

// node_modules/pdf-lib/es/core/structures/PDFCatalog.js
var PDFCatalog = (
  /** @class */
  (function(_super) {
    __extends(PDFCatalog2, _super);
    function PDFCatalog2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    PDFCatalog2.prototype.Pages = function() {
      return this.lookup(PDFName_default.of("Pages"), PDFDict_default);
    };
    PDFCatalog2.prototype.AcroForm = function() {
      return this.lookupMaybe(PDFName_default.of("AcroForm"), PDFDict_default);
    };
    PDFCatalog2.prototype.getAcroForm = function() {
      var dict = this.AcroForm();
      if (!dict)
        return void 0;
      return PDFAcroForm_default.fromDict(dict);
    };
    PDFCatalog2.prototype.getOrCreateAcroForm = function() {
      var acroForm = this.getAcroForm();
      if (!acroForm) {
        acroForm = PDFAcroForm_default.create(this.context);
        var acroFormRef = this.context.register(acroForm.dict);
        this.set(PDFName_default.of("AcroForm"), acroFormRef);
      }
      return acroForm;
    };
    PDFCatalog2.prototype.ViewerPreferences = function() {
      return this.lookupMaybe(PDFName_default.of("ViewerPreferences"), PDFDict_default);
    };
    PDFCatalog2.prototype.getViewerPreferences = function() {
      var dict = this.ViewerPreferences();
      if (!dict)
        return void 0;
      return ViewerPreferences_default.fromDict(dict);
    };
    PDFCatalog2.prototype.getOrCreateViewerPreferences = function() {
      var viewerPrefs = this.getViewerPreferences();
      if (!viewerPrefs) {
        viewerPrefs = ViewerPreferences_default.create(this.context);
        var viewerPrefsRef = this.context.register(viewerPrefs.dict);
        this.set(PDFName_default.of("ViewerPreferences"), viewerPrefsRef);
      }
      return viewerPrefs;
    };
    PDFCatalog2.prototype.insertLeafNode = function(leafRef, index) {
      var pagesRef = this.get(PDFName_default.of("Pages"));
      var maybeParentRef = this.Pages().insertLeafNode(leafRef, index);
      return maybeParentRef || pagesRef;
    };
    PDFCatalog2.prototype.removeLeafNode = function(index) {
      this.Pages().removeLeafNode(index);
    };
    PDFCatalog2.withContextAndPages = function(context, pages) {
      var dict = /* @__PURE__ */ new Map();
      dict.set(PDFName_default.of("Type"), PDFName_default.of("Catalog"));
      dict.set(PDFName_default.of("Pages"), pages);
      return new PDFCatalog2(dict, context);
    };
    PDFCatalog2.fromMapWithContext = function(map, context) {
      return new PDFCatalog2(map, context);
    };
    return PDFCatalog2;
  })(PDFDict_default)
);
var PDFCatalog_default = PDFCatalog;

// node_modules/pdf-lib/es/core/structures/PDFPageLeaf.js
var PDFPageLeaf = (
  /** @class */
  (function(_super) {
    __extends(PDFPageLeaf2, _super);
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
      for (var idx4 = 0, len3 = entries.length; idx4 < len3; idx4++) {
        var _a = entries[idx4], key = _a[0], value = _a[1];
        clone.set(key, value);
      }
      return clone;
    };
    PDFPageLeaf2.prototype.Parent = function() {
      return this.lookupMaybe(PDFName_default.Parent, PDFDict_default);
    };
    PDFPageLeaf2.prototype.Contents = function() {
      return this.lookup(PDFName_default.of("Contents"));
    };
    PDFPageLeaf2.prototype.Annots = function() {
      return this.lookupMaybe(PDFName_default.Annots, PDFArray_default);
    };
    PDFPageLeaf2.prototype.BleedBox = function() {
      return this.lookupMaybe(PDFName_default.BleedBox, PDFArray_default);
    };
    PDFPageLeaf2.prototype.TrimBox = function() {
      return this.lookupMaybe(PDFName_default.TrimBox, PDFArray_default);
    };
    PDFPageLeaf2.prototype.ArtBox = function() {
      return this.lookupMaybe(PDFName_default.ArtBox, PDFArray_default);
    };
    PDFPageLeaf2.prototype.Resources = function() {
      var dictOrRef = this.getInheritableAttribute(PDFName_default.Resources);
      return this.context.lookupMaybe(dictOrRef, PDFDict_default);
    };
    PDFPageLeaf2.prototype.MediaBox = function() {
      var arrayOrRef = this.getInheritableAttribute(PDFName_default.MediaBox);
      return this.context.lookup(arrayOrRef, PDFArray_default);
    };
    PDFPageLeaf2.prototype.CropBox = function() {
      var arrayOrRef = this.getInheritableAttribute(PDFName_default.CropBox);
      return this.context.lookupMaybe(arrayOrRef, PDFArray_default);
    };
    PDFPageLeaf2.prototype.Rotate = function() {
      var numberOrRef = this.getInheritableAttribute(PDFName_default.Rotate);
      return this.context.lookupMaybe(numberOrRef, PDFNumber_default);
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
      this.set(PDFName_default.Parent, parentRef);
    };
    PDFPageLeaf2.prototype.addContentStream = function(contentStreamRef) {
      var Contents = this.normalizedEntries().Contents || this.context.obj([]);
      this.set(PDFName_default.Contents, Contents);
      Contents.push(contentStreamRef);
    };
    PDFPageLeaf2.prototype.wrapContentStreams = function(startStream, endStream) {
      var Contents = this.Contents();
      if (Contents instanceof PDFArray_default) {
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
      var contentsRef = this.get(PDFName_default.Contents);
      var contents = this.context.lookup(contentsRef);
      if (contents instanceof PDFStream_default) {
        this.set(PDFName_default.Contents, context.obj([contentsRef]));
      }
      if (this.autoNormalizeCTM) {
        this.wrapContentStreams(this.context.getPushGraphicsStateContentStream(), this.context.getPopGraphicsStateContentStream());
      }
      var dictOrRef = this.getInheritableAttribute(PDFName_default.Resources);
      var Resources = context.lookupMaybe(dictOrRef, PDFDict_default) || context.obj({});
      this.set(PDFName_default.Resources, Resources);
      var Font = Resources.lookupMaybe(PDFName_default.Font, PDFDict_default) || context.obj({});
      Resources.set(PDFName_default.Font, Font);
      var XObject = Resources.lookupMaybe(PDFName_default.XObject, PDFDict_default) || context.obj({});
      Resources.set(PDFName_default.XObject, XObject);
      var ExtGState = Resources.lookupMaybe(PDFName_default.ExtGState, PDFDict_default) || context.obj({});
      Resources.set(PDFName_default.ExtGState, ExtGState);
      var Annots = this.Annots() || context.obj([]);
      this.set(PDFName_default.Annots, Annots);
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
        Font: Resources.lookup(PDFName_default.Font, PDFDict_default),
        XObject: Resources.lookup(PDFName_default.XObject, PDFDict_default),
        ExtGState: Resources.lookup(PDFName_default.ExtGState, PDFDict_default)
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
      dict.set(PDFName_default.Type, PDFName_default.Page);
      dict.set(PDFName_default.Parent, parent);
      dict.set(PDFName_default.Resources, context.obj({}));
      dict.set(PDFName_default.MediaBox, context.obj([0, 0, 612, 792]));
      return new PDFPageLeaf2(dict, context, false);
    };
    PDFPageLeaf2.fromMapWithContext = function(map, context, autoNormalizeCTM) {
      if (autoNormalizeCTM === void 0) {
        autoNormalizeCTM = true;
      }
      return new PDFPageLeaf2(map, context, autoNormalizeCTM);
    };
    return PDFPageLeaf2;
  })(PDFDict_default)
);
var PDFPageLeaf_default = PDFPageLeaf;

// node_modules/pdf-lib/es/core/structures/PDFPageTree.js
var PDFPageTree = (
  /** @class */
  (function(_super) {
    __extends(PDFPageTree2, _super);
    function PDFPageTree2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    PDFPageTree2.prototype.Parent = function() {
      return this.lookup(PDFName_default.of("Parent"));
    };
    PDFPageTree2.prototype.Kids = function() {
      return this.lookup(PDFName_default.of("Kids"), PDFArray_default);
    };
    PDFPageTree2.prototype.Count = function() {
      return this.lookup(PDFName_default.of("Count"), PDFNumber_default);
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
        throw new InvalidTargetIndexError(targetIndex, Count);
      }
      var leafsRemainingUntilTarget = targetIndex;
      for (var idx4 = 0, len3 = Kids.size(); idx4 < len3; idx4++) {
        if (leafsRemainingUntilTarget === 0) {
          this.insertLeafKid(idx4, leafRef);
          return void 0;
        }
        var kidRef = Kids.get(idx4);
        var kid = this.context.lookup(kidRef);
        if (kid instanceof PDFPageTree2) {
          if (kid.Count().asNumber() > leafsRemainingUntilTarget) {
            return kid.insertLeafNode(leafRef, leafsRemainingUntilTarget) || kidRef;
          } else {
            leafsRemainingUntilTarget -= kid.Count().asNumber();
          }
        }
        if (kid instanceof PDFPageLeaf_default) {
          leafsRemainingUntilTarget -= 1;
        }
      }
      if (leafsRemainingUntilTarget === 0) {
        this.insertLeafKid(Kids.size(), leafRef);
        return void 0;
      }
      throw new CorruptPageTreeError(targetIndex, "insertLeafNode");
    };
    PDFPageTree2.prototype.removeLeafNode = function(targetIndex, prune) {
      if (prune === void 0) {
        prune = true;
      }
      var Kids = this.Kids();
      var Count = this.Count().asNumber();
      if (targetIndex >= Count) {
        throw new InvalidTargetIndexError(targetIndex, Count);
      }
      var leafsRemainingUntilTarget = targetIndex;
      for (var idx4 = 0, len3 = Kids.size(); idx4 < len3; idx4++) {
        var kidRef = Kids.get(idx4);
        var kid = this.context.lookup(kidRef);
        if (kid instanceof PDFPageTree2) {
          if (kid.Count().asNumber() > leafsRemainingUntilTarget) {
            kid.removeLeafNode(leafsRemainingUntilTarget, prune);
            if (prune && kid.Kids().size() === 0)
              Kids.remove(idx4);
            return;
          } else {
            leafsRemainingUntilTarget -= kid.Count().asNumber();
          }
        }
        if (kid instanceof PDFPageLeaf_default) {
          if (leafsRemainingUntilTarget === 0) {
            this.removeKid(idx4);
            return;
          } else {
            leafsRemainingUntilTarget -= 1;
          }
        }
      }
      throw new CorruptPageTreeError(targetIndex, "removeLeafNode");
    };
    PDFPageTree2.prototype.ascend = function(visitor) {
      visitor(this);
      var Parent = this.Parent();
      if (Parent)
        Parent.ascend(visitor);
    };
    PDFPageTree2.prototype.traverse = function(visitor) {
      var Kids = this.Kids();
      for (var idx4 = 0, len3 = Kids.size(); idx4 < len3; idx4++) {
        var kidRef = Kids.get(idx4);
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
        node.set(PDFName_default.of("Count"), PDFNumber_default.of(newCount));
      });
      Kids.insert(kidIdx, leafRef);
    };
    PDFPageTree2.prototype.removeKid = function(kidIdx) {
      var Kids = this.Kids();
      var kid = Kids.lookup(kidIdx);
      if (kid instanceof PDFPageLeaf_default) {
        this.ascend(function(node) {
          var newCount = node.Count().asNumber() - 1;
          node.set(PDFName_default.of("Count"), PDFNumber_default.of(newCount));
        });
      }
      Kids.remove(kidIdx);
    };
    PDFPageTree2.withContext = function(context, parent) {
      var dict = /* @__PURE__ */ new Map();
      dict.set(PDFName_default.of("Type"), PDFName_default.of("Pages"));
      dict.set(PDFName_default.of("Kids"), context.obj([]));
      dict.set(PDFName_default.of("Count"), context.obj(0));
      if (parent)
        dict.set(PDFName_default.of("Parent"), parent);
      return new PDFPageTree2(dict, context);
    };
    PDFPageTree2.fromMapWithContext = function(map, context) {
      return new PDFPageTree2(map, context);
    };
    return PDFPageTree2;
  })(PDFDict_default)
);
var PDFPageTree_default = PDFPageTree;

// node_modules/pdf-lib/es/core/syntax/Keywords.js
var Space = CharCodes_default.Space;
var CarriageReturn2 = CharCodes_default.CarriageReturn;
var Newline2 = CharCodes_default.Newline;
var stream = [
  CharCodes_default.s,
  CharCodes_default.t,
  CharCodes_default.r,
  CharCodes_default.e,
  CharCodes_default.a,
  CharCodes_default.m
];
var endstream = [
  CharCodes_default.e,
  CharCodes_default.n,
  CharCodes_default.d,
  CharCodes_default.s,
  CharCodes_default.t,
  CharCodes_default.r,
  CharCodes_default.e,
  CharCodes_default.a,
  CharCodes_default.m
];
var Keywords = {
  header: [
    CharCodes_default.Percent,
    CharCodes_default.P,
    CharCodes_default.D,
    CharCodes_default.F,
    CharCodes_default.Dash
  ],
  eof: [
    CharCodes_default.Percent,
    CharCodes_default.Percent,
    CharCodes_default.E,
    CharCodes_default.O,
    CharCodes_default.F
  ],
  obj: [CharCodes_default.o, CharCodes_default.b, CharCodes_default.j],
  endobj: [
    CharCodes_default.e,
    CharCodes_default.n,
    CharCodes_default.d,
    CharCodes_default.o,
    CharCodes_default.b,
    CharCodes_default.j
  ],
  xref: [CharCodes_default.x, CharCodes_default.r, CharCodes_default.e, CharCodes_default.f],
  trailer: [
    CharCodes_default.t,
    CharCodes_default.r,
    CharCodes_default.a,
    CharCodes_default.i,
    CharCodes_default.l,
    CharCodes_default.e,
    CharCodes_default.r
  ],
  startxref: [
    CharCodes_default.s,
    CharCodes_default.t,
    CharCodes_default.a,
    CharCodes_default.r,
    CharCodes_default.t,
    CharCodes_default.x,
    CharCodes_default.r,
    CharCodes_default.e,
    CharCodes_default.f
  ],
  true: [CharCodes_default.t, CharCodes_default.r, CharCodes_default.u, CharCodes_default.e],
  false: [CharCodes_default.f, CharCodes_default.a, CharCodes_default.l, CharCodes_default.s, CharCodes_default.e],
  null: [CharCodes_default.n, CharCodes_default.u, CharCodes_default.l, CharCodes_default.l],
  stream,
  streamEOF1: __spreadArrays(stream, [Space, CarriageReturn2, Newline2]),
  streamEOF2: __spreadArrays(stream, [CarriageReturn2, Newline2]),
  streamEOF3: __spreadArrays(stream, [CarriageReturn2]),
  streamEOF4: __spreadArrays(stream, [Newline2]),
  endstream,
  EOF1endstream: __spreadArrays([CarriageReturn2, Newline2], endstream),
  EOF2endstream: __spreadArrays([CarriageReturn2], endstream),
  EOF3endstream: __spreadArrays([Newline2], endstream)
};

// node_modules/pdf-lib/es/core/parser/PDFObjectParser.js
var PDFObjectParser = (
  /** @class */
  (function(_super) {
    __extends(PDFObjectParser2, _super);
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
      if (this.matchKeyword(Keywords.true))
        return PDFBool_default.True;
      if (this.matchKeyword(Keywords.false))
        return PDFBool_default.False;
      if (this.matchKeyword(Keywords.null))
        return PDFNull_default;
      var byte = this.bytes.peek();
      if (byte === CharCodes_default.LessThan && this.bytes.peekAhead(1) === CharCodes_default.LessThan) {
        return this.parseDictOrStream();
      }
      if (byte === CharCodes_default.LessThan)
        return this.parseHexString();
      if (byte === CharCodes_default.LeftParen)
        return this.parseString();
      if (byte === CharCodes_default.ForwardSlash)
        return this.parseName();
      if (byte === CharCodes_default.LeftSquareBracket)
        return this.parseArray();
      if (IsNumeric[byte])
        return this.parseNumberOrRef();
      throw new PDFObjectParsingError(this.bytes.position(), byte);
    };
    PDFObjectParser2.prototype.parseNumberOrRef = function() {
      var firstNum = this.parseRawNumber();
      this.skipWhitespaceAndComments();
      var lookaheadStart = this.bytes.offset();
      if (IsDigit[this.bytes.peek()]) {
        var secondNum = this.parseRawNumber();
        this.skipWhitespaceAndComments();
        if (this.bytes.peek() === CharCodes_default.R) {
          this.bytes.assertNext(CharCodes_default.R);
          return PDFRef_default.of(firstNum, secondNum);
        }
      }
      this.bytes.moveTo(lookaheadStart);
      return PDFNumber_default.of(firstNum);
    };
    PDFObjectParser2.prototype.parseHexString = function() {
      var value = "";
      this.bytes.assertNext(CharCodes_default.LessThan);
      while (!this.bytes.done() && this.bytes.peek() !== CharCodes_default.GreaterThan) {
        value += charFromCode(this.bytes.next());
      }
      this.bytes.assertNext(CharCodes_default.GreaterThan);
      return PDFHexString_default.of(value);
    };
    PDFObjectParser2.prototype.parseString = function() {
      var nestingLvl = 0;
      var isEscaped = false;
      var value = "";
      while (!this.bytes.done()) {
        var byte = this.bytes.next();
        value += charFromCode(byte);
        if (!isEscaped) {
          if (byte === CharCodes_default.LeftParen)
            nestingLvl += 1;
          if (byte === CharCodes_default.RightParen)
            nestingLvl -= 1;
        }
        if (byte === CharCodes_default.BackSlash) {
          isEscaped = !isEscaped;
        } else if (isEscaped) {
          isEscaped = false;
        }
        if (nestingLvl === 0) {
          return PDFString_default.of(value.substring(1, value.length - 1));
        }
      }
      throw new UnbalancedParenthesisError(this.bytes.position());
    };
    PDFObjectParser2.prototype.parseName = function() {
      this.bytes.assertNext(CharCodes_default.ForwardSlash);
      var name = "";
      while (!this.bytes.done()) {
        var byte = this.bytes.peek();
        if (IsWhitespace[byte] || IsDelimiter[byte])
          break;
        name += charFromCode(byte);
        this.bytes.next();
      }
      return PDFName_default.of(name);
    };
    PDFObjectParser2.prototype.parseArray = function() {
      this.bytes.assertNext(CharCodes_default.LeftSquareBracket);
      this.skipWhitespaceAndComments();
      var pdfArray = PDFArray_default.withContext(this.context);
      while (this.bytes.peek() !== CharCodes_default.RightSquareBracket) {
        var element = this.parseObject();
        pdfArray.push(element);
        this.skipWhitespaceAndComments();
      }
      this.bytes.assertNext(CharCodes_default.RightSquareBracket);
      return pdfArray;
    };
    PDFObjectParser2.prototype.parseDict = function() {
      this.bytes.assertNext(CharCodes_default.LessThan);
      this.bytes.assertNext(CharCodes_default.LessThan);
      this.skipWhitespaceAndComments();
      var dict = /* @__PURE__ */ new Map();
      while (!this.bytes.done() && this.bytes.peek() !== CharCodes_default.GreaterThan && this.bytes.peekAhead(1) !== CharCodes_default.GreaterThan) {
        var key = this.parseName();
        var value = this.parseObject();
        dict.set(key, value);
        this.skipWhitespaceAndComments();
      }
      this.skipWhitespaceAndComments();
      this.bytes.assertNext(CharCodes_default.GreaterThan);
      this.bytes.assertNext(CharCodes_default.GreaterThan);
      var Type = dict.get(PDFName_default.of("Type"));
      if (Type === PDFName_default.of("Catalog")) {
        return PDFCatalog_default.fromMapWithContext(dict, this.context);
      } else if (Type === PDFName_default.of("Pages")) {
        return PDFPageTree_default.fromMapWithContext(dict, this.context);
      } else if (Type === PDFName_default.of("Page")) {
        return PDFPageLeaf_default.fromMapWithContext(dict, this.context);
      } else {
        return PDFDict_default.fromMapWithContext(dict, this.context);
      }
    };
    PDFObjectParser2.prototype.parseDictOrStream = function() {
      var startPos = this.bytes.position();
      var dict = this.parseDict();
      this.skipWhitespaceAndComments();
      if (!this.matchKeyword(Keywords.streamEOF1) && !this.matchKeyword(Keywords.streamEOF2) && !this.matchKeyword(Keywords.streamEOF3) && !this.matchKeyword(Keywords.streamEOF4) && !this.matchKeyword(Keywords.stream)) {
        return dict;
      }
      var start = this.bytes.offset();
      var end;
      var Length = dict.get(PDFName_default.of("Length"));
      if (Length instanceof PDFNumber_default) {
        end = start + Length.asNumber();
        this.bytes.moveTo(end);
        this.skipWhitespaceAndComments();
        if (!this.matchKeyword(Keywords.endstream)) {
          this.bytes.moveTo(start);
          end = this.findEndOfStreamFallback(startPos);
        }
      } else {
        end = this.findEndOfStreamFallback(startPos);
      }
      var contents = this.bytes.slice(start, end);
      return PDFRawStream_default.of(dict, contents);
    };
    PDFObjectParser2.prototype.findEndOfStreamFallback = function(startPos) {
      var nestingLvl = 1;
      var end = this.bytes.offset();
      while (!this.bytes.done()) {
        end = this.bytes.offset();
        if (this.matchKeyword(Keywords.stream)) {
          nestingLvl += 1;
        } else if (this.matchKeyword(Keywords.EOF1endstream) || this.matchKeyword(Keywords.EOF2endstream) || this.matchKeyword(Keywords.EOF3endstream) || this.matchKeyword(Keywords.endstream)) {
          nestingLvl -= 1;
        } else {
          this.bytes.next();
        }
        if (nestingLvl === 0)
          break;
      }
      if (nestingLvl !== 0)
        throw new PDFStreamParsingError(startPos);
      return end;
    };
    PDFObjectParser2.forBytes = function(bytes, context, capNumbers) {
      return new PDFObjectParser2(ByteStream_default.of(bytes), context, capNumbers);
    };
    PDFObjectParser2.forByteStream = function(byteStream, context, capNumbers) {
      if (capNumbers === void 0) {
        capNumbers = false;
      }
      return new PDFObjectParser2(byteStream, context, capNumbers);
    };
    return PDFObjectParser2;
  })(BaseParser_default)
);
var PDFObjectParser_default = PDFObjectParser;

// node_modules/pdf-lib/es/core/parser/PDFObjectStreamParser.js
var PDFObjectStreamParser = (
  /** @class */
  (function(_super) {
    __extends(PDFObjectStreamParser2, _super);
    function PDFObjectStreamParser2(rawStream, shouldWaitForTick) {
      var _this = _super.call(this, ByteStream_default.fromPDFRawStream(rawStream), rawStream.dict.context) || this;
      var dict = rawStream.dict;
      _this.alreadyParsed = false;
      _this.shouldWaitForTick = shouldWaitForTick || (function() {
        return false;
      });
      _this.firstOffset = dict.lookup(PDFName_default.of("First"), PDFNumber_default).asNumber();
      _this.objectCount = dict.lookup(PDFName_default.of("N"), PDFNumber_default).asNumber();
      return _this;
    }
    PDFObjectStreamParser2.prototype.parseIntoContext = function() {
      return __awaiter(this, void 0, void 0, function() {
        var offsetsAndObjectNumbers, idx4, len3, _a, objectNumber, offset, object, ref;
        return __generator(this, function(_b) {
          switch (_b.label) {
            case 0:
              if (this.alreadyParsed) {
                throw new ReparseError("PDFObjectStreamParser", "parseIntoContext");
              }
              this.alreadyParsed = true;
              offsetsAndObjectNumbers = this.parseOffsetsAndObjectNumbers();
              idx4 = 0, len3 = offsetsAndObjectNumbers.length;
              _b.label = 1;
            case 1:
              if (!(idx4 < len3)) return [3, 4];
              _a = offsetsAndObjectNumbers[idx4], objectNumber = _a.objectNumber, offset = _a.offset;
              this.bytes.moveTo(this.firstOffset + offset);
              object = this.parseObject();
              ref = PDFRef_default.of(objectNumber, 0);
              this.context.assign(ref, object);
              if (!this.shouldWaitForTick()) return [3, 3];
              return [4, waitForTick()];
            case 2:
              _b.sent();
              _b.label = 3;
            case 3:
              idx4++;
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
      for (var idx4 = 0, len3 = this.objectCount; idx4 < len3; idx4++) {
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
  })(PDFObjectParser_default)
);
var PDFObjectStreamParser_default = PDFObjectStreamParser;

// node_modules/pdf-lib/es/core/parser/PDFXRefStreamParser.js
var PDFXRefStreamParser = (
  /** @class */
  (function() {
    function PDFXRefStreamParser2(rawStream) {
      this.alreadyParsed = false;
      this.dict = rawStream.dict;
      this.bytes = ByteStream_default.fromPDFRawStream(rawStream);
      this.context = this.dict.context;
      var Size = this.dict.lookup(PDFName_default.of("Size"), PDFNumber_default);
      var Index = this.dict.lookup(PDFName_default.of("Index"));
      if (Index instanceof PDFArray_default) {
        this.subsections = [];
        for (var idx4 = 0, len3 = Index.size(); idx4 < len3; idx4 += 2) {
          var firstObjectNumber = Index.lookup(idx4 + 0, PDFNumber_default).asNumber();
          var length_1 = Index.lookup(idx4 + 1, PDFNumber_default).asNumber();
          this.subsections.push({ firstObjectNumber, length: length_1 });
        }
      } else {
        this.subsections = [{ firstObjectNumber: 0, length: Size.asNumber() }];
      }
      var W = this.dict.lookup(PDFName_default.of("W"), PDFArray_default);
      this.byteWidths = [-1, -1, -1];
      for (var idx4 = 0, len3 = W.size(); idx4 < len3; idx4++) {
        this.byteWidths[idx4] = W.lookup(idx4, PDFNumber_default).asNumber();
      }
    }
    PDFXRefStreamParser2.prototype.parseIntoContext = function() {
      if (this.alreadyParsed) {
        throw new ReparseError("PDFXRefStreamParser", "parseIntoContext");
      }
      this.alreadyParsed = true;
      this.context.trailerInfo = {
        Root: this.dict.get(PDFName_default.of("Root")),
        Encrypt: this.dict.get(PDFName_default.of("Encrypt")),
        Info: this.dict.get(PDFName_default.of("Info")),
        ID: this.dict.get(PDFName_default.of("ID"))
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
          for (var idx4 = 0, len3 = typeFieldWidth; idx4 < len3; idx4++) {
            type = type << 8 | this.bytes.next();
          }
          var offset = 0;
          for (var idx4 = 0, len3 = offsetFieldWidth; idx4 < len3; idx4++) {
            offset = offset << 8 | this.bytes.next();
          }
          var generationNumber = 0;
          for (var idx4 = 0, len3 = genFieldWidth; idx4 < len3; idx4++) {
            generationNumber = generationNumber << 8 | this.bytes.next();
          }
          if (typeFieldWidth === 0)
            type = 1;
          var objectNumber = firstObjectNumber + objIdx;
          var entry = {
            ref: PDFRef_default.of(objectNumber, generationNumber),
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
var PDFXRefStreamParser_default = PDFXRefStreamParser;

// scripts/adapters/pako-node-zlib.mjs
import {
  deflateRawSync,
  deflateSync,
  gunzipSync,
  gzipSync,
  inflateRawSync,
  inflateSync
} from "node:zlib";
var toUint8Array = (value) => new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
var joinChunks = (chunks) => Buffer.concat(chunks.map((chunk) => Buffer.from(chunk)));
function deflate(data, options) {
  return toUint8Array(deflateSync(data, options));
}
function inflate(data, options) {
  return toUint8Array(inflateSync(data, options));
}
function deflateRaw(data, options) {
  return toUint8Array(deflateRawSync(data, options));
}
function inflateRaw(data, options) {
  return toUint8Array(inflateRawSync(data, options));
}
function gzip(data, options) {
  return toUint8Array(gzipSync(data, options));
}
function ungzip(data, options) {
  return toUint8Array(gunzipSync(data, options));
}
var Deflate = class {
  constructor(options) {
    this.options = options;
    this.chunks = [];
  }
  push(chunk, final) {
    if (chunk) this.chunks.push(chunk);
    if (final) this.result = toUint8Array(deflateSync(joinChunks(this.chunks), this.options));
    return true;
  }
};
var Inflate = class {
  constructor(options) {
    this.options = options;
    this.chunks = [];
  }
  push(chunk, final) {
    if (chunk) this.chunks.push(chunk);
    if (final) this.result = toUint8Array(inflateSync(joinChunks(this.chunks), this.options));
    return true;
  }
};
var pako_node_zlib_default = { deflate, inflate, deflateRaw, inflateRaw, gzip, ungzip, Deflate, Inflate };

// node_modules/pdf-lib/es/core/operators/PDFOperator.js
var PDFOperator = (
  /** @class */
  (function() {
    function PDFOperator2(name, args) {
      this.name = name;
      this.args = args || [];
    }
    PDFOperator2.prototype.clone = function(context) {
      var args = new Array(this.args.length);
      for (var idx4 = 0, len3 = args.length; idx4 < len3; idx4++) {
        var arg = this.args[idx4];
        args[idx4] = arg instanceof PDFObject_default ? arg.clone(context) : arg;
      }
      return PDFOperator2.of(this.name, args);
    };
    PDFOperator2.prototype.toString = function() {
      var value = "";
      for (var idx4 = 0, len3 = this.args.length; idx4 < len3; idx4++) {
        value += String(this.args[idx4]) + " ";
      }
      value += this.name;
      return value;
    };
    PDFOperator2.prototype.sizeInBytes = function() {
      var size = 0;
      for (var idx4 = 0, len3 = this.args.length; idx4 < len3; idx4++) {
        var arg = this.args[idx4];
        size += (arg instanceof PDFObject_default ? arg.sizeInBytes() : arg.length) + 1;
      }
      size += this.name.length;
      return size;
    };
    PDFOperator2.prototype.copyBytesInto = function(buffer, offset) {
      var initialOffset = offset;
      for (var idx4 = 0, len3 = this.args.length; idx4 < len3; idx4++) {
        var arg = this.args[idx4];
        if (arg instanceof PDFObject_default) {
          offset += arg.copyBytesInto(buffer, offset);
        } else {
          offset += copyStringIntoBuffer(arg, buffer, offset);
        }
        buffer[offset++] = CharCodes_default.Space;
      }
      offset += copyStringIntoBuffer(this.name, buffer, offset);
      return offset - initialOffset;
    };
    PDFOperator2.of = function(name, args) {
      return new PDFOperator2(name, args);
    };
    return PDFOperator2;
  })()
);
var PDFOperator_default = PDFOperator;

// node_modules/pdf-lib/es/core/operators/PDFOperatorNames.js
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
var PDFOperatorNames_default = PDFOperatorNames;

// node_modules/pdf-lib/es/core/structures/PDFFlateStream.js
var PDFFlateStream = (
  /** @class */
  (function(_super) {
    __extends(PDFFlateStream2, _super);
    function PDFFlateStream2(dict, encode) {
      var _this = _super.call(this, dict) || this;
      _this.computeContents = function() {
        var unencodedContents = _this.getUnencodedContents();
        return _this.encode ? pako_node_zlib_default.deflate(unencodedContents) : unencodedContents;
      };
      _this.encode = encode;
      if (encode)
        dict.set(PDFName_default.of("Filter"), PDFName_default.of("FlateDecode"));
      _this.contentsCache = Cache_default.populatedBy(_this.computeContents);
      return _this;
    }
    PDFFlateStream2.prototype.getContents = function() {
      return this.contentsCache.access();
    };
    PDFFlateStream2.prototype.getContentsSize = function() {
      return this.contentsCache.access().length;
    };
    PDFFlateStream2.prototype.getUnencodedContents = function() {
      throw new MethodNotImplementedError(this.constructor.name, "getUnencodedContents");
    };
    return PDFFlateStream2;
  })(PDFStream_default)
);
var PDFFlateStream_default = PDFFlateStream;

// node_modules/pdf-lib/es/core/structures/PDFContentStream.js
var PDFContentStream = (
  /** @class */
  (function(_super) {
    __extends(PDFContentStream2, _super);
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
      for (var idx4 = 0, len3 = this.operators.length; idx4 < len3; idx4++) {
        operators[idx4] = this.operators[idx4].clone(context);
      }
      var _a = this, dict = _a.dict, encode = _a.encode;
      return PDFContentStream2.of(dict.clone(context), operators, encode);
    };
    PDFContentStream2.prototype.getContentsString = function() {
      var value = "";
      for (var idx4 = 0, len3 = this.operators.length; idx4 < len3; idx4++) {
        value += this.operators[idx4] + "\n";
      }
      return value;
    };
    PDFContentStream2.prototype.getUnencodedContents = function() {
      var buffer = new Uint8Array(this.getUnencodedContentsSize());
      var offset = 0;
      for (var idx4 = 0, len3 = this.operators.length; idx4 < len3; idx4++) {
        offset += this.operators[idx4].copyBytesInto(buffer, offset);
        buffer[offset++] = CharCodes_default.Newline;
      }
      return buffer;
    };
    PDFContentStream2.prototype.getUnencodedContentsSize = function() {
      var size = 0;
      for (var idx4 = 0, len3 = this.operators.length; idx4 < len3; idx4++) {
        size += this.operators[idx4].sizeInBytes() + 1;
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
  })(PDFFlateStream_default)
);
var PDFContentStream_default = PDFContentStream;

// node_modules/pdf-lib/es/utils/rng.js
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

// node_modules/pdf-lib/es/core/PDFContext.js
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
      this.header = PDFHeader_default.forVersion(1, 7);
      this.trailerInfo = {};
      this.indirectObjects = /* @__PURE__ */ new Map();
      this.rng = SimpleRNG.withSeed(1);
    }
    PDFContext2.prototype.assign = function(ref, object) {
      this.indirectObjects.set(ref, object);
      if (ref.objectNumber > this.largestObjectNumber) {
        this.largestObjectNumber = ref.objectNumber;
      }
    };
    PDFContext2.prototype.nextRef = function() {
      this.largestObjectNumber += 1;
      return PDFRef_default.of(this.largestObjectNumber);
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
      var preservePDFNull = types.includes(PDFNull_default);
      var result = ref instanceof PDFRef_default ? this.indirectObjects.get(ref) : ref;
      if (!result || result === PDFNull_default && !preservePDFNull)
        return void 0;
      for (var idx4 = 0, len3 = types.length; idx4 < len3; idx4++) {
        var type = types[idx4];
        if (type === PDFNull_default) {
          if (result === PDFNull_default)
            return result;
        } else {
          if (result instanceof type)
            return result;
        }
      }
      throw new UnexpectedObjectTypeError(types, result);
    };
    PDFContext2.prototype.lookup = function(ref) {
      var types = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        types[_i - 1] = arguments[_i];
      }
      var result = ref instanceof PDFRef_default ? this.indirectObjects.get(ref) : ref;
      if (types.length === 0)
        return result;
      for (var idx4 = 0, len3 = types.length; idx4 < len3; idx4++) {
        var type = types[idx4];
        if (type === PDFNull_default) {
          if (result === PDFNull_default)
            return result;
        } else {
          if (result instanceof type)
            return result;
        }
      }
      throw new UnexpectedObjectTypeError(types, result);
    };
    PDFContext2.prototype.getObjectRef = function(pdfObject) {
      var entries = Array.from(this.indirectObjects.entries());
      for (var idx4 = 0, len3 = entries.length; idx4 < len3; idx4++) {
        var _a = entries[idx4], ref = _a[0], object = _a[1];
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
      if (literal instanceof PDFObject_default) {
        return literal;
      } else if (literal === null || literal === void 0) {
        return PDFNull_default;
      } else if (typeof literal === "string") {
        return PDFName_default.of(literal);
      } else if (typeof literal === "number") {
        return PDFNumber_default.of(literal);
      } else if (typeof literal === "boolean") {
        return literal ? PDFBool_default.True : PDFBool_default.False;
      } else if (Array.isArray(literal)) {
        var array = PDFArray_default.withContext(this);
        for (var idx4 = 0, len3 = literal.length; idx4 < len3; idx4++) {
          array.push(this.obj(literal[idx4]));
        }
        return array;
      } else {
        var dict = PDFDict_default.withContext(this);
        var keys = Object.keys(literal);
        for (var idx4 = 0, len3 = keys.length; idx4 < len3; idx4++) {
          var key = keys[idx4];
          var value = literal[key];
          if (value !== void 0)
            dict.set(PDFName_default.of(key), this.obj(value));
        }
        return dict;
      }
    };
    PDFContext2.prototype.stream = function(contents, dict) {
      if (dict === void 0) {
        dict = {};
      }
      return PDFRawStream_default.of(this.obj(dict), typedArrayFor(contents));
    };
    PDFContext2.prototype.flateStream = function(contents, dict) {
      if (dict === void 0) {
        dict = {};
      }
      return this.stream(pako_node_zlib_default.deflate(typedArrayFor(contents)), __assign(__assign({}, dict), { Filter: "FlateDecode" }));
    };
    PDFContext2.prototype.contentStream = function(operators, dict) {
      if (dict === void 0) {
        dict = {};
      }
      return PDFContentStream_default.of(this.obj(dict), operators);
    };
    PDFContext2.prototype.formXObject = function(operators, dict) {
      if (dict === void 0) {
        dict = {};
      }
      return this.contentStream(operators, __assign(__assign({ BBox: this.obj([0, 0, 0, 0]), Matrix: this.obj([1, 0, 0, 1, 0, 0]) }, dict), { Type: "XObject", Subtype: "Form" }));
    };
    PDFContext2.prototype.getPushGraphicsStateContentStream = function() {
      if (this.pushGraphicsStateContentStreamRef) {
        return this.pushGraphicsStateContentStreamRef;
      }
      var dict = this.obj({});
      var op = PDFOperator_default.of(PDFOperatorNames_default.PushGraphicsState);
      var stream2 = PDFContentStream_default.of(dict, [op]);
      this.pushGraphicsStateContentStreamRef = this.register(stream2);
      return this.pushGraphicsStateContentStreamRef;
    };
    PDFContext2.prototype.getPopGraphicsStateContentStream = function() {
      if (this.popGraphicsStateContentStreamRef) {
        return this.popGraphicsStateContentStreamRef;
      }
      var dict = this.obj({});
      var op = PDFOperator_default.of(PDFOperatorNames_default.PopGraphicsState);
      var stream2 = PDFContentStream_default.of(dict, [op]);
      this.popGraphicsStateContentStreamRef = this.register(stream2);
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
var PDFContext_default = PDFContext;

// node_modules/pdf-lib/es/core/parser/PDFParser.js
var PDFParser = (
  /** @class */
  (function(_super) {
    __extends(PDFParser2, _super);
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
      var _this = _super.call(this, ByteStream_default.of(pdfBytes), PDFContext_default.create(), capNumbers) || this;
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
      return __awaiter(this, void 0, void 0, function() {
        var prevOffset, offset;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              if (this.alreadyParsed) {
                throw new ReparseError("PDFParser", "parseDocument");
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
                throw new StalledParserError(this.bytes.position());
              }
              prevOffset = offset;
              return [3, 1];
            case 3:
              this.maybeRecoverRoot();
              if (this.context.lookup(PDFRef_default.of(0))) {
                console.warn("Removing parsed object: 0 0 R");
                this.context.delete(PDFRef_default.of(0));
              }
              return [2, this.context];
          }
        });
      });
    };
    PDFParser2.prototype.maybeRecoverRoot = function() {
      var isValidCatalog = function(obj) {
        return obj instanceof PDFDict_default && obj.lookup(PDFName_default.of("Type")) === PDFName_default.of("Catalog");
      };
      var catalog = this.context.lookup(this.context.trailerInfo.Root);
      if (!isValidCatalog(catalog)) {
        var indirectObjects = this.context.enumerateIndirectObjects();
        for (var idx4 = 0, len3 = indirectObjects.length; idx4 < len3; idx4++) {
          var _a = indirectObjects[idx4], ref = _a[0], object = _a[1];
          if (isValidCatalog(object)) {
            this.context.trailerInfo.Root = ref;
          }
        }
      }
    };
    PDFParser2.prototype.parseHeader = function() {
      while (!this.bytes.done()) {
        if (this.matchKeyword(Keywords.header)) {
          var major = this.parseRawInt();
          this.bytes.assertNext(CharCodes_default.Period);
          var minor = this.parseRawInt();
          var header = PDFHeader_default.forVersion(major, minor);
          this.skipBinaryHeaderComment();
          return header;
        }
        this.bytes.next();
      }
      throw new MissingPDFHeaderError(this.bytes.position());
    };
    PDFParser2.prototype.parseIndirectObjectHeader = function() {
      this.skipWhitespaceAndComments();
      var objectNumber = this.parseRawInt();
      this.skipWhitespaceAndComments();
      var generationNumber = this.parseRawInt();
      this.skipWhitespaceAndComments();
      if (!this.matchKeyword(Keywords.obj)) {
        throw new MissingKeywordError(this.bytes.position(), Keywords.obj);
      }
      return PDFRef_default.of(objectNumber, generationNumber);
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
      return __awaiter(this, void 0, void 0, function() {
        var ref, object;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              ref = this.parseIndirectObjectHeader();
              this.skipWhitespaceAndComments();
              object = this.parseObject();
              this.skipWhitespaceAndComments();
              this.matchKeyword(Keywords.endobj);
              if (!(object instanceof PDFRawStream_default && object.dict.lookup(PDFName_default.of("Type")) === PDFName_default.of("ObjStm"))) return [3, 2];
              return [4, PDFObjectStreamParser_default.forStream(object, this.shouldWaitForTick).parseIntoContext()];
            case 1:
              _a.sent();
              return [3, 3];
            case 2:
              if (object instanceof PDFRawStream_default && object.dict.lookup(PDFName_default.of("Type")) === PDFName_default.of("XRef")) {
                PDFXRefStreamParser_default.forStream(object).parseIntoContext();
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
        if (this.matchKeyword(Keywords.endobj)) {
          failed = false;
        }
        if (!failed)
          break;
        this.bytes.next();
      }
      if (failed)
        throw new PDFInvalidObjectParsingError(startPos);
      var end = this.bytes.offset() - Keywords.endobj.length;
      var object = PDFInvalidObject_default.of(this.bytes.slice(start, end));
      this.context.assign(ref, object);
      return ref;
    };
    PDFParser2.prototype.parseIndirectObjects = function() {
      return __awaiter(this, void 0, void 0, function() {
        var initialOffset, e_1;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              this.skipWhitespaceAndComments();
              _a.label = 1;
            case 1:
              if (!(!this.bytes.done() && IsDigit[this.bytes.peek()])) return [3, 8];
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
              return [4, waitForTick()];
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
      if (!this.matchKeyword(Keywords.xref))
        return;
      this.skipWhitespaceAndComments();
      var objectNumber = -1;
      var xref = PDFCrossRefSection_default.createEmpty();
      while (!this.bytes.done() && IsDigit[this.bytes.peek()]) {
        var firstInt = this.parseRawInt();
        this.skipWhitespaceAndComments();
        var secondInt = this.parseRawInt();
        this.skipWhitespaceAndComments();
        var byte = this.bytes.peek();
        if (byte === CharCodes_default.n || byte === CharCodes_default.f) {
          var ref = PDFRef_default.of(objectNumber, secondInt);
          if (this.bytes.next() === CharCodes_default.n) {
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
      if (!this.matchKeyword(Keywords.trailer))
        return;
      this.skipWhitespaceAndComments();
      var dict = this.parseDict();
      var context = this.context;
      context.trailerInfo = {
        Root: dict.get(PDFName_default.of("Root")) || context.trailerInfo.Root,
        Encrypt: dict.get(PDFName_default.of("Encrypt")) || context.trailerInfo.Encrypt,
        Info: dict.get(PDFName_default.of("Info")) || context.trailerInfo.Info,
        ID: dict.get(PDFName_default.of("ID")) || context.trailerInfo.ID
      };
    };
    PDFParser2.prototype.maybeParseTrailer = function() {
      this.skipWhitespaceAndComments();
      if (!this.matchKeyword(Keywords.startxref))
        return;
      this.skipWhitespaceAndComments();
      var offset = this.parseRawInt();
      this.skipWhitespace();
      this.matchKeyword(Keywords.eof);
      this.skipWhitespaceAndComments();
      this.matchKeyword(Keywords.eof);
      this.skipWhitespaceAndComments();
      return PDFTrailer_default.forLastCrossRefSectionOffset(offset);
    };
    PDFParser2.prototype.parseDocumentSection = function() {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
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
        var isAlphaNumeric = byte >= CharCodes_default.Space && byte <= CharCodes_default.Tilde;
        if (isAlphaNumeric) {
          if (this.matchKeyword(Keywords.xref) || this.matchKeyword(Keywords.trailer) || this.matchKeyword(Keywords.startxref) || this.matchIndirectObjectHeader()) {
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
  })(PDFObjectParser_default)
);
var PDFParser_default = PDFParser;

// src/node/pdf-reader.mjs
async function getPdfPageCount(input) {
  const bytes = input instanceof Uint8Array ? input : new Uint8Array(input);
  const context = await PDFParser_default.forBytesWithOptions(bytes, Infinity, true, false).parseDocument();
  const catalog = context.lookup(context.trailerInfo.Root, PDFCatalog_default);
  let count = 0;
  catalog.Pages().traverse((node) => {
    if (node instanceof PDFPageLeaf_default) count += 1;
  });
  if (!Number.isInteger(count) || count < 1) throw new Error("PDF \u672A\u8FD4\u56DE\u6709\u6548\u9875\u6570");
  return count;
}
export {
  getPdfPageCount
};
