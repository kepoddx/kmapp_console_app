import axios from 'axios'
import { from,  of, generate } from 'rxjs'
import { map, catchError } from 'rxjs/operators'

import { getRawFilesList$ } from '../../../data'

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

  axios.defaults.baseURL = 'https://graph.facebook.com/v3.2';
  axios.defaults.params = {};
  axios.defaults.params['access_token'] = access_token;

export function createAudience$(audienceConfig){
    const params = Object.assign({}, {customer_file_source : "USER_PROVIDED_ONLY", subtype : "CUSTOM"}, audienceConfig.params)
    return from(axios.post(`${audienceConfig.account_id}/customaudiences`, null, { params: params })) 
        .pipe(
            map( res => res.data),
            catchError(err => of({status: err.response.status, data: err.response.data, headers: err.response.headers}))
        )
}

export function addToAudience$(audience_id, data) {
  return from(axios({
    method: 'post',
    url: `${audience_id}/users`,
    data: {
      ...data
    }
    }))
    .pipe(
      catchError(err => of({status: err.response.status, data: err.response.data, headers: err.response.headers}))
    )
}

export function getAudienceFiles$ (site) {
  return getRawFilesList$(site)
}




const AdTypes = {
  pwc: {
      Name: "Paywall Converters",
      audiences: {
          include: ['Paywall Converters'],
          exclude: ['Active_FA', 'Active_DO']
      },
  }
};
export function generateAdConfig$(config) {
  return of()
}