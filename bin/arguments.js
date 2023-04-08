var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "yargs", "yargs/helpers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.outputFormat = exports.outputPath = exports.file = exports.accessToken = void 0;
    var yargs_1 = __importDefault(require("yargs"));
    var helpers_1 = require("yargs/helpers");
    /**
     * `as unknown as Arguments` is intentional, otherwise setting types is a pain
     * @see https://github.com/yargs/yargs/blob/main/docs/typescript.md
     */
    var args = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv)).argv;
    // TODO: Add -v | --version flags
    // TODO: Add `figma-build theme` flag
    // TODO: Add `figma-build components` flag
    // TODO: Add --outputPath argument - the folder in which built files should be placed
    // TODO: Add --outputFormat argument - format of the built files - json | js | ts | css | css-in-js | sass | scss | postcss (for now at least json)
    exports.accessToken = args.accessToken;
    exports.file = args.file;
    exports.outputPath = args.outputPath;
    exports.outputFormat = args.outputFormat;
    if (!exports.accessToken) {
        throw "--accessToken wasn't provided";
    }
    if (!exports.file) {
        throw "--file wasn't provided";
    }
});
