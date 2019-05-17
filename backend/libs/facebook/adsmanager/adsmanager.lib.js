import * as path from "path"
import * as fs from 'fs'

import axios from 'axios'
import csvjson from 'csvjson'

import { of, from } from 'rxjs'
import { map, switchMap, catchError, concatAll } from 'rxjs/operators'

import { createJsonConfig$ } from "../../../utils";
import { getRawFilesList$ } from "../../../data";

const access_token = 'EAAFlOVB8mIABAAbpMYLaSDPb0eL7cqrpCdQZAujPRWMWfGgbAsRjmwgkvpSw5Jbewy8mAfvqI9ZAsZChi434CE0JYJD2CQ1zLAtZB5buzZCFvNg8juElaCTu9Cb1BEYDIZA3XFYI9HZCLVtvpSNXoIP5w0Ts8rLyoER4SmPSRhBEEVvYzBwf8RD';
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

export default class AdsManager {

    constructor(config) {
        this.config = config
    }

    getConfig$() {
        return of(this.config)
    }

    updateConfig$(newObj) {
        this.config = Object.assign({}, this.config, newObj)
        return of(this.config)
    }

    createCampaign$() {
        return from(axios({
            method: "post",
            url: `${this.config.account_id}/campaigns`,
            params: {
              name: this.config.name,
              objective: this.config.objective,
              status: this.config.status  
            }
        }).catch(err => handleAdsManagerError(err, {from: 'createCampaign$', config})))
        .pipe(map(res => res.data))
    }
    
    createAdSet$() {
        return from(axios({
            method: "post",
            url: `${this.config.account_id}/adsets`,
            params: {
                ...this.config.adSet
            }
        }).catch(err => handleAdsSetError(err)))
        // .pipe(map(res => res.data))    
    }

    defineTargeting() {
        this.config.targeting
    }
    setBudget$() {
        
    }

}

function handleAdsManagerError(err, data) {
    return { status: err.response.status, result: err.response.data.error }  
}
function handleAdsSetError(err) {
    return { status: err.response.status, result: err.response.data.error }  
}