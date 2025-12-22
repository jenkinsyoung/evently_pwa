// lib/api/review-api.ts
import { apiFetch } from "@/lib/api-client";
import type { ApiResult } from "@/types/api";
import type { Review } from "@/types";

export async function getReviewsByEventId(
  eventId: string
): Promise<ApiResult<Review[]>> {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return apiFetch<Review[]>(`/event/${eventId}/reviews`, {}, token ?? undefined);
}
