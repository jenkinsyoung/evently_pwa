import { apiFetch } from "../api-client";
import { User } from "@/types";
import { ApiResult } from "@/types/api";

export function getUserByID(id: string): Promise<ApiResult<User>> {
  return apiFetch<User>(`/user/${id}`);
}