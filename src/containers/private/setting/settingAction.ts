import {
    FETCH_AMENITIES, FETCH_AMENITIES_SUCCESS, FETCH_AMENITIES_FAILURE,
    FETCH_VENUE_OPTIONS, FETCH_VENUE_OPTIONS_SUCCESS, FETCH_VENUE_OPTIONS_FAILURE
} from './types';
  
export function fetchAmenities() {
    return {
        type: FETCH_AMENITIES
    }
}

export function fetchAmenitiesSuccess(res: any) {
    return {
        type: FETCH_AMENITIES_SUCCESS,
        res
    }
}

export function fetchAmenitiesFailiure(err: any) {
    return {
        type: FETCH_AMENITIES_FAILURE,
        err 
    }
}

export function fetchVenueOptions() {
    return {
        type: FETCH_VENUE_OPTIONS
    }
}

export function fetchVenueOptionsSuccess(res: any) {
    return {
        type: FETCH_VENUE_OPTIONS_SUCCESS,
        res
    }
}

export function fetchVenueOptionsFailiure(err: any) {
    return {
        type: FETCH_VENUE_OPTIONS_FAILURE,
        err 
    }
}