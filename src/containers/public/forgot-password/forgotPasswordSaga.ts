import React from 'react';
import { take, put, call, fork } from 'redux-saga/effects';
import { GET_RANDOM_NUMBER, FETCH_AMENITIES, FETCH_VENUE_OPTIONS } from './types';
import { fetchAmenitiesSuccess, fetchAmenitiesFailiure, fetchVenueOptionsSuccess, fetchVenueOptionsFailiure } from './forgotPasswordAction';


function fetchAmenitiesCall() {
  return new Promise(resolve => {
        // const venues = venue.list()
        // resolve(venues)
  });
}

function* watchFetchAmenitiesRequestIterator() {
  while (true) {
    yield take(FETCH_AMENITIES);
    try {
        const response = yield call(fetchAmenitiesCall);
        yield put(fetchAmenitiesSuccess(response));
        console.log('Fetch Amenities Success: ', response);
    } catch (err) {
        console.log('Fetch Amenities Faliure: ', err);
        yield put(fetchAmenitiesFailiure(err));
    }
  }
}

function fetchOptionsCall() {
    return new Promise(resolve => {
        // const venues = venue.listOptions()
        // resolve(venues)
    });
}

function* watchFetchOptionsRequestIterator() {
  while (true) {
    yield take(FETCH_VENUE_OPTIONS);
    try {
        const response = yield call(fetchOptionsCall);
        yield put(fetchVenueOptionsSuccess(response));
        console.log('Fetch Options Success: ', response);
    } catch (err) {
        console.log('Fetch Options Faliure: ', err);
        yield put(fetchVenueOptionsFailiure(err));
    }
  }
}

export default function* root() {
    yield fork(watchFetchAmenitiesRequestIterator);
    yield fork(watchFetchOptionsRequestIterator);
}