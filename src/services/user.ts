import { post, get, put, del } from './base';
import { apiUrl } from '../config'

export interface StoreUserRequest {
  first_name: string;
  last_name: string;
  email: string;
  company?: string;
  address?: string;
  birthday?: string;
  phone?: string;
  password?: string;
  type?: string;
}

export interface UpdateUserRequest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  avatarUrl: string;
  viewVenueName: boolean;
}

export interface UpdatePasswordRequest {
  userId: string;
  oldPassword: string;
  newPassword: string;
}

export default {
  get(id: string): Promise<any> {
    return get(`${apiUrl()}/users/${id}`);
  },

  store(req: StoreUserRequest): Promise<any> {
    return post(`${apiUrl()}/users`, req);
  },

  updatePassword(req: UpdatePasswordRequest): Promise<any> {
    return post(`${apiUrl()}/users/${req.userId}/update-password`, req)
  },

  update(req: UpdateUserRequest): Promise<any> {
    req.email = req.email.toLowerCase();
    req.phoneNumber = req.phoneNumber ? req.phoneNumber.replace(/\D/g, '') : ''
    return put(`${apiUrl()}/users/${req.id}`, req);
  },
  list(): Promise<any> {
    return get(`${apiUrl()}/users`);
  },
  clients(): Promise<any> {
    return get(`${apiUrl()}/users/clients`);
  },
  activate(hash: string): Promise<any> {
    return post(`${apiUrl()}/activate-account/${hash}`, null)
  },
  getClientData(id: string) : Promise<any> {
    return get(`${apiUrl()}/users/get-client-data/${id}`);
  },
  del(id: string): Promise<any> {
      return del(`${apiUrl()}/users/${id}`)
  }
}