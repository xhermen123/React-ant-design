import {
    FETCH_CLIENTS, FETCH_CLIENTS_SUCCESS, FETCH_CLIENTS_FAILURE,
    CREATE_CLIENT, CREATE_CLIENT_SUCCESS, CREATE_CLIENT_FALIURE
} from './types';
  
export function fetchClients() {
    return {
        type: FETCH_CLIENTS
    }
}

export function fetchClientsSuccess(res: any) {
    return {
        type: FETCH_CLIENTS_SUCCESS,
        res
    }
}

export function fetchClientsFailiure(err: any) {
    return {
        type: FETCH_CLIENTS_FAILURE,
        err 
    }
}

export function createClient(data: any) {
    return {
        type: CREATE_CLIENT,
        data
    }
}

export function createClientSuccess(res: any) {
    return {
        type: CREATE_CLIENT_SUCCESS,
        res
    }
}

export function createClientFailiure(err: any) {
    return {
        type: CREATE_CLIENT_FALIURE,
        err 
    }
}