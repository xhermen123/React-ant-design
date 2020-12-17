import {
    FETCH_CASES, FETCH_CASES_SUCCESS, FETCH_CASES_FAILURE,
    CREATE_CASE, CREATE_CASE_SUCCESS, CREATE_CASE_FAILURE,
    FETCH_CLIENT_CASE, FETCH_CLIENT_CASE_SUCCESS, FETCH_CLIENT_CASE_FAILURE
} from './types';
  
export function fetchCases() {
    return {
        type: FETCH_CASES
    }
}

export function fetchCasesSuccess(res: any) {
    return {
        type: FETCH_CASES_SUCCESS,
        res
    }
}

export function fetchCasesFailiure(err: any) {
    return {
        type: FETCH_CASES_FAILURE,
        err 
    }
}
  
export function fetchClientCases() {
    return {
        type: FETCH_CLIENT_CASE
    }
}

export function fetchClientCasesSuccess(res: any) {
    return {
        type: FETCH_CLIENT_CASE_SUCCESS,
        res
    }
}

export function fetchClientCasesFailiure(err: any) {
    return {
        type: FETCH_CLIENT_CASE_FAILURE,
        err 
    }
}

export function createCase(data: any) {
    return {
        type: CREATE_CASE,
        data
    }
}

export function createCaseSuccess(res: any) {
    return {
        type: CREATE_CASE_SUCCESS,
        res
    }
}

export function createCaseFailure(err: any) {
    return {
        type: CREATE_CASE_FAILURE,
        err 
    }
}