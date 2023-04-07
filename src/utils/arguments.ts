import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import type { Arguments } from '../types'

/** 
 * `as unknown as Arguments` is intentional, otherwise setting types is a pain
 * @see https://github.com/yargs/yargs/blob/main/docs/typescript.md
 */
const args = yargs(hideBin(process.argv)).argv as unknown as Arguments

export const accessToken = args.accessToken
export const file = args.file

if(!accessToken) { throw "--accessToken wasn't provided" }
if(!file) { throw "--file wasn't provided" }

// process.exit()