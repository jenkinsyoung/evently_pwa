import { apiFetch } from "../api-client";
import { User } from "@/types";
import { ApiResult } from "@/types/api";
import { cookies } from "next/headers";
export async function getUserByID(id: string): Promise<ApiResult<User>> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  return apiFetch<User>(`/user/${id}`, {}, token?.toString());
}

export function updateUser(id: string, body?: JSON): Promise<ApiResult<User>>{
  return apiFetch<User>(`/user/${id}/update-user`, {
    method: "PUT",
    body: body ? JSON.stringify(body) : undefined,
  })
}

export function getSubscriptionsOfUser(id: string): Promise<ApiResult<User[]>>{
  return apiFetch<User[]>(`/user/${id}/subscriptions`)
}

export function getFollowers(id: string): Promise<ApiResult<User[]>>{
  return apiFetch<User[]>(`/user/${id}/followers`)
}

// export function getProfileImage(id: string) : Promise<ApiResult<Picture>>{

// }