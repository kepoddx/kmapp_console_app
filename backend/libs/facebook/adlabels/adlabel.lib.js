import * as path from "path"
import * as fs from 'fs'

import axios from 'axios'
import csvjson from 'csvjson'

import { of, from, forkJoin } from 'rxjs'
import { map, switchMap, catchError, concatAll, concat, mergeAll, mergeMap } from 'rxjs/operators'
import { flatten } from "lodash";

import { createJsonConfig$ } from "../../../utils"
import { getRawFilesList$ } from "../../../data"

import { AdLabelTypes } from './adlabel.type'

const access_token = 'EAAFlOVB8mIABAAbpMYLaSDPb0eL7cqrpCdQZAujPRWMWfGgbAsRjmwgkvpSw5Jbewy8mAfvqI9ZAsZChi434CE0JYJD2CQ1zLAtZB5buzZCFvNg8juElaCTu9Cb1BEYDIZA3XFYI9HZCLVtvpSNXoIP5w0Ts8rLyoER4SmPSRhBEEVvYzBwf8RD';


axios.defaults.baseURL = 'https://graph.facebook.com/v3.2';
axios.defaults.params = {};
axios.defaults.params['access_token'] = access_token;

export default class AdLabel {


    static createAdLabel$(config) {
        console.log(config)
        return from(axios({
            method: 'post',
            url: `${config.account_id}/adlabels`,
            params: {
                name: config.name
            }
        }).catch(error  => handleAdLabelError(error, config)))
        .pipe(
            map(res => ({ account_id: config.account_id, id: res.data.id, name: config.name}))
        )
    }

    static createAdLabels$(account_id, labelsArray) {
       return of(labelsArray)
        .pipe(mergeMap(listItem => forkJoin(...listItem.map(labelItem => AdLabel.createAdLabel$({account_id: account_id, name: labelItem.id})))))
    }

    static getAdLabels$(account_id) {
        return from(axios({
            method: 'get',
            url: `${account_id}/adlabels`
        }).catch(error  => handleAdLabelError(error, config)))
        .pipe(
            map(res => res.data)
        )       
    }

    static generateLabelList$(config) {
        return of(flatten(config.labelTypes.map(labelId => AdLabelTypes.filter(label => label.id === labelId))))
    }



}

function handleAdLabelError(err, data) {
    return { status: err.response.status, data, result: err.response.data.error }  
}