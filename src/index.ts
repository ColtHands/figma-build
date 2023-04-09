#!/usr/bin/env node
import { file, filename, outputPath, command } from "./arguments"
import { Commands } from './types'
import { fetchFileData, fetchFileNodes } from './figmaApi'
import { writeFile } from './utils/writeFile'
import { getNodeByName } from './utils/helpers'
import { getColorThemeStyles } from "./utils/getColorTheme";
import { getTextThemeStyles } from './utils/getTextTheme'
import { type ColorThemeItem, type EffectThemeItem, StyleType, type ThemeMap} from "./types";

if(command === Commands.theme) {
    getFigmaThemeStyles().then(data => {
        writeFile('output', 'json', JSON.stringify(data), outputPath)
    })
}

async function getFigmaThemeStyles() {
    const fileData: any = await fetchFileData(file)
    const styleNodeIds: any = Object.keys(fileData.styles)
    console.log('styleNodeIds', styleNodeIds)

    const nodeData: any = await fetchFileNodes(file, styleNodeIds)
    const nodes: any = nodeData.nodes

    Object.entries(themeMap).forEach(([key, values]) => {
        const node = getNodeByName(nodes, key)

        switch (values.styleType) {
            case StyleType.FILL:
                Object.assign(values, getColorThemeStyles(node))
                break
            case StyleType.EFFECT: // shadows, blurs etc...
                Object.assign(values, getEffectThemeItem(node))
                break
            case StyleType.TEXT: // text styles: font-family, font-weight, font-size, line-height, letter-spacing, paragraph-spacing, text-decorations, text-transform, etc.
                Object.assign(values, getTextThemeStyles(node))
                break
        }
    })
    
    return themeMap
}

function getEffectThemeItem(node): Omit<EffectThemeItem, "styleType"> {
    // TODO: parse effect styles
    return { boxShadow: "" }
}

