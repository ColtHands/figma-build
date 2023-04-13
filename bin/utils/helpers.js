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
    exports.getNodeByName = void 0;
    /**
     * This function takes all nodes received from `/files/:fileId/nodes`
     * @returns - single node data found by it's name
     */
    function getNodeByName(nodes, name) {
        var nodeId = Object.keys(nodes).find(function (key) { return nodes[key].document.name === name; });
        if (!nodeId)
            return null;
        return nodes[nodeId];
    }
    exports.getNodeByName = getNodeByName;
});
