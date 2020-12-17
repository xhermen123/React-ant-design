import {
    FETCH_TASKS, FETCH_TASKS_SUCCESS, FETCH_TASKS_FAILURE,
    FETCH_CATEGORY, FETCH_CATEGORY_SUCCESS, FETCH_CATEGORY_FAILURE, CREATE_CATEGORY, CREATE_CATEGORY_SUCCESS, CREATE_CATEGORY_FAILURE, CREATE_TASK, CREATE_TASK_SUCCESS, CREATE_TASK_FAILURE, DELETE_TASK, DELETE_TASK_SUCCESS, DELETE_TASK_FAILURE, DELETE_CATEGORY, DELETE_CATEGORY_SUCCESS, DELETE_CATEGORY_FAILURE, UPDATE_TASK, UPDATE_TASK_SUCCESS, UPDATE_TASK_FAILURE
} from './types';
  
export function fetchTasks() {
    return {
        type: FETCH_TASKS
    }
}

export function fetchTasksSuccess(res: any) {
    return {
        type: FETCH_TASKS_SUCCESS,
        res
    }
}

export function fetchTasksFailiure(err: any) {
    return {
        type: FETCH_TASKS_FAILURE,
        err 
    }
}

export function createTask(data: any) {
    return {
        type: CREATE_TASK,
        data
    }
}

export function createTaskSuccess(res: any) {
    return {
        type: CREATE_TASK_SUCCESS,
        res
    }
}

export function createTaskFailure(err: any) {
    return {
        type: CREATE_TASK_FAILURE,
        err 
    }
}

export function updateTask(data: any) {
    return {
        type:  UPDATE_TASK,
        data
    }
}

export function updateTaskSuccess(res: any) {
    return {
        type: UPDATE_TASK_SUCCESS,
        res
    }
}

export function updateTaskFailure(err: any) {
    return {
        type: UPDATE_TASK_FAILURE,
        err 
    }
}

export function deleteTask(data: any) {
    return {
        type: DELETE_TASK,
        data
    }
}

export function deleteTaskSuccess(res: any) {
    return {
        type: DELETE_TASK_SUCCESS,
        res
    }
}

export function deleteTaskFailure(err: any) {
    return {
        type: DELETE_TASK_FAILURE,
        err 
    }
}

export function fetchCategory() {
    return {
        type: FETCH_CATEGORY
    }
}

export function fetchCategorySuccess(res: any) {
    return {
        type: FETCH_CATEGORY_SUCCESS,
        res
    }
}

export function fetchCategoryFailiure(err: any) {
    return {
        type: FETCH_CATEGORY_FAILURE,
        err 
    }
}


export function createCategory(data: any) {
    return {
        type: CREATE_CATEGORY,
        data
    }
}

export function createCategorySuccess(res: any) {
    return {
        type: CREATE_CATEGORY_SUCCESS,
        res
    }
}

export function createCategoryFailiure(err: any) {
    return {
        type: CREATE_CATEGORY_FAILURE,
        err 
    }
}

export function deleteCategory(data: any) {
    return {
        type: DELETE_CATEGORY,
        data
    }
}

export function deleteCategorySuccess(res: any) {
    return {
        type: DELETE_CATEGORY_SUCCESS,
        res
    }
}

export function deleteCategoryFailure(err: any) {
    return {
        type: DELETE_CATEGORY_FAILURE,
        err 
    }
}
