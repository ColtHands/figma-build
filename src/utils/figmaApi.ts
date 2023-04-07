import axios from 'axios'
import type { FigmaRestMethods } from "../types"

export const apiUrl = "https://api.figma.com/v1"
export const authHeader = {
    "X-Figma-Token": process.env.FIGMA_TOKEN
}

export function figmaRequest(method: string): Promise<unknown> {
    return axios({
        method: 'get',
        url: `${apiUrl}${method}`,
        headers: authHeader
    }).then(({ data }) => data).catch(err => console.error('Failed to fetch data from Figma Rest API', err))
}

export function fetchFileData(fileId: string) {
    return figmaRequest(`/files/${fileId}`)
}

export function fetchFileNodes(fileId: string, nodeIds: string[]) {
    const nodeIdsAsUrlParams = new URLSearchParams({
        ids: nodeIds
    })
    return figmaRequest(`/files/${fileId}/nodes?${nodeIdsAsUrlParams.toString()}`)
}