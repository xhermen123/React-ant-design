import { 
    FETCH_CLIENTS, FETCH_CLIENTS_SUCCESS, FETCH_CLIENTS_FAILURE,
    CREATE_CLIENT, CREATE_CLIENT_SUCCESS, CREATE_CLIENT_FALIURE 
} from './types';
  
const initialState = {
      errorMessage: '',
      clients: [],
};
  
const reducer = (state = initialState, action: any) => {
    switch (action.type) {
    case FETCH_CLIENTS:
      return Object.assign({}, state, {
      })
    case FETCH_CLIENTS_SUCCESS:
      return Object.assign({}, state, {
          clients: action.res.data
      })
    case FETCH_CLIENTS_FAILURE:
      return Object.assign({}, state, {
          errorMessage: action.err
      })
    case CREATE_CLIENT:
      return Object.assign({}, state, {
      })
    case CREATE_CLIENT_SUCCESS:
      var clients = Array();

      state.clients.map((item, index) => {
        clients.push(item);
      })

      clients.push(action.res.data);

      return Object.assign({}, state, {
        clients: clients
      })
    case CREATE_CLIENT_FALIURE:
      return Object.assign({}, state, {
          errorMessage: action.err
      })
    default:
      return state;
    }
};
export default reducer;