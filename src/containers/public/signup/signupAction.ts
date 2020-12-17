import {
    ENTERPRISE_SIGNUP,
    ENTERPRISE_SIGNUP_SUCCESS,
    ENTERPRISE_SIGNUP_FALIURE
} from './types';
  
export function enterpriseSignup(data: any) {
    return {
        type: ENTERPRISE_SIGNUP,
        data
    }
}

export function enterpriseSignupSuccess(res: any) {
    return {
        type: ENTERPRISE_SIGNUP_SUCCESS,
        res
    }
}

export function enterpriseSignupFailiure(err: any) {
    return {
        type: ENTERPRISE_SIGNUP_FALIURE,
        err 
    }
}
