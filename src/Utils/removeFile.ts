import fs from 'fs'

export default function removeFile(path: any) {
    fs.rmSync(path)
    return true
}
