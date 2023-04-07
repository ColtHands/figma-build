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
    exports.themeInfo = exports.themeDanger = exports.themePrimary = void 0;
    exports.themePrimary = "theme.primary";
    exports.themeDanger = "theme.danger";
    exports.themeInfo = "theme.danger";
});
