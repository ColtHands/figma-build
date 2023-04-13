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
import { toCssVariables, toCssClassNames } from './utils/parseJsonToCss'

if(command === Commands.theme) {
    getFigmaThemeStyles(fileId).then(theme => {
        console.log("THEME", theme)
        /** Parse javascript object to JSON while removing unnecessary fields */
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

            writeFile(outputFilename, toCssVariables(theme), outputPath)
        } else if(outputFormat === OutputFormat.css) {
            let outputFilename = filename || 'theme.css'

            writeFile(outputFilename, toCssClassNames(theme), outputPath)
        } else {
            throw `outputFormat ${outputFormat} is not yet supported`
        }
    })
}