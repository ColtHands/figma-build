import { fetchFileData, fetchFileNodes } from './figmaApi'
import { getNodeByName } from './utils/helpers'
import {Node, StyleType, type ThemeMap} from "./types"
import { getFillThemeItem } from "./utils/fillTheme/getFillThemeItem"
import { getEffectThemeItem } from "./utils/effectsTheme/getEffectThemeItem"
import { getTextThemeItem } from "./utils/textTheme/getTextThemeItem"

export async function getFigmaThemeStyles(fileId: string): Promise<ThemeMap> {
    const fileData: any = await fetchFileData(fileId)
    const styleNodeIds: any = Object.keys(fileData.styles)

    const themeMap: ThemeMap = Object.values(fileData.styles)
        .reduce((prev: any, values: any) => ({...prev, [values.name]: { styleType: values.styleType }}), {}) as ThemeMap;

    const nodeData: any = await fetchFileNodes(fileId, styleNodeIds)
    const nodes: any = nodeData.nodes

    Object.entries(themeMap).forEach(([key, values]) => {
        const node: Node = getNodeByName(nodes, key)

        switch (values.styleType) {
            case StyleType.FILL:
                Object.assign(values, getFillThemeItem(node))
                break
            case StyleType.EFFECT: // shadows, blurs etc...
                Object.assign(values, getEffectThemeItem(node))
                break
            case StyleType.TEXT: // text styles: font-family, font-weight, font-size, line-height, letter-spacing, paragraph-spacing, text-decorations, text-transform, etc.
                Object.assign(values, getTextThemeItem(node))
                break
        }
    })
    
    return themeMap
}