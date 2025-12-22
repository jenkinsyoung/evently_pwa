import { apiFetch } from "../api-client";
import { Event, CreateEventRequest } from "@/types";
import { ApiResult } from "@/types/api";
const URL = '/event'
export function getEvents(): Promise<ApiResult<Event[]>> {
  return apiFetch<Event[]>(URL);
}
export function getEventByID(id: string): Promise<ApiResult<Event>> {
  return apiFetch<Event>(`${URL}/${id}`);
}

export function createEvent(body: CreateEventRequest): Promise<ApiResult<Event>>{
  const token = localStorage.getItem('token');
  return apiFetch<Event>(`/event`, {method: "POST", body: body ? JSON.stringify(body) : undefined}, token?.toString())
}