var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../types"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseColorFromNode = void 0;
    var types_1 = require("../types");
    var directionMap = {
        "linear-gradient": "180deg",
        "radial-gradient": "50% 50% at 50% 50%",
        "conic-gradient": "from 180deg at 50% 50%"
    };
    function parseColorFromNode(node) {
        var _a, _b;
        var fills = (_b = (_a = node === null || node === void 0 ? void 0 : node.document) === null || _a === void 0 ? void 0 : _a.fills) !== null && _b !== void 0 ? _b : [];
        if (fills.length === 1 && fills[0].type === types_1.FillType.SOLID) {
            // NOTE: simple color, other things will be parsed as gradient
            return extractColor(fills[0]);
        }
        var parsedFills = [];
        for (var _i = 0, _c = fills !== null && fills !== void 0 ? fills : []; _i < _c.length; _i++) {
            var fill = _c[_i];
            switch (fill.type) {
                case types_1.FillType.SOLID:
                    parsedFills.push(extractSingleColorGradient(fill));
                    break;
                case types_1.FillType.GRADIENT_LINEAR:
                    parsedFills.push(extractGradient(fill, "linear-gradient"));
                    break;
                case types_1.FillType.GRADIENT_RADIAL:
                case types_1.FillType.GRADIENT_DIAMOND:
                    parsedFills.push(extractGradient(fill, "radial-gradient"));
                    break;
                case types_1.FillType.GRADIENT_ANGULAR:
                    parsedFills.push(extractGradient(fill, "conic-gradient"));
                    break;
            }
        }
        var hasDifferentTypes = fills.some(function (fill) { return fills.some(function (f) { return f.type !== fill.type; }); });
        if (hasDifferentTypes) {
            // NODE: mixed gradients comes in reversed order, have no idea why
            parsedFills.reverse();
        }
        return parsedFills.join(", ");
    }
    exports.parseColorFromNode = parseColorFromNode;
    function extractSingleColorGradient(fill) {
        var color = extractColor(fill);
        return "linear-gradient(".concat(["0deg", color, color].join(", "), ")");
    }
    function extractGradient(fill, gradientFunction) {
        var measureAs = gradientFunction === "conic-gradient" ? "deg" : "%";
        return "".concat(gradientFunction, "(").concat(__spreadArray([directionMap[gradientFunction]], extractGradientStops(fill, measureAs), true).join(", "), ")");
    }
    function extractGradientStops(fill, measureAs) {
        return fill.gradientStops.map(function (gradientStop) {
            var color = extractColor(__assign(__assign({}, gradientStop), { opacity: fill.opacity }));
            var stopPointPercentage = Math.round(gradientStop.position * (measureAs === "%" ? 100 : 360));
            return "".concat(color, " ").concat(stopPointPercentage).concat(measureAs);
        });
    }
    function extractColor(fill) {
        var _a;
        var color = fill.color;
        var opacity = (_a = fill.opacity) !== null && _a !== void 0 ? _a : 1;
        var rgbValues = [color.r, color.g, color.b];
        return ("rgba(".concat(__spreadArray(__spreadArray([], rgbValues.map(parseColorValue), true), [opacity * color.a], false).join(", "), ")"));
    }
    function parseColorValue(value) {
        return Math.round(value * 255);
    }
});
