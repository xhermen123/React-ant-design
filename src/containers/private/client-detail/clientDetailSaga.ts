import React from 'react';
import { take, put, call, fork } from 'redux-saga/effects';
import { FETCH_CASE_DETAIL, UPDATE_CASE_DETAIL, CHANGE_CASE_STATUS } from './types';
import { fetchCaseDetail, fetchCaseDetailSuccess, fetchCaseDetailFailiure, updateCaseDetail, updateCaseDetailSuccess, updateCaseDetailFailure } from './clientDetailAction';
import caseService from '../../../services/case';


function fetchCaseDetailCall(data: any) {
  return new Promise(resolve => {
        const case1 = caseService.get(data)
        resolve(case1)
  });
}

function* watchFetchCaseDetailRequestIterator() {
  while (true) {
    const { data } = yield take(FETCH_CASE_DETAIL);
    try {
        const response = yield call(fetchCaseDetailCall, data);
        yield put(fetchCaseDetailSuccess(response));
        console.log('Fetch Case Success: ', response);
    } catch (err) {
        console.log('Fetch Case Faliure: ', err);
        yield put(fetchCaseDetailFailiure(err));
    }
  }
}

function updateCaseDetailCall(data: any) {
    return new Promise(resolve => {
        const case1 = caseService.update(data)
        resolve(case1)
    });
}

function* watchUpdateCaseDetailRequestIterator() {
  while (true) {
    const { data } = yield take(UPDATE_CASE_DETAIL);
    try {
        const response = yield call(updateCaseDetailCall, data);
        yield put(updateCaseDetailSuccess(response));
        console.log('Fetch Options Success: ', response);
    } catch (err) {
        console.log('Fetch Options Faliure: ', err);
        yield put(updateCaseDetailFailure(err));
    }
  }
}

function changeCaseTaskStatusCall(data: any) {
    return new Promise(resolve => {
        const case1 = caseService.changeCaseTaskStatus(data);
        resolve(case1);
    })
}

function* watchChangeCaseTaskStatusRequestIterator() {
    while (true) {
      const { data } = yield take(CHANGE_CASE_STATUS);
      try {
          const response = yield call(changeCaseTaskStatusCall, data);
          yield put(updateCaseDetailSuccess(response));
          console.log('Fetch Options Success: ', response);
      } catch (err) {
          console.log('Fetch Options Faliure: ', err);
          yield put(updateCaseDetailFailure(err));
      }
    }
}

export default function* root() {
    yield fork(watchFetchCaseDetailRequestIterator);
    yield fork(watchUpdateCaseDetailRequestIterator);
    yield fork(watchChangeCaseTaskStatusRequestIterator);
}