import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { exitWithMessage } from './utils/exitWithMessage'
import { type Arguments, Commands, OutputFormat } from './types'

const argvWithoutBin = hideBin(process.argv)

/** 
 * `as unknown as Arguments` is intentional, otherwise setting types is a pain
 * @see https://github.com/yargs/yargs/blob/main/docs/typescript.md
 */
const args = yargs(argvWithoutBin).argv as unknown as Arguments

// TODO: Add -v | --version flags
// TODO: Add `--help` flag and shouldThrowWithHelpMessage logic
// TODO: Add correct filename logic
// TODO: Add all output formats

export const command = argvWithoutBin[0]
export const accessToken = args.accessToken
export const file = args.file
export const outputPath = args.outputPath || ''
export const filename = args.filename
export const outputFormat: OutputFormat = args.outputFormat || "json"

if(!accessToken) { exitWithMessage("--accessToken wasn't provided") }
if(!fileId) { exitWithMessage("--fileId wasn't provided") }
if(!(command in Commands)) { exitWithMessage(`Initial command wasn't found, was looking for [${Object.values(Commands).join(" | ")}]`) }
if(!(outputFormat in OutputFormat)) { exitWithMessage(`Unrecognized outputFormat provided, provided ${outputFormat}, was looking [${Object.values(OutputFormat).join(" | ")}]`) }