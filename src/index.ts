import { fetchFileData, fetchFileNodes } from './utils/figmaApi'
import {
    themePrimary,
    themeDanger,
    themeInfo
} from './themeNames'

import { getNodeByName } from './utils/helpers'

getFigmaThemeStyles()

async function getFigmaThemeStyles() {
    const fileData = await fetchFileData("P2oVdik0Q0pUoIxRIzaMjK")
    const styleNodeIds = Object.keys(fileData.styles)
    console.log('styleNodeIds', styleNodeIds)

    const nodeData = await fetchFileNodes("P2oVdik0Q0pUoIxRIzaMjK", styleNodeIds)
    const nodes = nodeData.nodes
    console.log("nodes", nodes)
    
    const nodeStyles = getNodeByName(nodes, themePrimary)
    const nodeFills = nodeStyles.document.fills
    console.log('nodeFills', nodeFills)

    // TODO: Parse rgba to hex or normal rgba
    // TODO: Create json for those themes
    // TODO: Publish package
}
