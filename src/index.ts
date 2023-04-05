import './utils/expandDotEnv'
import { fetchFileData, fetchFileNodes } from './utils/figmaApi'

import { getNodeByName } from './utils/helpers'
import { parseColorFromNode } from "./utils/parseColor";
import { type ColorThemeItem, type EffectThemeItem, StyleType, type TextThemeItem, type ThemeMap} from "./types";

getFigmaThemeStyles("ADLFGyGwPwwHj3U5kZOdH9").then(console.log)

async function getFigmaThemeStyles(fileId: string): Promise<ThemeMap> {
    const fileData = await fetchFileData(fileId)
    const styleNodeIds = Object.keys(fileData.styles)

    const themeMap: ThemeMap = Object.values(fileData.styles)
        .reduce((prev, values) => ({...prev, [values.name]: { styleType: values.styleType }}), {})
    
    const nodeData = await fetchFileNodes(fileId, styleNodeIds)
    const nodes = nodeData.nodes

    Object.entries(themeMap).forEach(([key, values]) => {
        const node = getNodeByName(nodes, key)
        
        switch (values.styleType) {
            case StyleType.FILL:
                Object.assign(values, getColorThemeItem(node))
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

    // TODO: Parse rgba to hex or normal rgba
    // TODO: Create json for those themes
    // TODO: Publish package
}


function getColorThemeItem(node): Omit<ColorThemeItem, "styleType"> {
    return { color: parseColorFromNode(node) }
}

function getEffectThemeItem(node): Omit<EffectThemeItem, "styleType"> {
    // TODO: parse effect styles
    return { boxShadow: "" }
}

function getTextThemeItem(node): Omit<TextThemeItem, "styleType"> {
    // TODO: parse text styles
    return { fontSize: "" }
}
