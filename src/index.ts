#!/usr/bin/env node
import { fileId, outputPath, command, outputFormat } from "./arguments"
import { Commands, OutputFormat } from './types'
import { writeFile } from './utils/writeFile'
import { getFigmaThemeStyles } from './getFigmaThemeStyles'

if(command === Commands.theme) {
    getFigmaThemeStyles(fileId).then(theme => {

        console.log("THEME", theme)

        if(!outputFormat || outputFormat === OutputFormat.json) {
            writeFile('output', 'json', JSON.stringify(theme, null, 4), outputPath)
        }

        if(outputFormat == OutputFormat.commonjs) {
            writeFile('output', 'js', `module.exports = ${JSON.stringify(theme, null, 4)}`, outputPath)
        }

        /** TODO Add css theme @ColtHands */
        /** TODO Add regexp to parse css styles @ColtHands */
    })
}