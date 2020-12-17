import { post, get, put, del } from './base';
import { apiUrl } from '../config'

export default {
    list(): Promise<any> {
        return get(`${apiUrl()}/categories`)
    },   
    store(req: any): Promise<any> {
        let data = {
            name: req
        }
        return post(`${apiUrl()}/categories/create`, data);
    },
    update(req: any): Promise<any> {
        req.name = req.name;
        return put(`${apiUrl()}/categories/${req.id}`, req)
    },
    get(id: string): Promise<any> {
        return get(`${apiUrl()}/categories/${id}`);
    },
    del(id: string) {
        return del(`${apiUrl()}/categories/${id}`);
    }
}