import { 
    SHOW_ERROR_ALERT,
    SHOW_SUCCESS_ALERT,
    CLOSE_ERROR_ALERT
} from './types';
  
const initialState = {
    message: '',
    type: null,
};
  
const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SHOW_SUCCESS_ALERT:
            return Object.assign({}, state, {
                message: action.message,
                type: 'success'
            })
        case SHOW_ERROR_ALERT:
            return Object.assign({}, state, {
                message: action.message,
                type: 'error'
            })
        case CLOSE_ERROR_ALERT:
            return Object.assign({}, state, {
                message: '',
                type: null
            })
        default:
            return state;
    }
};
export default reducer;