import Blocklist from './blocklist.lib'

import { of, from } from 'rxjs'
import { switchMap } from 'rxjs/operators'


export function getBlockList$(account_id) {
    const AccountBlockList = new Blocklist(account_id)
    return AccountBlockList.get$()
        .pipe(
            switchMap(() => of(AccountBlockList.config))
        )
}

// getBlockList$("act_10154131483275667")
// .subscribe(d => console.log(d))