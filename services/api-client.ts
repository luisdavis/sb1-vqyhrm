const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { 
        error: { 
          message: data.message || 'Request failed', 
          errors: data.errors 
        } 
      };
    }

    return { data };
  } catch (error) {
    return {
      error: {
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
      },
    };
  }
}