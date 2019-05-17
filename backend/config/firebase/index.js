import { fbdb, mnActfbdb } from './firebase.config'
import { of } from 'rxjs'

export function getTestingDb$() {
    return of(fbdb)
} 

export function getMainDb$() {
    return of(mnActfbdb)
}
