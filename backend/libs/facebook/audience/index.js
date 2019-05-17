import * as path from "path";
import * as fs from "fs";
import Audience from "./facebook.audience2";
import { of, from, bindCallback } from "rxjs";
import { switchMap, catchError, map } from "rxjs/operators";
import { filter } from "rxjs/operators";
import FbImages from "./../adImage/adImage.lib";
const log = console.log;
/**
 * @param config
 */
const config = {
    name: "PWCEX",
    listRunDate: "3.12.19",
    account_id: "act_10154131483275667",
    siteName: "FondDuLac"
};

const pwcAudience = {
    name: "AG Paywall Converters",
    rule: {
        inclusions: {
            operator: "or",
            rules: [{
                event_sources: [{
                    type: "pixel",
                    id: "607803579407805"
                }],
                retention_seconds: 2592000,
                filter: {
                    operator: "and",
                    filters: [{
                        field: "url",
                        operator: "i_contains",
                        value: "get-access"
                    }]
                }
            }]
        }
    },
    prefill: "1",
    retention_days: 30
};
const pwcAudience2 = {
    name: "AG Paywall Converters 4.1.19",
    rule: {
        inclusions: {
            operator: "or",
            rules: [{
                event_sources: [{
                    id: "607803579407805",
                    type: "pixel"
                }],
                retention_seconds: 2592000,
                filter: {
                    operator: "and",
                    filters: [{
                        field: "domain",
                        operator: "i_contains",
                        value: "get-access"
                    }]
                }
            }]
        }
    },
    prefill: "1",
    retention_days: 30
};
export function createAudience$(AudConfig) {
    const cmpgn = new Audience(AudConfig);

    return cmpgn.getConfig$().pipe(
        switchMap(() => cmpgn.createAudience$(true)), //true means saveToFile
        switchMap(() => cmpgn.populateAudience$()),
        catchError(err => handleError(err))
    );
}

export function createWebSiteAudience$(config, aud) {
    const cmpgn = new Audience(config);

    return cmpgn.createWebSiteAudience$(aud);
}
// createAudience$(config)
//     .subscribe(d => console.log(d))

function handleError(err) {
    return of(err)
}
const id = "23843276972070182";
// createWebSiteAudience$(config, pwcAudience).subscribe(d => console.log(d));

//upload image
const imagePath = path.join(process.cwd(), 'backend', 'data', 'assets', 'AG Paywall Converter.png');
log(imagePath)
let uploadFile;
const readfile$ = bindCallback(fs.readFile)

readfile$(imagePath)
    .pipe(
        map(d => d[1].toString('base64')),
        switchMap(imageData => FbImages.addImage(config.account_id, imageData))
    )
    .subscribe(d => log(d))

// FbImages.addImage(config.account_id, imagePath)
// .subscribe(r => log(r))

/*
const accountPageConfig = {
            "id": "110527555449",
            "name": "FdL Reporter"
        }
 */
const adCreativeConfig = {
    images: {
        bytes: {
            hash: "af3d1e6f31c9cdb23897360e154eb27a",
            url: "https://scontent.xx.fbcdn.net/v/t45.1600-4/40252805_23842923759390182_8956444376368676864_n.png?_nc_cat=104&_nc_ht=scontent.xx&oh=8e3039894faee079d6c1c6364a0f54c0&oe=5D40DA47"
        }
    }
}; {
    "page_id": "110527555449",
    "link_data": {
        "image_hash": "af3d1e6f31c9cdb23897360e154eb27a",
        "link": "https://facebook.com/110527555449",
        "message": "try it out"
    }
}
// FbImages.addAdCreative(config.account_id, adCreativeConfig).subscribe(d =>
//     console.log(d)
// );

const token = "EAAFlOVB8mIABAEJQRldq8x6cjVFCc7dKfLQ1YDX7NkSC8SPEcVz0ozkgn94grZAXqgQQnCJ7y3ByafYvLymLX0o0yV9j19qSuTczplBHdlYAuud9QPmjRH2ARrPZBFtXcQw2w1IUtZCHN8JEGOA85tmDFPY8GcOMg2zO8NC4QpJZCmQCeJRabZCEJdrNGo1wZD"