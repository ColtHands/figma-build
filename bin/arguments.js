var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "yargs", "yargs/helpers", "./types"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.outputFormat = exports.filename = exports.outputPath = exports.fileId = exports.accessToken = exports.command = void 0;
    var yargs_1 = __importDefault(require("yargs"));
    var helpers_1 = require("yargs/helpers");
    var types_1 = require("./types");
    var argvWithoutBin = (0, helpers_1.hideBin)(process.argv);
    /**
     * `as unknown as Arguments` is intentional, otherwise setting types is a pain
     * @see https://github.com/yargs/yargs/blob/main/docs/typescript.md
     */
    var args = (0, yargs_1.default)(argvWithoutBin).argv;
    // TODO: Add -v | --version flags
    // TODO: Add `figma-build theme` flag
    // TODO: Add `figma-build components` flag
    // TODO: Add `--help` flag and shouldThrowWithHelpMessage logic
    // TODO: Add correct filename logic
    // TODO: Add all output formats
    // TODO: Add css-variables as output format
    console.log("ARGUMENTS", (0, helpers_1.hideBin)(process.argv), args);
    exports.command = argvWithoutBin[0];
    exports.accessToken = args.accessToken;
    exports.fileId = args.fileId;
    exports.outputPath = args.outputPath || '';
    exports.filename = args.filename || '';
    exports.outputFormat = args.outputFormat;
    if (!exports.accessToken) {
        throw "--accessToken wasn't provided";
    }
    if (!exports.fileId) {
        throw "--fileId wasn't provided";
    }
    if (!(exports.command in types_1.Commands)) {
        throw "Initial command wasn't found, was looking for [".concat(Object.values(types_1.Commands).join(" | "), "]");
    }
});
