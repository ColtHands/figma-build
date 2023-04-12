#!/usr/bin/env node
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./arguments", "./types", "./figmaApi", "./utils/writeFile", "./utils/helpers", "./utils/parseColor", "./utils/getTextTheme", "./types"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var arguments_1 = require("./arguments");
    var types_1 = require("./types");
    var figmaApi_1 = require("./figmaApi");
    var writeFile_1 = require("./utils/writeFile");
    var helpers_1 = require("./utils/helpers");
    var parseColor_1 = require("./utils/parseColor");
    var getTextTheme_1 = require("./utils/getTextTheme");
    var types_2 = require("./types");
    if (arguments_1.command === types_1.Commands.theme) {
        getFigmaThemeStyles(arguments_1.fileId).then(function (theme) {
            console.log("THEME", theme);
            if (!arguments_1.outputFormat || arguments_1.outputFormat === types_1.OutputFormat.json) {
                (0, writeFile_1.writeFile)('output', 'json', JSON.stringify(theme, null, 4), arguments_1.outputPath);
            }
            if (arguments_1.outputFormat == types_1.OutputFormat.commonjs) {
                (0, writeFile_1.writeFile)('output', 'js', "module.exports = ".concat(JSON.stringify(theme, null, 4)), arguments_1.outputPath);
            }
        });
    }
    function getFigmaThemeStyles(fileId) {
        return __awaiter(this, void 0, void 0, function () {
            var fileData, styleNodeIds, themeMap, nodeData, nodes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, figmaApi_1.fetchFileData)(fileId)];
                    case 1:
                        fileData = _a.sent();
                        styleNodeIds = Object.keys(fileData.styles);
                        themeMap = Object.values(fileData.styles)
                            .reduce(function (prev, values) {
                            var _a;
                            return (__assign(__assign({}, prev), (_a = {}, _a[values.name] = { styleType: values.styleType }, _a)));
                        }, {});
                        return [4 /*yield*/, (0, figmaApi_1.fetchFileNodes)(fileId, styleNodeIds)];
                    case 2:
                        nodeData = _a.sent();
                        nodes = nodeData.nodes;
                        Object.entries(themeMap).forEach(function (_a) {
                            var key = _a[0], values = _a[1];
                            var node = (0, helpers_1.getNodeByName)(nodes, key);
                            switch (values.styleType) {
                                case types_2.StyleType.FILL:
                                    if (node.document.name === "gradient")
                                        console.log("node", node.document);
                                    Object.assign(values, getColorThemeItem(node));
                                    break;
                                case types_2.StyleType.EFFECT: // shadows, blurs etc...
                                    Object.assign(values, getEffectThemeItem(node));
                                    break;
                                case types_2.StyleType.TEXT: // text styles: font-family, font-weight, font-size, line-height, letter-spacing, paragraph-spacing, text-decorations, text-transform, etc.
                                    Object.assign(values, (0, getTextTheme_1.getTextThemeStyles)(node));
                                    break;
                            }
                        });
                        return [2 /*return*/, themeMap];
                }
            });
        });
    }
    function getColorThemeItem(node) {
        return { color: (0, parseColor_1.parseColorFromNode)(node) };
    }
    function getEffectThemeItem(node) {
        // TODO: parse effect styles
        return { boxShadow: "" };
    }
    function getTextThemeItem(node) {
        // TODO: parse text styles
        return { fontSize: "" };
    }
});
