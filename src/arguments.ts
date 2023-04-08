import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import type { Arguments } from './types'

/** 
 * `as unknown as Arguments` is intentional, otherwise setting types is a pain
 * @see https://github.com/yargs/yargs/blob/main/docs/typescript.md
 */
const args = yargs(hideBin(process.argv)).argv as unknown as Arguments

// TODO: Add -v | --version flags
// TODO: Add `figma-build theme` flag
// TODO: Add `figma-build components` flag
// TODO: Add --outputPath argument - the folder in which built files should be placed
// TODO: Add --outputFormat argument - format of the built files - json | js | ts | css | css-in-js | sass | scss | postcss (for now at least json)

export const accessToken = args.accessToken
export const file = args.file
export const outputPath = args.outputPath
export const outputFormat = args.outputFormat

if(!accessToken) { throw "--accessToken wasn't provided" }
if(!file) { throw "--file wasn't provided" }