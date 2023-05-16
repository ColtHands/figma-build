import { spawnSync } from "node:child_process";

export default function runFigmaBuild() {
    // return spawnSync('pnpm', ['build']).stdout.toString()
    return spawnSync('ls', ['-la']).stdout.toString()
}