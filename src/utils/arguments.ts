import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import type { Arguments } from '../types'

const args: Arguments = yargs(hideBin(process.argv)).argv

export const accessToken = args.accessToken
export const file = args.file

if(!accessToken) { throw new Error("--accessToken wasn't provided")}

// process.exit()