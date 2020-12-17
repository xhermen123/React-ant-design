import { 
    FETCH_AMENITIES, FETCH_AMENITIES_SUCCESS, FETCH_AMENITIES_FAILURE,
    FETCH_VENUE_OPTIONS, FETCH_VENUE_OPTIONS_SUCCESS, FETCH_VENUE_OPTIONS_FAILURE 
} from './types';
  
const initialState = {
      errorMessage: '',
      amenities: [],
      options: {}
};
  
const reducer = (state = initialState, action: any) => {
    switch (action.type) {
    case FETCH_AMENITIES:
      return Object.assign({}, state, {
      })
    case FETCH_AMENITIES_SUCCESS:
      return Object.assign({}, state, {
          amenities: action.res.data[0].amenities
      })
    case FETCH_AMENITIES_FAILURE:
      return Object.assign({}, state, {
          errorMessage: action.err
      })
    case FETCH_VENUE_OPTIONS:
      return Object.assign({}, state, {
      })
    case FETCH_VENUE_OPTIONS_SUCCESS:
      return Object.assign({}, state, {
          options: action.res.data
      })
    case FETCH_VENUE_OPTIONS_FAILURE:
      return Object.assign({}, state, {
          errorMessage: action.err
      })
    default:
      return state;
    }
};
export default reducer;