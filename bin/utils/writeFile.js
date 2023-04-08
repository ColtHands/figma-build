var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "fs", "path"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.writeFile = void 0;
    var fs_1 = __importDefault(require("fs"));
    var path_1 = __importDefault(require("path"));
    function writeFile(name, extension, contents, filePath) {
        if (filePath === void 0) { filePath = ''; }
        var filename = "".concat(name, ".").concat(extension);
        var dir = path_1.default.join(process.cwd(), filePath, filename);
        fs_1.default.writeFile(dir, contents, {}, function (err) {
            if (err)
                console.log("File could not be written", err);
            else
                console.log("Styles were written to", dir);
        });
    }
    exports.writeFile = writeFile;
});
