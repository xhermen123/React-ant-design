import React from 'react';
import { take, put, call, fork } from 'redux-saga/effects';
import { FETCH_CASES, CREATE_CASE, FETCH_CLIENT_CASE } from './types';
import { fetchCasesSuccess, fetchCasesFailiure, createCaseFailure, createCaseSuccess, fetchClientCasesSuccess, fetchClientCasesFailiure } from './dashboardAction';
import caseService from '../../../services/case';

function fetchCasesCall() {
  return new Promise(resolve => {
        const cases = caseService.list()
        resolve(cases)
  });
}

function* watchFetchCasesRequestIterator() {
  while (true) {
    yield take(FETCH_CASES);
    try {
        const response = yield call(fetchCasesCall);
        yield put(fetchCasesSuccess(response));
        console.log('Fetch Cases Success: ', response);
    } catch (err) {
        console.log('Fetch Cases Faliure: ', err);
        yield put(fetchCasesFailiure(err));
    }
  }
}

function fetchClientCasesCall() {
  return new Promise(resolve => {
        const cases = caseService.clientCaseList()
        resolve(cases)
  });
}

function* watchFetchClientCasesRequestIterator() {
  while (true) {
    yield take(FETCH_CLIENT_CASE);
    try {
        const response = yield call(fetchClientCasesCall);
        yield put(fetchClientCasesSuccess(response));
        console.log('Fetch Cases Success: ', response);
    } catch (err) {
        console.log('Fetch Cases Faliure: ', err);
        yield put(fetchClientCasesFailiure(err));
    }
  }
}

function createCaseCall(data: any) {
    return new Promise(resolve => {
        const res = caseService.store(data)
        resolve(res)
    });
}

function* watchCreateCaseRequestIterator() {
  while (true) {
    const { data } = yield take(CREATE_CASE);
    try {
        const response = yield call(createCaseCall, data);
        yield put(createCaseSuccess(response));
        console.log('Fetch Options Success: ', response);
    } catch (err) {
        console.log('Fetch Options Faliure: ', err);
        yield put(createCaseFailure(err));
    }
  }
}

export default function* root() {
    yield fork(watchFetchCasesRequestIterator);
    yield fork(watchCreateCaseRequestIterator);
    yield fork(watchFetchClientCasesRequestIterator);
}