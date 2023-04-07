var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "axios", "./arguments"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fetchFileNodes = exports.fetchFileData = exports.figmaRequest = exports.authHeader = exports.apiUrl = void 0;
    var axios_1 = __importDefault(require("axios"));
    var arguments_1 = require("./arguments");
    exports.apiUrl = "https://api.figma.com/v1";
    exports.authHeader = {
        "X-Figma-Token": arguments_1.accessToken
    };
    function figmaRequest(method) {
        return (0, axios_1.default)({
            method: 'get',
            url: "".concat(exports.apiUrl).concat(method),
            headers: exports.authHeader
        }).then(function (_a) {
            var data = _a.data;
            return data;
        }).catch(function (err) { return console.error('Failed to fetch data from Figma Rest API', err); });
    }
    exports.figmaRequest = figmaRequest;
    function fetchFileData(fileId) {
        return figmaRequest("/files/".concat(fileId));
    }
    exports.fetchFileData = fetchFileData;
    function fetchFileNodes(fileId, nodeIds) {
        var nodeIdsAsUrlParams = new URLSearchParams([
            ["ids", nodeIds.join(',')]
        ]);
        console.log('nodeIdsAsUrlParams', nodeIdsAsUrlParams);
        return figmaRequest("/files/".concat(fileId, "/nodes?").concat(nodeIdsAsUrlParams.toString()));
    }
    exports.fetchFileNodes = fetchFileNodes;
});
