import fs from 'fs'
import path from 'path'

export function writeFile(name: string, extension: string, contents: string, filePath: string = '') {
    const filename = `${name}.${extension}`
    const dir = path.join(process.cwd(), filePath, filename)

    fs.writeFile(dir, contents, {}, function(err) {
        if(err) console.log("File could not be written", err)
        else console.log("Styles were written to", dir)
    })
}