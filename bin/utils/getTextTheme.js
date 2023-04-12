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
    exports.getTextThemeStyles = void 0;
    function getTextThemeStyles(node) {
        var _a;
        if (!((_a = node === null || node === void 0 ? void 0 : node.document) === null || _a === void 0 ? void 0 : _a.style))
            return {};
        var _b = node.document.style, fontFamily = _b.fontFamily, fontWeight = _b.fontWeight, fontSize = _b.fontSize, letterSpacing = _b.letterSpacing, lineHeight = _b.lineHeight;
        return {
            fontFamily: fontFamily,
            fontWeight: fontWeight,
            fontSize: fontSize,
            letterSpacing: letterSpacing,
            lineHeight: lineHeight
        };
    }
    exports.getTextThemeStyles = getTextThemeStyles;
});
