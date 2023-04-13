#!/usr/bin/env node
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./arguments", "./types", "./utils/writeFile", "./getFigmaThemeStyles"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var arguments_1 = require("./arguments");
    var types_1 = require("./types");
    var writeFile_1 = require("./utils/writeFile");
    var getFigmaThemeStyles_1 = require("./getFigmaThemeStyles");
    if (arguments_1.command === types_1.Commands.theme) {
        (0, getFigmaThemeStyles_1.getFigmaThemeStyles)(arguments_1.fileId).then(function (theme) {
            console.log("THEME", theme);
            if (!arguments_1.outputFormat || arguments_1.outputFormat === types_1.OutputFormat.json) {
                (0, writeFile_1.writeFile)('output', 'json', JSON.stringify(theme, null, 4), arguments_1.outputPath);
            }
            if (arguments_1.outputFormat == types_1.OutputFormat.commonjs) {
                (0, writeFile_1.writeFile)('output', 'js', "module.exports = ".concat(JSON.stringify(theme, null, 4)), arguments_1.outputPath);
            }
            /** TODO Add css theme @ColtHands */
            /** TODO Add regexp to parse css styles @ColtHands */
        });
    }
});
