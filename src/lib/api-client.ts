import { cookies } from "next/headers";
import { ApiResult, ApiError } from "@/types/api";

const baseUrl = process.env.API_URL!;

export async function apiFetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<ApiResult<T>> {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  try {
    const res = await fetch(`${baseUrl}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const error: ApiError = {
        status: res.status,
        message: res.statusText,
      };
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
