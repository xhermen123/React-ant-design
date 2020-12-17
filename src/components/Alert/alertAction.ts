import {
    SHOW_ERROR_ALERT, SHOW_SUCCESS_ALERT, CLOSE_ERROR_ALERT
} from './types';
  
export function showErrorAlert(message: any) {
    return {
        type: SHOW_ERROR_ALERT,
        message
    }
}

export function showSuccessAlert(message: any) {
    return {
        type: SHOW_SUCCESS_ALERT,
        message
    }
}

export function closeAlert() {
    return {
        type: CLOSE_ERROR_ALERT
    }
}
