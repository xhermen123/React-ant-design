import { 
    LOGIN_REQUEST,
    LOGIN_REQUEST_SUCCESS,
    LOGIN_REQUEST_FALIURE
} from './types';
  
const initialState = {
      user: {},
      errorMessage: {}
};
  
const reducer = (state = initialState, action: any) => {
    switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
      })
    case LOGIN_REQUEST_SUCCESS:
      if(action.res.success) {
        localStorage.setItem('auth', JSON.stringify(action.res.data));
      }
      return Object.assign({}, state, {
          user: action.res.data
      })
    case LOGIN_REQUEST_FALIURE:
      return Object.assign({}, state, {
          errorMessage: action.err
      })
    default:
      return state;
    }
};
export default reducer;