import React from 'react';
import { take, put, call, fork } from 'redux-saga/effects';
import { ENTERPRISE_SIGNUP, ENTERPRISE_SIGNUP_SUCCESS, ENTERPRISE_SIGNUP_FALIURE } from './types';
import { enterpriseSignupSuccess, enterpriseSignupFailiure } from './signupAction';
import authService from '../../../services/auth';
import { showSuccessAlert, showErrorAlert } from '../../../components/Alert/alertAction';
import { notification } from 'antd';

function enterpriseSignupCall(data: any) {
  return new Promise(resolve => {
    const res = authService.enterpriseSignup(data)
    resolve(res)
  });
}

function* watchEnterpriseSignupRequestIterator() {
  while (true) {
    const { data } = yield take(ENTERPRISE_SIGNUP);
    try {
        const response = yield call(enterpriseSignupCall, data);
        yield put(enterpriseSignupSuccess(response));
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
        console.log('Enterprise Signup Success: ', response);
    } catch (err) {
        console.log('Enterprise Signup Faliure: ', err);
        yield put(enterpriseSignupFailiure(err));
        // yield put(showErrorAlert('Success'));
        notification['error']({
          message: 'Error',
          description:
            '',
        });
    }
  }
}

export default function* root() {
    yield fork(watchEnterpriseSignupRequestIterator);
}