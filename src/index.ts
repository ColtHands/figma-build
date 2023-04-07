#!/usr/bin/env node

import { file } from "./utils/arguments"
import { fetchFileData, fetchFileNodes } from './utils/figmaApi'
import {
    themePrimary,
    themeDanger,
    themeInfo
} from './themeNames'

import { getNodeByName } from './utils/helpers'

getFigmaThemeStyles()

async function getFigmaThemeStyles() {
    const fileData: any = await fetchFileData(file)
    const styleNodeIds: any = Object.keys(fileData.styles)
    console.log('styleNodeIds', styleNodeIds)

    const nodeData: any = await fetchFileNodes(file, styleNodeIds)
    const nodes: any = nodeData.nodes
    console.log("nodes", nodes)
    
    const nodeStyles = getNodeByName(nodes, themePrimary)
    const nodeFills = nodeStyles.document.fills
    console.log('nodeFills', nodeFills)

    return nodeFills

    // TODO: Parse rgba to hex or normal rgba
    // TODO: Create json for those themes
    // TODO: Publish package
}
