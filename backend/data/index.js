import * as fs from 'fs'
import * as path from 'path'

import { of } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'

import csvjson from 'csvjson'
import jsonfile from 'jsonfile'
import { readdir$ } from '../utils';
import { bindCallback } from 'rxjs';
import { filter } from 'rxjs/operators';

const saveJson$ = bindCallback(jsonfile.writeFile)
const rawDataPath = path.join(process.cwd(), 'backend', 'data', 'raw')
const cleanDataPath = path.join(process.cwd(), 'backend', 'data', 'clean')

export function getRawCsv$(filename) {
    const file = `${rawDataPath}\\${filename}.csv`;
    const data = fs.readFileSync(file, { encoding: 'utf8'});
    return of(csvjson.toObject(data))
        .pipe(catchError(err => of(err.message)))
}
export function getCleanCsv$(filename) {
    const file = `${cleanDataPath}\\${filename}.csv`;
    const data = fs.readFileSync(file, { encoding: 'utf8'});
    return of(csvjson.toObject(data))
        .pipe(catchError(err => of(err.message)))
}
export function getCleanJson(filename) {
    const data = require(`./clean/${filename}.json`)
    return data
}
export function getCleanJsonFilter(filename, filterBy, value) {
    const data = require(`./clean/${filename}.json`)
    return data.filter(rec => rec[filterBy] === value)
}
export function getCleanJson$(filename) {
    const data = require(`./clean/${filename}.json`)
    return of(data)
}
export function getQaJson(filename, oas) {
    const data = require(`./clean/${filename}.json`)
    return data.filter(site => site.bauBuild === oas).map(site => ({ checked: false, ...site }))
}

export function getRawFilesList$(site) {
    return readdir$(`${rawDataPath}/${site}`)
        .pipe(
            map(res => {
                const fpath = path.join(rawDataPath, site )
                return { fpath: fpath, files: res[1]}
            })
        )
}

export function getCleanJsonPath$() {
    return of(cleanDataPath)
}

export function saveCleanJson$(fileName, data) {
    let file = mkCleanFilePath(`${fileName}.json`)
    return saveJson$(file, data)
}

export function saveCleanJsonToFile$(fileName, data) {
    let file = mkCleanFilePath(`${fileName}.json`)
    return saveJson$(file, data)
        .pipe(switchMap(()=> {
            let newFile = require(file)
            return of(newFile)
        }))
}


/** =============================== PRIVATE FUNCTIONS =============================== */

function mkCleanFilePath(fileName) {
    return path.join(cleanDataPath, fileName)
}