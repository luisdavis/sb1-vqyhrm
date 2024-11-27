import { apiClient } from './api-client';

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  email?: string;
  access?: string;
  refresh?: string;
}

export const authService = {
  async login(data: LoginData) {
    return apiClient<AuthResponse>('/users/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  },
};