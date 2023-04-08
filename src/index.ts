#!/usr/bin/env node
import { file, filename, outputPath } from "./arguments"
import { fetchFileData, fetchFileNodes } from './figmaApi'
import { writeFile } from './utils/writeFile'
import {
    themePrimary,
    themeDanger,
    themeInfo
} from './themeNames'

import { getNodeByName } from './utils/helpers'
import { parseColorFromNode } from "./utils/parseColor";
import { type ColorThemeItem, type EffectThemeItem, StyleType, type TextThemeItem, type ThemeMap} from "./types";

getFigmaThemeStyles().then(data => {
    writeFile('output', 'json', JSON.stringify(data), outputPath)
})

async function getFigmaThemeStyles() {
    const fileData: any = await fetchFileData(file)
    const styleNodeIds: any = Object.keys(fileData.styles)
    console.log('styleNodeIds', styleNodeIds)

    const nodeData: any = await fetchFileNodes(file, styleNodeIds)
    const nodes: any = nodeData.nodes
    console.log("nodes", nodes)
    
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

    return nodeFills

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
