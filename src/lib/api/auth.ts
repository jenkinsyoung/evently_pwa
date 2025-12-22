import type { LoginRequest, RegisterRequest, TokenResponse } from '@/types/auth';
import { ApiResult } from '@/types/api'
import { apiFetch } from '../api-client'
import { User } from '@/types';
export async function login(body: LoginRequest) : Promise<ApiResult<TokenResponse>> {
  return apiFetch('/auth/login', {method: "POST", body: body ? JSON.stringify(body) : undefined,});
}

export async function register(body: RegisterRequest) : Promise<ApiResult<User>> {
  return apiFetch('/auth/register', {method: "POST", body: body ? JSON.stringify(body) : undefined,});
}

export async function setAuthToken(token: string) {
  // сохраняем в cookies на клиенте
  document.cookie = `token=${token}; path=/; max-age=900; SameSite=Strict`;
}
