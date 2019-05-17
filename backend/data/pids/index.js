import { readdir, readFileSync } from "fs";
import * as path from "path";

import { bindCallback, of, empty } from "rxjs";
import { filter, map, switchMap } from "rxjs/operators";

import csvjson from "csvjson";
import { keyBy } from "lodash";
import {
  getRawCsv$,
  getCleanJson$,
  getCleanJsonPath$,
  saveCleanJson$
} from "../../data";

let currentDir = path.join(__dirname);

const readdir$ = bindCallback(readdir);

export function getCampaginDir$(campaginName) {
  return readdir$(currentDir).pipe(
    map(result => result[1].filter(name => name === campaginName)),
    map(dir => path.join(currentDir, dir[0]))
  );
}

export function generatePidJsonFile$(campaignName) {
  return getRawCsv$(campaignName).pipe(
    map(pids => pids.map(pid => mapRawPidFile(pid)))
  );
}

const cmpgnName = "5DayFlashSale2019";

// getCampaginDir$(cmpgnName)
generatePidJsonFile$(cmpgnName)
  .pipe(
    switchMap(
      sites => generatePidMap$("pids"),
      (sites, sitesMap) => {
        let filteredSites = sites.filter(
          site => sitesMap[site.site] != undefined
        );
        let enrichedPids = filteredSites.map(site => {
          site.testingUrl = sitesMap[site.site].testingUrl;
          site.onsiteUrl = sitesMap[site.site].onsiteUrl;
          site.lSav = sitesMap[site.site].lowSav;
          site.hSav = sitesMap[site.site].highSav;
          site.url = sitesMap[site.site].siteUrl;
          return site;
        });

        return of(enrichedPids);
      }
    ),
    switchMap(finalData => saveCleanJson$(cmpgnName, finalData.value))
  )
  .subscribe(d => console.log(d));

export function getSpringPids() {
  return springPID.map(rec => {
    return {
      site: rec.site,
      tier: rec.tier,
      url: rec.onsiteUrl,
      siteUrl: rec.siteUrl,
      lFod: rec.low,
      lSav: rec.lowSav,
      hFod: rec.high,
      hSav: rec.highSav
    };
  });
}

function mapRawPidFile(rec) {
  return {
    site: rec["Site Name"],
    tier: rec.Tier,
    lFod: rec["Low FOD PID"],
    hFod: rec["High FOD PID"]
  };
}

function generatePidMap$(fileName) {
  return getCleanJson$(fileName).pipe(
    map(data => {
      // let newData = data.reduce((map, obj) => {
      //     map.set(obj.site, obj.val)
      //     return map;
      // }, new Map())
      // return newData

      let newData = keyBy(data, site => site.site);
      return newData;
    })
  );
}
