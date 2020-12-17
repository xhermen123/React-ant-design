import { 
    FETCH_TASKS_FAILURE, FETCH_TASKS, FETCH_TASKS_SUCCESS,
    FETCH_CATEGORY, FETCH_CATEGORY_SUCCESS, FETCH_CATEGORY_FAILURE, CREATE_CATEGORY, CREATE_TASK, CREATE_TASK_SUCCESS, CREATE_TASK_FAILURE, DELETE_TASK, DELETE_TASK_SUCCESS, DELETE_TASK_FAILURE, CREATE_CATEGORY_SUCCESS, CREATE_CATEGORY_FAILURE, DELETE_CATEGORY, DELETE_CATEGORY_SUCCESS, DELETE_CATEGORY_FAILURE, UPDATE_TASK_FAILURE, UPDATE_TASK_SUCCESS, UPDATE_TASK
} from './types';
  
const initialState = {
      errorMessage: '',
      tasks: Array(),
      categories: Array(),
      options: {}
};
  
const reducer = (state = initialState, action: any) => {
    switch (action.type) {
      case FETCH_TASKS:
        return Object.assign({}, state, {
        })
      case FETCH_TASKS_SUCCESS:
        return Object.assign({}, state, {
            tasks: action.res.data
        })
      case FETCH_TASKS_FAILURE:
        return Object.assign({}, state, {
            errorMessage: action.err
        })
      case CREATE_TASK:
        return Object.assign({}, state, {
        })
      case CREATE_TASK_SUCCESS:
        return Object.assign({}, state, {
          categories: action.res.data
        })
      case CREATE_TASK_FAILURE:
        return Object.assign({}, state, {
          errorMessage: action.err
        })
      case UPDATE_TASK:
        return Object.assign({}, state, {
        })
      case UPDATE_TASK_SUCCESS:
        return Object.assign({}, state, {
          categories: action.res.data
        })
      case UPDATE_TASK_FAILURE:
        return Object.assign({}, state, {
          errorMessage: action.err
        })
      case DELETE_TASK:
        return Object.assign({}, state, {
        })
      case DELETE_TASK_SUCCESS:
        let deletedItem = action.res;

        let deleted_categories = Array();

        for(var i=0; i<state.categories.length; i++) {
          if(state.categories[i]._id == deletedItem.category_id) {
            let deletedtasks = Array();
            for(var j=0; j<state.categories[i].tasks.length; j++) {
              if(state.categories[i].tasks[j]._id != deletedItem._id)
                deletedtasks.push(state.categories[i].tasks[j]);
            }

            let deletedCategory = Object.assign({}, state.categories[i], {
              tasks: deletedtasks
            });

            deleted_categories.push(deletedCategory);
          } else {
            deleted_categories.push(state.categories[i]);
          }
        }
        return Object.assign({}, state, {
          categories: deleted_categories
        })
      case DELETE_TASK_FAILURE:
        return Object.assign({}, state, {
          errorMessage: action.err
        })
      case FETCH_CATEGORY:
        return Object.assign({}, state, {
        })
      case FETCH_CATEGORY_SUCCESS:
        return Object.assign({}, state, {
            categories: action.res.data
        })
      case FETCH_CATEGORY_FAILURE:
        return Object.assign({}, state, {
            errorMessage: action.err
        })
      case CREATE_CATEGORY:
        return Object.assign({}, state, {
        })
      case CREATE_CATEGORY_SUCCESS:
        var categories = Array();

        state.categories.map((item, index) => {
          categories.push(item);
        })

        categories.push(action.res.data);

        return Object.assign({}, state, {
          categories: categories
        })
      case CREATE_CATEGORY_FAILURE:
        return Object.assign({}, state, {
          errorMessage: action.err
        })
      case DELETE_CATEGORY:
        return Object.assign({}, state, {
        })
      case DELETE_CATEGORY_SUCCESS:
        var categories1 = Array();
        var id = action.res.data;

        state.categories.map((item, index) => {
          if(item._id != id) {
            categories1.push(item);
          }
        })

        return Object.assign({}, state, {
          categories: categories1
        })
      case DELETE_CATEGORY_FAILURE:
        return Object.assign({}, state, {
          errorMessage: action.err
        })
      default:
        return state;
    }
};
export default reducer;