const API_URL = import.meta.env.VITE_API_URL || "/api";

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export const api = {
  get: async <T>(endpoint: string, options?: FetchOptions): Promise<T> => {
    const res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!res.ok) {
      throw new Error(`API Error: ${res.statusText}`);
    }

    return res.json();
  },

  post: async <T>(endpoint: string, body: unknown, options?: FetchOptions): Promise<T> => {
    const res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error(`API Error: ${res.statusText}`);
    }

    return res.json();
  },
};
