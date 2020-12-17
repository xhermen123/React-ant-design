import { all } from 'redux-saga/effects';
import taskManagerSagas from '../containers/private/task-manager/taskManagerSaga';
import clientsSagas from '../containers/private/clients/clientsSaga';
import workstationSagas from '../containers/private/dashboard/dashboardSaga';
import caseDetailSagas from '../containers/private/client-detail/clientDetailSaga';
import enterpriseSignupSagas from '../containers/public/signup/signupSaga';
import clientSignupSagas from '../containers/public/signup-client/signupSaga';
import loginSagas from '../containers/public/login/loginSaga';

export default function* rootSaga() {
  yield all([
    taskManagerSagas(),
    clientsSagas(),
    workstationSagas(),
    caseDetailSagas(),
    enterpriseSignupSagas(),
    clientSignupSagas(),
    loginSagas()
  ]);
}