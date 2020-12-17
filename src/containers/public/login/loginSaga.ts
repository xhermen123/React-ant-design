import React from 'react';
import { take, put, call, fork } from 'redux-saga/effects';
import { LOGIN_REQUEST, LOGIN_REQUEST_SUCCESS, LOGIN_REQUEST_FALIURE } from './types';
import { loginRequestSuccess, loginRequestFailiure } from './loginAction';
import authService from '../../../services/auth';
import { showErrorAlert, showSuccessAlert } from '../../../components/Alert/alertAction';
import { notification } from 'antd';

function loginCall(data: any) {
  return new Promise(resolve => {
    const res = authService.authenticate(data.email, data.password);
    resolve(res);
  });
}

function* watchLoginRequestIterator() {
  while (true) {
    const { data } = yield take(LOGIN_REQUEST);
    try {
        const response = yield call(loginCall, data);
        yield put(loginRequestSuccess(response));
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
        console.log('Login Success: ', response);
    } catch (err) {
        console.log('Login Faliure: ', err);
        yield put(loginRequestFailiure(err));
        // yield put(showErrorAlert('Failed'));
        notification['error']({
          message: 'Error',
          description:
            '',
        });
    }
  }
}

export default function* root() {
    yield fork(watchLoginRequestIterator);
}