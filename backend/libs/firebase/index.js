import { getTestingDb$, getMainDb$ } from '../../config'
import { getCleanJson$, saveCleanJson$ } from './../../data';
import { map, switchMap } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { keyBy } from 'lodash';


const testingCollection$ = getTestingDb$()
const mainCollection$ = getMainDb$()

const fromCollection = 'sites'
    , toCollection = 'sitesMg2Data'
    , sitesDictionary = 'SiteDictionary.latest'
    , facebookAccounts = 'facebookAccounts'
    , rssFeedConfig = 'rssEndPoints';

/** 
 * =================================================== 
 *   TRANSFER DATA FROM ONE FIREBASE DB TO ANOTHER 
 * ===================================================
 * */
// testingCollection$
// .pipe(
//     switchMap(testDb =>  from(testDb.collection(fromCollection).get())),
//     switchMap((querySnapShot => {
//         const sites = [];
//         querySnapShot.forEach(doc => sites.push(doc.data()))
//         return of(sites)
//     })),
    // switchMap( _=> getCleanJson$(sitesDictionary), (sites, dictionary) => {
    //     const dictionaryMap = keyBy(dictionary, 'website')
    //     return of(sites.map(site => {
    //         if(dictionaryMap[site.siteUrl] === undefined) {
    //             site.siteName = `NF-${site.pubName}`
    //         }  else {
    //             site.siteName = dictionaryMap[site.siteUrl].siteName 
    //         } 
    //         return site
    //     }))
    // }),
    // switchMap( sites => saveCleanJson$(toCollection, sites)),
    // switchMap( _=> from(mainCollection$), (sites, mainDb) => {
    //     let batch = mainDb.batch();
    //     sites.map(site => {
    //         let entry = mainDb.collection('sitesMg2').doc(site.siteName)
    //         batch.set(entry, site)
    //     })
    //     return of(batch.commit())
    // })
// )
/** 
 * =================================================== 
 *   BATCH LOAD JSON FILE INTO DATABASE 
 * ===================================================
 * */
// getCleanJson$(facebookAccounts)
// .pipe(
//     switchMap( _=> from(mainCollection$), (sites, mainDb) => {
//         let batch = mainDb.batch();
//         sites.map(site => {
//             let entry = mainDb.collection(facebookAccounts).doc(site.name)
//             batch.set(entry, site)
//         })
//         return from(batch.commit())
//     })    
// )
/** 
 * =================================================== 
 *   LOAD JSON FILE INTO DATABASE W/ SUB COLLECTION
 * ===================================================
 * */
getCleanJson$(rssFeedConfig)
.pipe(
 switchMap( _=> from(mainCollection$), (feedsConfig, mainDb) => {
    return from(mainDb.collection(rssFeedConfig).doc("allEndPoints").set(feedsConfig))
 })
)
.subscribe(db => {
    console.log(db)
})

