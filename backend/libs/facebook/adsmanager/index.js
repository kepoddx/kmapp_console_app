import AdsManager from './adsmanager.lib'
import { getBlockList$ } from '../blocklist'

import { map, switchMap, mapTo } from 'rxjs/operators'

import { AdSetTypes } from './adset.types'


/**
    zips: [{ key: "US:53006" }, { key: "US:53010" }, { key: "US:53019" }, { key: "US:53048" }, { key: "US:53049" }, { key: "US:53050" }, { key: "US:53057" }, { key: "US:53065" }, { key: "US:53079" }, { key: "US:53091" }, { key: "US:53919" }, { key: "US:53931" }, { key: "US:53963" }, { key: "US:54932" }, { key: "US:54935" }, { key: "US:54937" }, { key: "US:54974" }, { key: "US:54979" }],
 * 
 */
const campaignCongfig = {
    name: "AG Paywall Converters",
    objective: "LINK_CLICKS",
    status: "PAUSED",
    account_id: "act_10154131483275667",
    listRunData: "3.2.19",
    type: "PWC",
    adSet: {
        name: "AG Paywall Converters 3.2.19",
        optimization_goal: AdSetTypes.optimiztion.lpv,
        start_time: new Date('April 17, 2019 09:00:00'),
        end_time: new Date('April 31, 2019 00:00:00'),
        lifetime_budget: 7500,
        billing_event: "IMPRESSIONS",
        campaign_id: "23843232952120182",
        bid_strategy: "LOWEST_COST_WITHOUT_CAP",
        status: "PAUSED",
        targeting: {
            geo_locations: {
                "cities": [{
                    key: "2547277",
                    radius: 15,
                    distance_unit: "mile"
                }]
            },
            publisher_platforms: [
                "facebook"
            ],
            facebook_positions: ["feed"],
            age_min: 21,
            age_max: 65,
            custom_audiences: [{ id: "23843232850690182" }],
            excluded_custom_audiences: [{ id: "23843232850690182" }]
        },
    }
}
const cmpgnId = "23843232952120182"
const adSetId = "23843236261030182"
export function createAd$(campaignCongfig) {

    let cmpgn = new AdsManager(campaignCongfig);

    return cmpgn
        .getConfig$()
        .pipe(
            switchMap(cmpgnConfig => getBlockList$(cmpgnConfig.account_id)),
            switchMap(blocklist => cmpgn.updateConfig$(blocklist)),
            // switchMap(() => cmpgn.createCampaign$()),
            mapTo({ id: "23843232952120182" }),
            switchMap(({ id }) => cmpgn.updateConfig$({ id })),
            switchMap(() => cmpgn.createAdSet$())
        )
}


/**
 * add run schedule and figure our placements
 */

// eslint-disable-next-line no-console
createAd$(campaignCongfig).subscribe(d => console.log(d));