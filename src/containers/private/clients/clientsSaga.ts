import React from 'react';
import { take, put, call, fork } from 'redux-saga/effects';
import { FETCH_CLIENTS, CREATE_CLIENT } from './types';
import { fetchClientsSuccess, fetchClientsFailiure, createClientSuccess, createClientFailiure } from './clientsAction';
import userService from '../../../services/user';

function fetchClientsCall() {
  return new Promise(resolve => {
        const clients = userService.clients()
        resolve(clients)
  });
}

function* watchFetchClientsRequestIterator() {
  while (true) {
    yield take(FETCH_CLIENTS);
    try {
        const response = yield call(fetchClientsCall);
        yield put(fetchClientsSuccess(response));
        console.log('Fetch Clients Success: ', response);
    } catch (err) {
        console.log('Fetch Clients Faliure: ', err);
        yield put(fetchClientsFailiure(err));
    }
  }
}

function createClientCall(data: any) {
    return new Promise(resolve => {
        const client = userService.store(data)
        resolve(client)
    });
}

function* watchCreateClientRequestIterator() {
  while (true) {
    const { data } = yield take(CREATE_CLIENT);
    try {
        const response = yield call(createClientCall, data);
        yield put(createClientSuccess(response));
        console.log('Create Client Success: ', response);
    } catch (err) {
        console.log('Create Client Faliure: ', err);
        yield put(createClientFailiure(err));
    }
  }
}

export default function* root() {
    yield fork(watchFetchClientsRequestIterator);
    yield fork(watchCreateClientRequestIterator);
}