var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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

// node_modules/nice-grpc-common/lib/Metadata.js
var require_Metadata = __commonJS({
  "node_modules/nice-grpc-common/lib/Metadata.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Metadata = void 0;
    exports.Metadata = function Metadata2(init) {
      const data = /* @__PURE__ */ new Map();
      const metadata = {
        set(key, value) {
          key = normalizeKey(key);
          if (Array.isArray(value)) {
            if (value.length === 0) {
              data.delete(key);
            } else {
              for (const item of value) {
                validate(key, item);
              }
              data.set(key, key.endsWith("-bin") ? value : [value.join(", ")]);
            }
          } else {
            validate(key, value);
            data.set(key, [value]);
          }
          return metadata;
        },
        append(key, value) {
          key = normalizeKey(key);
          validate(key, value);
          let values = data.get(key);
          if (values == null) {
            values = [];
            data.set(key, values);
          }
          values.push(value);
          if (!key.endsWith("-bin")) {
            data.set(key, [values.join(", ")]);
          }
          return metadata;
        },
        delete(key) {
          key = normalizeKey(key);
          data.delete(key);
        },
        get(key) {
          var _a;
          key = normalizeKey(key);
          return (_a = data.get(key)) === null || _a === void 0 ? void 0 : _a[0];
        },
        getAll(key) {
          var _a;
          key = normalizeKey(key);
          return (_a = data.get(key)) !== null && _a !== void 0 ? _a : [];
        },
        has(key) {
          key = normalizeKey(key);
          return data.has(key);
        },
        [Symbol.iterator]() {
          return data[Symbol.iterator]();
        }
      };
      if (init != null) {
        const entries = isIterable(init) ? init : Object.entries(init);
        for (const [key, value] of entries) {
          metadata.set(key, value);
        }
      }
      return metadata;
    };
    function normalizeKey(key) {
      return key.toLowerCase();
    }
    function validate(key, value) {
      if (!/^[0-9a-z_.-]+$/.test(key)) {
        throw new Error(`Metadata key '${key}' contains illegal characters`);
      }
      if (key.endsWith("-bin")) {
        if (!(value instanceof Uint8Array)) {
          throw new Error(`Metadata key '${key}' ends with '-bin', thus it must have binary value`);
        }
      } else {
        if (typeof value !== "string") {
          throw new Error(`Metadata key '${key}' doesn't end with '-bin', thus it must have string value`);
        }
        if (!/^[ -~]*$/.test(value)) {
          throw new Error(`Metadata value '${value}' of key '${key}' contains illegal characters`);
        }
      }
    }
    function isIterable(value) {
      return Symbol.iterator in value;
    }
  }
});

// node_modules/nice-grpc-common/lib/Status.js
var require_Status = __commonJS({
  "node_modules/nice-grpc-common/lib/Status.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Status = void 0;
    var Status2;
    (function(Status3) {
      Status3[Status3["OK"] = 0] = "OK";
      Status3[Status3["CANCELLED"] = 1] = "CANCELLED";
      Status3[Status3["UNKNOWN"] = 2] = "UNKNOWN";
      Status3[Status3["INVALID_ARGUMENT"] = 3] = "INVALID_ARGUMENT";
      Status3[Status3["DEADLINE_EXCEEDED"] = 4] = "DEADLINE_EXCEEDED";
      Status3[Status3["NOT_FOUND"] = 5] = "NOT_FOUND";
      Status3[Status3["ALREADY_EXISTS"] = 6] = "ALREADY_EXISTS";
      Status3[Status3["PERMISSION_DENIED"] = 7] = "PERMISSION_DENIED";
      Status3[Status3["RESOURCE_EXHAUSTED"] = 8] = "RESOURCE_EXHAUSTED";
      Status3[Status3["FAILED_PRECONDITION"] = 9] = "FAILED_PRECONDITION";
      Status3[Status3["ABORTED"] = 10] = "ABORTED";
      Status3[Status3["OUT_OF_RANGE"] = 11] = "OUT_OF_RANGE";
      Status3[Status3["UNIMPLEMENTED"] = 12] = "UNIMPLEMENTED";
      Status3[Status3["INTERNAL"] = 13] = "INTERNAL";
      Status3[Status3["UNAVAILABLE"] = 14] = "UNAVAILABLE";
      Status3[Status3["DATA_LOSS"] = 15] = "DATA_LOSS";
      Status3[Status3["UNAUTHENTICATED"] = 16] = "UNAUTHENTICATED";
    })(Status2 = exports.Status || (exports.Status = {}));
  }
});

// node_modules/nice-grpc-common/lib/MethodDescriptor.js
var require_MethodDescriptor = __commonJS({
  "node_modules/nice-grpc-common/lib/MethodDescriptor.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/nice-grpc-common/lib/client/CallOptions.js
var require_CallOptions = __commonJS({
  "node_modules/nice-grpc-common/lib/client/CallOptions.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/nice-grpc-common/lib/client/ClientMiddleware.js
var require_ClientMiddleware = __commonJS({
  "node_modules/nice-grpc-common/lib/client/ClientMiddleware.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/nice-grpc-common/lib/client/composeClientMiddleware.js
var require_composeClientMiddleware = __commonJS({
  "node_modules/nice-grpc-common/lib/client/composeClientMiddleware.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.composeClientMiddleware = void 0;
    function composeClientMiddleware(middleware1, middleware2) {
      return (call, options) => {
        return middleware2(Object.assign(Object.assign({}, call), { next: (request, options2) => {
          return middleware1(Object.assign(Object.assign({}, call), { request }), options2);
        } }), options);
      };
    }
    exports.composeClientMiddleware = composeClientMiddleware;
  }
});

// node_modules/ts-error/lib/helpers.js
var require_helpers = __commonJS({
  "node_modules/ts-error/lib/helpers.js"(exports) {
    "use strict";
    exports.__esModule = void 0;
    exports.__esModule = true;
    var objectSetPrototypeOfIsDefined = typeof Object.setPrototypeOf === "function";
    var objectGetPrototypeOfIsDefined = typeof Object.getPrototypeOf === "function";
    var objectDefinePropertyIsDefined = typeof Object.defineProperty === "function";
    var objectCreateIsDefined = typeof Object.create === "function";
    var objectHasOwnPropertyIsDefined = typeof Object.prototype.hasOwnProperty === "function";
    var setPrototypeOf = function setPrototypeOf2(target, prototype) {
      if (objectSetPrototypeOfIsDefined) {
        Object.setPrototypeOf(target, prototype);
      } else {
        target.__proto__ = prototype;
      }
    };
    exports.setPrototypeOf = setPrototypeOf;
    var getPrototypeOf = function getPrototypeOf2(target) {
      if (objectGetPrototypeOfIsDefined) {
        return Object.getPrototypeOf(target);
      } else {
        return target.__proto__ || target.prototype;
      }
    };
    exports.getPrototypeOf = getPrototypeOf;
    var ie8ObjectDefinePropertyBug = false;
    var defineProperty = function defineProperty2(target, name, propertyDescriptor) {
      if (objectDefinePropertyIsDefined && !ie8ObjectDefinePropertyBug) {
        try {
          Object.defineProperty(target, name, propertyDescriptor);
        } catch (e) {
          ie8ObjectDefinePropertyBug = true;
          defineProperty2(target, name, propertyDescriptor);
        }
      } else {
        target[name] = propertyDescriptor.value;
      }
    };
    exports.defineProperty = defineProperty;
    var hasOwnProperty = function hasOwnProperty2(target, name) {
      if (objectHasOwnPropertyIsDefined) {
        return target.hasOwnProperty(target, name);
      } else {
        return target[name] === void 0;
      }
    };
    exports.hasOwnProperty = hasOwnProperty;
    var objectCreate = function objectCreate2(prototype, propertyDescriptors) {
      if (objectCreateIsDefined) {
        return Object.create(prototype, propertyDescriptors);
      } else {
        var F = function F2() {
        };
        F.prototype = prototype;
        var result = new F();
        if (typeof propertyDescriptors === "undefined") {
          return result;
        }
        if (typeof propertyDescriptors === "null") {
          throw new Error("PropertyDescriptors must not be null.");
        }
        if (typeof propertyDescriptors === "object") {
          for (var key in propertyDescriptors) {
            if (hasOwnProperty(propertyDescriptors, key)) {
              result[key] = propertyDescriptors[key].value;
            }
          }
        }
        return result;
      }
    };
    exports.objectCreate = objectCreate;
  }
});

// node_modules/ts-error/lib/cjs.js
var require_cjs = __commonJS({
  "node_modules/ts-error/lib/cjs.js"(exports) {
    "use strict";
    exports.__esModule = void 0;
    exports.__esModule = true;
    var helpers = require_helpers();
    var setPrototypeOf = helpers.setPrototypeOf;
    var getPrototypeOf = helpers.getPrototypeOf;
    var defineProperty = helpers.defineProperty;
    var objectCreate = helpers.objectCreate;
    var uglyErrorPrinting = new Error().toString() === "[object Error]";
    var extendableErrorName = "";
    function ExtendableError(message) {
      var originalConstructor = this.constructor;
      var constructorName = originalConstructor.name || (function() {
        var constructorNameMatch = originalConstructor.toString().match(/^function\s*([^\s(]+)/);
        return constructorNameMatch === null ? extendableErrorName ? extendableErrorName : "Error" : constructorNameMatch[1];
      })();
      var constructorNameIsError = constructorName === "Error";
      var name = constructorNameIsError ? extendableErrorName : constructorName;
      var instance = Error.apply(this, arguments);
      setPrototypeOf(instance, getPrototypeOf(this));
      if (!(instance instanceof originalConstructor) || !(instance instanceof ExtendableError)) {
        var instance = this;
        Error.apply(this, arguments);
        defineProperty(instance, "message", {
          configurable: true,
          enumerable: false,
          value: message,
          writable: true
        });
      }
      defineProperty(instance, "name", {
        configurable: true,
        enumerable: false,
        value: name,
        writable: true
      });
      if (Error.captureStackTrace) {
        Error.captureStackTrace(
          instance,
          constructorNameIsError ? ExtendableError : originalConstructor
        );
      }
      if (instance.stack === void 0) {
        var err = new Error(message);
        err.name = instance.name;
        instance.stack = err.stack;
      }
      if (uglyErrorPrinting) {
        defineProperty(instance, "toString", {
          configurable: true,
          enumerable: false,
          value: function toString3() {
            return (this.name || "Error") + (typeof this.message === "undefined" ? "" : ": " + this.message);
          },
          writable: true
        });
      }
      return instance;
    }
    extendableErrorName = ExtendableError.name || "ExtendableError";
    ExtendableError.prototype = objectCreate(Error.prototype, {
      constructor: {
        value: Error,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    exports.ExtendableError = ExtendableError;
    exports["default"] = exports.ExtendableError;
  }
});

// node_modules/nice-grpc-common/lib/client/ClientError.js
var require_ClientError = __commonJS({
  "node_modules/nice-grpc-common/lib/client/ClientError.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ClientError = void 0;
    var ts_error_1 = require_cjs();
    var Status_1 = require_Status();
    var ClientError = class _ClientError extends ts_error_1.ExtendableError {
      constructor(path, code, details) {
        super(`${path} ${Status_1.Status[code]}: ${details}`);
        this.path = path;
        this.code = code;
        this.details = details;
        this.name = "ClientError";
        Object.defineProperty(this, "@@nice-grpc", {
          value: true
        });
        Object.defineProperty(this, "@@nice-grpc:ClientError", {
          value: true
        });
      }
      static [Symbol.hasInstance](instance) {
        if (this !== _ClientError) {
          return this.prototype.isPrototypeOf(instance);
        }
        return typeof instance === "object" && instance !== null && (instance.constructor === _ClientError || instance["@@nice-grpc:ClientError"] === true || instance.name === "ClientError" && instance["@@nice-grpc"] === true);
      }
    };
    exports.ClientError = ClientError;
  }
});

// node_modules/nice-grpc-common/lib/server/CallContext.js
var require_CallContext = __commonJS({
  "node_modules/nice-grpc-common/lib/server/CallContext.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/nice-grpc-common/lib/server/ServerMiddleware.js
var require_ServerMiddleware = __commonJS({
  "node_modules/nice-grpc-common/lib/server/ServerMiddleware.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/nice-grpc-common/lib/server/composeServerMiddleware.js
var require_composeServerMiddleware = __commonJS({
  "node_modules/nice-grpc-common/lib/server/composeServerMiddleware.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.composeServerMiddleware = void 0;
    function composeServerMiddleware(middleware1, middleware2) {
      return (call, context) => {
        return middleware1(Object.assign(Object.assign({}, call), { next: (request, context1) => {
          return middleware2(Object.assign(Object.assign({}, call), { request }), context1);
        } }), context);
      };
    }
    exports.composeServerMiddleware = composeServerMiddleware;
  }
});

// node_modules/nice-grpc-common/lib/server/ServerError.js
var require_ServerError = __commonJS({
  "node_modules/nice-grpc-common/lib/server/ServerError.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ServerError = void 0;
    var ts_error_1 = require_cjs();
    var Status_1 = require_Status();
    var ServerError = class _ServerError extends ts_error_1.ExtendableError {
      constructor(code, details) {
        super(`${Status_1.Status[code]}: ${details}`);
        this.code = code;
        this.details = details;
        this.name = "ServerError";
        Object.defineProperty(this, "@@nice-grpc", {
          value: true
        });
        Object.defineProperty(this, "@@nice-grpc:ServerError", {
          value: true
        });
      }
      static [Symbol.hasInstance](instance) {
        if (this !== _ServerError) {
          return this.prototype.isPrototypeOf(instance);
        }
        return typeof instance === "object" && instance !== null && (instance.constructor === _ServerError || instance["@@nice-grpc:ServerError"] === true || instance.name === "ServerError" && instance["@@nice-grpc"] === true);
      }
    };
    exports.ServerError = ServerError;
  }
});

// node_modules/nice-grpc-common/lib/index.js
var require_lib = __commonJS({
  "node_modules/nice-grpc-common/lib/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_Metadata(), exports);
    __exportStar(require_Status(), exports);
    __exportStar(require_MethodDescriptor(), exports);
    __exportStar(require_CallOptions(), exports);
    __exportStar(require_ClientMiddleware(), exports);
    __exportStar(require_composeClientMiddleware(), exports);
    __exportStar(require_ClientError(), exports);
    __exportStar(require_CallContext(), exports);
    __exportStar(require_ServerMiddleware(), exports);
    __exportStar(require_composeServerMiddleware(), exports);
    __exportStar(require_ServerError(), exports);
  }
});

// node_modules/nice-grpc-web/lib/service-definitions/grpc-web.js
var require_grpc_web = __commonJS({
  "node_modules/nice-grpc-web/lib/service-definitions/grpc-web.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fromGrpcWebServiceDefinition = fromGrpcWebServiceDefinition;
    exports.isGrpcWebServiceDefinition = isGrpcWebServiceDefinition;
    function fromGrpcWebServiceDefinition(definition) {
      const result = {};
      for (const [key, value] of Object.entries(definition)) {
        if (key === "serviceName") {
          continue;
        }
        const method = value;
        result[uncapitalize(key)] = {
          path: `/${definition.serviceName}/${key}`,
          requestStream: method.requestStream,
          responseStream: method.responseStream,
          requestDeserialize: method.requestType.deserializeBinary,
          requestSerialize: (value2) => value2.serializeBinary(),
          responseDeserialize: method.responseType.deserializeBinary,
          responseSerialize: (value2) => value2.serializeBinary(),
          options: {}
        };
      }
      return result;
    }
    function isGrpcWebServiceDefinition(definition) {
      return "prototype" in definition;
    }
    function uncapitalize(value) {
      if (value.length === 0) {
        return value;
      }
      return value[0].toLowerCase() + value.slice(1);
    }
  }
});

// node_modules/nice-grpc-web/lib/service-definitions/ts-proto.js
var require_ts_proto = __commonJS({
  "node_modules/nice-grpc-web/lib/service-definitions/ts-proto.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fromTsProtoServiceDefinition = fromTsProtoServiceDefinition;
    exports.isTsProtoServiceDefinition = isTsProtoServiceDefinition;
    function fromTsProtoServiceDefinition(definition) {
      const result = {};
      for (const [key, method] of Object.entries(definition.methods)) {
        const requestEncode = method.requestType.encode;
        const requestFromPartial = method.requestType.fromPartial;
        const responseEncode = method.responseType.encode;
        const responseFromPartial = method.responseType.fromPartial;
        result[key] = {
          path: `/${definition.fullName}/${method.name}`,
          requestStream: method.requestStream,
          responseStream: method.responseStream,
          requestDeserialize: method.requestType.decode,
          requestSerialize: requestFromPartial != null ? (value) => requestEncode(requestFromPartial(value)).finish() : (value) => requestEncode(value).finish(),
          responseDeserialize: method.responseType.decode,
          responseSerialize: responseFromPartial != null ? (value) => responseEncode(responseFromPartial(value)).finish() : (value) => responseEncode(value).finish(),
          options: method.options
        };
      }
      return result;
    }
    function isTsProtoServiceDefinition(definition) {
      return "name" in definition && "fullName" in definition && "methods" in definition;
    }
  }
});

// node_modules/nice-grpc-web/lib/service-definitions/index.js
var require_service_definitions = __commonJS({
  "node_modules/nice-grpc-web/lib/service-definitions/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.normalizeServiceDefinition = normalizeServiceDefinition;
    var grpc_web_1 = require_grpc_web();
    var ts_proto_1 = require_ts_proto();
    function normalizeServiceDefinition(definition) {
      if ((0, grpc_web_1.isGrpcWebServiceDefinition)(definition)) {
        return (0, grpc_web_1.fromGrpcWebServiceDefinition)(definition);
      } else if ((0, ts_proto_1.isTsProtoServiceDefinition)(definition)) {
        return (0, ts_proto_1.fromTsProtoServiceDefinition)(definition);
      } else {
        return definition;
      }
    }
  }
});

// node_modules/abort-controller-x/lib/AbortError.js
var require_AbortError = __commonJS({
  "node_modules/abort-controller-x/lib/AbortError.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.catchAbortError = exports.rethrowAbortError = exports.throwIfAborted = exports.isAbortError = exports.AbortError = void 0;
    var AbortError = class extends Error {
      constructor() {
        super("The operation has been aborted");
        this.message = "The operation has been aborted";
        this.name = "AbortError";
        if (typeof Error.captureStackTrace === "function") {
          Error.captureStackTrace(this, this.constructor);
        }
      }
    };
    exports.AbortError = AbortError;
    function isAbortError(error) {
      return typeof error === "object" && error !== null && error.name === "AbortError";
    }
    exports.isAbortError = isAbortError;
    function throwIfAborted(signal) {
      if (signal.aborted) {
        throw new AbortError();
      }
    }
    exports.throwIfAborted = throwIfAborted;
    function rethrowAbortError(error) {
      if (isAbortError(error)) {
        throw error;
      }
      return;
    }
    exports.rethrowAbortError = rethrowAbortError;
    function catchAbortError(error) {
      if (isAbortError(error)) {
        return;
      }
      throw error;
    }
    exports.catchAbortError = catchAbortError;
  }
});

// node_modules/abort-controller-x/lib/execute.js
var require_execute = __commonJS({
  "node_modules/abort-controller-x/lib/execute.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.execute = void 0;
    var AbortError_1 = require_AbortError();
    function execute2(signal, executor) {
      return new Promise((resolve2, reject) => {
        if (signal.aborted) {
          reject(new AbortError_1.AbortError());
          return;
        }
        let removeAbortListener;
        let finished = false;
        function finish() {
          if (!finished) {
            finished = true;
            if (removeAbortListener != null) {
              removeAbortListener();
            }
          }
        }
        const callback = executor((value) => {
          resolve2(value);
          finish();
        }, (reason) => {
          reject(reason);
          finish();
        });
        if (!finished) {
          const listener = () => {
            const callbackResult = callback();
            if (callbackResult == null) {
              reject(new AbortError_1.AbortError());
            } else {
              callbackResult.then(() => {
                reject(new AbortError_1.AbortError());
              }, (reason) => {
                reject(reason);
              });
            }
            finish();
          };
          signal.addEventListener("abort", listener);
          removeAbortListener = () => {
            signal.removeEventListener("abort", listener);
          };
        }
      });
    }
    exports.execute = execute2;
  }
});

// node_modules/abort-controller-x/lib/abortable.js
var require_abortable = __commonJS({
  "node_modules/abort-controller-x/lib/abortable.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.abortable = void 0;
    var execute_1 = require_execute();
    function abortable(signal, promise) {
      if (signal.aborted) {
        const noop = () => {
        };
        promise.then(noop, noop);
      }
      return (0, execute_1.execute)(signal, (resolve2, reject) => {
        promise.then(resolve2, reject);
        return () => {
        };
      });
    }
    exports.abortable = abortable;
  }
});

// node_modules/abort-controller-x/lib/delay.js
var require_delay = __commonJS({
  "node_modules/abort-controller-x/lib/delay.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.delay = void 0;
    var execute_1 = require_execute();
    function delay(signal, dueTime) {
      return (0, execute_1.execute)(signal, (resolve2) => {
        const ms = typeof dueTime === "number" ? dueTime : dueTime.getTime() - Date.now();
        const timer = setTimeout(resolve2, ms);
        return () => {
          clearTimeout(timer);
        };
      });
    }
    exports.delay = delay;
  }
});

// node_modules/abort-controller-x/lib/forever.js
var require_forever = __commonJS({
  "node_modules/abort-controller-x/lib/forever.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.forever = void 0;
    var execute_1 = require_execute();
    function forever(signal) {
      return (0, execute_1.execute)(signal, () => () => {
      });
    }
    exports.forever = forever;
  }
});

// node_modules/abort-controller-x/lib/waitForEvent.js
var require_waitForEvent = __commonJS({
  "node_modules/abort-controller-x/lib/waitForEvent.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.waitForEvent = void 0;
    var execute_1 = require_execute();
    function waitForEvent(signal, target, eventName, options) {
      return (0, execute_1.execute)(signal, (resolve2) => {
        let unlisten;
        let finished = false;
        const handler = (...args) => {
          resolve2(args.length > 1 ? args : args[0]);
          finished = true;
          if (unlisten != null) {
            unlisten();
          }
        };
        unlisten = listen(target, eventName, handler, options);
        if (finished) {
          unlisten();
        }
        return () => {
          finished = true;
          if (unlisten != null) {
            unlisten();
          }
        };
      });
    }
    exports.waitForEvent = waitForEvent;
    function listen(target, eventName, handler, options) {
      if (isEventTarget(target)) {
        target.addEventListener(eventName, handler, options);
        return () => target.removeEventListener(eventName, handler, options);
      }
      if (isJQueryStyleEventEmitter(target)) {
        target.on(eventName, handler);
        return () => target.off(eventName, handler);
      }
      if (isNodeStyleEventEmitter(target)) {
        target.addListener(eventName, handler);
        return () => target.removeListener(eventName, handler);
      }
      throw new Error("Invalid event target");
    }
    function isNodeStyleEventEmitter(sourceObj) {
      return isFunction(sourceObj.addListener) && isFunction(sourceObj.removeListener);
    }
    function isJQueryStyleEventEmitter(sourceObj) {
      return isFunction(sourceObj.on) && isFunction(sourceObj.off);
    }
    function isEventTarget(sourceObj) {
      return isFunction(sourceObj.addEventListener) && isFunction(sourceObj.removeEventListener);
    }
    var isFunction = (obj) => typeof obj === "function";
  }
});

// node_modules/abort-controller-x/lib/all.js
var require_all = __commonJS({
  "node_modules/abort-controller-x/lib/all.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.all = void 0;
    var AbortError_1 = require_AbortError();
    function all(signal, executor) {
      return new Promise((resolve2, reject) => {
        if (signal.aborted) {
          reject(new AbortError_1.AbortError());
          return;
        }
        const innerAbortController = new AbortController();
        const promises = executor(innerAbortController.signal);
        if (promises.length === 0) {
          resolve2([]);
          return;
        }
        const abortListener = () => {
          innerAbortController.abort();
        };
        signal.addEventListener("abort", abortListener);
        let rejection;
        const results = new Array(promises.length);
        let settledCount = 0;
        function settled() {
          settledCount += 1;
          if (settledCount === promises.length) {
            signal.removeEventListener("abort", abortListener);
            if (rejection != null) {
              reject(rejection.reason);
            } else {
              resolve2(results);
            }
          }
        }
        for (const [i, promise] of promises.entries()) {
          promise.then((value) => {
            results[i] = value;
            settled();
          }, (reason) => {
            innerAbortController.abort();
            if (rejection == null || !(0, AbortError_1.isAbortError)(reason) && (0, AbortError_1.isAbortError)(rejection.reason)) {
              rejection = { reason };
            }
            settled();
          });
        }
      });
    }
    exports.all = all;
  }
});

// node_modules/abort-controller-x/lib/race.js
var require_race = __commonJS({
  "node_modules/abort-controller-x/lib/race.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.race = void 0;
    var AbortError_1 = require_AbortError();
    function race(signal, executor) {
      return new Promise((resolve2, reject) => {
        if (signal.aborted) {
          reject(new AbortError_1.AbortError());
          return;
        }
        const innerAbortController = new AbortController();
        const promises = executor(innerAbortController.signal);
        const abortListener = () => {
          innerAbortController.abort();
        };
        signal.addEventListener("abort", abortListener);
        let settledCount = 0;
        function settled(result2) {
          innerAbortController.abort();
          settledCount += 1;
          if (settledCount === promises.length) {
            signal.removeEventListener("abort", abortListener);
            if (result2.status === "fulfilled") {
              resolve2(result2.value);
            } else {
              reject(result2.reason);
            }
          }
        }
        let result;
        for (const promise of promises) {
          promise.then((value) => {
            if (result == null) {
              result = { status: "fulfilled", value };
            }
            settled(result);
          }, (reason) => {
            if (result == null || !(0, AbortError_1.isAbortError)(reason) && (result.status === "fulfilled" || (0, AbortError_1.isAbortError)(result.reason))) {
              result = { status: "rejected", reason };
            }
            settled(result);
          });
        }
      });
    }
    exports.race = race;
  }
});

// node_modules/abort-controller-x/lib/retry.js
var require_retry = __commonJS({
  "node_modules/abort-controller-x/lib/retry.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.retry = void 0;
    var delay_1 = require_delay();
    var AbortError_1 = require_AbortError();
    async function retry(signal, fn, options = {}) {
      const { baseMs = 1e3, maxDelayMs = 3e4, onError, maxAttempts = Infinity } = options;
      let attempt = 0;
      const reset = () => {
        attempt = -1;
      };
      while (true) {
        try {
          return await fn(signal, attempt, reset);
        } catch (error) {
          (0, AbortError_1.rethrowAbortError)(error);
          if (attempt >= maxAttempts) {
            throw error;
          }
          let delayMs;
          if (attempt === -1) {
            delayMs = 0;
          } else {
            const backoff = Math.min(maxDelayMs, Math.pow(2, attempt) * baseMs);
            delayMs = Math.round(backoff * (1 + Math.random()) / 2);
          }
          if (onError) {
            onError(error, attempt, delayMs);
          }
          if (delayMs !== 0) {
            await (0, delay_1.delay)(signal, delayMs);
          }
          attempt += 1;
        }
      }
    }
    exports.retry = retry;
  }
});

// node_modules/abort-controller-x/lib/spawn.js
var require_spawn = __commonJS({
  "node_modules/abort-controller-x/lib/spawn.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.spawn = void 0;
    var AbortError_1 = require_AbortError();
    function spawn(signal, fn) {
      if (signal.aborted) {
        return Promise.reject(new AbortError_1.AbortError());
      }
      const deferredFunctions = [];
      const spawnAbortController = new AbortController();
      const spawnSignal = spawnAbortController.signal;
      const abortSpawn = () => {
        spawnAbortController.abort();
      };
      signal.addEventListener("abort", abortSpawn);
      const removeAbortListener = () => {
        signal.removeEventListener("abort", abortSpawn);
      };
      const tasks = /* @__PURE__ */ new Set();
      const abortTasks = () => {
        for (const task of tasks) {
          task.abort();
        }
      };
      spawnSignal.addEventListener("abort", abortTasks);
      const removeSpawnAbortListener = () => {
        spawnSignal.removeEventListener("abort", abortTasks);
      };
      let promise = new Promise((resolve2, reject) => {
        let result;
        let failure;
        fork((signal2) => fn(signal2, {
          defer(fn2) {
            deferredFunctions.push(fn2);
          },
          fork
        })).join().then((value) => {
          spawnAbortController.abort();
          result = { value };
        }, (error) => {
          spawnAbortController.abort();
          if (!(0, AbortError_1.isAbortError)(error) || failure == null) {
            failure = { error };
          }
        });
        function fork(forkFn) {
          if (spawnSignal.aborted) {
            return {
              abort() {
              },
              async join() {
                throw new AbortError_1.AbortError();
              }
            };
          }
          const taskAbortController = new AbortController();
          const taskSignal = taskAbortController.signal;
          const taskPromise = forkFn(taskSignal);
          const task = {
            abort() {
              taskAbortController.abort();
            },
            join: () => taskPromise
          };
          tasks.add(task);
          taskPromise.catch(AbortError_1.catchAbortError).catch((error) => {
            failure = { error };
            spawnAbortController.abort();
          }).finally(() => {
            tasks.delete(task);
            if (tasks.size === 0) {
              if (failure != null) {
                reject(failure.error);
              } else {
                resolve2(result.value);
              }
            }
          });
          return task;
        }
      });
      promise = promise.finally(() => {
        removeAbortListener();
        removeSpawnAbortListener();
        let deferPromise = Promise.resolve();
        for (let i = deferredFunctions.length - 1; i >= 0; i--) {
          deferPromise = deferPromise.finally(deferredFunctions[i]);
        }
        return deferPromise;
      });
      return promise;
    }
    exports.spawn = spawn;
  }
});

// node_modules/abort-controller-x/lib/run.js
var require_run = __commonJS({
  "node_modules/abort-controller-x/lib/run.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.run = void 0;
    var AbortError_1 = require_AbortError();
    function run(fn) {
      const abortController = new AbortController();
      const promise = fn(abortController.signal).catch(AbortError_1.catchAbortError);
      return () => {
        abortController.abort();
        return promise;
      };
    }
    exports.run = run;
  }
});

// node_modules/abort-controller-x/lib/proactiveRetry.js
var require_proactiveRetry = __commonJS({
  "node_modules/abort-controller-x/lib/proactiveRetry.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.proactiveRetry = void 0;
    var AbortError_1 = require_AbortError();
    var delay_1 = require_delay();
    var execute_1 = require_execute();
    function proactiveRetry(signal, fn, options = {}) {
      const { baseMs = 1e3, onError, maxAttempts = Infinity } = options;
      return (0, execute_1.execute)(signal, (resolve2, reject) => {
        const innerAbortController = new AbortController();
        let attemptsExhausted = false;
        const promises = /* @__PURE__ */ new Map();
        function handleFulfilled(value) {
          innerAbortController.abort();
          promises.clear();
          resolve2(value);
        }
        function handleRejected(err, attempt) {
          promises.delete(attempt);
          if (attemptsExhausted && promises.size === 0) {
            reject(err);
            return;
          }
          if ((0, AbortError_1.isAbortError)(err)) {
            return;
          }
          if (onError) {
            try {
              onError(err, attempt);
            } catch (err2) {
              innerAbortController.abort();
              promises.clear();
              reject(err2);
            }
          }
        }
        async function makeAttempts(signal2) {
          for (let attempt = 0; ; attempt++) {
            const promise = fn(signal2, attempt);
            promises.set(attempt, promise);
            promise.then(handleFulfilled, (err) => handleRejected(err, attempt));
            if (attempt + 1 >= maxAttempts) {
              break;
            }
            const backoff = Math.pow(2, attempt) * baseMs;
            const delayMs = Math.round(backoff * (1 + Math.random()) / 2);
            await (0, delay_1.delay)(signal2, delayMs);
          }
          attemptsExhausted = true;
        }
        makeAttempts(innerAbortController.signal).catch(AbortError_1.catchAbortError);
        return () => {
          innerAbortController.abort();
        };
      });
    }
    exports.proactiveRetry = proactiveRetry;
  }
});

// node_modules/abort-controller-x/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/abort-controller-x/lib/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_abortable(), exports);
    __exportStar(require_AbortError(), exports);
    __exportStar(require_delay(), exports);
    __exportStar(require_execute(), exports);
    __exportStar(require_forever(), exports);
    __exportStar(require_waitForEvent(), exports);
    __exportStar(require_all(), exports);
    __exportStar(require_race(), exports);
    __exportStar(require_retry(), exports);
    __exportStar(require_spawn(), exports);
    __exportStar(require_run(), exports);
    __exportStar(require_proactiveRetry(), exports);
  }
});

// node_modules/js-base64/base64.js
var require_base64 = __commonJS({
  "node_modules/js-base64/base64.js"(exports, module) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (
        // cf. https://github.com/dankogai/js-base64/issues/119
        (function() {
          var _Base64 = global2.Base64;
          var gBase64 = factory();
          gBase64.noConflict = function() {
            global2.Base64 = _Base64;
            return gBase64;
          };
          if (global2.Meteor) {
            Base64 = gBase64;
          }
          global2.Base64 = gBase64;
        })()
      );
    })(typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : exports, function() {
      "use strict";
      var version = "3.7.8";
      var VERSION = version;
      var _hasBuffer = typeof Buffer === "function";
      var _TD = typeof TextDecoder === "function" ? new TextDecoder() : void 0;
      var _TE = typeof TextEncoder === "function" ? new TextEncoder() : void 0;
      var b64ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      var b64chs = Array.prototype.slice.call(b64ch);
      var b64tab = (function(a) {
        var tab = {};
        a.forEach(function(c, i) {
          return tab[c] = i;
        });
        return tab;
      })(b64chs);
      var b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
      var _fromCC = String.fromCharCode.bind(String);
      var _U8Afrom = typeof Uint8Array.from === "function" ? Uint8Array.from.bind(Uint8Array) : function(it) {
        return new Uint8Array(Array.prototype.slice.call(it, 0));
      };
      var _mkUriSafe = function(src) {
        return src.replace(/=/g, "").replace(/[+\/]/g, function(m0) {
          return m0 == "+" ? "-" : "_";
        });
      };
      var _tidyB64 = function(s) {
        return s.replace(/[^A-Za-z0-9\+\/]/g, "");
      };
      var btoaPolyfill = function(bin) {
        var u32, c0, c1, c2, asc = "";
        var pad = bin.length % 3;
        for (var i = 0; i < bin.length; ) {
          if ((c0 = bin.charCodeAt(i++)) > 255 || (c1 = bin.charCodeAt(i++)) > 255 || (c2 = bin.charCodeAt(i++)) > 255)
            throw new TypeError("invalid character found");
          u32 = c0 << 16 | c1 << 8 | c2;
          asc += b64chs[u32 >> 18 & 63] + b64chs[u32 >> 12 & 63] + b64chs[u32 >> 6 & 63] + b64chs[u32 & 63];
        }
        return pad ? asc.slice(0, pad - 3) + "===".substring(pad) : asc;
      };
      var _btoa = typeof btoa === "function" ? function(bin) {
        return btoa(bin);
      } : _hasBuffer ? function(bin) {
        return Buffer.from(bin, "binary").toString("base64");
      } : btoaPolyfill;
      var _fromUint8Array = _hasBuffer ? function(u8a) {
        return Buffer.from(u8a).toString("base64");
      } : function(u8a) {
        var maxargs = 4096;
        var strs = [];
        for (var i = 0, l = u8a.length; i < l; i += maxargs) {
          strs.push(_fromCC.apply(null, u8a.subarray(i, i + maxargs)));
        }
        return _btoa(strs.join(""));
      };
      var fromUint8Array = function(u8a, urlsafe) {
        if (urlsafe === void 0) {
          urlsafe = false;
        }
        return urlsafe ? _mkUriSafe(_fromUint8Array(u8a)) : _fromUint8Array(u8a);
      };
      var cb_utob = function(c) {
        if (c.length < 2) {
          var cc = c.charCodeAt(0);
          return cc < 128 ? c : cc < 2048 ? _fromCC(192 | cc >>> 6) + _fromCC(128 | cc & 63) : _fromCC(224 | cc >>> 12 & 15) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
        } else {
          var cc = 65536 + (c.charCodeAt(0) - 55296) * 1024 + (c.charCodeAt(1) - 56320);
          return _fromCC(240 | cc >>> 18 & 7) + _fromCC(128 | cc >>> 12 & 63) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
        }
      };
      var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
      var utob = function(u) {
        return u.replace(re_utob, cb_utob);
      };
      var _encode = _hasBuffer ? function(s) {
        return Buffer.from(s, "utf8").toString("base64");
      } : _TE ? function(s) {
        return _fromUint8Array(_TE.encode(s));
      } : function(s) {
        return _btoa(utob(s));
      };
      var encode = function(src, urlsafe) {
        if (urlsafe === void 0) {
          urlsafe = false;
        }
        return urlsafe ? _mkUriSafe(_encode(src)) : _encode(src);
      };
      var encodeURI = function(src) {
        return encode(src, true);
      };
      var re_btou = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;
      var cb_btou = function(cccc) {
        switch (cccc.length) {
          case 4:
            var cp = (7 & cccc.charCodeAt(0)) << 18 | (63 & cccc.charCodeAt(1)) << 12 | (63 & cccc.charCodeAt(2)) << 6 | 63 & cccc.charCodeAt(3), offset = cp - 65536;
            return _fromCC((offset >>> 10) + 55296) + _fromCC((offset & 1023) + 56320);
          case 3:
            return _fromCC((15 & cccc.charCodeAt(0)) << 12 | (63 & cccc.charCodeAt(1)) << 6 | 63 & cccc.charCodeAt(2));
          default:
            return _fromCC((31 & cccc.charCodeAt(0)) << 6 | 63 & cccc.charCodeAt(1));
        }
      };
      var btou = function(b) {
        return b.replace(re_btou, cb_btou);
      };
      var atobPolyfill = function(asc) {
        asc = asc.replace(/\s+/g, "");
        if (!b64re.test(asc))
          throw new TypeError("malformed base64.");
        asc += "==".slice(2 - (asc.length & 3));
        var u24, r1, r2;
        var binArray = [];
        for (var i = 0; i < asc.length; ) {
          u24 = b64tab[asc.charAt(i++)] << 18 | b64tab[asc.charAt(i++)] << 12 | (r1 = b64tab[asc.charAt(i++)]) << 6 | (r2 = b64tab[asc.charAt(i++)]);
          if (r1 === 64) {
            binArray.push(_fromCC(u24 >> 16 & 255));
          } else if (r2 === 64) {
            binArray.push(_fromCC(u24 >> 16 & 255, u24 >> 8 & 255));
          } else {
            binArray.push(_fromCC(u24 >> 16 & 255, u24 >> 8 & 255, u24 & 255));
          }
        }
        return binArray.join("");
      };
      var _atob = typeof atob === "function" ? function(asc) {
        return atob(_tidyB64(asc));
      } : _hasBuffer ? function(asc) {
        return Buffer.from(asc, "base64").toString("binary");
      } : atobPolyfill;
      var _toUint8Array = _hasBuffer ? function(a) {
        return _U8Afrom(Buffer.from(a, "base64"));
      } : function(a) {
        return _U8Afrom(_atob(a).split("").map(function(c) {
          return c.charCodeAt(0);
        }));
      };
      var toUint8Array = function(a) {
        return _toUint8Array(_unURI(a));
      };
      var _decode = _hasBuffer ? function(a) {
        return Buffer.from(a, "base64").toString("utf8");
      } : _TD ? function(a) {
        return _TD.decode(_toUint8Array(a));
      } : function(a) {
        return btou(_atob(a));
      };
      var _unURI = function(a) {
        return _tidyB64(a.replace(/[-_]/g, function(m0) {
          return m0 == "-" ? "+" : "/";
        }));
      };
      var decode = function(src) {
        return _decode(_unURI(src));
      };
      var isValid = function(src) {
        if (typeof src !== "string")
          return false;
        var s = src.replace(/\s+/g, "").replace(/={0,2}$/, "");
        return !/[^\s0-9a-zA-Z\+/]/.test(s) || !/[^\s0-9a-zA-Z\-_]/.test(s);
      };
      var _noEnum = function(v) {
        return {
          value: v,
          enumerable: false,
          writable: true,
          configurable: true
        };
      };
      var extendString = function() {
        var _add = function(name, body) {
          return Object.defineProperty(String.prototype, name, _noEnum(body));
        };
        _add("fromBase64", function() {
          return decode(this);
        });
        _add("toBase64", function(urlsafe) {
          return encode(this, urlsafe);
        });
        _add("toBase64URI", function() {
          return encode(this, true);
        });
        _add("toBase64URL", function() {
          return encode(this, true);
        });
        _add("toUint8Array", function() {
          return toUint8Array(this);
        });
      };
      var extendUint8Array = function() {
        var _add = function(name, body) {
          return Object.defineProperty(Uint8Array.prototype, name, _noEnum(body));
        };
        _add("toBase64", function(urlsafe) {
          return fromUint8Array(this, urlsafe);
        });
        _add("toBase64URI", function() {
          return fromUint8Array(this, true);
        });
        _add("toBase64URL", function() {
          return fromUint8Array(this, true);
        });
      };
      var extendBuiltins = function() {
        extendString();
        extendUint8Array();
      };
      var gBase64 = {
        version,
        VERSION,
        atob: _atob,
        atobPolyfill,
        btoa: _btoa,
        btoaPolyfill,
        fromBase64: decode,
        toBase64: encode,
        encode,
        encodeURI,
        encodeURL: encodeURI,
        utob,
        btou,
        decode,
        isValid,
        fromUint8Array,
        toUint8Array,
        extendString,
        extendUint8Array,
        extendBuiltins
      };
      gBase64.Base64 = {};
      Object.keys(gBase64).forEach(function(k) {
        return gBase64.Base64[k] = gBase64[k];
      });
      return gBase64;
    });
  }
});

// node_modules/nice-grpc-web/lib/client/transports/fetch.js
var require_fetch = __commonJS({
  "node_modules/nice-grpc-web/lib/client/transports/fetch.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FetchTransport = FetchTransport;
    var abort_controller_x_1 = require_lib2();
    var js_base64_1 = require_base64();
    var nice_grpc_common_1 = require_lib();
    function FetchTransport(config) {
      return async function* fetchTransport({ url, body, metadata, signal, method }) {
        let requestBody;
        if (!method.requestStream) {
          let bodyBuffer;
          for await (const chunk of body) {
            bodyBuffer = chunk;
            break;
          }
          requestBody = bodyBuffer;
        } else {
          let iterator;
          requestBody = new ReadableStream({
            type: "bytes",
            start() {
              iterator = body[Symbol.asyncIterator]();
            },
            async pull(controller) {
              const { done, value } = await iterator.next();
              if (done) {
                controller.close();
              } else {
                controller.enqueue(value);
              }
            },
            async cancel() {
              var _a, _b;
              await ((_b = (_a = iterator).return) === null || _b === void 0 ? void 0 : _b.call(_a));
            }
          });
        }
        const response = await fetch(url, {
          method: "POST",
          body: requestBody,
          headers: metadataToHeaders(metadata),
          signal,
          cache: config === null || config === void 0 ? void 0 : config.cache,
          ["duplex"]: "half",
          credentials: config === null || config === void 0 ? void 0 : config.credentials
        });
        yield {
          type: "header",
          header: headersToMetadata(response.headers)
        };
        if (!response.ok) {
          const responseText = await response.text();
          throw new nice_grpc_common_1.ClientError(method.path, getStatusFromHttpCode(response.status), getErrorDetailsFromHttpResponse(response.status, responseText));
        }
        (0, abort_controller_x_1.throwIfAborted)(signal);
        const reader = response.body.getReader();
        const abortListener = () => {
          reader.cancel().catch(() => {
          });
        };
        signal.addEventListener("abort", abortListener);
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (value != null) {
              yield {
                type: "data",
                data: value
              };
            }
            if (done) {
              break;
            }
          }
        } finally {
          signal.removeEventListener("abort", abortListener);
          (0, abort_controller_x_1.throwIfAborted)(signal);
        }
      };
    }
    function metadataToHeaders(metadata) {
      const headers = new Headers();
      for (const [key, values] of metadata) {
        for (const value of values) {
          headers.append(key, typeof value === "string" ? value : js_base64_1.Base64.fromUint8Array(value));
        }
      }
      return headers;
    }
    function headersToMetadata(headers) {
      const metadata = new nice_grpc_common_1.Metadata();
      for (const [key, value] of headers) {
        if (key.endsWith("-bin")) {
          for (const item of value.split(/,\s?/)) {
            metadata.append(key, js_base64_1.Base64.toUint8Array(item));
          }
        } else {
          metadata.set(key, value);
        }
      }
      return metadata;
    }
    function getStatusFromHttpCode(statusCode) {
      switch (statusCode) {
        case 400:
          return nice_grpc_common_1.Status.INTERNAL;
        case 401:
          return nice_grpc_common_1.Status.UNAUTHENTICATED;
        case 403:
          return nice_grpc_common_1.Status.PERMISSION_DENIED;
        case 404:
          return nice_grpc_common_1.Status.UNIMPLEMENTED;
        case 429:
        case 502:
        case 503:
        case 504:
          return nice_grpc_common_1.Status.UNAVAILABLE;
        default:
          return nice_grpc_common_1.Status.UNKNOWN;
      }
    }
    function getErrorDetailsFromHttpResponse(statusCode, responseText) {
      return `Received HTTP ${statusCode} response: ` + (responseText.length > 1e3 ? responseText.slice(0, 1e3) + "... (truncated)" : responseText);
    }
  }
});

// node_modules/nice-grpc-web/lib/client/channel.js
var require_channel = __commonJS({
  "node_modules/nice-grpc-web/lib/client/channel.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createChannel = createChannel4;
    var fetch_1 = require_fetch();
    function createChannel4(address, transport = (0, fetch_1.FetchTransport)()) {
      return { address, transport };
    }
  }
});

// node_modules/nice-grpc-web/lib/utils/isAsyncIterable.js
var require_isAsyncIterable = __commonJS({
  "node_modules/nice-grpc-web/lib/utils/isAsyncIterable.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isAsyncIterable = isAsyncIterable;
    function isAsyncIterable(value) {
      return value != null && Symbol.asyncIterator in value;
    }
  }
});

// node_modules/nice-grpc-web/lib/utils/concatBuffers.js
var require_concatBuffers = __commonJS({
  "node_modules/nice-grpc-web/lib/utils/concatBuffers.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.concatBuffers = concatBuffers;
    function concatBuffers(buffers, totalLength) {
      if (buffers.length === 1) {
        return buffers[0];
      }
      const result = new Uint8Array(totalLength);
      let offset = 0;
      for (const buffer of buffers) {
        result.set(buffer, offset);
        offset += buffer.length;
      }
      return result;
    }
  }
});

// node_modules/nice-grpc-web/lib/client/decodeMetadata.js
var require_decodeMetadata = __commonJS({
  "node_modules/nice-grpc-web/lib/client/decodeMetadata.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.decodeMetadata = decodeMetadata;
    var nice_grpc_common_1 = require_lib();
    var js_base64_1 = require_base64();
    function decodeMetadata(data) {
      const metadata = (0, nice_grpc_common_1.Metadata)();
      const text = new TextDecoder().decode(data);
      for (const line of text.split("\r\n")) {
        if (!line) {
          continue;
        }
        const splitIndex = line.indexOf(":");
        if (splitIndex === -1) {
          throw new Error(`Invalid metadata line: ${line}`);
        }
        const key = line.slice(0, splitIndex).trim().toLowerCase();
        const value = line.slice(splitIndex + 1).trim();
        if (key.endsWith("-bin")) {
          for (const item of value.split(/,\s?/)) {
            metadata.append(key, js_base64_1.Base64.toUint8Array(item));
          }
        } else {
          metadata.append(key, value);
        }
      }
      return metadata;
    }
  }
});

// node_modules/nice-grpc-web/lib/client/framing.js
var require_framing = __commonJS({
  "node_modules/nice-grpc-web/lib/client/framing.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LPM_HEADER_LENGTH = void 0;
    exports.parseLpmHeader = parseLpmHeader;
    exports.encodeFrame = encodeFrame;
    exports.LPM_HEADER_LENGTH = 5;
    function parseLpmHeader(data) {
      if (data.length !== exports.LPM_HEADER_LENGTH) {
        throw new Error(`Invalid LPM header length: ${data.length}`);
      }
      const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
      const compressed = (view.getUint8(0) & 1) !== 0;
      const isMetadata = (view.getUint8(0) & 128) !== 0;
      const length = view.getUint32(1);
      return {
        compressed,
        isMetadata,
        length
      };
    }
    function encodeFrame(data) {
      const messageBytes = new Uint8Array(exports.LPM_HEADER_LENGTH + data.length);
      new DataView(messageBytes.buffer, 1, 4).setUint32(0, data.length, false);
      messageBytes.set(data, exports.LPM_HEADER_LENGTH);
      return messageBytes;
    }
  }
});

// node_modules/nice-grpc-web/lib/client/decodeResponse.js
var require_decodeResponse = __commonJS({
  "node_modules/nice-grpc-web/lib/client/decodeResponse.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.decodeResponse = decodeResponse;
    var concatBuffers_1 = require_concatBuffers();
    var decodeMetadata_1 = require_decodeMetadata();
    var framing_1 = require_framing();
    async function* decodeResponse({ response, decode, onHeader, onTrailer }) {
      let receivedHeader = false;
      let receivedTrailer = false;
      let receivedData = false;
      let buffer = createChunkBuffer(framing_1.LPM_HEADER_LENGTH);
      let lpmHeader;
      for await (const frame of response) {
        if (frame.type === "header") {
          handleHeader(frame.header);
        } else if (frame.type === "trailer") {
          handleTrailer(frame.trailer);
        } else if (frame.type === "data") {
          if (receivedTrailer) {
            throw new Error("Received data after trailer");
          }
          let { data } = frame;
          while (data.length > 0 || (lpmHeader === null || lpmHeader === void 0 ? void 0 : lpmHeader.length) === 0) {
            const position = Math.min(data.length, buffer.targetLength - buffer.totalLength);
            const chunk = data.subarray(0, position);
            data = data.subarray(position);
            buffer.chunks.push(chunk);
            buffer.totalLength += chunk.length;
            if (buffer.totalLength === buffer.targetLength) {
              const messageBytes = (0, concatBuffers_1.concatBuffers)(buffer.chunks, buffer.totalLength);
              if (lpmHeader == null) {
                lpmHeader = (0, framing_1.parseLpmHeader)(messageBytes);
                buffer = createChunkBuffer(lpmHeader.length);
              } else {
                if (lpmHeader.compressed) {
                  throw new Error("Compressed messages not supported");
                }
                if (lpmHeader.isMetadata) {
                  if (!receivedHeader) {
                    handleHeader((0, decodeMetadata_1.decodeMetadata)(messageBytes));
                  } else {
                    handleTrailer((0, decodeMetadata_1.decodeMetadata)(messageBytes));
                  }
                } else {
                  if (!receivedHeader) {
                    throw new Error("Received data before header");
                  }
                  yield decode(messageBytes);
                  receivedData = true;
                }
                lpmHeader = void 0;
                buffer = createChunkBuffer(framing_1.LPM_HEADER_LENGTH);
              }
            }
          }
        }
      }
      function handleHeader(header) {
        if (receivedHeader) {
          throw new Error("Received multiple headers");
        }
        if (receivedData) {
          throw new Error("Received header after data");
        }
        if (receivedTrailer) {
          throw new Error("Received header after trailer");
        }
        receivedHeader = true;
        onHeader(header);
      }
      function handleTrailer(trailer) {
        if (receivedTrailer) {
          throw new Error("Received multiple trailers");
        }
        receivedTrailer = true;
        onTrailer(trailer);
      }
      function createChunkBuffer(targetLength) {
        return {
          chunks: [],
          totalLength: 0,
          targetLength
        };
      }
    }
  }
});

// node_modules/nice-grpc-web/lib/client/encodeRequest.js
var require_encodeRequest = __commonJS({
  "node_modules/nice-grpc-web/lib/client/encodeRequest.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.encodeRequest = encodeRequest;
    var framing_1 = require_framing();
    async function* encodeRequest({ request, encode }) {
      for await (const data of request) {
        const bytes = encode(data);
        yield (0, framing_1.encodeFrame)(bytes);
      }
    }
  }
});

// node_modules/nice-grpc-web/lib/client/makeInternalErrorMessage.js
var require_makeInternalErrorMessage = __commonJS({
  "node_modules/nice-grpc-web/lib/client/makeInternalErrorMessage.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.makeInternalErrorMessage = makeInternalErrorMessage;
    function makeInternalErrorMessage(err) {
      if (err == null || typeof err !== "object") {
        return String(err);
      } else if (typeof err.message === "string") {
        return err.message;
      } else {
        return JSON.stringify(err);
      }
    }
  }
});

// node_modules/nice-grpc-web/lib/client/parseTrailer.js
var require_parseTrailer = __commonJS({
  "node_modules/nice-grpc-web/lib/client/parseTrailer.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseTrailer = parseTrailer;
    var nice_grpc_common_1 = require_lib();
    function parseTrailer(trailer) {
      let status;
      const statusValue = trailer.get("grpc-status");
      if (statusValue != null) {
        const statusNum = +statusValue;
        if (statusNum in nice_grpc_common_1.Status) {
          status = statusNum;
        } else {
          throw new Error(`Received invalid status code from server: ${statusValue}`);
        }
      } else {
        throw new Error("Received no status code from server");
      }
      let message = trailer.get("grpc-message");
      if (message != null) {
        try {
          message = decodeURIComponent(message);
        } catch (_a) {
        }
      }
      const trailerCopy = (0, nice_grpc_common_1.Metadata)(trailer);
      trailerCopy.delete("grpc-status");
      trailerCopy.delete("grpc-message");
      return {
        status,
        message,
        trailer: trailerCopy
      };
    }
  }
});

// node_modules/nice-grpc-web/lib/client/makeCall.js
var require_makeCall = __commonJS({
  "node_modules/nice-grpc-web/lib/client/makeCall.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.makeCall = makeCall;
    var abort_controller_x_1 = require_lib2();
    var nice_grpc_common_1 = require_lib();
    var decodeResponse_1 = require_decodeResponse();
    var encodeRequest_1 = require_encodeRequest();
    var makeInternalErrorMessage_1 = require_makeInternalErrorMessage();
    var parseTrailer_1 = require_parseTrailer();
    async function* makeCall(definition, channel, request, options) {
      const { metadata, signal = new AbortController().signal, onHeader, onTrailer } = options;
      (0, abort_controller_x_1.throwIfAborted)(signal);
      let receivedTrailersOnly = false;
      let status;
      let message;
      function handleTrailer(trailer) {
        if (receivedTrailersOnly) {
          if (new Map(trailer).size > 0) {
            throw new nice_grpc_common_1.ClientError(definition.path, nice_grpc_common_1.Status.INTERNAL, "Received non-empty trailer after trailers-only response");
          } else {
            return;
          }
        }
        const parsedTrailer = (0, parseTrailer_1.parseTrailer)(trailer);
        ({ status, message } = parsedTrailer);
        onTrailer === null || onTrailer === void 0 ? void 0 : onTrailer(parsedTrailer.trailer);
      }
      const finalMetadata = (0, nice_grpc_common_1.Metadata)(metadata);
      finalMetadata.set("content-type", "application/grpc-web+proto");
      finalMetadata.set("x-grpc-web", "1");
      const innerAbortController = new AbortController();
      const abortListener = () => {
        innerAbortController.abort();
      };
      signal.addEventListener("abort", abortListener);
      let finished = false;
      let requestError;
      async function* interceptRequestError() {
        try {
          for await (const item of request) {
            if (finished) {
              throw new Error("Request finished");
            }
            yield item;
          }
        } catch (err) {
          requestError = { err };
          innerAbortController.abort();
          throw err;
        }
      }
      async function* handleTransportErrors() {
        try {
          return yield* channel.transport({
            url: channel.address + definition.path,
            metadata: finalMetadata,
            body: (0, encodeRequest_1.encodeRequest)({
              request: interceptRequestError(),
              encode: definition.requestSerialize
            }),
            signal: innerAbortController.signal,
            method: definition
          });
        } catch (err) {
          (0, abort_controller_x_1.rethrowAbortError)(err);
          throw new nice_grpc_common_1.ClientError(definition.path, nice_grpc_common_1.Status.UNKNOWN, `Transport error: ${(0, makeInternalErrorMessage_1.makeInternalErrorMessage)(err)}`);
        }
      }
      const response = (0, decodeResponse_1.decodeResponse)({
        response: handleTransportErrors(),
        decode: definition.responseDeserialize,
        onHeader(header) {
          const isTrailersOnly = header.has("grpc-status");
          if (isTrailersOnly) {
            handleTrailer(header);
            receivedTrailersOnly = true;
          } else {
            onHeader === null || onHeader === void 0 ? void 0 : onHeader(header);
          }
        },
        onTrailer(trailer) {
          handleTrailer(trailer);
        }
      });
      try {
        yield* response;
      } catch (err) {
        if (requestError !== void 0) {
          throw requestError.err;
        } else if (err instanceof nice_grpc_common_1.ClientError || (0, abort_controller_x_1.isAbortError)(err)) {
          throw err;
        } else {
          throw new nice_grpc_common_1.ClientError(definition.path, nice_grpc_common_1.Status.INTERNAL, (0, makeInternalErrorMessage_1.makeInternalErrorMessage)(err));
        }
      } finally {
        finished = true;
        signal.removeEventListener("abort", abortListener);
        if (status != null && status !== nice_grpc_common_1.Status.OK) {
          throw new nice_grpc_common_1.ClientError(definition.path, status, message !== null && message !== void 0 ? message : "");
        }
      }
      if (status == null) {
        throw new nice_grpc_common_1.ClientError(definition.path, nice_grpc_common_1.Status.UNKNOWN, 'Response stream closed without gRPC status. This may indicate a misconfigured CORS policy on the server: Access-Control-Expose-Headers must include "grpc-status" and "grpc-message".');
      }
    }
  }
});

// node_modules/nice-grpc-web/lib/client/createBidiStreamingMethod.js
var require_createBidiStreamingMethod = __commonJS({
  "node_modules/nice-grpc-web/lib/client/createBidiStreamingMethod.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createBidiStreamingMethod = createBidiStreamingMethod;
    var isAsyncIterable_1 = require_isAsyncIterable();
    var makeCall_1 = require_makeCall();
    function createBidiStreamingMethod(definition, channel, middleware, defaultOptions) {
      const methodDescriptor = {
        path: definition.path,
        requestStream: definition.requestStream,
        responseStream: definition.responseStream,
        options: definition.options
      };
      async function* bidiStreamingMethod(request, options) {
        if (!(0, isAsyncIterable_1.isAsyncIterable)(request)) {
          throw new Error("A middleware passed invalid request to next(): expected a single message for bidirectional streaming method");
        }
        const response = (0, makeCall_1.makeCall)(definition, channel, request, options);
        yield* response;
      }
      const method = middleware == null ? bidiStreamingMethod : (request, options) => middleware({
        method: methodDescriptor,
        requestStream: true,
        request,
        responseStream: true,
        next: bidiStreamingMethod
      }, options);
      return (request, options) => {
        const iterable = method(request, {
          ...defaultOptions,
          ...options
        });
        const iterator = iterable[Symbol.asyncIterator]();
        return {
          [Symbol.asyncIterator]() {
            return {
              async next() {
                const result = await iterator.next();
                if (result.done && result.value != null) {
                  return await iterator.throw(new Error("A middleware returned a message, but expected to return void for bidirectional streaming method"));
                }
                return result;
              },
              return() {
                return iterator.return();
              },
              throw(err) {
                return iterator.throw(err);
              }
            };
          }
        };
      };
    }
  }
});

// node_modules/nice-grpc-web/lib/client/createClientStreamingMethod.js
var require_createClientStreamingMethod = __commonJS({
  "node_modules/nice-grpc-web/lib/client/createClientStreamingMethod.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createClientStreamingMethod = createClientStreamingMethod;
    var nice_grpc_common_1 = require_lib();
    var isAsyncIterable_1 = require_isAsyncIterable();
    var makeCall_1 = require_makeCall();
    function createClientStreamingMethod(definition, channel, middleware, defaultOptions) {
      const methodDescriptor = {
        path: definition.path,
        requestStream: definition.requestStream,
        responseStream: definition.responseStream,
        options: definition.options
      };
      async function* clientStreamingMethod(request, options) {
        if (!(0, isAsyncIterable_1.isAsyncIterable)(request)) {
          throw Error("A middleware passed invalid request to next(): expected a single message for client streaming method");
        }
        const response = (0, makeCall_1.makeCall)(definition, channel, request, options);
        let unaryResponse;
        for await (const message of response) {
          if (unaryResponse != null) {
            throw new nice_grpc_common_1.ClientError(definition.path, nice_grpc_common_1.Status.INTERNAL, "Received more than one message from server for client streaming method");
          }
          unaryResponse = message;
        }
        if (unaryResponse == null) {
          throw new nice_grpc_common_1.ClientError(definition.path, nice_grpc_common_1.Status.INTERNAL, "Server did not return a response");
        }
        return unaryResponse;
      }
      const method = middleware == null ? clientStreamingMethod : (request, options) => middleware({
        method: methodDescriptor,
        requestStream: true,
        request,
        responseStream: false,
        next: clientStreamingMethod
      }, options);
      return async (request, options) => {
        const iterable = method(request, {
          ...defaultOptions,
          ...options
        });
        const iterator = iterable[Symbol.asyncIterator]();
        let result = await iterator.next();
        while (true) {
          if (!result.done) {
            result = await iterator.throw(new Error("A middleware yielded a message, but expected to only return a message for client streaming method"));
            continue;
          }
          if (result.value == null) {
            result = await iterator.throw(new Error("A middleware returned void, but expected to return a message for client streaming method"));
            continue;
          }
          return result.value;
        }
      };
    }
  }
});

// node_modules/nice-grpc-web/lib/utils/asyncIterableOf.js
var require_asyncIterableOf = __commonJS({
  "node_modules/nice-grpc-web/lib/utils/asyncIterableOf.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.asyncIterableOf = asyncIterableOf;
    async function* asyncIterableOf(item) {
      yield item;
    }
  }
});

// node_modules/nice-grpc-web/lib/client/createServerStreamingMethod.js
var require_createServerStreamingMethod = __commonJS({
  "node_modules/nice-grpc-web/lib/client/createServerStreamingMethod.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createServerStreamingMethod = createServerStreamingMethod;
    var asyncIterableOf_1 = require_asyncIterableOf();
    var isAsyncIterable_1 = require_isAsyncIterable();
    var makeCall_1 = require_makeCall();
    function createServerStreamingMethod(definition, channel, middleware, defaultOptions) {
      const methodDescriptor = {
        path: definition.path,
        requestStream: definition.requestStream,
        responseStream: definition.responseStream,
        options: definition.options
      };
      async function* serverStreamingMethod(request, options) {
        if ((0, isAsyncIterable_1.isAsyncIterable)(request)) {
          throw new Error("A middleware passed invalid request to next(): expected a single message for server streaming method");
        }
        const response = (0, makeCall_1.makeCall)(definition, channel, (0, asyncIterableOf_1.asyncIterableOf)(request), options);
        yield* response;
      }
      const method = middleware == null ? serverStreamingMethod : (request, options) => middleware({
        method: methodDescriptor,
        requestStream: false,
        request,
        responseStream: true,
        next: serverStreamingMethod
      }, options);
      return (request, options) => {
        const iterable = method(request, {
          ...defaultOptions,
          ...options
        });
        const iterator = iterable[Symbol.asyncIterator]();
        return {
          [Symbol.asyncIterator]() {
            return {
              async next() {
                const result = await iterator.next();
                if (result.done && result.value != null) {
                  return await iterator.throw(new Error("A middleware returned a message, but expected to return void for server streaming method"));
                }
                return result;
              },
              return() {
                return iterator.return();
              },
              throw(err) {
                return iterator.throw(err);
              }
            };
          }
        };
      };
    }
  }
});

// node_modules/nice-grpc-web/lib/client/createUnaryMethod.js
var require_createUnaryMethod = __commonJS({
  "node_modules/nice-grpc-web/lib/client/createUnaryMethod.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createUnaryMethod = createUnaryMethod;
    var nice_grpc_common_1 = require_lib();
    var asyncIterableOf_1 = require_asyncIterableOf();
    var isAsyncIterable_1 = require_isAsyncIterable();
    var makeCall_1 = require_makeCall();
    function createUnaryMethod(definition, channel, middleware, defaultOptions) {
      const methodDescriptor = {
        path: definition.path,
        requestStream: definition.requestStream,
        responseStream: definition.responseStream,
        options: definition.options
      };
      async function* unaryMethod(request, options) {
        if ((0, isAsyncIterable_1.isAsyncIterable)(request)) {
          throw new Error("A middleware passed invalid request to next(): expected a single message for unary method");
        }
        const response = (0, makeCall_1.makeCall)(definition, channel, (0, asyncIterableOf_1.asyncIterableOf)(request), options);
        let unaryResponse;
        for await (const message of response) {
          if (unaryResponse != null) {
            throw new nice_grpc_common_1.ClientError(definition.path, nice_grpc_common_1.Status.INTERNAL, "Received more than one message from server for unary method");
          }
          unaryResponse = message;
        }
        if (unaryResponse == null) {
          throw new nice_grpc_common_1.ClientError(definition.path, nice_grpc_common_1.Status.INTERNAL, "Server did not return a response");
        }
        return unaryResponse;
      }
      const method = middleware == null ? unaryMethod : (request, options) => middleware({
        method: methodDescriptor,
        requestStream: false,
        request,
        responseStream: false,
        next: unaryMethod
      }, options);
      return async (request, options) => {
        const iterable = method(request, {
          ...defaultOptions,
          ...options
        });
        const iterator = iterable[Symbol.asyncIterator]();
        let result = await iterator.next();
        while (true) {
          if (!result.done) {
            result = await iterator.throw(new Error("A middleware yielded a message, but expected to only return a message for unary method"));
            continue;
          }
          if (result.value == null) {
            result = await iterator.throw(new Error("A middleware returned void, but expected to return a message for unary method"));
            continue;
          }
          return result.value;
        }
      };
    }
  }
});

// node_modules/nice-grpc-web/lib/client/ClientFactory.js
var require_ClientFactory = __commonJS({
  "node_modules/nice-grpc-web/lib/client/ClientFactory.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createClientFactory = createClientFactory4;
    exports.createClient = createClient;
    var nice_grpc_common_1 = require_lib();
    var service_definitions_1 = require_service_definitions();
    var createBidiStreamingMethod_1 = require_createBidiStreamingMethod();
    var createClientStreamingMethod_1 = require_createClientStreamingMethod();
    var createServerStreamingMethod_1 = require_createServerStreamingMethod();
    var createUnaryMethod_1 = require_createUnaryMethod();
    function createClientFactory4() {
      return createClientFactoryWithMiddleware();
    }
    function createClient(definition, channel, defaultCallOptions) {
      return createClientFactory4().create(definition, channel, defaultCallOptions);
    }
    function createClientFactoryWithMiddleware(middleware) {
      return {
        use(newMiddleware) {
          return createClientFactoryWithMiddleware(middleware == null ? newMiddleware : (0, nice_grpc_common_1.composeClientMiddleware)(middleware, newMiddleware));
        },
        create(definition, channel, defaultCallOptions = {}) {
          const client = {};
          const methodEntries = Object.entries((0, service_definitions_1.normalizeServiceDefinition)(definition));
          for (const [methodName, methodDefinition] of methodEntries) {
            const defaultOptions = {
              ...defaultCallOptions["*"],
              ...defaultCallOptions[methodName]
            };
            if (!methodDefinition.requestStream) {
              if (!methodDefinition.responseStream) {
                client[methodName] = (0, createUnaryMethod_1.createUnaryMethod)(methodDefinition, channel, middleware, defaultOptions);
              } else {
                client[methodName] = (0, createServerStreamingMethod_1.createServerStreamingMethod)(methodDefinition, channel, middleware, defaultOptions);
              }
            } else {
              if (!methodDefinition.responseStream) {
                client[methodName] = (0, createClientStreamingMethod_1.createClientStreamingMethod)(methodDefinition, channel, middleware, defaultOptions);
              } else {
                client[methodName] = (0, createBidiStreamingMethod_1.createBidiStreamingMethod)(methodDefinition, channel, middleware, defaultOptions);
              }
            }
          }
          return client;
        }
      };
    }
  }
});

// node_modules/nice-grpc-web/lib/client/Client.js
var require_Client = __commonJS({
  "node_modules/nice-grpc-web/lib/client/Client.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/isomorphic-ws/browser.js
var browser_exports = {};
__export(browser_exports, {
  default: () => browser_default
});
var ws, browser_default;
var init_browser = __esm({
  "node_modules/isomorphic-ws/browser.js"() {
    ws = null;
    if (typeof WebSocket !== "undefined") {
      ws = WebSocket;
    } else if (typeof MozWebSocket !== "undefined") {
      ws = MozWebSocket;
    } else if (typeof global !== "undefined") {
      ws = global.WebSocket || global.MozWebSocket;
    } else if (typeof window !== "undefined") {
      ws = window.WebSocket || window.MozWebSocket;
    } else if (typeof self !== "undefined") {
      ws = self.WebSocket || self.MozWebSocket;
    }
    browser_default = ws;
  }
});

// node_modules/nice-grpc-web/lib/utils/AsyncSink.js
var require_AsyncSink = __commonJS({
  "node_modules/nice-grpc-web/lib/utils/AsyncSink.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AsyncSink = void 0;
    var ARRAY_VALUE = "value";
    var ARRAY_ERROR = "error";
    var AsyncSink = class {
      constructor() {
        this._ended = false;
        this._values = [];
        this._resolvers = [];
      }
      [Symbol.asyncIterator]() {
        return this;
      }
      write(value) {
        this._push({ type: ARRAY_VALUE, value });
      }
      error(error) {
        this._push({ type: ARRAY_ERROR, error });
      }
      _push(item) {
        if (this._ended) {
          return;
        }
        if (this._resolvers.length > 0) {
          const { resolve: resolve2, reject } = this._resolvers.shift();
          if (item.type === ARRAY_ERROR) {
            reject(item.error);
          } else {
            resolve2({ done: false, value: item.value });
          }
        } else {
          this._values.push(item);
        }
      }
      next() {
        if (this._values.length > 0) {
          const { type, value, error } = this._values.shift();
          if (type === ARRAY_ERROR) {
            return Promise.reject(error);
          } else {
            return Promise.resolve({ done: false, value });
          }
        }
        if (this._ended) {
          return Promise.resolve({ done: true });
        }
        return new Promise((resolve2, reject) => {
          this._resolvers.push({ resolve: resolve2, reject });
        });
      }
      end() {
        while (this._resolvers.length > 0) {
          this._resolvers.shift().resolve({ done: true });
        }
        this._ended = true;
      }
    };
    exports.AsyncSink = AsyncSink;
  }
});

// node_modules/nice-grpc-web/lib/client/transports/websocket.js
var require_websocket = __commonJS({
  "node_modules/nice-grpc-web/lib/client/transports/websocket.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WebsocketTransport = WebsocketTransport;
    var abort_controller_x_1 = require_lib2();
    var isomorphic_ws_1 = __importDefault((init_browser(), __toCommonJS(browser_exports)));
    var js_base64_1 = require_base64();
    var AsyncSink_1 = require_AsyncSink();
    function WebsocketTransport() {
      return async function* ({ url, body, metadata, signal }) {
        if (signal.aborted) {
          throw new abort_controller_x_1.AbortError();
        }
        const frames = new AsyncSink_1.AsyncSink();
        signal.addEventListener("abort", () => {
          frames.error(new abort_controller_x_1.AbortError());
        });
        const websocketUrl = new URL(url);
        websocketUrl.protocol = websocketUrl.protocol.replace("http", "ws");
        const webSocket = new isomorphic_ws_1.default(websocketUrl, ["grpc-websockets"]);
        webSocket.binaryType = "arraybuffer";
        webSocket.addEventListener("message", (event) => {
          if (event.data instanceof ArrayBuffer) {
            frames.write({
              type: "data",
              data: new Uint8Array(event.data)
            });
          } else {
            frames.error(new Error(`Unexpected message type: ${typeof event.data}`));
          }
        });
        webSocket.addEventListener("close", (event) => {
          if (event.wasClean) {
            frames.end();
          } else {
            frames.error(new Error(`WebSocket closed with code ${event.code}` + (event.reason && `: ${event.reason}`)));
          }
        });
        const pipeAbortController = new AbortController();
        pipeBody(pipeAbortController.signal, metadata, body, webSocket).catch((err) => {
          if (!(0, abort_controller_x_1.isAbortError)(err)) {
            frames.error(err);
          }
        });
        try {
          return yield* frames;
        } finally {
          pipeAbortController.abort();
          webSocket.close();
        }
      };
    }
    async function pipeBody(signal, metadata, body, webSocket) {
      if (webSocket.readyState == isomorphic_ws_1.default.CONNECTING) {
        await (0, abort_controller_x_1.waitForEvent)(signal, webSocket, "open");
      }
      webSocket.send(encodeMetadata(metadata));
      for await (const chunk of body) {
        (0, abort_controller_x_1.throwIfAborted)(signal);
        const data = new Uint8Array(chunk.length + 1);
        data.set([0], 0);
        data.set(chunk, 1);
        webSocket.send(data);
      }
      webSocket.send(new Uint8Array([1]));
    }
    function encodeMetadata(metadata) {
      let result = "";
      for (const [key, values] of metadata) {
        for (const value of values) {
          const valueString = typeof value === "string" ? value : js_base64_1.Base64.fromUint8Array(value);
          const pairString = `${key}: ${valueString}\r
`;
          for (let i = 0; i < pairString.length; i++) {
            const charCode = pairString.charCodeAt(i);
            if (!isValidCharCode(charCode)) {
              throw new Error(`Metadata contains invalid characters: '${pairString}'`);
            }
          }
          result += pairString;
        }
      }
      return new TextEncoder().encode(result);
    }
    function isValidCharCode(val) {
      return val === 9 || val === 10 || val === 13 || val >= 32 && val <= 126;
    }
  }
});

// node_modules/nice-grpc-web/lib/client/transports/nodeHttp/browser.js
var require_browser = __commonJS({
  "node_modules/nice-grpc-web/lib/client/transports/nodeHttp/browser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NodeHttpTransport = NodeHttpTransport;
    function NodeHttpTransport() {
      throw new Error("NodeHttpTransport is not supported in the browser");
    }
  }
});

// node_modules/nice-grpc-web/lib/index.js
var require_lib3 = __commonJS({
  "node_modules/nice-grpc-web/lib/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NodeHttpTransport = exports.WebsocketTransport = exports.FetchTransport = exports.Status = exports.Metadata = exports.composeClientMiddleware = exports.ClientError = void 0;
    var nice_grpc_common_1 = require_lib();
    Object.defineProperty(exports, "ClientError", { enumerable: true, get: function() {
      return nice_grpc_common_1.ClientError;
    } });
    Object.defineProperty(exports, "composeClientMiddleware", { enumerable: true, get: function() {
      return nice_grpc_common_1.composeClientMiddleware;
    } });
    Object.defineProperty(exports, "Metadata", { enumerable: true, get: function() {
      return nice_grpc_common_1.Metadata;
    } });
    Object.defineProperty(exports, "Status", { enumerable: true, get: function() {
      return nice_grpc_common_1.Status;
    } });
    __exportStar(require_service_definitions(), exports);
    __exportStar(require_channel(), exports);
    __exportStar(require_ClientFactory(), exports);
    __exportStar(require_Client(), exports);
    var fetch_1 = require_fetch();
    Object.defineProperty(exports, "FetchTransport", { enumerable: true, get: function() {
      return fetch_1.FetchTransport;
    } });
    var websocket_1 = require_websocket();
    Object.defineProperty(exports, "WebsocketTransport", { enumerable: true, get: function() {
      return websocket_1.WebsocketTransport;
    } });
    var nodeHttp_1 = require_browser();
    Object.defineProperty(exports, "NodeHttpTransport", { enumerable: true, get: function() {
      return nodeHttp_1.NodeHttpTransport;
    } });
  }
});

// ../../daisi-sdk-typescript/node_modules/nice-grpc-common/lib/Metadata.js
var require_Metadata2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/nice-grpc-common/lib/Metadata.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Metadata = void 0;
    exports.Metadata = function Metadata2(init) {
      const data = /* @__PURE__ */ new Map();
      const metadata = {
        set(key, value) {
          key = normalizeKey(key);
          if (Array.isArray(value)) {
            if (value.length === 0) {
              data.delete(key);
            } else {
              for (const item of value) {
                validate(key, item);
              }
              data.set(key, key.endsWith("-bin") ? value : [value.join(", ")]);
            }
          } else {
            validate(key, value);
            data.set(key, [value]);
          }
          return metadata;
        },
        append(key, value) {
          key = normalizeKey(key);
          validate(key, value);
          let values = data.get(key);
          if (values == null) {
            values = [];
            data.set(key, values);
          }
          values.push(value);
          if (!key.endsWith("-bin")) {
            data.set(key, [values.join(", ")]);
          }
          return metadata;
        },
        delete(key) {
          key = normalizeKey(key);
          data.delete(key);
        },
        get(key) {
          var _a;
          key = normalizeKey(key);
          return (_a = data.get(key)) === null || _a === void 0 ? void 0 : _a[0];
        },
        getAll(key) {
          var _a;
          key = normalizeKey(key);
          return (_a = data.get(key)) !== null && _a !== void 0 ? _a : [];
        },
        has(key) {
          key = normalizeKey(key);
          return data.has(key);
        },
        [Symbol.iterator]() {
          return data[Symbol.iterator]();
        }
      };
      if (init != null) {
        const entries = isIterable(init) ? init : Object.entries(init);
        for (const [key, value] of entries) {
          metadata.set(key, value);
        }
      }
      return metadata;
    };
    function normalizeKey(key) {
      return key.toLowerCase();
    }
    function validate(key, value) {
      if (!/^[0-9a-z_.-]+$/.test(key)) {
        throw new Error(`Metadata key '${key}' contains illegal characters`);
      }
      if (key.endsWith("-bin")) {
        if (!(value instanceof Uint8Array)) {
          throw new Error(`Metadata key '${key}' ends with '-bin', thus it must have binary value`);
        }
      } else {
        if (typeof value !== "string") {
          throw new Error(`Metadata key '${key}' doesn't end with '-bin', thus it must have string value`);
        }
        if (!/^[ -~]*$/.test(value)) {
          throw new Error(`Metadata value '${value}' of key '${key}' contains illegal characters`);
        }
      }
    }
    function isIterable(value) {
      return Symbol.iterator in value;
    }
  }
});

// ../../daisi-sdk-typescript/node_modules/nice-grpc-common/lib/Status.js
var require_Status2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/nice-grpc-common/lib/Status.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Status = void 0;
    var Status2;
    (function(Status3) {
      Status3[Status3["OK"] = 0] = "OK";
      Status3[Status3["CANCELLED"] = 1] = "CANCELLED";
      Status3[Status3["UNKNOWN"] = 2] = "UNKNOWN";
      Status3[Status3["INVALID_ARGUMENT"] = 3] = "INVALID_ARGUMENT";
      Status3[Status3["DEADLINE_EXCEEDED"] = 4] = "DEADLINE_EXCEEDED";
      Status3[Status3["NOT_FOUND"] = 5] = "NOT_FOUND";
      Status3[Status3["ALREADY_EXISTS"] = 6] = "ALREADY_EXISTS";
      Status3[Status3["PERMISSION_DENIED"] = 7] = "PERMISSION_DENIED";
      Status3[Status3["RESOURCE_EXHAUSTED"] = 8] = "RESOURCE_EXHAUSTED";
      Status3[Status3["FAILED_PRECONDITION"] = 9] = "FAILED_PRECONDITION";
      Status3[Status3["ABORTED"] = 10] = "ABORTED";
      Status3[Status3["OUT_OF_RANGE"] = 11] = "OUT_OF_RANGE";
      Status3[Status3["UNIMPLEMENTED"] = 12] = "UNIMPLEMENTED";
      Status3[Status3["INTERNAL"] = 13] = "INTERNAL";
      Status3[Status3["UNAVAILABLE"] = 14] = "UNAVAILABLE";
      Status3[Status3["DATA_LOSS"] = 15] = "DATA_LOSS";
      Status3[Status3["UNAUTHENTICATED"] = 16] = "UNAUTHENTICATED";
    })(Status2 = exports.Status || (exports.Status = {}));
  }
});

// ../../daisi-sdk-typescript/node_modules/nice-grpc-common/lib/MethodDescriptor.js
var require_MethodDescriptor2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/nice-grpc-common/lib/MethodDescriptor.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// ../../daisi-sdk-typescript/node_modules/nice-grpc-common/lib/client/CallOptions.js
var require_CallOptions2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/nice-grpc-common/lib/client/CallOptions.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// ../../daisi-sdk-typescript/node_modules/nice-grpc-common/lib/client/ClientMiddleware.js
var require_ClientMiddleware2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/nice-grpc-common/lib/client/ClientMiddleware.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// ../../daisi-sdk-typescript/node_modules/nice-grpc-common/lib/client/composeClientMiddleware.js
var require_composeClientMiddleware2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/nice-grpc-common/lib/client/composeClientMiddleware.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.composeClientMiddleware = void 0;
    function composeClientMiddleware(middleware1, middleware2) {
      return (call, options) => {
        return middleware2(Object.assign(Object.assign({}, call), { next: (request, options2) => {
          return middleware1(Object.assign(Object.assign({}, call), { request }), options2);
        } }), options);
      };
    }
    exports.composeClientMiddleware = composeClientMiddleware;
  }
});

// ../../daisi-sdk-typescript/node_modules/ts-error/lib/helpers.js
var require_helpers2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/ts-error/lib/helpers.js"(exports) {
    "use strict";
    exports.__esModule = void 0;
    exports.__esModule = true;
    var objectSetPrototypeOfIsDefined = typeof Object.setPrototypeOf === "function";
    var objectGetPrototypeOfIsDefined = typeof Object.getPrototypeOf === "function";
    var objectDefinePropertyIsDefined = typeof Object.defineProperty === "function";
    var objectCreateIsDefined = typeof Object.create === "function";
    var objectHasOwnPropertyIsDefined = typeof Object.prototype.hasOwnProperty === "function";
    var setPrototypeOf = function setPrototypeOf2(target, prototype) {
      if (objectSetPrototypeOfIsDefined) {
        Object.setPrototypeOf(target, prototype);
      } else {
        target.__proto__ = prototype;
      }
    };
    exports.setPrototypeOf = setPrototypeOf;
    var getPrototypeOf = function getPrototypeOf2(target) {
      if (objectGetPrototypeOfIsDefined) {
        return Object.getPrototypeOf(target);
      } else {
        return target.__proto__ || target.prototype;
      }
    };
    exports.getPrototypeOf = getPrototypeOf;
    var ie8ObjectDefinePropertyBug = false;
    var defineProperty = function defineProperty2(target, name, propertyDescriptor) {
      if (objectDefinePropertyIsDefined && !ie8ObjectDefinePropertyBug) {
        try {
          Object.defineProperty(target, name, propertyDescriptor);
        } catch (e) {
          ie8ObjectDefinePropertyBug = true;
          defineProperty2(target, name, propertyDescriptor);
        }
      } else {
        target[name] = propertyDescriptor.value;
      }
    };
    exports.defineProperty = defineProperty;
    var hasOwnProperty = function hasOwnProperty2(target, name) {
      if (objectHasOwnPropertyIsDefined) {
        return target.hasOwnProperty(target, name);
      } else {
        return target[name] === void 0;
      }
    };
    exports.hasOwnProperty = hasOwnProperty;
    var objectCreate = function objectCreate2(prototype, propertyDescriptors) {
      if (objectCreateIsDefined) {
        return Object.create(prototype, propertyDescriptors);
      } else {
        var F = function F2() {
        };
        F.prototype = prototype;
        var result = new F();
        if (typeof propertyDescriptors === "undefined") {
          return result;
        }
        if (typeof propertyDescriptors === "null") {
          throw new Error("PropertyDescriptors must not be null.");
        }
        if (typeof propertyDescriptors === "object") {
          for (var key in propertyDescriptors) {
            if (hasOwnProperty(propertyDescriptors, key)) {
              result[key] = propertyDescriptors[key].value;
            }
          }
        }
        return result;
      }
    };
    exports.objectCreate = objectCreate;
  }
});

// ../../daisi-sdk-typescript/node_modules/ts-error/lib/cjs.js
var require_cjs2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/ts-error/lib/cjs.js"(exports) {
    "use strict";
    exports.__esModule = void 0;
    exports.__esModule = true;
    var helpers = require_helpers2();
    var setPrototypeOf = helpers.setPrototypeOf;
    var getPrototypeOf = helpers.getPrototypeOf;
    var defineProperty = helpers.defineProperty;
    var objectCreate = helpers.objectCreate;
    var uglyErrorPrinting = new Error().toString() === "[object Error]";
    var extendableErrorName = "";
    function ExtendableError(message) {
      var originalConstructor = this.constructor;
      var constructorName = originalConstructor.name || (function() {
        var constructorNameMatch = originalConstructor.toString().match(/^function\s*([^\s(]+)/);
        return constructorNameMatch === null ? extendableErrorName ? extendableErrorName : "Error" : constructorNameMatch[1];
      })();
      var constructorNameIsError = constructorName === "Error";
      var name = constructorNameIsError ? extendableErrorName : constructorName;
      var instance = Error.apply(this, arguments);
      setPrototypeOf(instance, getPrototypeOf(this));
      if (!(instance instanceof originalConstructor) || !(instance instanceof ExtendableError)) {
        var instance = this;
        Error.apply(this, arguments);
        defineProperty(instance, "message", {
          configurable: true,
          enumerable: false,
          value: message,
          writable: true
        });
      }
      defineProperty(instance, "name", {
        configurable: true,
        enumerable: false,
        value: name,
        writable: true
      });
      if (Error.captureStackTrace) {
        Error.captureStackTrace(
          instance,
          constructorNameIsError ? ExtendableError : originalConstructor
        );
      }
      if (instance.stack === void 0) {
        var err = new Error(message);
        err.name = instance.name;
        instance.stack = err.stack;
      }
      if (uglyErrorPrinting) {
        defineProperty(instance, "toString", {
          configurable: true,
          enumerable: false,
          value: function toString3() {
            return (this.name || "Error") + (typeof this.message === "undefined" ? "" : ": " + this.message);
          },
          writable: true
        });
      }
      return instance;
    }
    extendableErrorName = ExtendableError.name || "ExtendableError";
    ExtendableError.prototype = objectCreate(Error.prototype, {
      constructor: {
        value: Error,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    exports.ExtendableError = ExtendableError;
    exports["default"] = exports.ExtendableError;
  }
});

// ../../daisi-sdk-typescript/node_modules/nice-grpc-common/lib/client/ClientError.js
var require_ClientError2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/nice-grpc-common/lib/client/ClientError.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ClientError = void 0;
    var ts_error_1 = require_cjs2();
    var Status_1 = require_Status2();
    var ClientError = class _ClientError extends ts_error_1.ExtendableError {
      constructor(path, code, details) {
        super(`${path} ${Status_1.Status[code]}: ${details}`);
        this.path = path;
        this.code = code;
        this.details = details;
        this.name = "ClientError";
        Object.defineProperty(this, "@@nice-grpc", {
          value: true
        });
        Object.defineProperty(this, "@@nice-grpc:ClientError", {
          value: true
        });
      }
      static [Symbol.hasInstance](instance) {
        if (this !== _ClientError) {
          return this.prototype.isPrototypeOf(instance);
        }
        return typeof instance === "object" && instance !== null && (instance.constructor === _ClientError || instance["@@nice-grpc:ClientError"] === true || instance.name === "ClientError" && instance["@@nice-grpc"] === true);
      }
    };
    exports.ClientError = ClientError;
  }
});

// ../../daisi-sdk-typescript/node_modules/nice-grpc-common/lib/server/CallContext.js
var require_CallContext2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/nice-grpc-common/lib/server/CallContext.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// ../../daisi-sdk-typescript/node_modules/nice-grpc-common/lib/server/ServerMiddleware.js
var require_ServerMiddleware2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/nice-grpc-common/lib/server/ServerMiddleware.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// ../../daisi-sdk-typescript/node_modules/nice-grpc-common/lib/server/composeServerMiddleware.js
var require_composeServerMiddleware2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/nice-grpc-common/lib/server/composeServerMiddleware.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.composeServerMiddleware = void 0;
    function composeServerMiddleware(middleware1, middleware2) {
      return (call, context) => {
        return middleware1(Object.assign(Object.assign({}, call), { next: (request, context1) => {
          return middleware2(Object.assign(Object.assign({}, call), { request }), context1);
        } }), context);
      };
    }
    exports.composeServerMiddleware = composeServerMiddleware;
  }
});

// ../../daisi-sdk-typescript/node_modules/nice-grpc-common/lib/server/ServerError.js
var require_ServerError2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/nice-grpc-common/lib/server/ServerError.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ServerError = void 0;
    var ts_error_1 = require_cjs2();
    var Status_1 = require_Status2();
    var ServerError = class _ServerError extends ts_error_1.ExtendableError {
      constructor(code, details) {
        super(`${Status_1.Status[code]}: ${details}`);
        this.code = code;
        this.details = details;
        this.name = "ServerError";
        Object.defineProperty(this, "@@nice-grpc", {
          value: true
        });
        Object.defineProperty(this, "@@nice-grpc:ServerError", {
          value: true
        });
      }
      static [Symbol.hasInstance](instance) {
        if (this !== _ServerError) {
          return this.prototype.isPrototypeOf(instance);
        }
        return typeof instance === "object" && instance !== null && (instance.constructor === _ServerError || instance["@@nice-grpc:ServerError"] === true || instance.name === "ServerError" && instance["@@nice-grpc"] === true);
      }
    };
    exports.ServerError = ServerError;
  }
});

// ../../daisi-sdk-typescript/node_modules/nice-grpc-common/lib/index.js
var require_lib4 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/nice-grpc-common/lib/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_Metadata2(), exports);
    __exportStar(require_Status2(), exports);
    __exportStar(require_MethodDescriptor2(), exports);
    __exportStar(require_CallOptions2(), exports);
    __exportStar(require_ClientMiddleware2(), exports);
    __exportStar(require_composeClientMiddleware2(), exports);
    __exportStar(require_ClientError2(), exports);
    __exportStar(require_CallContext2(), exports);
    __exportStar(require_ServerMiddleware2(), exports);
    __exportStar(require_composeServerMiddleware2(), exports);
    __exportStar(require_ServerError2(), exports);
  }
});

// ../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/service-definitions/grpc-web.js
var require_grpc_web2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/service-definitions/grpc-web.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fromGrpcWebServiceDefinition = fromGrpcWebServiceDefinition;
    exports.isGrpcWebServiceDefinition = isGrpcWebServiceDefinition;
    function fromGrpcWebServiceDefinition(definition) {
      const result = {};
      for (const [key, value] of Object.entries(definition)) {
        if (key === "serviceName") {
          continue;
        }
        const method = value;
        result[uncapitalize(key)] = {
          path: `/${definition.serviceName}/${key}`,
          requestStream: method.requestStream,
          responseStream: method.responseStream,
          requestDeserialize: method.requestType.deserializeBinary,
          requestSerialize: (value2) => value2.serializeBinary(),
          responseDeserialize: method.responseType.deserializeBinary,
          responseSerialize: (value2) => value2.serializeBinary(),
          options: {}
        };
      }
      return result;
    }
    function isGrpcWebServiceDefinition(definition) {
      return "prototype" in definition;
    }
    function uncapitalize(value) {
      if (value.length === 0) {
        return value;
      }
      return value[0].toLowerCase() + value.slice(1);
    }
  }
});

// ../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/service-definitions/ts-proto.js
var require_ts_proto2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/service-definitions/ts-proto.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fromTsProtoServiceDefinition = fromTsProtoServiceDefinition;
    exports.isTsProtoServiceDefinition = isTsProtoServiceDefinition;
    function fromTsProtoServiceDefinition(definition) {
      const result = {};
      for (const [key, method] of Object.entries(definition.methods)) {
        const requestEncode = method.requestType.encode;
        const requestFromPartial = method.requestType.fromPartial;
        const responseEncode = method.responseType.encode;
        const responseFromPartial = method.responseType.fromPartial;
        result[key] = {
          path: `/${definition.fullName}/${method.name}`,
          requestStream: method.requestStream,
          responseStream: method.responseStream,
          requestDeserialize: method.requestType.decode,
          requestSerialize: requestFromPartial != null ? (value) => requestEncode(requestFromPartial(value)).finish() : (value) => requestEncode(value).finish(),
          responseDeserialize: method.responseType.decode,
          responseSerialize: responseFromPartial != null ? (value) => responseEncode(responseFromPartial(value)).finish() : (value) => responseEncode(value).finish(),
          options: method.options
        };
      }
      return result;
    }
    function isTsProtoServiceDefinition(definition) {
      return "name" in definition && "fullName" in definition && "methods" in definition;
    }
  }
});

// ../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/service-definitions/index.js
var require_service_definitions2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/service-definitions/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.normalizeServiceDefinition = normalizeServiceDefinition;
    var grpc_web_1 = require_grpc_web2();
    var ts_proto_1 = require_ts_proto2();
    function normalizeServiceDefinition(definition) {
      if ((0, grpc_web_1.isGrpcWebServiceDefinition)(definition)) {
        return (0, grpc_web_1.fromGrpcWebServiceDefinition)(definition);
      } else if ((0, ts_proto_1.isTsProtoServiceDefinition)(definition)) {
        return (0, ts_proto_1.fromTsProtoServiceDefinition)(definition);
      } else {
        return definition;
      }
    }
  }
});

// ../../daisi-sdk-typescript/node_modules/abort-controller-x/lib/AbortError.js
var require_AbortError2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/abort-controller-x/lib/AbortError.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.catchAbortError = exports.rethrowAbortError = exports.throwIfAborted = exports.isAbortError = exports.AbortError = void 0;
    var AbortError = class extends Error {
      constructor() {
        super("The operation has been aborted");
        this.message = "The operation has been aborted";
        this.name = "AbortError";
        if (typeof Error.captureStackTrace === "function") {
          Error.captureStackTrace(this, this.constructor);
        }
      }
    };
    exports.AbortError = AbortError;
    function isAbortError(error) {
      return typeof error === "object" && error !== null && error.name === "AbortError";
    }
    exports.isAbortError = isAbortError;
    function throwIfAborted(signal) {
      if (signal.aborted) {
        throw new AbortError();
      }
    }
    exports.throwIfAborted = throwIfAborted;
    function rethrowAbortError(error) {
      if (isAbortError(error)) {
        throw error;
      }
      return;
    }
    exports.rethrowAbortError = rethrowAbortError;
    function catchAbortError(error) {
      if (isAbortError(error)) {
        return;
      }
      throw error;
    }
    exports.catchAbortError = catchAbortError;
  }
});

// ../../daisi-sdk-typescript/node_modules/abort-controller-x/lib/execute.js
var require_execute2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/abort-controller-x/lib/execute.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.execute = void 0;
    var AbortError_1 = require_AbortError2();
    function execute2(signal, executor) {
      return new Promise((resolve2, reject) => {
        if (signal.aborted) {
          reject(new AbortError_1.AbortError());
          return;
        }
        let removeAbortListener;
        let finished = false;
        function finish() {
          if (!finished) {
            finished = true;
            if (removeAbortListener != null) {
              removeAbortListener();
            }
          }
        }
        const callback = executor((value) => {
          resolve2(value);
          finish();
        }, (reason) => {
          reject(reason);
          finish();
        });
        if (!finished) {
          const listener = () => {
            const callbackResult = callback();
            if (callbackResult == null) {
              reject(new AbortError_1.AbortError());
            } else {
              callbackResult.then(() => {
                reject(new AbortError_1.AbortError());
              }, (reason) => {
                reject(reason);
              });
            }
            finish();
          };
          signal.addEventListener("abort", listener);
          removeAbortListener = () => {
            signal.removeEventListener("abort", listener);
          };
        }
      });
    }
    exports.execute = execute2;
  }
});

// ../../daisi-sdk-typescript/node_modules/abort-controller-x/lib/abortable.js
var require_abortable2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/abort-controller-x/lib/abortable.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.abortable = void 0;
    var execute_1 = require_execute2();
    function abortable(signal, promise) {
      if (signal.aborted) {
        const noop = () => {
        };
        promise.then(noop, noop);
      }
      return (0, execute_1.execute)(signal, (resolve2, reject) => {
        promise.then(resolve2, reject);
        return () => {
        };
      });
    }
    exports.abortable = abortable;
  }
});

// ../../daisi-sdk-typescript/node_modules/abort-controller-x/lib/delay.js
var require_delay2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/abort-controller-x/lib/delay.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.delay = void 0;
    var execute_1 = require_execute2();
    function delay(signal, dueTime) {
      return (0, execute_1.execute)(signal, (resolve2) => {
        const ms = typeof dueTime === "number" ? dueTime : dueTime.getTime() - Date.now();
        const timer = setTimeout(resolve2, ms);
        return () => {
          clearTimeout(timer);
        };
      });
    }
    exports.delay = delay;
  }
});

// ../../daisi-sdk-typescript/node_modules/abort-controller-x/lib/forever.js
var require_forever2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/abort-controller-x/lib/forever.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.forever = void 0;
    var execute_1 = require_execute2();
    function forever(signal) {
      return (0, execute_1.execute)(signal, () => () => {
      });
    }
    exports.forever = forever;
  }
});

// ../../daisi-sdk-typescript/node_modules/abort-controller-x/lib/waitForEvent.js
var require_waitForEvent2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/abort-controller-x/lib/waitForEvent.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.waitForEvent = void 0;
    var execute_1 = require_execute2();
    function waitForEvent(signal, target, eventName, options) {
      return (0, execute_1.execute)(signal, (resolve2) => {
        let unlisten;
        let finished = false;
        const handler = (...args) => {
          resolve2(args.length > 1 ? args : args[0]);
          finished = true;
          if (unlisten != null) {
            unlisten();
          }
        };
        unlisten = listen(target, eventName, handler, options);
        if (finished) {
          unlisten();
        }
        return () => {
          finished = true;
          if (unlisten != null) {
            unlisten();
          }
        };
      });
    }
    exports.waitForEvent = waitForEvent;
    function listen(target, eventName, handler, options) {
      if (isEventTarget(target)) {
        target.addEventListener(eventName, handler, options);
        return () => target.removeEventListener(eventName, handler, options);
      }
      if (isJQueryStyleEventEmitter(target)) {
        target.on(eventName, handler);
        return () => target.off(eventName, handler);
      }
      if (isNodeStyleEventEmitter(target)) {
        target.addListener(eventName, handler);
        return () => target.removeListener(eventName, handler);
      }
      throw new Error("Invalid event target");
    }
    function isNodeStyleEventEmitter(sourceObj) {
      return isFunction(sourceObj.addListener) && isFunction(sourceObj.removeListener);
    }
    function isJQueryStyleEventEmitter(sourceObj) {
      return isFunction(sourceObj.on) && isFunction(sourceObj.off);
    }
    function isEventTarget(sourceObj) {
      return isFunction(sourceObj.addEventListener) && isFunction(sourceObj.removeEventListener);
    }
    var isFunction = (obj) => typeof obj === "function";
  }
});

// ../../daisi-sdk-typescript/node_modules/abort-controller-x/lib/all.js
var require_all2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/abort-controller-x/lib/all.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.all = void 0;
    var AbortError_1 = require_AbortError2();
    function all(signal, executor) {
      return new Promise((resolve2, reject) => {
        if (signal.aborted) {
          reject(new AbortError_1.AbortError());
          return;
        }
        const innerAbortController = new AbortController();
        const promises = executor(innerAbortController.signal);
        if (promises.length === 0) {
          resolve2([]);
          return;
        }
        const abortListener = () => {
          innerAbortController.abort();
        };
        signal.addEventListener("abort", abortListener);
        let rejection;
        const results = new Array(promises.length);
        let settledCount = 0;
        function settled() {
          settledCount += 1;
          if (settledCount === promises.length) {
            signal.removeEventListener("abort", abortListener);
            if (rejection != null) {
              reject(rejection.reason);
            } else {
              resolve2(results);
            }
          }
        }
        for (const [i, promise] of promises.entries()) {
          promise.then((value) => {
            results[i] = value;
            settled();
          }, (reason) => {
            innerAbortController.abort();
            if (rejection == null || !(0, AbortError_1.isAbortError)(reason) && (0, AbortError_1.isAbortError)(rejection.reason)) {
              rejection = { reason };
            }
            settled();
          });
        }
      });
    }
    exports.all = all;
  }
});

// ../../daisi-sdk-typescript/node_modules/abort-controller-x/lib/race.js
var require_race2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/abort-controller-x/lib/race.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.race = void 0;
    var AbortError_1 = require_AbortError2();
    function race(signal, executor) {
      return new Promise((resolve2, reject) => {
        if (signal.aborted) {
          reject(new AbortError_1.AbortError());
          return;
        }
        const innerAbortController = new AbortController();
        const promises = executor(innerAbortController.signal);
        const abortListener = () => {
          innerAbortController.abort();
        };
        signal.addEventListener("abort", abortListener);
        let settledCount = 0;
        function settled(result2) {
          innerAbortController.abort();
          settledCount += 1;
          if (settledCount === promises.length) {
            signal.removeEventListener("abort", abortListener);
            if (result2.status === "fulfilled") {
              resolve2(result2.value);
            } else {
              reject(result2.reason);
            }
          }
        }
        let result;
        for (const promise of promises) {
          promise.then((value) => {
            if (result == null) {
              result = { status: "fulfilled", value };
            }
            settled(result);
          }, (reason) => {
            if (result == null || !(0, AbortError_1.isAbortError)(reason) && (result.status === "fulfilled" || (0, AbortError_1.isAbortError)(result.reason))) {
              result = { status: "rejected", reason };
            }
            settled(result);
          });
        }
      });
    }
    exports.race = race;
  }
});

// ../../daisi-sdk-typescript/node_modules/abort-controller-x/lib/retry.js
var require_retry2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/abort-controller-x/lib/retry.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.retry = void 0;
    var delay_1 = require_delay2();
    var AbortError_1 = require_AbortError2();
    async function retry(signal, fn, options = {}) {
      const { baseMs = 1e3, maxDelayMs = 3e4, onError, maxAttempts = Infinity } = options;
      let attempt = 0;
      const reset = () => {
        attempt = -1;
      };
      while (true) {
        try {
          return await fn(signal, attempt, reset);
        } catch (error) {
          (0, AbortError_1.rethrowAbortError)(error);
          if (attempt >= maxAttempts) {
            throw error;
          }
          let delayMs;
          if (attempt === -1) {
            delayMs = 0;
          } else {
            const backoff = Math.min(maxDelayMs, Math.pow(2, attempt) * baseMs);
            delayMs = Math.round(backoff * (1 + Math.random()) / 2);
          }
          if (onError) {
            onError(error, attempt, delayMs);
          }
          if (delayMs !== 0) {
            await (0, delay_1.delay)(signal, delayMs);
          }
          attempt += 1;
        }
      }
    }
    exports.retry = retry;
  }
});

// ../../daisi-sdk-typescript/node_modules/abort-controller-x/lib/spawn.js
var require_spawn2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/abort-controller-x/lib/spawn.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.spawn = void 0;
    var AbortError_1 = require_AbortError2();
    function spawn(signal, fn) {
      if (signal.aborted) {
        return Promise.reject(new AbortError_1.AbortError());
      }
      const deferredFunctions = [];
      const spawnAbortController = new AbortController();
      const spawnSignal = spawnAbortController.signal;
      const abortSpawn = () => {
        spawnAbortController.abort();
      };
      signal.addEventListener("abort", abortSpawn);
      const removeAbortListener = () => {
        signal.removeEventListener("abort", abortSpawn);
      };
      const tasks = /* @__PURE__ */ new Set();
      const abortTasks = () => {
        for (const task of tasks) {
          task.abort();
        }
      };
      spawnSignal.addEventListener("abort", abortTasks);
      const removeSpawnAbortListener = () => {
        spawnSignal.removeEventListener("abort", abortTasks);
      };
      let promise = new Promise((resolve2, reject) => {
        let result;
        let failure;
        fork((signal2) => fn(signal2, {
          defer(fn2) {
            deferredFunctions.push(fn2);
          },
          fork
        })).join().then((value) => {
          spawnAbortController.abort();
          result = { value };
        }, (error) => {
          spawnAbortController.abort();
          if (!(0, AbortError_1.isAbortError)(error) || failure == null) {
            failure = { error };
          }
        });
        function fork(forkFn) {
          if (spawnSignal.aborted) {
            return {
              abort() {
              },
              async join() {
                throw new AbortError_1.AbortError();
              }
            };
          }
          const taskAbortController = new AbortController();
          const taskSignal = taskAbortController.signal;
          const taskPromise = forkFn(taskSignal);
          const task = {
            abort() {
              taskAbortController.abort();
            },
            join: () => taskPromise
          };
          tasks.add(task);
          taskPromise.catch(AbortError_1.catchAbortError).catch((error) => {
            failure = { error };
            spawnAbortController.abort();
          }).finally(() => {
            tasks.delete(task);
            if (tasks.size === 0) {
              if (failure != null) {
                reject(failure.error);
              } else {
                resolve2(result.value);
              }
            }
          });
          return task;
        }
      });
      promise = promise.finally(() => {
        removeAbortListener();
        removeSpawnAbortListener();
        let deferPromise = Promise.resolve();
        for (let i = deferredFunctions.length - 1; i >= 0; i--) {
          deferPromise = deferPromise.finally(deferredFunctions[i]);
        }
        return deferPromise;
      });
      return promise;
    }
    exports.spawn = spawn;
  }
});

// ../../daisi-sdk-typescript/node_modules/abort-controller-x/lib/run.js
var require_run2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/abort-controller-x/lib/run.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.run = void 0;
    var AbortError_1 = require_AbortError2();
    function run(fn) {
      const abortController = new AbortController();
      const promise = fn(abortController.signal).catch(AbortError_1.catchAbortError);
      return () => {
        abortController.abort();
        return promise;
      };
    }
    exports.run = run;
  }
});

// ../../daisi-sdk-typescript/node_modules/abort-controller-x/lib/proactiveRetry.js
var require_proactiveRetry2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/abort-controller-x/lib/proactiveRetry.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.proactiveRetry = void 0;
    var AbortError_1 = require_AbortError2();
    var delay_1 = require_delay2();
    var execute_1 = require_execute2();
    function proactiveRetry(signal, fn, options = {}) {
      const { baseMs = 1e3, onError, maxAttempts = Infinity } = options;
      return (0, execute_1.execute)(signal, (resolve2, reject) => {
        const innerAbortController = new AbortController();
        let attemptsExhausted = false;
        const promises = /* @__PURE__ */ new Map();
        function handleFulfilled(value) {
          innerAbortController.abort();
          promises.clear();
          resolve2(value);
        }
        function handleRejected(err, attempt) {
          promises.delete(attempt);
          if (attemptsExhausted && promises.size === 0) {
            reject(err);
            return;
          }
          if ((0, AbortError_1.isAbortError)(err)) {
            return;
          }
          if (onError) {
            try {
              onError(err, attempt);
            } catch (err2) {
              innerAbortController.abort();
              promises.clear();
              reject(err2);
            }
          }
        }
        async function makeAttempts(signal2) {
          for (let attempt = 0; ; attempt++) {
            const promise = fn(signal2, attempt);
            promises.set(attempt, promise);
            promise.then(handleFulfilled, (err) => handleRejected(err, attempt));
            if (attempt + 1 >= maxAttempts) {
              break;
            }
            const backoff = Math.pow(2, attempt) * baseMs;
            const delayMs = Math.round(backoff * (1 + Math.random()) / 2);
            await (0, delay_1.delay)(signal2, delayMs);
          }
          attemptsExhausted = true;
        }
        makeAttempts(innerAbortController.signal).catch(AbortError_1.catchAbortError);
        return () => {
          innerAbortController.abort();
        };
      });
    }
    exports.proactiveRetry = proactiveRetry;
  }
});

// ../../daisi-sdk-typescript/node_modules/abort-controller-x/lib/index.js
var require_lib5 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/abort-controller-x/lib/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_abortable2(), exports);
    __exportStar(require_AbortError2(), exports);
    __exportStar(require_delay2(), exports);
    __exportStar(require_execute2(), exports);
    __exportStar(require_forever2(), exports);
    __exportStar(require_waitForEvent2(), exports);
    __exportStar(require_all2(), exports);
    __exportStar(require_race2(), exports);
    __exportStar(require_retry2(), exports);
    __exportStar(require_spawn2(), exports);
    __exportStar(require_run2(), exports);
    __exportStar(require_proactiveRetry2(), exports);
  }
});

// ../../daisi-sdk-typescript/node_modules/js-base64/base64.js
var require_base642 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/js-base64/base64.js"(exports, module) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (
        // cf. https://github.com/dankogai/js-base64/issues/119
        (function() {
          var _Base64 = global2.Base64;
          var gBase64 = factory();
          gBase64.noConflict = function() {
            global2.Base64 = _Base64;
            return gBase64;
          };
          if (global2.Meteor) {
            Base64 = gBase64;
          }
          global2.Base64 = gBase64;
        })()
      );
    })(typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : exports, function() {
      "use strict";
      var version = "3.7.8";
      var VERSION = version;
      var _hasBuffer = typeof Buffer === "function";
      var _TD = typeof TextDecoder === "function" ? new TextDecoder() : void 0;
      var _TE = typeof TextEncoder === "function" ? new TextEncoder() : void 0;
      var b64ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      var b64chs = Array.prototype.slice.call(b64ch);
      var b64tab = (function(a) {
        var tab = {};
        a.forEach(function(c, i) {
          return tab[c] = i;
        });
        return tab;
      })(b64chs);
      var b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
      var _fromCC = String.fromCharCode.bind(String);
      var _U8Afrom = typeof Uint8Array.from === "function" ? Uint8Array.from.bind(Uint8Array) : function(it) {
        return new Uint8Array(Array.prototype.slice.call(it, 0));
      };
      var _mkUriSafe = function(src) {
        return src.replace(/=/g, "").replace(/[+\/]/g, function(m0) {
          return m0 == "+" ? "-" : "_";
        });
      };
      var _tidyB64 = function(s) {
        return s.replace(/[^A-Za-z0-9\+\/]/g, "");
      };
      var btoaPolyfill = function(bin) {
        var u32, c0, c1, c2, asc = "";
        var pad = bin.length % 3;
        for (var i = 0; i < bin.length; ) {
          if ((c0 = bin.charCodeAt(i++)) > 255 || (c1 = bin.charCodeAt(i++)) > 255 || (c2 = bin.charCodeAt(i++)) > 255)
            throw new TypeError("invalid character found");
          u32 = c0 << 16 | c1 << 8 | c2;
          asc += b64chs[u32 >> 18 & 63] + b64chs[u32 >> 12 & 63] + b64chs[u32 >> 6 & 63] + b64chs[u32 & 63];
        }
        return pad ? asc.slice(0, pad - 3) + "===".substring(pad) : asc;
      };
      var _btoa = typeof btoa === "function" ? function(bin) {
        return btoa(bin);
      } : _hasBuffer ? function(bin) {
        return Buffer.from(bin, "binary").toString("base64");
      } : btoaPolyfill;
      var _fromUint8Array = _hasBuffer ? function(u8a) {
        return Buffer.from(u8a).toString("base64");
      } : function(u8a) {
        var maxargs = 4096;
        var strs = [];
        for (var i = 0, l = u8a.length; i < l; i += maxargs) {
          strs.push(_fromCC.apply(null, u8a.subarray(i, i + maxargs)));
        }
        return _btoa(strs.join(""));
      };
      var fromUint8Array = function(u8a, urlsafe) {
        if (urlsafe === void 0) {
          urlsafe = false;
        }
        return urlsafe ? _mkUriSafe(_fromUint8Array(u8a)) : _fromUint8Array(u8a);
      };
      var cb_utob = function(c) {
        if (c.length < 2) {
          var cc = c.charCodeAt(0);
          return cc < 128 ? c : cc < 2048 ? _fromCC(192 | cc >>> 6) + _fromCC(128 | cc & 63) : _fromCC(224 | cc >>> 12 & 15) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
        } else {
          var cc = 65536 + (c.charCodeAt(0) - 55296) * 1024 + (c.charCodeAt(1) - 56320);
          return _fromCC(240 | cc >>> 18 & 7) + _fromCC(128 | cc >>> 12 & 63) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
        }
      };
      var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
      var utob = function(u) {
        return u.replace(re_utob, cb_utob);
      };
      var _encode = _hasBuffer ? function(s) {
        return Buffer.from(s, "utf8").toString("base64");
      } : _TE ? function(s) {
        return _fromUint8Array(_TE.encode(s));
      } : function(s) {
        return _btoa(utob(s));
      };
      var encode = function(src, urlsafe) {
        if (urlsafe === void 0) {
          urlsafe = false;
        }
        return urlsafe ? _mkUriSafe(_encode(src)) : _encode(src);
      };
      var encodeURI = function(src) {
        return encode(src, true);
      };
      var re_btou = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;
      var cb_btou = function(cccc) {
        switch (cccc.length) {
          case 4:
            var cp = (7 & cccc.charCodeAt(0)) << 18 | (63 & cccc.charCodeAt(1)) << 12 | (63 & cccc.charCodeAt(2)) << 6 | 63 & cccc.charCodeAt(3), offset = cp - 65536;
            return _fromCC((offset >>> 10) + 55296) + _fromCC((offset & 1023) + 56320);
          case 3:
            return _fromCC((15 & cccc.charCodeAt(0)) << 12 | (63 & cccc.charCodeAt(1)) << 6 | 63 & cccc.charCodeAt(2));
          default:
            return _fromCC((31 & cccc.charCodeAt(0)) << 6 | 63 & cccc.charCodeAt(1));
        }
      };
      var btou = function(b) {
        return b.replace(re_btou, cb_btou);
      };
      var atobPolyfill = function(asc) {
        asc = asc.replace(/\s+/g, "");
        if (!b64re.test(asc))
          throw new TypeError("malformed base64.");
        asc += "==".slice(2 - (asc.length & 3));
        var u24, r1, r2;
        var binArray = [];
        for (var i = 0; i < asc.length; ) {
          u24 = b64tab[asc.charAt(i++)] << 18 | b64tab[asc.charAt(i++)] << 12 | (r1 = b64tab[asc.charAt(i++)]) << 6 | (r2 = b64tab[asc.charAt(i++)]);
          if (r1 === 64) {
            binArray.push(_fromCC(u24 >> 16 & 255));
          } else if (r2 === 64) {
            binArray.push(_fromCC(u24 >> 16 & 255, u24 >> 8 & 255));
          } else {
            binArray.push(_fromCC(u24 >> 16 & 255, u24 >> 8 & 255, u24 & 255));
          }
        }
        return binArray.join("");
      };
      var _atob = typeof atob === "function" ? function(asc) {
        return atob(_tidyB64(asc));
      } : _hasBuffer ? function(asc) {
        return Buffer.from(asc, "base64").toString("binary");
      } : atobPolyfill;
      var _toUint8Array = _hasBuffer ? function(a) {
        return _U8Afrom(Buffer.from(a, "base64"));
      } : function(a) {
        return _U8Afrom(_atob(a).split("").map(function(c) {
          return c.charCodeAt(0);
        }));
      };
      var toUint8Array = function(a) {
        return _toUint8Array(_unURI(a));
      };
      var _decode = _hasBuffer ? function(a) {
        return Buffer.from(a, "base64").toString("utf8");
      } : _TD ? function(a) {
        return _TD.decode(_toUint8Array(a));
      } : function(a) {
        return btou(_atob(a));
      };
      var _unURI = function(a) {
        return _tidyB64(a.replace(/[-_]/g, function(m0) {
          return m0 == "-" ? "+" : "/";
        }));
      };
      var decode = function(src) {
        return _decode(_unURI(src));
      };
      var isValid = function(src) {
        if (typeof src !== "string")
          return false;
        var s = src.replace(/\s+/g, "").replace(/={0,2}$/, "");
        return !/[^\s0-9a-zA-Z\+/]/.test(s) || !/[^\s0-9a-zA-Z\-_]/.test(s);
      };
      var _noEnum = function(v) {
        return {
          value: v,
          enumerable: false,
          writable: true,
          configurable: true
        };
      };
      var extendString = function() {
        var _add = function(name, body) {
          return Object.defineProperty(String.prototype, name, _noEnum(body));
        };
        _add("fromBase64", function() {
          return decode(this);
        });
        _add("toBase64", function(urlsafe) {
          return encode(this, urlsafe);
        });
        _add("toBase64URI", function() {
          return encode(this, true);
        });
        _add("toBase64URL", function() {
          return encode(this, true);
        });
        _add("toUint8Array", function() {
          return toUint8Array(this);
        });
      };
      var extendUint8Array = function() {
        var _add = function(name, body) {
          return Object.defineProperty(Uint8Array.prototype, name, _noEnum(body));
        };
        _add("toBase64", function(urlsafe) {
          return fromUint8Array(this, urlsafe);
        });
        _add("toBase64URI", function() {
          return fromUint8Array(this, true);
        });
        _add("toBase64URL", function() {
          return fromUint8Array(this, true);
        });
      };
      var extendBuiltins = function() {
        extendString();
        extendUint8Array();
      };
      var gBase64 = {
        version,
        VERSION,
        atob: _atob,
        atobPolyfill,
        btoa: _btoa,
        btoaPolyfill,
        fromBase64: decode,
        toBase64: encode,
        encode,
        encodeURI,
        encodeURL: encodeURI,
        utob,
        btou,
        decode,
        isValid,
        fromUint8Array,
        toUint8Array,
        extendString,
        extendUint8Array,
        extendBuiltins
      };
      gBase64.Base64 = {};
      Object.keys(gBase64).forEach(function(k) {
        return gBase64.Base64[k] = gBase64[k];
      });
      return gBase64;
    });
  }
});

// ../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/client/transports/fetch.js
var require_fetch2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/client/transports/fetch.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FetchTransport = FetchTransport;
    var abort_controller_x_1 = require_lib5();
    var js_base64_1 = require_base642();
    var nice_grpc_common_1 = require_lib4();
    function FetchTransport(config) {
      return async function* fetchTransport({ url, body, metadata, signal, method }) {
        let requestBody;
        if (!method.requestStream) {
          let bodyBuffer;
          for await (const chunk of body) {
            bodyBuffer = chunk;
            break;
          }
          requestBody = bodyBuffer;
        } else {
          let iterator;
          requestBody = new ReadableStream({
            type: "bytes",
            start() {
              iterator = body[Symbol.asyncIterator]();
            },
            async pull(controller) {
              const { done, value } = await iterator.next();
              if (done) {
                controller.close();
              } else {
                controller.enqueue(value);
              }
            },
            async cancel() {
              var _a, _b;
              await ((_b = (_a = iterator).return) === null || _b === void 0 ? void 0 : _b.call(_a));
            }
          });
        }
        const response = await fetch(url, {
          method: "POST",
          body: requestBody,
          headers: metadataToHeaders(metadata),
          signal,
          cache: config === null || config === void 0 ? void 0 : config.cache,
          ["duplex"]: "half",
          credentials: config === null || config === void 0 ? void 0 : config.credentials
        });
        yield {
          type: "header",
          header: headersToMetadata(response.headers)
        };
        if (!response.ok) {
          const responseText = await response.text();
          throw new nice_grpc_common_1.ClientError(method.path, getStatusFromHttpCode(response.status), getErrorDetailsFromHttpResponse(response.status, responseText));
        }
        (0, abort_controller_x_1.throwIfAborted)(signal);
        const reader = response.body.getReader();
        const abortListener = () => {
          reader.cancel().catch(() => {
          });
        };
        signal.addEventListener("abort", abortListener);
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (value != null) {
              yield {
                type: "data",
                data: value
              };
            }
            if (done) {
              break;
            }
          }
        } finally {
          signal.removeEventListener("abort", abortListener);
          (0, abort_controller_x_1.throwIfAborted)(signal);
        }
      };
    }
    function metadataToHeaders(metadata) {
      const headers = new Headers();
      for (const [key, values] of metadata) {
        for (const value of values) {
          headers.append(key, typeof value === "string" ? value : js_base64_1.Base64.fromUint8Array(value));
        }
      }
      return headers;
    }
    function headersToMetadata(headers) {
      const metadata = new nice_grpc_common_1.Metadata();
      for (const [key, value] of headers) {
        if (key.endsWith("-bin")) {
          for (const item of value.split(/,\s?/)) {
            metadata.append(key, js_base64_1.Base64.toUint8Array(item));
          }
        } else {
          metadata.set(key, value);
        }
      }
      return metadata;
    }
    function getStatusFromHttpCode(statusCode) {
      switch (statusCode) {
        case 400:
          return nice_grpc_common_1.Status.INTERNAL;
        case 401:
          return nice_grpc_common_1.Status.UNAUTHENTICATED;
        case 403:
          return nice_grpc_common_1.Status.PERMISSION_DENIED;
        case 404:
          return nice_grpc_common_1.Status.UNIMPLEMENTED;
        case 429:
        case 502:
        case 503:
        case 504:
          return nice_grpc_common_1.Status.UNAVAILABLE;
        default:
          return nice_grpc_common_1.Status.UNKNOWN;
      }
    }
    function getErrorDetailsFromHttpResponse(statusCode, responseText) {
      return `Received HTTP ${statusCode} response: ` + (responseText.length > 1e3 ? responseText.slice(0, 1e3) + "... (truncated)" : responseText);
    }
  }
});

// ../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/client/channel.js
var require_channel2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/client/channel.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createChannel = createChannel4;
    var fetch_1 = require_fetch2();
    function createChannel4(address, transport = (0, fetch_1.FetchTransport)()) {
      return { address, transport };
    }
  }
});

// ../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/utils/isAsyncIterable.js
var require_isAsyncIterable2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/utils/isAsyncIterable.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isAsyncIterable = isAsyncIterable;
    function isAsyncIterable(value) {
      return value != null && Symbol.asyncIterator in value;
    }
  }
});

// ../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/utils/concatBuffers.js
var require_concatBuffers2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/utils/concatBuffers.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.concatBuffers = concatBuffers;
    function concatBuffers(buffers, totalLength) {
      if (buffers.length === 1) {
        return buffers[0];
      }
      const result = new Uint8Array(totalLength);
      let offset = 0;
      for (const buffer of buffers) {
        result.set(buffer, offset);
        offset += buffer.length;
      }
      return result;
    }
  }
});

// ../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/client/decodeMetadata.js
var require_decodeMetadata2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/client/decodeMetadata.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.decodeMetadata = decodeMetadata;
    var nice_grpc_common_1 = require_lib4();
    var js_base64_1 = require_base642();
    function decodeMetadata(data) {
      const metadata = (0, nice_grpc_common_1.Metadata)();
      const text = new TextDecoder().decode(data);
      for (const line of text.split("\r\n")) {
        if (!line) {
          continue;
        }
        const splitIndex = line.indexOf(":");
        if (splitIndex === -1) {
          throw new Error(`Invalid metadata line: ${line}`);
        }
        const key = line.slice(0, splitIndex).trim().toLowerCase();
        const value = line.slice(splitIndex + 1).trim();
        if (key.endsWith("-bin")) {
          for (const item of value.split(/,\s?/)) {
            metadata.append(key, js_base64_1.Base64.toUint8Array(item));
          }
        } else {
          metadata.append(key, value);
        }
      }
      return metadata;
    }
  }
});

// ../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/client/framing.js
var require_framing2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/client/framing.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LPM_HEADER_LENGTH = void 0;
    exports.parseLpmHeader = parseLpmHeader;
    exports.encodeFrame = encodeFrame;
    exports.LPM_HEADER_LENGTH = 5;
    function parseLpmHeader(data) {
      if (data.length !== exports.LPM_HEADER_LENGTH) {
        throw new Error(`Invalid LPM header length: ${data.length}`);
      }
      const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
      const compressed = (view.getUint8(0) & 1) !== 0;
      const isMetadata = (view.getUint8(0) & 128) !== 0;
      const length = view.getUint32(1);
      return {
        compressed,
        isMetadata,
        length
      };
    }
    function encodeFrame(data) {
      const messageBytes = new Uint8Array(exports.LPM_HEADER_LENGTH + data.length);
      new DataView(messageBytes.buffer, 1, 4).setUint32(0, data.length, false);
      messageBytes.set(data, exports.LPM_HEADER_LENGTH);
      return messageBytes;
    }
  }
});

// ../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/client/decodeResponse.js
var require_decodeResponse2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/client/decodeResponse.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.decodeResponse = decodeResponse;
    var concatBuffers_1 = require_concatBuffers2();
    var decodeMetadata_1 = require_decodeMetadata2();
    var framing_1 = require_framing2();
    async function* decodeResponse({ response, decode, onHeader, onTrailer }) {
      let receivedHeader = false;
      let receivedTrailer = false;
      let receivedData = false;
      let buffer = createChunkBuffer(framing_1.LPM_HEADER_LENGTH);
      let lpmHeader;
      for await (const frame of response) {
        if (frame.type === "header") {
          handleHeader(frame.header);
        } else if (frame.type === "trailer") {
          handleTrailer(frame.trailer);
        } else if (frame.type === "data") {
          if (receivedTrailer) {
            throw new Error("Received data after trailer");
          }
          let { data } = frame;
          while (data.length > 0 || (lpmHeader === null || lpmHeader === void 0 ? void 0 : lpmHeader.length) === 0) {
            const position = Math.min(data.length, buffer.targetLength - buffer.totalLength);
            const chunk = data.subarray(0, position);
            data = data.subarray(position);
            buffer.chunks.push(chunk);
            buffer.totalLength += chunk.length;
            if (buffer.totalLength === buffer.targetLength) {
              const messageBytes = (0, concatBuffers_1.concatBuffers)(buffer.chunks, buffer.totalLength);
              if (lpmHeader == null) {
                lpmHeader = (0, framing_1.parseLpmHeader)(messageBytes);
                buffer = createChunkBuffer(lpmHeader.length);
              } else {
                if (lpmHeader.compressed) {
                  throw new Error("Compressed messages not supported");
                }
                if (lpmHeader.isMetadata) {
                  if (!receivedHeader) {
                    handleHeader((0, decodeMetadata_1.decodeMetadata)(messageBytes));
                  } else {
                    handleTrailer((0, decodeMetadata_1.decodeMetadata)(messageBytes));
                  }
                } else {
                  if (!receivedHeader) {
                    throw new Error("Received data before header");
                  }
                  yield decode(messageBytes);
                  receivedData = true;
                }
                lpmHeader = void 0;
                buffer = createChunkBuffer(framing_1.LPM_HEADER_LENGTH);
              }
            }
          }
        }
      }
      function handleHeader(header) {
        if (receivedHeader) {
          throw new Error("Received multiple headers");
        }
        if (receivedData) {
          throw new Error("Received header after data");
        }
        if (receivedTrailer) {
          throw new Error("Received header after trailer");
        }
        receivedHeader = true;
        onHeader(header);
      }
      function handleTrailer(trailer) {
        if (receivedTrailer) {
          throw new Error("Received multiple trailers");
        }
        receivedTrailer = true;
        onTrailer(trailer);
      }
      function createChunkBuffer(targetLength) {
        return {
          chunks: [],
          totalLength: 0,
          targetLength
        };
      }
    }
  }
});

// ../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/client/encodeRequest.js
var require_encodeRequest2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/client/encodeRequest.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.encodeRequest = encodeRequest;
    var framing_1 = require_framing2();
    async function* encodeRequest({ request, encode }) {
      for await (const data of request) {
        const bytes = encode(data);
        yield (0, framing_1.encodeFrame)(bytes);
      }
    }
  }
});

// ../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/client/makeInternalErrorMessage.js
var require_makeInternalErrorMessage2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/client/makeInternalErrorMessage.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.makeInternalErrorMessage = makeInternalErrorMessage;
    function makeInternalErrorMessage(err) {
      if (err == null || typeof err !== "object") {
        return String(err);
      } else if (typeof err.message === "string") {
        return err.message;
      } else {
        return JSON.stringify(err);
      }
    }
  }
});

// ../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/client/parseTrailer.js
var require_parseTrailer2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/client/parseTrailer.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseTrailer = parseTrailer;
    var nice_grpc_common_1 = require_lib4();
    function parseTrailer(trailer) {
      let status;
      const statusValue = trailer.get("grpc-status");
      if (statusValue != null) {
        const statusNum = +statusValue;
        if (statusNum in nice_grpc_common_1.Status) {
          status = statusNum;
        } else {
          throw new Error(`Received invalid status code from server: ${statusValue}`);
        }
      } else {
        throw new Error("Received no status code from server");
      }
      let message = trailer.get("grpc-message");
      if (message != null) {
        try {
          message = decodeURIComponent(message);
        } catch (_a) {
        }
      }
      const trailerCopy = (0, nice_grpc_common_1.Metadata)(trailer);
      trailerCopy.delete("grpc-status");
      trailerCopy.delete("grpc-message");
      return {
        status,
        message,
        trailer: trailerCopy
      };
    }
  }
});

// ../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/client/makeCall.js
var require_makeCall2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/client/makeCall.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.makeCall = makeCall;
    var abort_controller_x_1 = require_lib5();
    var nice_grpc_common_1 = require_lib4();
    var decodeResponse_1 = require_decodeResponse2();
    var encodeRequest_1 = require_encodeRequest2();
    var makeInternalErrorMessage_1 = require_makeInternalErrorMessage2();
    var parseTrailer_1 = require_parseTrailer2();
    async function* makeCall(definition, channel, request, options) {
      const { metadata, signal = new AbortController().signal, onHeader, onTrailer } = options;
      (0, abort_controller_x_1.throwIfAborted)(signal);
      let receivedTrailersOnly = false;
      let status;
      let message;
      function handleTrailer(trailer) {
        if (receivedTrailersOnly) {
          if (new Map(trailer).size > 0) {
            throw new nice_grpc_common_1.ClientError(definition.path, nice_grpc_common_1.Status.INTERNAL, "Received non-empty trailer after trailers-only response");
          } else {
            return;
          }
        }
        const parsedTrailer = (0, parseTrailer_1.parseTrailer)(trailer);
        ({ status, message } = parsedTrailer);
        onTrailer === null || onTrailer === void 0 ? void 0 : onTrailer(parsedTrailer.trailer);
      }
      const finalMetadata = (0, nice_grpc_common_1.Metadata)(metadata);
      finalMetadata.set("content-type", "application/grpc-web+proto");
      finalMetadata.set("x-grpc-web", "1");
      const innerAbortController = new AbortController();
      const abortListener = () => {
        innerAbortController.abort();
      };
      signal.addEventListener("abort", abortListener);
      let finished = false;
      let requestError;
      async function* interceptRequestError() {
        try {
          for await (const item of request) {
            if (finished) {
              throw new Error("Request finished");
            }
            yield item;
          }
        } catch (err) {
          requestError = { err };
          innerAbortController.abort();
          throw err;
        }
      }
      async function* handleTransportErrors() {
        try {
          return yield* channel.transport({
            url: channel.address + definition.path,
            metadata: finalMetadata,
            body: (0, encodeRequest_1.encodeRequest)({
              request: interceptRequestError(),
              encode: definition.requestSerialize
            }),
            signal: innerAbortController.signal,
            method: definition
          });
        } catch (err) {
          (0, abort_controller_x_1.rethrowAbortError)(err);
          throw new nice_grpc_common_1.ClientError(definition.path, nice_grpc_common_1.Status.UNKNOWN, `Transport error: ${(0, makeInternalErrorMessage_1.makeInternalErrorMessage)(err)}`);
        }
      }
      const response = (0, decodeResponse_1.decodeResponse)({
        response: handleTransportErrors(),
        decode: definition.responseDeserialize,
        onHeader(header) {
          const isTrailersOnly = header.has("grpc-status");
          if (isTrailersOnly) {
            handleTrailer(header);
            receivedTrailersOnly = true;
          } else {
            onHeader === null || onHeader === void 0 ? void 0 : onHeader(header);
          }
        },
        onTrailer(trailer) {
          handleTrailer(trailer);
        }
      });
      try {
        yield* response;
      } catch (err) {
        if (requestError !== void 0) {
          throw requestError.err;
        } else if (err instanceof nice_grpc_common_1.ClientError || (0, abort_controller_x_1.isAbortError)(err)) {
          throw err;
        } else {
          throw new nice_grpc_common_1.ClientError(definition.path, nice_grpc_common_1.Status.INTERNAL, (0, makeInternalErrorMessage_1.makeInternalErrorMessage)(err));
        }
      } finally {
        finished = true;
        signal.removeEventListener("abort", abortListener);
        if (status != null && status !== nice_grpc_common_1.Status.OK) {
          throw new nice_grpc_common_1.ClientError(definition.path, status, message !== null && message !== void 0 ? message : "");
        }
      }
      if (status == null) {
        throw new nice_grpc_common_1.ClientError(definition.path, nice_grpc_common_1.Status.UNKNOWN, 'Response stream closed without gRPC status. This may indicate a misconfigured CORS policy on the server: Access-Control-Expose-Headers must include "grpc-status" and "grpc-message".');
      }
    }
  }
});

// ../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/client/createBidiStreamingMethod.js
var require_createBidiStreamingMethod2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/client/createBidiStreamingMethod.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createBidiStreamingMethod = createBidiStreamingMethod;
    var isAsyncIterable_1 = require_isAsyncIterable2();
    var makeCall_1 = require_makeCall2();
    function createBidiStreamingMethod(definition, channel, middleware, defaultOptions) {
      const methodDescriptor = {
        path: definition.path,
        requestStream: definition.requestStream,
        responseStream: definition.responseStream,
        options: definition.options
      };
      async function* bidiStreamingMethod(request, options) {
        if (!(0, isAsyncIterable_1.isAsyncIterable)(request)) {
          throw new Error("A middleware passed invalid request to next(): expected a single message for bidirectional streaming method");
        }
        const response = (0, makeCall_1.makeCall)(definition, channel, request, options);
        yield* response;
      }
      const method = middleware == null ? bidiStreamingMethod : (request, options) => middleware({
        method: methodDescriptor,
        requestStream: true,
        request,
        responseStream: true,
        next: bidiStreamingMethod
      }, options);
      return (request, options) => {
        const iterable = method(request, {
          ...defaultOptions,
          ...options
        });
        const iterator = iterable[Symbol.asyncIterator]();
        return {
          [Symbol.asyncIterator]() {
            return {
              async next() {
                const result = await iterator.next();
                if (result.done && result.value != null) {
                  return await iterator.throw(new Error("A middleware returned a message, but expected to return void for bidirectional streaming method"));
                }
                return result;
              },
              return() {
                return iterator.return();
              },
              throw(err) {
                return iterator.throw(err);
              }
            };
          }
        };
      };
    }
  }
});

// ../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/client/createClientStreamingMethod.js
var require_createClientStreamingMethod2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/client/createClientStreamingMethod.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createClientStreamingMethod = createClientStreamingMethod;
    var nice_grpc_common_1 = require_lib4();
    var isAsyncIterable_1 = require_isAsyncIterable2();
    var makeCall_1 = require_makeCall2();
    function createClientStreamingMethod(definition, channel, middleware, defaultOptions) {
      const methodDescriptor = {
        path: definition.path,
        requestStream: definition.requestStream,
        responseStream: definition.responseStream,
        options: definition.options
      };
      async function* clientStreamingMethod(request, options) {
        if (!(0, isAsyncIterable_1.isAsyncIterable)(request)) {
          throw Error("A middleware passed invalid request to next(): expected a single message for client streaming method");
        }
        const response = (0, makeCall_1.makeCall)(definition, channel, request, options);
        let unaryResponse;
        for await (const message of response) {
          if (unaryResponse != null) {
            throw new nice_grpc_common_1.ClientError(definition.path, nice_grpc_common_1.Status.INTERNAL, "Received more than one message from server for client streaming method");
          }
          unaryResponse = message;
        }
        if (unaryResponse == null) {
          throw new nice_grpc_common_1.ClientError(definition.path, nice_grpc_common_1.Status.INTERNAL, "Server did not return a response");
        }
        return unaryResponse;
      }
      const method = middleware == null ? clientStreamingMethod : (request, options) => middleware({
        method: methodDescriptor,
        requestStream: true,
        request,
        responseStream: false,
        next: clientStreamingMethod
      }, options);
      return async (request, options) => {
        const iterable = method(request, {
          ...defaultOptions,
          ...options
        });
        const iterator = iterable[Symbol.asyncIterator]();
        let result = await iterator.next();
        while (true) {
          if (!result.done) {
            result = await iterator.throw(new Error("A middleware yielded a message, but expected to only return a message for client streaming method"));
            continue;
          }
          if (result.value == null) {
            result = await iterator.throw(new Error("A middleware returned void, but expected to return a message for client streaming method"));
            continue;
          }
          return result.value;
        }
      };
    }
  }
});

// ../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/utils/asyncIterableOf.js
var require_asyncIterableOf2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/utils/asyncIterableOf.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.asyncIterableOf = asyncIterableOf;
    async function* asyncIterableOf(item) {
      yield item;
    }
  }
});

// ../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/client/createServerStreamingMethod.js
var require_createServerStreamingMethod2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/client/createServerStreamingMethod.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createServerStreamingMethod = createServerStreamingMethod;
    var asyncIterableOf_1 = require_asyncIterableOf2();
    var isAsyncIterable_1 = require_isAsyncIterable2();
    var makeCall_1 = require_makeCall2();
    function createServerStreamingMethod(definition, channel, middleware, defaultOptions) {
      const methodDescriptor = {
        path: definition.path,
        requestStream: definition.requestStream,
        responseStream: definition.responseStream,
        options: definition.options
      };
      async function* serverStreamingMethod(request, options) {
        if ((0, isAsyncIterable_1.isAsyncIterable)(request)) {
          throw new Error("A middleware passed invalid request to next(): expected a single message for server streaming method");
        }
        const response = (0, makeCall_1.makeCall)(definition, channel, (0, asyncIterableOf_1.asyncIterableOf)(request), options);
        yield* response;
      }
      const method = middleware == null ? serverStreamingMethod : (request, options) => middleware({
        method: methodDescriptor,
        requestStream: false,
        request,
        responseStream: true,
        next: serverStreamingMethod
      }, options);
      return (request, options) => {
        const iterable = method(request, {
          ...defaultOptions,
          ...options
        });
        const iterator = iterable[Symbol.asyncIterator]();
        return {
          [Symbol.asyncIterator]() {
            return {
              async next() {
                const result = await iterator.next();
                if (result.done && result.value != null) {
                  return await iterator.throw(new Error("A middleware returned a message, but expected to return void for server streaming method"));
                }
                return result;
              },
              return() {
                return iterator.return();
              },
              throw(err) {
                return iterator.throw(err);
              }
            };
          }
        };
      };
    }
  }
});

// ../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/client/createUnaryMethod.js
var require_createUnaryMethod2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/client/createUnaryMethod.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createUnaryMethod = createUnaryMethod;
    var nice_grpc_common_1 = require_lib4();
    var asyncIterableOf_1 = require_asyncIterableOf2();
    var isAsyncIterable_1 = require_isAsyncIterable2();
    var makeCall_1 = require_makeCall2();
    function createUnaryMethod(definition, channel, middleware, defaultOptions) {
      const methodDescriptor = {
        path: definition.path,
        requestStream: definition.requestStream,
        responseStream: definition.responseStream,
        options: definition.options
      };
      async function* unaryMethod(request, options) {
        if ((0, isAsyncIterable_1.isAsyncIterable)(request)) {
          throw new Error("A middleware passed invalid request to next(): expected a single message for unary method");
        }
        const response = (0, makeCall_1.makeCall)(definition, channel, (0, asyncIterableOf_1.asyncIterableOf)(request), options);
        let unaryResponse;
        for await (const message of response) {
          if (unaryResponse != null) {
            throw new nice_grpc_common_1.ClientError(definition.path, nice_grpc_common_1.Status.INTERNAL, "Received more than one message from server for unary method");
          }
          unaryResponse = message;
        }
        if (unaryResponse == null) {
          throw new nice_grpc_common_1.ClientError(definition.path, nice_grpc_common_1.Status.INTERNAL, "Server did not return a response");
        }
        return unaryResponse;
      }
      const method = middleware == null ? unaryMethod : (request, options) => middleware({
        method: methodDescriptor,
        requestStream: false,
        request,
        responseStream: false,
        next: unaryMethod
      }, options);
      return async (request, options) => {
        const iterable = method(request, {
          ...defaultOptions,
          ...options
        });
        const iterator = iterable[Symbol.asyncIterator]();
        let result = await iterator.next();
        while (true) {
          if (!result.done) {
            result = await iterator.throw(new Error("A middleware yielded a message, but expected to only return a message for unary method"));
            continue;
          }
          if (result.value == null) {
            result = await iterator.throw(new Error("A middleware returned void, but expected to return a message for unary method"));
            continue;
          }
          return result.value;
        }
      };
    }
  }
});

// ../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/client/ClientFactory.js
var require_ClientFactory2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/client/ClientFactory.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createClientFactory = createClientFactory4;
    exports.createClient = createClient;
    var nice_grpc_common_1 = require_lib4();
    var service_definitions_1 = require_service_definitions2();
    var createBidiStreamingMethod_1 = require_createBidiStreamingMethod2();
    var createClientStreamingMethod_1 = require_createClientStreamingMethod2();
    var createServerStreamingMethod_1 = require_createServerStreamingMethod2();
    var createUnaryMethod_1 = require_createUnaryMethod2();
    function createClientFactory4() {
      return createClientFactoryWithMiddleware();
    }
    function createClient(definition, channel, defaultCallOptions) {
      return createClientFactory4().create(definition, channel, defaultCallOptions);
    }
    function createClientFactoryWithMiddleware(middleware) {
      return {
        use(newMiddleware) {
          return createClientFactoryWithMiddleware(middleware == null ? newMiddleware : (0, nice_grpc_common_1.composeClientMiddleware)(middleware, newMiddleware));
        },
        create(definition, channel, defaultCallOptions = {}) {
          const client = {};
          const methodEntries = Object.entries((0, service_definitions_1.normalizeServiceDefinition)(definition));
          for (const [methodName, methodDefinition] of methodEntries) {
            const defaultOptions = {
              ...defaultCallOptions["*"],
              ...defaultCallOptions[methodName]
            };
            if (!methodDefinition.requestStream) {
              if (!methodDefinition.responseStream) {
                client[methodName] = (0, createUnaryMethod_1.createUnaryMethod)(methodDefinition, channel, middleware, defaultOptions);
              } else {
                client[methodName] = (0, createServerStreamingMethod_1.createServerStreamingMethod)(methodDefinition, channel, middleware, defaultOptions);
              }
            } else {
              if (!methodDefinition.responseStream) {
                client[methodName] = (0, createClientStreamingMethod_1.createClientStreamingMethod)(methodDefinition, channel, middleware, defaultOptions);
              } else {
                client[methodName] = (0, createBidiStreamingMethod_1.createBidiStreamingMethod)(methodDefinition, channel, middleware, defaultOptions);
              }
            }
          }
          return client;
        }
      };
    }
  }
});

// ../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/client/Client.js
var require_Client2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/client/Client.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// ../../daisi-sdk-typescript/node_modules/isomorphic-ws/browser.js
var browser_exports2 = {};
__export(browser_exports2, {
  default: () => browser_default2
});
var ws2, browser_default2;
var init_browser2 = __esm({
  "../../daisi-sdk-typescript/node_modules/isomorphic-ws/browser.js"() {
    ws2 = null;
    if (typeof WebSocket !== "undefined") {
      ws2 = WebSocket;
    } else if (typeof MozWebSocket !== "undefined") {
      ws2 = MozWebSocket;
    } else if (typeof global !== "undefined") {
      ws2 = global.WebSocket || global.MozWebSocket;
    } else if (typeof window !== "undefined") {
      ws2 = window.WebSocket || window.MozWebSocket;
    } else if (typeof self !== "undefined") {
      ws2 = self.WebSocket || self.MozWebSocket;
    }
    browser_default2 = ws2;
  }
});

// ../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/utils/AsyncSink.js
var require_AsyncSink2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/utils/AsyncSink.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AsyncSink = void 0;
    var ARRAY_VALUE = "value";
    var ARRAY_ERROR = "error";
    var AsyncSink = class {
      constructor() {
        this._ended = false;
        this._values = [];
        this._resolvers = [];
      }
      [Symbol.asyncIterator]() {
        return this;
      }
      write(value) {
        this._push({ type: ARRAY_VALUE, value });
      }
      error(error) {
        this._push({ type: ARRAY_ERROR, error });
      }
      _push(item) {
        if (this._ended) {
          return;
        }
        if (this._resolvers.length > 0) {
          const { resolve: resolve2, reject } = this._resolvers.shift();
          if (item.type === ARRAY_ERROR) {
            reject(item.error);
          } else {
            resolve2({ done: false, value: item.value });
          }
        } else {
          this._values.push(item);
        }
      }
      next() {
        if (this._values.length > 0) {
          const { type, value, error } = this._values.shift();
          if (type === ARRAY_ERROR) {
            return Promise.reject(error);
          } else {
            return Promise.resolve({ done: false, value });
          }
        }
        if (this._ended) {
          return Promise.resolve({ done: true });
        }
        return new Promise((resolve2, reject) => {
          this._resolvers.push({ resolve: resolve2, reject });
        });
      }
      end() {
        while (this._resolvers.length > 0) {
          this._resolvers.shift().resolve({ done: true });
        }
        this._ended = true;
      }
    };
    exports.AsyncSink = AsyncSink;
  }
});

// ../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/client/transports/websocket.js
var require_websocket2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/client/transports/websocket.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WebsocketTransport = WebsocketTransport;
    var abort_controller_x_1 = require_lib5();
    var isomorphic_ws_1 = __importDefault((init_browser2(), __toCommonJS(browser_exports2)));
    var js_base64_1 = require_base642();
    var AsyncSink_1 = require_AsyncSink2();
    function WebsocketTransport() {
      return async function* ({ url, body, metadata, signal }) {
        if (signal.aborted) {
          throw new abort_controller_x_1.AbortError();
        }
        const frames = new AsyncSink_1.AsyncSink();
        signal.addEventListener("abort", () => {
          frames.error(new abort_controller_x_1.AbortError());
        });
        const websocketUrl = new URL(url);
        websocketUrl.protocol = websocketUrl.protocol.replace("http", "ws");
        const webSocket = new isomorphic_ws_1.default(websocketUrl, ["grpc-websockets"]);
        webSocket.binaryType = "arraybuffer";
        webSocket.addEventListener("message", (event) => {
          if (event.data instanceof ArrayBuffer) {
            frames.write({
              type: "data",
              data: new Uint8Array(event.data)
            });
          } else {
            frames.error(new Error(`Unexpected message type: ${typeof event.data}`));
          }
        });
        webSocket.addEventListener("close", (event) => {
          if (event.wasClean) {
            frames.end();
          } else {
            frames.error(new Error(`WebSocket closed with code ${event.code}` + (event.reason && `: ${event.reason}`)));
          }
        });
        const pipeAbortController = new AbortController();
        pipeBody(pipeAbortController.signal, metadata, body, webSocket).catch((err) => {
          if (!(0, abort_controller_x_1.isAbortError)(err)) {
            frames.error(err);
          }
        });
        try {
          return yield* frames;
        } finally {
          pipeAbortController.abort();
          webSocket.close();
        }
      };
    }
    async function pipeBody(signal, metadata, body, webSocket) {
      if (webSocket.readyState == isomorphic_ws_1.default.CONNECTING) {
        await (0, abort_controller_x_1.waitForEvent)(signal, webSocket, "open");
      }
      webSocket.send(encodeMetadata(metadata));
      for await (const chunk of body) {
        (0, abort_controller_x_1.throwIfAborted)(signal);
        const data = new Uint8Array(chunk.length + 1);
        data.set([0], 0);
        data.set(chunk, 1);
        webSocket.send(data);
      }
      webSocket.send(new Uint8Array([1]));
    }
    function encodeMetadata(metadata) {
      let result = "";
      for (const [key, values] of metadata) {
        for (const value of values) {
          const valueString = typeof value === "string" ? value : js_base64_1.Base64.fromUint8Array(value);
          const pairString = `${key}: ${valueString}\r
`;
          for (let i = 0; i < pairString.length; i++) {
            const charCode = pairString.charCodeAt(i);
            if (!isValidCharCode(charCode)) {
              throw new Error(`Metadata contains invalid characters: '${pairString}'`);
            }
          }
          result += pairString;
        }
      }
      return new TextEncoder().encode(result);
    }
    function isValidCharCode(val) {
      return val === 9 || val === 10 || val === 13 || val >= 32 && val <= 126;
    }
  }
});

// ../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/client/transports/nodeHttp/browser.js
var require_browser2 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/client/transports/nodeHttp/browser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NodeHttpTransport = NodeHttpTransport;
    function NodeHttpTransport() {
      throw new Error("NodeHttpTransport is not supported in the browser");
    }
  }
});

// ../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/index.js
var require_lib6 = __commonJS({
  "../../daisi-sdk-typescript/node_modules/nice-grpc-web/lib/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NodeHttpTransport = exports.WebsocketTransport = exports.FetchTransport = exports.Status = exports.Metadata = exports.composeClientMiddleware = exports.ClientError = void 0;
    var nice_grpc_common_1 = require_lib4();
    Object.defineProperty(exports, "ClientError", { enumerable: true, get: function() {
      return nice_grpc_common_1.ClientError;
    } });
    Object.defineProperty(exports, "composeClientMiddleware", { enumerable: true, get: function() {
      return nice_grpc_common_1.composeClientMiddleware;
    } });
    Object.defineProperty(exports, "Metadata", { enumerable: true, get: function() {
      return nice_grpc_common_1.Metadata;
    } });
    Object.defineProperty(exports, "Status", { enumerable: true, get: function() {
      return nice_grpc_common_1.Status;
    } });
    __exportStar(require_service_definitions2(), exports);
    __exportStar(require_channel2(), exports);
    __exportStar(require_ClientFactory2(), exports);
    __exportStar(require_Client2(), exports);
    var fetch_1 = require_fetch2();
    Object.defineProperty(exports, "FetchTransport", { enumerable: true, get: function() {
      return fetch_1.FetchTransport;
    } });
    var websocket_1 = require_websocket2();
    Object.defineProperty(exports, "WebsocketTransport", { enumerable: true, get: function() {
      return websocket_1.WebsocketTransport;
    } });
    var nodeHttp_1 = require_browser2();
    Object.defineProperty(exports, "NodeHttpTransport", { enumerable: true, get: function() {
      return nodeHttp_1.NodeHttpTransport;
    } });
  }
});

// ../../daisi-llogos/src/Daisi.Llogos.WebGpu/dist/index.js
function isWebGpuAvailable() {
  return typeof navigator !== "undefined" && "gpu" in navigator;
}
async function initGpu() {
  if (!isWebGpuAvailable()) {
    throw new Error("WebGPU is not available in this browser.");
  }
  const adapter = await navigator.gpu.requestAdapter({
    powerPreference: "high-performance"
  });
  if (!adapter) {
    throw new Error("No WebGPU adapter found. Your GPU may not support WebGPU.");
  }
  const adapterInfo = adapter.info;
  const limits = adapter.limits;
  const supportsF16 = adapter.features.has("shader-f16");
  const supportsTimestampQuery = adapter.features.has("timestamp-query");
  const requiredFeatures = [];
  if (supportsTimestampQuery) requiredFeatures.push("timestamp-query");
  if (supportsF16) requiredFeatures.push("shader-f16");
  const device = await adapter.requestDevice({
    requiredFeatures,
    requiredLimits: {
      maxBufferSize: limits.maxBufferSize,
      maxStorageBufferBindingSize: limits.maxStorageBufferBindingSize,
      maxComputeWorkgroupSizeX: limits.maxComputeWorkgroupSizeX,
      maxComputeInvocationsPerWorkgroup: limits.maxComputeInvocationsPerWorkgroup
    }
  });
  device.lost.then((info) => {
    console.error(`WebGPU device lost: ${info.message} (reason: ${info.reason})`);
  });
  return {
    adapter,
    device,
    capabilities: {
      adapterInfo,
      maxBufferSize: device.limits.maxBufferSize,
      maxStorageBufferBindingSize: device.limits.maxStorageBufferBindingSize,
      maxComputeWorkgroupSizeX: device.limits.maxComputeWorkgroupSizeX,
      maxComputeInvocationsPerWorkgroup: device.limits.maxComputeInvocationsPerWorkgroup,
      supportsF16,
      supportsTimestampQuery
    }
  };
}
var ShaderCache = class {
  device;
  moduleCache = /* @__PURE__ */ new Map();
  pipelineCache = /* @__PURE__ */ new Map();
  constructor(device) {
    this.device = device;
  }
  /**
   * Get or compile a shader module from WGSL source.
   */
  getModule(source, label) {
    let module = this.moduleCache.get(source);
    if (!module) {
      module = this.device.createShaderModule({ code: source, label });
      this.moduleCache.set(source, module);
    }
    return module;
  }
  /**
   * Get or create a compute pipeline from config.
   */
  getPipeline(config) {
    const key = `${config.shader}::${config.entryPoint ?? "main"}::${JSON.stringify(config.bindGroupLayout)}`;
    let cached = this.pipelineCache.get(key);
    if (!cached) {
      const module = this.getModule(config.shader, config.label);
      const bindGroupLayout = this.device.createBindGroupLayout({
        label: config.label,
        entries: config.bindGroupLayout
      });
      const pipelineLayout = this.device.createPipelineLayout({
        label: config.label,
        bindGroupLayouts: [bindGroupLayout]
      });
      const pipeline = this.device.createComputePipeline({
        label: config.label,
        layout: pipelineLayout,
        compute: { module, entryPoint: config.entryPoint ?? "main" }
      });
      cached = { pipeline, bindGroupLayout };
      this.pipelineCache.set(key, cached);
    }
    return cached;
  }
  /**
   * Create a bind group from a cached pipeline's layout.
   */
  createBindGroup(cached, entries, label) {
    return this.device.createBindGroup({
      label,
      layout: cached.bindGroupLayout,
      entries
    });
  }
};
var BufferPool = class {
  device;
  buffers = /* @__PURE__ */ new Map();
  totalAllocated = 0;
  constructor(device) {
    this.device = device;
  }
  /** Total bytes allocated on GPU. */
  get vramUsage() {
    return this.totalAllocated;
  }
  /**
   * Create or retrieve a named storage buffer.
   */
  createBuffer(label, size, usage) {
    const existing = this.buffers.get(label);
    if (existing && existing.size >= size) return existing.buffer;
    if (existing) {
      existing.buffer.destroy();
      this.totalAllocated -= existing.size;
    }
    const alignedSize = Math.ceil(size / 4) * 4;
    const buffer = this.device.createBuffer({
      label,
      size: alignedSize,
      usage: usage ?? GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST
    });
    this.buffers.set(label, { buffer, size: alignedSize, label });
    this.totalAllocated += alignedSize;
    return buffer;
  }
  /**
   * Create a storage buffer initialized with data.
   */
  createBufferWithData(label, data, usage) {
    const buffer = this.createBuffer(label, data.byteLength, usage);
    this.device.queue.writeBuffer(buffer, 0, data);
    return buffer;
  }
  /**
   * Create a buffer for reading data back to CPU.
   */
  createReadbackBuffer(label, size) {
    const alignedSize = Math.ceil(size / 4) * 4;
    return this.device.createBuffer({
      label: `${label}_readback`,
      size: alignedSize,
      usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST
    });
  }
  /**
   * Get an existing buffer by label.
   */
  get(label) {
    return this.buffers.get(label)?.buffer;
  }
  /**
   * Destroy a named buffer and free its VRAM.
   */
  destroy(label) {
    const info = this.buffers.get(label);
    if (info) {
      info.buffer.destroy();
      this.totalAllocated -= info.size;
      this.buffers.delete(label);
    }
  }
  /**
   * Destroy all buffers.
   */
  destroyAll() {
    for (const info of this.buffers.values()) {
      info.buffer.destroy();
    }
    this.buffers.clear();
    this.totalAllocated = 0;
  }
};
var GgmlType = /* @__PURE__ */ ((GgmlType3) => {
  GgmlType3[GgmlType3["F32"] = 0] = "F32";
  GgmlType3[GgmlType3["F16"] = 1] = "F16";
  GgmlType3[GgmlType3["Q4_0"] = 2] = "Q4_0";
  GgmlType3[GgmlType3["Q4_1"] = 3] = "Q4_1";
  GgmlType3[GgmlType3["Q5_0"] = 6] = "Q5_0";
  GgmlType3[GgmlType3["Q5_1"] = 7] = "Q5_1";
  GgmlType3[GgmlType3["Q8_0"] = 8] = "Q8_0";
  GgmlType3[GgmlType3["Q8_1"] = 9] = "Q8_1";
  GgmlType3[GgmlType3["Q2_K"] = 10] = "Q2_K";
  GgmlType3[GgmlType3["Q3_K"] = 11] = "Q3_K";
  GgmlType3[GgmlType3["Q4_K"] = 12] = "Q4_K";
  GgmlType3[GgmlType3["Q5_K"] = 13] = "Q5_K";
  GgmlType3[GgmlType3["Q6_K"] = 14] = "Q6_K";
  GgmlType3[GgmlType3["Q8_K"] = 15] = "Q8_K";
  GgmlType3[GgmlType3["I8"] = 24] = "I8";
  GgmlType3[GgmlType3["I16"] = 25] = "I16";
  GgmlType3[GgmlType3["I32"] = 26] = "I32";
  GgmlType3[GgmlType3["I64"] = 27] = "I64";
  GgmlType3[GgmlType3["F64"] = 28] = "F64";
  GgmlType3[GgmlType3["BF16"] = 30] = "BF16";
  return GgmlType3;
})(GgmlType || {});
function blockSize(type) {
  switch (type) {
    case 0:
    case 1:
    case 30:
    case 24:
    case 25:
    case 26:
    case 27:
    case 28:
      return 1;
    case 2:
    case 3:
    case 6:
    case 7:
    case 8:
    case 9:
      return 32;
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
      return 256;
    default:
      throw new Error(`Unknown GGML type: ${type}`);
  }
}
function typeSize(type) {
  switch (type) {
    case 0:
    case 26:
      return 4;
    case 1:
    case 30:
    case 25:
      return 2;
    case 24:
      return 1;
    case 27:
    case 28:
      return 8;
    case 2:
      return 18;
    case 3:
      return 20;
    case 6:
      return 22;
    case 7:
      return 24;
    case 8:
      return 34;
    case 9:
      return 36;
    case 10:
      return 96;
    case 11:
      return 110;
    case 12:
      return 144;
    case 13:
      return 176;
    case 14:
      return 210;
    case 15:
      return 292;
    default:
      throw new Error(`Unknown GGML type: ${type}`);
  }
}
function tensorByteSize(type, elementCount) {
  const bs = blockSize(type);
  const ts = typeSize(type);
  const blockCount = Math.ceil(elementCount / bs);
  return blockCount * ts;
}
var embedding_default = "// Token embedding lookup: output[i] = weights[tokenId * embeddingDim + i]\r\n\r\nstruct Params {\r\n  token_id: u32,\r\n  embedding_dim: u32,\r\n}\r\n\r\n@group(0) @binding(0) var<storage, read> weights: array<f32>;\r\n@group(0) @binding(1) var<storage, read_write> output: array<f32>;\r\n@group(0) @binding(2) var<uniform> params: Params;\r\n\r\n@compute @workgroup_size(256)\r\nfn main(@builtin(global_invocation_id) gid: vec3u) {\r\n  let i = gid.x;\r\n  if (i >= params.embedding_dim) { return; }\r\n  output[i] = weights[params.token_id * params.embedding_dim + i];\r\n}\r\n";
var rmsnorm_default = "struct Params { n: u32, eps_bits: u32, }\r\n@group(0) @binding(0) var<storage, read> input: array<f32>;\r\n@group(0) @binding(1) var<storage, read> weight: array<f32>;\r\n@group(0) @binding(2) var<storage, read_write> output: array<f32>;\r\n@group(0) @binding(3) var<uniform> params: Params;\r\nvar<workgroup> shared_sum: array<f32, 256>;\r\n\r\n@compute @workgroup_size(256)\r\nfn main(@builtin(local_invocation_id) lid: vec3u) {\r\n  let tid = lid.x;\r\n  let n = params.n;\r\n  let eps = bitcast<f32>(params.eps_bits);\r\n  var sq: f32 = 0.0;\r\n  for (var i = tid; i < n; i += 256u) { let v = input[i]; sq += v * v; }\r\n  shared_sum[tid] = sq;\r\n  workgroupBarrier();\r\n  for (var s = 128u; s > 0u; s >>= 1u) { if (tid < s) { shared_sum[tid] += shared_sum[tid + s]; } workgroupBarrier(); }\r\n  let rms = sqrt(shared_sum[0] / f32(n) + eps);\r\n  for (var i = tid; i < n; i += 256u) { output[i] = (input[i] / rms) * weight[i]; }\r\n}\r\n";
var rope_default = "// Rotary Position Embedding (RoPE) using precomputed cos/sin table.\r\n// Avoids GPU pow/cos/sin precision issues.\r\n\r\nstruct Params {\r\n  n_elements: u32,\r\n  head_dim: u32,\r\n}\r\n\r\n@group(0) @binding(0) var<storage, read_write> data: array<f32>;\r\n@group(0) @binding(1) var<storage, read> cos_table: array<f32>; // [headDim/2] precomputed cos values\r\n@group(0) @binding(2) var<storage, read> sin_table: array<f32>; // [headDim/2] precomputed sin values\r\n@group(0) @binding(3) var<uniform> params: Params;\r\n\r\n@compute @workgroup_size(1)\r\nfn main(@builtin(global_invocation_id) gid: vec3u) {\r\n  let pair_idx = gid.x;\r\n  if (pair_idx >= params.n_elements / 2u) { return; }\r\n\r\n  let head_pair = pair_idx % (params.head_dim / 2u);\r\n  let cos_a = cos_table[head_pair];\r\n  let sin_a = sin_table[head_pair];\r\n\r\n  let idx0 = pair_idx * 2u;\r\n  let idx1 = idx0 + 1u;\r\n\r\n  let x = data[idx0];\r\n  let y = data[idx1];\r\n\r\n  data[idx0] = x * cos_a - y * sin_a;\r\n  data[idx1] = x * sin_a + y * cos_a;\r\n}\r\n";
var matmul_default = "struct Params { M: u32, K: u32, }\n@group(0) @binding(0) var<storage, read> weights: array<f32>;\n@group(0) @binding(1) var<storage, read> input: array<f32>;\n@group(0) @binding(2) var<storage, read_write> output: array<f32>;\n@group(0) @binding(3) var<uniform> params: Params;\nvar<workgroup> shared_sum: array<f32, 256>;\n\n@compute @workgroup_size(256)\nfn main(@builtin(workgroup_id) wg: vec3u, @builtin(local_invocation_id) lid: vec3u) {\n  let row = wg.x + wg.y * 65535u;\n  if (row >= params.M) { return; }\n  let tid = lid.x;\n  let K = params.K;\n  var sum: f32 = 0.0;\n  for (var k = tid; k < K; k += 256u) { sum += weights[row * K + k] * input[k]; }\n  shared_sum[tid] = sum;\n  workgroupBarrier();\n  for (var s = 128u; s > 0u; s >>= 1u) { if (tid < s) { shared_sum[tid] += shared_sum[tid + s]; } workgroupBarrier(); }\n  if (tid == 0u) { output[row] = shared_sum[0]; }\n}\n";
var matmul_q4_default = "// Fused Q4_0 dequantize + matrix-vector multiply\r\n// Q4_0 block layout (18 bytes):\r\n//   [0..1]   f16 scale (delta)\r\n//   [2..17]  16 bytes = 32 x 4-bit quants packed as:\r\n//            low nibbles of bytes 0-15  \u2192 quants 0-15\r\n//            high nibbles of bytes 0-15 \u2192 quants 16-31\r\n//            (matches llama.cpp dequant order)\r\n//\r\n// weights: [M * ceil(K/32) * 18 bytes], input: [K], output: [M]\r\n// Each workgroup computes one output row.\r\n\r\nstruct Params {\r\n  M: u32,\r\n  K: u32,\r\n}\r\n\r\n@group(0) @binding(0) var<storage, read> weights: array<u32>;\r\n@group(0) @binding(1) var<storage, read> input: array<f32>;\r\n@group(0) @binding(2) var<storage, read_write> output: array<f32>;\r\n@group(0) @binding(3) var<uniform> params: Params;\r\n\r\nvar<workgroup> shared_sum: array<f32, 256>;\r\n\r\n// Read a f16 value from a byte offset within the u32 weight array\r\nfn read_f16(byte_offset: u32) -> f32 {\r\n  let word_idx = byte_offset / 4u;\r\n  let word = weights[word_idx];\r\n  let shift = (byte_offset % 4u) * 8u;\r\n  let bits = (word >> shift) & 0xFFFFu;\r\n  let sign = (bits >> 15u) & 1u;\r\n  let exp = (bits >> 10u) & 0x1Fu;\r\n  let mant = bits & 0x3FFu;\r\n  if (exp == 0u) {\r\n    if (mant == 0u) { return 0.0; }\r\n    let f = f32(mant) / 1024.0 * pow(2.0, -14.0);\r\n    if (sign == 1u) { return -f; }\r\n    return f;\r\n  }\r\n  if (exp == 31u) { return 0.0; }\r\n  let f = (1.0 + f32(mant) / 1024.0) * pow(2.0, f32(exp) - 15.0);\r\n  if (sign == 1u) { return -f; }\r\n  return f;\r\n}\r\n\r\n// Read a byte from the u32 weight array at a byte offset\r\nfn read_byte(byte_offset: u32) -> u32 {\r\n  let word_idx = byte_offset / 4u;\r\n  let word = weights[word_idx];\r\n  let shift = (byte_offset % 4u) * 8u;\r\n  return (word >> shift) & 0xFFu;\r\n}\r\n\r\n// Read a Q4_0 quant value (0..31) from a block\r\n// quant 0..15  = low nibble of qs[quant_idx]\r\n// quant 16..31 = high nibble of qs[quant_idx - 16]\r\nfn read_q4(block_byte_offset: u32, quant_idx: u32) -> f32 {\r\n  let qs_offset = block_byte_offset + 2u; // skip 2-byte scale\r\n  if (quant_idx < 16u) {\r\n    let byte_val = read_byte(qs_offset + quant_idx);\r\n    return f32(byte_val & 0xFu) - 8.0;\r\n  } else {\r\n    let byte_val = read_byte(qs_offset + quant_idx - 16u);\r\n    return f32((byte_val >> 4u) & 0xFu) - 8.0;\r\n  }\r\n}\r\n\r\n@compute @workgroup_size(256)\r\nfn main(\r\n  @builtin(workgroup_id) wg_id: vec3u,\r\n  @builtin(local_invocation_id) lid: vec3u,\r\n) {\r\n  let row = wg_id.x + wg_id.y * 65535u;\r\n  if (row >= params.M) { return; }\r\n\r\n  let tid = lid.x;\r\n  let K = params.K;\r\n  let n_blocks = K / 32u;\r\n  let block_bytes = 18u;\r\n  let row_byte_offset = row * n_blocks * block_bytes;\r\n\r\n  var sum: f32 = 0.0;\r\n  for (var b = tid; b < n_blocks; b += 256u) {\r\n    let block_offset = row_byte_offset + b * block_bytes;\r\n    let scale = read_f16(block_offset);\r\n\r\n    for (var q = 0u; q < 32u; q++) {\r\n      let dequant = scale * read_q4(block_offset, q);\r\n      sum += dequant * input[b * 32u + q];\r\n    }\r\n  }\r\n\r\n  shared_sum[tid] = sum;\r\n  workgroupBarrier();\r\n\r\n  for (var stride = 128u; stride > 0u; stride >>= 1u) {\r\n    if (tid < stride) {\r\n      shared_sum[tid] += shared_sum[tid + stride];\r\n    }\r\n    workgroupBarrier();\r\n  }\r\n\r\n  if (tid == 0u) {\r\n    output[row] = shared_sum[0];\r\n  }\r\n}\r\n";
var matmul_q8_default = "struct Params { M: u32, K: u32, }\r\n@group(0) @binding(0) var<storage, read> weights: array<u32>;\r\n@group(0) @binding(1) var<storage, read> input: array<f32>;\r\n@group(0) @binding(2) var<storage, read_write> output: array<f32>;\r\n@group(0) @binding(3) var<uniform> params: Params;\r\nvar<workgroup> shared_sum: array<f32, 256>;\r\n\r\nfn read_scale(bo: u32) -> f32 {\r\n  let w = weights[bo / 4u];\r\n  let bits = select(w & 0xFFFFu, (w >> 16u) & 0xFFFFu, (bo % 4u) != 0u);\r\n  return unpack2x16float(bits).x;\r\n}\r\nfn read_i8(bo: u32) -> f32 {\r\n  let v = (weights[bo / 4u] >> ((bo % 4u) * 8u)) & 0xFFu;\r\n  return select(f32(v), f32(v) - 256.0, v >= 128u);\r\n}\r\n\r\n@compute @workgroup_size(256)\r\nfn main(@builtin(workgroup_id) wg: vec3u, @builtin(local_invocation_id) lid: vec3u) {\r\n  let row = wg.x + wg.y * 65535u;\r\n  if (row >= params.M) { return; }\r\n  let tid = lid.x;\r\n  let nblk = params.K / 32u;\r\n  let roff = row * nblk * 34u;\r\n  var sum: f32 = 0.0;\r\n  for (var b = tid; b < nblk; b += 256u) {\r\n    let bo = roff + b * 34u;\r\n    let sc = read_scale(bo);\r\n    let bk = b * 32u;\r\n    for (var q = 0u; q < 32u; q++) { sum += sc * read_i8(bo + 2u + q) * input[bk + q]; }\r\n  }\r\n  shared_sum[tid] = sum;\r\n  workgroupBarrier();\r\n  for (var s = 128u; s > 0u; s >>= 1u) { if (tid < s) { shared_sum[tid] += shared_sum[tid + s]; } workgroupBarrier(); }\r\n  if (tid == 0u) { output[row] = shared_sum[0]; }\r\n}\r\n";
var attention_default = "// Multi-head attention \u2014 1 workgroup per head, 64 threads per workgroup.\r\n// Each thread handles one dimension of head_dim for the weighted V sum.\r\n// Scores computed collaboratively, softmax in shared memory.\r\n\r\nstruct Params {\r\n  num_heads: u32,\r\n  num_kv_heads: u32,\r\n  head_dim: u32,\r\n  seq_len: u32,\r\n  max_seq_len: u32,\r\n  scale_bits: u32,\r\n}\r\n\r\n@group(0) @binding(0) var<storage, read> q: array<f32>;\r\n@group(0) @binding(1) var<storage, read> k_cache: array<f32>;\r\n@group(0) @binding(2) var<storage, read> v_cache: array<f32>;\r\n@group(0) @binding(3) var<storage, read_write> output: array<f32>;\r\n@group(0) @binding(4) var<uniform> params: Params;\r\n\r\nvar<workgroup> sh_scores: array<f32, 2176>; // max seq_len (2048) + 128 for reduction temps\r\nvar<workgroup> sh_max: f32;\r\nvar<workgroup> sh_sum: f32;\r\n\r\n@compute @workgroup_size(64)\r\nfn main(\r\n  @builtin(workgroup_id) wg: vec3u,\r\n  @builtin(local_invocation_id) lid: vec3u,\r\n) {\r\n  let head = wg.x;\r\n  if (head >= params.num_heads) { return; }\r\n  let tid = lid.x;\r\n  let hd = params.head_dim;\r\n  let sl = params.seq_len;\r\n  let scale = bitcast<f32>(params.scale_bits);\r\n  let kvh = head / (params.num_heads / params.num_kv_heads);\r\n  let qoff = head * hd;\r\n  let kvs = params.max_seq_len * hd;\r\n\r\n  // Step 1: Each thread computes scores for a subset of positions\r\n  // Thread tid handles positions tid, tid+64, tid+128, ...\r\n  var local_max: f32 = -1e30;\r\n  for (var pos = tid; pos < sl; pos += 64u) {\r\n    var dot: f32 = 0.0;\r\n    for (var d = 0u; d < hd; d++) {\r\n      dot += q[qoff + d] * k_cache[kvh * kvs + pos * hd + d];\r\n    }\r\n    let score = dot * scale;\r\n    sh_scores[pos] = score;\r\n    local_max = max(local_max, score);\r\n  }\r\n\r\n  // Reduce max across threads\r\n  sh_scores[sl + tid] = local_max; // reuse space after scores\r\n  workgroupBarrier();\r\n  // Manual 64-thread reduction for max\r\n  if (tid < 32u) { sh_scores[sl + tid] = max(sh_scores[sl + tid], sh_scores[sl + tid + 32u]); }\r\n  workgroupBarrier();\r\n  if (tid < 16u) { sh_scores[sl + tid] = max(sh_scores[sl + tid], sh_scores[sl + tid + 16u]); }\r\n  workgroupBarrier();\r\n  if (tid < 8u) { sh_scores[sl + tid] = max(sh_scores[sl + tid], sh_scores[sl + tid + 8u]); }\r\n  workgroupBarrier();\r\n  if (tid < 4u) { sh_scores[sl + tid] = max(sh_scores[sl + tid], sh_scores[sl + tid + 4u]); }\r\n  workgroupBarrier();\r\n  if (tid < 2u) { sh_scores[sl + tid] = max(sh_scores[sl + tid], sh_scores[sl + tid + 2u]); }\r\n  workgroupBarrier();\r\n  if (tid == 0u) { sh_max = max(sh_scores[sl], sh_scores[sl + 1u]); }\r\n  workgroupBarrier();\r\n\r\n  // Step 2: exp(score - max) and sum\r\n  var local_sum: f32 = 0.0;\r\n  for (var pos = tid; pos < sl; pos += 64u) {\r\n    let e = exp(sh_scores[pos] - sh_max);\r\n    sh_scores[pos] = e;\r\n    local_sum += e;\r\n  }\r\n  sh_scores[sl + tid] = local_sum;\r\n  workgroupBarrier();\r\n  if (tid < 32u) { sh_scores[sl + tid] += sh_scores[sl + tid + 32u]; }\r\n  workgroupBarrier();\r\n  if (tid < 16u) { sh_scores[sl + tid] += sh_scores[sl + tid + 16u]; }\r\n  workgroupBarrier();\r\n  if (tid < 8u) { sh_scores[sl + tid] += sh_scores[sl + tid + 8u]; }\r\n  workgroupBarrier();\r\n  if (tid < 4u) { sh_scores[sl + tid] += sh_scores[sl + tid + 4u]; }\r\n  workgroupBarrier();\r\n  if (tid < 2u) { sh_scores[sl + tid] += sh_scores[sl + tid + 2u]; }\r\n  workgroupBarrier();\r\n  if (tid == 0u) { sh_sum = sh_scores[sl] + sh_scores[sl + 1u]; }\r\n  workgroupBarrier();\r\n\r\n  // Normalize scores\r\n  for (var pos = tid; pos < sl; pos += 64u) {\r\n    sh_scores[pos] /= sh_sum;\r\n  }\r\n  workgroupBarrier();\r\n\r\n  // Step 3: Weighted V \u2014 each thread handles one dimension of output\r\n  // tid 0..63 \u2192 dim 0..63 (head_dim is typically 64)\r\n  if (tid < hd) {\r\n    var acc: f32 = 0.0;\r\n    for (var pos = 0u; pos < sl; pos++) {\r\n      acc += sh_scores[pos] * v_cache[kvh * kvs + pos * hd + tid];\r\n    }\r\n    output[qoff + tid] = acc;\r\n  }\r\n}\r\n";
var softmax_default = "// Softmax: output[i] = exp(input[i] - max) / sum(exp(input - max))\r\n// Two-pass: 1) find max, 2) exp, sum, normalize\r\n// Used for logits \u2192 probabilities in sampling.\r\n\r\nstruct Params {\r\n  n: u32,\r\n}\r\n\r\n@group(0) @binding(0) var<storage, read> input: array<f32>;\r\n@group(0) @binding(1) var<storage, read_write> output: array<f32>;\r\n@group(0) @binding(2) var<uniform> params: Params;\r\n\r\nvar<workgroup> shared_data: array<f32, 256>;\r\n\r\n@compute @workgroup_size(256)\r\nfn main(@builtin(local_invocation_id) lid: vec3u) {\r\n  let tid = lid.x;\r\n  let n = params.n;\r\n\r\n  // Pass 1: find max\r\n  var local_max: f32 = -1e30;\r\n  for (var i = tid; i < n; i += 256u) {\r\n    local_max = max(local_max, input[i]);\r\n  }\r\n  shared_data[tid] = local_max;\r\n  workgroupBarrier();\r\n\r\n  for (var stride = 128u; stride > 0u; stride >>= 1u) {\r\n    if (tid < stride) {\r\n      shared_data[tid] = max(shared_data[tid], shared_data[tid + stride]);\r\n    }\r\n    workgroupBarrier();\r\n  }\r\n  let max_val = shared_data[0];\r\n  workgroupBarrier();\r\n\r\n  // Pass 2: exp and sum\r\n  var local_sum: f32 = 0.0;\r\n  for (var i = tid; i < n; i += 256u) {\r\n    let v = exp(input[i] - max_val);\r\n    output[i] = v;\r\n    local_sum += v;\r\n  }\r\n  shared_data[tid] = local_sum;\r\n  workgroupBarrier();\r\n\r\n  for (var stride = 128u; stride > 0u; stride >>= 1u) {\r\n    if (tid < stride) {\r\n      shared_data[tid] += shared_data[tid + stride];\r\n    }\r\n    workgroupBarrier();\r\n  }\r\n  let total_sum = shared_data[0];\r\n  workgroupBarrier();\r\n\r\n  // Pass 3: normalize\r\n  let inv_sum = 1.0 / total_sum;\r\n  for (var i = tid; i < n; i += 256u) {\r\n    output[i] *= inv_sum;\r\n  }\r\n}\r\n";
var silu_default = "// SiLU activation: output[i] = input[i] * sigmoid(input[i])\r\n// Also called Swish. Used in FFN gate.\r\n\r\nstruct Params {\r\n  n: u32,\r\n}\r\n\r\n@group(0) @binding(0) var<storage, read> input: array<f32>;\r\n@group(0) @binding(1) var<storage, read_write> output: array<f32>;\r\n@group(0) @binding(2) var<uniform> params: Params;\r\n\r\n@compute @workgroup_size(256)\r\nfn main(@builtin(global_invocation_id) gid: vec3u) {\r\n  let i = gid.x;\r\n  if (i >= params.n) { return; }\r\n  let x = input[i];\r\n  output[i] = x / (1.0 + exp(-x));\r\n}\r\n";
var silu_mul_default = "// Fused SiLU-gate multiply: output[i] = silu(gate[i]) * up[i]\r\n// Combines two FFN operations into one kernel dispatch.\r\n\r\nstruct Params {\r\n  n: u32,\r\n}\r\n\r\n@group(0) @binding(0) var<storage, read> gate: array<f32>;\r\n@group(0) @binding(1) var<storage, read> up: array<f32>;\r\n@group(0) @binding(2) var<storage, read_write> output: array<f32>;\r\n@group(0) @binding(3) var<uniform> params: Params;\r\n\r\n@compute @workgroup_size(256)\r\nfn main(@builtin(global_invocation_id) gid: vec3u) {\r\n  let i = gid.x;\r\n  if (i >= params.n) { return; }\r\n  let x = gate[i];\r\n  let silu_x = x / (1.0 + exp(-x));\r\n  output[i] = silu_x * up[i];\r\n}\r\n";
var copy_rmsnorm_default = "// Fused: copy input\u2192residual AND compute RMSNorm(input, weight)\u2192output\r\n// Saves one dispatch per layer half (2 per layer = 44 total)\r\nstruct Params { n: u32, eps_bits: u32, }\r\n@group(0) @binding(0) var<storage, read> input: array<f32>;\r\n@group(0) @binding(1) var<storage, read> weight: array<f32>;\r\n@group(0) @binding(2) var<storage, read_write> output: array<f32>;\r\n@group(0) @binding(3) var<storage, read_write> residual: array<f32>;\r\n@group(0) @binding(4) var<uniform> params: Params;\r\nvar<workgroup> shared_sum: array<f32, 256>;\r\n\r\n@compute @workgroup_size(256)\r\nfn main(@builtin(local_invocation_id) lid: vec3u) {\r\n  let tid = lid.x;\r\n  let n = params.n;\r\n  let eps = bitcast<f32>(params.eps_bits);\r\n  // Copy input \u2192 residual AND accumulate sum of squares\r\n  var sq: f32 = 0.0;\r\n  for (var i = tid; i < n; i += 256u) {\r\n    let v = input[i];\r\n    residual[i] = v;  // copy\r\n    sq += v * v;\r\n  }\r\n  shared_sum[tid] = sq;\r\n  workgroupBarrier();\r\n  for (var s = 128u; s > 0u; s >>= 1u) { if (tid < s) { shared_sum[tid] += shared_sum[tid + s]; } workgroupBarrier(); }\r\n  let rms = sqrt(shared_sum[0] / f32(n) + eps);\r\n  for (var i = tid; i < n; i += 256u) { output[i] = (input[i] / rms) * weight[i]; }\r\n}\r\n";
var add_default = "// Element-wise add: output[i] = a[i] + b[i]\r\n// Used for residual connections.\r\n\r\nstruct Params {\r\n  n: u32,\r\n}\r\n\r\n@group(0) @binding(0) var<storage, read> a: array<f32>;\r\n@group(0) @binding(1) var<storage, read> b: array<f32>;\r\n@group(0) @binding(2) var<storage, read_write> output: array<f32>;\r\n@group(0) @binding(3) var<uniform> params: Params;\r\n\r\n@compute @workgroup_size(256)\r\nfn main(@builtin(global_invocation_id) gid: vec3u) {\r\n  let i = gid.x;\r\n  if (i >= params.n) { return; }\r\n  output[i] = a[i] + b[i];\r\n}\r\n";
function storageReadOnly(binding) {
  return { binding, visibility: GPUShaderStage.COMPUTE, buffer: { type: "read-only-storage" } };
}
function storageReadWrite(binding) {
  return { binding, visibility: GPUShaderStage.COMPUTE, buffer: { type: "storage" } };
}
function uniform(binding) {
  return { binding, visibility: GPUShaderStage.COMPUTE, buffer: { type: "uniform" } };
}
var ComputeEngine = class {
  device;
  shaders;
  buffers;
  constructor(device) {
    this.device = device;
    this.shaders = new ShaderCache(device);
    this.buffers = new BufferPool(device);
  }
  /** Params cache — unique buffer per unique content. Safe because same content = no conflict. */
  paramsMap = /* @__PURE__ */ new Map();
  createParams(label, data) {
    const u32 = new Uint32Array(data);
    let key = label;
    for (let i = 0; i < u32.length; i++) key += "," + u32[i];
    let buf = this.paramsMap.get(key);
    if (!buf) {
      buf = this.device.createBuffer({
        size: Math.ceil(data.byteLength / 4) * 4,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
      });
      this.device.queue.writeBuffer(buf, 0, data);
      this.paramsMap.set(key, buf);
    }
    return buf;
  }
  /** No-op — params are cached permanently (same content = same buffer, always safe). */
  cleanupParams() {
  }
  /** Batched encoder — multiple compute passes, ONE submit. */
  batchEncoder = null;
  beginBatch() {
    this.batchEncoder = this.device.createCommandEncoder({ label: "fwd" });
  }
  endBatch() {
    if (this.batchEncoder) {
      this.device.queue.submit([this.batchEncoder.finish()]);
      this.batchEncoder = null;
    }
  }
  /** Copy buffer — uses batch encoder if active. */
  copyBuffer(src, dst, size) {
    const encoder = this.batchEncoder ?? this.device.createCommandEncoder();
    encoder.copyBufferToBuffer(src, 0, dst, 0, size);
    if (!this.batchEncoder) {
      this.device.queue.submit([encoder.finish()]);
    }
  }
  /** Dispatch — each dispatch is its own compute pass (for proper barriers).
   *  Uses batch encoder if active (single submit), otherwise standalone. */
  dispatch(shaderSrc, label, layout, entries, workgroups) {
    const cached = this.shaders.getPipeline({ shader: shaderSrc, bindGroupLayout: layout, label });
    const bindGroup = this.shaders.createBindGroup(cached, entries, label);
    const encoder = this.batchEncoder ?? this.device.createCommandEncoder({ label });
    const pass = encoder.beginComputePass({ label });
    pass.setPipeline(cached.pipeline);
    pass.setBindGroup(0, bindGroup);
    pass.dispatchWorkgroups(workgroups[0], workgroups[1] ?? 1, workgroups[2] ?? 1);
    pass.end();
    if (!this.batchEncoder) {
      this.device.queue.submit([encoder.finish()]);
    }
  }
  // ── Operations ────────────────────────────────────────────────────────
  /** Embedding lookup: output = weights[tokenId * embDim : (tokenId+1) * embDim] */
  embedding(weights, output, tokenId, embDim) {
    const params = this.createParams("embedding_params", new Uint32Array([tokenId, embDim]).buffer);
    this.dispatch(embedding_default, "embedding", [
      storageReadOnly(0),
      storageReadWrite(1),
      uniform(2)
    ], [
      { binding: 0, resource: { buffer: weights } },
      { binding: 1, resource: { buffer: output } },
      { binding: 2, resource: { buffer: params } }
    ], [Math.ceil(embDim / 256)]);
  }
  /** RMS Normalization */
  rmsNorm(input, weight, output, n, eps) {
    const buf = new ArrayBuffer(8);
    const view = new DataView(buf);
    view.setUint32(0, n, true);
    view.setFloat32(4, eps, true);
    const paramData = new Uint32Array(2);
    paramData[0] = n;
    const epsView = new Float32Array(1);
    epsView[0] = eps;
    paramData[1] = new Uint32Array(epsView.buffer)[0];
    const params = this.createParams("rmsnorm_params", paramData.buffer);
    this.dispatch(rmsnorm_default, "rmsnorm", [
      storageReadOnly(0),
      storageReadOnly(1),
      storageReadWrite(2),
      uniform(3)
    ], [
      { binding: 0, resource: { buffer: input } },
      { binding: 1, resource: { buffer: weight } },
      { binding: 2, resource: { buffer: output } },
      { binding: 3, resource: { buffer: params } }
    ], [1]);
  }
  /** Fused: copy input→residual AND RMSNorm(input, weight)→output. Saves 1 dispatch. */
  copyAndRmsNorm(input, weight, output, residual, n, eps) {
    const paramData = new Uint32Array(2);
    paramData[0] = n;
    const epsView = new Float32Array(1);
    epsView[0] = eps;
    paramData[1] = new Uint32Array(epsView.buffer)[0];
    const params = this.createParams("copy_rmsnorm_params", paramData.buffer);
    this.dispatch(copy_rmsnorm_default, "copy_rmsnorm", [
      storageReadOnly(0),
      storageReadOnly(1),
      storageReadWrite(2),
      storageReadWrite(3),
      uniform(4)
    ], [
      { binding: 0, resource: { buffer: input } },
      { binding: 1, resource: { buffer: weight } },
      { binding: 2, resource: { buffer: output } },
      { binding: 3, resource: { buffer: residual } },
      { binding: 4, resource: { buffer: params } }
    ], [1]);
  }
  /** Matrix-vector multiply for the appropriate quantization type. */
  matmul(weights, input, output, M, K, quantType) {
    const paramData = new Uint32Array([M, K]);
    const params = this.createParams("matmul_params", paramData.buffer);
    let shader;
    switch (quantType) {
      case 0:
        shader = matmul_default;
        break;
      case 2:
        shader = matmul_q4_default;
        break;
      case 8:
        shader = matmul_q8_default;
        break;
      default:
        throw new Error(`Unsupported quantization type for matmul: ${quantType}`);
    }
    this.dispatch(shader, "matmul", [
      storageReadOnly(0),
      storageReadOnly(1),
      storageReadWrite(2),
      uniform(3)
    ], [
      { binding: 0, resource: { buffer: weights } },
      { binding: 1, resource: { buffer: input } },
      { binding: 2, resource: { buffer: output } },
      { binding: 3, resource: { buffer: params } }
    ], M <= 65535 ? [M] : [65535, Math.ceil(M / 65535)]);
  }
  /** Pre-built RoPE cos/sin tables keyed by "theta,headDim,position". */
  ropeTableCache = /* @__PURE__ */ new Map();
  /** Clear cached RoPE tables (call when loading a new model). */
  clearRopeCache() {
    this.ropeTableCache.clear();
  }
  /** RoPE: apply rotary position embeddings using cached cos/sin tables. */
  rope(data, headDim, ropeDim, position, theta, nElements) {
    const cacheKey = `${theta},${headDim},${position}`;
    let table = this.ropeTableCache.get(cacheKey);
    if (!table) {
      const halfDim = headDim / 2;
      const cosData = new Float32Array(halfDim);
      const sinData = new Float32Array(halfDim);
      for (let i = 0; i < halfDim; i++) {
        const dimFrac = i * 2 / headDim;
        const freq = 1 / Math.pow(theta, dimFrac);
        const angle = position * freq;
        cosData[i] = Math.fround(Math.cos(angle));
        sinData[i] = Math.fround(Math.sin(angle));
      }
      table = {
        cos: this.buffers.createBufferWithData(`rope_cos_${cacheKey}`, cosData.buffer),
        sin: this.buffers.createBufferWithData(`rope_sin_${cacheKey}`, sinData.buffer)
      };
      this.ropeTableCache.set(cacheKey, table);
    }
    const paramData = new Uint32Array(2);
    paramData[0] = nElements;
    paramData[1] = headDim;
    const params = this.createParams("rope_params", paramData.buffer);
    this.dispatch(rope_default, "rope", [
      storageReadWrite(0),
      storageReadOnly(1),
      storageReadOnly(2),
      uniform(3)
    ], [
      { binding: 0, resource: { buffer: data } },
      { binding: 1, resource: { buffer: table.cos } },
      { binding: 2, resource: { buffer: table.sin } },
      { binding: 3, resource: { buffer: params } }
    ], [nElements / 2]);
  }
  /** CPU attention — reads GPU buffers, computes on CPU, writes back. */
  async cpuAttention(q, kCache, vCache, output, numHeads, numKvHeads, headDim, seqLen, maxSeqLen) {
    const scale = 1 / Math.sqrt(headDim);
    const headsPerKvGroup = numHeads / numKvHeads;
    const qData = await this.readBuffer(q, numHeads * headDim * 4);
    const kData = await this.readBuffer(kCache, numKvHeads * maxSeqLen * headDim * 4);
    const vData = await this.readBuffer(vCache, numKvHeads * maxSeqLen * headDim * 4);
    const outData = new Float32Array(numHeads * headDim);
    for (let h = 0; h < numHeads; h++) {
      const kvHead = Math.floor(h / headsPerKvGroup);
      const qOff = h * headDim;
      const scores = new Float32Array(seqLen);
      for (let pos = 0; pos < seqLen; pos++) {
        const kOff = kvHead * maxSeqLen * headDim + pos * headDim;
        let dot = 0;
        for (let d = 0; d < headDim; d++) dot += qData[qOff + d] * kData[kOff + d];
        scores[pos] = dot * scale;
      }
      let maxS = -Infinity;
      for (let i = 0; i < seqLen; i++) maxS = Math.max(maxS, scores[i]);
      let sumE = 0;
      for (let i = 0; i < seqLen; i++) {
        scores[i] = Math.exp(scores[i] - maxS);
        sumE += scores[i];
      }
      for (let i = 0; i < seqLen; i++) scores[i] /= sumE;
      for (let d = 0; d < headDim; d++) {
        let acc = 0;
        for (let pos = 0; pos < seqLen; pos++) {
          const vOff = kvHead * maxSeqLen * headDim + pos * headDim;
          acc += scores[pos] * vData[vOff + d];
        }
        outData[qOff + d] = acc;
      }
    }
    this.device.queue.writeBuffer(output, 0, outData);
  }
  /** GPU attention — single-thread per head. */
  attention(q, kCache, vCache, output, numHeads, numKvHeads, headDim, seqLen, maxSeqLen) {
    const scale = 1 / Math.sqrt(headDim);
    const paramData = new Uint32Array(6);
    paramData[0] = numHeads;
    paramData[1] = numKvHeads;
    paramData[2] = headDim;
    paramData[3] = seqLen;
    paramData[4] = maxSeqLen;
    const scaleView = new Float32Array(1);
    scaleView[0] = scale;
    paramData[5] = new Uint32Array(scaleView.buffer)[0];
    const params = this.createParams("attention_params", paramData.buffer);
    this.dispatch(attention_default, "attention", [
      storageReadOnly(0),
      storageReadOnly(1),
      storageReadOnly(2),
      storageReadWrite(3),
      uniform(4)
    ], [
      { binding: 0, resource: { buffer: q } },
      { binding: 1, resource: { buffer: kCache } },
      { binding: 2, resource: { buffer: vCache } },
      { binding: 3, resource: { buffer: output } },
      { binding: 4, resource: { buffer: params } }
    ], [numHeads]);
  }
  /** Softmax over n elements. */
  softmax(input, output, n) {
    const params = this.createParams("softmax_params", new Uint32Array([n]).buffer);
    this.dispatch(softmax_default, "softmax", [
      storageReadOnly(0),
      storageReadWrite(1),
      uniform(2)
    ], [
      { binding: 0, resource: { buffer: input } },
      { binding: 1, resource: { buffer: output } },
      { binding: 2, resource: { buffer: params } }
    ], [1]);
  }
  /** SiLU activation: output = x * sigmoid(x) */
  silu(input, output, n) {
    const params = this.createParams("silu_params", new Uint32Array([n]).buffer);
    this.dispatch(silu_default, "silu", [
      storageReadOnly(0),
      storageReadWrite(1),
      uniform(2)
    ], [
      { binding: 0, resource: { buffer: input } },
      { binding: 1, resource: { buffer: output } },
      { binding: 2, resource: { buffer: params } }
    ], [Math.ceil(n / 256)]);
  }
  /** Fused SiLU-gate multiply: output = silu(gate) * up */
  siluMul(gate, up, output, n) {
    const params = this.createParams("silu_mul_params", new Uint32Array([n]).buffer);
    this.dispatch(silu_mul_default, "silu_mul", [
      storageReadOnly(0),
      storageReadOnly(1),
      storageReadWrite(2),
      uniform(3)
    ], [
      { binding: 0, resource: { buffer: gate } },
      { binding: 1, resource: { buffer: up } },
      { binding: 2, resource: { buffer: output } },
      { binding: 3, resource: { buffer: params } }
    ], [Math.ceil(n / 256)]);
  }
  /** Element-wise add: output = a + b */
  add(a, b, output, n) {
    const params = this.createParams("add_params", new Uint32Array([n]).buffer);
    this.dispatch(add_default, "add", [
      storageReadOnly(0),
      storageReadOnly(1),
      storageReadWrite(2),
      uniform(3)
    ], [
      { binding: 0, resource: { buffer: a } },
      { binding: 1, resource: { buffer: b } },
      { binding: 2, resource: { buffer: output } },
      { binding: 3, resource: { buffer: params } }
    ], [Math.ceil(n / 256)]);
  }
  /** Reusable readback buffer — avoids allocation per readLogits call. */
  readbackBuf = null;
  readbackSize = 0;
  /** Read buffer data back to CPU. */
  async readBuffer(buffer, size) {
    if (!this.readbackBuf || this.readbackSize < size) {
      this.readbackBuf?.destroy();
      this.readbackSize = size;
      this.readbackBuf = this.device.createBuffer({
        label: "readback",
        size,
        usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST
      });
    }
    const encoder = this.device.createCommandEncoder();
    encoder.copyBufferToBuffer(buffer, 0, this.readbackBuf, 0, size);
    this.device.queue.submit([encoder.finish()]);
    await this.readbackBuf.mapAsync(GPUMapMode.READ);
    const data = new Float32Array(this.readbackBuf.getMappedRange().slice(0));
    this.readbackBuf.unmap();
    return data;
  }
};
var GGUF_MAGIC = 1179993927;
var BinaryReader = class {
  view;
  offset;
  constructor(buffer, offset = 0) {
    this.view = new DataView(buffer);
    this.offset = offset;
  }
  get position() {
    return this.offset;
  }
  readUint8() {
    const v = this.view.getUint8(this.offset);
    this.offset += 1;
    return v;
  }
  readInt8() {
    const v = this.view.getInt8(this.offset);
    this.offset += 1;
    return v;
  }
  readUint16() {
    const v = this.view.getUint16(this.offset, true);
    this.offset += 2;
    return v;
  }
  readInt16() {
    const v = this.view.getInt16(this.offset, true);
    this.offset += 2;
    return v;
  }
  readUint32() {
    const v = this.view.getUint32(this.offset, true);
    this.offset += 4;
    return v;
  }
  readInt32() {
    const v = this.view.getInt32(this.offset, true);
    this.offset += 4;
    return v;
  }
  readFloat32() {
    const v = this.view.getFloat32(this.offset, true);
    this.offset += 4;
    return v;
  }
  readFloat64() {
    const v = this.view.getFloat64(this.offset, true);
    this.offset += 8;
    return v;
  }
  readUint64() {
    const lo = this.view.getUint32(this.offset, true);
    const hi = this.view.getUint32(this.offset + 4, true);
    this.offset += 8;
    return hi * 4294967296 + lo;
  }
  readInt64() {
    const lo = this.view.getUint32(this.offset, true);
    const hi = this.view.getInt32(this.offset + 4, true);
    this.offset += 8;
    return hi * 4294967296 + lo;
  }
  readString() {
    const length = this.readUint64();
    if (this.offset + length > this.view.byteLength) {
      throw new RangeError(
        `String read out of bounds: offset=${this.offset} length=${length} bufferSize=${this.view.byteLength}`
      );
    }
    const bytes = new Uint8Array(this.view.buffer, this.offset, length);
    this.offset += length;
    return new TextDecoder().decode(bytes);
  }
  readBytes(count) {
    const bytes = new Uint8Array(this.view.buffer, this.offset, count);
    this.offset += count;
    return bytes;
  }
};
function readMetadataValue(reader, type) {
  switch (type) {
    case 0:
      return reader.readUint8();
    case 1:
      return reader.readInt8();
    case 2:
      return reader.readUint16();
    case 3:
      return reader.readInt16();
    case 4:
      return reader.readUint32();
    case 5:
      return reader.readInt32();
    case 6:
      return reader.readFloat32();
    case 7:
      return reader.readUint8() !== 0;
    case 8:
      return reader.readString();
    case 10:
      return reader.readUint64();
    case 11:
      return reader.readInt64();
    case 12:
      return reader.readFloat64();
    case 9:
      return readArray(reader);
    default:
      throw new Error(`Unknown metadata type: ${type}`);
  }
}
function readArray(reader) {
  const elementType = reader.readUint32();
  const count = reader.readUint64();
  const arr = new Array(count);
  for (let i = 0; i < count; i++) {
    arr[i] = readMetadataValue(reader, elementType);
  }
  return arr;
}
function parseGguf(buffer) {
  const reader = new BinaryReader(buffer);
  const magic = reader.readUint32();
  if (magic !== GGUF_MAGIC) {
    throw new Error(`Invalid GGUF magic: 0x${magic.toString(16)}. Expected 0x${GGUF_MAGIC.toString(16)}.`);
  }
  const version = reader.readUint32();
  if (version < 2 || version > 3) {
    throw new Error(`Unsupported GGUF version: ${version}. Only v2 and v3 are supported.`);
  }
  const tensorCount = reader.readUint64();
  const metadataKvCount = reader.readUint64();
  const header = { magic, version, tensorCount, metadataKvCount };
  const metadataMap = /* @__PURE__ */ new Map();
  for (let i = 0; i < metadataKvCount; i++) {
    const key = reader.readString();
    const type = reader.readUint32();
    const value = readMetadataValue(reader, type);
    metadataMap.set(key, value);
  }
  const alignment = metadataMap.get("general.alignment") ?? 32;
  const tensors = new Array(tensorCount);
  for (let i = 0; i < tensorCount; i++) {
    const name = reader.readString();
    const nDimensions = reader.readUint32();
    const dimensions = new Array(nDimensions);
    for (let d = 0; d < nDimensions; d++) {
      dimensions[d] = reader.readUint64();
    }
    const type = reader.readUint32();
    const offset = reader.readUint64();
    let elementCount = 1;
    for (let d = 0; d < nDimensions; d++) elementCount *= dimensions[d];
    tensors[i] = {
      name,
      nDimensions,
      dimensions,
      type,
      offset,
      elementCount,
      byteSize: tensorByteSize(type, elementCount)
    };
  }
  const currentPos = reader.position;
  const remainder = currentPos % alignment;
  const tensorDataOffset = remainder === 0 ? currentPos : currentPos + (alignment - remainder);
  const architecture = metadataMap.get("general.architecture") ?? "unknown";
  const prefix = architecture;
  return {
    header,
    architecture,
    blockCount: metadataMap.get(`${prefix}.block_count`) ?? 0,
    embeddingLength: metadataMap.get(`${prefix}.embedding_length`) ?? 0,
    headCount: metadataMap.get(`${prefix}.attention.head_count`) ?? 0,
    headCountKv: metadataMap.get(`${prefix}.attention.head_count_kv`) ?? 0,
    contextLength: metadataMap.get(`${prefix}.context_length`) ?? 0,
    feedForwardLength: metadataMap.get(`${prefix}.feed_forward_length`) ?? 0,
    ropeFreqBase: metadataMap.get(`${prefix}.rope.freq_base`) ?? 1e4,
    rmsNormEps: metadataMap.get(`${prefix}.attention.layer_norm_rms_epsilon`) ?? 1e-5,
    vocabSize: (metadataMap.get("tokenizer.ggml.tokens") ?? []).length,
    metadata: metadataMap,
    tensors,
    tensorDataOffset,
    alignment
  };
}
async function fetchGgufHeader(url, maxBytes = 4 * 1024 * 1024) {
  const response = await fetch(url, {
    headers: { Range: `bytes=0-${maxBytes - 1}` }
  });
  if (!response.ok && response.status !== 206) {
    throw new Error(`Failed to fetch GGUF header: ${response.status} ${response.statusText}`);
  }
  const buffer = await response.arrayBuffer();
  try {
    return parseGguf(buffer);
  } catch (e) {
    if (maxBytes < 64 * 1024 * 1024) {
      return fetchGgufHeader(url, maxBytes * 2);
    }
    throw e;
  }
}
var CACHE_NAME = "llogos-webgpu-models";
async function downloadFile(url, onProgress) {
  let cache = null;
  try {
    if (typeof caches !== "undefined") {
      cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(url);
      if (cached) {
        const total = parseInt(cached.headers.get("content-length") ?? "0", 10);
        const reader2 = cached.body?.getReader();
        if (reader2 && total > 0) {
          onProgress?.({ bytesDownloaded: 0, totalBytes: total });
          const chunks2 = [];
          let loaded = 0;
          while (true) {
            const { done, value } = await reader2.read();
            if (done) break;
            chunks2.push(value);
            loaded += value.byteLength;
            onProgress?.({ bytesDownloaded: loaded, totalBytes: total });
          }
          const result2 = new Uint8Array(loaded);
          let off = 0;
          for (const c of chunks2) {
            result2.set(c, off);
            off += c.byteLength;
          }
          return result2.buffer;
        }
        const buf = await cached.arrayBuffer();
        onProgress?.({ bytesDownloaded: buf.byteLength, totalBytes: buf.byteLength });
        return buf;
      }
    }
  } catch {
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Download failed: ${response.status} ${response.statusText}`);
  }
  const contentLength = parseInt(response.headers.get("content-length") ?? "0", 10);
  const reader = response.body?.getReader();
  if (!reader) {
    const buf = await response.arrayBuffer();
    if (cache) {
      try {
        await cache.put(url, new Response(buf.slice(0)));
      } catch {
      }
    }
    return buf;
  }
  const chunks = [];
  let downloaded = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    downloaded += value.byteLength;
    onProgress?.({ bytesDownloaded: downloaded, totalBytes: contentLength || downloaded });
  }
  const result = new Uint8Array(downloaded);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.byteLength;
  }
  if (cache) {
    try {
      await cache.put(url, new Response(result.buffer.slice(0), {
        headers: { "content-length": String(downloaded) }
      }));
    } catch {
    }
  }
  return result.buffer;
}
function extractTensorData(fileBuffer, absoluteOffset, byteSize) {
  return fileBuffer.slice(absoluteOffset, absoluteOffset + byteSize);
}
var PRE_TOKENIZE_RE = /'(?:[sdmt]|ll|ve|re)|[^\r\n\p{L}\p{N}]?\p{L}+|\p{N}{1,3}| ?[^\s\p{L}\p{N}]+[\r\n]*|\s*[\r\n]+|\s+(?!\S)|\s+/gu;
var BpeTokenizer = class {
  tokens;
  tokenToId;
  mergeRank;
  useByteEncoding;
  specialTokens;
  // sorted longest-first for greedy matching
  bosTokenId;
  eosTokenId;
  padTokenId;
  constructor(tokens, merges, bosTokenId, eosTokenId, padTokenId, useByteEncoding) {
    this.tokens = tokens;
    this.bosTokenId = bosTokenId;
    this.eosTokenId = eosTokenId;
    this.padTokenId = padTokenId;
    this.useByteEncoding = useByteEncoding;
    this.tokenToId = /* @__PURE__ */ new Map();
    for (let i = 0; i < tokens.length; i++) {
      if (!this.tokenToId.has(tokens[i])) {
        this.tokenToId.set(tokens[i], i);
      }
    }
    this.mergeRank = /* @__PURE__ */ new Map();
    for (let i = 0; i < merges.length; i++) {
      this.mergeRank.set(merges[i], i);
    }
    this.specialTokens = tokens.filter((t) => t.startsWith("<") && t.endsWith(">") && t.length > 2).sort((a, b) => b.length - a.length);
  }
  get vocabSize() {
    return this.tokens.length;
  }
  /** Get token ID for a string, or -1 if not found. */
  getTokenId(token) {
    return this.tokenToId.get(token) ?? -1;
  }
  /** Encode text to token IDs, handling special tokens. */
  encode(text) {
    if (!text) return [];
    const segments = this.splitOnSpecialTokens(text);
    const result = [];
    for (const seg of segments) {
      if (seg.isSpecial) {
        const id = this.tokenToId.get(seg.text);
        if (id !== void 0) result.push(id);
        else {
          const fwToken = seg.text.replace(/\|/g, "\uFF5C");
          const fwId = this.tokenToId.get(fwToken);
          if (fwId !== void 0) result.push(fwId);
        }
      } else {
        result.push(...this.encodeBpe(seg.text));
      }
    }
    return result;
  }
  /** BPE-encode a text segment (no special tokens). */
  encodeBpe(text) {
    if (!text) return [];
    const result = [];
    const matches = text.matchAll(PRE_TOKENIZE_RE);
    for (const match of matches) {
      const chunk = match[0];
      const symbols = this.useByteEncoding ? byteEncodeChunk(chunk) : this.directEncodeChunk(chunk);
      if (symbols.length === 0) continue;
      this.applyMerges(symbols);
      for (const symbol2 of symbols) {
        const id = this.tokenToId.get(symbol2);
        if (id !== void 0) result.push(id);
      }
    }
    return result;
  }
  /** Split text into segments of special tokens and regular text. */
  splitOnSpecialTokens(text) {
    const segments = [];
    let remaining = text;
    while (remaining.length > 0) {
      let bestIdx = remaining.length;
      let bestToken = "";
      for (const st of this.specialTokens) {
        const idx = remaining.indexOf(st);
        if (idx >= 0 && idx < bestIdx) {
          bestIdx = idx;
          bestToken = st;
        }
      }
      if (bestToken) {
        if (bestIdx > 0) {
          segments.push({ text: remaining.slice(0, bestIdx), isSpecial: false });
        }
        segments.push({ text: bestToken, isSpecial: true });
        remaining = remaining.slice(bestIdx + bestToken.length);
      } else {
        segments.push({ text: remaining, isSpecial: false });
        break;
      }
    }
    return segments;
  }
  /** Decode token IDs back to text. */
  decode(tokenIds) {
    const parts = [];
    for (const id of tokenIds) {
      if (id === this.bosTokenId || id === this.eosTokenId || id === this.padTokenId) continue;
      let token = this.tokens[id];
      if (!token) continue;
      if (token.length === 6 && token.startsWith("<0x") && token.endsWith(">")) {
        const byte = parseInt(token.slice(3, 5), 16);
        if (!isNaN(byte)) {
          parts.push(String.fromCharCode(byte));
          continue;
        }
      }
      if (token.includes("\uFF5C")) {
        token = token.replaceAll("\uFF5C", "|");
      }
      parts.push(token);
    }
    let text = parts.join("");
    if (this.useByteEncoding) {
      return byteDecodeString(text);
    }
    return text.replaceAll("\u2581", " ");
  }
  /** Check if a token ID is an end-of-sequence token. */
  isEos(tokenId) {
    if (tokenId === this.eosTokenId) return true;
    const token = this.tokens[tokenId];
    return token === "<|endoftext|>" || token === "<|im_end|>" || token === "<\uFF5Cend\u2581of\u2581text\uFF5C>" || token === "<\uFF5Cim_end\uFF5C>" || token === "<|eot_id|>" || token === "<|end_of_text|>";
  }
  // Direct encoding for SentencePiece/Llama style vocabs
  directEncodeChunk(chunk) {
    const symbols = [];
    const encoder = new TextEncoder();
    const bytes = encoder.encode(chunk);
    let i = 0;
    while (i < bytes.length) {
      const charLen = utf8CharLength(bytes[i]);
      if (i + charLen <= bytes.length) {
        const ch = new TextDecoder().decode(bytes.slice(i, i + charLen));
        if (this.tokenToId.has(ch)) {
          symbols.push(ch);
          i += charLen;
          continue;
        }
      }
      symbols.push(`<0x${bytes[i].toString(16).toUpperCase().padStart(2, "0")}>`);
      i++;
    }
    return symbols;
  }
  // BPE merge algorithm
  applyMerges(symbols) {
    while (symbols.length > 1) {
      let bestRank = Infinity;
      let bestIdx = -1;
      for (let i = 0; i < symbols.length - 1; i++) {
        const key = `${symbols[i]} ${symbols[i + 1]}`;
        const rank = this.mergeRank.get(key);
        if (rank !== void 0 && rank < bestRank) {
          bestRank = rank;
          bestIdx = i;
        }
      }
      if (bestIdx < 0) break;
      symbols[bestIdx] = symbols[bestIdx] + symbols[bestIdx + 1];
      symbols.splice(bestIdx + 1, 1);
    }
  }
};
var BYTE_TO_UNICODE = buildByteToUnicode();
var UNICODE_TO_BYTE = buildUnicodeToByte();
function buildByteToUnicode() {
  const table = new Array(256);
  let n = 256;
  for (let i = 0; i < 256; i++) {
    if (i >= 33 && i <= 126 || i >= 161 && i <= 172 || i >= 174 && i <= 255) {
      table[i] = String.fromCharCode(i);
    } else {
      table[i] = String.fromCharCode(n);
      n++;
    }
  }
  return table;
}
function buildUnicodeToByte() {
  const map = /* @__PURE__ */ new Map();
  for (let i = 0; i < 256; i++) {
    map.set(BYTE_TO_UNICODE[i], i);
  }
  return map;
}
function byteEncodeChunk(chunk) {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(chunk);
  return Array.from(bytes, (b) => BYTE_TO_UNICODE[b]);
}
function byteDecodeString(text) {
  const bytes = [];
  for (const ch of text) {
    const b = UNICODE_TO_BYTE.get(ch);
    if (b !== void 0) {
      bytes.push(b);
    } else {
      const encoder = new TextEncoder();
      bytes.push(...encoder.encode(ch));
    }
  }
  return new TextDecoder().decode(new Uint8Array(bytes));
}
function utf8CharLength(firstByte) {
  if (firstByte < 128) return 1;
  if (firstByte < 192) return 1;
  if (firstByte < 224) return 2;
  if (firstByte < 240) return 3;
  return 4;
}
function tokenizerFromGguf(metadata) {
  const tokens = metadata.get("tokenizer.ggml.tokens");
  const merges = metadata.get("tokenizer.ggml.merges");
  if (!tokens || !merges) throw new Error("Missing tokenizer metadata in GGUF");
  const bosTokenId = metadata.get("tokenizer.ggml.bos_token_id") ?? -1;
  const eosTokenId = metadata.get("tokenizer.ggml.eos_token_id") ?? -1;
  const padTokenId = metadata.get("tokenizer.ggml.padding_token_id") ?? -1;
  const model = metadata.get("tokenizer.ggml.model");
  const useByteEncoding = model === "gpt2";
  return new BpeTokenizer(tokens, merges, bosTokenId, eosTokenId, padTokenId, useByteEncoding);
}
function tokenize(template) {
  const tokens = [];
  let i = 0;
  while (i < template.length) {
    if (template.startsWith("{%", i)) {
      const end = template.indexOf("%}", i + 2);
      if (end < 0) break;
      tokens.push({ type: "tag", value: template.substring(i + 2, end).trim() });
      i = end + 2;
    } else if (template.startsWith("{{", i)) {
      const end = template.indexOf("}}", i + 2);
      if (end < 0) break;
      tokens.push({ type: "expr", value: template.substring(i + 2, end).trim() });
      i = end + 2;
    } else if (template.startsWith("{#", i)) {
      const end = template.indexOf("#}", i + 2);
      i = end < 0 ? template.length : end + 2;
    } else {
      let next = template.length;
      for (const marker of ["{%", "{{", "{#"]) {
        const pos = template.indexOf(marker, i);
        if (pos >= 0 && pos < next) next = pos;
      }
      tokens.push({ type: "text", value: template.substring(i, next) });
      i = next;
    }
  }
  return tokens;
}
function resolve(expr, ctx) {
  expr = expr.trim();
  if (expr.startsWith("'") && expr.endsWith("'") || expr.startsWith('"') && expr.endsWith('"')) {
    return expr.slice(1, -1);
  }
  if (expr === "true" || expr === "True") return true;
  if (expr === "false" || expr === "False") return false;
  if (expr === "none" || expr === "None") return void 0;
  if (/^\d+$/.test(expr)) return parseInt(expr, 10);
  const parts = expr.split(".");
  let val = ctx;
  for (const part of parts) {
    if (val == null || typeof val !== "object") return void 0;
    val = val[part];
  }
  return val;
}
function evaluate(expr, ctx) {
  expr = expr.trim();
  if (expr.startsWith("not ")) {
    return !truthy(evaluate(expr.substring(4), ctx));
  }
  for (const op of [" or ", " and "]) {
    const idx = expr.lastIndexOf(op);
    if (idx > 0) {
      const left = evaluate(expr.substring(0, idx), ctx);
      const right = evaluate(expr.substring(idx + op.length), ctx);
      return op === " or " ? truthy(left) ? left : right : truthy(left) ? right : left;
    }
  }
  if (expr.endsWith(" is defined")) {
    const varName = expr.slice(0, -" is defined".length).trim();
    return resolve(varName, ctx) !== void 0;
  }
  if (expr.endsWith(" is not defined")) {
    const varName = expr.slice(0, -" is not defined".length).trim();
    return resolve(varName, ctx) === void 0;
  }
  for (const op of ["!=", "=="]) {
    const idx = expr.indexOf(op);
    if (idx > 0) {
      const left = evaluate(expr.substring(0, idx), ctx);
      const right = evaluate(expr.substring(idx + op.length), ctx);
      return op === "==" ? left === right : left !== right;
    }
  }
  if (expr.includes("|")) {
    const [base, ...filters] = expr.split("|");
    let val = evaluate(base, ctx);
    for (const f of filters) {
      const filter = f.trim();
      if (filter === "trim" && typeof val === "string") val = val.trim();
    }
    return val;
  }
  const bracketMatch = expr.match(/^(.+)\[(\d+)\]$/);
  if (bracketMatch) {
    const arr = resolve(bracketMatch[1], ctx);
    if (Array.isArray(arr)) return arr[parseInt(bracketMatch[2], 10)];
    return void 0;
  }
  if (expr.endsWith(".length") || expr.endsWith("|length")) {
    const base = expr.replace(/[.|]length$/, "");
    const val = resolve(base, ctx);
    if (Array.isArray(val)) return val.length;
    if (typeof val === "string") return val.length;
    return 0;
  }
  return resolve(expr, ctx);
}
function truthy(val) {
  if (val === void 0 || val === null || val === false || val === 0 || val === "") return false;
  if (Array.isArray(val) && val.length === 0) return false;
  return true;
}
function toString(val) {
  if (val === void 0 || val === null) return "";
  return String(val);
}
function execute(tokens, ctx) {
  let output = "";
  let i = 0;
  while (i < tokens.length) {
    const tok = tokens[i];
    if (tok.type === "text") {
      output += tok.value;
      i++;
    } else if (tok.type === "expr") {
      output += toString(evaluate(tok.value, ctx));
      i++;
    } else if (tok.type === "tag") {
      const tag = tok.value;
      if (tag.startsWith("for ")) {
        const forMatch = tag.match(/^for\s+(\w+)\s+in\s+(.+)$/);
        if (!forMatch) {
          i++;
          continue;
        }
        const [, varName, iterExpr] = forMatch;
        const iterable = evaluate(iterExpr, ctx);
        const items = Array.isArray(iterable) ? iterable : [];
        const body = [];
        let depth = 1;
        i++;
        while (i < tokens.length && depth > 0) {
          if (tokens[i].type === "tag") {
            if (tokens[i].value.startsWith("for ")) depth++;
            else if (tokens[i].value === "endfor") {
              depth--;
              if (depth === 0) {
                i++;
                break;
              }
            }
          }
          body.push(tokens[i]);
          i++;
        }
        for (let idx = 0; idx < items.length; idx++) {
          const loopCtx = {
            ...ctx,
            [varName]: items[idx],
            loop: {
              index0: idx,
              index: idx + 1,
              first: idx === 0,
              last: idx === items.length - 1,
              length: items.length
            }
          };
          output += execute(body, loopCtx);
        }
      } else if (tag.startsWith("if ")) {
        const branches = [];
        let currentCond = tag.substring(3).trim();
        let currentBody = [];
        let depth = 1;
        i++;
        while (i < tokens.length && depth > 0) {
          if (tokens[i].type === "tag") {
            const inner = tokens[i].value;
            if (inner.startsWith("if ")) {
              depth++;
              currentBody.push(tokens[i]);
            } else if (inner === "endif") {
              depth--;
              if (depth === 0) {
                branches.push({ cond: currentCond, body: currentBody });
                i++;
                break;
              }
              currentBody.push(tokens[i]);
            } else if (depth === 1 && inner.startsWith("elif ")) {
              branches.push({ cond: currentCond, body: currentBody });
              currentCond = inner.substring(5).trim();
              currentBody = [];
            } else if (depth === 1 && inner === "else") {
              branches.push({ cond: currentCond, body: currentBody });
              currentCond = null;
              currentBody = [];
            } else {
              currentBody.push(tokens[i]);
            }
          } else {
            currentBody.push(tokens[i]);
          }
          i++;
        }
        for (const branch of branches) {
          if (branch.cond === null || truthy(evaluate(branch.cond, ctx))) {
            output += execute(branch.body, ctx);
            break;
          }
        }
      } else if (tag.startsWith("set ")) {
        const setMatch = tag.match(/^set\s+(\w+)\s*=\s*(.+)$/);
        if (setMatch) {
          ctx[setMatch[1]] = evaluate(setMatch[2], ctx);
        }
        i++;
      } else {
        i++;
      }
    } else {
      i++;
    }
  }
  return output;
}
function applyTemplate(template, messages, options) {
  const ctx = {
    messages,
    bos_token: options?.bos_token ?? "",
    eos_token: options?.eos_token ?? "",
    add_generation_prompt: options?.add_generation_prompt ?? true
  };
  const tokens = tokenize(template);
  return execute(tokens, ctx);
}
var KvCache = class {
  device;
  numKvHeads;
  headDim;
  maxSeqLen;
  _seqLen = 0;
  kBuffer;
  vBuffer;
  constructor(device, buffers, numKvHeads, headDim, maxSeqLen, label) {
    this.device = device;
    this.numKvHeads = numKvHeads;
    this.headDim = headDim;
    this.maxSeqLen = maxSeqLen;
    const size = numKvHeads * maxSeqLen * headDim * 4;
    this.kBuffer = buffers.createBuffer(`${label}_k`, size);
    this.vBuffer = buffers.createBuffer(`${label}_v`, size);
  }
  get seqLen() {
    return this._seqLen;
  }
  /**
   * Write K and V vectors for the current position.
   * k, v: [numKvHeads * headDim] float32
   */
  write(k, v, kSize, vSize) {
    const offset = this._seqLen * this.headDim * 4;
    const encoder = this.device.createCommandEncoder();
    for (let h = 0; h < this.numKvHeads; h++) {
      const srcOffset = h * this.headDim * 4;
      const dstOffset = (h * this.maxSeqLen * this.headDim + this._seqLen * this.headDim) * 4;
      encoder.copyBufferToBuffer(k, srcOffset, this.kBuffer, dstOffset, this.headDim * 4);
      encoder.copyBufferToBuffer(v, srcOffset, this.vBuffer, dstOffset, this.headDim * 4);
    }
    this.device.queue.submit([encoder.finish()]);
    this._seqLen++;
  }
  /** Reset cache for new sequence. */
  reset() {
    this._seqLen = 0;
  }
};
function dequantizeToF32(buffer, type, elementCount) {
  const result = new Float32Array(elementCount);
  const bytes = new Uint8Array(buffer);
  const view = new DataView(buffer);
  if (type === 1) {
    for (let i = 0; i < elementCount; i++) {
      result[i] = f16ToF32(view.getUint16(i * 2, true));
    }
    return result;
  }
  if (type === 8) {
    const blockCount = Math.ceil(elementCount / 32);
    for (let b = 0; b < blockCount; b++) {
      const blockOffset = b * 34;
      const scale = f16ToF32(view.getUint16(blockOffset, true));
      for (let q = 0; q < 32 && b * 32 + q < elementCount; q++) {
        const val = view.getInt8(blockOffset + 2 + q);
        result[b * 32 + q] = scale * val;
      }
    }
    return result;
  }
  if (type === 2) {
    const blockCount = Math.ceil(elementCount / 32);
    for (let b = 0; b < blockCount; b++) {
      const blockOffset = b * 18;
      const scale = f16ToF32(view.getUint16(blockOffset, true));
      for (let j = 0; j < 16; j++) {
        const byteVal = bytes[blockOffset + 2 + j];
        const lo = (byteVal & 15) - 8;
        const hi = (byteVal >> 4 & 15) - 8;
        const idx = b * 32;
        if (idx + j < elementCount) result[idx + j] = scale * lo;
        if (idx + j + 16 < elementCount) result[idx + j + 16] = scale * hi;
      }
    }
    return result;
  }
  if (type === 14) {
    const QK = 256;
    const blockCount = Math.ceil(elementCount / QK);
    for (let b = 0; b < blockCount; b++) {
      const bo = b * 210;
      const qlOff = bo;
      const qhOff = bo + 128;
      const scOff = bo + 192;
      const dOff = bo + 208;
      const d = f16ToF32(view.getUint16(dOff, true));
      const outBase = b * QK;
      for (let n = 0; n < QK; n += 128) {
        for (let l = 0; l < 32; l++) {
          const is_ = n / 16;
          const qlIdx0 = qlOff + n / 2 + l;
          const qlIdx1 = qlOff + n / 2 + l + 32;
          const qhIdx = qhOff + n / 4 + l;
          const qhByte = bytes[qhIdx];
          const q1 = (bytes[qlIdx0] & 15 | (qhByte >> 0 & 3) << 4) - 32;
          const q2 = (bytes[qlIdx1] & 15 | (qhByte >> 2 & 3) << 4) - 32;
          const q3 = (bytes[qlIdx0] >> 4 | (qhByte >> 4 & 3) << 4) - 32;
          const q4 = (bytes[qlIdx1] >> 4 | (qhByte >> 6 & 3) << 4) - 32;
          const sc0 = view.getInt8(scOff + is_ + 0);
          const sc2 = view.getInt8(scOff + is_ + 2);
          const sc4 = view.getInt8(scOff + is_ + 4);
          const sc6 = view.getInt8(scOff + is_ + 6);
          const oi = outBase + n + l;
          if (oi < elementCount) result[oi] = d * sc0 * q1;
          if (oi + 32 < elementCount) result[oi + 32] = d * sc2 * q2;
          if (oi + 64 < elementCount) result[oi + 64] = d * sc4 * q3;
          if (oi + 96 < elementCount) result[oi + 96] = d * sc6 * q4;
        }
      }
    }
    return result;
  }
  if (type === 12) {
    const QK = 256;
    const blockCount = Math.ceil(elementCount / QK);
    for (let b = 0; b < blockCount; b++) {
      const bo = b * 144;
      const d = f16ToF32(view.getUint16(bo, true));
      const dmin = f16ToF32(view.getUint16(bo + 2, true));
      const scalesOff = bo + 4;
      const minsOff = bo + 16;
      const qsOff = bo + 16;
      const outBase = b * QK;
      for (let j = 0; j < 128 && outBase + j * 2 < elementCount; j++) {
        const qByte = bytes[bo + 16 + j];
        const lo = qByte & 15;
        const hi = qByte >> 4;
        if (outBase + j < elementCount) result[outBase + j] = d * (lo - 8);
        if (outBase + j + 128 < elementCount) result[outBase + j + 128] = d * (hi - 8);
      }
    }
    return result;
  }
  if (type === 3) {
    const blockCount = Math.ceil(elementCount / 32);
    for (let b = 0; b < blockCount; b++) {
      const bo = b * 20;
      const delta = f16ToF32(view.getUint16(bo, true));
      const min = f16ToF32(view.getUint16(bo + 2, true));
      for (let j = 0; j < 16; j++) {
        const byteVal = bytes[bo + 4 + j];
        const lo = byteVal & 15;
        const hi = byteVal >> 4 & 15;
        const idx = b * 32;
        if (idx + j < elementCount) result[idx + j] = delta * lo + min;
        if (idx + j + 16 < elementCount) result[idx + j + 16] = delta * hi + min;
      }
    }
    return result;
  }
  if (type === 6) {
    const blockCount = Math.ceil(elementCount / 32);
    for (let b = 0; b < blockCount; b++) {
      const bo = b * 22;
      const scale = f16ToF32(view.getUint16(bo, true));
      const highBits = view.getUint32(bo + 2, true);
      for (let j = 0; j < 16; j++) {
        const byteVal = bytes[bo + 6 + j];
        const lo4 = byteVal & 15;
        const hi4 = byteVal >> 4 & 15;
        const loBit = highBits >> j & 1;
        const hiBit = highBits >> j + 16 & 1;
        const q5lo = lo4 | loBit << 4;
        const q5hi = hi4 | hiBit << 4;
        const idx = b * 32;
        if (idx + j < elementCount) result[idx + j] = scale * (q5lo - 16);
        if (idx + j + 16 < elementCount) result[idx + j + 16] = scale * (q5hi - 16);
      }
    }
    return result;
  }
  if (type === 7) {
    const blockCount = Math.ceil(elementCount / 32);
    for (let b = 0; b < blockCount; b++) {
      const bo = b * 24;
      const delta = f16ToF32(view.getUint16(bo, true));
      const min = f16ToF32(view.getUint16(bo + 2, true));
      const highBits = view.getUint32(bo + 4, true);
      for (let j = 0; j < 16; j++) {
        const byteVal = bytes[bo + 8 + j];
        const lo4 = byteVal & 15;
        const hi4 = byteVal >> 4 & 15;
        const loBit = highBits >> j & 1;
        const hiBit = highBits >> j + 16 & 1;
        const q5lo = lo4 | loBit << 4;
        const q5hi = hi4 | hiBit << 4;
        const idx = b * 32;
        if (idx + j < elementCount) result[idx + j] = delta * q5lo + min;
        if (idx + j + 16 < elementCount) result[idx + j + 16] = delta * q5hi + min;
      }
    }
    return result;
  }
  throw new Error(`Unsupported dequant type: ${GgmlType[type]} (${type})`);
}
function f16ToF32(bits) {
  const sign = bits >> 15 & 1;
  const exp = bits >> 10 & 31;
  const mant = bits & 1023;
  if (exp === 0) {
    if (mant === 0) return sign ? -0 : 0;
    const f2 = mant / 1024 * Math.pow(2, -14);
    return sign ? -f2 : f2;
  }
  if (exp === 31) return sign ? -Infinity : Infinity;
  const f = (1 + mant / 1024) * Math.pow(2, exp - 15);
  return sign ? -f : f;
}
var GPU_MATMUL_TYPES = /* @__PURE__ */ new Set([
  0,
  2,
  8
  /* Q8_0 */
]);
var LlamaModel = class {
  compute;
  info;
  weights;
  kvCaches;
  // one per layer
  // Working buffers
  hidden;
  residual;
  normed;
  qBuf;
  kBuf;
  vBuf;
  attnOut;
  gateBuf;
  upBuf;
  ffnOut;
  temp;
  // temp buffer for in-place add workaround
  logits;
  constructor(compute, info) {
    this.compute = compute;
    this.info = info;
  }
  get embeddingDim() {
    return this.info.embeddingLength;
  }
  get numLayers() {
    return this.info.blockCount;
  }
  get numHeads() {
    return this.info.headCount;
  }
  get numKvHeads() {
    return this.info.headCountKv || this.info.headCount;
  }
  get headDim() {
    return this.embeddingDim / this.numHeads;
  }
  get ffnDim() {
    return this.info.feedForwardLength;
  }
  get vocabSize() {
    return this.info.vocabSize;
  }
  get contextLength() {
    return this.info.contextLength;
  }
  get ropeTheta() {
    return this.info.ropeFreqBase;
  }
  get rmsNormEps() {
    return this.info.rmsNormEps;
  }
  /**
   * Upload tensor data to GPU and initialize working buffers.
   */
  async initWeights(tensorMap) {
    const { compute, info } = this;
    const arch = info.architecture;
    const uploadAsF32 = (name) => {
      const tensor = tensorMap.get(name);
      if (!tensor) throw new Error(`Missing tensor: ${name}`);
      if (tensor.info.type === 0) {
        return compute.buffers.createBufferWithData(name, tensor.buffer);
      }
      const f32Data = dequantizeToF32(tensor.buffer, tensor.info.type, tensor.info.elementCount);
      return compute.buffers.createBufferWithData(name, f32Data.buffer);
    };
    const uploadWeight = (name) => {
      const tensor = tensorMap.get(name);
      if (!tensor) throw new Error(`Missing tensor: ${name}`);
      if (GPU_MATMUL_TYPES.has(tensor.info.type)) {
        return { buffer: compute.buffers.createBufferWithData(name, tensor.buffer), type: tensor.info.type };
      }
      const f32Data = dequantizeToF32(tensor.buffer, tensor.info.type, tensor.info.elementCount);
      return {
        buffer: compute.buffers.createBufferWithData(name, f32Data.buffer),
        type: 0
        /* F32 */
      };
    };
    const tokenEmbedding = uploadAsF32("token_embd.weight");
    let outputWeight;
    if (tensorMap.has("output.weight")) {
      outputWeight = uploadAsF32("output.weight");
    } else {
      outputWeight = tokenEmbedding;
    }
    const outputNorm = uploadAsF32("output_norm.weight");
    const layers = [];
    for (let i = 0; i < this.numLayers; i++) {
      layers.push({
        attnNorm: uploadAsF32(`blk.${i}.attn_norm.weight`),
        q: uploadWeight(`blk.${i}.attn_q.weight`),
        k: uploadWeight(`blk.${i}.attn_k.weight`),
        v: uploadWeight(`blk.${i}.attn_v.weight`),
        o: uploadWeight(`blk.${i}.attn_output.weight`),
        postAttnNorm: uploadAsF32(`blk.${i}.ffn_norm.weight`),
        gateProj: uploadWeight(`blk.${i}.ffn_gate.weight`),
        upProj: uploadWeight(`blk.${i}.ffn_up.weight`),
        downProj: uploadWeight(`blk.${i}.ffn_down.weight`)
      });
    }
    this.weights = { tokenEmbedding, outputNorm, output: outputWeight, layers };
    const E = this.embeddingDim;
    const F = this.ffnDim;
    const H = this.numHeads * this.headDim;
    const KV = this.numKvHeads * this.headDim;
    this.hidden = compute.buffers.createBuffer("hidden", E * 4);
    this.residual = compute.buffers.createBuffer("residual", E * 4);
    this.normed = compute.buffers.createBuffer("normed", E * 4);
    this.qBuf = compute.buffers.createBuffer("q_proj", H * 4);
    this.kBuf = compute.buffers.createBuffer("k_proj", KV * 4);
    this.vBuf = compute.buffers.createBuffer("v_proj", KV * 4);
    this.attnOut = compute.buffers.createBuffer("attn_out", E * 4);
    this.gateBuf = compute.buffers.createBuffer("gate", F * 4);
    this.upBuf = compute.buffers.createBuffer("up", F * 4);
    this.ffnOut = compute.buffers.createBuffer("ffn_out", F * 4);
    this.temp = compute.buffers.createBuffer("temp", E * 4);
    this.logits = compute.buffers.createBuffer("logits", this.vocabSize * 4);
    const maxCtx = Math.min(this.contextLength, 4096);
    this.kvCaches = [];
    for (let i = 0; i < this.numLayers; i++) {
      this.kvCaches.push(new KvCache(
        compute.device,
        compute.buffers,
        this.numKvHeads,
        this.headDim,
        maxCtx,
        `kv_L${i}`
      ));
    }
  }
  /** Reset the KV cache for a new conversation. */
  resetCache() {
    for (const kv of this.kvCaches) kv.reset();
  }
  /** Get current sequence position in KV cache. */
  get position() {
    return this.kvCaches[0].seqLen;
  }
  /**
   * Forward pass for a single token. Returns logits buffer on GPU.
   */
  forward(tokenId) {
    const { compute, weights } = this;
    const E = this.embeddingDim;
    compute.embedding(weights.tokenEmbedding, this.hidden, tokenId, E);
    for (let layer = 0; layer < this.numLayers; layer++) {
      const lw = weights.layers[layer];
      compute.copyAndRmsNorm(this.hidden, lw.attnNorm, this.normed, this.residual, E, this.rmsNormEps);
      compute.matmul(lw.q.buffer, this.normed, this.qBuf, this.numHeads * this.headDim, E, lw.q.type);
      compute.matmul(lw.k.buffer, this.normed, this.kBuf, this.numKvHeads * this.headDim, E, lw.k.type);
      compute.matmul(lw.v.buffer, this.normed, this.vBuf, this.numKvHeads * this.headDim, E, lw.v.type);
      const kvCache = this.kvCaches[layer];
      const pos = kvCache.seqLen;
      compute.rope(this.qBuf, this.headDim, this.headDim, pos, this.ropeTheta, this.numHeads * this.headDim);
      compute.rope(this.kBuf, this.headDim, this.headDim, pos, this.ropeTheta, this.numKvHeads * this.headDim);
      kvCache.write(this.kBuf, this.vBuf, this.numKvHeads * this.headDim * 4, this.numKvHeads * this.headDim * 4);
      compute.attention(
        this.qBuf,
        kvCache.kBuffer,
        kvCache.vBuffer,
        this.attnOut,
        this.numHeads,
        this.numKvHeads,
        this.headDim,
        kvCache.seqLen,
        kvCache.maxSeqLen
      );
      compute.matmul(lw.o.buffer, this.attnOut, this.temp, E, this.numHeads * this.headDim, lw.o.type);
      compute.add(this.temp, this.residual, this.hidden, E);
      compute.copyAndRmsNorm(this.hidden, lw.postAttnNorm, this.normed, this.residual, E, this.rmsNormEps);
      compute.matmul(lw.gateProj.buffer, this.normed, this.gateBuf, this.ffnDim, E, lw.gateProj.type);
      compute.matmul(lw.upProj.buffer, this.normed, this.upBuf, this.ffnDim, E, lw.upProj.type);
      compute.siluMul(this.gateBuf, this.upBuf, this.ffnOut, this.ffnDim);
      compute.matmul(lw.downProj.buffer, this.ffnOut, this.temp, E, this.ffnDim, lw.downProj.type);
      compute.add(this.temp, this.residual, this.hidden, E);
    }
    compute.rmsNorm(this.hidden, weights.outputNorm, this.normed, E, this.rmsNormEps);
    compute.matmul(
      weights.output,
      this.normed,
      this.logits,
      this.vocabSize,
      E,
      0
      /* F32 */
    );
    return this.logits;
  }
  // ── CPU forward pass (for verification / fallback) ──────────────────
  cpuWeights = null;
  /** Store CPU-side F32 weights for CPU forward pass. */
  storeCpuWeights(tensorMap) {
    const dq = (name) => {
      const t = tensorMap.get(name);
      if (t.info.type === 0) return new Float32Array(t.buffer);
      return dequantizeToF32(t.buffer, t.info.type, t.info.elementCount);
    };
    const layers = [];
    for (let i = 0; i < this.numLayers; i++) {
      layers.push({
        attnNorm: dq(`blk.${i}.attn_norm.weight`),
        q: dq(`blk.${i}.attn_q.weight`),
        k: dq(`blk.${i}.attn_k.weight`),
        v: dq(`blk.${i}.attn_v.weight`),
        o: dq(`blk.${i}.attn_output.weight`),
        postAttnNorm: dq(`blk.${i}.ffn_norm.weight`),
        gate: dq(`blk.${i}.ffn_gate.weight`),
        up: dq(`blk.${i}.ffn_up.weight`),
        down: dq(`blk.${i}.ffn_down.weight`)
      });
    }
    this.cpuWeights = {
      embedding: dq("token_embd.weight"),
      outputNorm: dq("output_norm.weight"),
      output: dq(tensorMap.has("output.weight") ? "output.weight" : "token_embd.weight"),
      layers
    };
  }
  getCpuState() {
    const maxSeqLen = 512;
    return {
      kvK: Array.from({ length: this.numLayers }, () => new Float32Array(this.numKvHeads * maxSeqLen * this.headDim)),
      kvV: Array.from({ length: this.numLayers }, () => new Float32Array(this.numKvHeads * maxSeqLen * this.headDim)),
      seqLen: 0,
      maxSeqLen,
      hidden: new Float32Array(this.embeddingDim)
    };
  }
  async cpuForward(tokenId, state) {
    const E = this.embeddingDim;
    const w = this.cpuWeights;
    const h = new Float32Array(E);
    for (let i = 0; i < E; i++) h[i] = w.embedding[tokenId * E + i];
    for (let layer = 0; layer < this.numLayers; layer++) {
      const lw = w.layers[layer];
      const residual = new Float32Array(h);
      const normed = cpuRmsNorm(h, lw.attnNorm, E, this.rmsNormEps);
      const qP = cpuMatvec(lw.q, normed, this.numHeads * this.headDim, E);
      const kP = cpuMatvec(lw.k, normed, this.numKvHeads * this.headDim, E);
      const vP = cpuMatvec(lw.v, normed, this.numKvHeads * this.headDim, E);
      cpuRope(qP, this.headDim, state.seqLen, this.ropeTheta);
      cpuRope(kP, this.headDim, state.seqLen, this.ropeTheta);
      for (let kh = 0; kh < this.numKvHeads; kh++) {
        for (let d = 0; d < this.headDim; d++) {
          state.kvK[layer][kh * state.maxSeqLen * this.headDim + state.seqLen * this.headDim + d] = kP[kh * this.headDim + d];
          state.kvV[layer][kh * state.maxSeqLen * this.headDim + state.seqLen * this.headDim + d] = vP[kh * this.headDim + d];
        }
      }
      const curSeqLen = state.seqLen + 1;
      const scale = 1 / Math.sqrt(this.headDim);
      const headsPerGroup = this.numHeads / this.numKvHeads;
      const attnOut = new Float32Array(this.numHeads * this.headDim);
      for (let head = 0; head < this.numHeads; head++) {
        const kvHead = Math.floor(head / headsPerGroup);
        const scores = new Float32Array(curSeqLen);
        for (let pos = 0; pos < curSeqLen; pos++) {
          let dot = 0;
          for (let d = 0; d < this.headDim; d++)
            dot += qP[head * this.headDim + d] * state.kvK[layer][kvHead * state.maxSeqLen * this.headDim + pos * this.headDim + d];
          scores[pos] = dot * scale;
        }
        let maxS = -Infinity;
        for (let i = 0; i < curSeqLen; i++) maxS = Math.max(maxS, scores[i]);
        let sumE = 0;
        for (let i = 0; i < curSeqLen; i++) {
          scores[i] = Math.exp(scores[i] - maxS);
          sumE += scores[i];
        }
        for (let i = 0; i < curSeqLen; i++) scores[i] /= sumE;
        for (let d = 0; d < this.headDim; d++) {
          let acc = 0;
          for (let pos = 0; pos < curSeqLen; pos++)
            acc += scores[pos] * state.kvV[layer][kvHead * state.maxSeqLen * this.headDim + pos * this.headDim + d];
          attnOut[head * this.headDim + d] = acc;
        }
      }
      const oP = cpuMatvec(lw.o, attnOut, E, this.numHeads * this.headDim);
      for (let i = 0; i < E; i++) h[i] = oP[i] + residual[i];
      await new Promise((r) => setTimeout(r, 0));
      const residual2 = new Float32Array(h);
      const normed2 = cpuRmsNorm(h, lw.postAttnNorm, E, this.rmsNormEps);
      const gateOut = cpuMatvec(lw.gate, normed2, this.ffnDim, E);
      const upOut = cpuMatvec(lw.up, normed2, this.ffnDim, E);
      const ffnOut = new Float32Array(this.ffnDim);
      for (let i = 0; i < this.ffnDim; i++)
        ffnOut[i] = gateOut[i] / (1 + Math.exp(-gateOut[i])) * upOut[i];
      const downOut = cpuMatvec(lw.down, ffnOut, E, this.ffnDim);
      for (let i = 0; i < E; i++) h[i] = downOut[i] + residual2[i];
      await new Promise((r) => setTimeout(r, 0));
    }
    state.hidden.set(h);
    state.seqLen++;
  }
  cpuGetLogits(state) {
    const w = this.cpuWeights;
    const normed = cpuRmsNorm(state.hidden, w.outputNorm, this.embeddingDim, this.rmsNormEps);
    return cpuMatvec(w.output, normed, this.vocabSize, this.embeddingDim);
  }
  /**
   * Read logits back to CPU for sampling.
   */
  async readLogits() {
    const logits = await this.compute.readBuffer(this.logits, this.vocabSize * 4);
    this.compute.cleanupParams();
    return logits;
  }
};
function cpuRmsNorm(input, weight, n, eps) {
  let sumSq = 0;
  for (let i = 0; i < n; i++) sumSq += input[i] * input[i];
  const rms = Math.sqrt(sumSq / n + eps);
  const out = new Float32Array(n);
  for (let i = 0; i < n; i++) out[i] = input[i] / rms * weight[i];
  return out;
}
function cpuMatvec(weights, input, M, K) {
  const out = new Float32Array(M);
  for (let row = 0; row < M; row++) {
    let sum = 0;
    const off = row * K;
    for (let k = 0; k < K; k++) sum += weights[off + k] * input[k];
    out[row] = sum;
  }
  return out;
}
function cpuRope(data, headDim, position, theta) {
  const nPairs = data.length / 2;
  for (let pi = 0; pi < nPairs; pi++) {
    const hp = pi % (headDim / 2);
    const dimFrac = hp * 2 / headDim;
    const freq = 1 / Math.pow(theta, dimFrac);
    const angle = position * freq;
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const i0 = pi * 2, i1 = i0 + 1;
    const x = data[i0], y = data[i1];
    data[i0] = x * c - y * s;
    data[i1] = x * s + y * c;
  }
}
var DEFAULT_OPTIONS = {
  temperature: 0.7,
  topK: 40,
  topP: 0.9,
  repetitionPenalty: 1.1,
  seed: 0
};
var Sampler = class {
  options;
  rng;
  constructor(options) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
    if (this.options.seed > 0) {
      let state = this.options.seed;
      this.rng = () => {
        state ^= state << 13;
        state ^= state >> 17;
        state ^= state << 5;
        return (state >>> 0) / 4294967296;
      };
    } else {
      this.rng = Math.random;
    }
  }
  /**
   * Sample a token ID from logits.
   * @param logits - Raw logits array [vocabSize]
   * @param previousTokens - Recent token IDs for repetition penalty
   */
  sample(logits, previousTokens) {
    const { temperature, topK, topP, repetitionPenalty } = this.options;
    if (previousTokens && previousTokens.length > 0 && repetitionPenalty !== 1) {
      const seen = new Set(previousTokens.slice(-64));
      for (const id of seen) {
        if (id < logits.length) {
          if (logits[id] > 0) {
            logits[id] /= repetitionPenalty;
          } else {
            logits[id] *= repetitionPenalty;
          }
        }
      }
    }
    if (temperature === 0 || temperature < 1e-6) {
      return argmax(logits);
    }
    for (let i = 0; i < logits.length; i++) {
      logits[i] /= temperature;
    }
    const indices = new Uint32Array(logits.length);
    for (let i = 0; i < indices.length; i++) indices[i] = i;
    indices.sort((a, b) => logits[b] - logits[a]);
    let k = Math.min(topK, logits.length);
    let maxLogit = logits[indices[0]];
    const probs = new Float32Array(k);
    let sum = 0;
    for (let i = 0; i < k; i++) {
      probs[i] = Math.exp(logits[indices[i]] - maxLogit);
      sum += probs[i];
    }
    for (let i = 0; i < k; i++) probs[i] /= sum;
    let cumProb = 0;
    let cutoff = k;
    for (let i = 0; i < k; i++) {
      cumProb += probs[i];
      if (cumProb >= topP) {
        cutoff = i + 1;
        break;
      }
    }
    sum = 0;
    for (let i = 0; i < cutoff; i++) sum += probs[i];
    for (let i = 0; i < cutoff; i++) probs[i] /= sum;
    const r = this.rng();
    cumProb = 0;
    for (let i = 0; i < cutoff; i++) {
      cumProb += probs[i];
      if (r <= cumProb) return indices[i];
    }
    return indices[0];
  }
};
function argmax(arr) {
  let maxIdx = 0;
  let maxVal = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxVal) {
      maxVal = arr[i];
      maxIdx = i;
    }
  }
  return maxIdx;
}
var LlogosEngine = class _LlogosEngine {
  gpu = null;
  compute = null;
  model = null;
  tokenizer = null;
  modelInfo = null;
  _status = "uninitialized";
  get status() {
    return this._status;
  }
  get capabilities() {
    return this.gpu?.capabilities ?? null;
  }
  get info() {
    return this.modelInfo;
  }
  /** Check if WebGPU is available. */
  static isSupported() {
    return isWebGpuAvailable();
  }
  /** Initialize the WebGPU device. Must be called first. */
  async initGpu() {
    this.gpu = await initGpu();
    this.compute = new ComputeEngine(this.gpu.device);
    this._status = "ready";
    return this.gpu.capabilities;
  }
  /** Fetch and parse GGUF header to inspect model metadata without downloading weights. */
  async inspectModel(url) {
    return fetchGgufHeader(url);
  }
  /**
   * Download and load a GGUF model into GPU memory.
   */
  async loadModel(url, options) {
    if (!this.compute) throw new Error("GPU not initialized. Call initGpu() first.");
    this._status = "loading";
    try {
      options?.onProgress?.({ phase: "Parsing header", bytesDownloaded: 0, totalBytes: 0 });
      let info = await fetchGgufHeader(url);
      this.modelInfo = info;
      const estimate = this.estimateVram(info);
      const maxBuffer = this.gpu?.capabilities.maxBufferSize ?? 0;
      if (maxBuffer > 0 && estimate.totalBytes > maxBuffer * 4) {
        console.warn(`[llogos] Model may not fit: estimated ${Math.round(estimate.totalBytes / 1024 / 1024)} MB, max buffer ${Math.round(maxBuffer / 1024 / 1024)} MB`);
      }
      let isCached = false;
      options?.onProgress?.({ phase: "Checking cache...", bytesDownloaded: 0, totalBytes: 0 });
      const fileBuffer = await downloadFile(url, (p) => {
        if (!isCached && p.bytesDownloaded === 0 && p.totalBytes > 0) {
          isCached = true;
        }
        const phase = isCached ? "Loading from cache" : "Downloading";
        options?.onProgress?.({ phase, bytesDownloaded: p.bytesDownloaded, totalBytes: p.totalBytes });
      });
      info = parseGguf(fileBuffer);
      this.modelInfo = info;
      this.tokenizer = tokenizerFromGguf(info.metadata);
      const tensorMap = /* @__PURE__ */ new Map();
      for (const tensor of info.tensors) {
        tensorMap.set(tensor.name, {
          buffer: extractTensorData(fileBuffer, info.tensorDataOffset + tensor.offset, tensor.byteSize),
          info: tensor
        });
      }
      options?.onProgress?.({ phase: "Uploading to GPU", bytesDownloaded: fileBuffer.byteLength, totalBytes: fileBuffer.byteLength });
      this.model = new LlamaModel(this.compute, info);
      await this.model.initWeights(tensorMap);
      this.model.storeCpuWeights(tensorMap);
      this._status = "loaded";
      return info;
    } catch (e) {
      this._status = "error";
      throw e;
    }
  }
  /**
   * Generate tokens from a prompt. Returns an async iterator of token strings.
   */
  async *generate(prompt, options) {
    if (!this.model || !this.tokenizer || !this.compute) {
      throw new Error("Model not loaded. Call loadModel() first.");
    }
    this._status = "generating";
    const maxTokens = options?.maxTokens ?? 512;
    const sampler = new Sampler(options);
    try {
      let finalPrompt = prompt;
      if (!options?.raw) {
        finalPrompt = this.applyChatTemplate(prompt);
      }
      const inputTokens = [];
      if (this.model.position === 0 && this.tokenizer.bosTokenId >= 0 && options?.raw) {
        inputTokens.push(this.tokenizer.bosTokenId);
      }
      inputTokens.push(...this.tokenizer.encode(finalPrompt));
      const allTokens = [...inputTokens];
      for (let i = 0; i < inputTokens.length; i++) {
        this.model.forward(inputTokens[i]);
      }
      let logits = await this.model.readLogits();
      for (let step = 0; step < maxTokens; step++) {
        if (options?.signal?.aborted) break;
        const nextToken = sampler.sample(logits, allTokens);
        if (this.tokenizer.isEos(nextToken)) break;
        allTokens.push(nextToken);
        const text = this.tokenizer.decode([nextToken]);
        options?.onToken?.(text, nextToken);
        yield text;
        this.model.forward(nextToken);
        logits = await this.model.readLogits();
      }
    } finally {
      this._status = "loaded";
    }
  }
  /** Reset the KV cache and conversation history for a new conversation. */
  resetSession() {
    this.model?.resetCache();
    this.conversationHistory = [];
  }
  /** Unload model and free GPU memory. */
  unloadModel() {
    this.compute?.buffers.destroyAll();
    this.model = null;
    this.tokenizer = null;
    this.modelInfo = null;
    this._status = this.gpu ? "ready" : "uninitialized";
  }
  /** Get current VRAM usage in bytes. */
  get vramUsage() {
    return this.compute?.buffers.vramUsage ?? 0;
  }
  // GPU types that stay quantized (have native GPU shaders)
  static GPU_NATIVE_TYPES = /* @__PURE__ */ new Set([
    0,
    8,
    2
    /* Q4_0 */
  ]);
  /**
   * Estimate VRAM needed for a model before downloading.
   * Returns breakdown in bytes: weights, kvCache, working, total.
   */
  estimateVram(info) {
    let weightsBytes = 0;
    for (const tensor of info.tensors) {
      if (_LlogosEngine.GPU_NATIVE_TYPES.has(tensor.type)) {
        weightsBytes += tensor.byteSize;
      } else {
        weightsBytes += tensor.elementCount * 4;
      }
    }
    const maxSeq = Math.min(info.contextLength, 4096);
    const headDim = info.embeddingLength / info.headCount;
    const kvHeads = info.headCountKv || info.headCount;
    const kvCacheBytes = 2 * info.blockCount * kvHeads * maxSeq * headDim * 4;
    const E = info.embeddingLength;
    const F = info.feedForwardLength;
    const V = info.vocabSize;
    const workingBytes = (E * 11 + F * 3 + V) * 4;
    return {
      weightsBytes,
      kvCacheBytes,
      workingBytes,
      totalBytes: weightsBytes + kvCacheBytes + workingBytes
    };
  }
  /**
   * Apply chat template to format the prompt.
   * Uses the Jinja2 template from GGUF metadata if available,
   * falls back to ChatML/Llama2 heuristics.
   */
  applyChatTemplate(userMessage) {
    const chatTemplate = this.modelInfo?.metadata.get("tokenizer.chat_template");
    const messages = [
      ...this.conversationHistory,
      { role: "user", content: userMessage }
    ];
    if (this.tokenizer && this.tokenizer.getTokenId("<|start_header_id|>") >= 0) {
      let prompt = "<|begin_of_text|>";
      prompt += "<|start_header_id|>system<|end_header_id|>\n\nYou are a helpful assistant.<|eot_id|>";
      for (const msg of messages) {
        prompt += `<|start_header_id|>${msg.role}<|end_header_id|>

${msg.content.trim()}<|eot_id|>`;
      }
      prompt += "<|start_header_id|>assistant<|end_header_id|>\n\n";
      return prompt;
    }
    if (this.tokenizer && this.tokenizer.getTokenId("<|im_start|>") >= 0) {
      let prompt = "";
      for (const msg of messages) {
        prompt += `<|im_start|>${msg.role}
${msg.content}<|im_end|>
`;
      }
      prompt += "<|im_start|>assistant\n";
      return prompt;
    }
    if (chatTemplate?.includes("[INST]")) {
      return `[INST] ${userMessage} [/INST]`;
    }
    if (chatTemplate) {
      try {
        const bosToken = this.tokenizer && this.tokenizer.bosTokenId >= 0 ? this.tokenizer.decode([this.tokenizer.bosTokenId]) : "";
        const eosToken = this.tokenizer && this.tokenizer.eosTokenId >= 0 ? this.tokenizer.decode([this.tokenizer.eosTokenId]) : "";
        const result = applyTemplate(chatTemplate, messages, {
          bos_token: bosToken,
          eos_token: eosToken,
          add_generation_prompt: true
        });
        if (result.trim().length > 0) return result;
      } catch {
      }
    }
    return userMessage;
  }
  /** Conversation history for multi-turn chat template support. */
  conversationHistory = [];
};

// src/index.ts
var import_nice_grpc_web3 = __toESM(require_lib3(), 1);

// ../../daisi-sdk-typescript/dist/web.js
var import_nice_grpc_web = __toESM(require_lib6(), 1);
var import_nice_grpc_common = __toESM(require_lib4(), 1);
var import_nice_grpc_common2 = __toESM(require_lib4(), 1);

// ../../daisi-sdk-typescript/node_modules/@bufbuild/protobuf/dist/esm/wire/varint.js
function varint64read() {
  let lowBits = 0;
  let highBits = 0;
  for (let shift = 0; shift < 28; shift += 7) {
    let b = this.buf[this.pos++];
    lowBits |= (b & 127) << shift;
    if ((b & 128) == 0) {
      this.assertBounds();
      return [lowBits, highBits];
    }
  }
  let middleByte = this.buf[this.pos++];
  lowBits |= (middleByte & 15) << 28;
  highBits = (middleByte & 112) >> 4;
  if ((middleByte & 128) == 0) {
    this.assertBounds();
    return [lowBits, highBits];
  }
  for (let shift = 3; shift <= 31; shift += 7) {
    let b = this.buf[this.pos++];
    highBits |= (b & 127) << shift;
    if ((b & 128) == 0) {
      this.assertBounds();
      return [lowBits, highBits];
    }
  }
  throw new Error("invalid varint");
}
function varint64write(lo, hi, bytes) {
  for (let i = 0; i < 28; i = i + 7) {
    const shift = lo >>> i;
    const hasNext = !(shift >>> 7 == 0 && hi == 0);
    const byte = (hasNext ? shift | 128 : shift) & 255;
    bytes.push(byte);
    if (!hasNext) {
      return;
    }
  }
  const splitBits = lo >>> 28 & 15 | (hi & 7) << 4;
  const hasMoreBits = !(hi >> 3 == 0);
  bytes.push((hasMoreBits ? splitBits | 128 : splitBits) & 255);
  if (!hasMoreBits) {
    return;
  }
  for (let i = 3; i < 31; i = i + 7) {
    const shift = hi >>> i;
    const hasNext = !(shift >>> 7 == 0);
    const byte = (hasNext ? shift | 128 : shift) & 255;
    bytes.push(byte);
    if (!hasNext) {
      return;
    }
  }
  bytes.push(hi >>> 31 & 1);
}
var TWO_PWR_32_DBL = 4294967296;
function int64FromString(dec) {
  const minus = dec[0] === "-";
  if (minus) {
    dec = dec.slice(1);
  }
  const base = 1e6;
  let lowBits = 0;
  let highBits = 0;
  function add1e6digit(begin, end) {
    const digit1e6 = Number(dec.slice(begin, end));
    highBits *= base;
    lowBits = lowBits * base + digit1e6;
    if (lowBits >= TWO_PWR_32_DBL) {
      highBits = highBits + (lowBits / TWO_PWR_32_DBL | 0);
      lowBits = lowBits % TWO_PWR_32_DBL;
    }
  }
  add1e6digit(-24, -18);
  add1e6digit(-18, -12);
  add1e6digit(-12, -6);
  add1e6digit(-6);
  return minus ? negate(lowBits, highBits) : newBits(lowBits, highBits);
}
function int64ToString(lo, hi) {
  let bits = newBits(lo, hi);
  const negative = bits.hi & 2147483648;
  if (negative) {
    bits = negate(bits.lo, bits.hi);
  }
  const result = uInt64ToString(bits.lo, bits.hi);
  return negative ? "-" + result : result;
}
function uInt64ToString(lo, hi) {
  ({ lo, hi } = toUnsigned(lo, hi));
  if (hi <= 2097151) {
    return String(TWO_PWR_32_DBL * hi + lo);
  }
  const low = lo & 16777215;
  const mid = (lo >>> 24 | hi << 8) & 16777215;
  const high = hi >> 16 & 65535;
  let digitA = low + mid * 6777216 + high * 6710656;
  let digitB = mid + high * 8147497;
  let digitC = high * 2;
  const base = 1e7;
  if (digitA >= base) {
    digitB += Math.floor(digitA / base);
    digitA %= base;
  }
  if (digitB >= base) {
    digitC += Math.floor(digitB / base);
    digitB %= base;
  }
  return digitC.toString() + decimalFrom1e7WithLeadingZeros(digitB) + decimalFrom1e7WithLeadingZeros(digitA);
}
function toUnsigned(lo, hi) {
  return { lo: lo >>> 0, hi: hi >>> 0 };
}
function newBits(lo, hi) {
  return { lo: lo | 0, hi: hi | 0 };
}
function negate(lowBits, highBits) {
  highBits = ~highBits;
  if (lowBits) {
    lowBits = ~lowBits + 1;
  } else {
    highBits += 1;
  }
  return newBits(lowBits, highBits);
}
var decimalFrom1e7WithLeadingZeros = (digit1e7) => {
  const partial = String(digit1e7);
  return "0000000".slice(partial.length) + partial;
};
function varint32write(value, bytes) {
  if (value >= 0) {
    while (value > 127) {
      bytes.push(value & 127 | 128);
      value = value >>> 7;
    }
    bytes.push(value);
  } else {
    for (let i = 0; i < 9; i++) {
      bytes.push(value & 127 | 128);
      value = value >> 7;
    }
    bytes.push(1);
  }
}
function varint32read() {
  let b = this.buf[this.pos++];
  let result = b & 127;
  if ((b & 128) == 0) {
    this.assertBounds();
    return result;
  }
  b = this.buf[this.pos++];
  result |= (b & 127) << 7;
  if ((b & 128) == 0) {
    this.assertBounds();
    return result;
  }
  b = this.buf[this.pos++];
  result |= (b & 127) << 14;
  if ((b & 128) == 0) {
    this.assertBounds();
    return result;
  }
  b = this.buf[this.pos++];
  result |= (b & 127) << 21;
  if ((b & 128) == 0) {
    this.assertBounds();
    return result;
  }
  b = this.buf[this.pos++];
  result |= (b & 15) << 28;
  for (let readBytes = 5; (b & 128) !== 0 && readBytes < 10; readBytes++)
    b = this.buf[this.pos++];
  if ((b & 128) != 0)
    throw new Error("invalid varint");
  this.assertBounds();
  return result >>> 0;
}

// ../../daisi-sdk-typescript/node_modules/@bufbuild/protobuf/dist/esm/proto-int64.js
var protoInt64 = /* @__PURE__ */ makeInt64Support();
function makeInt64Support() {
  const dv = new DataView(new ArrayBuffer(8));
  const ok = typeof BigInt === "function" && typeof dv.getBigInt64 === "function" && typeof dv.getBigUint64 === "function" && typeof dv.setBigInt64 === "function" && typeof dv.setBigUint64 === "function" && (!!globalThis.Deno || typeof process != "object" || typeof process.env != "object" || process.env.BUF_BIGINT_DISABLE !== "1");
  if (ok) {
    const MIN = BigInt("-9223372036854775808");
    const MAX = BigInt("9223372036854775807");
    const UMIN = BigInt("0");
    const UMAX = BigInt("18446744073709551615");
    return {
      zero: BigInt(0),
      supported: true,
      parse(value) {
        const bi = typeof value == "bigint" ? value : BigInt(value);
        if (bi > MAX || bi < MIN) {
          throw new Error(`invalid int64: ${value}`);
        }
        return bi;
      },
      uParse(value) {
        const bi = typeof value == "bigint" ? value : BigInt(value);
        if (bi > UMAX || bi < UMIN) {
          throw new Error(`invalid uint64: ${value}`);
        }
        return bi;
      },
      enc(value) {
        dv.setBigInt64(0, this.parse(value), true);
        return {
          lo: dv.getInt32(0, true),
          hi: dv.getInt32(4, true)
        };
      },
      uEnc(value) {
        dv.setBigInt64(0, this.uParse(value), true);
        return {
          lo: dv.getInt32(0, true),
          hi: dv.getInt32(4, true)
        };
      },
      dec(lo, hi) {
        dv.setInt32(0, lo, true);
        dv.setInt32(4, hi, true);
        return dv.getBigInt64(0, true);
      },
      uDec(lo, hi) {
        dv.setInt32(0, lo, true);
        dv.setInt32(4, hi, true);
        return dv.getBigUint64(0, true);
      }
    };
  }
  return {
    zero: "0",
    supported: false,
    parse(value) {
      if (typeof value != "string") {
        value = value.toString();
      }
      assertInt64String(value);
      return value;
    },
    uParse(value) {
      if (typeof value != "string") {
        value = value.toString();
      }
      assertUInt64String(value);
      return value;
    },
    enc(value) {
      if (typeof value != "string") {
        value = value.toString();
      }
      assertInt64String(value);
      return int64FromString(value);
    },
    uEnc(value) {
      if (typeof value != "string") {
        value = value.toString();
      }
      assertUInt64String(value);
      return int64FromString(value);
    },
    dec(lo, hi) {
      return int64ToString(lo, hi);
    },
    uDec(lo, hi) {
      return uInt64ToString(lo, hi);
    }
  };
}
function assertInt64String(value) {
  if (!/^-?[0-9]+$/.test(value)) {
    throw new Error("invalid int64: " + value);
  }
}
function assertUInt64String(value) {
  if (!/^[0-9]+$/.test(value)) {
    throw new Error("invalid uint64: " + value);
  }
}

// ../../daisi-sdk-typescript/node_modules/@bufbuild/protobuf/dist/esm/wire/text-encoding.js
var symbol = Symbol.for("@bufbuild/protobuf/text-encoding");
function getTextEncoding() {
  if (globalThis[symbol] == void 0) {
    const te = new globalThis.TextEncoder();
    const td = new globalThis.TextDecoder();
    globalThis[symbol] = {
      encodeUtf8(text) {
        return te.encode(text);
      },
      decodeUtf8(bytes) {
        return td.decode(bytes);
      },
      checkUtf8(text) {
        try {
          encodeURIComponent(text);
          return true;
        } catch (_) {
          return false;
        }
      }
    };
  }
  return globalThis[symbol];
}

// ../../daisi-sdk-typescript/node_modules/@bufbuild/protobuf/dist/esm/wire/binary-encoding.js
var WireType;
(function(WireType2) {
  WireType2[WireType2["Varint"] = 0] = "Varint";
  WireType2[WireType2["Bit64"] = 1] = "Bit64";
  WireType2[WireType2["LengthDelimited"] = 2] = "LengthDelimited";
  WireType2[WireType2["StartGroup"] = 3] = "StartGroup";
  WireType2[WireType2["EndGroup"] = 4] = "EndGroup";
  WireType2[WireType2["Bit32"] = 5] = "Bit32";
})(WireType || (WireType = {}));
var FLOAT32_MAX = 34028234663852886e22;
var FLOAT32_MIN = -34028234663852886e22;
var UINT32_MAX = 4294967295;
var INT32_MAX = 2147483647;
var INT32_MIN = -2147483648;
var BinaryWriter = class {
  constructor(encodeUtf8 = getTextEncoding().encodeUtf8) {
    this.encodeUtf8 = encodeUtf8;
    this.stack = [];
    this.chunks = [];
    this.buf = [];
  }
  /**
   * Return all bytes written and reset this writer.
   */
  finish() {
    if (this.buf.length) {
      this.chunks.push(new Uint8Array(this.buf));
      this.buf = [];
    }
    let len = 0;
    for (let i = 0; i < this.chunks.length; i++)
      len += this.chunks[i].length;
    let bytes = new Uint8Array(len);
    let offset = 0;
    for (let i = 0; i < this.chunks.length; i++) {
      bytes.set(this.chunks[i], offset);
      offset += this.chunks[i].length;
    }
    this.chunks = [];
    return bytes;
  }
  /**
   * Start a new fork for length-delimited data like a message
   * or a packed repeated field.
   *
   * Must be joined later with `join()`.
   */
  fork() {
    this.stack.push({ chunks: this.chunks, buf: this.buf });
    this.chunks = [];
    this.buf = [];
    return this;
  }
  /**
   * Join the last fork. Write its length and bytes, then
   * return to the previous state.
   */
  join() {
    let chunk = this.finish();
    let prev = this.stack.pop();
    if (!prev)
      throw new Error("invalid state, fork stack empty");
    this.chunks = prev.chunks;
    this.buf = prev.buf;
    this.uint32(chunk.byteLength);
    return this.raw(chunk);
  }
  /**
   * Writes a tag (field number and wire type).
   *
   * Equivalent to `uint32( (fieldNo << 3 | type) >>> 0 )`.
   *
   * Generated code should compute the tag ahead of time and call `uint32()`.
   */
  tag(fieldNo, type) {
    return this.uint32((fieldNo << 3 | type) >>> 0);
  }
  /**
   * Write a chunk of raw bytes.
   */
  raw(chunk) {
    if (this.buf.length) {
      this.chunks.push(new Uint8Array(this.buf));
      this.buf = [];
    }
    this.chunks.push(chunk);
    return this;
  }
  /**
   * Write a `uint32` value, an unsigned 32 bit varint.
   */
  uint32(value) {
    assertUInt32(value);
    while (value > 127) {
      this.buf.push(value & 127 | 128);
      value = value >>> 7;
    }
    this.buf.push(value);
    return this;
  }
  /**
   * Write a `int32` value, a signed 32 bit varint.
   */
  int32(value) {
    assertInt32(value);
    varint32write(value, this.buf);
    return this;
  }
  /**
   * Write a `bool` value, a variant.
   */
  bool(value) {
    this.buf.push(value ? 1 : 0);
    return this;
  }
  /**
   * Write a `bytes` value, length-delimited arbitrary data.
   */
  bytes(value) {
    this.uint32(value.byteLength);
    return this.raw(value);
  }
  /**
   * Write a `string` value, length-delimited data converted to UTF-8 text.
   */
  string(value) {
    let chunk = this.encodeUtf8(value);
    this.uint32(chunk.byteLength);
    return this.raw(chunk);
  }
  /**
   * Write a `float` value, 32-bit floating point number.
   */
  float(value) {
    assertFloat32(value);
    let chunk = new Uint8Array(4);
    new DataView(chunk.buffer).setFloat32(0, value, true);
    return this.raw(chunk);
  }
  /**
   * Write a `double` value, a 64-bit floating point number.
   */
  double(value) {
    let chunk = new Uint8Array(8);
    new DataView(chunk.buffer).setFloat64(0, value, true);
    return this.raw(chunk);
  }
  /**
   * Write a `fixed32` value, an unsigned, fixed-length 32-bit integer.
   */
  fixed32(value) {
    assertUInt32(value);
    let chunk = new Uint8Array(4);
    new DataView(chunk.buffer).setUint32(0, value, true);
    return this.raw(chunk);
  }
  /**
   * Write a `sfixed32` value, a signed, fixed-length 32-bit integer.
   */
  sfixed32(value) {
    assertInt32(value);
    let chunk = new Uint8Array(4);
    new DataView(chunk.buffer).setInt32(0, value, true);
    return this.raw(chunk);
  }
  /**
   * Write a `sint32` value, a signed, zigzag-encoded 32-bit varint.
   */
  sint32(value) {
    assertInt32(value);
    value = (value << 1 ^ value >> 31) >>> 0;
    varint32write(value, this.buf);
    return this;
  }
  /**
   * Write a `fixed64` value, a signed, fixed-length 64-bit integer.
   */
  sfixed64(value) {
    let chunk = new Uint8Array(8), view = new DataView(chunk.buffer), tc = protoInt64.enc(value);
    view.setInt32(0, tc.lo, true);
    view.setInt32(4, tc.hi, true);
    return this.raw(chunk);
  }
  /**
   * Write a `fixed64` value, an unsigned, fixed-length 64 bit integer.
   */
  fixed64(value) {
    let chunk = new Uint8Array(8), view = new DataView(chunk.buffer), tc = protoInt64.uEnc(value);
    view.setInt32(0, tc.lo, true);
    view.setInt32(4, tc.hi, true);
    return this.raw(chunk);
  }
  /**
   * Write a `int64` value, a signed 64-bit varint.
   */
  int64(value) {
    let tc = protoInt64.enc(value);
    varint64write(tc.lo, tc.hi, this.buf);
    return this;
  }
  /**
   * Write a `sint64` value, a signed, zig-zag-encoded 64-bit varint.
   */
  sint64(value) {
    const tc = protoInt64.enc(value), sign = tc.hi >> 31, lo = tc.lo << 1 ^ sign, hi = (tc.hi << 1 | tc.lo >>> 31) ^ sign;
    varint64write(lo, hi, this.buf);
    return this;
  }
  /**
   * Write a `uint64` value, an unsigned 64-bit varint.
   */
  uint64(value) {
    const tc = protoInt64.uEnc(value);
    varint64write(tc.lo, tc.hi, this.buf);
    return this;
  }
};
var BinaryReader2 = class {
  constructor(buf, decodeUtf8 = getTextEncoding().decodeUtf8) {
    this.decodeUtf8 = decodeUtf8;
    this.varint64 = varint64read;
    this.uint32 = varint32read;
    this.buf = buf;
    this.len = buf.length;
    this.pos = 0;
    this.view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  }
  /**
   * Reads a tag - field number and wire type.
   */
  tag() {
    let tag = this.uint32(), fieldNo = tag >>> 3, wireType = tag & 7;
    if (fieldNo <= 0 || wireType < 0 || wireType > 5)
      throw new Error("illegal tag: field no " + fieldNo + " wire type " + wireType);
    return [fieldNo, wireType];
  }
  /**
   * Skip one element and return the skipped data.
   *
   * When skipping StartGroup, provide the tags field number to check for
   * matching field number in the EndGroup tag.
   */
  skip(wireType, fieldNo) {
    let start = this.pos;
    switch (wireType) {
      case WireType.Varint:
        while (this.buf[this.pos++] & 128) {
        }
        break;
      // @ts-ignore TS7029: Fallthrough case in switch -- ignore instead of expect-error for compiler settings without noFallthroughCasesInSwitch: true
      case WireType.Bit64:
        this.pos += 4;
      case WireType.Bit32:
        this.pos += 4;
        break;
      case WireType.LengthDelimited:
        let len = this.uint32();
        this.pos += len;
        break;
      case WireType.StartGroup:
        for (; ; ) {
          const [fn, wt] = this.tag();
          if (wt === WireType.EndGroup) {
            if (fieldNo !== void 0 && fn !== fieldNo) {
              throw new Error("invalid end group tag");
            }
            break;
          }
          this.skip(wt, fn);
        }
        break;
      default:
        throw new Error("cant skip wire type " + wireType);
    }
    this.assertBounds();
    return this.buf.subarray(start, this.pos);
  }
  /**
   * Throws error if position in byte array is out of range.
   */
  assertBounds() {
    if (this.pos > this.len)
      throw new RangeError("premature EOF");
  }
  /**
   * Read a `int32` field, a signed 32 bit varint.
   */
  int32() {
    return this.uint32() | 0;
  }
  /**
   * Read a `sint32` field, a signed, zigzag-encoded 32-bit varint.
   */
  sint32() {
    let zze = this.uint32();
    return zze >>> 1 ^ -(zze & 1);
  }
  /**
   * Read a `int64` field, a signed 64-bit varint.
   */
  int64() {
    return protoInt64.dec(...this.varint64());
  }
  /**
   * Read a `uint64` field, an unsigned 64-bit varint.
   */
  uint64() {
    return protoInt64.uDec(...this.varint64());
  }
  /**
   * Read a `sint64` field, a signed, zig-zag-encoded 64-bit varint.
   */
  sint64() {
    let [lo, hi] = this.varint64();
    let s = -(lo & 1);
    lo = (lo >>> 1 | (hi & 1) << 31) ^ s;
    hi = hi >>> 1 ^ s;
    return protoInt64.dec(lo, hi);
  }
  /**
   * Read a `bool` field, a variant.
   */
  bool() {
    let [lo, hi] = this.varint64();
    return lo !== 0 || hi !== 0;
  }
  /**
   * Read a `fixed32` field, an unsigned, fixed-length 32-bit integer.
   */
  fixed32() {
    return this.view.getUint32((this.pos += 4) - 4, true);
  }
  /**
   * Read a `sfixed32` field, a signed, fixed-length 32-bit integer.
   */
  sfixed32() {
    return this.view.getInt32((this.pos += 4) - 4, true);
  }
  /**
   * Read a `fixed64` field, an unsigned, fixed-length 64 bit integer.
   */
  fixed64() {
    return protoInt64.uDec(this.sfixed32(), this.sfixed32());
  }
  /**
   * Read a `fixed64` field, a signed, fixed-length 64-bit integer.
   */
  sfixed64() {
    return protoInt64.dec(this.sfixed32(), this.sfixed32());
  }
  /**
   * Read a `float` field, 32-bit floating point number.
   */
  float() {
    return this.view.getFloat32((this.pos += 4) - 4, true);
  }
  /**
   * Read a `double` field, a 64-bit floating point number.
   */
  double() {
    return this.view.getFloat64((this.pos += 8) - 8, true);
  }
  /**
   * Read a `bytes` field, length-delimited arbitrary data.
   */
  bytes() {
    let len = this.uint32(), start = this.pos;
    this.pos += len;
    this.assertBounds();
    return this.buf.subarray(start, start + len);
  }
  /**
   * Read a `string` field, length-delimited data converted to UTF-8 text.
   */
  string() {
    return this.decodeUtf8(this.bytes());
  }
};
function assertInt32(arg) {
  if (typeof arg == "string") {
    arg = Number(arg);
  } else if (typeof arg != "number") {
    throw new Error("invalid int32: " + typeof arg);
  }
  if (!Number.isInteger(arg) || arg > INT32_MAX || arg < INT32_MIN)
    throw new Error("invalid int32: " + arg);
}
function assertUInt32(arg) {
  if (typeof arg == "string") {
    arg = Number(arg);
  } else if (typeof arg != "number") {
    throw new Error("invalid uint32: " + typeof arg);
  }
  if (!Number.isInteger(arg) || arg > UINT32_MAX || arg < 0)
    throw new Error("invalid uint32: " + arg);
}
function assertFloat32(arg) {
  if (typeof arg == "string") {
    const o = arg;
    arg = Number(arg);
    if (Number.isNaN(arg) && o !== "NaN") {
      throw new Error("invalid float32: " + o);
    }
  } else if (typeof arg != "number") {
    throw new Error("invalid float32: " + typeof arg);
  }
  if (Number.isFinite(arg) && (arg > FLOAT32_MAX || arg < FLOAT32_MIN))
    throw new Error("invalid float32: " + arg);
}

// ../../daisi-sdk-typescript/node_modules/long/index.js
var wasm = null;
try {
  wasm = new WebAssembly.Instance(
    new WebAssembly.Module(
      new Uint8Array([
        // \0asm
        0,
        97,
        115,
        109,
        // version 1
        1,
        0,
        0,
        0,
        // section "type"
        1,
        13,
        2,
        // 0, () => i32
        96,
        0,
        1,
        127,
        // 1, (i32, i32, i32, i32) => i32
        96,
        4,
        127,
        127,
        127,
        127,
        1,
        127,
        // section "function"
        3,
        7,
        6,
        // 0, type 0
        0,
        // 1, type 1
        1,
        // 2, type 1
        1,
        // 3, type 1
        1,
        // 4, type 1
        1,
        // 5, type 1
        1,
        // section "global"
        6,
        6,
        1,
        // 0, "high", mutable i32
        127,
        1,
        65,
        0,
        11,
        // section "export"
        7,
        50,
        6,
        // 0, "mul"
        3,
        109,
        117,
        108,
        0,
        1,
        // 1, "div_s"
        5,
        100,
        105,
        118,
        95,
        115,
        0,
        2,
        // 2, "div_u"
        5,
        100,
        105,
        118,
        95,
        117,
        0,
        3,
        // 3, "rem_s"
        5,
        114,
        101,
        109,
        95,
        115,
        0,
        4,
        // 4, "rem_u"
        5,
        114,
        101,
        109,
        95,
        117,
        0,
        5,
        // 5, "get_high"
        8,
        103,
        101,
        116,
        95,
        104,
        105,
        103,
        104,
        0,
        0,
        // section "code"
        10,
        191,
        1,
        6,
        // 0, "get_high"
        4,
        0,
        35,
        0,
        11,
        // 1, "mul"
        36,
        1,
        1,
        126,
        32,
        0,
        173,
        32,
        1,
        173,
        66,
        32,
        134,
        132,
        32,
        2,
        173,
        32,
        3,
        173,
        66,
        32,
        134,
        132,
        126,
        34,
        4,
        66,
        32,
        135,
        167,
        36,
        0,
        32,
        4,
        167,
        11,
        // 2, "div_s"
        36,
        1,
        1,
        126,
        32,
        0,
        173,
        32,
        1,
        173,
        66,
        32,
        134,
        132,
        32,
        2,
        173,
        32,
        3,
        173,
        66,
        32,
        134,
        132,
        127,
        34,
        4,
        66,
        32,
        135,
        167,
        36,
        0,
        32,
        4,
        167,
        11,
        // 3, "div_u"
        36,
        1,
        1,
        126,
        32,
        0,
        173,
        32,
        1,
        173,
        66,
        32,
        134,
        132,
        32,
        2,
        173,
        32,
        3,
        173,
        66,
        32,
        134,
        132,
        128,
        34,
        4,
        66,
        32,
        135,
        167,
        36,
        0,
        32,
        4,
        167,
        11,
        // 4, "rem_s"
        36,
        1,
        1,
        126,
        32,
        0,
        173,
        32,
        1,
        173,
        66,
        32,
        134,
        132,
        32,
        2,
        173,
        32,
        3,
        173,
        66,
        32,
        134,
        132,
        129,
        34,
        4,
        66,
        32,
        135,
        167,
        36,
        0,
        32,
        4,
        167,
        11,
        // 5, "rem_u"
        36,
        1,
        1,
        126,
        32,
        0,
        173,
        32,
        1,
        173,
        66,
        32,
        134,
        132,
        32,
        2,
        173,
        32,
        3,
        173,
        66,
        32,
        134,
        132,
        130,
        34,
        4,
        66,
        32,
        135,
        167,
        36,
        0,
        32,
        4,
        167,
        11
      ])
    ),
    {}
  ).exports;
} catch {
}
function Long(low, high, unsigned) {
  this.low = low | 0;
  this.high = high | 0;
  this.unsigned = !!unsigned;
}
Long.prototype.__isLong__;
Object.defineProperty(Long.prototype, "__isLong__", { value: true });
function isLong(obj) {
  return (obj && obj["__isLong__"]) === true;
}
function ctz32(value) {
  var c = Math.clz32(value & -value);
  return value ? 31 - c : c;
}
Long.isLong = isLong;
var INT_CACHE = {};
var UINT_CACHE = {};
function fromInt(value, unsigned) {
  var obj, cachedObj, cache;
  if (unsigned) {
    value >>>= 0;
    if (cache = 0 <= value && value < 256) {
      cachedObj = UINT_CACHE[value];
      if (cachedObj) return cachedObj;
    }
    obj = fromBits(value, 0, true);
    if (cache) UINT_CACHE[value] = obj;
    return obj;
  } else {
    value |= 0;
    if (cache = -128 <= value && value < 128) {
      cachedObj = INT_CACHE[value];
      if (cachedObj) return cachedObj;
    }
    obj = fromBits(value, value < 0 ? -1 : 0, false);
    if (cache) INT_CACHE[value] = obj;
    return obj;
  }
}
Long.fromInt = fromInt;
function fromNumber(value, unsigned) {
  if (isNaN(value)) return unsigned ? UZERO : ZERO;
  if (unsigned) {
    if (value < 0) return UZERO;
    if (value >= TWO_PWR_64_DBL) return MAX_UNSIGNED_VALUE;
  } else {
    if (value <= -TWO_PWR_63_DBL) return MIN_VALUE;
    if (value + 1 >= TWO_PWR_63_DBL) return MAX_VALUE;
  }
  if (value < 0) return fromNumber(-value, unsigned).neg();
  return fromBits(
    value % TWO_PWR_32_DBL2 | 0,
    value / TWO_PWR_32_DBL2 | 0,
    unsigned
  );
}
Long.fromNumber = fromNumber;
function fromBits(lowBits, highBits, unsigned) {
  return new Long(lowBits, highBits, unsigned);
}
Long.fromBits = fromBits;
var pow_dbl = Math.pow;
function fromString(str, unsigned, radix) {
  if (str.length === 0) throw Error("empty string");
  if (typeof unsigned === "number") {
    radix = unsigned;
    unsigned = false;
  } else {
    unsigned = !!unsigned;
  }
  if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
    return unsigned ? UZERO : ZERO;
  radix = radix || 10;
  if (radix < 2 || 36 < radix) throw RangeError("radix");
  var p;
  if ((p = str.indexOf("-")) > 0) throw Error("interior hyphen");
  else if (p === 0) {
    return fromString(str.substring(1), unsigned, radix).neg();
  }
  var radixToPower = fromNumber(pow_dbl(radix, 8));
  var result = ZERO;
  for (var i = 0; i < str.length; i += 8) {
    var size = Math.min(8, str.length - i), value = parseInt(str.substring(i, i + size), radix);
    if (size < 8) {
      var power = fromNumber(pow_dbl(radix, size));
      result = result.mul(power).add(fromNumber(value));
    } else {
      result = result.mul(radixToPower);
      result = result.add(fromNumber(value));
    }
  }
  result.unsigned = unsigned;
  return result;
}
Long.fromString = fromString;
function fromValue(val, unsigned) {
  if (typeof val === "number") return fromNumber(val, unsigned);
  if (typeof val === "string") return fromString(val, unsigned);
  return fromBits(
    val.low,
    val.high,
    typeof unsigned === "boolean" ? unsigned : val.unsigned
  );
}
Long.fromValue = fromValue;
var TWO_PWR_16_DBL = 1 << 16;
var TWO_PWR_24_DBL = 1 << 24;
var TWO_PWR_32_DBL2 = TWO_PWR_16_DBL * TWO_PWR_16_DBL;
var TWO_PWR_64_DBL = TWO_PWR_32_DBL2 * TWO_PWR_32_DBL2;
var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;
var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);
var ZERO = fromInt(0);
Long.ZERO = ZERO;
var UZERO = fromInt(0, true);
Long.UZERO = UZERO;
var ONE = fromInt(1);
Long.ONE = ONE;
var UONE = fromInt(1, true);
Long.UONE = UONE;
var NEG_ONE = fromInt(-1);
Long.NEG_ONE = NEG_ONE;
var MAX_VALUE = fromBits(4294967295 | 0, 2147483647 | 0, false);
Long.MAX_VALUE = MAX_VALUE;
var MAX_UNSIGNED_VALUE = fromBits(4294967295 | 0, 4294967295 | 0, true);
Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;
var MIN_VALUE = fromBits(0, 2147483648 | 0, false);
Long.MIN_VALUE = MIN_VALUE;
var LongPrototype = Long.prototype;
LongPrototype.toInt = function toInt() {
  return this.unsigned ? this.low >>> 0 : this.low;
};
LongPrototype.toNumber = function toNumber() {
  if (this.unsigned)
    return (this.high >>> 0) * TWO_PWR_32_DBL2 + (this.low >>> 0);
  return this.high * TWO_PWR_32_DBL2 + (this.low >>> 0);
};
LongPrototype.toString = function toString2(radix) {
  radix = radix || 10;
  if (radix < 2 || 36 < radix) throw RangeError("radix");
  if (this.isZero()) return "0";
  if (this.isNegative()) {
    if (this.eq(MIN_VALUE)) {
      var radixLong = fromNumber(radix), div = this.div(radixLong), rem1 = div.mul(radixLong).sub(this);
      return div.toString(radix) + rem1.toInt().toString(radix);
    } else return "-" + this.neg().toString(radix);
  }
  var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned), rem = this;
  var result = "";
  while (true) {
    var remDiv = rem.div(radixToPower), intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0, digits = intval.toString(radix);
    rem = remDiv;
    if (rem.isZero()) return digits + result;
    else {
      while (digits.length < 6) digits = "0" + digits;
      result = "" + digits + result;
    }
  }
};
LongPrototype.getHighBits = function getHighBits() {
  return this.high;
};
LongPrototype.getHighBitsUnsigned = function getHighBitsUnsigned() {
  return this.high >>> 0;
};
LongPrototype.getLowBits = function getLowBits() {
  return this.low;
};
LongPrototype.getLowBitsUnsigned = function getLowBitsUnsigned() {
  return this.low >>> 0;
};
LongPrototype.getNumBitsAbs = function getNumBitsAbs() {
  if (this.isNegative())
    return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
  var val = this.high != 0 ? this.high : this.low;
  for (var bit = 31; bit > 0; bit--) if ((val & 1 << bit) != 0) break;
  return this.high != 0 ? bit + 33 : bit + 1;
};
LongPrototype.isSafeInteger = function isSafeInteger() {
  var top11Bits = this.high >> 21;
  if (!top11Bits) return true;
  if (this.unsigned) return false;
  return top11Bits === -1 && !(this.low === 0 && this.high === -2097152);
};
LongPrototype.isZero = function isZero() {
  return this.high === 0 && this.low === 0;
};
LongPrototype.eqz = LongPrototype.isZero;
LongPrototype.isNegative = function isNegative() {
  return !this.unsigned && this.high < 0;
};
LongPrototype.isPositive = function isPositive() {
  return this.unsigned || this.high >= 0;
};
LongPrototype.isOdd = function isOdd() {
  return (this.low & 1) === 1;
};
LongPrototype.isEven = function isEven() {
  return (this.low & 1) === 0;
};
LongPrototype.equals = function equals(other) {
  if (!isLong(other)) other = fromValue(other);
  if (this.unsigned !== other.unsigned && this.high >>> 31 === 1 && other.high >>> 31 === 1)
    return false;
  return this.high === other.high && this.low === other.low;
};
LongPrototype.eq = LongPrototype.equals;
LongPrototype.notEquals = function notEquals(other) {
  return !this.eq(
    /* validates */
    other
  );
};
LongPrototype.neq = LongPrototype.notEquals;
LongPrototype.ne = LongPrototype.notEquals;
LongPrototype.lessThan = function lessThan(other) {
  return this.comp(
    /* validates */
    other
  ) < 0;
};
LongPrototype.lt = LongPrototype.lessThan;
LongPrototype.lessThanOrEqual = function lessThanOrEqual(other) {
  return this.comp(
    /* validates */
    other
  ) <= 0;
};
LongPrototype.lte = LongPrototype.lessThanOrEqual;
LongPrototype.le = LongPrototype.lessThanOrEqual;
LongPrototype.greaterThan = function greaterThan(other) {
  return this.comp(
    /* validates */
    other
  ) > 0;
};
LongPrototype.gt = LongPrototype.greaterThan;
LongPrototype.greaterThanOrEqual = function greaterThanOrEqual(other) {
  return this.comp(
    /* validates */
    other
  ) >= 0;
};
LongPrototype.gte = LongPrototype.greaterThanOrEqual;
LongPrototype.ge = LongPrototype.greaterThanOrEqual;
LongPrototype.compare = function compare(other) {
  if (!isLong(other)) other = fromValue(other);
  if (this.eq(other)) return 0;
  var thisNeg = this.isNegative(), otherNeg = other.isNegative();
  if (thisNeg && !otherNeg) return -1;
  if (!thisNeg && otherNeg) return 1;
  if (!this.unsigned) return this.sub(other).isNegative() ? -1 : 1;
  return other.high >>> 0 > this.high >>> 0 || other.high === this.high && other.low >>> 0 > this.low >>> 0 ? -1 : 1;
};
LongPrototype.comp = LongPrototype.compare;
LongPrototype.negate = function negate2() {
  if (!this.unsigned && this.eq(MIN_VALUE)) return MIN_VALUE;
  return this.not().add(ONE);
};
LongPrototype.neg = LongPrototype.negate;
LongPrototype.add = function add(addend) {
  if (!isLong(addend)) addend = fromValue(addend);
  var a48 = this.high >>> 16;
  var a32 = this.high & 65535;
  var a16 = this.low >>> 16;
  var a00 = this.low & 65535;
  var b48 = addend.high >>> 16;
  var b32 = addend.high & 65535;
  var b16 = addend.low >>> 16;
  var b00 = addend.low & 65535;
  var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
  c00 += a00 + b00;
  c16 += c00 >>> 16;
  c00 &= 65535;
  c16 += a16 + b16;
  c32 += c16 >>> 16;
  c16 &= 65535;
  c32 += a32 + b32;
  c48 += c32 >>> 16;
  c32 &= 65535;
  c48 += a48 + b48;
  c48 &= 65535;
  return fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
};
LongPrototype.subtract = function subtract(subtrahend) {
  if (!isLong(subtrahend)) subtrahend = fromValue(subtrahend);
  return this.add(subtrahend.neg());
};
LongPrototype.sub = LongPrototype.subtract;
LongPrototype.multiply = function multiply(multiplier) {
  if (this.isZero()) return this;
  if (!isLong(multiplier)) multiplier = fromValue(multiplier);
  if (wasm) {
    var low = wasm["mul"](this.low, this.high, multiplier.low, multiplier.high);
    return fromBits(low, wasm["get_high"](), this.unsigned);
  }
  if (multiplier.isZero()) return this.unsigned ? UZERO : ZERO;
  if (this.eq(MIN_VALUE)) return multiplier.isOdd() ? MIN_VALUE : ZERO;
  if (multiplier.eq(MIN_VALUE)) return this.isOdd() ? MIN_VALUE : ZERO;
  if (this.isNegative()) {
    if (multiplier.isNegative()) return this.neg().mul(multiplier.neg());
    else return this.neg().mul(multiplier).neg();
  } else if (multiplier.isNegative()) return this.mul(multiplier.neg()).neg();
  if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24))
    return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);
  var a48 = this.high >>> 16;
  var a32 = this.high & 65535;
  var a16 = this.low >>> 16;
  var a00 = this.low & 65535;
  var b48 = multiplier.high >>> 16;
  var b32 = multiplier.high & 65535;
  var b16 = multiplier.low >>> 16;
  var b00 = multiplier.low & 65535;
  var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
  c00 += a00 * b00;
  c16 += c00 >>> 16;
  c00 &= 65535;
  c16 += a16 * b00;
  c32 += c16 >>> 16;
  c16 &= 65535;
  c16 += a00 * b16;
  c32 += c16 >>> 16;
  c16 &= 65535;
  c32 += a32 * b00;
  c48 += c32 >>> 16;
  c32 &= 65535;
  c32 += a16 * b16;
  c48 += c32 >>> 16;
  c32 &= 65535;
  c32 += a00 * b32;
  c48 += c32 >>> 16;
  c32 &= 65535;
  c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
  c48 &= 65535;
  return fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
};
LongPrototype.mul = LongPrototype.multiply;
LongPrototype.divide = function divide(divisor) {
  if (!isLong(divisor)) divisor = fromValue(divisor);
  if (divisor.isZero()) throw Error("division by zero");
  if (wasm) {
    if (!this.unsigned && this.high === -2147483648 && divisor.low === -1 && divisor.high === -1) {
      return this;
    }
    var low = (this.unsigned ? wasm["div_u"] : wasm["div_s"])(
      this.low,
      this.high,
      divisor.low,
      divisor.high
    );
    return fromBits(low, wasm["get_high"](), this.unsigned);
  }
  if (this.isZero()) return this.unsigned ? UZERO : ZERO;
  var approx, rem, res;
  if (!this.unsigned) {
    if (this.eq(MIN_VALUE)) {
      if (divisor.eq(ONE) || divisor.eq(NEG_ONE))
        return MIN_VALUE;
      else if (divisor.eq(MIN_VALUE)) return ONE;
      else {
        var halfThis = this.shr(1);
        approx = halfThis.div(divisor).shl(1);
        if (approx.eq(ZERO)) {
          return divisor.isNegative() ? ONE : NEG_ONE;
        } else {
          rem = this.sub(divisor.mul(approx));
          res = approx.add(rem.div(divisor));
          return res;
        }
      }
    } else if (divisor.eq(MIN_VALUE)) return this.unsigned ? UZERO : ZERO;
    if (this.isNegative()) {
      if (divisor.isNegative()) return this.neg().div(divisor.neg());
      return this.neg().div(divisor).neg();
    } else if (divisor.isNegative()) return this.div(divisor.neg()).neg();
    res = ZERO;
  } else {
    if (!divisor.unsigned) divisor = divisor.toUnsigned();
    if (divisor.gt(this)) return UZERO;
    if (divisor.gt(this.shru(1)))
      return UONE;
    res = UZERO;
  }
  rem = this;
  while (rem.gte(divisor)) {
    approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));
    var log2 = Math.ceil(Math.log(approx) / Math.LN2), delta = log2 <= 48 ? 1 : pow_dbl(2, log2 - 48), approxRes = fromNumber(approx), approxRem = approxRes.mul(divisor);
    while (approxRem.isNegative() || approxRem.gt(rem)) {
      approx -= delta;
      approxRes = fromNumber(approx, this.unsigned);
      approxRem = approxRes.mul(divisor);
    }
    if (approxRes.isZero()) approxRes = ONE;
    res = res.add(approxRes);
    rem = rem.sub(approxRem);
  }
  return res;
};
LongPrototype.div = LongPrototype.divide;
LongPrototype.modulo = function modulo(divisor) {
  if (!isLong(divisor)) divisor = fromValue(divisor);
  if (wasm) {
    var low = (this.unsigned ? wasm["rem_u"] : wasm["rem_s"])(
      this.low,
      this.high,
      divisor.low,
      divisor.high
    );
    return fromBits(low, wasm["get_high"](), this.unsigned);
  }
  return this.sub(this.div(divisor).mul(divisor));
};
LongPrototype.mod = LongPrototype.modulo;
LongPrototype.rem = LongPrototype.modulo;
LongPrototype.not = function not() {
  return fromBits(~this.low, ~this.high, this.unsigned);
};
LongPrototype.countLeadingZeros = function countLeadingZeros() {
  return this.high ? Math.clz32(this.high) : Math.clz32(this.low) + 32;
};
LongPrototype.clz = LongPrototype.countLeadingZeros;
LongPrototype.countTrailingZeros = function countTrailingZeros() {
  return this.low ? ctz32(this.low) : ctz32(this.high) + 32;
};
LongPrototype.ctz = LongPrototype.countTrailingZeros;
LongPrototype.and = function and(other) {
  if (!isLong(other)) other = fromValue(other);
  return fromBits(this.low & other.low, this.high & other.high, this.unsigned);
};
LongPrototype.or = function or(other) {
  if (!isLong(other)) other = fromValue(other);
  return fromBits(this.low | other.low, this.high | other.high, this.unsigned);
};
LongPrototype.xor = function xor(other) {
  if (!isLong(other)) other = fromValue(other);
  return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
};
LongPrototype.shiftLeft = function shiftLeft(numBits) {
  if (isLong(numBits)) numBits = numBits.toInt();
  if ((numBits &= 63) === 0) return this;
  else if (numBits < 32)
    return fromBits(
      this.low << numBits,
      this.high << numBits | this.low >>> 32 - numBits,
      this.unsigned
    );
  else return fromBits(0, this.low << numBits - 32, this.unsigned);
};
LongPrototype.shl = LongPrototype.shiftLeft;
LongPrototype.shiftRight = function shiftRight(numBits) {
  if (isLong(numBits)) numBits = numBits.toInt();
  if ((numBits &= 63) === 0) return this;
  else if (numBits < 32)
    return fromBits(
      this.low >>> numBits | this.high << 32 - numBits,
      this.high >> numBits,
      this.unsigned
    );
  else
    return fromBits(
      this.high >> numBits - 32,
      this.high >= 0 ? 0 : -1,
      this.unsigned
    );
};
LongPrototype.shr = LongPrototype.shiftRight;
LongPrototype.shiftRightUnsigned = function shiftRightUnsigned(numBits) {
  if (isLong(numBits)) numBits = numBits.toInt();
  if ((numBits &= 63) === 0) return this;
  if (numBits < 32)
    return fromBits(
      this.low >>> numBits | this.high << 32 - numBits,
      this.high >>> numBits,
      this.unsigned
    );
  if (numBits === 32) return fromBits(this.high, 0, this.unsigned);
  return fromBits(this.high >>> numBits - 32, 0, this.unsigned);
};
LongPrototype.shru = LongPrototype.shiftRightUnsigned;
LongPrototype.shr_u = LongPrototype.shiftRightUnsigned;
LongPrototype.rotateLeft = function rotateLeft(numBits) {
  var b;
  if (isLong(numBits)) numBits = numBits.toInt();
  if ((numBits &= 63) === 0) return this;
  if (numBits === 32) return fromBits(this.high, this.low, this.unsigned);
  if (numBits < 32) {
    b = 32 - numBits;
    return fromBits(
      this.low << numBits | this.high >>> b,
      this.high << numBits | this.low >>> b,
      this.unsigned
    );
  }
  numBits -= 32;
  b = 32 - numBits;
  return fromBits(
    this.high << numBits | this.low >>> b,
    this.low << numBits | this.high >>> b,
    this.unsigned
  );
};
LongPrototype.rotl = LongPrototype.rotateLeft;
LongPrototype.rotateRight = function rotateRight(numBits) {
  var b;
  if (isLong(numBits)) numBits = numBits.toInt();
  if ((numBits &= 63) === 0) return this;
  if (numBits === 32) return fromBits(this.high, this.low, this.unsigned);
  if (numBits < 32) {
    b = 32 - numBits;
    return fromBits(
      this.high << b | this.low >>> numBits,
      this.low << b | this.high >>> numBits,
      this.unsigned
    );
  }
  numBits -= 32;
  b = 32 - numBits;
  return fromBits(
    this.low << b | this.high >>> numBits,
    this.high << b | this.low >>> numBits,
    this.unsigned
  );
};
LongPrototype.rotr = LongPrototype.rotateRight;
LongPrototype.toSigned = function toSigned() {
  if (!this.unsigned) return this;
  return fromBits(this.low, this.high, false);
};
LongPrototype.toUnsigned = function toUnsigned2() {
  if (this.unsigned) return this;
  return fromBits(this.low, this.high, true);
};
LongPrototype.toBytes = function toBytes(le) {
  return le ? this.toBytesLE() : this.toBytesBE();
};
LongPrototype.toBytesLE = function toBytesLE() {
  var hi = this.high, lo = this.low;
  return [
    lo & 255,
    lo >>> 8 & 255,
    lo >>> 16 & 255,
    lo >>> 24,
    hi & 255,
    hi >>> 8 & 255,
    hi >>> 16 & 255,
    hi >>> 24
  ];
};
LongPrototype.toBytesBE = function toBytesBE() {
  var hi = this.high, lo = this.low;
  return [
    hi >>> 24,
    hi >>> 16 & 255,
    hi >>> 8 & 255,
    hi & 255,
    lo >>> 24,
    lo >>> 16 & 255,
    lo >>> 8 & 255,
    lo & 255
  ];
};
Long.fromBytes = function fromBytes(bytes, unsigned, le) {
  return le ? Long.fromBytesLE(bytes, unsigned) : Long.fromBytesBE(bytes, unsigned);
};
Long.fromBytesLE = function fromBytesLE(bytes, unsigned) {
  return new Long(
    bytes[0] | bytes[1] << 8 | bytes[2] << 16 | bytes[3] << 24,
    bytes[4] | bytes[5] << 8 | bytes[6] << 16 | bytes[7] << 24,
    unsigned
  );
};
Long.fromBytesBE = function fromBytesBE(bytes, unsigned) {
  return new Long(
    bytes[4] << 24 | bytes[5] << 16 | bytes[6] << 8 | bytes[7],
    bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3],
    unsigned
  );
};
if (typeof BigInt === "function") {
  Long.fromBigInt = function fromBigInt(value, unsigned) {
    var lowBits = Number(BigInt.asIntN(32, value));
    var highBits = Number(BigInt.asIntN(32, value >> BigInt(32)));
    return fromBits(lowBits, highBits, unsigned);
  };
  Long.fromValue = function fromValueWithBigInt(value, unsigned) {
    if (typeof value === "bigint") return Long.fromBigInt(value, unsigned);
    return fromValue(value, unsigned);
  };
  LongPrototype.toBigInt = function toBigInt() {
    var lowBigInt = BigInt(this.low >>> 0);
    var highBigInt = BigInt(this.unsigned ? this.high >>> 0 : this.high);
    return highBigInt << BigInt(32) | lowBigInt;
  };
}
var long_default = Long;

// ../../daisi-sdk-typescript/dist/web.js
var CLIENT_KEY_HEADER = "x-daisi-client-key";
function isDriveIdentityProvider(provider) {
  return "getAccountId" in provider && "getUserId" in provider && "getUserName" in provider && "getUserRole" in provider;
}
function createAuthMiddleware(provider) {
  return async function* authMiddleware(call, options) {
    const metadata = (0, import_nice_grpc_common2.Metadata)(options.metadata);
    metadata.set(CLIENT_KEY_HEADER, provider.getClientKey());
    if (isDriveIdentityProvider(provider)) {
      metadata.set("x-daisi-account-id", provider.getAccountId());
      metadata.set("x-daisi-user-id", provider.getUserId());
      metadata.set("x-daisi-user-name", provider.getUserName());
      metadata.set("x-daisi-user-role", provider.getUserRole());
    }
    return yield* call.next(call.request, {
      ...options,
      metadata
    });
  };
}

// ../../daisi-sdk-typescript/src/generated/google/protobuf/wrappers.ts
function createBaseInt32Value() {
  return { value: 0 };
}
var Int32Value = {
  encode(message, writer = new BinaryWriter()) {
    if (message.value !== 0) {
      writer.uint32(8).int32(message.value);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader2 ? input : new BinaryReader2(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseInt32Value();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.value = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { value: isSet(object.value) ? globalThis.Number(object.value) : 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.value !== 0) {
      obj.value = Math.round(message.value);
    }
    return obj;
  },
  create(base) {
    return Int32Value.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseInt32Value();
    message.value = object.value ?? 0;
    return message;
  }
};
function createBaseStringValue() {
  return { value: "" };
}
var StringValue = {
  encode(message, writer = new BinaryWriter()) {
    if (message.value !== "") {
      writer.uint32(10).string(message.value);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader2 ? input : new BinaryReader2(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseStringValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.value = reader.string();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { value: isSet(object.value) ? globalThis.String(object.value) : "" };
  },
  toJSON(message) {
    const obj = {};
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },
  create(base) {
    return StringValue.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseStringValue();
    message.value = object.value ?? "";
    return message;
  }
};
function isSet(value) {
  return value !== null && value !== void 0;
}

// ../../daisi-sdk-typescript/src/generated/google/protobuf/timestamp.ts
function createBaseTimestamp() {
  return { seconds: long_default.ZERO, nanos: 0 };
}
var Timestamp = {
  encode(message, writer = new BinaryWriter()) {
    if (!message.seconds.equals(long_default.ZERO)) {
      writer.uint32(8).int64(message.seconds.toString());
    }
    if (message.nanos !== 0) {
      writer.uint32(16).int32(message.nanos);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader2 ? input : new BinaryReader2(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseTimestamp();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.seconds = long_default.fromString(reader.int64().toString());
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.nanos = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      seconds: isSet2(object.seconds) ? long_default.fromValue(object.seconds) : long_default.ZERO,
      nanos: isSet2(object.nanos) ? globalThis.Number(object.nanos) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (!message.seconds.equals(long_default.ZERO)) {
      obj.seconds = (message.seconds || long_default.ZERO).toString();
    }
    if (message.nanos !== 0) {
      obj.nanos = Math.round(message.nanos);
    }
    return obj;
  },
  create(base) {
    return Timestamp.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseTimestamp();
    message.seconds = object.seconds !== void 0 && object.seconds !== null ? long_default.fromValue(object.seconds) : long_default.ZERO;
    message.nanos = object.nanos ?? 0;
    return message;
  }
};
function isSet2(value) {
  return value !== null && value !== void 0;
}

// ../../daisi-sdk-typescript/src/generated/Protos/V1/Models/HostModels.ts
function hostStatusFromJSON(object) {
  switch (object) {
    case 0:
    case "Unknown":
      return 0 /* Unknown */;
    case 1:
    case "Online":
      return 1 /* Online */;
    case 2:
    case "Offline":
      return 2 /* Offline */;
    case 3:
    case "Maintenance":
      return 3 /* Maintenance */;
    case 4:
    case "Archived":
      return 4 /* Archived */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function hostStatusToJSON(object) {
  switch (object) {
    case 0 /* Unknown */:
      return "Unknown";
    case 1 /* Online */:
      return "Online";
    case 2 /* Offline */:
      return "Offline";
    case 3 /* Maintenance */:
      return "Maintenance";
    case 4 /* Archived */:
      return "Archived";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
function createBaseHost() {
  return {
    Id: "",
    Name: "",
    IpAddress: void 0,
    Port: 0,
    DateStarted: void 0,
    DateStopped: void 0,
    DateLastHeartbeat: void 0,
    DateLastSession: void 0,
    OperatingSystem: void 0,
    OperatingSystemVersion: void 0,
    Status: 0,
    Region: "",
    DirectConnect: false,
    PeerConnect: false,
    AppVersion: void 0,
    ReleaseGroup: void 0
  };
}
var Host = {
  encode(message, writer = new BinaryWriter()) {
    if (message.Id !== "") {
      writer.uint32(10).string(message.Id);
    }
    if (message.Name !== "") {
      writer.uint32(18).string(message.Name);
    }
    if (message.IpAddress !== void 0) {
      StringValue.encode({ value: message.IpAddress }, writer.uint32(26).fork()).join();
    }
    if (message.Port !== 0) {
      writer.uint32(32).int32(message.Port);
    }
    if (message.DateStarted !== void 0) {
      Timestamp.encode(toTimestamp(message.DateStarted), writer.uint32(42).fork()).join();
    }
    if (message.DateStopped !== void 0) {
      Timestamp.encode(toTimestamp(message.DateStopped), writer.uint32(50).fork()).join();
    }
    if (message.DateLastHeartbeat !== void 0) {
      Timestamp.encode(toTimestamp(message.DateLastHeartbeat), writer.uint32(58).fork()).join();
    }
    if (message.DateLastSession !== void 0) {
      Timestamp.encode(toTimestamp(message.DateLastSession), writer.uint32(66).fork()).join();
    }
    if (message.OperatingSystem !== void 0) {
      StringValue.encode({ value: message.OperatingSystem }, writer.uint32(74).fork()).join();
    }
    if (message.OperatingSystemVersion !== void 0) {
      StringValue.encode({ value: message.OperatingSystemVersion }, writer.uint32(82).fork()).join();
    }
    if (message.Status !== 0) {
      writer.uint32(88).int32(message.Status);
    }
    if (message.Region !== "") {
      writer.uint32(98).string(message.Region);
    }
    if (message.DirectConnect !== false) {
      writer.uint32(104).bool(message.DirectConnect);
    }
    if (message.PeerConnect !== false) {
      writer.uint32(112).bool(message.PeerConnect);
    }
    if (message.AppVersion !== void 0) {
      StringValue.encode({ value: message.AppVersion }, writer.uint32(122).fork()).join();
    }
    if (message.ReleaseGroup !== void 0) {
      StringValue.encode({ value: message.ReleaseGroup }, writer.uint32(130).fork()).join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader2 ? input : new BinaryReader2(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseHost();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.Id = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.Name = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }
          message.IpAddress = StringValue.decode(reader, reader.uint32()).value;
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }
          message.Port = reader.int32();
          continue;
        }
        case 5: {
          if (tag !== 42) {
            break;
          }
          message.DateStarted = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        }
        case 6: {
          if (tag !== 50) {
            break;
          }
          message.DateStopped = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        }
        case 7: {
          if (tag !== 58) {
            break;
          }
          message.DateLastHeartbeat = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        }
        case 8: {
          if (tag !== 66) {
            break;
          }
          message.DateLastSession = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        }
        case 9: {
          if (tag !== 74) {
            break;
          }
          message.OperatingSystem = StringValue.decode(reader, reader.uint32()).value;
          continue;
        }
        case 10: {
          if (tag !== 82) {
            break;
          }
          message.OperatingSystemVersion = StringValue.decode(reader, reader.uint32()).value;
          continue;
        }
        case 11: {
          if (tag !== 88) {
            break;
          }
          message.Status = reader.int32();
          continue;
        }
        case 12: {
          if (tag !== 98) {
            break;
          }
          message.Region = reader.string();
          continue;
        }
        case 13: {
          if (tag !== 104) {
            break;
          }
          message.DirectConnect = reader.bool();
          continue;
        }
        case 14: {
          if (tag !== 112) {
            break;
          }
          message.PeerConnect = reader.bool();
          continue;
        }
        case 15: {
          if (tag !== 122) {
            break;
          }
          message.AppVersion = StringValue.decode(reader, reader.uint32()).value;
          continue;
        }
        case 16: {
          if (tag !== 130) {
            break;
          }
          message.ReleaseGroup = StringValue.decode(reader, reader.uint32()).value;
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      Id: isSet3(object.Id) ? globalThis.String(object.Id) : "",
      Name: isSet3(object.Name) ? globalThis.String(object.Name) : "",
      IpAddress: isSet3(object.IpAddress) ? String(object.IpAddress) : void 0,
      Port: isSet3(object.Port) ? globalThis.Number(object.Port) : 0,
      DateStarted: isSet3(object.DateStarted) ? fromJsonTimestamp(object.DateStarted) : void 0,
      DateStopped: isSet3(object.DateStopped) ? fromJsonTimestamp(object.DateStopped) : void 0,
      DateLastHeartbeat: isSet3(object.DateLastHeartbeat) ? fromJsonTimestamp(object.DateLastHeartbeat) : void 0,
      DateLastSession: isSet3(object.DateLastSession) ? fromJsonTimestamp(object.DateLastSession) : void 0,
      OperatingSystem: isSet3(object.OperatingSystem) ? String(object.OperatingSystem) : void 0,
      OperatingSystemVersion: isSet3(object.OperatingSystemVersion) ? String(object.OperatingSystemVersion) : void 0,
      Status: isSet3(object.Status) ? hostStatusFromJSON(object.Status) : 0,
      Region: isSet3(object.Region) ? globalThis.String(object.Region) : "",
      DirectConnect: isSet3(object.DirectConnect) ? globalThis.Boolean(object.DirectConnect) : false,
      PeerConnect: isSet3(object.PeerConnect) ? globalThis.Boolean(object.PeerConnect) : false,
      AppVersion: isSet3(object.AppVersion) ? String(object.AppVersion) : void 0,
      ReleaseGroup: isSet3(object.ReleaseGroup) ? String(object.ReleaseGroup) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.Id !== "") {
      obj.Id = message.Id;
    }
    if (message.Name !== "") {
      obj.Name = message.Name;
    }
    if (message.IpAddress !== void 0) {
      obj.IpAddress = message.IpAddress;
    }
    if (message.Port !== 0) {
      obj.Port = Math.round(message.Port);
    }
    if (message.DateStarted !== void 0) {
      obj.DateStarted = message.DateStarted.toISOString();
    }
    if (message.DateStopped !== void 0) {
      obj.DateStopped = message.DateStopped.toISOString();
    }
    if (message.DateLastHeartbeat !== void 0) {
      obj.DateLastHeartbeat = message.DateLastHeartbeat.toISOString();
    }
    if (message.DateLastSession !== void 0) {
      obj.DateLastSession = message.DateLastSession.toISOString();
    }
    if (message.OperatingSystem !== void 0) {
      obj.OperatingSystem = message.OperatingSystem;
    }
    if (message.OperatingSystemVersion !== void 0) {
      obj.OperatingSystemVersion = message.OperatingSystemVersion;
    }
    if (message.Status !== 0) {
      obj.Status = hostStatusToJSON(message.Status);
    }
    if (message.Region !== "") {
      obj.Region = message.Region;
    }
    if (message.DirectConnect !== false) {
      obj.DirectConnect = message.DirectConnect;
    }
    if (message.PeerConnect !== false) {
      obj.PeerConnect = message.PeerConnect;
    }
    if (message.AppVersion !== void 0) {
      obj.AppVersion = message.AppVersion;
    }
    if (message.ReleaseGroup !== void 0) {
      obj.ReleaseGroup = message.ReleaseGroup;
    }
    return obj;
  },
  create(base) {
    return Host.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseHost();
    message.Id = object.Id ?? "";
    message.Name = object.Name ?? "";
    message.IpAddress = object.IpAddress ?? void 0;
    message.Port = object.Port ?? 0;
    message.DateStarted = object.DateStarted ?? void 0;
    message.DateStopped = object.DateStopped ?? void 0;
    message.DateLastHeartbeat = object.DateLastHeartbeat ?? void 0;
    message.DateLastSession = object.DateLastSession ?? void 0;
    message.OperatingSystem = object.OperatingSystem ?? void 0;
    message.OperatingSystemVersion = object.OperatingSystemVersion ?? void 0;
    message.Status = object.Status ?? 0;
    message.Region = object.Region ?? "";
    message.DirectConnect = object.DirectConnect ?? false;
    message.PeerConnect = object.PeerConnect ?? false;
    message.AppVersion = object.AppVersion ?? void 0;
    message.ReleaseGroup = object.ReleaseGroup ?? void 0;
    return message;
  }
};
function createBaseDriveSettings() {
  return { DrivePath: "", MaxDriveStorageBytes: long_default.ZERO, VectorDbEnabled: false, MaxVectorDbAccounts: 0 };
}
var DriveSettings = {
  encode(message, writer = new BinaryWriter()) {
    if (message.DrivePath !== "") {
      writer.uint32(10).string(message.DrivePath);
    }
    if (!message.MaxDriveStorageBytes.equals(long_default.ZERO)) {
      writer.uint32(16).int64(message.MaxDriveStorageBytes.toString());
    }
    if (message.VectorDbEnabled !== false) {
      writer.uint32(24).bool(message.VectorDbEnabled);
    }
    if (message.MaxVectorDbAccounts !== 0) {
      writer.uint32(32).int32(message.MaxVectorDbAccounts);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader2 ? input : new BinaryReader2(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseDriveSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.DrivePath = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.MaxDriveStorageBytes = long_default.fromString(reader.int64().toString());
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.VectorDbEnabled = reader.bool();
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }
          message.MaxVectorDbAccounts = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      DrivePath: isSet3(object.DrivePath) ? globalThis.String(object.DrivePath) : "",
      MaxDriveStorageBytes: isSet3(object.MaxDriveStorageBytes) ? long_default.fromValue(object.MaxDriveStorageBytes) : long_default.ZERO,
      VectorDbEnabled: isSet3(object.VectorDbEnabled) ? globalThis.Boolean(object.VectorDbEnabled) : false,
      MaxVectorDbAccounts: isSet3(object.MaxVectorDbAccounts) ? globalThis.Number(object.MaxVectorDbAccounts) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.DrivePath !== "") {
      obj.DrivePath = message.DrivePath;
    }
    if (!message.MaxDriveStorageBytes.equals(long_default.ZERO)) {
      obj.MaxDriveStorageBytes = (message.MaxDriveStorageBytes || long_default.ZERO).toString();
    }
    if (message.VectorDbEnabled !== false) {
      obj.VectorDbEnabled = message.VectorDbEnabled;
    }
    if (message.MaxVectorDbAccounts !== 0) {
      obj.MaxVectorDbAccounts = Math.round(message.MaxVectorDbAccounts);
    }
    return obj;
  },
  create(base) {
    return DriveSettings.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseDriveSettings();
    message.DrivePath = object.DrivePath ?? "";
    message.MaxDriveStorageBytes = object.MaxDriveStorageBytes !== void 0 && object.MaxDriveStorageBytes !== null ? long_default.fromValue(object.MaxDriveStorageBytes) : long_default.ZERO;
    message.VectorDbEnabled = object.VectorDbEnabled ?? false;
    message.MaxVectorDbAccounts = object.MaxVectorDbAccounts ?? 0;
    return message;
  }
};
function toTimestamp(date) {
  const seconds = numberToLong(Math.trunc(date.getTime() / 1e3));
  const nanos = date.getTime() % 1e3 * 1e6;
  return { seconds, nanos };
}
function fromTimestamp(t) {
  let millis = (t.seconds.toNumber() || 0) * 1e3;
  millis += (t.nanos || 0) / 1e6;
  return new globalThis.Date(millis);
}
function fromJsonTimestamp(o) {
  if (o instanceof globalThis.Date) {
    return o;
  } else if (typeof o === "string") {
    return new globalThis.Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}
function numberToLong(number) {
  return long_default.fromNumber(number);
}
function isSet3(value) {
  return value !== null && value !== void 0;
}

// ../../daisi-sdk-typescript/src/generated/Protos/V1/Models/OrcModels.ts
function orcStatusFromJSON(object) {
  switch (object) {
    case 0:
    case "OrcStatusOffline":
      return 0 /* OrcStatusOffline */;
    case 1:
    case "OrcStatusOnline":
      return 1 /* OrcStatusOnline */;
    case 2:
    case "OrcStatusMaintenance":
      return 2 /* OrcStatusMaintenance */;
    case 3:
    case "OrcStatusArchived":
      return 3 /* OrcStatusArchived */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function orcStatusToJSON(object) {
  switch (object) {
    case 0 /* OrcStatusOffline */:
      return "OrcStatusOffline";
    case 1 /* OrcStatusOnline */:
      return "OrcStatusOnline";
    case 2 /* OrcStatusMaintenance */:
      return "OrcStatusMaintenance";
    case 3 /* OrcStatusArchived */:
      return "OrcStatusArchived";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
function createBaseOrchestrator() {
  return {
    Id: "",
    Name: "",
    Networks: [],
    Domain: "",
    Port: 0,
    RequiresSSL: false,
    OpenConnectionCount: 0,
    DateStart: void 0,
    DateStop: void 0,
    Version: "",
    Status: 0,
    AccountId: "",
    AccountName: ""
  };
}
var Orchestrator = {
  encode(message, writer = new BinaryWriter()) {
    if (message.Id !== "") {
      writer.uint32(10).string(message.Id);
    }
    if (message.Name !== "") {
      writer.uint32(18).string(message.Name);
    }
    for (const v of message.Networks) {
      OrcNetwork.encode(v, writer.uint32(26).fork()).join();
    }
    if (message.Domain !== "") {
      writer.uint32(34).string(message.Domain);
    }
    if (message.Port !== 0) {
      writer.uint32(40).int32(message.Port);
    }
    if (message.RequiresSSL !== false) {
      writer.uint32(48).bool(message.RequiresSSL);
    }
    if (message.OpenConnectionCount !== 0) {
      writer.uint32(56).int32(message.OpenConnectionCount);
    }
    if (message.DateStart !== void 0) {
      Timestamp.encode(toTimestamp2(message.DateStart), writer.uint32(66).fork()).join();
    }
    if (message.DateStop !== void 0) {
      Timestamp.encode(toTimestamp2(message.DateStop), writer.uint32(74).fork()).join();
    }
    if (message.Version !== "") {
      writer.uint32(82).string(message.Version);
    }
    if (message.Status !== 0) {
      writer.uint32(88).int32(message.Status);
    }
    if (message.AccountId !== "") {
      writer.uint32(98).string(message.AccountId);
    }
    if (message.AccountName !== "") {
      writer.uint32(106).string(message.AccountName);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader2 ? input : new BinaryReader2(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseOrchestrator();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.Id = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.Name = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }
          message.Networks.push(OrcNetwork.decode(reader, reader.uint32()));
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }
          message.Domain = reader.string();
          continue;
        }
        case 5: {
          if (tag !== 40) {
            break;
          }
          message.Port = reader.int32();
          continue;
        }
        case 6: {
          if (tag !== 48) {
            break;
          }
          message.RequiresSSL = reader.bool();
          continue;
        }
        case 7: {
          if (tag !== 56) {
            break;
          }
          message.OpenConnectionCount = reader.int32();
          continue;
        }
        case 8: {
          if (tag !== 66) {
            break;
          }
          message.DateStart = fromTimestamp2(Timestamp.decode(reader, reader.uint32()));
          continue;
        }
        case 9: {
          if (tag !== 74) {
            break;
          }
          message.DateStop = fromTimestamp2(Timestamp.decode(reader, reader.uint32()));
          continue;
        }
        case 10: {
          if (tag !== 82) {
            break;
          }
          message.Version = reader.string();
          continue;
        }
        case 11: {
          if (tag !== 88) {
            break;
          }
          message.Status = reader.int32();
          continue;
        }
        case 12: {
          if (tag !== 98) {
            break;
          }
          message.AccountId = reader.string();
          continue;
        }
        case 13: {
          if (tag !== 106) {
            break;
          }
          message.AccountName = reader.string();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      Id: isSet4(object.Id) ? globalThis.String(object.Id) : "",
      Name: isSet4(object.Name) ? globalThis.String(object.Name) : "",
      Networks: globalThis.Array.isArray(object?.Networks) ? object.Networks.map((e) => OrcNetwork.fromJSON(e)) : [],
      Domain: isSet4(object.Domain) ? globalThis.String(object.Domain) : "",
      Port: isSet4(object.Port) ? globalThis.Number(object.Port) : 0,
      RequiresSSL: isSet4(object.RequiresSSL) ? globalThis.Boolean(object.RequiresSSL) : false,
      OpenConnectionCount: isSet4(object.OpenConnectionCount) ? globalThis.Number(object.OpenConnectionCount) : 0,
      DateStart: isSet4(object.DateStart) ? fromJsonTimestamp2(object.DateStart) : void 0,
      DateStop: isSet4(object.DateStop) ? fromJsonTimestamp2(object.DateStop) : void 0,
      Version: isSet4(object.Version) ? globalThis.String(object.Version) : "",
      Status: isSet4(object.Status) ? orcStatusFromJSON(object.Status) : 0,
      AccountId: isSet4(object.AccountId) ? globalThis.String(object.AccountId) : "",
      AccountName: isSet4(object.AccountName) ? globalThis.String(object.AccountName) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.Id !== "") {
      obj.Id = message.Id;
    }
    if (message.Name !== "") {
      obj.Name = message.Name;
    }
    if (message.Networks?.length) {
      obj.Networks = message.Networks.map((e) => OrcNetwork.toJSON(e));
    }
    if (message.Domain !== "") {
      obj.Domain = message.Domain;
    }
    if (message.Port !== 0) {
      obj.Port = Math.round(message.Port);
    }
    if (message.RequiresSSL !== false) {
      obj.RequiresSSL = message.RequiresSSL;
    }
    if (message.OpenConnectionCount !== 0) {
      obj.OpenConnectionCount = Math.round(message.OpenConnectionCount);
    }
    if (message.DateStart !== void 0) {
      obj.DateStart = message.DateStart.toISOString();
    }
    if (message.DateStop !== void 0) {
      obj.DateStop = message.DateStop.toISOString();
    }
    if (message.Version !== "") {
      obj.Version = message.Version;
    }
    if (message.Status !== 0) {
      obj.Status = orcStatusToJSON(message.Status);
    }
    if (message.AccountId !== "") {
      obj.AccountId = message.AccountId;
    }
    if (message.AccountName !== "") {
      obj.AccountName = message.AccountName;
    }
    return obj;
  },
  create(base) {
    return Orchestrator.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseOrchestrator();
    message.Id = object.Id ?? "";
    message.Name = object.Name ?? "";
    message.Networks = object.Networks?.map((e) => OrcNetwork.fromPartial(e)) || [];
    message.Domain = object.Domain ?? "";
    message.Port = object.Port ?? 0;
    message.RequiresSSL = object.RequiresSSL ?? false;
    message.OpenConnectionCount = object.OpenConnectionCount ?? 0;
    message.DateStart = object.DateStart ?? void 0;
    message.DateStop = object.DateStop ?? void 0;
    message.Version = object.Version ?? "";
    message.Status = object.Status ?? 0;
    message.AccountId = object.AccountId ?? "";
    message.AccountName = object.AccountName ?? "";
    return message;
  }
};
function createBaseOrcNetwork() {
  return { Id: "", Name: "", IsPublic: false };
}
var OrcNetwork = {
  encode(message, writer = new BinaryWriter()) {
    if (message.Id !== "") {
      writer.uint32(10).string(message.Id);
    }
    if (message.Name !== "") {
      writer.uint32(18).string(message.Name);
    }
    if (message.IsPublic !== false) {
      writer.uint32(24).bool(message.IsPublic);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader2 ? input : new BinaryReader2(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseOrcNetwork();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.Id = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.Name = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.IsPublic = reader.bool();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      Id: isSet4(object.Id) ? globalThis.String(object.Id) : "",
      Name: isSet4(object.Name) ? globalThis.String(object.Name) : "",
      IsPublic: isSet4(object.IsPublic) ? globalThis.Boolean(object.IsPublic) : false
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.Id !== "") {
      obj.Id = message.Id;
    }
    if (message.Name !== "") {
      obj.Name = message.Name;
    }
    if (message.IsPublic !== false) {
      obj.IsPublic = message.IsPublic;
    }
    return obj;
  },
  create(base) {
    return OrcNetwork.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseOrcNetwork();
    message.Id = object.Id ?? "";
    message.Name = object.Name ?? "";
    message.IsPublic = object.IsPublic ?? false;
    return message;
  }
};
function toTimestamp2(date) {
  const seconds = numberToLong2(Math.trunc(date.getTime() / 1e3));
  const nanos = date.getTime() % 1e3 * 1e6;
  return { seconds, nanos };
}
function fromTimestamp2(t) {
  let millis = (t.seconds.toNumber() || 0) * 1e3;
  millis += (t.nanos || 0) / 1e6;
  return new globalThis.Date(millis);
}
function fromJsonTimestamp2(o) {
  if (o instanceof globalThis.Date) {
    return o;
  } else if (typeof o === "string") {
    return new globalThis.Date(o);
  } else {
    return fromTimestamp2(Timestamp.fromJSON(o));
  }
}
function numberToLong2(number) {
  return long_default.fromNumber(number);
}
function isSet4(value) {
  return value !== null && value !== void 0;
}

// ../../daisi-sdk-typescript/src/generated/Protos/V1/Models/SessionModels.ts
function createBaseCreateSessionRequest() {
  return {
    ModelName: "",
    DirectConnectRequired: false,
    PreferredHostNames: [],
    PreferredRegion: void 0,
    NetworkName: void 0,
    HostId: void 0
  };
}
var CreateSessionRequest = {
  encode(message, writer = new BinaryWriter()) {
    if (message.ModelName !== "") {
      writer.uint32(10).string(message.ModelName);
    }
    if (message.DirectConnectRequired !== false) {
      writer.uint32(16).bool(message.DirectConnectRequired);
    }
    for (const v of message.PreferredHostNames) {
      StringValue.encode({ value: v }, writer.uint32(26).fork()).join();
    }
    if (message.PreferredRegion !== void 0) {
      StringValue.encode({ value: message.PreferredRegion }, writer.uint32(34).fork()).join();
    }
    if (message.NetworkName !== void 0) {
      StringValue.encode({ value: message.NetworkName }, writer.uint32(42).fork()).join();
    }
    if (message.HostId !== void 0) {
      StringValue.encode({ value: message.HostId }, writer.uint32(50).fork()).join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader2 ? input : new BinaryReader2(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseCreateSessionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.ModelName = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.DirectConnectRequired = reader.bool();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }
          message.PreferredHostNames.push(StringValue.decode(reader, reader.uint32()).value);
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }
          message.PreferredRegion = StringValue.decode(reader, reader.uint32()).value;
          continue;
        }
        case 5: {
          if (tag !== 42) {
            break;
          }
          message.NetworkName = StringValue.decode(reader, reader.uint32()).value;
          continue;
        }
        case 6: {
          if (tag !== 50) {
            break;
          }
          message.HostId = StringValue.decode(reader, reader.uint32()).value;
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      ModelName: isSet5(object.ModelName) ? globalThis.String(object.ModelName) : "",
      DirectConnectRequired: isSet5(object.DirectConnectRequired) ? globalThis.Boolean(object.DirectConnectRequired) : false,
      PreferredHostNames: globalThis.Array.isArray(object?.PreferredHostNames) ? object.PreferredHostNames.map((e) => String(e)) : [],
      PreferredRegion: isSet5(object.PreferredRegion) ? String(object.PreferredRegion) : void 0,
      NetworkName: isSet5(object.NetworkName) ? String(object.NetworkName) : void 0,
      HostId: isSet5(object.HostId) ? String(object.HostId) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.ModelName !== "") {
      obj.ModelName = message.ModelName;
    }
    if (message.DirectConnectRequired !== false) {
      obj.DirectConnectRequired = message.DirectConnectRequired;
    }
    if (message.PreferredHostNames?.length) {
      obj.PreferredHostNames = message.PreferredHostNames;
    }
    if (message.PreferredRegion !== void 0) {
      obj.PreferredRegion = message.PreferredRegion;
    }
    if (message.NetworkName !== void 0) {
      obj.NetworkName = message.NetworkName;
    }
    if (message.HostId !== void 0) {
      obj.HostId = message.HostId;
    }
    return obj;
  },
  create(base) {
    return CreateSessionRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseCreateSessionRequest();
    message.ModelName = object.ModelName ?? "";
    message.DirectConnectRequired = object.DirectConnectRequired ?? false;
    message.PreferredHostNames = object.PreferredHostNames?.map((e) => e) || [];
    message.PreferredRegion = object.PreferredRegion ?? void 0;
    message.NetworkName = object.NetworkName ?? void 0;
    message.HostId = object.HostId ?? void 0;
    return message;
  }
};
function createBaseCreateSessionResponse() {
  return { Id: "", Success: false, Host: void 0, MoveToOrc: void 0 };
}
var CreateSessionResponse = {
  encode(message, writer = new BinaryWriter()) {
    if (message.Id !== "") {
      writer.uint32(10).string(message.Id);
    }
    if (message.Success !== false) {
      writer.uint32(16).bool(message.Success);
    }
    if (message.Host !== void 0) {
      Host.encode(message.Host, writer.uint32(26).fork()).join();
    }
    if (message.MoveToOrc !== void 0) {
      Orchestrator.encode(message.MoveToOrc, writer.uint32(34).fork()).join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader2 ? input : new BinaryReader2(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseCreateSessionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.Id = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.Success = reader.bool();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }
          message.Host = Host.decode(reader, reader.uint32());
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }
          message.MoveToOrc = Orchestrator.decode(reader, reader.uint32());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      Id: isSet5(object.Id) ? globalThis.String(object.Id) : "",
      Success: isSet5(object.Success) ? globalThis.Boolean(object.Success) : false,
      Host: isSet5(object.Host) ? Host.fromJSON(object.Host) : void 0,
      MoveToOrc: isSet5(object.MoveToOrc) ? Orchestrator.fromJSON(object.MoveToOrc) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.Id !== "") {
      obj.Id = message.Id;
    }
    if (message.Success !== false) {
      obj.Success = message.Success;
    }
    if (message.Host !== void 0) {
      obj.Host = Host.toJSON(message.Host);
    }
    if (message.MoveToOrc !== void 0) {
      obj.MoveToOrc = Orchestrator.toJSON(message.MoveToOrc);
    }
    return obj;
  },
  create(base) {
    return CreateSessionResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseCreateSessionResponse();
    message.Id = object.Id ?? "";
    message.Success = object.Success ?? false;
    message.Host = object.Host !== void 0 && object.Host !== null ? Host.fromPartial(object.Host) : void 0;
    message.MoveToOrc = object.MoveToOrc !== void 0 && object.MoveToOrc !== null ? Orchestrator.fromPartial(object.MoveToOrc) : void 0;
    return message;
  }
};
function createBaseClaimSessionRequest() {
  return { Id: "" };
}
var ClaimSessionRequest = {
  encode(message, writer = new BinaryWriter()) {
    if (message.Id !== "") {
      writer.uint32(10).string(message.Id);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader2 ? input : new BinaryReader2(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseClaimSessionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.Id = reader.string();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { Id: isSet5(object.Id) ? globalThis.String(object.Id) : "" };
  },
  toJSON(message) {
    const obj = {};
    if (message.Id !== "") {
      obj.Id = message.Id;
    }
    return obj;
  },
  create(base) {
    return ClaimSessionRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseClaimSessionRequest();
    message.Id = object.Id ?? "";
    return message;
  }
};
function createBaseClaimSessionResponse() {
  return { Success: false, ModelName: void 0 };
}
var ClaimSessionResponse = {
  encode(message, writer = new BinaryWriter()) {
    if (message.Success !== false) {
      writer.uint32(8).bool(message.Success);
    }
    if (message.ModelName !== void 0) {
      StringValue.encode({ value: message.ModelName }, writer.uint32(18).fork()).join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader2 ? input : new BinaryReader2(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseClaimSessionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.Success = reader.bool();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.ModelName = StringValue.decode(reader, reader.uint32()).value;
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      Success: isSet5(object.Success) ? globalThis.Boolean(object.Success) : false,
      ModelName: isSet5(object.ModelName) ? String(object.ModelName) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.Success !== false) {
      obj.Success = message.Success;
    }
    if (message.ModelName !== void 0) {
      obj.ModelName = message.ModelName;
    }
    return obj;
  },
  create(base) {
    return ClaimSessionResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseClaimSessionResponse();
    message.Success = object.Success ?? false;
    message.ModelName = object.ModelName ?? void 0;
    return message;
  }
};
function createBaseCloseSessionRequest() {
  return { Id: "" };
}
var CloseSessionRequest = {
  encode(message, writer = new BinaryWriter()) {
    if (message.Id !== "") {
      writer.uint32(10).string(message.Id);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader2 ? input : new BinaryReader2(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseCloseSessionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.Id = reader.string();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { Id: isSet5(object.Id) ? globalThis.String(object.Id) : "" };
  },
  toJSON(message) {
    const obj = {};
    if (message.Id !== "") {
      obj.Id = message.Id;
    }
    return obj;
  },
  create(base) {
    return CloseSessionRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseCloseSessionRequest();
    message.Id = object.Id ?? "";
    return message;
  }
};
function createBaseCloseSessionResponse() {
  return { Success: false };
}
var CloseSessionResponse = {
  encode(message, writer = new BinaryWriter()) {
    if (message.Success !== false) {
      writer.uint32(8).bool(message.Success);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader2 ? input : new BinaryReader2(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseCloseSessionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.Success = reader.bool();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { Success: isSet5(object.Success) ? globalThis.Boolean(object.Success) : false };
  },
  toJSON(message) {
    const obj = {};
    if (message.Success !== false) {
      obj.Success = message.Success;
    }
    return obj;
  },
  create(base) {
    return CloseSessionResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseCloseSessionResponse();
    message.Success = object.Success ?? false;
    return message;
  }
};
function createBaseConnectRequest() {
  return { SessionId: "" };
}
var ConnectRequest = {
  encode(message, writer = new BinaryWriter()) {
    if (message.SessionId !== "") {
      writer.uint32(10).string(message.SessionId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader2 ? input : new BinaryReader2(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseConnectRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.SessionId = reader.string();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { SessionId: isSet5(object.SessionId) ? globalThis.String(object.SessionId) : "" };
  },
  toJSON(message) {
    const obj = {};
    if (message.SessionId !== "") {
      obj.SessionId = message.SessionId;
    }
    return obj;
  },
  create(base) {
    return ConnectRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseConnectRequest();
    message.SessionId = object.SessionId ?? "";
    return message;
  }
};
function createBaseConnectResponse() {
  return { Id: "", HasCapacity: false, AlreadyConnected: false };
}
var ConnectResponse = {
  encode(message, writer = new BinaryWriter()) {
    if (message.Id !== "") {
      writer.uint32(10).string(message.Id);
    }
    if (message.HasCapacity !== false) {
      writer.uint32(16).bool(message.HasCapacity);
    }
    if (message.AlreadyConnected !== false) {
      writer.uint32(24).bool(message.AlreadyConnected);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader2 ? input : new BinaryReader2(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseConnectResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.Id = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.HasCapacity = reader.bool();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.AlreadyConnected = reader.bool();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      Id: isSet5(object.Id) ? globalThis.String(object.Id) : "",
      HasCapacity: isSet5(object.HasCapacity) ? globalThis.Boolean(object.HasCapacity) : false,
      AlreadyConnected: isSet5(object.AlreadyConnected) ? globalThis.Boolean(object.AlreadyConnected) : false
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.Id !== "") {
      obj.Id = message.Id;
    }
    if (message.HasCapacity !== false) {
      obj.HasCapacity = message.HasCapacity;
    }
    if (message.AlreadyConnected !== false) {
      obj.AlreadyConnected = message.AlreadyConnected;
    }
    return obj;
  },
  create(base) {
    return ConnectResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseConnectResponse();
    message.Id = object.Id ?? "";
    message.HasCapacity = object.HasCapacity ?? false;
    message.AlreadyConnected = object.AlreadyConnected ?? false;
    return message;
  }
};
function isSet5(value) {
  return value !== null && value !== void 0;
}

// ../../daisi-sdk-typescript/src/generated/Protos/V1/Sessions.ts
var SessionsProtoDefinition = {
  name: "SessionsProto",
  fullName: "daisi.protos.v1.SessionsProto",
  methods: {
    create: {
      name: "Create",
      requestType: CreateSessionRequest,
      requestStream: false,
      responseType: CreateSessionResponse,
      responseStream: false,
      options: {}
    },
    claim: {
      name: "Claim",
      requestType: ClaimSessionRequest,
      requestStream: false,
      responseType: ClaimSessionResponse,
      responseStream: false,
      options: {}
    },
    close: {
      name: "Close",
      requestType: CloseSessionRequest,
      requestStream: false,
      responseType: CloseSessionResponse,
      responseStream: false,
      options: {}
    },
    connect: {
      name: "Connect",
      requestType: ConnectRequest,
      requestStream: false,
      responseType: ConnectResponse,
      responseStream: false,
      options: {}
    }
  }
};

// ../../daisi-sdk-typescript/src/generated/Protos/V1/Models/InferenceModels.ts
function inferenceCloseReasonsFromJSON(object) {
  switch (object) {
    case 0:
    case "CloseTimeout":
      return 0 /* CloseTimeout */;
    case 1:
    case "CloseHostClosing":
      return 1 /* CloseHostClosing */;
    case 2:
    case "CloseError":
      return 2 /* CloseError */;
    case 3:
    case "CloseRequestedByClient":
      return 3 /* CloseRequestedByClient */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function inferenceCloseReasonsToJSON(object) {
  switch (object) {
    case 0 /* CloseTimeout */:
      return "CloseTimeout";
    case 1 /* CloseHostClosing */:
      return "CloseHostClosing";
    case 2 /* CloseError */:
      return "CloseError";
    case 3 /* CloseRequestedByClient */:
      return "CloseRequestedByClient";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
function thinkLevelsFromJSON(object) {
  switch (object) {
    case 0:
    case "ThinkLevelsBasic":
      return 0 /* ThinkLevelsBasic */;
    case 1:
    case "ThinkLevelsBasicWithTools":
      return 1 /* ThinkLevelsBasicWithTools */;
    case 2:
    case "ThinkLevelsSkilled":
      return 2 /* ThinkLevelsSkilled */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function thinkLevelsToJSON(object) {
  switch (object) {
    case 0 /* ThinkLevelsBasic */:
      return "ThinkLevelsBasic";
    case 1 /* ThinkLevelsBasicWithTools */:
      return "ThinkLevelsBasicWithTools";
    case 2 /* ThinkLevelsSkilled */:
      return "ThinkLevelsSkilled";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
function inferenceResponseTypesFromJSON(object) {
  switch (object) {
    case 0:
    case "InferenceResponseTypesError":
      return 0 /* InferenceResponseTypesError */;
    case 1:
    case "InferenceResponseTypesThinking":
      return 1 /* InferenceResponseTypesThinking */;
    case 2:
    case "InferenceResponseTypesTooling":
      return 2 /* InferenceResponseTypesTooling */;
    case 3:
    case "InferenceResponseTypesToolContent":
      return 3 /* InferenceResponseTypesToolContent */;
    case 4:
    case "InferenceResponseTypesText":
      return 4 /* InferenceResponseTypesText */;
    case 5:
    case "InferenceResponseTypesImage":
      return 5 /* InferenceResponseTypesImage */;
    case 6:
    case "InferenceResponseTypesAudio":
      return 6 /* InferenceResponseTypesAudio */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function inferenceResponseTypesToJSON(object) {
  switch (object) {
    case 0 /* InferenceResponseTypesError */:
      return "InferenceResponseTypesError";
    case 1 /* InferenceResponseTypesThinking */:
      return "InferenceResponseTypesThinking";
    case 2 /* InferenceResponseTypesTooling */:
      return "InferenceResponseTypesTooling";
    case 3 /* InferenceResponseTypesToolContent */:
      return "InferenceResponseTypesToolContent";
    case 4 /* InferenceResponseTypesText */:
      return "InferenceResponseTypesText";
    case 5 /* InferenceResponseTypesImage */:
      return "InferenceResponseTypesImage";
    case 6 /* InferenceResponseTypesAudio */:
      return "InferenceResponseTypesAudio";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
function inferenceOutputFormatsFromJSON(object) {
  switch (object) {
    case 0:
    case "InferenceOutputFormatsPlainText":
      return 0 /* InferenceOutputFormatsPlainText */;
    case 1:
    case "InferenceOutputFormatsJson":
      return 1 /* InferenceOutputFormatsJson */;
    case 2:
    case "InferenceOutputFormatsMarkdown":
      return 2 /* InferenceOutputFormatsMarkdown */;
    case 3:
    case "InferenceOutputFormatsBase64":
      return 3 /* InferenceOutputFormatsBase64 */;
    case 4:
    case "InferenceOutputFormatsHtml":
      return 4 /* InferenceOutputFormatsHtml */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function inferenceOutputFormatsToJSON(object) {
  switch (object) {
    case 0 /* InferenceOutputFormatsPlainText */:
      return "InferenceOutputFormatsPlainText";
    case 1 /* InferenceOutputFormatsJson */:
      return "InferenceOutputFormatsJson";
    case 2 /* InferenceOutputFormatsMarkdown */:
      return "InferenceOutputFormatsMarkdown";
    case 3 /* InferenceOutputFormatsBase64 */:
      return "InferenceOutputFormatsBase64";
    case 4 /* InferenceOutputFormatsHtml */:
      return "InferenceOutputFormatsHtml";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
function inferenceToolGroupsFromJSON(object) {
  switch (object) {
    case 0:
    case "InferenceToolGroupsInformationTools":
      return 0 /* InferenceToolGroupsInformationTools */;
    case 1:
    case "InferenceToolGroupsFileTools":
      return 1 /* InferenceToolGroupsFileTools */;
    case 2:
    case "InferenceToolGroupsMathTools":
      return 2 /* InferenceToolGroupsMathTools */;
    case 3:
    case "InferenceToolGroupsCommunicationTools":
      return 3 /* InferenceToolGroupsCommunicationTools */;
    case 4:
    case "InferenceToolGroupsCodingTools":
      return 4 /* InferenceToolGroupsCodingTools */;
    case 5:
    case "InferenceToolGroupsMediaTools":
      return 5 /* InferenceToolGroupsMediaTools */;
    case 6:
    case "InferenceToolGroupsIntegrationTools":
      return 6 /* InferenceToolGroupsIntegrationTools */;
    case 7:
    case "InferenceToolGroupsSocialTools":
      return 7 /* InferenceToolGroupsSocialTools */;
    case 8:
    case "InferenceToolGroupsShellTools":
      return 8 /* InferenceToolGroupsShellTools */;
    case 9:
    case "InferenceToolGroupsScreenTools":
      return 9 /* InferenceToolGroupsScreenTools */;
    case 10:
    case "InferenceToolGroupsInputTools":
      return 10 /* InferenceToolGroupsInputTools */;
    case 11:
    case "InferenceToolGroupsClipboardTools":
      return 11 /* InferenceToolGroupsClipboardTools */;
    case 12:
    case "InferenceToolGroupsBrowserTools":
      return 12 /* InferenceToolGroupsBrowserTools */;
    case 13:
    case "InferenceToolGroupsWindowTools":
      return 13 /* InferenceToolGroupsWindowTools */;
    case 14:
    case "InferenceToolGroupsSystemTools":
      return 14 /* InferenceToolGroupsSystemTools */;
    case 15:
    case "InferenceToolGroupsGitTools":
      return 15 /* InferenceToolGroupsGitTools */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function inferenceToolGroupsToJSON(object) {
  switch (object) {
    case 0 /* InferenceToolGroupsInformationTools */:
      return "InferenceToolGroupsInformationTools";
    case 1 /* InferenceToolGroupsFileTools */:
      return "InferenceToolGroupsFileTools";
    case 2 /* InferenceToolGroupsMathTools */:
      return "InferenceToolGroupsMathTools";
    case 3 /* InferenceToolGroupsCommunicationTools */:
      return "InferenceToolGroupsCommunicationTools";
    case 4 /* InferenceToolGroupsCodingTools */:
      return "InferenceToolGroupsCodingTools";
    case 5 /* InferenceToolGroupsMediaTools */:
      return "InferenceToolGroupsMediaTools";
    case 6 /* InferenceToolGroupsIntegrationTools */:
      return "InferenceToolGroupsIntegrationTools";
    case 7 /* InferenceToolGroupsSocialTools */:
      return "InferenceToolGroupsSocialTools";
    case 8 /* InferenceToolGroupsShellTools */:
      return "InferenceToolGroupsShellTools";
    case 9 /* InferenceToolGroupsScreenTools */:
      return "InferenceToolGroupsScreenTools";
    case 10 /* InferenceToolGroupsInputTools */:
      return "InferenceToolGroupsInputTools";
    case 11 /* InferenceToolGroupsClipboardTools */:
      return "InferenceToolGroupsClipboardTools";
    case 12 /* InferenceToolGroupsBrowserTools */:
      return "InferenceToolGroupsBrowserTools";
    case 13 /* InferenceToolGroupsWindowTools */:
      return "InferenceToolGroupsWindowTools";
    case 14 /* InferenceToolGroupsSystemTools */:
      return "InferenceToolGroupsSystemTools";
    case 15 /* InferenceToolGroupsGitTools */:
      return "InferenceToolGroupsGitTools";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
function createBaseSendInferenceRequest() {
  return {
    SessionId: "",
    InferenceId: "",
    Text: "",
    ToolGroup: void 0,
    ToolName: void 0,
    AntiPrompts: [],
    TokensKeep: void 0,
    MaxTokens: void 0,
    DecodeSpecialTokens: void 0,
    Temperature: void 0,
    TopP: void 0,
    TopK: void 0,
    RepeatPenalty: void 0,
    Seed: void 0,
    FrequencyPenalty: void 0,
    PresencePenalty: void 0,
    MinKeep: void 0,
    MinP: void 0,
    PenalizeNewline: void 0,
    PenaltyCount: void 0,
    PreventEOS: void 0,
    TypicalP: void 0,
    ThinkLevel: void 0,
    OutputFormat: void 0,
    ExampleOutput: void 0
  };
}
var SendInferenceRequest = {
  encode(message, writer = new BinaryWriter()) {
    if (message.SessionId !== "") {
      writer.uint32(10).string(message.SessionId);
    }
    if (message.InferenceId !== "") {
      writer.uint32(18).string(message.InferenceId);
    }
    if (message.Text !== "") {
      writer.uint32(26).string(message.Text);
    }
    if (message.ToolGroup !== void 0) {
      writer.uint32(32).int32(message.ToolGroup);
    }
    if (message.ToolName !== void 0) {
      writer.uint32(42).string(message.ToolName);
    }
    for (const v of message.AntiPrompts) {
      writer.uint32(50).string(v);
    }
    if (message.TokensKeep !== void 0) {
      writer.uint32(56).int32(message.TokensKeep);
    }
    if (message.MaxTokens !== void 0) {
      writer.uint32(64).int32(message.MaxTokens);
    }
    if (message.DecodeSpecialTokens !== void 0) {
      writer.uint32(72).bool(message.DecodeSpecialTokens);
    }
    if (message.Temperature !== void 0) {
      writer.uint32(85).float(message.Temperature);
    }
    if (message.TopP !== void 0) {
      writer.uint32(93).float(message.TopP);
    }
    if (message.TopK !== void 0) {
      writer.uint32(96).int32(message.TopK);
    }
    if (message.RepeatPenalty !== void 0) {
      writer.uint32(109).float(message.RepeatPenalty);
    }
    if (message.Seed !== void 0) {
      writer.uint32(112).int32(message.Seed);
    }
    if (message.FrequencyPenalty !== void 0) {
      writer.uint32(125).float(message.FrequencyPenalty);
    }
    if (message.PresencePenalty !== void 0) {
      writer.uint32(133).float(message.PresencePenalty);
    }
    if (message.MinKeep !== void 0) {
      writer.uint32(136).int32(message.MinKeep);
    }
    if (message.MinP !== void 0) {
      writer.uint32(149).float(message.MinP);
    }
    if (message.PenalizeNewline !== void 0) {
      writer.uint32(152).bool(message.PenalizeNewline);
    }
    if (message.PenaltyCount !== void 0) {
      writer.uint32(160).int32(message.PenaltyCount);
    }
    if (message.PreventEOS !== void 0) {
      writer.uint32(168).bool(message.PreventEOS);
    }
    if (message.TypicalP !== void 0) {
      writer.uint32(181).float(message.TypicalP);
    }
    if (message.ThinkLevel !== void 0) {
      writer.uint32(184).int32(message.ThinkLevel);
    }
    if (message.OutputFormat !== void 0) {
      writer.uint32(192).int32(message.OutputFormat);
    }
    if (message.ExampleOutput !== void 0) {
      writer.uint32(202).string(message.ExampleOutput);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader2 ? input : new BinaryReader2(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseSendInferenceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.SessionId = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.InferenceId = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }
          message.Text = reader.string();
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }
          message.ToolGroup = reader.int32();
          continue;
        }
        case 5: {
          if (tag !== 42) {
            break;
          }
          message.ToolName = reader.string();
          continue;
        }
        case 6: {
          if (tag !== 50) {
            break;
          }
          message.AntiPrompts.push(reader.string());
          continue;
        }
        case 7: {
          if (tag !== 56) {
            break;
          }
          message.TokensKeep = reader.int32();
          continue;
        }
        case 8: {
          if (tag !== 64) {
            break;
          }
          message.MaxTokens = reader.int32();
          continue;
        }
        case 9: {
          if (tag !== 72) {
            break;
          }
          message.DecodeSpecialTokens = reader.bool();
          continue;
        }
        case 10: {
          if (tag !== 85) {
            break;
          }
          message.Temperature = reader.float();
          continue;
        }
        case 11: {
          if (tag !== 93) {
            break;
          }
          message.TopP = reader.float();
          continue;
        }
        case 12: {
          if (tag !== 96) {
            break;
          }
          message.TopK = reader.int32();
          continue;
        }
        case 13: {
          if (tag !== 109) {
            break;
          }
          message.RepeatPenalty = reader.float();
          continue;
        }
        case 14: {
          if (tag !== 112) {
            break;
          }
          message.Seed = reader.int32();
          continue;
        }
        case 15: {
          if (tag !== 125) {
            break;
          }
          message.FrequencyPenalty = reader.float();
          continue;
        }
        case 16: {
          if (tag !== 133) {
            break;
          }
          message.PresencePenalty = reader.float();
          continue;
        }
        case 17: {
          if (tag !== 136) {
            break;
          }
          message.MinKeep = reader.int32();
          continue;
        }
        case 18: {
          if (tag !== 149) {
            break;
          }
          message.MinP = reader.float();
          continue;
        }
        case 19: {
          if (tag !== 152) {
            break;
          }
          message.PenalizeNewline = reader.bool();
          continue;
        }
        case 20: {
          if (tag !== 160) {
            break;
          }
          message.PenaltyCount = reader.int32();
          continue;
        }
        case 21: {
          if (tag !== 168) {
            break;
          }
          message.PreventEOS = reader.bool();
          continue;
        }
        case 22: {
          if (tag !== 181) {
            break;
          }
          message.TypicalP = reader.float();
          continue;
        }
        case 23: {
          if (tag !== 184) {
            break;
          }
          message.ThinkLevel = reader.int32();
          continue;
        }
        case 24: {
          if (tag !== 192) {
            break;
          }
          message.OutputFormat = reader.int32();
          continue;
        }
        case 25: {
          if (tag !== 202) {
            break;
          }
          message.ExampleOutput = reader.string();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      SessionId: isSet6(object.SessionId) ? globalThis.String(object.SessionId) : "",
      InferenceId: isSet6(object.InferenceId) ? globalThis.String(object.InferenceId) : "",
      Text: isSet6(object.Text) ? globalThis.String(object.Text) : "",
      ToolGroup: isSet6(object.ToolGroup) ? inferenceToolGroupsFromJSON(object.ToolGroup) : void 0,
      ToolName: isSet6(object.ToolName) ? globalThis.String(object.ToolName) : void 0,
      AntiPrompts: globalThis.Array.isArray(object?.AntiPrompts) ? object.AntiPrompts.map((e) => globalThis.String(e)) : [],
      TokensKeep: isSet6(object.TokensKeep) ? globalThis.Number(object.TokensKeep) : void 0,
      MaxTokens: isSet6(object.MaxTokens) ? globalThis.Number(object.MaxTokens) : void 0,
      DecodeSpecialTokens: isSet6(object.DecodeSpecialTokens) ? globalThis.Boolean(object.DecodeSpecialTokens) : void 0,
      Temperature: isSet6(object.Temperature) ? globalThis.Number(object.Temperature) : void 0,
      TopP: isSet6(object.TopP) ? globalThis.Number(object.TopP) : void 0,
      TopK: isSet6(object.TopK) ? globalThis.Number(object.TopK) : void 0,
      RepeatPenalty: isSet6(object.RepeatPenalty) ? globalThis.Number(object.RepeatPenalty) : void 0,
      Seed: isSet6(object.Seed) ? globalThis.Number(object.Seed) : void 0,
      FrequencyPenalty: isSet6(object.FrequencyPenalty) ? globalThis.Number(object.FrequencyPenalty) : void 0,
      PresencePenalty: isSet6(object.PresencePenalty) ? globalThis.Number(object.PresencePenalty) : void 0,
      MinKeep: isSet6(object.MinKeep) ? globalThis.Number(object.MinKeep) : void 0,
      MinP: isSet6(object.MinP) ? globalThis.Number(object.MinP) : void 0,
      PenalizeNewline: isSet6(object.PenalizeNewline) ? globalThis.Boolean(object.PenalizeNewline) : void 0,
      PenaltyCount: isSet6(object.PenaltyCount) ? globalThis.Number(object.PenaltyCount) : void 0,
      PreventEOS: isSet6(object.PreventEOS) ? globalThis.Boolean(object.PreventEOS) : void 0,
      TypicalP: isSet6(object.TypicalP) ? globalThis.Number(object.TypicalP) : void 0,
      ThinkLevel: isSet6(object.ThinkLevel) ? thinkLevelsFromJSON(object.ThinkLevel) : void 0,
      OutputFormat: isSet6(object.OutputFormat) ? inferenceOutputFormatsFromJSON(object.OutputFormat) : void 0,
      ExampleOutput: isSet6(object.ExampleOutput) ? globalThis.String(object.ExampleOutput) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.SessionId !== "") {
      obj.SessionId = message.SessionId;
    }
    if (message.InferenceId !== "") {
      obj.InferenceId = message.InferenceId;
    }
    if (message.Text !== "") {
      obj.Text = message.Text;
    }
    if (message.ToolGroup !== void 0) {
      obj.ToolGroup = inferenceToolGroupsToJSON(message.ToolGroup);
    }
    if (message.ToolName !== void 0) {
      obj.ToolName = message.ToolName;
    }
    if (message.AntiPrompts?.length) {
      obj.AntiPrompts = message.AntiPrompts;
    }
    if (message.TokensKeep !== void 0) {
      obj.TokensKeep = Math.round(message.TokensKeep);
    }
    if (message.MaxTokens !== void 0) {
      obj.MaxTokens = Math.round(message.MaxTokens);
    }
    if (message.DecodeSpecialTokens !== void 0) {
      obj.DecodeSpecialTokens = message.DecodeSpecialTokens;
    }
    if (message.Temperature !== void 0) {
      obj.Temperature = message.Temperature;
    }
    if (message.TopP !== void 0) {
      obj.TopP = message.TopP;
    }
    if (message.TopK !== void 0) {
      obj.TopK = Math.round(message.TopK);
    }
    if (message.RepeatPenalty !== void 0) {
      obj.RepeatPenalty = message.RepeatPenalty;
    }
    if (message.Seed !== void 0) {
      obj.Seed = Math.round(message.Seed);
    }
    if (message.FrequencyPenalty !== void 0) {
      obj.FrequencyPenalty = message.FrequencyPenalty;
    }
    if (message.PresencePenalty !== void 0) {
      obj.PresencePenalty = message.PresencePenalty;
    }
    if (message.MinKeep !== void 0) {
      obj.MinKeep = Math.round(message.MinKeep);
    }
    if (message.MinP !== void 0) {
      obj.MinP = message.MinP;
    }
    if (message.PenalizeNewline !== void 0) {
      obj.PenalizeNewline = message.PenalizeNewline;
    }
    if (message.PenaltyCount !== void 0) {
      obj.PenaltyCount = Math.round(message.PenaltyCount);
    }
    if (message.PreventEOS !== void 0) {
      obj.PreventEOS = message.PreventEOS;
    }
    if (message.TypicalP !== void 0) {
      obj.TypicalP = message.TypicalP;
    }
    if (message.ThinkLevel !== void 0) {
      obj.ThinkLevel = thinkLevelsToJSON(message.ThinkLevel);
    }
    if (message.OutputFormat !== void 0) {
      obj.OutputFormat = inferenceOutputFormatsToJSON(message.OutputFormat);
    }
    if (message.ExampleOutput !== void 0) {
      obj.ExampleOutput = message.ExampleOutput;
    }
    return obj;
  },
  create(base) {
    return SendInferenceRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseSendInferenceRequest();
    message.SessionId = object.SessionId ?? "";
    message.InferenceId = object.InferenceId ?? "";
    message.Text = object.Text ?? "";
    message.ToolGroup = object.ToolGroup ?? void 0;
    message.ToolName = object.ToolName ?? void 0;
    message.AntiPrompts = object.AntiPrompts?.map((e) => e) || [];
    message.TokensKeep = object.TokensKeep ?? void 0;
    message.MaxTokens = object.MaxTokens ?? void 0;
    message.DecodeSpecialTokens = object.DecodeSpecialTokens ?? void 0;
    message.Temperature = object.Temperature ?? void 0;
    message.TopP = object.TopP ?? void 0;
    message.TopK = object.TopK ?? void 0;
    message.RepeatPenalty = object.RepeatPenalty ?? void 0;
    message.Seed = object.Seed ?? void 0;
    message.FrequencyPenalty = object.FrequencyPenalty ?? void 0;
    message.PresencePenalty = object.PresencePenalty ?? void 0;
    message.MinKeep = object.MinKeep ?? void 0;
    message.MinP = object.MinP ?? void 0;
    message.PenalizeNewline = object.PenalizeNewline ?? void 0;
    message.PenaltyCount = object.PenaltyCount ?? void 0;
    message.PreventEOS = object.PreventEOS ?? void 0;
    message.TypicalP = object.TypicalP ?? void 0;
    message.ThinkLevel = object.ThinkLevel ?? void 0;
    message.OutputFormat = object.OutputFormat ?? void 0;
    message.ExampleOutput = object.ExampleOutput ?? void 0;
    return message;
  }
};
function createBaseSendInferenceResponse() {
  return {
    SessionId: "",
    InferenceId: "",
    Id: "",
    Type: 0,
    Content: "",
    AuthorRole: "",
    Format: 0,
    MessageTokenCount: 0,
    SessionTokenCount: 0,
    ComputeTimeMs: 0
  };
}
var SendInferenceResponse = {
  encode(message, writer = new BinaryWriter()) {
    if (message.SessionId !== "") {
      writer.uint32(10).string(message.SessionId);
    }
    if (message.InferenceId !== "") {
      writer.uint32(18).string(message.InferenceId);
    }
    if (message.Id !== "") {
      writer.uint32(26).string(message.Id);
    }
    if (message.Type !== 0) {
      writer.uint32(32).int32(message.Type);
    }
    if (message.Content !== "") {
      writer.uint32(42).string(message.Content);
    }
    if (message.AuthorRole !== "") {
      writer.uint32(50).string(message.AuthorRole);
    }
    if (message.Format !== 0) {
      writer.uint32(56).int32(message.Format);
    }
    if (message.MessageTokenCount !== 0) {
      writer.uint32(64).int32(message.MessageTokenCount);
    }
    if (message.SessionTokenCount !== 0) {
      writer.uint32(72).int32(message.SessionTokenCount);
    }
    if (message.ComputeTimeMs !== 0) {
      writer.uint32(80).int32(message.ComputeTimeMs);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader2 ? input : new BinaryReader2(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseSendInferenceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.SessionId = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.InferenceId = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }
          message.Id = reader.string();
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }
          message.Type = reader.int32();
          continue;
        }
        case 5: {
          if (tag !== 42) {
            break;
          }
          message.Content = reader.string();
          continue;
        }
        case 6: {
          if (tag !== 50) {
            break;
          }
          message.AuthorRole = reader.string();
          continue;
        }
        case 7: {
          if (tag !== 56) {
            break;
          }
          message.Format = reader.int32();
          continue;
        }
        case 8: {
          if (tag !== 64) {
            break;
          }
          message.MessageTokenCount = reader.int32();
          continue;
        }
        case 9: {
          if (tag !== 72) {
            break;
          }
          message.SessionTokenCount = reader.int32();
          continue;
        }
        case 10: {
          if (tag !== 80) {
            break;
          }
          message.ComputeTimeMs = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      SessionId: isSet6(object.SessionId) ? globalThis.String(object.SessionId) : "",
      InferenceId: isSet6(object.InferenceId) ? globalThis.String(object.InferenceId) : "",
      Id: isSet6(object.Id) ? globalThis.String(object.Id) : "",
      Type: isSet6(object.Type) ? inferenceResponseTypesFromJSON(object.Type) : 0,
      Content: isSet6(object.Content) ? globalThis.String(object.Content) : "",
      AuthorRole: isSet6(object.AuthorRole) ? globalThis.String(object.AuthorRole) : "",
      Format: isSet6(object.Format) ? inferenceOutputFormatsFromJSON(object.Format) : 0,
      MessageTokenCount: isSet6(object.MessageTokenCount) ? globalThis.Number(object.MessageTokenCount) : 0,
      SessionTokenCount: isSet6(object.SessionTokenCount) ? globalThis.Number(object.SessionTokenCount) : 0,
      ComputeTimeMs: isSet6(object.ComputeTimeMs) ? globalThis.Number(object.ComputeTimeMs) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.SessionId !== "") {
      obj.SessionId = message.SessionId;
    }
    if (message.InferenceId !== "") {
      obj.InferenceId = message.InferenceId;
    }
    if (message.Id !== "") {
      obj.Id = message.Id;
    }
    if (message.Type !== 0) {
      obj.Type = inferenceResponseTypesToJSON(message.Type);
    }
    if (message.Content !== "") {
      obj.Content = message.Content;
    }
    if (message.AuthorRole !== "") {
      obj.AuthorRole = message.AuthorRole;
    }
    if (message.Format !== 0) {
      obj.Format = inferenceOutputFormatsToJSON(message.Format);
    }
    if (message.MessageTokenCount !== 0) {
      obj.MessageTokenCount = Math.round(message.MessageTokenCount);
    }
    if (message.SessionTokenCount !== 0) {
      obj.SessionTokenCount = Math.round(message.SessionTokenCount);
    }
    if (message.ComputeTimeMs !== 0) {
      obj.ComputeTimeMs = Math.round(message.ComputeTimeMs);
    }
    return obj;
  },
  create(base) {
    return SendInferenceResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseSendInferenceResponse();
    message.SessionId = object.SessionId ?? "";
    message.InferenceId = object.InferenceId ?? "";
    message.Id = object.Id ?? "";
    message.Type = object.Type ?? 0;
    message.Content = object.Content ?? "";
    message.AuthorRole = object.AuthorRole ?? "";
    message.Format = object.Format ?? 0;
    message.MessageTokenCount = object.MessageTokenCount ?? 0;
    message.SessionTokenCount = object.SessionTokenCount ?? 0;
    message.ComputeTimeMs = object.ComputeTimeMs ?? 0;
    return message;
  }
};
function createBaseInferenceStatsRequest() {
  return { SessionId: "", InferenceId: "" };
}
var InferenceStatsRequest = {
  encode(message, writer = new BinaryWriter()) {
    if (message.SessionId !== "") {
      writer.uint32(10).string(message.SessionId);
    }
    if (message.InferenceId !== "") {
      writer.uint32(18).string(message.InferenceId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader2 ? input : new BinaryReader2(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseInferenceStatsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.SessionId = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.InferenceId = reader.string();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      SessionId: isSet6(object.SessionId) ? globalThis.String(object.SessionId) : "",
      InferenceId: isSet6(object.InferenceId) ? globalThis.String(object.InferenceId) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.SessionId !== "") {
      obj.SessionId = message.SessionId;
    }
    if (message.InferenceId !== "") {
      obj.InferenceId = message.InferenceId;
    }
    return obj;
  },
  create(base) {
    return InferenceStatsRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseInferenceStatsRequest();
    message.SessionId = object.SessionId ?? "";
    message.InferenceId = object.InferenceId ?? "";
    return message;
  }
};
function createBaseInferenceStatsResponse() {
  return {
    SessionId: "",
    InferenceId: "",
    Success: false,
    LastMessageTokenCount: 0,
    SessionTokenCount: 0,
    LastMessageToolCount: 0,
    SessionToolCount: 0,
    LastMessageComputeTimeMs: 0,
    SessionComputeTimeMs: 0
  };
}
var InferenceStatsResponse = {
  encode(message, writer = new BinaryWriter()) {
    if (message.SessionId !== "") {
      writer.uint32(10).string(message.SessionId);
    }
    if (message.InferenceId !== "") {
      writer.uint32(18).string(message.InferenceId);
    }
    if (message.Success !== false) {
      writer.uint32(24).bool(message.Success);
    }
    if (message.LastMessageTokenCount !== 0) {
      writer.uint32(32).int32(message.LastMessageTokenCount);
    }
    if (message.SessionTokenCount !== 0) {
      writer.uint32(40).int32(message.SessionTokenCount);
    }
    if (message.LastMessageToolCount !== 0) {
      writer.uint32(48).int32(message.LastMessageToolCount);
    }
    if (message.SessionToolCount !== 0) {
      writer.uint32(56).int32(message.SessionToolCount);
    }
    if (message.LastMessageComputeTimeMs !== 0) {
      writer.uint32(64).int32(message.LastMessageComputeTimeMs);
    }
    if (message.SessionComputeTimeMs !== 0) {
      writer.uint32(72).int32(message.SessionComputeTimeMs);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader2 ? input : new BinaryReader2(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseInferenceStatsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.SessionId = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.InferenceId = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.Success = reader.bool();
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }
          message.LastMessageTokenCount = reader.int32();
          continue;
        }
        case 5: {
          if (tag !== 40) {
            break;
          }
          message.SessionTokenCount = reader.int32();
          continue;
        }
        case 6: {
          if (tag !== 48) {
            break;
          }
          message.LastMessageToolCount = reader.int32();
          continue;
        }
        case 7: {
          if (tag !== 56) {
            break;
          }
          message.SessionToolCount = reader.int32();
          continue;
        }
        case 8: {
          if (tag !== 64) {
            break;
          }
          message.LastMessageComputeTimeMs = reader.int32();
          continue;
        }
        case 9: {
          if (tag !== 72) {
            break;
          }
          message.SessionComputeTimeMs = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      SessionId: isSet6(object.SessionId) ? globalThis.String(object.SessionId) : "",
      InferenceId: isSet6(object.InferenceId) ? globalThis.String(object.InferenceId) : "",
      Success: isSet6(object.Success) ? globalThis.Boolean(object.Success) : false,
      LastMessageTokenCount: isSet6(object.LastMessageTokenCount) ? globalThis.Number(object.LastMessageTokenCount) : 0,
      SessionTokenCount: isSet6(object.SessionTokenCount) ? globalThis.Number(object.SessionTokenCount) : 0,
      LastMessageToolCount: isSet6(object.LastMessageToolCount) ? globalThis.Number(object.LastMessageToolCount) : 0,
      SessionToolCount: isSet6(object.SessionToolCount) ? globalThis.Number(object.SessionToolCount) : 0,
      LastMessageComputeTimeMs: isSet6(object.LastMessageComputeTimeMs) ? globalThis.Number(object.LastMessageComputeTimeMs) : 0,
      SessionComputeTimeMs: isSet6(object.SessionComputeTimeMs) ? globalThis.Number(object.SessionComputeTimeMs) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.SessionId !== "") {
      obj.SessionId = message.SessionId;
    }
    if (message.InferenceId !== "") {
      obj.InferenceId = message.InferenceId;
    }
    if (message.Success !== false) {
      obj.Success = message.Success;
    }
    if (message.LastMessageTokenCount !== 0) {
      obj.LastMessageTokenCount = Math.round(message.LastMessageTokenCount);
    }
    if (message.SessionTokenCount !== 0) {
      obj.SessionTokenCount = Math.round(message.SessionTokenCount);
    }
    if (message.LastMessageToolCount !== 0) {
      obj.LastMessageToolCount = Math.round(message.LastMessageToolCount);
    }
    if (message.SessionToolCount !== 0) {
      obj.SessionToolCount = Math.round(message.SessionToolCount);
    }
    if (message.LastMessageComputeTimeMs !== 0) {
      obj.LastMessageComputeTimeMs = Math.round(message.LastMessageComputeTimeMs);
    }
    if (message.SessionComputeTimeMs !== 0) {
      obj.SessionComputeTimeMs = Math.round(message.SessionComputeTimeMs);
    }
    return obj;
  },
  create(base) {
    return InferenceStatsResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseInferenceStatsResponse();
    message.SessionId = object.SessionId ?? "";
    message.InferenceId = object.InferenceId ?? "";
    message.Success = object.Success ?? false;
    message.LastMessageTokenCount = object.LastMessageTokenCount ?? 0;
    message.SessionTokenCount = object.SessionTokenCount ?? 0;
    message.LastMessageToolCount = object.LastMessageToolCount ?? 0;
    message.SessionToolCount = object.SessionToolCount ?? 0;
    message.LastMessageComputeTimeMs = object.LastMessageComputeTimeMs ?? 0;
    message.SessionComputeTimeMs = object.SessionComputeTimeMs ?? 0;
    return message;
  }
};
function createBaseCreateInferenceRequest() {
  return { SessionId: "", ModelName: "", InitializationPrompt: "", ThinkLevel: 0, ToolGroups: [] };
}
var CreateInferenceRequest = {
  encode(message, writer = new BinaryWriter()) {
    if (message.SessionId !== "") {
      writer.uint32(10).string(message.SessionId);
    }
    if (message.ModelName !== "") {
      writer.uint32(18).string(message.ModelName);
    }
    if (message.InitializationPrompt !== "") {
      writer.uint32(26).string(message.InitializationPrompt);
    }
    if (message.ThinkLevel !== 0) {
      writer.uint32(32).int32(message.ThinkLevel);
    }
    writer.uint32(42).fork();
    for (const v of message.ToolGroups) {
      writer.int32(v);
    }
    writer.join();
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader2 ? input : new BinaryReader2(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseCreateInferenceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.SessionId = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.ModelName = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }
          message.InitializationPrompt = reader.string();
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }
          message.ThinkLevel = reader.int32();
          continue;
        }
        case 5: {
          if (tag === 40) {
            message.ToolGroups.push(reader.int32());
            continue;
          }
          if (tag === 42) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.ToolGroups.push(reader.int32());
            }
            continue;
          }
          break;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      SessionId: isSet6(object.SessionId) ? globalThis.String(object.SessionId) : "",
      ModelName: isSet6(object.ModelName) ? globalThis.String(object.ModelName) : "",
      InitializationPrompt: isSet6(object.InitializationPrompt) ? globalThis.String(object.InitializationPrompt) : "",
      ThinkLevel: isSet6(object.ThinkLevel) ? thinkLevelsFromJSON(object.ThinkLevel) : 0,
      ToolGroups: globalThis.Array.isArray(object?.ToolGroups) ? object.ToolGroups.map((e) => inferenceToolGroupsFromJSON(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.SessionId !== "") {
      obj.SessionId = message.SessionId;
    }
    if (message.ModelName !== "") {
      obj.ModelName = message.ModelName;
    }
    if (message.InitializationPrompt !== "") {
      obj.InitializationPrompt = message.InitializationPrompt;
    }
    if (message.ThinkLevel !== 0) {
      obj.ThinkLevel = thinkLevelsToJSON(message.ThinkLevel);
    }
    if (message.ToolGroups?.length) {
      obj.ToolGroups = message.ToolGroups.map((e) => inferenceToolGroupsToJSON(e));
    }
    return obj;
  },
  create(base) {
    return CreateInferenceRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseCreateInferenceRequest();
    message.SessionId = object.SessionId ?? "";
    message.ModelName = object.ModelName ?? "";
    message.InitializationPrompt = object.InitializationPrompt ?? "";
    message.ThinkLevel = object.ThinkLevel ?? 0;
    message.ToolGroups = object.ToolGroups?.map((e) => e) || [];
    return message;
  }
};
function createBaseCreateInferenceResponse() {
  return { SessionId: "", InferenceId: "" };
}
var CreateInferenceResponse = {
  encode(message, writer = new BinaryWriter()) {
    if (message.SessionId !== "") {
      writer.uint32(10).string(message.SessionId);
    }
    if (message.InferenceId !== "") {
      writer.uint32(18).string(message.InferenceId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader2 ? input : new BinaryReader2(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseCreateInferenceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.SessionId = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.InferenceId = reader.string();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      SessionId: isSet6(object.SessionId) ? globalThis.String(object.SessionId) : "",
      InferenceId: isSet6(object.InferenceId) ? globalThis.String(object.InferenceId) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.SessionId !== "") {
      obj.SessionId = message.SessionId;
    }
    if (message.InferenceId !== "") {
      obj.InferenceId = message.InferenceId;
    }
    return obj;
  },
  create(base) {
    return CreateInferenceResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseCreateInferenceResponse();
    message.SessionId = object.SessionId ?? "";
    message.InferenceId = object.InferenceId ?? "";
    return message;
  }
};
function createBaseCloseInferenceRequest() {
  return { SessionId: "", InferenceId: "", Reason: 0 };
}
var CloseInferenceRequest = {
  encode(message, writer = new BinaryWriter()) {
    if (message.SessionId !== "") {
      writer.uint32(10).string(message.SessionId);
    }
    if (message.InferenceId !== "") {
      writer.uint32(18).string(message.InferenceId);
    }
    if (message.Reason !== 0) {
      writer.uint32(24).int32(message.Reason);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader2 ? input : new BinaryReader2(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseCloseInferenceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.SessionId = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.InferenceId = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.Reason = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      SessionId: isSet6(object.SessionId) ? globalThis.String(object.SessionId) : "",
      InferenceId: isSet6(object.InferenceId) ? globalThis.String(object.InferenceId) : "",
      Reason: isSet6(object.Reason) ? inferenceCloseReasonsFromJSON(object.Reason) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.SessionId !== "") {
      obj.SessionId = message.SessionId;
    }
    if (message.InferenceId !== "") {
      obj.InferenceId = message.InferenceId;
    }
    if (message.Reason !== 0) {
      obj.Reason = inferenceCloseReasonsToJSON(message.Reason);
    }
    return obj;
  },
  create(base) {
    return CloseInferenceRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseCloseInferenceRequest();
    message.SessionId = object.SessionId ?? "";
    message.InferenceId = object.InferenceId ?? "";
    message.Reason = object.Reason ?? 0;
    return message;
  }
};
function createBaseCloseInferenceResponse() {
  return { SessionId: "", InferenceId: "", Success: false };
}
var CloseInferenceResponse = {
  encode(message, writer = new BinaryWriter()) {
    if (message.SessionId !== "") {
      writer.uint32(10).string(message.SessionId);
    }
    if (message.InferenceId !== "") {
      writer.uint32(18).string(message.InferenceId);
    }
    if (message.Success !== false) {
      writer.uint32(24).bool(message.Success);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader2 ? input : new BinaryReader2(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseCloseInferenceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.SessionId = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.InferenceId = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.Success = reader.bool();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      SessionId: isSet6(object.SessionId) ? globalThis.String(object.SessionId) : "",
      InferenceId: isSet6(object.InferenceId) ? globalThis.String(object.InferenceId) : "",
      Success: isSet6(object.Success) ? globalThis.Boolean(object.Success) : false
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.SessionId !== "") {
      obj.SessionId = message.SessionId;
    }
    if (message.InferenceId !== "") {
      obj.InferenceId = message.InferenceId;
    }
    if (message.Success !== false) {
      obj.Success = message.Success;
    }
    return obj;
  },
  create(base) {
    return CloseInferenceResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseCloseInferenceResponse();
    message.SessionId = object.SessionId ?? "";
    message.InferenceId = object.InferenceId ?? "";
    message.Success = object.Success ?? false;
    return message;
  }
};
function isSet6(value) {
  return value !== null && value !== void 0;
}

// ../../daisi-sdk-typescript/src/generated/Protos/V1/Inferences.ts
var InferencesProtoDefinition = {
  name: "InferencesProto",
  fullName: "daisi.protos.v1.InferencesProto",
  methods: {
    create: {
      name: "Create",
      requestType: CreateInferenceRequest,
      requestStream: false,
      responseType: CreateInferenceResponse,
      responseStream: false,
      options: {}
    },
    send: {
      name: "Send",
      requestType: SendInferenceRequest,
      requestStream: false,
      responseType: SendInferenceResponse,
      responseStream: true,
      options: {}
    },
    stats: {
      name: "Stats",
      requestType: InferenceStatsRequest,
      requestStream: false,
      responseType: InferenceStatsResponse,
      responseStream: false,
      options: {}
    },
    close: {
      name: "Close",
      requestType: CloseInferenceRequest,
      requestStream: false,
      responseType: CloseInferenceResponse,
      responseStream: false,
      options: {}
    }
  }
};

// src/orc-connection.ts
var import_nice_grpc_web2 = __toESM(require_lib3(), 1);

// ../../daisi-sdk-typescript/src/generated/google/protobuf/any.ts
function createBaseAny() {
  return { typeUrl: "", value: new Uint8Array(0) };
}
var Any = {
  encode(message, writer = new BinaryWriter()) {
    if (message.typeUrl !== "") {
      writer.uint32(10).string(message.typeUrl);
    }
    if (message.value.length !== 0) {
      writer.uint32(18).bytes(message.value);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader2 ? input : new BinaryReader2(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAny();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.typeUrl = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.value = reader.bytes();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      typeUrl: isSet7(object.typeUrl) ? globalThis.String(object.typeUrl) : isSet7(object.type_url) ? globalThis.String(object.type_url) : "",
      value: isSet7(object.value) ? bytesFromBase64(object.value) : new Uint8Array(0)
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.typeUrl !== "") {
      obj.typeUrl = message.typeUrl;
    }
    if (message.value.length !== 0) {
      obj.value = base64FromBytes(message.value);
    }
    return obj;
  },
  create(base) {
    return Any.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAny();
    message.typeUrl = object.typeUrl ?? "";
    message.value = object.value ?? new Uint8Array(0);
    return message;
  }
};
function bytesFromBase64(b64) {
  if (globalThis.Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}
function base64FromBytes(arr) {
  if (globalThis.Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin = [];
    arr.forEach((byte) => {
      bin.push(globalThis.String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
}
function isSet7(value) {
  return value !== null && value !== void 0;
}

// ../../daisi-sdk-typescript/src/generated/Protos/V1/Models/PeerModels.ts
function createBasePeer() {
  return { Name: "", IpAddress: "", Port: 0 };
}
var Peer = {
  encode(message, writer = new BinaryWriter()) {
    if (message.Name !== "") {
      writer.uint32(10).string(message.Name);
    }
    if (message.IpAddress !== "") {
      writer.uint32(18).string(message.IpAddress);
    }
    if (message.Port !== 0) {
      writer.uint32(24).int32(message.Port);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader2 ? input : new BinaryReader2(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBasePeer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.Name = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.IpAddress = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.Port = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      Name: isSet8(object.Name) ? globalThis.String(object.Name) : "",
      IpAddress: isSet8(object.IpAddress) ? globalThis.String(object.IpAddress) : "",
      Port: isSet8(object.Port) ? globalThis.Number(object.Port) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.Name !== "") {
      obj.Name = message.Name;
    }
    if (message.IpAddress !== "") {
      obj.IpAddress = message.IpAddress;
    }
    if (message.Port !== 0) {
      obj.Port = Math.round(message.Port);
    }
    return obj;
  },
  create(base) {
    return Peer.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBasePeer();
    message.Name = object.Name ?? "";
    message.IpAddress = object.IpAddress ?? "";
    message.Port = object.Port ?? 0;
    return message;
  }
};
function isSet8(value) {
  return value !== null && value !== void 0;
}

// ../../daisi-sdk-typescript/src/generated/Protos/V1/Models/SettingsModels.ts
function lLamaRuntimesFromJSON(object) {
  switch (object) {
    case 0:
    case "Auto":
      return 0 /* Auto */;
    case 1:
    case "Cuda":
      return 1 /* Cuda */;
    case 2:
    case "Vulkan":
      return 2 /* Vulkan */;
    case 3:
    case "Avx":
      return 3 /* Avx */;
    case 4:
    case "Avx2":
      return 4 /* Avx2 */;
    case 5:
    case "Avx512":
      return 5 /* Avx512 */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function lLamaRuntimesToJSON(object) {
  switch (object) {
    case 0 /* Auto */:
      return "Auto";
    case 1 /* Cuda */:
      return "Cuda";
    case 2 /* Vulkan */:
      return "Vulkan";
    case 3 /* Avx */:
      return "Avx";
    case 4 /* Avx2 */:
      return "Avx2";
    case 5 /* Avx512 */:
      return "Avx512";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
function storageLocationsFromJSON(object) {
  switch (object) {
    case 0:
    case "None":
      return 0 /* None */;
    case 1:
    case "Local":
      return 1 /* Local */;
    case 2:
    case "Cloud":
      return 2 /* Cloud */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function storageLocationsToJSON(object) {
  switch (object) {
    case 0 /* None */:
      return "None";
    case 1 /* Local */:
      return "Local";
    case 2 /* Cloud */:
      return "Cloud";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
function createBaseSettings() {
  return { Peer: void 0, Host: void 0, Model: void 0, Storage: void 0, Drive: void 0 };
}
var Settings = {
  encode(message, writer = new BinaryWriter()) {
    if (message.Peer !== void 0) {
      PeerSettings.encode(message.Peer, writer.uint32(10).fork()).join();
    }
    if (message.Host !== void 0) {
      HostSettings.encode(message.Host, writer.uint32(18).fork()).join();
    }
    if (message.Model !== void 0) {
      ModelSettings.encode(message.Model, writer.uint32(26).fork()).join();
    }
    if (message.Storage !== void 0) {
      StorageSettings.encode(message.Storage, writer.uint32(34).fork()).join();
    }
    if (message.Drive !== void 0) {
      DriveSettings.encode(message.Drive, writer.uint32(42).fork()).join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader2 ? input : new BinaryReader2(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.Peer = PeerSettings.decode(reader, reader.uint32());
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.Host = HostSettings.decode(reader, reader.uint32());
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }
          message.Model = ModelSettings.decode(reader, reader.uint32());
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }
          message.Storage = StorageSettings.decode(reader, reader.uint32());
          continue;
        }
        case 5: {
          if (tag !== 42) {
            break;
          }
          message.Drive = DriveSettings.decode(reader, reader.uint32());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      Peer: isSet9(object.Peer) ? PeerSettings.fromJSON(object.Peer) : void 0,
      Host: isSet9(object.Host) ? HostSettings.fromJSON(object.Host) : void 0,
      Model: isSet9(object.Model) ? ModelSettings.fromJSON(object.Model) : void 0,
      Storage: isSet9(object.Storage) ? StorageSettings.fromJSON(object.Storage) : void 0,
      Drive: isSet9(object.Drive) ? DriveSettings.fromJSON(object.Drive) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.Peer !== void 0) {
      obj.Peer = PeerSettings.toJSON(message.Peer);
    }
    if (message.Host !== void 0) {
      obj.Host = HostSettings.toJSON(message.Host);
    }
    if (message.Model !== void 0) {
      obj.Model = ModelSettings.toJSON(message.Model);
    }
    if (message.Storage !== void 0) {
      obj.Storage = StorageSettings.toJSON(message.Storage);
    }
    if (message.Drive !== void 0) {
      obj.Drive = DriveSettings.toJSON(message.Drive);
    }
    return obj;
  },
  create(base) {
    return Settings.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseSettings();
    message.Peer = object.Peer !== void 0 && object.Peer !== null ? PeerSettings.fromPartial(object.Peer) : void 0;
    message.Host = object.Host !== void 0 && object.Host !== null ? HostSettings.fromPartial(object.Host) : void 0;
    message.Model = object.Model !== void 0 && object.Model !== null ? ModelSettings.fromPartial(object.Model) : void 0;
    message.Storage = object.Storage !== void 0 && object.Storage !== null ? StorageSettings.fromPartial(object.Storage) : void 0;
    message.Drive = object.Drive !== void 0 && object.Drive !== null ? DriveSettings.fromPartial(object.Drive) : void 0;
    return message;
  }
};
function createBasePeerSettings() {
  return { Peers: [], DiscoveryPort: 0, MaxPeers: 0 };
}
var PeerSettings = {
  encode(message, writer = new BinaryWriter()) {
    for (const v of message.Peers) {
      Peer.encode(v, writer.uint32(10).fork()).join();
    }
    if (message.DiscoveryPort !== 0) {
      writer.uint32(16).int32(message.DiscoveryPort);
    }
    if (message.MaxPeers !== 0) {
      writer.uint32(24).int32(message.MaxPeers);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader2 ? input : new BinaryReader2(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBasePeerSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.Peers.push(Peer.decode(reader, reader.uint32()));
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.DiscoveryPort = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.MaxPeers = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      Peers: globalThis.Array.isArray(object?.Peers) ? object.Peers.map((e) => Peer.fromJSON(e)) : [],
      DiscoveryPort: isSet9(object.DiscoveryPort) ? globalThis.Number(object.DiscoveryPort) : 0,
      MaxPeers: isSet9(object.MaxPeers) ? globalThis.Number(object.MaxPeers) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.Peers?.length) {
      obj.Peers = message.Peers.map((e) => Peer.toJSON(e));
    }
    if (message.DiscoveryPort !== 0) {
      obj.DiscoveryPort = Math.round(message.DiscoveryPort);
    }
    if (message.MaxPeers !== 0) {
      obj.MaxPeers = Math.round(message.MaxPeers);
    }
    return obj;
  },
  create(base) {
    return PeerSettings.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBasePeerSettings();
    message.Peers = object.Peers?.map((e) => Peer.fromPartial(e)) || [];
    message.DiscoveryPort = object.DiscoveryPort ?? 0;
    message.MaxPeers = object.MaxPeers ?? 0;
    return message;
  }
};
function createBaseModelSettings() {
  return { ModelFolderPath: "", Models: [], AutomaticDownloads: false, LLama: void 0 };
}
var ModelSettings = {
  encode(message, writer = new BinaryWriter()) {
    if (message.ModelFolderPath !== "") {
      writer.uint32(10).string(message.ModelFolderPath);
    }
    for (const v of message.Models) {
      AIModel.encode(v, writer.uint32(18).fork()).join();
    }
    if (message.AutomaticDownloads !== false) {
      writer.uint32(24).bool(message.AutomaticDownloads);
    }
    if (message.LLama !== void 0) {
      LLamaSettings.encode(message.LLama, writer.uint32(34).fork()).join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader2 ? input : new BinaryReader2(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseModelSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.ModelFolderPath = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.Models.push(AIModel.decode(reader, reader.uint32()));
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.AutomaticDownloads = reader.bool();
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }
          message.LLama = LLamaSettings.decode(reader, reader.uint32());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      ModelFolderPath: isSet9(object.ModelFolderPath) ? globalThis.String(object.ModelFolderPath) : "",
      Models: globalThis.Array.isArray(object?.Models) ? object.Models.map((e) => AIModel.fromJSON(e)) : [],
      AutomaticDownloads: isSet9(object.AutomaticDownloads) ? globalThis.Boolean(object.AutomaticDownloads) : false,
      LLama: isSet9(object.LLama) ? LLamaSettings.fromJSON(object.LLama) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.ModelFolderPath !== "") {
      obj.ModelFolderPath = message.ModelFolderPath;
    }
    if (message.Models?.length) {
      obj.Models = message.Models.map((e) => AIModel.toJSON(e));
    }
    if (message.AutomaticDownloads !== false) {
      obj.AutomaticDownloads = message.AutomaticDownloads;
    }
    if (message.LLama !== void 0) {
      obj.LLama = LLamaSettings.toJSON(message.LLama);
    }
    return obj;
  },
  create(base) {
    return ModelSettings.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseModelSettings();
    message.ModelFolderPath = object.ModelFolderPath ?? "";
    message.Models = object.Models?.map((e) => AIModel.fromPartial(e)) || [];
    message.AutomaticDownloads = object.AutomaticDownloads ?? false;
    message.LLama = object.LLama !== void 0 && object.LLama !== null ? LLamaSettings.fromPartial(object.LLama) : void 0;
    return message;
  }
};
function createBaseHostSettings() {
  return {
    Id: "",
    Name: "",
    MaxConcurrentSessions: 0,
    SecretKey: "",
    OrcIpAddressOrDomain: void 0,
    OrcPort: void 0,
    AutoUpdate: false,
    LogLevel: "",
    OrcUseSSL: false
  };
}
var HostSettings = {
  encode(message, writer = new BinaryWriter()) {
    if (message.Id !== "") {
      writer.uint32(10).string(message.Id);
    }
    if (message.Name !== "") {
      writer.uint32(18).string(message.Name);
    }
    if (message.MaxConcurrentSessions !== 0) {
      writer.uint32(24).int32(message.MaxConcurrentSessions);
    }
    if (message.SecretKey !== "") {
      writer.uint32(34).string(message.SecretKey);
    }
    if (message.OrcIpAddressOrDomain !== void 0) {
      StringValue.encode({ value: message.OrcIpAddressOrDomain }, writer.uint32(42).fork()).join();
    }
    if (message.OrcPort !== void 0) {
      Int32Value.encode({ value: message.OrcPort }, writer.uint32(50).fork()).join();
    }
    if (message.AutoUpdate !== false) {
      writer.uint32(56).bool(message.AutoUpdate);
    }
    if (message.LogLevel !== "") {
      writer.uint32(66).string(message.LogLevel);
    }
    if (message.OrcUseSSL !== false) {
      writer.uint32(72).bool(message.OrcUseSSL);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader2 ? input : new BinaryReader2(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseHostSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.Id = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.Name = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.MaxConcurrentSessions = reader.int32();
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }
          message.SecretKey = reader.string();
          continue;
        }
        case 5: {
          if (tag !== 42) {
            break;
          }
          message.OrcIpAddressOrDomain = StringValue.decode(reader, reader.uint32()).value;
          continue;
        }
        case 6: {
          if (tag !== 50) {
            break;
          }
          message.OrcPort = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        }
        case 7: {
          if (tag !== 56) {
            break;
          }
          message.AutoUpdate = reader.bool();
          continue;
        }
        case 8: {
          if (tag !== 66) {
            break;
          }
          message.LogLevel = reader.string();
          continue;
        }
        case 9: {
          if (tag !== 72) {
            break;
          }
          message.OrcUseSSL = reader.bool();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      Id: isSet9(object.Id) ? globalThis.String(object.Id) : "",
      Name: isSet9(object.Name) ? globalThis.String(object.Name) : "",
      MaxConcurrentSessions: isSet9(object.MaxConcurrentSessions) ? globalThis.Number(object.MaxConcurrentSessions) : 0,
      SecretKey: isSet9(object.SecretKey) ? globalThis.String(object.SecretKey) : "",
      OrcIpAddressOrDomain: isSet9(object.OrcIpAddressOrDomain) ? String(object.OrcIpAddressOrDomain) : void 0,
      OrcPort: isSet9(object.OrcPort) ? Number(object.OrcPort) : void 0,
      AutoUpdate: isSet9(object.AutoUpdate) ? globalThis.Boolean(object.AutoUpdate) : false,
      LogLevel: isSet9(object.LogLevel) ? globalThis.String(object.LogLevel) : "",
      OrcUseSSL: isSet9(object.OrcUseSSL) ? globalThis.Boolean(object.OrcUseSSL) : false
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.Id !== "") {
      obj.Id = message.Id;
    }
    if (message.Name !== "") {
      obj.Name = message.Name;
    }
    if (message.MaxConcurrentSessions !== 0) {
      obj.MaxConcurrentSessions = Math.round(message.MaxConcurrentSessions);
    }
    if (message.SecretKey !== "") {
      obj.SecretKey = message.SecretKey;
    }
    if (message.OrcIpAddressOrDomain !== void 0) {
      obj.OrcIpAddressOrDomain = message.OrcIpAddressOrDomain;
    }
    if (message.OrcPort !== void 0) {
      obj.OrcPort = message.OrcPort;
    }
    if (message.AutoUpdate !== false) {
      obj.AutoUpdate = message.AutoUpdate;
    }
    if (message.LogLevel !== "") {
      obj.LogLevel = message.LogLevel;
    }
    if (message.OrcUseSSL !== false) {
      obj.OrcUseSSL = message.OrcUseSSL;
    }
    return obj;
  },
  create(base) {
    return HostSettings.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseHostSettings();
    message.Id = object.Id ?? "";
    message.Name = object.Name ?? "";
    message.MaxConcurrentSessions = object.MaxConcurrentSessions ?? 0;
    message.SecretKey = object.SecretKey ?? "";
    message.OrcIpAddressOrDomain = object.OrcIpAddressOrDomain ?? void 0;
    message.OrcPort = object.OrcPort ?? void 0;
    message.AutoUpdate = object.AutoUpdate ?? false;
    message.LogLevel = object.LogLevel ?? "";
    message.OrcUseSSL = object.OrcUseSSL ?? false;
    return message;
  }
};
function createBaseLLamaSettings() {
  return {
    Runtime: 0,
    ShowLogs: false,
    AutoFallback: false,
    SkipCheck: false,
    LlamaPath: "",
    LlavaPath: "",
    ContextSize: 0,
    GpuLayerCount: 0,
    BatchSize: 0
  };
}
var LLamaSettings = {
  encode(message, writer = new BinaryWriter()) {
    if (message.Runtime !== 0) {
      writer.uint32(8).int32(message.Runtime);
    }
    if (message.ShowLogs !== false) {
      writer.uint32(16).bool(message.ShowLogs);
    }
    if (message.AutoFallback !== false) {
      writer.uint32(24).bool(message.AutoFallback);
    }
    if (message.SkipCheck !== false) {
      writer.uint32(32).bool(message.SkipCheck);
    }
    if (message.LlamaPath !== "") {
      writer.uint32(42).string(message.LlamaPath);
    }
    if (message.LlavaPath !== "") {
      writer.uint32(50).string(message.LlavaPath);
    }
    if (message.ContextSize !== 0) {
      writer.uint32(56).uint32(message.ContextSize);
    }
    if (message.GpuLayerCount !== 0) {
      writer.uint32(64).int32(message.GpuLayerCount);
    }
    if (message.BatchSize !== 0) {
      writer.uint32(72).uint32(message.BatchSize);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader2 ? input : new BinaryReader2(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseLLamaSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.Runtime = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.ShowLogs = reader.bool();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.AutoFallback = reader.bool();
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }
          message.SkipCheck = reader.bool();
          continue;
        }
        case 5: {
          if (tag !== 42) {
            break;
          }
          message.LlamaPath = reader.string();
          continue;
        }
        case 6: {
          if (tag !== 50) {
            break;
          }
          message.LlavaPath = reader.string();
          continue;
        }
        case 7: {
          if (tag !== 56) {
            break;
          }
          message.ContextSize = reader.uint32();
          continue;
        }
        case 8: {
          if (tag !== 64) {
            break;
          }
          message.GpuLayerCount = reader.int32();
          continue;
        }
        case 9: {
          if (tag !== 72) {
            break;
          }
          message.BatchSize = reader.uint32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      Runtime: isSet9(object.Runtime) ? lLamaRuntimesFromJSON(object.Runtime) : 0,
      ShowLogs: isSet9(object.ShowLogs) ? globalThis.Boolean(object.ShowLogs) : false,
      AutoFallback: isSet9(object.AutoFallback) ? globalThis.Boolean(object.AutoFallback) : false,
      SkipCheck: isSet9(object.SkipCheck) ? globalThis.Boolean(object.SkipCheck) : false,
      LlamaPath: isSet9(object.LlamaPath) ? globalThis.String(object.LlamaPath) : "",
      LlavaPath: isSet9(object.LlavaPath) ? globalThis.String(object.LlavaPath) : "",
      ContextSize: isSet9(object.ContextSize) ? globalThis.Number(object.ContextSize) : 0,
      GpuLayerCount: isSet9(object.GpuLayerCount) ? globalThis.Number(object.GpuLayerCount) : 0,
      BatchSize: isSet9(object.BatchSize) ? globalThis.Number(object.BatchSize) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.Runtime !== 0) {
      obj.Runtime = lLamaRuntimesToJSON(message.Runtime);
    }
    if (message.ShowLogs !== false) {
      obj.ShowLogs = message.ShowLogs;
    }
    if (message.AutoFallback !== false) {
      obj.AutoFallback = message.AutoFallback;
    }
    if (message.SkipCheck !== false) {
      obj.SkipCheck = message.SkipCheck;
    }
    if (message.LlamaPath !== "") {
      obj.LlamaPath = message.LlamaPath;
    }
    if (message.LlavaPath !== "") {
      obj.LlavaPath = message.LlavaPath;
    }
    if (message.ContextSize !== 0) {
      obj.ContextSize = Math.round(message.ContextSize);
    }
    if (message.GpuLayerCount !== 0) {
      obj.GpuLayerCount = Math.round(message.GpuLayerCount);
    }
    if (message.BatchSize !== 0) {
      obj.BatchSize = Math.round(message.BatchSize);
    }
    return obj;
  },
  create(base) {
    return LLamaSettings.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseLLamaSettings();
    message.Runtime = object.Runtime ?? 0;
    message.ShowLogs = object.ShowLogs ?? false;
    message.AutoFallback = object.AutoFallback ?? false;
    message.SkipCheck = object.SkipCheck ?? false;
    message.LlamaPath = object.LlamaPath ?? "";
    message.LlavaPath = object.LlavaPath ?? "";
    message.ContextSize = object.ContextSize ?? 0;
    message.GpuLayerCount = object.GpuLayerCount ?? 0;
    message.BatchSize = object.BatchSize ?? 0;
    return message;
  }
};
function createBaseAIModel() {
  return {
    Name: "",
    FileName: "",
    Url: "",
    IsMultiModal: false,
    IsDefault: false,
    Enabled: false,
    LoadAtStartup: false,
    ThinkLevels: [],
    HasReasoning: false,
    LLama: void 0,
    Id: ""
  };
}
var AIModel = {
  encode(message, writer = new BinaryWriter()) {
    if (message.Name !== "") {
      writer.uint32(10).string(message.Name);
    }
    if (message.FileName !== "") {
      writer.uint32(18).string(message.FileName);
    }
    if (message.Url !== "") {
      writer.uint32(26).string(message.Url);
    }
    if (message.IsMultiModal !== false) {
      writer.uint32(32).bool(message.IsMultiModal);
    }
    if (message.IsDefault !== false) {
      writer.uint32(40).bool(message.IsDefault);
    }
    if (message.Enabled !== false) {
      writer.uint32(48).bool(message.Enabled);
    }
    if (message.LoadAtStartup !== false) {
      writer.uint32(56).bool(message.LoadAtStartup);
    }
    writer.uint32(66).fork();
    for (const v of message.ThinkLevels) {
      writer.int32(v);
    }
    writer.join();
    if (message.HasReasoning !== false) {
      writer.uint32(72).bool(message.HasReasoning);
    }
    if (message.LLama !== void 0) {
      LLamaSettings.encode(message.LLama, writer.uint32(82).fork()).join();
    }
    if (message.Id !== "") {
      writer.uint32(90).string(message.Id);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader2 ? input : new BinaryReader2(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAIModel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.Name = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.FileName = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }
          message.Url = reader.string();
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }
          message.IsMultiModal = reader.bool();
          continue;
        }
        case 5: {
          if (tag !== 40) {
            break;
          }
          message.IsDefault = reader.bool();
          continue;
        }
        case 6: {
          if (tag !== 48) {
            break;
          }
          message.Enabled = reader.bool();
          continue;
        }
        case 7: {
          if (tag !== 56) {
            break;
          }
          message.LoadAtStartup = reader.bool();
          continue;
        }
        case 8: {
          if (tag === 64) {
            message.ThinkLevels.push(reader.int32());
            continue;
          }
          if (tag === 66) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.ThinkLevels.push(reader.int32());
            }
            continue;
          }
          break;
        }
        case 9: {
          if (tag !== 72) {
            break;
          }
          message.HasReasoning = reader.bool();
          continue;
        }
        case 10: {
          if (tag !== 82) {
            break;
          }
          message.LLama = LLamaSettings.decode(reader, reader.uint32());
          continue;
        }
        case 11: {
          if (tag !== 90) {
            break;
          }
          message.Id = reader.string();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      Name: isSet9(object.Name) ? globalThis.String(object.Name) : "",
      FileName: isSet9(object.FileName) ? globalThis.String(object.FileName) : "",
      Url: isSet9(object.Url) ? globalThis.String(object.Url) : "",
      IsMultiModal: isSet9(object.IsMultiModal) ? globalThis.Boolean(object.IsMultiModal) : false,
      IsDefault: isSet9(object.IsDefault) ? globalThis.Boolean(object.IsDefault) : false,
      Enabled: isSet9(object.Enabled) ? globalThis.Boolean(object.Enabled) : false,
      LoadAtStartup: isSet9(object.LoadAtStartup) ? globalThis.Boolean(object.LoadAtStartup) : false,
      ThinkLevels: globalThis.Array.isArray(object?.ThinkLevels) ? object.ThinkLevels.map((e) => thinkLevelsFromJSON(e)) : [],
      HasReasoning: isSet9(object.HasReasoning) ? globalThis.Boolean(object.HasReasoning) : false,
      LLama: isSet9(object.LLama) ? LLamaSettings.fromJSON(object.LLama) : void 0,
      Id: isSet9(object.Id) ? globalThis.String(object.Id) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.Name !== "") {
      obj.Name = message.Name;
    }
    if (message.FileName !== "") {
      obj.FileName = message.FileName;
    }
    if (message.Url !== "") {
      obj.Url = message.Url;
    }
    if (message.IsMultiModal !== false) {
      obj.IsMultiModal = message.IsMultiModal;
    }
    if (message.IsDefault !== false) {
      obj.IsDefault = message.IsDefault;
    }
    if (message.Enabled !== false) {
      obj.Enabled = message.Enabled;
    }
    if (message.LoadAtStartup !== false) {
      obj.LoadAtStartup = message.LoadAtStartup;
    }
    if (message.ThinkLevels?.length) {
      obj.ThinkLevels = message.ThinkLevels.map((e) => thinkLevelsToJSON(e));
    }
    if (message.HasReasoning !== false) {
      obj.HasReasoning = message.HasReasoning;
    }
    if (message.LLama !== void 0) {
      obj.LLama = LLamaSettings.toJSON(message.LLama);
    }
    if (message.Id !== "") {
      obj.Id = message.Id;
    }
    return obj;
  },
  create(base) {
    return AIModel.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAIModel();
    message.Name = object.Name ?? "";
    message.FileName = object.FileName ?? "";
    message.Url = object.Url ?? "";
    message.IsMultiModal = object.IsMultiModal ?? false;
    message.IsDefault = object.IsDefault ?? false;
    message.Enabled = object.Enabled ?? false;
    message.LoadAtStartup = object.LoadAtStartup ?? false;
    message.ThinkLevels = object.ThinkLevels?.map((e) => e) || [];
    message.HasReasoning = object.HasReasoning ?? false;
    message.LLama = object.LLama !== void 0 && object.LLama !== null ? LLamaSettings.fromPartial(object.LLama) : void 0;
    message.Id = object.Id ?? "";
    return message;
  }
};
function createBaseStorageSettings() {
  return { Location: 0, LocalPath: "" };
}
var StorageSettings = {
  encode(message, writer = new BinaryWriter()) {
    if (message.Location !== 0) {
      writer.uint32(8).int32(message.Location);
    }
    if (message.LocalPath !== "") {
      writer.uint32(18).string(message.LocalPath);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader2 ? input : new BinaryReader2(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseStorageSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.Location = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.LocalPath = reader.string();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      Location: isSet9(object.Location) ? storageLocationsFromJSON(object.Location) : 0,
      LocalPath: isSet9(object.LocalPath) ? globalThis.String(object.LocalPath) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.Location !== 0) {
      obj.Location = storageLocationsToJSON(message.Location);
    }
    if (message.LocalPath !== "") {
      obj.LocalPath = message.LocalPath;
    }
    return obj;
  },
  create(base) {
    return StorageSettings.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseStorageSettings();
    message.Location = object.Location ?? 0;
    message.LocalPath = object.LocalPath ?? "";
    return message;
  }
};
function isSet9(value) {
  return value !== null && value !== void 0;
}

// ../../daisi-sdk-typescript/src/generated/Protos/V1/Models/CommandModels.ts
function createBaseCommand() {
  return { Name: "", Message: void 0, Payload: void 0, SessionId: void 0, RequestId: void 0 };
}
var Command = {
  encode(message, writer = new BinaryWriter()) {
    if (message.Name !== "") {
      writer.uint32(10).string(message.Name);
    }
    if (message.Message !== void 0) {
      StringValue.encode({ value: message.Message }, writer.uint32(18).fork()).join();
    }
    if (message.Payload !== void 0) {
      Any.encode(message.Payload, writer.uint32(26).fork()).join();
    }
    if (message.SessionId !== void 0) {
      StringValue.encode({ value: message.SessionId }, writer.uint32(34).fork()).join();
    }
    if (message.RequestId !== void 0) {
      StringValue.encode({ value: message.RequestId }, writer.uint32(42).fork()).join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader2 ? input : new BinaryReader2(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseCommand();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.Name = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.Message = StringValue.decode(reader, reader.uint32()).value;
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }
          message.Payload = Any.decode(reader, reader.uint32());
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }
          message.SessionId = StringValue.decode(reader, reader.uint32()).value;
          continue;
        }
        case 5: {
          if (tag !== 42) {
            break;
          }
          message.RequestId = StringValue.decode(reader, reader.uint32()).value;
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      Name: isSet10(object.Name) ? globalThis.String(object.Name) : "",
      Message: isSet10(object.Message) ? String(object.Message) : void 0,
      Payload: isSet10(object.Payload) ? Any.fromJSON(object.Payload) : void 0,
      SessionId: isSet10(object.SessionId) ? String(object.SessionId) : void 0,
      RequestId: isSet10(object.RequestId) ? String(object.RequestId) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.Name !== "") {
      obj.Name = message.Name;
    }
    if (message.Message !== void 0) {
      obj.Message = message.Message;
    }
    if (message.Payload !== void 0) {
      obj.Payload = Any.toJSON(message.Payload);
    }
    if (message.SessionId !== void 0) {
      obj.SessionId = message.SessionId;
    }
    if (message.RequestId !== void 0) {
      obj.RequestId = message.RequestId;
    }
    return obj;
  },
  create(base) {
    return Command.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseCommand();
    message.Name = object.Name ?? "";
    message.Message = object.Message ?? void 0;
    message.Payload = object.Payload !== void 0 && object.Payload !== null ? Any.fromPartial(object.Payload) : void 0;
    message.SessionId = object.SessionId ?? void 0;
    message.RequestId = object.RequestId ?? void 0;
    return message;
  }
};
function createBaseHeartbeatRequest() {
  return { Settings: void 0 };
}
var HeartbeatRequest = {
  encode(message, writer = new BinaryWriter()) {
    if (message.Settings !== void 0) {
      Settings.encode(message.Settings, writer.uint32(10).fork()).join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader2 ? input : new BinaryReader2(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseHeartbeatRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.Settings = Settings.decode(reader, reader.uint32());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { Settings: isSet10(object.Settings) ? Settings.fromJSON(object.Settings) : void 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.Settings !== void 0) {
      obj.Settings = Settings.toJSON(message.Settings);
    }
    return obj;
  },
  create(base) {
    return HeartbeatRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseHeartbeatRequest();
    message.Settings = object.Settings !== void 0 && object.Settings !== null ? Settings.fromPartial(object.Settings) : void 0;
    return message;
  }
};
function createBaseListenForCommandsRequest() {
  return {};
}
var ListenForCommandsRequest = {
  encode(_, writer = new BinaryWriter()) {
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader2 ? input : new BinaryReader2(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseListenForCommandsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(_) {
    return {};
  },
  toJSON(_) {
    const obj = {};
    return obj;
  },
  create(base) {
    return ListenForCommandsRequest.fromPartial(base ?? {});
  },
  fromPartial(_) {
    const message = createBaseListenForCommandsRequest();
    return message;
  }
};
function createBaseSendCommandRequest() {
  return { Command: void 0 };
}
var SendCommandRequest = {
  encode(message, writer = new BinaryWriter()) {
    if (message.Command !== void 0) {
      Command.encode(message.Command, writer.uint32(10).fork()).join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader2 ? input : new BinaryReader2(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseSendCommandRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.Command = Command.decode(reader, reader.uint32());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { Command: isSet10(object.Command) ? Command.fromJSON(object.Command) : void 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.Command !== void 0) {
      obj.Command = Command.toJSON(message.Command);
    }
    return obj;
  },
  create(base) {
    return SendCommandRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseSendCommandRequest();
    message.Command = object.Command !== void 0 && object.Command !== null ? Command.fromPartial(object.Command) : void 0;
    return message;
  }
};
function createBaseSendCommandResponse() {
  return { Success: false };
}
var SendCommandResponse = {
  encode(message, writer = new BinaryWriter()) {
    if (message.Success !== false) {
      writer.uint32(8).bool(message.Success);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader2 ? input : new BinaryReader2(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseSendCommandResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.Success = reader.bool();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { Success: isSet10(object.Success) ? globalThis.Boolean(object.Success) : false };
  },
  toJSON(message) {
    const obj = {};
    if (message.Success !== false) {
      obj.Success = message.Success;
    }
    return obj;
  },
  create(base) {
    return SendCommandResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseSendCommandResponse();
    message.Success = object.Success ?? false;
    return message;
  }
};
function isSet10(value) {
  return value !== null && value !== void 0;
}

// ../../daisi-sdk-typescript/src/generated/Protos/V1/Commands.ts
var HostCommandsProtoDefinition = {
  name: "HostCommandsProto",
  fullName: "daisi.protos.v1.HostCommandsProto",
  methods: {
    open: {
      name: "Open",
      requestType: Command,
      requestStream: true,
      responseType: Command,
      responseStream: true,
      options: {}
    },
    /** Browser-compatible split RPCs (grpc-web can't do bidi streaming) */
    listenForCommands: {
      name: "ListenForCommands",
      requestType: ListenForCommandsRequest,
      requestStream: false,
      responseType: Command,
      responseStream: true,
      options: {}
    },
    sendCommand: {
      name: "SendCommand",
      requestType: SendCommandRequest,
      requestStream: false,
      responseType: SendCommandResponse,
      responseStream: false,
      options: {}
    }
  }
};

// src/proto-helpers.ts
var TYPE_PREFIX = "type.googleapis.com/";
function packAny(typeName, message, messageFns) {
  return {
    typeUrl: `${TYPE_PREFIX}${typeName}`,
    value: messageFns.encode(message).finish()
  };
}
function unpackAny(any, messageFns) {
  if (!any || !any.typeUrl || !any.value || any.value.length === 0) return null;
  return messageFns.decode(any.value);
}
function getTypeName(any) {
  if (!any?.typeUrl) return "";
  const idx = any.typeUrl.lastIndexOf("/");
  return idx >= 0 ? any.typeUrl.substring(idx + 1) : any.typeUrl;
}

// src/orc-connection.ts
var MAX_RETRIES = 10;
var BASE_DELAY_MS = 1e3;
var MAX_DELAY_MS = 3e4;
function describeCommand(command) {
  const parts = [command.Name || "?"];
  if (command.SessionId) parts.push(`session=${command.SessionId.substring(0, 16)}`);
  if (command.RequestId) parts.push(`req=${command.RequestId.substring(0, 12)}`);
  if (command.Message) parts.push(`msg="${command.Message.substring(0, 50)}"`);
  if (command.Payload) {
    const typeName = getTypeName(command.Payload);
    if (typeName) parts.push(`payload=${typeName}`);
  }
  return parts.join(" | ");
}
function sleep(ms) {
  return new Promise((resolve2) => setTimeout(resolve2, ms));
}
var OrcConnection = class {
  abortController = null;
  heartbeatInterval = null;
  client = null;
  onCommand = null;
  onDisconnect = null;
  buildHeartbeat = () => ({ Name: "HeartbeatRequest" });
  onLog = () => {
  };
  consecutiveHeartbeatFailures = 0;
  shouldReconnect = false;
  async connect(clientKey, orcAddress, onCommand, onDisconnect, buildHeartbeat, onLog) {
    this.onCommand = onCommand;
    this.onDisconnect = onDisconnect;
    this.buildHeartbeat = buildHeartbeat;
    this.onLog = onLog;
    this.shouldReconnect = true;
    this.abortController = new AbortController();
    this.log("info", `Connecting to ${orcAddress}...`);
    const channel = (0, import_nice_grpc_web2.createChannel)(orcAddress);
    const authMiddleware = createAuthMiddleware({ getClientKey: () => clientKey });
    this.client = (0, import_nice_grpc_web2.createClientFactory)().use(authMiddleware).create(HostCommandsProtoDefinition, channel);
    this.log("info", "Client created, starting listener and heartbeat...");
    this.startListeningWithReconnect();
    this.startHeartbeat();
  }
  disconnect() {
    this.shouldReconnect = false;
    this.abortController?.abort();
    this.abortController = null;
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
    this.client = null;
    this.log("warn", "Disconnected");
  }
  async sendCommand(command) {
    if (!this.client) return;
    await this.client.sendCommand({ Command: command });
  }
  async startListeningWithReconnect() {
    let retryCount = 0;
    while (this.shouldReconnect && this.client) {
      try {
        await this.listenToStream();
        if (!this.shouldReconnect) break;
        retryCount++;
      } catch (e) {
        if (e.name === "AbortError" || !this.shouldReconnect) break;
        retryCount++;
      }
      if (retryCount > MAX_RETRIES) {
        this.log("error", `Connection lost after ${MAX_RETRIES} retries`);
        break;
      }
      const delay = Math.min(BASE_DELAY_MS * Math.pow(2, retryCount - 1), MAX_DELAY_MS);
      const jitter = Math.round(delay * 0.2 * Math.random());
      const totalDelay = delay + jitter;
      this.log("warn", `Reconnecting in ${(totalDelay / 1e3).toFixed(1)}s (attempt ${retryCount}/${MAX_RETRIES})...`);
      await sleep(totalDelay);
      if (!this.shouldReconnect) break;
      this.log("info", "Reconnecting...");
    }
    this.onDisconnect?.();
  }
  async listenToStream() {
    if (!this.client || !this.abortController) return;
    this.log("info", "Opening ListenForCommands stream...");
    const stream = this.client.listenForCommands({}, {
      signal: this.abortController.signal
    });
    for await (const command of stream) {
      this.consecutiveHeartbeatFailures = 0;
      this.log("info", `\u2190 ${describeCommand(command)}`);
      if (this.onCommand) {
        const response = await this.onCommand(command);
        if (response) {
          this.log("success", `\u2192 ${describeCommand(response)}`);
          await this.sendCommand(response);
        }
      }
    }
    this.log("warn", "Stream ended");
  }
  startHeartbeat() {
    this.sendHeartbeat();
    this.heartbeatInterval = setInterval(() => this.sendHeartbeat(), 6e4);
  }
  async sendHeartbeat() {
    if (!this.client) return;
    try {
      const hb = this.buildHeartbeat();
      await this.sendCommand(hb);
      this.consecutiveHeartbeatFailures = 0;
      this.log("success", `\u2192 ${describeCommand(hb)}`);
    } catch (e) {
      this.consecutiveHeartbeatFailures++;
      this.log("error", `Heartbeat failed (${this.consecutiveHeartbeatFailures}/3): ${e.message}`);
      if (this.consecutiveHeartbeatFailures >= 3) {
        this.log("warn", "Connection appears dead, forcing reconnect...");
        this.abortController?.abort();
        this.abortController = new AbortController();
      }
    }
  }
  log(level, message) {
    console.log(`[orc] ${message}`);
    this.onLog(level, message);
  }
};

// src/command-handler.ts
var CommandHandler = class {
  engine;
  activeSessions = /* @__PURE__ */ new Map();
  sendCommand = null;
  claimSession = null;
  log = () => {
  };
  constructor(engine) {
    this.engine = engine;
  }
  setSendCommand(fn) {
    this.sendCommand = fn;
  }
  setClaimSession(fn) {
    this.claimSession = fn;
  }
  setLog(fn) {
    this.log = fn;
  }
  /** Build a heartbeat command with model info for sending to ORC. */
  buildHeartbeat() {
    const modelInfo = this.engine.info;
    const heartbeat = {
      Settings: {
        Model: {
          ModelFolderPath: "",
          Models: modelInfo ? [{
            Name: modelInfo.name || "Browser Model",
            FileName: "",
            Url: "",
            IsMultiModal: false,
            IsDefault: true,
            Enabled: true,
            LoadAtStartup: false,
            ThinkLevels: [],
            HasReasoning: false,
            Id: ""
          }] : [],
          AutomaticDownloads: false
        }
      }
    };
    return {
      Name: "HeartbeatRequest",
      Payload: packAny("daisi.protos.v1.HeartbeatRequest", heartbeat, HeartbeatRequest)
    };
  }
  /** Handle an incoming command from ORC. Returns a response command or null. */
  async handle(command) {
    switch (command.Name) {
      case "HeartbeatRequest":
        return null;
      case "ConnectRequest":
        return this.handleConnect(command);
      case "CreateInferenceRequest":
        return this.handleCreateInference(command);
      case "SendInferenceRequest":
        return this.handleSendInference(command);
      case "CloseInferenceRequest":
        return this.handleCloseInference(command);
      case "CancelStreamRequest":
        return this.handleCancelStream(command);
      case "DownloadModelRequest":
        return null;
      case "UpdateRequiredRequest":
        return null;
      default:
        console.warn(`[cmd] Unhandled command: ${command.Name}`);
        return null;
    }
  }
  async handleConnect(command) {
    const request = unpackAny(command.Payload, ConnectRequest);
    const sessionId = request?.SessionId || command.SessionId || "";
    let hasCapacity = true;
    if (this.claimSession) {
      try {
        hasCapacity = await this.claimSession(sessionId);
      } catch {
        hasCapacity = false;
      }
    }
    const response = {
      Id: hasCapacity ? sessionId : "",
      HasCapacity: hasCapacity,
      AlreadyConnected: this.activeSessions.has(sessionId)
    };
    return {
      Name: "ConnectResponse",
      SessionId: sessionId,
      RequestId: command.RequestId,
      Payload: packAny("daisi.protos.v1.ConnectResponse", response, ConnectResponse)
    };
  }
  handleCreateInference(command) {
    const request = unpackAny(command.Payload, CreateInferenceRequest);
    const sessionId = request?.SessionId || command.SessionId || "";
    this.engine.resetSession();
    this.activeSessions.set(sessionId, new AbortController());
    const response = {
      SessionId: sessionId,
      InferenceId: request?.SessionId || ""
    };
    return {
      Name: "CreateInferenceResponse",
      SessionId: sessionId,
      RequestId: command.RequestId,
      Payload: packAny("daisi.protos.v1.CreateInferenceResponse", response, CreateInferenceResponse)
    };
  }
  async handleSendInference(command) {
    const request = unpackAny(command.Payload, SendInferenceRequest);
    const sessionId = request?.SessionId || command.SessionId || "";
    const controller = this.activeSessions.get(sessionId);
    if (!controller) return null;
    const prompt = request?.Text || command.Message || "";
    if (!prompt) return null;
    const maxTokens = request?.MaxTokens || 512;
    const temperature = request?.Temperature || 0.7;
    const startTime = performance.now();
    this.log("success", `\u2192 SendInferenceResponse Starting: "${prompt.substring(0, 60)}${prompt.length > 60 ? "..." : ""}" (max ${maxTokens} tokens)`);
    let tokenCount = 0;
    let tokenBuffer = "";
    const BATCH_SIZE = 10;
    const inferenceId = request?.InferenceId || "";
    const flushTokens = async () => {
      if (!tokenBuffer || !this.sendCommand) return;
      const streamResponse = {
        SessionId: sessionId,
        InferenceId: inferenceId,
        Id: "",
        Type: 0,
        // Text
        Content: tokenBuffer,
        AuthorRole: "assistant",
        Format: 0,
        MessageTokenCount: tokenCount,
        SessionTokenCount: tokenCount,
        ComputeTimeMs: Math.round(performance.now() - startTime)
      };
      await this.sendCommand({
        Name: "SendInferenceResponse",
        SessionId: sessionId,
        RequestId: command.RequestId,
        Payload: packAny("daisi.protos.v1.SendInferenceResponse", streamResponse, SendInferenceResponse)
      });
      tokenBuffer = "";
    };
    try {
      for await (const token of this.engine.generate(prompt, {
        maxTokens,
        temperature,
        signal: controller.signal
      })) {
        tokenBuffer += token;
        tokenCount++;
        if (tokenCount % BATCH_SIZE === 0) {
          await flushTokens();
        }
      }
      await flushTokens();
    } catch {
      await flushTokens();
    }
    const elapsed = ((performance.now() - startTime) / 1e3).toFixed(1);
    const tokSec = tokenCount > 0 ? (tokenCount / ((performance.now() - startTime) / 1e3)).toFixed(1) : "0";
    this.log("success", `\u2192 SendInferenceResponse Complete: ${tokenCount} tokens in ${elapsed}s (${tokSec} tok/s)`);
    if (this.sendCommand) {
      await this.sendCommand({
        Name: "ENDSTREAM",
        SessionId: sessionId,
        RequestId: command.RequestId
      });
    }
    return null;
  }
  handleCloseInference(command) {
    const request = unpackAny(command.Payload, CloseInferenceRequest);
    const sessionId = request?.SessionId || command.SessionId || "";
    const controller = this.activeSessions.get(sessionId);
    controller?.abort();
    this.activeSessions.delete(sessionId);
    const response = {
      SessionId: sessionId,
      InferenceId: request?.InferenceId || "",
      Success: true
    };
    return {
      Name: "CloseInferenceResponse",
      SessionId: sessionId,
      RequestId: command.RequestId,
      Payload: packAny("daisi.protos.v1.CloseInferenceResponse", response, CloseInferenceResponse)
    };
  }
  handleCancelStream(command) {
    const sessionId = command.SessionId ?? "";
    const controller = this.activeSessions.get(sessionId);
    controller?.abort();
    return null;
  }
};

// src/index.ts
var BrowserHost = class {
  engine = new LlogosEngine();
  orcConnection = new OrcConnection();
  commandHandler = null;
  abortController = null;
  dotNetRef = null;
  orcClientKey = "";
  orcAddress = "";
  setDotNetRef(ref) {
    this.dotNetRef = ref;
  }
  async initGpu() {
    if (!LlogosEngine.isSupported()) throw new Error("WebGPU not available");
    const caps = await this.engine.initGpu();
    const ai = caps.adapterInfo;
    console.log("[gpu] adapterInfo:", { vendor: ai.vendor, architecture: ai.architecture, device: ai.device, description: ai.description });
    return {
      ...caps,
      adapterInfo: { vendor: ai.vendor, architecture: ai.architecture, device: ai.device, description: ai.description }
    };
  }
  async inspectModel(url) {
    return await this.engine.inspectModel(url);
  }
  async loadModel(url) {
    const info = await this.engine.loadModel(url, {
      onProgress: (p) => {
        this.dotNetRef?.invokeMethodAsync("OnLoadProgress", p.phase, p.bytesDownloaded, p.totalBytes);
      }
    });
    this.commandHandler = new CommandHandler(this.engine);
    return info;
  }
  unloadModel() {
    this.engine.unloadModel();
    this.commandHandler = null;
  }
  resetSession() {
    this.engine.resetSession();
  }
  async generate(prompt, maxTokens, temperature) {
    this.abortController = new AbortController();
    let count = 0;
    const start = performance.now();
    try {
      for await (const token of this.engine.generate(prompt, {
        maxTokens,
        temperature,
        signal: this.abortController.signal
      })) {
        count++;
        this.dotNetRef?.invokeMethodAsync("OnToken", token);
      }
    } finally {
      const elapsed = (performance.now() - start) / 1e3;
      this.dotNetRef?.invokeMethodAsync("OnGenerationComplete", count, elapsed > 0 ? count / elapsed : 0);
      this.abortController = null;
    }
  }
  stopGeneration() {
    this.abortController?.abort();
  }
  getState() {
    const info = this.engine.info;
    return {
      status: this.engine.status,
      vramMb: Math.round(this.engine.vramUsage / 1024 / 1024),
      model: info ? {
        name: info.metadata.get("general.name") || info.architecture || "Unknown",
        architecture: info.architecture,
        blockCount: info.blockCount,
        embeddingLength: info.embeddingLength,
        headCount: info.headCount,
        headCountKv: info.headCountKv,
        contextLength: info.contextLength,
        vocabSize: info.vocabSize,
        feedForwardLength: info.feedForwardLength,
        tensorCount: info.tensors.length,
        quantization: info.metadata.get("general.file_type") || ""
      } : null
    };
  }
  isSupported() {
    return LlogosEngine.isSupported();
  }
  async isCached(url) {
    try {
      const cache = await caches.open("llogos-webgpu-models");
      return !!await cache.match(url);
    } catch {
      return false;
    }
  }
  // ── ORC Connection ──────────────────────────────────────────────────
  async connectToOrc(clientKey, orcAddress) {
    if (!this.commandHandler) throw new Error("Model not loaded");
    this.orcClientKey = clientKey;
    this.orcAddress = orcAddress;
    this.commandHandler.setSendCommand((cmd) => this.orcConnection.sendCommand(cmd));
    this.commandHandler.setLog((level, msg) => this.dotNetRef?.invokeMethodAsync("OnOrcLog", level, msg));
    const claimChannel = (0, import_nice_grpc_web3.createChannel)(orcAddress);
    const claimAuth = createAuthMiddleware({ getClientKey: () => clientKey });
    const claimClient = (0, import_nice_grpc_web3.createClientFactory)().use(claimAuth).create(SessionsProtoDefinition, claimChannel);
    this.commandHandler.setClaimSession(async (sessionId) => {
      const resp = await claimClient.claim({ Id: sessionId });
      return resp.Success;
    });
    await this.orcConnection.connect(
      clientKey,
      orcAddress,
      async (command) => this.commandHandler.handle(command),
      () => this.dotNetRef?.invokeMethodAsync("OnOrcConnectionChanged", false),
      () => this.commandHandler.buildHeartbeat(),
      (level, message) => this.dotNetRef?.invokeMethodAsync("OnOrcLog", level, message)
    );
    this.dotNetRef?.invokeMethodAsync("OnOrcConnectionChanged", true);
  }
  async disconnectFromOrc() {
    this.orcConnection.disconnect();
    this.dotNetRef?.invokeMethodAsync("OnOrcConnectionChanged", false);
  }
  // ── ORC Chat (consumer path) ─────────────────────────────────────
  async sendViaOrc(prompt) {
    if (!this.orcAddress || !this.orcClientKey) throw new Error("Not connected to ORC");
    const channel = (0, import_nice_grpc_web3.createChannel)(this.orcAddress);
    const authMiddleware = createAuthMiddleware({ getClientKey: () => this.orcClientKey });
    const factory = (0, import_nice_grpc_web3.createClientFactory)().use(authMiddleware);
    const sessionClient = factory.create(SessionsProtoDefinition, channel);
    const inferenceClient = factory.create(InferencesProtoDefinition, channel);
    const session = await sessionClient.create({
      ModelName: "",
      DirectConnectRequired: false,
      PreferredHostNames: []
    });
    const sessionId = session.Id;
    console.log(`[orc-chat] Session created: ${sessionId}`, session);
    this.dotNetRef?.invokeMethodAsync("OnOrcLog", "info", `ORC Chat: session ${sessionId.substring(0, 12)}...`);
    const createResp = await inferenceClient.create({
      SessionId: sessionId,
      ThinkLevel: 0,
      ModelName: "",
      InitializationPrompt: "",
      ToolGroups: [],
      SecureTools: []
    });
    console.log(`[orc-chat] Inference created: ${createResp.InferenceId}`);
    const start = performance.now();
    let tokenCount = 0;
    const stream = inferenceClient.send({
      SessionId: sessionId,
      InferenceId: createResp.InferenceId,
      Text: prompt,
      AntiPrompts: []
    });
    for await (const resp of stream) {
      if (resp.Type === 3) {
        this.dotNetRef?.invokeMethodAsync("OnToken", `[Error: ${resp.Content}]`);
      } else if (resp.Type === 0 || resp.Type === 1) {
        tokenCount = resp.MessageTokenCount || tokenCount + 1;
        this.dotNetRef?.invokeMethodAsync("OnToken", resp.Content);
      }
    }
    const elapsed = (performance.now() - start) / 1e3;
    this.dotNetRef?.invokeMethodAsync("OnGenerationComplete", tokenCount, elapsed > 0 ? tokenCount / elapsed : 0);
    this.dotNetRef?.invokeMethodAsync("OnOrcLog", "success", `ORC Chat: ${tokenCount} tokens in ${elapsed.toFixed(1)}s`);
  }
};
window.browserHost = new BrowserHost();
/*! Bundled license information:

long/index.js:
  (**
   * @license
   * Copyright 2009 The Closure Library Authors
   * Copyright 2020 Daniel Wirtz / The long.js Authors.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
//# sourceMappingURL=browser-host.js.map
