import { apiFetch } from "../api-client";
import { Event } from "@/types";
import { ApiResult } from "@/types/api";

export function getEvents(): Promise<ApiResult<Event[]>> {
  return apiFetch<Event[]>("/refs/heads/main/evently.json");
}