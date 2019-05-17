import { generatePidJsonFile$ } from "../pids";
import { of } from 'rxjs'
import { getCleanJson$, getRawCsv$, saveCleanJsonToFile$, getCleanJsonPath$ } from '../index'

export class JsonTask {

    
    static generateMap$(objArr, key) {
        let newMap = objArr.reduce((map, obj) => {
            map.set(obj[key], obj)
            return map
        }, new Map())
        return of(newMap)
    }

    static genCampaignJsonFile$(campaignName) {
        return getRawCsv$(campaignName)
    }

    static saveJsonToFile$(fileName, data) {
        return saveCleanJsonToFile$(fileName, data)
    }

    static mkJsonPath$(fileName) {
        return getCleanJsonPath$(fileName)
    }

    static getJsonFile$(fileName) {
        return getCleanJson$(fileName)
    }
}