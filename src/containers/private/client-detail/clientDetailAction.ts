import {
    FETCH_CASE_DETAIL, FETCH_CASE_DETAIL_SUCCESS, FETCH_CASE_DETAIL_FALIURE,
    UPDATE_CASE_DETAIL, UPDATE_CASE_DETAIL_SUCCESS, UPDATE_CASE_DETAIL_FAILURE, CHANGE_CASE_STATUS
} from './types';
  
export function fetchCaseDetail(data: any) {
    return {
        type: FETCH_CASE_DETAIL,
        data
    }
}

export function fetchCaseDetailSuccess(res: any) {
    return {
        type: FETCH_CASE_DETAIL_SUCCESS,
        res
    }
}

export function fetchCaseDetailFailiure(err: any) {
    return {
        type: FETCH_CASE_DETAIL_FALIURE,
        err 
    }
}

export function updateCaseDetail(data: any) {
    return {
        type: UPDATE_CASE_DETAIL,
        data
    }
}

export function updateCaseDetailSuccess(res: any) {
    return {
        type: UPDATE_CASE_DETAIL_SUCCESS,
        res
    }
}

export function updateCaseDetailFailure(err: any) {
    return {
        type: UPDATE_CASE_DETAIL_FAILURE,
        err 
    }
}

export function changeCaseTaskStatus(data: any) {
    return {
        type: CHANGE_CASE_STATUS,
        data
    }
}