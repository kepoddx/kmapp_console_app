const springPID = require('./spring-BAU.pid.json');

export function getSpringPids() {
    return springPID.map(rec => {
        return {
            site:rec.site,
            tier: rec.tier,
            url:rec.onsiteUrl,
            siteUrl: rec.siteUrl,
            lFod:rec.low,
            lSav:rec.lowSav,
            hFod:rec.high,
            hSav:rec.highSav
        }
    })
}