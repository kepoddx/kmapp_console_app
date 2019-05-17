import { AdSetTypes } from './../libs/facebook/adsmanager/adset.types';


const config = {
    name: "AG Paywall Converters",
    objective: "LINK_CLICKS",
    status: "PAUSED",
    account_id: "act_10154131483275667",
    listRunData: "3.2.19",
    type: "PWC",
    adSet: {
        name: "My Campagin",
        optimization_goal: AdSetTypes.optimiztion.lpv,
        start_time: new Date('March 18, 2019 09:00:00'),
        end_time: new Date('March 31, 2019 00:00:00'),
        lifetime_budget: 7500,
        billing_event: "IMPRESSIONS",
        campaign_id: "23843312011300182",
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

// eslint-disable-next-line no-console
console.log(JSON.stringify(config, null, 4))