import {
    LOGIN_REQUEST,
    LOGIN_REQUEST_FALIURE,
    LOGIN_REQUEST_SUCCESS
} from './types';
  
export function loginRequest(data: any) {
    return {
        type: LOGIN_REQUEST,
        data
    }
}

export function loginRequestSuccess(res: any) {
    return {
        type: LOGIN_REQUEST_SUCCESS,
        res
    }
}

export function loginRequestFailiure(err: any) {
    return {
        type: LOGIN_REQUEST_FALIURE,
        err 
    }
}
