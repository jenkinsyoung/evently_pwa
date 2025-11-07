import { apiClient } from '../client'
import { Event } from '@/types'


export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface PaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export const eventsApi = {
  getEvents: (): Promise<Event[]> => {
    return apiClient.get<Event[]>('')
  },

  getEvent: (id: string): Promise<Event> => 
    apiClient.get<Event>(`/${id}`)
}