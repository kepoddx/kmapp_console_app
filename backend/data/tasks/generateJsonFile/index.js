export * from './generateJson.class'

import { JsonTask } from './generateJson.class'
import { switchMap, map, filter, concatAll, take, first, last } from 'rxjs/operators';
import { empty, of } from 'rxjs';


const csvFile = '2019SupportLocalJournalism'
// const csvFile = 'sitesByOAS'
const jsonFile = 'SiteDictionary'

const dictionary = 'SiteDictionary.latest'
const updateWith = 'allSites'
/**
 * 
 * @param {Name of file no extension} filename 
 */

export function tGenerateJSONFile$(fileName){
   return JsonTask.genCampaignJsonFile$(fileName)
    .pipe(
       switchMap(sites => JsonTask.saveJsonToFile$(fileName, sites)),
    )
}

/**
 * 
 * @param {read csv file as JSON, No ext on filename added by function} fileName 
 */

export function tReadCsvAsJSON$(fileName){
   return JsonTask.genCampaignJsonFile$(fileName)
}


tReadCsvAsJSON$(csvFile)
    .pipe(
        switchMap(sites => uCreateClickToCallFile$(sites))
    )
    .subscribe(d => {
        // console.log(d)
    })


export function tUpdateDictionary$(fileName) {
    return JsonTask.getJsonFile$(fileName)
}

// tUpdateDictionary$(dictionary)
// .pipe(
//     switchMap(dctnry => uUpdateDictionary$(dctnry)),
//     switchMap(final => JsonTask.saveJsonToFile$('SiteDictionary.latest', final))
// )
// .subscribe(d => console.log(d))

/** ==================== Util Functions ====================  */

function uCleanSiteSavingsObj(sites) {
    return sites.map(site => {
        let cleanedSite = {}
        for(let prop in site) {
            let nProp = prop.trim()
            cleanedSite[nProp] = site[prop]
        }
        cleanedSite.siteName = cleanedSite.site
        delete cleanedSite.site
        cleanedSite.weeklyPrice = cleanedSite.priceWeekly
        delete cleanedSite.priceWeekly
        cleanedSite.discountedMonthlyPrice = uStripDollarSign(cleanedSite.discountedMonthlyPrice)
        cleanedSite.voluntaryPrice = uStripDollarSign(cleanedSite.voluntaryPrice)
        cleanedSite.savings = uStripPercentSign(cleanedSite.savingsPrecentage)
        delete cleanedSite.savingsPrecentage
        cleanedSite.weeklyPrice = uStripDollarSign(cleanedSite.weeklyPrice)
        return cleanedSite
    })
}

function uCreateSiteDictionary$(sites) {
    return of(sites)
    .pipe(
        map(sites => uCleanSiteSavingsObj(sites)),
        switchMap( _=> {
            return JsonTask.getJsonFile$(jsonFile)
                .pipe(switchMap(sitesByOas => JsonTask.generateMap$(sitesByOas, 'siteName')))
        }, (sites, oasMap) => {
            sites.map(site => {
                let siteNameRef = site.siteName
                let oasObj = oasMap.get(site.siteName)
    
                delete site.siteName
                site.pubCode = site.fod
                delete site.fod
                let key = site.fodTier
                delete site.fodTier
                oasObj[key] = {}
                oasObj[key] = site;
    
                oasMap.set(siteNameRef, oasObj)
            })
            return [...oasMap.values()]
        }),
        switchMap(cleanSites => JsonTask.saveJsonToFile$('SiteDictionary', cleanSites))
        
    )
}

function uCreateClickToCallFile$(sites) {
    return of(sites)
    .pipe(
        switchMap( _=> {
            return JsonTask.getJsonFile$(dictionary)
                .pipe(switchMap(sitesByOas => JsonTask.generateMap$(sitesByOas, 'siteName')))
        }, (sites, oasMap) => {
            return sites.map(site => {
                // console.log(oasMap)
                let oasObj = oasMap.get(site.siteName)
                if(!oasObj) {
                console.log(site.siteName)
                return
                }
                console.log(Object.keys(oasObj))
                if(oasObj.lowFod) {
                    site.lowFodSavings = oasObj.lowFod.savings 
                } else {
                    site.lowFodSavings = ''
                }
                if(oasObj.highFod) {
                    site.highFodSavings = oasObj.highFod.savings 
                } else {
                    site.highFodSavings = ''
                }
                if(oasObj.ionOnSite) {
                    site.ionOnSite = oasObj.ionOnSite
                } else {
                    site.ionOnSite = ''
                }
                site.website = oasObj.website
                site.oas = oasObj.oas
                return site
            }).filter(site => site != null)
        }),
        switchMap(cleanSites => JsonTask.saveJsonToFile$(csvFile, cleanSites))
    )
}

function uStripDollarSign(str) {
    return str.replace(/\$/g, '')
}

function uStripPercentSign(str) {
    return str.replace(/%/g, '')
}

function uUpdateDictionary$(dctnry) {
    return of(dctnry)
        .pipe(
            switchMap( _=> {
                return JsonTask.getJsonFile$(updateWith)
                    .pipe(switchMap(updateWth => JsonTask.generateMap$(updateWth, 'site')))
            }, (dctnry, updteMap) => {
                return dctnry.map(site => {
                    let updtObj = updteMap.get(site.siteName)
                    if(!updtObj) return

                    const { ionOnsite } = updtObj
                    site.ionOnSite = ionOnsite
                    return site
                }).filter(site => site != null)
                
            }),
        )
}
