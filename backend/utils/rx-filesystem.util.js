import * as fs from 'fs'
import * as path from 'path'

import jsonfile from 'jsonfile'
import editJsonFile from 'edit-json-file'

import { bindCallback, of } from 'rxjs'

export const readdir$ = bindCallback(fs.readdir)

export const saveJson$ = bindCallback(jsonfile.writeFile)

export function createJsonConfig$(file, configObj) {
    let cfgfile = editJsonFile(file);
    for( let key in configObj ) {
        cfgfile.set(key, configObj[key])
    }
    cfgfile.save();
    let reloadedFile = editJsonFile(file, { autosave: true})
    return of(reloadedFile.toObject())
}

export function getJsonConfig$(file) {
    let cfgfile = editJsonFile(file);
    return of(cfgfile)
}

export function updateJsonConfig$(file) {
    let reloadedFile = editJsonFile(file, { autosave: true});
    return of(reloadedFile)
}

