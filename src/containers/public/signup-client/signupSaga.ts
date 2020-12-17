import React from 'react';
import { take, put, call, fork } from 'redux-saga/effects';
import { CLIENT_SIGNUP, GET_CLIENT_DATA } from './types';
import { clientSignupSuccess, clientSignupFailiure, getClientDataSuccess, getClientDataFailure } from './signupAction';
import authService from '../../../services/auth';
import userService from '../../../services/user';
import { showSuccessAlert, showErrorAlert } from '../../../components/Alert/alertAction';
import { notification } from 'antd';

function clientSignupCall(data: any) {
  return new Promise(resolve => {
    const res = authService.clientSignup(data)
    resolve(res)
  });
}

function* watchClientSignupRequestIterator() {
  while (true) {
    const { data } = yield take(CLIENT_SIGNUP);
    try {
        const response = yield call(clientSignupCall, data);
        yield put(clientSignupSuccess(response));
        // yield put(showSuccessAlert('Success'));
        if(response.success) {
          // yield put(showSuccessAlert('Success'));
          notification['success']({
            message: 'Success',
            description:
              '',
          });
        } else {
          // yield put(showErrorAlert('Failed'));
          notification['error']({
            message: 'Error',
            description:
              '',
          });
        }
        console.log('Client Signup Success: ', response);
    } catch (err) {
        console.log('Client Signup Faliure: ', err);
        yield put(clientSignupFailiure(err));
        // yield put(showErrorAlert('Failed'));
        notification['error']({
          message: 'Error',
          description:
            '',
        });
    }
  }
}

function getClientDataCall(data: any) {
  return new Promise(resolve => {
    const res = userService.getClientData(data)
    resolve(res)
  });
}

function* watchGetClientDataRequestIterator() {
  while (true) {
    const { data } = yield take(GET_CLIENT_DATA);
    try {
        const response = yield call(getClientDataCall, data);
        yield put(getClientDataSuccess(response));
    } catch (err) {
        yield put(getClientDataFailure(err));
    }
  }
}

export default function* root() {
    yield fork(watchClientSignupRequestIterator);
    yield fork(watchGetClientDataRequestIterator);
}