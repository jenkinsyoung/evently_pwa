// lib/api-client.ts
import { ApiResult, ApiError } from "@/types/api";

const baseUrl = process.env.NEXT_PUBLIC_API_URL!; // публичная переменная!

export async function apiFetch<T>(
  url: string,
  options: RequestInit = {},
  token?: string
): Promise<ApiResult<T>> {
  try {
    const res = await fetch(`${baseUrl}${url}`, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
      cache: "no-cache",
    });

    if (!res.ok) {
      const error: ApiError = { status: res.status, message: res.statusText };
      return { ok: false, error };
    }

    const data: T = await res.json();
    return { ok: true, data };
  } catch (e) {
    const error: ApiError = {
      status: 0,
      message: e instanceof Error ? e.message : "Unknown error",
    };
    return { ok: false, error };
  }
}
