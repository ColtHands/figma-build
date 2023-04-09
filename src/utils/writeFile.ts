import fs from 'node:fs/promises'
import path from 'path'

export async function writeFile(name: string, extension: string, contents: string, filePath: string = '') {
    const filename = `${name}.${extension}`
    const dirToWrite = path.join(process.cwd(), filePath)
    const fullFilePath = path.join(dirToWrite, filename)

    const hasDir = await dirExists(dirToWrite)

    if(!hasDir) {
        await fs.mkdir(dirToWrite, { recursive: true })
    }

    fs.writeFile(fullFilePath, contents, {}).then(function() {
        console.log("Styles were written to", fullFilePath)
    }).catch(err => {
        console.log("File could not be written", err)
    })
}

export async function dirExists(dirPath: string) {
    let dirExists = false

    await fs.access(dirPath).then((e:any) => {
        dirExists = true
    }).catch(() => {
        console.log(dirPath, "doesn't exist")
    })

    return dirExists
}
