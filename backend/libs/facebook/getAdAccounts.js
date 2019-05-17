import * as path from 'path'

import { switchMap } from "rxjs/operators";
import { combineLatest, of } from "rxjs";

import { getMainAccountUrl$, getAccessToken$ } from "./facebook.lib";
import { getPagedData$, exists$ } from "../../utils";
import { getAccountsFile$, saveAccountsToFile$ } from '../../data/facebook'

/**
 * 
 * @param {fromFile: boolean, updateFile: boolean, saveToFile: boolean} config 
 */


export function getAdAccounts$(config) {
  if (!config) {
    return combineLatest(getMainAccountUrl$(), getAccessToken$()).pipe(
      switchMap(([urlConfig, accessToken]) =>
        getPagedData$(urlConfig.url, {
          params: { access_token: accessToken, fields: urlConfig.params} // urlConfig.params = "name,account_id"
        })
      )
    )
  }
  if(config.fromFile) {
    return getAccountsFile$()
        .pipe(
        )
  }
  if(config.updateFile) {
    return combineLatest(getMainAccountUrl$(), getAccessToken$()).pipe(
        switchMap(([urlConfig, accessToken]) =>
            getPagedData$(urlConfig.url, {
            params: { access_token: accessToken, fields: urlConfig.params} // urlConfig.params = "name,account_id"
            })
        ),
        switchMap(accounts => saveAccountsToFile$(accounts)),
        switchMap(() => getAccountsFile$())
    )  
  }
}
