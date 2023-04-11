#!/usr/bin/env node
import { fileId, filename, outputPath, command, outputFormat } from "./arguments"
import { Commands, OutputFormat } from './types'
import { fetchFileData, fetchFileNodes } from './figmaApi'
import { writeFile } from './utils/writeFile'
import { getNodeByName } from './utils/helpers'
import { getColorThemeStyles } from "./utils/getColorTheme";
import { getTextThemeStyles } from './utils/getTextTheme'
import { type ColorThemeItem, type EffectThemeItem, StyleType, type ThemeMap} from "./types";

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

async function getFigmaThemeStyles() {
    const fileData: any = await fetchFileData(file)
    const styleNodeIds: any = Object.keys(fileData.styles)
    console.log('styleNodeIds', styleNodeIds)

    const nodeData: any = await fetchFileNodes(file, styleNodeIds)
    const nodes: any = nodeData.nodes
    // console.log("nodes", nodes)

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

function getEffectThemeItem(node): Omit<EffectThemeItem, "styleType"> {
    // TODO: parse effect styles
    return { boxShadow: "" }
}

