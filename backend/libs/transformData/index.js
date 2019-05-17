import * as path from 'path'

import { getRawCsv$ } from '../../data'
import { saveJson$ } from '../../utils'

import { switchMap } from 'rxjs/operators'

const fileName = "allSites"
const saveTo = path.join(process.cwd(), 'backend', 'data', 'clean', `${fileName}.json`)
getRawCsv$(fileName)
    .pipe(
        switchMap(sites => saveJson$(saveTo, sites))
    )
    .subscribe(sites => console.log(sites))