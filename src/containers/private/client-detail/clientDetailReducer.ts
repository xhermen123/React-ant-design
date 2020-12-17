import { 
    FETCH_CASE_DETAIL, FETCH_CASE_DETAIL_SUCCESS, FETCH_CASE_DETAIL_FALIURE,
    UPDATE_CASE_DETAIL, UPDATE_CASE_DETAIL_SUCCESS, UPDATE_CASE_DETAIL_FAILURE, CHANGE_CASE_STATUS 
} from './types';
  
const initialState = {
      errorMessage: '',
      case: {}
};
  
const reducer = (state = initialState, action: any) => {
    switch (action.type) {
    case FETCH_CASE_DETAIL:
      return Object.assign({}, state, {
      })
    case FETCH_CASE_DETAIL_SUCCESS:
      return Object.assign({}, state, {
          case: action.res.data
      })
    case FETCH_CASE_DETAIL_FALIURE:
      return Object.assign({}, state, {
          errorMessage: action.err
      })
    case UPDATE_CASE_DETAIL:
      return Object.assign({}, state, {
      })
    case UPDATE_CASE_DETAIL_SUCCESS:
      return Object.assign({}, state, {
          case: action.res.data
      })
    case UPDATE_CASE_DETAIL_FAILURE:
      return Object.assign({}, state, {
          errorMessage: action.err
      })
    case CHANGE_CASE_STATUS:
      return Object.assign({}, state, {
      })
    default:
      return state;
    }
};
export default reducer;