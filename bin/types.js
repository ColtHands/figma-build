(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Commands = exports.OutputFormat = exports.FillType = exports.StyleType = void 0;
    var StyleType;
    (function (StyleType) {
        StyleType["FILL"] = "FILL";
        StyleType["EFFECT"] = "EFFECT";
        StyleType["TEXT"] = "TEXT";
    })(StyleType = exports.StyleType || (exports.StyleType = {}));
    var FillType;
    (function (FillType) {
        FillType["SOLID"] = "SOLID";
        FillType["GRADIENT_LINEAR"] = "GRADIENT_LINEAR";
        FillType["GRADIENT_RADIAL"] = "GRADIENT_RADIAL";
        FillType["GRADIENT_ANGULAR"] = "GRADIENT_ANGULAR";
        FillType["GRADIENT_DIAMOND"] = "GRADIENT_DIAMOND";
        FillType["IMAGE"] = "IMAGE";
    })(FillType = exports.FillType || (exports.FillType = {}));
    var OutputFormat;
    (function (OutputFormat) {
        OutputFormat["json"] = "json";
        OutputFormat["esm"] = "esm";
        OutputFormat["commonjs"] = "commonjs";
        OutputFormat["css"] = "css";
        OutputFormat["stdout"] = "stdout";
    })(OutputFormat = exports.OutputFormat || (exports.OutputFormat = {}));
    var Commands;
    (function (Commands) {
        Commands["theme"] = "theme";
        Commands["components"] = "build";
    })(Commands = exports.Commands || (exports.Commands = {}));
});
