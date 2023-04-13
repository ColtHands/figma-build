/**
 * This function takes all nodes received from `/files/:fileId/nodes`
 * @returns - single node data found by it's name 
 */
export function getNodeByName(nodes: any, name: string) {
    const nodeId = Object.keys(nodes).find(key => nodes[key].document.name === name)

    if(!nodeId) return null;

    return nodes[nodeId]
}

export function removeEmptyFields<T extends object>(data: T): Partial<T> {
    return Object.fromEntries(Object.entries(data).filter(([, value]) => !isEmpty(value))) as Partial<T>;
}
export function isEmpty(value: any) {
    return value === null || value === undefined || Array.isArray(value) && value.length === 0;
}