import axios from 'axios'
import { accessToken } from './arguments'

export const apiUrl = "https://api.figma.com/v1"
export const authHeader = {
    "X-Figma-Token": accessToken
}

export function figmaRequest(method: string): Promise<unknown> {
    return axios({
        method: 'get',
        url: `${apiUrl}${method}`,
        headers: authHeader
    }).then(({ data }: any) => data).catch((err:any) => console.error('Failed to fetch data from Figma Rest API', err))
}

export function fetchFileData(fileId: string) {
    return figmaRequest(`/files/${fileId}`)
}

export function fetchFileNodes(fileId: string, nodeIds: string[]) {
    const nodeIdsAsUrlParams = new URLSearchParams([
        ["ids", nodeIds.join(',')]
    ])
    return figmaRequest(`/files/${fileId}/nodes?${nodeIdsAsUrlParams.toString()}`)
}