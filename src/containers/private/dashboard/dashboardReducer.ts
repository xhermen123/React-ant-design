import { 
    FETCH_CASES, FETCH_CASES_SUCCESS, FETCH_CASES_FAILURE,
    CREATE_CASE, CREATE_CASE_SUCCESS, CREATE_CASE_FAILURE,
    FETCH_CLIENT_CASE, FETCH_CLIENT_CASE_SUCCESS, FETCH_CLIENT_CASE_FAILURE
} from './types';
  
const initialState = {
      errorMessage: '',
      cases: [],
};
  
const reducer = (state = initialState, action: any) => {
    switch (action.type) {
    case FETCH_CASES:
      return Object.assign({}, state, {
      })
    case FETCH_CASES_SUCCESS:
      return Object.assign({}, state, {
          cases: action.res.data
      })
    case FETCH_CASES_FAILURE:
      return Object.assign({}, state, {
          errorMessage: action.err
      })
    case FETCH_CLIENT_CASE:
      return Object.assign({}, state, {
      })
    case FETCH_CLIENT_CASE_SUCCESS:
      return Object.assign({}, state, {
        cases: action.res.data
      })
    case FETCH_CLIENT_CASE_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.err
      })
    case CREATE_CASE:
      return Object.assign({}, state, {
      })
    case CREATE_CASE_SUCCESS:
      var cases = Array();

      state.cases.map((item, index) => {
        cases.push(item);
      })

      cases.push(action.res.data);

      return Object.assign({}, state, {
          cases: cases
      })
    case CREATE_CASE_FAILURE:
      return Object.assign({}, state, {
          errorMessage: action.err
      })
    default:
      return state;
    }
};
export default reducer;