import React from 'react';
import { take, put, call, fork } from 'redux-saga/effects';
import { FETCH_TASKS, FETCH_CATEGORY, CREATE_TASK, CREATE_CATEGORY, DELETE_CATEGORY, DELETE_TASK, UPDATE_TASK } from './types';
import { fetchTasksSuccess, fetchTasksFailiure, fetchCategorySuccess, fetchCategoryFailiure, createCategorySuccess, createCategoryFailiure, createTaskSuccess, createTaskFailure, deleteCategorySuccess, deleteCategoryFailure, deleteTaskSuccess, deleteTaskFailure, updateTaskFailure, updateTaskSuccess } from './taskManagerAction';
import taskService from '../../../services/task';
import categoryService from '../../../services/category';

function fetchTasks() {
    return new Promise(resolve => {
        const req = taskService.list();
        resolve(req);
    });
}

function* watchFetchTasksRequestIterator() {
  while (true) {
    yield take(FETCH_TASKS);
    try {
        const response = yield call(fetchTasks);
        yield put(fetchTasksSuccess(response));
        console.log('Fetch Tasks Success: ', response);
    } catch (err) {
        console.log('Fetch Tasks Faliure: ', err);
        yield put(fetchTasksFailiure(err));
    }
  }
}

function createTask(data: any) {
    return new Promise(resolve => {
        const req = taskService.store(data);
        resolve(req);
    })
}

function* watchCreateTaskRequestIterator() {
    while(true) {
        const { data } = yield take(CREATE_TASK);

        try {
            const response = yield call(createTask, data);
            yield put(createTaskSuccess(response));
        } catch (err) {
            console.log('Fetch Category Faliure: ', err);
            yield put(createTaskFailure(err));
        }
    }
}

function updateTask(data: any) {
    return new Promise(resolve => {
        const req = taskService.update(data);
        resolve(req);
    })
}

function* watchUpdateTaskRequestIterator() {
    while(true) {
        const { data } = yield take(UPDATE_TASK);

        try {
            const response = yield call(updateTask, data);
            yield put(updateTaskSuccess(response));
        } catch (err) {
            console.log('Fetch Category Faliure: ', err);
            yield put(updateTaskFailure(err));
        }
    }
}

function deleteTask(data: any) {
    return new Promise(resolve => {
        const req = taskService.del(data);
        resolve(req);
    })
}

function* watchDeleteTaskRequestIterator() {
    while(true) {
        const { data } = yield take(DELETE_TASK);

        try {
            const response = yield call(deleteTask, data._id);
            yield put(deleteTaskSuccess(data));
        } catch (err) {
            console.log('Delete Task Faliure: ', err);
            yield put(deleteTaskFailure(err));
        }
    }
}

function fetchCategories() {
    return new Promise(resolve => {
        const req = categoryService.list()
        resolve(req)
    });
}

function* watchFetchCategoriesRequestIterator() {
  while (true) {
    yield take(FETCH_CATEGORY);
    try {
        const response = yield call(fetchCategories);
        yield put(fetchCategorySuccess(response));
        console.log('Fetch Category Success: ', response);
    } catch (err) {
        console.log('Fetch Category Faliure: ', err);
        yield put(fetchCategoryFailiure(err));
    }
  }
}

function createCategory(data: any) {
    return new Promise(resolve => {
        const req = categoryService.store(data)
        resolve(req)
    });
}

function* watchCreateCategoriesRequestIterator() {
  while (true) {
    const { data } = yield take(CREATE_CATEGORY);
    try {
        const response = yield call(createCategory, data);
        yield put(createCategorySuccess(response));
        console.log('Create Category Success: ', response);
    } catch (err) {
        console.log('Create Category Faliure: ', err);
        yield put(createCategoryFailiure(err));
    }
  }
}

function deleteCategory(data: any) {
    return new Promise(resolve => {
        const req = categoryService.del(data);
        resolve(req);
    })
}

function* watchDeleteCategoryRequestIterator() {
    while(true) {
        const { data } = yield take(DELETE_CATEGORY);
        try {
            const response = yield call(deleteCategory, data);
            yield put(deleteCategorySuccess(response));
        } catch (err) {
            console.log('delete category error: ', err);
            yield put(deleteCategoryFailure(err));
        }
    }
}

export default function* root() {
    yield fork(watchFetchTasksRequestIterator);
    yield fork(watchCreateTaskRequestIterator);
    yield fork(watchUpdateTaskRequestIterator);
    yield fork(watchDeleteTaskRequestIterator);
    yield fork(watchFetchCategoriesRequestIterator);
    yield fork(watchCreateCategoriesRequestIterator);
    yield fork(watchDeleteCategoryRequestIterator);
}