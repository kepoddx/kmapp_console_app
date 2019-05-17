import * as path from 'path'
import { of } from 'rxjs'

export function getConfig$(platform) {
    const filePath = path.join(process.cwd(), 'config',`${platform}.config.json`)
    const configFile = require(filePath)
    return of(configFile)
}