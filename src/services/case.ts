import { post, get, put, del, postUpload } from './base';
import { apiUrl } from '../config'

export default {
    list(): Promise<any> {
        return get(`${apiUrl()}/cases`)
    },
    clientCaseList(): Promise<any> {
        return get(`${apiUrl()}/cases/client-cases`)
    },
    store(req: any): Promise<any> {
        return post(`${apiUrl()}/cases/create`, req);
    },
    update(req: any): Promise<any> {
        return postUpload(`${apiUrl()}/cases/${req.get('case_id')}`, req)
    },
    get(id: string): Promise<any> {
        return get(`${apiUrl()}/cases/${id}`);
    },
    del(id: string) {
        return del(`${apiUrl()}/cases/${id}`);
    },
    changeCaseTaskStatus(data: any): Promise<any> {
        return put(`${apiUrl()}/cases/change-task-status`, data);
    }
}