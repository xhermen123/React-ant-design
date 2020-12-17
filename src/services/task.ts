import { post, get, put, del, postUpload } from './base';
import { apiUrl } from '../config'

export default {
    list(): Promise<any> {
        return get(`${apiUrl()}/tasks`)
    },
        
    store(req: any): Promise<any> {
        return postUpload(`${apiUrl()}/tasks/create`, req);
    },
    update(req: any): Promise<any> {
        req.name = req.name;
        return postUpload(`${apiUrl()}/tasks/${req.get('id')}`, req)
    },
    get(id: string): Promise<any> {
        return get(`${apiUrl()}/tasks/${id}`);
    },
    del(id: string) {
        return del(`${apiUrl()}/tasks/${id}`);
    }
}