import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { type Arguments, Commands, OutputFormat } from './types'

const argvWithoutBin = hideBin(process.argv)

/** 
 * `as unknown as Arguments` is intentional, otherwise setting types is a pain
 * @see https://github.com/yargs/yargs/blob/main/docs/typescript.md
 */
const args = yargs(argvWithoutBin).argv as unknown as Arguments

// TODO: Add -v | --version flags
// TODO: Add `figma-build theme` flag
// TODO: Add `figma-build components` flag
// TODO: Add `--help` flag and shouldThrowWithHelpMessage logic
// TODO: Add correct filename logic
// TODO: Add all output formats
// TODO: Add css-variables as output format

console.log("ARGUMENTS", hideBin(process.argv), args)

export const command = argvWithoutBin[0]
export const accessToken = args.accessToken
export const file = args.file
export const outputPath = args.outputPath || ''
export const filename = args.filename || ''
export const outputFormat = args.outputFormat as OutputFormat

if(!accessToken) { throw "--accessToken wasn't provided" }
if(!file) { throw "--file wasn't provided" }
if(!(command in Commands)) { throw `Initial command wasn't found, was looking for [${Object.values(Commands).join(" | ")}]` }