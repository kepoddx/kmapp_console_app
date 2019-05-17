import * as path from "path"
import * as fs from 'fs'

import axios from 'axios'
import csvjson from 'csvjson'
import shajs from 'sha.js'

import { of, from } from 'rxjs'
import { map, switchMap, catchError, concatAll } from 'rxjs/operators'

import { AudienceTypes } from './audience.types'
import { createJsonConfig$ } from "../../../utils";
import { getRawFilesList$ } from "../../../data";

/** Turn into api call to get configuration settings */
const access_token = 'EAAFlOVB8mIABAGaRSFZBApZBENZBqth6mbTZC8tl6oKa7PEKLRuZCXsg9N1fwOj0QkU1eJImCJNtYLXRhxx9Oe1ndAOWtZBQl5Um5VVV0mE5PVQ9ZAhK0UC4jp636CRyZBiZAKxMw0Xbb0h9ITdtYXt0ZCC2ucbfeX2H0tMrI8wycO5GHR4HftHj7I';
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log("Called", config.url, "\n")
    console.log("Params", config.params, "\n")
    console.log("Headers", config.headers, "\n")
    console.log("Data", config.data)
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
  axios.interceptors.response.use(function (response) {
    // Do something with response data
    console.log("Response", response)
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });


axios.defaults.baseURL = 'https://graph.facebook.com/v3.2';
axios.defaults.params = {};
axios.defaults.params['access_token'] = access_token;

/** End Turn into api call to get configuration settings */


 export default class Audience {

    constructor(config) {
        this.saveToPath = path.join(__dirname)
        this.config = Object.assign({}, AudienceTypes[config.name], config)
        this.config.audienceName = `${this.config.audienceName} ${this.config.listRunDate}`
        this.config.fileName = `${this.config.siteName} ${this.config.audienceName}.json`.replace(/\s/g, '_')
    }

    get saveTo() {
        return this.saveToPath
    }
    get fileName() {
        return this.config.fileName
    }
    get audConfig() {
        return {
            name: `${this.config.audienceName}`
        }
    }
    get siteName() {

    }
    getConfig$() {
        return of(this.config)
    }

    updateConfig$(obj) {
        this.config = Object.assign({}, this.config, obj)
        return of(this.config)
    }

    saveToFile$() {
       return createJsonConfig$(path.join(__dirname, this.config.fileName), this.config)
    }

    createAudience$(saveToFile = false){
        const params = Object.assign({}, 
            {
                customer_file_source : "USER_PROVIDED_ONLY", 
                subtype : "CUSTOM"
            }, 
            { 
                name: this.config.audienceName, 
                description: this.config.description
            })

        return from(axios.post(`${this.config.account_id}/customaudiences`, null, { params: params })) 
            .pipe(
                map( res => res.data),
                switchMap(({id}) => this.updateConfig$({id})),
                map( () => saveToFile ? this.saveToFile$() : this.getConfig$()),
                catchError(err => of({status: err.response.status, data: err.response.data, headers: err.response.headers}))
            )
    }

    createWebSiteAudience$(config) {
        return from(axios.post(`${this.config.account_id}/customaudiences`, null, { params: {
            name: config.name,
            rule: config.rule,
            prefill: config.prefill,
            retention_days: config.retention_days
        }})) 
        .pipe(
            map( res => res.data),
            // switchMap(({id}) => this.updateConfig$({id})),
            // map( () => saveToFile ? this.saveToFile$() : this.getConfig$()),
            catchError(err => of({status: err.response.status, data: err.response.data, headers: err.response.headers}))
        )
    
    }

     populateAudience$() {
        return getRawFilesList$(this.config.siteName)
        .pipe(
            map(({fpath, files}) => {
            let filteredFiles = []
              files.filter(file => {
                    this.config.audiences.exclude.map(exclusion => {
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
                        if(rec.WirelessPhone === "" || rec.EmailBest === "") {
                            console.log(rec)
                        }
                        emailPhone.push([ shajs('sha256').update(rec.EmailBest.toLowerCase().trim()).digest('hex'), shajs('sha256').update(rec.WirelessPhone).digest('hex')])
                    }
                })
            
                console.log("Email Only List", email.length)
                let email$ = this.addToAudience$(this.config.id, {
                    "payload": {
                        "schema": ["EMAIL"],
                        "data": email
                    }
                });
                console.log("Email & Phone List", emailPhone.length)
                let emailPhone$ = this.addToAudience$(this.config.id, {
                    "payload": {
                        "schema": ["EMAIL", "PHONE"],
                        "data": emailPhone
                    }
                });
                console.log("Phone Only List", phone.length)
                let phone$ = this.addToAudience$(this.config.id, {
                    "payload": {
                        "schema": ["PHONE"],
                        "data": phone
                    }
                });
                return of(email$, emailPhone$, phone$)
            }),
            concatAll()
        )
    }

    addToAudience$(audience_id, data) {
        return post(audience_id, data)
            .pipe(
                map(res => of({ status : res.status, schema: data.payload.schema, result: res.data}))
            )
    }
}


function post(audience_id, data) {
    return from(axios({
        method: 'post',
        url: `${audience_id}/users`,
        data: {
            ...data
        }
    }).catch(err => handleAxiosError(err, data)))
}
function handleAxiosError(err, data) {
    return { status: err.response.status, schema: data.payload.schema, result: err.response.data.error }
}