import { 
  ENTERPRISE_SIGNUP,
  ENTERPRISE_SIGNUP_SUCCESS,
  ENTERPRISE_SIGNUP_FALIURE
} from './types';
  
const initialState = {
      errorMessage: '',
      user: {}
};
  
const reducer = (state = initialState, action: any) => {
    switch (action.type) {
    case ENTERPRISE_SIGNUP:
      return Object.assign({}, state, {
      })
    case ENTERPRISE_SIGNUP_SUCCESS:
      if(action.res.success) {
        localStorage.setItem('auth', JSON.stringify(action.res.data));
      }
      return Object.assign({}, state, {
          user: action.res.data
      })
    case ENTERPRISE_SIGNUP_FALIURE:
      return Object.assign({}, state, {
          errorMessage: action.err
      })
    default:
      return state;
    }
};
export default reducer;