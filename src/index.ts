#!/usr/bin/env node
import { Commands, OutputFormat } from './types'
import {
    fileId,
    filename,
    outputPath,
    command,
    outputFormat
} from "./arguments"
import { getFigmaThemeStyles } from './getFigmaThemeStyles'
import { writeFile } from './utils/writeFile'
import { stringifyTheme } from './utils/stringifyTheme'
import { toCss } from './utils/parseJsonToCss'

if(command === Commands.theme) {
    getFigmaThemeStyles(fileId).then(theme => {
        /** Remove styleType field from output theme */
        const outputTheme = stringifyTheme(theme)

        if(outputFormat === OutputFormat.stdout) {
            process.stdout.write(outputTheme)
        } else if(!outputFormat && filename || outputFormat === OutputFormat.json) {
            let outputFilename = filename || 'theme.json'

            writeFile(outputFilename, outputTheme, outputPath)
        } else if(outputFormat === OutputFormat.commonjs) {
            let outputFilename = filename || 'theme.js'

            writeFile(outputFilename, `module.exports = ${outputTheme}`, outputPath)
        } else if(outputFormat === OutputFormat.esm) {
            let outputFilename = filename || 'theme.js'

            writeFile(outputFilename, `export default ${outputTheme}`, outputPath)
        } else if(outputFormat === OutputFormat["css-variables"]) {
            let outputFilename = filename || 'theme.css'
            // let outputCssTheme = parseJsonToCss(theme);
            writeFile(outputFilename, toCss(theme), outputPath)
        }

        /** TODO Add css theme @ColtHands */
        /** TODO Add regexp to parse css styles @ColtHands */
    })
}