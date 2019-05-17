import * as path from 'path'
import { of } from 'rxjs'
import { saveJson$ } from '../../utils';
import { getConfig$ } from '../../config/facebook';
import { switchMap } from 'rxjs/operators';

import capitalize from 'capitalize'

const platform = 'facebook'
const accountsPath = path.join(process.cwd(), 'backend', 'data', platform)
const accountsFile = path.join(process.cwd(), 'backend', 'data', platform, `${platform}.accounts.json`)

export function getAdAccount$(account_id) {
    const accounts = require(accountsFile)
    const account = accounts.filter(acc => acc.account_id === account_id)
    return of(account)
}

export function getAccountsFile$() {
    const accounts = require(accountsFile)
    return of(accounts)
}

export function saveAccountsToFile$(accounts) {
    return saveJson$(accountsFile, accounts)
}

export function filterAccounts$(accounts) {
    return getConfig$(platform)
        .pipe(
            switchMap(({accountsFilter}) => {
                let parts = /\/(.*)\/(.*)/.exec(accountsFilter)
                let reg = new RegExp(parts[1], parts[2])
                let filteredAccounts = accounts.filter(account => (reg.test(account.name) != true))
                return of(filteredAccounts)
            })
        )
}

export function addDisplayNameToAccountsFile$() {
    const accounts = require(accountsFile)
    let enrichedAccounts = accounts.map(account =>  {
        account.displayName = capitalize.words(account.name.replace(/Ad Account/g, '').replace(/\s\s/g, ' ').replace(/\(/g, '').replace(/\)/g, '').replace(/\./g, '').replace(/-/g, "").trim())
        account.fileName = account.displayName.replace(/\s+/g, "")
        return account
    })
    let file = mkPlatformFilePath('facebook.enriched-accounts.json')
    return saveJson$(file, enrichedAccounts)
}

/** =============================== PRIVATE FUNCTIONS =============================== */

function mkPlatformFilePath(fileName) {
    return path.join(accountsPath, fileName)
}


// addDisplayNameToAccountsFile$()
// .subscribe(d => console.log(d))