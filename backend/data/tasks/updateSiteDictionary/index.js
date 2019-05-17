import { of } from 'rxjs'
import { getCleanJson, saveCleanJson$ } from '../../index'
import { map, switchMap } from 'rxjs/operators';

const siteDictionary = 'siteDictionary.latest';

of(getCleanJson(siteDictionary))
.pipe(
    map(sites => {
        return sites.map(site => genKeyFromSiteName(site))
    }),
    switchMap(keyedSites => saveCleanJson$(siteDictionary, keyedSites))
) 
.subscribe(sites => {
    console.log(sites)
})


/** ======================== 
 *     PRIVATE FUNCTIONS
 *  ======================== */

function genKeyFromSiteName(site){
    site.key = site.siteName.replace(/\(/g, '').replace(/\)/g, '').replace(/\s+/g, '').toLowerCase().trim()
    return site
}