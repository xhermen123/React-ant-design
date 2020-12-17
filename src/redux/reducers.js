import { combineReducers } from 'redux';
import taskManagerReducers from '../containers/private/task-manager/taskManagerReducer';
import clientsReducers from '../containers/private/clients/clientsReducer';
import workstationReducers from '../containers/private/dashboard/dashboardReducer';
import caseDetailReducers from '../containers/private/client-detail/clientDetailReducer';
import enterpriseSignupReducers from '../containers/public/signup/signupReducer';
import clientSignupReducers from '../containers/public/signup-client/signupReducer';
import loginReducers from '../containers/public/login/loginReducer';
import alertReducers from '../components/Alert/alertReducer';

const rootReducer = combineReducers({
    taskManager: taskManagerReducers,
    clients: clientsReducers,
    workstation: workstationReducers,
    caseDetail: caseDetailReducers,
    enterpriseSignup: enterpriseSignupReducers,
    clientSignup: clientSignupReducers,
    login: loginReducers,
    alert: alertReducers
});

export default rootReducer;