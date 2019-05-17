/**
 * Url Builder Utility Functions
 */

import { getConfig$ } from '../../config'

import { map, switchMap, catchError, tap } from 'rxjs/operators'
import { post$ } from '../../utils';
import { of } from 'rxjs';

const platform = 'facebook'

export function getMainAccountUrl$() {
    return getConfig$(platform)
        .pipe(
            map(({ baseUrl, urlSegments }) => ({ url: `${baseUrl}/${urlSegments.mainAccount.endpoint}`, params: urlSegments.mainAccount.params, fileName: urlSegments.mainAccount.fileName }))
        )
}

export function getAccessToken$() {
    return getConfig$(platform)
        .pipe(
            map(({ accessToken }) => accessToken)
        )
}

export function generateReport$(account_id, time_range, breakdown) {
    return getConfig$(platform)
        .pipe(
            map(({ baseUrl, accessToken, urlSegments: { reporting } }) => ({ baseUrl, accessToken, reporting })),
            tap(d => console.log(d)),
            switchMap(configObj => post$(`${configObj.baseUrl}/${account_id}/${configObj.reporting.endpoint}`, null, { params: { access_token: configObj.accessToken, fields: configObj.reporting.params[breakdown], time_range: `{${time_range}}` } })),
            catchError(err => of(err))
        )
}