import path from 'path'

/**
 * This function takes node information received from `/files/:fileId/nodes` for a single node
 */
export function getNodeFills(){}

/**
 * This function takes all nodes received from `/files/:fileId/nodes`
 * @returns - single node data found by it's name 
 */
export function getNodeByName(nodes: any, name: string) {
    const nodeId = Object.keys(nodes).find(key => nodes[key].document.name === name)

    if(!nodeId) return null;

    return nodes[nodeId]
}