import { apiFetch } from "../api-client";
import { Event } from "@/types";
import { ApiResult } from "@/types/api";
const URL = '/refs/heads/main/evently.json'
export function getEvents(): Promise<ApiResult<Event[]>> {
  return apiFetch<Event[]>(URL);
}
export function getEventByID(id: string): Promise<ApiResult<Event>> {
  return apiFetch<Event>(`${URL}/${id}`);
}