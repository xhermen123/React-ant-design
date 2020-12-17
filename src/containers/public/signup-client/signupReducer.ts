import { 
  CLIENT_SIGNUP,
  CLIENT_SIGNUP_SUCCESS,
  CLIENT_SIGNUP_FALIURE,
  GET_CLIENT_DATA,
  GET_CLIENT_DATA_SUCCESS,
  GET_CLIENT_DATA_FAILURE
} from './types';
  
const initialState = {
      errorMessage: '',
      user: {},
      clientData: {}
};
  
const reducer = (state = initialState, action: any) => {
    switch (action.type) {
    case CLIENT_SIGNUP:
      return Object.assign({}, state, {
      })
    case CLIENT_SIGNUP_SUCCESS:
      if(action.res.success) {
        localStorage.setItem('auth', JSON.stringify(action.res.data));
      }
      return Object.assign({}, state, {
          user: action.res.data
      })
    case CLIENT_SIGNUP_FALIURE:
      return Object.assign({}, state, {
          errorMessage: action.err
      })
    case GET_CLIENT_DATA:
      return Object.assign({}, state, {
      })
    case GET_CLIENT_DATA_SUCCESS:
      return Object.assign({}, state, {
          clientData: action.res.data
      })
    case GET_CLIENT_DATA_FAILURE:
      return Object.assign({}, state, {
          errorMessage: action.err
      })
    default:
      return state;
    }
};
export default reducer;