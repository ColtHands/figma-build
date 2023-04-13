#!/usr/bin/env node
import { fileId, filename, outputPath, command, outputFormat } from "./arguments"
import { Commands, OutputFormat } from './types'
import { writeFile } from './utils/writeFile'
import { parseColorFromNode } from "./utils/parseColor";
import { getTextThemeStyles } from './utils/getTextTheme'
import { getFigmaThemeStyles } from './getFigmaThemeStyles'
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
