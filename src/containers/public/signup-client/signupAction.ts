import {
    CLIENT_SIGNUP,
    CLIENT_SIGNUP_SUCCESS,
    CLIENT_SIGNUP_FALIURE,
    GET_CLIENT_DATA,
    GET_CLIENT_DATA_SUCCESS,
    GET_CLIENT_DATA_FAILURE
} from './types';
  
export function clientSignup(data: any) {
    return {
        type: CLIENT_SIGNUP,
        data
    }
}

export function clientSignupSuccess(res: any) {
    return {
        type: CLIENT_SIGNUP_SUCCESS,
        res
    }
}

export function clientSignupFailiure(err: any) {
    return {
        type: CLIENT_SIGNUP_FALIURE,
        err 
    }
}
  
export function getClientData(data: any) {
    return {
        type: GET_CLIENT_DATA,
        data
    }
}

export function getClientDataSuccess(res: any) {
    return {
        type: GET_CLIENT_DATA_SUCCESS,
        res
    }
}

export function getClientDataFailure(err: any) {
    return {
        type: GET_CLIENT_DATA_FAILURE,
        err 
    }
}