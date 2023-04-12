#!/usr/bin/env node
import { fileId, filename, outputPath, command, outputFormat } from "./arguments"
import { Commands, OutputFormat } from './types'
import { fetchFileData, fetchFileNodes } from './figmaApi'
import { writeFile } from './utils/writeFile'
import { getNodeByName } from './utils/helpers'
import { parseColorFromNode } from "./utils/parseColor";
import { getTextThemeStyles } from './utils/getTextTheme'
import { type ColorThemeItem, type EffectThemeItem, StyleType, type ThemeMap, type TextThemeItem } from "./types";

if(command === Commands.theme) {
    getFigmaThemeStyles(fileId).then(theme => {
        console.log("THEME", theme)
        if(!outputFormat || outputFormat === OutputFormat.json) {
            writeFile('output', 'json', JSON.stringify(theme, null, 4), outputPath)
        }
        if(outputFormat == OutputFormat.commonjs) {
            writeFile('output', 'js', `module.exports = ${JSON.stringify(theme, null, 4)}`, outputPath)
        }
    })
}

async function getFigmaThemeStyles(fileId: string): Promise<ThemeMap> {
    const fileData: any = await fetchFileData(fileId)
    const styleNodeIds: any = Object.keys(fileData.styles)

    const themeMap: ThemeMap = Object.values(fileData.styles)
        .reduce((prev: any, values: any) => ({...prev, [values.name]: { styleType: values.styleType }}), {}) as ThemeMap;

    const nodeData: any = await fetchFileNodes(fileId, styleNodeIds)
    const nodes: any = nodeData.nodes

    Object.entries(themeMap).forEach(([key, values]) => {
        const node = getNodeByName(nodes, key)

        switch (values.styleType) {
            case StyleType.FILL:
                if(node.document.name === "gradient") console.log("node", node.document)
                
                Object.assign(values, getColorThemeItem(node))
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

function getColorThemeItem(node: any): Omit<ColorThemeItem, "styleType"> {
    return { color: parseColorFromNode(node) }
}

function getEffectThemeItem(node: any): Omit<EffectThemeItem, "styleType"> {
    // TODO: parse effect styles
    return { boxShadow: "" }
}

function getTextThemeItem(node: any): Omit<TextThemeItem, "styleType"> {
    // TODO: parse text styles
    return { fontSize: "" }
}
