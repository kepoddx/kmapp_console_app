import * as path from "path"
import * as fs from 'fs'

import axios from 'axios'
import { from } from 'rxjs'
import { tap, map } from 'rxjs/operators'


const access_token = 'EAAFlOVB8mIABAAbpMYLaSDPb0eL7cqrpCdQZAujPRWMWfGgbAsRjmwgkvpSw5Jbewy8mAfvqI9ZAsZChi434CE0JYJD2CQ1zLAtZB5buzZCFvNg8juElaCTu9Cb1BEYDIZA3XFYI9HZCLVtvpSNXoIP5w0Ts8rLyoER4SmPSRhBEEVvYzBwf8RD';


axios.defaults.baseURL = 'https://graph.facebook.com/v3.2';
axios.defaults.params = {};
axios.defaults.params['access_token'] = access_token;

export default class Blocklist {

    constructor(account_id) {
        this.account_id = account_id
        this.blocklist;
    }

    get config() {
        return {
            account_id : this.account_id,
            blocklist: this.blocklist
        }
    }

    get$() {
        return from(axios({
            nethod: "get",
            url: `${this.account_id}/publisher_block_lists`
        }).catch(err => handleBlocklistError(err, this.account_id)))
        .pipe(
            tap(res => this.blocklist = res.data.data),
            map(res => res.data.data)
        )
    }
}

function handleBlocklistError(err, data) {
    return { status: err.response.status, data, result: err.response.data.error }  

}