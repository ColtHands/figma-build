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
    exports.getNodeByName = exports.getNodeFills = void 0;
    /**
     * This function takes node information received from `/files/:fileId/nodes` for a single node
     */
    function getNodeFills() { }
    exports.getNodeFills = getNodeFills;
    /**
     * This function takes all nodes received from `/files/:fileId/nodes`
     * @returns - single node data found by it's name
     */
    function getNodeByName(nodes, name) {
        console.log(getNodeByName, nodes);
        return nodes[Object.keys(nodes).find(function (key) { return nodes[key].document.name === name; })];
    }
    exports.getNodeByName = getNodeByName;
});
