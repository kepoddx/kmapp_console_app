/**
 * Create Audience
 */
import * as fs from 'fs'
import * as path from 'path'
import csvjson from 'csvjson'

import axios from 'axios'
import shajs from 'sha.js'
import { bindCallback, of } from "rxjs"

import { createAudience$, getAudienceFiles$, addToAudience$ } from './facebook.audience'
import { switchMap, map, auditTime, concatAll } from 'rxjs/operators';
import { getJsonConfig$, createJsonConfig$, updateJsonConfig$ } from '../../../utils'
import { async } from 'q';

const sites = require('../testdata/fbaccounts.json')

const readDir$ = bindCallback(fs.readdir)
const dataFiles = path.join(process.cwd(), 'libs', 'facebook', 'testdata', 'email')
 /**
  * @fields
  */
 const params = {
     name: "", 
     subtype: "", // formers, etc...
     description: "",
     customer_file_source: "USER_PROVIDED_ONLY", //
     access_token: ""
 }

 const Ad = {
    campaignName: 'AG Paywall Converters',
    audiences: {
        include: ['Paywall Converters'],
        exclude: ['Active_FA', 'Active_DO']
    },
    budget: "75",
    schedule: {
        from: {
            time: 7,
            hours: 'am'
        },
        to: {
            time: 9,
            hours: 'pm'
        }
    },
    age: {
        from: '21',
        to: '65+'
    },
    placements: {
        facebook: ['Feeds'],
        instagram: [],
        audienceNetwork: []
    },
    blockList: ['USATN FB Ad Exclusions_2.9.18'],
    optimization: 'Landing Page Views',
    headline: "Keep reading and support local journalism.",
    text: "Staying connected, informed, and involved in the community is a purpose, a passion, and a big part of why we’d like you to support local journalism.  Click Learn More below to unlock exclusive and unlimited access to fdlreporter.com.",
    websiteUrl: "",
    conversionTracking: "Facebook Pixel",
    imageLink: "assets/facebook/Paywall Converter.png"
 }
 /**
  * Hash sha256(<string>)
  */

//   readDir$(dataFiles) 
//     .pipe(
//         map(files => files[1].filter(fileName => fileName.indexof(paywallConvertersAd.audiences.exclude)))
//     )
//     .subscribe(files => console.log(files))
const listUploadDate = "3.5.19";
const audienceConfig = {
    siteName : "FondDuLac",
    account_id : "act_10154131483275667",
    listUploadDate : "3.5.19",
    params: {
        name: `AG Paywall Converters Exclusions ${listUploadDate}`,
        description: "Paywall Converters Exclude from Ad",
    }
};

createAudience$(audienceConfig)
.pipe(
    switchMap(({id})  => {
        audienceConfig.id = id;
        let fileName = path.join(__dirname, `${audienceConfig.params.name.replace(/\s/g, '_')}.json`)
        return createJsonConfig$(fileName)
    }),
    switchMap(file => {
        for( let key in audienceConfig ) {
            file.set(key, audienceConfig[key])
        }

        file.save();
        return updateJsonConfig$(file)

    }),
)
.subscribe(configFile => {
    console.log("Config File", configFile.toObject())
})

getAudienceFiles$(audienceConfig.siteName)
    .pipe(
        map(({fpath, files}) => {
        let filteredFiles = []
          files.filter(file => {
                Ad.audiences.exclude.map(exclusion => {
                    if(file.indexOf(exclusion) != -1) {
                        filteredFiles.push(path.join(fpath, file))
                    }
                })
            })
            return filteredFiles
        }),
    
        switchMap(res => {
            const audience = [];
            res.map(fileName => {
                let file = fs.readFileSync(fileName, { encoding: 'utf8'})
                let options = {
                    delimiter : ',', // optional
                    quote     : '"' // optional
                };
                const data = csvjson.toObject(file, options)
                audience.push(...data)
            })
            console.log("Audience", audience.length)

            if (audience.length > 10000) {
                let segmentsNeeded = final.length / 10000;
                console.log("Implement Logic line 141 audience index.js file \n segments needed =>", segmentsNeeded)
            }
            let email = [];
            let emailPhone = [];
            let phone = []
            audience.map(rec => { 
                if(rec.WirelessPhone === "") {
                    email.push([ shajs('sha256').update(rec.EmailBest.toLowerCase().trim()).digest('hex')])
                } else if (rec.EmailBest === "") {
                    phone.push([ shajs('sha256').update(rec.WirelessPhone).digest('hex')])
                } else {
                    emailPhone.push([ shajs('sha256').update(rec.EmailBest.toLowerCase().trim()).digest('hex'), shajs('sha256').update(rec.WirelessPhone).digest('hex')])
                }
            })

        
            let email$ = addToAudience$(audienceConfig.id, {
                "payload": {
                    "schema": ["EMAIL"],
                    "data": email
                }
            });
            let emailPhone$ = addToAudience$(audienceConfig.id, {
                "payload": {
                    "schema": ["EMAIL", "PHONE"],
                    "data": email
                }
            });
            let phone$ = addToAudience$(audienceConfig.id, {
                "payload": {
                    "schema": ["PHONE"],
                    "data": email
                }
            });
            return of(email$, emailPhone$, phone$)
        }),
        concatAll()
    )

.subscribe(audiences => {
    console.log(audiences)

})

   
// let newFile = path.join(__dirname, `${audienceConfig.name.replace(/\s/g, '_')}.json`)
// getJsonConfig$(newFile)
//     .pipe(
//         map(file => file.toObject())
//     )        