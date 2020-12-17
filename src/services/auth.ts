import { post, get } from './base';
import jwtDecode from 'jwt-decode'
import { apiUrl } from '../config'

export interface AuthenticateResponse {
  data: {
    token: string
  }
}

export default {
  authenticate(email: string, password: string): Promise<AuthenticateResponse> {
    const payload = {
      email: email.toLowerCase(),
      password
    }
    return post(`${apiUrl()}/auth/login`, payload);
  },
  authenticateProvider(provider: string, providerId: string): Promise<AuthenticateResponse> {
    const payload = {
      provider: provider,
      providerId,
      type: 'provider'
    }
    return post(`${apiUrl()}/authenticate`, payload);
  },
  isAuthenticated(): boolean {
    const user = JSON.parse(localStorage.getItem('auth') || '{}');
    
    if (!user || !user.token) return false

    const decoded: any = jwtDecode(user.token)
    if (decoded.exp < Math.floor(Date.now() / 1000)) return false

    return true
  },
  isAdmin(): boolean {
    const token = localStorage.getItem('token')
    if (!token || token === '') return false

    const decoded: any = jwtDecode(token)

    return decoded.isAdmin;
  },
  me() {
    return get(`${apiUrl()}/me`);
  },
  forgotPassword(email: string): Promise<any> {
    return post(`${apiUrl()}/forgot-password`, { email })
  },
  resetPassword(password: string, hash: string): Promise<any> {
    return post(`${apiUrl()}/reset-password`, {
      password,
      hash
    })
  },
  enterpriseSignup(data: any) : Promise<any> {
    data.email = data.email.toLowerCase();
    return post(`${apiUrl()}/auth/enterprise_register`, data);
  },
  clientSignup(data: any) : Promise<any> {
    data.email = data.email.toLowerCase();
    return post(`${apiUrl()}/auth/register`, data);
  },
  emailVerify(token: any) {
    return post(`${apiUrl()}/auth/email-verify/${token}`, {});
  },
  logout() : Promise<any> {
    return post(`${apiUrl()}/auth/logout`, {});
  }
}