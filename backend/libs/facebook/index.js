import { getAdAccounts$ } from "./getAdAccounts";
import { switchMap, filter, map, tap, catchError } from "rxjs/operators";
import { filterAccounts$ } from "../../data/facebook";
import { generateReport$ } from "./facebook.lib";
import { of } from "rxjs";

/**
 * Facebook lib 3-10-2019
 */

 /** 
  * Get Accounts from file or API 
 *
 * @param {fromFile: boolean, updateFile: boolean, saveToFile: boolean} config 
 */
    getAdAccounts$({fromFile: true})
        .pipe(
            /** Filter Reports */
            switchMap(accounts => filterAccounts$(accounts)),
            switchMap(filteredAccounts => generateReport$(filteredAccounts[0].id, `'since':'2019-02-25','until':'2019-02-31'`, 'ad')),
            catchError(err => of(err))
            )
 /**
  * Generate Reports | Save to file  | Update UI
  */


  /**
   * Download Reports 
   */

   /**
    * Process Reports and Save to final
    */
    
    
    
    .subscribe(d => {})