import * as path from "path"

import AdLabel from './adlabel.lib'
import { switchMap, concatAll, concat, map, tap } from 'rxjs/operators';
import { createJsonConfig$ } from './../../../utils';


let config = {
    account_id: "act_10154131483275667",
    labelTypes: ["pwc", 'lpr']
}

const configFilePath = path.join(__dirname, "AdlabelConfig.json")

AdLabel.generateLabelList$(config)
    .pipe(
        switchMap(labelList => AdLabel.createAdLabels$(config.account_id, labelList)),
        tap(labelIds => config.facebookLabels = labelIds),
        switchMap(() => createJsonConfig$(configFilePath, config))
    )

    .subscribe(d => {
        console.log("final",d)
    })